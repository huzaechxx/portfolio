import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const serviceData: Record<string, { name: string; description: string; tag: string }> = {
  'workflow-automation': {
    name: 'Workflow Automation',
    description: 'n8n, Make.com & Zapier pipelines that connect your tools and eliminate repetitive work.',
    tag: 'Automation',
  },
  'ai-integration-agents': {
    name: 'AI Integration & Agents',
    description: 'OpenAI & Anthropic models embedded into your business processes end-to-end.',
    tag: 'AI',
  },
  'data-engineering': {
    name: 'Data Engineering & ETL',
    description: 'Raw data lake → clean, analytics-ready pipelines built to run reliably at scale.',
    tag: 'Data',
  },
  'analytics-bi': {
    name: 'Analytics & Business Intelligence',
    description: 'Power BI dashboards and reporting pipelines that surface what actually matters.',
    tag: 'Analytics',
  },
  'web-app-development': {
    name: 'Web & App Development',
    description: 'Fast, scalable web apps and SaaS products built with Next.js, React, and FastAPI.',
    tag: 'Development',
  },
  'api-systems-integration': {
    name: 'API & Systems Integration',
    description: 'Middleware and integration layers that make your entire stack work as one system.',
    tag: 'Integration',
  },
}

export function generateImageMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const service = serviceData[params.slug]
  return [
    {
      id: params.slug,
      alt: service ? `${service.name} — Rdexa.tech` : 'Rdexa.tech Services',
    },
  ]
}

export default function Image({ params }: { params: { slug: string } }) {
  const service = serviceData[params.slug] ?? {
    name: 'Our Services',
    description: 'Custom software, data pipelines, and AI automation for modern businesses.',
    tag: 'Services',
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          fontFamily: 'monospace',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
            <polygon points="10,2 18,18 2,18" fill="#ff5500" />
          </svg>
          <span style={{ color: '#ffffff', fontSize: '22px', fontWeight: 700 }}>
            Rdexa.tech
          </span>
        </div>

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Service tag */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#ff5500',
              }}
            />
            <span
              style={{
                color: '#ff5500',
                fontSize: '14px',
                letterSpacing: '4px',
                textTransform: 'uppercase',
              }}
            >
              {service.tag}
            </span>
          </div>

          {/* Service name */}
          <span
            style={{
              color: '#ffffff',
              fontSize: '72px',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-3px',
              maxWidth: '900px',
            }}
          >
            {service.name}
          </span>

          {/* Description */}
          <p
            style={{
              color: '#888888',
              fontSize: '24px',
              lineHeight: 1.5,
              maxWidth: '750px',
              marginTop: '4px',
            }}
          >
            {service.description}
          </p>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#444444',
              fontSize: '14px',
              letterSpacing: '1px',
            }}
          >
            <span>rdexa.tech/services</span>
          </div>
          <div
            style={{
              background: '#ff5500',
              color: '#ffffff',
              fontSize: '13px',
              padding: '8px 20px',
              borderRadius: '2px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            Book Free Call →
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
