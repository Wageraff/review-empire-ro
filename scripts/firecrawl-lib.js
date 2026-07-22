'use strict';

const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const { Firecrawl } = require('@mendable/firecrawl-js');

const VAULT_ROOT = path.resolve(__dirname, '..');
const WEB_CLIPS_ROOT = path.join(VAULT_ROOT, '01.RAW', 'web-clips');
const LOGS_ROOT = path.join(VAULT_ROOT, 'logs');
const MIN_MARKDOWN_LENGTH = 300;

/** Per-domain tuning discovered from batch error analysis (2026-07-13). */
const DOMAIN_PROFILES = {
  'pariurix.com': { waitForMs: 4000 },
  '10pariuri.ro': { waitForMs: 4000 },
  'legalbet.ro': { waitForMs: 4000 },
  'biletu-zilei.com': { waitForMs: 3500 },
};

const DEFAULT_EXCLUDE_TAGS = [
  'nav', 'footer', 'header', 'aside',
  '.ads', '.sidebar', '.comments', '.related-posts',
  '.cookie-banner', '.popup', '.newsletter',
];

const TYPE_MAP = {
  reviews: { folder: 'reviews', source_type: 'reviews' },
  bonuses: { folder: 'bonuses', source_type: 'bonuses' },
  guides: { folder: 'guides', source_type: 'guides' },
  ratings: { folder: 'ratings', source_type: 'ratings' },
  'sport-categories': { folder: 'sport-categories', source_type: 'sport' },
  apps: { folder: 'apps', source_type: 'apps' },
  payments: { folder: 'payments', source_type: 'payments' },
  retail: { folder: 'retail', source_type: 'retail' },
  'player-reviews': { folder: 'player-reviews', source_type: 'player-reviews' },
};

const RO_DIACRITICS = {
  ă: 'a', â: 'a', î: 'i', ș: 's', ş: 's', ț: 't', ţ: 't',
  Ă: 'a', Â: 'a', Î: 'i', Ș: 's', Ş: 's', Ț: 't', Ţ: 't',
};

function loadEnv() {
  require('dotenv').config({ path: path.join(VAULT_ROOT, '.env') });

  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) {
    throw new Error('FIRECRAWL_API_KEY не найден в .env (корень vault)');
  }

  return {
    apiKey,
    waitForMs: Number(process.env.FIRECRAWL_WAIT_FOR_MS || 3000),
    concurrency: Number(process.env.FIRECRAWL_CONCURRENCY || 5),
    retryAttempts: Number(process.env.FIRECRAWL_RETRY_ATTEMPTS || 3),
    rateLimitMs: Number(process.env.FIRECRAWL_RATE_LIMIT_MS || 200),
  };
}

function resolveType(typeArg) {
  const cfg = TYPE_MAP[typeArg];
  if (!cfg) {
    const allowed = Object.keys(TYPE_MAP).join(', ');
    throw new Error(`Неизвестный type "${typeArg}". Допустимо: ${allowed}`);
  }
  return cfg;
}

function validateHttpsUrl(url) {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(`Некорректный URL: ${url}`);
  }
  if (parsed.protocol !== 'https:') {
    throw new Error(`URL должен быть HTTPS: ${url}`);
  }
  return parsed;
}

function transliterateRo(text) {
  return text
    .split('')
    .map((ch) => RO_DIACRITICS[ch] || ch)
    .join('');
}

