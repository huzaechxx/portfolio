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
    default: 'AutoNord.ai — AI Automation Agency',
    template: '%s | AutoNord.ai',
  },
  description:
    'We build n8n workflows, Python automations, web scrapers, and AI integrations for businesses. Save time, cut costs, scale faster.',
  keywords: [
    'AI automation agency',
    'n8n workflow automation',
    'Python automation agency',
    'business process automation',
    'AI integration agency',
    'workflow automation',
    'AI agency',
  ],
  authors: [{ name: 'AutoNord.ai' }],
  creator: 'AutoNord.ai',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'nb_NO',
    siteName: 'AutoNord.ai',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@autonordai',
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
