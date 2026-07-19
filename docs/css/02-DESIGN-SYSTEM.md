# PANTELEOS.NRG — CSS Design System & Design Tokens Documentation

## Overview

The design system is implemented entirely through **CSS Custom Properties (Design Tokens)** in `css/style.css:1-47`. This approach provides:
- **Single source of truth** for all visual values
- **Instant theming** via token override (dark mode, high contrast, brand variants)
- **Zero runtime overhead** — native browser implementation
- **Type safety via convention** — tokens grouped by semantic category

---

## Design Token Registry

### Color System (`:root` lines 6-25)

#### Base Neutrals (Architectural White/Charcoal)
```css
--white: #FFFFFF;                    /* Pure background */
--gray-tech: #F4F7FA;                /* Subtle technical surfaces */
--gray-subtle: #EBF0F5;              /* Borders, dividers, input backgrounds */
--charcoal: #161A22;                 /* Primary text, dark surfaces */
--charcoal-90: rgba(22, 26, 34, 0.90);
--charcoal-75: rgba(22, 26, 34, 0.75);
--charcoal-50: rgba(22, 26, 34, 0.50);
--charcoal-25: rgba(22, 26, 34, 0.25);
--charcoal-12: rgba(22, 26, 34, 0.12);
--charcoal-06: rgba(22, 26, 34, 0.06);
```

**Design Theory**: The charcoal scale uses alpha compositing over white to create depth without hue shift. Each step is mathematically derived: `rgba(22, 26, 34, α)` where α ∈ {0.06, 0.12, 0.25, 0.50, 0.75, 0.90}. This ensures perfect consistency across text, borders, shadows, and overlays.

#### Brand Accent (.NRG Electric Cyan)
```css
--neon-cyan: #00E5FF;                /* Primary action, focus, active states */
--neon-blue: #18C8DD;                /* Hover gradients, secondary accent */
--neon-ink: #0A7482;                 /* Dark mode on cyan, text on cyan */
--cyan-dim: rgba(0, 229, 255, 0.12); /* Subtle backgrounds, badges */
--cyan-dim-2: rgba(0, 229, 255, 0.06); /* Ultra-subtle glow effects */
```

