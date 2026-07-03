/**
 * PANTELEOS .NRG — Minimalist Architectural Outline Icon Engine
 * Converts emojis and symbols into custom, high-precision SVG vector outlines
 * matching the clean white theme and BIM LOD-400 architectural aesthetic.
 */

(function() {
  'use strict';

  // Map of emoji characters (without variation selector 16) to clean SVG path geometry
  const ICON_MAP = {
    // 1. Reset / Refresh (circular arrows)
    '🔄': '<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>',
    
    // 2. Right Arrow / Pointer
    '👉': '<path d="M5 12h14M12 5l7 7-7 7"/>',
    
    // 3. Lightbulb / Tip / Idea
    '💡': '<path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A6 6 0 1 0 7.5 11.5c.75.75 1.23 1.51 1.4 2.5"/><path d="M12 2v1"/>',
    
    // 4. Ruler / Set Square / BIM LOD-400
    '📐': '<path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2M11.5 9.5l2-2M8.5 6.5l2-2M17.5 15.5l2-2"/>',
    
    // 5. Classical Building / Permits / e-Adeia
    '🏛': '<path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>',
    '🏛️': '<path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>',
    
    // 6. Key / Turnkey Contracts
    '🔑': '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6M15.5 7.5l3 3M18 5l2 2"/>',
    
    // 7. Lightning Bolt / nZEB / KENAK Energy
    '⚡': '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    
    // 8. Tower Crane / Construction / Anti-seismic
    '🏗': '<path d="M2 22h20M4 22V4M4 4h14l-4 6H4M14 10v12M8 10v12"/>',
    '🏗️': '<path d="M2 22h20M4 22V4M4 4h14l-4 6H4M14 10v12M8 10v12"/>',
    
    // 9. Euro Currency / Budgeting
    '💶': '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
    
    // 10. Money Stack / Cost Elaboration
    '💰': '<path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2h0V5z"/><path d="M12 11h-1a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-1M12 9v2M12 17v2"/>',
    
    // 11. Stopwatch / Timeline & Duration
    '⏱': '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M10 2h4"/>',
    '⏱️': '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M10 2h4"/>',
    
    // 12. Calendar / Phases Schedule
    '📅': '<rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/>',
    
    // 13. Hammer & Tools / Renovation & Reinforcement
    '🔨': '<path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"/><path d="M17.64 15 22 10.64"/><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 2.26c.24.24.58.38.92.38z"/>',
    
    // 14. Modern Building Facade / Hotels & Commercial
    '🏨': '<path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4M10 9h4M10 13h4"/>',
    
    // 15. Tie & Collar / Professional Team / Council
    '👔': '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><path d="M12 11l2 4-2 6-2-6 2-4z"/>',
    
    // 16. Brickwork Grid / Advanced Materials / KNX BMS
    '🧱': '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M12 3v18M3 9h18M3 15h18M7.5 9v6M16.5 9v6M7.5 3v6M16.5 3v6M7.5 15v6M16.5 15v6"/>',
    
    // 17. Radar & Satellite / Drone Topography GIS
    '🛰': '<path d="m13 7 4 4M17 3l4 4M15 5l4 4M4.3 15.7c-.8-.8-.8-2 0-2.8l2.8-2.8c.8-.8 2-.8 2.8 0l4.2 4.2c.8.8.8 2 0 2.8l-2.8 2.8c-.8.8-2 .8-2.8 0Z"/><path d="m9.1 18.2-5.9 3.8M5.2 14.1 1.4 8.2M11.9 11.9l2.1-2.1"/>',
    '🛰️': '<path d="m13 7 4 4M17 3l4 4M15 5l4 4M4.3 15.7c-.8-.8-.8-2 0-2.8l2.8-2.8c.8-.8 2-.8 2.8 0l4.2 4.2c.8.8.8 2 0 2.8l-2.8 2.8c-.8.8-2 .8-2.8 0Z"/><path d="m9.1 18.2-5.9 3.8M5.2 14.1 1.4 8.2M11.9 11.9l2.1-2.1"/>',
    
    // 18. European Circle of Stars / Grants & Subsidies
    '🇪🇺': '<circle cx="12" cy="12" r="9"/><path d="M12 7v.01M12 17v.01M15.5 8l-.01.01M8.5 16l-.01.01M17 12v.01M7 12v.01M15.5 16l-.01.01M8.5 8l-.01.01M14.5 14.5l-.01.01M9.5 9.5l-.01.01M14.5 9.5l-.01.01M9.5 14.5l-.01.01"/>',
    
    // 19. Phone Handset / Appointments & Contact
    '📞': '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    
    // 20. Envelope / Email Contact
    '📧': '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    
    // 21. Checkmark / Success / Download
    '✅': '<polyline points="20 6 9 17 4 12"/>',
    '✔': '<polyline points="20 6 9 17 4 12"/>',
    
    // 22. Clipboard Document / BOQ / Inquiry Form
    '📋': '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01"/>',
    
    // 23. Bookmark Tabs / Official Technical Proposal Header
    '📑': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/>',
    
    // 24. Document Sheet / Download Proposal (.PDF / .TXT)
    '📄': '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>',
    
    // 25. Hourglass Timer / Generating Proposal
    '⏳': '<path d="M5 22h14M5 2h14M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>',
    
    // 26. Diamond Bullet Point (Filled subtle diamond)
    '🔹': '<rect x="12" y="5" width="10" height="10" rx="1.5" transform="rotate(45 12 5)" fill="currentColor" stroke="none" style="opacity: 0.75;"/>',
    
    // 27. Protection Shield / Seismic Safety
    '🛡': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    '🛡️': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>',
    
    // 28. Microscope / Scientific Methodologies & Testing
    '🔬': '<path d="M6 18h8M3 22h18M14 22a7 7 0 1 0 0-14h-1M9 14h2M12 6l-2-2M18 11l2 2"/>',
    
    // 29. Magnifying Glass / Diagnostics & Search
    '🔍': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    
    // 30. Column Analytics Chart / Specs & Requirements
    '📊': '<line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/>',
    
    // 31. Alert Triangle / Disclaimer & Warnings
    '⚠️': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/>',
    '⚠': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/>',
    
    // 32. Thumbs Up / Satisfied Rating
    '👍': '<path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>',
    
    // 33. Thumbs Down / Dissatisfied Rating
    '👎': '<path d="M17 14V2M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/>',
    
    // 34. Notepad & Pen / Feedback & Improvement
    '📝': '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>',

    // 35. Sparkles / AI Intelligence
    '✨': '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>',

    // 36. Gear / Settings / Engineering
    '⚙': '<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/><circle cx="12" cy="12" r="3"/>',
    '⚙️': '<path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/><circle cx="12" cy="12" r="3"/>'
  };

  // Build high-performance regex from keys sorted by length descending
  const iconKeys = Object.keys(ICON_MAP).sort((a, b) => b.length - a.length);
  const patternStr = iconKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const ICON_REGEX = new RegExp(`(${patternStr})\\uFE0F?`, 'g');

  /**
   * Replaces any emoji in a text or HTML string with its corresponding architectural SVG outline icon.
   * @param {string} text - Input text or HTML string containing emojis
   * @returns {string} Text with emojis replaced by <svg class="ui-icon"> elements
   */
  function replaceEmojisWithSVG(text) {
    if (typeof text !== 'string' || !text) return text;
    return text.replace(ICON_REGEX, (match) => {
      const cleanKey = match.replace(/\uFE0F/g, '');
      const pathData = ICON_MAP[cleanKey] || ICON_MAP[match];
      if (!pathData) return match;
      return `<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true">${pathData}</svg>`;
    });
  }

  /**
   * Sweeps target DOM elements and replaces any static emojis with SVG vectors.
   */
  function replaceEmojisInDOM(rootNode = document) {
    const targetSelectors = [
      '#chat-reset-btn span',
      '#gauger-proposal-btn span',
      '.section-head h4',
      '.section-head h3',
      '.p-card h4',
      '.service-card h4',
      '#teaser .teaser-output button span',
      '.stat-unit'
    ];
    
    targetSelectors.forEach(sel => {
      rootNode.querySelectorAll(sel).forEach(el => {
        if (el.innerHTML && /[^\x00-\x7F\u0370-\u03FF\u1F00-\u1FFF]/.test(el.innerHTML)) {
          const updated = replaceEmojisWithSVG(el.innerHTML);
          if (updated !== el.innerHTML) {
            el.innerHTML = updated;
          }
        }
      });
    });
  }

  // Expose globally
  window.UI_ICONS = ICON_MAP;
  window.replaceEmojisWithSVG = replaceEmojisWithSVG;
  window.replaceEmojisInDOM = replaceEmojisInDOM;

  // Run initial DOM sweep when loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => replaceEmojisInDOM());
  } else {
    replaceEmojisInDOM();
  }

})();
