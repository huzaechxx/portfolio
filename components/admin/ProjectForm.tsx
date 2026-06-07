'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { X, Plus, Upload, Image as ImageIcon, Video } from 'lucide-react'

interface ProjectFormProps {
  initialData?: {
    id?: number
    title?: string
    slug?: string
    client?: string
    industry?: string
    problem?: string
    solution?: string
    techStack?: string[]
    deliverables?: string[]
    results?: string[]
    coverImage?: string
    images?: string[]
    videoUrl?: string
    liveUrl?: string
    featured?: boolean
    published?: boolean
  }
}

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function TagInput({
  label,
  tags,
  onChange,
}: {
  label: string
  tags: string[]
  onChange: (tags: string[]) => void
}) {
  const [input, setInput] = useState('')

  function add() {
    const trimmed = input.trim()
    if (trimmed && !tags.includes(trimmed)) onChange([...tags, trimmed])
    setInput('')
  }

  return (
    <div>
      <label className="block text-[#888888] font-mono text-xs uppercase tracking-widest mb-2">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 border border-[#ff5500]/40 text-[#ff5500] text-xs font-mono px-2 py-1 rounded-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(tags.filter((t) => t !== tag))}
              className="hover:text-white transition-colors"
            >
              <X size={10} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add() } }}
          placeholder="Type and press Enter"
          className="flex-1 bg-[#141414] border border-[#1f1f1f] focus:border-[#ff5500] text-white font-mono text-sm px-3 py-2 rounded-sm outline-none transition-colors"
        />
        <button
          type="button"
          onClick={add}
          className="border border-[#ff5500] text-[#ff5500] px-3 py-2 rounded-sm hover:bg-[#ff5500] hover:text-white transition-all"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  )
}

// A staged file: holds the File object + a local preview URL
interface StagedFile {
  file: File
  preview: string // URL.createObjectURL
}

