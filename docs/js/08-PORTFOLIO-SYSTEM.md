# PANTELEOS.NRG — Portfolio & Project System

## Files

| File | Lines | Purpose |
|------|-------|---------|
| `js/portfolio-data.js` | 264 | Project dataset (`PORTFOLIO_PROJECTS` with `isMock`), stats (`PORTFOLIO_STATS`), & card renderer (`getActivePortfolioProjects`) |
| `js/portfolio.js` | 760 | Interactions: toggle, exact token filter, modal, cross-filter, stats animation & locale sync |

## Data Architecture

### PORTFOLIO_PROJECTS Array & Auto Mock Removal (portfolio-data.js:18-128)

6 initial showcase projects with this structure:
```javascript
{
  id: "PN-2024-1187",           // Unique project reference
  isMock: true,                 // Tagged as showcase (auto-removed when real data added)
  cat: "commercial bim",        // Space-separated category tags
  tagEn: "COMMERCIAL / BIM",    // English category badge
  tagEl: "ΕΜΠΟΡΙΚΟ / BIM",     // Greek category badge
  titleEn: "...",               // English project title
  titleEl: "...",               // Greek project title
  team: "PANAGIOTIS M. PANTELEOS", // Lead engineer key
  leadEn: "Lead Engineer: ...", // English attribution
  leadEl: "Επικεφαλής Μηχανικός: ...", // Greek attribution
  area: "6,400 m²",            // Gross area (parsed for stats calculation)
  dur: "24 Months",             // English duration
  durEl: "24 Μήνες",           // Greek duration
  lod: "LOD-400",              // BIM precision tier
  descEn: "...",                // English description
  descEl: "...",                // Greek description
  artworkType: 0               // SVG artwork variant index
}
```

**Automatic Mock Exclusion (`getActivePortfolioProjects()`)**:
If at least one real project (where `isMock` is `false` or `undefined`) is inserted into `PORTFOLIO_PROJECTS`, `getActivePortfolioProjects()` automatically hides all 6 `isMock: true` showcase projects from both the DOM grid and statistics calculations!

**Projects:**
| ID | Title | Category | Area | Lead |
|----|-------|----------|------|------|
| PN-2024-1187 | Thessaloniki Port Bio-Cluster | Commercial / BIM | 6,400 m² | P. Panteleos |
| PN-2024-0932 | Attika High-Voltage Substation | Industrial / MEP | 12,500 m² | D. Vamvakas |
| PN-2025-0104 | Olympus Ridge Eco-Resort | Residential / nZEB | 1,850 m² | E. Stavrou |
| PN-2023-0811 | Syntagma Tower Retrofit | Commercial / Retrofit | 8,200 m² | N. Kazantzis |
| PN-2024-0455 | Pharma-Logistics Hub | BIM / Digital Twin | 18,000 m² | P. Panteleos |
| PN-2024-0780 | Aegean Monolith Villa | Residential / BIM | 950 m² | E. Stavrou |

### renderPortfolioProjects(lang) & PORTFOLIO_STATS (portfolio-data.js:131-220)

#### 1. Centralized Statistics (`PORTFOLIO_STATS`)
Drives the `#portfolio-counter-banner` metrics dynamically:
```javascript
const PORTFOLIO_STATS = {
  baselineProjects: 328,       // Pre-featured historical baseline projects
  baselineAreaSqM: 1202100,    // Pre-featured historical baseline area (m²)
  complianceRate: 100,         // % ISO 19650 & Eurocode compliance
  activeSites: 28,             // Active construction sites
  fraction: [2, 3],            // Fractional execution indicator (2/3)

  get completedProjects() { return this.baselineProjects + getActivePortfolioProjects().length; },
  get totalAreaSqM() { /* sums area of getActivePortfolioProjects() + baselineAreaSqM */ }
};
```
- `updatePortfolioStatsBanner(lang)` reads `PORTFOLIO_STATS` and formats numbers dynamically between Greek (`el-GR`) and English (`en-US`) locales upon language toggling.

#### 2. renderPortfolioProjects(lang)
Pure renderer: reads `getActivePortfolioProjects()` + active filter + language → generates HTML → sets `#portfolio-grid.innerHTML`. Also executes `updatePortfolioStatsBanner(lang)`.

**Image auto-discovery:**
```javascript
const primaryImg = proj.image || proj.imageAes || `assets/portfolio/${proj.id}/main.jpg`;
const techImg = proj.imageTech || `assets/portfolio/${proj.id}/tech.jpg`;
```
- Convention: `assets/portfolio/{id}/main.jpg` and `tech.jpg`
- `onerror` handler: removes `<img>`, triggers SVG fallback

**Re-binding:** After rendering, re-triggers `generatePortfolioArtwork()` and `initPortfolioModal()` to attach event listeners to new DOM elements.

