import type { Metadata } from 'next'
import Link from 'next/link'
import { Scanner } from '@/components/site/Scanner'
import { Faq, faqJsonLd, JsonLd, type FaqItem } from '@/components/site/Faq'

const title = 'QR-Code-Scanner online – Code aus Bild oder per Kamera lesen'
const description =
  'QR-Code online scannen: Bild hochladen, Screenshot einfügen oder Kamera nutzen. Zeigt den Inhalt, bevor du einem Link folgst. Kostenlos, alles bleibt auf deinem Gerät.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/qr-code-scanner' },
  openGraph: { title, description, url: '/qr-code-scanner', type: 'website', locale: 'de_DE', siteName: 'qrcode.de', images: ['/og.png'] },
}

const faqs: FaqItem[] = [
  {
    q: 'Wie lese ich einen QR-Code aus einem Screenshot?',
    a: 'Mach den Screenshot und füge ihn mit Strg + V (am Mac ⌘ + V) direkt auf dieser Seite ein – oder zieh die Bilddatei in das Feld. Der Inhalt erscheint sofort.',
  },
  {
    q: 'Wird mein Bild hochgeladen?',
    a: 'Nein. Das Bild und das Kamerabild werden ausschließlich in deinem Browser ausgewertet und nicht an uns oder Dritte übertragen.',
  },
  {
    q: 'Woran erkenne ich einen gefährlichen QR-Code?',
    a: 'Am Code selbst gar nicht – deshalb zeigen wir dir zuerst die Adresse, zu der er führt. Sei misstrauisch bei unbekannten Domains, Tippfehlern in bekannten Namen, überklebten Codes und wenn nach dem Scan sofort Zugangsdaten oder Zahlungsdaten verlangt werden.',
  },
  {
    q: 'Warum wird mein Code nicht erkannt?',
    a: 'Meist ist das Bild zu unscharf, der Code sehr klein oder stark verzerrt. Schneide das Bild enger zu, fotografiere frontal und bei gutem Licht. Sehr stark gestaltete Codes mit wenig Kontrast können ebenfalls Probleme machen.',
  },
]

export default function ScannerPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <section className="bg-grid border-b-[1.5px] border-ink">
        <div className="wrap pb-10 pt-8 sm:pb-12 sm:pt-12">
          <nav aria-label="Brotkrumen" className="eyebrow animate-rise">
            <Link href="/" className="hover:text-ink">
              Generator
            </Link>
            <span className="mx-2 text-signal-dark">/</span>
            <span className="text-ink">Scanner</span>
          </nav>
          <h1 className="mt-4 max-w-4xl animate-rise text-[40px] font-extrabold leading-[0.98] tracking-[-0.035em] [animation-delay:80ms] sm:text-[64px]">
            QR-Code-Scanner: <span className="marker">erst lesen, dann klicken</span>
          </h1>
          <p className="mt-5 max-w-2xl animate-rise text-[17px] leading-relaxed text-ink/75 [animation-delay:160ms] sm:text-[19px]">
            Sieh nach, was in einem QR-Code steckt – aus einem Bild, einem Screenshot oder live per Kamera. Ohne App, ohne Upload.
          </p>
        </div>
      </section>

      <section className="wrap py-8 sm:py-12">
        <Scanner />
      </section>

      <section className="wrap grid gap-10 pb-16 pt-6 sm:pb-24 lg:grid-cols-[340px_1fr] lg:gap-16">
        <div>
          <p className="eyebrow">Fragen &amp; Antworten</p>
          <h2 className="mt-3 text-[32px] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[44px]">Sicher scannen</h2>
          <p className="mt-5 text-[16px] leading-relaxed text-ink/70">
            Du willst selbst einen Code erstellen?{' '}
            <Link href="/" className="font-semibold underline decoration-signal decoration-2 underline-offset-4">
              Zum Generator
            </Link>
          </p>
        </div>
        <Faq items={faqs} />
      </section>
    </>
  )
}
