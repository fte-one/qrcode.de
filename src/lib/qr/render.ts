import qrcode from 'qrcode-generator'
import { logoIcons } from './logos'

// ---------------------------------------------------------------------------
// Eigener Vektor-Renderer: aus Inhalt + Design entsteht ein vollständiges SVG
// (Code, Augen, Logo, Rahmen). Vorschau, SVG- und PNG-Export nutzen dasselbe
// Markup — was man sieht, ist exakt das, was man herunterlädt.
// ---------------------------------------------------------------------------

export type DotStyle = 'square' | 'fluid' | 'soft' | 'dots' | 'vertical' | 'horizontal'
export type EyeFrame = 'square' | 'rounded' | 'circle' | 'leaf'
export type EyeBall = 'square' | 'rounded' | 'circle' | 'leaf'
export type FrameId =
  | 'none'
  | 'border'
  | 'label-bottom'
  | 'label-top'
  | 'pill'
  | 'bubble'
  | 'viewfinder'
  | 'ticket'
export type EcLevel = 'L' | 'M' | 'Q' | 'H'

export type Logo =
  | { kind: 'upload'; src: string; aspect: number }
  | { kind: 'icon'; id: string }

export interface Design {
  fg: string
  bg: string
  transparent: boolean
  gradient: boolean
  fg2: string
  gradientType: 'linear' | 'radial'
  eyeColor: string | null
  dots: DotStyle
  eyeFrame: EyeFrame
  eyeBall: EyeBall
  logo: Logo | null
  logoScale: number
  frame: FrameId
  frameColor: string
  frameText: string
  ec: EcLevel
}

export const defaultDesign: Design = {
  fg: '#14130f',
  bg: '#ffffff',
  transparent: false,
  gradient: false,
  fg2: '#ff5a2b',
  gradientType: 'linear',
  eyeColor: null,
  dots: 'square',
  eyeFrame: 'square',
  eyeBall: 'square',
  logo: null,
  logoScale: 0.22,
  frame: 'none',
  frameColor: '#14130f',
  frameText: 'Scan mich',
  ec: 'M',
}

export interface QrRender {
  markup: string
  width: number
  height: number
  modules: number
  version: number
  ec: EcLevel
}

const U = 10 // Einheiten pro Modul
const QUIET = 4 // Ruhezone in Modulen (Norm: 4)

const f = (n: number) => String(Math.round(n * 100) / 100)

const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const HEX = /^#[0-9a-f]{6}$/i
const safeColor = (c: string, fallback: string) => (HEX.test(c) ? c : fallback)

