import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRightIcon, ArrowUpRightIcon } from '@heroicons/react/24/outline'
import { Faq, faqJsonLd, JsonLd } from '@/components/site/Faq'
import { typeIcons } from '@/components/generator/typeIcons'
import { guideBySlug, guides } from '@/content/guides'
import { typeById } from '@/lib/qr/content'
import { ogImage } from '@/lib/seo'

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const g = guideBySlug(params.slug)
  if (!g) return {}
  const url = `/ratgeber/${g.slug}`
  return {
    title: g.title,
    description: g.description,
    alternates: { canonical: url },
    openGraph: {
      title: g.title,
      description: g.description,
      url,
      type: 'article',
      modifiedTime: g.updated,
      locale: 'de_DE',
      siteName: 'qrcode.de',
      images: [ogImage],
    },
  }
}

/** '2026-11-20' → '20.11.2026' */
function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  return `${d}.${m}.${y}`
}

export default function GuidePage({ params }: { params: { slug: string } }) {
  const g = guideBySlug(params.slug)
  if (!g) notFound()

  const url = `https://qrcode.de/ratgeber/${g.slug}`
  const related = g.relatedTypes.map(typeById)
  const cta = related[0]
  const idx = guides.findIndex((x) => x.slug === g.slug)
  const more = [1, 2, 3].map((k) => guides[(idx + k) % guides.length]).filter((x) => x.slug !== g.slug)

  const organization = { '@type': 'Organization', name: 'qrcode.de', url: 'https://qrcode.de' }
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: g.title,
    description: g.description,
    datePublished: g.updated,
    dateModified: g.updated,
    inLanguage: 'de',
    image: 'https://qrcode.de/og.png',
    author: organization,
    publisher: { ...organization, logo: { '@type': 'ImageObject', url: 'https://qrcode.de/icon-512.png' } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'QR-Code-Generator', item: 'https://qrcode.de' },
      { '@type': 'ListItem', position: 2, name: 'Ratgeber', item: 'https://qrcode.de/ratgeber' },
      { '@type': 'ListItem', position: 3, name: g.title, item: url },
    ],
  }

  return (
    <>
      <JsonLd data={article} />
      <JsonLd data={breadcrumb} />
      <JsonLd data={faqJsonLd(g.faqs)} />

      {/* ------------------------------------------------------------ Hero */}
      <section className="bg-grid border-b-[1.5px] border-ink">
        <div className="wrap pb-10 pt-8 sm:pb-12 sm:pt-12">
          <nav aria-label="Brotkrumen" className="eyebrow animate-rise">
            <Link href="/" className="hover:text-ink">
              Generator
            </Link>
            <span className="mx-2 text-signal-dark">/</span>
            <Link href="/ratgeber" className="hover:text-ink">
              Ratgeber
            </Link>
            <span className="mx-2 text-signal-dark">/</span>
            <span className="text-ink">{g.title}</span>
          </nav>
          <h1 className="mt-4 max-w-4xl animate-rise text-[40px] font-extrabold leading-[0.98] tracking-[-0.035em] [animation-delay:80ms] sm:text-[64px]">
            {g.h1[0]} <span className="marker">{g.h1[1]}</span>
          </h1>
          <p className="mt-5 max-w-2xl animate-rise text-[17px] leading-relaxed text-ink/75 [animation-delay:160ms] sm:text-[19px]">{g.lead}</p>
          <p className="eyebrow mt-6 animate-rise !text-ink [animation-delay:240ms]">
            Stand <time dateTime={g.updated}>{formatDate(g.updated)}</time> <span className="text-signal-dark">·</span> {g.readMinutes} Min.
            Lesezeit
          </p>
        </div>
      </section>

      {/* --------------------------------------------------------- Artikel */}
      <div className="wrap grid gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
        <article className="max-w-[68ch]">
          {g.sections.map((s, i) => (
            <section key={s.heading} id={`abschnitt-${i + 1}`} className={i > 0 ? 'mt-12' : ''}>
              <h2 className="flex items-baseline gap-3 border-t-[1.5px] border-ink pt-4 text-[26px] font-extrabold leading-[1.1] tracking-[-0.025em] sm:text-[30px]">
                <span className="font-mono text-[12px] font-medium tracking-normal text-signal-dark">{String(i + 1).padStart(2, '0')}</span>
                {s.heading}
              </h2>
              {s.paragraphs.map((p) => (
                <p key={p} className="mt-4 text-[17px] leading-relaxed text-ink/80">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-5 space-y-3">
                  {s.list.map((item) => (
                    <li key={item} className="flex gap-3.5 text-[17px] leading-relaxed text-ink/80">
                      <span className="mt-[10px] h-2.5 w-2.5 shrink-0 rounded-[3px] bg-signal" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* CTA */}
          <div className="relative mt-14 overflow-hidden rounded-3xl border-[1.5px] border-ink bg-signal px-6 py-10 shadow-hard-lg sm:px-10 sm:py-12">
            <div className="pointer-events-none absolute -bottom-14 -right-10 h-52 w-52 rounded-[56px] border-[28px] border-ink/10" />
            <p className="eyebrow relative !text-ink">Kostenlos · ohne Anmeldung · ohne Ablaufdatum</p>
            <h2 className="relative mt-3 max-w-xl text-[30px] font-extrabold leading-[1.02] tracking-[-0.03em] sm:text-[40px]">Jetzt QR-Code erstellen</h2>
            <p className="relative mt-3 max-w-lg text-[16px] leading-relaxed text-ink/80">
              Inhalt eingeben, gestalten, als PNG oder SVG laden. Der Code entsteht in deinem Browser, der Scan-Test prüft ihn nach jeder
              Änderung.
            </p>
            <div className="relative mt-7 flex flex-wrap gap-3">
              <Link href={`/${cta.slug}`} className="btn bg-ink !px-6 !py-4 !text-[16px] text-paper shadow-[4px_4px_0_0_#fffdf8] hover:bg-ink/90">
                {cta.label}-QR-Code erstellen
                <ArrowRightIcon className="h-5 w-5 stroke-2" aria-hidden />
              </Link>
              <Link href="/" className="btn btn-ghost !px-6 !py-4 !text-[16px]">
                Alle Arten
              </Link>
            </div>
          </div>
        </article>

        {/* Seitenleiste */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <nav aria-label="Inhalt" className="panel p-5">
            <p className="eyebrow">Auf dieser Seite</p>
            <ol className="mt-4 space-y-2.5">
              {g.sections.map((s, i) => (
                <li key={s.heading}>
                  <a href={`#abschnitt-${i + 1}`} className="flex gap-2.5 text-[14.5px] font-semibold leading-snug text-ink/75 hover:text-signal-dark">
                    <span className="mt-[3px] font-mono text-[11px] font-medium text-signal-dark">{String(i + 1).padStart(2, '0')}</span>
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
      </div>

      {/* ------------------------------------------------------------- FAQ */}
      <section className="border-t-[1.5px] border-ink">
        <div className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-[340px_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">Fragen &amp; Antworten</p>
            <h2 className="mt-3 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]">Häufig gefragt</h2>
          </div>
          <Faq items={g.faqs} />
        </div>
      </section>

      {/* ------------------------------------------------- Weiterführendes */}
      <section className="border-t-[1.5px] border-ink bg-card/60">
        <div className="wrap grid gap-14 py-16 sm:py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="eyebrow">Direkt loslegen</p>
            <h2 className="mb-7 mt-3 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]">Passende QR-Arten</h2>
            <ul className="grid grid-cols-2 gap-3">
              {related.map((t) => {
                const Icon = typeIcons[t.id]
                return (
                  <li key={t.id}>
                    <Link
                      href={`/${t.slug}`}
                      className="group flex h-full flex-col rounded-2xl border-[1.5px] border-ink bg-card p-4 transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-sun hover:shadow-hard"
                    >
                      <span className="flex items-center justify-between">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border-[1.5px] border-ink bg-paper group-hover:bg-card">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <ArrowUpRightIcon className="h-4 w-4 text-ink/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" aria-hidden />
                      </span>
                      <span className="mt-4 font-display text-[19px] font-bold leading-tight">{t.label}</span>
                      <span className="mt-1 text-[13.5px] leading-snug text-ink/65">{t.blurb}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {more.length > 0 && (
            <div>
              <p className="eyebrow">Mehr Wissen</p>
              <h2 className="mb-7 mt-3 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]">Weitere Ratgeber</h2>
              <ul className="divide-y-[1.5px] divide-ink border-y-[1.5px] border-ink">
                {more.map((m) => (
                  <li key={m.slug}>
                    <Link href={`/ratgeber/${m.slug}`} className="group flex items-start justify-between gap-6 py-5">
                      <span>
                        <span className="block font-display text-[19px] font-bold leading-snug group-hover:text-signal-dark sm:text-[21px]">{m.title}</span>
                        <span className="mt-1.5 block text-[14.5px] leading-relaxed text-ink/65">{m.lead}</span>
                        <span className="mt-2 block font-mono text-[10.5px] uppercase tracking-wider text-muted">{m.readMinutes} Min. Lesezeit</span>
                      </span>
                      <ArrowUpRightIcon className="mt-1 h-5 w-5 shrink-0 text-ink/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" aria-hidden />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/ratgeber" className="mt-6 inline-block text-[15px] font-semibold underline decoration-signal decoration-2 underline-offset-4">
                Alle Ratgeber ansehen
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
