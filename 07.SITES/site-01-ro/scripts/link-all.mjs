/**
 * Mass Linker — resolve [[concept:...]] for all status:ready drafts.
 * Usage: node scripts/link-all.mjs
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
const MANIFEST = path.join(SITE, 'src/data/ready-pages.json');

function parseFm(block) {
  const data = {};
  for (const line of block.split('\n')) {
    if (!line.trim() || line.startsWith(' ') || line.startsWith('-') || line.startsWith('\t')) continue;
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    data[m[1]] = val;
  }
  return data;
}

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
      if (/^\s{0,4}\S/.test(line) && !/^\s{6,}/.test(line)) inPerBrand = false;
    }
    const urlM = line.match(/^\s+(url|hub_url|url_pattern):\s*(\S+)/);
    if (urlM) current[urlM[1]] = urlM[2].trim();
    const st = line.match(/^\s+status:\s*(\S+)/);
    if (st) current.status = st[1].trim();
  }
  return concepts;
}

function enrichFromDrafts(concepts, pages) {
  // Ensure every ready page URL is resolvable via common concept ids
  for (const p of pages) {
    if (p.type === 'REVIEW') {
      const brand = p.url.replace(/^\/recenzii\//, '').replace(/\/$/, '');
      const c = concepts.get('recenzie') || { id: 'recenzie', per_brand: {}, hub_url: '/recenzii/' };
      c.per_brand = c.per_brand || {};
      c.per_brand[brand] = p.url.endsWith('/') ? p.url.slice(0, -1) : p.url;
      c.status = 'ready';
      concepts.set('recenzie', c);
    }
    if (p.type === 'SPORT-CATEGORY') {
      const sport = p.url.replace(/^\/sport\//, '').replace(/\/$/, '');
      const id = `sport-${sport}`;
      if (!concepts.has(id)) {
        concepts.set(id, { id, url: p.url, hub_url: p.url, status: 'ready' });
      }
      if (sport === 'fotbal' && !concepts.has('sport-fotbal')) {
        concepts.set('sport-fotbal', { id: 'sport-fotbal', url: p.url, hub_url: p.url, status: 'ready' });
      }
    }
    if (p.type === 'BONUS-PAGE') {
      // /bonusuri/<cat>/<brand>
      const parts = p.url.replace(/\/$/, '').split('/').filter(Boolean);
      if (parts.length >= 3) {
        const cat = parts[1];
        const brand = parts[2];
        const c = concepts.get(cat) || { id: cat, per_brand: {}, hub_url: `/bonusuri/${cat}` };
        c.per_brand = c.per_brand || {};
        c.per_brand[brand] = p.url.replace(/\/$/, '');
        concepts.set(cat, c);
      }
    }
    if (p.type === 'APP-REVIEW') {
      const brand = p.url.replace(/^\/aplicatii\//, '').replace(/\/$/, '');
      const c = concepts.get('aplicatie-mobila') || { id: 'aplicatie-mobila', per_brand: {}, hub_url: '/aplicatii/' };
      c.per_brand = c.per_brand || {};
      c.per_brand[brand] = p.url.replace(/\/$/, '');
      concepts.set('aplicatie-mobila', c);
      if (!concepts.has('aplicatie')) {
        concepts.set('aplicatie', { ...c, id: 'aplicatie' });
      }
    }
    if (p.type === 'PAYMENT-METHOD') {
      const method = p.url.replace(/^\/metode-de-plata\//, '').replace(/\/$/, '');
      if (method && !concepts.has(method)) {
        concepts.set(method, { id: method, url: p.url.replace(/\/$/, ''), hub_url: p.url.replace(/\/$/, ''), status: 'ready' });
      }
    }
    if (p.type === 'GUIDE-PAGE' || p.type === 'FEATURE-RATING' || p.type === 'RATING') {
      // map common slug tokens when id matches last path segment
      const seg = p.url.replace(/\/$/, '').split('/').pop();
      if (seg && !concepts.has(seg)) {
        concepts.set(seg, { id: seg, url: p.url.replace(/\/$/, ''), hub_url: p.url.replace(/\/$/, ''), status: 'ready' });
      }
    }
  }
  // Manual aliases for glossary used in copy
  const aliases = {
    'pontul-zilei': '/ponturi/pontul-zilei/',
    'pariuri-1x2': '/ghiduri/tipuri-de-pariuri/pariuri-1x2',
    'pariuri-over-under': '/ghiduri/tipuri-de-pariuri/ce-sunt-pariurile-over-under-sub-peste',
    'handicap': '/ghiduri/tipuri-de-pariuri/ce-este-handicapul-la-pariuri',
    'handicap-asiatic': '/ghiduri/tipuri-de-pariuri/ce-este-handicapul-asiatic',
    'pariuri-handicap': '/ghiduri/tipuri-de-pariuri/ce-este-handicapul-la-pariuri',
    'btts': '/ghiduri/tipuri-de-pariuri/ce-inseamna-btts-la-pariuri',
    'draw-no-bet': '/ghiduri/tipuri-de-pariuri/ce-inseamna-dnb-la-pariuri',
    'pariu-sansa-dubla': '/ghiduri/tipuri-de-pariuri/ce-este-pariul-sansa',
    'pariuri-multiple': '/top-case-de-pariuri-bonus-pariuri-multiple',
    'bankroll-management': '/ghiduri/gestionarea-banilor/bankroll-management',
    'aplicatie-android': '/aplicatii/',
    'aplicatie-ios': '/aplicatii/',
    'live-betting-mobil': '/ghiduri/notiuni-de-baza/ce-sunt-pariurile-live',
    'pariu-fara-risc': '/bonusuri/bonus-de-bun-venit',
  };
  for (const [id, url] of Object.entries(aliases)) {
    if (!concepts.has(id)) concepts.set(id, { id, url, hub_url: url, status: 'ready' });
  }
}

function resolveToken(token, concepts, pending) {
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
  else if (brand && c.url_pattern) url = c.url_pattern.replace('{brand}', brand);
  else url = c.hub_url || c.url;
  if (!url) {
    pending.push({ token, reason: 'no_url' });
    return null;
  }
  if (section) url = `${url.replace(/\/$/, '')}/#${section}`;
  return url;
}

function linkContent(md, concepts) {
  const pending = [];
  let resolved = 0;
  const out = md.replace(/\[\[concept:([^\]]+)\]\]/g, (full, token) => {
    const url = resolveToken(token.trim(), concepts, pending);
    const label = token.split(/[@?]/)[0].replace(/-/g, ' ');
    if (!url) {
      // Keep readable text; do not emit raw [[concept:]] in HTML
      return label;
    }
    resolved += 1;
    return `[${label}](${url})`;
  });
  return { out, pending, resolved };
}

function extractContent(raw) {
  const fm = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fm) return null;
  const body = fm[2];
  const m = body.match(/# CONTENT[^\n]*\n([\s\S]*)/);
  let content = m ? m[1] : body;
  content = content
    .replace(/\n## Copy self-check[\s\S]*$/i, '')
    .replace(/\n## Linguist Notes[\s\S]*$/i, '')
    .trim();
  return { fullFront: `---\n${fm[1]}\n---`, content, fm: parseFm(fm[1]) };
}

fs.mkdirSync(OUT, { recursive: true });
fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });

const pages = [];
for (const file of fs.readdirSync(DRAFTS).filter((f) => f.endsWith('.md'))) {
  const raw = fs.readFileSync(path.join(DRAFTS, file), 'utf8');
  const parsed = extractContent(raw);
  if (!parsed) continue;
  if (parsed.fm.status !== 'ready') continue;
  const slug = file.replace(/\.md$/, '');
  let url = parsed.fm.url || '/';
  if (!url.startsWith('/')) url = `/${url}`;
  pages.push({
    slug,
    type: parsed.fm.type,
    title: parsed.fm.title,
    url,
    updated: parsed.fm.updated || parsed.fm.created || '',
    target_keyword: parsed.fm.target_keyword || '',
  });
}

const concepts = loadConcepts();
enrichFromDrafts(concepts, pages);

const report = { totalPages: pages.length, totalResolved: 0, pending: [], byPage: [] };

for (const p of pages) {
  const raw = fs.readFileSync(path.join(DRAFTS, `${p.slug}.md`), 'utf8');
  const parsed = extractContent(raw);
  const { out, pending, resolved } = linkContent(parsed.content, concepts);
  fs.writeFileSync(path.join(OUT, `${p.slug}.md`), `${parsed.fullFront}\n\n${out}\n`);
  report.totalResolved += resolved;
  report.byPage.push({ slug: p.slug, resolved, pending: pending.length });
  for (const item of pending) report.pending.push({ slug: p.slug, ...item });
}

// Deduplicate pending summary
const pendingCounts = {};
for (const p of report.pending) {
  const k = `${p.token}|${p.reason}`;
  pendingCounts[k] = (pendingCounts[k] || 0) + 1;
}

fs.writeFileSync(MANIFEST, JSON.stringify(pages, null, 2));
fs.writeFileSync(
  path.join(OUT, '_link-report.json'),
  JSON.stringify(
    {
      totalPages: report.totalPages,
      totalResolved: report.totalResolved,
      pendingTotal: report.pending.length,
      pendingUnique: pendingCounts,
    },
    null,
    2,
  ),
);

console.log(
  JSON.stringify(
    {
      totalPages: report.totalPages,
      totalResolved: report.totalResolved,
      pendingTotal: report.pending.length,
      pendingUniqueTop: Object.entries(pendingCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 25),
    },
    null,
    2,
  ),
);
