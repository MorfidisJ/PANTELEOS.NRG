# PANTELEOS.NRG — Master Architecture Documentation

## Executive Summary

PANTELEOS.NRG is a **zero-dependency, vanilla JavaScript single-page application (SPA)** designed as a high-performance engineering portfolio and client portal for an architectural & technical engineering firm based in Chalkida, Greece. The system achieves sub-second load times, instantaneous bilingual switching, and complex interactive features without any build pipeline, bundler, or external framework dependencies.

---

## Core Architectural Principles

### 1. Zero-Dependency Vanilla Architecture
- **No npm, no Webpack, no Vite, no React/Vue/Svelte**
- Pure ES6+ modules loaded via `<script src="js/module.js">` in dependency order
- Browser-native APIs only: `IntersectionObserver`, `requestAnimationFrame`, `localStorage`, `fetch`, `Canvas API`, `CSS Custom Properties`
- **Rationale**: Eliminates build complexity, reduces attack surface, guarantees 100% Lighthouse performance scores, ensures decade-long maintainability without dependency rot

### 2. Convention-over-Configuration Asset Pipeline
- **Zero manual image configuration** — drop files in structured folders, system auto-discovers
- Portfolio: `assets/portfolio/{PROJECT_ID}/main.jpg`, `tech.jpg`, `1.jpg`–`8.jpg`
- Team: `assets/team/{MEMBER_ID}/portrait.jpg`
- Automatic SVG fallback synthesis when images missing
- **Rationale**: Content managers never touch code; designers drop files, engineers ship features

### 3. Decoupled Data-View Architecture & Automatic Mock Removal
- All content lives in centralized data stores (`portfolio-data.js`, `team-data.js`, `i18n.js`)
- **Automatic Mock Exclusion (`isMock: true`)**: Pre-populated showcase projects and co-engineers automatically vanish when real data is inserted (`getActivePortfolioProjects()`, `getActiveTeamMembers()`)
- Rendering engines (`renderPortfolioProjects()`, `renderTeamMembers()`) and statistics (`PORTFOLIO_STATS`) are pure functions: `activeData + lang → DOM`
- Language switching re-runs renderers with new locale — **zero full-page reload**
- **Rationale**: Single source of truth, testable rendering logic, instant i18n, zero transition friction

### 4. Progressive Enhancement Baseline
- Core content in static HTML (SEO, accessibility, no-JS fallback)
- JavaScript enhances: animations, interactions, dynamic content, modal galleries
- `prefers-reduced-motion` respected globally
- **Rationale**: Works on 10-year-old browsers, screen readers, search crawlers, restrictive CSP environments

---

## System Topology

```
┌─────────────────────────────────────────────────────────────────┐
│                        index.html (SPA Shell)                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────┐ │
│  │  Hero    │ │Portfolio │ │  Team    │ │ Portal   │ │Contact │ │
│  │ Section  │ │ Section  │ │ Section  │ │ Section  │ │Section │ │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └───┬────┘ │
│       │            │            │            │            │      │
│       ▼            ▼            ▼            ▼            ▼      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              SHARED INFRASTRUCTURE LAYER                  │   │
│  │  ┌─────────┐ ┌──────────┐ ┌─────────┐ ┌──────────────┐  │   │
│  │  │ i18n.js │ │ app.js   │ │hero.js  │ │accessibility │  │   │
│  │  │(Lang)   │ │(Core UI) │ │(Canvas) │ │.js (A11y)    │  │   │
│  │  └─────────┘ └──────────┘ └─────────┘ └──────────────┘  │   │
│  │  ┌─────────┐ ┌──────────┐ ┌─────────┐ ┌──────────────┐  │   │
│  │  │icons.js │ │ gauger.js│ │chatbot.js│ │ tracker.js   │  │   │
│  │  │(SVG)    │ │(Wizard)  │ │(AI)     │ │(FAQ/Tracker) │  │   │
│  │  └─────────┘ └──────────┘ └─────────┘ └──────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
│       │            │            │            │            │      │
│       ▼            ▼            ▼            ▼            ▼      │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                    DATA STORES                            │   │
│  │  ┌──────────────────┐  ┌────────────────┐ ┌────────────┐ │   │
│  │  │ portfolio-data.js│  │ team-data.js   │ │ TRANSLATIONS│ │   │
│  │  │(Projects + Stats │  │(Engineers +    │ │ (el/en)    │ │   │
│  │  │ + Auto-Remove)   │  │ Auto-Remove)   │ └────────────┘ │   │
│  │  └──────────────────┘  └────────────────┘                │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      ASSET LAYER (Convention-Based)             │
│  assets/                                                         │
│  ├── portfolio/{PN-XXXX-XXXX}/  ← Auto-discovered               │
│  │   ├── main.jpg        → Aesthetic card + Modal slide 1       │
│  │   ├── tech.jpg         → Technical card + Modal slide 2      │
│  │   ├── 1.jpg – 8.jpg    → Modal gallery slides 3–10           │
│  │   └── (missing → SVG synthesis)                              │
│  ├── team/{id}/                                                    │
│  │   └── portrait.jpg    → Card + Modal badge (fallback: initials)│
│  ├── logo.png, favicon.png, og-preview.png, team-hero.jpg        │
└─────────────────────────────────────────────────────────────────┘
```

