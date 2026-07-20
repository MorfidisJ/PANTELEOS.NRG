/**
 * PANTELEOS.NRG — Automated Build-Time / CI i18n Translation Script
 * 
 * Scans js/portfolio-data.js, js/team-data.js, and js/i18n.js for missing English entries
 * where the Greek field (*El or el dictionary) has text but the English field is empty.
 * Calls free translation API (@vitalets/google-translate-api) and writes back to disk.
 * 
 * Usage:
 *   node scripts/auto-translate.js
 */

const fs = require('fs');
const path = require('path');

// Try importing google-translate-api
let translate;
try {
  translate = require('@vitalets/google-translate-api').translate;
} catch (err) {
  console.error("Please install @vitalets/google-translate-api: npm install @vitalets/google-translate-api");
  process.exit(1);
}

const translateText = async (text) => {
  if (!text || typeof text !== 'string' || !text.trim()) return text;
  try {
    const res = await translate(text, { from: 'el', to: 'en' });
    return res.text;
  } catch (err) {
    console.warn(`[WARN] Failed to translate "${text.substring(0, 30)}...":`, err.message);
    return text;
  }
};

async function processPortfolioData() {
  const filePath = path.join(__dirname, '../js/portfolio-data.js');
  if (!fs.existsSync(filePath)) return;
  console.log("-> Checking js/portfolio-data.js for missing English entries...");
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find fields where El exists but En is empty ("" or '' or missing)
  // We look for pairs like titleEl: "Greek Text", titleEn: ""
  const fields = ['tag', 'title', 'lead', 'desc', 'dur'];
  let modified = false;

  for (const field of fields) {
    const regex = new RegExp(`(${field}El:\\s*["'\`])([\\s\\S]*?)(["'\`],\\s*(?:\\n\\s*)?${field}En:\\s*["'\`])(["'\`])`, 'g');
    const matches = [...content.matchAll(regex)];
    
    for (const match of matches) {
      const elText = match[2];
      const enText = match[4]; // if enText is empty string right before closing quote
      
      // If Greek exists but English is empty string
      if (elText && elText.trim() && (!enText || !enText.trim())) {
        console.log(`   Translating [${field}]: "${elText.substring(0, 40)}..."`);
        const translated = await translateText(elText);
        if (translated && translated !== elText) {
          const fullOld = match[0];
          const fullNew = `${match[1]}${elText}${match[3]}${translated}${match[4] ? match[4] : '"'}`;
          content = content.replace(fullOld, fullNew);
          modified = true;
        }
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("-> Updated js/portfolio-data.js!");
  } else {
    console.log("-> js/portfolio-data.js is up to date.");
  }
}

async function processTeamData() {
  const filePath = path.join(__dirname, '../js/team-data.js');
  if (!fs.existsSync(filePath)) return;
  console.log("-> Checking js/team-data.js for missing English entries...");
  
  let content = fs.readFileSync(filePath, 'utf8');
  const fields = ['name', 'shortRole', 'role', 'reg', 'bio'];
  let modified = false;

  for (const field of fields) {
    const regex = new RegExp(`(${field}El:\\s*["'\`])([\\s\\S]*?)(["'\`],\\s*(?:\\n\\s*)?${field}En:\\s*["'\`])(["'\`])`, 'g');
    const matches = [...content.matchAll(regex)];
    
    for (const match of matches) {
      const elText = match[2];
      const enText = match[4];
      if (elText && elText.trim() && (!enText || !enText.trim())) {
        console.log(`   Translating [${field}]: "${elText.substring(0, 40)}..."`);
        const translated = await translateText(elText);
        if (translated && translated !== elText) {
          const fullOld = match[0];
          const fullNew = `${match[1]}${elText}${match[3]}${translated}${match[4] ? match[4] : '"'}`;
          content = content.replace(fullOld, fullNew);
          modified = true;
        }
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("-> Updated js/team-data.js!");
  } else {
    console.log("-> js/team-data.js is up to date.");
  }
}

async function processI18n() {
  const filePath = path.join(__dirname, '../js/i18n.js');
  if (!fs.existsSync(filePath)) return;
  console.log("-> Checking js/i18n.js for missing English dictionary keys...");
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Extract all Greek (el) key-value pairs
  const elMatch = content.match(/el:\s*\{([\s\S]*?)\n\s*\},\s*\n\s*en:/);
  if (!elMatch) return;

  const elDict = {};
  const elRegex = /("([^"]+)":\s*"([^"\\]*(?:\\.[^"\\]*)*)")/g;
  let m;
  while ((m = elRegex.exec(elMatch[1])) !== null) {
    elDict[m[2]] = m[3];
  }

  // Check en block for empty values like "footer.tag": ""
  const enRegex = /("([^"]+)":\s*)(""|'')/g;
  const matches = [...content.matchAll(enRegex)];
  
  for (const match of matches) {
    const key = match[2];
    const elText = elDict[key];
    if (elText && elText.trim()) {
      console.log(`   Translating i18n [${key}]: "${elText.substring(0, 40)}..."`);
      const translated = await translateText(elText);
      if (translated && translated !== elText) {
        const fullOld = match[0];
        const fullNew = `${match[1]}"${translated}"`;
        content = content.replace(fullOld, fullNew);
        modified = true;
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("-> Updated js/i18n.js!");
  } else {
    console.log("-> js/i18n.js is up to date.");
  }
}

async function run() {
  console.log("=== Starting Automated i18n Translation ===");
  await processPortfolioData();
  await processTeamData();
  await processI18n();
  console.log("=== Translation Workflow Complete ===");
}

run().catch(err => {
  console.error("Error during auto-translation:", err);
  process.exit(1);
});
