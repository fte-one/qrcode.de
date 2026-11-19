'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Logo } from './Logo'

const nav = [
  { href: '/#arten', label: 'QR-Arten' },
  { href: '/#drucken', label: 'Druck-Ratgeber' },
  { href: '/qr-code-scanner', label: 'Scanner' },
  { href: '/#faq', label: 'Fragen' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-50 border-b-[1.5px] border-ink bg-paper/90 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between">
        <Logo />

        <nav aria-label="Hauptnavigation" className="hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-[15px] font-semibold text-ink/75 decoration-signal decoration-2 underline-offset-[6px] hover:text-ink hover:underline"
            >
              {n.label}
            </Link>
          ))}
          <Link href="/#generator" className="btn btn-primary !px-4 !py-2.5 !text-[14px] !shadow-hard-sm">
            Code erstellen
          </Link>
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          onClick={() => setOpen(!open)}
        >
          {open ? <XMarkIcon className="h-7 w-7" /> : <Bars2Icon className="h-7 w-7" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Hauptnavigation" className="border-t-[1.5px] border-ink bg-paper md:hidden">
          <div className="wrap flex flex-col py-2">
            {[{ href: '/#generator', label: 'Generator' }, ...nav].map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="border-b border-ink/10 py-3.5 font-display text-[19px] font-bold last:border-0"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
