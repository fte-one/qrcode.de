import Link from 'next/link'
import { qrTypes } from '@/lib/qr/content'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="wrap py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.3fr_2fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-paper/60">
              Der QR-Code-Generator ohne Haken: kostenlos, ohne Konto, ohne Ablaufdatum. Deine Eingaben bleiben auf deinem Gerät.
            </p>
          </div>

          <div>
            <h2 className="eyebrow !text-paper/50">QR-Arten</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 text-[15px] sm:grid-cols-3">
              {qrTypes.map((t) => (
                <li key={t.id}>
                  <Link href={`/${t.slug}`} className="text-paper/80 hover:text-signal">
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow !text-paper/50">Werkzeuge</h2>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              <li><Link href="/#generator" className="text-paper/80 hover:text-signal">Generator</Link></li>
              <li><Link href="/qr-code-scanner" className="text-paper/80 hover:text-signal">QR-Code-Scanner</Link></li>
              <li><Link href="/#drucken" className="text-paper/80 hover:text-signal">Druck-Ratgeber</Link></li>
              <li><Link href="/#faq" className="text-paper/80 hover:text-signal">Fragen &amp; Antworten</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow !text-paper/50">Rechtliches</h2>
            <ul className="mt-4 space-y-2.5 text-[15px]">
              <li><Link href="/impressum" className="text-paper/80 hover:text-signal">Impressum</Link></li>
              <li><Link href="/datenschutz" className="text-paper/80 hover:text-signal">Datenschutz</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-paper/15 pt-6 font-mono text-[11.5px] uppercase tracking-wider text-paper/45 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} qrcode.de · Frankfurt am Main</p>
          <p>„QR Code“ ist eine eingetragene Marke der DENSO WAVE INCORPORATED.</p>
        </div>
      </div>
    </footer>
  )
}
