'use client'

import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollReveal from '@/components/shared/ScrollReveal'
import { Mail, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, company, message }),
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
    'w-full bg-[#141414] border border-[#1f1f1f] focus:border-[#ff5500] text-white font-mono text-sm px-4 py-3 rounded-sm outline-none transition-colors'

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="mb-16">
            <span className="text-[#ff5500] font-mono text-xs uppercase tracking-widest">Get In Touch</span>
            <h1 className="font-sans font-extrabold text-4xl md:text-6xl text-white mt-2 mb-4">
              Book a Free Discovery Call
            </h1>
            <p className="text-[#888888] font-mono text-base max-w-xl">
              30 minutes. No commitment. Tell us your challenge — software, data, or automation — and we&apos;ll map out the right solution and what it takes to get there.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              {submitted ? (
                <div className="border border-[#ff5500]/30 bg-[#ff5500]/5 p-8 rounded-sm text-center">
                  <div className="text-4xl mb-4">✓</div>
                  <p className="text-white font-sans font-bold text-xl mb-2">Message sent!</p>
                  <p className="text-[#888888] font-mono text-sm">
                    Check your inbox — we&apos;ve sent a confirmation. We&apos;ll reply within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
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
                  <div>
                    <label className="block text-[#888888] font-mono text-xs uppercase tracking-widest mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className={inputClass}
                      placeholder="Company AS"
                    />
                  </div>
                  <div>
                    <label className="block text-[#888888] font-mono text-xs uppercase tracking-widest mb-2">
                      What are you looking to build or solve? *{' '}
                      <span className="normal-case text-[#444444]">(helps us come prepared with the right solution)</span>
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      className={`${inputClass} resize-none`}
                      placeholder="Describe what you're trying to build or fix — a data pipeline, a web app, an automation, or a system integration..."
                    />
                  </div>

                  {error && (
                    <p className="text-red-400 font-mono text-sm">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#ff5500] text-white py-3 font-mono text-sm hover:bg-[#ff5500]/90 transition-all rounded-sm disabled:opacity-60"
                  >
                    {loading ? 'Sending...' : 'Send Message →'}
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-8">
              {[
                { icon: Mail, label: 'Email', value: 'hello@rdexa.tech' },
                { icon: MapPin, label: 'Based In', value: 'Pakistan' },
                { icon: Clock, label: 'Response Time', value: 'Within 24 hours' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="p-2 border border-[#ff5500]/20 rounded-sm bg-[#ff5500]/5 shrink-0">
                    <Icon size={18} className="text-[#ff5500]" />
                  </div>
                  <div>
                    <p className="text-white font-mono text-sm font-bold mb-1">{label}</p>
                    <p className="text-[#888888] font-mono text-sm">{value}</p>
                  </div>
                </div>
              ))}

              <div className="border-t border-[#1f1f1f] pt-8">
                <p className="text-[#444444] font-mono text-xs uppercase tracking-widest mb-4">
                  Prefer to book directly?
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 border border-[#ff5500] text-[#ff5500] px-5 py-2.5 font-mono text-sm hover:bg-[#ff5500] hover:text-white transition-all rounded-sm"
                >
                  Open Calendly →
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
