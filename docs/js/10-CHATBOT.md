# PANTELEOS.NRG — Virtual Engineering Assistant

**File:** `js/chatbot.js` (1393 lines)

## Overview

A sophisticated rule-based virtual assistant with NLP capabilities including: synonym expansion, fuzzy matching, Levenshtein typo tolerance, multi-topic scoring, disambiguation, conversation memory, contextual follow-ups, yes/no elaboration, frustration detection, comparison engine, portfolio query handling, and proactive consultation suggestions.

Wrapped in an IIFE for encapsulation. All internals are private; only `window.updateChatbotLanguage` is exposed.

## Architecture (12 Sections)

### Section 1: Knowledge Base — CHAT_DATA (Lines 18-323)

Bilingual topic database (el/en) with 14 topics each:

| ID | Topic | Keywords (EL) | Keywords (EN) |
|----|-------|---------------|---------------|
| bim | BIM LOD-400 | bim, revit, lod, 3d, cad | bim, revit, lod, 3d, cad |
| permits | Building Permits | αδεια, e-αδεια, πολεοδομια, TEE | permit, e-adeia, law, TEE |
| turnkey | Turnkey Contracts | turnkey, εργολαβια, κατασκευη | turnkey, contractor, construction |
| nzeb | nZEB & KENAK | nzeb, kenak, ενεργεια, μονωση | nzeb, kenak, energy, insulation |
| seismic | Seismic Protection | σεισμος, στατικα, μπετον, ΕΑΚ | seismic, earthquake, structural |
| cost | Cost Estimation | κοστος, τιμη, προϋπολογισμος | cost, price, budget, estimate |
| time | Timeline | χρονος, διαρκεια, μηνες | time, timeline, duration, months |
| renovation | Renovations | ανακαινιση, ενισχυση, παλιο | renovation, retrofitting, existing |
| hospitality | Hotels & Commercial | ξενοδοχειο, εμπορικο, resort | hotel, resort, hospitality |
| team | Our Team | ομαδα, παντελαιος, μηχανικοι | team, engineers, leadership |
| materials | Materials & KNX | υλικα, knx, bms, αυτοματισμος | materials, knx, bms, automation |
| topography | Drone GIS | τοπογραφικο, drone, gis, οικοπεδο | topography, drone, gis, survey |
| grants | EU Subsidies | επιδοτηση, εξοικονομω, δανειο | grant, subsidy, funding, loan |
| contact | Contact | τηλεφωνο, ραντεβου, επικοινωνια | contact, call, email, appointment |

Each topic includes:
- `chip` — HTML chip button label (with emoji icons)
- `keywords[]` — expanded search terms
- `question` — displayed user question
- `answer` — rich formatted answer (Markdown-style with **bold**, \n\n paragraphs)
- `suggestedNext[]` — IDs for related topic suggestions
- `actionBtn` — optional CTA button with section link
- `elaboration` — deeper answer for "tell me more" follow-up

### Section 2: Synonym Maps (Lines 330-439)

`SYNONYM_MAP` — natural phrases mapping to topic IDs:
```javascript
"θελω να χτισω": ["turnkey", "cost"],
"ποσο κοστιζει": ["cost"],
"σεισμος": ["seismic"],
"εξοικονομω": ["grants"],
"build a house": ["turnkey", "cost"],
"how much does it cost": ["cost"],
// 90+ entries total
```

### Section 3: State Management (Lines 477-503)

- `currentLang` — current locale
- `conversationHistory[]` — full chat history with role, topicId, intent, timestamp
- `topicInteractionCount{}` — per-topic interaction counter
- `getLastTopicId()` — scan history for most recent topic
- `getTotalExchanges()` — count user messages

### Section 4: NLP Engine (Lines 507-634)

**normalizeText(str)** (Lines 509-517):
- Lowercases
- Strips Greek diacritics/accents (NFD + regex)
- Removes punctuation

**isFuzzyMatch(token, keyword)** (Lines 519-538):
1. Exact substring match
2. Root prefix check (4+ chars)
3. Levenshtein distance ≤ 1 for 5+ char words

**detectIntent(normQuery)** (Lines 559-585):
Recognizes intent classes: `cost`, `time`, `ability`, `definition`, `comparison`, `location`