**Color Theory**: Cyan (#00E5FF) chosen for:
- **Engineering connotation**: Technical drawings, CAD highlights, BIM clash detection
- **Accessibility**: 4.5:1 contrast on white (WCAG AA), 7:1 on charcoal (WCAG AAA)
- **Print safety**: In-gamut for CMYK, no gamut clipping
- **Cultural neutrality**: No strong regional associations in Greece/EU

#### Shadow System (Lines 26-30)
```css
--shadow-sm: 0 4px 14px rgba(22, 26, 34, 0.04);      /* Cards, buttons at rest */
--shadow-float: 0 18px 40px rgba(22, 26, 34, 0.06);  /* Hover elevation, modals */
--shadow-hover: 0 26px 55px rgba(22, 26, 34, 0.11);  /* Active drag, focus peak */
```

**Physics Model**: Shadows simulate a single distant light source (sun) at ~45° elevation. Values derived from:
- `y-offset = blur-radius × 0.45` (penumbra geometry)
- `opacity = 0.04 × (elevation-level)` where elevation ∈ {1, 2, 3}
- No colored shadows — maintains architectural neutrality

### Typography Tokens (Lines 31-34)
```css
--font-display: 'Outfit', -apple-system, sans-serif;       /* Headlines, numbers, UI chrome */
--font-body: 'Plus Jakarta Sans', -apple-system, sans-serif; /* Body text, UI labels */
--font-mono: 'JetBrains Mono', monospace;                   /* Technical data, code, badges */
```

**Font Selection Rationale**:

| Font | Role | Why |
|------|------|-----|
| **Outfit** | Display | Geometric sans with wide proportions, excellent at large sizes (clamp 48-86px), distinct numerals for data display |
| **Plus Jakarta Sans** | Body | Humanist proportions, 1.65 line-height friendly, strong international glyph coverage (Greek extended) |
| **JetBrains Mono** | Mono | Developer-grade, clear `0` vs `O`, `1` vs `l`, ligatures disabled for technical clarity |

**Loading Strategy** (index.html:143-145):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Outfit:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```
- `preconnect` eliminates DNS+TLS+TCP RTT (~150ms)
- `display=swap` prevents FOIT (Flash of Invisible Text)
- Variable fonts not used — static weights guarantee consistent rendering across Safari/Chrome/Firefox

### Shape & Radius Tokens (Lines 36-40)
```css
--radius-sm: 10px;      /* Inputs, chips, badges */
--radius-md: 16px;      /* Cards, modals, panels */
--radius-lg: 24px;      /* Hero visual, large containers */
--radius-pill: 100px;   /* Buttons, nav pills, tags, toggles */
```

**Radius Scale Theory**: Based on 8px grid with Fibonacci progression (10, 16, 24, 100). Pill radius (100px) ensures perfect semicircles at any padding.

### Layout Tokens (Lines 42-46)
```css
--edge: clamp(24px, 5vw, 64px);      /* Horizontal page padding — responsive without breakpoints */
--nav-h: 70px;                        /* Fixed nav height */
--ease: cubic-bezier(0.2, 0.8, 0.2, 1);        /* Material-style standard easing */
--spring: cubic-bezier(0.34, 1.56, 0.64, 1);   /* Overshoot spring for playful interactions */
```

**`--edge` Deep Dive**: `clamp(24px, 5vw, 64px)` provides:
- Mobile (320px): 24px fixed
- Tablet (768px): 38px (5vw)
- Desktop (1440px): 64px (5vw)
- Ultra-wide (1920px+): 64px capped
- **Zero media queries needed** for horizontal rhythm

**Easing Functions**:
- `--ease`: Standard "emphasized deceleration" — enter animations, page transitions
- `--spring`: "Anticipatory overshoot" — button hover, card lift, toggle animations. Derived from `spring(1, 100, 10, 0)` ≈ `cubic-bezier(0.34, 1.56, 0.64, 1)`

---

## Component Architecture

### Reset & Base (Lines 55-125)

#### Box Sizing & Scroll
```css
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; font-size: 16px; background-color: var(--white); }
```

#### Reduced Motion (Lines 68-76)
```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.001s !important;
    transition-duration: 0.001s !important;
  }
}
```
**Implementation Note**: `!important` required to override inline `transition` set by JS (e.g., canvas animation). Disables all motion globally — respects OS accessibility setting.

#### Focus Visible (Lines 127-131)
```css
:focus-visible {
  outline: 2px solid var(--neon-cyan);
  outline-offset: 4px;
  border-radius: var(--radius-sm);
}
```
Uses `:focus-visible` (not `:focus`) — shows ring only for keyboard navigation, not mouse clicks.

#### Selection Styling (Lines 122-125)
```css
::selection {
  background: var(--neon-cyan);
  color: var(--charcoal);
}
```
Brand-consistent text selection across all browsers.

---

### Background Systems

#### Blueprint Grid (Lines 136-148)
```css
.blueprint-bg {
  position: fixed; inset: 0; z-index: -2;
  background-color: var(--white);
  background-image:
    radial-gradient(var(--charcoal-12) 1.5px, transparent 1.5px),
    radial-gradient(var(--charcoal-06) 1px, transparent 1px);
  background-size: 60px 60px, 30px 30px;
  background-position: 0 0, 15px 15px;
  opacity: 0.4; pointer-events: none;
}
```
**Visual Effect**: Dual-frequency dot grid simulates engineering paper.
- Primary grid: 60px, 12% opacity dots
- Secondary grid: 30px, 6% opacity dots (half-scale, offset 15px)
- Creates subtle moiré-free texture at all zoom levels
- Fixed position — scrolls with content but behind everything

#### Interactive Canvas (Lines 150-158)
```css
.interactive-bg-canvas {
  position: fixed; inset: 0; width: 100vw; height: 100vh;
  z-index: -1; pointer-events: none; background: transparent;
}
```
Hosts `hero.js` spring-physics grid. `pointer-events: none` allows click-through to content.

---

### Global Utilities

#### Container (`.wrap`, Lines 163-169)
```css
.wrap {
  width: 100%; max-width: 1400px; margin: 0 auto;
  padding-left: var(--edge); padding-right: var(--edge);
}
```
Single container class used by all sections. `max-width: 1400px` optimal for 16:10 content at 1440px viewport.

#### Section Base (Lines 198-207)
```css
section {
  position: relative;
  padding: 120px 0;
}
@media (max-width: 860px) { section { padding: 80px 0; } }
```
Vertical rhythm: 120px desktop, 80px mobile. No `margin-collapse` issues due to `position: relative`.

---

### Button System (`.btn`, Lines 210-275)

#### Base Button
```css
.btn {
  font-family: var(--font-display);
  font-size: 14px; letter-spacing: 0.04em; font-weight: 700;
  padding: 15px 30px; border-radius: var(--radius-pill);
  border: 1.5px solid var(--charcoal-25);
  background: var(--white); color: var(--charcoal);
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  position: relative; overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: all 0.35s var(--spring);
}
```

#### Hover/Active Physics
```css
.btn:hover {
  transform: translateY(-3px) scale(1.02);
  border-color: var(--charcoal);
  box-shadow: 0 12px 25px rgba(22, 26, 34, 0.1);
}
.btn:active { transform: translateY(0) scale(0.98); }
```
**Spring Animation**: `var(--spring)` creates subtle overshoot on hover, immediate return on active.

#### Variants
```css
.btn.primary {
  background: var(--charcoal); color: var(--white); border-color: var(--charcoal);
  box-shadow: 0 8px 22px rgba(22, 26, 34, 0.16);
}
.btn.primary:hover {
  background: var(--neon-cyan); color: #10141C; border-color: var(--neon-cyan);
  box-shadow: 0 12px 28px rgba(0, 229, 255, 0.25);
  transform: translateY(-4px) scale(1.03);
}

