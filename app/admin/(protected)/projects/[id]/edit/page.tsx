import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import ProjectForm from '@/components/admin/ProjectForm'

export const dynamic = 'force-dynamic'

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({ where: { id: parseInt(params.id) } })
  if (!project) notFound()

  const techStack = project.techStack
  const deliverables = project.deliverables

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-sans font-bold text-2xl text-white">Edit Project</h1>
        <p className="text-[#888888] font-mono text-sm mt-1">{project.title}</p>
      </div>
      <ProjectForm
        initialData={{
          id: project.id,
          title: project.title,
          slug: project.slug,
          client: project.client || '',
          industry: project.industry || '',
          problem: project.problem,
          solution: project.solution,
          techStack,
          deliverables,
          results: project.results,
          coverImage: project.coverImage || '',
          videoUrl: project.videoUrl || '',
          liveUrl: project.liveUrl || '',
          featured: project.featured,
          published: project.published,
        }}
      />
    </div>
  )
}
