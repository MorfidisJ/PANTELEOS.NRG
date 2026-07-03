# 🏛️ PANTELEOS.NRG TECHNICAL OFFICE — SYSTEM & MAINTENANCE DOCUMENTATION

> **Version**: 2.0.0 (High-Performance Architecture & Turnkey Engineering Engine)  
> **Target Audience**: Website Administrators, Frontend Developers, Content Managers, and Engineering Staff.

---

## 1. 🌟 EXECUTIVE SUMMARY & ARCHITECTURE OVERVIEW

The **PANTELEOS.NRG Technical Office** website is built as an ultra-high-performance, modern single-page web application (SPA) designed to showcase turnkey architectural engineering, BIM digital twin modeling (ISO 19650), and structural execution across Greece.

### ⚡ Core Technology Stack
- **Core Markup**: Pure HTML5 (`index.html`) utilizing semantic tags, WAI-ARIA accessibility attributes, and schema-compliant structured metadata.
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
│   ├── app.js             # Core navigation, scroll spy, reveal-on-scroll animations, and form submission handlers
│   ├── hero.js            # Hero section animations, typography rotator, and interactive background canvas
│   ├── gauger.js          # 4-Step Cost Calculator wizard, Greek estimation formulas, and PDF proposal exporter
│   ├── portfolio.js       # Case studies filter, Aesthetic vs. LOD-400 Technical view toggle, gallery modal, & stats
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

### B. How to Add, Edit, or Remove Case Studies (`index.html` & `js/portfolio.js`)
All projects displayed in the **Case Studies & Portfolio** section are modular `<article>` elements inside `<section id="portfolio">` in `index.html`.

#### 1. Card Structure & Data Attributes
To add a new project card, duplicate an existing `<article class="p-card reveal">` block and update its custom HTML5 data attributes:
```html
<article class="p-card reveal" 
  data-cat="commercial bim" 
  data-team="DR. ALEXANDROS PANTELEOS" 
  data-area="12,500 m²" 
  data-dur="18 Months" 
  data-lod="LOD-400" 
  data-desc="Complete structural engineering and BIM 5D cost coordination for an executive office complex."
  data-photos="assets/project-photo-1.jpg, assets/project-photo-2.jpg, assets/project-photo-3.jpg">
  
  <div class="p-visual">
    <div class="aesthetic"><!-- Custom SVG or Image --></div>
    <div class="technical"><!-- Laser-scanned CAD wireframe SVG --></div>
  </div>
  <div class="p-info">
    <div class="tagrow"><span>PN-2026-0891</span><span>COMMERCIAL / BIM</span></div>
    <h4>Hellinikon Executive Tower</h4>
    <p>Lead Engineer: Dr. Alexandros Panteleos</p>
  </div>
</article>
```

#### 2. Attribute Reference Table:
| Attribute | Description | Example Values |
| :--- | :--- | :--- |
| `data-cat` | Space-separated filter categories. Controls filter buttons. | `commercial`, `industrial`, `residential`, `bim` |
| `data-team` | Lead Engineer name (must match engineer card for cross-filtering). | `DR. ALEXANDROS PANTELEOS`, `ELENI STAVROU` |
| `data-area` | Gross floor area displayed in specifications. | `6,400 m²`, `18,000 m²` |
| `data-dur` | Execution or construction timeline. | `14 Months`, `24 Months` |
| `data-lod` | Level of Development (BIM precision tier). | `LOD-350`, `LOD-400`, `LOD-500` |
| `data-desc` | Detailed engineering description shown in modal dialog. | Text summary of works performed. |
| `data-photos` | **(NEW)** Comma-separated paths to real photograph files. | `assets/photo1.jpg, assets/photo2.jpg` |

#### 3. How the Multi-Photo Gallery Mode Works
When a user clicks any project card, `initPortfolioModal()` in `js/portfolio.js` launches an interactive slideshow inside the modal dialog:
- **With Real Photos (`data-photos`)**: If the `data-photos` attribute is present on the card, the gallery engine automatically parses the image URLs and builds a interactive carousel with previous/next arrows (`#gallery-prev` / `#gallery-next`), slide indicator dots (`#gallery-thumbs`), keyboard navigation (`ArrowLeft` / `ArrowRight`), and slide counter badges (`01 // 03`).
- **Hybrid Default Mode (No Photos Required)**: If `data-photos` is omitted, the system automatically synthesizes a **4-Slide Hybrid Architecture & Engineering Gallery** consisting of:
  1. *Slide 01*: The card's aesthetic architectural exterior rendering.
  2. *Slide 02*: The card's laser-scanned LOD-400 technical blueprint wireframe.
  3. *Slide 03*: An auto-generated 3D Finite Element Analysis (FEA) seismic mesh simulation displaying Eurocode 8 stress nodes and MPa measurements.
  4. *Slide 04*: An on-site construction monitoring and IoT quality assurance telemetry blueprint.

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

### D. How to Update Team Council Members (`index.html` & `js/i18n.js`)
Leadership council profiles are defined in `index.html` under `<section id="team">`.

1. **Changing Personnel Information**: Locate the engineer's `<article class="team-card">`. You can modify their name, initials portrait, and technical specialties directly in the HTML.
2. **Updating Translatable Roles**: Update keys `team.role1` through `team.role6` in `js/i18n.js` to change their official titles in Greek and English.
3. **Cross-Filtering Behavior**: Notice the attribute `data-engineer="DR. ALEXANDROS PANTELEOS"` on each team card. When a user clicks **"FILTER PROJECTS BY ENGINEER"**, `initTeamCrossFilter()` in `js/portfolio.js` reads this attribute, smoothly scrolls the viewport to the Case Studies section, activates the category filter, and highlights every project directed by that specific engineer while hiding unrelated projects.

---

### E. How to Update the Dynamic Execution Stats Counter (`index.html` & `js/portfolio.js`)
The glowing statistical metrics banner located immediately above the portfolio filter chips showcases verified engineering track records (e.g., **`334 ⅔`** Total Projects Delivered).

1. **Changing Target Metrics**: Open `index.html` and locate `<div id="portfolio-counter-banner">`. Find the element with the `data-target` attribute:
   ```html
   <div class="stat-num" data-target="334">0</div>
   ```
   Change `"334"` to your newly achieved milestone (e.g., `"350"`).
2. **Animation Mechanics**: When the user scrolls the banner into view, `initPortfolioStats()` in `js/portfolio.js` uses an `IntersectionObserver` to trigger a high-precision `requestAnimationFrame` counter powered by an `easeOutExpo` deceleration curve. Numbers count up smoothly over 2,400 milliseconds and format automatically with localized thousands separators (e.g., `1,250,000`).

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