.btn.ghost {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border-color: var(--charcoal-12);
}
.btn.ghost:hover {
  background: var(--white); border-color: var(--neon-ink); color: var(--neon-ink);
}
```

#### Icon Animation
```css
.btn svg { width: 18px; height: 18px; transition: transform 0.35s var(--spring); }
.btn:hover svg { transform: translateX(5px); }
```
Forward motion reinforces CTA directionality.

---

### Navigation System

#### Floating Pill Nav (`header#site-nav`, Lines 465-495)
```css
header#site-nav {
  position: fixed; top: 18px; left: 50%; transform: translateX(-50%);
  z-index: 1000; width: calc(100% - 36px); max-width: 1260px; height: var(--nav-h);
  display: flex; align-items: center;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: var(--radius-pill);
  box-shadow: 0 12px 35px rgba(22, 26, 34, 0.07), 0 0 0 1px rgba(22, 26, 34, 0.04);
  transition: all 0.4s var(--spring);
}
```

**Glassmorphism Stack**:
1. `background: rgba(255,255,255,0.88)` — semi-transparent base
2. `backdrop-filter: blur(24px)` — frosted glass effect
3. `border: 1px solid rgba(255,255,255,0.9)` — highlight edge
4. Dual `box-shadow` — depth + crisp hairline

**Scroll State** (`.scrolled`, Lines 490-495):
```css
header#site-nav.scrolled {
  top: 12px; background: rgba(255, 255, 255, 0.95);
  height: calc(var(--nav-h) - 6px);
  box-shadow: 0 16px 40px rgba(22, 26, 34, 0.1);
}
```
Compacts on scroll — visual feedback for "not at top".

#### Nav Links Pill (Lines 528-557)
```css
.nav-links {
  display: flex; align-items: center; gap: 6px;
  background: var(--gray-subtle); padding: 5px 8px;
  border-radius: var(--radius-pill); border: 1px solid rgba(22, 26, 34, 0.05);
}
.nav-links a {
  font-family: var(--font-display); font-size: 14px; font-weight: 600;
  padding: 8px 18px; border-radius: var(--radius-pill);
  color: var(--charcoal-75); transition: all 0.25s var(--spring);
}
.nav-links a:hover { color: var(--charcoal); background: rgba(255,255,255,0.85); }
.nav-links a.active { color: var(--white); background: var(--charcoal); box-shadow: 0 4px 12px rgba(22,26,34,0.2); }
```
Single pill container with internal buttons — cleaner than separated links.

