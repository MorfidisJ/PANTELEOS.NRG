# PANTELEOS.NRG — Accessibility Widget

**File:** `js/accessibility.js` (345 lines)

## Overview

A floating accessibility widget injected into the DOM on page load. Provides 5 adjustable settings persisted in `localStorage` for return-visit continuity. Fully bilingual (ACC_LANG object mirrors the i18n pattern).

## ACC_LANG Dictionary (Lines 9-52)

Bilingual labels for all widget UI:
- `en`: English labels
- `el`: Greek labels

Keys: `title`, `contrast`, `contrastNormal/High/Invert`, `textSize`, `textNormal/Large/Xlarge`, `font`, `fontNormal/Dyslexic`, `links`, `animations`, `reset`, `enabled/disabled`, `on/off`

## Widget Structure

Self-contained HTML injected at `document.body` end (Lines 56-107):
```
#acc-widget (floating container)
├── #acc-toggle-btn (circular accessibility icon button)
└── #acc-menu (slide-out panel)
    ├── Header: title + close button
    ├── Body:
    │   ├── Contrast Mode: Normal / High / Invert (radio buttons)
    │   ├── Text Size: Normal / Large / Extra Large (radio buttons)
    │   ├── Legible Font: Standard / Dyslexic (toggle)
    │   ├── Link Highlights: on/off switch
    │   └── Animations: enabled/disabled switch
    └── Footer: Reset All Options button
```

## State (Lines 119-125)

```javascript
const state = {
  contrast: localStorage.getItem('acc_contrast') || 'normal',
  text: localStorage.getItem('acc_text') || 'normal',
  font: localStorage.getItem('acc_font') || 'normal',
  links: localStorage.getItem('acc_links') === 'true',
  animations: localStorage.getItem('acc_animations') !== 'false'
};
```

## Settings Application — `applySettings()` (Lines 156-237)

### 1. Contrast (Lines 160-172)

| State | Body Class | Effect |
|-------|-----------|--------|
| `normal` | (none) | Default design tokens |
| `high` | `.acc-high-contrast` | Inverts all CSS custom properties: white→black, charcoal→white, cyan→#0FF |
| `invert` | `.acc-invert` | CSS `filter: invert(1) hue-rotate(180deg)` on body (images double-inverted back) |

### 2. Text Size (Lines 175-189)

| State | `html.style.fontSize` | Body Class |
|-------|----------------------|------------|
| `normal` | (default) | — |
| `large` | `112%` | `.acc-text-large` |
| `xlarge` | `122%` | `.acc-text-xlarge` |

Scales all `rem`-based typography proportionally.

### 3. Dyslexic Font (Lines 192-200)

| State | Body Class |
|-------|-----------|
| `normal` | — |
| `dyslexic` | `.acc-dyslexic-font` |

Sets `font-family: 'OpenDyslexic', var(--font-body)` — **OpenDyslexic font must be loaded separately** (not included in Google Fonts).

### 4. Link Highlights (Lines 203-217)

```javascript
body.classList.toggle('acc-highlight-links');
```
CSS: `body.acc-highlight-links a { outline: 3px solid var(--neon-cyan); outline-offset: 2px; }`

### 5. Animations (Lines 220-234)

```javascript
body.classList.toggle('acc-stop-animations');
```
CSS: `body.acc-stop-animations * { animation-duration: 0.001s !important; transition-duration: 0.001s !important; }`

## Panel Interaction (Lines 128-153)

- Toggle button: click opens/closes panel
- Close button: closes panel
- Click outside widget: closes panel
- Escape key: closes panel
- ARIA attributes maintained: `aria-expanded`, `aria-hidden`

## Language Update (Lines 289-341)

```javascript
window.updateAccessibilityLanguage = (lang) => {
  updateTexts(lang);
};
```
- Updates all widget labels to match current language
- Toggle switch text reflects current state ("Enabled"/"Disabled" or "On"/"Off")

## Reset (Lines 277-286)

Resets all 5 settings to defaults:
- contrast: normal
- text: normal
- font: normal
- links: false
- animations: true
- Clears all localStorage keys → re-calls applySettings()

## Persistence

All 5 settings stored in `localStorage`:

| Key | Values |
|-----|--------|
| `acc_contrast` | `normal` / `high` / `invert` |
| `acc_text` | `normal` / `large` / `xlarge` |
| `acc_font` | `normal` / `dyslexic` |
| `acc_links` | `true` / `false` |
| `acc_animations` | `true` / `false` |

---

*End of Accessibility Widget Documentation*
