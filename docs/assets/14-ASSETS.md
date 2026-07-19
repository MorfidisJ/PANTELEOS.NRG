# PANTELEOS.NRG — Asset System Documentation

## Overview

The project uses a **convention-over-configuration** asset pipeline. No build tools, no manual image imports, no configuration files. Assets are auto-discovered by their folder and filename.

## Directory Structure

```
assets/
├── logo.png              → Nav bar + footer brand logo (favicon fallback)
├── favicon.png           → Favicon + apple-touch-icon
├── og-preview.png        → Open Graph / Twitter Card social preview (1200×630)
├── team-hero.jpg         → Hero section team photograph
│
├── portfolio/            → Auto-discovered project images
│   ├── PN-2024-1187/
│   │   ├── main.jpg      → Aesthetic card image + modal slide 1
│   │   ├── tech.jpg      → Technical card image + modal slide 2
│   │   ├── 1.jpg         → Gallery slide 3 (convention-discovered)
│   │   ├── 2.jpg         → Gallery slide 4
│   │   ├── ...           → Up to 8.jpg (gallery slide 10)
│   ├── PN-2024-0932/
│   ├── PN-2025-0104/
│   ├── PN-2023-0811/
│   ├── PN-2024-0455/
│   └── PN-2024-0780/
│
└── team/                 → Auto-discovered team portraits
    ├── panteleos/
    │   └── portrait.jpg  → Team card + modal badge
    ├── vamvakas/
    ├── stavrou/
    ├── kazantzis/
    ├── papadopoulou/
    └── makris/
```

## Image Convention Rules

### Portfolio Images

| File Pattern | Resolution | Used In |
|-------------|-----------|---------|
| `assets/portfolio/{id}/main.jpg` | 800×600 (recommended) | `.aesthetic` container in card, modal slide 1 |
| `assets/portfolio/{id}/tech.jpg` | 800×600 (recommended) | `.technical` container in card, modal slide 2 |
| `assets/portfolio/{id}/{1-8}.jpg` | 1200×800 (recommended) | Modal gallery slides 3-10 |

**Auto-discovery in portfolio.js:462-479:**
```javascript
for (let i = 1; i <= 8; i++) {
  const candidateUrl = `assets/portfolio/${projId}/${i}.jpg`;
  const img = new Image();
  img.onload = () => { /* push to gallery slides */ };
  img.src = candidateUrl;
}
```

### Team Portraits

| File Pattern | Resolution | Used In |
|-------------|-----------|---------|
| `assets/team/{id}/portrait.jpg` | 400×400 (recommended) | `.team-portrait` in card, modal badge |

**Fallback** (team-data.js:183-187):
```html
<img src="assets/team/${id}/portrait.jpg" onerror="this.remove()">
<span>${member.initials}</span>  <!-- Shows if image fails -->
```

### Fallback SVG Synthesis

When images are missing, `portfolio.js:529-575` generates inline SVGs:

- **Aesthetic SVG**: Abstract architectural polygon shapes in brand colors (#F8F9FA background)
- **Technical SVG**: Dark grid pattern with wireframe paths, LOD annotations, elevation labels

## Adding a New Project

1. Create folder `assets/portfolio/PN-2026-XXXX/`
2. Drop `main.jpg` and `tech.jpg` (required for card display)
3. Optionally add `1.jpg` through `8.jpg` for expanded gallery
4. **Zero configuration** — add project data entry only

## Adding a New Team Member

1. Create folder `assets/team/{member-id}/`
2. Drop `portrait.jpg`
3. **Zero configuration** — add team data entry only

## Image Optimization Notes

- **No automatic optimization** — images served as-is. Manual optimization recommended:
  - Convert to WebP/AVIF for modern browsers with `<picture>` element
  - Compress JPGs to ~80% quality
  - Resize to exact display dimensions
- Hero image (`team-hero.jpg`) loaded with `loading="eager"` (LCP optimization)
- All other images use `loading="lazy"`

---

*End of Asset System Documentation*
