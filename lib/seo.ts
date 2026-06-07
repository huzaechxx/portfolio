import { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'

export function generateSEO({
  title,
  description,
  path = '',
  image,
}: {
  title: string
  description: string
  path?: string
  image?: string
}): Metadata {
  const url = `${siteUrl}${path}`
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { nb: url, en: url },
    },
    openGraph: {
      title,
      description,
      url,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}
