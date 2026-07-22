---
title: Legalbet — design inventory
type: design-inventory
lang: ru-RU
created: 2026-07-14
updated: 2026-07-14
domain: legalbet.ro
sources:
  - 01.RAW/web-clips/reviews/imgs/
  - 01.RAW/web-clips/guides/imgs/
  - 01.RAW/assets/
related:
  - [[design-inventory/patterns-summary]]
  - [[review-competitors/legalbet]]
tags: [design-inventory, competitor, ui]
---

# Legalbet (legalbet.ro) — design inventory

> Анализ по структуре клипов + скриншоты Firecrawl (`*-screenshot.png`). 20 review clips, screenshots limitate în reviews/imgs.

## Layout patterns

Hero card (logo + quick facts grid) → sticky TOC → H2 sections → comparison sidebar

**Типичные блоки (по частоте в clips):**
- Hero / quick facts — да
- Comparison table — да
- CTA block — above fold + repeat
- Sidebar — legalbet-style TOC sau absent (mobile-first)

## Color usage

Albastru închis + verde accent (trust), fundal alb/gri deschis

## Typography hierarchy

H1 bold brand name, H2 cu iconițe, tabele cu header colorat

| Level | Паттерн |
|-------|---------|
| H1 | Brand + keyword („Păreri X 2026” / „Casa de pariuri X”) |
| H2 | Feature sections: Bonus, App, Plăți, Pariuri sportive |
| H3 | Sub-steps (înregistrare, verificare) |

## Trust signals

Badge ONJN, licență în hero, 18+, link joc responsabil, autor + dată

- Badge ONJN / licență Clasa I
- 18+ și joc responsabil
- Disclaimer affiliate (unde aplicabil)
- Autor + dată actualizare (legalbet, xbets)

## Table structure (bookmaker rating)

Quick-rating grid (5-7 criterii), tabel bonus comparativ, nu clasament multi-brand

**Наша адаптация:** `BrandCard` + `RatingTable` cu coloane: Cote, Bonus, App, Plăți, Suport — NU copia 1:1 coloanele competitorului.

## Что НЕ копировать

Evită: layout media/news cu sidebar aglomerat
