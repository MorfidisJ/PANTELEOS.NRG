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
  const cards = document.querySelectorAll('.p-card');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');
      cards.forEach(card => {
        const cat = card.getAttribute('data-cat') || '';
        const team = card.getAttribute('data-team') || '';
        if (filter === 'all' || cat.includes(filter) || team.includes(filter)) {
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

const TEAM_DATA = {
  "PANAGIOTIS M. PANTELEOS": {
    initials: "PP",
    nameEn: "Panagiotis M. Panteleos",
    nameEl: "Παναγιώτης Μιχ. Παντελαίος",
    roleEn: "Founder & Managing Director, Lead Electrical Engineer",
    roleEl: "Ιδρυτής & Γενικός Διευθυντής, Διπλ. Ηλεκτρολόγος Μηχανικός",
    regEn: "BEng, MSc Electrical Engineering",
    regEl: "Διπλ. Ηλεκτρολόγος Μηχανικός // BEng, MSc",
    bioEn: "Panagiotis Mich. Panteleos is the Founder and Managing Director of PANTELEOS .NRG, bringing extensive academic and practical expertise in electrical and electronic engineering. Holding a BEng in Electrical & Electronic Engineering and an MSc in Electrical & Electromagnetic Engineering, he directs advanced energy infrastructure, industrial automation, and turnkey developments across Greece. At PANTELEOS .NRG, he personally oversees electromechanical systems, bioclimatic energy upgrades, and executive project budgeting.",
    bioEl: "Ο Παναγιώτης Μιχ. Παντελαίος είναι Ιδρυτής και Γενικός Διευθυντής του τεχνικού γραφείου PANTELEOS .NRG, με εξειδικευμένη ακαδημαϊκή και επαγγελματική εμπειρία στις ηλεκτρολογικές και ηλεκτρονικές μελέτες. Διπλωματούχος Ηλεκτρολόγος Μηχανικός, κάτοχος BEng στην Ηλεκτρολογική & Ηλεκτρονική Μηχανική και MSc στην Ηλεκτρολογική & Ηλεκτρομαγνητική Μηχανική, ηγείται των έργων ενεργειακών υποδομών, βιομηχανικού αυτοματισμού και Turnkey κατασκευών σε όλη την Ελλάδα. Επιβλέπει προσωπικά τις Η/Μ εγκαταστάσεις, τις βιοκλιματικές ενεργειακές αναβαθμίσεις και τον προϋπολογισμό των έργων του γραφείου.",
    email: "panteleos.nrg@gmail.com",
    tel: "+30 6976837114",
    specsEn: ["Electrical & Electronic Engineering", "Electromagnetic Infrastructure", "ISO 19650 BIM Integration", "Turnkey Design & Build Mgmt", "Algorithmic Cost Estimation"],
    specsEl: ["Ηλεκτρολογικές & Ηλεκτρονικές Μελέτες", "Ηλεκτρομαγνητικές Υποδομές", "Ενσωμάτωση Συστημάτων BIM", "Διαχείριση Έργων Turnkey", "Αλγοριθμική Κοστολόγηση Έργων"]
  },
  "DIMITRIS VAMVAKAS": {
    initials: "DV",
    nameEn: "Dimitris Vamvakas",
    nameEl: "Δημήτρης Βαμβακάς",
    roleEn: "Head of MEP & Energy Infrastructure",
    roleEl: "Head of MEP & Energy Infrastructure",
    regEn: "TEE REG: #51034 // MSc EE / Automation",
    regEl: "ΑΡ. ΜΗΤΡΩΟΥ ΤΕΕ: #51034 // MSc Ηλεκτρολόγος Μηχ.",
    bioEn: "Dimitris Vamvakas is an Electrical & Mechanical Engineer (M.Sc. EE) specializing in industrial automation, SCADA networks, and ultra-high-efficiency MEP systems. He leads the energy infrastructure division at PANTELEOS .NRG, designing geothermal heat pump arrays, VRV/VRF HVAC networks, and smart KNX building automation that achieve nZEB Class A+ energy performance.",
    bioEl: "Ο Δημήτρης Βαμβακάς είναι Διπλωματούχος Ηλεκτρολόγος Μηχανικός (M.Sc.) με εξειδίκευση στον βιομηχανικό αυτοματισμό, τα δίκτυα SCADA και τα συστήματα Η/Μ μέγιστης ενεργειακής απόδοσης. Ηγείται του τμήματος ενεργειακών υποδομών του PANTELEOS .NRG, σχεδιάζοντας γεωθερμικές αντλίες θερμότητας, κλιματισμό VRV/VRF και έξυπνους αυτοματισμούς KNX για κτίρια nZEB Κατηγορίας Α+.",
    email: "panteleos.nrg@gmail.com",
    tel: "+30 6976837114",
    specsEn: ["HVAC Automation & VRV/VRF", "High-Voltage SCADA Grids", "nZEB Energy Retrofits", "KNX Smart Building Control", "Geothermal Heat Exchange"],
    specsEl: ["Αυτοματισμοί Κλιματισμού VRV/VRF", "Δίκτυα Υψηλής Τάσης & SCADA", "Ενεργειακές Αναβαθμίσεις nZEB", "Έξυπνος Έλεγχος Κτιρίων KNX", "Γεωθερμικά Συστήματα"]
  },
  "ELENI STAVROU": {
    initials: "ES",
    nameEn: "Eleni Stavrou",
    nameEl: "Ελένη Σταύρου",
    roleEn: "Senior Lead Architect & nZEB Specialist",
    roleEl: "Senior Lead Architect & nZEB Specialist",
    regEn: "TEE REG: #59211 // MArch Bioclimatic",
    regEl: "ΑΡ. ΜΗΤΡΩΟΥ ΤΕΕ: #59211 // MArch Αρχιτέκτων",
    bioEn: "Eleni Stavrou is a Senior Lead Architect (M.Arch) renowned for merging bioclimatic Mediterranean architecture with cutting-edge parametric design. She leads the architectural council at PANTELEOS .NRG, directing luxury residential complexes, executive hospitality resorts, and complex urban permitting (e-Adeia) through the Council of Architecture (SA) and Archaeology.",
    bioEl: "Η Ελένη Σταύρου είναι Senior Architect (M.Arch) με πολυετείς διακρίσεις στον συνδυασμό της βιοκλιματικής μεσογειακής αρχιτεκτονικής με τον σύγχρονο παραμετρικό σχεδιασμό. Διευθύνει το αρχιτεκτονικό συμβούλιο του PANTELEOS .NRG, εκπονώντας μελέτες πολυτελών κατοικιών, ξενοδοχειακών συγκροτημάτων και χειρίζεται την πολεοδομική αδειοδότηση (e-Άδεια) σε Συμβούλια Αρχιτεκτονικής.",
    email: "panteleos.nrg@gmail.com",
    tel: "+30 6976837114",
    specsEn: ["Bioclimatic Architecture", "Luxury Residential Design", "Hospitality & Resort Masterplan", "e-Adeia Urban Permitting", "Parametric 3D Modeling"],
    specsEl: ["Βιοκλιματική Αρχιτεκτονική", "Σχεδιασμός Πολυτελών Κατοικιών", "Ξενοδοχειακά Συγκροτήματα", "Ηλεκτρονική Αδειοδότηση e-Άδεια", "Παραμετρικός 3D Σχεδιασμός"]
  },
  "NIKOS KAZANTZIS": {
    initials: "NK",
    nameEn: "Nikos Kazantzis",
    nameEl: "Νίκος Καζαντζής",
    roleEn: "Structural Retrofit & Geotechnical Lead",
    roleEl: "Structural Retrofit & Geotechnical Lead",
    regEn: "TEE REG: #44091 // MEng Civil / Geotech",
    regEl: "ΑΡ. ΜΗΤΡΩΟΥ ΤΕΕ: #44091 // MEng Γεωτεχνικός",
    bioEn: "Nikos Kazantzis is a Senior Civil & Geotechnical Engineer (M.Eng) specializing in structural health monitoring, seismic rehabilitation, and deep foundation engineering. At PANTELEOS .NRG, he directs carbon-fiber reinforced polymer (CFRP) strengthening, jacket encapsulation, and high-capacity pile foundation designs for high-rise and industrial retrofits.",
    bioEl: "Ο Νίκος Καζαντζής είναι Πολιτικός & Γεωτεχνικός Μηχανικός (M.Eng) με εξειδίκευση στην αποτίμηση στατικής επάρκειας, τις αντισεισμικές ενισχύσεις και τις βαθιές θεμελιώσεις. Στο PANTELEOS .NRG κατευθύνει έργα ενίσχυσης φερουσών κατασκευών με ανθρακονήματα (CFRP), μανδύες οπλισμένου σκυροδέματος και μικροπασσάλους.",
    email: "panteleos.nrg@gmail.com",
    tel: "+30 6976837114",
    specsEn: ["Carbon Fiber CFRP Retrofit", "Deep Foundation & Piling", "Seismic Health Monitoring", "High-Rise Reinforcement", "Geotechnical Soil Mechanics"],
    specsEl: ["Ενισχύσεις με Ανθρακονήματα CFRP", "Βαθιές Θεμελιώσεις & Πάσσαλοι", "Έλεγχος Στατικής Επάρκειας", "Ενισχύσεις Υψηλών Κτιρίων", "Γεωτεχνική Εδαφομηχανική"]
  },
  "MARIA PAPADOPOULOU": {
    initials: "MP",
    nameEn: "Maria Papadopoulou",
    nameEl: "Μαρία Παπαδοπούλου",
    roleEn: "BIM Coordination Manager & Digital Twin Lead",
    roleEl: "BIM Coordination Manager & Digital Twin Lead",
    regEn: "TEE REG: #61208 // MSc BIM & Digital Twin",
    regEl: "ΑΡ. ΜΗΤΡΩΟΥ ΤΕΕ: #61208 // MSc BIM & Digital Twin",
    bioEn: "Maria Papadopoulou is a dedicated BIM Coordination Manager (M.Sc. BIM & Digital Engineering) holding international certifications in Autodesk Revit and ISO 19650 protocols. She orchestrates multi-disciplinary clash detection, 4D construction timeline simulations, and 5D quantity extraction across all active PANTELEOS .NRG projects.",
    bioEl: "Η Μαρία Παπαδοπούλου είναι BIM Coordination Manager (M.Sc. BIM & Digital Engineering) με διεθνείς πιστοποιήσεις στα πρωτόκολλα ISO 19650 και το Autodesk Revit. Συντονίζει τον αυτοματοποιημένο έλεγχο συγκρούσεων (Clash Detection), τις 4D χρονικές προσομοιώσεις κατασκευής και την 5D προμέτρηση υλικών σε όλα τα ενεργά έργα μας.",
    email: "panteleos.nrg@gmail.com",
    tel: "+30 6976837114",
    specsEn: ["ISO 19650 BIM Protocols", "Automated Clash Detection", "4D Timeline Simulation", "5D Precision BOQ Extraction", "Revit & Navisworks Matrix"],
    specsEl: ["Πρωτόκολλα ISO 19650 BIM", "Αυτοματοποιημένος Έλεγχος Συγκρούσεων", "4D Χρονική Προσομοίωση Έργου", "5D Προμέτρηση Υλικών BOQ", "Συντονισμός Revit & Navisworks"]
  },
  "GIORGOS MAKRIS": {
    initials: "GM",
    nameEn: "Giorgos Makris",
    nameEl: "Γιώργος Μακρής",
    roleEn: "On-Site Construction Manager & QC Director",
    roleEl: "On-Site Construction Manager & QC Director",
    regEn: "TEE REG: #53409 // BEng Civil / Site Mgmt",
    regEl: "ΑΡ. ΜΗΤΡΩΟΥ ΤΕΕ: #53409 // BEng Πολιτικός Μηχ.",
    bioEn: "Giorgos Makris is an experienced On-Site Construction Manager (B.Eng Civil) bringing over 15 years of field execution expertise. He enforces rigorous ISO 9001 quality supervision, safety compliance, subcontractor coordination, and real-time material testing on every PANTELEOS .NRG construction site across Greece.",
    bioEl: "Ο Γιώργος Μακρής είναι Εργοταξιάρχης & Διευθυντής Ποιοτικού Ελέγχου (B.Eng Civil) με 15+ έτη αδιάλειπτης εμπειρίας στην κατασκευαστική εκτέλεση. Επιβάλλει αυστηρό ποιοτικό έλεγχο κατά ISO 9001, μέτρα εργοταξιακής ασφάλειας, συντονισμό υπεργολάβων και εργαστηριακούς ελέγχους αντοχής υλικών σε κάθε εργοτάξιο του PANTELEOS .NRG.",
    email: "panteleos.nrg@gmail.com",
    tel: "+30 6976837114",
    specsEn: ["ISO 9001 Quality Control", "On-Site Contractor Mgmt", "Safety & OHS Compliance", "Concrete & Material Testing", "Turnkey Schedule Execution"],
    specsEl: ["Ποιοτικός Έλεγχος ISO 9001", "Διοίκηση Εργοταξίου & Υπεργολάβων", "Μέτρα Ασφάλειας & Υγιεινής OHS", "Εργαστηριακοί Έλεγχοι Σκυροδέματος", "Τήρηση Χρονοδιαγραμμάτων Turnkey"]
  }
};

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

  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  const renderModalContent = (engKey, lang) => {
    const data = TEAM_DATA[engKey];
    if (!data) return;
    const isEl = lang === 'el';

    if (badgeEl) badgeEl.innerHTML = `<span>${data.initials}</span>`;
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

  teamCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.cta') || e.target.closest('button')) return;

      const engKey = card.getAttribute('data-engineer');
      if (!TEAM_DATA[engKey]) return;

      currentEngineer = engKey;
      const activeLang = window.currentLang || localStorage.getItem('panteleos_lang') || 'el';
      renderModalContent(engKey, activeLang);

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
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

    // Default: Rich 4-slide Hybrid BIM/Technical/Architectural Gallery
    const aesSvg = card.querySelector('.aesthetic svg')?.cloneNode(true);
    const techSvg = card.querySelector('.technical svg')?.cloneNode(true);
    const projTitle = card.querySelector('h4')?.textContent || 'Project';
    
    const slides = [];
    if (aesSvg) {
      slides.push({
        svg: aesSvg,
        type: isEl ? '01 // ΑΡΧΙΤΕΚΤΟΝΙΚΗ ΑΠΕΙΚΟΝΙΣΗ' : '01 // AESTHETIC ARCHITECTURAL VIEW',
        caption: isEl ? `Εξωτερική αρχιτεκτονική απεικόνιση: ${projTitle}` : `External facade & landscaping rendering: ${projTitle}`
      });
    }
    if (techSvg) {
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
      stage.style.opacity = '0';
      setTimeout(() => {
        stage.innerHTML = '';
        if (slide.img) {
          const imgEl = document.createElement('img');
          imgEl.src = slide.img;
          imgEl.alt = slide.caption || 'Project Photo';
          stage.appendChild(imgEl);
        } else if (slide.svg) {
          stage.appendChild(slide.svg.cloneNode(true));
        }
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

  document.querySelectorAll('.p-card').forEach(card => {
    card.addEventListener('click', () => {
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

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

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

/* --- Generate Custom SVG Architectural Artwork for Cards --- */
function generatePortfolioArtwork() {
  const visuals = document.querySelectorAll('.p-visual');
  visuals.forEach((vis, idx) => {
    const aes = vis.querySelector('.aesthetic');
    const tech = vis.querySelector('.technical');
    if (!aes || !tech) return;

    const colors = ['#0A6C78', '#141414', '#26D7EB', '#4EE5F7'];
    const c1 = colors[idx % colors.length];

    // Aesthetic SVG (clean architectural rendering)
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

    // Technical Blueprint Wireframe SVG
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
  });
}

/* --- Animated Counting Stats Banner --- */
function initPortfolioStats() {
  const banner = document.getElementById('portfolio-counter-banner');
  if (!banner) return;

  const numEls = banner.querySelectorAll('.stat-num[data-target]');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        numEls.forEach(el => {
          const target = parseInt(el.getAttribute('data-target'), 10);
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
      
      el.textContent = currentVal.toLocaleString('en-US');
      
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target.toLocaleString('en-US');
      }
    }
    
    requestAnimationFrame(update);
  }
}
