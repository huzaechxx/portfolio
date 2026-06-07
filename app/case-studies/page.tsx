import { Metadata } from 'next'
import { prisma } from '@/lib/db'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ProjectCard from '@/components/shared/ProjectCard'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { generateSEO } from '@/lib/seo'

export const revalidate = 60

export const metadata: Metadata = generateSEO({
  title: 'Case Studies',
  description: "Real automation projects we've built for businesses — from invoice pipelines to AI triage systems. See the results.",
  path: '/case-studies',
})

export default async function CaseStudiesPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: { id: true, slug: true, title: true, problem: true, techStack: true },
  })

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-16">
            <span className="text-[#ff5500] font-mono text-xs uppercase tracking-widest">Portfolio</span>
            <h1 className="font-sans font-extrabold text-4xl md:text-6xl text-white mt-2 mb-4">
              Work That Speaks For Itself
            </h1>
            <p className="text-[#888888] font-mono text-base max-w-xl">
              Real automation projects, real results. Every case study shows the problem, our solution, and the measurable outcome.
            </p>
          </ScrollReveal>

          {projects.length === 0 ? (
            <div className="text-center py-24 text-[#444444] font-mono">
              No case studies published yet. Check back soon.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  problem={project.problem}
                  techStack={project.techStack}
                  slug={project.slug}
                  index={i}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
