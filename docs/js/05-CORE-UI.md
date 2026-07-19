# PANTELEOS.NRG — Core Application Controller

**File:** `js/app.js` (269 lines)

## Overview

The core UI controller (`app.js`) handles all foundational browser interactions: asset preloading, navigation scroll effects, scroll-spy section detection, reveal-on-scroll animations, a teaser cost estimator, service card accordions, and the contact form. It is the first application script loaded (after i18n and icons).

## Initialization (Line 5-13)

```javascript
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNav();
  initScrollSpy();
  initReveal();
  initContactForm();
  initTeaserSliders();
  initServices();
});
```

## Modules

### 1. Loader — `initLoader()` (Lines 16-98)

Full-screen asset preloader with progress bar.

**Asset Queue** (Lines 23-38):
```
1. Google Fonts (Outfit, JetBrains Mono)        — font
2. assets/logo.png                              — img
3. assets/team-hero.jpg                         — img
4. assets/favicon.png                           — img
5. BIM LOD-400 Blueprint Engine                 — system (simulated)
6. Seismic Eurocode Simulation Mesh             — system (simulated)
+ All <img> tags in DOM dynamically discovered  — img
```

**Progress Algorithm:**
- `loadedCount / totalAssets * 100` → bar width %
- Each asset loaded fires `onAssetLoad` → increment counter
- Font loading: `document.fonts.ready`
- Images: `new Image()` with `onload`/`onerror`
- System entries: random delay (200-600ms)
- **Safety timeout**: 3.5s → forces `finishLoading()` — user is never stuck

**Finish sequence:**
1. Set bar to 100%
2. Display "all assets verified."
3. 600ms delay → add `.hide` class → CSS transition fades loader out

### 2. Navbar — `initNav()` (Lines 101-128)

**Scroll behavior:**
- `scroll` event listener (passive: true)
- `window.scrollY > 40` → adds `.scrolled` to `header#site-nav`
- Scrolled state: compact nav height, stronger shadow

**Hamburger:**
- Toggle `.open` on hamburger and `#nav-links`
- Clicking any nav link closes the mobile menu

**Scroll Progress Bar:** `updateScrollProgress()` (Lines 130-136)
```javascript
const pct = (window.scrollY / total) * 100;
bar.style.width = `${pct}%`;
```
- Updates `#scroll-progress` width in real-time
- Driven by `scroll` event (from initNav)

### 3. Scroll Spy — `initScrollSpy()` (Lines 139-178)

Uses `IntersectionObserver` with `threshold: 0.35`:
- Watches all `section[id]` elements
- On intersection: updates `.nav-links a.active`, stream indicator buttons, mobile dock items
- Stream indicator buttons scroll to target with smooth behavior and nav height offset

### 4. Reveal Animations — `initReveal()` (Lines 181-193)

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);  // One-shot
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
```
- Targets all `.reveal` elements
- Adds `.in` class → triggers CSS `opacity: 1; transform: none`
- `rootMargin: -50px` = triggers 50px before element enters viewport
- `unobserve` after first trigger → no repeat animations

### 5. Teaser Sliders — `initTeaserSliders()` (Lines 196-223)

Two range inputs (`#teaser-area`, `#teaser-complexity`) producing a live cost estimate:
- Area slider: 100–2000 m²
- Complexity slider: 1 (Standard/€1150), 2 (Advanced BIM/€1550), 3 (High-Spec/€2100)
- Formula: `total = area * multiplier`
- Output: `€XX,XXX` format

### 6. Services Accordion — `initServices()` (Lines 226-239)

Clicking `.service-toggle` on a `.service-card`:
1. Closes all open cards (`c.classList.remove('open')`)
2. Opens clicked card if it was closed
3. `e.stopPropagation()` prevents parent triggers

### 7. Contact Form — `initContactForm()` (Lines 242-269)

**Role Selector** (Lines 248-254):
```javascript
roleSelect.addEventListener('change', () => {
  condFields.forEach(f => {
    f.classList.toggle('show', f.getAttribute('data-role') === val);
  });
});
```
- `#contact-role` options: client / architect / contractor
- Each option shows a specific `.conditional-field` via `data-role` matching

**Submit Handler** (Lines 257-268):
1. `e.preventDefault()` — no actual form submission
2. Button text → "SUBMITTING INQUIRY..."
3. 800ms delay → hide form, show success state
4. **Simulated submit** — no backend integration in current version

---

*End of Core UI Controller Documentation*
