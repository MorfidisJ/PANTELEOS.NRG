# PANTELEOS.NRG — Deployment Guide

## Overview

Zero-dependency static site — no build step, no bundler, no server-side runtime. Deployable to any static hosting provider. Currently deployed on **Vercel** at `https://panteleos-nrg.vercel.app/`.

## Deployment Requirements

| Requirement | Minimum |
|-------------|---------|
| Hosting | Any static file server |
| HTTPS | Required (for Google Maps iframe, geolocation APIs) |
| CSP Headers | Recommended (see security section) |
| Custom Domain | Configured via DNS A/AAAA or CNAME |

## Current Deployment (Vercel)

- **Platform**: Vercel (free tier)
- **URL**: `https://panteleos-nrg.vercel.app/`
- **Canonical**: `https://panteleos-nrg.vercel.app/` (index.html line 20)
- **Deployment method**: Git push → Vercel auto-deploys from main branch

### Vercel Configuration

No `vercel.json` required — zero-config deployment works because:
- `index.html` in root → detected as SPA
- No serverless functions needed
- All assets are static files
- Clean URLs handled via `rewrites` (optional, for deep linking)

**Recommended `vercel.json`:**
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

## Deployment Steps

### Option A: Vercel (Current)

1. Push repository to GitHub/GitLab
2. Import project in Vercel dashboard
3. Settings:
   - Framework Preset: **Other**
   - Build Command: (none)
   - Output Directory: `./`
4. Deploy

### Option B: Netlify

1. Connect Git repository
2. Settings:
   - Build Command: (none)
   - Publish Directory: `./`
3. Deploy

### Option C: GitHub Pages

1. Push to `main` branch
2. In repo Settings → Pages:
   - Source: Deploy from branch
   - Branch: `main`, folder: `/ (root)`
3. Custom domain via CNAME file or DNS

### Option D: Any Static Host

1. `rsync` or FTP the entire project directory (excluding `.git/`, `docs/`, `node_modules/`)
2. Point web server document root to project root

## Production Checklist

### Before Deploying

- [ ] Social preview image exists: `assets/og-preview.png` (1200×630px)
- [ ] Favicon exists: `assets/favicon.png`
- [ ] Team hero photo exists: `assets/team-hero.jpg`
- [ ] All portfolio `main.jpg` and `tech.jpg` exist (or SVG fallbacks acceptable)
- [ ] Google Fonts URLs are accessible from production domain
- [ ] Google Maps API key (if restrictions apply to domain)
- [ ] Contact form backend endpoint configured (if moved from simulated submit)
- [ ] `robots.txt` exists at root (if needed)

### SEO Verification

- [ ] Canonical URL points to production domain
- [ ] Schema.org JSON-LD validates (https://validator.schema.org)
- [ ] Open Graph preview renders on Facebook/LinkedIn debugger
- [ ] Twitter Card renders on card validator
- [ ] Google Search Console property verified

### Performance

- [ ] Test Lighthouse: target 100 Performance, 100 Accessibility, 100 SEO
- [ ] Verify LCP < 2.5s (hero image + font loading)
- [ ] Verify CLS < 0.1 (no layout shifts)
- [ ] Verify no render-blocking resources (CSS is single file, loaded in head)

## Content Security Policy

Recommended CSP headers for production:

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://cdnjs.cloudflare.com;
  style-src 'self' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  frame-src https://www.google.com;
  img-src 'self' data: https:;
  connect-src 'self';
  base-uri 'self';
  form-action 'self';
```

## Image Optimization Pipeline (Recommended)

For production, consider adding:

1. **Convert raster images** to WebP with JPEG fallback:
   ```html
   <picture>
     <source srcset="main.webp" type="image/webp">
     <img src="main.jpg" alt="...">
   </picture>
   ```
2. **Compress JPGs** to 80% quality (save ~40-60% file size)
3. **Resize team portraits** to exact display size (200×200)
4. **Resize gallery images** to max 1920px on longest edge

## Backend Integration Points

Current limitations for production readiness:

| Feature | Current | Production Target |
|---------|---------|-------------------|
| Contact form | Simulated submit | Email API (SendGrid, Resend) or Supabase |
| Protocol tracker | 3 hardcoded projects | Supabase/Firebase real-time query |
| Careers submit | Simulated upload | File storage (S3, Supabase) + email notification |
| PDF generation | Client-side html2pdf | Server-side (Puppeteer, pdfmake) |

## Monitoring

- **Vercel Analytics**: Enable in Vercel dashboard (zero-config)
- **Uptime**: Vercel Status (built-in)
- **Error tracking**: Vercel Logs or Sentio

---

*End of Deployment Guide*
