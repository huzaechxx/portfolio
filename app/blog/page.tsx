import { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { generateSEO } from '@/lib/seo'

export const metadata: Metadata = generateSEO({
  title: 'Blog',
  description: 'Insights on AI automation, n8n workflows, Python scripting, and building efficient systems for modern businesses.',
  path: '/blog',
})

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="mb-16">
            <span className="text-[#ff5500] font-mono text-xs uppercase tracking-widest">Insights</span>
            <h1 className="font-sans font-extrabold text-4xl md:text-6xl text-white mt-2 mb-4">Blog</h1>
            <p className="text-[#888888] font-mono text-base">
              Automation guides, AI workflow tips, and case study breakdowns. Coming soon.
            </p>
          </ScrollReveal>

          <div className="border border-[#1f1f1f] rounded-sm p-12 text-center">
            <p className="text-[#444444] font-mono text-sm">No posts published yet.</p>
            <p className="text-[#444444] font-mono text-sm mt-2">
              Subscribe to our newsletter to get notified when we publish.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
