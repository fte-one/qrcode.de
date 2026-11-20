'use client'

import { useMemo, useRef, useState } from 'react'
import { ArrowUpTrayIcon, TrashIcon } from '@heroicons/react/24/outline'
import {
  contrastRatio,
  defaultDesign,
  dotsPath,
  eyeBallPath,
  eyeFramePath,
  luminance,
  renderQr,
  svgString,
  type Design,
  type EcLevel,
} from '@/lib/qr/render'
import { dotStyles, eyeBalls, eyeFrames, frames, frameTexts, presets, swatches } from '@/lib/qr/presets'
import { logoIcons } from '@/lib/qr/logos'

type Tab = 'stil' | 'farben' | 'logo' | 'rahmen'

const tabs: { id: Tab; label: string }[] = [
  { id: 'stil', label: 'Stil' },
  { id: 'farben', label: 'Farben' },
  { id: 'logo', label: 'Logo' },
  { id: 'rahmen', label: 'Rahmen' },
]

const SAMPLE = 'https://qrcode.de'

// Beispielmuster für die Kacheln
const PATTERN = ['110110', '011101', '110011', '101110', '011011', '110101']
const patternOn = (r: number, c: number) => PATTERN[r]?.[c] === '1'

function Svg({ html, className }: { html: string; className?: string }) {
  return <span aria-hidden className={className} dangerouslySetInnerHTML={{ __html: html }} />
}

