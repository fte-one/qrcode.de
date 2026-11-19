'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowTopRightOnSquareIcon, CameraIcon, CheckIcon, ClipboardDocumentIcon, PhotoIcon, StopIcon } from '@heroicons/react/24/outline'

interface Result {
  text: string
  kind: string
  host?: string
  url?: string
  rows?: [string, string][]
}

function describe(text: string): Result {
  const t = text.trim()
  if (/^https?:\/\//i.test(t)) {
    try {
      const u = new URL(t)
      return { text, kind: 'Link', host: u.hostname, url: u.href }
    } catch {}
  }
  if (/^WIFI:/i.test(t)) {
    const get = (k: string) => t.match(new RegExp(`(?:^WIFI:|;)${k}:((?:\\\\.|[^;])*)`, 'i'))?.[1]?.replace(/\\(.)/g, '$1') ?? ''
    return { text, kind: 'WLAN-Zugang', rows: [['Netzwerk', get('S')], ['Passwort', get('P') || '–'], ['Verschlüsselung', get('T') || 'offen']] }
  }
  if (/^BEGIN:VCARD/i.test(t)) return { text, kind: 'Kontakt (vCard)' }
  if (/^BEGIN:VCALENDAR|^BEGIN:VEVENT/i.test(t)) return { text, kind: 'Kalendereintrag' }
  if (/^BCD\n00[12]\n/.test(t)) {
    const l = t.split('\n')
    return { text, kind: 'GiroCode (Überweisung)', rows: [['Empfänger', l[5] ?? ''], ['IBAN', l[6] ?? ''], ['Betrag', l[7]?.replace(/^EUR/, '') ? `${l[7].replace(/^EUR/, '').replace('.', ',')} €` : 'offen'], ['Zweck', l[10] || l[9] || '–']] }
  }
  if (/^mailto:/i.test(t)) return { text, kind: 'E-Mail' }
  if (/^tel:/i.test(t)) return { text, kind: 'Telefonnummer' }
  if (/^(smsto|sms):/i.test(t)) return { text, kind: 'SMS' }
  if (/^geo:/i.test(t)) return { text, kind: 'Standort' }
  if (/^bitcoin:/i.test(t)) return { text, kind: 'Bitcoin-Zahlung' }
  return { text, kind: 'Text' }
}

