import { prisma } from '@/lib/db'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import TechStackMarquee from '@/components/home/TechStackMarquee'
import ServicesSection from '@/components/home/ServicesSection'
import CaseStudiesSection from '@/components/home/CaseStudiesSection'
import GlobeSection from '@/components/home/GlobeSection'
import PricingSection from '@/components/home/PricingSection'
import CTASection from '@/components/home/CTASection'

export const revalidate = 60

export default async function HomePage() {
  let projects: Awaited<ReturnType<typeof prisma.project.findMany>> = []
  try {
    projects = await prisma.project.findMany({
      where: { published: true, featured: true },
      take: 3,
      orderBy: { createdAt: 'desc' },
    })
  } catch (e: unknown) {
    const err = e as { code?: string; meta?: unknown }
    console.error('[DB] findMany error code:', err?.code, 'meta:', JSON.stringify(err?.meta))
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TechStackMarquee />
        <ServicesSection />
        <CaseStudiesSection projects={projects} />
        <GlobeSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
