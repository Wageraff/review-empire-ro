# Design Spec — site-01-ro

> Канон для `generate-site site-01-ro`. Источник: `02.WIKI/design-inventory/patterns-summary.md` + 8 inventory (5 visual + 3 dossier-based).
> Обновлено: 2026-07-22

## 1. Identity

| Поле | Значение |
|------|----------|
| **Site slug** | `site-01-ro` |
| **Working brand** | Betoteca (placeholder — юр. имя финализировать pre-deploy) |
| **Lang** | `ro-RO` |
| **Audience** | m/25–45, pariuri sportive active |
| **Tone UI** | expert, calm, sport-first — fără urgență falsă |
| **Image variant** | `1` (ramă amber 8px, max-width 1200px, quality 85) |
| **Stack** | Astro 4+, TypeScript strict, Tailwind, `output: 'static'`, `@astrojs/sitemap` |

## 2. Anti-clone (ce evităm)

| Nu copia | De la cine | De ce |
|----------|------------|-------|
| Verde Superbet / roșu Betano | branduri operatori | fingerprint operator |
| Sidebar media + scroll infinit | legalbet | aglomerat, nu review-first |
| Banner roșu full-bleed | beturi | clone sport-tabloid |
| One-page affiliate + emoji CTA | pontul-zilei | shallow, spammy |
| Template identic „Păreri X 2026” | xbets | programmatic fingerprint |
| Dark purple / glow / Inter default | AI-default | anti-detect + brand rules |

## 3. Culori

```css
:root {
  --color-primary: #1a2b4a;      /* albastru închis — trust, header, H2 accents */
  --color-accent: #d97706;       /* amber — CTA, badge, image frame variant=1 */
  --color-bg: #f8fafc;           /* slate-50 — page background */
  --color-surface: #ffffff;      /* card / prose surface */
  --color-text: #1e293b;         /* slate-800 */
  --color-muted: #64748b;        /* slate-500 — meta, captions */
  --color-border: #e2e8f0;       /* slate-200 */
  --color-success: #15803d;      /* pros ✓ */
  --color-danger: #b91c1c;       /* cons ✗, 18+ */
  --color-trust: #0f766e;        /* ONJN / TrustBar subtle */
}
```

## 4. Tipografie (ro-RO diacritice)

| Rol | Font | Fallback | Note |
|-----|------|----------|------|
| **Heading** | `Source Serif 4` | Georgia, serif | H1–H2; keyword în primele 3 cuvinte H1 |
| **Body** | `Source Sans 3` | system-ui, sans-serif | prose 18px / 1.7 / max 70ch |
| **UI / tables** | `Source Sans 3` | system-ui | 14–16px, semibold headers |

Dimensiuni:
- H1: `2rem` / bold / tracking tight
- H2: `1.5rem` / semibold / margin-top generos
- H3: `1.125rem` / semibold
- Caption / meta: `0.875rem` / `--color-muted`

Load: `@fontsource/source-serif-4` + `@fontsource/source-sans-3` (self-host, fără Google Fonts CDN la build 1).

## 5. Layout system (toate tipurile)

```
Header (logo + nav + badge 18+)
  ↓
PageHero (tip-specific — vezi §6)
  ↓
TrustBar (ONJN + 18+ + joc responsabil + data updated)
  ↓
Main content (prose max-width 720px SAU wide pentru tabele)
  ↓
Related / comparison (unde e cazul)
  ↓
FAQAccordion
  ↓
Footer (metodologie + legal + joc responsabil)
```

**Grid:** mobile-first. Content column `max-w-3xl` (prose) / `max-w-6xl` (tabele rating). Padding `px-4 sm:px-6`.

**Header nav (ro):** Acasă · Recenzii · Bonusuri · Ghiduri · Sport · Aplicații · Metode de plată  
Ponturi — placeholder link (Faza 3), vizibil dar `coming soon` / disabled stil.

**Footer obligatoriu:** link metodologie, despre noi, contact, T&C, privacy, joc responsabil, ONJN, disclaimer affiliate, © entity placeholder.

## 6. Page layouts pe tip

### 6.1 HOMEPAGE `/`
1. Hero: brand + 1 headline + 1 supporting + CTA secundar („Vezi top case”)
2. RatingTable — top operatori (5–10 rânduri)
3. Blocuri scurte: Bonusuri / Sport / Ghiduri (link hubs)
4. TrustBar + methodology teaser
5. FAQ scurt (3–5)

### 6.2 REVIEW `/recenzii/<brand>`
1. `BrandCard` hero (logo, rating, licență, depunere min, app)
2. TrustBar
3. Prose H2: bonus, sport, app, plăți, suport
4. `ProsCons`
5. `BonusBadge` / related bonusuri
6. `RatingTable` mini (criterii brand)
7. FAQAccordion
8. Schema: `Review` + `Organization`

### 6.3 BONUS-PAGE `/bonusuri/<cat>/<brand>`
1. `offer-hero` (valoare / tip ofertă — fără urgență falsă)
2. TrustBar
3. activation-steps / cum găsești
4. `terms-table`
5. `ProsCons`
6. `comparison-mini` (2–3 operatori)
7. FAQAccordion
8. Schema: `Offer` + `Product`

