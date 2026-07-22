---
title: Xbets — design inventory
type: design-inventory
lang: ru-RU
created: 2026-07-14
updated: 2026-07-14
domain: xbets.ro
sources:
  - 01.RAW/web-clips/reviews/imgs/
  - 01.RAW/web-clips/guides/imgs/
  - 01.RAW/assets/
related:
  - [[design-inventory/patterns-summary]]
  - [[review-competitors/xbets]]
tags: [design-inventory, competitor, ui]
---

# Xbets (xbets.ro) — design inventory

> Анализ по структуре клипов + скриншоты Firecrawl (`*-screenshot.png`). 20 clips, layout SEO-programatic.

## Layout patterns

SEO title „Păreri X 2026” → stats block → tabel caracteristici → FAQ

**Типичные блоки (по частоте в clips):**
- Hero / quick facts — да
- Comparison table — да
- CTA block — above fold + repeat
- Sidebar — legalbet-style TOC sau absent (mobile-first)

## Color usage

Verde închis + alb, accent pe cifre

## Typography hierarchy

H2 cu keyword în titlu, densitate numerică mare

| Level | Паттерн |
|-------|---------|
| H1 | Brand + keyword („Păreri X 2026” / „Casa de pariuri X”) |
| H2 | Feature sections: Bonus, App, Plăți, Pariuri sportive |
| H3 | Sub-steps (înregistrare, verificare) |

## Trust signals

Licență ONJN în intro, disclaimer standard

- Badge ONJN / licență Clasa I
- 18+ și joc responsabil
- Disclaimer affiliate (unde aplicabil)
- Autor + dată actualizare (legalbet, xbets)

## Table structure (bookmaker rating)

Tabel caracteristici brand (10+ rânduri), comparativ inline

**Наша адаптация:** `BrandCard` + `RatingTable` cu coloane: Cote, Bonus, App, Plăți, Suport — NU copia 1:1 coloanele competitorului.

## Что НЕ копировать

Evită: template identic pe toate brandurile
