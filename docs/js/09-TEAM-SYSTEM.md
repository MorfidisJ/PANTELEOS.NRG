# PANTELEOS.NRG — Team & Engineering Council System

**File:** `js/team-data.js` (221 lines)

## Overview

Centralized dataset for 6 engineering council members with bilingual rendering. Follows the same data-view decoupling pattern as the portfolio system: data in `TEAM_MEMBERS` array, rendering in `renderTeamMembers()` via `getActiveTeamMembers()`, and a `TEAM_DATA` lookup map for modal access.

## TEAM_MEMBERS Array & Auto Mock Removal (Lines 22-149)

Each member object:

```javascript
{
  key: "PANAGIOTIS M. PANTELEOS",  // Unique key (matched in portfolio data)
  id: "panteleos",                  // Folder name for portrait: assets/team/{id}/portrait.jpg
  isMock: true,                     // Tagged on showcase co-engineers (auto-removed when real engineers added)
  initials: "PP",                   // Fallback initials badge
  nameEn: "Panagiotis M. Panteleos",
  nameEl: "Παναγιώτης Μιχ. Παντελαίος",
  shortRoleEn: "Founder & Managing Director",
  shortRoleEl: "Ιδρυτής & Γενικός Διευθυντής",
  roleEn: "Founder & Managing Director, Lead Electrical Engineer",
  roleEl: "Ιδρυτής & Γενικός Διευθυντής, Διπλ. Ηλεκτρολόγος Μηχανικός",
  regEn: "BEng, MSc Electrical Engineering",
  regEl: "Διπλ. Ηλεκτρολόγος Μηχανικός // BEng, MSc",
  bioEn: "Full English biography...",
  bioEl: "Πλήρες ελληνικό βιογραφικό...",
  email: "panteleos.nrg@gmail.com",
  tel: "+30 6976837114",
  cardSpecsEn: ["Electrical Engineering", "Electromagnetic Systems", "Turnkey Management"],
  cardSpecsEl: ["Ηλεκτρολογικές Μελέτες", "Ηλεκτρομαγνητικά Συστήματα", "Διοίκηση Turnkey Έργων"],
  specsEn: ["Electrical Engineering & Design", "Bioclimatic Energy Upgrades", ...],
  specsEl: ["Ηλεκτρολογικές & Ηλεκτρονικές Μελέτες", "Βιοκλιματικές Ενεργειακές Αναβαθμίσεις", ...]
}
```

**Team Members:**
| Key | ID | Initials | Short Role |
|-----|-----|----------|------------|
| PANAGIOTIS M. PANTELEOS | panteleos | PP | Founder & Managing Director |
| DIMITRIS VAMVAKAS | vamvakas | DV | Head of MEP & Energy Infrastructure |
| ELENI STAVROU | stavrou | ES | Senior Lead Architect & nZEB Specialist |
| NIKOS KAZANTZIS | kazantzis | NK | Structural Retrofit & Geotechnical Lead |
| MARIA PAPADOPOULOU | papadopoulou | MP | BIM Coordination Manager & Digital Twin Lead |
| GIORGOS MAKRIS | makris | GM | On-Site Construction Manager & QC Director |

### Automatic Mock Co-Engineer Removal (`getActiveTeamMembers()`)
- The founder profile (`PANAGIOTIS M. PANTELEOS`, `id: "panteleos"`) is real (`isMock` is not set).
- The 5 showcase co-engineers (`vamvakas`, `stavrou`, `kazantzis`, `papadopoulou`, `makris`) are tagged with `isMock: true`.
- **How it works**: When you add real co-engineer objects alongside the founder (or when `TEAM_MEMBERS.filter(m => !m.isMock).length > 1`), `getActiveTeamMembers()` automatically hides and excludes the 5 `isMock: true` showcase co-engineers from the directory grid!

## TEAM_DATA Lookup Map (Lines 152-157)

```javascript
const TEAM_DATA = {};
TEAM_MEMBERS.forEach(m => { TEAM_DATA[m.key] = m; });
window.TEAM_MEMBERS = TEAM_MEMBERS;
window.TEAM_DATA = TEAM_DATA;
```
Keyed by engineer name — enables `portfolio.js` to look up engineer data for modal and card rendering.

## renderTeamMembers(lang) (Lines 162-213)

Generates active `.team-card` elements (from `getActiveTeamMembers()`) into `#team-grid`:

**Card structure:**
```
article.team-card[data-engineer="..."]
├── .team-portrait
│   ├── img.team-img[src="assets/team/{id}/portrait.jpg"] (onerror → remove)
│   └── span (initials fallback)
├── .team-base
│   ├── h4 (name)
│   └── span (short role)
└── .team-overlay
    ├── .grid-lines (decorative)
    ├── .reg (registration)
    ├── h4 (name)
    ├── .spec-list (3 specializations)
    └── button.cta (filter projects)
```

**Image convention:** `assets/team/{id}/portrait.jpg` — auto-discovered. Missing images fall back to initials badge (CSS styled).

**Post-render hooks:**
```javascript
if (typeof window.initTeamCrossFilter === 'function') window.initTeamCrossFilter();
if (typeof window.initTeamModal === 'function') window.initTeamModal();
```

**Cross-module exports:**
| Global | Purpose | Called by |
|--------|---------|-----------|
| `window.renderTeamMembers` | Team renderer | DOMContentLoaded, i18n language switch |
| `window.updateTeamCardsLanguage` | Alias for renderTeamMembers | i18n.js hook |

---

*End of Team System Documentation*
