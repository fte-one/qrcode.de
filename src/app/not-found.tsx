import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="bg-grid">
      <div className="wrap flex min-h-[60vh] flex-col items-start justify-center py-20">
        <p className="eyebrow">Fehler 404</p>
        <h1 className="mt-4 text-[52px] font-extrabold leading-[0.95] tracking-[-0.035em] sm:text-[84px]">
          Hier gibt’s <span className="marker">nichts zu scannen.</span>
        </h1>
        <p className="mt-6 max-w-lg text-[18px] leading-relaxed text-ink/75">Die Seite existiert nicht oder ist umgezogen. Der Generator ist aber nur einen Klick entfernt.</p>
        <Link href="/" className="btn btn-primary mt-8">
          Zum QR-Code-Generator
        </Link>
      </div>
    </section>
  )
}
