'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Workflow, Bot, Code2, Database, Plug } from 'lucide-react'
import ScrollReveal from '@/components/shared/ScrollReveal'

const services = [
  {
    number: '01',
    name: 'n8n Workflow Automation',
    slug: 'n8n-workflow-automation',
    icon: Workflow,
    description:
      'We design and deploy sophisticated n8n workflows that connect your tools, automate repetitive tasks, and trigger intelligent actions — all without a single line of code from your team.',
    useCases: [
      'Automated invoice generation & sending',
      'CRM data sync across platforms',
      'Lead nurturing email sequences',
      'Slack/Teams notification pipelines',
    ],
  },
  {
    number: '02',
    name: 'AI Integration & Agents',
    slug: 'ai-integration-agents',
    icon: Bot,
    description:
      'We embed OpenAI, Anthropic, and custom LLM models directly into your business processes — from intelligent document processing to fully autonomous AI agents that handle decisions.',
    useCases: [
      'AI-powered customer support triage',
      'Automated document summarization',
      'Intelligent data extraction from PDFs',
      'Autonomous agent workflows',
    ],
  },
  {
    number: '03',
    name: 'Python & Selenium Automation',
    slug: 'python-selenium-automation',
    icon: Code2,
    description:
      'When no-code tools hit their limits, we write robust Python scripts and Selenium automations that handle complex browser interactions, file processing, and system integrations.',
    useCases: [
      'Form filling & data entry automation',
      'Automated report generation',
      'Browser-based testing pipelines',
      'Legacy system integrations',
    ],
  },
  {
    number: '04',
    name: 'Web Scraping & Data Pipelines',
    slug: 'web-scraping-data-pipelines',
    icon: Database,
    description:
      'We build production-grade scrapers with Playwright and Puppeteer that extract, clean, and deliver structured data to your database, spreadsheet, or dashboard — on any schedule.',
    useCases: [
      'Competitor price monitoring',
      'Real estate listing aggregation',
      'Job board data collection',
      'Market research automation',
    ],
  },
  {
    number: '05',
    name: 'Custom API Integrations',
    slug: 'custom-api-integrations',
    icon: Plug,
    description:
      'We connect any two systems that have an API — regardless of whether they have a native integration. From payment gateways to ERPs, we make your stack work as one.',
    useCases: [
      'E-commerce ↔ accounting sync',
      'CRM ↔ marketing platform sync',
      'Webhook event processing',
      'Multi-system data orchestration',
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
