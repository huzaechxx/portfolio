import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { generateSEO } from '@/lib/seo'
import { serviceSchema, faqSchema } from '@/lib/structured-data'

const services: Record<string, {
  name: string
  description: string
  intro: string
  howWeDoIt: string[]
  useCases: string[]
  results: string[]
  faqs: { question: string; answer: string }[]
}> = {
  'workflow-automation': {
    name: 'Workflow Automation',
    description: 'We design and deploy intelligent automation systems using n8n, Make.com, and Zapier — connecting your tools, eliminating repetitive work, and keeping your operations running 24/7.',
    intro: 'Modern businesses run on dozens of tools that don\'t talk to each other. We build the workflows that connect them — visual, maintainable pipelines using n8n and Make.com that trigger smart actions across your entire stack without adding headcount.',
    howWeDoIt: [
      'Discovery call to map your current manual processes and bottlenecks',
      'Identify the highest-ROI workflows to automate first',
      'Build and test pipelines in a staging environment with real data',
      'Deploy, set up monitoring, and hand off with full documentation',
    ],
    useCases: [
      'CRM data sync and lead nurturing sequences',
      'Automated invoice generation and sending',
      'Multi-step approval and onboarding flows',
      'Slack/Teams notifications from any system trigger',
      'Scheduled data sync between platforms',
    ],
    results: [
      'Typical time savings: 5–20 hours per week',
      'Zero missed tasks — automations run 24/7',
      'Scales infinitely without additional headcount',
    ],
    faqs: [
      { question: 'Which automation platforms do you work with?', answer: 'Primarily n8n, Make.com, and Zapier. We recommend n8n for most clients due to its flexibility, self-hosting capability, and lack of per-task pricing.' },
      { question: 'Do I need technical knowledge to manage the workflows?', answer: 'No. We build and document everything so your team can understand what\'s running. For ongoing changes, our retainer plans cover maintenance and new builds.' },
      { question: 'What happens if a workflow breaks?', answer: 'We set up error monitoring and alerting as part of every deployment. Retainer clients get priority response and fixes included.' },
    ],
  },
  'ai-integration-agents': {
    name: 'AI Integration & Agents',
    description: 'We embed OpenAI, Anthropic, and custom LLM models into your business processes — from intelligent document processing to fully autonomous agents that handle complex decisions end-to-end.',
    intro: 'AI is only useful when it\'s actually integrated into your workflow. We build the pipelines that take LLM capabilities — reasoning, extraction, generation, classification — and make them work reliably inside your specific business context at production scale.',
    howWeDoIt: [
      'Map the decision or processing task you want to automate',
      'Select the right model and design the prompt architecture',
      'Build the integration pipeline with proper error handling and fallbacks',
      'Test with real data, iterate, deploy, and monitor in production',
    ],
    useCases: [
      'Customer support ticket triage and intelligent routing',
      'Automated document summarization and data extraction',
      'Custom RAG pipelines over internal knowledge bases',
      'Autonomous multi-step agent workflows',
      'AI-powered data classification and tagging at scale',
    ],
    results: [
      '60–80% reduction in manual classification and processing tasks',
      'Consistent output quality regardless of volume',
      'Response times drop from hours to seconds',
    ],
    faqs: [
      { question: 'Which AI models do you work with?', answer: 'Primarily OpenAI (GPT-4o) and Anthropic (Claude). We select the best model per use case based on capability, cost, speed, and context window requirements.' },
      { question: 'How do you handle sensitive data?', answer: 'We can build pipelines that avoid sending sensitive fields to third-party APIs, or use self-hosted / private-deployment models for full compliance.' },
      { question: 'What if the AI makes mistakes?', answer: 'We design human-in-the-loop checkpoints for high-stakes decisions and build confidence-scoring so low-confidence outputs are flagged for human review rather than passed through.' },
    ],
  },
  'data-engineering': {
    name: 'Data Engineering & ETL',
    description: 'We transform your raw data lake into clean, structured pipelines — building reliable ETL/ELT workflows, automating data ingestion, and engineering the data foundation your analytics and AI models depend on.',
    intro: 'Raw data is worthless without reliable infrastructure to move, clean, and transform it. We design and build the pipelines that collect data from every source, validate and standardise it, and deliver it to the right destination — on schedule, at scale, without breaking.',
    howWeDoIt: [
      'Audit your current data sources, formats, and quality issues',
      'Design the pipeline architecture — ingestion, transformation, and storage layers',
      'Build ETL/ELT pipelines with schema validation and error handling',
      'Set up monitoring, alerting, and automated quality checks',
    ],
    useCases: [
      'Raw data lake transformation into analytics-ready datasets',
      'Large-scale data migration between systems or cloud providers',
      'Automated ingestion pipelines from APIs, databases, and flat files',
      'Real-time and batch data processing workflows',
      'Data quality enforcement and deduplication at scale',
    ],
    results: [
      'Data reliability goes from ad-hoc to production-grade',
      'Analyst time spent on data prep drops by 60–80%',
      'Pipelines run on schedule with automated alerts on failure',
    ],
    faqs: [
      { question: 'What tools do you use for data engineering?', answer: 'Python, SQL, dbt for transformations, Airflow or n8n for orchestration, and PostgreSQL / Supabase / BigQuery as targets depending on your stack.' },
      { question: 'Can you handle large-scale migrations?', answer: 'Yes. We\'ve designed migration pipelines for millions of rows, with rollback plans, validation checks, and zero-downtime strategies.' },
      { question: 'What if our data is messy and inconsistent?', answer: 'That\'s exactly what we fix. We start with a data audit, identify quality issues, and build cleaning logic into the pipeline so downstream consumers always get reliable data.' },
    ],
  },
  'analytics-bi': {
    name: 'Analytics & Business Intelligence',
    description: 'We turn your structured data into actionable dashboards and reports — building Power BI views, custom analytics pipelines, and KPI tracking systems that give your team a real-time picture of performance.',
    intro: 'Having data isn\'t the same as understanding your business. We connect your data sources, define your key metrics, and build the analytics layer that surfaces what actually matters — automatically updated, properly governed, and built for decision-making.',
    howWeDoIt: [
      'Define KPIs and reporting requirements with stakeholders',
      'Connect and validate all relevant data sources',
      'Design the data model and dashboard architecture',
      'Build, test, and hand off with documentation and training',
    ],
    useCases: [
      'Power BI dashboard design and deployment',
      'Executive KPI reporting and performance scorecards',
      'Operational dashboards for logistics, sales, and support',
      'Marketing analytics and campaign attribution',
      'Custom analytics for finance, HR, and supply chain',
    ],
    results: [
      'Decision-relevant metrics available in real time instead of weekly reports',
      'Single source of truth — no more conflicting spreadsheets',
      'Analyst time spent building manual reports drops by 70%+',
    ],
    faqs: [
      { question: 'Do you only work with Power BI?', answer: 'Power BI is our primary tool for most enterprise clients, but we also work with Metabase, Superset, and custom-built dashboards depending on your stack and preferences.' },
      { question: 'What data sources can you connect?', answer: 'Any source with a connector or API — SQL databases, Supabase, Google Sheets, REST APIs, CSV files, Airtable, Salesforce, and more.' },
      { question: 'Can you train our team to use the dashboards?', answer: 'Yes. Every handoff includes documentation and a walkthrough session. We can also run broader training for teams who want to build on top of what we deliver.' },
    ],
  },
  'web-app-development': {
    name: 'Web & App Development',
    description: 'We build fast, scalable web applications, SaaS products, and internal tools using modern frameworks — from concept to production, with clean architecture and seamless integrations built in from day one.',
    intro: 'Whether you need a customer-facing web app, an internal operations tool, or a full SaaS product, we build it with a tech stack that scales and a codebase you can own. Our default stack is Next.js, React, FastAPI, and PostgreSQL — battle-tested, modern, and maintainable.',
    howWeDoIt: [
      'Requirements scoping and technical architecture design',
      'Iterative development with milestone-based delivery',
      'Integration of third-party APIs, auth, payments, and data',
      'Deployment, performance optimisation, and handoff',
    ],
    useCases: [
      'SaaS product development from MVP to production',
      'Internal operations tools and admin dashboards',
      'Customer portals and self-service platforms',
      'Business process applications replacing manual workflows',
      'CRM and ERP custom frontends and backends',
    ],
    results: [
      'Shipped on schedule with a clean, documented codebase',
      'Modern, performant stack that handles real production load',
      'Fully integrated with your existing tools and data sources',
    ],
    faqs: [
      { question: 'What tech stack do you use?', answer: 'Our default is Next.js + React on the frontend, FastAPI or Node.js on the backend, and PostgreSQL (via Supabase or direct) for the database. We adapt based on project requirements.' },
      { question: 'Do you handle design as well as development?', answer: 'We work from your designs or existing brand guidelines. For projects without designs, we can recommend and coordinate with UI/UX designers.' },
      { question: 'Will we own the codebase?', answer: 'Yes, always. You get full ownership of all code, deployments, and infrastructure. We provide documentation and handoff support as part of every project.' },
    ],
  },
  'api-systems-integration': {
    name: 'API & Systems Integration',
    description: 'We connect any two systems that expose an API — building the middleware, webhooks, and integration layers that make your entire stack work as one coherent, reliable system.',
    intro: 'Every integration that doesn\'t exist is a manual process waiting to happen. We map your system architecture, identify the gaps, and build the connective tissue — whether it\'s a simple webhook handler or a complex multi-system orchestration with transformation logic, queuing, and error recovery.',
    howWeDoIt: [
      'Map the data flows and identify integration gaps in your stack',
      'Build authentication, connection, and data transformation logic',
      'Implement error handling, retry logic, and rate-limit strategies',
      'Deploy with monitoring and alerting on all integration points',
    ],
    useCases: [
      'E-commerce orders synced to accounting and ERP systems',
      'CRM contacts pushed to email marketing and ad platforms',
      'Payment gateway events routed to internal databases',
      'Webhook events processed and fanned out to multiple systems',
      'Legacy system modernisation via API bridging',
    ],
    results: [
      'Single source of truth across all tools — no data drift',
      'Manual data export/import workflows eliminated completely',
      'Real-time sync replaces daily or weekly batch transfers',
    ],
    faqs: [
      { question: 'What if one of our tools doesn\'t have an API?', answer: 'We can often use file-based integrations (CSV/SFTP), database-level connections, or web scraping as alternatives to missing APIs.' },
      { question: 'How do you handle API rate limits?', answer: 'We build rate-limit-aware queuing and exponential backoff so integrations never drop data or hit API limits, even under high volume.' },
      { question: 'Can you maintain integrations long-term?', answer: 'Yes. APIs evolve — endpoints change, auth methods update, schemas shift. Our retainer plans include ongoing maintenance and proactive monitoring.' },
    ],
  },
}

