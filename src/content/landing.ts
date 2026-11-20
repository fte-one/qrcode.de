import type { TypeId } from '@/lib/qr/content'
import type { FaqItem } from '@/components/site/Faq'

export interface Landing {
  /** <title>, ohne „| qrcode.de“ */
  title: string
  description: string
  h1: [string, string] // [normal, hervorgehoben]
  lead: string
  steps: [string, string][]
  tips: string[]
  faqs: FaqItem[]
}

export const landing: Record<TypeId, Landing> = {
  url: {
    title: 'Link-QR-Code erstellen – kostenlos, ohne Ablauf',
    description:
      'URL eingeben, QR-Code gestalten, als PNG oder SVG laden. Kostenlos, ohne Anmeldung – der Link steckt direkt im Code und läuft nie ab.',
    h1: ['QR-Code für', 'deinen Link'],
    lead: 'Website, Online-Shop, Speisekarte als PDF oder Bewertungsseite: Adresse einfügen, fertig. Der Link steht direkt im Code – ohne Umweg über fremde Server.',
    steps: [
      ['Adresse einfügen', 'Kopiere die URL aus der Adresszeile. Ein fehlendes https:// ergänzen wir automatisch.'],
      ['Aussehen wählen', 'Vorlage, Farben, Logo in der Mitte oder ein Rahmen mit „Jetzt scannen“ – alles optional.'],
      ['Laden und testen', 'PNG für Bildschirm und Büro, SVG für die Druckerei. Vor dem Druck einmal mit dem Handy scannen.'],
    ],
    tips: [
      'Kurze Adressen ergeben ein gröberes Muster, das sich aus größerer Entfernung lesen lässt.',
      'Soll sich das Ziel später ändern können? Dann verlinke auf eine eigene Adresse, die du selbst weiterleiten kannst (z. B. deinefirma.de/aktion).',
      'Tracking-Parameter wie ?utm_source=flyer helfen dir, Scans in deiner Website-Statistik zu erkennen.',
    ],
    faqs: [
      { q: 'Läuft der QR-Code irgendwann ab?', a: 'Nein. Der Code enthält deine Adresse direkt. Solange die Webseite erreichbar ist, funktioniert auch der Code – ohne Abo und ohne zeitliche Begrenzung.' },
      { q: 'Kann ich das Linkziel nachträglich ändern?', a: 'Bei einem statischen Code nicht, denn die Adresse ist fest im Muster gespeichert. Der Trick: Verlinke auf eine Adresse deiner eigenen Domain und leite diese bei Bedarf um.' },
      { q: 'Zählt ihr, wie oft der Code gescannt wird?', a: 'Nein. Der Scan führt direkt zu deiner Seite, wir sind daran nicht beteiligt. Scans kannst du über die Statistik deiner eigenen Website auswerten.' },
    ],
  },
  text: {
    title: 'Text-QR-Code erstellen – auch offline lesbar',
    description:
      'Beliebigen Text als QR-Code speichern: Notiz, Gutscheincode oder Seriennummer. Kostenlos, ohne Anmeldung, funktioniert beim Scannen auch offline.',
    h1: ['QR-Code mit', 'freiem Text'],
    lead: 'Ein Text-QR-Code zeigt beim Scannen einfach deinen Text an – ganz ohne Internetverbindung. Praktisch für Gutscheincodes, Inventarnummern oder kleine Botschaften.',
    steps: [
      ['Text eingeben', 'Umlaute, Zeilenumbrüche und Emoji sind kein Problem.'],
      ['Gestalten', 'Wähle Muster und Farben oder bleib beim klassischen Schwarz-Weiß.'],
      ['Herunterladen', 'Als PNG oder SVG speichern oder direkt in die Zwischenablage kopieren.'],
    ],
    tips: [
      'Je kürzer der Text, desto gröber und robuster das Muster. Ab etwa 300 Zeichen wird der Code sehr fein.',
      'Für lange Texte lieber eine Webseite oder ein PDF verlinken.',
      'Text-Codes funktionieren offline – ideal für Keller, Lager und Funklöcher.',
    ],
    faqs: [
      { q: 'Wie viel Text passt in einen QR-Code?', a: 'Technisch knapp 3.000 Zeichen. Gut scannbar bleibt ein Code aber nur bis zu einigen hundert Zeichen – darüber wird das Muster zu fein für kleine Druckgrößen.' },
      { q: 'Werden Umlaute richtig angezeigt?', a: 'Ja. Wir kodieren in UTF-8, damit ä, ö, ü, ß und Emoji auf iPhone und Android korrekt ankommen.' },
      { q: 'Braucht man zum Lesen Internet?', a: 'Nein. Der Text steckt vollständig im Code und wird direkt auf dem Handy angezeigt.' },
    ],
  },
  wifi: {
    title: 'WLAN-QR-Code erstellen – Gäste verbinden',
    description:
      'WLAN-QR-Code kostenlos erstellen: Netzwerkname und Passwort eingeben, ausdrucken, fertig. Gäste verbinden sich per Kamera – das Passwort bleibt lokal.',
    h1: ['WLAN-QR-Code:', 'verbinden ohne Tippen'],
    lead: 'Nie wieder „Großes B, dann die 7 …“. Gäste halten die Kamera auf den Code und sind im WLAN. Dein Passwort wird dabei nicht an uns übertragen – der Code entsteht in deinem Browser.',
    steps: [
      ['Zugangsdaten eintragen', 'Netzwerkname (SSID) und Passwort genau so, wie sie im Router stehen – Groß- und Kleinschreibung zählt.'],
      ['Rahmen dazu', 'Ein Etikett wie „WLAN verbinden“ erklärt Gästen sofort, wofür der Code gut ist.'],
      ['Ausdrucken und aufstellen', 'Im Bilderrahmen, als Tischaufsteller oder auf der Rückseite der Speisekarte.'],
    ],
    tips: [
      'Fast alle Router nutzen heute WPA2 oder WPA3 – dafür ist die Voreinstellung „WPA“ richtig.',
      'Für Gäste am besten das Gastnetz der FRITZ!Box oder des Routers verwenden, nicht das Heimnetz.',
      'Wenn du das Passwort änderst, brauchst du einen neuen Code – der alte enthält noch das alte Passwort.',
    ],
    faqs: [
      { q: 'Ist es sicher, mein WLAN-Passwort hier einzugeben?', a: 'Der Code wird ausschließlich in deinem Browser berechnet. Netzwerkname und Passwort werden nicht an unsere Server geschickt und nirgends gespeichert. Bedenke aber: Wer den ausgedruckten Code scannt, kann das Passwort auslesen.' },
      { q: 'Funktioniert der Code auf iPhone und Android?', a: 'Ja. iPhones (ab iOS 11) und Android-Geräte (ab Android 10, viele auch früher) erkennen WLAN-Codes direkt in der Kamera-App und bieten das Verbinden an.' },
      { q: 'Was bedeutet „verstecktes Netzwerk“?', a: 'Wenn dein Router den Netzwerknamen nicht aussendet, setz den Haken – sonst findet das Handy das Netz beim Verbinden nicht.' },
    ],
  },
  vcard: {
    title: 'vCard-QR-Code erstellen – Visitenkarte gratis',
    description:
      'Kontaktdaten als QR-Code: Name, Telefon, E-Mail und Adresse landen per Scan im Adressbuch. Kostenlos, ohne Anmeldung, deine Daten bleiben bei dir.',
    h1: ['Visitenkarte als', 'vCard-QR-Code'],
    lead: 'Ein Scan, und dein Kontakt ist gespeichert – mit Name, Nummer, E-Mail und Adresse. Ideal für Visitenkarten, E-Mail-Signaturen, Messestände und Namensschilder.',
    steps: [
      ['Kontaktdaten ausfüllen', 'Nur was du teilen willst. Jedes zusätzliche Feld macht das Muster etwas feiner.'],
      ['Zur Marke passend gestalten', 'Firmenfarbe wählen und das Logo in die Mitte setzen.'],
      ['Als SVG in die Druckdaten', 'Vektorgrafik für gestochen scharfen Druck auf Karte, Flyer oder Fahrzeug.'],
    ],
    tips: [
      'Telefonnummern im internationalen Format (+49 …) funktionieren auch im Ausland.',
      'Auf Visitenkarten sollte der Code mindestens 2 × 2 cm groß sein – bei vielen Angaben eher 2,5 cm.',
      'Weniger ist mehr: Name, Mobilnummer, E-Mail und Website reichen meistens.',
    ],
    faqs: [
      { q: 'Was ist eine vCard?', a: 'vCard ist das Standardformat für elektronische Visitenkarten. iPhone, Android, Outlook und alle gängigen Adressbücher können es lesen und bieten nach dem Scan „Kontakt hinzufügen“ an.' },
      { q: 'Werden meine Kontaktdaten gespeichert?', a: 'Nein. Die Daten stehen ausschließlich im QR-Code selbst und werden in deinem Browser verarbeitet. Wir sehen sie nicht.' },
      { q: 'Kann ich ein Foto hinterlegen?', a: 'Nicht sinnvoll – ein Foto würde den Code so groß machen, dass er kaum noch scannbar wäre. Dein Logo kannst du aber sichtbar in die Mitte des Codes setzen.' },
    ],
  },
  email: {
    title: 'E-Mail-QR-Code erstellen – mit Betreff & Text',
    description:
      'QR-Code, der eine fertige E-Mail öffnet: Empfänger, Betreff und Text sind vorausgefüllt. Kostenlos erstellen, ohne Anmeldung.',
    h1: ['QR-Code für', 'eine E-Mail'],
    lead: 'Nach dem Scan öffnet sich das Mailprogramm – Empfänger, Betreff und Text sind schon eingetragen. Gut für Anmeldungen, Rückmeldungen und Support-Anfragen.',
    steps: [
      ['Empfänger eintragen', 'Die Adresse, an die die Nachricht gehen soll.'],
      ['Betreff und Text vorgeben', 'Optional – so landen Anfragen sortiert in deinem Postfach.'],
      ['Code laden', 'PNG, SVG oder direkt in die Zwischenablage.'],
    ],
    tips: [
      'Ein fester Betreff wie „Anmeldung Sommerfest“ erleichtert dir das Filtern im Postfach.',
      'Halte den vorgegebenen Text kurz – jedes Zeichen macht das Muster dichter.',
      'Der Absender kann vor dem Senden alles noch anpassen.',
    ],
    faqs: [
      { q: 'Wird die E-Mail automatisch gesendet?', a: 'Nein. Der Scan öffnet nur einen vorausgefüllten Entwurf. Abgeschickt wird erst, wenn die Person auf „Senden“ tippt.' },
      { q: 'Funktioniert das mit jedem Mailprogramm?', a: 'Ja, der Code nutzt den mailto-Standard. Es öffnet sich die Mail-App, die auf dem Handy als Standard eingestellt ist.' },
      { q: 'Kann ich mehrere Empfänger angeben?', a: 'Im Empfängerfeld ist eine Adresse vorgesehen. Für Verteiler empfiehlt sich eine Sammeladresse wie info@…' },
    ],
  },
  phone: {
    title: 'Telefon-QR-Code erstellen – anrufen per Scan',
    description:
      'QR-Code mit Telefonnummer: scannen und direkt anrufen. Kostenlos erstellen, als PNG oder SVG laden – für Plakate, Fahrzeuge und Visitenkarten.',
    h1: ['QR-Code für', 'einen Anruf'],
    lead: 'Scannen, auf „Anrufen“ tippen, fertig. Niemand muss mehr eine Nummer vom Plakat abtippen – praktisch für Handwerker, Praxen und Hotlines.',
    steps: [
      ['Nummer eintragen', 'Am besten mit Ländervorwahl: +49 statt der führenden 0.'],
      ['Rahmen wählen', 'Ein Hinweis wie „Jetzt anrufen“ sagt, was beim Scan passiert.'],
      ['Herunterladen', 'SVG für Fahrzeugbeschriftung und Schilder, PNG für alles andere.'],
    ],
    tips: [
      'Mit +49 funktioniert der Code auch für Anrufer aus dem Ausland.',
      'Telefon-Codes sind sehr klein und robust – sie lassen sich auch aus größerer Entfernung scannen.',
      'Der Anruf startet nie automatisch, das Handy fragt immer nach.',
    ],
    faqs: [
      { q: 'Kostet der Anruf über den QR-Code extra?', a: 'Nein. Es ist ein ganz normaler Anruf zum Tarif des Anrufers – der Code erspart nur das Eintippen.' },
      { q: 'Wird sofort gewählt?', a: 'Nein. Das Handy zeigt die Nummer an und wartet auf eine Bestätigung.' },
      { q: 'Kann ich auch eine Durchwahl angeben?', a: 'Ja, trag die vollständige Nummer mit Durchwahl ein. Leerzeichen und Bindestriche entfernen wir automatisch.' },
    ],
  },
  sms: {
    title: 'SMS-QR-Code erstellen – Nachricht vorausgefüllt',
    description:
      'QR-Code für eine SMS mit fertigem Text: ideal für Gewinnspiele, Rückrufbitten und Anmeldungen. Kostenlos und ohne Anmeldung erstellen.',
    h1: ['QR-Code für', 'eine SMS'],
    lead: 'Der Scan öffnet die Nachrichten-App mit Empfänger und Text. Beliebt für Gewinnspiele („Sende GEWINN an …“), Rückrufbitten und Terminbestätigungen.',
    steps: [
      ['Nummer und Text eintragen', 'Der Text ist optional, spart den Leuten aber das Tippen.'],
      ['Gestalten', 'Farben und Rahmen passend zu Plakat oder Flyer wählen.'],
      ['Code laden', 'Als PNG, SVG oder per Zwischenablage.'],
    ],
    tips: [
      'Unter 160 Zeichen bleibt es bei einer einzelnen SMS.',
      'Die Nachricht kann vor dem Absenden noch geändert werden.',
      'Für Chats ohne SMS-Kosten gibt es den WhatsApp-QR-Code.',
    ],
    faqs: [
      { q: 'Wird die SMS automatisch verschickt?', a: 'Nein, sie wird nur vorbereitet. Gesendet wird erst nach einem Tipp auf „Senden“.' },
      { q: 'Funktioniert das auf iPhone und Android?', a: 'Ja. Wir verwenden das verbreitete SMSTO-Format, das beide Systeme in der Kamera-App erkennen.' },
      { q: 'Entstehen Kosten?', a: 'Für den Absender fallen die normalen SMS-Kosten seines Tarifs an. Der QR-Code selbst ist kostenlos.' },
    ],
  },
  whatsapp: {
    title: 'WhatsApp-QR-Code erstellen – Chat per Scan',
    description:
      'WhatsApp-QR-Code kostenlos erstellen: Kunden scannen und schreiben dir direkt, ohne deine Nummer zu speichern. Mit vorausgefüllter Nachricht.',
    h1: ['WhatsApp-Chat', 'per QR-Code'],
    lead: 'Kundinnen und Kunden scannen den Code und landen direkt im Chat mit dir – ohne vorher deine Nummer zu speichern. Auf Wunsch mit vorbereiteter Nachricht.',
    steps: [
      ['WhatsApp-Nummer eintragen', 'Mit Ländervorwahl, also +49 170 … statt 0170 …'],
      ['Nachricht vorschlagen', 'Zum Beispiel „Hallo, ich hätte gern einen Termin“ – optional.'],
      ['Logo und Rahmen', 'Das WhatsApp-Symbol in der Mitte und „Schreib uns“ darunter machen den Zweck klar.'],
    ],
    tips: [
      'Der Code nutzt den offiziellen wa.me-Link von WhatsApp und funktioniert mit privaten und Business-Konten.',
      'Eine vorausgefüllte Nachricht senkt die Hürde, den ersten Satz zu schreiben.',
      'Wechselst du die Nummer, brauchst du einen neuen Code.',
    ],
    faqs: [
      { q: 'Muss man meine Nummer vorher speichern?', a: 'Nein. Der Scan öffnet den Chat direkt – das ist der große Vorteil gegenüber einer abgedruckten Nummer.' },
      { q: 'Geht das auch mit WhatsApp Business?', a: 'Ja, der Link funktioniert für jede Nummer, die bei WhatsApp registriert ist.' },
      { q: 'Sieht WhatsApp meine vorausgefüllte Nachricht?', a: 'Die Nachricht ist Teil des Links und wird erst übertragen, wenn jemand den Code scannt und den Chat öffnet. Bei uns wird nichts gespeichert.' },
    ],
  },
  location: {
    title: 'Standort-QR-Code erstellen – für Karten-Apps',
    description:
      'QR-Code für einen Standort: Adresse oder Koordinaten eingeben, scannen öffnet die Karten-App mit Routenplanung. Kostenlos und ohne Anmeldung.',
    h1: ['QR-Code für', 'einen Standort'],
    lead: 'Vom Flyer direkt in die Navigation: Der Scan öffnet die Karten-App am richtigen Ort. Für Einladungen, Baustellen, Ferienwohnungen und Treffpunkte.',
    steps: [
      ['Adresse oder Koordinaten', 'Eine Adresse reicht. Für Orte ohne Hausnummer kannst du Breiten- und Längengrad angeben.'],
      ['Gestalten', 'Ein Rahmen mit „Route starten“ zeigt, was der Code tut.'],
      ['Herunterladen', 'PNG oder SVG, auf Wunsch mit transparentem Hintergrund.'],
    ],
    tips: [
      'Adressen öffnen wir über Google Maps – das funktioniert auf jedem Handy auch ohne installierte App.',
      'Koordinaten findest du in Google Maps per Rechtsklick auf die Stelle.',
      'Mit Koordinaten trifft der Pin exakt, etwa den Eingang statt der Mitte eines großen Geländes.',
    ],
    faqs: [
      { q: 'Welche Karten-App öffnet sich?', a: 'Bei Koordinaten nutzt das Handy seine Standard-Karten-App. Bei einer Adresse öffnet sich Google Maps – in der App, falls installiert, sonst im Browser.' },
      { q: 'Kann ich einen Ort ohne Adresse angeben?', a: 'Ja, über Breiten- und Längengrad – zum Beispiel für einen Grillplatz, einen Parkplatz oder einen Wanderstart.' },
      { q: 'Wird mein Standort erfasst?', a: 'Nein. Du gibst lediglich ein Ziel ein. Weder dein Standort noch der der Scannenden wird an uns übertragen.' },
    ],
  },
  event: {
    title: 'Kalender-QR-Code erstellen – Termin per Scan',
    description:
      'QR-Code für einen Kalendereintrag: Titel, Datum, Uhrzeit und Ort landen per Scan im Kalender. Kostenlos für Einladungen und Plakate erstellen.',
    h1: ['Termin als', 'QR-Code'],
    lead: 'Hochzeit, Vereinsfest oder Tag der offenen Tür: Ein Scan trägt den Termin mit Ort und Uhrzeit in den Kalender ein. So geht keine Einladung mehr unter.',
    steps: [
      ['Termin eintragen', 'Titel und Beginn sind Pflicht, Ende, Ort und Beschreibung optional.'],
      ['Passend gestalten', 'Farben der Einladung übernehmen, Rahmen mit „Termin speichern“ dazu.'],
      ['Auf die Einladung setzen', 'Als SVG in die Druckdaten oder als PNG ins Dokument.'],
    ],
    tips: [
      'Ohne Endzeit setzen wir automatisch eine Stunde Dauer an.',
      'Die Uhrzeit gilt als Ortszeit der scannenden Person – für Veranstaltungen vor Ort genau richtig.',
      'Beschreibung kurz halten: Je mehr Text, desto feiner das Muster.',
    ],
    faqs: [
      { q: 'Mit welchen Kalendern funktioniert das?', a: 'Der Code enthält den Termin im iCalendar-Format. iPhones erkennen es direkt in der Kamera. Unter Android hängt es von der Scanner-App ab – die meisten bieten „Zum Kalender hinzufügen“ an.' },
      { q: 'Kann ich den Termin später ändern?', a: 'Die Daten sind fest im Code gespeichert. Ändert sich der Termin, erstellst du einfach einen neuen Code.' },
      { q: 'Gehen auch mehrtägige Veranstaltungen?', a: 'Ja. Gib ein Enddatum an oder wähle „Ganztägig“ für Termine ohne Uhrzeit.' },
    ],
  },
  girocode: {
    title: 'GiroCode erstellen – QR-Code für Überweisungen',
    description:
      'GiroCode kostenlos erstellen: IBAN, Empfänger, Betrag und Verwendungszweck als QR-Code für die Banking-App. Mit IBAN-Prüfung, ohne Anmeldung.',
    h1: ['GiroCode für', 'Überweisungen'],
    lead: 'Der QR-Code für die Rechnung: Kundinnen und Kunden scannen ihn mit ihrer Banking-App, und Empfänger, IBAN, Betrag und Verwendungszweck sind ausgefüllt. Keine Zahlendreher, schnellere Zahlung.',
    steps: [
      ['Kontodaten eintragen', 'Empfängername und IBAN. Wir prüfen die IBAN sofort auf Tippfehler.'],
      ['Betrag und Zweck', 'Beides optional – für Spenden lässt du den Betrag einfach frei.'],
      ['Auf die Rechnung setzen', 'Als PNG oder SVG, am besten mit dem Hinweis „Mit Banking-App scannen“.'],
    ],
    tips: [
      'Der Code muss mit der Banking-App gescannt werden, nicht mit der normalen Kamera – ein kurzer Hinweis daneben hilft.',
      'Die Banking-Apps von Sparkassen, Volks- und Raiffeisenbanken und den meisten Direktbanken können GiroCodes lesen.',
      'Auf Rechnungen genügt eine Größe von etwa 3 × 3 cm.',
      'Die BIC ist innerhalb des SEPA-Raums nicht mehr nötig.',
    ],
    faqs: [
      { q: 'Was ist ein GiroCode?', a: 'GiroCode ist die in Deutschland gebräuchliche Bezeichnung für den EPC-QR-Code – einen europäischen Standard, der die Daten einer SEPA-Überweisung enthält. Banking-Apps lesen ihn und füllen das Überweisungsformular aus.' },
      { q: 'Ist es sicher, meine IBAN hier einzugeben?', a: 'Der Code wird nur in deinem Browser erzeugt, deine Kontodaten werden nicht an uns übertragen. Mit einer IBAN allein kann zudem niemand Geld abbuchen – sie steht ohnehin auf jeder Rechnung.' },
      { q: 'Wird beim Scannen sofort Geld überwiesen?', a: 'Nein. Die Banking-App füllt nur das Formular aus. Die zahlende Person prüft die Daten und gibt die Überweisung wie gewohnt per TAN oder Freigabe frei.' },
      { q: 'Kann ich den Betrag offen lassen?', a: 'Ja. Dann trägt die zahlende Person den Betrag selbst ein – praktisch für Spenden oder Trinkgeld.' },
    ],
  },
  paypal: {
    title: 'PayPal-QR-Code erstellen – Geld per Scan',
    description:
      'QR-Code für deinen PayPal.Me-Link: scannen, Betrag bestätigen, bezahlt. Kostenlos erstellen – für Flohmarkt, Verein, Trinkgeld und Spenden.',
    h1: ['PayPal-Zahlung', 'per QR-Code'],
    lead: 'Dein PayPal.Me-Link als QR-Code: scannen, Betrag bestätigen, bezahlt. Für Flohmarktstand, Vereinskasse, Trinkgeld oder die geteilte Rechnung.',
    steps: [
      ['PayPal.Me-Namen eintragen', 'Den Namen hinter paypal.me/ – du findest ihn in der PayPal-App unter deinem Profil.'],
      ['Betrag festlegen', 'Optional. Ohne Betrag gibt die zahlende Person selbst einen ein.'],
      ['Code aufstellen', 'Ausdrucken, an die Kasse stellen oder in eine Rechnung einfügen.'],
    ],
    tips: [
      'Noch keinen PayPal.Me-Link? In der PayPal-App unter Profil lässt er sich in einer Minute anlegen.',
      'Für Überweisungen ohne PayPal-Konto eignet sich der GiroCode.',
      'Prüfe den Code einmal selbst: Es muss dein Name und Profilbild erscheinen.',
    ],
    faqs: [
      { q: 'Brauche ich ein Geschäftskonto?', a: 'Nein, PayPal.Me funktioniert auch mit einem privaten PayPal-Konto. Für gewerbliche Verkäufe gelten die Gebühren und Bedingungen von PayPal.' },
      { q: 'Fallen Gebühren an?', a: 'Der QR-Code ist kostenlos. Ob PayPal für eine Zahlung Gebühren berechnet, hängt von der Zahlungsart ab und wird von PayPal festgelegt.' },
      { q: 'Kann ich den Betrag vorgeben?', a: 'Ja. Trag einen Betrag ein, und er ist nach dem Scan bereits ausgefüllt.' },
    ],
  },
  bitcoin: {
    title: 'Bitcoin-QR-Code erstellen – Adresse & Betrag',
    description:
      'Bitcoin-Adresse als QR-Code, optional mit Betrag. Kostenlos erstellen, mit jeder Wallet scannbar – deine Adresse bleibt in deinem Browser.',
    h1: ['Bitcoin-Adresse', 'als QR-Code'],
    lead: 'Lange Adressen abtippen ist fehleranfällig. Mit dem Code scannt das Gegenüber deine Adresse fehlerfrei in die Wallet – auf Wunsch gleich mit Betrag.',
    steps: [
      ['Adresse einfügen', 'Am besten per Kopieren und Einfügen aus deiner Wallet.'],
      ['Betrag ergänzen', 'Optional in BTC, zum Beispiel 0.001.'],
      ['Code teilen', 'Als Bild speichern oder in die Zwischenablage kopieren.'],
    ],
    tips: [
      'Vergleiche nach dem Erstellen die ersten und letzten Zeichen der Adresse – Bitcoin-Zahlungen lassen sich nicht zurückholen.',
      'Der Code nutzt das bitcoin:-Format (BIP 21), das alle gängigen Wallets verstehen.',
      'Gib niemals deinen privaten Schlüssel oder deine Seed-Phrase ein – nur die Empfangsadresse.',
    ],
    faqs: [
      { q: 'Welche Adressformate werden unterstützt?', a: 'Klassische Adressen (beginnen mit 1), Skript-Adressen (3) und moderne Bech32-Adressen (bc1).' },
      { q: 'Ist das sicher?', a: 'Eine Empfangsadresse ist öffentlich und darf geteilt werden. Der Code wird nur in deinem Browser erzeugt, die Adresse wird nicht an uns übertragen.' },
      { q: 'Kann ich einen Euro-Betrag angeben?', a: 'Nein, das Format kennt nur Beträge in BTC. Rechne den Betrag vorher um oder lass das Feld frei.' },
    ],
  },
}

