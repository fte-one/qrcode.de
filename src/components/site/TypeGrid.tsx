import Link from 'next/link'
import { ArrowUpRightIcon, QrCodeIcon, PrinterIcon, Squares2X2Icon } from '@heroicons/react/24/outline'
import { qrTypes, type TypeId } from '@/lib/qr/content'
import { typeIcons } from '@/components/generator/typeIcons'

export function TypeGrid({ exclude }: { exclude?: TypeId }) {
  const tiles = [
    ...qrTypes.filter((t) => t.id !== exclude).map((t) => ({ key: t.id, href: `/${t.slug}`, label: t.label, blurb: t.blurb, Icon: typeIcons[t.id] })),
    { key: 'scanner', href: '/qr-code-scanner', label: 'Scanner', blurb: 'Fremden Code prüfen, bevor du klickst', Icon: QrCodeIcon },
    { key: 'druck', href: '/ratgeber', label: 'Ratgeber', blurb: 'Druckgröße, Logo, Sicherheit & mehr', Icon: PrinterIcon },
    ...(exclude ? [{ key: 'home', href: '/', label: 'Alle Arten', blurb: 'Zurück zur Übersicht', Icon: Squares2X2Icon }] : []),
  ]
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {tiles.map((t) => {
          const Icon = t.Icon
          return (
            <li key={t.key}>
              <Link
                href={t.href}
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
  )
}
