# PANTELEOS.NRG — Cost Gauger Wizard

**File:** `js/gauger.js` (489 lines)

## Overview

A 4-step interactive cost estimation wizard with sector/scope selection, sliders, animated number display, animated bar charts, and client-side PDF proposal generation. **Not loaded in index.html** — embedded independently when `#gauger-wizard` section is present.

## State Machine (Lines 9-15)

```javascript
let step = 1;                    // Current step (1-4)
let sector = 'Residential';      // Step 1 selection
let scope = 'Turnkey Design & Build';  // Step 2 selection
let area = 450;                  // Step 3 area slider
let spec = 2;                    // Step 3 spec tier slider
let totalEst = 0;                // Computed total
let timelineWeeks = 16;          // Computed timeline
```

## Step Progression

### Step 1: Sector Typology (Lines 22-31)
Buttons: `Residential`, `Commercial`, `Industrial` (Hospitality handled via data-sec attribute)

### Step 2: Scope of Works (Lines 33-42)
Chips: Turnkey Design & Build, Structural Engineering Only, MEP + Energy Upgrade, BIM & Digital Twin

### Step 3: Scale & Specification (Lines 44-70)
- Area slider: range slider, updates `area` and display
- Spec tier slider: 3 tiers (Basic, High-Performance BIM+MEP, Ultra-High-Spec)
- `updateSpecValDisplay()` — bilingual labels for current spec tier

### Step 4: Results (Lines 99-163)

**calculateFinal()** (Lines 104-141):
```javascript
let baseRate = 1200;          // Residential
if (sector === 'Commercial') baseRate = 1450;
if (sector === 'Industrial') baseRate = 1600;

let scopeMult = 1.0;          // Turnkey
if (scope === 'Structural Engineering Only') scopeMult = 0.35;
if (scope === 'MEP + Energy Upgrade') scopeMult = 0.65;
if (scope === 'BIM & Digital Twin') scopeMult = 0.25;

let specMult = 1.0;           // Basic
if (spec === 2) specMult = 1.35;
if (spec === 3) specMult = 1.85;

totalEst = area * baseRate * scopeMult * specMult;
timelineWeeks = Math.round(12 + (area / 45) * (spec * 0.4));
```

**Animated counter** (Lines 143-154): `setInterval` at 25ms stepping toward target number.

**Bar chart** (Lines 156-163): 12 bars with CSS transition heights, fill count based on spec × scope multiplier.

## PDF Proposal Generation — `downloadProposal()` (Lines 212-486)

Generates a complete A4-ready HTML document with:

1. **Header**: Brand logo, office address, contact
2. **Document ID**: Auto-generated `PN-YYYY-XXXX` reference
3. **Section 01 — Project Parameters**: Sector, scope, area, spec tier, energy target
4. **Section 02 — Budgetary Envelope**: Total estimate, unit cost, ±8.5% confidence
5. **Section 03 — Timeline**: 4 phases with week ranges
6. **Section 04 — Compliance**: NOK, Seismic, KENAK, ISO 19650 badges
7. **Signature**: Panagiotis Panteleos authorization block

**Export methods** (Lines 475-485):
```javascript
if (typeof html2pdf !== 'undefined') {
  html2pdf().set(opt).from(container.outerHTML).save();
} else {
  // Fallback: print window
  const printWin = window.open('', '_blank');
  printWin.document.write(html);
  printWin.print();
}
```

**Note**: `html2pdf.bundle.min.js` is loaded from CDN in index.html but the gauger module itself is separate. The download button triggers a 600ms generation animation before calling `downloadProposal()`.

## Language Export

`window.updateGaugerLanguage` updates spec tier labels and re-calculates if on Step 4.

---

*End of Cost Gauger Documentation*
