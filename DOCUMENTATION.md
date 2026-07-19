# 🏛️ PANTELEOS.NRG TECHNICAL OFFICE — SYSTEM & MAINTENANCE DOCUMENTATION

> **Version**: 3.0.0 (High-Performance Architecture, Modular Data Stores & Turnkey Engineering Engine)  
> **Target Audience**: Website Administrators, Frontend Developers, Content Managers, and Engineering Staff.

---

## 1. 🌟 EXECUTIVE SUMMARY & ARCHITECTURE OVERVIEW

The **PANTELEOS.NRG Technical Office** website is built as an ultra-high-performance, modern single-page web application (SPA) designed to showcase turnkey architectural engineering, BIM digital twin modeling (ISO 19650), and structural execution across Greece.

### ⚡ Core Technology Stack
- **Core Markup**: Pure HTML5 (`index.html`) utilizing semantic tags, WAI-ARIA accessibility attributes, and rich JSON-LD structured metadata (`ArchitecturalFirm` and `FAQPage` schemas).
- **Styling Engine**: Vanilla CSS3 (`css/style.css`) powered by centralized CSS Custom Properties (Design Tokens) for instant theming, responsive grid layouts, glassmorphism (`backdrop-filter`), and GPU-accelerated micro-animations. **No external heavy frameworks (like Tailwind or Bootstrap) are required**, guaranteeing sub-second load times.
- **Logic & Interactivity**: Vanilla JavaScript (ES6+ modular script architecture) distributed across purpose-specific modules. **No npm build steps, Webpack, or bundlers are required** to deploy or edit the site; editing any `.js` or `.html` file updates the live site instantly.

### 📂 File Structure Overview
```text
c:\Users\user\Pictures\maro\
├── index.html             # Master HTML structure, SEO tags, structured JSON-LD schema, and all UI sections
├── robots.txt             # Search engine crawler instructions and sitemap definitions
├── DOCUMENTATION.md       # This comprehensive system, maintenance, and future expansion guide
├── css/
│   └── style.css          # Master stylesheet: CSS variables, dark/neon theme tokens, grids, modal & gallery styling
├── js/
│   ├── i18n.js            # Real-time bilingual translation engine (Greek ΕΛ <-> English EN) & DOM mappings
│   ├── portfolio-data.js  # Modular Case Studies data store (`PORTFOLIO_PROJECTS`), stats (`PORTFOLIO_STATS`), & auto mock removal
│   ├── team-data.js       # Engineering team directory store (`TEAM_MEMBERS`) & auto mock removal mechanism
│   ├── app.js             # Core navigation, scroll spy, reveal-on-scroll animations, and form submission handlers
│   ├── hero.js            # Hero section animations, typography rotator, and interactive background canvas
│   ├── gauger.js          # 4-Step Cost Calculator wizard, Greek estimation formulas, and PDF proposal exporter
│   ├── portfolio.js       # Case studies filter, exact token matching, view toggle, gallery modal, & stats animation
│   ├── chatbot.js         # Virtual Engineering Assistant ("NRG-AI") interactive FAQ & portal query engine
│   └── careers.js         # Career recruitment opportunities and applicant submission handler
└── assets/                # Visual media, social share previews (og-image.png), and site icon (favicon.png)
```

---

## 2. 📝 CONTENT MAINTENANCE & HOW TO CHANGE DATA

This section explains how to modify everyday content, pricing rules, team members, and project portfolios without risking system stability.

### A. How to Update General Website Text & Bilingual Translations (`js/i18n.js`)
The website features instantaneous, reload-free bilingual switching between Greek (`ΕΛ`) and English (`EN`), with user preference persisted in browser `localStorage`.

1. **Locating Translations**: Open `js/i18n.js`. You will find two master dictionary objects:
   - `TRANSLATIONS.el`: Contains all Greek text strings.
   - `TRANSLATIONS.en`: Contains all English text strings.
2. **Editing Existing Text**: Search for the text you wish to change (for example, `"hero.h1": "...""`). Modify the string inside the quotes for both `el` and `en`. Save the file, and the changes are live immediately.
3. **Adding New Translatable Elements**:
   - In `index.html`, give your HTML element a unique ID or class (e.g., `<h3 id="my-new-header">Τίτλος</h3>`).
   - In `js/i18n.js`, scroll to the `DOM_MAPPINGS` array and add an entry:
     ```javascript
     { selector: '#my-new-header', key: 'custom.header_key' },
     ```
   - Add `"custom.header_key": "Your Greek Text"` to `TRANSLATIONS.el` and `"custom.header_key": "Your English Text"` to `TRANSLATIONS.en`.