### 6.4 HUB / RATING / FEATURE-RATING
1. Category intro
2. `RatingTable` / brand-comparison-table
3. how-to-choose
4. Top-N prose cards (nu card clutter în hero)
5. FAQ + methodology-note

### 6.5 GUIDE / GUIDE-BRAND / SPORT / PAYMENT / APP / E-A-T / LEGAL
- Hero tip-specific (H1 + lede)
- TrustBar (legal/E-A-T: variantă redusă OK)
- Prose + tabele unde e cazul
- FAQ dacă există în draft
- Guides: **fără** CTA agresiv pe brand; linkuri conceptuale

## 7. Componente Astro (țintă)

| Component | Fișier | Props cheie | Block ID |
|-----------|--------|-------------|----------|
| `BrandCard` | `BrandCard.astro` | brand, rating, license, minDeposit, ctaHref | `hero-quick-facts` |
| `TrustBar` | `TrustBar.astro` | license, updated, show18 | `trust-bar` |
| `BonusBadge` | `BonusBadge.astro` | title, amount, termsShort, href | `bonus-callout` / `offer-hero` |
| `RatingTable` | `RatingTable.astro` | columns[], rows[], sortable? | `rating-table` |
| `ProsCons` | `ProsCons.astro` | pros[], cons[] | `pros-cons` |
| `FAQAccordion` | `FAQAccordion.astro` | items[{q,a}] — native `<details>` | `faq-accordion` |
| `StarRating` | `StarRating.astro` | value, max=5 | — |
| `CallToAction` | `CallToAction.astro` | variant: primary\|secondary, href, label | `cta-primary` / `cta-secondary` |
| `PaymentsGrid` | `PaymentsGrid.astro` | methods[] | `payments-grid` |
| `StepsList` | `StepsList.astro` | steps[] | `activation-steps` |
| `TermsTable` | `TermsTable.astro` | rows[] | `terms-table` |

**Naming:** `BrandCard`, **nu** `BookmakerCard`.

**CTA rules:** buton accent discret + link text secundar. Fără emoji în butoane. Fără „ultimele 24h”.

## 8. Spacing & motion

- Section gap: `py-10` / `py-14`
- Card radius: `0.5rem` (doar unde e container interactiv — tabele, FAQ)
- Shadow: una subtilă pe BrandCard (`shadow-sm`), nu multi-layer glow
- Motion (2–3 intenționate): header sticky fade, FAQ open, tabel row hover — fără parallax

## 9. Trust signals (obligatorii pe pagini comerciale)

1. Licență ONJN Clasa I (nr. / Decizia când e cunoscut)
2. Badge **18+**
3. Link **joc responsabil**
4. Data `updated` vizibilă sub hero
5. Link metodologie în footer
6. Disclaimer affiliate scurt (footer + near CTA primary)

## 10. SEO / technical (Builder)

- `hreflang="ro-RO"`
- Meta title / description din frontmatter / seo_plan
- Canonical pe fiecare pagină
- `@astrojs/sitemap`
- Schema.org per tip (vezi `page-types.md`)
- Imagini: `<Image />` lazy; WebP; alt unic per site
- Linker: rezolvă `[[concept:X]]` înainte de emit HTML

## 11. Image pipeline (site-01)

| Step | Path |
|------|------|
| Source (immutable) | `01.RAW/web-clips/<tip>/imgs/` |
| Working copy | `01.RAW/assets/<brand>/` |
| Process | `scripts/process-clip-image.sh` **variant=1** |
| Public | `07.SITES/site-01-ro/public/images/<brand>/<seo-name>.webp` |

Dacă scriptul lipsește la generate-site: creează stub + documentează în `08.PBN/` / scripts — nu bloca scaffold-ul; imaginile pot lipsi la primul build (placeholder).

## 12. Layouts Astro de creat

1. `BaseLayout.astro` — head, header, footer, schema base
2. `ReviewLayout.astro`
3. `BonusLayout.astro`
4. `GuideLayout.astro`
5. `CategoryLayout.astro` (hubs + ratings)
6. `AppLayout.astro` / `PaymentLayout.astro` — pot extinde Base + slot până la specializare

## 13. Checklist pre-generate-site

- [x] Inventory 5 visual + 3 dossier-based
- [x] `patterns-summary.md`
- [x] Acest fișier `06.DESIGN/site-01-ro-spec.md`
- [x] `05.REGISTRIES/ui-patterns.md` sync
- [x] `08.PBN/` baseline pentru site-01
- [ ] `npm create astro` + Tailwind + sitemap *(pasul generate-site)*
- [ ] Componente + layouts *(generate-site)*
- [ ] Linker pe 204 ready drafts *(build astro)*

## Surse

- `02.WIKI/design-inventory/patterns-summary.md`
- `02.WIKI/design-inventory/*-design.md`
- `05.REGISTRIES/section-blocks.md`
- `05.REGISTRIES/page-types.md`
- `05.REGISTRIES/workflows.md` (IMAGE STRATEGY, generate-site)
- `.cursor/rules/{designer,builder,linker}.mdc`