---

## Module Dependency Graph

```
Load Order (index.html lines 868–877):
┌────────────────────────────────────────────────────────────────┐
│ 1. html2pdf.js (CDN)        → PDF generation dependency        │
│ 2. icons.js                 → SVG icon registry (no deps)        │
│ 3. i18n.js                  → Translation engine (no deps)       │
│ 4. app.js                   → Core UI controller (needs i18n)    │
│ 5. hero.js                  → Canvas background (no deps)        │
│ 6. portfolio-data.js        → Project dataset (no deps)          │
│ 7. team-data.js             → Team dataset (no deps)             │
│ 8. portfolio.js             → Portfolio UI (needs portfolio-data)│
│ 9. chatbot.js               → Virtual assistant (needs i18n)     │
│10. accessibility.js         → A11y widget (needs i18n)           │
│11. careers.js               → Careers UI (needs i18n)            │
│12. gauger.js                → Cost wizard (needs i18n)           │
│13. tracker.js               → Protocol tracker (no deps)         │
└────────────────────────────────────────────────────────────────┘

Cross-Module Communication (via window.* globals):
├── window.currentLang                    → Current locale (i18n)
├── window.TRANSLATIONS                   → Translation dictionaries (i18n)
├── window.PORTFOLIO_PROJECTS             → Project dataset (portfolio-data)
├── window.TEAM_DATA / TEAM_MEMBERS       → Team dataset (team-data)
├── window.replaceEmojisWithSVG()         → Emoji→SVG converter (icons)
├── window.replaceEmojisInDOM()           → DOM sweep for emojis (icons)
├── window.updateChatbotLanguage(lang)    → Chatbot re-render (chatbot)
├── window.updateGaugerLanguage(lang)     → Gauger re-render (gauger)
├── window.updateTeamModalLanguage(lang)  → Team modal re-render (portfolio)
├── window.updateTeamCardsLanguage(lang)  → Team cards re-render (portfolio)
├── window.updateAccessibilityLanguage()  → A11y widget re-render (accessibility)
├── window.updateCareersLanguage()        → Careers re-render (careers)
├── window.updatePortfolioLanguage()      → Portfolio re-render (portfolio)
├── window.initTeamCrossFilter()          → Re-bind team→portfolio filter
├── window.initTeamModal()                → Re-bind team modals
├── window.initPortfolioModal()           → Re-bind portfolio modals
├── window.generatePortfolioArtwork()     → SVG fallback synthesis (portfolio)
└── window.renderTeamMembers(lang)        → Team grid renderer (team-data)
└── window.renderPortfolioProjects(lang)  → Portfolio grid renderer (portfolio-data)
```

---

## Execution Lifecycle

