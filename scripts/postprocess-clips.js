#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const YAML = require('yaml');

const VAULT_ROOT = path.resolve(__dirname, '..');
const WEB_CLIPS = path.join(VAULT_ROOT, '01.RAW', 'web-clips');
const BRANDS_FILE = path.join(VAULT_ROOT, '01.RAW', 'discovery', 'brands-from-reviews.json');
const LOGS_DIR = path.join(VAULT_ROOT, 'logs');
const MIN_WORDS = 500;

const CATEGORIES = [
  'reviews',
  'bonuses',
  'guides',
  'ratings',
  'sport-categories',
  'apps',
  'payments',
  'retail',
  'player-reviews',
];

const BRAND_ALIASES = {
  'casa-pariurilor': ['casa pariurilor', 'casa-pariurilor', 'casapariurilor', 'publicwin'],
  vbet: ['vbet', 'victorybet', 'victory bet', 'victory-bet'],
  'gets-bet': ['getsbet', 'gets bet', 'gets-bet'],
  totogaming: ['totogaming', 'toto gaming', 'toto-gaming'],
  'don-ro': ['don.ro', 'don ro', 'don-ro'],
  '888sport': ['888sport', '888 sport'],
  fortuna: ['fortuna', 'efortuna'],
  topbet: ['topbet', 'mozzartbet', 'mozzart bet'],
  pokerstars: ['pokerstars', 'poker stars'],
  winmasters: ['winmasters', 'win masters'],
  'mr-bit': ['mr-bit', 'mrbit', 'mr bit'],
  admiral: ['admiral', 'admiralbet'],
  powerbet: ['powerbet', 'power bet', 'power-bet'],
};

const SUBTYPE_RULES = {
  reviews: [
    [/lucruri-pe-care|inainte-de-a-paria/i, 'ghid-scurt'],
    [/calendar|promo/i, 'promo'],
    [/recenzie|review|pareri/i, 'recenzie'],
  ],
  bonuses: [
    [/fara[\s-]?depunere|no[\s-]?deposit/i, 'bonus-fara-depunere'],
    [/bun[\s-]?venit|welcome/i, 'bonus-bun-venit'],
    [/cod[\s-]?bonus|coduri-bonus|cod[\s-]?promo/i, 'cod-bonus'],
    [/cashback/i, 'cashback'],
    [/freebet|free[\s-]?bet/i, 'freebet'],
    [/rotiri/i, 'rotiri-gratuite'],
    [/promotii|promo/i, 'promotie'],
  ],
  guides: [
    [/ce[\s-]?inseamna|ce[\s-]?este/i, 'explicatie'],
    [/cum[\s-]?sa|ghid/i, 'ghid'],
    [/strategi|kelly|bankroll/i, 'strategie'],
    [/handicap|cash[\s-]?out|dnb|1x2/i, 'concept-pariuri'],
    [/ponturi|pronostic|predictii/i, 'ponturi'],
  ],
  ratings: [
    [/top|cele[\s-]?mai[\s-]?bune|clasament/i, 'top-lista'],
    [/compar|versus|\bvs\b/i, 'comparatie'],
  ],
  apps: [[/aplicatii|aplicatie|app|mobil/i, 'aplicatie']],
  payments: [[/skrill|neteller|visa|paypal|plata|depunere|retragere|netopia|paysafecard/i, 'metoda-plata']],
  retail: [[/stradale|agentii/i, 'agentie-stradala']],
  'player-reviews': [[/pareri|discutii/i, 'pareri-jucatori']],
  'sport-categories': [[/fotbal|tenis|baschet|hochei|handbal|volei|esport/i, 'pariuri-sport']],
};

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function loadBrandIndex() {
  const data = JSON.parse(fs.readFileSync(BRANDS_FILE, 'utf8'));
  const brands = data.brands || [];
  const tokens = [];

  for (const brand of brands) {
    const aliases = BRAND_ALIASES[brand] || [brand.replace(/-/g, ' '), brand];
    const unique = [...new Set([brand, ...aliases])];
    tokens.push({ brand, aliases: unique });
  }

  tokens.sort((a, b) => {
    const al = Math.max(...a.aliases.map((x) => x.length));
    const bl = Math.max(...b.aliases.map((x) => x.length));
    return bl - al;
  });

  return tokens;
}

