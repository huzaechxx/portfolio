'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import AnimatedText from '@/components/shared/AnimatedText'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 hero-grid pointer-events-none" />

      {/* Orange glow blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none">
        <div className="hero-glow w-full h-full rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,85,0,0.2)_0%,transparent_70%)] blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-[#ff5500]/30 text-[#ff5500] text-xs font-mono px-3 py-1.5 rounded-full mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500] animate-pulse" />
          Software & Data Agency
        </motion.div>

        {/* Headline line 1 */}
        <h1 className="font-sans font-extrabold text-5xl md:text-7xl lg:text-8xl uppercase leading-none tracking-tighter mb-2">
          <AnimatedText text="WE BUILD." className="text-white" delay={0.2} />
        </h1>
        {/* Headline line 2 */}
        <h1 className="font-sans font-extrabold text-5xl md:text-7xl lg:text-8xl uppercase leading-none tracking-tighter mb-8">
          <AnimatedText text="YOU SCALE." className="text-[#ff5500]" delay={0.8} />
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-[#888888] font-mono text-base md:text-lg max-w-2xl mx-auto mb-10"
        >
          Custom software, data pipelines, and AI automation built for modern businesses.
          <br className="hidden md:block" />
          Save time, cut costs, scale faster.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
            <button
              onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-[#ff5500] text-[#ff5500] px-8 py-3 font-mono text-sm hover:bg-[#ff5500] hover:text-white transition-all duration-200 rounded-sm"
            >
              Book a Free Audit →
            </button>
          </motion.div>
          <Link
            href="/case-studies"
            className="text-[#888888] hover:text-white font-mono text-sm transition-colors"
          >
            View Our Work ↓
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#444444] animate-bounce-slow"
      >
        <ChevronDown size={20} />
      </motion.div>
    </section>
  )
}
