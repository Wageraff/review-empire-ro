import fs from 'node:fs';
import path from 'node:path';
import { displayBrand } from './pages';

export interface FigureImg {
  src: string;
  alt: string;
  role: string;
}

function exists(rel: string): boolean {
  return fs.existsSync(path.resolve(process.cwd(), `public/images/${rel}`));
}

function pushIf(out: FigureImg[], rel: string, alt: string, role: string) {
  if (exists(rel)) out.push({ src: `/images/${rel}`, alt, role });
}

/** All available processed images for a brand page. */
export function brandGallery(slug: string, pageType: string): FigureImg[] {
  const name = displayBrand(slug);
  const out: FigureImg[] = [];
  const order =
    pageType === 'APP-REVIEW'
      ? (['app', 'main', 'live', 'bonus', 'payment'] as const)
      : pageType === 'BONUS-PAGE' || pageType === 'BONUS-BRAND-HUB'
        ? (['bonus', 'main', 'app', 'live', 'payment'] as const)
        : pageType === 'GUIDE-BRAND-PAGE'
          ? (['main', 'bonus', 'app', 'payment'] as const)
          : (['main', 'bonus', 'live', 'app', 'payment'] as const);

  const map: Record<(typeof order)[number], { file: string; alt: string }> = {
    main: { file: `${slug}/${slug}-screenshot-main.webp`, alt: `Platformă ${name} — captură ecran` },
    bonus: { file: `${slug}/${slug}-screenshot-bonus.webp`, alt: `Bonus și promoții ${name}` },
    live: { file: `${slug}/${slug}-screenshot-live.webp`, alt: `Pariuri live ${name}` },
    app: { file: `${slug}/${slug}-screenshot-app.webp`, alt: `Aplicație mobilă ${name}` },
    payment: { file: `${slug}/${slug}-screenshot-payment.webp`, alt: `Metode de plată ${name}` },
  };

  for (const role of order) {
    const m = map[role];
    pushIf(out, m.file, m.alt, role);
  }
  return out;
}

