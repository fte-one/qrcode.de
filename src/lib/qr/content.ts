// QR-Arten: Formularfelder + Kodierung in das jeweilige Standardformat.

export type TypeId =
  | 'url'
  | 'text'
  | 'wifi'
  | 'vcard'
  | 'email'
  | 'phone'
  | 'sms'
  | 'whatsapp'
  | 'location'
  | 'event'
  | 'girocode'
  | 'paypal'
  | 'bitcoin'

export type Values = Record<string, string | boolean>

export interface FieldDef {
  key: string
  label: string
  kind: 'text' | 'textarea' | 'tel' | 'email' | 'url' | 'number' | 'date' | 'time' | 'select' | 'checkbox'
  placeholder?: string
  half?: boolean
  options?: { value: string; label: string }[]
  hint?: string
  autoComplete?: string
  maxLength?: number
  showIf?: (v: Values) => boolean
}

export interface EncodeResult {
  data: string | null
  /** Eingabe unvollständig oder fehlerhaft – wird am Formular angezeigt */
  error?: string
  /** Hinweis, der die Erzeugung nicht verhindert */
  note?: string
}

export interface QrType {
  id: TypeId
  slug: string
  label: string
  /** Kurzbeschreibung für Kacheln */
  blurb: string
  fields: FieldDef[]
  defaults: Values
  encode: (v: Values) => EncodeResult
}

const s = (v: Values, k: string) => String(v[k] ?? '').trim()
const raw = (v: Values, k: string) => String(v[k] ?? '')
const cleanPhone = (p: string) => p.replace(/[^\d+]/g, '')

// --- Formate ----------------------------------------------------------------

