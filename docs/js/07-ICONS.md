# PANTELEOS.NRG — SVG Icon Engine

**File:** `js/icons.js` (188 lines)

## Overview

An IIFE that converts emoji characters into custom SVG path outlines matching the clean architectural aesthetic. All 36 icon definitions are hand-crafted as Lucide-style SVG paths, replacing emoji with consistent vector graphics.

## ICON_MAP Registry (Lines 11-127)

Each emoji key maps to one or more SVG `<path>` elements:

| # | Emoji | Subject | SVG Paths |
|---|-------|---------|-----------|
| 1 | 🔄 | Reset/Refresh | Circular arrows |
| 2 | 👉 | Right arrow | Arrow path |
| 3 | 💡 | Lightbulb/Idea | Bulb + filament |
| 4 | 📐 | BIM LOD-400 | Set square |
| 5 | 🏛/🏛️ | e-Adeia permits | Classical building |
| 6 | 🔑 | Turnkey contracts | Key + lock |
| 7 | ⚡ | nZEB/KENAK | Lightning bolt |
| 8 | 🏗/🏗️ | Construction | Tower crane |
| 9 | 💶 | Budgeting | Euro note |
| 10 | 💰 | Cost elaboration | Money stack |
| 11 | ⏱/⏱️ | Timeline | Stopwatch |
| 12 | 📅 | Schedule | Calendar |
| 13 | 🔨 | Renovation | Hammer |
| 14 | 🏨 | Commercial | Hotel facade |
| 15 | 👔 | Leadership | Tie + person |
| 16 | 🧱 | Materials | Brick grid |
| 17 | 🛰/🛰️ | Drone GIS | Satellite |
| 18 | 🇪🇺 | EU grants | Euro stars |
| 19 | 📞 | Phone | Handset |
| 20 | 📧 | Email | Envelope |
| 21 | ✅/✔ | Success | Checkmark |
| 22 | 📋 | BOQ/Inquiry | Clipboard |
| 23 | 📑 | Proposal | Bookmark |
| 24 | 📄 | Document | Sheet |
| 25 | ⏳ | Timer | Hourglass |
| 26 | 🔹 | Bullet point | Diamond |
| 27 | 🛡/🛡️ | Seismic safety | Shield |
| 28 | 🔬 | Testing | Microscope |
| 29 | 🔍 | Search | Magnifying glass |
| 30 | 📊 | Specs | Bar chart |
| 31 | ⚠/⚠️ | Warning | Triangle |
| 32 | 👍 | Rating up | Thumbs up |
| 33 | 👎 | Rating down | Thumbs down |
| 34 | 📝 | Feedback | Notepad |
| 35 | ✨ | AI/Sparkles | Sparkle |
| 36 | ⚙/⚙️ | Engineering | Gear |

## Regex Engine (Lines 129-132)

```javascript
const iconKeys = Object.keys(ICON_MAP).sort((a, b) => b.length - a.length);
const patternStr = iconKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
const ICON_REGEX = new RegExp(`(${patternStr})\\uFE0F?`, 'g');
```

- Keys sorted by length descending (longest match first)
- Trailing `\uFE0F` (Variation Selector-16) stripped during match

## Core Functions

### replaceEmojisWithSVG(text) (Lines 139-147)
Replaces emoji in any string with `<svg class="ui-icon">` elements:
```javascript
text.replace(ICON_REGEX, (match) => {
  const cleanKey = match.replace(/\uFE0F/g, '');
  const pathData = ICON_MAP[cleanKey] || ICON_MAP[match];
  return `<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true">${pathData}</svg>`;
});
```

### replaceEmojisInDOM(rootNode) (Lines 152-174)
Sweeps specific DOM selectors for emoji and replaces them:
```javascript
const targetSelectors = [
  '#chat-reset-btn span',  '#gauger-proposal-btn span',
  '.section-head h4',      '.section-head h3',
  '.p-card h4',            '.service-card h4',
  '#teaser .teaser-output button span', '.stat-unit'
];
```
- Only processes elements whose innerHTML contains non-Latin/Greek characters
- Prevents redundant processing of already-replaced elements
- Called initially on DOMContentLoaded, and after language switches

## Exported Globals

| Global | Type | Purpose |
|--------|------|---------|
| `window.UI_ICONS` | Object | Raw ICON_MAP reference |
| `window.replaceEmojisWithSVG` | Function | String-level replacement |
| `window.replaceEmojisInDOM` | Function | DOM-level batch replacement |

## Integration Points

- **i18n.js**: `setLanguage()` calls `replaceEmojisWithSVG()` on every translated string before setting innerHTML
- **i18n.js**: `setLanguage()` calls `replaceEmojisInDOM()` as final sweep
- **index.html**: Loaded first among application scripts (line 869)

---

*End of SVG Icon Engine Documentation*