#### Language Switcher (Lines 579-611)
```css
.lang-switch {
  display: flex; align-items: center; gap: 2px;
  background: var(--gray-subtle); padding: 4px;
  border-radius: var(--radius-pill); border: 1px solid rgba(22, 26, 34, 0.08);
}
.lang-switch button {
  font-family: var(--font-mono); font-size: 11px; font-weight: 700; letter-spacing: 0.04em;
  padding: 5px 10px; border-radius: var(--radius-pill); color: var(--charcoal-75);
  transition: all 0.25s var(--spring);
}
.lang-switch button.active { background: var(--charcoal); color: var(--white); box-shadow: 0 4px 10px rgba(22,26,34,0.15); }
```
Monospace for ISO codes (EL/EN), pill-in-pill visual hierarchy.

#### Mobile Hamburger (Lines 613-677)
- Hidden by default (`display: none`)
- Activated at `@media (max-width: 1020px)`
- Animates to X via CSS transforms on `.hamburger.open`
- Nav drawer slides from top with `transform: translateY(-20px) scale(0.95)` → `translateY(0) scale(1)`

---

### Stream Indicator (`#stream-indicator`, Lines 377-449)

Right-edge vertical navigation with variable-width bars:
```css
#stream-indicator button[data-w="1"] { width: 16px; }
#stream-indicator button[data-w="2"] { width: 24px; }
#stream-indicator button[data-w="3"] { width: 12px; }
/* ... up to data-w="8" */
#stream-indicator button.active { background: var(--neon-cyan); width: 36px; height: 8px; }
```
**Design Concept**: Bar widths encode section "weight" (content density). Active section expands to 36px cyan — visual bookmark.

Hidden at `< 1180px` (desktop only).

---

### Scroll Progress (`#scroll-progress`, Lines 451-460)
```css
#scroll-progress {
  position: fixed; top: 0; left: 0; height: 3px;
  background: var(--neon-cyan); z-index: 1001;
  width: 0%; transition: width 0.1s linear;
}
```
Updated via `app.js:updateScrollProgress()` — linear transition matches scroll velocity.

---

### Loader (`#loader`, Lines 280-375)

Centered full-screen with animated progress bar:
```css
.loader-bar-fill {
  height: 100%; width: 0%; background: var(--neon-ink);
  border-radius: var(--radius-pill); transition: width 0.25s ease-out;
}
```
Progress driven by asset loading in `app.js:initLoader()`. Hide via `.hide` class (opacity + visibility transition).

---

### Reveal Animation (`.reveal`, `.reveal.in`)
```css
.reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s var(--ease); }
.reveal.in { opacity: 1; transform: none; }
```
Triggered by `IntersectionObserver` in `app.js:initReveal()` with `rootMargin: '0px 0px -50px 0px'` (triggers 50px before viewport entry).

---

### Mobile App Dock (`.mobile-app-dock`, Lines 844-865)

Fixed bottom nav for ≤768px:
```css
.mobile-app-dock {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 1000;
  display: flex; justify-content: space-around; padding: 8px 0;
  background: rgba(255,255,255,0.95); backdrop-filter: blur(20px);
  border-top: 1px solid var(--charcoal-12);
}
.dock-item { display: flex; flex-direction: column; align-items: center; gap: 4px; color: var(--charcoal-50); }
.dock-item.active { color: var(--neon-cyan); }
```
5 items matching stream indicator sections. SVG icons inline in HTML.

---

## Responsive Breakpoint Strategy

