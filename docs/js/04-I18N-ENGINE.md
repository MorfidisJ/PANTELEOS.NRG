# PANTELEOS.NRG — Internationalization (i18n) Engine

**File:** `js/i18n.js` (734 lines)

## Architecture

The i18n system implements **instant bilingual DOM translation without page reload** through a three-layer architecture:

```
TRANSLATIONS{el, en}  →  DOM_MAPPINGS[]  →  setLanguage(lang)
     (dictionary)        (selector bridge)     (execution engine)
```

## Layer 1: TRANSLATIONS Dictionary (Lines 7-443)

A nested object with two top-level keys (`el`, `en`), each containing ~120 key-value pairs organized by section:

| Section Prefix | Example Key | Description |
|----------------|-------------|-------------|
| `nav.*` | `nav.works` | Navigation link labels |
| `dock.*` | `dock.home` | Mobile dock labels |
| `stream.*` | `stream.home` | Stream indicator labels |
| `hero.*` | `hero.h1` | Hero section content |
| `teaser.*` | `teaser.area` | Quick estimator strip |
| `services.*` | `services.s1.title` | Service matrix |
| `gauger.*` | `gauger.h2` | Cost wizard |
| `portfolio.*` | `portfolio.h2` | Portfolio section |
| `stats.*` | `stats.e1` | Stats banner |
| `team.*` | `team.role1` | Team section |
| `portal.*` | `portal.h3` | Client portal |
| `faq.*` | `faq.q1` | FAQ content |
| `careers.*` | `careers.h2` | Careers section |
| `contact.*` | `contact.h2` | Contact section |
| `form.*` | `form.opt1` | Form labels |
| `footer.*` | `footer.p` | Footer content |

**Design decisions:**
- All user-facing strings are in TRANSLATIONS — **zero hardcoded text outside HTML defaults**
- Greek is first (default locale) — matches firm's primary market in Chalkida, Greece
- HTML `<br>` preserved in translation values for multi-line content

## Layer 2: DOM_MAPPINGS Array (Lines 445-636)

An array of `{ selector, key, labelKey?, placeholderKey? }` objects that bridge translation keys to DOM elements:

```javascript
{ selector: '#nav-links a:nth-child(1)', key: 'nav.works' }
{ selector: '#stream-indicator button[data-target="home"]', labelKey: 'stream.home' }
```

**Selection strategy:**
- Uses `nth-child()` for indexed elements (nav links, dock items, team cards)
- Uses `data-target` attributes for semantic matching (stream indicator)
- Uses attribute selectors for form options and service cards
- Total: ~120 mapping entries covering every translatable element

**Three mapping types:**
| Type | Property | Effect |
|------|----------|--------|
| `key` | `.key` | Sets `innerHTML` |
| `labelKey` | `.labelKey` | Sets `data-label` attribute |
| `placeholderKey` | `.placeholderKey` | Sets `placeholder` attribute |

## Layer 3: setLanguage() Engine (Lines 640-713)

### Execution Flow
```
setLanguage(targetLang)
├── localStorage.setItem('panteleos_lang', lang)   → Persist preference
├── document.documentElement.lang = lang            → Update HTML lang attribute
├── Update .lang-switch buttons                     → active class + aria-pressed
├── Apply DOM_MAPPINGS                              → querySelectorAll + innerHTML
│   ├── SVG icon replacement via replaceEmojisWithSVG()
│   ├── data-label attribute update
│   └── placeholder attribute update
├── Apply [data-i18n] attributes                    → Explicit i18n markup
├── Apply [data-i18n-placeholder] attributes        → Placeholder i18n markup
└── Fire module-specific hooks:
    ├── window.updateChatbotLanguage(lang)
    ├── window.updateGaugerLanguage(lang)
    ├── window.updateTeamModalLanguage(lang)
    ├── window.updateTeamCardsLanguage(lang)
    ├── window.updateAccessibilityLanguage(lang)
    ├── window.updateCareersLanguage(lang)
    ├── window.updatePortfolioLanguage(lang)
    └── window.replaceEmojisInDOM()
```

### Module Hooks

Each module exposes a `window.update*Language()` function during its own `DOMContentLoaded` initialization. When `setLanguage()` fires these hooks, modules re-render their dynamic content:

| Hook | Module | Re-renders |
|------|--------|------------|
| `updateChatbotLanguage` | chatbot.js | Chips, welcome, input placeholder, send button |
| `updateGaugerLanguage` | gauger.js | Spec tier labels, result note |
| `updateTeamModalLanguage` | portfolio.js | Open team modal content |
| `updateTeamCardsLanguage` | team-data.js / portfolio.js | All 6 team cards, portfolio lead labels |
| `updateAccessibilityLanguage` | accessibility.js | Widget labels, button text |
| `updateCareersLanguage` | careers.js | Competency badge count text |
| `updatePortfolioLanguage` | portfolio-data.js | All 6 project cards |

## Initialization (Lines 716-734)

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('panteleos_lang') || 'el';
  // → Restore saved preference || default Greek
  langSwitch.addEventListener('click', (e) => {
    // → Delegate click on lang-switch container
    setLanguage(targetLang);
  });
  setLanguage(savedLang);
});
```

**Default language:** Greek (`el`) — matches firm location in Chalkida, Greece. User preference persisted in `localStorage` under key `panteleos_lang`.

## Adding a New Language

1. Add `TRANSLATIONS.de = { ... }` with all ~120 keys mirrored
2. Add `<button data-lang="de">DE</button>` in `.lang-switch` (index.html)
3. Add `ACC_LANG.de` in accessibility.js if widget labels differ
4. Add chatbot `CHAT_DATA.de` in chatbot.js
5. **Zero code changes elsewhere** — all modules auto-discover via `currentLang`

---

*End of Internationalization Engine Documentation*