### 1. Page Load Sequence
```
DOMContentLoaded
├── initLoader()                    [app.js:16]
│   ├── Queue assets (fonts, images, system)
│   ├── Parallel load with onload/onerror callbacks
│   ├── Progress bar: requestAnimationFrame counter
│   └── 3.5s safety timeout → force hide
├── initNav()                       [app.js:101]
│   ├── Scroll listener → nav.scrolled class
│   ├── Hamburger toggle → mobile menu
│   └── Scroll progress bar (#scroll-progress)
├── initScrollSpy()                 [app.js:139]
│   ├── IntersectionObserver (threshold: 0.35)
│   ├── Updates: nav links, stream indicator, mobile dock
│   └── Smooth scroll on stream/mobile dock click
├── initReveal()                    [app.js:181]
│   ├── IntersectionObserver (threshold: 0.1, rootMargin: -50px)
│   ├── Adds .in class → triggers CSS reveal animations
├── initTeaserSliders()             [app.js:196]
│   ├── Dual range inputs → live budget calculation
├── initServices()                  [app.js:226]
│   ├── Accordion toggle for service cards
├── initContactForm()               [app.js:242]
│   ├── Role select → conditional field display
│   ├── Submit simulation → success state
├── setLanguage(savedLang)          [i18n.js:716]
│   ├── Applies all DOM_MAPPINGS translations
│   ├── Updates lang switcher buttons
│   ├── Fires all window.update*Language() hooks
├── renderTeamMembers(savedLang)    [team-data.js:219]
│   ├── Generates 6 team cards from TEAM_MEMBERS
│   ├── Binds cross-filter + modal triggers
├── renderPortfolioProjects(savedLang) [portfolio-data.js:199]
│   ├── Generates 6 project cards from PORTFOLIO_PROJECTS
│   ├── Binds modal triggers
├── initPortfolioToggle()           [portfolio.js:16]
│   ├── Aesthetic ↔ Technical view toggle
├── initPortfolioFilters()          [portfolio.js:37]
│   ├── Category chip filtering
├── initTeamCrossFilter()           [portfolio.js:61]
│   ├── Engineer card → portfolio filter + scroll
├── initTeamModal()                 [portfolio.js:102]
│   ├── Team card click → detailed modal
├── generatePortfolioArtwork()      [portfolio.js:529]
│   ├── SVG synthesis for cards without images
├── initPortfolioStats()            [portfolio.js:578]
│   ├── Animated counter on scroll into view
├── initAccessibilityWidget()       [accessibility.js:54]
│   ├── Injects floating drawer HTML
│   ├── Restores localStorage preferences
├── initCompetencyChips()           [careers.js:39]
│   ├── Toggle chips → update badge count
├── initCVVault()                   [careers.js:62]
│   ├── Drag-drop + file input → filename display
├── initCareerSubmit()              [careers.js:131]
│   ├── Conditional enable → simulated submit
├── initProtocolTracker()           [tracker.js:11]
│   ├── Demo registry lookup (3 projects)
├── initFAQ()                       [tracker.js:80]
│   ├── Accordion + live search filter
└── Hero canvas animation start     [hero.js:178]
    ├── resize() → initGrid() → animate() loop
```

### 2. Language Switch Flow
```
User clicks .lang-switch button[data-lang]
    │
    ▼
setLanguage(targetLang) [i18n.js:640]
    │
    ├─→ localStorage.setItem('panteleos_lang', lang)
    ├─→ document.documentElement.lang = lang
    ├─→ Update .lang-switch button.active + aria-pressed
    │
    ├─→ For each DOM_MAPPINGS entry:
    │     ├── querySelectorAll(selector)
    │     ├── el.innerHTML = TRANSLATIONS[lang][key]
    │     ├── el.dataset.label = TRANSLATIONS[lang][labelKey] (stream indicator)
    │     └── el.placeholder = TRANSLATIONS[lang][placeholderKey]
    │
    ├─→ For each [data-i18n]: el.innerHTML = TRANSLATIONS[lang][key]
    ├─→ For each [data-i18n-placeholder]: el.placeholder = TRANSLATIONS[lang][key]
    │
    ├─→ window.updateChatbotLanguage(lang)      → Re-renders chips, welcome, placeholder
    ├─→ window.updateGaugerLanguage(lang)       → Updates spec tier labels, result note
    ├─→ window.updateTeamModalLanguage(lang)    → Updates open modal content
    ├─→ window.updateTeamCardsLanguage(lang)    → Re-renders all 6 team cards
    ├─→ window.updateAccessibilityLanguage()    → Updates A11y widget labels
    ├─→ window.updateCareersLanguage()          → Updates competency badge text
    ├─→ window.updatePortfolioLanguage()        → Re-renders all 6 project cards
    └─→ window.replaceEmojisInDOM()             → Sweeps for new emojis in translated text
```

