import type { Design, DotStyle, EyeBall, EyeFrame, FrameId } from './render'

export interface Preset {
  id: string
  name: string
  design: Partial<Design>
}

// Vorlagen setzen nur das Aussehen des Codes – Logo und Rahmen bleiben erhalten.
export const presets: Preset[] = [
  { id: 'klassik', name: 'Klassik', design: { fg: '#000000', bg: '#ffffff', gradient: false, eyeColor: null, dots: 'square', eyeFrame: 'square', eyeBall: 'square' } },
  { id: 'tinte', name: 'Tinte', design: { fg: '#14130f', bg: '#ffffff', gradient: false, eyeColor: null, dots: 'fluid', eyeFrame: 'rounded', eyeBall: 'rounded' } },
  { id: 'signal', name: 'Signal', design: { fg: '#14130f', bg: '#ffffff', gradient: false, eyeColor: '#e8431a', dots: 'dots', eyeFrame: 'rounded', eyeBall: 'circle' } },
  { id: 'ozean', name: 'Ozean', design: { fg: '#0b2f7a', fg2: '#0a8f9c', bg: '#ffffff', gradient: true, gradientType: 'linear', eyeColor: null, dots: 'fluid', eyeFrame: 'leaf', eyeBall: 'leaf' } },
  { id: 'wald', name: 'Wald', design: { fg: '#14532d', bg: '#f3f8ee', gradient: false, eyeColor: null, dots: 'soft', eyeFrame: 'rounded', eyeBall: 'rounded' } },
  { id: 'beere', name: 'Beere', design: { fg: '#be123c', fg2: '#6d1466', bg: '#ffffff', gradient: true, gradientType: 'radial', eyeColor: '#6d1466', dots: 'dots', eyeFrame: 'circle', eyeBall: 'circle' } },
  { id: 'strich', name: 'Strich', design: { fg: '#1e1b4b', bg: '#ffffff', gradient: false, eyeColor: null, dots: 'vertical', eyeFrame: 'rounded', eyeBall: 'rounded' } },
  { id: 'kupfer', name: 'Kupfer', design: { fg: '#7c2d12', fg2: '#b45309', bg: '#fff8ec', gradient: true, gradientType: 'linear', eyeColor: null, dots: 'horizontal', eyeFrame: 'leaf', eyeBall: 'circle' } },
]

export const dotStyles: { id: DotStyle; name: string }[] = [
  { id: 'square', name: 'Quadrat' },
  { id: 'fluid', name: 'Fließend' },
  { id: 'soft', name: 'Weich' },
  { id: 'dots', name: 'Punkte' },
  { id: 'vertical', name: 'Säulen' },
  { id: 'horizontal', name: 'Zeilen' },
]

export const eyeFrames: { id: EyeFrame; name: string }[] = [
  { id: 'square', name: 'Eckig' },
  { id: 'rounded', name: 'Rund' },
  { id: 'circle', name: 'Kreis' },
  { id: 'leaf', name: 'Blatt' },
]

export const eyeBalls: { id: EyeBall; name: string }[] = [
  { id: 'square', name: 'Eckig' },
  { id: 'rounded', name: 'Rund' },
  { id: 'circle', name: 'Kreis' },
  { id: 'leaf', name: 'Blatt' },
]

export const frames: { id: FrameId; name: string; hasText: boolean }[] = [
  { id: 'none', name: 'Ohne', hasText: false },
  { id: 'border', name: 'Kontur', hasText: false },
  { id: 'label-bottom', name: 'Etikett', hasText: true },
  { id: 'label-top', name: 'Etikett oben', hasText: true },
  { id: 'pill', name: 'Schild', hasText: true },
  { id: 'bubble', name: 'Sprechblase', hasText: true },
  { id: 'viewfinder', name: 'Sucher', hasText: true },
  { id: 'ticket', name: 'Ticket', hasText: true },
]

export const frameTexts = ['Scan mich', 'Jetzt scannen', 'Zur Speisekarte', 'WLAN verbinden', 'Kontakt speichern', 'Jetzt bezahlen', 'Mehr erfahren', 'Folge uns']

export const swatches = ['#14130f', '#000000', '#1e1b4b', '#0b2f7a', '#0a6b74', '#14532d', '#7c2d12', '#be123c', '#6d1466', '#e8431a']
