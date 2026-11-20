import type { TypeId } from '@/lib/qr/content'
import type { FaqItem } from '@/components/site/Faq'

export interface GuideSection {
  heading: string
  paragraphs: string[]
  list?: string[]
}

export interface Guide {
  slug: string
  title: string // <title> ohne Suffix, max. 50 Zeichen (Suffix " | qrcode.de" kommt automatisch dazu)
  description: string // 120–155 Zeichen
  h1: [string, string] // [normal, hervorgehoben mit Marker]
  lead: string // 1–2 Sätze
  updated: string // '2026-11-20'
  readMinutes: number
  sections: GuideSection[]
  faqs: FaqItem[] // 3–4
  relatedTypes: TypeId[] // 2–4 passende QR-Arten
}
