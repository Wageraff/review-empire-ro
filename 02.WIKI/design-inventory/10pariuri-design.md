---
title: 10Pariuri — design inventory
type: design-inventory
lang: ru-RU
created: 2026-07-14
updated: 2026-07-14
domain: 10pariuri.ro
sources:
  - 01.RAW/web-clips/reviews/imgs/
  - 01.RAW/web-clips/guides/imgs/
  - 01.RAW/assets/
related:
  - [[design-inventory/patterns-summary]]
  - [[review-competitors/10pariuri]]
tags: [design-inventory, competitor, ui]
---

# 10Pariuri (10pariuri.ro) — design inventory

> Анализ по структуре клипов + скриншоты Firecrawl (`*-screenshot.png`). Puține în reviews; structură text-first.

## Layout patterns

Titlu review → pareri jucatori block → pros/cons → bonus → app

**Типичные блоки (по частоте в clips):**
- Hero / quick facts — да
- Comparison table — rare
- CTA block — above fold + repeat
- Sidebar — legalbet-style TOC sau absent (mobile-first)

## Color usage

Albastru + alb minimalist, puține accent colors

## Typography hierarchy

H2 descriptive, text mai scurt (~3600w), liste simple

| Level | Паттерн |
|-------|---------|
| H1 | Brand + keyword („Păreri X 2026” / „Casa de pariuri X”) |
| H2 | Feature sections: Bonus, App, Plăți, Pariuri sportive |
| H3 | Sub-steps (înregistrare, verificare) |

## Trust signals

ONJN menționat, uneori fără badge vizual, pareri = social proof

- Badge ONJN / licență Clasa I
- 18+ și joc responsabil
- Disclaimer affiliate (unde aplicabil)
- Autor + dată actualizare (legalbet, xbets)

## Table structure (bookmaker rating)

Rare (1/33 clips) — preferă liste și carduri

**Наша адаптация:** `BrandCard` + `RatingTable` cu coloane: Cote, Bonus, App, Plăți, Suport — NU copia 1:1 coloanele competitorului.

## Что НЕ копировать

Evită: pagini prea „thin” fără methodology
