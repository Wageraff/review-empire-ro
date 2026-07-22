---
title: Foundation Report — Knowledge Base Complete
type: concept
lang: ru-RU
created: 2026-07-14
updated: 2026-07-14
sources:
  - 02.WIKI/log.md
  - 03.SEO/master-plan.md
  - 03.SEO/_stage2-brands-manifest.json
  - 01.RAW/web-clips/_reaudit-report.json
  - 04.BRANDS/
  - 04.5.REVIEW-COMPETITORS/
related:
  - [[brands-overview]]
  - [[review-competitors-overview]]
  - [[images-index-overview]]
  - [[master-plan]]
tags: [foundation, report, milestone]
---

# Foundation Report — Knowledge Base

> **Статус: COMPLETE ✅** (Stages 0–5, 2026-07-14)
> База знаний готова к v4 migration + Content Pipeline.

---

## Executive Summary

Построена полная knowledge foundation для сетки pariuri sportive RO:

| Артефакт | Цель | Факт | Статус |
|----------|-----:|-----:|--------|
| Wiki concepts | 52 | **52** | ✅ |
| Brand dossiers (`04.BRANDS/`) | 91 | **92** | ✅ (+1 alias file) |
| Brand wiki stubs | 91 | **92** | ✅ |
| Review-competitor dossiers | 8 | **8** | ✅ |
| Image indexes re-audit | — | **5 026** files / **3 428** usable | ✅ |
| Regulatory wiki | 7+ | **8** | ✅ (slugs ≠ index) |
| Glossary wiki | 4 | **0** | ⚠️ gap |

**Итого wiki-страниц контента:** ~163 (52 concepts + 92 brands + 8 competitors + 3 overviews + 8 regulatory)

---

## Stage-by-Stage

### Stage 0 — Scope decisions ✅

| Решение | Выбор |
|---------|-------|
| Dossiers | 91 (P1+P2) |
| guides-concepts | +btts |
| bonuses | без refer-a-friend, bonus-liga-1 |
| sports | skip rugby |
| images | re-audit |

### Stage 1 — Wiki concepts (52/52) ✅

| Кластер | Страниц |
|---------|--------:|
| guides-concepts | 15 |
| bonuses | 10 |
| sports | 9 |
| payments | 12 |
| apps | 6 |

### Stage 2 — Brand dossiers (91/91) ✅

- `04.BRANDS/{slug}.md` — полные досье
- `02.WIKI/brands/{slug}.md` — light wiki
- Manifest: `03.SEO/_stage2-brands-manifest.json`
- **5 slug aliases:** admiralbet→admiral, mrbit→mr-bit, power-bet→powerbet, royal→royalslots, toto-gaming→totogaming

**Флаги (44 dossier с метками):**
- `pariuri_secondary` / `cazino-only` — casino-primary бренды
- `retail_only` — clover-bet, real-bet, river-bet
- `defunct` — baumbet, total-bet
- `partial` / `data_ready: false` — million, playgg, redsevens, hotspins, jokercasino, kingcasino, royalslots, one (+ sportingbet)

**Правило лицензий:** ONJN № только из verified sources; иначе `license: —` + Decizia.

### Stage 3 — Review-competitors (8/8) ✅

| Домен | Traffic | Стратегия |
|-------|--------:|-----------|
| pariurix.com | ~216k | casino-first |
| legalbet.ro | ~109k | casino + centrul de pariere |
| pontul-zilei.com | ~83k | 1-page bonus SEO |
| beturi.ro | ~63k | meciuri azi |
| biletu-zilei.com | ~58k | ponturi + loto |
| 10pariuri.ro | ~47k | balanced pariuri |
| xbets.ro | ~32k | poziții ligă |
| pariuriexpert.ro | n/a | review quality |

Досье: `04.5.REVIEW-COMPETITORS/` · Overview: [[review-competitors-overview]]

### Stage 4 — Image re-audit ✅