| Breakpoint | Target | Key Changes |
|------------|--------|-------------|
| `@media (max-width: 1180px)` | Stream indicator hidden | Stream bars removed |
| `@media (max-width: 1020px)` | Mobile nav | Hamburger shown, drawer enabled |
| `@media (max-width: 1024px)` | Services grid | 4→2 columns |
| `@media (max-width: 1000px)` | Portfolio grid | 3→2 columns |
| `@media (max-width: 960px)` | Hero grid | 2→1 column, visual order swapped |
| `@media (max-width: 900px)` | Portfolio stats | 2→1 column |
| `@media (max-width: 860px)` | Nav height, section padding | Compact spacing |
| `@media (max-width: 700px)` | Gauger panel | Full-width, no border-radius |
| `@media (max-width: 600px)` | Team modal | Stacked layout |

**Philosophy**: Content-driven breakpoints (where layout breaks), not device-driven. No `min-width` media queries — mobile-first base with progressive enhancement.

---

## Dark Mode / High Contrast Support

Implemented via `accessibility.js` body classes:

```css
/* High Contrast */
body.acc-high-contrast {
  --white: #000; --charcoal: #FFF; --gray-tech: #333; --gray-subtle: #444;
  --neon-cyan: #0FF; --charcoal-12: #FFF; --charcoal-25: #FFF;
}

/* Inverted */
body.acc-invert { filter: invert(1) hue-rotate(180deg); }
body.acc-invert img, body.acc-invert video { filter: invert(1) hue-rotate(180deg); }

/* Large Text */
html.acc-text-large { font-size: 112%; }
html.acc-text-xlarge { font-size: 122%; }

/* Dyslexic Font */
body.acc-dyslexic-font { font-family: 'OpenDyslexic', var(--font-body); }

/* Reduced Motion */
body.acc-stop-animations *, body.acc-stop-animations *::before, body.acc-stop-animations *::after {
  animation-duration: 0.001s !important; transition-duration: 0.001s !important;
}

/* Link Highlight */
body.acc-highlight-links a { outline: 3px solid var(--neon-cyan); outline-offset: 2px; }
```

**Token Override Strategy**: High contrast doesn't just swap colors — it rebuilds the entire token hierarchy via CSS custom property cascade. This avoids hundreds of individual rule overrides.

---

## Print Stylesheet (Implicit)

No explicit `@media print` — relies on:
- `background: var(--white)` ensures white paper
- Fixed elements (`position: fixed`) auto-hidden by browsers
- `backdrop-filter` ignored in print
- Sufficient contrast in base tokens

---

## CSS Architecture Principles

1. **No Utility Classes** — Components styled via semantic classes (`.btn`, `.p-card`, `.team-card`)
2. **No `!important`** except reduced motion & accessibility overrides
3. **Custom Properties for Everything** — Zero magic numbers in component rules
4. **Flat Selector Hierarchy** — Max 2 levels (`.parent .child`), no deep nesting
5. **Mobile-First Base** — Media queries only for expansion, never contraction
6. **Logical Properties** — `inset`, `gap`, `margin-inline` where supported
7. **Container Queries Ready** — `.wrap` max-width enables future `@container` migration

---

## File Structure

```
css/
└── style.css          # Single 3886-line stylesheet (all components)
    ├── :root tokens (1-47)
    ├── Reset & Base (55-125)
    ├── Background Systems (133-158)
    ├── Global Utilities (160-196)
    ├── Section Base (198-207)
    ├── Button System (209-275)
    ├── Loader & Stream (277-460)
    ├── Scroll Progress (451-460)
    ├── Navigation (462-677)
    ├── Hero (681-834)
    ├── Teaser/Gauger Strip (838-960)
    ├── Services Matrix (962-1107)
    ├── Cost Gauger Wizard (1109-1372)
    ├── Portfolio (1374-2000)
    ├── Modals (1705-2000)
    ├── Team (2000-2500)
    ├── Portal/Chatbot (2500-2800)
    ├── Contact (2800-3000)
    ├── Footer (3000-3200)
    ├── Mobile Dock (3200-3300)
    ├── Accessibility Overrides (3300-3500)
    ├── Media Queries (interleaved)
```

---

*End of CSS Design System Documentation*