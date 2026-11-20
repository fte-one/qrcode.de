import type { Guide } from './types'

export const coreGuides: Guide[] = [
  // ------------------------------------------------------------------ statisch vs. dynamisch
  {
    slug: 'statischer-oder-dynamischer-qr-code',
    title: 'Statischer oder dynamischer QR-Code?',
    description:
      'Statische und dynamische QR-Codes im Vergleich: Was sie unterscheidet, wann sich welche Art lohnt und wie du ein Linkziel auch ohne Abo änderbar hältst.',
    h1: ['Statisch oder dynamisch:', 'welcher QR-Code passt?'],
    lead: 'Beide Arten sehen gleich aus und lassen sich gleich scannen. Der Unterschied liegt darin, wo dein Inhalt gespeichert ist – und wer ihn abschalten kann.',
    updated: '2026-11-20',
    readMinutes: 5,
    sections: [
      {
        heading: 'Der Unterschied in einem Satz',
        paragraphs: [
          'Ein statischer QR-Code enthält deinen Inhalt direkt im Muster. Ein dynamischer QR-Code enthält nur eine kurze Adresse beim Anbieter, dessen Server jeden Scan an dein eigentliches Ziel weiterleitet.',
          'Beim statischen Code steht also zum Beispiel https://deinefirma.de/speisekarte im Muster, beim dynamischen etwas wie eine Kurzadresse mit Zufallskennung. Das Handy merkt davon nichts: Es öffnet die Adresse, der Server des Anbieters antwortet mit einer Weiterleitung, und erst dann landet der Besucher auf deiner Seite.',
        ],
      },
      {
        heading: 'Was für dynamische Codes spricht',
        paragraphs: [
          'Dynamische Codes haben echte Vorteile, und es wäre unfair, sie zu verschweigen. Weil jeder Scan über den Server des Anbieters läuft, kann er dort ausgewertet und das Ziel jederzeit geändert werden.',
        ],
        list: [
          'Ziel änderbar: Der Flyer ist gedruckt, die Aktion endet – du stellst das Ziel um, ohne neu zu drucken.',
          'Scan-Statistik: Anzahl der Scans, Zeitpunkt und meist ungefähre Region und Gerätetyp.',
          'Kurzes Muster: Weil nur eine kurze Adresse im Code steckt, bleibt das Muster grob und lässt sich auch klein gut lesen.',
        ],
      },
      {
        heading: 'Der Haken: Abhängigkeit vom Anbieter',
        paragraphs: [
          'Ein dynamischer Code funktioniert nur, solange der Anbieter die Weiterleitung betreibt. Endet das Abo, läuft eine kostenlose Testphase aus oder stellt der Dienst den Betrieb ein, führt der Scan ins Leere oder auf eine Seite des Anbieters. Bei Codes auf Verpackungen, Schildern oder Fahrzeugen ist das teuer, denn das Gedruckte lässt sich nicht nachträglich reparieren.',
          'Dazu kommen kleinere Punkte: Jeder Scan geht über einen zusätzlichen Server, was den Aufruf etwas verlangsamt. Und der Anbieter erfährt bei jedem Scan zumindest IP-Adresse und Zeitpunkt. Wenn du Scans auswertest, gehört das in deine Datenschutzerklärung.',
        ],
      },
      {
        heading: 'Was statische Codes können – und was nicht',
        paragraphs: [
          'Ein statischer Code hat kein Ablaufdatum, weil es nichts gibt, das ablaufen könnte. Er funktioniert ohne Konto, ohne Server dazwischen und, bei Inhalten wie Text, WLAN-Zugang oder Kontaktdaten, sogar ganz ohne Internet. Niemand zählt mit, wer ihn scannt.',
          'Der Preis dafür: Was einmal im Muster steht, bleibt dort. Ändert sich deine Telefonnummer oder das WLAN-Passwort, brauchst du einen neuen Code. Eine eingebaute Scan-Statistik gibt es ebenfalls nicht. qrcode.de erzeugt ausschließlich statische Codes – direkt in deinem Browser, ohne dass dein Inhalt an uns übertragen wird.',
        ],
      },
      {
        heading: 'Der Trick: eigene Domain plus Weiterleitung',
        paragraphs: [
          'Wenn du eine eigene Website hast, bekommst du die wichtigsten Vorteile beider Welten. Du erzeugst einen statischen Code, der auf eine Adresse deiner eigenen Domain zeigt, etwa deinefirma.de/flyer. Diese Adresse leitest du in deinem Hosting, deinem CMS oder per Server-Regel dorthin weiter, wo du gerade hinwillst.',
          'Bei den meisten Hostern und Website-Baukästen findest du die Funktion unter „Weiterleitung“ oder „Redirect“, für WordPress gibt es dafür Erweiterungen. Du trägst den Pfad ein, etwa /flyer, und das Ziel, auf das er zeigen soll.',
          'Wähle dabei eine vorübergehende Weiterleitung (Statuscode 302 oder 307), keine dauerhafte (301). Browser merken sich dauerhafte Weiterleitungen und rufen beim nächsten Scan unter Umständen direkt das alte Ziel auf, auch wenn du es längst geändert hast. Teste die Adresse nach jeder Änderung einmal mit dem Handy.',
        ],
        list: [
          'Ziel ändern: Weiterleitung umstellen, der gedruckte Code bleibt gültig.',
          'Statistik: Hänge Parameter wie ?utm_source=flyer an das Weiterleitungsziel. Dann siehst du die Scans in der Auswertung deiner eigenen Website.',
          'Keine Abhängigkeit: Die Weiterleitung läuft so lange wie deine Domain – und die hast du selbst in der Hand.',
          'Kurze Adresse: deinefirma.de/flyer ergibt ein gröberes Muster als eine lange Shop-URL mit Parametern.',
        ],
      },
      {
        heading: 'Woran du erkennst, welche Art du hast',
        paragraphs: [
          'Scanne den Code und sieh dir an, was drinsteht – am einfachsten mit unserem QR-Code-Scanner, der den Inhalt anzeigt, ohne ihn zu öffnen. Steht dort direkt deine Adresse, dein WLAN-Name oder deine Visitenkarte, ist der Code statisch. Steht dort eine kurze Adresse auf einer fremden Domain, die du nicht kennst, ist er dynamisch.',
          'Ein zweiter Hinweis: Hast du den Code bei einem Dienst mit Konto erstellt und kannst dort das Ziel bearbeiten oder Scans einsehen, ist er praktisch immer dynamisch. Dann lohnt ein Blick in die Vertragsbedingungen, was nach Ende des Abos oder der Testphase mit dem Code passiert.',
        ],
      },
      {
        heading: 'Welche Art für welchen Zweck?',
        paragraphs: [
          'Für Visitenkarten, WLAN-Schilder, Überweisungen per GiroCode, Etiketten und alles, was jahrelang hängt, ist der statische Code die sichere Wahl. Für eine kurze Kampagne, bei der du Scans auswerten und das Ziel häufig wechseln willst, kann ein dynamischer Code bequem sein – solange dir klar ist, dass er nur mit dem Anbieter funktioniert. Wer eine eigene Domain hat, fährt mit statischem Code plus eigener Weiterleitung meist am besten.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Laufen statische QR-Codes ab?',
        a: 'Nein. Der Inhalt steckt im Muster selbst, es gibt keinen Server, der abgeschaltet werden könnte. Ein Link-Code funktioniert so lange, wie die verlinkte Webseite erreichbar ist.',
      },
      {
        q: 'Kann ich einen statischen QR-Code nachträglich ändern?',
        a: 'Den Code selbst nicht. Zeigt er aber auf eine Adresse deiner eigenen Domain, kannst du diese Adresse jederzeit auf ein neues Ziel weiterleiten.',
      },
      {
        q: 'Bietet qrcode.de dynamische QR-Codes an?',
        a: 'Nein. Wir erzeugen nur statische Codes, direkt in deinem Browser. Deshalb gibt es bei uns auch keine Scan-Statistik – Scans kannst du über die Auswertung deiner eigenen Website erfassen.',
      },
      {
        q: 'Was passiert mit einem dynamischen Code, wenn das Abo endet?',
        a: 'Das regeln die Bedingungen des jeweiligen Anbieters. Häufig wird die Weiterleitung abgeschaltet oder auf eine Seite des Anbieters umgestellt. Prüfe das, bevor du große Auflagen druckst.',
      },
    ],
    relatedTypes: ['url', 'vcard', 'wifi'],
  },

  // ------------------------------------------------------------------ Größe & Druck
  {
    slug: 'qr-code-groesse-drucken',
    title: 'QR-Code drucken: Größe, Abstand & Auflösung',
    description:
      'Wie groß muss ein QR-Code gedruckt sein? Faustregel für den Scan-Abstand, Ruhezone, Kontrast, Material, Auflösung in dpi und die richtige Fehlerkorrektur.',
    h1: ['QR-Code drucken:', 'die richtige Größe'],
    lead: 'Die meisten QR-Codes scheitern nicht am Generator, sondern am Druck. Mit ein paar Zahlen im Kopf bekommst du Größe, Rand und Auflösung auf Anhieb richtig.',
    updated: '2026-11-20',
    readMinutes: 6,
    sections: [
      {
        heading: 'Faustregel: Scan-Abstand geteilt durch zehn',
        paragraphs: [
          'Die Kantenlänge des Codes sollte mindestens ein Zehntel des Abstands betragen, aus dem gescannt wird. Wer am Tisch aus 30 cm scannt, kommt mit 3 cm aus. Ein Plakat, das aus 2 m Entfernung gelesen werden soll, braucht 20 cm, ein Schild an der Hauswand für 5 m Abstand 50 cm.',
          'Nach unten gilt: nie kleiner als 2 cm. Darunter stellen viele Handykameras nicht mehr scharf, besonders bei älteren Geräten und schlechtem Licht. Den passenden Wert für deinen Fall rechnet dir der Größenrechner auf unserer Startseite aus.',
          'Die Regel gilt auch für Bildschirme und Präsentationen. Soll ein Code auf der Leinwand aus der letzten Reihe in 8 m Entfernung gescannt werden, muss er dort rund 80 cm groß erscheinen – auf einer Folie also einen großen Teil der Höhe einnehmen.',
        ],
      },
      {
        heading: 'Viel Inhalt braucht mehr Fläche',
        paragraphs: [
          'Ein QR-Code besteht aus Modulen, den kleinen Quadraten im Muster. Je mehr Inhalt, desto mehr Module – bei gleicher Druckgröße wird jedes einzelne also kleiner. Eine kurze Webadresse ergibt etwa 25 × 25 bis 33 × 33 Module, eine ausführliche Visitenkarte mit Adresse und mehreren Telefonnummern schnell 50 × 50 oder mehr.',
          'Die Faustregel ist deshalb eine Untergrenze. Bei langen Inhalten druckst du lieber eine Stufe größer oder kürzt den Inhalt: Eine kurze Adresse statt einer langen URL mit vielen Parametern macht das Muster sichtbar gröber.',
        ],
      },
      {
        heading: 'Ruhezone: der Rand gehört dazu',
        paragraphs: [
          'Um den Code herum braucht es einen hellen Rand von mindestens vier Modulbreiten, die sogenannte Ruhezone. Daran erkennt die Kamera, wo der Code anfängt. Rückt Text, eine Linie oder eine dunkle Fläche zu nah heran, schlägt der Scan oft fehl.',
          'Unsere Downloads enthalten die Ruhezone bereits. Schneide sie im Layout nicht ab und lege den Code nicht randlos auf ein Foto oder eine farbige Fläche.',
        ],
      },
      {
        heading: 'Kontrast, Farbe und Material',
        paragraphs: [
          'Scanner unterscheiden nur hell und dunkel. Entscheidend ist deshalb der Helligkeitsunterschied, nicht die Farbe: Dunkelblau auf Weiß funktioniert, Gelb auf Weiß oder Hellgrau auf Mittelgrau nicht. Wählst du im Generator eigene Farben, weist er dich darauf hin, wenn Code und Hintergrund zu nah beieinanderliegen.',
          'Bedenke auch den Druck selbst: Farben kommen auf ungestrichenem Papier oft blasser heraus als am Bildschirm. Was am Monitor gerade noch reicht, kann gedruckt schon zu flau sein.',
        ],
        list: [
          'Dunkler Code auf hellem Grund. Helle Codes auf dunklem Grund liest nicht jede Scanner-App zuverlässig.',
          'Matte Oberflächen bevorzugen. Hochglanz, Folienkaschierung oder Glas davor erzeugen Spiegelungen, die Teile des Musters überstrahlen.',
          'Nicht über Kanten oder Rundungen drucken. Auf Flaschen und Dosen verzerrt eine starke Wölbung das Muster – dort lieber etwas kleiner und auf die flachste Stelle.',
          'Struktur beachten: Grobes Papier, Stoff oder Holz lassen feine Module ausfransen. Hier hilft ein größerer Code mit weniger Inhalt.',
        ],
      },
      {
        heading: 'Vektor oder Pixel – und wie viele Pixel?',
        paragraphs: [
          'Für den Druck ist SVG die erste Wahl. Eine Vektordatei bleibt in jeder Größe scharf, von der Visitenkarte bis zum Banner, und jede Druckerei kann sie verarbeiten. PNG ist ein Pixelbild: Wird es zu stark vergrößert, werden die Kanten unscharf.',
          'Brauchst du doch ein PNG, rechne mit 300 dpi: Kantenlänge in Zentimetern geteilt durch 2,54, mal 300. Ein Code von 3 cm braucht also rund 350 Pixel, einer von 10 cm rund 1.180 Pixel. Unser größtes PNG mit 4.096 Pixeln reicht bei 300 dpi für knapp 35 cm Kantenlänge. Für alles darüber nimm SVG.',
        ],
      },
      {
        heading: 'Fehlerkorrektur: Reserve für Kratzer und Schmutz',
        paragraphs: [
          'Jeder QR-Code enthält zusätzliche Daten, mit denen sich beschädigte Stellen rekonstruieren lassen. Es gibt vier Stufen. Mehr Reserve bedeutet allerdings mehr Module und damit ein feineres Muster.',
        ],
        list: [
          'L – etwa 7 %: für saubere Umgebungen und viel Inhalt.',
          'M – etwa 15 %: der gute Standard für Papier, Flyer und Bildschirm.',
          'Q – etwa 25 %: für Etiketten, Außenschilder und Stellen, die schmutzig werden können.',
          'H – etwa 30 %: für raue Umgebungen und für Codes mit Logo. Bei qrcode.de wird H automatisch gewählt, sobald du ein Logo einfügst.',
        ],
      },
      {
        heading: 'Vor der Auflage: Probedruck',
        paragraphs: [
          'Druck den Code in Originalgröße auf dem echten Material aus und scanne ihn mit zwei, drei verschiedenen Handys – aus dem tatsächlichen Abstand, bei dem Licht, das am Einsatzort herrscht. Das kostet fünf Minuten und erspart dir im Zweifel eine komplette Neuauflage. Unser Scan-Test im Generator prüft nach jeder Änderung, ob der Code lesbar ist; Papier, Glanz und Licht kann er aber nicht simulieren.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Wie klein darf ein QR-Code sein?',
        a: 'Als Untergrenze gelten etwa 2 × 2 cm, und das nur bei wenig Inhalt und Scan aus kurzer Entfernung. Für alles andere gilt: Scan-Abstand geteilt durch zehn.',
      },
      {
        q: 'Welches Dateiformat brauche ich für die Druckerei?',
        a: 'Am besten SVG. Die Vektordatei bleibt in jeder Größe scharf. Fragt die Druckerei nach PDF oder EPS, kann sie das SVG in der Regel selbst umwandeln – oder du öffnest es in einem Grafikprogramm und exportierst es dort.',
      },
      {
        q: 'Darf ich den QR-Code farbig drucken?',
        a: 'Ja, solange der Code deutlich dunkler ist als der Hintergrund. Kräftige dunkle Farben auf Weiß funktionieren gut, helle Farben oder Pastelltöne oft nicht.',
      },
      {
        q: 'Welche Fehlerkorrektur soll ich wählen?',
        a: 'M passt für die meisten Drucksachen. Für Außenschilder und Etiketten nimm Q oder H, mit Logo ist H Pflicht – das stellt unser Generator automatisch ein.',
      },
    ],
    relatedTypes: ['url', 'wifi', 'vcard', 'girocode'],
  },

  // ------------------------------------------------------------------ Logo
  {
    slug: 'qr-code-mit-logo',
    title: 'QR-Code mit Logo erstellen – so bleibt er lesbar',
    description:
      'Logo in den QR-Code einfügen, ohne dass der Scan scheitert: wie es funktioniert, wie groß das Logo sein darf und welche Fehler du vermeiden solltest.',
    h1: ['QR-Code mit Logo,', 'der trotzdem scannt'],
    lead: 'Ein Logo in der Mitte macht deinen Code sofort wiedererkennbar. Damit er lesbar bleibt, kommt es auf Größe, Kontrast und die richtige Fehlerkorrektur an.',
    updated: '2026-11-20',
    readMinutes: 4,
    sections: [
      {
        heading: 'Warum ein Logo überhaupt funktioniert',
        paragraphs: [
          'Ein Logo verdeckt einen Teil des Musters – eigentlich ein Schaden. Dass der Code trotzdem lesbar bleibt, liegt an der Fehlerkorrektur: Jeder QR-Code enthält zusätzliche Daten, mit denen der Scanner fehlende oder verschmutzte Stellen rekonstruiert. In der höchsten Stufe H lassen sich etwa 30 % der Daten wiederherstellen.',
          'Wichtig: Diese 30 % beziehen sich auf die Daten, nicht auf eine beliebige Fläche. Die drei großen Quadrate in den Ecken, die Positionsmarken, werden für die Orientierung gebraucht und sind durch die Fehlerkorrektur nicht abgedeckt. Und ein Teil der Reserve sollte für Kratzer, Spiegelungen oder Unschärfe übrig bleiben.',
          'Deshalb gehört das Logo in die Mitte: Dort liegen fast nur Daten, die von der Fehlerkorrektur geschützt sind, und es ist weit genug von den Positionsmarken entfernt.',
        ],
      },
      {
        heading: 'Wie groß darf das Logo sein?',
        paragraphs: [
          'Weniger ist mehr. Bewährt hat sich ein Logo, das deutlich unter einem Drittel der Kantenlänge bleibt. Im Generator von qrcode.de stellst du die Größe zwischen 14 und 28 % der Kantenlänge ein. Das entspricht etwa 2 bis 8 % der Fläche, dazu kommt ein schmaler Freiraum rund um das Logo.',
          'Das klingt wenig, reicht aber für ein gut erkennbares Zeichen. Bei viel Inhalt, etwa einer kompletten Visitenkarte, wird das Muster dichter. Dann ist ein kleineres Logo die sicherere Wahl.',
          'Bei einem breiten oder hohen Logo bezieht sich die Größe auf die längere Seite. Ein Logo im Querformat verdeckt deshalb weniger Fläche als ein quadratisches mit derselben Einstellung und lässt sich oft etwas größer wählen.',
        ],
      },
      {
        heading: 'Kontrast und Form des Logos',
        paragraphs: [
          'Das Logo selbst muss nicht gescannt werden, es darf aber das Muster drumherum nicht stören. Am besten funktionieren kompakte Bildmarken oder Symbole statt langer Schriftzüge – ein breiter Schriftzug wird in der Mitte schnell unleserlich klein.',
          'Farblich gilt dasselbe wie für den ganzen Code: Das Logo darf bunt sein, der Code drumherum sollte dunkel auf hellem Grund bleiben. Ein Firmenlogo in Hellgelb fällt im Code weniger auf, als man denkt – oft wirkt die einfarbige, dunkle Variante des Logos ruhiger und markanter.',
        ],
        list: [
          'Bildmarke statt Wortmarke: Ein Symbol oder Initialen wirken auf kleiner Fläche besser.',
          'Transparenter oder heller Hintergrund: Ein PNG oder SVG mit Transparenz fügt sich sauber ein.',
          'Kein Logo in Code-Farbe ohne Abstand: Berührt ein dunkles Logo direkt dunkle Module, verschwimmen die Grenzen.',
          'Genug Auflösung: Lade das Logo in ausreichender Größe hoch, damit es im Druck nicht verpixelt.',
        ],
      },
      {
        heading: 'Typische Fehler',
        paragraphs: [
          'Die meisten unlesbaren Logo-Codes haben eine dieser Ursachen. Fast alle lassen sich mit einem Scan-Test vor dem Druck entdecken.',
        ],
        list: [
          'Logo zu groß, damit es „besser wirkt“ – und plötzlich fehlen zu viele Daten.',
          'Logo über einer Ecke oder am Rand statt in der Mitte, wo es Positionsmarken verdeckt.',
          'Fehlerkorrektur auf L oder M belassen, obwohl ein Logo im Code sitzt.',
          'Zusätzlich zum Logo blasse Farben oder ein Farbverlauf mit zu wenig Kontrast.',
          'Der Code wird nachträglich in einem Grafikprogramm mit dem Logo überlagert, ohne erneuten Scan-Test.',
        ],
      },
      {
        heading: 'Schritt für Schritt mit dem Generator',
        paragraphs: [
          'So erstellst du einen Code mit Logo auf qrcode.de. Alles passiert in deinem Browser, dein Logo wird nur auf deinem Gerät verarbeitet und nicht an uns übertragen.',
        ],
        list: [
          'Inhalt eingeben, zum Beispiel die Adresse deiner Website.',
          'Im Gestaltungsbereich den Tab „Logo“ öffnen und „Eigenes Logo hochladen“ wählen – PNG, JPG, SVG oder WebP bis 8 MB. Alternativ eines der vorhandenen Symbole antippen.',
          'Mit dem Regler die Größe einstellen. Die Fehlerkorrektur steht automatisch auf H, solange ein Logo eingefügt ist.',
          'Auf den Scan-Test unter der Vorschau achten. Er liest den fertigen Code nach jeder Änderung zurück und zeigt an, ob er bestanden ist.',
          'Als SVG für den Druck oder als PNG bis 4.096 Pixel herunterladen und zusätzlich mit dem eigenen Handy prüfen.',
        ],
      },
      {
        heading: 'Logo, Farben und Rahmen kombinieren',
        paragraphs: [
          'Ein Logo verträgt sich mit eigenen Farben, anderen Mustern und einem der acht Rahmen. Jede zusätzliche Gestaltung kostet aber etwas Lesbarkeit. Faustregel: Wenn du ein Logo verwendest, halte den Rest zurückhaltend – kräftige dunkle Code-Farbe, heller Hintergrund, ein ruhiges Muster ohne Farbverlauf. Der Scan-Test zeigt dir sofort, ob die Kombination noch funktioniert.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Macht ein Logo den QR-Code schlechter lesbar?',
        a: 'Etwas, ja – es verbraucht einen Teil der Fehlerkorrektur. Mit Stufe H, einem nicht zu großen Logo in der Mitte und gutem Kontrast bleibt der Code aber zuverlässig lesbar.',
      },
      {
        q: 'Welches Dateiformat sollte mein Logo haben?',
        a: 'Am besten PNG mit transparentem Hintergrund oder SVG. JPG und WebP funktionieren ebenfalls, haben aber oft einen weißen oder farbigen Kasten um das Logo.',
      },
      {
        q: 'Wird mein Logo auf euren Server hochgeladen?',
        a: 'Nein. Das Bild wird in deinem Browser verarbeitet und in den Code eingesetzt. Es verlässt dein Gerät nicht.',
      },
    ],
    relatedTypes: ['url', 'vcard', 'whatsapp'],
  },

  // ------------------------------------------------------------------ Sicherheit / Quishing
  {
    slug: 'qr-code-sicherheit-quishing',
    title: 'Quishing: Betrug mit QR-Codes erkennen',
    description:
      'Was Quishing ist, welche Maschen mit gefälschten QR-Codes verbreitet sind, woran du sie erkennst und was du tun solltest, wenn du hereingefallen bist.',
    h1: ['Quishing:', 'Betrug per QR-Code erkennen'],
    lead: 'Ein QR-Code verrät von außen nicht, wohin er führt. Genau das nutzen Betrüger aus. Mit ein paar Gewohnheiten schützt du dich zuverlässig.',
    updated: '2026-11-20',
    readMinutes: 4,
    sections: [
      {
        heading: 'Was ist Quishing?',
        paragraphs: [
          'Quishing setzt sich aus „QR“ und „Phishing“ zusammen. Gemeint sind Betrugsversuche, bei denen ein QR-Code auf eine gefälschte Webseite führt. Dort sollst du Zugangsdaten eingeben, eine Zahlung leisten oder eine App installieren.',
          'Der Trick funktioniert, weil man einem Code nicht ansieht, was drinsteckt. Ein Link in einer E-Mail lässt sich vor dem Klick prüfen, ein schwarz-weißes Muster nicht. Außerdem landet der Code meist auf dem Handy, wo die Adresszeile klein und schnell übersehen ist.',
          'Neben Links können QR-Codes auch andere Aktionen anstoßen: eine Telefonnummer wählen, eine SMS vorbereiten oder ein WLAN hinzufügen. Das Handy fragt vorher nach. Bestätige nur, was du in dem Moment wirklich erwartest – ein unbekanntes WLAN oder eine SMS an eine fremde Kurzwahl gehören nicht dazu.',
        ],
      },
      {
        heading: 'Typische Maschen',
        paragraphs: [
          'Die Methoden ändern sich, das Muster bleibt gleich: Ein vertrauenswürdig wirkender Ort oder Absender, Zeitdruck und am Ende eine Eingabe von Daten oder Geld.',
        ],
        list: [
          'Überklebte Codes an Parkautomaten und Ladesäulen: Ein Aufkleber über dem echten Code führt auf eine nachgebaute Bezahlseite.',
          'Briefe, angeblich von deiner Bank: Du sollst per QR-Code ein Sicherheitsverfahren „aktualisieren“ oder eine Sperre aufheben und landest auf einer gefälschten Anmeldeseite.',
          'Paket-Benachrichtigungen: Ein Zettel oder eine E-Mail meldet eine gescheiterte Zustellung und verlangt per QR-Code eine kleine Gebühr. Dieselbe Masche kennst du aus SMS mit Link.',
          'E-Mails mit Code statt Link: Weil ein Bild schwerer automatisch zu prüfen ist als ein Link, verstecken Betrüger die Adresse gern in einem QR-Code.',
          'Angebliche Strafzettel oder Rechnungen, die per Scan bezahlt werden sollen.',
        ],
      },
      {
        heading: 'Woran du einen gefälschten Code erkennst',
        paragraphs: [
          'Am Muster selbst gar nicht – entscheidend ist, wohin der Code führt und in welchem Zusammenhang er auftaucht.',
        ],
        list: [
          'Der Code ist ein Aufkleber, sitzt schief, wirkt nachträglich angebracht oder liegt über einem anderen Code.',
          'Die angezeigte Adresse passt nicht zum Absender, enthält Tippfehler in bekannten Namen oder Zusätze wie „-sicherheit“ oder „-login“.',
          'Kurzlinks, bei denen du das Ziel nicht erkennst.',
          'Druck und Eile: „Innerhalb von 24 Stunden“, „sonst wird Ihr Konto gesperrt“.',
          'Direkt nach dem Scan werden Zugangsdaten, TAN, Kartendaten oder die Installation einer App verlangt.',
        ],
      },
      {
        heading: 'So prüfst du einen Code, bevor du ihn öffnest',
        paragraphs: [
          'Die meisten Handy-Kameras zeigen die erkannte Adresse an, bevor sie sie öffnen. Lies sie vollständig und tippe erst dann. Entscheidend ist der Teil vor dem ersten einzelnen Schrägstrich, und zwar von hinten gelesen: Bei deinebank.de.konto-pruefen.net gehört die Seite zu konto-pruefen.net, nicht zu deiner Bank. Noch vorsichtiger ist unser QR-Code-Scanner: Er zeigt dir den Inhalt eines Codes aus einem Foto, einem Screenshot oder per Kamera an, ohne den Link zu öffnen. Die Auswertung passiert in deinem Browser.',
          'Grundsätzlich gilt: Bankgeschäfte und Anmeldungen erledigst du über die App oder die Adresse, die du selbst eintippst – nicht über einen Code aus einem Brief. Seriöse Banken schicken dich nicht per QR-Code auf eine Webseite, um dort Zugangsdaten einzugeben. Am Parkautomaten lohnt ein Blick, ob der Betreiber auf dem Automaten eine App oder Webadresse nennt, die du stattdessen direkt aufrufen kannst.',
        ],
      },
      {
        heading: 'Hereingefallen – was jetzt?',
        paragraphs: [
          'Schnell handeln begrenzt den Schaden. Mach Screenshots von der Seite und dem Code, bevor du etwas löschst.',
        ],
        list: [
          'Kartendaten eingegeben: Karte sofort sperren, bei deiner Bank oder über den Sperr-Notruf 116 116.',
          'Online-Banking-Zugang eingegeben: Bank umgehend anrufen, Zugang sperren lassen und Passwort ändern.',
          'Andere Passwörter eingegeben: Sofort ändern, auch bei anderen Diensten mit demselben Passwort, und Zwei-Faktor-Anmeldung einschalten.',
          'Per SEPA-Lastschrift bezahlt: Eine Lastschrift kannst du in der Regel innerhalb von acht Wochen ohne Angabe von Gründen zurückgeben lassen. Bei Kartenzahlungen frag deine Bank nach einer Reklamation.',
          'App installiert: Gerät vom Netz nehmen, App entfernen und im Zweifel das Handy zurücksetzen.',
          'Anzeige bei der Polizei erstatten, in vielen Bundesländern auch online. Bei überklebten Codes zusätzlich den Betreiber des Automaten oder der Ladesäule informieren.',
        ],
      },
      {
        heading: 'Wenn du selbst Codes aufhängst',
        paragraphs: [
          'Auch als Betreiber kannst du es Betrügern schwerer machen. Drucke den Code direkt auf Schild oder Automat statt ihn aufzukleben, nenne die Zieladresse lesbar daneben und kontrolliere regelmäßig, ob jemand etwas überklebt hat. Verlinke auf deine eigene, gut erkennbare Domain statt auf eine fremde Kurzadresse – dann sehen Kunden auf den ersten Blick, dass der Code wirklich zu dir gehört.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Kann ein QR-Code allein mein Handy infizieren?',
        a: 'Ein QR-Code enthält nur Daten wie eine Adresse oder einen Text. Gefährlich wird es erst, wenn du die geöffnete Seite nutzt: Daten eingibst, etwas bezahlst oder eine App installierst. Halte Betriebssystem und Browser trotzdem aktuell.',
      },
      {
        q: 'Wie sehe ich, wohin ein QR-Code führt?',
        a: 'Die Kamera-App zeigt die Adresse meist vor dem Öffnen an. Mit unserem QR-Code-Scanner siehst du den vollständigen Inhalt, ohne dass der Link geöffnet wird – aus Bild, Screenshot oder per Kamera.',
      },
      {
        q: 'Sind QR-Codes auf Briefen meiner Bank echt?',
        a: 'Möglicherweise, aber du musst es nicht herausfinden. Melde dich nie über einen Code aus einem Brief an, sondern über die Banking-App oder die selbst eingetippte Adresse. Im Zweifel ruf deine Bank unter der Nummer an, die du von deiner Karte oder Website kennst.',
      },
      {
        q: 'Was mache ich mit einem verdächtigen Code am Parkautomaten?',
        a: 'Nicht scannen, sondern bar, per Karte am Automaten oder über die vom Betreiber genannte App bezahlen. Informiere den Betreiber oder die Stadt, damit der Aufkleber entfernt wird.',
      },
    ],
    relatedTypes: ['url', 'girocode', 'wifi'],
  },
]
