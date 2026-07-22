---
title: Beturi — design inventory
type: design-inventory
lang: ru-RU
created: 2026-07-14
updated: 2026-07-14
domain: beturi.ro
sources:
  - 01.RAW/web-clips/reviews/imgs/
  - 01.RAW/web-clips/guides/imgs/
  - 01.RAW/assets/
related:
  - [[design-inventory/patterns-summary]]
  - [[review-competitors/beturi]]
tags: [design-inventory, competitor, ui]
---

# Beturi (beturi.ro) — design inventory

> Анализ по структуре клипов + скриншоты Firecrawl (`*-screenshot.png`). 12 screenshots în reviews/imgs.

## Layout patterns

Hero promo → tabel comparativ early → secțiuni bonus/app → FAQ accordion

**Типичные блоки (по частоте в clips):**
- Hero / quick facts — да
- Comparison table — да
- CTA block — above fold + repeat
- Sidebar — legalbet-style TOC sau absent (mobile-first)

## Color usage

Roșu/negru sport + CTA galben/portocaliu

## Typography hierarchy

Titluri scurte, multe bullet lists, paragrafe medii

| Level | Паттерн |
|-------|---------|
| H1 | Brand + keyword („Păreri X 2026” / „Casa de pariuri X”) |
| H2 | Feature sections: Bonus, App, Plăți, Pariuri sportive |
| H3 | Sub-steps (înregistrare, verificare) |

## Trust signals

ONJN în footer + disclaimer per pagină, logo operator

- Badge ONJN / licență Clasa I
- 18+ și joc responsabil
- Disclaimer affiliate (unde aplicabil)
- Autor + dată actualizare (legalbet, xbets)

## Table structure (bookmaker rating)

Tabel ★ rating, coloane Bonus/Cote/App, uneori top-listă

**Наша адаптация:** `BrandCard` + `RatingTable` cu coloane: Cote, Bonus, App, Plăți, Suport — NU copia 1:1 coloanele competitorului.

## Что НЕ копировать

Evită: banner agresiv full-width roșu
