# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Static export to ./out (output: 'export')
npm run preview  # Build + run with Cloudflare runtime locally (wrangler dev)
npm run deploy   # Build + deploy to Cloudflare Workers (wrangler deploy)
npm run lint     # Run ESLint
```

No test framework is configured yet.

## Architecture

**Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS

**QR Code Libraries:**
- `qr-code-styling` - Main library for styled QR codes with dot/corner patterns
- `html2canvas` - Used for downloading QR codes with frames as PNG

### Core Component Flow

```
QRGenerator (src/components/qr-generator/QRGenerator.tsx)
├── Manages all state: activeType, qrData, options, form data
├── Auto-generates QR code via useEffect when inputs change
├── handleReset() - Clears all form fields across all QR types
│
├── TypeSelector - Switches between 12 QR types
├── Form Components (forms/*.tsx) - One per QR type
├── QRCustomization - Colors, patterns, logos, frames
└── QRPreview - Renders QR using qr-code-styling
    └── QRCodeFrame - Wraps QR with decorative frames
```

### Key Files

- **`src/types/qr.ts`** - All TypeScript types, color palettes, frame templates, social logo SVG data
- **`src/lib/qr-utils.ts`** - QR data format generators (WiFi, vCard, iCal, etc.)
- **`src/components/qr-generator/QRPreview.tsx`** - QR rendering with race-condition handling via `renderIdRef`

### QR Data Formats

Each QR type has a generator function in `qr-utils.ts`:
- WiFi: `WIFI:T:WPA;S:ssid;P:password;;`
- vCard: `BEGIN:VCARD\nVERSION:3.0\n...`
- Event: `BEGIN:VEVENT\n...` (iCalendar)
- Email: `mailto:` with URL-encoded subject/body
- Location: `geo:lat,lng` or Google Maps URL

### Style System

Dot styles map to qr-code-styling types in `QRPreview.tsx`:
- square, rounded, dots, classy, classy-rounded, extra-rounded

Frame templates defined in `qr.ts` are rendered by `QRCodeFrame.tsx` using CSS/SVG.

**Logo sizing:** `logoSize` is stored in pixels (30-100), converted to ratio for qr-code-styling:
```typescript
const logoRatio = options.logoSize / options.size
```

### Race Condition Handling

QRPreview uses `renderIdRef` to prevent stale async renders:
```typescript
renderIdRef.current += 1
const currentRenderId = renderIdRef.current
// ... async work ...
if (currentRenderId !== renderIdRef.current) return
```

A `qrKey` string triggers React re-renders when QR-relevant options change.

## Development Notes

- All QR generation is client-side (`'use client'` components)
- Path alias: `@/*` maps to `./src/*`
- Language: German (de_DE) - UI text, legal pages, metadata
- Mobile: Sticky preview bar at top, responsive grid layout
- Preview shows "Live-Vorschau mit Beispieldaten" (amber) when no data, "Live-Vorschau" (green) with data

## Repository & Hosting

> Stand 2026-11-19. Bei Änderungen am Hosting diesen Abschnitt aktualisieren.

### Repository

- GitHub **`fte-one/qrcode.de`** (öffentlich). Bis 2026-11-19 `okartmann/qrcode` — GitHub leitet alte URLs weiter.
- Default-Branch **`main`** (hieß vorher `claude/create-qrcode-project-IktZ5`).
- Lokaler Klon auf dem Dev-Server: `~/git/ok-venture/qrcode.de`. Remote-Control-Dienst `claude-rc@qrcode.de`
  (Umgebung `dev-qrcode.de` in der Claude-App, Worktree je Session).

### Hosting: Cloudflare Workers (Static Assets)

- Bis 2026-11 auf **Vercel** (`qrcode-ochre-five.vercel.app`), seit 2026-11-19 auf **Cloudflare**.
- **Build:** `next.config.js` setzt `output: 'export'` und `images.unoptimized` → reine statische Dateien in `./out`.
  Deshalb gehen **keine** Server-Features (API-Routes, Server Actions, Middleware, `next start`, ISR, `next/image`-Optimierung).
  Die App ist komplett clientseitig, das passt.
- **Worker `qrcode-de`** im Cloudflare-Account **FTE.ONE** (`f3e6984dcc97a64e3d564710e231216e`), Konfiguration in
  `wrangler.jsonc`:
  - `assets.directory: ./out`, Binding `ASSETS`, `html_handling: auto-trailing-slash` (`/impressum/` → `/impressum`),
    `not_found_handling: 404-page` (liefert `out/404.html` mit Status 404).
  - `run_worker_first: true` + `worker/index.js`: leitet **`www.qrcode.de` per 301 auf `qrcode.de`** um (Pfad und Query
    bleiben), alles andere geht an `env.ASSETS`. Grund: Der API-Token hat kein Recht für Redirect-Rules
    (*Zone → Dynamic URL Redirects*), deshalb im Worker gelöst.
  - Routen: `qrcode.de` und `www.qrcode.de` als **Custom Domains** (Cloudflare legt DNS-Einträge und Zertifikat selbst an).
  - Zusätzlich erreichbar: **https://qrcode-de.kartmann.workers.dev** (`workers_dev: true`), Preview-URLs an.
- **Testen der Umleitung:** `wrangler dev` schreibt jede lokale Anfrage auf die erste Route (`qrcode.de`) um — die
  www-Umleitung ist lokal also nicht sichtbar. Stattdessen die Funktion direkt mit Node aufrufen
  (`new Request('https://www.qrcode.de/…')` + Fake-`env.ASSETS`).

### Deployen

- **Manuell** vom Dev-Server: `CLOUDFLARE_API_TOKEN=… npm run deploy`. Token = `CF_API_TOKEN` aus `~/git/vs6/.env`
  (Token „dev-host fte.one“; seit 2026-11-19 mit *Konto → Workers-Skripte → Bearbeiten* und
  *Zone → Worker-Routen → Bearbeiten*). Kein automatischer Deploy bei Push — wer das will: im Cloudflare-Dashboard das
  GitHub-Repo mit dem Worker verbinden (Workers Builds) oder eine GitHub Action mit eigenem, eng begrenztem Token.
- Ein Push auf `main` deployt also **nichts** bei Cloudflare. Falls das Vercel-Projekt noch mit dem Repo verbunden ist,
  baut dort weiter Vercel (ohne Wirkung auf die Domain).

### DNS / Domain `qrcode.de`

- Registrar **United Domains**; Nameserver seit 2026-11-19 bei Cloudflare (`aspen.ns.cloudflare.com`,
  `uriah.ns.cloudflare.com`). Zone im Account FTE.ONE, Zone-ID `5f104230f469f0e0ec6ec1d500673a54`, Status aktiv.
- **E-Mail bleibt bei United Domains:** `MX mx00.udag.de` / `mx01.udag.de`, SPF `v=spf1 include:_smtp.udag.de ~all`
  — nicht anfassen. Dazu ein alter TXT-Eintrag mit Prüfsumme (vermutlich Verifizierung), bleibt stehen.
- **Web-Einträge** legt Cloudflare über die Custom Domains selbst an (`AAAA qrcode.de/www → 100::`, proxied) — nicht
  von Hand ändern. **Always Use HTTPS** ist an (`http://` → 301 auf `https://`).
- **Rückweg zu Vercel** (falls je nötig): Custom Domains am Worker entfernen, dann wieder anlegen
  `A qrcode.de → 216.198.79.1` und `CNAME www → 8b89037797e02987.vercel-dns-017.com` (beide nur DNS, nicht proxied).
  Diese Einträge wurden am 2026-11-19 beim Umschalten gelöscht.

### Umstellung 2026-11-19 — erledigt

- Vercel-DNS-Einträge gelöscht, Custom Domains angehängt (Version `569ce290`). Geprüft: `https://qrcode.de`,
  `/impressum`, `/datenschutz` → 200 (`server: cloudflare`), unbekannte Pfade → 404,
  `https://www.qrcode.de/impressum?x=1` → 301 auf `https://qrcode.de/impressum?x=1`, `http://` → 301 auf `https://`.
  Generator im Browser getestet (URL eingeben → QR-Code wird erzeugt).

### Offen

1. **Vercel-Projekt löschen:** `qrcode-ochre-five` im Vercel-Dashboard (kein Vercel-Zugang auf dem Dev-Server).
   PRs #1/#2 (Vercel Analytics/Speed Insights) sind geschlossen, ihre Branches gelöscht (2026-11-19).
2. `public/favicon.ico` fehlt (Konsolenfehler 404) — es gibt nur `icon.svg`.
3. `public/sitemap.xml` hat `lastmod 2024-01-30`.
