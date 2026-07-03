/**
 * PANTELEOS.NRG — Protocol Tracker & FAQ Search Engine
 * Handles client protocol tracking with simulated registry query delays and live search-as-you-type FAQ.
 */
document.addEventListener('DOMContentLoaded', () => {
  initProtocolTracker();
  initFAQ();
});

/* --- Protocol Tracker --- */
function initProtocolTracker() {
  const input = document.getElementById('tracker-input');
  const btn = document.getElementById('tracker-btn');
  const resultEl = document.getElementById('tracker-result');
  const errorEl = document.getElementById('tracker-error');

  if (!input || !btn) return;

  const demoRegistry = {
    'PN-2024-1187': {
      title: 'THESSALONIKI PORT BIO-CLUSTER',
      status: 'PHASE 03 // BIM STRUCTURAL VALIDATION',
      step: 3
    },
    'PN-2024-0932': {
      title: 'ATTIKA HIGH-VOLTAGE SUBSTATION',
      status: 'PHASE 04 // ON-SITE EXECUTION & MEP COMMISSIONING',
      step: 4
    },
    'PN-2025-0104': {
      title: 'OLYMPUS RIDGE ECO-RESORT',
      status: 'PHASE 01 // ARCHITECTURAL BRIEF & FEASIBILITY',
      step: 1
    }
  };

  function handleCheck() {
    const query = input.value.trim().toUpperCase();
    if (!query) return;

    btn.textContent = 'QUERYING REGISTRY...';
    btn.disabled = true;
    if (resultEl) resultEl.classList.remove('show');
    if (errorEl) errorEl.classList.remove('show');

    setTimeout(() => {
      btn.textContent = 'QUERY PROTOCOL';
      btn.disabled = false;

      const data = demoRegistry[query];
      if (data) {
        if (resultEl) {
          resultEl.querySelector('.proj-id').textContent = `PROTOCOL // ${query}`;
          resultEl.querySelector('h4').textContent = data.title;
          
          const steps = resultEl.querySelectorAll('.track-step');
          steps.forEach((st, idx) => {
            const sNum = idx + 1;
            st.classList.toggle('done', sNum < data.step);
            st.classList.toggle('current', sNum === data.step);
          });
          resultEl.classList.add('show');
        }
      } else {
        if (errorEl) {
          errorEl.textContent = `[ERR 404] Protocol ID "${query}" not found in active NRG database. Try demo keys: PN-2024-1187 or PN-2024-0932.`;
          errorEl.classList.add('show');
        }
      }
    }, 600);
  }

  btn.addEventListener('click', handleCheck);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleCheck();
  });
}

/* --- FAQ Accordion & Live Search --- */
function initFAQ() {
  const items = document.querySelectorAll('.faq-item');
  const searchInput = document.getElementById('faq-search-input');
  const emptyEl = document.getElementById('faq-empty');

  items.forEach(item => {
    const qBtn = item.querySelector('.faq-q');
    if (qBtn) {
      qBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        items.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const term = searchInput.value.trim().toLowerCase();
      let matches = 0;

      items.forEach(item => {
        const qText = item.querySelector('.faq-q')?.textContent.toLowerCase() || '';
        const aText = item.querySelector('.faq-a')?.textContent.toLowerCase() || '';
        
        if (!term || qText.includes(term) || aText.includes(term)) {
          item.style.display = '';
          matches++;
          if (term && qText.includes(term)) item.classList.add('open');
        } else {
          item.style.display = 'none';
          item.classList.remove('open');
        }
      });

      if (emptyEl) {
        emptyEl.classList.toggle('show', matches === 0 && term.length > 0);
      }
    });
  }
}
