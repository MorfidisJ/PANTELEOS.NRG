/**
 * PANTELEOS .NRG — VIRTUAL ENGINEERING ASSISTANT v2.0
 * Advanced Bilingual (Greek / English) Consulting Engine with:
 * - Synonym Expansion & Intent Pattern Recognition
 * - Conversation Memory & Contextual Follow-Ups
 * - Multi-Topic Synthesis & Disambiguation
 * - Clarifying Questions with Inline Quick-Reply Chips
 * - Portfolio Awareness & Section Navigation
 * - UX: Timestamps, Copy, Rating, Autocomplete
 */

(function() {

  // ═══════════════════════════════════════════════════════════════════════
  //  SECTION 1: KNOWLEDGE BASE — TOPICS (Greek & English)
  // ═══════════════════════════════════════════════════════════════════════

  const CHAT_DATA = {
    el: {
      title: "ΨΗΦΙΑΚΟΣ ΣΥΜΒΟΥΛΟΣ ΜΗΧΑΝΙΚΟΣ",
      sub: "Διαδραστικές απαντήσεις για οικοδομικές άδειες e-Άδεια, πρότυπα BIM LOD-400, ΚΕΝΑΚ/nZEB και συμβάσεις Turnkey.",
      resetBtn: "🔄 ΝΕΑ ΣΥΖΗΤΗΣΗ",
      chipsLabel: "ΣΥΧΝΕΣ ΤΕΧΝΙΚΕΣ ΕΡΩΤΗΣΕΙΣ // ΕΠΙΛΕΞΤΕ ΘΕΜΑ:",
      inputPlaceholder: "Πληκτρολογήστε ερώτηση ή λέξη-κλειδί (π.χ. κόστος, άδεια, BIM, nZEB, ανακαίνιση)...",
      sendBtn: "ΑΠΟΣΤΟΛΗ →",
      welcome: "Γεια σας! Είμαι ο προηγμένος ψηφιακός σύμβουλος του τεχνικού γραφείου **PANTELEOS .NRG**, εκπαιδευμένος στον Ελληνικό Οικοδομικό Κανονισμό (ΝΟΚ), τον ΚΕΝΑΚ και τα πρότυπα BIM ISO 19650.\n\n👉 **Πώς μπορώ να σας βοηθήσω;** Επιλέξτε ένα από τα εξειδικευμένα θέματα παρακάτω ή διατυπώστε ελεύθερα την ερώτησή σας (ακόμη και χωρίς τόνους ή με ορθογραφικά!).",
      fallback: "Ευχαριστούμε για την ερώτησή σας! Το ερώτημά σας αφορά εξειδικευμένες τεχνικές προδιαγραφές που απαιτούν εξατομικευμένη μελέτη.\n\n💡 **Προτεινόμενο Βήμα**: Μπορείτε να επιλέξετε μία από τις θεματικές κατηγορίες παρακάτω ή να μεταβείτε στη **Φόρμα Επικοινωνίας** για απευθείας συνεννόηση με τον Dr. Παντελεό.",
      typing: "Αναζήτηση τεχνικών προδιαγραφών...",
      greetingsReply: "Χαίρετε! Καλώς ήρθατε στο ψηφιακό κέντρο του **PANTELEOS .NRG**. Είμαι στη διάθεσή σας για οποιαδήποτε πληροφορία σχετικά με αρχιτεκτονικές μελέτες, αδειοδοτήσεις e-Άδεια, αντισεισμική θωράκιση, ενεργειακά κτίρια nZEB και κοστολόγηση έργων. Τι θα θέλατε να εξετάσουμε;",
      thanksReply: "Παρακαλώ, είναι χαρά και τιμή μας! Η ομάδα του **PANTELEOS .NRG** παραμένει πάντα στη διάθεσή σας. Χρειάζεστε κάποια άλλη διευκρίνιση;",
      identityReply: "Είμαι ο **PANTELEOS .NRG Virtual Engineering Assistant** — ένας ψηφιακός τεχνικός σύμβουλος εκπαιδευμένος αποκλειστικά στην ελληνική πολεοδομική νομοθεσία (ΝΟΚ/ΤΕΕ), τους Αντισεισμικούς Κανονισμούς και τα διεθνή πρότυπα BIM LOD-400. Μπορώ να σας καθοδηγήσω σε κάθε στάδιο του κατασκευαστικού σας έργου!",
      suggestLabel: "Σχετικές Ερωτήσεις:",
      disambiguate: "Εντόπισα ότι η ερώτησή σας μπορεί να αφορά διαφορετικά θέματα. Ποιο σας ενδιαφέρει περισσότερο;",
      elaborateReply: "Ευχαρίστως! Ας εμβαθύνουμε περαιτέρω στο θέμα.",
      yesReply: "Τέλεια! Πώς μπορώ να σας βοηθήσω περαιτέρω;",
      noReply: "Κατανοητό. Υπάρχει κάτι άλλο που θα θέλατε να εξετάσουμε;",
      frustrationReply: "Κατανοώ απόλυτα ότι η κατάσταση μπορεί να είναι απογοητευτική και ζητώ ειλικρινά συγγνώμη για οποιαδήποτε ταλαιπωρία. Η ικανοποίησή σας είναι η κορυφαία μας προτεραιότητα.\n\nΩς ψηφιακός βοηθός, οι δυνατότητές μου είναι περιορισμένες σε προκαθορισμένες τεχνικές πληροφορίες. Για να αντιμετωπίσουμε το αίτημά σας με την προσοχή που αξίζει, σας προτείνω να **επικοινωνήσετε απευθείας με την ανθρώπινη ομάδα μας**:\n\n📞 **Τηλέφωνο**: +30 2310 555 890\n📧 **Email**: panteleos.nrg@gmail.com\n\nΈνα μέλος της ομάδας μας θα χαρεί να σας εξυπηρετήσει προσωπικά.",
      consultSuggest: "💡 Βλέπω ότι ενδιαφέρεστε αρκετά για αυτό το θέμα! Θέλετε να κλείσετε ένα **δωρεάν ραντεβού** τεχνικής αξιολόγησης με τον Dr. Παντελεό; Μπορείτε να χρησιμοποιήσετε τη φόρμα επικοινωνίας στο τέλος της σελίδας.",
      compareIntro: "Εξαιρετική ερώτηση! Ας δούμε τη σύγκριση:",
      portfolioIntro: "Βάσει του χαρτοφυλακίου μας, ορίστε τα σχετικά έργα:",
      copied: "Αντιγράφηκε!",
      topics: [
        {
          id: "bim",
          chip: "📐 Τι είναι το BIM LOD-400;",
          keywords: ["bim", "revit", "lod", "lod400", "3d", "cad", "μοντελο", "σχεδιο", "clash", "ψηφιακο"],
          question: "Τι ακριβώς είναι το BIM LOD-400 και τι πλεονεκτήματα έχει σε σχέση με το απλό 2D CAD;",
          answer: "Το **BIM (Building Information Modeling) LOD-400** είναι το απόλυτο πρότυπο κατασκευαστικής ακρίβειας. Σε αντίθεση με τα απλά δισδιάστατα σχέδια (2D CAD), κατασκευάζουμε ένα πλήρες **3D Ψηφιακό Δίδυμο** (Digital Twin) του κτιρίου σας στο Revit.\n\n✅ **Τα 3 Κορυφαία Πλεονεκτήματα**:\n1. **Αυτοματοποιημένος Έλεγχος Συγκρούσεων (Clash Detection)**: Εντοπίζουμε κατασκευαστικές αστοχίες (π.χ. σωλήνωση που τέμνει δοκό) στο λογισμικό ΠΡΙΝ πέσει το μπετόν.\n2. **Εξοικονόμηση Κόστους**: Εξαλείφουμε τα σφάλματα εργοταξίου και μειώνουμε τις υπερβάσεις προϋπολογισμού έως και **18%**.\n3. **Ακριβής Προμέτρηση Υλικών**: Παράγουμε αυτόματα λίστες υλικών (BOQ) με ακρίβεια χιλιοστού.",
          suggestedNext: ["cost", "turnkey"],
          actionBtn: { label: "🏢 ΠΡΟΒΟΛΗ CASE STUDIES ΕΡΓΩΝ &rarr;", targetSection: "#portfolio" },
          elaboration: "Αναλυτικότερα, στο LOD-400 κάθε δομικό στοιχείο (κολώνα, δοκός, σωλήνωση, ηλεκτρολογική γραμμή) μοντελοποιείται με τις ακριβείς διαστάσεις κατασκευής, τον κωδικό προμηθευτή και τη θέση τοποθέτησης. Αυτό σημαίνει ότι:\n\n🔹 Τα συνεργεία στο εργοτάξιο λαμβάνουν **τρισδιάστατες οδηγίες τοποθέτησης** αντί για επίπεδα σχέδια.\n🔹 Η **4D χρονική προσομοίωση** δείχνει πώς θα εξελιχθεί η κατασκευή εβδομάδα-εβδομάδα.\n🔹 Η **5D κοστολόγηση** παράγει αυτόματα ενημερωμένο προϋπολογισμό σε κάθε αλλαγή σχεδίου."
        },
        {
          id: "permits",
          chip: "🏛️ Οικοδομικές Άδειες & e-Άδεια",
          keywords: ["αδεια", "e-αδεια", "πολεοδομια", "tee", "νομοθεσια", "εγκριση", "νοκ", "συμβουλιο", "αρχαιολογια"],
          question: "Πώς αναλαμβάνετε την έκδοση οικοδομικής άδειας (e-Άδεια) και την πολεοδομική νομοθεσία;",
          answer: "Η ομάδα πολιτικών μηχανικών και αρχιτεκτόνων μας αναλαμβάνει **εξ' ολοκλήρου και με απόλυτη νομική ασφάλεια** την έκδοση οικοδομικής άδειας μέσω του ηλεκτρονικού συστήματος **e-Άδεια** του ΤΕΕ.\n\n🏛️ **Η Διαδικασία μας (4 Στάδια)**:\n1. **Τοπογραφική Αποτύπωση**: Χρήση Drone & GPS υψηλής ακρίβειας.\n2. **Προέλεγχος & Όροι Δόμησης**: Πλήρης εναρμόνιση με τον Νέο Οικοδομικό Κανονισμό (ΝΟΚ).\n3. **Εγκρίσεις Αρχών**: Εξασφάλιση εγκρίσεων από Συμβούλιο Αρχιτεκτονικής (ΣΑ), Αρχαιολογία, Δασαρχείο και Πυροσβεστική.\n4. **Τελική Έκδοση**: Παράδοση της άδειας δόμησης έτοιμης για έναρξη εκσκαφών.",
          suggestedNext: ["topography", "time"],
          elaboration: "Ειδικότερα, η ηλεκτρονική πλατφόρμα **e-Άδεια** του ΤΕΕ αποτελεί πλέον την αποκλειστική οδό αδειοδότησης. Η ομάδα μας χειρίζεται:\n\n📋 **Έγγραφα που απαιτούνται**:\n- Τοπογραφικό διάγραμμα & διάγραμμα κάλυψης\n- Αρχιτεκτονική μελέτη σύμφωνα με ΝΟΚ\n- Στατική μελέτη σύμφωνα με ΕΑΚ/Ευρωκώδικες\n- Μελέτη ενεργειακής απόδοσης (ΚΕΝΑΚ)\n- Μελέτη πυροπροστασίας & ηλεκτρομηχανολογικά\n\n⏱️ **Χρόνος**: Τυπικά 2-4 μήνες για πλήρη αδειοδότηση."
        },
        {
          id: "turnkey",
          chip: "🔑 Συμβάσεις Turnkey Design & Build",
          keywords: ["turnkey", "build", "design", "εργολαβια", "κατασκευη", "παραδοση", "κλειδι", "συμβαση", "εργολάβος"],
          question: "Τι περιλαμβάνει μια σύμβαση μελέτης και κατασκευής Turnkey (με το κλειδί στο χέρι);",
          answer: "Με τη σύμβαση **Turnkey Design & Build (Με το κλειδί στο χέρι)**, το τεχνικό μας γραφείο αναλαμβάνει την ενιαία και αποκλειστική ευθύνη για ολόκληρο το έργο σας — από το πρώτο σκαρίφημα μέχρι την παράδοση έτοιμου προς χρήση κτιρίου.\n\n🔑 **Γιατί να επιλέξετε Turnkey**:\n- **Εγγυημένο Κλειστό Κόστος**: Υπογράφουμε ρήτρα σταθερού προϋπολογισμού χωρίς κρυφές χρεώσεις ή ανατιμήσεις.\n- **Ένας Υπεύθυνος (Single Point of Responsibility)**: Τέρμα οι τριβές και οι μεταθέσεις ευθυνών μεταξύ αρχιτέκτονα, στατικού και συνεργείων.\n- **Πιστοποιημένη Επίβλεψη ISO 9001**: Καθημερινός ποιοτικός έλεγχος στο εργοτάξιο από μηχανικούς μας.",
          suggestedNext: ["cost", "materials"],
          actionBtn: { label: "📋 ΖΗΤΗΣΤΕ ΠΡΟΣΦΟΡΑ TURNKEY &rarr;", targetSection: "#contact" },
          elaboration: "Σε μια σύμβαση Turnkey, η ροή εργασίας είναι:\n\n**Φάση 1 — Σχεδιασμός (2-3 μήνες)**: Αρχιτεκτονικές σχέδια, 3D renders, BIM μοντέλο, στατική & Η/Μ μελέτη.\n**Φάση 2 — Αδειοδότηση (2-4 μήνες)**: Πλήρης χειρισμός e-Άδεια, εγκρίσεις αρχών.\n**Φάση 3 — Κατασκευή (8-14 μήνες)**: Εκσκαφή, σκυρόδεμα, τοιχοποιία, Η/Μ, φινιρίσματα.\n**Φάση 4 — Παράδοση**: Πιστοποίηση ολοκλήρωσης, εγγυήσεις, παράδοση κλειδιών."
        },
        {
          id: "nzeb",
          chip: "⚡ Κτίρια nZEB & ΚΕΝΑΚ",
          keywords: ["nzeb", "kenak", "ενεργεια", "θερμοπροσοψη", "αντλια", "φωτοβολταικα", "πρασινο", "μονωση"],
          question: "Τι είναι το κτίριο Σχεδόν Μηδενικής Κατανάλωσης (nZEB) και πώς μειώνει τους λογαριασμούς;",
          answer: "Τα κτίρια **nZEB (Nearly Zero Energy Buildings)** αποτελούν το κορυφαίο ευρωπαϊκό και ελληνικό πρότυπο κατασκευής βάσει του ΚΕΝΑΚ. Ελαχιστοποιούν τις ενεργειακές απώλειες και παράγουν μόνοι τους την ενέργεια που καταναλώνουν.\n\n⚡ **Τεχνολογική Υπεροχή**:\n- **Εξωτερική Θερμοπρόσοψη & Κουφώματα**: Πιστοποιημένα συστήματα με θερμοδιακοπή.\n- **Η/Μ Εξοπλισμός Αιχμής**: Αντλίες θερμότητας VRV/VRF υψηλού COP, ενδοδαπέδια θέρμανση και ηλιακά φωτοβολταϊκά Net-Metering.\n- **Αυτοματισμός KNX Smart Home**: Έξυπνος έλεγχος φωτισμού, κλιματισμού και σκίασης.\n\n💶 **Εμπορικό Όφελος**: **70–85% μείωση λογαριασμών ρεύματος** και **+25% υψηλότερη αξία μεταπώλησης** στην αγορά ακινήτων!",
          suggestedNext: ["grants", "materials"],
          elaboration: "Ο νέος ΚΕΝΑΚ (Κανονισμός Ενεργειακής Απόδοσης Κτιρίων) από 01/01/2025 απαιτεί:\n\n📊 **Ελάχιστες Απαιτήσεις**:\n- Ενεργειακή Κατηγορία **Α+** ή ανώτερη για νέα κτίρια\n- U-value τοιχοποιίας ≤ 0.35 W/m²K\n- U-value κουφωμάτων ≤ 1.50 W/m²K\n- Εγκατάσταση ΑΠΕ (φωτοβολταϊκά ή αντλία θερμότητας)\n\n💡 Η ομάδα μας σχεδιάζει κτίρια που ξεπερνούν τις ελάχιστες απαιτήσεις κατά **30-40%**, διασφαλίζοντας μέγιστη μελλοντική αξία."
        },
        {
          id: "seismic",
          chip: "🏗️ Αντισεισμική Θωράκιση (ΕΑΚ/ΕΚΩΣ)",
          keywords: ["σεισμος", "στατικα", "μπετον", "εακ", "εκως", "ευρωκωδικας", "etabs", "sap2000", "θεμελιωση", "σιδερα"],
          question: "Ποιες προδιαγραφές αντισεισμικής θωράκισης και στατικής επάρκειας εφαρμόζετε;",
          answer: "Η στατική ακεραιότητα και η προστασία της ανθρώπινης ζωής αποτελούν την αδιαπραγμάτευτη βάση κάθε μελέτης μας. Εφαρμόζουμε τους αυστηρότερους Ελληνικούς Αντισεισμικούς Κανονισμούς (ΕΑΚ/ΕΚΩΣ) και τους **Ευρωκώδικες (Eurocodes 0, 1, 2, 8)**.\n\n🏗️ **Προηγμένη Στατική Ανάλυση**:\n- Εκπονούμε τρισδιάστατη δυναμική & ελαστοπλαστική ανάλυση με λογισμικά αιχμής (**ETABS / SAP2000**).\n- Σε ειδικά κτίρια και υψίκορμες κατασκευές εφαρμόζουμε **σεισμική μόνωση βάσης (Base Isolation)** και αποσβεστήρες ενέργειας.",
          suggestedNext: ["materials", "turnkey"],
          elaboration: "Η Ελλάδα βρίσκεται σε **Ζώνη Σεισμικής Επικινδυνότητας III** (η υψηλότερη), γι' αυτό εφαρμόζουμε:\n\n🔬 **Μεθοδολογίες Ανάλυσης**:\n- Ισοδύναμη στατική ανάλυση\n- Δυναμική φασματική ανάλυση\n- Pushover ελαστοπλαστική ανάλυση\n- Μη-γραμμική ανάλυση χρονοϊστορίας\n\n🛡️ **Σύστημα Ασφαλείας**: Κάθε κτίριό μας σχεδιάζεται να αντέχει σεισμό ≥ 0.24g χωρίς δομική βλάβη."
        },
        {
          id: "cost",
          chip: "💶 Προϋπολογισμός & Εκτίμηση Κόστους",
          keywords: ["κοστος", "τιμη", "τιμες", "προυπολογισμος", "ευρω", "euro", "€", "budget", "wizard", "gauger", "ποσο"],
          question: "Πώς μπορώ να υπολογίσω το ενδεικτικό κόστος για το δικό μου έργο;",
          answer: "Για απόλυτη διαφάνεια, αναπτύξαμε τον αλγοριθμικό υπολογιστή **4-Step Cost Gauger Wizard** στο κέντρο αυτής της ιστοσελίδας!\n\n💶 **Πώς Λειτουργεί ο Αλγόριθμος**:\n1. Επιλέγετε τον τομέα (Κατοικία, Εμπορικό, Βιομηχανικό ή Ξενοδοχείο).\n2. Εισάγετε τα επιθυμητά τετραγωνικά μέτρα (m²).\n3. Επιλέγετε τεχνικό επίπεδο (Basic, Advanced BIM ή High-End Turnkey).\nΤο σύστημά μας υπολογίζει αμέσως ενδεικτικό εύρος προϋπολογισμού και εκτιμώμενο χρόνο παράδοσης βάσει πραγματικών δεδομένων αγοράς 2026!",
          suggestedNext: ["turnkey", "time"],
          actionBtn: { label: "🧮 ΑΝΟΙΓΜΑ 4-STEP COST GAUGER WIZARD &rarr;", targetSection: "#gauger" },
          elaboration: "Οι τρέχουσες τιμές αγοράς 2026 στην Ελλάδα:\n\n📊 **Ενδεικτικά Κόστη Κατασκευής ανά m²**:\n- **Βασική Κατοικία**: €1,100 – €1,400/m²\n- **BIM Advanced**: €1,400 – €1,800/m²\n- **High-End Turnkey**: €1,800 – €2,500/m²\n- **Πολυτελής Βίλα**: €2,500 – €4,000+/m²\n\n⚠️ Οι τιμές είναι ενδεικτικές και εξαρτώνται από τοποθεσία, έδαφος και ειδικές απαιτήσεις. Χρησιμοποιήστε τον Wizard για ακριβέστερη εκτίμηση!"
        },
        {
          id: "time",
          chip: "⏱️ Χρονοδιάγραμμα & Διάρκεια Έργου",
          keywords: ["χρονος", "διαρκεια", "ποτε", "μηνες", "χρονοδιαγραμμα", "timeline", "ποτε θα ειναι ετοιμο", "speed"],
          question: "Πόσος χρόνος απαιτείται για τη μελέτη, την αδειοδότηση και την κατασκευή;",
          answer: "Η μεθοδολογία BIM και η in-house ομάδα μας εκμηδενίζουν τις παραδοσιακές καθυστερήσεις.\n\n⏱️ **Ενδεικτικοί Χρόνοι Ολοκλήρωσης**:\n- **Αρχιτεκτονική Μελέτη & Έκδοση e-Άδειας**: 2 έως 4 μήνες.\n- **Πολυτελής Μονοκατοικία (200–400m²)**: 10 έως 14 μήνες.\n- **Εμπορικά & Βιομηχανικά Συγκροτήματα (1000m²+)**: 12 έως 18 μήνες.\n- **Ανακαινίσεις Επαγγελματικών Χώρων**: 2 έως 4 μήνες.\nΕνσωματώνουμε αυστηρές ρήτρες έγκαιρης παράδοσης σε κάθε σύμβαση.",
          suggestedNext: ["permits", "turnkey"],
          elaboration: "Η τυπική αναλυτική ροή ενός κατασκευαστικού έργου:\n\n📅 **Αναλυτικό Χρονοδιάγραμμα**:\n- Μήνας 1-2: Αρχιτεκτονική μελέτη & σχεδιασμός\n- Μήνας 2-3: Στατική & Η/Μ μελέτη\n- Μήνας 3-5: Αδειοδότηση e-Άδεια\n- Μήνας 5-7: Θεμελίωση & σκυρόδεμα\n- Μήνας 7-10: Τοιχοποιίες & στέγη\n- Μήνας 10-12: Η/Μ εγκαταστάσεις & κουφώματα\n- Μήνας 12-14: Φινιρίσματα & παράδοση"
        },
        {
          id: "renovation",
          chip: "🔨 Ανακαινίσεις & Στατική Ενίσχυση",
          keywords: ["ανακαινιση", "αναπαλαιωση", "ενισχυση", "στατικη ενισχυση", "υφισταμενο", "παλιο", "διαμερισμα"],
          question: "Αναλαμβάνετε πολυτελείς ανακαινίσεις και στατική ενίσχυση υφιστάμενων κτιρίων;",
          answer: "Βεβαίως! Εξειδικευόμαστε στον ριζικό εκσυγχρονισμό, την ενεργειακή αναβάθμιση και τη **στατική ενίσχυση** υφιστάμενων κτιρίων και κατοικιών.\n\n🔨 **Οι Υπηρεσίες μας σε Υφιστάμενα Έργα**:\n- Μη καταστροφικοί έλεγχοι αντοχής σκυροδέματος (υπέρηχοι, κρουσιμέτρηση, κρότοι).\n- Ενισχύσεις φέροντος οργανισμού με ανθρακονήματα (FRP) και μανδύες ωπλισμένου σκυροδέματος.\n- Αρχιτεκτονική αναδιαμόρφωση χώρων με 3D φωτορεαλισμό και έξυπνους αυτοματισμούς.",
          suggestedNext: ["nzeb", "grants"],
          elaboration: "Ειδικότερα, στην ανακαίνιση υφιστάμενων κτιρίων:\n\n🔍 **Διαγνωστικά που εκτελούμε**:\n- Κρουσιμέτρηση (Schmidt Hammer Test)\n- Υπερηχογράφημα σκυροδέματος\n- Χημική ανάλυση ενανθράκωσης\n- Αποτύπωση ρηγματώσεων\n\n💰 **Κόστος ανακαίνισης**: Τυπικά €400–€1,200/m² ανάλογα με τη βαθμίδα επέμβασης (αισθητική, ενεργειακή ή δομική)."
        },
        {
          id: "hospitality",
          chip: "🏨 Ξενοδοχεία & Εμπορικά Κτίρια",
          keywords: ["ξενοδοχειο", "τουριστικο", "εμπορικο", "γραφεια", "βιομηχανικο", "resort", "hotel", "cluster"],
          question: "Ποια είναι η εμπειρία σας σε ξενοδοχειακές μονάδες και σύνθετα εμπορικά έργα;",
          answer: "Το γραφείο μας διαθέτει εκτενή εμπειρία στη μελέτη και διαχείριση υψηλών απαιτήσεων έργων φιλοξενίας (Luxury Hotels & Resorts) και επαγγελματικών κτιρίων.\n\n🏨 **Τεχνογνωσία Αιχμής**:\n- Σχεδιασμός βιοκλιματικών τουριστικών συγκροτημάτων με σεβασμό στο φυσικό τοπίο.\n- Εξειδικευμένες μελέτες ακουστικής, φωτισμού και υπερ-σύγχρονων Η/Μ εγκαταστάσεων.\n- Αυστηρό project management για παράδοση εντός χρονοδιαγράμματος πριν την έναρξη της τουριστικής σεζόν.",
          suggestedNext: ["bim", "time"],
          actionBtn: { label: "🏢 ΠΡΟΒΟΛΗ ΞΕΝΟΔΟΧΕΙΑΚΩΝ ΕΡΓΩΝ &rarr;", targetSection: "#portfolio" }
        },
        {
          id: "team",
          chip: "👔 Η Ομάδα & ο Dr. Παντελεός",
          keywords: ["ομαδα", "παντελεος", "μηχανικοι", "αρχιτεκτονες", "βιογραφικο", "συμβουλιο", "εμπειρια", "διευθυντης"],
          question: "Ποιοι αποτελούν την ηγετική ομάδα και το συμβούλιο μηχανικών του γραφείου;",
          answer: "Επικεφαλής του τεχνικού μας γραφείου είναι ο Managing Director **Dr. Αλέξανδρος Παντελεός**, Διδάκτωρ Πολιτικός Μηχανικός με εξειδίκευση στον αντισεισμικό σχεδιασμό και τα συστήματα BIM.\n\n👔 **Η Ηγετική μας Ομάδα (Council)**:\n- **Έλενα Βασιλείου**: Chief Architect & Sustainable Design Specialist.\n- **Μάρκος Στεφανίδης**: Head of Structural Engineering & Finite Element Systems.\n- **Δημήτρης Αλεξίου**: MEP & Energy Automation Director.\nΣυνδυάζουμε ακαδημαϊκή αριστεία με 25+ έτη εργοταξιακής εμπειρίας.",
          suggestedNext: ["turnkey", "contact"],
          actionBtn: { label: "👔 ΓΝΩΡΙΣΤΕ ΤΟ ΣΥΜΒΟΥΛΙΟ ΜΗΧΑΝΙΚΩΝ &rarr;", targetSection: "#team" }
        },
        {
          id: "materials",
          chip: "🧱 Υλικά Αιχμής & Αυτοματισμοί KNX",
          keywords: ["υλικα", "knx", "bms", "αυτοματισμος", "εξυπνο", "smart home", "κουφωματα", "θερμομονωση", "μπετον απο εμφανες"],
          question: "Ποια οικοδομικά υλικά και συστήματα έξυπνου κτιρίου (Smart BMS) χρησιμοποιείτε;",
          answer: "Επιλέγουμε αποκλειστικά πιστοποιημένα υλικά κορυφαίων ευρωπαϊκών οίκων που διασφαλίζουν μακροζωία και αισθητική υπεροχή.\n\n🧱 **Προδιαγραφές Υλικών & Αυτοματισμών**:\n- **Αρχιτεκτονικό Εμφανές Σκυρόδεμα (Fair-faced concrete)** & φυσικοί λίθοι υψηλής αντοχής.\n- **Μονώσεις Αιχμής**: Πετροβάμβακας υψηλής πυραντοχής και εξηλασμένη πολυστερίνη χαμηλού λ.\n- **KNX Smart BMS**: Πλήρης απομακρυσμένος έλεγχος φωτισμού (DALI), κλιματισμού VRV και ασφάλειας μέσω smartphone/tablet.",
          suggestedNext: ["nzeb", "turnkey"]
        },
        {
          id: "topography",
          chip: "🛰️ Τοπογραφικά & Drone GIS",
          keywords: ["τοπογραφικο", "drone", "gps", "gis", "οικοπεδο", "χωροθετηση", "συντελεστης", "δομηση"],
          question: "Πώς εκτελείτε τις τοπογραφικές αποτυπώσεις και τον έλεγχο οικοπέδων;",
          answer: "Η σωστή αρχή κάθε έργου είναι η αλάνθαστη αποτύπωση του εδάφους. Χρησιμοποιούμε εξοπλισμό **GPS Multi-Frequency και Συστήματα Drones (UAV GIS)**.\n\n🛰️ **Τοπογραφική Ακρίβεια**:\n- Δημιουργία ψηφιακών μοντέλων εδάφους (DTM/DEM) με ακρίβεια εκατοστού.\n- Έλεγχος αρτιότητας, οικοδομησιμότητας και δασικών χαρτών σε πραγματικό χρόνο.\n- Βέλτιστη χωροθέτηση του κτιρίου για μέγιστη ηλιακή εκμετάλλευση και ανεμπόδιστη θέα.",
          suggestedNext: ["permits", "bim"]
        },
        {
          id: "grants",
          chip: "🇪🇺 Επιδοτήσεις & Πράσινα Δάνεια",
          keywords: ["επιδοτηση", "εξοικονομω", "δανειο", "πρασινο", "εσπα", "ταμειο ανακαμψης", "χρηματοδοτηση", "grant"],
          question: "Υποστηρίζετε προγράμματα επιδοτήσεων (π.χ. Εξοικονομώ, ΕΣΠΑ) και πράσινη χρηματοδότηση;",
          answer: "Απολύτως! Η εξειδικευμένη ομάδα συμβούλων μας αναλαμβάνει την πλήρη τεχνικοοικονομική μελέτη και ένταξη του ακινήτου σας σε χρηματοδοτικά προγράμματα.\n\n🇪🇺 **Προγράμματα Υποστήριξης**:\n- **Εξοικονομώ 2026** για ριζική ενεργειακή αναβάθμιση κατοικιών.\n- **Προγράμματα ΕΣΠΑ & Ταμείο Ανάκαμψης** για τουριστικές και βιομηχανικές εγκαταστάσεις.\n- Έκδοση Πιστοποιητικών Ενεργειακής Απόδοσης (ΠΕΑ) για πράσινα τραπεζικά δάνεια.",
          suggestedNext: ["nzeb", "renovation"]
        },
        {
          id: "contact",
          chip: "📞 Ραντεβού & Απευθείας Επικοινωνία",
          keywords: ["τηλεφωνο", "τηλ", "ραντεβου", "επικοινωνια", "γραφειο", "χαλκιδα", "email", "info", "που ειστε"],
          question: "Πώς μπορώ να προγραμματίσω μία δια ζώσης ή διαδικτυακή τεχνική συνάντηση;",
          answer: "Μπορείτε να επικοινωνήσετε μαζί μας άμεσα μέσω 3 καναλιών εξυπηρέτησης:\n\n📞 **Τηλεφωνικά**: Στο γραφείο μας στη Χαλκίδα (Καραμουρτζούνη 1) στο **+30 2310 555 890** (Δευτέρα – Παρασκευή, 09:00 – 18:00).\n📧 **Email**: Αποστείλετε τα αρχεία σας (DWG, PDF, τοπογραφικά) στο **panteleos.nrg@gmail.com** για δωρεάν προέλεγχο.\n📋 **Φόρμα Επικοινωνίας**: Συμπληρώστε τη φόρμα στο τέλος της σελίδας και ο Dr. Παντελεός θα επικοινωνήσει μαζί σας εντός 24 ωρών!",
          suggestedNext: ["cost", "team"],
          actionBtn: { label: "📋 ΜΕΤΑΒΑΣΗ ΣΤΗ ΦΟΡΜΑ ΕΠΙΚΟΙΝΩΝΙΑΣ &rarr;", targetSection: "#contact" }
        }
      ]
    },
    en: {
      title: "VIRTUAL ENGINEERING ASSISTANT",
      sub: "Interactive technical answers for e-Adeia permitting, BIM LOD-400 standards, nZEB energy codes, and turnkey construction contracts.",
      resetBtn: "🔄 RESET CHAT",
      chipsLabel: "FREQUENT ARCHITECTURAL QUERIES // SELECT A TOPIC:",
      inputPlaceholder: "Type a question or keyword (e.g. cost, permit, BIM, nZEB, renovation)...",
      sendBtn: "SEND →",
      welcome: "Hello! I am the advanced virtual engineering assistant for **PANTELEOS .NRG**, trained on Greek Building Regulations (NOK/TEE), KENAK energy codes, and ISO 19650 BIM standards.\n\n👉 **How may I assist you today?** Select one of our specialized architectural topics below or type your inquiry in plain natural language.",
      fallback: "Thank you for your inquiry! Your question involves specialized engineering specifications that require customized analysis by our senior team.\n\n💡 **Recommended Action**: Select one of our technical categories below or proceed to our **Project Inquiry form** to speak directly with Dr. Panteleos.",
      typing: "Searching technical specifications...",
      greetingsReply: "Greetings! Welcome to the digital engineering hub of **PANTELEOS .NRG**. I am ready to provide comprehensive data on architectural design, electronic permitting, seismic resilience, nZEB energy optimization, and turnkey project budgets. What topic shall we explore?",
      thanksReply: "You are very welcome! The **PANTELEOS .NRG** team remains at your disposal. Would you like to explore any other specifications?",
      identityReply: "I am the **PANTELEOS .NRG Virtual Engineering Assistant** — a digital consulting guide specifically trained on Greek urban planning legislation (NOK/TEE), Seismic Design Codes, and BIM LOD-400 structural engineering. I am here to guide your development from feasibility to occupancy!",
      suggestLabel: "Related Inquiries:",
      disambiguate: "I noticed your question could relate to multiple topics. Which one interests you most?",
      elaborateReply: "Of course! Let me dive deeper into this topic.",
      yesReply: "Great! How can I help you further?",
      noReply: "Understood. Is there anything else you'd like to explore?",
      frustrationReply: "I completely understand your frustration, and I sincerely apologize for any inconvenience. Your satisfaction is our highest priority.\n\nAs a digital assistant, my capabilities are limited to pre-defined technical information. To address your concern with the personal attention it deserves, I strongly recommend **reaching out directly to our human team**:\n\n📞 **Phone**: +30 2310 555 890\n📧 **Email**: panteleos.nrg@gmail.com\n\nA dedicated team member will be happy to assist you personally.",
      consultSuggest: "💡 I see you're quite interested in this area! Would you like to schedule a **free consultation** with Dr. Panteleos? You can use the contact form at the bottom of the page.",
      compareIntro: "Excellent question! Let's compare them:",
      portfolioIntro: "Based on our portfolio, here are the relevant projects:",
      copied: "Copied!",
      topics: [
        {
          id: "bim",
          chip: "📐 What is BIM LOD-400?",
          keywords: ["bim", "revit", "lod", "lod400", "3d", "cad", "model", "drawing", "clash", "digital"],
          question: "What exactly is BIM LOD-400 and what advantages does it offer over traditional 2D CAD?",
          answer: "**BIM (Building Information Modeling) LOD-400** is the gold standard for fabrication-level digital modeling. Unlike static 2D CAD drawings, we engineer a comprehensive **3D Digital Twin** of your building in Revit.\n\n✅ **Top 3 Advantages**:\n1. **Automated Clash Detection**: We identify design interferences (e.g., MEP piping intersecting structural beams) in software BEFORE construction begins.\n2. **Budgetary Control**: We eliminate site rework and design errors, reducing budget overruns by up to **18%**.\n3. **Precision Bill of Quantities (BOQ)**: Automated, millimeter-accurate material extraction for zero waste.",
          suggestedNext: ["cost", "turnkey"],
          actionBtn: { label: "🏢 VIEW FEATURED CASE STUDIES &rarr;", targetSection: "#portfolio" },
          elaboration: "In detail, LOD-400 means every structural element (column, beam, pipe, electrical line) is modeled with exact fabrication dimensions, supplier codes, and installation positions. This means:\n\n🔹 Site crews receive **3D installation guides** instead of flat drawings.\n🔹 **4D time simulation** shows how construction will progress week by week.\n🔹 **5D cost tracking** produces an automatically updated budget with every design change."
        },
        {
          id: "permits",
          chip: "🏛️ Building Permits & e-Adeia",
          keywords: ["permit", "license", "e-adeia", "adeia", "law", "tee", "authorities", "clearance", "nok", "zoning"],
          question: "How do you handle Greek building permits (e-Adeia) and urban planning compliance?",
          answer: "Our in-house team of civil engineers and architectural specialists manages the **complete** electronic permitting procedure through the Technical Chamber of Greece (TEE) **e-Adeia** platform with 100% legal security.\n\n🏛️ **Our 4-Phase Permitting Process**:\n1. **Topographic Surveying**: Multi-frequency GPS & Drone UAV mapping.\n2. **Zoning & NOK Compliance**: Complete alignment with the Greek New Building Code.\n3. **Authority Approvals**: Securing clearances from the Council of Architecture (SA), Archaeology, Forestry, and Fire Department.\n4. **License Issuance**: Delivery of approved building permits ready for immediate excavation.",
          suggestedNext: ["topography", "time"],
          elaboration: "Specifically, the **e-Adeia** electronic platform is now the exclusive permitting pathway. Our team handles:\n\n📋 **Required Documentation**:\n- Topographic plan & coverage diagram\n- Architectural study per NOK\n- Structural study per EAK/Eurocodes\n- Energy performance study (KENAK)\n- Fire protection study & MEP documentation\n\n⏱️ **Timeline**: Typically 2-4 months for complete permit issuance."
        },
        {
          id: "turnkey",
          chip: "🔑 Turnkey Design & Build Contracts",
          keywords: ["turnkey", "build", "design", "contractor", "construction", "delivery", "handover", "key", "contract"],
          question: "What is included in a Turnkey Design & Build contract?",
          answer: "Under a **Turnkey Design & Build** contract, our engineering studio assumes sole, unified responsibility for the entire lifecycle of your project—from conceptual design through final occupancy handover.\n\n🔑 **Why Choose Turnkey**:\n- **Guaranteed Fixed Budget**: We execute agreements with a locked financial envelope and zero hidden cost escalations.\n- **Single Point of Responsibility**: Zero friction between architects, structural engineers, and site contractors.\n- **ISO 9001 Quality Supervision**: Daily on-site management by our certified engineering directors.",
          suggestedNext: ["cost", "materials"],
          actionBtn: { label: "📋 REQUEST A TURNKEY QUOTE &rarr;", targetSection: "#contact" },
          elaboration: "In a Turnkey contract, the workflow is:\n\n**Phase 1 — Design (2-3 months)**: Architectural drawings, 3D renders, BIM model, structural & MEP studies.\n**Phase 2 — Permitting (2-4 months)**: Full e-Adeia handling, authority approvals.\n**Phase 3 — Construction (8-14 months)**: Excavation, concrete, masonry, MEP, finishes.\n**Phase 4 — Handover**: Completion certification, warranties, key delivery."
        },
        {
          id: "nzeb",
          chip: "⚡ nZEB Energy Buildings & KENAK",
          keywords: ["nzeb", "kenak", "energy", "insulation", "heat pump", "solar", "photovoltaic", "green", "efficiency", "bills"],
          question: "What is a Nearly Zero Energy Building (nZEB) and how does it reduce utility bills?",
          answer: "**nZEB (Nearly Zero Energy Buildings)** represent the elite standard in sustainable construction under the Greek KENAK energy code, producing nearly as much energy as they consume.\n\n⚡ **Technological Superiority**:\n- **Thermal Shell & Glazing**: Certified external thermal insulation and thermal-break aluminum systems.\n- **High-Efficiency MEP**: VRV/VRF inverter heat pumps, underfloor heating, and solar Net-Metering photovoltaics.\n- **KNX Smart Automation**: Automated intelligence optimizing lighting, HVAC, and solar shading.\n\n💶 **Financial Return**: **70–85% reduction in annual utility bills** and a **+25% resale valuation premium**!",
          suggestedNext: ["grants", "materials"],
          elaboration: "The new KENAK (Building Energy Performance Regulation) from 01/01/2025 requires:\n\n📊 **Minimum Requirements**:\n- Energy Class **A+** or higher for new buildings\n- Wall U-value ≤ 0.35 W/m²K\n- Window U-value ≤ 1.50 W/m²K\n- RES installation (photovoltaics or heat pump)\n\n💡 Our team designs buildings that exceed minimum requirements by **30-40%**, ensuring maximum future value."
        },
        {
          id: "seismic",
          chip: "🏗️ Seismic Protection & Eurocodes",
          keywords: ["seismic", "earthquake", "structural", "concrete", "steel", "eak", "ekos", "eurocode", "etabs", "sap2000", "safety"],
          question: "What engineering standards and technologies do you apply for earthquake resilience?",
          answer: "Structural integrity and human safety are our non-negotiable foundations. All structural calculations are performed using advanced finite element software (**ETABS / SAP2000**), exceeding Greek Seismic Codes (EAK/EKOS) and European Standards (**Eurocodes 0, 1, 2, 8**).\n\n🏗️ **Advanced Structural Engineering**:\n- 3D dynamic modal and elastoplastic finite element analysis.\n- For high-demand structures, we engineer **Seismic Base Isolation foundations** and elastomeric energy dampers, ensuring zero damage even under extreme earthquakes.",
          suggestedNext: ["materials", "turnkey"],
          elaboration: "Greece sits in **Seismic Hazard Zone III** (the highest), so we apply:\n\n🔬 **Analysis Methods**:\n- Equivalent static analysis\n- Dynamic spectral analysis\n- Pushover elastoplastic analysis\n- Non-linear time history analysis\n\n🛡️ **Safety System**: Every building we design withstands earthquakes ≥ 0.24g without structural damage."
        },
        {
          id: "cost",
          chip: "💶 Cost Estimation & Budgeting",
          keywords: ["cost", "price", "pricing", "budget", "estimate", "estimation", "euro", "€", "wizard", "gauger", "how much"],
          question: "How can I estimate the preliminary construction budget for my project?",
          answer: "For real-time financial transparency, we engineered the algorithmic **4-Step Cost Gauger Wizard** located directly on this website!\n\n💶 **How the Algorithm Works**:\n1. Select your project sector typology (Residential, Commercial, Industrial, or Hospitality).\n2. Input desired gross footprint area (m²).\n3. Choose specification tier (Basic, Advanced BIM, or High-End Turnkey).\nOur system computes an immediate budgetary envelope and projected timeline based on 2026 construction market data!",
          suggestedNext: ["turnkey", "time"],
          actionBtn: { label: "🧮 LAUNCH 4-STEP COST GAUGER WIZARD &rarr;", targetSection: "#gauger" },
          elaboration: "Current 2026 market prices in Greece:\n\n📊 **Indicative Construction Costs per m²**:\n- **Basic Residential**: €1,100 – €1,400/m²\n- **BIM Advanced**: €1,400 – €1,800/m²\n- **High-End Turnkey**: €1,800 – €2,500/m²\n- **Luxury Villa**: €2,500 – €4,000+/m²\n\n⚠️ Prices are indicative and depend on location, terrain, and special requirements. Use the Wizard for a more accurate estimate!"
        },
        {
          id: "time",
          chip: "⏱️ Project Timeline & Duration",
          keywords: ["time", "timeline", "duration", "when", "months", "schedule", "how long", "speed"],
          question: "How long does the engineering design, permitting, and construction process take?",
          answer: "Our BIM pre-construction workflow and in-house team eliminate traditional construction delays.\n\n⏱️ **Typical Project Timelines**:\n- **Architectural Design & e-Adeia Permitting**: 2 to 4 months.\n- **Luxury Turnkey Residence (200–400m²)**: 10 to 14 months.\n- **Commercial / Industrial Clusters (1000m²+)**: 12 to 18 months.\n- **Commercial Workplace Renovations**: 2 to 4 months.\nWe embed strict delivery milestone clauses and weekly digital progress reporting.",
          suggestedNext: ["permits", "turnkey"],
          elaboration: "The typical detailed workflow for a construction project:\n\n📅 **Detailed Timeline**:\n- Month 1-2: Architectural study & design\n- Month 2-3: Structural & MEP study\n- Month 3-5: e-Adeia permitting\n- Month 5-7: Foundation & concrete\n- Month 7-10: Masonry & roofing\n- Month 10-12: MEP installations & glazing\n- Month 12-14: Finishes & handover"
        },
        {
          id: "renovation",
          chip: "🔨 Luxury Renovations & Retrofitting",
          keywords: ["renovation", "refurbishment", "retrofitting", "strengthening", "existing", "old", "apartment"],
          question: "Do you undertake luxury renovations and structural retrofitting of existing buildings?",
          answer: "Yes! We specialize in radical architectural modernization, energy efficiency upgrades, and **structural strengthening** of existing residential and commercial structures.\n\n🔨 **Our Existing Building Services**:\n- Non-destructive concrete strength testing (ultrasonic, Schmidt hammer, carbonation testing).\n- Structural reinforcement using carbon fiber wrap (FRP) and reinforced concrete jacketing.\n- Architectural interior remodeling with 3D photorealistic rendering and smart home automation.",
          suggestedNext: ["nzeb", "grants"],
          elaboration: "Specifically, in existing building renovations:\n\n🔍 **Diagnostics we perform**:\n- Schmidt Hammer Test\n- Ultrasonic concrete scanning\n- Chemical carbonation analysis\n- Crack pattern mapping\n\n💰 **Renovation costs**: Typically €400–€1,200/m² depending on intervention level (aesthetic, energy, or structural)."
        },
        {
          id: "hospitality",
          chip: "🏨 Hotels & Commercial Developments",
          keywords: ["hotel", "resort", "hospitality", "commercial", "offices", "industrial", "cluster", "tourism"],
          question: "What is your experience in hotel developments and complex commercial facilities?",
          answer: "Our studio has extensive experience engineering and managing high-performance hospitality developments (Luxury Hotels & Resorts) and corporate workplace clusters.\n\n🏨 **Hospitality Expertise**:\n- Bioclimatic architectural design harmonized with natural Aegean and Mediterranean landscapes.\n- Specialized acoustics, architectural lighting, and ultra-efficient HVAC MEP installations.\n- Strict project management ensuring delivery before the start of the commercial tourism season.",
          suggestedNext: ["bim", "time"],
          actionBtn: { label: "🏢 VIEW HOSPITALITY CASE STUDIES &rarr;", targetSection: "#portfolio" }
        },
        {
          id: "team",
          chip: "👔 Our Leadership & Dr. Panteleos",
          keywords: ["team", "panteleos", "engineers", "architects", "council", "leadership", "who", "director"],
          question: "Who leads the engineering team and architectural council of the firm?",
          answer: "Our technical office is led by Managing Director **Dr. Alexandros Panteleos**, Ph.D. Civil Engineer specializing in seismic design and advanced BIM methodologies.\n\n👔 **Our Leadership Council**:\n- **Elena Vasileiou**: Chief Architect & Sustainable Design Specialist.\n- **Markos Stefanidis**: Head of Structural Engineering & Finite Element Systems.\n- **Dimitris Alexiou**: MEP & Energy Automation Director.\nWe combine doctoral academic excellence with over 25 years of on-site construction mastery.",
          suggestedNext: ["turnkey", "contact"],
          actionBtn: { label: "👔 MEET THE LEADERSHIP COUNCIL &rarr;", targetSection: "#team" }
        },
        {
          id: "materials",
          chip: "🧱 High-End Materials & KNX Smart Home",
          keywords: ["materials", "knx", "bms", "automation", "smart", "glazing", "insulation", "concrete", "stone"],
          question: "What construction materials and smart building automation (BMS) do you specify?",
          answer: "We specify exclusively certified, premium European construction materials that ensure longevity, zero maintenance, and visual superiority.\n\n🧱 **Material & Automation Standards**:\n- **Architectural Fair-faced Concrete** & natural high-strength marble/stone surfaces.\n- **Advanced Insulation**: High-density fireproof rockwool and extruded polystyrene.\n- **KNX Smart BMS**: Full remote control over DALI architectural lighting, VRV climate control, and biometric security via mobile devices.",
          suggestedNext: ["nzeb", "turnkey"]
        },
        {
          id: "topography",
          chip: "🛰️ Topography & Drone UAV GIS",
          keywords: ["topography", "drone", "gps", "uav", "gis", "plot", "land", "survey", "zoning", "feasibility"],
          question: "How do you execute topographic surveys and plot feasibility analysis?",
          answer: "Every successful structure begins with flawless terrain surveying. We utilize **Multi-Frequency GPS receivers and UAV Drone GIS Mapping systems**.\n\n🛰️ **Topographic Precision**:\n- Generation of Digital Terrain Models (DTM/DEM) with centimeter-level accuracy.\n- Real-time verification of zoning boundaries, forestry clearance, and building coefficients.\n- Optimal solar orientation and viewshed orientation for your building footprint.",
          suggestedNext: ["permits", "bim"]
        },
        {
          id: "grants",
          chip: "🇪🇺 Green Financing & Subsidies",
          keywords: ["grant", "subsidy", "funding", "green loan", "bank", "eu", "recovery fund", "exoikonomo"],
          question: "Do you assist with green financing, EU subsidies, or energy upgrade programs?",
          answer: "Absolutely! Our financial engineering advisors handle the complete technical study and application process for national and European funding frameworks.\n\n🇪🇺 **Supported Frameworks**:\n- **Greek 'Exoikonomo' 2026** for residential energy retrofitting subsidies.\n- **EU Recovery & Resilience Fund / ESPA** for commercial and industrial green transformations.\n- Issuance of official Energy Performance Certificates (PEA) qualifying for subsidized green mortgages.",
          suggestedNext: ["nzeb", "renovation"]
        },
        {
          id: "contact",
          chip: "📞 Appointments & Direct Contact",
          keywords: ["contact", "call", "phone", "email", "appointment", "meeting", "consultation", "office", "chalkida", "where", "reach"],
          question: "How can I schedule an in-person or virtual technical consultation?",
          answer: "You can connect with our engineering leadership via 3 direct communication channels:\n\n📞 **Telephone**: Call our Chalkida office (Karamourtzouni 1) at **+30 2310 555 890** (Monday – Friday, 09:00 – 18:00 EET).\n📧 **Email**: Send your architectural brief or DWG/PDF drawings to **panteleos.nrg@gmail.com** for a complimentary feasibility review.\n📋 **Project Inquiry Form**: Complete the contact form at the bottom of this page and Dr. Panteleos will reach out within 24 hours!",
          suggestedNext: ["cost", "team"],
          actionBtn: { label: "📋 PROCEED TO CONTACT FORM &rarr;", targetSection: "#contact" }
        }
      ]
    }
  };


  // ═══════════════════════════════════════════════════════════════════════
  //  SECTION 2: SYNONYM & PHRASE EXPANSION MAPS
  // ═══════════════════════════════════════════════════════════════════════

  // Maps natural phrases/synonyms → topic IDs for both languages
  const SYNONYM_MAP = {
    // Greek natural phrases
    "θελω να χτισω": ["turnkey", "cost"],
    "θελω να κτισω": ["turnkey", "cost"],
    "χτισιμο σπιτιου": ["turnkey", "cost"],
    "κτισιμο σπιτιου": ["turnkey", "cost"],
    "φτιαξω σπιτι": ["turnkey", "cost"],
    "καινουριο σπιτι": ["turnkey", "cost"],
    "νεο σπιτι": ["turnkey", "cost"],
    "νεα κατοικια": ["turnkey", "cost"],
    "νεοδμητο": ["turnkey", "cost"],
    "ποσο κοστιζει": ["cost"],
    "ποσα λεφτα": ["cost"],
    "ποσα χρηματα": ["cost"],
    "τι τιμη": ["cost"],
    "τι κοστος": ["cost"],
    "ακριβο": ["cost"],
    "φθηνο": ["cost"],
    "οικονομικο": ["cost"],
    "σεισμος": ["seismic"],
    "αντισεισμικο": ["seismic"],
    "ασφαλες σπιτι": ["seismic"],
    "ασφαλεια σεισμου": ["seismic"],
    "μπορω να χτισω": ["permits", "topography"],
    "εχω οικοπεδο": ["permits", "topography"],
    "αγορασα οικοπεδο": ["permits", "topography"],
    "αδεια οικοδομης": ["permits"],
    "ποσο θα παρει": ["time"],
    "ποσο χρονο": ["time"],
    "ποσο θα καθυστερησει": ["time"],
    "ποσοι μηνες": ["time"],
    "πρασινο σπιτι": ["nzeb"],
    "οικολογικο": ["nzeb"],
    "εξοικονομηση ενεργειας": ["nzeb"],
    "λογαριασμοι ρευματος": ["nzeb"],
    "μειωση ρευματος": ["nzeb"],
    "ηλιακα πανελ": ["nzeb"],
    "φωτοβολταικα πανελ": ["nzeb"],
    "επισκευη σπιτιου": ["renovation"],
    "ανακαινιση διαμερισματος": ["renovation"],
    "παλιο σπιτι": ["renovation"],
    "εξοικονομω": ["grants"],
    "ποιοι ειστε": ["team"],
    "ποιος ειστε": ["team"],
    "ποιος ειναι": ["team"],
    "εμπειρια σας": ["team"],
    // English natural phrases
    "build a house": ["turnkey", "cost"],
    "build a home": ["turnkey", "cost"],
    "new house": ["turnkey", "cost"],
    "new home": ["turnkey", "cost"],
    "construct a building": ["turnkey", "cost"],
    "construction project": ["turnkey"],
    "how much does it cost": ["cost"],
    "what does it cost": ["cost"],
    "how expensive": ["cost"],
    "affordable": ["cost"],
    "cheap": ["cost"],
    "pricing": ["cost"],
    "earthquake safe": ["seismic"],
    "earthquake proof": ["seismic"],
    "earthquake resistant": ["seismic"],
    "earthquake protection": ["seismic"],
    "is it safe": ["seismic"],
    "building permit": ["permits"],
    "need a permit": ["permits"],
    "planning permission": ["permits"],
    "can i build": ["permits", "topography"],
    "i have land": ["permits", "topography"],
    "bought a plot": ["permits", "topography"],
    "i own a plot": ["permits", "topography"],
    "how long does it take": ["time"],
    "how long will it take": ["time"],
    "when will it be ready": ["time"],
    "completion time": ["time"],
    "delivery date": ["time"],
    "green building": ["nzeb"],
    "energy efficient": ["nzeb"],
    "reduce bills": ["nzeb"],
    "save energy": ["nzeb"],
    "solar panels": ["nzeb"],
    "heat pump": ["nzeb"],
    "renovate": ["renovation"],
    "fix my house": ["renovation"],
    "old building": ["renovation"],
    "refurbish": ["renovation"],
    "who are you": ["team"],
    "your team": ["team"],
    "your experience": ["team"],
    "about you": ["team"],
    "subsidy": ["grants"],
    "government program": ["grants"],
    "financial aid": ["grants"],
    "smart home": ["materials"],
    "home automation": ["materials"],
    "what materials": ["materials"],
    "drone survey": ["topography"],
    "land survey": ["topography"],
    "plot survey": ["topography"],
    "build hotel": ["hospitality"],
    "hotel project": ["hospitality"],
    "resort": ["hospitality"],
    "tourism": ["hospitality"],
    "commercial building": ["hospitality"],
    "office building": ["hospitality"],
    "difference between": [],  // handled by comparison logic
    "compare": [],             // handled by comparison logic
    "vs": []                   // handled by comparison logic
  };

  // Comparison knowledge base — pairs of topics that can be compared
  const COMPARISONS = {
    "bim_permits": {
      el: "📐 **BIM LOD-400** vs 🏛️ **Οικοδομική Άδεια**:\n\nΤο BIM αφορά τη **ψηφιακή μοντελοποίηση** του κτιρίου (3D σχεδιασμός, clash detection, BOQ). Η οικοδομική άδεια αφορά τη **νομική αδειοδότηση** μέσω e-Άδεια.\n\n🔗 Αλληλοσυνδέονται: Χρησιμοποιούμε το BIM μοντέλο για να παράγουμε αυτόματα τα σχέδια που απαιτεί η πολεοδομία.",
      en: "📐 **BIM LOD-400** vs 🏛️ **Building Permit**:\n\nBIM is about **digital modeling** of the building (3D design, clash detection, BOQ). The building permit is about **legal authorization** via e-Adeia.\n\n🔗 They're interconnected: We use the BIM model to automatically generate the drawings required by planning authorities."
    },
    "turnkey_bim": {
      el: "🔑 **Turnkey** vs 📐 **BIM**:\n\nΤο **Turnkey** είναι η **σύμβαση εκτέλεσης** (μελέτη + κατασκευή υπό ενιαία ευθύνη). Το **BIM** είναι η **μεθοδολογία σχεδιασμού** (ψηφιακό μοντέλο LOD-400).\n\n🔗 Κάθε Turnkey μας περιλαμβάνει αυτόματα BIM LOD-400 — είναι ο τρόπος εργασίας μας, όχι πρόσθετο.",
      en: "🔑 **Turnkey** vs 📐 **BIM**:\n\n**Turnkey** is the **contract model** (design + construction under single responsibility). **BIM** is the **design methodology** (LOD-400 digital model).\n\n🔗 Every Turnkey project of ours automatically includes BIM LOD-400 — it's our working method, not an add-on."
    },
    "nzeb_renovation": {
      el: "⚡ **nZEB** vs 🔨 **Ανακαίνιση**:\n\nΤο **nZEB** αφορά κτίρια σχεδόν μηδενικής ενεργειακής κατανάλωσης (νέα ή αναβαθμισμένα). Η **ανακαίνιση** αφορά τη βελτίωση υφιστάμενων κτιρίων (αισθητική, δομική, ενεργειακή).\n\n🔗 Μπορούν να συνδυαστούν: Μια ενεργειακή ανακαίνιση μπορεί να αναβαθμίσει ένα παλιό κτίριο σε πρότυπο nZEB!",
      en: "⚡ **nZEB** vs 🔨 **Renovation**:\n\n**nZEB** refers to nearly zero energy buildings (new or upgraded). **Renovation** refers to improving existing buildings (aesthetic, structural, energy).\n\n🔗 They can be combined: An energy renovation can upgrade an old building to nZEB standards!"
    },
    "cost_time": {
      el: "💶 **Κόστος** vs ⏱️ **Χρονοδιάγραμμα**:\n\nΤο κόστος εξαρτάται από τετραγωνικά, προδιαγραφές και τοποθεσία. Ο χρόνος εξαρτάται από πολυπλοκότητα, αδειοδότηση και καιρικές συνθήκες.\n\n📊 Γενικός κανόνας: Υψηλότερο budget = γρηγορότερη ολοκλήρωση (περισσότερα συνεργεία, premium υλικά χωρίς αναμονή).",
      en: "💶 **Cost** vs ⏱️ **Timeline**:\n\nCost depends on square meters, specifications, and location. Timeline depends on complexity, permitting, and weather conditions.\n\n📊 General rule: Higher budget = faster completion (more crews, premium materials with no lead time)."
    },
    "seismic_materials": {
      el: "🏗️ **Αντισεισμικό** vs 🧱 **Υλικά**:\n\nΗ αντισεισμικότητα αφορά τον **στατικό σχεδιασμό** (σίδερα, μπετόν, μέθοδοι ανάλυσης). Τα υλικά αφορά τα **φινιρίσματα και αυτοματισμούς** (κουφώματα, KNX, μονώσεις).\n\n🔗 Σε εμάς, η αντισεισμική μελέτη καθορίζει τον φέροντα οργανισμό, και μετά επιλέγουμε premium υλικά για αισθητική και ενεργειακή απόδοση.",
      en: "🏗️ **Seismic** vs 🧱 **Materials**:\n\nSeismic protection is about **structural design** (rebar, concrete, analysis methods). Materials refers to **finishes and automation** (glazing, KNX, insulation).\n\n🔗 In our workflow, the seismic study defines the structural skeleton, then we select premium materials for aesthetics and energy performance."
    }
  };

  // Portfolio knowledge base — key projects
  const PORTFOLIO_DATA = [
    { name: "Thessaloniki Port Bio-Cluster", type: "commercial", area: "6,400 m²", duration: "24 Months", tags: ["commercial", "bim", "hospitality"] },
    { name: "Aegean Luxury Villa Collection", type: "residential", area: "850 m²", duration: "14 Months", tags: ["turnkey", "nzeb", "materials"] },
    { name: "Halkidiki Boutique Resort", type: "hospitality", area: "3,200 m²", duration: "18 Months", tags: ["hospitality", "bim", "turnkey"] },
    { name: "Athens Office Tower Retrofit", type: "commercial", area: "4,800 m²", duration: "10 Months", tags: ["renovation", "seismic", "nzeb"] },
    { name: "Evia Agricultural Complex", type: "industrial", area: "2,100 m²", duration: "12 Months", tags: ["turnkey", "permits"] }
  ];


  // ═══════════════════════════════════════════════════════════════════════
  //  SECTION 3: STATE MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════

  let currentLang = localStorage.getItem('panteleos_lang') || 'el';
  let isTyping = false;

  // Conversation memory — full history
  let conversationHistory = [];
  let topicInteractionCount = {};  // track how many times a topic was discussed

  function getLastTopicId() {
    for (let i = conversationHistory.length - 1; i >= 0; i--) {
      if (conversationHistory[i].topicId) return conversationHistory[i].topicId;
    }
    return null;
  }

  function addToHistory(role, topicId = null, intent = null) {
    conversationHistory.push({ role, topicId, intent, timestamp: Date.now() });
    if (topicId) {
      topicInteractionCount[topicId] = (topicInteractionCount[topicId] || 0) + 1;
    }
  }

  function getTotalExchanges() {
    return conversationHistory.filter(h => h.role === 'user').length;
  }


  // ═══════════════════════════════════════════════════════════════════════
  //  SECTION 4: NLP ENGINE — Normalization, Fuzzy Matching, Scoring
  // ═══════════════════════════════════════════════════════════════════════

  function normalizeText(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')  // Strip Greek diacritics/accents
      .replace(/[^\w\sα-ω]/gi, '')      // Remove punctuation
      .trim();
  }

  function isFuzzyMatch(token, keyword) {
    const normToken = normalizeText(token);
    const normKw = normalizeText(keyword);
    if (!normToken || !normKw) return false;

    if (normToken.includes(normKw) || normKw.includes(normToken)) return true;

    // Root prefix check (≥4 chars)
    if (normToken.length >= 4 && normKw.length >= 4) {
      if (normToken.startsWith(normKw.slice(0, 4)) || normKw.startsWith(normToken.slice(0, 4))) {
        return true;
      }
    }

    // Levenshtein distance for short words (typo tolerance)
    if (normToken.length >= 4 && normKw.length >= 4) {
      const dist = levenshtein(normToken, normKw);
      if (dist <= 1 && Math.max(normToken.length, normKw.length) >= 5) return true;
    }
    return false;
  }

  function levenshtein(a, b) {
    const m = a.length, n = b.length;
    if (m === 0) return n;
    if (n === 0) return m;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        dp[i][j] = a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
    return dp[m][n];
  }

  // Intent patterns — detect question type
  function detectIntent(normQuery) {
    // Cost intent
    if (/ποσο|κοστ|τιμ|λεφτ|χρημ|ευρω|€|πληρ|budget|cost|price|expens|afford|cheap|how much|what.*cost/i.test(normQuery)) {
      return 'cost';
    }
    // Time intent
    if (/ποτε|χρον|διαρκ|μην|παρ.*κλειδ|when|how long|timeline|duration|month|deliver|ready/i.test(normQuery)) {
      return 'time';
    }
    // Ability intent
    if (/μπορ|κανε|αναλαμβ|προσφ|can you|do you|are you able|offer|provide/i.test(normQuery)) {
      return 'ability';
    }
    // Definition intent
    if (/τι ειναι|τι σημαινει|εξηγ|what is|what does|explain|define|meaning/i.test(normQuery)) {
      return 'definition';
    }
    // Comparison intent
    if (/διαφορ|συγκρ|εναντι|vs|compare|difference|between|versus/i.test(normQuery)) {
      return 'comparison';
    }
    // Location intent
    if (/που ει|διευθ|τοποθ|where|location|address|office|find you/i.test(normQuery)) {
      return 'location';
    }
    return null;
  }

  // Score all topics against a user query
  function scoreTopics(normQuery, words, data) {
    const scored = [];

    // 1. Check synonym/phrase map first — highest priority
    const phraseHits = {};
    for (const [phrase, topicIds] of Object.entries(SYNONYM_MAP)) {
      if (normQuery.includes(normalizeText(phrase))) {
        topicIds.forEach(tid => {
          phraseHits[tid] = (phraseHits[tid] || 0) + 5;
        });
      }
    }

    // 2. Score each topic
    data.topics.forEach(topic => {
      let score = phraseHits[topic.id] || 0;

      // Keyword matching
      topic.keywords.forEach(kw => {
        const normKw = normalizeText(kw);
        if (normQuery.includes(normKw)) {
          // Exact substring: higher score for longer keywords (more specific)
          score += normKw.length >= 5 ? 4 : 3;
        } else {
          words.forEach(word => {
            if (isFuzzyMatch(word, kw)) {
              score += 2;
            }
          });
        }
      });

      // Bonus for multi-word keyword matches (phrase-level)
      topic.keywords.filter(kw => kw.includes(' ')).forEach(kw => {
        if (normQuery.includes(normalizeText(kw))) {
          score += 3; // extra bonus for multi-word keyword match
        }
      });

      if (score > 0) {
        scored.push({ topic, score });
      }
    });

    scored.sort((a, b) => b.score - a.score);
    return scored;
  }


  // ═══════════════════════════════════════════════════════════════════════
  //  SECTION 5: CHATBOT INITIALIZATION & UI
  // ═══════════════════════════════════════════════════════════════════════

  let autocompleteEl = null;

  function initChatbot() {
    const windowEl = document.getElementById('chat-window');
    const chipsEl = document.getElementById('chat-chips');
    const formEl = document.getElementById('chat-form');
    const inputEl = document.getElementById('chat-input');
    const resetBtn = document.getElementById('chat-reset-btn');

    if (!windowEl || !chipsEl || !formEl) return;

    renderLanguageUI();
    resetConversation();

    resetBtn.addEventListener('click', () => {
      resetConversation();
    });

    formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = inputEl.value.trim();
      if (!query || isTyping) return;
      inputEl.value = '';
      hideAutocomplete();
      handleUserMessage(query);
    });

    // Autocomplete on input
    inputEl.addEventListener('input', () => {
      const val = inputEl.value.trim();
      if (val.length >= 2) {
        showAutocomplete(val);
      } else {
        hideAutocomplete();
      }
    });

    inputEl.addEventListener('blur', () => {
      setTimeout(hideAutocomplete, 200);
    });
  }

  const svgIcon = (str) => window.replaceEmojisWithSVG ? window.replaceEmojisWithSVG(str) : str;

  function getChatAvatar(sender) {
    if (sender === 'bot') {
      return `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`;
    }
    return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
  }

  function renderLanguageUI() {
    const data = CHAT_DATA[currentLang] || CHAT_DATA.el;
    
    const titleEl = document.getElementById('bot-title');
    const subEl = document.getElementById('bot-sub');
    const resetBtn = document.getElementById('chat-reset-btn');
    const chipsLabel = document.getElementById('chat-chips-label');
    const inputEl = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send-btn');
    const chipsEl = document.getElementById('chat-chips');

    if (titleEl) titleEl.innerHTML = svgIcon(data.title);
    if (subEl) subEl.innerHTML = svgIcon(data.sub);
    if (resetBtn && resetBtn.querySelector('span')) resetBtn.querySelector('span').innerHTML = svgIcon(data.resetBtn);
    if (chipsLabel) chipsLabel.innerHTML = svgIcon(data.chipsLabel);
    if (inputEl) inputEl.setAttribute('placeholder', data.inputPlaceholder);
    if (sendBtn) sendBtn.innerHTML = svgIcon(data.sendBtn);

    if (chipsEl) {
      chipsEl.innerHTML = '';
      
      // 1. Desktop Chips Container (Visible on Desktop, Hidden on Mobile via CSS)
      const desktopWrap = document.createElement('div');
      desktopWrap.className = 'desktop-chips-wrap';
      
      // 2. Mobile Dropdown Menu Container (Visible on Mobile, Hidden on Desktop via CSS)
      const mobileWrap = document.createElement('div');
      mobileWrap.className = 'mobile-topics-dropdown-wrap';
      
      const selectEl = document.createElement('select');
      selectEl.className = 'mobile-topics-select';
      selectEl.setAttribute('aria-label', currentLang === 'en' ? 'Select Topic Question' : 'Επιλέξτε Θέμα Ερώτησης');
      
      const defaultOpt = document.createElement('option');
      defaultOpt.value = '';
      defaultOpt.textContent = currentLang === 'en' ? '── Select Topic Question ──' : '── Επιλέξτε Θέμα Ερώτησης ──';
      selectEl.appendChild(defaultOpt);

      data.topics.forEach((topic, idx) => {
        // Create Desktop Button Chip
        const chip = document.createElement('button');
        chip.className = 'chat-chip';
        chip.innerHTML = svgIcon(topic.chip);
        chip.addEventListener('click', () => {
          if (isTyping) return;
          handleTopicClick(topic);
        });
        desktopWrap.appendChild(chip);

        // Create Mobile Option
        const opt = document.createElement('option');
        opt.value = idx;
        const cleanText = topic.chip.replace(/<[^>]*>?/gm, '').trim();
        opt.textContent = cleanText;
        selectEl.appendChild(opt);
      });

      selectEl.addEventListener('change', (e) => {
        const selectedIdx = e.target.value;
        if (selectedIdx === '' || isTyping) return;
        const selectedTopic = data.topics[selectedIdx];
        if (selectedTopic) {
          handleTopicClick(selectedTopic);
        }
        selectEl.value = '';
      });

      mobileWrap.appendChild(selectEl);
      chipsEl.appendChild(desktopWrap);
      chipsEl.appendChild(mobileWrap);
    }
  }

  function resetConversation() {
    const windowEl = document.getElementById('chat-window');
    if (!windowEl) return;

    windowEl.innerHTML = '';
    conversationHistory = [];
    topicInteractionCount = {};
    const data = CHAT_DATA[currentLang] || CHAT_DATA.el;
    appendMessage('bot', data.welcome, false, null, ["bim", "cost", "turnkey"]);
  }


  // ═══════════════════════════════════════════════════════════════════════
  //  SECTION 6: MESSAGE RENDERING — timestamps, copy, rating
  // ═══════════════════════════════════════════════════════════════════════

  function getTimeString() {
    const now = new Date();
    return now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  }

  function appendMessage(sender, text, animate = true, actionBtn = null, suggestIds = null, inlineOptions = null) {
    const windowEl = document.getElementById('chat-window');
    if (!windowEl) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;
    if (!animate) msgDiv.style.animation = 'none';

    const avatar = document.createElement('div');
    avatar.className = 'chat-avatar';
    avatar.innerHTML = getChatAvatar(sender);

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    
    let formatted = svgIcon(text)
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');
    bubble.innerHTML = formatted;

    // Timestamp
    const timeEl = document.createElement('div');
    timeEl.className = 'chat-timestamp';
    timeEl.textContent = getTimeString();
    bubble.appendChild(timeEl);

    // Bot-specific extras: copy button, action button, rating, suggestions
    if (sender === 'bot') {
      // Copy button
      const copyBtn = document.createElement('button');
      copyBtn.className = 'chat-copy-btn';
      copyBtn.innerHTML = svgIcon('📋');
      copyBtn.title = currentLang === 'el' ? 'Αντιγραφή' : 'Copy';
      copyBtn.addEventListener('click', () => {
        const plainText = text.replace(/\*\*/g, '').replace(/\\n/g, '\n');
        navigator.clipboard.writeText(plainText).then(() => {
          const data = CHAT_DATA[currentLang] || CHAT_DATA.el;
          copyBtn.innerHTML = svgIcon('✅');
          setTimeout(() => { copyBtn.innerHTML = svgIcon('📋'); }, 1500);
        }).catch(() => {});
      });
      bubble.appendChild(copyBtn);

      // Action button
      if (actionBtn && actionBtn.label && actionBtn.targetSection) {
        const btnEl = document.createElement('button');
        btnEl.className = 'chat-action-btn';
        btnEl.innerHTML = svgIcon(actionBtn.label);
        btnEl.addEventListener('click', () => {
          const targetEl = document.querySelector(actionBtn.targetSection);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
            targetEl.style.transition = 'box-shadow 0.5s ease';
            targetEl.style.boxShadow = '0 0 30px rgba(0, 229, 255, 0.4)';
            setTimeout(() => { targetEl.style.boxShadow = 'none'; }, 2000);
          }
        });
        bubble.appendChild(btnEl);
      }

      // Inline quick-reply options (for disambiguation / clarifying questions)
      if (inlineOptions && inlineOptions.length > 0) {
        const optRow = document.createElement('div');
        optRow.className = 'chat-inline-options';
        inlineOptions.forEach(opt => {
          const optBtn = document.createElement('button');
          optBtn.className = 'chat-suggest-chip';
          optBtn.innerHTML = svgIcon(opt.label);
          optBtn.addEventListener('click', () => {
            if (isTyping) return;
            // Remove the inline options row after click
            optRow.remove();
            if (opt.topicId) {
              const data = CHAT_DATA[currentLang] || CHAT_DATA.el;
              const t = data.topics.find(tp => tp.id === opt.topicId);
              if (t) handleTopicClick(t);
            } else if (opt.action) {
              opt.action();
            }
          });
          optRow.appendChild(optBtn);
        });
        bubble.appendChild(optRow);
      }

      // Suggestion chips
      if (suggestIds && suggestIds.length > 0) {
        const data = CHAT_DATA[currentLang] || CHAT_DATA.el;
        const suggestRow = document.createElement('div');
        suggestRow.className = 'chat-suggest-row';
        
        const labelSpan = document.createElement('span');
        labelSpan.style.cssText = 'font-size: 11px; color: var(--charcoal-50); font-family: var(--font-mono); width: 100%; font-weight: 700;';
        labelSpan.innerHTML = svgIcon(data.suggestLabel);
        suggestRow.appendChild(labelSpan);

        suggestIds.forEach(sid => {
          const targetTopic = data.topics.find(t => t.id === sid);
          if (targetTopic) {
            const sChip = document.createElement('button');
            sChip.className = 'chat-suggest-chip';
            sChip.innerHTML = svgIcon(targetTopic.chip);
            sChip.addEventListener('click', () => {
              if (isTyping) return;
              handleTopicClick(targetTopic);
            });
            suggestRow.appendChild(sChip);
          }
        });
        bubble.appendChild(suggestRow);
      }

      // Satisfaction rating (only for substantive answers, not system messages)
      if (animate && text.length > 100) {
        const ratingRow = document.createElement('div');
        ratingRow.className = 'chat-rating-row';
        
        const upBtn = document.createElement('button');
        upBtn.className = 'chat-rate-btn';
        upBtn.innerHTML = svgIcon('👍');
        upBtn.addEventListener('click', () => {
          ratingRow.innerHTML = svgIcon('<span style="font-size: 12px; color: var(--charcoal-50); font-family: var(--font-mono);">✅ ' + (currentLang === 'el' ? 'Ευχαριστούμε!' : 'Thank you!') + '</span>');
        });

        const downBtn = document.createElement('button');
        downBtn.className = 'chat-rate-btn';
        downBtn.innerHTML = svgIcon('👎');
        downBtn.addEventListener('click', () => {
          ratingRow.innerHTML = svgIcon('<span style="font-size: 12px; color: var(--charcoal-50); font-family: var(--font-mono);">📝 ' + (currentLang === 'el' ? 'Θα βελτιωθούμε!' : 'We\'ll improve!') + '</span>');
        });

        ratingRow.appendChild(upBtn);
        ratingRow.appendChild(downBtn);
        bubble.appendChild(ratingRow);
      }
    }

    msgDiv.appendChild(avatar);
    msgDiv.appendChild(bubble);
    windowEl.appendChild(msgDiv);

    scrollToBottom();
  }

  function showTypingIndicator(delayMs, callback) {
    const windowEl = document.getElementById('chat-window');
    if (!windowEl || isTyping) return;

    isTyping = true;
    const data = CHAT_DATA[currentLang] || CHAT_DATA.el;

    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-msg bot';
    typingDiv.id = 'chat-typing-indicator';

    const avatar = document.createElement('div');
    avatar.className = 'chat-avatar';
    avatar.innerHTML = getChatAvatar('bot');

    const bubble = document.createElement('div');
    bubble.className = 'chat-typing';
    bubble.innerHTML = `
      <span style="font-size: 11px; font-family: var(--font-mono); color: var(--charcoal-75); margin-right: 8px;">${data.typing}</span>
      <span style="animation-delay: 0s;"></span>
      <span style="animation-delay: 0.2s;"></span>
      <span style="animation-delay: 0.4s;"></span>
    `;

    typingDiv.appendChild(avatar);
    typingDiv.appendChild(bubble);
    windowEl.appendChild(typingDiv);
    scrollToBottom();

    setTimeout(() => {
      const ind = document.getElementById('chat-typing-indicator');
      if (ind) ind.remove();
      isTyping = false;
      if (callback) callback();
    }, delayMs);
  }

  function scrollToBottom() {
    const windowEl = document.getElementById('chat-window');
    if (windowEl) {
      setTimeout(() => {
        windowEl.scrollTop = windowEl.scrollHeight;
      }, 50);
    }
  }

  // Smart typing delay — proportional to answer length
  function getTypingDelay(answerText) {
    const len = answerText.length;
    if (len < 200) return 400;
    if (len < 500) return 700;
    if (len < 1000) return 900;
    return 1100;
  }


  // ═══════════════════════════════════════════════════════════════════════
  //  SECTION 7: AUTOCOMPLETE
  // ═══════════════════════════════════════════════════════════════════════

  function showAutocomplete(query) {
    const inputEl = document.getElementById('chat-input');
    if (!inputEl) return;

    const data = CHAT_DATA[currentLang] || CHAT_DATA.el;
    const normQ = normalizeText(query);
    const matches = [];

    data.topics.forEach(topic => {
      // Check if any keyword or chip text matches
      const chipNorm = normalizeText(topic.chip);
      let match = chipNorm.includes(normQ);
      if (!match) {
        match = topic.keywords.some(kw => normalizeText(kw).includes(normQ) || normQ.includes(normalizeText(kw)));
      }
      if (match) {
        matches.push(topic);
      }
    });

    if (matches.length === 0) {
      hideAutocomplete();
      return;
    }

    // Create or reuse autocomplete container
    if (!autocompleteEl) {
      autocompleteEl = document.createElement('div');
      autocompleteEl.className = 'chat-autocomplete';
      inputEl.parentElement.style.position = 'relative';
      inputEl.parentElement.appendChild(autocompleteEl);
    }

    autocompleteEl.innerHTML = '';
    matches.slice(0, 5).forEach(topic => {
      const item = document.createElement('button');
      item.className = 'chat-autocomplete-item';
      item.innerHTML = svgIcon(topic.chip);
      item.addEventListener('mousedown', (e) => {
        e.preventDefault();
        inputEl.value = '';
        hideAutocomplete();
        handleTopicClick(topic);
      });
      autocompleteEl.appendChild(item);
    });

    autocompleteEl.style.display = 'flex';
  }

  function hideAutocomplete() {
    if (autocompleteEl) {
      autocompleteEl.style.display = 'none';
    }
  }


  // ═══════════════════════════════════════════════════════════════════════
  //  SECTION 8: MESSAGE HANDLING — the intelligence core
  // ═══════════════════════════════════════════════════════════════════════

  function handleTopicClick(topic) {
    addToHistory('user', topic.id);
    appendMessage('user', topic.question);
    const delay = getTypingDelay(topic.answer);
    showTypingIndicator(delay, () => {
      addToHistory('bot', topic.id);
      appendMessage('bot', topic.answer, true, topic.actionBtn, topic.suggestedNext);
      checkConsultationSuggestion();
    });
  }

  function handleUserMessage(query) {
    appendMessage('user', query);
    addToHistory('user', null, 'freetext');

    const data = CHAT_DATA[currentLang] || CHAT_DATA.el;
    const normQuery = normalizeText(query);
    const words = normQuery.split(/\s+/).filter(w => w.length > 1);

    // ── LAYER 1: Small Talk & Social Intents ──
    const greetingWords = ["γεια", "χαρετε", "καλημερα", "καλησπερα", "hello", "hi", "hey", "greetings", "good morning", "good evening", "good afternoon"];
    const thanksWords = ["ευχαριστω", "να σαι καλα", "μπραβο", "τελεια", "thanks", "thank you", "awesome", "great", "perfect", "excellent", "σε ευχαριστω"];
    const identityWords = ["ποιος εισαι", "τι εισαι", "τι κανεις", "who are you", "what can you do", "what are you", "are you a bot", "are you ai"];

    if (greetingWords.some(w => normQuery.includes(normalizeText(w)))) {
      showTypingIndicator(400, () => {
        addToHistory('bot', null, 'greeting');
        appendMessage('bot', data.greetingsReply, true, null, ["bim", "cost", "turnkey", "nzeb"]);
      });
      return;
    }

    if (thanksWords.some(w => normQuery.includes(normalizeText(w)))) {
      showTypingIndicator(400, () => {
        addToHistory('bot', null, 'thanks');
        appendMessage('bot', data.thanksReply, true, null, ["contact"]);
      });
      return;
    }

    if (identityWords.some(w => normQuery.includes(normalizeText(w)))) {
      showTypingIndicator(500, () => {
        addToHistory('bot', null, 'identity');
        appendMessage('bot', data.identityReply, true, null, ["team", "bim", "turnkey"]);
      });
      return;
    }

    // ── LAYER 1b: Frustration / Anger Detection ──
    const frustrationPatterns = [
      // Greek — explicit frustration, anger, profanity, dissatisfaction
      "νευριασ", "εκνευρ", "θυμωμεν", "θυμωνω", "αγανακτ", "απαραδεκτ",
      "ντροπη", "αισχος", "αηδια", "χαλια", "απογοητ", "αθλι",
      "κοροϊδ", "κοροιδ", "κλεφτ", "απατ", "ψευτ",
      "βαρεθ", "κουραστ", "σκατ", "γαμω", "γαμημεν", "μαλακ",
      "δεν βοηθα", "δεν καταλαβαιν", "δεν λειτουργ", "δεν δουλευ",
      "σαβουρ", "χαλι", "αχρηστ", "ανικαν", "σιχαμ",
      "παραπον", "καταγγελ", "δικηγορ", "μηνυ",
      // English — explicit frustration, anger, profanity, dissatisfaction
      "frustrated", "frustrating", "angry", "furious", "pissed",
      "annoyed", "annoying", "irritat", "unacceptable", "ridiculous",
      "terrible", "horrible", "awful", "disgusting", "pathetic",
      "useless", "incompetent", "waste of time", "scam", "rip off",
      "ripoff", "joke", "worst", "stupid", "idiot", "dumb",
      "doesn't work", "doesnt work", "not working", "broken",
      "complaint", "sue", "lawyer", "report", "disgrace",
      "fed up", "sick of", "tired of", "had enough",
      "damn", "hell", "crap", "crap", "bullshit", "crap"
    ];

    const isFrustrated = frustrationPatterns.some(p => normQuery.includes(normalizeText(p)));

    if (isFrustrated) {
      showTypingIndicator(600, () => {
        addToHistory('bot', null, 'frustration');
        appendMessage('bot', data.frustrationReply, true,
          { label: currentLang === 'el' ? '📞 ΕΠΙΚΟΙΝΩΝΙΑ ΜΕ ΤΗΝ ΟΜΑΔΑ ΜΑΣ →' : '📞 CONTACT OUR TEAM →', targetSection: '#contact' },
          null
        );
      });
      return;
    }

    // ── LAYER 2: Yes/No Follow-Up Handling ──
    const yesWords = ["ναι", "ne", "yes", "yeah", "sure", "ok", "εντάξει", "ενταξει", "φυσικα", "βεβαια", "absolutely", "of course", "yep"];
    const noWords = ["οχι", "no", "nope", "nah", "δεν", "μη", "not really", "not interested"];

    if (words.length <= 3) {
      if (yesWords.some(w => normQuery.includes(normalizeText(w)))) {
        const lastTopic = getLastTopicId();
        if (lastTopic) {
          const topic = data.topics.find(t => t.id === lastTopic);
          if (topic && topic.elaboration) {
            showTypingIndicator(600, () => {
              addToHistory('bot', lastTopic, 'elaborate');
              appendMessage('bot', data.elaborateReply + '\n\n' + topic.elaboration, true, topic.actionBtn, topic.suggestedNext);
            });
            return;
          }
        }
        showTypingIndicator(400, () => {
          addToHistory('bot', null, 'yes');
          appendMessage('bot', data.yesReply, true, null, ["bim", "cost", "contact"]);
        });
        return;
      }

      if (noWords.some(w => normQuery.includes(normalizeText(w)))) {
        showTypingIndicator(400, () => {
          addToHistory('bot', null, 'no');
          appendMessage('bot', data.noReply, true, null, ["bim", "cost", "contact"]);
        });
        return;
      }
    }

    // ── LAYER 3: Elaboration / "Tell Me More" Detection ──
    const elaborateWords = ["περισσοτερα", "αναλυτικα", "εξηγησε", "πες μου περισσοτερα", "λεπτομερειες", "tell me more", "elaborate", "more detail", "more details", "explain more", "go deeper", "expand", "more info", "more information"];
    if (elaborateWords.some(w => normQuery.includes(normalizeText(w)))) {
      const lastTopic = getLastTopicId();
      if (lastTopic) {
        const topic = data.topics.find(t => t.id === lastTopic);
        if (topic && topic.elaboration) {
          showTypingIndicator(700, () => {
            addToHistory('bot', lastTopic, 'elaborate');
            appendMessage('bot', data.elaborateReply + '\n\n' + topic.elaboration, true, topic.actionBtn, topic.suggestedNext);
          });
          return;
        }
      }
    }

    // ── LAYER 4: Comparison Detection ──
    const intent = detectIntent(normQuery);
    if (intent === 'comparison') {
      const compResult = findComparison(normQuery, data);
      if (compResult) {
        showTypingIndicator(800, () => {
          addToHistory('bot', null, 'comparison');
          appendMessage('bot', data.compareIntro + '\n\n' + compResult, true, null, ["cost", "turnkey"]);
        });
        return;
      }
    }

    // ── LAYER 5: Location Intent → Contact ──
    if (intent === 'location') {
      const contactTopic = data.topics.find(t => t.id === 'contact');
      if (contactTopic) {
        showTypingIndicator(500, () => {
          addToHistory('bot', 'contact');
          appendMessage('bot', contactTopic.answer, true, contactTopic.actionBtn, contactTopic.suggestedNext);
        });
        return;
      }
    }

    // ── LAYER 6: Contextual Follow-Up (cost/time about previous topic) ──
    const lastTopicId = getLastTopicId();
    if (lastTopicId && (intent === 'cost' || intent === 'time')) {
      const prevTopic = data.topics.find(t => t.id === lastTopicId);
      if (prevTopic) {
        let followUpTopic = data.topics.find(t => t.id === (intent === 'cost' ? 'cost' : 'time'));
        if (followUpTopic && followUpTopic.id !== lastTopicId) {
          const contextPrefix = currentLang === 'el'
            ? `<i>[Σε σχέση με <b>${prevTopic.chip}</b>]</i>\n\n`
            : `<i>[In context of <b>${prevTopic.chip}</b>]</i>\n\n`;
          showTypingIndicator(700, () => {
            addToHistory('bot', followUpTopic.id, 'followup');
            appendMessage('bot', contextPrefix + followUpTopic.answer, true, followUpTopic.actionBtn, followUpTopic.suggestedNext);
          });
          return;
        }
      }
    }

    // ── LAYER 7: Portfolio Queries ──
    if (detectPortfolioQuery(normQuery)) {
      const portfolioAnswer = handlePortfolioQuery(normQuery, data);
      if (portfolioAnswer) {
        showTypingIndicator(700, () => {
          addToHistory('bot', null, 'portfolio');
          appendMessage('bot', data.portfolioIntro + '\n\n' + portfolioAnswer, true,
            { label: currentLang === 'el' ? '🏢 ΠΡΟΒΟΛΗ ΧΑΡΤΟΦΥΛΑΚΙΟΥ →' : '🏢 VIEW PORTFOLIO →', targetSection: '#portfolio' },
            ["bim", "turnkey"]
          );
        });
        return;
      }
    }

    // ── LAYER 8: NLP Weighted Topic Scoring ──
    const matchedTopics = scoreTopics(normQuery, words, data);

    showTypingIndicator(800, () => {
      if (matchedTopics.length >= 2 && matchedTopics[0].score > 0) {
        const topScore = matchedTopics[0].score;
        const secondScore = matchedTopics[1].score;

        // Disambiguation: if top 2 scores are within 30% of each other
        if (secondScore >= topScore * 0.7 && matchedTopics[0].topic.id !== matchedTopics[1].topic.id) {
          addToHistory('bot', null, 'disambiguate');
          const options = matchedTopics.slice(0, 3).map(m => ({
            label: m.topic.chip,
            topicId: m.topic.id
          }));
          appendMessage('bot', data.disambiguate, true, null, null, options);
          return;
        }
      }

      if (matchedTopics.length > 0) {
        const best = matchedTopics[0].topic;
        addToHistory('bot', best.id);
        appendMessage('bot', best.answer, true, best.actionBtn, best.suggestedNext);
        checkConsultationSuggestion();
      } else {
        addToHistory('bot', null, 'fallback');
        appendMessage('bot', data.fallback, true,
          { label: currentLang === 'el' ? '📋 ΦΟΡΜΑ ΕΠΙΚΟΙΝΩΝΙΑΣ →' : '📋 CONTACT FORM →', targetSection: '#contact' },
          ["bim", "cost", "permits"]
        );
      }
    });
  }


  // ═══════════════════════════════════════════════════════════════════════
  //  SECTION 9: COMPARISON ENGINE
  // ═══════════════════════════════════════════════════════════════════════

  function findComparison(normQuery, data) {
    // Try to find which two topics are being compared
    const topicMatches = [];
    data.topics.forEach(topic => {
      const chipNorm = normalizeText(topic.chip);
      let matched = false;
      topic.keywords.forEach(kw => {
        if (normQuery.includes(normalizeText(kw))) matched = true;
      });
      // Also check topic ID name
      if (normQuery.includes(normalizeText(topic.id))) matched = true;
      if (matched) topicMatches.push(topic.id);
    });

    if (topicMatches.length >= 2) {
      // Look for a pre-built comparison
      const key1 = topicMatches[0] + '_' + topicMatches[1];
      const key2 = topicMatches[1] + '_' + topicMatches[0];
      if (COMPARISONS[key1]) return COMPARISONS[key1][currentLang];
      if (COMPARISONS[key2]) return COMPARISONS[key2][currentLang];

      // Generate a dynamic comparison
      const t1 = data.topics.find(t => t.id === topicMatches[0]);
      const t2 = data.topics.find(t => t.id === topicMatches[1]);
      if (t1 && t2) {
        return `${t1.chip}:\n${t1.answer.split('\n')[0]}\n\n${t2.chip}:\n${t2.answer.split('\n')[0]}`;
      }
    }

    return null;
  }


  // ═══════════════════════════════════════════════════════════════════════
  //  SECTION 10: PORTFOLIO QUERY HANDLER
  // ═══════════════════════════════════════════════════════════════════════

  function detectPortfolioQuery(normQuery) {
    const portfolioWords = ["εργα", "εργο", "project", "portfolio", "χαρτοφυλακιο", "case study", "μεγαλυτερο", "largest", "biggest", "εμπορικα εργα", "commercial project", "ξενοδοχειακα εργα", "hotel project", "show me"];
    return portfolioWords.some(w => normQuery.includes(normalizeText(w)));
  }

  function handlePortfolioQuery(normQuery, data) {
    let filtered = PORTFOLIO_DATA;

    // Filter by type if mentioned
    if (normQuery.includes("εμπορικ") || normQuery.includes("commercial") || normQuery.includes("γραφει") || normQuery.includes("office")) {
      filtered = filtered.filter(p => p.type === 'commercial');
    } else if (normQuery.includes("κατοικ") || normQuery.includes("σπιτι") || normQuery.includes("residential") || normQuery.includes("house") || normQuery.includes("villa")) {
      filtered = filtered.filter(p => p.type === 'residential');
    } else if (normQuery.includes("ξενοδοχ") || normQuery.includes("hotel") || normQuery.includes("resort") || normQuery.includes("τουρισ")) {
      filtered = filtered.filter(p => p.type === 'hospitality');
    } else if (normQuery.includes("βιομηχ") || normQuery.includes("industrial")) {
      filtered = filtered.filter(p => p.type === 'industrial');
    }

    if (filtered.length === 0) filtered = PORTFOLIO_DATA;

    const lines = filtered.map(p =>
      `🏗️ **${p.name}** — ${p.type.charAt(0).toUpperCase() + p.type.slice(1)} // ${p.area} // ${p.duration}`
    );
    return lines.join('\n');
  }


  // ═══════════════════════════════════════════════════════════════════════
  //  SECTION 11: PROACTIVE CONSULTATION SUGGESTION
  // ═══════════════════════════════════════════════════════════════════════

  function checkConsultationSuggestion() {
    const exchanges = getTotalExchanges();
    // After 4+ user messages, suggest a consultation (only once)
    if (exchanges === 4 && !topicInteractionCount._consultSuggested) {
      topicInteractionCount._consultSuggested = true;
      const data = CHAT_DATA[currentLang] || CHAT_DATA.el;
      setTimeout(() => {
        appendMessage('bot', data.consultSuggest, true,
          { label: currentLang === 'el' ? '📋 ΦΟΡΜΑ ΕΠΙΚΟΙΝΩΝΙΑΣ →' : '📋 CONTACT FORM →', targetSection: '#contact' },
          null
        );
      }, 1500);
    }
  }


  // ═══════════════════════════════════════════════════════════════════════
  //  SECTION 12: LANGUAGE SWITCHING & INITIALIZATION
  // ═══════════════════════════════════════════════════════════════════════

  window.updateChatbotLanguage = function(lang) {
    if (CHAT_DATA[lang]) {
      currentLang = lang;
      renderLanguageUI();
      const windowEl = document.getElementById('chat-window');
      if (windowEl && windowEl.children.length > 1) {
        const notif = lang === 'el' 
          ? "<i>[SYS.I18N] Η γλώσσα άλλαξε σε Ελληνικά.</i>"
          : "<i>[SYS.I18N] Language switched to English.</i>";
        appendMessage('bot', notif, false);
      } else {
        resetConversation();
      }
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
  } else {
    initChatbot();
  }
})();