---

### B. How to Add, Edit, or Remove Case Studies (`js/portfolio-data.js` & `js/portfolio.js`)
All projects displayed in the **Case Studies & Portfolio** section (`#portfolio-grid`) are modular JavaScript objects managed cleanly inside the `PORTFOLIO_PROJECTS` array in `js/portfolio-data.js`.

#### 1. Automatic Mock Removal (`isMock: true`)
The website ships pre-populated with 6 showcase case studies (`PN-2024-1187`, `PN-2024-0932`, etc.) marked with `isMock: true`.
- **How Auto-Removal Works**: The helper function `getActivePortfolioProjects()` checks if at least one real project exists (i.e. an object without `isMock: true`).
- **Seamless Transition**: The moment you insert your first real project object into `PORTFOLIO_PROJECTS`, all 6 mock projects vanish automatically from both the visual project grid and the statistical counters (`completedProjects` & `totalAreaSqM`). If you ever remove all your real projects, the system gracefully reverts to displaying the 6 showcase projects so the page is never empty.

#### 2. Adding a Real Project Object
To add your real project, open `js/portfolio-data.js` and paste a new object at the top of `PORTFOLIO_PROJECTS`:
```javascript
const PORTFOLIO_PROJECTS = [
  // 1. YOUR REAL PROJECT (No isMock tag needed):
  {
    id: "PN-2026-0891",
    cat: "commercial bim",
    tagEn: "COMMERCIAL / BIM",
    tagEl: "ΕΜΠΟΡΙΚΟ / BIM",
    titleEn: "Hellinikon Executive Tower",
    titleEl: "Πύργος Γραφείων Ελληνικού",
    team: "PANAGIOTIS M. PANTELEOS",
    leadEn: "Lead Engineer: Panagiotis M. Panteleos",
    leadEl: "Επικεφαλής Μηχανικός: Παναγιώτης Μιχ. Παντελαίος",
    area: "12,500 m²",
    dur: "18 Months",
    durEl: "18 Μήνες",
    lod: "LOD-400",
    descEn: "Complete structural engineering and BIM 5D cost coordination for an executive office complex.",
    descEl: "Πλήρης στατική και Η/Μ μελέτη με συντονισμό BIM 5D για συγκρότημα διοικητικών γραφείων.",
    artworkType: 0,
    photos: ["assets/portfolio/PN-2026-0891/1.jpg", "assets/portfolio/PN-2026-0891/2.jpg"]
  },
  // 2. Existing mock projects below (will now automatically hide!)
  {
    id: "PN-2024-1187",
    isMock: true,
    // ...
```

#### 3. Property Reference Table:
| Property | Description | Example Values |
| :--- | :--- | :--- |
| `id` | Unique project reference identifier. | `"PN-2026-0891"`, `"PN-2024-1187"` |
| `isMock` | If `true`, this project is automatically removed when real projects are added. | `true`, or omit for real projects |
| `cat` | Space-separated filter category tokens (exact word match). | `"commercial bim"`, `"industrial"`, `"residential"` |
| `team` | Lead Engineer name (used for team member cross-filtering). | `"PANAGIOTIS M. PANTELEOS"`, `"ELENI STAVROU"` |
| `area` | Gross floor area or engineered footprint (used in `totalAreaSqM` stats sum). | `"6,400 m²"`, `"18,000 m²"` |
| `dur` / `durEl` | Execution timeline in English (`dur`) and Greek (`durEl`). | `"14 Months"` / `"14 Μήνες"` |
| `lod` | Level of Development precision tier displayed on technical views. | `"LOD-350"`, `"LOD-400"`, `"LOD-500"` |
| `descEn` / `descEl` | Bilingual engineering descriptions shown inside the modal dialog. | Text summaries of works performed. |
| `photos` | Array of exact photo file paths or comma-separated string of images. | `["assets/photo1.jpg"]` |

#### 4. Technical View Badge & Convention-over-Configuration Gallery
- **LOD-400 CAD Hint Badge**: Each rendered card features a `.tech-hint-badge` (`LOD-400 CAD`) in the top-right corner. When the `TECHNICAL LOD-400` view toggle (`#view-tech`) is activated, this badge shifts from dark charcoal to neon cyan (`.portfolio-grid.tech-view .tech-hint-badge`), signaling active CAD inspection.
- **Automatic Photo & Blueprint Discovery**: When opening any project modal, the engine automatically scans `assets/portfolio/{id}/1.jpg` through `8.jpg`. Any discovered photos are appended to the interactive modal carousel alongside technical blueprints. If no images are found, the engine synthesizes a **4-Slide Hybrid Architecture & Engineering Gallery**.