## Portfolio Interactions (portfolio.js)

### 1. View Toggle — `initPortfolioToggle()` (Lines 16-34)
```css
/* CSS-only toggle via class on grid container */
.portfolio-grid.tech-view .p-visual .aesthetic { opacity: 0; }
.portfolio-grid.tech-view .p-visual .technical { opacity: 1; }
.portfolio-grid.tech-view .tech-hint-badge { background: #00E5FF; color: #000; }
```
- Two buttons: `#view-aes` (Aesthetic) and `#view-tech` (Technical)
- Toggles `.tech-view` class on `#portfolio-grid`
- CSS handles opacity/transform transitions and `.tech-hint-badge` (`LOD-400 CAD`) color shift — **zero JS animation overhead**

### 2. Category Filtering — `initPortfolioFilters()` (Lines 37-58)
- Filter chips with `data-filter` values: `all`, `commercial`, `industrial`, `residential`, `bim`
- Uses exact token matching (`card.getAttribute('data-cat').split(/\s+/).includes(filter)`) to prevent substring collisions across multi-category projects
- Adds/removes `.hidden` class on `.p-card` elements
- Team name cross-filter also supported: `data-team.includes(filter)`

### 3. Team Cross-Filter — `initTeamCrossFilter()` (Lines 61-97)
- Clicking "FILTER PROJECTS BY ENGINEER" on a team card:
  1. Scrolls to `#portfolio` section
  2. Sets filter to "all projects"
  3. Hides cards not matching the engineer name
  4. Highlights matching cards with temporary cyan box-shadow (2s)

### 4. Team Modal — `initTeamModal()` (Lines 102-269)

Clicking a `.team-card` (not on `.cta` button) opens `#team-modal-overlay`:

**Content population** (Lines 141-168):
```javascript
const data = TEAM_DATA[engKey];
// Fills: badge, reg, name, role, bio, email, tel, specs
```
- Badge shows portrait image or initials fallback
- Specs rendered as styled `<span>` chips
- All text bilingual via `lang` parameter

**Language-aware re-render:**
```javascript
window.updateTeamModalLanguage = (lang) => {
  if (!currentEngineer || !modal.classList.contains('open')) return;
  renderModalContent(currentEngineer, lang);
};
```
**Team card language update** (Lines 191-231): Updates all 6 team cards' names, roles, reg numbers, specs, and portfolio "Lead Engineer" labels.

### 5. Project Modal Gallery — `initPortfolioModal()` (Lines 272-526)

Opening the modal:

1. **Extract card data** from `data-*` attributes and DOM text
2. **Build gallery slides** via `getProjectGallerySlides()`:

| Slide | Source | Description |
|-------|--------|-------------|
| 1 | `.aesthetic img/svg` | Aesthetic project photo |
| 2 | `.technical img/svg` | Technical blueprint |
| 3 | Auto-generated SVG | FEA stress simulation (Eurocode seismic) |
| 4 | Auto-generated SVG | On-site QC telemetry |
| 5+ | Convened by `probeProjectGalleryPhotos()` | `assets/portfolio/{id}/1.jpg`–`8.jpg` |

3. **Probe for additional photos** (Lines 462-479):
   ```javascript
   for (let i = 1; i <= 8; i++) {
     new Image().src = `assets/portfolio/${projId}/${i}.jpg`;
     // onload → push to activeSlides
   }
   ```
   Convention-based gallery expansion — zero config needed.

4. **Gallery navigation:**
   - Prev/next buttons with fade transition
   - Thumbnail dots
   - Keyboard: ArrowLeft, ArrowRight, Escape
   - Close: X button, backdrop click, Escape

### 6. SVG Artwork Synthesis — `generatePortfolioArtwork()` (Lines 529-575)

For cards without images (`!aes.querySelector('img')`), generates inline SVGs:

**Aesthetic SVG:**
- Light background (`#F8F9FA`)
- Abstract architectural polygon in project-color
- Cyan node markers

**Technical SVG:**
- Dark background (`#141414`)
- Grid pattern (20px spacing, cyan lines at 15% opacity)
- Architectural wireframe paths with LOD annotations
- LOD and elevation labels

### 7. Animated Stats Counter — `initPortfolioStats()` (Lines 578-621)

```javascript
const observer = new IntersectionObserver(..., { threshold: 0.15 });
// On scroll into view: animate all .stat-num[data-target] elements
```
- Uses `performance.now()` + `requestAnimationFrame` for smooth animation
- Easing: `1 - Math.pow(2, -10 * progress)` (exponential ease-out)
- Duration: 2400ms
- Targets: 334 projects, 1,250,000 m², 100%, 28 active

---

*End of Portfolio System Documentation*
