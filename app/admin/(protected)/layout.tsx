import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { LayoutDashboard, FolderOpen, PlusCircle, LogOut } from 'lucide-react'

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  return (
    <div className="flex min-h-screen bg-[#0a0a0a]">
      {/* Sidebar */}
      <aside className="w-56 border-r border-[#1f1f1f] flex flex-col">
        <div className="p-5 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-2">
            <img src="/image-removebg-preview.png" alt="Rdexa logo" width={22} height={22} style={{ objectFit: 'contain' }} />
            <span className="font-sans font-bold text-base">
              <span className="text-[#ff5500]">Rdexa</span><span className="text-[#e0e0e0]">.tech</span>
            </span>
          </div>
          <p className="text-[#444444] font-mono text-xs mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { href: '/admin/projects/new', icon: PlusCircle, label: 'New Project' },
            { href: '/case-studies', icon: FolderOpen, label: 'View Site' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-[#888888] hover:text-white hover:bg-[#141414] font-mono text-sm rounded-sm transition-all"
            >
              <item.icon size={15} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#1f1f1f]">
          <Link
            href="/api/auth/signout"
            className="flex items-center gap-3 px-3 py-2 text-[#888888] hover:text-[#ff5500] font-mono text-sm rounded-sm transition-all"
          >
            <LogOut size={15} />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
