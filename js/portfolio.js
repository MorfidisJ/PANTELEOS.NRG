/**
 * PANTELEOS.NRG — Portfolio & Team Matrix Engine
 * Handles laser-scan Technical/Aesthetic view toggle, category filtering, SVG drawings, and Modal dialogs.
 */
document.addEventListener('DOMContentLoaded', () => {
  initPortfolioToggle();
  initPortfolioFilters();
  initPortfolioModal();
  initTeamCrossFilter();
  initTeamModal();
  generatePortfolioArtwork();
  initPortfolioStats();
});

/* --- Technical vs Aesthetic View Toggle --- */
function initPortfolioToggle() {
  const aesBtn = document.getElementById('view-aes');
  const techBtn = document.getElementById('view-tech');
  const grid = document.getElementById('portfolio-grid');

  if (!aesBtn || !techBtn || !grid) return;

  aesBtn.addEventListener('click', () => {
    aesBtn.classList.add('active');
    techBtn.classList.remove('active');
    grid.classList.remove('tech-view');
  });

  techBtn.addEventListener('click', () => {
    techBtn.classList.add('active');
    aesBtn.classList.remove('active');
    grid.classList.add('tech-view');
  });
}

/* --- Portfolio Filtering --- */
function initPortfolioFilters() {
  const chips = document.querySelectorAll('.filter-chip');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');
      const cards = document.querySelectorAll('.p-card');
      cards.forEach(card => {
        const catTokens = (card.getAttribute('data-cat') || '').split(/\s+/);
        const team = card.getAttribute('data-team') || '';
        if (filter === 'all' || catTokens.includes(filter) || team.includes(filter)) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* --- Team Directory Cross-Filter --- */
function initTeamCrossFilter() {
  const teamLinks = document.querySelectorAll('.team-card .cta');
  const filterChips = document.querySelectorAll('.filter-chip');

  teamLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = link.closest('.team-card');
      if (!card) return;
      const engineerName = card.getAttribute('data-engineer');
      
      const portfolioSec = document.getElementById('portfolio');
      if (portfolioSec) {
        const navH = 76;
        const top = portfolioSec.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }

      // Activate corresponding filter or show all projects by this engineer
      filterChips.forEach(c => c.classList.remove('active'));
      const allChip = document.querySelector('.filter-chip[data-filter="all"]');
      if (allChip) allChip.classList.add('active');

      const pCards = document.querySelectorAll('.p-card');
      pCards.forEach(pc => {
        const t = pc.getAttribute('data-team') || '';
        if (t.includes(engineerName) || !engineerName) {
          pc.classList.remove('hidden');
          pc.style.boxShadow = '0 0 25px rgba(38, 215, 235, 0.5)';
          setTimeout(() => { pc.style.boxShadow = ''; }, 2000);
        } else {
          pc.classList.add('hidden');
        }
      });
    });
  });
}

// TEAM_DATA is loaded from js/team-data.js


