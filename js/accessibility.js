/**
 * PANTELEOS.NRG — Accessibility Matrix Widget
 * Handles contrast modes, text sizing, dyslexic-friendly fonts, outline highlight, and motion reduction.
 */
document.addEventListener('DOMContentLoaded', () => {
  initAccessibilityWidget();
});

const ACC_LANG = {
  en: {
    title: "Accessibility Options",
    contrast: "Contrast Mode",
    contrastNormal: "Normal",
    contrastHigh: "High Contrast",
    contrastInvert: "Invert Colors",
    textSize: "Text Size",
    textNormal: "Normal",
    textLarge: "Large (+15%)",
    textXlarge: "Extra Large (+30%)",
    font: "Legible Font",
    fontNormal: "Standard",
    fontDyslexic: "Dyslexic Friendly",
    links: "Link Highlights",
    animations: "Motion & Effects",
    reset: "Reset All Options",
    enabled: "Enabled",
    disabled: "Disabled",
    on: "On",
    off: "Off"
  },
  el: {
    title: "Προσβασιμότητα",
    contrast: "Λειτουργία Αντίθεσης",
    contrastNormal: "Κανονική",
    contrastHigh: "Υψηλή Αντίθεση",
    contrastInvert: "Αναστροφή",
    textSize: "Μέγεθος Κειμένου",
    textNormal: "Κανονικό",
    textLarge: "Μεγάλο (+15%)",
    textXlarge: "Πολύ Μεγάλο (+30%)",
    font: "Γραμματοσειρά",
    fontNormal: "Κανονική",
    fontDyslexic: "Για Δυσλεξία",
    links: "Τονισμός Συνδέσμων",
    animations: "Κίνηση & Εφέ",
    reset: "Επαναφορά Ρυθμίσεων",
    enabled: "Ενεργά",
    disabled: "Ανενεργά",
    on: "Ενεργό",
    off: "Ανενεργό"
  }
};