/** Hub / topic hero for pages without a brand slug. */
export function hubGallery(pageType: string, pageUrl: string, slugHint?: string): FigureImg[] {
  const out: FigureImg[] = [];
  const u = pageUrl.replace(/\/$/, '');

  if (pageType === 'PAYMENT-METHOD') {
    const key = u.split('/').pop();
    if (key) pushIf(out, `payments/${key}-screenshot-main.webp`, `Metodă de plată ${key}`, 'main');
    return out;
  }
  if (pageType === 'SPORT-CATEGORY') {
    const key = u.split('/').pop();
    if (key) pushIf(out, `sport/${key}-screenshot-main.webp`, `Pariuri ${key}`, 'main');
    return out;
  }

  const hubMap: [RegExp, string, string][] = [
    [/\/top-case-de-pariuri-cash-out/, 'hubs/rating-cash-out.webp', 'Cash out la case de pariuri'],
    [/\/top-case-de-pariuri-cote-marite/, 'hubs/rating-cote-marite.webp', 'Cote mărite'],
    [/\/top-case-de-pariuri-bonus-pariuri-multiple/, 'hubs/rating-bonus-multiple.webp', 'Bonus pariuri multiple'],
    [/\/top-case-de-pariuri-live/, 'hubs/rating-live.webp', 'Pariuri live'],
    [/\/top-case-de-pariuri-noi/, 'hubs/rating-noi.webp', 'Case de pariuri noi'],
    [/\/top-case-de-pariuri/, 'hubs/rating-case-de-pariuri.webp', 'Top case de pariuri'],
    [/\/top-bonusuri/, 'hubs/rating-bonusuri.webp', 'Top bonusuri'],
    [/\/top-aplicatii/, 'hubs/rating-aplicatii.webp', 'Top aplicații'],
    [/\/top-plati-rapide/, 'hubs/rating-plati-rapide.webp', 'Plăți rapide'],
    [/\/bonusuri\/cashback/, 'hubs/hub-cashback.webp', 'Cashback'],
    [/\/bonusuri\/cote-marite/, 'hubs/hub-cote-marite.webp', 'Cote mărite'],
    [/\/bonusuri\/pariu-gratuit/, 'hubs/hub-pariu-gratuit.webp', 'Pariu gratuit'],
    [/\/bonusuri\/pariu-sansa/, 'hubs/hub-pariu-sansa.webp', 'Pariu șansă'],
    [/\/bonusuri\/bonus-de-bun-venit/, 'hubs/hub-bonusuri.webp', 'Bonus de bun venit'],
    [/\/bonusuri\/bonus-fara-depunere/, 'hubs/hub-pariu-gratuit.webp', 'Bonus fără depunere'],
    [/\/bonusuri\/?$/, 'hubs/hub-bonusuri.webp', 'Bonusuri pariuri'],
    [/\/aplicatii\/?$/, 'hubs/hub-aplicatii.webp', 'Aplicații pariuri'],
    [/\/ghiduri\/?$/, 'hubs/eat-generic.webp', 'Ghiduri pariuri'],
    [/\/metode-de-plata\/?$/, 'hubs/rating-plati-rapide.webp', 'Metode de plată'],
    [/\/pareri-jucatori/, 'hubs/hub-pareri.webp', 'Păreri jucători'],
    [/\/legal\/onjn/, 'hubs/legal-onjn.webp', 'Licențe ONJN'],
    [/\/legal\/impozit/, 'hubs/legal-impozit.webp', 'Impozit pariuri'],
    [/\/legal\/case-de-pariuri-licentiate/, 'hubs/legal-onjn.webp', 'Case licențiate'],
    [/ce-este-o-cota|\/ce-este-o-cota/, 'hubs/guide-cota.webp', 'Ce este o cotă'],
    [/rulaj-bonus/, 'hubs/guide-rulaj.webp', 'Rulaj bonus'],
    [/pariurile-live|ce-sunt-pariurile-live/, 'hubs/guide-live.webp', 'Pariuri live'],
    [/bankroll/, 'hubs/guide-bankroll.webp', 'Bankroll management'],
    [/martingale/, 'hubs/guide-martingale.webp', 'Strategia Martingale'],
    [/kelly/, 'hubs/guide-kelly.webp', 'Criteriul Kelly'],
    [/value-betting/, 'hubs/guide-value.webp', 'Value betting'],
    [/pariuri-1x2/, 'hubs/guide-1x2.webp', 'Pariuri 1X2'],
    [/btts/, 'hubs/guide-btts.webp', 'BTTS'],
    [/dnb/, 'hubs/guide-dnb.webp', 'DNB'],
    [/handicapul-asiatic|handicap-asiatic/, 'hubs/guide-handicap.webp', 'Handicap asiatic'],
    [/handicapul-la-pariuri|handicap/, 'hubs/guide-handicap.webp', 'Handicap'],
    [/over-under|sub-peste/, 'hubs/guide-over-under.webp', 'Over/Under'],
    [/cash-out/, 'hubs/guide-cash-out.webp', 'Cash out'],
    [/pariu-sansa|pariul-sansa/, 'hubs/guide-pariu-sansa.webp', 'Pariu șansă'],
  ];

  for (const [re, file, alt] of hubMap) {
    if (re.test(u)) {
      pushIf(out, file, alt, 'hub');
      break;
    }
  }

  if (!out.length && (pageType.startsWith('E-A-T') || pageType === 'E-A-T' || pageType.includes('EAT'))) {
    pushIf(out, 'hubs/eat-generic.webp', 'Ghid responsabilitate și informații', 'hub');
  }
  if (!out.length && (pageType === 'GUIDE-PAGE' || pageType === 'REGULATORY-PAGE')) {
    pushIf(out, 'hubs/eat-generic.webp', 'Ghid pariuri sportive', 'hub');
  }
  if (!out.length && slugHint) {
    // fallback unused
  }
  return out;
}