function initTeamModal() {
  const modal = document.getElementById('team-modal-overlay');
  if (!modal) return;
  const closeBtn = document.getElementById('team-modal-close');
  const teamCards = document.querySelectorAll('.team-card');

  const badgeEl = document.getElementById('tm-badge');
  const regEl = document.getElementById('tm-reg');
  const nameEl = document.getElementById('tm-name');
  const roleEl = document.getElementById('tm-role');
  const bioEl = document.getElementById('tm-bio');
  const specsEl = document.getElementById('tm-specs');
  const emailEl = document.getElementById('tm-email');
  const telEl = document.getElementById('tm-tel');
  const filterBtn = document.getElementById('tm-filter-btn');
  const contactBtn = document.getElementById('tm-contact-btn');

  const bioHead = document.getElementById('tm-bio-head');
  const specsHead = document.getElementById('tm-specs-head');
  const emailLabel = document.getElementById('tm-email-label');
  const telLabel = document.getElementById('tm-tel-label');
  const filterText = document.getElementById('tm-filter-text');
  const contactText = document.getElementById('tm-contact-text');

  let currentEngineer = '';
  let cleanupFocus = null;
  let lastFocusedElement = null;

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    document.documentElement.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    if (cleanupFocus) { cleanupFocus(); cleanupFocus = null; }
    if (lastFocusedElement) { lastFocusedElement.focus(); lastFocusedElement = null; }
  };

  if (!modal.dataset.listenersAttached) {
    modal.dataset.listenersAttached = 'true';
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
  }

  const renderModalContent = (engKey, lang) => {
    const data = TEAM_DATA[engKey];
    if (!data) return;
    const isEl = lang === 'el';

    if (badgeEl) {
      const portraitPath = data.photo || (data.id ? `assets/team/${data.id}/portrait.jpg` : '');
      badgeEl.innerHTML = `${portraitPath ? `<img src="${portraitPath}" alt="${data.nameEn}" onerror="this.remove();">` : ''}<span>${data.initials}</span>`;
    }
    if (regEl) regEl.textContent = isEl ? data.regEl : data.regEn;
    if (nameEl) nameEl.textContent = isEl ? data.nameEl : data.nameEn;
    if (roleEl) roleEl.textContent = isEl ? data.roleEl : data.roleEn;
    if (bioEl) bioEl.textContent = isEl ? data.bioEl : data.bioEn;
    if (emailEl) emailEl.textContent = data.email;
    if (telEl) telEl.textContent = data.tel;

    if (bioHead) bioHead.textContent = isEl ? "ΒΙΟΓΡΑΦΙΚΟ & ΕΞΕΙΔΙΚΕΥΣΗ" : "EXECUTIVE BIOGRAPHY & SPECIALIZATION";
    if (specsHead) specsHead.textContent = isEl ? "ΒΑΣΙΚΕΣ ΙΚΑΝΟΤΗΤΕΣ & ΠΙΣΤΟΠΟΙΗΣΕΙΣ" : "CORE COMPETENCIES & CERTIFICATIONS";
    if (emailLabel) emailLabel.textContent = isEl ? "Ηλεκτρονικό Ταχυδρομείο" : "Direct Electronic Mail";
    if (telLabel) telLabel.textContent = isEl ? "Απευθείας Τηλέφωνο // WhatsApp" : "Direct Telephone // WhatsApp";
    if (filterText) filterText.textContent = isEl ? "ΠΡΟΒΟΛΗ ΕΡΓΩΝ ΜΗΧΑΝΙΚΟΥ \u2192" : "FILTER PROJECTS BY THIS ENGINEER \u2192";
    if (contactText) contactText.textContent = isEl ? "ΑΠΕΥΘΕΙΑΣ ΕΠΙΚΟΙΝΩΝΙΑ \u2192" : "REQUEST DIRECT CONSULTATION \u2192";

    if (specsEl) {
      const specsList = isEl ? data.specsEl : data.specsEn;
      specsEl.innerHTML = specsList.map(s => `<span style="background: rgba(0, 229, 255, 0.1); color: #0a1428; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-family: var(--font-mono); border: 1px solid rgba(0, 229, 255, 0.3); font-weight: 600;">${s}</span>`).join('');
    }
  };

  const openCardModal = (card) => {
    const engKey = card.getAttribute('data-engineer');
    if (!TEAM_DATA[engKey]) return;

    lastFocusedElement = document.activeElement;
    currentEngineer = engKey;
    const activeLang = window.currentLang || localStorage.getItem('panteleos_lang') || 'el';
    renderModalContent(engKey, activeLang);

    modal.classList.add('open');
    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    if (window.trapFocus) cleanupFocus = window.trapFocus(modal.querySelector('.modal-box') || modal);
  };

  teamCards.forEach(card => {
    if (card.dataset.hasModalListener) return;
    card.dataset.hasModalListener = 'true';
    card.addEventListener('click', (e) => {
      if (e.target.closest('.cta') || e.target.closest('button')) return;
      openCardModal(card);
    });
    card.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('.cta') && !e.target.closest('button')) {
        e.preventDefault();
        openCardModal(card);
      }
    });
  });

  window.updateTeamModalLanguage = (lang) => {
    if (!currentEngineer || !modal.classList.contains('open')) return;
    renderModalContent(currentEngineer, lang);
  };

  window.updateTeamCardsLanguage = (lang) => {
    const isEl = lang === 'el';
    document.querySelectorAll('.team-card').forEach(card => {
      const engKey = card.getAttribute('data-engineer');
      const data = TEAM_DATA[engKey];
      if (!data) return;
      const baseName = card.querySelector('.team-base h4');
      const overlayName = card.querySelector('.team-overlay h4');
      const regEl = card.querySelector('.team-overlay .reg');
      const specListEl = card.querySelector('.spec-list');

      if (baseName) baseName.textContent = isEl ? data.nameEl : data.nameEn;
      if (overlayName) overlayName.textContent = isEl ? data.nameEl : data.nameEn;
      if (regEl) regEl.textContent = isEl ? data.regEl : data.regEn;
      if (specListEl) {
        const specs = isEl ? data.specsEl : data.specsEn;
        specListEl.innerHTML = specs.slice(0, 3).map(s => `<span>${s}</span>`).join('');
      }
    });

    document.querySelectorAll('.p-card').forEach(card => {
      const teamKey = card.getAttribute('data-team');
      const data = TEAM_DATA[teamKey];
      if (!data) return;
      const pEl = card.querySelector('.p-info p');
      if (pEl) {
        const prefix = isEl ? "Υπεύθυνος Μηχανικός:" : "Lead Engineer:";
        pEl.textContent = `${prefix} ${isEl ? data.nameEl : data.nameEn}`;
      }
    });

    const metaEl = document.getElementById('m-meta');
    if (metaEl && metaEl.textContent && (metaEl.textContent.startsWith('Υπεύθυνος Μηχανικός:') || metaEl.textContent.startsWith('Lead Engineer:'))) {
      Object.values(TEAM_DATA).forEach(data => {
        if (metaEl.textContent.includes(data.nameEn) || metaEl.textContent.includes(data.nameEl)) {
          const prefix = isEl ? "Υπεύθυνος Μηχανικός:" : "Lead Engineer:";
          metaEl.textContent = `${prefix} ${isEl ? data.nameEl : data.nameEn}`;
        }
      });
    }
  };

  const initialLang = window.currentLang || localStorage.getItem('panteleos_lang') || 'el';
  window.updateTeamCardsLanguage(initialLang);

  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      closeModal();
      const portfolioSec = document.getElementById('portfolio');
      if (portfolioSec) {
        const navH = 76;
        const top = portfolioSec.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
      const filterChips = document.querySelectorAll('.filter-chip');
      filterChips.forEach(c => c.classList.remove('active'));
      const allChip = document.querySelector('.filter-chip[data-filter="all"]');
      if (allChip) allChip.classList.add('active');

      const pCards = document.querySelectorAll('.p-card');
      pCards.forEach(pc => {
        const t = pc.getAttribute('data-team') || '';
        if (t.includes(currentEngineer) || !currentEngineer) {
          pc.classList.remove('hidden');
          pc.style.boxShadow = '0 0 25px rgba(38, 215, 235, 0.5)';
          setTimeout(() => { pc.style.boxShadow = ''; }, 2000);
        } else {
          pc.classList.add('hidden');
        }
      });
    });
  }

  if (contactBtn) {
    contactBtn.addEventListener('click', () => {
      closeModal();
    });
  }
}

