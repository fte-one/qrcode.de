import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/site/Header'
import { Footer } from '@/components/site/Footer'
import { ogImage } from '@/lib/seo'

// Schriften werden beim Build geladen und von qrcode.de selbst ausgeliefert – kein Aufruf bei Google
const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
const sans = Instrument_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap', weight: ['400', '500', '700'], preload: false })

const title = 'QR-Code-Generator kostenlos – ohne Anmeldung'
const description =
  'QR-Code erstellen in Sekunden: Link, WLAN, vCard, GiroCode und mehr. Mit Logo und Farben, als PNG oder SVG. Kostenlos, ohne Anmeldung, ohne Ablaufdatum.'

export const metadata: Metadata = {
  metadataBase: new URL('https://qrcode.de'),
  title: { default: `${title} | qrcode.de`, template: '%s | qrcode.de' },
  description,
  applicationName: 'qrcode.de',
  authors: [{ name: 'qrcode.de' }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'de_DE',
    url: 'https://qrcode.de',
    siteName: 'qrcode.de',
    images: [ogImage],
  },
  // Titel/Beschreibung bewusst nicht gesetzt: X/Twitter fällt dann je Seite auf die Open-Graph-Angaben zurück
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  formatDetection: { telephone: false, email: false, address: false },
}

export const viewport: Viewport = {
  themeColor: '#f3efe6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a href="#inhalt" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
          Zum Inhalt springen
        </a>
        <Header />
        <main id="inhalt" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
