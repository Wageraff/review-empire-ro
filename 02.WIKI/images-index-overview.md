---
title: Images Index — overview
type: concept
lang: ru-RU
created: 2026-07-14
updated: 2026-07-14
sources:
  - 01.RAW/web-clips/_reaudit-report.json
  - scripts/reindex-images.py
related:
  - [[brands-overview]]
  - [[master-plan]]
tags: [assets, images, re-audit]
---

# Images Index — overview

> Скриншоты и ассеты из web-clips. Индексы: `01.RAW/web-clips/{category}/imgs/_index.json`

## Re-audit 2026-07-14 (Stage 4)

| Метрика | Значение |
|---------|----------|
| **Всего файлов** | 5 026 |
| **Usable** | 3 428 (68%) |
| **Ignored** | 1 598 |
| **Брендов с ассетами** | 89 / 91 |
| **Категорий** | 9 |

### По категориям

| Категория | Файлов | Usable | Примечание |
|-----------|-------:|-------:|------------|
| reviews | 2 129 | 1 025 | legacy flat `web-clips/imgs/` (1 968 файлов) |
| bonuses | 1 404 | 911 | +557 hash-embeds → ignored |
| guides | 1 092 | 1 092 | firecrawl screenshots, brand из slug |
| ratings | 77 | 77 | — |
| sport-categories | 19 | 19 | — |
| apps | 103 | 102 | — |
| payments | 126 | 126 | — |
| player-reviews | 41 | 41 | — |
| retail | 35 | 35 | — |

### Топ брендов по usable assets

betano (179), netbet (123), unibet (110), superbet (109), fortuna (99), betfair (98), winbet (84), casa-pariurilor (80).

### Ignore reasons

| Причина | Кол-во |
|---------|-------:|
| generic filename pattern (hash/numeric) | 1 356 |
| no brand, generic | 202 |
| small icon | 40 |

### Бренды без ассетов

`mrbit`, `powerbet` — slug-алиасы; ассеты под `mr-bit`, `power-bet`.

## Схема индекса (v2)

```json
{
  "file": "superbet-recenzie-screenshot.png",
  "brand": "superbet",
  "type": "screenshot-main",
  "theme": "pariuri",
  "width": 1200,
  "height": 900,
  "quality": 8,
  "usable": true,
  "source": "firecrawl-batch"
}
```

Поле `bookmaker` (legacy) заменено на `brand`. Reviews legacy path: `path: "legacy:01.RAW/web-clips/imgs/"`.

## Скрипт

```bash
python3 scripts/reindex-images.py
```

Отчёт: `01.RAW/web-clips/_reaudit-report.json`
