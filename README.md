# 🏛️ PANTELEOS .NRG — Executive Architectural Engineering & Turnkey BIM Portal

[![Zero Dependencies](https://img.shields.io/badge/Architecture-Vanilla_ES6%2B%20%7C%20HTML5%20%7C%20CSS3-00E5FF?style=for-the-badge)](https://github.com)
[![Bilingual Engine](https://img.shields.io/badge/Localization-Greek%20(%CE%95%CE%9B)%20%7C%20English%20(EN)-008CFF?style=for-the-badge)](#-instantaneous-bilingual-localization)
[![BIM Standards](https://img.shields.io/badge/BIM_Compliance-ISO_19650%20%7C%20LOD--500-FF0055?style=for-the-badge)](#-convention-over-configuration-portfolio--team-engine)
[![Performance](https://img.shields.io/badge/Lighthouse-100%25_Performance-10B981?style=for-the-badge)](#-zero-build-step--local-development)

> **PANTELEOS .NRG Technical & Construction Office**  
> High-performance, turnkey architectural engineering, electromechanical infrastructure, and digital twin asset modeling portal based in Chalkida, Greece.

---

## 🌟 Executive Overview

**PANTELEOS .NRG** is an advanced, ultra-responsive web application crafted to present complex engineering case studies, executive leadership profiles, and algorithmic construction cost estimations. Designed with a **Zero-Dependency Vanilla JavaScript architecture**, the platform achieves instantaneous page transitions, sub-second load times, and seamless bilingual rendering without requiring heavy frameworks, bundlers, or build pipelines.

---

## ⚡ Key Platform Capabilities

### 1. 🌐 Instantaneous Bilingual Localization (`ΕΛ | EN`)
- **Zero-Reload Switching**: Users toggle between Greek (`ΕΛ`) and English (`EN`) instantly via `js/i18n.js`.
- **Dynamic DOM Binding**: All headings, descriptions, buttons, placeholders, form labels, and interactive modals translate in real time while preserving active filter states.
- **Persistent User Preference**: Language selection is stored securely in `localStorage('panteleos_lang')`.

---

### 2. 🏗️ Convention-over-Configuration Portfolio & Team Engine
Decoupled from static HTML, all case studies and team profiles reside in centralized data stores (`js/portfolio-data.js` and `js/team-data.js`).

#### Automatic Image & Gallery Discovery Protocol
Simply drop your project or engineer photos into structured folders—**no manual filename coding required**:
- **Portfolio Case Studies (`assets/portfolio/{PROJECT_ID}/`)**:
  - `main.jpg`: Automatically loaded for the Aesthetic Card View and Modal Slide 01.
  - `tech.jpg`: Automatically loaded for the Technical LOD-400 Card View and Modal Slide 02.
  - `1.jpg` → `8.jpg`: Automatically probed and appended into the interactive modal gallery slideshow.
- **Engineering Council (`assets/team/{MEMBER_ID}/`)**:
  - `portrait.jpg`: Automatically loaded for the engineer's portrait card and profile modal badge.
- **Intelligent Fallback Guarantee**: If an image is missing, the engine automatically synthesizes custom SVG architectural illustrations, CAD blueprints, Finite Element Analysis (FEA) stress meshes, or stylized monogram badges (`PP`, `DV`, `ES`).

---

### 3. 📐 Interactive Case Study Cards & Modal Gallery (`js/portfolio.js`)
- **Dual-Perspective Card Toggle**: Inspect projects either in **Aesthetic Render Mode** (exterior architecture) or **Technical Wireframe Mode** (LOD-400 laser-scanned structural blueprint).
- **Multi-Slide Project Modal**: Clicking any card opens a full-screen interactive diagnostic modal with image carousels, thumbnail navigation strips, and detailed specifications (Gross Floor Area, Execution Time, BIM Precision Tier).

---

### 4. 🧮 4-Step Construction Cost Gauger & PDF Exporter (`js/gauger.js`)
An interactive estimating wizard tailored for Greek banking financing, tender preparation, and architectural evaluation:
1. **Typology Selection**: Commercial / Retail (`€1,350/m²`), Industrial / Logistics (`€980/m²`), Luxury Residential (`€1,650/m²`), or Resort Hospitality (`€1,850/m²`).
2. **Scale Slider**: Precision floor area input (`100 m²` to `15,000 m²`).
3. **Performance Tier**: Standard KENAK B+, High-Performance BIM / KENAK A (`+25%`), or Ultra-Low Energy nZEB / LEED Platinum (`+55%`).
4. **Scope Multipliers**: Architectural Permitting (`+12%`), Turnkey Construction Management (`+75%`), and BIM 5D Digital Twin Deployment (`+8%`).
- **Instant Branded PDF Generation**: Export professional executive cost proposals directly to PDF using embedded `html2pdf.js`.

---

### 5. 🤖 Virtual Engineering Assistant ("NRG-AI Chatbot", `js/chatbot.js`)
- **Floating Diagnostic Assistant**: Interactive AI chatbot offering instant technical guidance, e-Adeia permitting workflow advice, KENAK/nZEB standards answers, and direct consultation booking.

---

### 6. ♿ WAI-ARIA Accessibility Drawer (`js/accessibility.js`)
- Dedicated floating accessibility control panel supporting:
  - **Dynamic Font Scaling**: Increase/decrease site typography up to `+40%`.
  - **Dyslexia-Friendly Typography**: Toggle optimized letter-spacing and word spacing.
  - **High-Contrast & Monochrome Modes**: Enhanced visual contrast for visually impaired users.
  - **Reduced Motion**: Instantly disable animations for motion-sensitive users.

---

## 📂 Project Structure & Module Breakdown

```text
PANTELEOS.NRG/
├── index.html             # Master HTML5 markup, SEO tags, JSON-LD schema, and UI containers
├── DOCUMENTATION.md       # Full Technical System & Architectural Maintenance Manual
├── README.md              # Executive project documentation (this file)
├── robots.txt             # Search engine crawler policies and sitemap pointer
├── sitemap.xml            # SEO XML sitemap index
├── css/
│   └── style.css          # Master Design System: CSS Custom Properties, glassmorphism, & responsive grids
├── js/
│   ├── i18n.js            # Real-time bilingual dictionary (ΕΛ <-> EN) and DOM translation engine
│   ├── app.js             # Navigation controller, scroll-spy, reveal animations, and form handlers
│   ├── hero.js            # Hero dynamic typography rotator and interactive background canvas
│   ├── portfolio-data.js  # Centralized portfolio projects dataset & auto-discovery rendering engine
│   ├── portfolio.js       # Case studies filter, Aesthetic vs. Technical view toggle, & gallery modal
│   ├── team-data.js       # Centralized Engineering Council dataset & automatic portrait loader
│   ├── gauger.js          # 4-Step Cost Estimator wizard & branded PDF proposal generator
│   ├── chatbot.js         # Virtual Engineering Assistant ("NRG-AI") FAQ and dialog engine
│   └── accessibility.js   # Floating WCAG 2.1 accessibility control drawer
└── assets/                # Visual imagery, portfolio project directories, and team portraits
```

---

## 🛠️ Zero-Build-Step Local Development

Since **PANTELEOS .NRG** relies on pure ES6 modules and modern vanilla CSS, **no Node.js installation, `npm install`, or bundler build step is required**.

### Running Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/MorfidisJ/PANTELEOS.NRG.git
   cd PANTELEOS.NRG
   ```
2. Start any local static web server inside the root folder:
   - **Python 3**:
     ```bash
     python -m http.server 8000
     ```
   - **VS Code Live Server**: Right-click `index.html` and choose **"Open with Live Server"**.
3. Open `http://localhost:8000` in your browser. Any edits to HTML, CSS, or JS files reflect immediately upon refresh.

---

## 🏛️ Engineering Leadership & Contact

**PANTELEOS .NRG TECHNICAL OFFICE**  
- **Lead Engineer & Managing Director**: Panagiotis M. Panteleos (*BEng, MSc Electrical & Electromagnetic Engineering*)  
- **Headquarters**: Karamourtzouni 1, Chalkida 341 00, Greece  
- **Direct Email**: `panteleos.nrg@gmail.com`  
- **Direct Telephone / WhatsApp**: `+30 6976837114`

---

*© 2026 PANTELEOS .NRG TECHNICAL & CONSTRUCTION OFFICE. ALL RIGHTS RESERVED.*