---

### C. How to Adjust Greek Market Construction Pricing & Estimation Formulas (`js/gauger.js`)
The **4-Step Cost Gauger Wizard** calculates preliminary project budgets formatted for Greek banking financing, tender preparation, and architectural evaluation.

#### 1. Pricing Rules & Formulas
Open `js/gauger.js` and locate the `calculateFinal()` function. The estimation algorithm operates on three core variables:
- **Base Cost per Square Meter (`baseRate`)**:
  - `commercial` (Commercial / Retail): **€1,350 / m²**
  - `industrial` (Industrial / Logistics): **€980 / m²**
  - `residential` (Luxury Residential): **€1,650 / m²**
  - `hospitality` (Resort / Hotel): **€1,850 / m²**
- **Specification Tier Multiplier (`specMult`)**:
  - `1` (Standard Commercial / KENAK B+ Energy Class): `1.00x`
  - `2` (High-Performance BIM + MEP Automation / KENAK A): `1.25x`
  - `3` (Ultra-Low Energy nZEB / LEED Platinum Certification): `1.55x`
- **Scope Multipliers (`scopeMult`)**:
  - *Engineering Design & Permitting*: Adds `+12%` (`0.12`)
  - *Turnkey Construction Management*: Adds `+75%` (`0.75`)
  - *BIM 5D Digital Twin Deployment*: Adds `+8%` (`0.08`)
  - *Total Multiplier*: `1.0 + sum(selected scopes)`

#### 2. How to Update Market Rates for Inflation
If construction material or labor costs shift in the Greek market, simply modify the numeric values inside `calculateFinal()` in `js/gauger.js`:
```javascript
let baseRate = 1350; // Change to new commercial base rate (e.g., 1420)
if (sector === 'industrial') baseRate = 980;   // Change industrial rate
if (sector === 'residential') baseRate = 1650; // Change residential rate
if (sector === 'hospitality') baseRate = 1850; // Change hospitality rate
```
The wizard will automatically recalculate preliminary budgets, monthly expenditure breakdowns, and generate updated PDF proposals (`html2pdf.js`) with the new figures.

---

### D. How to Update Team Council Members (`js/team-data.js` & `js/i18n.js`)
Leadership council profiles are managed cleanly inside the `TEAM_MEMBERS` array in `js/team-data.js`.

1. **Automatic Mock Co-Engineer Removal (`isMock: true`)**: The founder profile (`id: "panteleos"`) is real (`isMock` not set). The 5 showcase co-engineers (`vamvakas`, `stavrou`, `kazantzis`, `papadopoulou`, `makris`) are tagged with `isMock: true`. When you add real co-engineers alongside the founder (or when more than one real engineer exists), `getActiveTeamMembers()` automatically removes the mock co-engineers from the `#team-grid`.
2. **Editing or Adding Profiles**: Locate or insert member objects in `TEAM_MEMBERS`. You can specify bilingual names (`nameEn` / `nameEl`), roles (`roleEn` / `roleEl`), technical specialties (`specsEn` / `specsEl`), and registration IDs (`regEn` / `regEl`).
3. **Cross-Filtering Behavior**: Notice the `key` property (`key: "PANAGIOTIS M. PANTELEOS"`). When a user clicks **"FILTER PROJECTS BY ENGINEER"** (`.cta`), `initTeamCrossFilter()` in `js/portfolio.js` reads this key, smoothly scrolls to the Case Studies section, activates the category filter, and highlights every project directed by that specific engineer.

---

### E. How to Update the Dynamic Execution Stats Counter (`js/portfolio-data.js` & `js/portfolio.js`)
The glowing statistical metrics banner (`#portfolio-counter-banner`) located right above the portfolio filter chips draws its data dynamically from the centralized `PORTFOLIO_STATS` store in `js/portfolio-data.js`.

#### 1. Centralized Statistics Configuration (`PORTFOLIO_STATS`)
Open `js/portfolio-data.js` and locate the `PORTFOLIO_STATS` object around line 135:
```javascript
const PORTFOLIO_STATS = {
  baselineProjects: 328,       // Pre-featured historical baseline projects
  baselineAreaSqM: 1202100,    // Pre-featured historical baseline area (m²)
  complianceRate: 100,         // % ISO 19650 & Eurocode compliance
  activeSites: 28,             // Active construction sites
  fraction: [2, 3],            // Fractional execution indicator (2/3)

  // Computed metrics drawing directly from active portfolio projects
  get completedProjects() {
    return this.baselineProjects + getActivePortfolioProjects().length;
  },
  get totalAreaSqM() {
    const active = getActivePortfolioProjects();
    const featuredArea = active.reduce((sum, p) => {
      const num = parseInt((p.area || '0').replace(/[^0-9]/g, ''), 10) || 0;
      return sum + num;
    }, 0);
    return this.baselineAreaSqM + featuredArea;
  }
};
```
- **How Metrics Update**: `completedProjects` and `totalAreaSqM` automatically combine your historical baseline (`328` projects, `1,202,100 m²`) with your active projects (`getActivePortfolioProjects()`). When you add real case studies to `PORTFOLIO_PROJECTS`, these numbers adjust instantly!
- **Changing Baseline or Fixed Metrics**: If your baseline historical record expands, or if you want to update `activeSites` / `complianceRate`, simply change the numbers right inside `PORTFOLIO_STATS`.

