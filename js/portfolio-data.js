/**
 * PANTELEOS.NRG — Portfolio Projects Data Store
 * Centralized dataset for architectural & engineering case studies.
 * Supports bilingual rendering (Greek/English) and dynamic grid population.
 * 
 * AUTOMATIC IMAGE NAMING SCHEME (CONVENTION OVER CONFIGURATION):
 * Simply place your project photos inside a folder named after the project ID:
 *   assets/portfolio/{id}/
 * 
 * Standard automatic filenames inside assets/portfolio/{id}/ :
 * 1. main.jpg  -> Automatically loaded as the primary Aesthetic Card View & Modal Photo
 * 2. tech.jpg  -> Automatically loaded as the Technical LOD-400 Card View & Modal Photo
 * 
 * No manual configuration required! If an image file does not exist, the engine
 * automatically displays custom architectural & engineering SVG illustrations.
 */

const PORTFOLIO_PROJECTS = [
  {
    id: "PN-2024-1187",
    isMock: true,
    cat: "commercial bim",
    tagEn: "COMMERCIAL / BIM",
    tagEl: "ΕΜΠΟΡΙΚΟ / BIM",
    titleEn: "Thessaloniki Port Bio-Cluster",
    titleEl: "Βιο-Συγκρότημα Λιμένος Θεσσαλονίκης",
    team: "PANAGIOTIS M. PANTELEOS",
    leadEn: "Lead Engineer: Panagiotis M. Panteleos",
    leadEl: "Επικεφαλής Μηχανικός: Παναγιώτης Μιχ. Παντελαίος",
    area: "6,400 m²",
    dur: "24 Months",
    durEl: "24 Μήνες",
    lod: "LOD-400",
    descEn: "Complete architectural engineering and BIM coordination for a 6,400m² bio-cluster laboratory and executive office complex at Thessaloniki Port. Integrated advanced HVAC clean-room ventilation and seismic base-isolation foundations.",
    descEl: "Πλήρης αρχιτεκτονική και Η/Μ μελέτη με συντονισμό BIM για βιο-συγκρότημα εργαστηρίων και γραφείων 6.400m² στο Λιμάνι Θεσσαλονίκης. Ενσωματώθηκαν συστήματα καθαρού αέρα (clean-room HVAC) και αντισεισμική θεμελίωση βάσης.",
    artworkType: 0
  },
  {
    id: "PN-2024-0932",
    isMock: true,
    cat: "industrial",
    tagEn: "INDUSTRIAL / MEP",
    tagEl: "ΒΙΟΜΗΧΑΝΙΚΟ / ΗΜ",
    titleEn: "Attika High-Voltage Substation",
    titleEl: "Υποσταθμός Υψηλής Τάσης Αττικής",
    team: "DIMITRIS VAMVAKAS",
    leadEn: "Lead Engineer: Dimitris Vamvakas",
    leadEl: "Επικεφαλής Μηχανικός: Δημήτρης Βαμβακάς",
    area: "12,500 m²",
    dur: "16 Months",
    durEl: "16 Μήνες",
    lod: "LOD-350",
    descEn: "High-voltage substation and automated industrial distribution facility. Designed heavy reinforced concrete foundation slabs for 80-ton transformers and complete SCADA electrical automation networks.",
    descEl: "Υποσταθμός υψηλής τάσης και βιομηχανική εγκατάσταση διανομής. Σχεδιασμός βαρέων πλακών οπλισμένου σκυροδέματος για μετασχηματιστές 80 τόνων και δίκτυα αυτοματισμού SCADA.",
    artworkType: 1
  },
  {
    id: "PN-2025-0104",
    isMock: true,
    cat: "residential",
    tagEn: "RESIDENTIAL / nZEB",
    tagEl: "ΚΑΤΟΙΚΙΑ / nZEB",
    titleEn: "Olympus Ridge Eco-Resort",
    titleEl: "Οικολογικό Θέρετρο Olympus Ridge",
    team: "ELENI STAVROU",
    leadEn: "Lead Engineer: Eleni Stavrou",
    leadEl: "Επικεφαλής Μηχανικός: Ελένη Σταύρου",
    area: "1,850 m²",
    dur: "18 Months",
    durEl: "18 Μήνες",
    lod: "LOD-300",
    descEn: "Ultra-luxury nZEB residential resort complex built into a mountainous slope. Features cantilevered post-tensioned concrete swimming pools, geothermal heating, and automated KNX environmental control.",
    descEl: "Υπερπολυτελές συγκρότημα κατοικιών nZEB ενταγμένο σε ορεινή πλαγιά. Διαθέτει προβόλους πισινών από προεντεταμένο σκυρόδεμα, γεωθερμία και αυτοματισμούς KNX.",
    artworkType: 2
  },
  {
    id: "PN-2023-0811",
    isMock: true,
    cat: "commercial",
    tagEn: "COMMERCIAL / RETROFIT",
    tagEl: "ΕΜΠΟΡΙΚΟ / ΑΝΑΒΑΘΜΙΣΗ",
    titleEn: "Syntagma Tower Retrofit",
    titleEl: "Ενεργειακή Αναβάθμιση Πύργου Συντάγματος",
    team: "NIKOS KAZANTZIS",
    leadEn: "Lead Engineer: Nikos Kazantzis",
    leadEl: "Επικεφαλής Μηχανικός: Νίκος Καζαντζής",
    area: "8,200 m²",
    dur: "22 Months",
    durEl: "22 Μήνες",
    lod: "LOD-400",
    descEn: "Turnkey structural retrofit and energy upgrade of a 1970s commercial high-rise. Executed carbon-fiber structural reinforcement and installed high-performance triple-glazed smart facade systems.",
    descEl: "Turnkey στατική ενίσχυση και ενεργειακή αναβάθμιση εμπορικού πολυώροφου κτιρίου του 1970. Εφαρμογή ανθρακονημάτων και εγκατάσταση έξυπνων όψεων τριπλού υαλοπίνακα.",
    artworkType: 3
  },
  {
    id: "PN-2024-0455",
    isMock: true,
    cat: "bim industrial",
    tagEn: "BIM / DIGITAL TWIN",
    tagEl: "BIM / DIGITAL TWIN",
    titleEn: "Pharma-Logistics Hub",
    titleEl: "Κέντρο Logistics Φαρμακοβιομηχανίας",
    team: "PANAGIOTIS M. PANTELEOS",
    leadEn: "Lead Engineer: Panagiotis M. Panteleos",
    leadEl: "Επικεφαλής Μηχανικός: Παναγιώτης Μιχ. Παντελαίος",
    area: "18,000 m²",
    dur: "14 Months",
    durEl: "14 Μήνες",
    lod: "LOD-500",
    descEn: "LOD-500 digital twin asset model for an automated pharmaceutical logistics distribution center. Complete MEP interference clash elimination prior to ground-breaking, saving 14% in construction waste.",
    descEl: "Ψηφιακό μοντέλο LOD-500 Digital Twin για αυτοματοποιημένο κέντρο διανομής φαρμάκων. Εξάλειψη συγκρούσεων Η/Μ δικτύων πριν την έναρξη, μειώνοντας τη φύρα κατά 14%.",
    artworkType: 4
  },
  {
    id: "PN-2024-0780",
    isMock: true,
    cat: "residential bim",
    tagEn: "RESIDENTIAL / BIM",
    tagEl: "ΚΑΤΟΙΚΙΑ / BIM",
    titleEn: "Aegean Monolithic Villa",
    titleEl: "Μονολιθική Βίλα Αιγαίου",
    team: "ELENI STAVROU",
    leadEn: "Lead Engineer: Eleni Stavrou",
    leadEl: "Επικεφαλής Μηχανικός: Ελένη Σταύρου",
    area: "950 m²",
    dur: "12 Months",
    durEl: "12 Μήνες",
    lod: "LOD-350",
    descEn: "Minimalist monolithic concrete villa overlooking the Aegean sea. Engineered custom frameless glass curtain walls and hidden zero-energy solar roof tiles.",
    descEl: "Μινιμαλιστική μονολιθική κατοικία από εμφανές σκυρόδεμα με θέα στο Αιγαίο. Σχεδιασμός υαλοπετασμάτων χωρίς πλαίσιο και κρυφών ηλιακών πλακιδίων οροφής μηδενικής ενέργειας.",
    artworkType: 5
  }
];