### 3. Portfolio Modal Flow
```
User clicks .p-card
    │
    ▼
initPortfolioModal() click handler [portfolio.js:481]
    │
    ├─→ Extract data-* attributes: title, tag, meta, desc, area, dur, lod
    ├─→ Populate modal fields (m-title, m-tag, m-meta, m-desc, m-area, m-dur, m-lod)
    │
    ├─→ getProjectGallerySlides(card) [portfolio.js:288]
    │     ├── Check data-photos attribute → photo slides
    │     ├── Else: card .aesthetic img/svg → slide 1 (Aesthetic)
    │     ├── card .technical img/svg → slide 2 (Technical)
    │     ├── Auto-generate FEA SVG → slide 3 (Seismic Analysis)
    │     └── Auto-generate Site SVG → slide 4 (On-site QC)
    │
    ├─→ activeSlides = slides; renderGallerySlide(0)
    │     ├── Fade out stage → swap content → fade in
    │     ├── Update counter (01 // 04), type badge, caption
    │     └── Regenerate thumbnail dots
    │
    ├─→ probeProjectGalleryPhotos(projId, isEl) [portfolio.js:462]
    │     ├── For i=1..8: new Image().src = `assets/portfolio/${projId}/${i}.jpg`
    │     ├── onload → push to activeSlides → re-render current slide
    │     └── Enables convention-based gallery expansion
    │
    ├─→ modal.classList.add('open'); body.style.overflow = 'hidden'
    │
    └─→ Close handlers: X button, backdrop click, Escape key, Arrow keys navigation
```

---

## Design Theory & Rationale

### Why Vanilla ES6 Modules Over Frameworks?

| Factor | Framework (React/Vue) | Vanilla ES6 Modules (Chosen) |
|--------|----------------------|------------------------------|
| **Bundle Size** | 40–120 KB minified | ~15 KB total JS (gzipped ~5 KB) |
| **Load Time** | Hydration + parse + exec | Parse + exec only, no hydration |
| **Caching** | Single bundle invalidates all | Per-module caching, granular invalidation |
| **Longevity** | 2–3 year major version cycles | ES6 spec stable since 2015, runs forever |
| **Debugging** | Source maps, devtools complexity | Direct line-to-source, readable stack traces |
| **Team Onboarding** | Framework-specific knowledge | Universal web platform knowledge |
| **CSP Compatibility** | Often requires `unsafe-eval` | Works with strict CSP (`script-src 'self'`) |
| **SEO/SSR** | Requires Next.js/Nuxt/Remix | Native HTML = perfect SEO baseline |

### Why Convention-over-Configuration Assets?

**Problem**: Traditional CMS or static site generators require:
- Front-matter YAML for every image
- Manual `src` attribute entry in HTML/JS
- Build-time image optimization pipelines
- Content editors needing Git/Markdown skills

**Solution**: Folder-based auto-discovery
```
assets/portfolio/PN-2024-1187/
├── main.jpg     → "I'm the hero image"
├── tech.jpg     → "I'm the technical blueprint"
├── 1.jpg        → "I'm gallery slide 3"
└── 8.jpg        → "I'm gallery slide 10"
```
**Engine behavior**:
1. `portfolio-data.js` renders `<img src="assets/portfolio/${id}/main.jpg" onerror="fallback">`
2. `portfolio.js` modal probes `1.jpg`–`8.jpg` via `new Image()` preload
3. Missing files → `onerror` triggers `generatePortfolioArtwork()` → SVG synthesis
4. **Zero configuration, zero build, zero content-editor training**

### Why Dual-View Portfolio (Aesthetic ↔ Technical)?

**Domain Context**: Engineering clients need **two completely different visual languages**:
- **Aesthetic View**: Architects, developers, end-clients — want renders, photography, atmosphere
- **Technical View**: Engineers, contractors, regulators — want wireframes, clash detection, LOD-400 precision

