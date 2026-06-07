import ProjectForm from '@/components/admin/ProjectForm'

export default function NewProjectPage() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-sans font-bold text-2xl text-white">New Project</h1>
        <p className="text-[#888888] font-mono text-sm mt-1">Add a new case study to your portfolio</p>
      </div>
      <ProjectForm />
    </div>
  )
}