**scoreTopics(normQuery, words, data)** (Lines 588-634):
Scoring algorithm:
1. **Synonym phrase match** +5 points
2. **Keyword exact match** +3 or +4 points (weighted by length)
3. **Fuzzy word match** +2 points
4. **Multi-word phrase bonus** +3 points
5. Sorted descending by score

### Section 5: UI Initialization (Lines 643-763)

- Language-aware rendering of sidebar content (title, subtitle, chips, placeholder, send button)
- Desktop: button chips
- Mobile: `<select>` dropdown
- Autocomplete container for input suggestions

### Section 6: Message Rendering (Lines 780-929)

```javascript
appendMessage(sender, text, animate, actionBtn, suggestIds, inlineOptions)
```
Creates message DOM structure:
```
.chat-msg.{sender}
├── .chat-avatar (SVG icon)
└── .chat-bubble
    ├── formatted text (markdown → HTML)
    ├── .chat-timestamp (HH:MM)
    ├── .chat-copy-btn (clipboard copy)
    ├── .chat-action-btn (section navigation CTA)
    ├── .chat-inline-options (disambiguation quick-reply chips)
    ├── .chat-suggest-row (related topics)
    └── .chat-rating-row (👍/👎 feedback)
```

### Section 7: Autocomplete (Lines 991-1045)
- Shows topic suggestions as user types (2+ characters)
- Matches chip text + keywords
- Max 5 suggestions in floating dropdown

### Section 8: Message Handling (Lines 1048-1276)

**handleTopicClick(topic)** — User clicks a topic chip:
1. Add to history
2. Show question as user message
3. Show typing indicator (proportional to answer length)
4. Show answer with action button + suggested chips
5. Check for consultation suggestion (after 4 exchanges)

**handleUserMessage(query)** — Free-text message:
```
LAYER 1: Small talk detection
  ├── Greetings → greetingsReply
  ├── Thanks → thanksReply
  ├── Identity → identityReply
  └── Frustration → frustrationReply + contact CTA

LAYER 2: Yes/No follow-up
  ├── Yes → elaboration of last topic
  └── No → noReply + general suggestions

LAYER 3: Elaboration request
  └── "Tell me more" → topic.elaboration

LAYER 4: Comparison
  └── detectIntent('comparison') → findComparison()

LAYER 5: Location
  └── detectIntent('location') → contact topic

LAYER 6: Contextual follow-up (cost/time about previous topic)
  └── Prepend context prefix + show relevant topic

LAYER 7: Portfolio query
  └── Filter PORTFOLIO_DATA by type → formatted list

LAYER 8: NLP scoring
  ├── Disambiguation (top 2 scores within 30%)
  ├── Single best match → answer
  └── No match → fallback + contact CTA
```

### Section 9: Comparison Engine (Lines 1283-1313)

5 pre-built comparisons in `COMPARISONS{}`:
- `bim_permits`: BIM vs Building Permit
- `turnkey_bim`: Turnkey vs BIM
- `nzeb_renovation`: nZEB vs Renovation
- `cost_time`: Cost vs Timeline
- `seismic_materials`: Seismic vs Materials

Dynamic fallback: concatenates first lines of two topic answers if no pre-built comparison exists.

### Section 10: Portfolio Query Handler (Lines 1320-1345)

`PORTFOLIO_DATA` (Lines 466-472) — 5 hardcoded projects for chatbot reference:
```javascript
[
  { name: "Thessaloniki Port Bio-Cluster", type: "commercial", area: "6,400 m²", ... },
  { name: "Halkidiki Boutique Resort", type: "hospitality", area: "3,200 m²", ... },
  ...
]
```
- Filtered by type (commercial, residential, hospitality, industrial)
- Formatted as `🏗️ Project Name — Type // Area // Duration`

### Section 11: Consultation Suggestion (Lines 1352-1364)

After 4 user exchanges, proactively suggests scheduling a consultation via contact form.

### Section 12: Language Switching (Lines 1372-1392)

```javascript
window.updateChatbotLanguage = function(lang) {
  currentLang = lang;
  renderLanguageUI();
  // If conversation active → show notification
  // If no conversation → reset
};
```

---

*End of Virtual Assistant Documentation*
