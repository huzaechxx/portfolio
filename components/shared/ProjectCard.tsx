'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface ProjectCardProps {
  title: string
  problem: string
  techStack: string[]
  slug: string
  index?: number
}

export default function ProjectCard({ title, problem, techStack, slug, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
    >
      <Link href={`/case-studies/${slug}`}>
        <div className="bg-[#141414] border border-[#1f1f1f] hover:border-[#ff5500]/40 p-6 rounded-sm transition-all duration-300 group h-full flex flex-col">
          <h3 className="font-sans font-bold text-lg text-white mb-3 group-hover:text-[#ff5500] transition-colors">
            {title}
          </h3>
          <p className="text-[#888888] text-sm font-mono leading-relaxed mb-6 flex-1">
            {problem.length > 120 ? problem.slice(0, 120) + '...' : problem}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="border border-[#ff5500]/40 text-[#ff5500] text-xs font-mono px-2 py-0.5 rounded-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[#ff5500] text-sm font-mono">
            View Case Study <ArrowRight size={14} />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
