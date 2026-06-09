'use client'

import ScrollReveal from '@/components/shared/ScrollReveal'

const row1 = ['n8n', 'Python', 'OpenAI', 'Power BI', 'Playwright', 'Make.com', 'Node.js', 'PostgreSQL', 'dbt', 'Zapier']
const row2 = ['Next.js', 'React', 'AWS', 'Docker', 'Anthropic', 'ETL Pipelines', 'Supabase', 'FastAPI', 'LangChain', 'Airflow']

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div className={`flex gap-12 ${reverse ? 'animate-scroll-right' : 'animate-scroll-left'}`}>
      {doubled.map((item, i) => (
        <span
          key={i}
          className="text-[#888888] font-mono text-sm uppercase tracking-widest whitespace-nowrap opacity-40 hover:opacity-100 transition-opacity cursor-default select-none"
        >
          {item}
        </span>
      ))}
    </div>
  )
}

export default function TechStackMarquee() {
  return (
    <section className="py-24 border-t border-b border-[#1f1f1f] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-12">
        <ScrollReveal>
          <h2 className="font-sans font-bold text-2xl md:text-3xl text-white text-center">
            Your Resident Expert in{' '}
            <span className="text-[#ff5500]">Cutting Edge Technologies</span>
          </h2>
        </ScrollReveal>
      </div>

      <div className="space-y-6">
        <div className="marquee-mask overflow-hidden">
          <MarqueeRow items={row1} />
        </div>
        <div className="marquee-mask overflow-hidden">
          <MarqueeRow items={row2} reverse />
        </div>
      </div>
    </section>
  )
}
