import { MetadataRoute } from 'next'
import { prisma } from '@/lib/db'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

const serviceSlugs = [
  'n8n-workflow-automation',
  'ai-integration-agents',
  'python-selenium-automation',
  'web-scraping-data-pipelines',
  'custom-api-integrations',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await prisma.project.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  })

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/case-studies`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${siteUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${siteUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${siteUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const projectPages: MetadataRoute.Sitemap = projects.map((p: { slug: string; updatedAt: Date }) => ({
    url: `${siteUrl}/case-studies/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...servicePages, ...projectPages]
}