#### 2. Animation & Locale-Aware Number Formatting
- **Intersection Animation**: When the banner scrolls into view, `initPortfolioStats()` in `js/portfolio.js` uses an `IntersectionObserver` to trigger a `requestAnimationFrame` counter powered by an `easeOutExpo` deceleration curve over 2,400ms.
- **Dynamic Locale Synchronization**: Numbers format automatically using `el-GR` (`1.250.000 m²`) when in Greek and `en-US` (`1,250,000 m²`) when in English. If the user toggles languages via the desktop navigation or the `#mobile-dock-lang` switcher, `updatePortfolioStatsBanner(lang)` immediately updates all numbers to match the active locale without refreshing the page.

---

## 3. 🛠️ FUTURE ADD-ONS & ARCHITECTURAL EXPANSION GUIDE

The codebase is structured defensively to support seamless future integrations without refactoring core rendering engines. Below are blueprints for recommended expansions.

### A. Connecting Contact Form & PDF Briefs to Live Backend Email Delivery
Currently, the contact form (`#contact-form`) and project brief submission in `js/app.js` simulate server communication using asynchronous timeouts to provide instant UI verification without requiring a live server during static hosting.

#### How to implement real SMTP / API email dispatch:
1. Choose a serverless email provider (e.g., **EmailJS**, **Formspree**, **SendGrid**, or an AWS Lambda / Node.js endpoint).
2. Open `js/app.js` and locate the `contactForm.addEventListener('submit', ...)` block around line 85.
3. Replace the simulation code with a standard REST API fetch call:
   ```javascript
   contactForm.addEventListener('submit', async (e) => {
     e.preventDefault();
     const submitBtn = contactForm.querySelector('button[type="submit"]');
     submitBtn.disabled = true;
     submitBtn.innerHTML = '<span>TRANSMITTING TO ENGINEERING COUNCIL...</span>';

     const payload = {
       name: document.getElementById('c-name').value,
       email: document.getElementById('c-email').value,
       phone: document.getElementById('c-tel').value,
       specs: document.getElementById('c-msg').value,
       role: document.getElementById('c-role').value
     };

     try {
       const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
           service_id: 'YOUR_SERVICE_ID',
           template_id: 'YOUR_TEMPLATE_ID',
           user_id: 'YOUR_PUBLIC_KEY',
           template_params: payload
         })
       });

       if (response.ok) {
         showModal('TRANSMISSION SUCCESSFUL', 'Your project brief has been securely logged with our technical director.');
         contactForm.reset();
       } else {
         throw new Error('Network dispatch rejected.');
       }
     } catch (err) {
       alert('Transmission error. Please contact us directly via telephone or email.');
     } finally {
       submitBtn.disabled = false;
       submitBtn.innerHTML = '<span>SUBMIT PROJECT BRIEF</span>';
     }
   });
   ```

---

### B. Integrating Live Project Tracker Database & Client Login (`js/chatbot.js` / Portal)
The Virtual Assistant & Client Portal currently allows clients to enter unique Project IDs (e.g., `PN-2024-1187`) to query simulated on-site execution phases, SCADA telemetry logs, and inspection pass/fail timestamps.

#### How to connect to a live database (Supabase / PostgreSQL / Firebase):
1. Create a database table named `project_telemetry` with columns: `project_id` (primary key), `client_name`, `status_tier`, `qc_score`, `current_phase`, and `inspection_logs` (JSON array).
2. In `js/chatbot.js`, locate the `handlePortalSearch(query)` function.
3. Replace the static lookup table with an authenticated database query:
   ```javascript
   async function handlePortalSearch(projectId) {
     const cleanId = projectId.trim().toUpperCase();
     
     // Example using Supabase client
     const { data, error } = await supabase
       .from('project_telemetry')
       .select('*')
       .eq('project_id', cleanId)
       .single();

     if (error || !data) {
       renderChatReply('NRG-AI SYSTEM', `Project ID [${cleanId}] not found in active worksite registry.`);
       return;
     }

     renderChatReply('LIVE TELEMETRY FEED', `
       **PROJECT**: ${data.client_name} (${data.project_id})  
       **PHASE**: ${data.current_phase}  
       **QC COMPLIANCE**: ${data.qc_score}% PASSED  
       **RECENT LOG**: ${data.inspection_logs[0].timestamp} - ${data.inspection_logs[0].note}
     `);
   }
   ```

