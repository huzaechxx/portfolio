import Link from 'next/link'
import { prisma } from '@/lib/db'
import { PlusCircle, Edit } from 'lucide-react'
import DeleteProjectButton from '@/components/admin/DeleteProjectButton'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = []
  let dbError = false
  try {
    projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
  } catch {
    dbError = true
  }

  const total = projects.length
  const published = projects.filter((p: { published: boolean }) => p.published).length
  const drafts = total - published

  return (
    <div className="p-8">
      {dbError && (
        <div className="mb-6 border border-red-900/50 bg-red-900/10 p-4 rounded-sm flex items-center justify-between">
          <p className="text-red-400 font-mono text-sm">Database connection timed out. <a href="" className="underline hover:text-red-300">Refresh to retry.</a></p>
        </div>
      )}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-sans font-bold text-2xl text-white">Dashboard</h1>
          <p className="text-[#888888] font-mono text-sm mt-1">Manage your case studies and projects</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 bg-[#ff5500] text-white px-4 py-2 font-mono text-sm hover:bg-[#ff5500]/90 transition-all rounded-sm"
        >
          <PlusCircle size={15} />
          New Project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Total Projects', value: total },
          { label: 'Published', value: published },
          { label: 'Drafts', value: drafts },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#141414] border border-[#1f1f1f] p-5 rounded-sm">
            <p className="text-[#444444] font-mono text-xs uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="font-sans font-bold text-3xl text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Projects table */}
      <div className="border border-[#1f1f1f] rounded-sm overflow-hidden">
        <div className="grid grid-cols-[1fr_100px_140px_100px] gap-4 px-6 py-3 border-b border-[#1f1f1f] bg-[#111111]">
          <span className="text-[#444444] font-mono text-xs uppercase tracking-widest">Title</span>
          <span className="text-[#444444] font-mono text-xs uppercase tracking-widest">Status</span>
          <span className="text-[#444444] font-mono text-xs uppercase tracking-widest">Date</span>
          <span className="text-[#444444] font-mono text-xs uppercase tracking-widest">Actions</span>
        </div>

        {projects.length === 0 ? (
          <div className="px-6 py-12 text-center text-[#444444] font-mono text-sm">
            No projects yet.{' '}
            <Link href="/admin/projects/new" className="text-[#ff5500] hover:underline">
              Create your first one.
            </Link>
          </div>
        ) : (
          projects.map((project: { id: number; title: string; slug: string; published: boolean; createdAt: Date }) => (
            <div
              key={project.id}
              className="grid grid-cols-[1fr_100px_140px_100px] gap-4 px-6 py-4 border-b border-[#1f1f1f] last:border-b-0 hover:bg-[#111111] transition-colors items-center"
            >
              <div>
                <p className="text-white font-mono text-sm">{project.title}</p>
                <p className="text-[#444444] font-mono text-xs mt-0.5">/{project.slug}</p>
              </div>
              <span
                className={`text-xs font-mono px-2 py-0.5 rounded-full w-fit ${
                  project.published
                    ? 'bg-green-900/30 text-green-400'
                    : 'bg-[#1f1f1f] text-[#888888]'
                }`}
              >
                {project.published ? 'Published' : 'Draft'}
              </span>
              <span className="text-[#888888] font-mono text-xs">
                {project.createdAt.toLocaleDateString('en-GB')}
              </span>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="text-[#888888] hover:text-[#ff5500] transition-colors"
                  aria-label="Edit"
                >
                  <Edit size={15} />
                </Link>
                <DeleteProjectButton id={project.id} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