function slugifySegment(segment) {
  return transliterateRo(segment)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function slugFromUrl(url) {
  const parsed = validateHttpsUrl(url);
  const parts = parsed.pathname.split('/').filter(Boolean);
  const raw = parts.length ? parts[parts.length - 1] : parsed.hostname.replace(/^www\./, '');
  return slugifySegment(raw || 'index') || 'page';
}

function domainFromUrl(url) {
  const parsed = validateHttpsUrl(url);
  return parsed.hostname.replace(/^www\./, '');
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function targetPaths(typeArg, url) {
  const { folder } = resolveType(typeArg);
  const domain = domainFromUrl(url);
  const slug = slugFromUrl(url);
  const date = todayIso();
  const baseDir = path.join(WEB_CLIPS_ROOT, folder);
  const imgsDir = path.join(baseDir, 'imgs');
  const markdownPath = path.join(baseDir, `${date}-${domain}-${slug}.md`);
  const screenshotPath = path.join(imgsDir, `${slug}-screenshot.png`);
  return { baseDir, imgsDir, markdownPath, screenshotPath, slug, domain, date };
}

function getDomainProfile(url) {
  return DOMAIN_PROFILES[domainFromUrl(url)] || {};
}

/**
 * Primary scrape profile.
 * NOTE: do NOT use includeTags — pariurix.com and others return 0 chars when
 * content is outside article/main/.content wrappers.
 */
function buildScrapeOptions(url, env, { fallback = false } = {}) {
  const profile = getDomainProfile(url);
  const baseWait = profile.waitForMs || env.waitForMs;

  if (fallback) {
    return {
      formats: ['markdown', { type: 'screenshot', fullPage: true }],
      onlyMainContent: false,
      excludeTags: ['nav', 'footer', 'header'],
      waitFor: baseWait + 3000,
    };
  }

  return {
    formats: ['markdown', { type: 'screenshot', fullPage: true }],
    onlyMainContent: true,
    excludeTags: DEFAULT_EXCLUDE_TAGS,
    waitFor: baseWait,
  };
}

function buildScrapeStrategies(url, env) {
  return [
    { name: 'primary', opts: buildScrapeOptions(url, env) },
    { name: 'fallback-full', opts: buildScrapeOptions(url, env, { fallback: true }) },
  ];
}

function createClient(apiKey) {
  return new Firecrawl({ apiKey });
}

function getStatusCode(err, doc) {
  if (err?.status) return err.status;
  if (doc?.metadata?.statusCode) return doc.metadata.statusCode;
  return null;
}

function formatHttpError(status, message) {
  if (!status) return message || 'Неизвестная ошибка Firecrawl';
  if (status >= 400 && status < 500) {
    return `Ошибка клиента HTTP ${status}: ${message || 'запрос отклонён'}`;
  }
  if (status >= 500) {
    return `Ошибка сервера HTTP ${status}: ${message || 'временная ошибка Firecrawl'}`;
  }
  return message || `HTTP ${status}`;
}

function isRetryableError(err) {
  const status = err?.status;
  if (status && status >= 400 && status < 500) return false;
  if (status && status >= 500) return true;
  if (err?.code === 'ECONNABORTED') return true;
  if (/timeout/i.test(err?.message || '')) return true;
  if (err?.isAxiosError && !err.response) return true;
  return false;
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function saveScreenshot(screenshot, destPath) {
  if (!screenshot) return false;

  if (screenshot.startsWith('data:image')) {
    const base64 = screenshot.split(',')[1];
    if (!base64) return false;
    fs.writeFileSync(destPath, Buffer.from(base64, 'base64'));
    return true;
  }

  if (/^https?:\/\//i.test(screenshot)) {
    const res = await fetch(screenshot);
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buf);
    return true;
  }

  return false;
}

function buildFrontmatter({ url, typeArg, metadata, creditsUsed, scrapeStrategy }) {
  const { source_type } = resolveType(typeArg);
  const domain = domainFromUrl(url);
  const fm = {
    title: metadata?.title || metadata?.ogTitle || 'Untitled',
    source: url,
    domain,
    published: metadata?.publishedTime || metadata?.modifiedTime || null,
    clipped: todayIso(),
    language: 'ro-RO',
    type: `web-clip-${typeArg}`,
    source_type,
    firecrawl_credits_used: creditsUsed ?? 1,
  };
  if (scrapeStrategy) fm.scrape_strategy = scrapeStrategy;
  if (!fm.published) delete fm.published;
  return YAML.stringify(fm).trim();
}

function findExistingClip(baseDir, url) {
  if (!fs.existsSync(baseDir)) return null;
  for (const file of fs.readdirSync(baseDir)) {
    if (!file.endsWith('.md')) continue;
    const full = path.join(baseDir, file);
    const head = fs.readFileSync(full, 'utf8').slice(0, 2000);
    const match = head.match(/^source:\s*(.+)$/m);
    if (match && match[1].trim() === url) return full;
  }
  return null;
}

async function scrapeWithRetry(firecrawl, url, env, logFn) {
  const strategies = buildScrapeStrategies(url, env);
  let lastError;

  for (const strategy of strategies) {
    for (let attempt = 1; attempt <= env.retryAttempts; attempt++) {
      try {
        const doc = await firecrawl.scrapeUrl(url, strategy.opts);
        const status = doc?.metadata?.statusCode;
        if (status && status >= 400) {
          const err = new Error(formatHttpError(status, doc?.metadata?.error));
          err.status = status;
          throw err;
        }

        const markdown = (doc.markdown || '').trim();
        if (markdown.length < MIN_MARKDOWN_LENGTH) {
          lastError = new Error(
            `Markdown слишком короткий (${markdown.length} символов, минимум ${MIN_MARKDOWN_LENGTH}) [${strategy.name}]`
          );
          lastError.status = 422;
          if (logFn) {
            logFn(`short markdown (${markdown.length}) on ${strategy.name} for ${url}`);
          }
          break;
        }

        doc._scrapeStrategy = strategy.name;
        return doc;
      } catch (err) {
        lastError = err;
        const retryable = isRetryableError(err);
        if (!retryable || attempt === env.retryAttempts) break;
        const wait = env.rateLimitMs * attempt;
        if (logFn) {
          logFn(`retry ${attempt}/${env.retryAttempts} [${strategy.name}] for ${url} in ${wait}ms: ${err.message}`);
        }
        await sleep(wait);
      }
    }
  }

  throw lastError;
}

async function processUrl(firecrawl, url, typeArg, env, { skipExisting = false } = {}) {
  validateHttpsUrl(url);
  const paths = targetPaths(typeArg, url);

  if (skipExisting) {
    const existing = findExistingClip(paths.baseDir, url);
    if (existing) {
      return { status: 'skipped', url, outputPath: existing, creditsUsed: 0, durationMs: 0 };
    }
  }

  const started = Date.now();
  const doc = await scrapeWithRetry(firecrawl, url, env);
  const markdown = (doc.markdown || '').trim();

  if (markdown.length < MIN_MARKDOWN_LENGTH) {
    const err = new Error(`Markdown слишком короткий (${markdown.length} символов, минимум ${MIN_MARKDOWN_LENGTH})`);
    err.status = 422;
    throw err;
  }

  fs.mkdirSync(paths.imgsDir, { recursive: true });
  fs.mkdirSync(paths.baseDir, { recursive: true });

  const creditsUsed = doc.metadata?.creditsUsed ?? 1;
  const frontmatter = buildFrontmatter({
    url,
    typeArg,
    metadata: doc.metadata,
    creditsUsed,
    scrapeStrategy: doc._scrapeStrategy,
  });

  const body = `---\n${frontmatter}\n---\n\n${markdown}\n`;
  fs.writeFileSync(paths.markdownPath, body, 'utf8');

  let screenshotSaved = false;
  if (doc.screenshot) {
    screenshotSaved = await saveScreenshot(doc.screenshot, paths.screenshotPath);
  }

  return {
    status: 'ok',
    url,
    outputPath: paths.markdownPath,
    screenshotPath: screenshotSaved ? paths.screenshotPath : null,
    markdownBytes: Buffer.byteLength(body, 'utf8'),
    creditsUsed,
    durationMs: Date.now() - started,
  };
}

function ensureLogFile() {
  fs.mkdirSync(LOGS_ROOT, { recursive: true });
  const logPath = path.join(LOGS_ROOT, `firecrawl-${todayIso()}.log`);
  return logPath;
}

function appendLog(logPath, line) {
  fs.appendFileSync(logPath, `${line}\n`, 'utf8');
}

function readUrlList(filePath) {
  const abs = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
  if (!fs.existsSync(abs)) {
    throw new Error(`Файл URL не найден: ${abs}`);
  }
  return fs
    .readFileSync(abs, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'));
}

module.exports = {
  VAULT_ROOT,
  WEB_CLIPS_ROOT,
  LOGS_ROOT,
  MIN_MARKDOWN_LENGTH,
  TYPE_MAP,
  loadEnv,
  resolveType,
  validateHttpsUrl,
  slugFromUrl,
  domainFromUrl,
  targetPaths,
  buildScrapeOptions,
  buildScrapeStrategies,
  getDomainProfile,
  createClient,
  formatHttpError,
  isRetryableError,
  sleep,
  processUrl,
  ensureLogFile,
  appendLog,
  readUrlList,
  findExistingClip,
};