| Метрика | Значение |
|---------|----------|
| Файлов | 5 026 |
| Usable | 3 428 (68%) |
| Брендов с ассетами | 89/91 |
| Schema | v2 (`brand` field) |

Скрипт: `scripts/reindex-images.py` · Отчёт: `01.RAW/web-clips/_reaudit-report.json`

---

## Конкурентная позиция

**Их сильные стороны:**
- Casino bonus SEO (pariurix 122k на bonus fără depunere)
- Utility pages (meciuri azi, poziții ligă)
- Масштаб bonus URL (1800+ у pariurix)

**Наша дифференциация:**
1. **Sport-first** — без ухода в casino/loto
2. **91 brand dossier** — глубина покрытия операторов
3. **52 wiki concepts** — betting school с cross-links
4. **Editorial recenzii** — methodology + scoring (их слабое место)

---

## Gaps & Tech Debt

### Данные

| Gap | Приоритет | Действие |
|-----|-----------|----------|
| 8+ partial dossiers | P1 | autoclip + fact-check |
| 6 REVIEW `data_ready: false` | P1 | дособрать clips |
| KYC guides 13/20 ready | P1 | autoclip round 3 |
| FEATURE-RATING 0/15 ready | P2 | синтез из guides |
| Glossary 0/4 pages | P2 | создать из concepts |
| Regulatory index slugs mismatch | P2 | lint + fix links |

### Wiki lint (не выполнен)

- [ ] Дубли страниц / slug aliases inbound links
- [ ] Страницы-сироты (regulatory ≠ index paths)
- [ ] Glossary missing entirely
- [ ] Противоречия partial vs full dossiers

### SEO plan (pre-pipeline)

- `03.SEO/master-plan.md` — **2 788 URL**, P1:217
- Dossiers 91 ✅, но master-plan ещё ссылается на «20 dossier complet»
- Нужен refresh master-plan под 91 dossier + foundation complete

---

## Recommended Next Steps

### Immediate (перед Content Pipeline)

1. **`lint`** — прогнать wiki lint, fix regulatory/glossary orphans
2. **Refresh `master-plan.md`** — 91 dossier, data_ready matrix post-foundation
3. **Autoclip P1 gaps** — 6 reviews + KYC tutorials + partial brands

### Content Pipeline (v4)

4. **Wave 0** — P1 REVIEW (20 lineup) + BONUS-CATEGORY-HUB + GUIDE-PAGE concepts
5. **Wave 1** — KYC `/ghiduri/brand/{slug}/verificare-cont`
6. **Wave 2** — P2 reviews (72 remaining brands)
7. **Anti-detect** — per `08.PBN/pbn_network_requirements.md`

### Optional

8. Visual re-index batch (PIL dimensions) для top-500 usable assets
9. `generate-site` — после pipeline template freeze

---

## File Map

```
02.WIKI/
  index.md              — каталог (обновлён)
  log.md                — журнал операций
  foundation-report.md  — этот файл
  brands/               — 92 stubs
  bonuses/              — 10 concepts
  guides-concepts/      — 15 concepts
  sports/               — 9 concepts
  payments/             — 12 concepts
  apps/                 — 6 concepts
  review-competitors/   — 8 stubs
  regulatory/           — 8 pages

04.BRANDS/              — 92 dossiers
04.5.REVIEW-COMPETITORS/ — 8 dossiers

03.SEO/
  master-plan.md
  _stage2-brands-manifest.json

01.RAW/web-clips/
  _reaudit-report.json
  */imgs/_index.json    — 9 categories
```

---

## Sign-off

| Stage | Date | Status |
|-------|------|--------|
| 0 Scope | 2026-07-14 | ✅ |
| 1 Wiki concepts | 2026-07-14 | ✅ |
| 2 Brand dossiers | 2026-07-14 | ✅ |
| 3 Review-competitors | 2026-07-14 | ✅ |
| 4 Image re-audit | 2026-07-14 | ✅ |
| 5 Final report | 2026-07-14 | ✅ |

**Foundation knowledge base — READY FOR PIPELINE.**
