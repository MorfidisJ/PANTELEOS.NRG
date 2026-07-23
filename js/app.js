/**
 * PANTELEOS.NRG — Core Application Controller
 * Handles Loader, Navigation, Scroll Spy, Stream Indicator, Reveal Animations & Contact Form
 */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNav();
  initScrollSpy();
  initReveal();
  initContactForm();
  initTeaserSliders();
  initServices();
});

/* --- Loader & Stream Indicator --- */
function initLoader() {
  const loader = document.getElementById('loader');
  const counter = document.getElementById('loader-counter');
  const barFill = document.getElementById('loader-bar-fill');
  const fileSpan = document.getElementById('loader-file');
  if (!loader) return;

  const assetsToLoad = [
    { name: 'Google Typography (Outfit, JetBrains Mono)', type: 'font' },
    { name: 'assets/logo.png', type: 'img', url: 'assets/logo.png' },
    { name: 'assets/team-hero.jpg', type: 'img', url: 'assets/team-hero.jpg' },
    { name: 'assets/favicon.png', type: 'img', url: 'assets/favicon.png' },
    { name: 'BIM LOD-400 Blueprint Engine', type: 'system' },
    { name: 'Seismic Eurocode Simulation Mesh', type: 'system' }
  ];

  // Dynamically queue all DOM images
  document.querySelectorAll('img').forEach(img => {
    if (img.src && !assetsToLoad.some(a => a.url === img.src)) {
      const filename = img.src.split('/').pop() || 'image asset';
      assetsToLoad.push({ name: filename, type: 'img', url: img.src });
    }
  });

  let loadedCount = 0;
  const totalAssets = assetsToLoad.length;

  function updateProgress(forceComplete = false) {
    const progress = forceComplete ? 100 : Math.min(Math.round((loadedCount / totalAssets) * 100), 99);
    if (barFill) barFill.style.width = `${progress}%`;
    if (counter) {
      const numStr = String(progress).padStart(2, '0');
      counter.textContent = `${numStr}% // ${progress === 100 ? 'COMMISSIONING READY' : 'INITIALIZING MATRIX'}`;
    }
  }

  function onAssetLoad(assetName, isSuccess = true) {
    loadedCount++;
    if (fileSpan) fileSpan.textContent = `loaded: ${assetName}`;
    updateProgress();

    if (loadedCount >= totalAssets) {
      finishLoading();
    }
  }

  let isFinished = false;
  function finishLoading() {
    if (isFinished) return;
    isFinished = true;
    if (fileSpan) fileSpan.textContent = 'all assets verified.';
    updateProgress(true);

    setTimeout(() => {
      loader.classList.add('hide');
    }, 600);
  }

  assetsToLoad.forEach(asset => {
    if (asset.type === 'font') {
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => onAssetLoad(asset.name)).catch(() => onAssetLoad(asset.name));
      } else {
        setTimeout(() => onAssetLoad(asset.name), 300);
      }
    } else if (asset.type === 'img' && asset.url) {
      const img = new Image();
      img.onload = () => onAssetLoad(asset.name);
      img.onerror = () => onAssetLoad(asset.name, false);
      img.src = asset.url;
    } else {
      const delay = Math.floor(Math.random() * 400) + 200;
      setTimeout(() => onAssetLoad(asset.name), delay);
    }
  });

  // Fallback safety timeout so user is never stuck
  setTimeout(() => {
    if (!isFinished) {
      finishLoading();
    }
  }, 3500);
}

/* --- Navbar & Mobile Hamburger --- */
function initNav() {
  const nav = document.getElementById('site-nav');
  const ham = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
    updateScrollProgress();
  }, { passive: true });

  if (ham && links) {
    ham.addEventListener('click', () => {
      ham.classList.toggle('open');
      links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        ham.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }
}

function updateScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
  bar.style.width = `${pct}%`;
}

/* --- Scroll Spy & Stream Indicator Navigation --- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });

        const dockItems = document.querySelectorAll('.mobile-app-dock .dock-item');
        dockItems.forEach(item => {
          item.classList.toggle('active', item.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(sec => observer.observe(sec));
}

/* --- Reveal on Scroll --- */
function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* --- Mini Gauge Teaser Sliders --- */
function initTeaserSliders() {
  const areaSlider = document.getElementById('teaser-area');
  const compSlider = document.getElementById('teaser-complexity');
  const areaVal = document.getElementById('t-area-val');
  const compVal = document.getElementById('t-comp-val');
  const output = document.getElementById('t-est-output');

  if (!areaSlider || !compSlider || !output) return;

  function calc() {
    const a = parseInt(areaSlider.value, 10);
    const c = parseInt(compSlider.value, 10);
    if (areaVal) areaVal.textContent = `${a} m²`;
    
    let cLabel = 'Standard';
    let mult = 1150;
    if (c === 2) { cLabel = 'Advanced (BIM + MEP)'; mult = 1550; }
    if (c === 3) { cLabel = 'High-Spec Technical'; mult = 2100; }
    if (compVal) compVal.textContent = cLabel;

    const total = a * mult;
    const locale = window.currentLang === 'el' ? 'el-GR' : 'en-US';
    output.textContent = `€${total.toLocaleString(locale)}`;
  }

  areaSlider.addEventListener('input', calc);
  compSlider.addEventListener('input', calc);
  calc();
}