/* --- Project Modal Dialog & Interactive Gallery Mode --- */
function initPortfolioModal() {
  const modal = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('modal-close');
  if (!modal) return;

  const titleEl = document.getElementById('m-title');
  const tagEl = document.getElementById('m-tag');
  const metaEl = document.getElementById('m-meta');
  const descEl = document.getElementById('m-desc');
  const areaEl = document.getElementById('m-area');
  const durEl = document.getElementById('m-dur');
  const lodEl = document.getElementById('m-lod');

  let currentSlideIdx = 0;
  let activeSlides = [];
  let cleanupFocus = null;
  let lastFocusedElement = null;

  function getProjectGallerySlides(card) {
    const lang = localStorage.getItem('panteleos_lang') || 'el';
    const isEl = lang === 'el';
    const photosAttr = card.getAttribute('data-photos');
    
    if (photosAttr) {
      const urls = photosAttr.split(',').map(s => s.trim());
      return urls.map((url, idx) => ({
        img: url,
        type: isEl ? `ΦΩΤΟΓΡΑΦΙΑ ΕΡΓΟΥ // ${idx + 1}` : `PROJECT PHOTO // ${idx + 1}`,
        caption: isEl ? `Αρχιτεκτονική απεικόνιση & εργοταξιακή φάση ${idx + 1}` : `Architectural view & worksite execution phase ${idx + 1}`
      }));
    }

    // Default: Rich Hybrid Image/BIM/Technical/Architectural Gallery
    const aesImg = card.querySelector('.aesthetic img')?.getAttribute('src');
    const techImg = card.querySelector('.technical img')?.getAttribute('src');
    const aesSvg = card.querySelector('.aesthetic svg')?.cloneNode(true);
    const techSvg = card.querySelector('.technical svg')?.cloneNode(true);
    const projTitle = card.querySelector('h4')?.textContent || 'Project';
    
    const slides = [];
    if (aesImg) {
      slides.push({
        img: aesImg,
        type: isEl ? '01 // ΦΩΤΟΓΡΑΦΙΑ ΕΡΓΟΥ' : '01 // PROJECT PHOTO',
        caption: isEl ? `Πραγματική απεικόνιση έργου: ${projTitle}` : `Actual project photography: ${projTitle}`
      });
    } else if (aesSvg) {
      slides.push({
        svg: aesSvg,
        type: isEl ? '01 // ΑΡΧΙΤΕΚΤΟΝΙΚΗ ΑΠΕΙΚΟΝΙΣΗ' : '01 // AESTHETIC ARCHITECTURAL VIEW',
        caption: isEl ? `Εξωτερική αρχιτεκτονική απεικόνιση: ${projTitle}` : `External facade & landscaping rendering: ${projTitle}`
      });
    }

    if (techImg) {
      slides.push({
        img: techImg,
        type: isEl ? '02 // ΤΕΧΝΙΚΗ ΑΠΕΙΚΟΝΙΣΗ' : '02 // TECHNICAL VIEW',
        caption: isEl ? 'Τεχνικό σχέδιο & κατασκευαστική λεπτομέρεια.' : 'Technical engineering and construction view.'
      });
    } else if (techSvg) {
      slides.push({
        svg: techSvg,
        type: isEl ? '02 // ΤΕΧΝΙΚΟ ΣΧΕΔΙΟ LOD-400' : '02 // TECHNICAL LOD-400 WIREFRAME',
        caption: isEl ? 'Δομοστατικός σκελετός BIM, δίκτυα Η/Μ και γεωμετρικές ανοχές.' : 'Laser-scanned BIM structural framework and HVAC clean-room ventilation grid.'
      });
    }
    
    // Slide 3: Custom FEA Stress Mesh SVG
    const feaSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    feaSvg.setAttribute('viewBox', '0 0 400 300');
    feaSvg.setAttribute('preserveAspectRatio', 'none');
    feaSvg.innerHTML = `
      <rect width="400" height="300" fill="#060c18"/>
      <defs>
        <linearGradient id="fea-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00e5ff" stop-opacity="0.8"/>
          <stop offset="50%" stop-color="#7b2cbf" stop-opacity="0.6"/>
          <stop offset="100%" stop-color="#ff0055" stop-opacity="0.9"/>
        </linearGradient>
        <pattern id="fea-grid" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(0, 229, 255, 0.18)" stroke-width="0.5"/>
        </pattern>
      </defs>
      <rect width="400" height="300" fill="url(#fea-grid)"/>
      <path d="M 50,220 Q 150,180 200,140 T 350,80" fill="none" stroke="url(#fea-grad)" stroke-width="3"/>
      <path d="M 50,250 Q 150,210 200,170 T 350,110" fill="none" stroke="url(#fea-grad)" stroke-width="2" stroke-dasharray="6,4"/>
      <path d="M 50,190 Q 150,150 200,110 T 350,50" fill="none" stroke="rgba(0,229,255,0.4)" stroke-width="1.5"/>
      <circle cx="120" cy="196" r="6" fill="#00e5ff" filter="drop-shadow(0 0 8px #00e5ff)"/>
      <circle cx="200" cy="140" r="8" fill="#ff0055" filter="drop-shadow(0 0 10px #ff0055)"/>
      <circle cx="280" cy="100" r="6" fill="#7b2cbf" filter="drop-shadow(0 0 8px #7b2cbf)"/>
      <text x="212" y="135" fill="#ff0055" font-family="monospace" font-size="11" font-weight="bold">MAX STRESS: 24.8 MPa</text>
      <text x="60" y="275" fill="#00e5ff" font-family="monospace" font-size="10">SIMULATION // EUROCODE 8 SEISMIC BASE ISOLATION</text>
    `;
    slides.push({
      svg: feaSvg,
      type: isEl ? '03 // ΣΤΑΤΙΚΗ & ΑΝΤΙΣΕΙΣΜΙΚΗ ΑΝΑΛΥΣΗ' : '03 // SEISMIC & FOUNDATION ANALYSIS',
      caption: isEl ? 'Ανάλυση πεπερασμένων στοιχείων και προσομοίωση αντισεισμικής συμπεριφοράς (Eurocode 8).' : '3D Finite Element Mesh & post-tensioned foundation slab seismic simulation (Eurocode 8).'
    });

    // Slide 4: On-site Telemetry SVG
    const siteSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    siteSvg.setAttribute('viewBox', '0 0 400 300');
    siteSvg.setAttribute('preserveAspectRatio', 'none');
    siteSvg.innerHTML = `
      <rect width="400" height="300" fill="#08101a"/>
      <line x1="0" y1="240" x2="400" y2="240" stroke="#00e5ff" stroke-width="2"/>
      <rect x="80" y="100" width="100" height="140" fill="none" stroke="#008cff" stroke-width="2" stroke-dasharray="5,3"/>
      <rect x="200" y="60" width="120" height="180" fill="none" stroke="#00e5ff" stroke-width="2"/>
      <line x1="60" y1="240" x2="60" y2="40" stroke="#ffaa00" stroke-width="3"/>
      <line x1="60" y1="40" x2="280" y2="20" stroke="#ffaa00" stroke-width="2"/>
      <line x1="180" y1="28" x2="180" y2="80" stroke="#ffaa00" stroke-width="1" stroke-dasharray="2,2"/>
      <rect x="170" y="80" width="20" height="20" fill="#ffaa00" opacity="0.8"/>
      <rect x="20" y="20" width="150" height="40" rx="4" fill="rgba(0, 229, 255, 0.1)" stroke="rgba(0, 229, 255, 0.4)"/>
      <text x="30" y="38" fill="#00e5ff" font-family="monospace" font-size="10" font-weight="bold">QC INSPECTION: PASSED</text>
      <text x="30" y="52" fill="#ffffff" font-family="monospace" font-size="9">LOD-400 COMMISSIONING 94%</text>
    `;
    slides.push({
      svg: siteSvg,
      type: isEl ? '04 // ΕΡΓΟΤΑΞΙΑΚΗ ΕΠΙΒΛΕΨΗ & QC' : '04 // ON-SITE COMMISSIONING & QC',
      caption: isEl ? 'Εργοταξιακή επίβλεψη, έλεγχος ποιότητας υλικών και εγκατάσταση αισθητήρων ΙοΤ.' : 'Turnkey execution monitoring, automated quality assurance inspections, and smart IoT telemetry.'
    });

    return slides;
  }

  function initGalleryStageZoom(stage, targetEl) {
    if (!stage || !targetEl) return;
    
    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const updateTransform = (animate = true) => {
      targetEl.style.transition = animate ? 'transform 0.15s ease-out' : 'none';
      targetEl.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
      stage.style.cursor = scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default';
    };

    if (stage._zoomCleanup) stage._zoomCleanup();

    const onWheel = (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.25 : 0.8;
      const newScale = Math.min(Math.max(1, scale * zoomFactor), 3);
      if (newScale === 1) {
        scale = 1;
        translateX = 0;
        translateY = 0;
      } else {
        scale = newScale;
      }
      updateTransform(true);
    };

    const onMouseDown = (e) => {
      if (scale <= 1) return;
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      updateTransform(false);
    };

    const onMouseMove = (e) => {
      if (!isDragging || scale <= 1) return;
      translateX = e.clientX - startX;
      translateY = e.clientY - startY;
      updateTransform(false);
    };

    const onMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        updateTransform(true);
      }
    };

    const onDoubleClick = (e) => {
      e.preventDefault();
      if (scale > 1) {
        scale = 1;
        translateX = 0;
        translateY = 0;
      } else {
        scale = 2.2;
      }
      updateTransform(true);
    };

    stage.addEventListener('wheel', onWheel, { passive: false });
    stage.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    stage.addEventListener('dblclick', onDoubleClick);

    stage._zoomCleanup = () => {
      stage.removeEventListener('wheel', onWheel);
      stage.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      stage.removeEventListener('dblclick', onDoubleClick);
    };
  }

  function renderGallerySlide(idx) {
    if (!activeSlides || activeSlides.length === 0) return;
    currentSlideIdx = (idx + activeSlides.length) % activeSlides.length;
    const slide = activeSlides[currentSlideIdx];

    const stage = document.getElementById('gallery-stage');
    const counter = document.getElementById('gallery-counter');
    const typeBadge = document.getElementById('gallery-type');
    const caption = document.getElementById('gallery-caption');
    const thumbsContainer = document.getElementById('gallery-thumbs');

    if (stage) {
      if (stage._zoomCleanup) { stage._zoomCleanup(); stage._zoomCleanup = null; }
      stage.style.opacity = '0';
      setTimeout(() => {
        stage.innerHTML = '';
        let targetEl = null;
        if (slide.img) {
          const imgEl = document.createElement('img');
          imgEl.src = slide.img;
          imgEl.alt = slide.caption || 'Project Photo';
          stage.appendChild(imgEl);
          targetEl = imgEl;
        } else if (slide.svg) {
          const svgClone = slide.svg.cloneNode(true);
          stage.appendChild(svgClone);
          targetEl = svgClone;
        }
        if (targetEl) initGalleryStageZoom(stage, targetEl);
        stage.style.opacity = '1';
      }, 150);
    }

    if (counter) {
      const numStr = String(currentSlideIdx + 1).padStart(2, '0');
      const totalStr = String(activeSlides.length).padStart(2, '0');
      counter.textContent = `${numStr} // ${totalStr}`;
    }

    if (typeBadge) typeBadge.textContent = slide.type || 'PHOTO';
    if (caption) caption.textContent = slide.caption || '';

    if (thumbsContainer) {
      thumbsContainer.innerHTML = '';
      activeSlides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `gallery-thumb-btn ${i === currentSlideIdx ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Slide ${i + 1}`);
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          renderGallerySlide(i);
        });
        thumbsContainer.appendChild(dot);
      });
    }
  }

  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  if (prevBtn) {
    prevBtn.onclick = (e) => {
      e.stopPropagation();
      renderGallerySlide(currentSlideIdx - 1);
    };
  }
  if (nextBtn) {
    nextBtn.onclick = (e) => {
      e.stopPropagation();
      renderGallerySlide(currentSlideIdx + 1);
    };
  }

  function probeProjectGalleryPhotos(projId, isEl) {
    if (!projId) return;
    for (let i = 1; i <= 8; i++) {
      const candidateUrl = `assets/portfolio/${projId}/${i}.jpg`;
      const img = new Image();
      img.onload = () => {
        if (!activeSlides.some(s => s.img === candidateUrl)) {
          activeSlides.push({
            img: candidateUrl,
            type: isEl ? `ΦΩΤΟΓΡΑΦΙΑ ΕΡΓΟΥ // #${activeSlides.length + 1}` : `PROJECT GALLERY // #${activeSlides.length + 1}`,
            caption: isEl ? `Αυτοματοποιημένη φόρτωση gallery (${projId} - 0${i})` : `Convention-discovered project gallery view (${projId} - 0${i})`
          });
          renderGallerySlide(currentSlideIdx);
        }
      };
      img.src = candidateUrl;
    }
  }

  const openPortfolioModal = (card) => {
    lastFocusedElement = document.activeElement;
    const title = card.querySelector('h4')?.textContent || 'Project';
    const tag = card.querySelector('.tagrow span')?.textContent || 'PROJECT';
    const meta = card.querySelector('p')?.textContent || 'Thessaloniki';
    const desc = card.getAttribute('data-desc') || 'Comprehensive turnkey architectural engineering and BIM digital twin deployment.';
    const area = card.getAttribute('data-area') || '4,200 m²';
    const dur = card.getAttribute('data-dur') || '18 Months';
    const lod = card.getAttribute('data-lod') || 'LOD-400';

    if (titleEl) titleEl.textContent = title;
    if (tagEl) tagEl.textContent = tag;
    if (metaEl) metaEl.textContent = meta;
    if (descEl) descEl.textContent = desc;
    if (areaEl) areaEl.textContent = area;
    if (durEl) durEl.textContent = dur;
    if (lodEl) lodEl.textContent = lod;

    activeSlides = getProjectGallerySlides(card);
    renderGallerySlide(0);

    const projId = card.querySelector('.tagrow span:first-child')?.textContent?.trim() || tag;
    const lang = localStorage.getItem('panteleos_lang') || 'el';
    probeProjectGalleryPhotos(projId, lang === 'el');

    modal.classList.add('open');
    document.body.classList.add('modal-open');
    document.documentElement.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    if (window.trapFocus) cleanupFocus = window.trapFocus(modal.querySelector('.modal-box') || modal);
  };

  document.querySelectorAll('.p-card').forEach(card => {
    if (card.dataset.hasModalListener) return;
    card.dataset.hasModalListener = 'true';
    card.addEventListener('click', () => openPortfolioModal(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPortfolioModal(card);
      }
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
    document.documentElement.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    const stage = document.getElementById('gallery-stage');
    if (stage && stage._zoomCleanup) { stage._zoomCleanup(); stage._zoomCleanup = null; }
    if (cleanupFocus) { cleanupFocus(); cleanupFocus = null; }
    if (lastFocusedElement) { lastFocusedElement.focus(); lastFocusedElement = null; }
  }

  if (!modal.dataset.listenersAttached) {
    modal.dataset.listenersAttached = 'true';
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    window.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('open')) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') renderGallerySlide(currentSlideIdx - 1);
      if (e.key === 'ArrowRight') renderGallerySlide(currentSlideIdx + 1);
    });
  }
}