function SubHead({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="mb-2.5 flex items-baseline justify-between gap-3">
      <h3 className="font-sans text-[13px] font-bold text-ink">{children}</h3>
      {aside}
    </div>
  )
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [draft, setDraft] = useState<string | null>(null)
  return (
    <div>
      <span className="field-label">{label}</span>
      <div className="flex items-center gap-2 rounded-xl border-[1.5px] border-ink/25 bg-white p-1.5 focus-within:border-ink">
        <input
          type="color"
          aria-label={`${label} wählen`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-9 shrink-0 rounded-md ring-1 ring-ink/20"
        />
        <input
          aria-label={`${label} als Hex-Wert`}
          value={draft ?? value.toUpperCase()}
          onChange={(e) => {
            const v = e.target.value.trim()
            setDraft(v)
            const hex = v.startsWith('#') ? v : `#${v}`
            if (/^#[0-9a-f]{6}$/i.test(hex)) onChange(hex.toLowerCase())
          }}
          onBlur={() => setDraft(null)}
          spellCheck={false}
          maxLength={7}
          className="w-full min-w-0 bg-transparent font-mono text-[13px] uppercase tracking-wide outline-none"
        />
      </div>
    </div>
  )
}

function Toggle({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="group flex items-center gap-2.5 text-left text-[14px] font-semibold"
    >
      <span
        className={`relative h-[22px] w-[38px] shrink-0 rounded-full border-[1.5px] border-ink transition-colors ${checked ? 'bg-signal' : 'bg-white'}`}
      >
        <span
          className={`absolute top-[2px] h-[15px] w-[15px] rounded-full bg-ink transition-all ${checked ? 'left-[18px]' : 'left-[2px]'}`}
        />
      </span>
      {children}
    </button>
  )
}

interface Props {
  design: Design
  onChange: (d: Design) => void
}

export function DesignPanel({ design, onChange }: Props) {
  const [tab, setTab] = useState<Tab>('stil')
  const [logoError, setLogoError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const set = (patch: Partial<Design>) => onChange({ ...design, ...patch })

  const presetThumbs = useMemo(
    () =>
      presets.map((p) => ({
        ...p,
        svg: svgString(renderQr(SAMPLE, { ...defaultDesign, ...p.design }, `pre-${p.id}`)),
      })),
    [],
  )

  const frameThumbs = useMemo(
    () =>
      frames.map((fr) => ({
        ...fr,
        svg: svgString(
          renderQr(SAMPLE, { ...defaultDesign, frame: fr.id, frameText: 'Scan mich', frameColor: design.frameColor }, `fr-${fr.id}`),
        ),
      })),
    [design.frameColor],
  )

  const activePreset = presets.find((p) =>
    (Object.keys(p.design) as (keyof Design)[]).every((k) => design[k] === p.design[k]),
  )?.id

  const contrast = contrastRatio(design.fg, design.transparent ? '#ffffff' : design.bg)
  const inverted = !design.transparent && luminance(design.fg) > luminance(design.bg)

  async function handleLogo(file: File | undefined) {
    setLogoError(null)
    if (!file) return
    if (!file.type.startsWith('image/')) return setLogoError('Bitte eine Bilddatei wählen (PNG, JPG, SVG, WebP).')
    if (file.size > 8 * 1024 * 1024) return setLogoError('Die Datei ist größer als 8 MB.')
    try {
      const url = URL.createObjectURL(file)
      const img = new Image()
      await new Promise<void>((res, rej) => {
        img.onload = () => res()
        img.onerror = () => rej(new Error('load'))
        img.src = url
      })
      // Auf max. 512 px normalisieren: hält SVG-Exporte klein und entfernt aktive Inhalte aus SVG-Uploads
      const iw = img.naturalWidth || 512
      const ih = img.naturalHeight || 512
      const k = Math.min(1, 512 / Math.max(iw, ih))
      const canvas = document.createElement('canvas')
      canvas.width = Math.max(1, Math.round(iw * k))
      canvas.height = Math.max(1, Math.round(ih * k))
      canvas.getContext('2d')?.drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)
      set({ logo: { kind: 'upload', src: canvas.toDataURL('image/png'), aspect: canvas.width / canvas.height } })
    } catch {
      setLogoError('Dieses Bild konnte nicht gelesen werden.')
    } finally {
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const frameMeta = frames.find((f) => f.id === design.frame)

  return (
    <div>
      <div role="tablist" aria-label="Gestaltung" className="mb-5 grid grid-cols-4 rounded-xl border-[1.5px] border-ink bg-white p-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={`rounded-lg py-2 font-display text-[14px] font-bold transition-colors ${
              tab === t.id ? 'bg-ink text-paper' : 'text-ink/60 hover:text-ink'
            }`}
          >
            {t.label}
            {t.id === 'logo' && design.logo && <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-signal align-middle" />}
            {t.id === 'rahmen' && design.frame !== 'none' && <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-signal align-middle" />}
          </button>
        ))}
      </div>

      {/* ---------------------------------------------------------------- Stil */}
      {tab === 'stil' && (
        <div role="tabpanel" id="panel-stil" aria-labelledby="tab-stil" className="space-y-6">
          <div>
            <SubHead>Vorlagen</SubHead>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-8 lg:grid-cols-4 xl:grid-cols-8">
              {presetThumbs.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={activePreset === p.id}
                  onClick={() => set(p.design)}
                  className="tile !p-1.5"
                >
                  <Svg html={p.svg} className="block aspect-square w-full overflow-hidden rounded-md" />
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <SubHead>Muster</SubHead>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {dotStyles.map((s) => (
                <button key={s.id} type="button" aria-pressed={design.dots === s.id} onClick={() => set({ dots: s.id })} className="tile">
                  <svg viewBox="-3 -3 66 66" className="h-9 w-9" aria-hidden>
                    <path d={dotsPath(6, patternOn, s.id)} fill="currentColor" />
                  </svg>
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <SubHead>Augen · Rahmen</SubHead>
              <div className="grid grid-cols-4 gap-2">
                {eyeFrames.map((s) => (
                  <button key={s.id} type="button" aria-pressed={design.eyeFrame === s.id} onClick={() => set({ eyeFrame: s.id })} className="tile">
                    <svg viewBox="-4 -4 78 78" className="h-8 w-8" aria-hidden>
                      <path d={eyeFramePath(0, 0, s.id)} fill="currentColor" fillRule="evenodd" />
                    </svg>
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <SubHead>Augen · Pupille</SubHead>
              <div className="grid grid-cols-4 gap-2">
                {eyeBalls.map((s) => (
                  <button key={s.id} type="button" aria-pressed={design.eyeBall === s.id} onClick={() => set({ eyeBall: s.id })} className="tile">
                    <svg viewBox="-4 -4 78 78" className="h-8 w-8" aria-hidden>
                      <path d={eyeFramePath(0, 0, 'square')} fill="currentColor" fillRule="evenodd" opacity=".18" />
                      <path d={eyeBallPath(0, 0, s.id)} fill="currentColor" />
                    </svg>
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <SubHead aside={<span className="text-[12px] text-muted">{design.logo ? 'Mit Logo immer H' : 'Empfehlung: M'}</span>}>
              Fehlerkorrektur
            </SubHead>
            <div className="grid grid-cols-4 gap-2">
              {(
                [
                  ['L', '7 %'],
                  ['M', '15 %'],
                  ['Q', '25 %'],
                  ['H', '30 %'],
                ] as [EcLevel, string][]
              ).map(([lvl, pct]) => (
                <button
                  key={lvl}
                  type="button"
                  disabled={Boolean(design.logo)}
                  aria-pressed={(design.logo ? 'H' : design.ec) === lvl}
                  onClick={() => set({ ec: lvl })}
                  className="tile !flex-row !gap-2 py-2.5 disabled:opacity-50"
                >
                  <span className="font-mono text-[13px] font-bold">{lvl}</span>
                  <span className="font-normal">{pct}</span>
                </button>
              ))}
            </div>
            <p className="mt-2 text-[12.5px] leading-snug text-muted">
              So viel vom Code darf verschmutzt oder verdeckt sein. Mehr Reserve bedeutet ein dichteres Muster.
            </p>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------- Farben */}
      {tab === 'farben' && (
        <div role="tabpanel" id="panel-farben" aria-labelledby="tab-farben" className="space-y-5">
          <div>
            <SubHead>Schnellwahl</SubHead>
            <div className="flex flex-wrap gap-2">
              {swatches.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label={`Farbe ${c}`}
                  aria-pressed={design.fg === c}
                  onClick={() => set({ fg: c })}
                  className={`h-8 w-8 rounded-full border-[1.5px] transition-transform hover:scale-110 ${
                    design.fg === c ? 'border-ink ring-2 ring-ink ring-offset-2 ring-offset-card' : 'border-ink/20'
                  }`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <ColorField label={design.gradient ? 'Code · Farbe 1' : 'Code'} value={design.fg} onChange={(fg) => set({ fg })} />
            {design.gradient ? (
              <ColorField label="Code · Farbe 2" value={design.fg2} onChange={(fg2) => set({ fg2 })} />
            ) : (
              <ColorField label="Hintergrund" value={design.bg} onChange={(bg) => set({ bg, transparent: false })} />
            )}
            {design.gradient && <ColorField label="Hintergrund" value={design.bg} onChange={(bg) => set({ bg, transparent: false })} />}
            {design.eyeColor && <ColorField label="Augen" value={design.eyeColor} onChange={(eyeColor) => set({ eyeColor })} />}
          </div>

          <div className="grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
            <Toggle checked={design.gradient} onChange={(gradient) => set({ gradient })}>
              Farbverlauf
            </Toggle>
            <Toggle checked={Boolean(design.eyeColor)} onChange={(v) => set({ eyeColor: v ? '#e8431a' : null })}>
              Eigene Augenfarbe
            </Toggle>
            <Toggle checked={design.transparent} onChange={(transparent) => set({ transparent })}>
              Transparenter Hintergrund
            </Toggle>
            {design.gradient && (
              <div className="flex items-center gap-2 text-[14px] font-semibold">
                <span>Verlauf:</span>
                {(['linear', 'radial'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    aria-pressed={design.gradientType === g}
                    onClick={() => set({ gradientType: g })}
                    className={`rounded-full border-[1.5px] px-2.5 py-0.5 text-[13px] ${
                      design.gradientType === g ? 'border-ink bg-ink text-paper' : 'border-ink/20 hover:border-ink/60'
                    }`}
                  >
                    {g === 'linear' ? 'diagonal' : 'kreisförmig'}
                  </button>
                ))}
              </div>
            )}
          </div>

          {(contrast < 4 || inverted) && (
            <p className="rounded-xl border-[1.5px] border-warn/40 bg-sun/25 px-3.5 py-2.5 text-[13.5px] leading-snug text-ink">
              <strong className="font-bold">Achtung, Kontrast:</strong>{' '}
              {inverted
                ? 'Ein heller Code auf dunklem Grund wird nicht von jeder Kamera-App erkannt. Dunkel auf hell ist die sichere Wahl.'
                : 'Code und Hintergrund liegen farblich nah beieinander. Für zuverlässiges Scannen den Code dunkler oder den Hintergrund heller wählen.'}
            </p>
          )}
        </div>
      )}

      {/* ---------------------------------------------------------------- Logo */}
      {tab === 'logo' && (
        <div role="tabpanel" id="panel-logo" aria-labelledby="tab-logo" className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="sr-only"
              id="logo-file"
              onChange={(e) => handleLogo(e.target.files?.[0])}
            />
            <button type="button" className="btn btn-ghost" onClick={() => fileRef.current?.click()}>
              <ArrowUpTrayIcon className="h-4 w-4" aria-hidden />
              Eigenes Logo hochladen
            </button>
            {design.logo && (
              <button type="button" className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink/70 underline-offset-2 hover:text-signal-dark hover:underline" onClick={() => set({ logo: null })}>
                <TrashIcon className="h-4 w-4" aria-hidden />
                Logo entfernen
              </button>
            )}
          </div>
          {logoError && <p className="text-[13.5px] font-semibold text-signal-dark">{logoError}</p>}

          <div>
            <SubHead>Oder ein Symbol</SubHead>
            <div className="grid grid-cols-6 gap-2 sm:grid-cols-8">
              {logoIcons.map((ic) => {
                const on = design.logo?.kind === 'icon' && design.logo.id === ic.id
                return (
                  <button
                    key={ic.id}
                    type="button"
                    title={ic.name}
                    aria-label={ic.name}
                    aria-pressed={on}
                    onClick={() => set({ logo: on ? null : { kind: 'icon', id: ic.id } })}
                    className="tile aspect-square !p-0"
                  >
                    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
                      <path d={ic.path} fill={ic.color} />
                    </svg>
                  </button>
                )
              })}
            </div>
          </div>

          <div className={design.logo ? '' : 'pointer-events-none opacity-40'}>
            <SubHead aside={<span className="font-mono text-[12px] text-muted">{Math.round(design.logoScale * 100)} %</span>}>Größe</SubHead>
            <input
              type="range"
              aria-label="Logo-Größe"
              min={0.14}
              max={0.28}
              step={0.01}
              value={design.logoScale}
              onChange={(e) => set({ logoScale: Number(e.target.value) })}
              className="w-full"
            />
          </div>

          <p className="text-[12.5px] leading-snug text-muted">
            Das Logo verdeckt einen Teil des Musters. Wir schalten dafür automatisch auf die höchste Fehlerkorrektur und
            prüfen nach jeder Änderung, ob sich der Code noch lesen lässt. Dein Bild bleibt auf deinem Gerät.
          </p>
        </div>
      )}

      {/* -------------------------------------------------------------- Rahmen */}
      {tab === 'rahmen' && (
        <div role="tabpanel" id="panel-rahmen" aria-labelledby="tab-rahmen" className="space-y-5">
          <div className="grid grid-cols-4 gap-2">
            {frameThumbs.map((fr) => (
              <button key={fr.id} type="button" aria-pressed={design.frame === fr.id} onClick={() => set({ frame: fr.id })} className="tile">
                <Svg html={fr.svg} className="block h-16 w-full" />
                {fr.name}
              </button>
            ))}
          </div>

          <div className={design.frame === 'none' ? 'pointer-events-none opacity-40' : ''}>
            <div className="grid gap-3 sm:grid-cols-[1fr_180px]">
              <div className={frameMeta?.hasText ? '' : 'pointer-events-none opacity-40'}>
                <label htmlFor="frame-text" className="field-label">
                  Text
                </label>
                <input
                  id="frame-text"
                  className="field"
                  value={design.frameText}
                  maxLength={28}
                  onChange={(e) => set({ frameText: e.target.value })}
                />
              </div>
              <ColorField label="Rahmenfarbe" value={design.frameColor} onChange={(frameColor) => set({ frameColor })} />
            </div>
            <div className={`mt-3 flex flex-wrap gap-1.5 ${frameMeta?.hasText ? '' : 'pointer-events-none opacity-40'}`}>
              {frameTexts.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => set({ frameText: t })}
                  className="rounded-full border-[1.5px] border-ink/15 bg-white px-2.5 py-1 text-[12.5px] font-semibold text-ink/70 hover:border-ink/60 hover:text-ink"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
