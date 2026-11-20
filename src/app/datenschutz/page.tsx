import type { Metadata } from 'next'
import { ogImage } from '@/lib/seo'
import { LegalPage } from '@/components/site/LegalPage'

export const metadata: Metadata = {
  title: 'Datenschutz',
  description:
    'Datenschutzerklärung von qrcode.de: keine Cookies, kein Tracking, kein Konto. QR-Codes entstehen lokal im Browser, Ihre Eingaben werden nicht übertragen.',
  openGraph: { title: 'Datenschutz', url: '/datenschutz', images: [ogImage] },
  alternates: { canonical: '/datenschutz' },
}

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutz">
      <h2>1. Das Wichtigste in Kürze</h2>
      <p className="rounded-xl border-[1.5px] border-ink bg-sun px-4 py-3 font-semibold !text-ink">
        QR-Codes entstehen vollständig in Ihrem Browser. Ihre Eingaben werden nicht an uns übertragen. Wir setzen keine Cookies,
        keine Analyse-Tools und keine Werbung ein.
      </p>

      <h2>2. Verantwortliche Stelle</h2>
      <address>
        <p className="!mb-0 font-semibold !text-ink">Ortwin Kartmann</p>
        <p className="!mb-0">Voelckerstr. 6</p>
        <p className="!mb-0">60322 Frankfurt am Main</p>
        <p>Deutschland</p>
      </address>

      <h2>3. Ihre Eingaben im Generator und im Scanner</h2>
      <p>
        Alles, was Sie in den Generator eingeben – Adressen, Texte, WLAN-Zugangsdaten, Kontaktdaten, Bankverbindungen oder
        hochgeladene Logos – wird ausschließlich lokal in Ihrem Browser verarbeitet. Diese Daten werden weder an unsere Server
        noch an Dritte übermittelt und von uns nicht gespeichert.
      </p>
      <p>
        Dasselbe gilt für den QR-Code-Scanner: Bilder und das Kamerabild werden nur auf Ihrem Gerät ausgewertet. Der Zugriff auf
        die Kamera erfolgt erst, nachdem Sie ihn im Browser ausdrücklich erlaubt haben, und endet, sobald Sie den Scanner stoppen
        oder die Seite verlassen.
      </p>

      <h2>4. Cookies und lokaler Speicher</h2>
      <p>
        Diese Website setzt <strong>keine Cookies</strong>. Damit Sie beim nächsten Besuch mit Ihrer Gestaltung weiterarbeiten
        können, speichert Ihr Browser die gewählten Design-Einstellungen (Farben, Muster, Rahmen, ggf. Logo) im lokalen Speicher
        („Local Storage“) Ihres Geräts. Diese Informationen bleiben auf Ihrem Gerät, werden nicht an uns übertragen und lassen
        sich jederzeit über die Browser-Einstellungen oder über „Zurücksetzen“ im Generator löschen. Die Inhalte Ihrer QR-Codes
        werden dabei nicht gespeichert.
      </p>

      <h2>5. Keine Analyse-Tools, keine externen Schriften</h2>
      <p>
        Wir verwenden keine Analyse- oder Tracking-Dienste. Schriften und Skripte werden von unserer eigenen Domain ausgeliefert;
        es werden keine Inhalte von Drittanbietern wie Google Fonts nachgeladen.
      </p>

      <h2>6. Hosting</h2>
      <p>
        Diese Website wird über die Infrastruktur von Cloudflare ausgeliefert (Cloudflare, Inc., 101 Townsend St, San Francisco,
        CA 94107, USA). Beim Aufruf der Seite werden technisch notwendige Verbindungsdaten verarbeitet, die Ihr Browser automatisch
        übermittelt, insbesondere:
      </p>
      <ul>
        <li>IP-Adresse</li>
        <li>Datum und Uhrzeit der Anfrage</li>
        <li>aufgerufene Seite bzw. Datei</li>
        <li>Browsertyp, Betriebssystem und Referrer-URL</li>
      </ul>
      <p>
        Die Verarbeitung erfolgt, um die Website auszuliefern und vor Angriffen zu schützen (Art. 6 Abs. 1 lit. f DSGVO). Eine
        Zusammenführung mit anderen Datenquellen findet durch uns nicht statt.
      </p>

      <h2>7. Links zu anderen Diensten</h2>
      <p>
        Manche QR-Arten erzeugen Links zu Diensten Dritter (zum Beispiel WhatsApp, PayPal oder Google Maps). Eine Verbindung zu
        diesen Diensten entsteht erst, wenn jemand den fertigen QR-Code scannt und den Link öffnet. Es gelten dann die
        Datenschutzbestimmungen des jeweiligen Anbieters.
      </p>

      <h2>8. Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten,
        auf Widerspruch gegen die Verarbeitung sowie auf Beschwerde bei einer Datenschutz-Aufsichtsbehörde. Da wir selbst keine
        personenbezogenen Daten von Ihnen speichern, gibt es in der Regel keine Daten, über die wir Auskunft erteilen könnten.
      </p>
    </LegalPage>
  )
}
