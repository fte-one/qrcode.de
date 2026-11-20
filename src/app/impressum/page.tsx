import type { Metadata } from 'next'
import { COMPANY } from '@/lib/company'
import { ogImage } from '@/lib/seo'
import { LegalPage } from '@/components/site/LegalPage'

export const metadata: Metadata = {
  title: 'Impressum',
  description:
    'Impressum von qrcode.de: Anbieter ist FTE.ONE c/o OK Venture GmbH, Frankfurt am Main. Kontakt, Handelsregister und Verantwortliche des QR-Code-Generators.',
  openGraph: { title: 'Impressum', url: '/impressum', images: [ogImage] },
  alternates: { canonical: '/impressum' },
}

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 DDG</h2>
      <address>
        <p className="!mb-0 font-semibold !text-ink">{COMPANY.legalLine}</p>
        <p className="!mb-0">{COMPANY.street}</p>
        <p className="!mb-0">{COMPANY.city}</p>
        <p>{COMPANY.country}</p>
      </address>

      <h2>Vertreten durch</h2>
      <p>Geschäftsführer: {COMPANY.managingDirector}</p>

      <h2>Kontakt</h2>
      <p>
        Telefon: <a href={`tel:${COMPANY.phoneHref}`}>{COMPANY.phone}</a>
        <br />
        E-Mail: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
      </p>

      <h2>Handelsregister</h2>
      <p>
        Registergericht: {COMPANY.registerCourt}
        <br />
        Registernummer: {COMPANY.registerNumber}
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>{COMPANY.managingDirector} (Anschrift wie oben)</p>

      <p>
        qrcode.de ist ein Projekt von{' '}
        <a href={COMPANY.url} target="_blank" rel="noopener">
          FTE.ONE
        </a>
        .
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
        verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte
        fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>
      <p>
        Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon
        unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
        möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir
        für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
        Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
        Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
      </p>

      <h2>Erstellte QR-Codes</h2>
      <p>
        Die mit qrcode.de erzeugten QR-Codes werden ausschließlich im Browser der Nutzerinnen und Nutzer erstellt. Für die darin
        hinterlegten Inhalte und deren Verwendung sind allein die jeweiligen Erstellerinnen und Ersteller verantwortlich. Bitte
        prüfen Sie jeden Code vor dem Druck oder der Veröffentlichung auf Lesbarkeit und Richtigkeit.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die
        Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
        der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Die von Ihnen mit dem Generator erstellten QR-Codes
        dürfen Sie frei verwenden – privat wie kommerziell.
      </p>
      <p>„QR Code“ ist eine eingetragene Marke der DENSO WAVE INCORPORATED.</p>
    </LegalPage>
  )
}