window.PORTFOLIO_PROJECTS = PORTFOLIO_PROJECTS;

/**
 * Helper: Returns active portfolio projects.
 * If at least one real project (where isMock is false or undefined) exists in PORTFOLIO_PROJECTS,
 * all mock/showcase projects (isMock: true) are automatically removed from display and statistics!
 */
function getActivePortfolioProjects() {
  const hasRealProjects = Array.isArray(PORTFOLIO_PROJECTS) && PORTFOLIO_PROJECTS.some(proj => !proj.isMock);
  return hasRealProjects ? PORTFOLIO_PROJECTS.filter(proj => !proj.isMock) : (PORTFOLIO_PROJECTS || []);
}
window.getActivePortfolioProjects = getActivePortfolioProjects;

/**
 * Global Portfolio Statistics & Historical Track Record
 * Drives the #portfolio-counter-banner statistics on the home page.
 * Automatically combines historical baseline record with PORTFOLIO_PROJECTS case studies.
 */
const PORTFOLIO_STATS = {
  baselineProjects: 328,       // Pre-featured historical baseline projects
  baselineAreaSqM: 1202100,    // Pre-featured historical baseline area (m²)
  complianceRate: 100,         // % ISO 19650 & Eurocode compliance
  activeSites: 28,             // Active construction sites
  fraction: [2, 3],            // Fractional execution indicator

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

window.PORTFOLIO_STATS = PORTFOLIO_STATS;

/**
 * Updates the #portfolio-counter-banner DOM targets and labels dynamically from PORTFOLIO_STATS
 */
function updatePortfolioStatsBanner(lang) {
  const banner = document.getElementById('portfolio-counter-banner');
  if (!banner) return;

  const stats = window.PORTFOLIO_STATS || {};
  const currentLang = lang || localStorage.getItem('panteleos_lang') || 'el';
  const locale = currentLang === 'el' ? 'el-GR' : 'en-US';

  banner.querySelectorAll('.stat-num[data-stat-key]').forEach(el => {
    const key = el.getAttribute('data-stat-key');
    if (key && stats[key] !== undefined) {
      const val = stats[key];
      el.setAttribute('data-target', val);
      if (el.textContent && el.textContent.trim() !== '0') {
        el.textContent = val.toLocaleString(locale);
      }
    }
  });

  const fracEl = banner.querySelector('.stat-frac');
  if (fracEl && Array.isArray(stats.fraction) && stats.fraction.length === 2) {
    fracEl.innerHTML = `<i>${stats.fraction[0]}</i><i>${stats.fraction[1]}</i>`;
  }
}

window.updatePortfolioStatsBanner = updatePortfolioStatsBanner;

/**
 * Renders portfolio cards dynamically into #portfolio-grid
 */
function renderPortfolioProjects(lang) {
  updatePortfolioStatsBanner(lang);

  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;

  const currentLang = lang || localStorage.getItem('panteleos_lang') || 'el';
  const isEl = currentLang === 'el';

  // Check currently active filter chip
  const activeChip = document.querySelector('.filter-chip.active');
  const activeFilter = activeChip ? activeChip.getAttribute('data-filter') : 'all';

  const activeProjects = getActivePortfolioProjects();
  grid.innerHTML = activeProjects.map(proj => {
    const tag = isEl ? proj.tagEl : proj.tagEn;
    const title = isEl ? proj.titleEl : proj.titleEn;
    const lead = isEl ? proj.leadEl : proj.leadEn;
    const desc = isEl ? proj.descEl : proj.descEn;
    const dur = isEl ? (proj.durEl || proj.dur) : proj.dur;

    const hiddenClass = (activeFilter === 'all' || proj.cat.includes(activeFilter)) ? '' : ' hidden';
    const primaryImg = proj.image || proj.imageAes || `assets/portfolio/${proj.id}/main.jpg`;
    const techImg = proj.imageTech || `assets/portfolio/${proj.id}/tech.jpg`;
    const photosAttr = Array.isArray(proj.photos) ? ` data-photos="${proj.photos.join(',')}"` : (proj.photos ? ` data-photos="${proj.photos}"` : '');

    return `
      <article class="p-card${hiddenClass}" tabindex="0" role="button" 
               data-cat="${proj.cat}" 
               data-team="${proj.team}" 
               data-area="${proj.area}" 
               data-dur="${dur}" 
               data-lod="${proj.lod}" 
               data-desc="${desc}"${photosAttr}>
        <div class="p-visual">
          <div class="aesthetic">
            <img src="${primaryImg}" alt="${title}" loading="lazy" 
                 onerror="this.onerror=null; this.remove(); if(typeof window.generatePortfolioArtwork === 'function') window.generatePortfolioArtwork();">
          </div>
          <div class="technical">
            <img src="${techImg}" alt="${title} Technical" loading="lazy" 
                 onerror="this.onerror=null; this.remove(); if(typeof window.generatePortfolioArtwork === 'function') window.generatePortfolioArtwork();">
          </div>
        </div>
        <div class="p-info">
          <div class="tagrow"><span>${proj.id}</span><span>${tag}</span></div>
          <h4>${title}</h4>
          <p>${lead}</p>
        </div>
      </article>
    `;
  }).join('');

  // Re-generate SVG artwork for the rendered cards defensively
  if (typeof window.generatePortfolioArtwork === 'function') {
    window.generatePortfolioArtwork();
  }

  // Re-bind modal click listeners
  if (typeof window.initPortfolioModal === 'function') {
    window.initPortfolioModal();
  }
}

window.renderPortfolioProjects = renderPortfolioProjects;
window.updatePortfolioLanguage = renderPortfolioProjects;

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('panteleos_lang') || 'el';
  renderPortfolioProjects(savedLang);
});
