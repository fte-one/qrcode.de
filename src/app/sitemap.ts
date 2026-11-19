import type { MetadataRoute } from 'next'
import { qrTypes } from '@/lib/qr/content'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const base = 'https://qrcode.de'
  return [
    { url: base, lastModified, changeFrequency: 'weekly', priority: 1 },
    ...qrTypes.map((t) => ({ url: `${base}/${t.slug}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.8 })),
    { url: `${base}/qr-code-scanner`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/impressum`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/datenschutz`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
