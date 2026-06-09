'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/shared/ScrollReveal'

export default function CTASection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message }),
    })

    if (res.ok) {
      setSubmitted(true)
    } else {
      const data = await res.json()
      setError(data.error || 'Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const inputClass =
    'w-full bg-[#0a0a0a] border border-[#2a2a2a] focus:border-[#ff5500] text-white font-mono text-sm px-4 py-3 rounded-sm outline-none transition-colors'

  return (
    <section
      id="cta"
      className="relative py-32 px-6 overflow-hidden border-t border-[#1f1f1f]"
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,85,0,0.07)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Heading */}
        <ScrollReveal className="text-center mb-12">
          <span className="text-[#ff5500] font-mono text-xs uppercase tracking-widest">Free Discovery Call</span>
          <h2 className="font-sans font-extrabold text-4xl md:text-5xl text-white mt-2 mb-4 leading-tight">
            Ready to Build Something
            <br />
            <span className="text-[#ff5500]">That Actually Works?</span>
          </h2>
          <p className="text-[#888888] font-mono text-sm">
            Book a free 30-minute discovery call. Tell us your challenge — software, data, or automation — and we&apos;ll map out the best path forward.
          </p>
        </ScrollReveal>

        {/* Form */}
        <ScrollReveal delay={0.1}>
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-[#ff5500]/30 bg-[#ff5500]/5 p-10 rounded-sm text-center"
            >
              <div className="text-5xl mb-4">✓</div>
              <p className="text-white font-sans font-bold text-xl mb-2">We got your message!</p>
              <p className="text-[#888888] font-mono text-sm">
                Check your inbox — we&apos;ve sent a confirmation. Expect a reply within 24 hours.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-[#111111] border border-[#1f1f1f] p-8 rounded-sm space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#888888] font-mono text-xs uppercase tracking-widest mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className={inputClass}
                    placeholder="Ola Nordmann"
                  />
                </div>
                <div>
                  <label className="block text-[#888888] font-mono text-xs uppercase tracking-widest mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={inputClass}
                    placeholder="ola@company.no"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#888888] font-mono text-xs uppercase tracking-widest mb-2">
                  What are you looking to build or solve? *{' '}
                  <span className="normal-case text-[#444444]">
                    (helps us come prepared with the right solution)
                  </span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder="Describe what you're trying to build or fix — a data pipeline, a web app, an automation, or a system integration..."
                />
              </div>

              {error && <p className="text-red-400 font-mono text-sm">{error}</p>}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#ff5500] text-white py-4 font-mono text-sm hover:bg-[#ff5500]/90 transition-all rounded-sm disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Book Free Discovery Call →'}
              </motion.button>

              <p className="text-[#444444] font-mono text-xs text-center">
                No spam. No pitch. Just a focused 30-minute conversation about your project.
              </p>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