/* --- Services Matrix Toggle --- */
function initServices() {
  const cards = document.querySelectorAll('.service-card');
  cards.forEach(card => {
    const toggle = card.querySelector('.service-toggle');
    if (toggle) {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = card.classList.contains('open');
        cards.forEach(c => c.classList.remove('open'));
        if (!isOpen) card.classList.add('open');
      });
    }
  });
}

/* --- Contact Form Conditional Fields --- */
function initContactForm() {
  const roleSelect = document.getElementById('contact-role');
  const condFields = document.querySelectorAll('.conditional-field');
  const form = document.getElementById('nrg-contact-form');
  const successBox = document.getElementById('contact-success');

  if (roleSelect) {
    roleSelect.addEventListener('change', () => {
      const val = roleSelect.value;
      condFields.forEach(f => {
        f.classList.toggle('show', f.getAttribute('data-role') === val);
      });
    });
  }

  const showFieldError = (inputEl, msgText) => {
    if (!inputEl) return;
    inputEl.style.borderColor = '#FF3B30';
    const field = inputEl.closest('.form-field');
    if (field && !field.querySelector('.error-hint')) {
      const hint = document.createElement('span');
      hint.className = 'error-hint';
      hint.style.color = '#FF3B30';
      hint.style.fontSize = '12px';
      hint.style.marginTop = '4px';
      hint.style.display = 'block';
      hint.textContent = msgText;
      field.appendChild(hint);
    }
    inputEl.focus();
  };

  if (form) {
    form.querySelectorAll('input, textarea, select').forEach(el => {
      el.addEventListener('input', () => {
        el.style.borderColor = '';
        const field = el.closest('.form-field');
        const hint = field?.querySelector('.error-hint');
        if (hint) hint.remove();
      });
    });
  }

  if (form && successBox) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      form.querySelectorAll('.error-hint').forEach(el => el.remove());
      form.querySelectorAll('input, textarea').forEach(el => el.style.borderColor = '');

      const activeLang = window.currentLang || localStorage.getItem('panteleos_lang') || 'el';
      const isEl = activeLang === 'el';

      // Validate Email
      const emailEl = document.getElementById('c-email');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailEl && !emailRegex.test(emailEl.value.trim())) {
        showFieldError(emailEl, isEl ? 'Μη έγκυρη μορφή διεύθυνσης email.' : 'Invalid corporate email address format.');
        return;
      }

      // Validate Phone if provided
      const telEl = document.getElementById('c-tel');
      if (telEl && telEl.value.trim() !== '') {
        const phoneClean = telEl.value.trim().replace(/[-()\s]/g, '');
        const phoneRegex = /^(\+3069\d{8}|003069\d{8}|69\d{8}|\+?\d{8,15})$/;
        if (!phoneRegex.test(phoneClean)) {
          showFieldError(telEl, isEl ? 'Παρακαλώ εισάγετε έγκυρο τηλέφωνο (π.χ. +30 69xxxxxxxx).' : 'Please enter a valid telephone number (e.g. +30 69xxxxxxxx or 10-digit number).');
          return;
        }
      }

      // Validate Contractor / TEE license if role is contractor and field is filled
      if (roleSelect && roleSelect.value === 'contractor') {
        const contEl = document.getElementById('cont-license');
        if (contEl && contEl.value.trim() !== '') {
          const teeRegex = /^[0-9A-Za-z\s-]{4,15}$/;
          if (!teeRegex.test(contEl.value.trim())) {
            showFieldError(contEl, isEl ? 'Μη έγκυρος αριθμός μητρώου ΤΕΕ/Εταιρείας.' : 'Invalid TEE or company registration number format.');
            return;
          }
        }
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.textContent = isEl ? 'ΑΠΟΣΤΟΛΗ...' : 'SUBMITTING INQUIRY...';
      
      setTimeout(() => {
        form.style.display = 'none';
        successBox.classList.add('show');
      }, 800);
    });
  }
}

/* --- Accessibility Focus Trap Utility --- */
function trapFocus(modal) {
  if (!modal) return () => {};
  const focusable = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (focusable.length === 0) return () => {};
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  function handleTab(e) {
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  modal.addEventListener('keydown', handleTab);
  first?.focus();
  return () => modal.removeEventListener('keydown', handleTab);
}
window.trapFocus = trapFocus;
