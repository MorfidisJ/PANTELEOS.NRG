# PANTELEOS.NRG — Image System Technical Reference

## Overview

The image system implements **convention-over-configuration** asset discovery with automatic SVG fallback synthesis. Zero build tools, zero manual configuration — drop files in structured folders, the engine handles the rest.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     IMAGE DISCOVERY LAYER                       │
├─────────────────────────────────────────────────────────────────┤
│  1. HTML declares conventional paths                            │
│     <img src="assets/portfolio/{id}/main.jpg">                  │
│     <img src="assets/team/{id}/portrait.jpg">                   │
│                                                                 │
│  2. onerror handler triggers fallback                          │
│     onerror="this.remove(); window.generatePortfolioArtwork()" │
│                                                                 │
│  3. portfolio.js probes for additional gallery images          │
│     for i=1..8: new Image().src = `assets/portfolio/{id}/${i}.jpg`│
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FALLBACK SYNTHESIS LAYER                   │
├─────────────────────────────────────────────────────────────────┤
│  generatePortfolioArtwork() in portfolio.js:529-575            │
│  ├── Aesthetic SVG: light background, abstract polygons        │
│  ├── Technical SVG: dark grid, wireframes, LOD annotations     │
│  └── Per-project color variation via artworkType index         │
└─────────────────────────────────────────────────────────────────┘
```

---

## Portfolio Image Convention

### Folder Structure
```
assets/portfolio/
├── PN-2024-1187/
│   ├── main.jpg      → Card aesthetic view + Modal slide 1
│   ├── tech.jpg      → Card technical view + Modal slide 2
│   ├── 1.jpg         → Modal slide 3 (auto-discovered)
│   ├── 2.jpg         → Modal slide 4
│   ├── 3.jpg         → Modal slide 5
│   ├── 4.jpg         → Modal slide 6
│   ├── 5.jpg         → Modal slide 7
│   ├── 6.jpg         → Modal slide 8
│   ├── 7.jpg         → Modal slide 9
│   └── 8.jpg         → Modal slide 10
└── PN-2024-0932/
    └── ...
```

### HTML Generation (portfolio-data.js:153-155)
```javascript
const primaryImg = proj.image || proj.imageAes || `assets/portfolio/${proj.id}/main.jpg`;
const techImg = proj.imageTech || `assets/portfolio/${proj.id}/tech.jpg`;
```

### Card Template (portfolio-data.js:165-173)
```html
<div class="p-visual">
  <div class="aesthetic">
    <img src="${primaryImg}" alt="${title}" loading="lazy"
         onerror="this.remove(); if(window.generatePortfolioArtwork) window.generatePortfolioArtwork();">
  </div>
  <div class="technical">
    <img src="${techImg}" alt="${title} Technical" loading="lazy"
         onerror="this.remove(); if(window.generatePortfolioArtwork) window.generatePortfolioArtwork();">
  </div>
</div>
```

**Key behaviors:**
- `loading="lazy"` on all non-hero images
- `onerror` removes failed `<img>` and triggers SVG synthesis
- `window.generatePortfolioArtwork` called globally (defined in portfolio.js)

### View Toggle (CSS-only, portfolio.js:16-34)
```css
.p-visual .technical { opacity: 0; transform: scale(1.05); }
.portfolio-grid.tech-view .p-visual .aesthetic { opacity: 0; transform: scale(0.95); }
.portfolio-grid.tech-view .p-visual .technical { opacity: 1; transform: scale(1); }
```
- Zero JS re-render on toggle
- GPU-accelerated opacity/transform
- Preserves scroll position, filter state

---

## Modal Gallery Auto-Discovery

### Initial Slides (portfolio.js:288-394)
```javascript
function getProjectGallerySlides(card) {
  // 1. data-photos attribute (explicit list)
  // 2. .aesthetic img/svg → Slide 1 (Aesthetic)
  // 3. .technical img/svg → Slide 2 (Technical)
  // 4. Auto-generated FEA SVG → Slide 3 (Seismic Analysis)
  // 5. Auto-generated Site SVG → Slide 4 (On-site QC)
}
```

### Convention-Based Probe (portfolio.js:462-479)
```javascript
function probeProjectGalleryPhotos(projId, isEl) {
  for (let i = 1; i <= 8; i++) {
    const candidateUrl = `assets/portfolio/${projId}/${i}.jpg`;
    const img = new Image();
    img.onload = () => {
      if (!activeSlides.some(s => s.img === candidateUrl)) {
        activeSlides.push({
          img: candidateUrl,
          type: isEl ? `ΦΩΤΟΓΡΑΦΙΑ ΕΡΓΟΥ // #${activeSlides.length + 1}` : `PROJECT GALLERY // #${activeSlides.length + 1}`,
          caption: isEl ? `Αυτοματοποιημένη φόρτωση gallery (${projId} - 0${i})` : `Convention-discovered project gallery view (${projId} - 0${i})`
        });
        renderGallerySlide(currentSlideIdx);  // Re-render with new slide
      }
    };
    img.src = candidateUrl;
  }
}
```

**Flow:**
1. Modal opens with 4 slides (2 from card + 2 generated)
2. `probeProjectGalleryPhotos()` fires 8 parallel `Image()` loads
3. Each successful load appends to `activeSlides`
4. Gallery re-renders current slide (shows new thumbnail dots)
5. User can navigate to newly discovered images immediately

---

## Team Portrait Convention

### Folder Structure
```
assets/team/
├── panteleos/
│   └── portrait.jpg  → Card + Modal badge
├── vamvakas/
├── stavrou/
├── kazantzis/
├── papadopoulou/
└── makris/
```

### HTML Generation (team-data.js:178-187)
```javascript
const autoPhotoUrl = member.photo || `assets/team/${member.id}/portrait.jpg`;

