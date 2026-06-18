import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[#ff5500]/30 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src="/image-removebg-preview.png" alt="Rdexa logo" width={28} height={28} className="object-contain" />
              <span className="font-sans font-bold text-lg">
                <span className="text-[#ff5500]">Rdexa</span><span className="text-[#e0e0e0]">.tech</span>
              </span>
            </div>
            <p className="text-[#888888] text-sm font-mono leading-relaxed max-w-xs">
              Custom software, data pipelines, and AI automation built for modern businesses. We build so you can scale.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-mono text-sm uppercase tracking-widest mb-4">Navigation</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Services', href: '/#services' },
                { label: 'Case Studies', href: '/case-studies' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#888888] hover:text-[#ff5500] text-sm font-mono transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-mono text-sm uppercase tracking-widest mb-4">Contact</h3>
            <div className="space-y-3 text-sm font-mono text-[#888888]">
              <p>hello@rdexa.tech</p>
              <p>Based in Pakistan</p>
              <div className="flex gap-4 mt-4">
                <a href="#" aria-label="LinkedIn" className="text-[#888888] hover:text-[#ff5500] font-mono text-xs transition-colors">
                  LinkedIn ↗
                </a>
                <a href="#" aria-label="GitHub" className="text-[#888888] hover:text-[#ff5500] font-mono text-xs transition-colors">
                  GitHub ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1f1f1f] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#444444] text-sm font-mono">© 2025 Rdexa.tech. All rights reserved.</p>
          <p className="text-[#444444] text-sm font-mono">Software & Data Agency</p>
        </div>
      </div>
    </footer>
  )
}
