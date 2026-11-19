import Link from 'next/link'

export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 70 70" className={className} aria-hidden>
      <path
        fillRule="evenodd"
        fill="currentColor"
        d="M22 0H48A22 22 0 0 1 70 22V48A22 22 0 0 1 48 70H22A22 22 0 0 1 0 48V22A22 22 0 0 1 22 0ZM23 11H47A12 12 0 0 1 59 23V47A12 12 0 0 1 47 59H23A12 12 0 0 1 11 47V23A12 12 0 0 1 23 11Z"
      />
      <rect x="21" y="21" width="28" height="28" rx="9" fill="#ff5a2b" />
    </svg>
  )
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" aria-label="qrcode.de – Startseite" className={`group inline-flex items-center gap-2.5 ${light ? 'text-paper' : 'text-ink'}`}>
      <LogoMark className="h-8 w-8 transition-transform duration-300 group-hover:rotate-90" />
      <span className="font-display text-[22px] font-extrabold leading-none tracking-tight">
        qrcode<span className="text-signal">.de</span>
      </span>
    </Link>
  )
}
