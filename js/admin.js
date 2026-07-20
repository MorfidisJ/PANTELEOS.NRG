/**
 * PANTELEOS .NRG — ADMIN DASHBOARD ENGINE
 * GitHub API-powered CMS for managing Portfolio Projects, Team Members, and Chatbot Q&A.
 * Commits changes directly to the repository, triggering Vercel auto-deploy.
 *
 * Modules:
 *  1. Config & State
 *  2. Auth (Password Gate + GitHub PAT)
 *  3. Toast Notifications
 *  4. GitHub API (Read / Write / Upload)
 *  5. Data Parsers (JS → Objects)
 *  6. Data Serializers (Objects → JS)
 *  7. UI Renderers (Tabs, Lists, Editor Panel)
 *  8. CRUD Operations
 *  9. Drag & Drop Image Upload
 * 10. Publish Flow
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════════════════════════
  //  1. CONFIG & STATE
  // ═══════════════════════════════════════════════════════════════════════

  const CONFIG = {
    REPO_OWNER: 'MorfidisJ',
    REPO_NAME: 'PANTELEOS.NRG',
    BRANCH: 'main',
    PASSWORD_HASH: '9c06f3d3501b44a7ecab855db96433d4d08ef2d5c4f918b94308af856ef93adb',
    FILES: {
      portfolio: 'js/portfolio-data.js',
      team: 'js/team-data.js',
      chatbot: 'js/chatbot.js'
    }
  };

  const STATE = {
    authenticated: false,
    pat: null,
    activeTab: 'projects',
    // Current data
    projects: [],
    team: [],
    chatTopicsEl: [],
    chatTopicsEn: [],
    // Raw file content and SHAs (needed for GitHub API updates)
    fileShas: {},
    rawFiles: {},
    // Change tracking
    dirty: false,
    dirtyFiles: new Set(),
    // Editor
    editorOpen: false,
    editorType: null,   // 'project', 'team', 'chatTopic'
    editorIndex: -1,    // -1 = new, >=0 = editing
    editorData: null
  };


  // ═══════════════════════════════════════════════════════════════════════
  //  2. AUTH MODULE
  // ═══════════════════════════════════════════════════════════════════════

  async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async function verifyPassword(password) {
    const hash = await sha256(password);
    return hash === CONFIG.PASSWORD_HASH;
  }

  function initAuth() {
    const gate = document.getElementById('admin-gate');
    const gateForm = document.getElementById('gate-form');
    const gateInput = document.getElementById('gate-password');
    const gateError = document.getElementById('gate-error');
    const toggleBtn = document.getElementById('gate-toggle-pass');

    // Toggle password visibility
    toggleBtn.addEventListener('click', () => {
      const isPass = gateInput.type === 'password';
      gateInput.type = isPass ? 'text' : 'password';
      toggleBtn.textContent = isPass ? '🙈' : '👁️';
    });

    gateForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const password = gateInput.value.trim();
      if (!password) return;

      const valid = await verifyPassword(password);
      if (valid) {
        STATE.authenticated = true;
        sessionStorage.setItem('pnrg_admin_auth', '1');
        gate.classList.add('hidden');
        onAuthenticated();
      } else {
        gateError.textContent = '⛔ Invalid access code';
        gateInput.value = '';
        gateInput.focus();
        gateInput.style.animation = 'none';
        requestAnimationFrame(() => {
          gateInput.style.animation = 'shake 0.4s ease';
        });
      }
    });

    // Check session persistence
    if (sessionStorage.getItem('pnrg_admin_auth') === '1') {
      STATE.authenticated = true;
      gate.classList.add('hidden');
      onAuthenticated();
    } else {
      gateInput.focus();
    }
  }

  function onAuthenticated() {
    // Check for saved PAT
    const savedPat = localStorage.getItem('pnrg_github_pat');
    if (savedPat) {
      STATE.pat = savedPat;
      showApp();
    } else {
      showPatSetup();
    }
  }

  function showPatSetup() {
    const patSetup = document.getElementById('pat-setup');
    patSetup.classList.remove('hidden');

    const patInput = document.getElementById('pat-input');
    const saveBtn = document.getElementById('pat-save');
    const skipBtn = document.getElementById('pat-skip');

    saveBtn.onclick = () => {
      const token = patInput.value.trim();
      if (!token) {
        toast('Please enter your GitHub PAT', 'warning');
        return;
      }
      localStorage.setItem('pnrg_github_pat', token);
      STATE.pat = token;
      patSetup.classList.add('hidden');
      showApp();
    };

    skipBtn.onclick = () => {
      toast('Running in read-only mode (no GitHub PAT)', 'warning');
      patSetup.classList.add('hidden');
      showApp();
    };
  }


  // ═══════════════════════════════════════════════════════════════════════
  //  3. TOAST NOTIFICATIONS
  // ═══════════════════════════════════════════════════════════════════════

  function toast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const el = document.createElement('div');
    el.className = `toast ${type}`;
    el.innerHTML = `<span>${message}</span>`;
    container.appendChild(el);

    setTimeout(() => {
      el.classList.add('removing');
      setTimeout(() => el.remove(), 300);
    }, 4000);
  }


  // ═══════════════════════════════════════════════════════════════════════
  //  4. GITHUB API MODULE
  // ═══════════════════════════════════════════════════════════════════════

  const GitHub = {
    baseUrl: 'https://api.github.com',

    headers() {
      const h = {
        'Accept': 'application/vnd.github.v3+json'
      };
      if (STATE.pat) {
        h['Authorization'] = `Bearer ${STATE.pat}`;
      }
      return h;
    },

    async getFile(path) {
      const url = `${this.baseUrl}/repos/${CONFIG.REPO_OWNER}/${CONFIG.REPO_NAME}/contents/${path}?ref=${CONFIG.BRANCH}`;
      const resp = await fetch(url, { headers: this.headers() });
      if (!resp.ok) throw new Error(`Failed to fetch ${path}: ${resp.status}`);
      const data = await resp.json();
      const content = decodeURIComponent(escape(atob(data.content.replace(/\n/g, ''))));
      STATE.fileShas[path] = data.sha;
      STATE.rawFiles[path] = content;
      return content;
    },

    async putFile(path, content, message) {
      if (!STATE.pat) throw new Error('GitHub PAT not configured');
      const url = `${this.baseUrl}/repos/${CONFIG.REPO_OWNER}/${CONFIG.REPO_NAME}/contents/${path}`;
      const encoded = btoa(unescape(encodeURIComponent(content)));
      const body = {
        message: message || `[Admin] Update ${path}`,
        content: encoded,
        sha: STATE.fileShas[path],
        branch: CONFIG.BRANCH
      };
      const resp = await fetch(url, {
        method: 'PUT',
        headers: { ...this.headers(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(`Failed to update ${path}: ${resp.status} — ${err.message || ''}`);
      }
      const data = await resp.json();
      STATE.fileShas[path] = data.content.sha;
      STATE.rawFiles[path] = content;
      return data;
    },

    async uploadImage(filePath, fileContent) {
      // fileContent should be base64-encoded binary
      if (!STATE.pat) throw new Error('GitHub PAT not configured');
      const url = `${this.baseUrl}/repos/${CONFIG.REPO_OWNER}/${CONFIG.REPO_NAME}/contents/${filePath}`;

      // Check if file already exists
      let existingSha = null;
      try {
        const checkResp = await fetch(url + `?ref=${CONFIG.BRANCH}`, { headers: this.headers() });
        if (checkResp.ok) {
          const checkData = await checkResp.json();
          existingSha = checkData.sha;
        }
      } catch (e) { /* file doesn't exist, that's fine */ }

      const body = {
        message: `[Admin] Upload image: ${filePath}`,
        content: fileContent,
        branch: CONFIG.BRANCH
      };
      if (existingSha) body.sha = existingSha;

      const resp = await fetch(url, {
        method: 'PUT',
        headers: { ...this.headers(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (!resp.ok) throw new Error(`Failed to upload ${filePath}: ${resp.status}`);
      return resp.json();
    }
  };


  // ═══════════════════════════════════════════════════════════════════════
  //  5. DATA PARSERS
  // ═══════════════════════════════════════════════════════════════════════

  const Parsers = {
    /**
     * Extract a JS array/object from source by variable name.
     * Uses brace/bracket depth tracking for robust extraction.
     */
    extractBlock(source, varName, opener = '[') {
      const closer = opener === '[' ? ']' : '}';
      const regex = new RegExp(`(?:const|let|var)\\s+${varName}\\s*=\\s*\\${opener}`);
      const match = source.match(regex);
      if (!match) return null;

      const startIdx = match.index + match[0].length - 1; // position of opener
      let depth = 1;
      let i = startIdx + 1;
      let inString = false;
      let stringChar = '';
      let escaped = false;

      while (i < source.length && depth > 0) {
        const ch = source[i];
        if (escaped) { escaped = false; i++; continue; }
        if (ch === '\\') { escaped = true; i++; continue; }
        if (inString) {
          if (ch === stringChar) inString = false;
          i++;
          continue;
        }
        if (ch === '"' || ch === "'" || ch === '`') {
          inString = true;
          stringChar = ch;
          i++;
          continue;
        }
        if (ch === opener) depth++;
        if (ch === closer) depth--;
        i++;
      }

      return source.substring(startIdx, i);
    },

    parsePortfolio(source) {
      const block = this.extractBlock(source, 'PORTFOLIO_PROJECTS', '[');
      if (!block) return [];
      try {
        return new Function(`return ${block}`)();
      } catch (e) {
        console.error('Failed to parse PORTFOLIO_PROJECTS:', e);
        return [];
      }
    },

    parseTeam(source) {
      const block = this.extractBlock(source, 'TEAM_MEMBERS', '[');
      if (!block) return [];
      try {
        return new Function(`return ${block}`)();
      } catch (e) {
        console.error('Failed to parse TEAM_MEMBERS:', e);
        return [];
      }
    },

    parseChatTopics(source) {
      const block = this.extractBlock(source, 'CHAT_DATA', '{');
      if (!block) return { el: [], en: [] };
      try {
        const data = new Function(`return ${block}`)();
        return {
          el: (data.el && data.el.topics) || [],
          en: (data.en && data.en.topics) || []
        };
      } catch (e) {
        console.error('Failed to parse CHAT_DATA:', e);
        return { el: [], en: [] };
      }
    }
  };


  // ═══════════════════════════════════════════════════════════════════════
  //  6. DATA SERIALIZERS
  // ═══════════════════════════════════════════════════════════════════════

  const Serializers = {
    /** Indent a multiline string */
    indent(str, spaces) {
      const pad = ' '.repeat(spaces);
      return str.split('\n').map(line => pad + line).join('\n');
    },

    /** Escape a string for JS output (handles newlines, quotes) */
    escapeJsString(str) {
      if (!str) return '';
      return str
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '');
    },

    /** Serialize a single portfolio project object to JS source */
    serializeProject(p) {
      const lines = [];
      lines.push(`  {`);
      lines.push(`    id: "${this.escapeJsString(p.id)}",`);
      if (p.isMock) lines.push(`    isMock: true,`);
      lines.push(`    cat: "${this.escapeJsString(p.cat)}",`);
      lines.push(`    tagEn: "${this.escapeJsString(p.tagEn)}",`);
      lines.push(`    tagEl: "${this.escapeJsString(p.tagEl)}",`);
      lines.push(`    titleEn: "${this.escapeJsString(p.titleEn)}",`);
      lines.push(`    titleEl: "${this.escapeJsString(p.titleEl)}",`);
      lines.push(`    team: "${this.escapeJsString(p.team)}",`);
      lines.push(`    leadEn: "${this.escapeJsString(p.leadEn)}",`);
      lines.push(`    leadEl: "${this.escapeJsString(p.leadEl)}",`);
      lines.push(`    area: "${this.escapeJsString(p.area)}",`);
      lines.push(`    dur: "${this.escapeJsString(p.dur)}",`);
      lines.push(`    durEl: "${this.escapeJsString(p.durEl)}",`);
      lines.push(`    lod: "${this.escapeJsString(p.lod)}",`);
      lines.push(`    descEn: "${this.escapeJsString(p.descEn)}",`);
      lines.push(`    descEl: "${this.escapeJsString(p.descEl)}",`);
      lines.push(`    artworkType: ${typeof p.artworkType === 'number' ? p.artworkType : 0}`);
      lines.push(`  }`);
      return lines.join('\n');
    },

    /** Serialize the full portfolio-data.js file */
    serializePortfolioFile(projects) {
      const raw = STATE.rawFiles[CONFIG.FILES.portfolio] || '';
      // Replace only the PORTFOLIO_PROJECTS array
      const arrayStr = 'const PORTFOLIO_PROJECTS = [\n' +
        projects.map(p => this.serializeProject(p)).join(',\n') +
        '\n];';

      // Find and replace the array in the original file
      const block = Parsers.extractBlock(raw, 'PORTFOLIO_PROJECTS', '[');
      if (block) {
        const regex = /(?:const|let|var)\s+PORTFOLIO_PROJECTS\s*=\s*\[/;
        const match = raw.match(regex);
        if (match) {
          const startIdx = match.index;
          const endSearch = raw.indexOf(block, startIdx);
          const endIdx = endSearch + block.length;
          // Find the semicolon after the block
          let semiIdx = endIdx;
          while (semiIdx < raw.length && raw[semiIdx] !== ';') semiIdx++;
          return raw.substring(0, startIdx) + arrayStr + raw.substring(semiIdx + 1);
        }
      }
      // Fallback: can't find block, return raw
      return raw;
    },

    /** Serialize a single team member object to JS source */
    serializeTeamMember(m) {
      const lines = [];
      lines.push(`  {`);
      lines.push(`    key: "${this.escapeJsString(m.key)}",`);
      lines.push(`    id: "${this.escapeJsString(m.id)}",`);
      if (m.isMock) lines.push(`    isMock: true,`);
      lines.push(`    initials: "${this.escapeJsString(m.initials)}",`);
      lines.push(`    nameEn: "${this.escapeJsString(m.nameEn)}",`);
      lines.push(`    nameEl: "${this.escapeJsString(m.nameEl)}",`);
      lines.push(`    shortRoleEn: "${this.escapeJsString(m.shortRoleEn)}",`);
      lines.push(`    shortRoleEl: "${this.escapeJsString(m.shortRoleEl)}",`);
      lines.push(`    roleEn: "${this.escapeJsString(m.roleEn)}",`);
      lines.push(`    roleEl: "${this.escapeJsString(m.roleEl)}",`);
      lines.push(`    regEn: "${this.escapeJsString(m.regEn)}",`);
      lines.push(`    regEl: "${this.escapeJsString(m.regEl)}",`);
      lines.push(`    bioEn: "${this.escapeJsString(m.bioEn)}",`);
      lines.push(`    bioEl: "${this.escapeJsString(m.bioEl)}",`);
      lines.push(`    email: "${this.escapeJsString(m.email)}",`);
      lines.push(`    tel: "${this.escapeJsString(m.tel)}",`);
      lines.push(`    cardSpecsEn: [${(m.cardSpecsEn || []).map(s => `"${this.escapeJsString(s)}"`).join(', ')}],`);
      lines.push(`    cardSpecsEl: [${(m.cardSpecsEl || []).map(s => `"${this.escapeJsString(s)}"`).join(', ')}],`);
      lines.push(`    specsEn: [${(m.specsEn || []).map(s => `"${this.escapeJsString(s)}"`).join(', ')}],`);
      lines.push(`    specsEl: [${(m.specsEl || []).map(s => `"${this.escapeJsString(s)}"`).join(', ')}]`);
      lines.push(`  }`);
      return lines.join('\n');
    },

    /** Serialize the full team-data.js file */
    serializeTeamFile(members) {
      const raw = STATE.rawFiles[CONFIG.FILES.team] || '';
      const arrayStr = 'const TEAM_MEMBERS = [\n' +
        members.map(m => this.serializeTeamMember(m)).join(',\n') +
        '\n];';

      const block = Parsers.extractBlock(raw, 'TEAM_MEMBERS', '[');
      if (block) {
        const regex = /(?:const|let|var)\s+TEAM_MEMBERS\s*=\s*\[/;
        const match = raw.match(regex);
        if (match) {
          const startIdx = match.index;
          const endSearch = raw.indexOf(block, startIdx);
          const endIdx = endSearch + block.length;
          let semiIdx = endIdx;
          while (semiIdx < raw.length && raw[semiIdx] !== ';') semiIdx++;
          return raw.substring(0, startIdx) + arrayStr + raw.substring(semiIdx + 1);
        }
      }
      return raw;
    },

    /** Serialize a single chat topic object */
    serializeChatTopic(t) {
      const lines = [];
      lines.push(`        {`);
      lines.push(`          id: "${this.escapeJsString(t.id)}",`);
      lines.push(`          chip: "${this.escapeJsString(t.chip)}",`);
      lines.push(`          keywords: [${(t.keywords || []).map(k => `"${this.escapeJsString(k)}"`).join(', ')}],`);
      lines.push(`          question: "${this.escapeJsString(t.question)}",`);
      lines.push(`          answer: "${this.escapeJsString(t.answer)}",`);
      lines.push(`          suggestedNext: [${(t.suggestedNext || []).map(s => `"${this.escapeJsString(s)}"`).join(', ')}],`);
      if (t.actionBtn) {
        lines.push(`          actionBtn: { label: "${this.escapeJsString(t.actionBtn.label)}", targetSection: "${this.escapeJsString(t.actionBtn.targetSection)}" },`);
      }
      if (t.elaboration) {
        lines.push(`          elaboration: "${this.escapeJsString(t.elaboration)}"`);
      } else {
        // Remove trailing comma from last line
        const lastLine = lines[lines.length - 1];
        if (lastLine.endsWith(',')) {
          lines[lines.length - 1] = lastLine.slice(0, -1);
        }
      }
      lines.push(`        }`);
      return lines.join('\n');
    },

    /** Serialize chatbot.js — replaces only the topics arrays in CHAT_DATA */
    serializeChatFile(topicsEl, topicsEn) {
      const raw = STATE.rawFiles[CONFIG.FILES.chatbot] || '';

      // Strategy: find the CHAT_DATA block, rebuild it preserving system strings
      const block = Parsers.extractBlock(raw, 'CHAT_DATA', '{');
      if (!block) return raw;

      let chatData;
      try { chatData = new Function(`return ${block}`)(); } catch (e) { return raw; }

      // Replace topics arrays
      chatData.el.topics = topicsEl;
      chatData.en.topics = topicsEn;

      // Rebuild the CHAT_DATA block — we need to serialize it carefully
      // Instead of trying to JSON.stringify the complex object, we replace only the topics sections
      let result = raw;

      // Replace EL topics
      const elTopicsStr = topicsEl.map(t => this.serializeChatTopic(t)).join(',\n');
      const enTopicsStr = topicsEn.map(t => this.serializeChatTopic(t)).join(',\n');

      // Find and replace el topics array
      result = this.replaceTopicsArray(result, 'el', elTopicsStr);
      result = this.replaceTopicsArray(result, 'en', enTopicsStr);

      return result;
    },

    /** Helper: find and replace a topics array within a language block */
    replaceTopicsArray(source, lang, newTopicsStr) {
      // Find the topics: [ ... ] block within the language section
      // Look for "topics: [" after the language section start
      const langSectionRegex = lang === 'el'
        ? /el:\s*\{/
        : /en:\s*\{/;
      const langMatch = source.match(langSectionRegex);
      if (!langMatch) return source;

      // Find "topics: [" after the language match
      const searchStart = langMatch.index;
      const topicsMarker = 'topics: [';
      const topicsIdx = source.indexOf(topicsMarker, searchStart);
      if (topicsIdx === -1) return source;

      const arrayStart = topicsIdx + topicsMarker.length - 1; // position of '['

      // Track bracket depth to find matching ']'
      let depth = 1;
      let i = arrayStart + 1;
      let inString = false;
      let stringChar = '';
      let escaped = false;

      while (i < source.length && depth > 0) {
        const ch = source[i];
        if (escaped) { escaped = false; i++; continue; }
        if (ch === '\\') { escaped = true; i++; continue; }
        if (inString) {
          if (ch === stringChar) inString = false;
          i++;
          continue;
        }
        if (ch === '"' || ch === "'" || ch === '`') {
          inString = true;
          stringChar = ch;
          i++;
          continue;
        }
        if (ch === '[') depth++;
        if (ch === ']') depth--;
        i++;
      }

      const arrayEnd = i; // just past the ']'
      const replacement = `topics: [\n${newTopicsStr}\n      ]`;
      return source.substring(0, topicsIdx) + replacement + source.substring(arrayEnd);
    }
  };


  // ═══════════════════════════════════════════════════════════════════════
  //  7. UI RENDERERS
  // ═══════════════════════════════════════════════════════════════════════

  function showApp() {
    const app = document.getElementById('admin-app');
    app.classList.add('active');
    initTabs();
    loadAllData();
  }

  function initTabs() {
    const tabs = document.querySelectorAll('.admin-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        STATE.activeTab = target;
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        document.getElementById(`panel-${target}`).classList.add('active');
      });
    });
  }

  async function loadAllData() {
    showLoading('Fetching data from GitHub...');
    try {
      const [portfolioSrc, teamSrc, chatSrc] = await Promise.all([
        GitHub.getFile(CONFIG.FILES.portfolio),
        GitHub.getFile(CONFIG.FILES.team),
        GitHub.getFile(CONFIG.FILES.chatbot)
      ]);

      STATE.projects = Parsers.parsePortfolio(portfolioSrc);
      STATE.team = Parsers.parseTeam(teamSrc);
      const chatTopics = Parsers.parseChatTopics(chatSrc);
      STATE.chatTopicsEl = chatTopics.el;
      STATE.chatTopicsEn = chatTopics.en;

      renderProjectsList();
      renderTeamList();
      renderChatList();
      updateTabCounts();

      hideLoading();
      toast('Data loaded successfully', 'success');
    } catch (err) {
      hideLoading();
      console.error(err);
      toast(`Failed to load data: ${err.message}`, 'error');
    }
  }

  function updateTabCounts() {
    const projCount = document.getElementById('count-projects');
    const teamCount = document.getElementById('count-team');
    const chatCount = document.getElementById('count-chat');
    if (projCount) projCount.textContent = STATE.projects.length;
    if (teamCount) teamCount.textContent = STATE.team.length;
    if (chatCount) chatCount.textContent = STATE.chatTopicsEl.length;
  }

  // --- Projects List ---
  function renderProjectsList() {
    const container = document.getElementById('projects-list');
    if (!STATE.projects.length) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📐</div>
          <h3>No Projects Yet</h3>
          <p>Add your first project to get started.</p>
        </div>`;
      return;
    }
    container.innerHTML = STATE.projects.map((p, i) => `
      <div class="item-card" data-index="${i}" data-type="project">
        <div class="item-icon">${p.id ? p.id.split('-').pop() : '?'}</div>
        <div class="item-info">
          <div class="item-title">${escHtml(p.titleEn || p.titleEl || 'Untitled')}</div>
          <div class="item-meta">
            <span>${escHtml(p.id)}</span>
            <span>${escHtml(p.cat)}</span>
            <span>${escHtml(p.area)}</span>
            ${p.isMock ? '<span class="mock-badge">Mock</span>' : ''}
          </div>
        </div>
        <div class="item-actions">
          <button class="item-action-btn" title="Edit" onclick="window._adminEdit('project', ${i})">✏️</button>
          <button class="item-action-btn danger" title="Delete" onclick="window._adminDelete('project', ${i})">🗑️</button>
        </div>
      </div>
    `).join('');
  }

  // --- Team List ---
  function renderTeamList() {
    const container = document.getElementById('team-list');
    if (!STATE.team.length) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">👔</div>
          <h3>No Team Members Yet</h3>
          <p>Add your first team member to get started.</p>
        </div>`;
      return;
    }
    container.innerHTML = STATE.team.map((m, i) => `
      <div class="item-card" data-index="${i}" data-type="team">
        <div class="item-icon">${escHtml(m.initials || '??')}</div>
        <div class="item-info">
          <div class="item-title">${escHtml(m.nameEn || m.nameEl || 'Unnamed')}</div>
          <div class="item-meta">
            <span>${escHtml(m.shortRoleEn || m.roleEn || '')}</span>
            ${m.isMock ? '<span class="mock-badge">Mock</span>' : ''}
          </div>
        </div>
        <div class="item-actions">
          <button class="item-action-btn" title="Edit" onclick="window._adminEdit('team', ${i})">✏️</button>
          <button class="item-action-btn danger" title="Delete" onclick="window._adminDelete('team', ${i})">🗑️</button>
        </div>
      </div>
    `).join('');
  }

  // --- Chat Topics List ---
  function renderChatList() {
    const container = document.getElementById('chat-list');
    if (!STATE.chatTopicsEl.length) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">💬</div>
          <h3>No Q&A Topics Yet</h3>
          <p>Add your first chatbot topic to get started.</p>
        </div>`;
      return;
    }
    container.innerHTML = STATE.chatTopicsEl.map((t, i) => {
      const enTopic = STATE.chatTopicsEn[i] || {};
      return `
        <div class="item-card" data-index="${i}" data-type="chatTopic">
          <div class="item-icon">${t.chip ? t.chip.substring(0, 2) : '❓'}</div>
          <div class="item-info">
            <div class="item-title">${escHtml(enTopic.chip || t.chip || t.id)}</div>
            <div class="item-meta">
              <span>ID: ${escHtml(t.id)}</span>
              <span>${(t.keywords || []).length} keywords</span>
            </div>
          </div>
          <div class="item-actions">
            <button class="item-action-btn" title="Edit" onclick="window._adminEdit('chatTopic', ${i})">✏️</button>
            <button class="item-action-btn danger" title="Delete" onclick="window._adminDelete('chatTopic', ${i})">🗑️</button>
          </div>
        </div>
      `;
    }).join('');
  }


  // ═══════════════════════════════════════════════════════════════════════
  //  8. EDITOR PANEL & CRUD
  // ═══════════════════════════════════════════════════════════════════════

  function openEditor(type, index) {
    STATE.editorType = type;
    STATE.editorIndex = index;
    STATE.editorOpen = true;

    const overlay = document.getElementById('editor-overlay');
    const panel = document.getElementById('editor-panel');
    const title = document.getElementById('editor-title');
    const body = document.getElementById('editor-body');

    overlay.classList.add('active');
    panel.classList.add('active');

    const isNew = index === -1;

    if (type === 'project') {
      title.textContent = isNew ? 'New Project' : 'Edit Project';
      const data = isNew ? createEmptyProject() : { ...STATE.projects[index] };
      STATE.editorData = data;
      body.innerHTML = buildProjectForm(data);
    } else if (type === 'team') {
      title.textContent = isNew ? 'New Team Member' : 'Edit Team Member';
      const data = isNew ? createEmptyTeamMember() : { ...STATE.team[index] };
      STATE.editorData = data;
      body.innerHTML = buildTeamForm(data);
    } else if (type === 'chatTopic') {
      title.textContent = isNew ? 'New Q&A Topic' : 'Edit Q&A Topic';
      const elData = isNew ? createEmptyChatTopic() : { ...STATE.chatTopicsEl[index] };
      const enData = isNew ? createEmptyChatTopic() : { ...(STATE.chatTopicsEn[index] || {}) };
      STATE.editorData = { el: elData, en: enData };
      body.innerHTML = buildChatForm(elData, enData);
    }

    initTagInputs();
    initDragDropZones();
  }

  function closeEditor() {
    STATE.editorOpen = false;
    document.getElementById('editor-overlay').classList.remove('active');
    document.getElementById('editor-panel').classList.remove('active');
  }

  function saveEditor() {
    const type = STATE.editorType;
    const index = STATE.editorIndex;
    const isNew = index === -1;

    if (type === 'project') {
      const data = collectProjectForm();
      if (!data.titleEn && !data.titleEl) { toast('Project title is required', 'warning'); return; }
      if (isNew) {
        STATE.projects.push(data);
      } else {
        STATE.projects[index] = data;
      }
      STATE.dirtyFiles.add('portfolio');
      renderProjectsList();
    } else if (type === 'team') {
      const data = collectTeamForm();
      if (!data.nameEn && !data.nameEl) { toast('Member name is required', 'warning'); return; }
      // Auto-generate key, id, initials
      if (data.nameEn) {
        data.key = data.nameEn.toUpperCase();
        const parts = data.nameEn.split(' ');
        data.id = parts[parts.length - 1].toLowerCase();
        data.initials = parts.map(p => p[0]).join('').substring(0, 2).toUpperCase();
      }
      if (isNew) {
        STATE.team.push(data);
      } else {
        STATE.team[index] = data;
      }
      STATE.dirtyFiles.add('team');
      renderTeamList();
    } else if (type === 'chatTopic') {
      const data = collectChatForm();
      if (!data.el.id) { toast('Topic ID is required', 'warning'); return; }
      data.en.id = data.el.id; // Keep IDs in sync
      if (isNew) {
        STATE.chatTopicsEl.push(data.el);
        STATE.chatTopicsEn.push(data.en);
      } else {
        STATE.chatTopicsEl[index] = data.el;
        STATE.chatTopicsEn[index] = data.en;
      }
      STATE.dirtyFiles.add('chatbot');
      renderChatList();
    }

    STATE.dirty = true;
    updateTabCounts();
    updatePublishBar();
    closeEditor();
    toast(isNew ? 'Item added' : 'Item updated', 'success');
  }

  function deleteItem(type, index) {
    showConfirm('Delete Item', 'Are you sure? This cannot be undone.', () => {
      if (type === 'project') {
        STATE.projects.splice(index, 1);
        STATE.dirtyFiles.add('portfolio');
        renderProjectsList();
      } else if (type === 'team') {
        STATE.team.splice(index, 1);
        STATE.dirtyFiles.add('team');
        renderTeamList();
      } else if (type === 'chatTopic') {
        STATE.chatTopicsEl.splice(index, 1);
        STATE.chatTopicsEn.splice(index, 1);
        STATE.dirtyFiles.add('chatbot');
        renderChatList();
      }
      STATE.dirty = true;
      updateTabCounts();
      updatePublishBar();
      toast('Item deleted', 'success');
    });
  }

  // --- Empty data factories ---
  function createEmptyProject() {
    const year = new Date().getFullYear();
    const num = String(Math.floor(Math.random() * 9000) + 1000);
    return {
      id: `PN-${year}-${num}`,
      isMock: false,
      cat: '',
      tagEn: '', tagEl: '',
      titleEn: '', titleEl: '',
      team: '',
      leadEn: '', leadEl: '',
      area: '',
      dur: '', durEl: '',
      lod: 'LOD-400',
      descEn: '', descEl: '',
      artworkType: 0
    };
  }

  function createEmptyTeamMember() {
    return {
      key: '', id: '', isMock: false, initials: '',
      nameEn: '', nameEl: '',
      shortRoleEn: '', shortRoleEl: '',
      roleEn: '', roleEl: '',
      regEn: '', regEl: '',
      bioEn: '', bioEl: '',
      email: 'panteleos.nrg@gmail.com',
      tel: '+30 6976837114',
      cardSpecsEn: [], cardSpecsEl: [],
      specsEn: [], specsEl: []
    };
  }

  function createEmptyChatTopic() {
    return {
      id: '', chip: '',
      keywords: [],
      question: '', answer: '',
      suggestedNext: [],
      elaboration: ''
    };
  }

  // --- Form Builders ---
  function buildProjectForm(p) {
    return `
      <div class="form-group">
        <label class="form-label">Project ID</label>
        <input class="form-input" id="ed-proj-id" value="${escAttr(p.id)}" placeholder="PN-2026-XXXX">
      </div>
      <div class="form-group form-toggle">
        <label class="toggle-switch">
          <input type="checkbox" id="ed-proj-mock" ${p.isMock ? 'checked' : ''}>
          <span class="toggle-slider"></span>
        </label>
        <span class="toggle-label">Mock/Showcase Project (hidden when real projects exist)</span>
      </div>
      <div class="form-group">
        <label class="form-label">Category Tags <span style="font-weight:400;text-transform:none;font-size:0.75rem;color:var(--admin-text-muted)">(space-separated: commercial residential industrial bim)</span></label>
        <input class="form-input" id="ed-proj-cat" value="${escAttr(p.cat)}" placeholder="commercial bim">
      </div>
      <div class="bi-row">
        <div class="form-group">
          <label class="form-label">Tag <span class="lang-badge en">EN</span></label>
          <input class="form-input" id="ed-proj-tagEn" value="${escAttr(p.tagEn)}" placeholder="COMMERCIAL / BIM">
        </div>
        <div class="form-group">
          <label class="form-label">Tag <span class="lang-badge el">EL</span></label>
          <input class="form-input" id="ed-proj-tagEl" value="${escAttr(p.tagEl)}" placeholder="ΕΜΠΟΡΙΚΟ / BIM">
        </div>
      </div>
      <div class="bi-row">
        <div class="form-group">
          <label class="form-label">Title <span class="lang-badge en">EN</span></label>
          <input class="form-input" id="ed-proj-titleEn" value="${escAttr(p.titleEn)}" placeholder="Project Title">
        </div>
        <div class="form-group">
          <label class="form-label">Title <span class="lang-badge el">EL</span></label>
          <input class="form-input" id="ed-proj-titleEl" value="${escAttr(p.titleEl)}" placeholder="Τίτλος Έργου">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Lead Engineer / Team</label>
        <select class="form-select" id="ed-proj-team" onchange="window._adminAutoFillLead()">
          <option value="">— Select team member —</option>
          ${STATE.team.map(m => `<option value="${escAttr(m.key)}" ${m.key === p.team ? 'selected' : ''}>${escHtml(m.nameEn)}</option>`).join('')}
        </select>
      </div>
      <div class="bi-row">
        <div class="form-group">
          <label class="form-label">Lead Credit <span class="lang-badge en">EN</span></label>
          <input class="form-input" id="ed-proj-leadEn" value="${escAttr(p.leadEn)}">
        </div>
        <div class="form-group">
          <label class="form-label">Lead Credit <span class="lang-badge el">EL</span></label>
          <input class="form-input" id="ed-proj-leadEl" value="${escAttr(p.leadEl)}">
        </div>
      </div>
      <div class="bi-row">
        <div class="form-group">
          <label class="form-label">Area</label>
          <input class="form-input" id="ed-proj-area" value="${escAttr(p.area)}" placeholder="6,400 m²">
        </div>
        <div class="form-group">
          <label class="form-label">LOD Level</label>
          <select class="form-select" id="ed-proj-lod">
            ${['LOD-200','LOD-300','LOD-350','LOD-400','LOD-500'].map(l => `<option value="${l}" ${l === p.lod ? 'selected' : ''}>${l}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="bi-row">
        <div class="form-group">
          <label class="form-label">Duration <span class="lang-badge en">EN</span></label>
          <input class="form-input" id="ed-proj-dur" value="${escAttr(p.dur)}" placeholder="24 Months">
        </div>
        <div class="form-group">
          <label class="form-label">Duration <span class="lang-badge el">EL</span></label>
          <input class="form-input" id="ed-proj-durEl" value="${escAttr(p.durEl)}" placeholder="24 Μήνες">
        </div>
      </div>
      <div class="bi-row">
        <div class="form-group">
          <label class="form-label">Description <span class="lang-badge en">EN</span></label>
          <textarea class="form-textarea" id="ed-proj-descEn" rows="4" placeholder="Project description...">${escHtml(p.descEn)}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Description <span class="lang-badge el">EL</span></label>
          <textarea class="form-textarea" id="ed-proj-descEl" rows="4" placeholder="Περιγραφή έργου...">${escHtml(p.descEl)}</textarea>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Project Photo (Main)</label>
        <div class="dnd-zone" data-target="assets/portfolio/${p.id}/main.jpg" id="dnd-proj-main">
          <div class="dnd-icon">📸</div>
          <div class="dnd-text">Drag & drop image here or <span>browse</span></div>
          <input type="file" accept="image/*" style="display:none">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Technical Photo (LOD)</label>
        <div class="dnd-zone" data-target="assets/portfolio/${p.id}/tech.jpg" id="dnd-proj-tech">
          <div class="dnd-icon">📐</div>
          <div class="dnd-text">Drag & drop image here or <span>browse</span></div>
          <input type="file" accept="image/*" style="display:none">
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Artwork Type (SVG fallback index 0-5)</label>
        <input class="form-input" type="number" id="ed-proj-artworkType" value="${p.artworkType || 0}" min="0" max="5">
      </div>
    `;
  }

  function buildTeamForm(m) {
    return `
      <div class="form-group form-toggle">
        <label class="toggle-switch">
          <input type="checkbox" id="ed-team-mock" ${m.isMock ? 'checked' : ''}>
          <span class="toggle-slider"></span>
        </label>
        <span class="toggle-label">Mock/Showcase Member (hidden when >1 real members exist)</span>
      </div>
      <div class="bi-row">
        <div class="form-group">
          <label class="form-label">Full Name <span class="lang-badge en">EN</span></label>
          <input class="form-input" id="ed-team-nameEn" value="${escAttr(m.nameEn)}" placeholder="Panagiotis M. Panteleos">
        </div>
        <div class="form-group">
          <label class="form-label">Full Name <span class="lang-badge el">EL</span></label>
          <input class="form-input" id="ed-team-nameEl" value="${escAttr(m.nameEl)}" placeholder="Παναγιώτης Μιχ. Παντελαίος">
        </div>
      </div>
      <div class="bi-row">
        <div class="form-group">
          <label class="form-label">Short Role <span class="lang-badge en">EN</span></label>
          <input class="form-input" id="ed-team-shortRoleEn" value="${escAttr(m.shortRoleEn)}" placeholder="Founder & Managing Director">
        </div>
        <div class="form-group">
          <label class="form-label">Short Role <span class="lang-badge el">EL</span></label>
          <input class="form-input" id="ed-team-shortRoleEl" value="${escAttr(m.shortRoleEl)}" placeholder="Ιδρυτής & Γενικός Διευθυντής">
        </div>
      </div>
      <div class="bi-row">
        <div class="form-group">
          <label class="form-label">Full Role <span class="lang-badge en">EN</span></label>
          <input class="form-input" id="ed-team-roleEn" value="${escAttr(m.roleEn)}">
        </div>
        <div class="form-group">
          <label class="form-label">Full Role <span class="lang-badge el">EL</span></label>
          <input class="form-input" id="ed-team-roleEl" value="${escAttr(m.roleEl)}">
        </div>
      </div>
      <div class="bi-row">
        <div class="form-group">
          <label class="form-label">Registration <span class="lang-badge en">EN</span></label>
          <input class="form-input" id="ed-team-regEn" value="${escAttr(m.regEn)}" placeholder="TEE REG: #XXXXX // BEng ...">
        </div>
        <div class="form-group">
          <label class="form-label">Registration <span class="lang-badge el">EL</span></label>
          <input class="form-input" id="ed-team-regEl" value="${escAttr(m.regEl)}">
        </div>
      </div>
      <div class="bi-row">
        <div class="form-group">
          <label class="form-label">Bio <span class="lang-badge en">EN</span></label>
          <textarea class="form-textarea" id="ed-team-bioEn" rows="4">${escHtml(m.bioEn)}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Bio <span class="lang-badge el">EL</span></label>
          <textarea class="form-textarea" id="ed-team-bioEl" rows="4">${escHtml(m.bioEl)}</textarea>
        </div>
      </div>
      <div class="bi-row">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input class="form-input" id="ed-team-email" value="${escAttr(m.email)}" type="email">
        </div>
        <div class="form-group">
          <label class="form-label">Telephone</label>
          <input class="form-input" id="ed-team-tel" value="${escAttr(m.tel)}" type="tel">
        </div>
      </div>
      <div class="bi-row">
        <div class="form-group">
          <label class="form-label">Card Specs (3 chips) <span class="lang-badge en">EN</span></label>
          <div class="tag-input-wrap" data-field="ed-team-cardSpecsEn" data-values='${JSON.stringify(m.cardSpecsEn || [])}'>
            <input class="tag-input-field" placeholder="Type & press Enter">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Card Specs (3 chips) <span class="lang-badge el">EL</span></label>
          <div class="tag-input-wrap" data-field="ed-team-cardSpecsEl" data-values='${JSON.stringify(m.cardSpecsEl || [])}'>
            <input class="tag-input-field" placeholder="Πληκτρολογήστε & Enter">
          </div>
        </div>
      </div>
      <div class="bi-row">
        <div class="form-group">
          <label class="form-label">Full Specializations <span class="lang-badge en">EN</span></label>
          <div class="tag-input-wrap" data-field="ed-team-specsEn" data-values='${JSON.stringify(m.specsEn || [])}'>
            <input class="tag-input-field" placeholder="Type & press Enter">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Full Specializations <span class="lang-badge el">EL</span></label>
          <div class="tag-input-wrap" data-field="ed-team-specsEl" data-values='${JSON.stringify(m.specsEl || [])}'>
            <input class="tag-input-field" placeholder="Πληκτρολογήστε & Enter">
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Portrait Photo</label>
        <div class="dnd-zone" data-target="assets/team/${m.id || 'new'}/portrait.jpg" id="dnd-team-portrait">
          <div class="dnd-icon">👤</div>
          <div class="dnd-text">Drag & drop portrait image or <span>browse</span></div>
          <input type="file" accept="image/*" style="display:none">
        </div>
      </div>
    `;
  }

  function buildChatForm(el, en) {
    const allTopicIds = STATE.chatTopicsEl.map(t => t.id).filter(Boolean);
    return `
      <div class="form-group">
        <label class="form-label">Topic ID <span style="font-weight:400;text-transform:none;font-size:0.75rem;color:var(--admin-text-muted)">(unique, lowercase, no spaces — e.g. "bim", "permits")</span></label>
        <input class="form-input" id="ed-chat-id" value="${escAttr(el.id)}" placeholder="my_topic">
      </div>
      <div class="bi-row">
        <div class="form-group">
          <label class="form-label">Chip Button <span class="lang-badge el">EL</span></label>
          <input class="form-input" id="ed-chat-chipEl" value="${escAttr(el.chip)}" placeholder="📐 Τι είναι...">
        </div>
        <div class="form-group">
          <label class="form-label">Chip Button <span class="lang-badge en">EN</span></label>
          <input class="form-input" id="ed-chat-chipEn" value="${escAttr(en.chip)}" placeholder="📐 What is...">
        </div>
      </div>
      <div class="bi-row">
        <div class="form-group">
          <label class="form-label">Keywords <span class="lang-badge el">EL</span></label>
          <div class="tag-input-wrap" data-field="ed-chat-keywordsEl" data-values='${JSON.stringify(el.keywords || [])}'>
            <input class="tag-input-field" placeholder="Λέξη & Enter">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Keywords <span class="lang-badge en">EN</span></label>
          <div class="tag-input-wrap" data-field="ed-chat-keywordsEn" data-values='${JSON.stringify(en.keywords || [])}'>
            <input class="tag-input-field" placeholder="keyword & Enter">
          </div>
        </div>
      </div>
      <div class="bi-row">
        <div class="form-group">
          <label class="form-label">Display Question <span class="lang-badge el">EL</span></label>
          <input class="form-input" id="ed-chat-questionEl" value="${escAttr(el.question)}">
        </div>
        <div class="form-group">
          <label class="form-label">Display Question <span class="lang-badge en">EN</span></label>
          <input class="form-input" id="ed-chat-questionEn" value="${escAttr(en.question)}">
        </div>
      </div>
      <div class="bi-row">
        <div class="form-group">
          <label class="form-label">Answer <span class="lang-badge el">EL</span> <span style="font-weight:400;text-transform:none;font-size:0.72rem;color:var(--admin-text-muted)">(use \\n for newlines, **bold**)</span></label>
          <textarea class="form-textarea" id="ed-chat-answerEl" rows="6">${escHtml(el.answer || '')}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Answer <span class="lang-badge en">EN</span></label>
          <textarea class="form-textarea" id="ed-chat-answerEn" rows="6">${escHtml(en.answer || '')}</textarea>
        </div>
      </div>
      <div class="bi-row">
        <div class="form-group">
          <label class="form-label">Elaboration (Deep Dive) <span class="lang-badge el">EL</span></label>
          <textarea class="form-textarea" id="ed-chat-elaborationEl" rows="4">${escHtml(el.elaboration || '')}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Elaboration (Deep Dive) <span class="lang-badge en">EN</span></label>
          <textarea class="form-textarea" id="ed-chat-elaborationEn" rows="4">${escHtml(en.elaboration || '')}</textarea>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Suggested Next Topics</label>
        <div class="tag-input-wrap" data-field="ed-chat-suggestedNext" data-values='${JSON.stringify(el.suggestedNext || [])}' data-autocomplete='${JSON.stringify(allTopicIds)}'>
          <input class="tag-input-field" placeholder="topic_id & Enter">
        </div>
      </div>
      <div class="bi-row">
        <div class="form-group">
          <label class="form-label">Action Button Label <span style="font-weight:400;text-transform:none;font-size:0.72rem;color:var(--admin-text-muted)">(optional)</span></label>
          <input class="form-input" id="ed-chat-actionLabel" value="${escAttr((el.actionBtn && el.actionBtn.label) || '')}">
        </div>
        <div class="form-group">
          <label class="form-label">Action Button Target Section</label>
          <select class="form-select" id="ed-chat-actionTarget">
            <option value="">— None —</option>
            ${['#portfolio', '#team', '#gauger', '#contact', '#chatbot'].map(s => `<option value="${s}" ${(el.actionBtn && el.actionBtn.targetSection === s) ? 'selected' : ''}>${s}</option>`).join('')}
          </select>
        </div>
      </div>
    `;
  }

  // --- Form Collectors ---
  function collectProjectForm() {
    return {
      id: val('ed-proj-id'),
      isMock: document.getElementById('ed-proj-mock').checked,
      cat: val('ed-proj-cat'),
      tagEn: val('ed-proj-tagEn'),
      tagEl: val('ed-proj-tagEl'),
      titleEn: val('ed-proj-titleEn'),
      titleEl: val('ed-proj-titleEl'),
      team: val('ed-proj-team'),
      leadEn: val('ed-proj-leadEn'),
      leadEl: val('ed-proj-leadEl'),
      area: val('ed-proj-area'),
      dur: val('ed-proj-dur'),
      durEl: val('ed-proj-durEl'),
      lod: val('ed-proj-lod'),
      descEn: val('ed-proj-descEn'),
      descEl: val('ed-proj-descEl'),
      artworkType: parseInt(val('ed-proj-artworkType')) || 0
    };
  }

  function collectTeamForm() {
    return {
      key: '', // auto-generated
      id: '',  // auto-generated
      isMock: document.getElementById('ed-team-mock').checked,
      initials: '', // auto-generated
      nameEn: val('ed-team-nameEn'),
      nameEl: val('ed-team-nameEl'),
      shortRoleEn: val('ed-team-shortRoleEn'),
      shortRoleEl: val('ed-team-shortRoleEl'),
      roleEn: val('ed-team-roleEn'),
      roleEl: val('ed-team-roleEl'),
      regEn: val('ed-team-regEn'),
      regEl: val('ed-team-regEl'),
      bioEn: val('ed-team-bioEn'),
      bioEl: val('ed-team-bioEl'),
      email: val('ed-team-email'),
      tel: val('ed-team-tel'),
      cardSpecsEn: getTagValues('ed-team-cardSpecsEn'),
      cardSpecsEl: getTagValues('ed-team-cardSpecsEl'),
      specsEn: getTagValues('ed-team-specsEn'),
      specsEl: getTagValues('ed-team-specsEl')
    };
  }

  function collectChatForm() {
    const actionLabel = val('ed-chat-actionLabel');
    const actionTarget = val('ed-chat-actionTarget');
    const actionBtn = (actionLabel && actionTarget) ? { label: actionLabel, targetSection: actionTarget } : undefined;

    const base = {
      id: val('ed-chat-id'),
      suggestedNext: getTagValues('ed-chat-suggestedNext')
    };

    return {
      el: {
        ...base,
        chip: val('ed-chat-chipEl'),
        keywords: getTagValues('ed-chat-keywordsEl'),
        question: val('ed-chat-questionEl'),
        answer: val('ed-chat-answerEl'),
        ...(actionBtn ? { actionBtn } : {}),
        elaboration: val('ed-chat-elaborationEl') || undefined
      },
      en: {
        ...base,
        chip: val('ed-chat-chipEn'),
        keywords: getTagValues('ed-chat-keywordsEn'),
        question: val('ed-chat-questionEn'),
        answer: val('ed-chat-answerEn'),
        ...(actionBtn ? { actionBtn } : {}),
        elaboration: val('ed-chat-elaborationEn') || undefined
      }
    };
  }

  // Auto-fill lead engineer from team dropdown
  window._adminAutoFillLead = function () {
    const teamKey = val('ed-proj-team');
    const member = STATE.team.find(m => m.key === teamKey);
    if (member) {
      const leadEnInput = document.getElementById('ed-proj-leadEn');
      const leadElInput = document.getElementById('ed-proj-leadEl');
      if (leadEnInput) leadEnInput.value = `Lead Engineer: ${member.nameEn}`;
      if (leadElInput) leadElInput.value = `Επικεφαλής Μηχανικός: ${member.nameEl}`;
    }
  };


  // ═══════════════════════════════════════════════════════════════════════
  //  9. TAG INPUT COMPONENT
  // ═══════════════════════════════════════════════════════════════════════

  function initTagInputs() {
    document.querySelectorAll('.tag-input-wrap').forEach(wrap => {
      const field = wrap.dataset.field;
      const input = wrap.querySelector('.tag-input-field');
      let values = [];
      try { values = JSON.parse(wrap.dataset.values || '[]'); } catch (e) {}

      // Render existing chips
      values.forEach(v => addTagChip(wrap, input, v));

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ',') {
          e.preventDefault();
          const val = input.value.trim().replace(/,/g, '');
          if (val) {
            addTagChip(wrap, input, val);
            input.value = '';
          }
        }
        if (e.key === 'Backspace' && !input.value) {
          const chips = wrap.querySelectorAll('.tag-chip');
          if (chips.length) chips[chips.length - 1].remove();
        }
      });

      // Click to focus
      wrap.addEventListener('click', () => input.focus());
    });
  }

  function addTagChip(wrap, inputEl, value) {
    const chip = document.createElement('span');
    chip.className = 'tag-chip';
    chip.innerHTML = `${escHtml(value)}<button class="tag-remove" type="button">&times;</button>`;
    chip.querySelector('.tag-remove').addEventListener('click', () => chip.remove());
    chip.dataset.value = value;
    wrap.insertBefore(chip, inputEl);
  }

  function getTagValues(fieldName) {
    const wrap = document.querySelector(`.tag-input-wrap[data-field="${fieldName}"]`);
    if (!wrap) return [];
    return Array.from(wrap.querySelectorAll('.tag-chip')).map(c => c.dataset.value);
  }


  // ═══════════════════════════════════════════════════════════════════════
  //  10. DRAG & DROP IMAGE UPLOAD
  // ═══════════════════════════════════════════════════════════════════════

  function initDragDropZones() {
    document.querySelectorAll('.dnd-zone').forEach(zone => {
      const fileInput = zone.querySelector('input[type="file"]');
      const targetPath = zone.dataset.target;

      // Click to browse
      zone.addEventListener('click', (e) => {
        if (e.target.closest('.dnd-remove')) return;
        fileInput.click();
      });

      fileInput.addEventListener('change', () => {
        if (fileInput.files.length) handleImageFile(zone, fileInput.files[0], targetPath);
      });

      // Drag events
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('dragover');
      });
      zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));
      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('dragover');
        if (e.dataTransfer.files.length) handleImageFile(zone, e.dataTransfer.files[0], targetPath);
      });
    });
  }

  function handleImageFile(zone, file, targetPath) {
    if (!file.type.startsWith('image/')) {
      toast('Please select an image file', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      // Show preview
      let preview = zone.querySelector('.dnd-preview');
      if (!preview) {
        preview = document.createElement('div');
        preview.className = 'dnd-preview';
        zone.appendChild(preview);
      }
      preview.innerHTML = `
        <img src="${e.target.result}" alt="Preview">
        <button class="dnd-remove" onclick="this.closest('.dnd-preview').remove()">&times;</button>
      `;

      // Upload to GitHub
      if (STATE.pat) {
        try {
          const base64 = e.target.result.split(',')[1];
          toast('Uploading image...', 'info');
          await GitHub.uploadImage(targetPath, base64);
          toast('Image uploaded successfully!', 'success');
        } catch (err) {
          toast(`Image upload failed: ${err.message}`, 'error');
        }
      } else {
        toast('Image preview only (no PAT configured for upload)', 'warning');
      }
    };
    reader.readAsDataURL(file);
  }


  // ═══════════════════════════════════════════════════════════════════════
  //  11. PUBLISH FLOW
  // ═══════════════════════════════════════════════════════════════════════

  function updatePublishBar() {
    const bar = document.getElementById('publish-bar');
    const countEl = document.getElementById('changes-count');
    if (STATE.dirty && STATE.dirtyFiles.size > 0) {
      bar.classList.add('active');
      const files = Array.from(STATE.dirtyFiles);
      countEl.innerHTML = `<span>${files.length}</span> file${files.length > 1 ? 's' : ''} modified`;
    } else {
      bar.classList.remove('active');
    }
  }

  async function publishChanges() {
    if (!STATE.pat) {
      toast('Cannot publish: GitHub PAT not configured', 'error');
      return;
    }

    const publishBtn = document.getElementById('btn-publish');
    publishBtn.classList.add('loading');
    publishBtn.disabled = true;
    showLoading('Publishing to GitHub...');

    try {
      const commits = [];

      if (STATE.dirtyFiles.has('portfolio')) {
        const content = Serializers.serializePortfolioFile(STATE.projects);
        await GitHub.putFile(CONFIG.FILES.portfolio, content, '[Admin Dashboard] Update portfolio projects');
        commits.push('portfolio-data.js');
      }

      if (STATE.dirtyFiles.has('team')) {
        const content = Serializers.serializeTeamFile(STATE.team);
        await GitHub.putFile(CONFIG.FILES.team, content, '[Admin Dashboard] Update team members');
        commits.push('team-data.js');
      }

      if (STATE.dirtyFiles.has('chatbot')) {
        const content = Serializers.serializeChatFile(STATE.chatTopicsEl, STATE.chatTopicsEn);
        await GitHub.putFile(CONFIG.FILES.chatbot, content, '[Admin Dashboard] Update chatbot Q&A topics');
        commits.push('chatbot.js');
      }

      STATE.dirty = false;
      STATE.dirtyFiles.clear();
      updatePublishBar();
      hideLoading();
      toast(`Published! Updated: ${commits.join(', ')}. Vercel will deploy in ~20 seconds.`, 'success');
    } catch (err) {
      hideLoading();
      console.error(err);
      toast(`Publish failed: ${err.message}`, 'error');
    } finally {
      publishBtn.classList.remove('loading');
      publishBtn.disabled = false;
    }
  }

  function discardChanges() {
    showConfirm('Discard Changes', 'Reload all data from GitHub? Unsaved changes will be lost.', () => {
      STATE.dirty = false;
      STATE.dirtyFiles.clear();
      updatePublishBar();
      loadAllData();
    });
  }


  // ═══════════════════════════════════════════════════════════════════════
  //  UTILITIES
  // ═══════════════════════════════════════════════════════════════════════

  function val(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function escHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escAttr(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function showLoading(text) {
    const overlay = document.getElementById('loading-overlay');
    const textEl = overlay.querySelector('.loading-text');
    textEl.textContent = text || 'Loading...';
    overlay.classList.add('active');
  }

  function hideLoading() {
    document.getElementById('loading-overlay').classList.remove('active');
  }

  function showConfirm(title, message, onConfirm) {
    const overlay = document.getElementById('confirm-overlay');
    overlay.querySelector('h3').textContent = title;
    overlay.querySelector('p').textContent = message;
    overlay.classList.add('active');

    const okBtn = overlay.querySelector('.btn-confirm-ok');
    const cancelBtn = overlay.querySelector('.btn-confirm-cancel');

    const cleanup = () => {
      overlay.classList.remove('active');
      okBtn.replaceWith(okBtn.cloneNode(true));
      cancelBtn.replaceWith(cancelBtn.cloneNode(true));
    };

    okBtn.addEventListener('click', () => { cleanup(); onConfirm(); }, { once: true });
    cancelBtn.addEventListener('click', cleanup, { once: true });
  }


  // ═══════════════════════════════════════════════════════════════════════
  //  GLOBAL HOOKS
  // ═══════════════════════════════════════════════════════════════════════

  window._adminEdit = (type, index) => openEditor(type, index);
  window._adminDelete = (type, index) => deleteItem(type, index);
  window._adminAdd = (type) => openEditor(type, -1);
  window._adminSave = () => saveEditor();
  window._adminClose = () => closeEditor();
  window._adminPublish = () => publishChanges();
  window._adminDiscard = () => discardChanges();
  window._adminLogout = () => {
    sessionStorage.removeItem('pnrg_admin_auth');
    location.reload();
  };
  window._adminResetPat = () => {
    localStorage.removeItem('pnrg_github_pat');
    STATE.pat = null;
    showPatSetup();
  };


  // ═══════════════════════════════════════════════════════════════════════
  //  INIT
  // ═══════════════════════════════════════════════════════════════════════

  document.addEventListener('DOMContentLoaded', () => {
    initAuth();

    // Close editor on overlay click
    document.getElementById('editor-overlay').addEventListener('click', closeEditor);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && STATE.editorOpen) closeEditor();
    });
  });

  // Shake animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-8px); }
      75% { transform: translateX(8px); }
    }
  `;
  document.head.appendChild(style);

})();
