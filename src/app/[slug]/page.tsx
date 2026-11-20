import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Generator } from '@/components/generator/Generator'
import { TypeGrid } from '@/components/site/TypeGrid'
import { Faq, faqJsonLd, JsonLd } from '@/components/site/Faq'
import { landing } from '@/content/landing'
import { guides } from '@/content/guides'
import { qrTypes, typeBySlug, typeName } from '@/lib/qr/content'
import { ogImage } from '@/lib/seo'

export function generateStaticParams() {
  return qrTypes.map((t) => ({ slug: t.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const type = typeBySlug(params.slug)
  if (!type) return {}
  const c = landing[type.id]
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: `/${type.slug}` },
    openGraph: { title: c.title, description: c.description, url: `/${type.slug}`, type: 'website', locale: 'de_DE', siteName: 'qrcode.de', images: [ogImage] },
  }
}

export default function TypePage({ params }: { params: { slug: string } }) {
  const type = typeBySlug(params.slug)
  if (!type) notFound()
  const c = landing[type.id]
  const related = guides.filter((g) => g.relatedTypes.includes(type.id)).slice(0, 4)

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'QR-Code-Generator', item: 'https://qrcode.de' },
      { '@type': 'ListItem', position: 2, name: typeName(type), item: `https://qrcode.de/${type.slug}` },
    ],
  }
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: c.title,
    step: c.steps.map(([name, text], i) => ({ '@type': 'HowToStep', position: i + 1, name, text })),
  }

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={howTo} />
      <JsonLd data={faqJsonLd(c.faqs)} />

      <section className="bg-grid border-b-[1.5px] border-ink">
        <div className="wrap pb-10 pt-8 sm:pb-12 sm:pt-12">
          <nav aria-label="Brotkrumen" className="eyebrow animate-rise">
            <Link href="/" className="hover:text-ink">
              Generator
            </Link>
            <span className="mx-2 text-signal-dark">/</span>
            <span className="text-ink">{type.label}</span>
          </nav>
          <h1 className="mt-4 max-w-4xl animate-rise text-[40px] font-extrabold leading-[0.98] tracking-[-0.035em] [animation-delay:80ms] sm:text-[64px]">
            {c.h1[0]} <span className="marker">{c.h1[1]}</span>
          </h1>
          <p className="mt-5 max-w-2xl animate-rise text-[17px] leading-relaxed text-ink/75 [animation-delay:160ms] sm:text-[19px]">{c.lead}</p>
        </div>
      </section>

      <section id="generator" className="wrap py-8 sm:py-12">
        <h2 className="sr-only">{typeName(type)} erstellen</h2>
        <Generator initialType={type.id} />
      </section>

      <section className="border-y-[1.5px] border-ink bg-ink text-paper">
        <div className="wrap py-16 sm:py-20">
          <p className="eyebrow !text-signal">So geht’s</p>
          <h2 className="mt-3 text-[32px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[44px]">In drei Schritten fertig</h2>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-paper/20 bg-paper/20 md:grid-cols-3">
            {c.steps.map(([head, text], i) => (
              <li key={head} className="bg-ink p-6 sm:p-7">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-signal font-mono text-[13px] font-bold text-ink">{i + 1}</span>
                <h3 className="mt-5 text-[22px] font-extrabold leading-tight tracking-tight">{head}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-paper/65">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <p className="eyebrow">Tipps aus der Praxis</p>
          <h2 className="mt-3 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]">Darauf kommt es an</h2>
          <ul className="mt-7 space-y-4">
            {c.tips.map((tip) => (
              <li key={tip} className="flex gap-3.5 text-[16px] leading-relaxed text-ink/80">
                <span className="mt-[9px] h-2.5 w-2.5 shrink-0 rounded-[3px] bg-signal" aria-hidden />
                {tip}
              </li>
            ))}
          </ul>
          {related.length > 0 && (
            <div className="mt-9 border-t-[1.5px] border-ink pt-4">
              <p className="eyebrow">Zum Weiterlesen</p>
              <ul className="mt-3 space-y-2">
                {related.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/ratgeber/${g.slug}`} className="font-semibold underline decoration-signal decoration-2 underline-offset-4 hover:text-signal-dark">
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="mt-8 text-[15px] leading-relaxed text-ink/70">
            Wie groß der Code gedruckt werden muss, verrät der{' '}
            <Link href="/#drucken" className="font-semibold underline decoration-signal decoration-2 underline-offset-4">
              Druck-Ratgeber mit Größenrechner
            </Link>
            .
          </p>
        </div>
        <div>
          <p className="eyebrow">Fragen &amp; Antworten</p>
          <h2 className="mb-7 mt-3 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]">Häufig gefragt</h2>
          <Faq items={c.faqs} />
        </div>
      </section>

      <section className="border-t-[1.5px] border-ink bg-card/60">
        <div className="wrap py-16 sm:py-20">
          <p className="eyebrow">Mehr davon</p>
          <h2 className="mb-9 mt-3 text-[30px] font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-[38px]">Weitere QR-Arten</h2>
          <TypeGrid exclude={type.id} />
        </div>
      </section>
    </>
  )
}
