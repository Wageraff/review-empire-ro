---
title: Design patterns — Builder guide
type: design-inventory
lang: ru-RU
created: 2026-07-14
updated: 2026-07-22
sources:
  - 02.WIKI/design-inventory/*-design.md
related:
  - [[style-analysis/patterns-summary]]
  - 05.REGISTRIES/ui-patterns.md
  - 06.DESIGN/site-01-ro-spec.md
tags: [design-inventory, ui, builder]
---

# Design patterns — consolidated system (Builder)

> Sinteză 8 competitori (5 visual + 3 dossier-based). **Obiectiv:** recognoscibil RO betting, DIFERIT de Superbet/Betano clone.
> Spec canonică Builder: `06.DESIGN/site-01-ro-spec.md`.

## Layout system (site-01-ro)

```
Header (logo + nav + 18+)
  ↓
HeroReview (H1 + quick rating + CTA secondary)
  ↓
TrustBar (ONJN + licență + updated date)
  ↓
Content (H2 sections, max-width 720px prose)
  ↓
RatingTable (comparison) — unde e cazul
  ↓
FAQAccordion
  ↓
Footer (joc responsabil + metodologie)
```

## Componente (nu BookmakerCard)

| Component | Scop | Inspirat din | Adaptare noastră |
|-----------|------|--------------|------------------|
| `BrandCard` | Review hero | legalbet quick-facts | Fără sidebar aglomerat |
| `RatingTable` | Comparație | xbets/beturi tables | 5 coloane fixe, sortable |
| `BonusBadge` | Offer highlight | pontul-zilei CTA | Fără emoji, date reale |
| `TrustBar` | ONJN + 18+ | toți | Persistent sub hero |
| `FAQAccordion` | `<details>` | 10pariuri/xbets | 5-7 întrebări |
| `ProsCons` | Avantaje/Dezavantaje | toți | Icon ✓/✗, nu paragrafe |

## Culori (anti-detect)

- **Primar:** albastru închis `#1a2b4a` (NU verde Superbet, NU roșu Betano)
- **Accent CTA:** amber `#d97706` (nu portocaliu pontul-zilei)
- **Fundal:** `#f8fafc` + card alb
- **Text:** `#1e293b` / muted `#64748b`

## Tipografie

- H1: 2rem bold, keyword în primele 3 cuvinte
- H2: 1.5rem semibold, spacing generos
- Prose: 18px/1.7, max 70ch
- Tabele: header sticky, zebra rows

## Trust signals (obligatorii)

1. Licență ONJN Clasa I — număr sau Decizia
2. Badge 18+
3. Link joc responsabil
4. `updated` date vizibil
5. Metodologie link în footer

## Ce NU copiem

- legalbet: sidebar media + 7000w scroll infinit
- beturi: banner roșu full-bleed
- pontul-zilei: one-page affiliate fără depth
- xbets: template identic „Păreri X 2026” pe toate brandurile

## Fișiere sursă

- [[design-inventory/legalbet-design]]
- [[design-inventory/beturi-design]]
- [[design-inventory/10pariuri-design]]
- [[design-inventory/xbets-design]]
- [[design-inventory/pontul-zilei-design]]
- [[design-inventory/pariurix-design]] (dossier-based, 2026-07-22)
- [[design-inventory/biletu-zilei-design]] (dossier-based, 2026-07-22)
- [[design-inventory/pariuriexpert-design]] (dossier-based, low data, 2026-07-22)
