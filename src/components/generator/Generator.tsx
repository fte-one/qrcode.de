'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  CheckIcon,
  ClipboardDocumentIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import { qrTypes, typeById, type TypeId, type Values } from '@/lib/qr/content'
import { defaultDesign, QrCapacityError, renderQr, svgString, type Design, type QrRender } from '@/lib/qr/render'
import { pngBlob, saveBlob, svgBlob, verifyScan } from '@/lib/qr/export'
import { TypePicker } from './TypePicker'
import { ContentForm } from './ContentForm'
import { DesignPanel } from './DesignPanel'

const SAMPLE = 'https://qrcode.de'
const STORE_KEY = 'qrcode.design.v2'
const PNG_SIZES = [512, 1024, 2048, 4096]

type Scan = 'idle' | 'checking' | 'ok' | 'fail' | 'skip'

// Sehr dichte Codes überfordern den Test-Decoder – ab hier nur noch Hinweis statt Prüfung
const MAX_TEST_VERSION = 30

const initialValues = () => Object.fromEntries(qrTypes.map((t) => [t.id, { ...t.defaults }])) as Record<TypeId, Values>

function CropMarks() {
  const mark = 'absolute h-4 w-4 border-ink/50'
  return (
    <>
      <span className={`${mark} left-2.5 top-2.5 border-l-[1.5px] border-t-[1.5px]`} />
      <span className={`${mark} right-2.5 top-2.5 border-r-[1.5px] border-t-[1.5px]`} />
      <span className={`${mark} bottom-2.5 left-2.5 border-b-[1.5px] border-l-[1.5px]`} />
      <span className={`${mark} bottom-2.5 right-2.5 border-b-[1.5px] border-r-[1.5px]`} />
    </>
  )
}

