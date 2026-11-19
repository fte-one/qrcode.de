import Link from 'next/link'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import { Generator } from '@/components/generator/Generator'
import { TypeGrid } from '@/components/site/TypeGrid'
import { PrintCalculator } from '@/components/site/PrintCalculator'
import { Faq, faqJsonLd, JsonLd } from '@/components/site/Faq'
import { homeFaqs } from '@/content/landing'
import { qrTypes } from '@/lib/qr/content'

const promises: [string, string, string][] = [
  [
    'Läuft nie ab',
    'Dein Inhalt steckt direkt im Muster, nicht hinter einer Weiterleitung. Es gibt nichts, das jemand abschalten oder hinter eine Bezahlschranke stellen könnte – auch wir nicht.',
    'statisch',
  ],
  [
    'Bleibt bei dir',
    'Der Code wird in deinem Browser berechnet. WLAN-Passwort, Kontaktdaten oder IBAN verlassen dein Gerät nicht. Keine Cookies, kein Tracking, kein Konto.',
    'lokal',
  ],
  [
    'Geprüft statt gehofft',
    'Nach jeder Änderung lesen wir deinen fertigen Code mit einem echten Decoder zurück. Du siehst sofort, ob dein Design noch scannbar ist.',
    'scan-test',
  ],
  [
    'Druckreif',
    'SVG-Vektor für Druckerei, Schilder und Fahrzeuge, PNG bis 4096 Pixel. Ohne Wasserzeichen, frei für private und kommerzielle Nutzung.',
    'svg · png',
  ],
]

const rules: [string, string][] = [
  ['Abstand ÷ 10', 'So groß sollte die Kante mindestens sein. Aus 3 m Entfernung also 30 cm.'],
  ['Nie unter 2 cm', 'Kleiner schaffen viele Handykameras nicht mehr zuverlässig – vor allem bei viel Inhalt.'],
  ['Rand lassen', 'Die helle Ruhezone um den Code gehört dazu. Unsere Downloads enthalten sie bereits – nicht abschneiden.'],
  ['Dunkel auf hell', 'Kräftiger Kontrast ist wichtiger als jede Farbe. Pastell auf Weiß oder Hell auf Dunkel fällt oft durch.'],
  ['Matt statt glänzend', 'Spiegelungen auf Hochglanz, Folie oder hinter Glas machen Kameras blind.'],
  ['Vektor für den Druck', 'SVG bleibt in jeder Größe scharf. Und: vor der Auflage einen Probedruck scannen.'],
]

const appJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'qrcode.de – QR-Code-Generator',
  url: 'https://qrcode.de',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Alle (Browser)',
  inLanguage: 'de',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
  description:
    'Kostenloser QR-Code-Generator für Link, WLAN, vCard, GiroCode und mehr. Mit Logo, Farben und Rahmen, Export als PNG und SVG. Ohne Anmeldung, statische Codes ohne Ablaufdatum.',
  featureList: qrTypes.map((t) => `${t.label}-QR-Code`),
}

