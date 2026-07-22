import fs from 'node:fs';
import path from 'node:path';

export interface DraftFrontmatter {
  title: string;
  type: string;
  url: string;
  status: string;
  target_keyword?: string;
  updated?: string;
  created?: string;
  volume?: number;
  kd?: number;
  [key: string]: unknown;
}

export interface ParsedDraft {
  frontmatter: DraftFrontmatter;
  seoPlan: string;
  content: string;
  raw: string;
  filePath: string;
}

const DRAFTS_DIR = path.resolve(process.cwd(), 'src/content/drafts');

function parseSimpleYaml(block: string): DraftFrontmatter {
  const data: Record<string, unknown> = {};
  for (const line of block.split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    if (line.startsWith(' ') || line.startsWith('\t') || line.startsWith('-')) continue;
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    if (/^\d+$/.test(val)) data[m[1]] = Number(val);
    else data[m[1]] = val;
  }
  return data as DraftFrontmatter;
}

export function readDraft(slug: string): ParsedDraft {
  const filePath = path.join(DRAFTS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, 'utf8');
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!fmMatch) throw new Error(`Invalid frontmatter: ${slug}`);
  const frontmatter = parseSimpleYaml(fmMatch[1]);
  const body = fmMatch[2];
  const contentSplit = body.split(/\n---\n+# CONTENT[^\n]*\n/);
  let seoPlan = body;
  let content = body;
  if (contentSplit.length >= 2) {
    seoPlan = contentSplit[0];
    content = contentSplit.slice(1).join('\n');
  } else {
    const alt = body.match(/# CONTENT[^\n]*\n([\s\S]*)/);
    if (alt) {
      seoPlan = body.slice(0, alt.index);
      content = alt[1];
    }
  }
  // Strip trailing self-check / linguist notes from rendered content
  content = content
    .replace(/\n## Copy self-check[\s\S]*$/i, '')
    .replace(/\n## Linguist Notes[\s\S]*$/i, '')
    .trim();
  return { frontmatter, seoPlan, content, raw, filePath };
}

export function extractMetaFromSeoPlan(seoPlan: string): {
  h1?: string;
  metaTitle?: string;
  metaDescription?: string;
} {
  const get = (label: string) => {
    const re = new RegExp(`\\*\\*${label}\\*\\*\\s*\\|\\s*([^|\\n]+)`, 'i');
    const m = seoPlan.match(re);
    return m?.[1]?.replace(/\s*\(\d+\)\s*$/, '').trim();
  };
  return {
    h1: get('H1'),
    metaTitle: get('Meta title'),
    metaDescription: get('Meta description'),
  };
}
