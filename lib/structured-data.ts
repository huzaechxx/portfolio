export function organizationSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Rdexa.tech',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: 'AI automation and integration agency for modern businesses',
    serviceType: ['AI Integration', 'Business Process Automation', 'Web Scraping', 'n8n Workflows'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'hello@rdexa.tech',
      availableLanguage: ['English'],
    },
  }
}

export function serviceSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@type': 'Organization', name: 'Rdexa.tech' },
    url,
  }
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function caseStudySchema(
  title: string,
  description: string,
  url: string,
  datePublished: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    datePublished,
    author: { '@type': 'Organization', name: 'Rdexa.tech' },
    publisher: { '@type': 'Organization', name: 'Rdexa.tech' },
  }
}