export function Scanner() {
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [camera, setCamera] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [copied, setCopied] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const rafRef = useRef(0)
  const fileRef = useRef<HTMLInputElement>(null)

  const stopCamera = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    setCamera(false)
  }, [])

  useEffect(() => stopCamera, [stopCamera])

  const decodeFile = useCallback(async (file: File | Blob | undefined | null) => {
    if (!file) return
    setError(null)
    setResult(null)
    if (!file.type.startsWith('image/')) return setError('Bitte ein Bild wählen (PNG, JPG, WebP, SVG).')
    try {
      const jsQR = (await import('jsqr')).default
      const url = URL.createObjectURL(file)
      const img = new Image()
      await new Promise<void>((res, rej) => {
        img.onload = () => res()
        img.onerror = () => rej(new Error('load'))
        img.src = url
      })
      URL.revokeObjectURL(url)
      const iw = img.naturalWidth || 800
      const ih = img.naturalHeight || 800
      // Erst einmal groß rastern, dann als Bitmap verkleinern: das Mitteln hilft bei Punkt- und Linienmustern
      const k0 = Math.min(2000 / Math.max(iw, ih), 3)
      const base = document.createElement('canvas')
      base.width = Math.max(1, Math.round(iw * k0))
      base.height = Math.max(1, Math.round(ih * k0))
      const bctx = base.getContext('2d')
      if (!bctx) throw new Error('canvas')
      bctx.fillStyle = '#fff'
      bctx.fillRect(0, 0, base.width, base.height)
      bctx.drawImage(img, 0, 0, base.width, base.height)
      for (const k of [0.5, 1, 0.3, 0.7, 0.2, 0.12]) {
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(base.width * k))
        canvas.height = Math.max(1, Math.round(base.height * k))
        if (Math.max(canvas.width, canvas.height) < 60) continue
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) break
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(base, 0, 0, canvas.width, canvas.height)
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(data.data, data.width, data.height, { inversionAttempts: 'attemptBoth' })
        if (code?.data) return setResult(describe(code.data))
      }
      setError('In diesem Bild haben wir keinen QR-Code gefunden. Tipp: Bild enger zuschneiden oder ein schärferes Foto verwenden.')
    } catch {
      setError('Das Bild konnte nicht gelesen werden.')
    }
  }, [])

  // Einfügen aus der Zwischenablage (Strg/⌘+V)
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const item = Array.from(e.clipboardData?.items ?? []).find((i) => i.type.startsWith('image/'))
      if (item) {
        e.preventDefault()
        decodeFile(item.getAsFile())
      }
    }
    window.addEventListener('paste', onPaste)
    return () => window.removeEventListener('paste', onPaste)
  }, [decodeFile])

  async function startCamera() {
    setError(null)
    setResult(null)
    if (!navigator.mediaDevices?.getUserMedia) return setError('Dieser Browser gibt die Kamera nicht frei. Lade stattdessen ein Foto hoch.')
    try {
      const [stream, mod] = await Promise.all([
        navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 } }, audio: false }),
        import('jsqr'),
      ])
      const jsQR = mod.default
      streamRef.current = stream
      setCamera(true)
      // warten, bis das <video> gerendert ist
      await new Promise((r) => requestAnimationFrame(r))
      const video = videoRef.current
      if (!video) return stopCamera()
      video.srcObject = stream
      await video.play()
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      const tick = () => {
        if (!streamRef.current || !ctx) return
        if (video.readyState >= 2 && video.videoWidth) {
          const k = Math.min(1, 720 / Math.max(video.videoWidth, video.videoHeight))
          canvas.width = Math.round(video.videoWidth * k)
          canvas.height = Math.round(video.videoHeight * k)
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          const data = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const code = jsQR(data.data, data.width, data.height, { inversionAttempts: 'dontInvert' })
          if (code?.data) {
            setResult(describe(code.data))
            stopCamera()
            return
          }
        }
        rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    } catch {
      stopCamera()
      setError('Kein Zugriff auf die Kamera. Bitte die Berechtigung im Browser erlauben – oder ein Foto hochladen.')
    }
  }

  async function copy() {
    if (!result) return
    try {
      await navigator.clipboard.writeText(result.text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {}
  }

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
      <div className="panel shadow-hard overflow-hidden">
        <div className="border-b-[1.5px] border-ink px-4 py-2.5">
          <h2 className="eyebrow !text-ink">
            <span className="text-signal-dark">01</span> — Code zeigen
          </h2>
        </div>

        {camera ? (
          <div className="relative aspect-square bg-ink">
            <video ref={videoRef} playsInline muted className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-[14%] rounded-3xl border-[3px] border-paper/90 shadow-[0_0_0_9999px_rgba(20,19,15,0.45)]">
              <div className="absolute inset-x-3 top-0 h-[3px] animate-sweep rounded-full bg-signal" style={{ top: '4%', height: 3 }} />
            </div>
            <button type="button" onClick={stopCamera} className="btn btn-ghost absolute bottom-4 left-1/2 -translate-x-1/2">
              <StopIcon className="h-4 w-4" aria-hidden />
              Kamera stoppen
            </button>
          </div>
        ) : (
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragging(false)
              decodeFile(e.dataTransfer.files?.[0])
            }}
            className={`bg-grid flex aspect-square flex-col items-center justify-center gap-4 p-6 text-center transition-colors ${dragging ? 'bg-sun' : 'bg-paper/60'}`}
          >
            <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={(e) => { decodeFile(e.target.files?.[0]); e.target.value = '' }} />
            <p className="max-w-[260px] font-display text-[24px] font-extrabold leading-tight">Bild hierher ziehen, einfügen oder auswählen</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button type="button" className="btn btn-primary" onClick={() => fileRef.current?.click()}>
                <PhotoIcon className="h-5 w-5" aria-hidden />
                Bild wählen
              </button>
              <button type="button" className="btn btn-ghost" onClick={startCamera}>
                <CameraIcon className="h-5 w-5" aria-hidden />
                Kamera
              </button>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Screenshot? Einfach Strg / ⌘ + V</p>
          </div>
        )}
      </div>

      <div className="panel shadow-hard-lg overflow-hidden" aria-live="polite">
        <div className="border-b-[1.5px] border-ink px-4 py-2.5">
          <h2 className="eyebrow !text-ink">
            <span className="text-signal-dark">02</span> — Inhalt
          </h2>
        </div>
        <div className="p-5 sm:p-6">
          {error && <p className="rounded-xl border-[1.5px] border-warn/40 bg-sun/30 px-4 py-3 text-[15px] font-semibold">{error}</p>}

          {!result && !error && (
            <p className="py-10 text-center text-[16px] leading-relaxed text-muted">
              Hier erscheint, was im Code steckt –<br />bevor du einem Link folgst.
            </p>
          )}

          {result && (
            <div className="animate-pop space-y-4">
              <span className="inline-block rounded-full border-[1.5px] border-ink bg-sun px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider">
                {result.kind}
              </span>

              {result.host && (
                <div>
                  <p className="text-[13px] font-semibold text-muted">Dieser Code führt zu</p>
                  <p className="break-all font-display text-[30px] font-extrabold leading-tight tracking-tight">{result.host}</p>
                </div>
              )}

              {result.rows && (
                <dl className="divide-y divide-ink/10 rounded-xl border-[1.5px] border-ink/20 bg-white">
                  {result.rows.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 px-3.5 py-2.5 text-[14.5px]">
                      <dt className="text-muted">{k}</dt>
                      <dd className="break-all text-right font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-all rounded-xl border-[1.5px] border-ink/20 bg-white p-3.5 font-mono text-[13px] leading-relaxed">
                {result.text}
              </pre>

              <div className="flex flex-wrap gap-3">
                <button type="button" className="btn btn-ghost" onClick={copy}>
                  {copied ? <CheckIcon className="h-4 w-4 stroke-[2.5] text-ok" aria-hidden /> : <ClipboardDocumentIcon className="h-4 w-4" aria-hidden />}
                  {copied ? 'Kopiert' : 'Inhalt kopieren'}
                </button>
                {result.url && (
                  <a href={result.url} target="_blank" rel="noopener noreferrer nofollow" className="btn btn-primary">
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 stroke-2" aria-hidden />
                    Link öffnen
                  </a>
                )}
              </div>

              {result.url && (
                <p className="text-[13px] leading-snug text-muted">
                  Kennst du die Adresse oben? Bei Codes auf Parkautomaten, Ladesäulen oder in unerwarteter Post lohnt ein zweiter Blick –
                  Betrüger überkleben echte Codes gern mit eigenen.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
