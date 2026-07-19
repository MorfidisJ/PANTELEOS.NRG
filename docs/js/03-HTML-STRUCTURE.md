# PANTELEOS.NRG — HTML Structure & SPA Shell Documentation

## Overview

`index.html` (879 lines) serves as the **single-page application shell** — all content is delivered in the initial HTML document without any client-side routing or lazy-loaded HTML. The file contains:

- Full SEO metadata stack (Open Graph, Twitter Cards, Schema.org JSON-LD)
- 5 named sections (`#home`, `#portfolio`, `#team`, `#portal`, `#contact`)
- Persistent UI chrome: nav bar, loader, stream indicator, footer, mobile dock
- 2 modal dialogs: project gallery, team member detail
- 11 modular `<script>` tags loading JS in strict dependency order

---

## SEO & Metadata (Lines 1-62)

### Primary Meta Tags (Lines 8-20)
```html
<title>PANTELEOS .NRG — Architectural & Technical Engineering Matrix // BIM LOD-400</title>
```
- `<meta name="description">` contains 155 chars — optimal for Google SERP snippets
- `<meta name="keywords">` covers Greek + English search terms (BIM, KENAK, nZEB, e-Adeia, etc.)
- `<meta name="robots">` allows `index, follow` with content preview limits
- `<meta name="theme-color">` = `#050B14` matches dark background for PWA-like status bar
- `<link rel="canonical">` points to production Vercel URL

### Geographic SEO (Lines 23-26)
- `geo.region: GR-04` (Central Greece)
- `geo.placename: Chalkida`
- `geo.position` / `ICBM` — precise lat/lng for local search ranking

### Open Graph (Lines 29-39)
```html
<meta property="og:image" content="https://panteleos-nrg.vercel.app/assets/og-preview.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```
- Dimensions specified for crawler optimization (1200×630 = 1.9:1 aspect ratio)
- Both `el_GR` and `en_US` locales declared

### Twitter Cards (Lines 42-49)
- `card: summary_large_image` for rich tweet display
- `@panteleos_nrg` handle

### Apple iOS / Mobile Web App (Lines 52-56)
- `apple-mobile-web-app-capable: yes` — allows full-screen mode on iOS
- `apple-mobile-web-app-status-bar-style: black-translucent` — content renders behind status bar
- `format-detection: telephone=yes` — enables tap-to-call

---

## Schema.org JSON-LD (Lines 63-140)

Type: `ArchitecturalFirm` with the following properties:

| Property | Value |
|----------|-------|
| `@type` | `ArchitecturalFirm` |
| `name` | `PANTELEOS .NRG` |
| `legalName` | `PANTELEOS .NRG Technical & Architectural Engineering Office` |
| `telephone` | `+30 6976837114` |
| `email` | `panteleos.nrg@gmail.com` |
| `address` | `Karamourtzouni 1, Chalkida 341 00, Greece` |
| `geo` | Latitude: 38.4637, Longitude: 23.5936 |
| `founder` | Panagiotis Mich. Panteleos (with LinkedIn `sameAs`) |
| `priceRange` | `€€€` |
| `openingHoursSpecification` | Mon–Fri, 09:00–18:00 |
| `areaServed` | Greece, Balkans & EU |
| `hasOfferCatalog` | 3 service offers: BIM LOD-400, Structural Seismic Analysis, nZEB Upgrade |

---

## Font Loading Strategy (Lines 143-145)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```
- `preconnect` eliminates ~150ms DNS+TLS+TCP latency
- `crossorigin` on gstatic required for font resource CORS
- 3 Google Fonts loaded with `display=swap` (prevents FOIT):

| Font | Weights | CSS Variable | Role |
|------|---------|-------------|------|
| Outfit | 500,600,700,800,900 | `--font-display` | Display headlines, nav, UI chrome |
| Plus Jakarta Sans | 400,500,600,700 | `--font-body` | Body text, labels, paragraphs |
| JetBrains Mono | 400,500,600,700 | `--font-mono` | Technical data, badges, monospace |