/* --- Generate Custom SVG Architectural Artwork for Cards --- */
let artworkTimeout = null;
function generatePortfolioArtwork() {
  if (artworkTimeout) cancelAnimationFrame(artworkTimeout);
  artworkTimeout = requestAnimationFrame(() => {
    artworkTimeout = null;
    const visuals = document.querySelectorAll('.p-visual');
    visuals.forEach((vis, idx) => {
      const aes = vis.querySelector('.aesthetic');
      const tech = vis.querySelector('.technical');
      if (!aes || !tech) return;

      const colors = ['#0A6C78', '#141414', '#26D7EB', '#4EE5F7'];
      const c1 = colors[idx % colors.length];

      // Aesthetic SVG (only if no custom image or existing SVG provided)
      if (!aes.querySelector('img') && !aes.querySelector('svg')) {
        aes.innerHTML = `
          <svg viewBox="0 0 400 300" preserveAspectRatio="none">
            <rect width="400" height="300" fill="#F8F9FA"/>
            <path d="M 40,240 L 160,80 L 280,140 L 360,60 L 360,240 Z" fill="${c1}" opacity="0.12"/>
            <path d="M 80,240 L 180,110 L 260,160 L 340,100 L 340,240 Z" fill="#141414" opacity="0.08"/>
            <line x1="0" y1="240" x2="400" y2="240" stroke="#141414" stroke-width="2"/>
            <circle cx="160" cy="80" r="4" fill="#26D7EB"/>
            <circle cx="280" cy="140" r="4" fill="#26D7EB"/>
          </svg>
        `;
      }

      // Technical Blueprint Wireframe SVG (only if no custom image or existing SVG provided)
      if (!tech.querySelector('img') && !tech.querySelector('svg')) {
        tech.innerHTML = `
        <svg viewBox="0 0 400 300" preserveAspectRatio="none">
          <rect width="400" height="300" fill="#141414"/>
          <defs>
            <pattern id="grid-${idx}" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(38, 215, 235, 0.15)" stroke-width="0.5"/>
            </pattern>
          </defs>
          <rect width="400" height="300" fill="url(#grid-${idx})"/>
          <path d="M 40,240 L 160,80 L 280,140 L 360,60" fill="none" stroke="#26D7EB" stroke-width="1.5" stroke-dasharray="4,2"/>
          <path d="M 80,240 L 180,110 L 260,160 L 340,100" fill="none" stroke="#4EE5F7" stroke-width="1"/>
          <line x1="0" y1="240" x2="400" y2="240" stroke="#26D7EB" stroke-width="2"/>
          <circle cx="160" cy="80" r="5" fill="none" stroke="#26D7EB" stroke-width="2"/>
          <circle cx="280" cy="140" r="5" fill="none" stroke="#26D7EB" stroke-width="2"/>
          <text x="165" y="75" fill="#26D7EB" font-family="JetBrains Mono" font-size="9">ELV:+42.5m</text>
          <text x="285" y="135" fill="#26D7EB" font-family="JetBrains Mono" font-size="9">LOD:400</text>
        </svg>
      `;
      }
    });
  });
}
window.generatePortfolioArtwork = generatePortfolioArtwork;

/* --- Animated Counting Stats Banner --- */
function initPortfolioStats() {
  const banner = document.getElementById('portfolio-counter-banner');
  if (!banner) return;

  const stats = window.PORTFOLIO_STATS || {};
  const numEls = banner.querySelectorAll('.stat-num[data-target], .stat-num[data-stat-key]');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        numEls.forEach(el => {
          const key = el.getAttribute('data-stat-key');
          const target = (key && stats[key] !== undefined)
            ? stats[key]
            : parseInt(el.getAttribute('data-target'), 10) || 0;
          animateCounter(el, target);
        });
      }
    });
  }, { threshold: 0.15 });

  observer.observe(banner);

  function animateCounter(el, target) {
    const duration = 2400;
    const startTime = performance.now();
    
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.round(easeProgress * target);
      const locale = window.currentLang === 'el' ? 'el-GR' : 'en-US';
      
      el.textContent = currentVal.toLocaleString(locale);
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString(locale);
      }
    }
    
    requestAnimationFrame(update);
  }
}