/** Relative Helligkeit (WCAG) einer Hex-Farbe. */
export function luminance(hex: string): number {
  const c = safeColor(hex, '#000000')
  const ch = [1, 3, 5].map((i) => {
    const v = parseInt(c.slice(i, i + 2), 16) / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2]
}

export function contrastRatio(a: string, b: string): number {
  const la = luminance(a)
  const lb = luminance(b)
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

const textOn = (bg: string) => (luminance(bg) > 0.45 ? '#14130f' : '#ffffff')

// --- Matrix -----------------------------------------------------------------

export interface Matrix {
  n: number
  dark: (r: number, c: number) => boolean
}

export class QrCapacityError extends Error {}

export function createMatrix(data: string, ec: EcLevel): Matrix {
  // UTF-8, damit Umlaute und Emoji auf jedem Handy korrekt ankommen
  qrcode.stringToBytes = (s: string) => Array.from(new TextEncoder().encode(s))
  const qr = qrcode(0, ec)
  try {
    qr.addData(data, 'Byte')
    qr.make()
  } catch {
    throw new QrCapacityError('Zu viel Inhalt für einen QR-Code')
  }
  const n = qr.getModuleCount()
  return { n, dark: (r, c) => r >= 0 && c >= 0 && r < n && c < n && qr.isDark(r, c) }
}

// --- Pfade ------------------------------------------------------------------

type Radii = [number, number, number, number] // tl, tr, br, bl

function rr(x: number, y: number, w: number, h: number, [tl, tr, br, bl]: Radii): string {
  const a = (r: number, ex: number, ey: number) => (r ? `A${f(r)} ${f(r)} 0 0 1 ${f(ex)} ${f(ey)}` : '')
  return (
    `M${f(x + tl)} ${f(y)}H${f(x + w - tr)}${a(tr, x + w, y + tr)}` +
    `V${f(y + h - br)}${a(br, x + w - br, y + h)}` +
    `H${f(x + bl)}${a(bl, x, y + h - bl)}` +
    `V${f(y + tl)}${a(tl, x + tl, y)}Z`
  )
}

const all = (r: number): Radii => [r, r, r, r]

/** Pfad aller Datenmodule. `on` liefert, ob ein Modul gezeichnet wird. */
export function dotsPath(n: number, on: (r: number, c: number) => boolean, style: DotStyle): string {
  let d = ''
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!on(r, c)) continue
      const x = c * U
      const y = r * U
      const t = on(r - 1, c)
      const b = on(r + 1, c)
      const l = on(r, c - 1)
      const ri = on(r, c + 1)
      switch (style) {
        case 'square':
          d += rr(x, y, U, U, all(0))
          break
        case 'fluid': {
          const R = U / 2
          d += rr(x, y, U, U, [!t && !l ? R : 0, !t && !ri ? R : 0, !b && !ri ? R : 0, !b && !l ? R : 0])
          break
        }
        case 'soft':
          d += rr(x + 0.6, y + 0.6, U - 1.2, U - 1.2, all(2.6))
          break
        case 'dots':
          d += rr(x + 0.7, y + 0.7, U - 1.4, U - 1.4, all((U - 1.4) / 2))
          break
        case 'vertical': {
          const R = (U - 2) / 2
          d += rr(x + 1, y, U - 2, U, [t ? 0 : R, t ? 0 : R, b ? 0 : R, b ? 0 : R])
          break
        }
        case 'horizontal': {
          const R = (U - 2) / 2
          d += rr(x, y + 1, U, U - 2, [l ? 0 : R, ri ? 0 : R, ri ? 0 : R, l ? 0 : R])
          break
        }
      }
    }
  }
  return d
}

// Verbundene Muster bekommen eine hauchdünne Kontur in Füllfarbe: verhindert
// Haarlinien zwischen den Modulen beim Rastern.
const SEAMLESS: Record<DotStyle, boolean> = {
  square: true,
  fluid: true,
  vertical: true,
  horizontal: true,
  soft: false,
  dots: false,
}

/** sharp: Index der spitzen Ecke bei „leaf“ (0 tl, 1 tr, 2 br, 3 bl). */
function leaf(r: number, sharp: number): Radii {
  const out: Radii = [r, r, r, r]
  out[sharp] = 0
  return out
}

export function eyeFramePath(x: number, y: number, style: EyeFrame, sharp = 2): string {
  const outer = 7 * U
  const inner = 5 * U
  const [ro, ri]: [Radii, Radii] =
    style === 'rounded'
      ? [all(22), all(12)]
      : style === 'circle'
        ? [all(outer / 2), all(inner / 2)]
        : style === 'leaf'
          ? [leaf(30, sharp), leaf(20, sharp)]
          : [all(0), all(0)]
  return rr(x, y, outer, outer, ro) + rr(x + U, y + U, inner, inner, ri)
}

export function eyeBallPath(x: number, y: number, style: EyeBall, sharp = 2): string {
  const s = 3 * U
  const radii: Radii =
    style === 'rounded' ? all(9) : style === 'circle' ? all(s / 2) : style === 'leaf' ? leaf(13, sharp) : all(0)
  return rr(x + 2 * U, y + 2 * U, s, s, radii)
}

// --- Rahmen -----------------------------------------------------------------

interface FrameLayout {
  width: number
  height: number
  cardX: number
  cardY: number
  before: string
  after: string
}

const FONT = `font-family="'Helvetica Neue',Helvetica,Arial,sans-serif" font-weight="700"`

