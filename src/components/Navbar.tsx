'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  { href: '/', label: 'Home' },
  { href: '/matches', label: 'Matches' },
  { href: '/teams', label: 'Teams' },
  // { href: '/channels', label: 'Channels' },
  { href: '/fixtures', label: 'Fixtures' },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-darkly border-b border-whitely/10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/logo-3.png"
              alt="matchKora logo"
              className="w-20 h-20 object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors hover:text-greenly ${isActive ? 'text-greenly' : 'text-whitely/80'
                    }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-whitely p-2"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-whitely/10">
          <div className="px-4 py-3 flex flex-col gap-2">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${isActive
                      ? 'bg-greenly/20 text-greenly'
                      : 'text-whitely/80 hover:bg-darklyLight'
                    }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </nav>
  )
}
