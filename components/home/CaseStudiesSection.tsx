import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProjectCard from '@/components/shared/ProjectCard'
import ScrollReveal from '@/components/shared/ScrollReveal'

interface Project {
  id: number
  slug: string
  title: string
  problem: string
  techStack: string[]
}

interface CaseStudiesSectionProps {
  projects: Project[]
}

export default function CaseStudiesSection({ projects }: CaseStudiesSectionProps) {
  return (
    <section className="py-24 px-6 border-t border-[#1f1f1f]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-16">
          <span className="text-[#ff5500] font-mono text-xs uppercase tracking-widest">Our Work</span>
          <h2 className="font-sans font-bold text-3xl md:text-5xl text-white mt-2">
            Work That Speaks For Itself
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
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

        <ScrollReveal className="text-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 border border-[#2a2a2a] text-[#888888] hover:border-[#ff5500] hover:text-[#ff5500] px-6 py-3 font-mono text-sm transition-all duration-200 rounded-sm"
          >
            See All Projects <ArrowRight size={14} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
