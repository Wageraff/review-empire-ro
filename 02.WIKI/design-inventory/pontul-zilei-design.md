---
title: Pontul Zilei — design inventory
type: design-inventory
lang: ru-RU
created: 2026-07-14
updated: 2026-07-14
domain: pontul-zilei.com
sources:
  - 01.RAW/web-clips/reviews/imgs/
  - 01.RAW/web-clips/guides/imgs/
  - 01.RAW/assets/
related:
  - [[design-inventory/patterns-summary]]
  - [[review-competitors/pontul-zilei]]
tags: [design-inventory, competitor, ui]
---

# Pontul Zilei (pontul-zilei.com) — design inventory

> Анализ по структуре клипов + скриншоты Firecrawl (`*-screenshot.png`). 17 clips, affiliate landing style.

## Layout patterns

Hero promo (emoji + bonus headline) → CTA above fold → secțiuni scurte

**Типичные блоки (по частоте в clips):**
- Hero / quick facts — да
- Comparison table — rare
- CTA block — above fold + repeat
- Sidebar — legalbet-style TOC sau absent (mobile-first)

## Color usage

Portocaliu/verde promo, contrast puternic pe CTA

## Typography hierarchy

Titluri cu 🏆, propoziții scurte, imperative

| Level | Паттерн |
|-------|---------|
| H1 | Brand + keyword („Păreri X 2026” / „Casa de pariuri X”) |
| H2 | Feature sections: Bonus, App, Plăți, Pariuri sportive |
| H3 | Sub-steps (înregistrare, verificare) |

## Trust signals

ONJN text, dar CTA dominant; 18+ în footer

- Badge ONJN / licență Clasa I
- 18+ și joc responsabil
- Disclaimer affiliate (unde aplicabil)
- Autor + dată actualizare (legalbet, xbets)

## Table structure (bookmaker rating)

Minimal — focus pe offer box, nu comparații

**Наша адаптация:** `BrandCard` + `RatingTable` cu coloane: Cote, Bonus, App, Plăți, Suport — NU copia 1:1 coloanele competitorului.

## Что НЕ копировать

Evită: pagină one-screen fără depth SEO
