import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { JsonLd } from '@/components/site/Faq'
import { guides } from '@/content/guides'
import { ogImage } from '@/lib/seo'

const title = 'QR-Code-Ratgeber: Wissen, Tipps & Anleitungen'
const description =
  'Ratgeber rund um QR-Codes: Druckgröße, Logo, statisch oder dynamisch, Speisekarte, Visitenkarte und Schutz vor Quishing. Klar erklärt, mit echten Zahlen.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/ratgeber' },
  openGraph: { title, description, url: '/ratgeber', type: 'website', locale: 'de_DE', siteName: 'qrcode.de', images: [ogImage] },
}

export default function GuidesPage() {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'QR-Code-Generator', item: 'https://qrcode.de' },
      { '@type': 'ListItem', position: 2, name: 'Ratgeber', item: 'https://qrcode.de/ratgeber' },
    ],
  }
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: guides.map((g, i) => ({ '@type': 'ListItem', position: i + 1, name: g.title, url: `https://qrcode.de/ratgeber/${g.slug}` })),
  }

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={itemList} />

      <section className="bg-grid border-b-[1.5px] border-ink">
        <div className="wrap pb-10 pt-8 sm:pb-12 sm:pt-12">
          <nav aria-label="Brotkrumen" className="eyebrow animate-rise">
            <Link href="/" className="hover:text-ink">
              Generator
            </Link>
            <span className="mx-2 text-signal-dark">/</span>
            <span className="text-ink">Ratgeber</span>
          </nav>
          <h1 className="mt-4 max-w-4xl animate-rise text-[40px] font-extrabold leading-[0.98] tracking-[-0.035em] [animation-delay:80ms] sm:text-[64px]">
            QR-Code-Ratgeber: <span className="marker">Wissen, das funktioniert</span>
          </h1>
          <p className="mt-5 max-w-2xl animate-rise text-[17px] leading-relaxed text-ink/75 [animation-delay:160ms] sm:text-[19px]">
            Wie groß muss der Code gedruckt werden, verträgt er ein Logo, und woran erkennst du Betrug? Antworten mit konkreten Zahlen
            statt Werbeversprechen.
          </p>
        </div>
      </section>

      <section className="wrap py-16 sm:py-20">
        <p className="eyebrow">{guides.length} Artikel</p>
        <h2 className="mb-9 mt-3 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]">Alle Ratgeber</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((g, i) => (
            <li key={g.slug}>
              <Link
                href={`/ratgeber/${g.slug}`}
                className="group flex h-full flex-col rounded-2xl border-[1.5px] border-ink bg-card p-6 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-sun hover:shadow-hard"
              >
                <span className="flex items-center justify-between">
                  <span className="font-mono text-[12px] text-signal-dark">{String(i + 1).padStart(2, '0')}</span>
                  <ArrowUpRightIcon className="h-4 w-4 text-ink/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" aria-hidden />
                </span>
                <h3 className="mt-5 text-[22px] font-extrabold leading-tight tracking-tight">{g.title}</h3>
                <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-ink/70">{g.lead}</p>
                <span className="mt-6 self-start rounded-full border-[1.5px] border-ink/25 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-ink/70">
                  {g.readMinutes} Min. Lesezeit
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