---

### C. Adding New Language Translations (e.g., German `de` or French `fr`)
Because of the decoupled architecture of `js/i18n.js`, adding a third language requires zero changes to the underlying translation engine logic:
1. In `js/i18n.js`, add a new language dictionary alongside `el` and `en`:
   ```javascript
   const TRANSLATIONS = {
     el: { ... },
     en: { ... },
     de: {
       "nav.home": "ΑRCHITEKTUR",
       "nav.services": "LEISTUNGEN",
       "nav.gauger": "KOSTENRECHNER",
       "hero.h1": "ARCHITEKTUR & BIM INGENIEURWESEN"
       // Add matching keys...
     }
   };
   ```
2. In `index.html`, add a German toggle button inside `<div class="lang-switch">`:
   ```html
   <button data-lang="el" class="active">ΕΛ</button>
   <button data-lang="en">EN</button>
   <button data-lang="de">DE</button>
   ```
3. The existing click listeners in `initLanguage()` will automatically detect clicking `DE`, store `'de'` in `localStorage`, and execute `setLanguage('de')` across the entire website instantly!

---

### D. Integrating 3D WebGL / Three.js Interactive BIM Model Viewer
To elevate the "Technical LOD-400" visual experience, you can replace the 2D CAD SVG wireframes in the modal gallery with a live interactive 3D WebGL viewport using **Three.js** or **Autodesk Forge Viewer**.

#### Implementation Blueprint:
1. Include the Three.js library in `index.html`:
   ```html
   <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
   <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>
   ```
2. In `js/portfolio.js`, inside `renderGallerySlide(idx)`, check if the active slide has a `gltf: "models/project.gltf"` property:
   ```javascript
   if (slide.gltf) {
     stage.innerHTML = '<div id="webgl-viewport" style="width:100%; height:100%;"></div>';
     
     const container = document.getElementById('webgl-viewport');
     const scene = new THREE.Scene();
     const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
     
     renderer.setSize(container.clientWidth, container.clientHeight);
     container.appendChild(renderer.domElement);
     
     const light = new THREE.DirectionalLight(0x00e5ff, 2);
     light.position.set(10, 20, 15);
     scene.add(light);
     scene.add(new THREE.AmbientLight(0xffffff, 0.6));

     const loader = new THREE.GLTFLoader();
     loader.load(slide.gltf, (gltf) => {
       scene.add(gltf.scene);
       camera.position.set(0, 5, 15);
       
       function animate() {
         requestAnimationFrame(animate);
         gltf.scene.rotation.y += 0.005; // Slow architectural orbit
         renderer.render(scene, camera);
       }
       animate();
     });
   }
   ```
This will render a live, orbiting 3D BIM structural steel or clean-room ventilation model directly inside the user's browser when they click on the technical blueprint tab in the gallery!

---

## 4. 🧯 TROUBLESHOOTING & COMMON SOLUTIONS

- **Problem: Text appears in English even after clicking Greek (or vice-versa).**
  - *Solution*: Open your browser Developer Tools (F12) -> Console. Check if any translation key is misspelled in `js/i18n.js`. Verify that your selector in `DOM_MAPPINGS` correctly matches the HTML ID or class.
- **Problem: The Cost Gauger PDF proposal download button does nothing.**
  - *Solution*: Ensure that the external script `html2pdf.bundle.min.js` in line 1033 of `index.html` is accessible and not blocked by an ad-blocker or strict Content Security Policy (CSP).
- **Problem: Project cards are hidden after clicking a Team member.**
  - *Solution*: This is the intended cross-filtering behavior! To reveal all project cards again, simply click the **"ALL PROJECTS" / "ΟΛΑ ΤΑ ΕΡΓΑ"** filter chip at the top of the Case Studies section.
- **Problem: A modal close button (`X`) is blocked or hard to click.**
  - *Solution*: Ensure `#modal-close` in `css/style.css` maintains `z-index: 100;` and that overlapping overlays inside `.modal-visual` use `pointer-events: none;` on gradient wrappers.

---
*End of Technical System Documentation — PANTELEOS.NRG Technical Office © 2026*
