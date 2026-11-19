'use client'

import { useState } from 'react'
import { LogoMark } from './Logo'

// Schieberegler logarithmisch: 0–100 → 0,15 m … 25 m
const toMeters = (v: number) => 0.15 * Math.pow(25 / 0.15, v / 100)
const fmt = (n: number, d = 1) => n.toLocaleString('de-DE', { maximumFractionDigits: d, minimumFractionDigits: 0 })

const examples: [string, number][] = [
  ['Visitenkarte', 12],
  ['Tischaufsteller', 27],
  ['Plakat A1', 55],
  ['Schaufenster', 68],
  ['Bauzaun', 85],
]

export function PrintCalculator() {
  const [v, setV] = useState(27)
  const m = toMeters(v)
  const cm = Math.max(2, m * 10)
  const distance = m < 1 ? `${fmt(m * 100, 0)} cm` : `${fmt(m)} m`
  const size = cm >= 100 ? `${fmt(cm / 100, 2)} m` : `${fmt(cm)} cm`
  // Vorschau-Quadrat: 2 cm → 18 %, 2,5 m → 100 %
  const box = 18 + (Math.log(cm / 2) / Math.log(125)) * 82

  return (
    <div className="panel shadow-hard-lg p-5 sm:p-7">
      <p className="eyebrow !text-ink">
        <span className="text-signal-dark">Rechner</span> — Mindestgröße
      </p>

      <div className="mt-5 grid items-center gap-6 sm:grid-cols-[1fr_150px]">
        <div>
          <label htmlFor="distance" className="text-[14px] font-semibold text-ink/70">
            Aus welcher Entfernung wird gescannt?
          </label>
          <p className="mt-1 font-display text-[40px] font-extrabold leading-none tracking-tight">{distance}</p>
          <input
            id="distance"
            type="range"
            min={0}
            max={100}
            value={v}
            onChange={(e) => setV(Number(e.target.value))}
            aria-valuetext={distance}
            className="mt-4 w-full"
          />
          <div className="mt-3 flex flex-wrap gap-1.5">
            {examples.map(([name, val]) => (
              <button
                key={name}
                type="button"
                onClick={() => setV(val)}
                className={`rounded-full border-[1.5px] px-2.5 py-1 text-[12.5px] font-semibold transition-colors ${
                  Math.abs(v - val) < 2 ? 'border-ink bg-ink text-paper' : 'border-ink/20 bg-white text-ink/70 hover:border-ink/60'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-grid relative mx-auto flex aspect-square w-[150px] items-end justify-start rounded-xl border-[1.5px] border-ink bg-paper p-2">
          <div className="transition-all duration-200" style={{ width: `${box}%`, height: `${box}%` }}>
            <LogoMark className="h-full w-full" />
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-end justify-between gap-4 border-t-[1.5px] border-dashed border-ink/25 pt-5">
        <div>
          <p className="text-[14px] font-semibold text-ink/70">Kantenlänge des Codes, mindestens</p>
          <p className="font-display text-[52px] font-extrabold leading-none tracking-tight text-signal-dark" aria-live="polite">
            {size}
          </p>
        </div>
        <p className="max-w-[190px] text-right text-[12.5px] leading-snug text-muted">
          Faustregel: Abstand ÷ 10, nie unter 2 cm. Bei viel Inhalt oder Logo lieber 20–30 % größer.
        </p>
      </div>
    </div>
  )
}
