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
  'n8n-workflow-automation': {
    name: 'n8n Workflow Automation',
    description: 'We design and deploy n8n workflows that connect your tools, eliminate repetitive tasks, and scale your operations — without hiring more staff.',
    intro: 'n8n is the most powerful open-source workflow automation platform available. We use it to build visual pipelines that connect your entire tech stack — from CRMs and email to databases and AI.',
    howWeDoIt: [
      'Discovery call to map your current manual processes',
      'Identify the highest-ROI workflows to automate first',
      'Build and test the n8n pipeline in a staging environment',
      'Deploy, monitor, and hand off with full documentation',
    ],
    useCases: [
      'Automated invoice creation and sending',
      'Lead capture → CRM sync → welcome email sequence',
      'Slack notifications from any trigger',
      'Scheduled data sync between platforms',
      'Error alerting and monitoring pipelines',
    ],
    results: [
      'Typical time savings: 5–20 hours per week',
      'Zero missed tasks — automations run 24/7',
      'Scales infinitely without additional headcount',
    ],
    faqs: [
      { question: 'Do I need to know how to code to use n8n?', answer: 'No. We build and maintain the workflows for you. Your team just benefits from the results.' },
      { question: 'Can n8n connect to any tool we use?', answer: 'n8n supports 400+ integrations natively. For anything else, we can use their HTTP node to connect to any REST API.' },
      { question: 'What happens if a workflow breaks?', answer: 'We set up error monitoring and alerting so you\'re notified immediately. We also offer retainer packages with ongoing maintenance.' },
    ],
  },
  'ai-integration-agents': {
    name: 'AI Integration & Agents',
    description: 'We embed OpenAI and Anthropic models into your business processes — from document processing to fully autonomous AI agents that handle complex decisions.',
    intro: 'AI is only useful if it\'s actually integrated into your workflow. We build the pipelines that take LLM capabilities and make them work reliably inside your specific business context.',
    howWeDoIt: [
      'Map the decision or processing task you want to automate',
      'Select the right model and design the prompt architecture',
      'Build the integration pipeline with proper error handling',
      'Test with real data, iterate, deploy, and monitor',
    ],
    useCases: [
      'Customer support ticket triage and routing',
      'Automated document summarization and extraction',
      'AI-generated first-draft responses',
      'Intelligent data categorization',
      'Autonomous multi-step agent workflows',
    ],
    results: [
      '60–80% reduction in manual classification tasks',
      'Consistent quality output at any volume',
      'Response times drop from hours to seconds',
    ],
    faqs: [
      { question: 'Which AI models do you work with?', answer: 'Primarily OpenAI (GPT-4o) and Anthropic (Claude). We pick the best model for your specific use case based on capability, cost, and speed.' },
      { question: 'How do you handle sensitive data?', answer: 'We can configure pipelines to avoid sending sensitive data to third-party APIs, or use self-hosted/private models for maximum compliance.' },
      { question: 'What if the AI makes mistakes?', answer: 'We design human-in-the-loop checkpoints for high-stakes decisions, and build confidence-scoring so low-confidence outputs are flagged for review.' },
    ],
  },
  'python-selenium-automation': {
    name: 'Python & Selenium Automation',
    description: 'When no-code tools hit their limits, we write robust Python scripts and Selenium automations that handle complex browser interactions and system integrations.',
    intro: 'Some automation problems require real code. We write clean, maintainable Python that handles file processing, browser automation, API calls, and data transformation at any scale.',
    howWeDoIt: [
      'Define the exact task, inputs, outputs, and edge cases',
      'Write modular Python scripts with proper error handling',
      'Test against real environments with real data',
      'Deploy, schedule (cron/cloud), and document',
    ],
    useCases: [
      'Automated form filling and data entry',
      'Browser-based login and data extraction',
      'PDF generation and manipulation',
      'Bulk file renaming and organization',
      'Legacy system integrations without APIs',
    ],
    results: [
      'Tasks that took hours now run in minutes',
      'Zero human error in data processing',
      'Runs on any schedule, including real-time triggers',
    ],
    faqs: [
      { question: 'Will Selenium break when websites update?', answer: 'We write resilient selectors and add monitoring so we know immediately if a scraper breaks. Maintenance is included in retainer packages.' },
      { question: 'Can you run Python scripts on our servers?', answer: 'Yes. We can deploy to your infrastructure, our cloud, or a simple VPS — whatever suits your security requirements.' },
      { question: 'What about headless browser detection?', answer: 'We handle anti-bot measures with proper user-agent rotation, delays, and stealth configurations where legally appropriate.' },
    ],
  },
  'web-scraping-data-pipelines': {
    name: 'Web Scraping & Data Pipelines',
    description: 'Production-grade scrapers with Playwright and Puppeteer that extract, clean, and deliver structured data to your database or dashboard — on any schedule.',
    intro: 'Data is only valuable if you can access it. We build scrapers that run reliably at scale, handle dynamic JS-heavy sites, and deliver clean, structured data wherever you need it.',
    howWeDoIt: [
      'Analyse the target site structure and data availability',
      'Build scraper with proper pagination and error handling',
      'Set up data cleaning and transformation pipeline',
      'Store in your database or deliver to Sheets/CSV/API',
    ],
    useCases: [
      'Competitor price monitoring (100–10,000 SKUs)',
      'Real estate listing aggregation',
      'Job board monitoring and alerts',
      'News and content aggregation',
      'Market research and trend data',
    ],
    results: [
      'Real-time competitive intelligence at scale',
      '100% structured, clean data — no manual cleanup',
      'Thousands of data points collected per hour',
    ],
    faqs: [
      { question: 'Is web scraping legal?', answer: 'It depends on the site and how data is used. We always review robots.txt and Terms of Service, and only build scrapers for legitimate business use cases.' },
      { question: 'What if the site uses CAPTCHAs?', answer: 'We use CAPTCHA-solving services and rate limiting strategies. For heavily protected sites, we first check if an official API or data feed exists.' },
      { question: 'Where does the scraped data go?', answer: 'Anywhere you need it — PostgreSQL, Supabase, Google Sheets, Airtable, a REST API, or a flat CSV file on a schedule.' },
    ],
  },
  'custom-api-integrations': {
    name: 'Custom API Integrations',
    description: 'We connect any two systems that have an API — regardless of whether they have a native integration — so your stack works as one seamless operation.',
    intro: 'Modern businesses run on dozens of tools that don\'t talk to each other. We build the glue — custom API integrations that keep your data consistent and your workflows smooth.',
    howWeDoIt: [
      'Map the data flow between the two systems',
      'Authenticate and test API connections',
      'Build the transformation and sync logic',
      'Handle edge cases, errors, and rate limits',
    ],
    useCases: [
      'E-commerce orders → accounting software',
      'CRM contacts → email marketing platform',
      'Payment gateway → internal database',
      'Webhook events → Slack notifications',
      'ERP data → custom dashboard',
    ],
    results: [
      'Single source of truth across all your tools',
      'No more manual data export/import',
      'Real-time sync instead of daily batch updates',
    ],
    faqs: [
      { question: 'What if one of our tools doesn\'t have an API?', answer: 'We can often use web scraping, file-based integrations (CSV/SFTP), or database-level connections as alternatives.' },
      { question: 'How do you handle API rate limits?', answer: 'We build rate-limit-aware queuing and backoff strategies so integrations never hit API limits or lose data.' },
      { question: 'Can you maintain the integration long-term?', answer: 'Yes. APIs change — endpoints deprecate, auth methods update. Our retainer packages include ongoing maintenance and monitoring.' },
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
            <p className="text-[#888888] font-mono text-sm mb-6">Book a free 30-minute audit and we&apos;ll map out exactly what we can automate for you.</p>
            <Link
              href="/contact"
              className="inline-block bg-[#ff5500] text-white px-8 py-3 font-mono text-sm hover:bg-[#ff5500]/90 transition-all rounded-sm"
            >
              Book Free Audit →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
