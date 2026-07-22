import fs from 'node:fs';
import path from 'node:path';
import type { DraftFrontmatter } from './drafts';
import { extractMetaFromSeoPlan, readDraft } from './drafts';

export interface ReadyPage {
  slug: string;
  type: string;
  title: string;
  url: string;
  updated?: string;
  target_keyword?: string;
}

export function loadReadyPages(): ReadyPage[] {
  const p = path.resolve(process.cwd(), 'src/data/ready-pages.json');
  return JSON.parse(fs.readFileSync(p, 'utf8')) as ReadyPage[];
}

export function urlToSlugParam(url: string): string {
  return url.replace(/^\//, '').replace(/\/$/, '');
}

export function getLinkedMarkdown(slug: string): string {
  const linkedPath = path.resolve(process.cwd(), `src/content/linked/${slug}.md`);
  if (fs.existsSync(linkedPath)) {
    const linked = fs.readFileSync(linkedPath, 'utf8');
    const m = linked.match(/^---[\s\S]*?---\n+([\s\S]*)$/);
    return (m ? m[1] : linked).trim();
  }
  return readDraft(slug).content;
}

export function loadPageBundle(slug: string) {
  const draft = readDraft(slug);
  const meta = extractMetaFromSeoPlan(draft.seoPlan);
  const bodyMd = getLinkedMarkdown(slug);
  return { draft, meta, bodyMd, fm: draft.frontmatter as DraftFrontmatter };
}

export function brandFromUrl(url: string, type: string): string | null {
  if (type === 'REVIEW') return url.replace(/^\/recenzii\//, '').replace(/\/$/, '') || null;
  if (type === 'APP-REVIEW') return url.replace(/^\/aplicatii\//, '').replace(/\/$/, '') || null;
  if (type === 'BONUS-PAGE' || type === 'BONUS-BRAND-HUB') {
    const parts = url.replace(/\/$/, '').split('/').filter(Boolean);
    return parts[parts.length - 1] || null;
  }
  if (type === 'GUIDE-BRAND-PAGE') {
    const m = url.match(/\/ghiduri\/brand\/([^/]+)/);
    return m?.[1] || null;
  }
  return null;
}

export function displayBrand(slug: string | null): string {
  if (!slug) return '';
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
    .replace(/\bDon Ro\b/i, 'Don.ro')
    .replace(/\bCasa Pariurilor\b/i, 'Casa Pariurilor')
    .replace(/\b888sport\b/i, '888sport')
    .replace(/\b12xbet\b/i, '12xBet');
}