async function uploadFile(file: File, type: string): Promise<string> {
  const fd = new FormData()
  fd.append('file', file)
  fd.append('type', type)
  const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Upload failed')
  return data.path as string
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter()
  const isEdit = !!initialData?.id

  // Text fields
  const [title, setTitle] = useState(initialData?.title || '')
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [client, setClient] = useState(initialData?.client || '')
  const [industry, setIndustry] = useState(initialData?.industry || '')
  const [problem, setProblem] = useState(initialData?.problem || '')
  const [solution, setSolution] = useState(initialData?.solution || '')
  const [results, setResults] = useState<string[]>(initialData?.results || [])
  const [techStack, setTechStack] = useState<string[]>(initialData?.techStack || [])
  const [deliverables, setDeliverables] = useState<string[]>(initialData?.deliverables || [])
  const [liveUrl, setLiveUrl] = useState(initialData?.liveUrl || '')
  const [featured, setFeatured] = useState(initialData?.featured || false)

  // Images: staged (new files) or already-uploaded URLs (edit mode)
  const [stagedImages, setStagedImages] = useState<StagedFile[]>([])
  const [existingImages, setExistingImages] = useState<string[]>(initialData?.images || [])
  // Cover: index into combined list or 'video' — stores the final URL after upload
  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.coverImage || '')
  // Which image is selected as cover: 'existing:N' | 'staged:N' | ''
  const [coverSelection, setCoverSelection] = useState<string>(
    initialData?.coverImage ? 'existing:0' : ''
  )

  // Video: URL or staged file
  const [videoUrl, setVideoUrl] = useState(initialData?.videoUrl || '')
  const [videoMode, setVideoMode] = useState<'url' | 'file'>('url')
  const [stagedVideo, setStagedVideo] = useState<StagedFile | null>(null)

  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const [error, setError] = useState('')

  const imageInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  function handleTitleChange(val: string) {
    setTitle(val)
    if (!isEdit) setSlug(slugify(val))
  }

  const totalImages = existingImages.length + stagedImages.length

  function handleImageFiles(files: FileList | null) {
    if (!files) return
    const remaining = 3 - totalImages
    if (remaining <= 0) return
    const toAdd = Array.from(files).slice(0, remaining)
    const newStaged = toAdd.map((f) => ({ file: f, preview: URL.createObjectURL(f) }))
    setStagedImages((prev) => [...prev, ...newStaged])
  }

  function removeExistingImage(idx: number) {
    setExistingImages((prev) => prev.filter((_, i) => i !== idx))
    if (coverSelection === `existing:${idx}`) setCoverSelection('')
  }

  function removeStagedImage(idx: number) {
    setStagedImages((prev) => {
      URL.revokeObjectURL(prev[idx].preview)
      return prev.filter((_, i) => i !== idx)
    })
    if (coverSelection === `staged:${idx}`) setCoverSelection('')
  }

  function handleVideoFile(file: File | null) {
    if (!file) return
    if (stagedVideo) URL.revokeObjectURL(stagedVideo.preview)
    setStagedVideo({ file, preview: URL.createObjectURL(file) })
  }

  async function handleSubmit(e: React.FormEvent, publish: boolean) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // 1. Upload staged images
      let uploadedImageUrls: string[] = []
      if (stagedImages.length > 0) {
        setUploadProgress(`Uploading ${stagedImages.length} image(s)...`)
        uploadedImageUrls = await Promise.all(
          stagedImages.map((s) => uploadFile(s.file, 'image'))
        )
      }

      const allImages = [...existingImages, ...uploadedImageUrls]

      // 2. Resolve cover image URL
      let finalCover = coverImageUrl
      if (coverSelection.startsWith('existing:')) {
        const idx = parseInt(coverSelection.split(':')[1])
        finalCover = existingImages[idx] || ''
      } else if (coverSelection.startsWith('staged:')) {
        const idx = parseInt(coverSelection.split(':')[1])
        // staged images are now uploaded; map to uploadedImageUrls
        // stagedImages[idx] → uploadedImageUrls[idx]
        finalCover = uploadedImageUrls[idx] || ''
      }

      // 3. Upload staged video (if file mode)
      let finalVideoUrl = videoUrl
      if (videoMode === 'file' && stagedVideo) {
        setUploadProgress('Uploading video...')
        finalVideoUrl = await uploadFile(stagedVideo.file, 'video')
      }

      setUploadProgress('Saving project...')

      const payload = {
        title, slug, client, industry, problem, solution, results,
        techStack, deliverables,
        coverImage: finalCover || null,
        images: allImages,
        videoUrl: finalVideoUrl || null,
        liveUrl: liveUrl || null,
        featured,
        published: publish,
      }

      const url = isEdit ? `/api/admin/projects/${initialData!.id}` : '/api/admin/projects'
      const method = isEdit ? 'PATCH' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setLoading(false)
        setUploadProgress('')
        return
      }

      router.push('/admin/dashboard')
      router.refresh()
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Upload failed')
      setLoading(false)
      setUploadProgress('')
    }
  }

  const inputClass = 'w-full bg-[#141414] border border-[#1f1f1f] focus:border-[#ff5500] text-white font-mono text-sm px-4 py-3 rounded-sm outline-none transition-colors'
  const labelClass = 'block text-[#888888] font-mono text-xs uppercase tracking-widest mb-2'

  return (
    <form className="space-y-10">
      {/* Basic Info */}
      <section>
        <h2 className="font-sans font-bold text-lg text-white mb-6 pb-3 border-b border-[#1f1f1f]">Basic Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Project Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              className={inputClass}
              placeholder="Automated Invoice Pipeline"
            />
          </div>
          <div>
            <label className={labelClass}>Slug *</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              required
              className={inputClass}
              placeholder="automated-invoice-pipeline"
            />
          </div>
          <div>
            <label className={labelClass}>Client Name</label>
            <input type="text" value={client} onChange={(e) => setClient(e.target.value)} className={inputClass} placeholder="E-commerce Store" />
          </div>
          <div>
            <label className={labelClass}>Industry</label>
            <select value={industry} onChange={(e) => setIndustry(e.target.value)} className={inputClass}>
              <option value="">Select industry</option>
              {['E-commerce', 'Logistics', 'Finance', 'Healthcare', 'Retail', 'SaaS', 'Other'].map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="accent-[#ff5500] w-4 h-4"
              />
              <span className="text-[#888888] font-mono text-sm">Featured on homepage</span>
            </label>
          </div>
        </div>
      </section>

      {/* Case Study Content */}
      <section>
        <h2 className="font-sans font-bold text-lg text-white mb-6 pb-3 border-b border-[#1f1f1f]">The Case Study</h2>
        <div className="space-y-6">
          <div>
            <label className={labelClass}>Problem Statement * — What challenge was the client facing?</label>
            <textarea value={problem} onChange={(e) => setProblem(e.target.value)} required rows={5} className={`${inputClass} resize-none`} placeholder="The client spent 3 hours every week..." />
          </div>
          <div>
            <label className={labelClass}>Our Solution * — How did you solve it?</label>
            <textarea value={solution} onChange={(e) => setSolution(e.target.value)} required rows={5} className={`${inputClass} resize-none`} placeholder="We built an n8n workflow that..." />
          </div>
          <TagInput label="Results / Impact — one result per tag (e.g. 'Saved 10 hrs/week')" tags={results} onChange={setResults} />
        </div>
      </section>

      {/* Technical */}
      <section>
        <h2 className="font-sans font-bold text-lg text-white mb-6 pb-3 border-b border-[#1f1f1f]">Technical Details</h2>
        <div className="space-y-6">
          <TagInput label="Tech Stack *" tags={techStack} onChange={setTechStack} />
          <TagInput label="Deliverables *" tags={deliverables} onChange={setDeliverables} />
        </div>
      </section>

      {/* Media — Images */}
      <section>
        <h2 className="font-sans font-bold text-lg text-white mb-6 pb-3 border-b border-[#1f1f1f]">Media</h2>
        <div className="space-y-8">

          {/* Images */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className={labelClass + ' mb-0'}>Project Images (max 3)</label>
              <span className="text-[#444444] font-mono text-xs">{totalImages}/3 selected</span>
            </div>

            {/* Image grid */}
            {totalImages > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-4">
                {existingImages.map((url, i) => (
                  <div key={`ex-${i}`} className="relative group">
                    <img src={url} alt="" className="w-full h-28 object-cover rounded-sm border border-[#1f1f1f]" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCoverSelection(`existing:${i}`)}
                        className={`text-xs font-mono px-2 py-1 rounded-sm transition-all ${
                          coverSelection === `existing:${i}`
                            ? 'bg-[#ff5500] text-white'
                            : 'bg-[#1f1f1f] text-[#888888] hover:text-white'
                        }`}
                      >
                        {coverSelection === `existing:${i}` ? '★ Cover' : 'Set Cover'}
                      </button>
                      <button type="button" onClick={() => removeExistingImage(i)} className="text-red-400 hover:text-red-300">
                        <X size={14} />
                      </button>
                    </div>
                    {coverSelection === `existing:${i}` && (
                      <span className="absolute top-1 left-1 bg-[#ff5500] text-white text-xs font-mono px-1.5 py-0.5 rounded-sm">Cover</span>
                    )}
                  </div>
                ))}
                {stagedImages.map((s, i) => (
                  <div key={`st-${i}`} className="relative group">
                    <img src={s.preview} alt="" className="w-full h-28 object-cover rounded-sm border border-[#1f1f1f]" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-sm flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCoverSelection(`staged:${i}`)}
                        className={`text-xs font-mono px-2 py-1 rounded-sm transition-all ${
                          coverSelection === `staged:${i}`
                            ? 'bg-[#ff5500] text-white'
                            : 'bg-[#1f1f1f] text-[#888888] hover:text-white'
                        }`}
                      >
                        {coverSelection === `staged:${i}` ? '★ Cover' : 'Set Cover'}
                      </button>
                      <button type="button" onClick={() => removeStagedImage(i)} className="text-red-400 hover:text-red-300">
                        <X size={14} />
                      </button>
                    </div>
                    {coverSelection === `staged:${i}` && (
                      <span className="absolute top-1 left-1 bg-[#ff5500] text-white text-xs font-mono px-1.5 py-0.5 rounded-sm">Cover</span>
                    )}
                    <span className="absolute top-1 right-1 bg-[#1f1f1f] text-[#888888] text-xs font-mono px-1.5 py-0.5 rounded-sm">Staged</span>
                  </div>
                ))}
              </div>
            )}

            {/* Add image button */}
            {totalImages < 3 && (
              <>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={(e) => handleImageFiles(e.target.files)}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="flex items-center gap-2 border border-dashed border-[#2a2a2a] hover:border-[#ff5500] text-[#888888] hover:text-[#ff5500] px-4 py-3 font-mono text-sm rounded-sm transition-all w-full justify-center"
                >
                  <ImageIcon size={15} />
                  Add Image{totalImages === 0 ? 's' : ''} ({3 - totalImages} remaining) — uploaded on publish
                </button>
              </>
            )}
            {totalImages > 0 && coverSelection === '' && (
              <p className="text-[#888888] font-mono text-xs mt-2">Hover an image and click &quot;Set Cover&quot; to choose the cover image</p>
            )}
          </div>

          {/* Video */}
          <div>
            <label className={labelClass}>Demo Video</label>
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => setVideoMode('url')}
                className={`font-mono text-xs px-3 py-1.5 rounded-sm transition-all ${
                  videoMode === 'url' ? 'bg-[#ff5500] text-white' : 'border border-[#2a2a2a] text-[#888888] hover:text-white'
                }`}
              >
                Paste URL
              </button>
              <button
                type="button"
                onClick={() => setVideoMode('file')}
                className={`font-mono text-xs px-3 py-1.5 rounded-sm transition-all ${
                  videoMode === 'file' ? 'bg-[#ff5500] text-white' : 'border border-[#2a2a2a] text-[#888888] hover:text-white'
                }`}
              >
                Upload File
              </button>
            </div>

            {videoMode === 'url' ? (
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className={inputClass}
                placeholder="https://youtu.be/... or https://loom.com/..."
              />
            ) : (
              <>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/mp4,video/webm"
                  onChange={(e) => handleVideoFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
                {stagedVideo ? (
                  <div className="flex items-center gap-3 border border-[#1f1f1f] bg-[#141414] px-4 py-3 rounded-sm">
                    <Video size={15} className="text-[#ff5500] shrink-0" />
                    <span className="text-white font-mono text-sm truncate flex-1">{stagedVideo.file.name}</span>
                    <span className="text-[#444444] font-mono text-xs">{(stagedVideo.file.size / 1024 / 1024).toFixed(1)} MB</span>
                    <button type="button" onClick={() => { URL.revokeObjectURL(stagedVideo.preview); setStagedVideo(null) }} className="text-[#888888] hover:text-red-400">
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => videoInputRef.current?.click()}
                    className="flex items-center gap-2 border border-dashed border-[#2a2a2a] hover:border-[#ff5500] text-[#888888] hover:text-[#ff5500] px-4 py-3 font-mono text-sm rounded-sm transition-all w-full justify-center"
                  >
                    <Upload size={15} />
                    Choose video (MP4 / WebM, max 100MB) — uploaded on publish
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Links */}
      <section>
        <h2 className="font-sans font-bold text-lg text-white mb-6 pb-3 border-b border-[#1f1f1f]">Links</h2>
        <div>
          <label className={labelClass}>Live URL (optional)</label>
          <input
            type="url"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
            className={inputClass}
            placeholder="https://client-site.com"
          />
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="border border-red-900/50 bg-red-900/10 p-4 rounded-sm">
          <p className="text-red-400 font-mono text-sm">{error}</p>
        </div>
      )}

      {/* Submit */}
      <div className="flex items-center gap-4 pt-4 border-t border-[#1f1f1f]">
        {uploadProgress && (
          <span className="text-[#888888] font-mono text-xs flex-1">{uploadProgress}</span>
        )}
        <button
          type="button"
          onClick={(e) => handleSubmit(e as unknown as React.FormEvent, false)}
          disabled={loading}
          className="border border-[#2a2a2a] text-[#888888] hover:text-white px-6 py-3 font-mono text-sm rounded-sm transition-all disabled:opacity-40"
        >
          {loading ? 'Saving...' : 'Save as Draft'}
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e as unknown as React.FormEvent, true)}
          disabled={loading}
          className="bg-[#ff5500] text-white px-6 py-3 font-mono text-sm hover:bg-[#ff5500]/90 rounded-sm transition-all disabled:opacity-40"
        >
          {loading ? (uploadProgress || 'Publishing...') : isEdit ? 'Update & Publish' : 'Publish Project'}
        </button>
      </div>
    </form>
  )
}
