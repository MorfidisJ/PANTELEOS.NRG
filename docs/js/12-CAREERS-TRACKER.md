# PANTELEOS.NRG — Careers & Protocol Tracker

## Files

| File | Lines | Purpose |
|------|-------|---------|
| `js/careers.js` | 167 | Competency chips, CV vault, application submit |
| `js/tracker.js` | 120 | Protocol lookup, FAQ accordion + live search |

## Careers Engine (careers.js)

**Not loaded in index.html** — embedded independently when careers section is present.

### State (Lines 5-9)
```javascript
let careerState = {
  competenciesSelected: 1,
  fileUploaded: false,
  fileName: null
};
```

### 1. Competency Chips — `initCompetencyChips()` (Lines 39-59)

7 chips representing engineering specializations:
1. BIM LOD-400 / Revit
2. Seismic Analysis (ETABS / SAP2000)
3. MEP HVAC Automation
4. nZEB Energy Simulation
5. On-Site Site Supervision
6. Greek e-Adeia Permitting
7. KNX Smart BMS

**Toggle behavior:**
- Click toggles `.active` class
- `updateCompetencyBadge()` recounts active chips + updates display
- Pulse animation on count badge (scale + cyan border)

**updateCompetencyBadge()** (Lines 19-33):
```javascript
const count = document.querySelectorAll('.comp-chip.active').length;
badge.innerHTML = `SELECTED COMPETENCIES: <b>${count}</b> // PROFILE MATCH ELIGIBLE`;
```
Bilingual text via `currentLang`.

### 2. Drag-and-Drop CV Vault — `initCVVault()` (Lines 62-109)

```javascript
// Drag events: dragenter, dragover, dragleave, drop
vault.addEventListener('drop', (e) => { handleFile(files[0]); });
fileInput.addEventListener('change', () => { handleFile(fileInput.files[0]); });
```

- Accepts any file type (PDF, DWG, REVIT, ZIP implied)
- Shows filename + size in KB on attachment
- Sets `careerState.fileUploaded = true`
- Updates submit button state

### 3. Submit Button — `updateSubmitButtonState()` (Lines 112-129)

**Enabled only when**: `competenciesSelected > 0 AND fileUploaded === true`
- Enabled: full opacity, cyan glow, pointer cursor
- Disabled: 45% opacity, no-pointer, no shadow

### 4. Application Submit — `initCareerSubmit()` (Lines 131-167)

1. Disable button, show spinner with "ENCRYPTING & TRANSMITTING..."
2. 1800ms simulated delay
3. Success state: green button + status message with:
   - Dossier filename
   - Competency count
   - Auto-generated reference ID: `NRG-{random6}`
4. **Simulated submit** — no backend

**Exported global:** `window.updateCareersLanguage` — re-renders competency badge text.

## Protocol Tracker & FAQ (tracker.js)

**Not loaded in index.html** — embedded independently when tracker section is present.

### 1. Protocol Tracker — `initProtocolTracker()` (Lines 11-77)

**Demo registry** (Lines 19-35):
```javascript
const demoRegistry = {
  'PN-2024-1187': { title: 'THESSALONIKI PORT BIO-CLUSTER', status: 'PHASE 03 // BIM STRUCTURAL VALIDATION', step: 3 },
  'PN-2024-0932': { title: 'ATTIKA HIGH-VOLTAGE SUBSTATION', status: 'PHASE 04 // ON-SITE EXECUTION & MEP COMMISSIONING', step: 4 },
  'PN-2025-0104': { title: 'OLYMPUS RIDGE ECO-RESORT', status: 'PHASE 01 // ARCHITECTURAL BRIEF & FEASIBILITY', step: 1 }
};
```

**Query flow:**
1. User inputs protocol ID
2. Button: "QUERYING REGISTRY..." (disabled)
3. 600ms simulated delay
4. If found: show result with project title, status, and step progression (4 phases with done/current classes)
5. If not found: "[ERR 404] Protocol ID not found" with hint for demo keys

**Note**: Designed for future Supabase/Firebase backend swap — registry object is the single integration point.

### 2. FAQ Accordion — `initFAQ()` (Lines 80-119)

**4 FAQ items** with accordion behavior:
```javascript
qBtn.addEventListener('click', () => {
  items.forEach(i => i.classList.remove('open'));  // Close all
  if (!isOpen) item.classList.add('open');          // Toggle clicked
});
```

**Live search** (Lines 96-119):
```javascript
searchInput.addEventListener('input', () => {
  items.forEach(item => {
    const qText = item.querySelector('.faq-q')?.textContent.toLowerCase();
    const aText = item.querySelector('.faq-a')?.textContent.toLowerCase();
    if (!term || qText.includes(term) || aText.includes(term)) {
      item.style.display = '';    // Show
      if (term) item.classList.add('open');  // Auto-open on match
    } else {
      item.style.display = 'none'; // Hide
    }
  });
});
```
- Case-insensitive search across question AND answer text
- Matched items auto-open
- Empty state message shown when no matches

---

*End of Careers & Tracker Documentation*
