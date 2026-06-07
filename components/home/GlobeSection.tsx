'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/shared/ScrollReveal'

const GlobeGL = dynamic(() => import('@/components/shared/GlobeGL'), { ssr: false })

export default function GlobeSection() {
  return (
    <section className="py-24 px-6 border-t border-[#1f1f1f] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <ScrollReveal>
            <span className="text-[#ff5500] font-mono text-xs uppercase tracking-widest">Always On</span>
            <h2 className="font-sans font-bold text-3xl md:text-5xl text-white mt-2 mb-6">
              24/7 Automation —{' '}
              <span className="text-[#ff5500]">Running While You Sleep</span>
            </h2>
            <p className="text-[#888888] font-mono text-sm leading-relaxed mb-6">
              Your automations run around the clock. When your team clocks out, our systems keep working — 24/7, no downtime, no missed triggers.
            </p>
            <div className="space-y-4">
              {[
                { label: 'Engineering HQ', icon: '⚙️', desc: 'Our technical team — building and maintaining your automations' },
                { label: 'Primary Market', icon: '🌍', desc: 'Serving businesses across Europe and beyond' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3 p-3 border border-[#1f1f1f] rounded-sm">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <p className="text-white font-mono text-sm font-bold">{item.label}</p>
                    <p className="text-[#888888] font-mono text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Globe */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="flex justify-center"
          >
            <div
              className="relative"
              style={{ filter: 'drop-shadow(0 0 60px rgba(255,85,0,0.15))' }}
            >
              <GlobeGL />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
