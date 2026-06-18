import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { organizationSchema } from '@/lib/structured-data'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'),
  title: {
    default: 'Rdexa.tech — Software & Data Agency',
    template: '%s | Rdexa.tech',
  },
  description:
    'Custom software, data pipelines, and AI automation built for modern businesses. Save time, cut costs, scale faster.',
  keywords: [
    'software development agency',
    'data engineering agency',
    'AI automation agency',
    'ETL pipeline development',
    'Power BI dashboard development',
    'web app development agency',
    'workflow automation',
    'AI integration agency',
  ],
  authors: [{ name: 'Rdexa.tech' }],
  creator: 'Rdexa.tech',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Rdexa.tech',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Rdexa.tech — Software & Data Agency' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rdexatech',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: '/image-removebg-preview.png',
    apple: '/image-removebg-preview.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  const orgSchema = organizationSchema()

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="alternate" hrefLang="en" href={siteUrl} />
        <link rel="alternate" hrefLang="nb" href={siteUrl} />
        <link rel="alternate" hrefLang="x-default" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="bg-[#0a0a0a] text-[#f5f5f5] font-mono antialiased">
        {children}
      </body>
    </html>
  )
}