function parseClip(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  if (!raw.startsWith('---')) {
    return { frontmatter: {}, body: raw, raw };
  }
  const parts = raw.split('---');
  if (parts.length < 3) {
    return { frontmatter: {}, body: raw, raw };
  }
  const frontmatter = YAML.parse(parts[1]) || {};
  const body = parts.slice(2).join('---').replace(/^\n/, '');
  return { frontmatter, body, raw };
}

function countWords(text) {
  return (text.match(/\b[\wăâîșțĂÂÎȘȚ]+\b/gu) || []).length;
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[_/]/g, ' ');
}

function detectBrand(frontmatter, body, brandIndex) {
  const haystack = normalizeText(
    `${frontmatter.title || ''} ${frontmatter.source || ''} ${body.slice(0, 8000)}`
  );

  for (const { brand, aliases } of brandIndex) {
    for (const alias of aliases) {
      const norm = normalizeText(alias);
      if (norm.length <= 3) {
        if (new RegExp(`(^|[^a-z0-9])${norm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^a-z0-9]|$)`).test(haystack)) {
          return brand;
        }
      } else if (haystack.includes(norm)) {
        return brand;
      }
    }
  }
  return null;
}

function detectSubtype(category, frontmatter, body, source) {
  const haystack = `${source} ${frontmatter.title || ''} ${body.slice(0, 4000)}`;
  const rules = SUBTYPE_RULES[category] || [];
  for (const [re, subtype] of rules) {
    if (re.test(haystack)) return subtype;
  }
  return category.replace(/-/g, '_');
}