function label(text: string, cx: number, cy: number, maxW: number, maxFs: number, fill: string): string {
  const t = text.trim()
  if (!t) return ''
  const fs = Math.min(maxFs, maxW / (0.6 * Math.max(t.length, 4)))
  return `<text x="${f(cx)}" y="${f(cy)}" dy="0.35em" text-anchor="middle" ${FONT} font-size="${f(fs)}" fill="${fill}">${esc(t)}</text>`
}

function frameLayout(C: number, d: Design): FrameLayout {
  const t = C / 100
  const fc = safeColor(d.frameColor, '#14130f')
  const bg = safeColor(d.bg, '#ffffff')
  const cardFill = d.transparent ? 'none' : bg
  const on = textOn(fc)

  // Karte mit farbiger Kontur (Basis für border / pill / bubble)
  const s = 3 * t
  const bordered = `<rect x="${f(s / 2)}" y="${f(s / 2)}" width="${f(C + s)}" height="${f(C + s)}" rx="${f(7 * t)}" fill="${cardFill}" stroke="${fc}" stroke-width="${f(s)}"/>`

  switch (d.frame) {
    case 'border':
      return { width: C + 2 * s, height: C + 2 * s, cardX: s, cardY: s, before: bordered, after: '' }

    case 'label-bottom':
    case 'label-top': {
      const b = 4 * t
      const L = 19 * t
      const W = C + 2 * b
      const H = b + C + L
      const top = d.frame === 'label-top'
      const cardY = top ? L : b
      const textY = top ? L / 2 + b * 0.15 : b + C + L / 2 - b * 0.15
      return {
        width: W,
        height: H,
        cardX: b,
        cardY,
        before:
          `<rect width="${f(W)}" height="${f(H)}" rx="${f(9 * t)}" fill="${fc}"/>` +
          `<rect x="${f(b)}" y="${f(cardY)}" width="${f(C)}" height="${f(C)}" rx="${f(5.5 * t)}" fill="${bg}"/>`,
        after: label(d.frameText, W / 2, textY, W - 4 * b, L * 0.5, on),
      }
    }

    case 'ticket': {
      const b = 4 * t
      const L = 23 * t
      const W = C + 2 * b
      const H = b + C + L
      const R = 9 * t
      const nr = 3.6 * t
      const ny = b + C + 3.4 * t
      const outline =
        `M${f(R)} 0H${f(W - R)}A${f(R)} ${f(R)} 0 0 1 ${f(W)} ${f(R)}` +
        `V${f(ny - nr)}A${f(nr)} ${f(nr)} 0 0 0 ${f(W)} ${f(ny + nr)}` +
        `V${f(H - R)}A${f(R)} ${f(R)} 0 0 1 ${f(W - R)} ${f(H)}` +
        `H${f(R)}A${f(R)} ${f(R)} 0 0 1 0 ${f(H - R)}` +
        `V${f(ny + nr)}A${f(nr)} ${f(nr)} 0 0 0 0 ${f(ny - nr)}` +
        `V${f(R)}A${f(R)} ${f(R)} 0 0 1 ${f(R)} 0Z`
      return {
        width: W,
        height: H,
        cardX: b,
        cardY: b,
        before:
          `<path d="${outline}" fill="${fc}"/>` +
          `<rect x="${f(b)}" y="${f(b)}" width="${f(C)}" height="${f(C)}" rx="${f(5.5 * t)}" fill="${bg}"/>` +
          `<path d="M${f(nr + 3 * t)} ${f(ny)}H${f(W - nr - 3 * t)}" stroke="${on}" stroke-opacity="0.55" stroke-width="${f(0.7 * t)}" stroke-dasharray="${f(2.2 * t)} ${f(2.2 * t)}" stroke-linecap="round"/>`,
        after: label(d.frameText, W / 2, ny + (H - ny) / 2 + 0.6 * t, W - 4 * b, L * 0.42, on),
      }
    }

    case 'pill': {
      const W = C + 2 * s
      const g = 5 * t
      const h = 17 * t
      const pw = W * 0.8
      const y = W + g
      return {
        width: W,
        height: y + h,
        cardX: s,
        cardY: s,
        before: bordered + `<rect x="${f((W - pw) / 2)}" y="${f(y)}" width="${f(pw)}" height="${f(h)}" rx="${f(h / 2)}" fill="${fc}"/>`,
        after: label(d.frameText, W / 2, y + h / 2, pw - 8 * t, h * 0.52, on),
      }
    }

    case 'bubble': {
      const W = C + 2 * s
      const g = 7 * t
      const h = 18 * t
      const y = W + g
      const tri = `M${f(W / 2 - 6 * t)} ${f(y + 0.5)}L${f(W / 2)} ${f(y - 5.5 * t)}L${f(W / 2 + 6 * t)} ${f(y + 0.5)}Z`
      return {
        width: W,
        height: y + h,
        cardX: s,
        cardY: s,
        before:
          bordered +
          `<rect y="${f(y)}" width="${f(W)}" height="${f(h)}" rx="${f(6 * t)}" fill="${fc}"/>` +
          `<path d="${tri}" fill="${fc}"/>`,
        after: label(d.frameText, W / 2, y + h / 2, W - 10 * t, h * 0.5, on),
      }
    }

    case 'viewfinder': {
      const m = 6 * t
      const W = C + 2 * m
      const sw = 2.6 * t
      const len = 16 * t
      const r = 6 * t
      const a = sw / 2
      const z = W - sw / 2
      const corners =
        `M${f(a)} ${f(a + len)}V${f(a + r)}A${f(r)} ${f(r)} 0 0 1 ${f(a + r)} ${f(a)}H${f(a + len)}` +
        `M${f(z - len)} ${f(a)}H${f(z - r)}A${f(r)} ${f(r)} 0 0 1 ${f(z)} ${f(a + r)}V${f(a + len)}` +
        `M${f(z)} ${f(z - len)}V${f(z - r)}A${f(r)} ${f(r)} 0 0 1 ${f(z - r)} ${f(z)}H${f(z - len)}` +
        `M${f(a + len)} ${f(z)}H${f(a + r)}A${f(r)} ${f(r)} 0 0 1 ${f(a)} ${f(z - r)}V${f(z - len)}`
      const hasText = d.frameText.trim().length > 0
      const th = hasText ? 16 * t : 0
      return {
        width: W,
        height: W + th,
        cardX: m,
        cardY: m,
        before:
          (d.transparent ? '' : `<rect x="${f(m)}" y="${f(m)}" width="${f(C)}" height="${f(C)}" rx="${f(3 * t)}" fill="${bg}"/>`) +
          `<path d="${corners}" fill="none" stroke="${fc}" stroke-width="${f(sw)}" stroke-linecap="round"/>`,
        after: label(d.frameText, W / 2, W + th / 2 + 1.5 * t, W - 4 * t, 10.5 * t, fc),
      }
    }

    default:
      return {
        width: C,
        height: C,
        cardX: 0,
        cardY: 0,
        before: d.transparent ? '' : `<rect width="${f(C)}" height="${f(C)}" fill="${bg}"/>`,
        after: '',
      }
  }
}