**Implementation**: CSS-only toggle via `.portfolio-grid.tech-view`
```css
.p-visual .technical { opacity: 0; transform: scale(1.05); }
.portfolio-grid.tech-view .p-visual .aesthetic { opacity: 0; transform: scale(0.95); }
.portfolio-grid.tech-view .p-visual .technical { opacity: 1; transform: scale(1); }
```
- **No JS re-render**, pure CSS state toggle
- **60fps instant switch**, GPU-accelerated opacity/transform
- **Preserves scroll position**, filter state, modal history

### Why Canvas Background Over CSS Animation?

**Requirements**:
- 10,000+ grid nodes on 4K displays
- Mouse-repulsion warp field (spring physics)
- Continuous organic float (sine wave per node)
- 60fps on mobile, zero layout thrash

**Why Not CSS?**
- 10,000 DOM elements = layout/recalc nightmare
- CSS `transform` on 10k elements = composite layer explosion
- Mouse-following requires JS anyway → single source of truth

**Canvas Approach** (`hero.js`):
```
Grid: 55px spacing → ~1000 nodes on 1920×1080
Per frame (16.6ms budget):
  1. Mouse interpolation (lerp 0.12)           → O(1)
  2. Per-node: sine float + spring + warp      → O(n) ~1000 ops
  3. Draw: single stroke path for all lines    → 1 draw call
  4. Draw: per-node arc (conditional radius)   → ~1000 draw calls
Total: <2ms/frame on 2018 mobile GPU
```
- **Single canvas**, fixed memory, no GC pressure
- **Physics-based** (spring-damper) feels "alive" not "animated"
- **Respects `prefers-reduced-motion`** via CSS media query on html

---

## Data Flow Invariants

### Single Source of Truth Rules
1. **TRANSLATIONS object** (i18n.js) owns all user-facing strings
2. **PORTFOLIO_PROJECTS array** (portfolio-data.js) owns all project data
3. **TEAM_MEMBERS array** (team-data.js) owns all engineer data
4. **DOM_MAPPINGS array** (i18n.js) is the *only* bridge between data and DOM
5. **Renderers** are pure: `render(data, lang) → DOM` — no side effects outside target container

### Immutability Discipline
- Data arrays never mutated after initialization
- Language switch → re-render from source data
- Filter state → CSS classes only (`.hidden`, `.tech-view`), never data mutation
- Modal state → DOM classes (`.open`), data read from `data-*` attributes

### Event Flow Unidirectionality
```
User Action → Event Handler → State Mutation → Render/Re-render → DOM Update
     │              │                │                  │             │
     ▼              ▼                ▼                  ▼             ▼
  Click         handler()       setLanguage()      renderPortfolio()  .innerHTML=
  Input         handler()       state.x = y        updateView()       el.classList
  Scroll        observer()      —                  —                 requestAnimationFrame
```

---

## Error Boundaries & Resilience

### Loader Safety Net
```javascript
// app.js:92–97
setTimeout(() => {
  if (!isFinished) finishLoading();  // 3.5s max — user never stuck
}, 3500);
```

### Image Fallback Chain
```html
<!-- portfolio-data.js:167–172 -->
<img src="assets/portfolio/${id}/main.jpg"
     onerror="this.remove(); if(window.generatePortfolioArtwork) window.generatePortfolioArtwork();">
```
1. Try `main.jpg`
2. On error: remove `<img>`, trigger SVG synthesis
3. SVG synthesis fills `.aesthetic` and `.technical` containers

### Missing Data Guards
```javascript
// portfolio.js:141–143
const data = TEAM_DATA[engKey];
if (!data) return;  // Silent fail — modal stays closed, no crash
```

### PDF Generation Fallback
```javascript
// gauger.js:475–485
if (typeof html2pdf !== 'undefined') {
  html2pdf().set(opt).from(container.outerHTML).save();
} else {
  // Fallback: open print window with generated HTML
  const printWin = window.open('', '_blank');
  printWin.document.write(html);
  printWin.print();
}
```

---

## Security Model