function computeQualityScore(wordCount, body, frontmatter) {
  let score = 5;
  if (wordCount >= 3000) score += 2;
  else if (wordCount >= 1500) score += 1;
  else if (wordCount < 800) score -= 1;

  const h2 = (body.match(/^##\s/gm) || []).length;
  if (h2 >= 3) score += 1;

  const links = (body.match(/\[.*?\]\(/g) || []).length;
  if (links > wordCount / 15) score -= 1;

  if (frontmatter.scrape_strategy === 'fallback-full') score -= 1;

  return Math.max(1, Math.min(10, Math.round(score)));
}

function serializeClip(frontmatter, body) {
  const fm = YAML.stringify(frontmatter).trim();
  return `---\n${fm}\n---\n\n${body.trim()}\n`;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function moveFile(src, destDir, reason) {
  ensureDir(destDir);
  const base = path.basename(src);
  let dest = path.join(destDir, base);
  if (fs.existsSync(dest)) {
    const ext = path.extname(base);
    const stem = path.basename(base, ext);
    dest = path.join(destDir, `${stem}-${Date.now()}${ext}`);
  }
  fs.renameSync(src, dest);
  return { from: src, to: dest, reason };
}

function collectErrorManifest() {
  const files = fs.readdirSync(LOGS_DIR).filter((f) => f.startsWith('firecrawl-') && f.endsWith('.log'));
  const errors = [];
  for (const file of files) {
    const lines = fs.readFileSync(path.join(LOGS_DIR, file), 'utf8').split('\n').filter(Boolean);
    for (const line of lines) {
      try {
        const row = JSON.parse(line);
        if (row.status === 'error') errors.push({ url: row.url, error: row.error, log: file, ts: row.ts });
      } catch {
        // ignore
      }
    }
  }
  const byUrl = new Map();
  for (const e of errors) byUrl.set(e.url, e);
  return [...byUrl.values()];
}

function indexNewScreenshots(category) {
  const imgsDir = path.join(WEB_CLIPS, category, 'imgs');
  if (!fs.existsSync(imgsDir)) return { added: 0, total: 0 };

  const indexPath = path.join(imgsDir, '_index.json');
  let index = {
    last_updated: todayIso(),
    category,
    total_indexed: 0,
    images: [],
  };
  if (fs.existsSync(indexPath)) {
    index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  }

  const known = new Set((index.images || []).map((i) => i.file));
  const shots = fs
    .readdirSync(imgsDir)
    .filter((f) => f.endsWith('-screenshot.png') && !known.has(f));

  for (const file of shots) {
    index.images.push({
      file,
      brand: null,
      type: 'screenshot-main',
      theme: category,
      width: null,
      height: null,
      quality: 6,
      usable: true,
      source: 'firecrawl-batch',
    });
  }

  index.last_updated = todayIso();
  index.total_indexed = index.images.length;
  index.usable_images = index.images.filter((i) => i.usable).length;

  const tmp = `${indexPath}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(index, null, 2), 'utf8');
  fs.renameSync(tmp, indexPath);
  return { added: shots.length, total: index.images.length };
}

function processCategory(category, brandIndex, stats) {
  const catDir = path.join(WEB_CLIPS, category);
  const trashDir = path.join(catDir, '_trash');
  const dupDir = path.join(trashDir, 'duplicate');
  if (!fs.existsSync(catDir)) return;

  const files = fs
    .readdirSync(catDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => path.join(catDir, f));

  const bySource = new Map();

  for (const filePath of files) {
    const { frontmatter, body } = parseClip(filePath);
    const source = (frontmatter.source || '').trim();
    const wordCount = countWords(body);
    const brand = detectBrand(frontmatter, body, brandIndex);
    const contentSubtype = detectSubtype(category, frontmatter, body, source);
    const qualityScore = computeQualityScore(wordCount, body, frontmatter);

    const updated = {
      ...frontmatter,
      brand: brand || frontmatter.brand || null,
      content_subtype: contentSubtype,
      word_count: wordCount,
      quality_score: qualityScore,
      processed: todayIso(),
    };

    if (!updated.brand) delete updated.brand;

    if (wordCount < MIN_WORDS) {
      moveFile(filePath, trashDir, 'short');
      stats.trash += 1;
      stats.trashByCategory[category] = (stats.trashByCategory[category] || 0) + 1;
      continue;
    }

    const record = { filePath, source, wordCount, updated, body };
    if (source) {
      if (!bySource.has(source)) bySource.set(source, []);
      bySource.get(source).push(record);
    } else {
      fs.writeFileSync(filePath, serializeClip(updated, body), 'utf8');
      stats.kept += 1;
      if (updated.brand) stats.withBrand += 1;
    }
  }

  for (const [, group] of bySource) {
    group.sort((a, b) => b.wordCount - a.wordCount || b.filePath.localeCompare(a.filePath));
    const [keep, ...rest] = group;
    fs.writeFileSync(keep.filePath, serializeClip(keep.updated, keep.body), 'utf8');
    stats.kept += 1;
    if (keep.updated.brand) stats.withBrand += 1;

    for (const dup of rest) {
      moveFile(dup.filePath, dupDir, 'duplicate-source');
      stats.duplicates += 1;
    }
  }

  const imgStats = indexNewScreenshots(category);
  stats.imagesAdded += imgStats.added;
  stats.imagesTotal += imgStats.total;
}

function main() {
  const brandIndex = loadBrandIndex();
  const stats = {
    kept: 0,
    trash: 0,
    duplicates: 0,
    withBrand: 0,
    trashByCategory: {},
    imagesAdded: 0,
    imagesTotal: 0,
  };

  for (const category of CATEGORIES) {
    processCategory(category, brandIndex, stats);
  }

  const errors = collectErrorManifest();
  const errorsDir = path.join(WEB_CLIPS, '_errors');
  ensureDir(errorsDir);
  fs.writeFileSync(
    path.join(errorsDir, 'manifest.json'),
    JSON.stringify({ generated: todayIso(), count: errors.length, errors }, null, 2),
    'utf8'
  );

  const report = {
    generated: todayIso(),
    min_words: MIN_WORDS,
    kept: stats.kept,
    trash: stats.trash,
    duplicates: stats.duplicates,
    with_brand: stats.withBrand,
    trash_by_category: stats.trashByCategory,
    images_added_to_index: stats.imagesAdded,
    images_indexed_total: stats.imagesTotal,
    firecrawl_errors_in_logs: errors.length,
  };

  const reportPath = path.join(WEB_CLIPS, 'postprocess-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

  console.log(JSON.stringify(report, null, 2));
}

main();
