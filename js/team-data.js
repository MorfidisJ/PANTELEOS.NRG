/**
 * PANTELEOS.NRG — Team & Engineering Council Data Store
 * Centralized dataset for executive leadership and specialized engineers.
 * Supports bilingual rendering (Greek/English) and dynamic team grid population.
 * 
 * AUTOMATIC IMAGE NAMING SCHEME (CONVENTION OVER CONFIGURATION):
 * Simply place team member photos inside a folder named after the member's ID:
 *   assets/team/{id}/portrait.jpg  (e.g., assets/team/panteleos/portrait.jpg)
 * 
 * Standard automatic folder names:
 * - assets/team/panteleos/portrait.jpg
 * - assets/team/vamvakas/portrait.jpg
 * - assets/team/stavrou/portrait.jpg
 * - assets/team/kazantzis/portrait.jpg
 * - assets/team/papadopoulou/portrait.jpg
 * - assets/team/makris/portrait.jpg
 * 
 * No manual configuration required! If a portrait image does not exist, the engine
 * automatically falls back to the stylized initials badge (e.g., PP, DV, ES).
 */

const TEAM_MEMBERS = [
  {
    key: "PANAGIOTIS M. PANTELEOS",
    id: "panteleos",
    initials: "PP",
    nameEn: "Panagiotis M. Panteleos",
    nameEl: "Παναγιώτης Μιχ. Παντελαίος",
    shortRoleEn: "Founder & Managing Director",
    shortRoleEl: "Ιδρυτής & Γενικός Διευθυντής",
    roleEn: "Founder & Managing Director, Lead Electrical Engineer",
    roleEl: "Ιδρυτής & Γενικός Διευθυντής, Διπλ. Ηλεκτρολόγος Μηχανικός",
    regEn: "BEng, MSc Electrical Engineering",
    regEl: "Διπλ. Ηλεκτρολόγος Μηχανικός // BEng, MSc",
    bioEn: "Panagiotis Mich. Panteleos is the Founder and Managing Director of PANTELEOS .NRG, bringing extensive academic and practical expertise in electrical and electronic engineering. Holding a BEng in Electrical & Electronic Engineering and an MSc in Electrical & Electromagnetic Engineering, he directs advanced energy infrastructure, industrial automation, and turnkey developments across Greece. At PANTELEOS .NRG, he personally oversees electromechanical systems, bioclimatic energy upgrades, and executive project budgeting.",
    bioEl: "Ο Παναγιώτης Μιχ. Παντελαίος είναι Ιδρυτής και Γενικός Διευθυντής του τεχνικού γραφείου PANTELEOS .NRG, με εξειδικευμένη ακαδημαϊκή και επαγγελματική εμπειρία στις ηλεκτρολογικές και ηλεκτρονικές μελέτες. Διπλωματούχος Ηλεκτρολόγος Μηχανικός, κάτοχος BEng στην Ηλεκτρολογική & Ηλεκτρονική Μηχανική και MSc στην Ηλεκτρολογική & Ηλεκτρομαγνητική Μηχανική, ηγείται των έργων ενεργειακών υποδομών, βιομηχανικού αυτοματισμού και Turnkey κατασκευών σε όλη την Ελλάδα. Επιβλέπει προσωπικά τις Η/Μ εγκαταστάσεις, τις βιοκλιματικές ενεργειακές αναβαθμίσεις και τον προϋπολογισμό των έργων του γραφείου.",
    email: "panteleos.nrg@gmail.com",
    tel: "+30 6976837114",
    cardSpecsEn: ["Electrical Engineering", "Electromagnetic Systems", "Turnkey Management"],
    cardSpecsEl: ["Ηλεκτρολογικές Μελέτες", "Ηλεκτρομαγνητικά Συστήματα", "Διοίκηση Turnkey Έργων"],
    specsEn: ["Electrical Engineering & Design", "Bioclimatic Energy Upgrades", "Industrial Automation & SCADA", "Project Budgeting & Turnkey Mgmt", "Electromagnetic Engineering"],
    specsEl: ["Ηλεκτρολογικές & Ηλεκτρονικές Μελέτες", "Βιοκλιματικές Ενεργειακές Αναβαθμίσεις", "Βιομηχανικοί Αυτοματισμοί & SCADA", "Διαχείριση Προϋπολογισμού & Turnkey Έργα", "Ηλεκτρομαγνητική Μηχανική"]
  },
  {
    key: "DIMITRIS VAMVAKAS",
    id: "vamvakas",
    initials: "DV",
    nameEn: "Dimitris Vamvakas",
    nameEl: "Δημήτρης Βαμβακάς",
    shortRoleEn: "Head of MEP & Energy Infrastructure",
    shortRoleEl: "Επικεφαλής Η/Μ & Ενεργειακών Υποδομών",
    roleEn: "Senior MEP & Automation Director",
    roleEl: "Διευθυντής Η/Μ & Αυτοματισμών",
    regEn: "TEE REG: #51034 // MSc Electrical Eng.",
    regEl: "ΑΡ. ΜΗΤΡΩΟΥ ΤΕΕ: #51034 // Διπλ. Ηλεκτρολόγος Μηχ.",
    bioEn: "Dimitris Vamvakas leads complex electromechanical and energy infrastructure designs at PANTELEOS .NRG. Specializing in high-voltage industrial substations, automated HVAC clean-room networks, and smart KNX/BMS integration, he ensures zero-tolerance compliance with European energy efficiency directives.",
    bioEl: "Ο Δημήτρης Βαμβακάς ηγείται των πολύπλοκων Η/Μ μελετών και ενεργειακών υποδομών στο PANTELEOS .NRG. Εξειδικεύεται σε βιομηχανικούς υποσταθμούς υψηλής τάσης, δίκτυα HVAC καθαρών χώρων και ολοκλήρωση έξυπνων κτιρίων KNX/BMS.",
    email: "panteleos.nrg@gmail.com",
    tel: "+30 6976837114",
    cardSpecsEn: ["HVAC Automation", "High-Voltage SCADA", "nZEB Retrofit"],
    cardSpecsEl: ["Αυτοματισμοί HVAC", "Υποσταθμοί SCADA", "Ενεργειακή Αναβάθμιση"],
    specsEn: ["HVAC Clean-Room Ventilation", "High-Voltage Substation Design", "KNX & BMS Smart Building Integration", "Industrial SCADA Automation", "nZEB Energy Certification"],
    specsEl: ["Συστήματα Κλιματισμού HVAC", "Μελέτες Υποσταθμών Υψηλής Τάσης", "Αυτοματισμοί Κτιρίων KNX/BMS", "Βιομηχανικά Δίκτυα SCADA", "Ενεργειακή Πιστοποίηση nZEB"]
  },
  {
    key: "ELENI STAVROU",
    id: "stavrou",
    initials: "ES",
    nameEn: "Eleni Stavrou",
    nameEl: "Ελένη Σταύρου",
    shortRoleEn: "Senior Lead Architect & nZEB Specialist",
    shortRoleEl: "Αρχιτέκτων Μηχανικός & nZEB Specialist",
    roleEn: "Lead Architectural Engineer & Permitting Director",
    roleEl: "Επικεφαλής Αρχιτεκτονικού Σχεδιασμού & Αδειοδοτήσεων",
    regEn: "TEE REG: #59211 // MArch Architectural Eng.",
    regEl: "ΑΡ. ΜΗΤΡΩΟΥ ΤΕΕ: #59211 // Διπλ. Αρχιτέκτων Μηχ.",
    bioEn: "Eleni Stavrou heads the Architectural Design & Urban Permitting division. With an MArch in Architectural Engineering and deep specialization in bioclimatic nZEB principles, she bridges aesthetic vision with high-performance environmental engineering across luxury residential complexes and commercial flagships.",
    bioEl: "Η Ελένη Σταύρου διευθύνει το τμήμα Αρχιτεκτονικού Σχεδιασμού και Πολεοδομικών Αδειοδοτήσεων. Με εξειδίκευση στις βιοκλιματικές αρχές nZEB, συνδυάζει υψηλή αισθητική και ενεργειακή απόδοση σε πολυτελείς κατοικίες και εμπορικά κτίρια.",
    email: "panteleos.nrg@gmail.com",
    tel: "+30 6976837114",
    cardSpecsEn: ["Bioclimatic Design", "Luxury Residential", "Urban Permitting"],
    cardSpecsEl: ["Βιοκλιματικός Σχεδιασμός", "Πολυτελείς Κατοικίες", "Πολεοδομικές Αδειοδοτήσεις"],
    specsEn: ["Bioclimatic & nZEB Architecture", "Luxury Villa & Resort Topology", "Urban Planning & Building Permits", "Interior & Lighting Design", "Facade & Curtain Wall Engineering"],
    specsEl: ["Βιοκλιματική Αρχιτεκτονική nZEB", "Σχεδιασμός Πολυτελών Κατοικιών", "Πολεοδομικές & Οικοδομικές Άδειες", "Αρχιτεκτονική Εσωτερικών Χώρων", "Μελέτες Όψεων & Υαλοπετασμάτων"]
  },
  {
    key: "NIKOS KAZANTZIS",
    id: "kazantzis",
    initials: "NK",
    nameEn: "Nikos Kazantzis",
    nameEl: "Νίκος Καζαντζής",
    shortRoleEn: "Structural Retrofit & Geotechnical Lead",
    shortRoleEl: "Πολιτικός Μηχανικός & Ειδικός Στατικών Ενισχύσεων",
    roleEn: "Lead Civil Engineer & Structural Retrofit Director",
    roleEl: "Επικεφαλής Στατικών Μελετών & Ενισχύσεων",
    regEn: "TEE REG: #44091 // MEng Civil Engineering",
    regEl: "ΑΡ. ΜΗΤΡΩΟΥ ΤΕΕ: #44091 // Διπλ. Πολιτικός Μηχ.",
    bioEn: "Nikos Kazantzis directs structural analysis, geotechnical foundations, and seismic retrofitting across all PANTELEOS .NRG structural projects. He is a recognized authority in advanced finite element modeling, carbon-fiber structural reinforcements, and seismic base-isolation systems.",
    bioEl: "Ο Νίκος Καζαντζής διευθύνει τις στατικές μελέτες, τις γεωτεχνικές έρευνες και τις αντισεισμικές ενισχύσεις του γραφείου. Εξειδικεύεται σε πεπερασμένα στοιχεία, ενισχύσεις με ανθρακονήματα και θεμελιώσεις ειδικών απαιτήσεων.",
    email: "panteleos.nrg@gmail.com",
    tel: "+30 6976837114",
    cardSpecsEn: ["Carbon Reinforcement", "Foundation Engineering", "High-Rise Retrofit"],
    cardSpecsEl: ["Ενισχύσεις Ανθρακονημάτων", "Ειδικές Θεμελιώσεις", "Αναστήλωση Κτιρίων"],
    specsEn: ["Seismic Retrofit & Carbon-Fiber FRP", "Geotechnical & Foundation Engineering", "Finite Element Structural FEA", "Post-Tensioned Concrete Structures", "Eurocode Structural Compliance"],
    specsEl: ["Αντισεισμική Ενίσχυση & FRP", "Γεωτεχνικές Μελέτες Θεμελιώσεων", "Ανάλυση Πεπερασμένων Στοιχείων", "Προεντεταμένο Σκυρόδεμα", "Συμμόρφωση Eurocode"]
  },
  {
    key: "MARIA PAPADOPOULOU",
    id: "papadopoulou",
    initials: "MP",
    nameEn: "Maria Papadopoulou",
    nameEl: "Μαρία Παπαδοπούλου",
    shortRoleEn: "BIM Coordination Manager & Digital Twin Lead",
    shortRoleEl: "BIM Manager & Επικεφαλής Ψηφιακών Μοντέλων",
    roleEn: "Lead BIM Coordinator & Digital Twin Architect",
    roleEl: "Επικεφαλής Συντονισμού BIM & Digital Twin",
    regEn: "TEE REG: #61208 // MSc BIM / Digital Construction",
    regEl: "ΑΡ. ΜΗΤΡΩΟΥ ΤΕΕ: #61208 // MSc BIM & Ψηφιακή Κατασκευή",
    bioEn: "Maria Papadopoulou oversees multi-disciplinary BIM LOD-400 to LOD-500 coordination and Digital Twin asset modeling. Utilizing advanced clash detection algorithms and 4D construction sequencing, she eliminates spatial interferences before breaking ground.",
    bioEl: "Η Μαρία Παπαδοπούλου επιβλέπει τον συντονισμό μελετών BIM από LOD-400 έως LOD-500 και τη δημιουργία ψηφιακών διδύμων (Digital Twins). Με προηγμένους ελέγχους συγκρούσεων εξαλείφει κατασκευαστικά σφάλματα στο στάδιο της μελέτης.",
    email: "panteleos.nrg@gmail.com",
    tel: "+30 6976837114",
    cardSpecsEn: ["ISO 19650 Compliance", "Clash Resolution", "4D Timeline Sim"],
    cardSpecsEl: ["Πρότυπο ISO 19650", "Επίλυση Συγκρούσεων", "Προσομοίωση 4D"],
    specsEn: ["ISO 19650 BIM Management", "LOD-500 Digital Twin Modeling", "MEP Clash Interference Resolution", "4D Construction Timeline Simulation", "Revit / Navisworks Federation"],
    specsEl: ["Διαχείριση BIM ISO 19650", "Μοντελοποίηση Digital Twin LOD-500", "Επίλυση Συγκρούσεων Η/Μ Δικτύων", "4D Χρονοπρογραμματισμός", "Συντονισμός Revit / Navisworks"]
  },
  {
    key: "GIORGOS MAKRIS",
    id: "makris",
    initials: "GM",
    nameEn: "Giorgos Makris",
    nameEl: "Γιώργος Μακρής",
    shortRoleEn: "On-Site Construction Manager & QC Director",
    shortRoleEl: "Εργοταξιάρχης & Διευθυντής Ποιοτικού Ελέγχου",
    roleEn: "On-Site Construction Manager & QC Director",
    roleEl: "Εργοταξιάρχης & Διευθυντής Ποιοτικού Ελέγχου",
    regEn: "TEE REG: #53409 // BEng Civil / Site Mgmt",
    regEl: "ΑΡ. ΜΗΤΡΩΟΥ ΤΕΕ: #53409 // BEng Πολιτικός Μηχ.",
    bioEn: "Giorgos Makris is an experienced On-Site Construction Manager (B.Eng Civil) bringing over 15 years of field execution expertise. He enforces rigorous ISO 9001 quality supervision, safety compliance, subcontractor coordination, and real-time material testing on every PANTELEOS .NRG construction site across Greece.",
    bioEl: "Ο Γιώργος Μακρής είναι Εργοταξιάρχης & Διευθυντής Ποιοτικού Ελέγχου (B.Eng Civil) με 15+ έτη αδιάλειπτης εμπειρίας στην κατασκευαστική εκτέλεση. Επιβάλλει αυστηρό ποιοτικό έλεγχο κατά ISO 9001, μέτρα εργοταξιακής ασφάλειας, συντονισμό υπεργολάβων και εργαστηριακούς ελέγχους αντοχής υλικών σε κάθε εργοτάξιο του PANTELEOS .NRG.",
    email: "panteleos.nrg@gmail.com",
    tel: "+30 6976837114",
    cardSpecsEn: ["Safety Standards", "Contractor Mgmt", "ISO 9001 Quality"],
    cardSpecsEl: ["Ασφάλεια Εργοταξίου", "Διοίκηση Υπεργολάβων", "Ποιότητα ISO 9001"],
    specsEn: ["ISO 9001 Quality Control", "On-Site Contractor Mgmt", "Safety & OHS Compliance", "Concrete & Material Testing", "Turnkey Schedule Execution"],
    specsEl: ["Ποιοτικός Έλεγχος ISO 9001", "Διοίκηση Εργοταξίου & Υπεργολάβων", "Μέτρα Ασφάλειας & Υγιεινής OHS", "Εργαστηριακοί Έλεγχοι Σκυροδέματος", "Τήρηση Χρονοδιαγραμμάτων Turnkey"]
  }
];