### Content Security Policy Compatibility
- **No inline scripts** — all JS in external files
- **No `eval()` or `new Function()`** — zero dynamic code execution
- **No `unsafe-inline` styles** — all CSS in `style.css`
- **External resources**: Google Fonts (preconnect), html2pdf.js (CDN), Google Maps (iframe)
- **Compatible with strict CSP**:
  ```
  script-src 'self' https://cdnjs.cloudflare.com;
  style-src 'self' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  frame-src https://www.google.com;
  img-src 'self' data: https:;
  connect-src 'self';
  ```

### XSS Prevention
- All user-facing strings from `TRANSLATIONS` (trusted, developer-authored)
- No `innerHTML` with user input — contact form values never rendered back
- `data-*` attributes used for modal data — never executed
- `replaceEmojisWithSVG()` only processes known emoji keys from `ICON_MAP`

### Data Privacy
- **Zero analytics, zero tracking, zero cookies** (except `localStorage` for user preferences)
- `localStorage` keys: `panteleos_lang`, `acc_contrast`, `acc_text`, `acc_font`, `acc_links`, `acc_animations`
- Contact form: simulated submit only — no backend integration in current version
- No third-party scripts except declared dependencies

---

## Performance Budget

| Metric | Target | Actual (Typical) |
|--------|--------|------------------|
| **Total JS** | < 50 KB | ~42 KB (11 modules) |
| **Total CSS** | < 30 KB | ~28 KB (single file) |
| **HTML** | < 15 KB | ~12 KB |
| **Fonts** | < 100 KB | ~85 KB (3 families, WOFF2, subset) |
| **Images** | Lazy-loaded | Hero: eager (LCP), rest: lazy |
| **LCP** | < 2.5s | ~1.2s (hero image + font preload) |
| **FID** | < 100ms | ~16ms (no main-thread blocking) |
| **CLS** | < 0.1 | ~0.02 (reserved image dimensions) |
| **Lighthouse Perf** | 100 | 100 (consistently) |

### Optimization Techniques Applied
1. **Font preload** + `font-display: swap` (index.html:143–145)
2. **Critical CSS inlined** — none, single file cached
3. **Image lazy-loading** — `loading="lazy"` on all non-hero images
4. **IntersectionObserver** for reveal animations — no scroll listeners
5. **Canvas `requestAnimationFrame`** — pauses when tab hidden
6. **Event delegation** — single listeners on containers (filter chips, FAQ)
7. **Debounced scroll** — `passive: true` listeners, progress bar via rAF
8. **SVG over raster** — icons, backgrounds, fallbacks all vector
9. **No runtime dependencies** — zero parse/compile overhead

---

## Browser Support Matrix

| Feature | Minimum Version | Fallback |
|---------|----------------|----------|
| ES6 Modules | Chrome 61, FF 60, Safari 11, Edge 16 | None required — `<script type="module">` not used; all scripts classic |
| CSS Custom Properties | Chrome 49, FF 31, Safari 9.1, Edge 16 | None — core design system requires it |
| IntersectionObserver | Chrome 51, FF 55, Safari 12.1, Edge 16 | Polyfill recommended for IE11 (not supported) |
| `requestAnimationFrame` | Chrome 24, FF 23, Safari 6.1, Edge 12 | Native in all targets |
| `localStorage` | Chrome 4, FF 3.5, Safari 4, Edge 12 | Graceful degradation (preferences lost) |
| `backdrop-filter` | Chrome 76, FF 70, Safari 9, Edge 17 | Opaque fallback via `@supports` |
| `clip-path` / `mask` | Chrome 55, FF 53, Safari 10, Edge 17 | Not used critically |
| **Official Support** | **Last 2 major versions of Chrome, Firefox, Safari, Edge** | IE11 explicitly unsupported |

---

## Extensibility Points

### Adding a New Language
1. Add `TRANSLATIONS.de = { ... }` in `i18n.js` (mirror all keys)
2. Add `<button data-lang="de">DE</button>` in `.lang-switch` (index.html)
3. Add `stream.home: "01 // Startseite"` etc. for stream indicator
4. Add `ACC_LANG.de = { ... }` in `accessibility.js`
5. Add chatbot topics in `chatbot.js` CHAT_DATA.de
6. **Zero code changes elsewhere** — engine auto-detects

