'use client'

import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function DeleteProjectButton({ id }: { id: number }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('Delete this project? This cannot be undone.')) return
    setLoading(true)
    await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' })
    router.refresh()
    setLoading(false)
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-[#888888] hover:text-red-400 transition-colors disabled:opacity-40"
      aria-label="Delete"
    >
      <Trash2 size={15} />
    </button>
  )
}
