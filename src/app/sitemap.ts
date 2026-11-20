import type { MetadataRoute } from 'next'
import { qrTypes } from '@/lib/qr/content'
import { guides } from '@/content/guides'
import { CONTENT_UPDATED, SITE } from '@/lib/seo'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  // Festes Datum statt Build-Zeit: lastmod soll sich nur ändern, wenn sich Inhalte ändern
  const lastModified = CONTENT_UPDATED
  return [
    { url: SITE, lastModified, changeFrequency: 'weekly', priority: 1 },
    ...qrTypes.map((t) => ({ url: `${SITE}/${t.slug}`, lastModified, changeFrequency: 'monthly' as const, priority: 0.8 })),
    { url: `${SITE}/qr-code-scanner`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE}/ratgeber`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    ...guides.map((g) => ({ url: `${SITE}/ratgeber/${g.slug}`, lastModified: g.updated, changeFrequency: 'monthly' as const, priority: 0.6 })),
    { url: `${SITE}/impressum`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE}/datenschutz`, lastModified, changeFrequency: 'yearly', priority: 0.2 },
  ]
}
