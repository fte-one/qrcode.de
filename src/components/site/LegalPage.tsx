export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <section className="bg-grid border-b-[1.5px] border-ink">
        <div className="wrap py-12 sm:py-16">
          <p className="eyebrow">Rechtliches</p>
          <h1 className="mt-3 text-[44px] font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-[64px]">{title}</h1>
        </div>
      </section>
      <section className="wrap py-12 sm:py-16">
        <div className="prose-legal panel max-w-3xl p-6 shadow-hard sm:p-10 [&>h2:first-child]:mt-0">{children}</div>
      </section>
    </>
  )
}