const wifiEsc = (x: string) => x.replace(/([\\;,":])/g, '\\$1')
const vEsc = (x: string) => x.replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1').replace(/\r?\n/g, '\\n')

export function isValidIban(input: string): boolean {
  const iban = input.replace(/\s+/g, '').toUpperCase()
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test(iban)) return false
  const rearranged = iban.slice(4) + iban.slice(0, 4)
  let rem = 0
  for (const ch of rearranged) {
    const val = ch >= 'A' ? String(ch.charCodeAt(0) - 55) : ch
    for (const digit of val) rem = (rem * 10 + Number(digit)) % 97
  }
  return rem === 1
}

function parseAmount(input: string): number | null {
  const t = input.trim().replace(/\s|€/g, '')
  if (!t) return null
  // deutsche Schreibweise (1.234,56) und englische (1234.56) akzeptieren
  const norm = t.includes(',') ? t.replace(/\./g, '').replace(',', '.') : t
  if (!/^\d+(\.\d{1,2})?$/.test(norm)) return NaN
  return Number(norm)
}

function icsDate(date: string, time: string | null): string {
  const d = date.replace(/-/g, '')
  return time ? `${d}T${time.replace(/:/g, '')}00` : d
}

function addDays(date: string, days: number): string {
  const d = new Date(`${date}T12:00:00Z`)
  d.setUTCDate(d.getUTCDate() + days)
  return d.toISOString().slice(0, 10)
}

function addHour(date: string, time: string): [string, string] {
  const d = new Date(`${date}T${time}:00Z`)
  d.setUTCHours(d.getUTCHours() + 1)
  const iso = d.toISOString()
  return [iso.slice(0, 10), iso.slice(11, 16)]
}

// --- Arten ------------------------------------------------------------------

export const qrTypes: QrType[] = [
  {
    id: 'url',
    slug: 'url-qr-code',
    label: 'Link',
    blurb: 'Website, Shop, Speisekarte, PDF',
    fields: [{ key: 'url', label: 'Adresse (URL)', kind: 'url', placeholder: 'www.beispiel.de', autoComplete: 'url' }],
    defaults: { url: '' },
    encode: (v) => {
      const u = s(v, 'url')
      if (!u) return { data: null }
      const full = /^[a-z][a-z0-9+.-]*:/i.test(u) ? u : `https://${u}`
      if (/\s/.test(full)) return { data: null, error: 'Eine Adresse darf keine Leerzeichen enthalten.' }
      return { data: full, note: full.length > 120 ? 'Lange Adressen ergeben ein feines Muster – kürzere Links lassen sich leichter scannen.' : undefined }
    },
  },
  {
    id: 'text',
    slug: 'text-qr-code',
    label: 'Text',
    blurb: 'Notiz, Gutscheincode, Seriennummer',
    fields: [{ key: 'text', label: 'Text', kind: 'textarea', placeholder: 'Beliebiger Text …', maxLength: 1500 }],
    defaults: { text: '' },
    encode: (v) => ({ data: raw(v, 'text').trim() ? raw(v, 'text') : null }),
  },
  {
    id: 'wifi',
    slug: 'wlan-qr-code',
    label: 'WLAN',
    blurb: 'Gäste verbinden sich ohne Tippen',
    fields: [
      { key: 'ssid', label: 'Netzwerkname (SSID)', kind: 'text', placeholder: 'Mein WLAN', autoComplete: 'off' },
      {
        key: 'password',
        label: 'Passwort',
        kind: 'text',
        placeholder: 'WLAN-Passwort',
        autoComplete: 'off',
        showIf: (v) => v.encryption !== 'nopass',
      },
      {
        key: 'encryption',
        label: 'Verschlüsselung',
        kind: 'select',
        half: true,
        options: [
          { value: 'WPA', label: 'WPA / WPA2 / WPA3' },
          { value: 'WEP', label: 'WEP (veraltet)' },
          { value: 'nopass', label: 'Offen, ohne Passwort' },
        ],
      },
      { key: 'hidden', label: 'Verstecktes Netzwerk', kind: 'checkbox', half: true },
    ],
    defaults: { ssid: '', password: '', encryption: 'WPA', hidden: false },
    encode: (v) => {
      const ssid = raw(v, 'ssid')
      if (!ssid.trim()) return { data: null }
      const enc = s(v, 'encryption') || 'WPA'
      const pw = raw(v, 'password')
      if (enc !== 'nopass' && !pw) return { data: null, error: 'Bitte das WLAN-Passwort eintragen.' }
      if (enc === 'WPA' && pw.length < 8) return { data: null, error: 'WPA-Passwörter haben mindestens 8 Zeichen.' }
      let out = `WIFI:T:${enc};S:${wifiEsc(ssid)};`
      if (enc !== 'nopass') out += `P:${wifiEsc(pw)};`
      if (v.hidden) out += 'H:true;'
      return { data: out + ';' }
    },
  },
  {
    id: 'vcard',
    slug: 'vcard-qr-code',
    label: 'Kontakt',
    blurb: 'Digitale Visitenkarte (vCard)',
    fields: [
      { key: 'firstName', label: 'Vorname', kind: 'text', half: true, autoComplete: 'given-name' },
      { key: 'lastName', label: 'Nachname', kind: 'text', half: true, autoComplete: 'family-name' },
      { key: 'company', label: 'Firma', kind: 'text', half: true, autoComplete: 'organization' },
      { key: 'jobTitle', label: 'Position', kind: 'text', half: true, autoComplete: 'organization-title' },
      { key: 'mobile', label: 'Mobil', kind: 'tel', half: true, placeholder: '+49 170 1234567' },
      { key: 'phone', label: 'Telefon', kind: 'tel', half: true, placeholder: '+49 69 123456' },
      { key: 'email', label: 'E-Mail', kind: 'email', half: true, autoComplete: 'email' },
      { key: 'website', label: 'Website', kind: 'url', half: true, placeholder: 'www.beispiel.de' },
      { key: 'street', label: 'Straße & Hausnummer', kind: 'text', autoComplete: 'street-address' },
      { key: 'zip', label: 'PLZ', kind: 'text', half: true, autoComplete: 'postal-code' },
      { key: 'city', label: 'Ort', kind: 'text', half: true, autoComplete: 'address-level2' },
      { key: 'country', label: 'Land', kind: 'text', half: true, placeholder: 'Deutschland' },
      { key: 'note', label: 'Notiz', kind: 'text', half: true },
    ],
    defaults: {
      firstName: '', lastName: '', company: '', jobTitle: '', mobile: '', phone: '', email: '', website: '',
      street: '', zip: '', city: '', country: '', note: '',
    },
    encode: (v) => {
      const fn = s(v, 'firstName')
      const ln = s(v, 'lastName')
      const org = s(v, 'company')
      if (!fn && !ln && !org) return { data: null }
      const lines = ['BEGIN:VCARD', 'VERSION:3.0', `N:${vEsc(ln)};${vEsc(fn)};;;`, `FN:${vEsc([fn, ln].filter(Boolean).join(' ') || org)}`]
      if (org) lines.push(`ORG:${vEsc(org)}`)
      if (s(v, 'jobTitle')) lines.push(`TITLE:${vEsc(s(v, 'jobTitle'))}`)
      if (s(v, 'mobile')) lines.push(`TEL;TYPE=CELL:${cleanPhone(s(v, 'mobile'))}`)
      if (s(v, 'phone')) lines.push(`TEL;TYPE=WORK,VOICE:${cleanPhone(s(v, 'phone'))}`)
      if (s(v, 'email')) lines.push(`EMAIL;TYPE=INTERNET:${s(v, 'email')}`)
      if (s(v, 'website')) {
        const w = s(v, 'website')
        lines.push(`URL:${/^https?:\/\//i.test(w) ? w : `https://${w}`}`)
      }
      if (s(v, 'street') || s(v, 'city') || s(v, 'zip') || s(v, 'country')) {
        lines.push(`ADR;TYPE=WORK:;;${vEsc(s(v, 'street'))};${vEsc(s(v, 'city'))};;${vEsc(s(v, 'zip'))};${vEsc(s(v, 'country'))}`)
      }
      if (s(v, 'note')) lines.push(`NOTE:${vEsc(s(v, 'note'))}`)
      lines.push('END:VCARD')
      return { data: lines.join('\n') }
    },
  },
  {
    id: 'email',
    slug: 'e-mail-qr-code',
    label: 'E-Mail',
    blurb: 'Vorausgefüllte Nachricht öffnen',
    fields: [
      { key: 'address', label: 'Empfänger', kind: 'email', placeholder: 'hallo@beispiel.de' },
      { key: 'subject', label: 'Betreff', kind: 'text' },
      { key: 'body', label: 'Nachricht', kind: 'textarea' },
    ],
    defaults: { address: '', subject: '', body: '' },
    encode: (v) => {
      const a = s(v, 'address')
      if (!a) return { data: null }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)) return { data: null, error: 'Das sieht nicht nach einer E-Mail-Adresse aus.' }
      const p: string[] = []
      if (s(v, 'subject')) p.push(`subject=${encodeURIComponent(s(v, 'subject'))}`)
      if (s(v, 'body')) p.push(`body=${encodeURIComponent(s(v, 'body'))}`)
      return { data: `mailto:${a}${p.length ? `?${p.join('&')}` : ''}` }
    },
  },
  {
    id: 'phone',
    slug: 'telefon-qr-code',
    label: 'Anruf',
    blurb: 'Nummer wählen mit einem Scan',
    fields: [{ key: 'phone', label: 'Telefonnummer', kind: 'tel', placeholder: '+49 69 123456', autoComplete: 'tel' }],
    defaults: { phone: '' },
    encode: (v) => {
      const p = cleanPhone(s(v, 'phone'))
      return { data: p.length >= 3 ? `tel:${p}` : null }
    },
  },
  {
    id: 'sms',
    slug: 'sms-qr-code',
    label: 'SMS',
    blurb: 'SMS mit fertigem Text',
    fields: [
      { key: 'phone', label: 'Telefonnummer', kind: 'tel', placeholder: '+49 170 1234567' },
      { key: 'message', label: 'Nachricht', kind: 'textarea', maxLength: 300 },
    ],
    defaults: { phone: '', message: '' },
    encode: (v) => {
      const p = cleanPhone(s(v, 'phone'))
      if (p.length < 3) return { data: null }
      return { data: `SMSTO:${p}:${s(v, 'message')}` }
    },
  },
  {
    id: 'whatsapp',
    slug: 'whatsapp-qr-code',
    label: 'WhatsApp',
    blurb: 'Chat starten, ohne Nummer zu speichern',
    fields: [
      {
        key: 'phone',
        label: 'WhatsApp-Nummer',
        kind: 'tel',
        placeholder: '+49 170 1234567',
        hint: 'Mit Ländervorwahl. Eine führende 0 ersetzen wir durch +49.',
      },
      { key: 'message', label: 'Vorausgefüllte Nachricht (optional)', kind: 'textarea', maxLength: 500 },
    ],
    defaults: { phone: '', message: '' },
    encode: (v) => {
      let p = s(v, 'phone').replace(/[^\d+]/g, '')
      if (!p) return { data: null }
      if (p.startsWith('+')) p = p.slice(1)
      else if (p.startsWith('00')) p = p.slice(2)
      else if (p.startsWith('0')) p = `49${p.slice(1)}`
      p = p.replace(/\D/g, '')
      if (p.length < 7) return { data: null, error: 'Die Nummer ist zu kurz.' }
      const msg = s(v, 'message')
      return { data: `https://wa.me/${p}${msg ? `?text=${encodeURIComponent(msg)}` : ''}` }
    },
  },
  {
    id: 'location',
    slug: 'standort-qr-code',
    label: 'Standort',
    blurb: 'Adresse direkt in der Karten-App',
    fields: [
      { key: 'query', label: 'Adresse oder Ort', kind: 'text', placeholder: 'Römerberg 27, 60311 Frankfurt' },
      { key: 'latitude', label: 'Breitengrad (optional)', kind: 'text', half: true, placeholder: '50.1109' },
      { key: 'longitude', label: 'Längengrad (optional)', kind: 'text', half: true, placeholder: '8.6821' },
    ],
    defaults: { query: '', latitude: '', longitude: '' },
    encode: (v) => {
      const lat = s(v, 'latitude').replace(',', '.')
      const lng = s(v, 'longitude').replace(',', '.')
      const q = s(v, 'query')
      if (lat || lng) {
        const la = Number(lat)
        const lo = Number(lng)
        if (!lat || !lng || isNaN(la) || isNaN(lo) || Math.abs(la) > 90 || Math.abs(lo) > 180) {
          return { data: null, error: 'Bitte gültige Koordinaten eintragen (z. B. 50.1109 und 8.6821).' }
        }
        return { data: `geo:${la},${lo}${q ? `?q=${encodeURIComponent(q)}` : ''}` }
      }
      if (!q) return { data: null }
      return { data: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}` }
    },
  },
  {
    id: 'event',
    slug: 'kalender-qr-code',
    label: 'Termin',
    blurb: 'Event in den Kalender eintragen',
    fields: [
      { key: 'title', label: 'Titel', kind: 'text', placeholder: 'Sommerfest' },
      { key: 'allDay', label: 'Ganztägig', kind: 'checkbox' },
      { key: 'startDate', label: 'Beginn', kind: 'date', half: true },
      { key: 'startTime', label: 'Uhrzeit', kind: 'time', half: true, showIf: (v) => !v.allDay },
      { key: 'endDate', label: 'Ende (optional)', kind: 'date', half: true },
      { key: 'endTime', label: 'Uhrzeit', kind: 'time', half: true, showIf: (v) => !v.allDay },
      { key: 'location', label: 'Ort', kind: 'text' },
      { key: 'description', label: 'Beschreibung', kind: 'textarea' },
    ],
    defaults: { title: '', allDay: false, startDate: '', startTime: '', endDate: '', endTime: '', location: '', description: '' },
    encode: (v) => {
      const title = s(v, 'title')
      const sd = s(v, 'startDate')
      if (!title && !sd) return { data: null }
      if (!title) return { data: null, error: 'Dem Termin fehlt noch ein Titel.' }
      if (!sd) return { data: null, error: 'Bitte ein Startdatum wählen.' }
      const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT', `SUMMARY:${vEsc(title)}`]
      if (v.allDay) {
        const ed = s(v, 'endDate') || sd
        if (ed < sd) return { data: null, error: 'Das Ende liegt vor dem Beginn.' }
        lines.push(`DTSTART;VALUE=DATE:${icsDate(sd, null)}`, `DTEND;VALUE=DATE:${icsDate(addDays(ed, 1), null)}`)
      } else {
        const st = s(v, 'startTime')
        if (!st) return { data: null, error: 'Bitte eine Startzeit wählen – oder „Ganztägig“ ankreuzen.' }
        let ed = s(v, 'endDate') || sd
        let et = s(v, 'endTime')
        if (!et) [ed, et] = s(v, 'endDate') ? [ed, st] : addHour(sd, st)
        if (`${ed}T${et}` < `${sd}T${st}`) return { data: null, error: 'Das Ende liegt vor dem Beginn.' }
        lines.push(`DTSTART:${icsDate(sd, st)}`, `DTEND:${icsDate(ed, et)}`)
      }
      if (s(v, 'location')) lines.push(`LOCATION:${vEsc(s(v, 'location'))}`)
      if (s(v, 'description')) lines.push(`DESCRIPTION:${vEsc(s(v, 'description'))}`)
      lines.push('END:VEVENT', 'END:VCALENDAR')
      return { data: lines.join('\n') }
    },
  },
  {
    id: 'girocode',
    slug: 'girocode',
    label: 'GiroCode',
    blurb: 'Überweisung per Banking-App (SEPA)',
    fields: [
      { key: 'name', label: 'Empfänger (Kontoinhaber)', kind: 'text', placeholder: 'Max Mustermann', maxLength: 70 },
      { key: 'iban', label: 'IBAN', kind: 'text', placeholder: 'DE89 3704 0044 0532 0130 00', autoComplete: 'off' },
      { key: 'amount', label: 'Betrag in € (optional)', kind: 'text', half: true, placeholder: '25,00' },
      { key: 'bic', label: 'BIC (optional)', kind: 'text', half: true, placeholder: 'COBADEFFXXX' },
      { key: 'purpose', label: 'Verwendungszweck', kind: 'text', placeholder: 'Rechnung 2026-001', maxLength: 140 },
    ],
    defaults: { name: '', iban: '', amount: '', bic: '', purpose: '' },
    encode: (v) => {
      const name = s(v, 'name')
      const iban = s(v, 'iban').replace(/\s+/g, '').toUpperCase()
      if (!name && !iban) return { data: null }
      if (!name) return { data: null, error: 'Bitte den Namen des Kontoinhabers eintragen.' }
      if (!iban) return { data: null, error: 'Bitte die IBAN eintragen.' }
      if (!isValidIban(iban)) return { data: null, error: 'Diese IBAN ist nicht gültig – bitte auf Tippfehler prüfen.' }
      const bic = s(v, 'bic').replace(/\s+/g, '').toUpperCase()
      if (bic && !/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/.test(bic)) return { data: null, error: 'Die BIC hat 8 oder 11 Zeichen.' }
      const amt = parseAmount(s(v, 'amount'))
      if (amt !== null && (isNaN(amt) || amt < 0.01 || amt > 999999999.99)) {
        return { data: null, error: 'Bitte einen Betrag wie 25,00 eintragen.' }
      }
      // EPC069-12, Version 002, UTF-8, SEPA Credit Transfer
      const lines = [
        'BCD', '002', '1', 'SCT', bic, name.slice(0, 70), iban,
        amt !== null ? `EUR${amt.toFixed(2)}` : '', '', '', s(v, 'purpose').slice(0, 140),
      ]
      while (lines[lines.length - 1] === '') lines.pop()
      return { data: lines.join('\n') }
    },
  },
  {
    id: 'paypal',
    slug: 'paypal-qr-code',
    label: 'PayPal',
    blurb: 'Geld empfangen per PayPal.Me',
    fields: [
      { key: 'user', label: 'PayPal.Me-Name', kind: 'text', placeholder: 'maxmustermann', hint: 'Der Teil hinter paypal.me/ – deinen Link findest du in der PayPal-App im Profil.' },
      { key: 'amount', label: 'Betrag in € (optional)', kind: 'text', half: true, placeholder: '12,50' },
    ],
    defaults: { user: '', amount: '' },
    encode: (v) => {
      const user = s(v, 'user').replace(/^(https?:\/\/)?(www\.)?paypal\.me\//i, '').replace(/^@/, '').replace(/\/.*$/, '')
      if (!user) return { data: null }
      if (!/^[A-Za-z0-9]{1,20}$/.test(user)) return { data: null, error: 'PayPal.Me-Namen bestehen nur aus Buchstaben und Ziffern.' }
      const amt = parseAmount(s(v, 'amount'))
      if (amt !== null && (isNaN(amt) || amt <= 0)) return { data: null, error: 'Bitte einen Betrag wie 12,50 eintragen.' }
      return { data: `https://paypal.me/${user}${amt !== null ? `/${amt.toFixed(2)}EUR` : ''}` }
    },
  },
  {
    id: 'bitcoin',
    slug: 'bitcoin-qr-code',
    label: 'Bitcoin',
    blurb: 'Zahlungsanforderung fürs Wallet',
    fields: [
      { key: 'address', label: 'Bitcoin-Adresse', kind: 'text', placeholder: 'bc1q…', autoComplete: 'off' },
      { key: 'amount', label: 'Betrag in BTC (optional)', kind: 'text', half: true, placeholder: '0.001' },
      { key: 'label', label: 'Bezeichnung (optional)', kind: 'text', half: true },
    ],
    defaults: { address: '', amount: '', label: '' },
    encode: (v) => {
      const a = s(v, 'address')
      if (!a) return { data: null }
      if (!/^(bc1[a-z0-9]{20,80}|[13][a-km-zA-HJ-NP-Z1-9]{24,34})$/.test(a)) {
        return { data: null, error: 'Das sieht nicht nach einer Bitcoin-Adresse aus.' }
      }
      const p: string[] = []
      const amt = s(v, 'amount').replace(',', '.')
      if (amt) {
        if (!/^\d+(\.\d{1,8})?$/.test(amt) || Number(amt) <= 0) return { data: null, error: 'Bitte einen Betrag wie 0.001 eintragen.' }
        p.push(`amount=${amt}`)
      }
      if (s(v, 'label')) p.push(`label=${encodeURIComponent(s(v, 'label'))}`)
      return { data: `bitcoin:${a}${p.length ? `?${p.join('&')}` : ''}` }
    },
  },
]

/** Ausgeschriebener Name für Linktexte und Brotkrumen, z. B. „WLAN-QR-Code“ */
export const typeName = (t: QrType): string => (t.id === 'girocode' ? 'GiroCode' : t.id === 'vcard' ? 'vCard-QR-Code' : `${t.label}-QR-Code`)

export const typeById = (id: TypeId): QrType => qrTypes.find((t) => t.id === id) ?? qrTypes[0]
export const typeBySlug = (slug: string): QrType | undefined => qrTypes.find((t) => t.slug === slug)
