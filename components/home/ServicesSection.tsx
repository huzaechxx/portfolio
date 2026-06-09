'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Workflow, Bot, Database, Plug, BarChart2, Monitor } from 'lucide-react'
import ScrollReveal from '@/components/shared/ScrollReveal'

const services = [
  {
    number: '01',
    name: 'Workflow Automation',
    slug: 'workflow-automation',
    icon: Workflow,
    description:
      'We design and deploy intelligent automation systems using n8n, Make.com, and Zapier — connecting your tools, eliminating repetitive work, and triggering smart actions across your entire stack.',
    useCases: [
      'CRM data sync & lead nurturing sequences',
      'Automated invoicing & document generation',
      'Slack/Teams notification pipelines',
      'Multi-step approval & onboarding flows',
    ],
  },
  {
    number: '02',
    name: 'AI Integration & Agents',
    slug: 'ai-integration-agents',
    icon: Bot,
    description:
      'We embed OpenAI, Anthropic, and custom LLM models into your business processes — from intelligent document processing to fully autonomous agents that handle complex decisions end-to-end.',
    useCases: [
      'AI-powered customer support triage',
      'Automated document summarization & extraction',
      'Autonomous agent workflows & decision trees',
      'Custom RAG pipelines & LLM fine-tuning',
    ],
  },
  {
    number: '03',
    name: 'Data Engineering & ETL',
    slug: 'data-engineering',
    icon: Database,
    description:
      'We transform your raw data lake into clean, structured pipelines — building reliable ETL/ELT workflows, automating data ingestion, and engineering the data foundation your analytics and AI depend on.',
    useCases: [
      'Raw data lake → analytics-ready pipelines',
      'Large-scale data migration & cleanup',
      'Automated ETL/ELT with schema validation',
      'Real-time & batch data ingestion workflows',
    ],
  },
  {
    number: '04',
    name: 'Analytics & Business Intelligence',
    slug: 'analytics-bi',
    icon: BarChart2,
    description:
      'We turn your structured data into actionable insights — building Power BI dashboards, custom reporting pipelines, and analytics views that give your team a real-time picture of performance.',
    useCases: [
      'Power BI dashboard design & deployment',
      'KPI reporting & executive dashboards',
      'Data warehouse setup & optimization',
      'Custom analytics for operations & sales',
    ],
  },
  {
    number: '05',
    name: 'Web & App Development',
    slug: 'web-app-development',
    icon: Monitor,
    description:
      'We build fast, scalable web applications, internal tools, and SaaS products using modern tech stacks — from concept to production, with clean architecture and seamless integrations built in from day one.',
    useCases: [
      'Web & mobile app development (Next.js, React)',
      'SaaS product & internal tooling builds',
      'Business process portals & admin panels',
      'CRM / ERP custom frontend & backend',
    ],
  },
  {
    number: '06',
    name: 'API & Systems Integration',
    slug: 'api-systems-integration',
    icon: Plug,
    description:
      'We connect any two systems that expose an API — building robust middleware, webhooks, and integration layers that make your entire stack work as one coherent, reliable system.',
    useCases: [
      'E-commerce ↔ accounting & ERP sync',
      'CRM ↔ marketing platform integrations',
      'Webhook event processing & routing',
      'Legacy system modernization & bridging',
    ],
  },
]

export default function ServicesSection() {
  const [active, setActive] = useState(0)
  const current = services[active]
  const Icon = current.icon

  return (
    <section id="services" className="py-24 px-6 border-t border-[#1f1f1f]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-16">
          <span className="text-[#ff5500] font-mono text-xs uppercase tracking-widest">What We Do</span>
          <h2 className="font-sans font-bold text-3xl md:text-5xl text-white mt-2">
            What We Build For You
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[#1f1f1f] rounded-sm overflow-hidden">
          {/* Left: service list */}
          <div className="border-r border-[#1f1f1f]">
            {services.map((service, i) => (
              <button
                key={service.slug}
                onClick={() => setActive(i)}
                className={`w-full text-left px-6 py-5 border-b border-[#1f1f1f] last:border-b-0 transition-all duration-200 group ${
                  active === i
                    ? 'bg-[#141414] border-l-2 border-l-[#ff5500]'
                    : 'hover:bg-[#111111] border-l-2 border-l-transparent'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#444444] font-mono text-xs">{service.number}</span>
                  <span
                    className={`font-mono text-sm transition-colors ${
                      active === i ? 'text-white' : 'text-[#888888] group-hover:text-white'
                    }`}
                  >
                    {service.name}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Right: detail panel */}
          <div className="p-8 bg-[#0d0d0d] flex flex-col justify-between min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6 h-full"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 border border-[#ff5500]/20 rounded-sm bg-[#ff5500]/5">
                    <Icon size={20} className="text-[#ff5500]" />
                  </div>
                  <h3 className="font-sans font-bold text-xl text-white">{current.name}</h3>
                </div>

                <p className="text-[#888888] font-mono text-sm leading-relaxed">
                  {current.description}
                </p>

                <div>
                  <p className="text-[#444444] font-mono text-xs uppercase tracking-widest mb-3">
                    Example Use Cases
                  </p>
                  <ul className="space-y-2">
                    {current.useCases.map((uc) => (
                      <li key={uc} className="flex items-start gap-2 text-[#888888] font-mono text-sm">
                        <span className="text-[#ff5500] mt-0.5">→</span>
                        {uc}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/services/${current.slug}`}
                  className="text-[#ff5500] font-mono text-sm hover:underline mt-auto inline-flex items-center gap-1"
                >
                  Learn More →
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