export const homeFaqs: FaqItem[] = [
  {
    q: 'Ist qrcode.de wirklich kostenlos?',
    a: 'Ja – komplett. Es gibt kein Abo, keine Premium-Stufe, keine Wasserzeichen und kein Limit. Du brauchst kein Konto und keine E-Mail-Adresse. Die Codes darfst du privat und kommerziell verwenden.',
  },
  {
    q: 'Laufen die QR-Codes irgendwann ab?',
    a: 'Nein. Wir erzeugen statische Codes: Dein Inhalt steckt direkt im Muster und nicht hinter einer Weiterleitung über unsere Server. Es gibt also nichts, das ablaufen oder abgeschaltet werden könnte. Ein Code, den du heute druckst, funktioniert auch in zehn Jahren.',
  },
  {
    q: 'Was ist der Unterschied zwischen statischen und dynamischen QR-Codes?',
    a: 'Ein statischer Code enthält den Inhalt selbst, etwa deine Webadresse. Ein dynamischer Code enthält nur einen Kurzlink zum Server eines Anbieters, der dann weiterleitet – das Ziel lässt sich ändern und Scans lassen sich zählen, aber der Code funktioniert nur, solange der Anbieter mitspielt. Wir bieten bewusst nur statische Codes an.',
  },
  {
    q: 'Kann ich den Inhalt später noch ändern?',
    a: 'Nein, ein statischer Code ist unveränderlich. Unser Tipp für Links: Verweise auf eine Adresse deiner eigenen Domain (etwa deinefirma.de/aktion) und leite sie bei Bedarf um. So behältst du die Kontrolle, ganz ohne Drittanbieter.',
  },
  {
    q: 'Werden meine Eingaben gespeichert oder übertragen?',
    a: 'Nein. Der Code wird vollständig in deinem Browser berechnet. Was du eintippst – WLAN-Passwort, Kontaktdaten, IBAN – verlässt dein Gerät nicht. Wir setzen keine Cookies und keine Analyse-Tools ein. Nur deine Gestaltung (Farben, Muster) merkt sich der Browser lokal, damit du beim nächsten Besuch weitermachen kannst.',
  },
  {
    q: 'PNG oder SVG – was soll ich nehmen?',
    a: 'SVG ist eine Vektorgrafik und bleibt in jeder Größe gestochen scharf: die richtige Wahl für Druckerei, Schilder und Fahrzeugbeschriftung. PNG ist ein Pixelbild und passt für Word, PowerPoint, E-Mail und Web. Im Zweifel: 2048 px als PNG reichen für fast jeden Bürodruck.',
  },
  {
    q: 'Wie groß muss ein QR-Code gedruckt werden?',
    a: 'Faustregel: Scan-Abstand geteilt durch zehn. Für einen Flyer in der Hand (20 cm Abstand) genügen 2 cm Kantenlänge, für ein Plakat, das aus 2 m gelesen wird, sollten es 20 cm sein. Unter 2 cm wird es für viele Kameras schwierig. Unser Druck-Rechner weiter oben rechnet es dir aus.',
  },
  {
    q: 'Was macht der Scan-Test?',
    a: 'Nach jeder Änderung lesen wir deinen fertigen Code – mit Farben, Logo und Rahmen – mit einem echten Decoder zurück und vergleichen das Ergebnis mit deiner Eingabe. So siehst du sofort, wenn ein Design zu gewagt ist. Ein Test mit dem eigenen Handy vor dem Druck bleibt trotzdem Pflicht.',
  },
  {
    q: 'Kann ich ein Logo in den QR-Code setzen?',
    a: 'Ja. Lade dein Logo hoch oder wähle ein Symbol. Wir sparen die Mitte des Musters dafür aus und erhöhen automatisch die Fehlerkorrektur, damit der Code lesbar bleibt. Dein Bild wird dabei nicht hochgeladen, sondern nur lokal verarbeitet.',
  },
]
