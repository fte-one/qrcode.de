# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Static export to ./out (output: 'export'), includes lint + type check
npm run preview  # Build + run with Cloudflare runtime locally (wrangler dev)
npm run deploy   # Build + deploy to Cloudflare Workers (wrangler deploy)
npm run lint     # Run ESLint
```

No test framework is configured. Verify changes in the browser (see "Testing" below).

## Architecture

**Stack:** Next.js 14 (App Router, static export), React 18, TypeScript, Tailwind CSS 3.
**Runtime deps:** `qrcode-generator` (module matrix), `jsqr` (decoder for scan test + scanner), `@heroicons/react`.
Everything runs client-side; there is no backend.

### Pages (`src/app`)

- `/` – hero, generator, "Warum", type grid, print guide with size calculator, FAQ
- `/[slug]` – one landing page per QR type (`/wlan-qr-code`, `/girocode`, …) with generator preset to that type,
  how-to, tips, FAQ. Slugs come from `qrTypes` in `src/lib/qr/content.ts`, copy from `src/content/landing.ts`.
  Do **not** add `export const dynamicParams = false` – it breaks `next dev` with `output: 'export'`.
- `/qr-code-scanner` – decode a QR code from image / clipboard / camera (`components/site/Scanner.tsx`)
- `/impressum`, `/datenschutz` (formal "Sie"; the rest of the site uses "du")
- `sitemap.ts`, `robots.ts` generate `sitemap.xml` / `robots.txt` at build time

### QR core (`src/lib/qr`)

- **`render.ts`** – own vector renderer. `renderQr(data, design)` returns SVG markup + dimensions; `svgString()` wraps
  it. Preview, SVG download, PNG download, thumbnails and scan test all use the *same* markup (WYSIWYG).
  Coordinate system: 10 units per module, 4 modules quiet zone. Contains dot styles, eye shapes, logo cut-out,
  gradients and all frames (`frameLayout`). With a logo the error correction is forced to `H`.
- **`content.ts`** – the 13 QR types: form field definitions + `encode()` into the standard format (WIFI:, vCard 3.0,
  iCalendar, EPC/GiroCode incl. IBAN check, SMSTO:, wa.me, geo:, PayPal.Me, BIP 21 …). `encode` returns
  `{ data, error?, note? }`; `data: null` means "not ready yet".
- **`export.ts`** – rasterize SVG → canvas/PNG, downloads, and `verifyScan()`: decodes the finished code with jsQR at
  several downscaled sizes (simulates camera blur; dot patterns are unreadable for jsQR when pixel-sharp).
- **`presets.ts`** – style presets, lists of dot styles / eyes / frames; **`logos.ts`** – centre icons (24×24 paths).

### Components

```
components/generator/Generator.tsx   state (type, values per type, design), preview, downloads, scan test, mobile bar
├── TypePicker.tsx                   chips for the 13 types
├── ContentForm.tsx                  renders fields from content.ts (config-driven, no per-type form files)
└── DesignPanel.tsx                  tabs Stil / Farben / Logo / Rahmen
components/site/                     Header, Footer, Logo, Faq (+ JSON-LD helpers), TypeGrid, PrintCalculator, Scanner, LegalPage
```

- Design settings persist in `localStorage` (`qrcode.design.v2`); content is never stored.
- Uploaded logos are normalised to a ≤512 px PNG data URL on a canvas (also strips active content from SVGs).

### Design system

"Print proof" look: paper `#f3efe6`, ink `#14130f`, signal orange `#ff5a2b`, marker yellow `#ffd447`; 1.5 px ink borders,
hard offset shadows (`shadow-hard*`), mono eyebrows ("01 — Inhalt"). Tokens in `tailwind.config.ts`, shared classes
(`.btn`, `.field`, `.tile`, `.panel`, `.eyebrow`, `.marker`, `.bg-grid`) in `src/app/globals.css`.
Fonts via `next/font/google` (Bricolage Grotesque, Instrument Sans, JetBrains Mono) – downloaded at build time and
self-hosted, no request to Google at runtime (matters for DSGVO; keep it that way).

### Static assets (`public/`)

`_headers` (security + cache headers, applied by Cloudflare static assets), `og.png`, `favicon.ico`, `icon.svg`,
`icon-192/512.png`, `apple-touch-icon.png`, `manifest.json`.

### Testing

After changes to rendering or styles: enter content, check that the preview shows "Scan-Test bestanden" for every dot
style / frame / with logo, download PNG + SVG and feed them to `/qr-code-scanner`. Claims in the copy
(free, static codes, nothing leaves the browser, no cookies) must stay true – do not add trackers or server calls.

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
2. **Impressum:** Es fehlt eine E-Mail-Adresse für die schnelle elektronische Kontaktaufnahme (§ 5 DDG).