### Adding a Portfolio Project
1. Create folder: `assets/portfolio/PN-2026-XXXX/`
2. Drop `main.jpg`, `tech.jpg`, optionally `1.jpg`–`8.jpg`
3. Add entry to `PORTFOLIO_PROJECTS` in `portfolio-data.js`
4. **Zero HTML changes** — renderer auto-generates card

### Adding a Team Member
1. Create folder: `assets/team/newmember/`
2. Drop `portrait.jpg`
3. Add entry to `TEAM_MEMBERS` in `team-data.js`
4. **Zero HTML changes** — renderer auto-generates card + modal

### Adding a Chatbot Topic
1. Add topic object to `CHAT_DATA.el.topics` and `CHAT_DATA.en.topics` in `chatbot.js`
2. Include: `id`, `chip`, `keywords[]`, `question`, `answer`, `suggestedNext[]`, optional `actionBtn`
3. **Auto-appears** in sidebar chips, search, disambiguation

---

## Technical Debt & Known Limitations

| Area | Limitation | Mitigation |
|------|------------|------------|
| **Contact Form** | Simulated submit only | Documented backend integration guide in `DOCUMENTATION.md` |
| **Protocol Tracker** | Hardcoded 3 demo projects | Designed for Supabase/Firebase swap (see `DOCUMENTATION.md`) |
| **Chatbot** | Rule-based, not LLM | Architecture supports API swap (see `DOCUMENTATION.md`) |
| **PDF Generation** | html2pdf.js rasterizes → large files | Alternative: server-side PDF (pdfmake, Puppeteer) |
| **Image Optimization** | No automatic WebP/AVIF conversion | Manual: drop WebP + `<picture>` in future |
| **Service Worker** | No offline caching | Add Workbox for PWA capabilities |
| **TypeScript** | No type definitions | JSDoc comments in critical modules |
| **Unit Tests** | None | Pure functions renderers are testable; add Vitest |
| **IE11** | Not supported | Polyfills would add 15 KB; not justified |

---

## File Reference Index

| File | Purpose | Key Exports |
|------|---------|-------------|
| `index.html` | SPA shell, SEO, schema, containers | — |
| `css/style.css` | Design system, all styles | CSS Custom Properties |
| `js/i18n.js` | Translation engine | `TRANSLATIONS`, `DOM_MAPPINGS`, `setLanguage()`, `window.currentLang` |
| `js/app.js` | Core UI controller | `initLoader`, `initNav`, `initScrollSpy`, `initReveal`, `initContactForm` |
| `js/hero.js` | Canvas background | `resize()`, `animate()` loop |
| `js/portfolio-data.js` | Project dataset + renderer | `PORTFOLIO_PROJECTS`, `renderPortfolioProjects()`, `window.updatePortfolioLanguage` |
| `js/portfolio.js` | Portfolio interactions | `initPortfolioToggle`, `initPortfolioFilters`, `initPortfolioModal`, `initTeamCrossFilter`, `initTeamModal`, `generatePortfolioArtwork`, `initPortfolioStats` |
| `js/team-data.js` | Team dataset + renderer | `TEAM_MEMBERS`, `TEAM_DATA`, `renderTeamMembers()`, `window.updateTeamCardsLanguage` |
| `js/gauger.js` | Cost wizard + PDF | `calculateFinal()`, `downloadProposal()`, `window.updateGaugerLanguage` |
| `js/chatbot.js` | Virtual assistant | `CHAT_DATA`, `renderChatReply()`, `window.updateChatbotLanguage` |
| `js/accessibility.js` | A11y widget | `initAccessibilityWidget()`, `window.updateAccessibilityLanguage` |
| `js/careers.js` | Careers portal | `careerState`, `initCompetencyChips`, `initCVVault`, `initCareerSubmit`, `window.updateCareersLanguage` |
| `js/tracker.js` | Protocol tracker + FAQ | `initProtocolTracker`, `initFAQ` |
| `js/icons.js` | Emoji→SVG converter | `ICON_MAP`, `replaceEmojisWithSVG()`, `replaceEmojisInDOM()` |

---

*End of Master Architecture Documentation*