// --- Zusammenbau ------------------------------------------------------------

/** Tatsächlich verwendete Fehlerkorrektur: mit Logo immer die höchste Stufe. */
export const effectiveEc = (d: Design): EcLevel => (d.logo ? 'H' : d.ec)

export function renderQr(data: string, design: Design, idPrefix = 'qr'): QrRender {
  const ec = effectiveEc(design)
  const m = createMatrix(data, ec)
  const n = m.n
  const S = n * U
  const C = (n + 2 * QUIET) * U

  const fg = safeColor(design.fg, '#000000')
  const fg2 = safeColor(design.fg2, fg)

  // Logo-Fläche (in Modulen, symmetrisch um die Mitte)
  let logoMarkup = ''
  let inLogo = (_r: number, _c: number) => false
  if (design.logo) {
    const scale = Math.min(Math.max(design.logoScale, 0.12), 0.28)
    const aspect = design.logo.kind === 'upload' ? Math.min(Math.max(design.logo.aspect || 1, 0.4), 2.5) : 1
    const bw = aspect >= 1 ? S * scale : S * scale * aspect
    const bh = aspect >= 1 ? (S * scale) / aspect : S * scale
    const pad = U * 0.7
    const c0 = Math.floor((S / 2 - bw / 2 - pad) / U)
    const c1 = Math.ceil((S / 2 + bw / 2 + pad) / U) - 1
    const r0 = Math.floor((S / 2 - bh / 2 - pad) / U)
    const r1 = Math.ceil((S / 2 + bh / 2 + pad) / U) - 1
    inLogo = (r, c) => r >= r0 && r <= r1 && c >= c0 && c <= c1
    const x = S / 2 - bw / 2
    const y = S / 2 - bh / 2
    if (design.logo.kind === 'upload') {
      if (/^data:image\/(png|jpeg|webp|gif|svg\+xml);base64,[A-Za-z0-9+/=]+$/.test(design.logo.src)) {
        logoMarkup = `<image href="${design.logo.src}" x="${f(x)}" y="${f(y)}" width="${f(bw)}" height="${f(bh)}" preserveAspectRatio="xMidYMid meet"/>`
      }
    } else {
      const logoId = design.logo.id
      const icon = logoIcons.find((i) => i.id === logoId)
      if (icon) {
        logoMarkup = `<path transform="translate(${f(x)} ${f(y)}) scale(${f(bw / 24)})" d="${icon.path}" fill="${icon.color}"/>`
      }
    }
  }

  const isEye = (r: number, c: number) => (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7)
  const on = (r: number, c: number) => m.dark(r, c) && !isEye(r, c) && !inLogo(r, c)

  // Füllung
  let defs = ''
  let fill = fg
  if (design.gradient) {
    const id = `${idPrefix}-g`
    const stops = `<stop offset="0" stop-color="${fg}"/><stop offset="1" stop-color="${fg2}"/>`
    defs =
      design.gradientType === 'radial'
        ? `<defs><radialGradient id="${id}" gradientUnits="userSpaceOnUse" cx="${f(S / 2)}" cy="${f(S / 2)}" r="${f(S * 0.72)}">${stops}</radialGradient></defs>`
        : `<defs><linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${f(S)}" y2="${f(S)}">${stops}</linearGradient></defs>`
    fill = `url(#${id})`
  }
  const eyeFill = design.eyeColor ? safeColor(design.eyeColor, fg) : fill

  const seam = SEAMLESS[design.dots] ? ` stroke="${fill}" stroke-width="0.25"` : ''
  const dots = `<path d="${dotsPath(n, on, design.dots)}" fill="${fill}"${seam}/>`

  const eyes: [number, number, number][] = [
    [0, 0, 2],
    [(n - 7) * U, 0, 3],
    [0, (n - 7) * U, 1],
  ]
  const frames = eyes.map(([x, y, s]) => eyeFramePath(x, y, design.eyeFrame, s)).join('')
  const balls = eyes.map(([x, y, s]) => eyeBallPath(x, y, design.eyeBall, s)).join('')
  const eyeMarkup = `<path d="${frames}" fill="${eyeFill}" fill-rule="evenodd"/><path d="${balls}" fill="${eyeFill}"/>`

  const fr = frameLayout(C, design)
  const qx = fr.cardX + QUIET * U
  const qy = fr.cardY + QUIET * U

  const markup =
    defs +
    fr.before +
    `<g transform="translate(${f(qx)} ${f(qy)})">${dots}${eyeMarkup}${logoMarkup}</g>` +
    fr.after

  return { markup, width: fr.width, height: fr.height, modules: n, version: (n - 17) / 4, ec }
}

/** Vollständiges SVG-Dokument. Ohne `px` skaliert es mit dem Container. */
export function svgString(r: QrRender, px?: number): string {
  const size = px
    ? ` width="${Math.round(px)}" height="${Math.round((px * r.height) / r.width)}"`
    : ' width="100%" height="100%"'
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(r.width)} ${f(r.height)}"${size}>${r.markup}</svg>`
}