function initAccessibilityWidget() {
  // Inject widget HTML
  const widgetHtml = `
    <div id="acc-widget" class="acc-widget">
      <button id="acc-toggle-btn" class="acc-toggle-btn" aria-label="Accessibility Options / Επιλογές Προσβασιμότητας" aria-expanded="false" aria-haspopup="true">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" style="display:block; transition: transform 0.3s ease;">
          <circle cx="12" cy="4.5" r="2.3"/>
          <path d="M18.5 8.5c-2.3.6-4.4.8-6.5.8s-4.2-.2-6.5-.8l-.6 1.8c2.4.7 4.7.9 7.1.9v3.8l-3.2 5.5h2.2l2.1-3.6 2.1 3.6h2.2l-3.2-5.5V11.2c2.4 0 4.7-.2 7.1-.9l-.6-1.8z"/>
        </svg>
      </button>
      <div id="acc-menu" class="acc-menu" aria-hidden="true">
        <div class="acc-menu-header">
          <h3 id="acc-title">Accessibility Options</h3>
          <button id="acc-close" class="acc-close" aria-label="Close Options Panel">✕</button>
        </div>
        <div class="acc-menu-body">
          <div class="acc-option">
            <span class="acc-label" id="acc-label-contrast">Contrast Mode</span>
            <div class="acc-buttons">
              <button class="acc-btn active" data-acc-contrast="normal" id="acc-contrast-normal">Normal</button>
              <button class="acc-btn" data-acc-contrast="high" id="acc-contrast-high">High</button>
              <button class="acc-btn" data-acc-contrast="invert" id="acc-contrast-invert">Invert</button>
            </div>
          </div>
          <div class="acc-option">
            <span class="acc-label" id="acc-label-text">Text Size</span>
            <div class="acc-buttons">
              <button class="acc-btn active" data-acc-text="normal" id="acc-text-normal">Normal</button>
              <button class="acc-btn" data-acc-text="large" id="acc-text-large">Large</button>
              <button class="acc-btn" data-acc-text="xlarge" id="acc-text-xlarge">Extra Large</button>
            </div>
          </div>
          <div class="acc-option">
            <span class="acc-label" id="acc-label-font">Legible Font</span>
            <div class="acc-buttons two-cols">
              <button class="acc-btn active" data-acc-font="normal" id="acc-font-normal">Standard</button>
              <button class="acc-btn" data-acc-font="dyslexic" id="acc-font-dyslexic">Dyslexic</button>
            </div>
          </div>
          <div class="acc-option">
            <span class="acc-label" id="acc-label-links">Link Highlights</span>
            <button class="acc-toggle-switch" id="acc-toggle-links" role="switch" aria-checked="false">Off</button>
          </div>
          <div class="acc-option">
            <span class="acc-label" id="acc-label-animations">Animations</span>
            <button class="acc-toggle-switch" id="acc-toggle-animations" role="switch" aria-checked="false">Enabled</button>
          </div>
        </div>
        <div class="acc-menu-footer">
          <button class="acc-reset-btn" id="acc-reset">Reset All Options</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', widgetHtml);

  const widget = document.getElementById('acc-widget');
  const toggleBtn = document.getElementById('acc-toggle-btn');
  const menu = document.getElementById('acc-menu');
  const closeBtn = document.getElementById('acc-close');
  const resetBtn = document.getElementById('acc-reset');

  if (!widget || !toggleBtn || !menu) return;

  // State Management
  const state = {
    contrast: localStorage.getItem('acc_contrast') || 'normal',
    text: localStorage.getItem('acc_text') || 'normal',
    font: localStorage.getItem('acc_font') || 'normal',
    links: localStorage.getItem('acc_links') === 'true',
    animations: localStorage.getItem('acc_animations') !== 'false' // default enabled
  };

  // Toggle Panel
  const openMenu = () => {
    menu.classList.add('open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    menu.setAttribute('aria-hidden', 'false');
  };

  const closeMenu = () => {
    menu.classList.remove('open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-hidden', 'true');
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  
  document.addEventListener('click', (e) => {
    if (!widget.contains(e.target)) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Apply State Changes to DOM
  const applySettings = () => {
    const body = document.body;
    const html = document.documentElement;

    // 1. Contrast
    body.classList.remove('acc-high-contrast', 'acc-invert');
    document.querySelectorAll('[data-acc-contrast]').forEach(b => b.classList.remove('active'));
    if (state.contrast === 'high') {
      body.classList.add('acc-high-contrast');
      document.getElementById('acc-contrast-high')?.classList.add('active');
    } else if (state.contrast === 'invert') {
      body.classList.add('acc-invert');
      document.getElementById('acc-contrast-invert')?.classList.add('active');
    } else {
      document.getElementById('acc-contrast-normal')?.classList.add('active');
    }
    localStorage.setItem('acc_contrast', state.contrast);

    // 2. Text Size
    html.style.fontSize = '';
    body.classList.remove('acc-text-large', 'acc-text-xlarge');
    document.querySelectorAll('[data-acc-text]').forEach(b => b.classList.remove('active'));
    if (state.text === 'large') {
      html.style.fontSize = '112%';
      body.classList.add('acc-text-large');
      document.getElementById('acc-text-large')?.classList.add('active');
    } else if (state.text === 'xlarge') {
      html.style.fontSize = '122%';
      body.classList.add('acc-text-xlarge');
      document.getElementById('acc-text-xlarge')?.classList.add('active');
    } else {
      document.getElementById('acc-text-normal')?.classList.add('active');
    }
    localStorage.setItem('acc_text', state.text);

    // 3. Legible Font
    body.classList.remove('acc-dyslexic-font');
    document.querySelectorAll('[data-acc-font]').forEach(b => b.classList.remove('active'));
    if (state.font === 'dyslexic') {
      body.classList.add('acc-dyslexic-font');
      document.getElementById('acc-font-dyslexic')?.classList.add('active');
    } else {
      document.getElementById('acc-font-normal')?.classList.add('active');
    }
    localStorage.setItem('acc_font', state.font);

    // 4. Link Highlight
    const linksSwitch = document.getElementById('acc-toggle-links');
    if (state.links) {
      body.classList.add('acc-highlight-links');
      if (linksSwitch) {
        linksSwitch.classList.add('active');
        linksSwitch.setAttribute('aria-checked', 'true');
      }
    } else {
      body.classList.remove('acc-highlight-links');
      if (linksSwitch) {
        linksSwitch.classList.remove('active');
        linksSwitch.setAttribute('aria-checked', 'false');
      }
    }
    localStorage.setItem('acc_links', state.links);

    // 5. Animations
    const animSwitch = document.getElementById('acc-toggle-animations');
    if (!state.animations) {
      body.classList.add('acc-stop-animations');
      if (animSwitch) {
        animSwitch.classList.add('active');
        animSwitch.setAttribute('aria-checked', 'true');
      }
    } else {
      body.classList.remove('acc-stop-animations');
      if (animSwitch) {
        animSwitch.classList.remove('active');
        animSwitch.setAttribute('aria-checked', 'false');
      }
    }
    localStorage.setItem('acc_animations', state.animations);

    updateTexts();
  };

  // Click Handlers
  document.querySelectorAll('[data-acc-contrast]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.contrast = btn.getAttribute('data-acc-contrast') || 'normal';
      applySettings();
    });
  });

  document.querySelectorAll('[data-acc-text]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.text = btn.getAttribute('data-acc-text') || 'normal';
      applySettings();
    });
  });

  document.querySelectorAll('[data-acc-font]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.font = btn.getAttribute('data-acc-font') || 'normal';
      applySettings();
    });
  });

  const linksSwitch = document.getElementById('acc-toggle-links');
  if (linksSwitch) {
    linksSwitch.addEventListener('click', () => {
      state.links = !state.links;
      applySettings();
    });
  }

  const animSwitch = document.getElementById('acc-toggle-animations');
  if (animSwitch) {
    animSwitch.addEventListener('click', () => {
      state.animations = !state.animations;
      applySettings();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state.contrast = 'normal';
      state.text = 'normal';
      state.font = 'normal';
      state.links = false;
      state.animations = true;
      applySettings();
    });
  }

  // Update UI Language
  const updateTexts = (forcedLang) => {
    const lang = forcedLang || window.currentLang || localStorage.getItem('panteleos_lang') || document.documentElement.lang || 'el';
    const dict = ACC_LANG[lang] || ACC_LANG.el;

    const titleEl = document.getElementById('acc-title');
    const labelContrast = document.getElementById('acc-label-contrast');
    const labelText = document.getElementById('acc-label-text');
    const labelFont = document.getElementById('acc-label-font');
    const labelLinks = document.getElementById('acc-label-links');
    const labelAnim = document.getElementById('acc-label-animations');

    const contrastNormal = document.getElementById('acc-contrast-normal');
    const contrastHigh = document.getElementById('acc-contrast-high');
    const contrastInvert = document.getElementById('acc-contrast-invert');

    const textNormal = document.getElementById('acc-text-normal');
    const textLarge = document.getElementById('acc-text-large');
    const textXlarge = document.getElementById('acc-text-xlarge');

    const fontNormal = document.getElementById('acc-font-normal');
    const fontDyslexic = document.getElementById('acc-font-dyslexic');

    const linksSwitch = document.getElementById('acc-toggle-links');
    const animSwitch = document.getElementById('acc-toggle-animations');

    if (titleEl) titleEl.textContent = dict.title;
    if (labelContrast) labelContrast.textContent = dict.contrast;
    if (labelText) labelText.textContent = dict.textSize;
    if (labelFont) labelFont.textContent = dict.font;
    if (labelLinks) labelLinks.textContent = dict.links;
    if (labelAnim) labelAnim.textContent = dict.animations;

    if (contrastNormal) contrastNormal.textContent = dict.contrastNormal;
    if (contrastHigh) contrastHigh.textContent = dict.contrastHigh;
    if (contrastInvert) contrastInvert.textContent = dict.contrastInvert;

    if (textNormal) textNormal.textContent = dict.textNormal;
    if (textLarge) textLarge.textContent = dict.textLarge;
    if (textXlarge) textXlarge.textContent = dict.textXlarge;

    if (fontNormal) fontNormal.textContent = dict.fontNormal;
    if (fontDyslexic) fontDyslexic.textContent = dict.fontDyslexic;

    if (linksSwitch) linksSwitch.textContent = state.links ? dict.on : dict.off;
    if (animSwitch) animSwitch.textContent = state.animations ? dict.enabled : dict.disabled;

    if (resetBtn) resetBtn.textContent = dict.reset;
  };

  // Expose language change trigger to i18n
  window.updateAccessibilityLanguage = (lang) => {
    updateTexts(lang);
  };

  // Initial execution
  applySettings();
}
