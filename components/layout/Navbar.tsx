'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'Work', href: '/case-studies' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function handleAuditClick(e: React.MouseEvent) {
    if (isHome) {
      e.preventDefault()
      document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  const auditHref = isHome ? '#cta' : '/contact'

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1f1f1f]'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#ff5500]">
            <polygon points="10,2 18,18 2,18" fill="currentColor" />
          </svg>
          <span className="font-sans font-bold text-xl text-white tracking-tight">AutoNord.ai</span>
          <span className="text-[#ff5500] text-xs font-mono">↗</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-[#888888] hover:text-white text-sm font-mono transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex">
          <a
            href={auditHref}
            onClick={handleAuditClick}
            className="border border-[#ff5500] text-[#ff5500] px-4 py-2 text-sm font-mono hover:bg-[#ff5500] hover:text-white transition-all duration-200 rounded-sm cursor-pointer"
          >
            Book a Free Audit →
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#888888] hover:text-white transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-sans font-bold text-white hover:text-[#ff5500] transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: navLinks.length * 0.08 }}
            >
              <a
                href={auditHref}
                onClick={handleAuditClick}
                className="border border-[#ff5500] text-[#ff5500] px-6 py-3 text-lg font-mono hover:bg-[#ff5500] hover:text-white transition-all rounded-sm cursor-pointer"
              >
                Book a Free Audit →
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