---

## Script Loading Order (Lines 868-877)

All scripts are classic `<script src="">` tags (not modules). Load order is critical:

```
1. html2pdf.bundle.min.js (CDN)   → PDF generation (gauger.js dependency)
2. js/icons.js                     → SVG icon registry (zero deps)
3. js/i18n.js                      → Translation engine (zero deps)
4. js/app.js                       → Core UI controller (needs i18n)
5. js/hero.js                      → Canvas background (zero deps)
6. js/portfolio-data.js            → Project dataset + renderer (zero deps)
7. js/team-data.js                 → Team dataset + renderer (zero deps)
8. js/portfolio.js                 → Portfolio/team interactions (needs portfolio-data, team-data)
9. js/chatbot.js                   → Virtual assistant (needs i18n, icons)
10. js/accessibility.js            → A11y widget (needs i18n)
```

**Not loaded in `index.html`** (exist in `js/` but loaded independently or from modals):
- `js/gauger.js` — 4-step cost wizard
- `js/careers.js` — career pipeline
- `js/tracker.js` — protocol tracker + FAQ

---

## Section Breakdown

### Background Systems (Lines 152-154)
- `.blueprint-bg` — dual-frequency dot grid (CSS background)
- `canvas#bg-canvas` — interactive grid (hero.js physics engine)

### Persistent UI Chrome

| Element | Selector | Purpose |
|---------|----------|---------|
| Scroll progress | `#scroll-progress` | 3px cyan line at top |
| Loader | `#loader` | Full-screen asset preloader with animated bar |
| Stream indicator | `#stream-indicator` | Right-edge section nav (desktop only) |
| Nav bar | `header#site-nav` | Floating pill navigation with glassmorphism |
| Mobile dock | `.mobile-app-dock` | Bottom tab bar (≤768px only) |
| Footer | `footer#site-footer` | Brand info, nav columns, badges, socials |

### Section Layout

| Section | ID | Content |
|---------|----|---------|
| Hero | `#home` | Headline, lede, CTA buttons, meta stats, team photo |
| Portfolio | `#portfolio` | Stats banner, filter chips, view toggle, 6 project cards |
| Team | `#team` | Section head, 6 team cards with hover overlays |
| Portal | `#portal` | Chatbot sidebar + message console |
| Contact | `#contact` | Office info, Google Maps iframe, inquiry form |

### Modal Dialogs

| Modal | ID | Trigger | Content |
|-------|----|---------|---------|
| Project gallery | `#modal-overlay` | Click `.p-card` | Gallery stage, counter, prev/next, thumbnails, specs |
| Team member | `#team-modal-overlay` | Click `.team-card` | Badge, name, bio, competencies, contact, filter btn |

---

## External Resources

| Resource | URL | Purpose |
|----------|-----|---------|
| Google Fonts | `fonts.googleapis.com` | Outfit, Plus Jakarta Sans, JetBrains Mono |
| html2pdf.js | `cdnjs.cloudflare.com` | Client-side PDF generation |
| Google Maps | `maps.google.com` | Office location iframe |

---

## Accessibility Markup

- `aria-label` on canvas (line 154), stream indicator (line 179), hamburger (line 205), all modals (lines 396, 438)
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` on both modals
- `aria-pressed` on language switcher buttons
- `aria-live="polite"` on chatbot window
- Form fields use `<label>` with `for` attribute
- All images have `alt` text

---

## Mobile Adaptations

- `mobile-app-dock` — 5-item bottom navigation, hidden above 768px
- `#stream-indicator` — hidden below 1180px
- `#hamburger` — visible below 1020px, toggles mobile nav drawer
- Viewport meta: `width=device-width, initial-scale=1.0, maximum-scale=5.0`

---

*End of HTML Structure Documentation*