export function Generator({ initialType = 'url' }: { initialType?: TypeId }) {
  const [type, setType] = useState<TypeId>(initialType)
  const [values, setValues] = useState(initialValues)
  const [design, setDesign] = useState<Design>(defaultDesign)
  const [loaded, setLoaded] = useState(false)
  const [pngSize, setPngSize] = useState(1024)
  const [scan, setScan] = useState<Scan>('idle')
  const [busy, setBusy] = useState<null | 'png' | 'svg' | 'copy'>(null)
  const [copied, setCopied] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)
  const [barVisible, setBarVisible] = useState(false)

  const rootRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  // Gestaltung merken (nur lokal im Browser)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORE_KEY)
      if (saved) setDesign({ ...defaultDesign, ...JSON.parse(saved) })
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      if (JSON.stringify(design) === JSON.stringify(defaultDesign)) localStorage.removeItem(STORE_KEY)
      else localStorage.setItem(STORE_KEY, JSON.stringify(design))
    } catch {}
  }, [design, loaded])

  const typeDef = typeById(type)
  const enc = useMemo(() => typeDef.encode(values[type]), [typeDef, values, type])
  const data = enc.data
  const hasData = data !== null

  const { render, renderError } = useMemo((): { render: QrRender | null; renderError: string | null } => {
    try {
      return { render: renderQr(data ?? SAMPLE, design), renderError: null }
    } catch (e) {
      return {
        render: null,
        renderError:
          e instanceof QrCapacityError
            ? 'Das ist zu viel Inhalt für einen QR-Code. Bitte kürzen – oder auf eine Webseite verlinken, die den Inhalt zeigt.'
            : 'Der Code konnte nicht erzeugt werden.',
      }
    }
  }, [data, design])

  const svg = useMemo(() => (render ? svgString(render) : ''), [render])

  // Scan-Test: fertigen Code zurücklesen
  useEffect(() => {
    if (!render || !data) {
      setScan('idle')
      return
    }
    if (render.version > MAX_TEST_VERSION) {
      setScan('skip')
      return
    }
    let stale = false
    setScan('checking')
    const t = setTimeout(async () => {
      try {
        const ok = await verifyScan(render, data)
        if (!stale) setScan(ok ? 'ok' : 'fail')
      } catch {
        if (!stale) setScan('idle')
      }
    }, 450)
    return () => {
      stale = true
      clearTimeout(t)
    }
  }, [render, data])

  // Mobile Leiste: sichtbar, solange der Generator im Bild ist, die große Vorschau aber nicht
  useEffect(() => {
    const root = rootRef.current
    const preview = previewRef.current
    if (!root || !preview || typeof IntersectionObserver === 'undefined') return
    let rootIn = false
    let previewIn = false
    const update = () => setBarVisible(rootIn && !previewIn)
    const o1 = new IntersectionObserver(([e]) => { rootIn = e.isIntersecting; update() }, { threshold: 0 })
    const o2 = new IntersectionObserver(([e]) => { previewIn = e.isIntersecting; update() }, { threshold: 0.35 })
    o1.observe(root)
    o2.observe(preview)
    return () => { o1.disconnect(); o2.disconnect() }
  }, [])

  const filename = `qrcode-${typeDef.slug.replace(/-qr-code$/, '')}`

  async function run(kind: 'png' | 'svg' | 'copy') {
    if (!render || !hasData || busy) return
    setBusy(kind)
    setExportError(null)
    try {
      if (kind === 'svg') {
        saveBlob(svgBlob(render), `${filename}.svg`)
      } else if (kind === 'png') {
        saveBlob(await pngBlob(render, pngSize), `${filename}.png`)
      } else {
        const blob = pngBlob(render, 1024)
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      }
    } catch {
      setExportError(
        kind === 'copy'
          ? 'Kopieren wird von diesem Browser nicht unterstützt – bitte das PNG herunterladen.'
          : 'Der Export hat nicht geklappt. Bitte noch einmal versuchen.',
      )
    } finally {
      setBusy(null)
    }
  }

  const reset = () => setValues((v) => ({ ...v, [type]: { ...typeDef.defaults } }))
  const dirty = JSON.stringify(values[type]) !== JSON.stringify(typeDef.defaults)
  const designDirty = JSON.stringify(design) !== JSON.stringify(defaultDesign)
  const dense = render ? render.version >= 12 : false

  return (
    <div ref={rootRef} className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_400px] xl:grid-cols-[minmax(0,1fr)_440px] xl:gap-8">
      {/* ------------------------------------------------------- Werkbank */}
      <div className="panel shadow-hard">
        <section className="p-5 sm:p-7">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="eyebrow !text-ink">
              <span className="text-signal-dark">01</span> — Inhalt
            </h2>
            {dirty && (
              <button type="button" onClick={reset} className="inline-flex items-center gap-1 text-[13px] font-semibold text-muted hover:text-ink">
                <ArrowPathIcon className="h-3.5 w-3.5" aria-hidden />
                Leeren
              </button>
            )}
          </div>
          <TypePicker active={type} onChange={setType} />
          <div className="mt-5">
            <ContentForm type={typeDef} values={values[type]} onChange={(v) => setValues((all) => ({ ...all, [type]: v }))} />
          </div>
          {enc.error && (
            <p role="alert" className="mt-3.5 flex items-start gap-2 text-[14px] font-semibold text-signal-dark">
              <ExclamationTriangleIcon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              {enc.error}
            </p>
          )}
        </section>

        <section className="border-t-[1.5px] border-dashed border-ink/25 p-5 sm:p-7">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="eyebrow !text-ink">
              <span className="text-signal-dark">02</span> — Gestaltung
            </h2>
            {designDirty && (
              <button type="button" onClick={() => setDesign(defaultDesign)} className="inline-flex items-center gap-1 text-[13px] font-semibold text-muted hover:text-ink">
                <ArrowPathIcon className="h-3.5 w-3.5" aria-hidden />
                Zurücksetzen
              </button>
            )}
          </div>
          <DesignPanel design={design} onChange={setDesign} />
        </section>
      </div>

      {/* ------------------------------------------------------- Vorschau */}
      <div ref={previewRef} id="vorschau" className="lg:sticky lg:top-[5.5rem]">
        <div className="panel shadow-hard-lg overflow-hidden">
          <div className="flex items-center justify-between border-b-[1.5px] border-ink px-4 py-2.5">
            <h2 className="eyebrow !text-ink">
              <span className="text-signal-dark">03</span> — Vorschau
            </h2>
            <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider">
              <span className={`h-2 w-2 rounded-full ${hasData ? 'animate-blink bg-ok' : 'bg-ink/25'}`} />
              {hasData ? 'Live' : 'Beispiel'}
            </span>
          </div>

          <div className="bg-grid relative aspect-square bg-paper/60">
            <CropMarks />
            {render ? (
              <div
                role="img"
                aria-label={hasData ? `QR-Code: ${typeDef.label}` : 'Beispiel-QR-Code'}
                className={`absolute inset-[11%] transition-opacity duration-200 [&>svg]:drop-shadow-[0_6px_18px_rgba(20,19,15,0.16)] ${hasData ? '' : 'opacity-30'}`}
                dangerouslySetInnerHTML={{ __html: svg }}
              />
            ) : (
              <div className="absolute inset-[11%] flex items-center justify-center text-center text-[14px] font-semibold text-signal-dark">
                {renderError}
              </div>
            )}
            {!hasData && render && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rotate-[-4deg] rounded-lg border-[1.5px] border-ink bg-sun px-3.5 py-2 text-center font-display text-[15px] font-bold leading-tight shadow-hard-sm">
                  {enc.error ? 'Fast fertig …' : 'Tipp was ein –'}
                  <br />
                  {enc.error ? 'eine Angabe fehlt noch' : 'dein Code erscheint sofort'}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-3.5 border-t-[1.5px] border-ink p-4">
            {/* Status */}
            <div className="min-h-[38px] text-[13px] leading-snug">
              {!hasData ? (
                <p className="text-muted">Kostenlos, ohne Anmeldung, ohne Ablaufdatum. Der Code entsteht direkt in deinem Browser.</p>
              ) : scan === 'ok' ? (
                <p className="flex items-start gap-2 font-semibold text-ok">
                  <CheckIcon className="mt-px h-4 w-4 shrink-0 stroke-[2.5]" aria-hidden />
                  <span>
                    Scan-Test bestanden
                    <span className="block font-normal text-muted">
                      Version {render?.version} · {render?.modules}×{render?.modules} Module · Fehlerkorrektur {render?.ec}
                      {dense ? ' · feines Muster, bitte groß genug drucken' : ''}
                    </span>
                  </span>
                </p>
              ) : scan === 'fail' ? (
                <p className="flex items-start gap-2 font-semibold text-warn">
                  <ExclamationTriangleIcon className="mt-px h-4 w-4 shrink-0" aria-hidden />
                  <span>
                    Unser Testscanner konnte den Code nicht lesen
                    <span className="block font-normal text-ink/70">
                      Mehr Kontrast, ein kleineres Logo oder ein ruhigeres Muster helfen. Vor dem Druck unbedingt mit dem Handy testen.
                    </span>
                  </span>
                </p>
              ) : scan === 'skip' ? (
                <p className="flex items-start gap-2 font-semibold text-warn">
                  <ExclamationTriangleIcon className="mt-px h-4 w-4 shrink-0" aria-hidden />
                  <span>
                    Sehr viel Inhalt – extrem feines Muster
                    <span className="block font-normal text-ink/70">
                      Version {render?.version} · {render?.modules}×{render?.modules} Module. Solche Codes brauchen viel Platz und gute Kameras.
                      Besser kürzen oder auf eine Webseite verlinken.
                    </span>
                  </span>
                </p>
              ) : !render ? null : (
                <p className="text-muted">Scan-Test läuft …</p>
              )}
              {hasData && enc.note && <p className="mt-1.5 text-muted">{enc.note}</p>}
            </div>

            <button type="button" className="btn btn-primary w-full !py-3.5 !text-[16px]" disabled={!hasData || !render || busy !== null} onClick={() => run('png')}>
              <ArrowDownTrayIcon className="h-5 w-5 stroke-2" aria-hidden />
              PNG herunterladen
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button type="button" className="btn btn-ghost" disabled={!hasData || !render || busy !== null} onClick={() => run('svg')}>
                SVG <span className="font-sans text-[12px] font-medium text-muted">Vektor</span>
              </button>
              <button type="button" className="btn btn-ghost" disabled={!hasData || !render || busy !== null} onClick={() => run('copy')}>
                {copied ? <CheckIcon className="h-4 w-4 stroke-[2.5] text-ok" aria-hidden /> : <ClipboardDocumentIcon className="h-4 w-4" aria-hidden />}
                {copied ? 'Kopiert' : 'Kopieren'}
              </button>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="eyebrow">PNG-Größe</span>
              <div role="radiogroup" aria-label="PNG-Größe in Pixeln" className="flex gap-1">
                {PNG_SIZES.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    role="radio"
                    aria-checked={pngSize === sz}
                    onClick={() => setPngSize(sz)}
                    className={`rounded-md px-2 py-1 font-mono text-[11.5px] transition-colors ${
                      pngSize === sz ? 'bg-ink text-paper' : 'text-ink/60 hover:bg-ink/10 hover:text-ink'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {exportError && <p role="alert" className="text-[13px] font-semibold text-signal-dark">{exportError}</p>}
          </div>
        </div>
      </div>

      {/* --------------------------------------------- Mobile Schnellleiste */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t-[1.5px] border-ink bg-card px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 transition-transform duration-300 lg:hidden ${
          barVisible ? 'translate-y-0' : 'translate-y-[110%]'
        }`}
        aria-hidden={!barVisible}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            tabIndex={barVisible ? 0 : -1}
            aria-label="Zur Vorschau springen"
            onClick={() => previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
            className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg border-[1.5px] border-ink bg-white p-1 ${hasData ? '' : 'opacity-40'}`}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
          <div className="min-w-0 flex-1 text-[13px] leading-tight">
            <p className="truncate font-display text-[15px] font-bold">{hasData ? 'Dein QR-Code ist fertig' : 'Noch kein Inhalt'}</p>
            <p className={`truncate ${scan === 'fail' || scan === 'skip' ? 'text-warn' : scan === 'ok' ? 'text-ok' : 'text-muted'}`}>
              {!hasData ? (enc.error ?? 'Oben etwas eintragen') : scan === 'ok' ? '✓ Scan-Test bestanden' : scan === 'fail' ? 'Scan-Test fehlgeschlagen' : scan === 'skip' ? 'Sehr feines Muster' : !render ? 'Zu viel Inhalt' : 'Scan-Test läuft …'}
            </p>
          </div>
          <button type="button" tabIndex={barVisible ? 0 : -1} className="btn btn-primary shrink-0 !px-4" disabled={!hasData || !render || busy !== null} onClick={() => run('png')}>
            <ArrowDownTrayIcon className="h-5 w-5 stroke-2" aria-hidden />
            PNG
          </button>
        </div>
      </div>
    </div>
  )
}
