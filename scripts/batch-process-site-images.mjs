#!/usr/bin/env node
/**
 * Batch uniquify images for site-01-ro (variant=1).
 * Picks best usable clip per brand × role, runs process-clip-image.sh,
 * copies to canonical names used by DraftPage.
 *
 * Usage: node scripts/batch-process-site-images.mjs [--dry-run] [--brands=a,b]
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const VARIANT = '1';
const SITE = `site-0${VARIANT}-ro`;
const CLIP = path.join(ROOT, '01.RAW/web-clips');
const ASSETS = path.join(ROOT, '01.RAW/assets');
const OUT_ROOT = path.join(ROOT, '07.SITES', SITE, 'public/images');
const SCRIPT = path.join(ROOT, 'scripts/process-clip-image.sh');

const BRANDS = [
  '12xbet',
  '888sport',
  'betano',
  'betfair',
  'casa-pariurilor',
  'don-ro',
  'favbet',
  'fortuna',
  'getsbet',
  'maxbet',
  'netbet',
  'pokerstars',
  'stanleybet',
  'superbet',
  'topbet',
  'totogaming',
  'unibet',
  'vbet',
  'winbet',
  'winmasters',
];

const ROLES = [
  {
    role: 'main',
    type: 'screenshot-main',
    canonical: (b) => `${b}-screenshot-main.webp`,
    keyword: (b) => `recenzie-${b}`,
    sources: [
      { cat: 'reviews', types: ['screenshot-main'] },
      { cat: 'reviews', types: ['screenshot-live'] },
    ],
  },
  {
    role: 'bonus',
    type: 'screenshot-bonus',
    canonical: (b) => `${b}-screenshot-bonus.webp`,
    keyword: (b) => `bonus-${b}`,
    sources: [
      { cat: 'reviews', types: ['screenshot-bonus'] },
      { cat: 'bonuses', types: ['screenshot-main', 'screenshot-bonus'] },
    ],
  },
  {
    role: 'app',
    type: 'screenshot-app',
    canonical: (b) => `${b}-screenshot-app.webp`,
    keyword: (b) => `aplicatie-${b}`,
    sources: [
      { cat: 'apps', types: ['screenshot-main', 'screenshot-app', 'screenshot-mobile'] },
      { cat: 'reviews', types: ['screenshot-mobile', 'screenshot-main'] },
    ],
  },
  {
    role: 'logo',
    type: 'logo',
    canonical: (b) => `${b}-logo.png`,
    keyword: (b) => `logo-${b}`,
    sources: [{ cat: 'reviews', types: ['logo'] }],
  },
];

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const brandsArg = args.find((a) => a.startsWith('--brands='));
const brands = brandsArg
  ? brandsArg.split('=')[1].split(',').map((s) => s.trim()).filter(Boolean)
  : BRANDS;

function loadIndex(cat) {
  const p = path.join(CLIP, cat, 'imgs', '_index.json');
  if (!fs.existsSync(p)) return [];
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  return (data.images || []).map((img) => ({ ...img, _cat: cat }));
}

const indexes = {
  reviews: loadIndex('reviews'),
  bonuses: loadIndex('bonuses'),
  apps: loadIndex('apps'),
  payments: loadIndex('payments'),
  guides: loadIndex('guides'),
};

function scoreImage(img) {
  let q = 0;
  try {
    q = img.quality != null ? Number(img.quality) : 0;
  } catch {
    q = 0;
  }
  if (Number.isNaN(q)) q = 0;
  const w = Number(img.width) || 0;
  const h = Number(img.height) || 0;
  const tallPenalty = h > 2000 ? Math.floor((h - 2000) / 20) : 0;
  const tinyPenalty = w > 0 && w < 600 ? 500 : 0;
  return q * 1000 + Math.min(w, 2000) - tallPenalty - tinyPenalty;
}

function resolveFile(img) {
  const candidates = [
    path.join(CLIP, img._cat, 'imgs', img.file),
    path.join(ASSETS, img.brand || '', img.file),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return null;
}

function pick(brand, sources) {
  let best = null;
  let bestScore = -Infinity;
  for (const src of sources) {
    const pool = indexes[src.cat] || [];
    for (const img of pool) {
      if (!img.usable) continue;
      if (img.brand !== brand) continue;
      if (!src.types.includes(img.type)) continue;
      const file = resolveFile(img);
      if (!file) continue;
      const s = scoreImage(img);
      if (s > bestScore) {
        bestScore = s;
        best = { ...img, _file: file, _score: s };
      }
    }
  }
  return best;
}

function ensureAssetCopy(src, brand) {
  const destDir = path.join(ASSETS, brand);
  fs.mkdirSync(destDir, { recursive: true });
  const dest = path.join(destDir, path.basename(src));
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(src, dest);
  }
  return dest;
}

function processOne(brand, role) {
  const picked = pick(brand, role.sources);
  if (!picked) {
    return { brand, role: role.role, status: 'missing' };
  }
  const asset = ensureAssetCopy(picked._file, brand);
  const outDir = path.join(OUT_ROOT, brand);
  fs.mkdirSync(outDir, { recursive: true });
  const canonical = path.join(outDir, role.canonical(brand));

  if (dryRun) {
    return {
      brand,
      role: role.role,
      status: 'dry',
      src: path.relative(ROOT, picked._file),
      score: picked._score,
      canonical: path.relative(ROOT, canonical),
    };
  }

  const r = spawnSync(
    'bash',
    [SCRIPT, asset, brand, role.type, VARIANT, role.keyword(brand)],
    { encoding: 'utf8' },
  );
  if (r.status !== 0) {
    return {
      brand,
      role: role.role,
      status: 'error',
      err: (r.stderr || r.stdout || '').slice(0, 400),
    };
  }
  const outPath = (r.stdout || '').trim().split('\n').filter(Boolean).pop();
  if (!outPath || !fs.existsSync(outPath)) {
    return { brand, role: role.role, status: 'error', err: 'no output path' };
  }
  fs.copyFileSync(outPath, canonical);
  const size = fs.statSync(canonical).size;
  return {
    brand,
    role: role.role,
    status: 'ok',
    src: path.relative(ROOT, picked._file),
    out: path.relative(ROOT, canonical),
    sizeKb: Math.round(size / 1024),
  };
}

const results = [];
for (const brand of brands) {
  for (const role of ROLES) {
    const res = processOne(brand, role);
    results.push(res);
    const tag = res.status.toUpperCase().padEnd(7);
    const extra =
      res.status === 'ok'
        ? `${res.sizeKb}KB ← ${res.src}`
        : res.status === 'missing'
          ? 'no usable source'
          : res.status === 'dry'
            ? `${res.src} (score ${res.score})`
            : res.err || '';
    console.log(`[${tag}] ${brand}/${role.role} ${extra}`);
  }
}

const reportPath = path.join(OUT_ROOT, '_batch-images-report.json');
const summary = {
  at: new Date().toISOString(),
  site: SITE,
  variant: Number(VARIANT),
  brands: brands.length,
  ok: results.filter((r) => r.status === 'ok' || r.status === 'dry').length,
  missing: results.filter((r) => r.status === 'missing').length,
  errors: results.filter((r) => r.status === 'error').length,
  results,
};
if (!dryRun) {
  fs.writeFileSync(reportPath, JSON.stringify(summary, null, 2));
  console.log(`\nReport → ${path.relative(ROOT, reportPath)}`);
}
console.log(
  `\nDone: ok/dry=${summary.ok} missing=${summary.missing} errors=${summary.errors}`,
);
process.exit(summary.errors > 0 ? 1 : 0);
