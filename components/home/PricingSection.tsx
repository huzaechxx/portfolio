'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import ScrollReveal from '@/components/shared/ScrollReveal'

const plans = [
  {
    name: 'Starter Project',
    type: 'One-time Build',
    description: 'Fixed scope, fixed price. Perfect for a single automation or workflow build.',
    features: [
      'Single automation or workflow',
      'Fixed scope & timeline',
      'Full handoff & documentation',
      '30-day post-launch support',
    ],
    cta: 'Get a Quote →',
    popular: false,
  },
  {
    name: 'Retainer',
    type: 'Monthly Ongoing',
    description: 'Dedicated hours each month for continuous improvement, new builds, and priority support.',
    features: [
      'Dedicated monthly hours',
      'Continuous improvements',
      'Priority response & support',
      'Strategy & roadmap sessions',
    ],
    cta: 'Start a Retainer →',
    popular: true,
  },
  {
    name: 'Time & Materials',
    type: 'Pay as You Go',
    description: 'Flexible scope billed by the hour. Best for R&D, uncertain projects, or experimentation.',
    features: [
      'Flexible scope & hours',
      'Weekly progress reports',
      'Stop anytime',
      'Great for exploration & R&D',
    ],
    cta: 'Explore This Option →',
    popular: false,
  },
]

export default function PricingSection() {
  return (
    <section className="py-24 px-6 border-t border-[#1f1f1f]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="mb-4">
          <span className="text-[#ff5500] font-mono text-xs uppercase tracking-widest">Pricing</span>
        </ScrollReveal>
        <ScrollReveal className="mb-4">
          <h2 className="font-sans font-bold text-3xl md:text-5xl text-white">
            Flexible Pricing —{' '}
            <span className="text-[#ff5500]">Every Budget Welcome</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal className="mb-16">
          <p className="text-[#888888] font-mono text-sm">
            We know budgets are tight — let&apos;s find what fits.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -4, borderColor: 'rgba(255,85,0,0.5)' }}
                transition={{ duration: 0.2 }}
                className={`relative bg-[#141414] border p-8 rounded-sm flex flex-col h-full transition-colors ${
                  plan.popular
                    ? 'border-[#ff5500]/50 border-t-2 border-t-[#ff5500]'
                    : 'border-[#1f1f1f]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#ff5500] text-white text-xs font-mono px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-[#ff5500] font-mono text-xs uppercase tracking-widest mb-1">
                    {plan.type}
                  </p>
                  <h3 className="font-sans font-bold text-2xl text-white">{plan.name}</h3>
                  <p className="text-[#888888] font-mono text-sm mt-3 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[#888888] font-mono text-sm">
                      <Check size={14} className="text-[#ff5500] mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`text-center py-3 font-mono text-sm transition-all duration-200 rounded-sm ${
                    plan.popular
                      ? 'bg-[#ff5500] text-white hover:bg-[#ff5500]/90'
                      : 'border border-[#ff5500] text-[#ff5500] hover:bg-[#ff5500] hover:text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