export async function generateStaticParams() {
  return Object.keys(services).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = services[params.slug]
  if (!service) return {}
  return generateSEO({
    title: service.name,
    description: service.description,
    path: `/services/${params.slug}`,
  })
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services[params.slug]
  if (!service) notFound()

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  const sSchema = serviceSchema(service.name, service.description, `${siteUrl}/services/${params.slug}`)
  const fSchema = faqSchema(service.faqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(fSchema) }} />
      <Navbar />
      <main className="min-h-screen pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <Link href="/#services" className="inline-flex items-center gap-2 text-[#888888] hover:text-[#ff5500] font-mono text-sm mb-12 transition-colors">
            <ArrowLeft size={14} /> Back to Services
          </Link>

          {/* Header */}
          <div className="mb-16">
            <span className="text-[#ff5500] font-mono text-xs uppercase tracking-widest">Service</span>
            <h1 className="font-sans font-extrabold text-4xl md:text-6xl text-white mt-2 mb-4">
              {service.name}
            </h1>
            <p className="text-[#888888] font-mono text-base leading-relaxed max-w-2xl">
              {service.description}
            </p>
          </div>

          {/* What it is */}
          <section className="mb-16 border-t border-[#1f1f1f] pt-12">
            <h2 className="font-sans font-bold text-2xl text-white mb-4">What It Is</h2>
            <p className="text-[#888888] font-mono text-sm leading-relaxed">{service.intro}</p>
          </section>

          {/* How we do it */}
          <section className="mb-16 border-t border-[#1f1f1f] pt-12">
            <h2 className="font-sans font-bold text-2xl text-white mb-6">How We Do It</h2>
            <ol className="space-y-4">
              {service.howWeDoIt.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-[#ff5500] font-mono text-xs mt-1 shrink-0">0{i + 1}</span>
                  <span className="text-[#888888] font-mono text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Use cases */}
          <section className="mb-16 border-t border-[#1f1f1f] pt-12">
            <h2 className="font-sans font-bold text-2xl text-white mb-6">Use Cases</h2>
            <ul className="space-y-3">
              {service.useCases.map((uc) => (
                <li key={uc} className="flex items-start gap-2 text-[#888888] font-mono text-sm">
                  <span className="text-[#ff5500] mt-0.5">→</span> {uc}
                </li>
              ))}
            </ul>
          </section>

          {/* Results */}
          <section className="mb-16 border border-[#ff5500]/20 bg-[#ff5500]/5 p-8 rounded-sm">
            <h2 className="font-sans font-bold text-xl text-white mb-4">Example Results</h2>
            <ul className="space-y-3">
              {service.results.map((r) => (
                <li key={r} className="flex items-start gap-2 text-[#888888] font-mono text-sm">
                  <Check size={14} className="text-[#ff5500] mt-0.5 shrink-0" /> {r}
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ */}
          <section className="mb-16 border-t border-[#1f1f1f] pt-12">
            <h2 className="font-sans font-bold text-2xl text-white mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {service.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-sans font-bold text-white mb-2">{faq.question}</h3>
                  <p className="text-[#888888] font-mono text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="border-t border-[#1f1f1f] pt-12 text-center">
            <h2 className="font-sans font-bold text-2xl text-white mb-4">Ready to Get Started?</h2>
            <p className="text-[#888888] font-mono text-sm mb-6">Book a free 30-minute discovery call and we&apos;ll map out the right solution for your specific challenge.</p>
            <Link
              href="/contact"
              className="inline-block bg-[#ff5500] text-white px-8 py-3 font-mono text-sm hover:bg-[#ff5500]/90 transition-all rounded-sm"
            >
              Book Free Discovery Call →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