// Export TEAM_DATA map lookup for modals
const TEAM_DATA = {};
TEAM_MEMBERS.forEach(m => {
  TEAM_DATA[m.key] = m;
});
window.TEAM_MEMBERS = TEAM_MEMBERS;
window.TEAM_DATA = TEAM_DATA;

/**
 * Renders team member cards dynamically into #team-grid
 */
function renderTeamMembers(lang) {
  const grid = document.getElementById('team-grid');
  if (!grid) return;

  const currentLang = lang || localStorage.getItem('panteleos_lang') || 'el';
  const isEl = currentLang === 'el';

  const filterBtnLabel = isEl ? "ΠΡΟΒΟΛΗ ΕΡΓΩΝ ΜΗΧΑΝΙΚΟΥ &rarr;" : "FILTER PROJECTS BY ENGINEER &rarr;";

  grid.innerHTML = TEAM_MEMBERS.map(member => {
    const name = isEl ? member.nameEl : member.nameEn;
    const shortRole = isEl ? member.shortRoleEl : member.shortRoleEn;
    const reg = isEl ? member.regEl : member.regEn;
    const cardSpecs = isEl ? member.cardSpecsEl : member.cardSpecsEn;

    // Automatic convention image path
    const autoPhotoUrl = member.photo || `assets/team/${member.id}/portrait.jpg`;

    const specsHtml = cardSpecs.map(s => `<span>${s}</span>`).join('');

    return `
      <article class="team-card" data-engineer="${member.key}">
        <div class="team-portrait">
          <img src="${autoPhotoUrl}" alt="${name}" class="team-img" loading="lazy"
               onerror="this.remove();">
          <span>${member.initials}</span>
        </div>
        <div class="team-base">
          <h4>${name}</h4>
          <span>${shortRole}</span>
        </div>
        <div class="team-overlay">
          <div class="grid-lines"></div>
          <div class="reg">${reg}</div>
          <h4>${name}</h4>
          <div class="spec-list">
            ${specsHtml}
          </div>
          <button class="cta">${filterBtnLabel}</button>
        </div>
      </article>
    `;
  }).join('');

  // Re-bind cross-filter & modal triggers
  if (typeof window.initTeamCrossFilter === 'function') {
    window.initTeamCrossFilter();
  }
  if (typeof window.initTeamModal === 'function') {
    window.initTeamModal();
  }
}

window.renderTeamMembers = renderTeamMembers;
window.updateTeamCardsLanguage = renderTeamMembers;

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('panteleos_lang') || 'el';
  renderTeamMembers(savedLang);
});
