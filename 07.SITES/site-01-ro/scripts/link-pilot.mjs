/**
 * Pilot Linker — resolves [[concept:...]] for pilot drafts.
 * Usage: node scripts/link-pilot.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../../..');
const SITE = path.resolve(__dirname, '..');
const MAP_PATH = path.join(ROOT, '05.REGISTRIES/concepts-map.md');
const DRAFTS = path.join(SITE, 'src/content/drafts');
const OUT = path.join(SITE, 'src/content/linked');

const PILOT = [
  'homepage',
  'review-betano',
  'bonus-de-bun-venit-betano',
  'eat-despre-noi',
  'eat-metodologie',
  'eat-contact',
  'eat-termeni-si-conditii',
  'eat-politica-de-confidentialitate',
  'eat-joc-responsabil',
];

function loadConcepts() {
  const raw = fs.readFileSync(MAP_PATH, 'utf8');
  const block = raw.match(/```yaml\n([\s\S]*?)```/);
  if (!block) throw new Error('concepts-map yaml block not found');
  const concepts = new Map();
  let current = null;
  let inPerBrand = false;
  for (const line of block[1].split('\n')) {
    const idM = line.match(/^\s+- id:\s*(.+)$/);
    if (idM) {
      current = { id: idM[1].trim(), per_brand: {} };
      concepts.set(current.id, current);
      inPerBrand = false;
      continue;
    }
    if (!current) continue;
    if (/^\s+per_brand:\s*$/.test(line)) {
      inPerBrand = true;
      continue;
    }
    if (inPerBrand) {
      const pb = line.match(/^\s{6,}([a-z0-9-]+):\s*(\/\S+)/);
      if (pb) {
        current.per_brand[pb[1]] = pb[2].replace(/\s+#.*$/, '').trim();
        continue;
      }
      if (/^\s+- id:/.test(line) || (/^\s+\w+:/.test(line) && !/^\s{6,}/.test(line))) {
        inPerBrand = false;
      }
    }
    const urlM = line.match(/^\s+(url|hub_url):\s*(\S+)/);
    if (urlM) current[urlM[1]] = urlM[2].trim();
    const st = line.match(/^\s+status:\s*(\S+)/);
    if (st) current.status = st[1].trim();
  }
  return concepts;
}

function resolveToken(token, concepts, pending) {
  // token = X or X@brand or X?section=name
  let id = token;
  let brand = null;
  let section = null;
  const sec = token.match(/^([^?@]+)\?section=([a-z0-9-]+)$/i);
  if (sec) {
    id = sec[1];
    section = sec[2];
  }
  const at = id.match(/^([^@]+)@([a-z0-9-]+)$/i);
  if (at) {
    id = at[1];
    brand = at[2];
  }
  const c = concepts.get(id);
  if (!c) {
    pending.push({ token, reason: 'missing_id' });
    return null;
  }
  let url = null;
  if (brand && c.per_brand?.[brand]) url = c.per_brand[brand];
  else url = c.hub_url || c.url;
  if (!url) {
    pending.push({ token, reason: 'no_url' });
    return null;
  }
  if (section) url = `${url.replace(/\/$/, '')}/#${section}`;
  // ensure trailing slash consistency for dirs
  if (!url.includes('#') && !path.extname(url) && url !== '/' && !url.endsWith('/')) {
    // keep as in map; Astro trailingSlash default ignore
  }
  return url;
}

function linkContent(md, concepts) {
  const pending = [];
  let resolved = 0;
  const out = md.replace(/\[\[concept:([^\]]+)\]\]/g, (full, token) => {
    const url = resolveToken(token.trim(), concepts, pending);
    if (!url) return full;
    resolved += 1;
    const label = token.includes('@') ? token.split('@')[0].replace(/-/g, ' ') : token.replace(/-/g, ' ');
    return `[${label}](${url})`;
  });
  return { out, pending, resolved };
}

function extractContent(raw) {
  const fm = raw.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  const body = fm ? fm[1] : raw;
  const m = body.match(/# CONTENT[^\n]*\n([\s\S]*)/);
  let content = m ? m[1] : body;
  content = content
    .replace(/\n## Copy self-check[\s\S]*$/i, '')
    .replace(/\n## Linguist Notes[\s\S]*$/i, '')
    .trim();
  return { frontmatterBlock: fm ? raw.slice(0, fm.index + fm[0].length - body.length) : '', content, fullFront: fm ? raw.match(/^---\n[\s\S]*?\n---/)[0] : '' };
}

fs.mkdirSync(OUT, { recursive: true });
const concepts = loadConcepts();
// Pilot overrides: bonus betano is ready
const bonus = concepts.get('bonus-de-bun-venit');
if (bonus) {
  bonus.per_brand = bonus.per_brand || {};
  bonus.per_brand.betano = '/bonusuri/bonus-de-bun-venit/betano';
}
// Pilot aliases / missing ids
if (!concepts.has('sport-fotbal')) {
  concepts.set('sport-fotbal', {
    id: 'sport-fotbal',
    hub_url: '/sport/fotbal/',
    url: '/sport/fotbal/',
    status: 'ready',
  });
}
if (!concepts.has('recenzie')) {
  concepts.set('recenzie', {
    id: 'recenzie',
    hub_url: '/recenzii/',
    per_brand: { betano: '/recenzii/betano' },
    status: 'ready',
  });
} else {
  const r = concepts.get('recenzie');
  r.per_brand = r.per_brand || {};
  r.per_brand.betano = '/recenzii/betano';
  r.status = 'ready';
}

const report = { pages: [], totalResolved: 0, pending: [] };

for (const slug of PILOT) {
  const src = path.join(DRAFTS, `${slug}.md`);
  const raw = fs.readFileSync(src, 'utf8');
  const { fullFront, content } = extractContent(raw);
  const { out, pending, resolved } = linkContent(content, concepts);
  const dest = path.join(OUT, `${slug}.md`);
  fs.writeFileSync(dest, `${fullFront}\n\n${out}\n`);
  report.pages.push({ slug, resolved, pending: pending.length });
  report.totalResolved += resolved;
  report.pending.push(...pending.map((p) => ({ slug, ...p })));
}

fs.writeFileSync(path.join(OUT, '_pilot-link-report.json'), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
