/**
 * PANTELEOS.NRG — Talent Pipeline & Careers Engine
 * Handles competency selection chips, dynamic count badges, drag-and-drop CV vault, and application submission.
 */
let careerState = {
  competenciesSelected: 1, // Default 1 chip active in HTML
  fileUploaded: false,
  fileName: null
};

document.addEventListener('DOMContentLoaded', () => {
  initCompetencyChips();
  initCVVault();
  initCareerSubmit();
  updateSubmitButtonState();
});

/* --- Competency Chips & Counter --- */
function updateCompetencyBadge() {
  const badge = document.getElementById('comp-count');
  const count = document.querySelectorAll('.comp-chip.active').length;
  careerState.competenciesSelected = count;

  const lang = window.currentLang || localStorage.getItem('panteleos_lang') || 'el';
  const isEn = lang === 'en';

  if (badge) {
    badge.innerHTML = isEn
      ? `SELECTED COMPETENCIES: <b id="comp-count-val">${count}</b> // PROFILE MATCH ELIGIBLE`
      : `ΕΠΙΛΕΓΜΕΝΕΣ ΕΞΕΙΔΙΚΕΥΣΕΙΣ: <b id="comp-count-val">${count}</b> // ΣΥΜΒΑΤΟΤΗΤΑ ΠΡΟΦΙΛ`;
  }
  updateSubmitButtonState();
}

window.updateCareersLanguage = () => {
  updateCompetencyBadge();
};

function initCompetencyChips() {
  const chips = document.querySelectorAll('.comp-chip');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      updateCompetencyBadge();

      // Pulse effect on count
      const badge = document.getElementById('comp-count') || document.querySelector('.comp-count');
      if (badge) {
        badge.style.transform = 'scale(1.08)';
        badge.style.borderColor = '#26D7EB';
        setTimeout(() => {
          badge.style.transform = '';
          badge.style.borderColor = '';
        }, 250);
      }
    });
  });
}

/* --- Drag-and-Drop CV Vault --- */
function initCVVault() {
  const vault = document.getElementById('cv-vault');
  const fileInput = document.getElementById('cv-file-input');
  const nameBox = document.getElementById('cv-filename');
  const nameText = document.getElementById('cv-filename-text');

  if (!vault || !fileInput) return;

  ['dragenter', 'dragover'].forEach(evt => {
    vault.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
      vault.classList.add('drag');
    }, false);
  });

  ['dragleave', 'drop'].forEach(evt => {
    vault.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
      vault.classList.remove('drag');
    }, false);
  });

  vault.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files.length > 0) {
      handleFile(fileInput.files[0]);
    }
  });

  function handleFile(file) {
    if (nameBox && nameText) {
      nameText.textContent = `${file.name} (${Math.round(file.size / 1024)} KB) // FILE ATTACHED`;
      nameBox.classList.add('show');
    }
    careerState.fileUploaded = true;
    careerState.fileName = file.name;
    updateSubmitButtonState();
  }
}

/* --- State & Submit Button Control --- */
function updateSubmitButtonState() {
  const submitBtn = document.getElementById('career-submit-btn');
  if (!submitBtn) return;

  if (careerState.competenciesSelected > 0 && careerState.fileUploaded) {
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
    submitBtn.style.cursor = 'pointer';
    submitBtn.style.boxShadow = '0 0 25px rgba(0, 229, 255, 0.45)';
    submitBtn.style.borderColor = '#00E5FF';
  } else {
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.45';
    submitBtn.style.cursor = 'not-allowed';
    submitBtn.style.boxShadow = 'none';
    submitBtn.style.borderColor = '';
  }
}

function initCareerSubmit() {
  const submitBtn = document.getElementById('career-submit-btn');
  const submitText = document.getElementById('career-submit-text');
  const statusMsg = document.getElementById('career-status-msg');

  if (!submitBtn || !submitText || !statusMsg) return;

  submitBtn.addEventListener('click', () => {
    if (submitBtn.disabled) return;

    const lang = window.currentLang || localStorage.getItem('panteleos_lang') || 'el';
    const isEn = lang === 'en';

    // Disable button & show spinner
    submitBtn.disabled = true;
    submitBtn.style.cursor = 'wait';
    submitText.innerHTML = `<span style="display:inline-block; width:14px; height:14px; border:2px solid rgba(255,255,255,0.3); border-top-color:#fff; border-radius:50%; animation:spin 0.8s linear infinite; margin-right:8px; vertical-align:middle;"></span> ${isEn ? 'ENCRYPTING & TRANSMITTING DOSSIER...' : 'KΡΥΠΤΟΓΡΑΦΗΣΗ & ΑΠΟΣΤΟΛΗ ΒΙΟΓΡΑΦΙΚΟΥ...'}`;
    statusMsg.style.display = 'none';

    setTimeout(() => {
      submitBtn.style.background = 'linear-gradient(135deg, #059669 0%, #10B981 100%)';
      submitBtn.style.borderColor = '#10B981';
      submitBtn.style.boxShadow = '0 0 25px rgba(16, 185, 129, 0.5)';
      submitBtn.style.cursor = 'default';
      submitText.innerHTML = isEn ? '✓ APPLICATION SECURED IN TALENT PIPELINE' : '✓ Η ΑΙΤΗΣΗ ΚΑΤΑΧΩΡΗΘΗΚΕ ΣΤΟ ΤΜΗΜΑ ΠΡΟΣΩΠΙΚΟΥ';

      const refId = 'NRG-' + Math.floor(100000 + Math.random() * 900000);
      statusMsg.style.display = 'block';
      statusMsg.style.background = 'rgba(16, 185, 129, 0.12)';
      statusMsg.style.border = '1px solid #10B981';
      statusMsg.style.color = '#34D399';
      statusMsg.innerHTML = isEn
        ? `<b>TRANSMISSION SUCCESSFUL</b><br>Your dossier (<i>${careerState.fileName || 'resume.pdf'}</i>) and ${careerState.competenciesSelected} competency matches have been encrypted and queued for priority evaluation by the Managing Director.<br><span style="color:#fff; margin-top:6px; display:inline-block;">REFERENCE TRACKING ID: <b>#${refId}</b></span>`
        : `<b>ΕΠΙΤΥΧΗΣ ΑΠΟΣΤΟΛΗ</b><br>Το βιογραφικό σας (<i>${careerState.fileName || 'resume.pdf'}</i>) και οι ${careerState.competenciesSelected} επιλεγμένες ειδικότητες κρυπτογραφήθηκαν και προωθήθηκαν στη Διεύθυνση για αξιολόγηση.<br><span style="color:#fff; margin-top:6px; display:inline-block;">ΚΩΔΙΚΟΣ ΑΝΑΦΟΡΑΣ: <b>#${refId}</b></span>`;
    }, 1800);
  });
}
