import { PlusIcon } from '@heroicons/react/24/outline'

export interface FaqItem {
  q: string
  a: string
}

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y-[1.5px] divide-ink border-y-[1.5px] border-ink">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-display text-[19px] font-bold leading-snug marker:hidden hover:text-signal-dark sm:text-[21px] [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink bg-card transition-all duration-200 group-open:rotate-45 group-open:bg-signal">
              <PlusIcon className="h-4 w-4 stroke-2" aria-hidden />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 pr-10 text-[16px] leading-relaxed text-ink/75">{item.a}</p>
        </details>
      ))}
    </div>
  )
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.a },
    })),
  }
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />
}