const ROLE_HINTS: Record<string, RegExp> = {
  bonus: /bonus|promo|ofert|freebet|cashback|rotiri/i,
  live: /live|streaming|transmisi/i,
  app: /aplicaț|aplicat|mobil|ios|android/i,
  payment: /plată|plăți|depun|retrager|paysafe|skrill|card/i,
  main: /prezent|ofertă de pariuri|sportiv|platform|licenț|rezumat|general/i,
};

function figureHtml(img: FigureImg): string {
  return (
    `<figure class="bt-figure my-8 max-w-3xl">` +
    `<img src="${img.src}" alt="${escapeAttr(img.alt)}" class="w-full rounded-lg border border-border" loading="lazy" width="1200" height="675" />` +
    `<figcaption class="mt-2 text-sm text-muted">${escapeAttr(img.alt)}</figcaption>` +
    `</figure>`
  );
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

/**
 * Inject gallery figures into article HTML:
 * - first image after the lead paragraph block (before first H2)
 * - remaining images after matching H2 sections (or every 2nd H2)
 */
export function injectGallery(html: string, gallery: FigureImg[]): string {
  if (!gallery.length) return html;
  const remaining = [...gallery];
  const used = new Set<string>();

  const take = (preferRole?: string): FigureImg | null => {
    if (!remaining.length) return null;
    if (preferRole) {
      const i = remaining.findIndex((g) => g.role === preferRole && !used.has(g.src));
      if (i >= 0) {
        const [img] = remaining.splice(i, 1);
        used.add(img.src);
        return img;
      }
    }
    const img = remaining.shift()!;
    used.add(img.src);
    return img;
  };

  // Split keeping H2 delimiters
  const parts = html.split(/(?=<h2[\s>])/i);
  if (parts.length === 0) return html + figureHtml(take()!);

  const out: string[] = [];
  for (let i = 0; i < parts.length; i++) {
    let chunk = parts[i];
    if (i === 0) {
      // Lead: insert first image after first paragraph if present
      const img = take(gallery[0]?.role);
      if (img) {
        if (/<\/p>/i.test(chunk)) {
          chunk = chunk.replace(/<\/p>/i, `</p>\n${figureHtml(img)}`);
        } else {
          chunk = figureHtml(img) + chunk;
        }
      }
      out.push(chunk);
      continue;
    }

    const h2Match = chunk.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
    const h2Text = h2Match ? h2Match[1].replace(/<[^>]+>/g, '') : '';
    let role: string | undefined;
    for (const [r, re] of Object.entries(ROLE_HINTS)) {
      if (re.test(h2Text)) {
        role = r;
        break;
      }
    }

    // Inject after H2 when role matches or every second section
    const shouldInject = Boolean(role) || i % 2 === 0;
    if (shouldInject && remaining.length) {
      const img = take(role);
      if (img && h2Match) {
        chunk = chunk.replace(/<\/h2>/i, `</h2>\n${figureHtml(img)}`);
      }
    }
    out.push(chunk);
  }

  // Append leftovers at end (before FAQ if present)
  if (remaining.length) {
    const extras = remaining.splice(0).map(figureHtml).join('\n');
    const joined = out.join('');
    if (/<h2[^>]*>\s*Întrebări frecvente/i.test(joined)) {
      return joined.replace(
        /(<h2[^>]*>\s*Întrebări frecvente)/i,
        `${extras}\n$1`,
      );
    }
    return joined + extras;
  }

  return out.join('');
}

export function resolvePageGallery(
  brandSlug: string | null,
  pageType: string,
  pageUrl: string,
): FigureImg[] {
  if (brandSlug) {
    const g = brandGallery(brandSlug, pageType);
    if (g.length) return g;
  }
  return hubGallery(pageType, pageUrl, brandSlug || undefined);
}
