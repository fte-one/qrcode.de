import type { Guide } from './types'

export const moreGuides: Guide[] = [
  // ---------------------------------------------------------------------------
  {
    slug: 'qr-code-speisekarte',
    title: 'QR-Code Speisekarte: Anleitung für Restaurants',
    description:
      'Speisekarte per QR-Code: Karte online stellen, Code erzeugen, Tischaufsteller drucken. Mit Größen, Platzierung und typischen Fehlern – kostenlos.',
    h1: ['QR-Code für die', 'Speisekarte'],
    lead: 'Gäste scannen am Tisch und sehen sofort deine aktuelle Karte. So richtest du das in einer Stunde ein – mit einer Adresse, die auch nach der nächsten Preisänderung noch stimmt.',
    updated: '2026-11-20',
    readMinutes: 5,
    sections: [
      {
        heading: 'Erst die Karte online, dann der Code',
        paragraphs: [
          'Ein QR-Code enthält keine Speisekarte, sondern nur die Adresse, unter der sie zu finden ist. Bevor du den Code erzeugst, muss die Karte also im Netz stehen. Dafür gibt es zwei Wege: als eigene Seite auf deiner Website oder als PDF-Datei.',
          'Eine Webseite ist auf dem Handy meist angenehmer zu lesen: Der Text bricht passend um, niemand muss zoomen, und du kannst Gerichte einzeln ändern. Ein PDF ist schneller gemacht, wenn deine Karte ohnehin als Druckdatei vorliegt – dann sollte sie aber so gestaltet sein, dass sie auf einem kleinen Bildschirm lesbar bleibt (mehr dazu im Ratgeber zum QR-Code für ein PDF).',
        ],
        list: [
          'Webseite: z. B. deinrestaurant.de/speisekarte – am besten mobil optimiert, mit Allergenen und Preisen',
          'PDF: hochgeladen auf deine Website, nicht als Anhang in einem Messenger oder Mail-Postfach',
          'Getränkekarte, Mittagstisch und Kinderkarte gern als Abschnitte auf derselben Seite statt als vier Codes',
        ],
      },
      {
        heading: 'Die wichtigste Entscheidung: eine stabile Adresse',
        paragraphs: [
          'Die Codes von qrcode.de sind statisch: Die Adresse steckt fest im Muster, der Code läuft nie ab, braucht kein Abo – lässt sich aber auch nicht nachträglich auf ein anderes Ziel umstellen. Das ist kein Nachteil, wenn du von Anfang an auf eine Adresse verlinkst, die dir gehört und sich nie ändert.',
          'Nimm also nicht den Link zu „speisekarte_herbst_2026_final.pdf“, sondern eine neutrale Adresse wie deinrestaurant.de/karte. Dahinter tauschst du die Datei aus oder richtest eine Weiterleitung auf die jeweils aktuelle Version ein. Die gedruckten Codes auf 20 Tischen bleiben gültig, auch wenn sich Gerichte und Preise jede Saison ändern.',
        ],
      },
      {
        heading: 'Code erstellen in fünf Schritten',
        paragraphs: [
          'Im Generator wählst du die Art „Link“ und fügst deine Adresse ein. Der Code wird direkt in deinem Browser berechnet, ohne Anmeldung und ohne Kosten.',
        ],
        list: [
          'Art „Link“ wählen und die stabile Adresse einfügen (https:// wird bei Bedarf ergänzt)',
          'Farben passend zum Lokal wählen – dunkle Punkte auf hellem Grund, sonst scannt nicht jedes Handy zuverlässig',
          'Optional dein Logo in die Mitte setzen; die Fehlerkorrektur wird dafür automatisch erhöht',
          'Einen Rahmen mit Text wählen, etwa „Zur Speisekarte“ – so weiß jeder Gast, was der Code tut',
          'Als SVG für die Druckerei oder als PNG (bis 4096 px) für den eigenen Drucker herunterladen',
        ],
      },
      {
        heading: 'Größe und Platzierung am Tisch',
        paragraphs: [
          'Als Faustregel gilt: Der Code sollte etwa ein Zehntel so breit sein wie der Abstand, aus dem gescannt wird. Am Tisch hält man das Handy rund 30 bis 40 cm entfernt – also reichen 3 bis 4 cm Kantenlänge. Größer schadet nicht, kleiner als 2,5 cm solltest du nicht drucken.',
          'Bewährt haben sich Tischaufsteller aus Acryl oder Karton, Aufkleber direkt auf der Tischplatte (laminiert oder mit abwischbarer Folie) und ein größerer Code im Eingangsbereich oder Schaufenster, damit Gäste schon vor dem Hinsetzen einen Blick auf die Karte werfen können. Auf Außentischen bitte witterungsfest drucken, denn ausgeblichene oder verkratzte Codes lassen sich schlechter lesen.',
        ],
      },
      {
        heading: 'WLAN-Code gleich daneben',
        paragraphs: [
          'Wenn du Gäste-WLAN anbietest, passt ein zweiter Code auf denselben Aufsteller: Mit der Art „WLAN“ verbinden sich Gäste per Scan, ohne das Passwort abzutippen. Nutze dafür ein Gastnetz deines Routers, nicht dein Betriebsnetz mit Kasse und Büro-PC. Beschrifte beide Codes eindeutig, etwa mit den Rahmen „Zur Speisekarte“ und „WLAN verbinden“, damit niemand den falschen erwischt.',
        ],
      },
      {
        heading: 'Gedruckte Karte nicht abschaffen',
        paragraphs: [
          'Nicht jeder Gast hat ein Smartphone dabei, einen vollen Akku oder Lust, beim Essen aufs Handy zu schauen. Ältere Menschen und Menschen mit Sehschwäche kommen mit einer gedruckten Karte oft besser zurecht. Der QR-Code ist deshalb eine Ergänzung: Halte ein paar gedruckte Exemplare bereit und sag beim Servieren, dass es sie gibt.',
        ],
      },
      {
        heading: 'Typische Fehler – und wie du sie vermeidest',
        paragraphs: [
          'Die meisten Probleme fallen erst auf, wenn die Aufsteller schon gedruckt sind. Prüfe deshalb vor dem Druck einen Probeausdruck in Originalgröße mit einem iPhone und einem Android-Handy.',
        ],
        list: [
          'Link auf eine Datei mit Datum im Namen – nach der nächsten Änderung führt der Code ins Leere',
          'PDF in einem privaten Cloud-Ordner – Gäste sehen nur eine Anmeldeseite',
          'Riesige PDF-Datei mit hochauflösenden Fotos – lädt im Mobilfunknetz quälend langsam',
          'Helle Punkte auf dunklem Holz oder zu wenig Kontrast zum Hintergrund',
          'Code zu klein oder unter einer spiegelnden Folie, die das Licht reflektiert',
          'Fremde Aufkleber über dem Code nicht bemerkt – kontrolliere öffentlich zugängliche Codes regelmäßig',
        ],
      },
    ],
    faqs: [
      {
        q: 'Muss ich jedes Mal einen neuen Code drucken, wenn sich die Karte ändert?',
        a: 'Nein, sofern der Code auf eine feste Adresse deiner Website zeigt, etwa deinrestaurant.de/karte. Du tauschst dort nur den Inhalt oder die Datei aus, der gedruckte Code bleibt gültig.',
      },
      {
        q: 'Wie groß muss der QR-Code auf dem Tischaufsteller sein?',
        a: 'Bei einem Scan-Abstand von 30 bis 40 cm reichen 3 bis 4 cm Kantenlänge. Für Aushänge an der Tür oder im Fenster, die aus ein bis zwei Metern gescannt werden, plane entsprechend 10 bis 20 cm ein.',
      },
      {
        q: 'Sieht qrcode.de, wie oft meine Speisekarte aufgerufen wird?',
        a: 'Nein. Der Code führt direkt zu deiner Seite, wir sind am Scan nicht beteiligt und zählen nichts. Aufrufe kannst du über die Statistik deiner eigenen Website auswerten.',
      },
      {
        q: 'Brauchen Gäste eine spezielle App?',
        a: 'In der Regel nicht. Aktuelle iPhones und die meisten Android-Handys erkennen QR-Codes direkt in der Kamera-App und zeigen den Link zum Antippen an.',
      },
    ],
    relatedTypes: ['url', 'wifi'],
  },

  // ---------------------------------------------------------------------------
  {
    slug: 'qr-code-google-bewertung',
    title: 'QR-Code für Google-Bewertungen erstellen',
    description:
      'So kommst du an mehr Google-Bewertungen: Bewertungslink finden, QR-Code erstellen, richtig aufstellen – und was die Google-Richtlinien verbieten.',
    h1: ['QR-Code für', 'Google-Bewertungen'],
    lead: 'Zufriedene Kunden schreiben gern eine Bewertung – wenn es ohne Suchen geht. Ein QR-Code führt direkt zum Bewertungsfenster deines Google-Unternehmensprofils.',
    updated: '2026-11-20',
    readMinutes: 5,
    sections: [
      {
        heading: 'Warum ein direkter Link so viel ausmacht',
        paragraphs: [
          'Wer dich bewerten will, muss sonst bei Google nach deinem Namen suchen, das richtige Profil finden, zu den Rezensionen scrollen und dort auf den passenden Button tippen. Bei jedem dieser Schritte springen Leute ab. Mit dem Bewertungslink öffnet sich das Eingabefenster mit den Sternen sofort – der Kunde muss nur noch bewerten und schreiben.',
        ],
      },
      {
        heading: 'Den Bewertungslink in deinem Unternehmensprofil finden',
        paragraphs: [
          'Google stellt jedem Inhaber eines verifizierten Unternehmensprofils einen eigenen Link zum Schreiben einer Rezension bereit. Wo genau er steht, ändert Google gelegentlich; die folgenden Schritte beschreiben den üblichen Weg.',
        ],
        list: [
          'Melde dich mit dem Google-Konto an, das dein Unternehmensprofil verwaltet',
          'Suche bei Google oder in Google Maps nach deinem Firmennamen – die Verwaltungsansicht deines Profils erscheint',
          'Wähle „Um Rezensionen bitten“ bzw. „Rezensionen erhalten“ oder einen ähnlich benannten Punkt',
          'Kopiere den angezeigten Link (meist eine kurze Adresse, die mit g.page beginnt)',
          'Öffne den Link einmal in einem privaten Browserfenster und prüfe, ob das Bewertungsfenster deines Profils erscheint',
        ],
      },
      {
        heading: 'Den QR-Code erstellen',
        paragraphs: [
          'Im Generator wählst du die Art „Link“ und fügst den kopierten Bewertungslink ein. Weil der Link kurz ist, entsteht ein grobes, robustes Muster, das sich auch klein gedruckt gut scannen lässt.',
          'Willst du den Link später austauschen können – etwa weil du eine andere Plattform ergänzt –, verlinke stattdessen auf eine eigene Adresse wie deinefirma.de/bewerten und leite diese auf den Google-Link weiter. Der Code selbst ist statisch und lässt sich nachträglich nicht umstellen, die Weiterleitung auf deiner Website dagegen jederzeit.',
        ],
      },
      {
        heading: 'Wo der Code hingehört',
        paragraphs: [
          'Der beste Moment für die Bitte ist kurz nach einem guten Erlebnis: wenn bezahlt ist, die Ware ausgepackt oder der Auftrag erledigt. Platziere den Code dort, wo dieser Moment stattfindet.',
        ],
        list: [
          'Kasse oder Empfangstresen: Aufsteller mit 5 bis 8 cm Kantenlänge',
          'Rechnung oder Kassenbon: klein im Fußbereich, mindestens 2 cm',
          'Visitenkarte und Terminzettel: auf der Rückseite',
          'Paketbeilage im Onlinehandel: eine kurze Karte mit Dank und Code',
          'Abschlussmail oder Angebot: hier reicht der Link als Text oder Button, der Code ist für Gedrucktes',
        ],
      },
      {
        heading: 'Der richtige Text rund um den Code',
        paragraphs: [
          'Ein Code ohne Erklärung wird selten gescannt. Wähle einen Rahmen und schreib kurz, worum es geht – das Textfeld fasst bis zu 28 Zeichen, also etwa „Bewerte uns bei Google“ oder „Wie war’s bei uns?“. Ein zusätzlicher Satz auf dem Aufsteller darf persönlich sein: „Hat es dir gefallen? Wir freuen uns über deine Bewertung – das dauert eine Minute.“',
          'Formuliere offen. „Wir freuen uns über deine ehrliche Meinung“ ist in Ordnung, „Bitte nur 5 Sterne“ nicht.',
        ],
      },
      {
        heading: 'Persönlich fragen und Antworten schreiben',
        paragraphs: [
          'Ein Aufsteller allein wirkt, eine persönliche Bitte wirkt mehr. Wenn ein Kunde sich bedankt, reicht ein Satz wie „Freut mich – wenn du magst, scann gern den Code hier, da kannst du uns bei Google bewerten.“ Erkläre deinem Team, wann und wie es fragen darf, damit alle Kunden gleich angesprochen werden.',
          'Antworte als Inhaber auf Rezensionen, auch auf kritische. Sachlich, freundlich und ohne persönliche Daten des Kunden zu nennen. Wer dein Profil liest, sieht so, dass Feedback bei dir ankommt – und das macht anderen Mut, selbst etwas zu schreiben.',
        ],
      },
      {
        heading: 'Was die Google-Richtlinien verbieten',
        paragraphs: [
          'Google hat klare Regeln für Rezensionen, und Verstöße können dazu führen, dass Bewertungen gelöscht oder dein Profil eingeschränkt wird. Die genauen Formulierungen findest du in den aktuellen Richtlinien für Beiträge bei Google Maps; im Kern gilt:',
        ],
        list: [
          'Keine Gegenleistung: kein Rabatt, kein Gratisgetränk, keine Verlosung im Tausch gegen eine Bewertung',
          'Keine Vorauswahl: Bitte alle Kunden gleichermaßen, nicht nur die, bei denen du eine gute Bewertung erwartest',
          'Keine Bewertungen in eigener Sache: nicht von dir, deinen Mitarbeitenden oder Angehörigen',
          'Keine gekauften oder vorformulierten Bewertungen',
        ],
      },
    ],
    faqs: [
      {
        q: 'Kann ich den QR-Code für mehrere Filialen verwenden?',
        a: 'Nein, jeder Standort hat ein eigenes Unternehmensprofil und damit einen eigenen Bewertungslink. Erstelle für jede Filiale einen eigenen Code und beschrifte die Druckdaten eindeutig, damit sie nicht vertauscht werden.',
      },
      {
        q: 'Braucht der Kunde ein Google-Konto?',
        a: 'Ja, zum Schreiben einer Rezension muss man bei Google angemeldet sein. Auf den meisten Android-Handys ist das ohnehin der Fall, auf dem iPhone fragt Google bei Bedarf nach der Anmeldung.',
      },
      {
        q: 'Darf ich für eine Bewertung einen Rabatt anbieten?',
        a: 'Nein. Google untersagt Anreize für Rezensionen, egal ob die Bewertung positiv sein soll oder nicht. Bitte freundlich um eine ehrliche Meinung – ohne Gegenleistung.',
      },
      {
        q: 'Läuft der Code irgendwann ab?',
        a: 'Der Code selbst nicht – er enthält den Link direkt und funktioniert ohne Abo. Er funktioniert so lange, wie der Bewertungslink bzw. deine eigene Weiterleitungsadresse gültig ist.',
      },
    ],
    relatedTypes: ['url', 'vcard'],
  },

  // ---------------------------------------------------------------------------
  {
    slug: 'qr-code-visitenkarte',
    title: 'QR-Code auf der Visitenkarte: vCard oder Link?',
    description:
      'QR-Code für die Visitenkarte richtig planen: vCard oder Link, welche Felder, welche Größe, SVG für die Druckerei und Test mit iPhone und Android.',
    h1: ['QR-Code auf der', 'Visitenkarte'],
    lead: 'Ein Scan, und dein Kontakt steht im Adressbuch – ohne Abtippen und ohne Zahlendreher. Hier erfährst du, welche Variante zu dir passt und worauf du beim Druck achten musst.',
    updated: '2026-11-20',
    readMinutes: 5,
    sections: [
      {
        heading: 'Zwei Varianten: vCard oder Link',
        paragraphs: [
          'Für die Visitenkarte gibt es zwei sinnvolle Arten von QR-Codes. Ein vCard-Code enthält deine Kontaktdaten selbst; nach dem Scan bietet das Handy direkt „Kontakt hinzufügen“ an. Ein Link-Code enthält nur eine Adresse, etwa zu deiner Teamseite, deinem LinkedIn- oder XING-Profil oder einer eigenen Kontaktseite.',
          'Welche Variante besser ist, hängt davon ab, wie oft sich deine Angaben ändern und ob du mehr zeigen willst als Name und Nummer.',
        ],
      },
      {
        heading: 'Vor- und Nachteile im Vergleich',
        paragraphs: [
          'Die vCard funktioniert ohne Internet und ohne Dienst eines Dritten: Die Daten stecken vollständig im Code, niemand kann sie abschalten, und der Kontakt wird mit einem Tipp gespeichert. Dafür ist sie fix. Wechselst du Nummer, Position oder Arbeitgeber, stimmt der Code nicht mehr – wie der Rest der Karte auch.',
          'Ein Link bleibt änderbar, wenn er auf eine Adresse zeigt, die du selbst pflegst, etwa deinefirma.de/kontakt/anna. Dort kannst du jederzeit Angaben aktualisieren, Foto und Kalenderlink ergänzen oder eine .vcf-Datei zum Download anbieten. Der Nachteil: Ohne Netz öffnet sich nichts, und der Kontakt landet nicht automatisch im Adressbuch.',
        ],
        list: [
          'vCard: offline lesbar, direkt speicherbar, unabhängig von Dritten – aber nicht nachträglich änderbar',
          'Link: änderbar und beliebig ausführlich – aber nur mit Internet und mit einem Zwischenschritt',
          'Faustregel: Wechselnde Angaben oder viele Infos → Link auf eigene Seite, sonst vCard',
        ],
      },
      {
        heading: 'Welche Felder in die vCard gehören',
        paragraphs: [
          'Jedes zusätzliche Feld macht das Muster feiner, und ein feines Muster braucht mehr Fläche, um zuverlässig gescannt zu werden. Auf einer Karte mit 85 × 55 mm ist Platz knapp – beschränke dich auf das, was jemand tatsächlich zum Kontaktieren braucht.',
        ],
        list: [
          'Vorname und Nachname',
          'Firma und Position',
          'Mobilnummer im internationalen Format, z. B. +49 170 1234567',
          'E-Mail-Adresse',
          'Website – ohne lange Pfade',
          'Postadresse und Notiz nur, wenn wirklich nötig',
        ],
      },
      {
        heading: 'Größe und Platzierung',
        paragraphs: [
          'Auf einer Visitenkarte sollte der Code mindestens 2 × 2 cm groß sein, mit vielen Feldern eher 2,5 × 2,5 cm. Rund um den Code braucht es einen hellen, freien Rand (die sogenannte Ruhezone) von etwa vier Modulbreiten – also keine Linien oder Texte direkt an der Kante.',
          'Die Rückseite ist meist der beste Platz: Dort konkurriert der Code nicht mit Logo und Name, und du kannst ihn mit einem kurzen Hinweis wie „Kontakt speichern“ versehen. Auf der Vorderseite wirkt er schnell gedrängt.',
        ],
      },
      {
        heading: 'Gestaltung und Druckdaten',
        paragraphs: [
          'Für die Druckerei lädst du den Code als SVG herunter. Das ist eine Vektorgrafik, die sich ohne Qualitätsverlust auf jede Größe skalieren lässt und sich in gängigen Grafik- und Layoutprogrammen platzieren lässt. Ein PNG eignet sich eher für den Bürodrucker; wähle dann die höchste Auflösung von 4096 px.',
          'Dein Logo kannst du in die Mitte des Codes setzen. Die Fehlerkorrektur wird dabei automatisch auf die höchste Stufe gestellt, damit der verdeckte Bereich ausgeglichen wird. Bei Farben gilt: dunkle Punkte auf hellem Grund, mit deutlichem Kontrast. Firmenfarben wie Dunkelblau oder Dunkelgrün funktionieren, Pastelltöne oder Gold auf Weiß oft nicht.',
        ],
      },
      {
        heading: 'Vor dem Druck testen',
        paragraphs: [
          'Der Generator prüft bereits automatisch, ob sich dein Code lesen lässt. Trotzdem lohnt ein Test unter echten Bedingungen, denn Papier, Druckfarbe und Größe verändern das Ergebnis.',
        ],
        list: [
          'Probeausdruck in Originalgröße auf normalem Papier',
          'Mit einem iPhone über die Kamera-App scannen',
          'Mit einem Android-Handy über die Kamera oder Google Lens scannen',
          'Prüfen, ob Umlaute im Namen korrekt erscheinen und die Nummer anrufbar ist',
          'Bei Glanz- oder Strukturpapier zusätzlich einen Andruck der Druckerei testen',
        ],
      },
    ],
    faqs: [
      {
        q: 'Was passiert, wenn sich meine Telefonnummer ändert?',
        a: 'Ein vCard-Code enthält die alte Nummer fest im Muster, du brauchst dann einen neuen Code – und neue Karten. Wenn du häufiger wechselnde Angaben hast, verlinke besser auf eine eigene Kontaktseite, die du selbst aktualisierst.',
      },
      {
        q: 'Kann ich ein Foto in die vCard packen?',
        a: 'Nicht sinnvoll. Ein Foto würde den Code so groß machen, dass er auf einer Visitenkarte nicht mehr scannbar wäre. Ein Foto gehört auf die verlinkte Kontaktseite.',
      },
      {
        q: 'Werden meine Kontaktdaten bei qrcode.de gespeichert?',
        a: 'Nein. Der Code wird in deinem Browser berechnet, die Daten werden nicht übertragen und nirgends gespeichert. Sie stehen nur im QR-Code selbst.',
      },
      {
        q: 'Kann ich den Code als PDF oder EPS bekommen?',
        a: 'qrcode.de bietet PNG und SVG an. Die SVG-Datei ist eine Vektorgrafik, die Druckereien und Layoutprogramme verarbeiten; bei Bedarf lässt sie sich dort in andere Formate umwandeln.',
      },
    ],
    relatedTypes: ['vcard', 'url', 'email', 'phone'],
  },

  // ---------------------------------------------------------------------------
  {
    slug: 'qr-code-fuer-pdf',
    title: 'QR-Code für PDF erstellen: So geht’s richtig',
    description:
      'PDF per QR-Code teilen: Datei online stellen, Freigabe prüfen, Link in den Code. Mit stabiler Adresse, damit du das Dokument später austauschen kannst.',
    h1: ['QR-Code für', 'ein PDF'],
    lead: 'Bedienungsanleitung, Flyer oder Exposé: Mit einem QR-Code öffnen Leute dein Dokument direkt auf dem Handy. Wichtig ist, wo die Datei liegt – und dass der Link auch in einem Jahr noch funktioniert.',
    updated: '2026-11-20',
    readMinutes: 5,
    sections: [
      {
        heading: 'Ein QR-Code enthält keine Datei',
        paragraphs: [
          'Ein QR-Code kann nur wenige Kilobyte speichern – je nach Inhalt einige hundert bis knapp 3.000 Zeichen. Ein PDF passt da nicht hinein. Der Code enthält deshalb nur den Link zur Datei, und die Datei selbst muss irgendwo im Internet erreichbar sein.',
          'qrcode.de lädt keine Dateien hoch und hostet nichts – der Code entsteht in deinem Browser, und es wird nichts übertragen. Du stellst das PDF also zuerst selbst online und erzeugst danach den Code für den Link.',
        ],
      },
      {
        heading: 'Wo du das PDF ablegen kannst',
        paragraphs: [
          'Am zuverlässigsten ist deine eigene Website. Fast jedes Baukastensystem und jedes CMS erlaubt das Hochladen von Dateien in eine Medienbibliothek; danach bekommst du eine Adresse wie deinefirma.de/downloads/anleitung.pdf.',
          'Hast du keine Website, geht auch ein Cloud-Speicher wie Google Drive, OneDrive, Dropbox oder iCloud Drive. Dort erzeugst du einen Freigabelink. Achte darauf, dass der Dienst dauerhaft genutzt wird – kündigst du das Konto oder räumst den Ordner auf, ist der Link weg.',
        ],
      },
      {
        heading: 'Freigabe prüfen: „Jeder mit dem Link“',
        paragraphs: [
          'Der häufigste Fehler bei Cloud-Links: Die Datei ist nur für dich oder dein Team freigegeben. Wer scannt, sieht dann eine Anmeldeseite oder „Zugriff verweigert“. Stelle die Freigabe auf „Jeder mit dem Link“ bzw. „Jeder, der über den Link verfügt“ (die genaue Bezeichnung unterscheidet sich je nach Dienst) und auf „Nur ansehen“.',
        ],
        list: [
          'Freigabe auf „Jeder mit dem Link“ und Leserechte stellen',
          'Link kopieren – nicht die Adresse aus der Browserzeile, wenn der Dienst einen eigenen Freigabelink anbietet',
          'Link in einem privaten Browserfenster öffnen, in dem du nicht angemeldet bist',
          'Zusätzlich auf dem Handy über Mobilfunk testen, nicht nur im Büro-WLAN',
        ],
      },
      {
        heading: 'Stabile Adresse: Datei später austauschen',
        paragraphs: [
          'Die Codes von qrcode.de sind statisch: Der Link steckt fest im Muster und lässt sich nachträglich nicht ändern. Damit du das PDF trotzdem aktualisieren kannst, verlinkst du auf eine Adresse, die gleich bleibt, während sich der Inhalt dahinter ändert.',
          'Auf der eigenen Website lädst du die neue Version unter demselben Dateinamen hoch oder richtest eine kurze Adresse wie deinefirma.de/anleitung ein, die auf die jeweils aktuelle Datei weiterleitet. In vielen Cloud-Diensten kannst du eine neue Version einer Datei hochladen, ohne dass sich der Freigabelink ändert – bei Google Drive etwa über „Versionen verwalten“ oder einen ähnlich benannten Menüpunkt. Lädst du dagegen eine neue Datei hoch und löschst die alte, entsteht ein neuer Link und der gedruckte Code führt ins Leere.',
        ],
      },
      {
        heading: 'PDFs, die auf dem Handy lesbar sind',
        paragraphs: [
          'Wer einen QR-Code scannt, öffnet das Dokument fast immer auf dem Smartphone. Ein PDF, das für A3-Plakate gestaltet ist, wird dort zur Zoom-Übung. Ein paar Regeln helfen:',
        ],
        list: [
          'Hochformat statt Querformat, eine Spalte statt drei',
          'Gut lesbare Schriftgröße, nicht kleiner als im Druck üblich',
          'Bilder für den Bildschirm komprimieren – wenige Megabyte laden auch unterwegs schnell',
          'Wichtigste Information auf die erste Seite',
          'Bei langen Dokumenten Lesezeichen bzw. ein verlinktes Inhaltsverzeichnis anlegen',
        ],
      },
      {
        heading: 'Typische Anwendungsfälle',
        paragraphs: [
          'Überall, wo auf Papier kein Platz für alle Informationen ist, kann ein Code auf das vollständige Dokument verweisen. Wähle im Generator die Art „Link“, füge die Adresse ein und gib dem Code einen Rahmen mit Text wie „Mehr erfahren“, damit klar ist, was hinter dem Scan steckt.',
        ],
        list: [
          'Bedienungsanleitung: Code auf Gerät, Verpackung oder Kurzanleitung, damit die Anleitung nicht verloren geht',
          'Flyer und Prospekte: ausführliche Preisliste oder Programm als PDF',
          'Immobilien-Exposé: Code auf dem Schild „Zu verkaufen“ oder im Schaufenster des Maklerbüros',
          'Aushang im Treppenhaus, Verein oder Schule: Hausordnung, Formulare, Termine',
          'Speisekarte, Menü oder Seminarunterlagen',
        ],
      },
    ],
    faqs: [
      {
        q: 'Kann ich bei qrcode.de ein PDF hochladen?',
        a: 'Nein. qrcode.de erzeugt Codes direkt in deinem Browser und speichert keine Dateien. Lade das PDF auf deine Website oder in einen Cloud-Speicher und erstelle den Code dann für den Link.',
      },
      {
        q: 'Funktioniert der Code, wenn ich das PDF austausche?',
        a: 'Ja, solange die Adresse gleich bleibt – also bei gleichem Dateinamen auf deiner Website, einer Weiterleitung oder einer neuen Version im Cloud-Speicher. Ändert sich der Link, brauchst du einen neuen Code.',
      },
      {
        q: 'Warum sehen manche Leute nur eine Anmeldeseite?',
        a: 'Dann ist die Datei im Cloud-Speicher nicht öffentlich freigegeben. Stelle die Freigabe auf „Jeder mit dem Link“ und teste den Link in einem privaten Browserfenster.',
      },
    ],
    relatedTypes: ['url', 'text'],
  },
]
