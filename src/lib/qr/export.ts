import { QrRender, svgString } from './render'

/** Rastert das SVG auf ein Canvas. `backdrop` füllt transparente Bereiche. */
export async function rasterize(r: QrRender, widthPx: number, backdrop?: string): Promise<HTMLCanvasElement> {
  const w = Math.round(widthPx)
  const h = Math.round((widthPx * r.height) / r.width)
  const url = URL.createObjectURL(new Blob([svgString(r, w)], { type: 'image/svg+xml;charset=utf-8' }))
  try {
    const img = new Image()
    img.decoding = 'async'
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve()
      img.onerror = () => reject(new Error('SVG konnte nicht gerastert werden'))
      img.src = url
    })
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Canvas nicht verfügbar')
    if (backdrop) {
      ctx.fillStyle = backdrop
      ctx.fillRect(0, 0, w, h)
    }
    ctx.drawImage(img, 0, 0, w, h)
    return canvas
  } finally {
    URL.revokeObjectURL(url)
  }
}

export async function pngBlob(r: QrRender, widthPx: number): Promise<Blob> {
  const canvas = await rasterize(r, widthPx)
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('PNG-Export fehlgeschlagen'))), 'image/png'),
  )
}

export function svgBlob(r: QrRender, widthPx = 1024): Blob {
  return new Blob([`<?xml version="1.0" encoding="UTF-8"?>\n${svgString(r, widthPx)}`], { type: 'image/svg+xml;charset=utf-8' })
}

export function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}

/**
 * Scan-Test: rastert den fertigen Code und liest ihn mit einem echten Decoder
 * zurück. `true` nur, wenn exakt der erwartete Inhalt herauskommt.
 *
 * Handykameras sehen einen Code nie pixelscharf. Deshalb testen wir neben dem
 * scharfen Bild auch verkleinerte, leicht weichgezeichnete Fassungen – so, wie
 * Punkt- und Linienmuster in der Praxis beim Scanner ankommen.
 */
export async function verifyScan(r: QrRender, expected: string): Promise<boolean> {
  const jsQR = (await import('jsqr')).default
  const cells = (r.width / 10) // Breite in Modulen inkl. Ruhezone und Rahmen
  // Aufwand begrenzen: große Codes werden mit weniger Pixeln pro Modul geprüft
  const base = Math.max(5, Math.min(12, 1200 / cells))
  const sharp = await rasterize(r, Math.round(cells * base), '#ffffff')

  const matches = (canvas: HTMLCanvasElement, both = false): boolean => {
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return false
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const res = jsQR(img.data, img.width, img.height, { inversionAttempts: both ? 'attemptBoth' : 'dontInvert' })
    if (!res) return false
    if (res.data === expected) return true
    try {
      return new TextDecoder('utf-8').decode(new Uint8Array(res.binaryData)) === expected
    } catch {
      return false
    }
  }

  // Pixel pro Modul: beim Verkleinern mittelt der Browser – das wirkt wie Kamera-Unschärfe
  const attempts = [Math.min(4, base / 2), base, 3, Math.min(6, base * 0.75), 2.5]
  for (let i = 0; i < attempts.length; i++) {
    const ppm = attempts[i]
    // zwischen den Versuchen kurz Luft lassen, damit die Seite bedienbar bleibt
    if (i > 0) await new Promise((res) => setTimeout(res, 0))
    if (ppm === base) {
      if (matches(sharp)) return true
      continue
    }
    const k = ppm / base
    const small = document.createElement('canvas')
    small.width = Math.max(1, Math.round(sharp.width * k))
    small.height = Math.max(1, Math.round(sharp.height * k))
    const ctx = small.getContext('2d', { willReadFrequently: true })
    if (!ctx) continue
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(sharp, 0, 0, small.width, small.height)
    if (matches(small, i === 0)) return true
  }
  return false
}
