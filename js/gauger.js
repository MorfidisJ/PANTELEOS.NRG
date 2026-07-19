/**
 * PANTELEOS.NRG — Cost Gauger Wizard Engine
 * Handles 4-step interactive estimation wizard, chip selections, slider dynamics, and animated breakdown.
 */
document.addEventListener('DOMContentLoaded', () => {
  const wizard = document.getElementById('gauger-wizard');
  if (!wizard) return;

  let step = 1;
  let sector = 'Residential';
  let scope = 'Turnkey Design & Build';
  let area = 450;
  let spec = 2;
  let totalEst = 0;
  let timelineWeeks = 16;

  const stepsEl = document.querySelectorAll('.g-step');
  const phasesEl = document.querySelectorAll('.g-phase');
  const nextBtn = document.getElementById('g-next-btn');
  const prevBtn = document.getElementById('g-prev-btn');

  // Step 1: Sector buttons
  const sectorBtns = document.querySelectorAll('#g-sec-btns button');
  sectorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sectorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      sector = btn.getAttribute('data-sec');
      validateStep();
    });
  });

  // Step 2: Scope chips
  const scopeChips = document.querySelectorAll('#g-scope-chips button');
  scopeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      scopeChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      scope = chip.getAttribute('data-scope');
      validateStep();
    });
  });

  // Step 3: Sliders
  const areaSlider = document.getElementById('g-area-input');
  const areaVal = document.getElementById('g-area-val');
  const specSlider = document.getElementById('g-spec-input');
  const specVal = document.getElementById('g-spec-val');

  if (areaSlider) {
    areaSlider.addEventListener('input', () => {
      area = parseInt(areaSlider.value, 10);
      if (areaVal) areaVal.textContent = `${area} m²`;
    });
  }

  function updateSpecValDisplay() {
    const lang = localStorage.getItem('panteleos_lang') || 'el';
    let label = lang === 'el' ? 'Βασικές Προδιαγραφές' : 'Standard Commercial';
    if (spec === 2) label = lang === 'el' ? 'Υψηλές Προδιαγραφές BIM + Η/Μ' : 'High-Performance BIM + MEP';
    if (spec === 3) label = lang === 'el' ? 'Υπερυψηλές Προδιαγραφές (Mission Critical)' : 'Ultra-High-Spec Mission Critical';
    if (specVal) specVal.textContent = label;
  }

  if (specSlider) {
    specSlider.addEventListener('input', () => {
      spec = parseInt(specSlider.value, 10);
      updateSpecValDisplay();
    });
  }

  window.updateGaugerLanguage = () => {
    updateSpecValDisplay();
    if (step === 4) {
      calculateFinal();
    }
  };

  function validateStep() {
    if (nextBtn) nextBtn.disabled = false;
  }

  function updateView() {
    stepsEl.forEach((el, idx) => {
      const s = idx + 1;
      el.classList.toggle('active', s === step);
      el.classList.toggle('done', s < step);
    });

    phasesEl.forEach((el, idx) => {
      el.classList.toggle('active', (idx + 1) === step);
    });

    if (prevBtn) prevBtn.style.visibility = step === 1 ? 'hidden' : 'visible';
    if (nextBtn) {
      nextBtn.style.display = step === 4 ? 'none' : 'inline-flex';
    }

    if (step === 4) {
      calculateFinal();
    }
  }

  function calculateFinal() {
    let baseRate = 1200;
    if (sector === 'Commercial') baseRate = 1450;
    if (sector === 'Industrial') baseRate = 1600;

    let scopeMult = 1.0;
    if (scope === 'Structural Engineering Only') scopeMult = 0.35;
    if (scope === 'MEP + Energy Upgrade') scopeMult = 0.65;
    if (scope === 'BIM & Digital Twin') scopeMult = 0.25;

    let specMult = 1.0;
    if (spec === 2) specMult = 1.35;
    if (spec === 3) specMult = 1.85;

    totalEst = Math.round(area * baseRate * scopeMult * specMult);
    timelineWeeks = Math.round(12 + (area / 45) * (spec * 0.4));

    const estOut = document.getElementById('g-est-total');
    const timeOut = document.getElementById('g-est-time');
    const noteOut = document.getElementById('g-est-note');

    if (estOut) animateNumber(estOut, totalEst, '€');
    const lang = localStorage.getItem('panteleos_lang') || 'el';
    const weeksStr = lang === 'el' ? 'ΕΒΔΟΜΑΔΕΣ' : 'WEEKS';
    if (timeOut) timeOut.textContent = `${timelineWeeks}–${timelineWeeks + 4} ${weeksStr}`;
    
    if (noteOut) {
      if (lang === 'el') {
        let secEl = sector === 'Residential' ? 'Πολυτελούς Κατοικίας' : (sector === 'Commercial' ? 'Επαγγελματικών Χώρων' : 'Βιομηχανικών & Logistics');
        let scopeEl = scope === 'Turnkey Design & Build' ? 'Μελέτη & Κατασκευή (Turnkey)' : (scope === 'Structural Engineering Only' ? 'Μόνο Στατική Μελέτη' : (scope === 'MEP + Energy Upgrade' ? 'Η/Μ & Ενεργειακή Αναβάθμιση' : 'Μοντελοποίηση BIM & Digital Twin'));
        noteOut.textContent = `Προκαταρκτική εκτίμηση για έργο ${secEl} εμβαδού ${area}m² υπό το αντικείμενο "${scopeEl}" στο Επίπεδο Προδιαγραφών ${spec}. Περιλαμβάνει πλήρη αρχιτεκτονική μοντελοποίηση BIM LOD-300 και συμμόρφωση με πολεοδομικούς κανονισμούς.`;
      } else {
        noteOut.textContent = `Preliminary estimation for ${area}m² ${sector} project under "${scope}" at Spec Tier ${spec}. Includes full architectural BIM LOD-300 modeling and regulatory compliance.`;
      }
    }

    updateBars(spec, scopeMult);
  }

  function animateNumber(el, target, prefix = '') {
    let current = 0;
    const stepVal = Math.ceil(target / 30);
    const timer = setInterval(() => {
      current += stepVal;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      const locale = window.currentLang === 'el' ? 'el-GR' : 'en-US';
      el.textContent = `${prefix}${current.toLocaleString(locale)}`;
    }, 25);
  }

  function updateBars(specLevel, scopeMult) {
    const bars = document.querySelectorAll('#g-bars i');
    const fillCount = Math.min(12, Math.round(specLevel * 3 * scopeMult + 3));
    bars.forEach((b, idx) => {
      b.classList.toggle('fill', idx < fillCount);
      b.style.height = `${Math.random() * 60 + 40}%`;
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (step < 4) { step++; updateView(); }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (step > 1) { step--; updateView(); }
    });
  }

  const restartBtn = document.getElementById('g-restart-btn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      step = 1;
      updateView();
    });
  }

  const downloadBtn = document.getElementById('g-download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const btnSpan = downloadBtn.querySelector('span');
      const lang = localStorage.getItem('panteleos_lang') || 'el';
      const origText = btnSpan ? btnSpan.innerHTML : '📄 DOWNLOAD PROPOSAL (.TXT)';

      if (btnSpan) {
        const txt = lang === 'el' ? '⏳ ΔΗΜΙΟΥΡΓΙΑ ΠΡΟΤΑΣΗΣ...' : '⏳ GENERATING PROPOSAL...';
        btnSpan.innerHTML = window.replaceEmojisWithSVG ? window.replaceEmojisWithSVG(txt) : txt;
      }
      downloadBtn.style.pointerEvents = 'none';

      setTimeout(() => {
        downloadProposal();
        if (btnSpan) {
          const txt = lang === 'el' ? '✅ ΕΠΙΤΥΧΗΣ ΛΗΨΗ ΠΡΟΤΑΣΗΣ!' : '✅ PROPOSAL DOWNLOADED!';
          btnSpan.innerHTML = window.replaceEmojisWithSVG ? window.replaceEmojisWithSVG(txt) : txt;
        }
        setTimeout(() => {
          if (btnSpan) btnSpan.innerHTML = origText;
          downloadBtn.style.pointerEvents = 'auto';
        }, 2500);
      }, 600);
    });
  }

  function downloadProposal() {
    const lang = localStorage.getItem('panteleos_lang') || 'el';
    const dateStr = new Date().toLocaleDateString(lang === 'el' ? 'el-GR' : 'en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
    const propId = 'PN-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const unitRate = Math.round(totalEst / area);
    const minWeeks = timelineWeeks;
    const maxWeeks = timelineWeeks + 4;
    const monthsEst = Math.round((minWeeks + maxWeeks) / 2 / 4.3);

    let specLabel = lang === 'el' ? 'Βασικές Προδιαγραφές / Επαγγελματικός Χώρος' : 'Standard Commercial / Basic Spec';
    if (spec === 2) specLabel = lang === 'el' ? 'Υψηλές Προδιαγραφές BIM + Η/Μ' : 'High-Performance BIM + MEP';
    if (spec === 3) specLabel = lang === 'el' ? 'Υπερ-Υψηλές Προδιαγραφές / Αρχιτεκτονικό Ορόσημο' : 'Ultra-High-Spec Mission Critical / Landmark';

    const container = document.createElement('div');
    container.style.cssText = 'width: 700px; max-width: 100%; margin: 0 auto; background: #ffffff; color: #1e293b; font-family: "Outfit", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 32px; box-sizing: border-box; line-height: 1.5; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;';

    if (lang === 'el') {
      container.innerHTML = `
        <!-- Header Banner -->
        <div style="background: #0a1428; padding: 24px 30px; border-bottom: 4px solid #00e5ff; border-radius: 8px 8px 0 0; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 2px; font-family: 'Outfit', sans-serif;">PANTELEOS <span style="color: #00e5ff;">.NRG</span></h1>
            <p style="color: #94a3b8; margin: 4px 0 0; font-size: 11px; letter-spacing: 1.5px;">ΤΕΧΝΙΚΟ ΜΕΛΕΤΗΤΙΚΟ ΓΡΑΦΕΙΟ // ISO 19650 BIM LOD-400</p>
          </div>
          <div style="color: #ffffff; font-size: 11px; text-align: right; line-height: 1.6;">
            Καραμουρτζούνη 1, Χαλκίδα, 34100<br>
            Τηλ: +30 6976837114<br>
            <span style="color: #00e5ff; font-weight: 600;">panteleos.nrg@gmail.com</span>
          </div>
        </div>

        <!-- Document Title Box -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-top: 24px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h2 style="font-size: 17px; color: #0a1428; margin: 0; font-weight: 700; letter-spacing: 0.5px;">ΠΡΟΚΑΤΑΡΚΤΙΚΟ ΤΕΥΧΟΣ ΠΡΟΫΠΟΛΟΓΙΣΜΟΥ</h2>
            <p style="font-size: 12px; color: #64748b; margin: 4px 0 0;">ΑΛΓΟΡΙΘΜΙΚΗ ΠΡΟΕΚΤΙΜΗΣΗ & ΧΡΟΝΟΔΙΑΓΡΑΜΜΑ ΥΛΟΠΟΙΗΣΗΣ</p>
          </div>
          <div style="text-align: right; font-size: 11px; color: #475569; background: #ffffff; padding: 10px 14px; border-radius: 6px; border: 1px solid #cbd5e1;">
            <div><b>ΚΩΔΙΚΟΣ:</b> <span style="color: #008cff; font-weight: 700;">${propId}</span></div>
            <div style="margin-top: 2px;"><b>ΗΜΕΡΟΜΗΝΙΑ:</b> ${dateStr}</div>
            <div style="margin-top: 2px;"><b>ΠΡΟΤΥΠΟ:</b> ISO 19650 BIM</div>
          </div>
        </div>

        <!-- Section 1: Project Parameters -->
        <h3 style="font-size: 13px; color: #0a1428; border-bottom: 2px solid #0a1428; padding-bottom: 6px; margin-top: 28px; text-transform: uppercase; letter-spacing: 1px;">01 // ΠΑΡΑΜΕΤΡΟΙ & ΤΑΥΤΟΤΗΤΑ ΕΡΓΟΥ</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px;">
          <tr style="border-bottom: 1px solid #f1f5f9; background: #f8fafc;">
            <td style="padding: 10px 12px; color: #64748b; width: 45%;">Τυπολογία / Τομέας Κτιρίου</td>
            <td style="padding: 10px 12px; color: #0a1428; font-weight: 700;">${sector}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 12px; color: #64748b;">Αντικείμενο Εργασιών & Ανάθεση</td>
            <td style="padding: 10px 12px; color: #0a1428; font-weight: 700;">${scope}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9; background: #f8fafc;">
            <td style="padding: 10px 12px; color: #64748b;">Συνολικό Μικτό Εμβαδόν (GBA)</td>
            <td style="padding: 10px 12px; color: #0a1428; font-weight: 700;">${area.toLocaleString('el-GR')} m²</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 12px; color: #64748b;">Επίπεδο Προδιαγραφών & Ποιότητας</td>
            <td style="padding: 10px 12px; color: #0a1428; font-weight: 700;">Επίπεδο ${spec} — ${specLabel}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 10px 12px; color: #64748b;">Ενεργειακός Στόχος & Βιοκλιματικά</td>
            <td style="padding: 10px 12px; color: #059669; font-weight: 700;">nZEB Κλάση Α+ (Σχεδόν Μηδενική Κατανάλωση)</td>
          </tr>
        </table>

        <!-- Section 2: Budgetary Envelope -->
        <h3 style="font-size: 13px; color: #0a1428; border-bottom: 2px solid #0a1428; padding-bottom: 6px; margin-top: 28px; text-transform: uppercase; letter-spacing: 1px;">02 // ΑΛΓΟΡΙΘΜΙΚΟΣ ΠΡΟΫΠΟΛΟΓΙΣΜΟΣ ΕΡΓΟΥ</h3>
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-left: 5px solid #008cff; border-radius: 8px; padding: 22px; display: flex; justify-content: space-between; align-items: center; margin-top: 14px;">
          <div>
            <div style="font-size: 12px; color: #2563eb; font-weight: 700; letter-spacing: 0.5px;">ΕΚΤΙΜΩΜΕΝΟ ΟΙΚΟΝΟΜΙΚΟ ΑΝΤΙΚΕΙΜΕΝΟ (ΠΛΕΟΝ ΦΠΑ)</div>
            <div style="font-size: 34px; color: #0a1428; font-weight: 800; margin-top: 4px;">€${totalEst.toLocaleString('el-GR')}</div>
            <div style="font-size: 12.5px; color: #475569; margin-top: 4px;">Εκτιμώμενο Μοναδιαίο Κόστος: <span style="color: #0a1428; font-weight: 700;">€${unitRate.toLocaleString('el-GR')} / m²</span></div>
          </div>
          <div style="background: #ffffff; padding: 14px 18px; border-radius: 8px; border: 1px solid #dbeafe; text-align: center; min-width: 170px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
            <div style="font-size: 10.5px; color: #64748b; font-weight: 600;">ΑΚΡΙΒΕΙΑ ΕΚΤΙΜΗΣΗΣ</div>
            <div style="font-size: 18px; color: #0a1428; font-weight: 800; margin-top: 2px;">± 8.5%</div>
            <div style="font-size: 9.5px; color: #94a3b8; margin-top: 2px;">Δείκτες Ελληνικής Αγοράς 2026</div>
          </div>
        </div>
        <p style="font-size: 11px; color: #64748b; margin: 10px 0 0; line-height: 1.5; font-style: italic;">* Σημείωση: Ο προϋπολογισμός περιλαμβάνει πλήρη αρχιτεκτονική μοντελοποίηση Revit BIM LOD-300, στατική ανάλυση και διεκπεραίωση αδείας δόμησης e-Άδεια ΤΕΕ.</p>

        <!-- Section 3: Execution Timeline -->
        <h3 style="font-size: 13px; color: #0a1428; border-bottom: 2px solid #0a1428; padding-bottom: 6px; margin-top: 28px; text-transform: uppercase; letter-spacing: 1px;">03 // ΧΡΟΝΟΔΙΑΓΡΑΜΜΑ & ΦΑΣΕΙΣ ΥΛΟΠΟΙΗΣΗΣ</h3>
        <div style="font-size: 13px; color: #334155; margin-top: 10px;">Συνολική Εκτιμώμενη Διάρκεια: <span style="color: #0a1428; font-weight: 700;">${minWeeks}–${maxWeeks} Εβδομάδες</span> (~${monthsEst} Μήνες)</div>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12.5px;">
          <tr style="border-bottom: 1px solid #f1f5f9; background: #f8fafc;">
            <td style="padding: 8px 10px; font-weight: 700; color: #008cff; width: 15%;">[Φάση 1]</td>
            <td style="padding: 8px 10px; color: #1e293b;">Τοπογραφική Αποτύπωση UAV & Έλεγχος Όρων Δόμησης</td>
            <td style="padding: 8px 10px; text-align: right; font-weight: 600; color: #64748b;">Εβδομάδες 1 – 3</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 10px; font-weight: 700; color: #008cff;">[Φάση 2]</td>
            <td style="padding: 8px 10px; color: #1e293b;">Αρχιτεκτονική Μελέτη & Έκδοση e-Άδειας ΤΕΕ</td>
            <td style="padding: 8px 10px; text-align: right; font-weight: 600; color: #64748b;">Εβδομάδες 4 – 10</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9; background: #f8fafc;">
            <td style="padding: 8px 10px; font-weight: 700; color: #008cff;">[Φάση 3]</td>
            <td style="padding: 8px 10px; color: #1e293b;">Στατική Ανάλυση ΕΤΑBS/SAP2000 & Αντισεισμική Θωράκιση</td>
            <td style="padding: 8px 10px; text-align: right; font-weight: 600; color: #64748b;">Εβδομάδες 11 – 14</td>
          </tr>
          <tr>
            <td style="padding: 8px 10px; font-weight: 700; color: #008cff;">[Φάση 4]</td>
            <td style="padding: 8px 10px; color: #1e293b;">Η/Μ Εγκαταστάσεις, Αυτοματισμοί KNX & Κατασκευαστική Υλοποίηση</td>
            <td style="padding: 8px 10px; text-align: right; font-weight: 600; color: #64748b;">Εβδομάδες 15 – ${maxWeeks}</td>
          </tr>
        </table>

        <!-- Section 4: Compliance Guarantees -->
        <h3 style="font-size: 13px; color: #0a1428; border-bottom: 2px solid #0a1428; padding-bottom: 6px; margin-top: 28px; text-transform: uppercase; letter-spacing: 1px;">04 // ΤΕΧΝΙΚΗ ΣΥΜΜΟΡΦΩΣΗ & ΠΡΟΔΙΑΓΡΑΦΕΣ</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; font-size: 12px; color: #334155;">
          <div style="background: #f8fafc; padding: 10px 12px; border-radius: 6px; border: 1px solid #e2e8f0;">✔ <b>Νέος Οικοδομικός Κανονισμός (ΝΟΚ)</b> & e-Άδεια ΤΕΕ</div>
          <div style="background: #f8fafc; padding: 10px 12px; border-radius: 6px; border: 1px solid #e2e8f0;">✔ <b>Αντισεισμικός Κανονισμός</b> & Ευρωκώδικες 0, 1, 2, 8</div>
          <div style="background: #f8fafc; padding: 10px 12px; border-radius: 6px; border: 1px solid #e2e8f0;">✔ <b>Κανονισμός Ενεργειακής Απόδοσης</b> (ΚΕΝΑΚ Α+ nZEB)</div>
          <div style="background: #f8fafc; padding: 10px 12px; border-radius: 6px; border: 1px solid #e2e8f0;">✔ <b>Διεθνές Πρότυπο BIM ISO 19650</b> (LOD-400 Modeling)</div>
        </div>

        <!-- Footer Signature -->
        <div style="margin-top: 36px; padding-top: 20px; border-top: 2px solid #e2e8f0; display: flex; justify-content: space-between; align-items: flex-end;">
          <div style="font-size: 11.5px; color: #64748b;">
            <div style="font-weight: 700; color: #0a1428; text-transform: uppercase; letter-spacing: 0.5px;">ΕΓΚΡΙΣΗ ΑΠΟ ΤΗ ΔΙΕΥΘΥΝΣΗ ΜΕΛΕΤΩΝ:</div>
            <div style="font-size: 15px; font-weight: 800; color: #0a1428; margin-top: 6px;">Παναγιώτης Μιχ. Παντελαίος</div>
            <div style="margin-top: 2px;">Διπλ. Ηλεκτρολόγος Μηχανικός // BEng, MSc</div>
            <div style="margin-top: 1px; color: #008cff; font-weight: 600;">Ιδρυτής & Γενικός Διευθυντής, PANTELEOS .NRG</div>
          </div>
          <div style="background: #0a1428; color: #00e5ff; padding: 12px 20px; border-radius: 8px; font-size: 10.5px; font-weight: 700; letter-spacing: 1.5px; text-align: center; border: 1px solid #008cff; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
            ΠΙΣΤΟΠΟΙΗΜΕΝΗ ΜΕΛΕΤΗ<br><span style="color: #ffffff;">ISO 19650 COUNCIL</span>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <!-- Header Banner -->
        <div style="background: #0a1428; padding: 24px 30px; border-bottom: 4px solid #00e5ff; border-radius: 8px 8px 0 0; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 800; letter-spacing: 2px; font-family: 'Outfit', sans-serif;">PANTELEOS <span style="color: #00e5ff;">.NRG</span></h1>
            <p style="color: #94a3b8; margin: 4px 0 0; font-size: 11px; letter-spacing: 1.5px;">TECHNICAL ENGINEERING OFFICE // ISO 19650 BIM LOD-400</p>
          </div>
          <div style="color: #ffffff; font-size: 11px; text-align: right; line-height: 1.6;">
            Karamourtzouni 1, Chalkida, 34100<br>
            Tel: +30 6976837114<br>
            <span style="color: #00e5ff; font-weight: 600;">panteleos.nrg@gmail.com</span>
          </div>
        </div>

        <!-- Document Title Box -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-top: 24px; display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h2 style="font-size: 17px; color: #0a1428; margin: 0; font-weight: 700; letter-spacing: 0.5px;">PRELIMINARY PROJECT BRIEF & BUDGETARY FRAMEWORK</h2>
            <p style="font-size: 12px; color: #64748b; margin: 4px 0 0;">ALGORITHMIC FEASIBILITY ASSESSMENT & TIMELINE</p>
          </div>
          <div style="text-align: right; font-size: 11px; color: #475569; background: #ffffff; padding: 10px 14px; border-radius: 6px; border: 1px solid #cbd5e1;">
            <div><b>REF CODE:</b> <span style="color: #008cff; font-weight: 700;">${propId}</span></div>
            <div style="margin-top: 2px;"><b>DATE:</b> ${dateStr}</div>
            <div style="margin-top: 2px;"><b>STANDARD:</b> ISO 19650 BIM</div>
          </div>
        </div>

        <!-- Section 1: Project Parameters -->
        <h3 style="font-size: 13px; color: #0a1428; border-bottom: 2px solid #0a1428; padding-bottom: 6px; margin-top: 28px; text-transform: uppercase; letter-spacing: 1px;">01 // PROJECT SPECIFICATIONS & PARAMETERS</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 13px;">
          <tr style="border-bottom: 1px solid #f1f5f9; background: #f8fafc;">
            <td style="padding: 10px 12px; color: #64748b; width: 45%;">Sector Typology</td>
            <td style="padding: 10px 12px; color: #0a1428; font-weight: 700;">${sector}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 12px; color: #64748b;">Scope of Works & Engagement</td>
            <td style="padding: 10px 12px; color: #0a1428; font-weight: 700;">${scope}</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9; background: #f8fafc;">
            <td style="padding: 10px 12px; color: #64748b;">Gross Building Area (GBA)</td>
            <td style="padding: 10px 12px; color: #0a1428; font-weight: 700;">${area.toLocaleString('en-US')} m²</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 10px 12px; color: #64748b;">Specification & Quality Tier</td>
            <td style="padding: 10px 12px; color: #0a1428; font-weight: 700;">Tier ${spec} — ${specLabel}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 10px 12px; color: #64748b;">Energy Classification Target</td>
            <td style="padding: 10px 12px; color: #059669; font-weight: 700;">nZEB Class A+ (Nearly Zero Energy Building)</td>
          </tr>
        </table>

        <!-- Section 2: Budgetary Envelope -->
        <h3 style="font-size: 13px; color: #0a1428; border-bottom: 2px solid #0a1428; padding-bottom: 6px; margin-top: 28px; text-transform: uppercase; letter-spacing: 1px;">02 // ALGORITHMIC BUDGETARY ENVELOPE</h3>
        <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-left: 5px solid #008cff; border-radius: 8px; padding: 22px; display: flex; justify-content: space-between; align-items: center; margin-top: 14px;">
          <div>
            <div style="font-size: 12px; color: #2563eb; font-weight: 700; letter-spacing: 0.5px;">PROJECTED FINANCIAL ENVELOPE (EXCL. VAT)</div>
            <div style="font-size: 34px; color: #0a1428; font-weight: 800; margin-top: 4px;">€${totalEst.toLocaleString('en-US')}</div>
            <div style="font-size: 12.5px; color: #475569; margin-top: 4px;">Estimated Unit Cost: <span style="color: #0a1428; font-weight: 700;">€${unitRate.toLocaleString('en-US')} / m²</span></div>
          </div>
          <div style="background: #ffffff; padding: 14px 18px; border-radius: 8px; border: 1px solid #dbeafe; text-align: center; min-width: 170px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
            <div style="font-size: 10.5px; color: #64748b; font-weight: 600;">BUDGET CONFIDENCE</div>
            <div style="font-size: 18px; color: #0a1428; font-weight: 800; margin-top: 2px;">± 8.5%</div>
            <div style="font-size: 9.5px; color: #94a3b8; margin-top: 2px;">Greek Market Index 2026</div>
          </div>
        </div>
        <p style="font-size: 11px; color: #64748b; margin: 10px 0 0; line-height: 1.5; font-style: italic;">* Note: The budgetary envelope includes comprehensive 3D BIM LOD-300 modeling, structural finite element analysis, and e-Adeia permitting compliance.</p>

        <!-- Section 3: Execution Timeline -->
        <h3 style="font-size: 13px; color: #0a1428; border-bottom: 2px solid #0a1428; padding-bottom: 6px; margin-top: 28px; text-transform: uppercase; letter-spacing: 1px;">03 // PROJECTED EXECUTION TIMELINE & MILESTONES</h3>
        <div style="font-size: 13px; color: #334155; margin-top: 10px;">Total Projected Duration: <span style="color: #0a1428; font-weight: 700;">${minWeeks}–${maxWeeks} Weeks</span> (~${monthsEst} Months)</div>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12.5px;">
          <tr style="border-bottom: 1px solid #f1f5f9; background: #f8fafc;">
            <td style="padding: 8px 10px; font-weight: 700; color: #008cff; width: 15%;">[Phase 1]</td>
            <td style="padding: 8px 10px; color: #1e293b;">Topographic UAV Survey & Zoning Check</td>
            <td style="padding: 8px 10px; text-align: right; font-weight: 600; color: #64748b;">Weeks 1 – 3</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9;">
            <td style="padding: 8px 10px; font-weight: 700; color: #008cff;">[Phase 2]</td>
            <td style="padding: 8px 10px; color: #1e293b;">Architectural Study & e-Adeia Permitting</td>
            <td style="padding: 8px 10px; text-align: right; font-weight: 600; color: #64748b;">Weeks 4 – 10</td>
          </tr>
          <tr style="border-bottom: 1px solid #f1f5f9; background: #f8fafc;">
            <td style="padding: 8px 10px; font-weight: 700; color: #008cff;">[Phase 3]</td>
            <td style="padding: 8px 10px; color: #1e293b;">Structural ETABS/SAP2000 Seismic Analysis</td>
            <td style="padding: 8px 10px; text-align: right; font-weight: 600; color: #64748b;">Weeks 11 – 14</td>
          </tr>
          <tr>
            <td style="padding: 8px 10px; font-weight: 700; color: #008cff;">[Phase 4]</td>
            <td style="padding: 8px 10px; color: #1e293b;">MEP HVAC Automation & Turnkey Execution</td>
            <td style="padding: 8px 10px; text-align: right; font-weight: 600; color: #64748b;">Weeks 15 – ${maxWeeks}</td>
          </tr>
        </table>

        <!-- Section 4: Compliance Guarantees -->
        <h3 style="font-size: 13px; color: #0a1428; border-bottom: 2px solid #0a1428; padding-bottom: 6px; margin-top: 28px; text-transform: uppercase; letter-spacing: 1px;">04 // TECHNICAL COMPLIANCE & QUALITY GUARANTEE</h3>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; font-size: 12px; color: #334155;">
          <div style="background: #f8fafc; padding: 10px 12px; border-radius: 6px; border: 1px solid #e2e8f0;">✔ <b>Greek New Building Code (NOK)</b> & e-Adeia</div>
          <div style="background: #f8fafc; padding: 10px 12px; border-radius: 6px; border: 1px solid #e2e8f0;">✔ <b>Greek Seismic Code (EAK/EKOS)</b> & Eurocodes</div>
          <div style="background: #f8fafc; padding: 10px 12px; border-radius: 6px; border: 1px solid #e2e8f0;">✔ <b>KENAK Energy Regulations</b> (nZEB Class A+)</div>
          <div style="background: #f8fafc; padding: 10px 12px; border-radius: 6px; border: 1px solid #e2e8f0;">✔ <b>ISO 19650 Standard</b> (BIM LOD-400 Management)</div>
        </div>

        <!-- Footer Signature -->
        <div style="margin-top: 36px; padding-top: 20px; border-top: 2px solid #e2e8f0; display: flex; justify-content: space-between; align-items: flex-end;">
          <div style="font-size: 11.5px; color: #64748b;">
            <div style="font-weight: 700; color: #0a1428; text-transform: uppercase; letter-spacing: 0.5px;">AUTHORIZED BY THE ENGINEERING COUNCIL:</div>
            <div style="font-size: 15px; font-weight: 800; color: #0a1428; margin-top: 6px;">Panagiotis M. Panteleos</div>
            <div style="margin-top: 2px;">BEng, MSc Electrical Engineering</div>
            <div style="margin-top: 1px; color: #008cff; font-weight: 600;">Founder & Managing Director, PANTELEOS .NRG</div>
          </div>
          <div style="background: #0a1428; color: #00e5ff; padding: 12px 20px; border-radius: 8px; font-size: 10.5px; font-weight: 700; letter-spacing: 1.5px; text-align: center; border: 1px solid #008cff; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
            CERTIFIED STUDY<br><span style="color: #ffffff;">ISO 19650 COUNCIL</span>
          </div>
        </div>
      `;
    }
    if (window.replaceEmojisWithSVG) {
      container.innerHTML = window.replaceEmojisWithSVG(container.innerHTML);
    }

    const opt = {
      margin:       [10, 10, 10, 10],
      filename:     `PANTELEOS_NRG_Proposal_${propId}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 3, useCORS: true, scrollX: 0, scrollY: 0 },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    if (typeof html2pdf !== 'undefined') {
      html2pdf().set(opt).from(container.outerHTML, 'string').save();
    } else {
      const printWin = window.open('', '_blank');
      printWin.document.write('<html><head><title>' + opt.filename + '</title><style>body { margin: 0; font-family: sans-serif; }</style></head><body>' + container.outerHTML + '</body></html>');
      printWin.document.close();
      printWin.focus();
      setTimeout(() => {
        printWin.print();
      }, 500);
    }
  }

  updateView();
});