export default function Home() {
  return (
    <>
      <JsonLd data={appJsonLd} />
      <JsonLd data={faqJsonLd(homeFaqs)} />

      {/* ------------------------------------------------------------ Hero */}
      <section className="bg-grid relative overflow-hidden border-b-[1.5px] border-ink">
        <div className="pointer-events-none absolute -right-24 -top-24 hidden h-[340px] w-[340px] rotate-12 rounded-[90px] border-[44px] border-ink/[0.06] lg:block" />
        <div className="wrap relative pb-8 pt-8 sm:pb-10 sm:pt-11">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="eyebrow animate-rise !text-ink">
                Kostenlos <span className="text-signal-dark">·</span> ohne Anmeldung <span className="text-signal-dark">·</span> ohne Ablaufdatum
              </p>
              <h1 className="mt-4 animate-rise text-[44px] font-extrabold leading-[0.95] tracking-[-0.035em] [animation-delay:80ms] sm:text-[64px] lg:text-[76px]">
                QR-Code-Generator.
                <br />
                <span className="marker">Ohne Haken.</span>
              </h1>
              <p className="mt-5 max-w-xl animate-rise text-[17px] leading-relaxed text-ink/75 [animation-delay:160ms] sm:text-[19px]">
                Link, WLAN, Visitenkarte oder GiroCode: eintippen, gestalten, herunterladen. Kein Konto, kein Abo – und dein Code
                funktioniert auch in zehn Jahren noch.
              </p>
            </div>

            <ul className="flex animate-rise gap-3 [animation-delay:260ms] lg:pb-2" aria-label="Auf einen Blick">
              {[
                ['0 €', 'für immer', '-rotate-3 bg-card'],
                ['0', 'Daten an uns', 'rotate-2 bg-sun'],
                ['∞', 'Scans', '-rotate-1 bg-signal'],
              ].map(([big, small, cls]) => (
                <li key={small} className={`flex h-[92px] w-[92px] flex-col items-center justify-center rounded-2xl border-[1.5px] border-ink shadow-hard-sm sm:h-[108px] sm:w-[108px] ${cls}`}>
                  <span className="font-display text-[30px] font-extrabold leading-none sm:text-[36px]">{big}</span>
                  <span className="mt-1.5 font-mono text-[9.5px] uppercase tracking-wider sm:text-[10.5px]">{small}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Generator */}
      <section id="generator" className="wrap py-7 sm:py-10">
        <h2 className="sr-only">QR-Code erstellen</h2>
        <Generator />
      </section>

      {/* ----------------------------------------------------- Versprechen */}
      <section className="border-y-[1.5px] border-ink bg-ink text-paper">
        <div className="wrap py-16 sm:py-24">
          <p className="eyebrow !text-signal">Warum qrcode.de</p>
          <h2 className="mt-3 max-w-3xl text-[36px] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[56px]">
            Viele „Gratis“-Generatoren kassieren später. Wir nicht.
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-paper/65">
            Das Muster kennt fast jeder: Code erstellt, Flyer gedruckt – und nach zwei Wochen führt der Scan auf eine Abo-Seite.
            Das liegt an dynamischen Codes, die über fremde Server umleiten. Bei uns gibt es diese Umleitung nicht.
          </p>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-paper/20 bg-paper/20 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map(([head, text, tag], i) => (
              <li key={head} className="flex flex-col bg-ink p-6 sm:p-7">
                <span className="font-mono text-[12px] text-signal">0{i + 1}</span>
                <h3 className="mt-6 text-[26px] font-extrabold leading-tight tracking-tight">{head}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-paper/65">{text}</p>
                <span className="mt-6 self-start rounded-full border border-paper/25 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-paper/70">
                  {tag}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ----------------------------------------------------------- Arten */}
      <section id="arten" className="wrap py-16 sm:py-24">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">{qrTypes.length} Arten</p>
            <h2 className="mt-3 text-[36px] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[56px]">
              Ein Code für <span className="marker">jeden Zweck</span>
            </h2>
          </div>
          <p className="max-w-sm text-[16px] leading-relaxed text-ink/70">
            Jede Art hat ihre eigene Seite mit Anleitung, Tipps und Antworten auf die häufigsten Fragen.
          </p>
        </div>
        <TypeGrid />
      </section>

      {/* --------------------------------------------------------- Drucken */}
      <section id="drucken" className="bg-grid border-y-[1.5px] border-ink">
        <div className="wrap grid gap-12 py-16 sm:py-24 lg:grid-cols-[1fr_520px] lg:gap-16">
          <div>
            <p className="eyebrow">Druck-Ratgeber</p>
            <h2 className="mt-3 text-[36px] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[56px]">
              Damit er auch an der Wand funktioniert
            </h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink/75">
              Die meisten QR-Codes scheitern nicht am Generator, sondern am Druck: zu klein, zu blass, zu glänzend. Sechs Regeln, die
              das verhindern.
            </p>
            <dl className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {rules.map(([head, text], i) => (
                <div key={head} className="border-t-[1.5px] border-ink pt-3.5">
                  <dt className="flex items-baseline gap-2.5 font-display text-[20px] font-bold">
                    <span className="font-mono text-[11px] font-medium text-signal-dark">{String(i + 1).padStart(2, '0')}</span>
                    {head}
                  </dt>
                  <dd className="mt-1.5 text-[15px] leading-relaxed text-ink/70">{text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            <PrintCalculator />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- FAQ */}
      <section id="faq" className="wrap py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[340px_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">Fragen &amp; Antworten</p>
            <h2 className="mt-3 text-[36px] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[48px]">Gut zu wissen</h2>
            <p className="mt-5 text-[16px] leading-relaxed text-ink/70">
              Einen fremden Code prüfen, bevor du ihm folgst? Dafür gibt es den{' '}
              <Link href="/qr-code-scanner" className="font-semibold underline decoration-signal decoration-2 underline-offset-4">
                QR-Code-Scanner
              </Link>
              .
            </p>
          </div>
          <Faq items={homeFaqs} />
        </div>
      </section>

      {/* ------------------------------------------------------------- CTA */}
      <section className="wrap pb-16 sm:pb-24">
        <div className="relative overflow-hidden rounded-3xl border-[1.5px] border-ink bg-signal px-6 py-12 shadow-hard-lg sm:px-14 sm:py-16">
          <div className="pointer-events-none absolute -bottom-16 -right-10 h-64 w-64 rounded-[64px] border-[34px] border-ink/10" />
          <h2 className="relative max-w-2xl text-[36px] font-extrabold leading-[1.0] tracking-[-0.03em] sm:text-[56px]">
            In einer Minute zum fertigen Code.
          </h2>
          <Link href="#generator" className="btn relative mt-8 bg-ink !px-6 !py-4 !text-[16px] text-paper shadow-[4px_4px_0_0_#fffdf8] hover:bg-ink/90">
            <ArrowDownIcon className="h-5 w-5 -rotate-180 stroke-2" aria-hidden />
            Zum Generator
          </Link>
        </div>
      </section>
    </>
  )
}