<img src="${autoPhotoUrl}" alt="${name}" class="team-img" loading="lazy"
     onerror="this.remove();">
<span>${member.initials}</span>  <!-- Fallback badge -->
```

### Modal Badge (portfolio.js:146-149)
```javascript
const portraitPath = data.photo || (data.id ? `assets/team/${data.id}/portrait.jpg` : '');
badgeEl.innerHTML = `${portraitPath ? `<img src="${portraitPath}" alt="${data.nameEn}" onerror="this.remove();">` : ''}<span>${data.initials}</span>`;
```

---

## SVG Fallback Synthesis

### generatePortfolioArtwork() (portfolio.js:529-575)

Called:
- On initial render (portfolio.js:11)
- After language switch (portfolio-data.js:186)
- After filter/toggle (portfolio.js re-binds)

```javascript
function generatePortfolioArtwork() {
  document.querySelectorAll('.p-visual').forEach((vis, idx) => {
    const aes = vis.querySelector('.aesthetic');
    const tech = vis.querySelector('.technical');
    if (!aes || !tech) return;

    const colors = ['#0A6C78', '#141414', '#26D7EB', '#4EE5F7'];
    const c1 = colors[idx % colors.length];

    // Aesthetic SVG (light theme)
    if (!aes.querySelector('img')) {
      aes.innerHTML = `
        <svg viewBox="0 0 400 300" preserveAspectRatio="none">
          <rect width="400" height="300" fill="#F8F9FA"/>
          <path d="M 40,240 L 160,80 L 280,140 L 360,60 L 360,240 Z" fill="${c1}" opacity="0.12"/>
          <path d="M 80,240 L 180,110 L 260,160 L 340,100 L 340,240 Z" fill="#141414" opacity="0.08"/>
          <line x1="0" y1="240" x2="400" y2="240" stroke="#141414" stroke-width="2"/>
          <circle cx="160" cy="80" r="4" fill="#26D7EB"/>
          <circle cx="280" cy="140" r="4" fill="#26D7EB"/>
        </svg>
      `;
    }

    // Technical SVG (dark theme, grid, wireframe)
    if (!tech.querySelector('img')) {
      tech.innerHTML = `
        <svg viewBox="0 0 400 300" preserveAspectRatio="none">
          <rect width="400" height="300" fill="#141414"/>
          <defs>
            <pattern id="grid-${idx}" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(38, 215, 235, 0.15)" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect width="400" height="300" fill="url(#grid-${idx})"/>
          <path d="M 40,240 L 160,80 L 280,140 L 360,60" fill="none" stroke="#26D7EB" stroke-width="1.5" stroke-dasharray="4,2"/>
          <path d="M 80,240 L 180,110 L 260,160 L 340,100" fill="none" stroke="#4EE5F7" stroke-width="1"/>
          <line x1="0" y1="240" x2="400" y2="240" stroke="#26D7EB" stroke-width="2"/>
          <circle cx="160" cy="80" r="5" fill="none" stroke="#26D7EB" stroke-width="2"/>
          <circle cx="280" cy="140" r="5" fill="none" stroke="#26D7EB" stroke-width="2"/>
          <text x="165" y="75" fill="#26D7EB" font-family="JetBrains Mono" font-size="9">ELV:+42.5m</text>
          <text x="285" y="135" fill="#26D7EB" font-family="JetBrains Mono" font-size="9">LOD:400</text>
        </svg>
      `;
    }
  });
}
```

**Design principles:**
- Aesthetic: Light background, organic architectural forms, cyan accents
- Technical: Dark grid paper, dashed wireframes, monospace LOD labels
- Color variation per project via `artworkType` index
- `preserveAspectRatio="none"` ensures full container fill

---

## Loading Strategy

| Image | Loading | Priority | Rationale |
|-------|---------|----------|-----------|
| `team-hero.jpg` | `eager` | High | LCP candidate, above fold |
| `logo.png` | (preloaded in loader) | High | Nav + footer, immediate paint |
| `favicon.png` | (preloaded in loader) | High | Browser tab icon |
| Portfolio `main.jpg`/`tech.jpg` | `lazy` | Medium | Below fold initially |
| Gallery `1-8.jpg` | On-demand | Low | Only loaded when modal opens |
| Team portraits | `lazy` | Medium | Team section below fold |

**Loader preload queue (app.js:23-30):**
```javascript
const assetsToLoad = [
  { name: 'Google Typography...', type: 'font' },
  { name: 'assets/logo.png', type: 'img', url: 'assets/logo.png' },
  { name: 'assets/team-hero.jpg', type: 'img', url: 'assets/team-hero.jpg' },
  { name: 'assets/favicon.png', type: 'img', url: 'assets/favicon.png' },
  { name: 'BIM LOD-400 Blueprint Engine', type: 'system' },
  { name: 'Seismic Eurocode Simulation Mesh', type: 'system' }
];
```

**Dynamic discovery (app.js:33-38):**
```javascript
document.querySelectorAll('img').forEach(img => {
  if (img.src && !assetsToLoad.some(a => a.url === img.src)) {
    assetsToLoad.push({ name: filename, type: 'img', url: img.src });
  }
});
```

---

## Adding New Content

### New Portfolio Project
1. Create `assets/portfolio/PN-2026-XXXX/`
2. Add `main.jpg` (aesthetic) — **required for card display**
3. Add `tech.jpg` (technical) — **required for technical view**
4. Optionally add `1.jpg` through `8.jpg` for expanded gallery
5. Add entry to `PORTFOLIO_PROJECTS` in `portfolio-data.js`
6. **Zero HTML/CSS changes** — renderer auto-generates card

### New Team Member
1. Create `assets/team/{member-id}/`
2. Add `portrait.jpg`
3. Add entry to `TEAM_MEMBERS` in `team-data.js`
4. **Zero HTML/CSS changes** — renderer auto-generates card + modal

---

## Performance Characteristics

### Request Waterfall
```
1. index.html
2. css/style.css (blocking)
3. Google Fonts (preconnect → parallel)
4. js/*.js (11 scripts, classic loading order)
5. Hero assets (logo, team-hero, favicon) — preloaded via loader
6. Portfolio/team images — lazy loaded on scroll
7. Gallery images — on-demand when modal opens
```

### Caching Headers (Recommended)
```
Cache-Control: public, max-age=31536000, immutable  # for assets/*
```

### Image Optimization Checklist
- [ ] Convert to WebP with JPEG `<picture>` fallback
- [ ] Compress JPGs to 80% quality
- [ ] Resize to exact display dimensions:
  - Portfolio cards: 800×600
  - Gallery: 1200×800 max
  - Team portraits: 400×400
  - Hero: 1200×800
  - OG preview: 1200×630
- [ ] Use `width`/`height` attributes to prevent CLS

---

## Error Handling Flow

```
Image Request
      │
      ▼
┌─────────────┐
│ Success?    │──Yes──▶ Render image
└─────────────┘
      │ No
      ▼
┌─────────────────────┐
│ onerror fires       │
│ this.remove()       │  ← Removes broken <img> from DOM
│ generateArtwork()   │  ← Fills .aesthetic/.technical with SVG
└─────────────────────┘
      │
      ▼
User sees styled architectural SVG instead of broken image icon
```

---

## Security Notes

- All images served from same origin (`assets/`) — no external image domains
- No user-uploaded images rendered without validation (careers file upload shows filename only)
- Google Maps iframe uses `referrerpolicy="no-referrer-when-downgrade"`

---

*End of Image System Technical Reference*