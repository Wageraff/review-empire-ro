# Workflows Registry

> Канонические workflow'ы проекта. Читать **по задаче**, не always-on.
> Источник (вынесено из `.cursorrules` 2026-07-21): ingest/query/lint, content pipeline, batch, checkpoints, discovery, firecrawl, images, SEO, anti-detect, placeholders.

См. также:
- `05.REGISTRIES/page-types.md` — типы страниц
- `05.REGISTRIES/batch-sizes.md` — размеры batch
- `05.REGISTRIES/review-checkpoints.md` — чекпоинты
- `05.REGISTRIES/concepts-map.md` — `[[concept:X]]`
- `.cursor/rules/{seo-expert,copywriter,linguist,linker}.mdc` — роли pipeline

---

## CORE WORKFLOWS (модель Карпатого)

### ingest <путь>
1. Прочитай указанные файлы в `01.RAW/`
2. Выдели ключевые смысловые точки
3. ОБСУДИ со мной key takeaways ПЕРЕД записью
4. Создай/обнови wiki-страницы в СООТВЕТСТВУЮЩИХ подпапках `02.WIKI/`:
   - Про букмекера → `02.WIKI/brands/<slug>.md`
   - Про бонус-концепт → `02.WIKI/bonuses/<slug>.md`
   - Про спорт → `02.WIKI/sports/<slug>.md`
   - и т.д.
5. Один источник может затронуть 10–15 страниц — норма
6. Проставь cross-links через `[[wiki-link]]`
7. Обнови `02.WIKI/index.md` (соотв. категория + one-line summary)
8. Допиши в `02.WIKI/log.md`:
   ```
   ## [YYYY-MM-DD] ingest | <source>
   - changed pages: [[page1]], [[page2]]
   ```
9. Противоречия старым данным — НЕ удаляй молча, создай заметку

### query <вопрос>
1. ВСЕГДА начни с `02.WIKI/index.md`
2. Рекурсивно пройди по cross-links к релевантным страницам
3. Собери полный контекст, дай ответ со ссылками `[[на страницы]]`
4. Ценный синтез — предложи сохранить как новую wiki-страницу

### lint
1. Найди: дубли, противоречия, сирот, unlinked концепты, устаревшее, пробелы в данных
2. Покажи список, жди "Fix all"
3. Предложи 3–5 новых вопросов для исследования

### discovery <домен>
1. Screaming Frog вручную (делает пользователь)
2. После CSV — работай из `01.RAW/discovery/<домен>/`
3. См. DISCOVERY WORKFLOW ниже

### autoclip <тип>
См. FIRECRAWL AUTOMATION ниже

### generate-site <site-name>
1. Прочитай `03.SEO/master-plan.md`
2. Возьми дизайн из `06.DESIGN/<site-name>-spec.md`
3. Создай/обнови Astro-проект в `07.SITES/<site-name>/`
4. Следуй anti-detect правилам из `08.PBN/`
5. Проверь `npm run build` без ошибок

---

## PAGE FORMAT (wiki-страницы)

```yaml
---
title: <название>
type: brand | bonus-concept | sport | payment | app | guide-concept |
      regulatory | seo-cluster | competitor-analysis
lang: ro-RO
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: [path/to/raw1, path/to/raw2]
related: [[link1]], [[link2]]
tags: [tag1, tag2]
---
```

---

## CROSS-LINKING RULES

Обязательные связи между типами:
- Review бренда → его bonus-pages (все, минимум 2)
- Review бренда → app-review этого бренда
- Review бренда → релевантные guides (минимум 3)
- Review бренда → главная / rating
- Bonus-page → review этого бренда + 2–3 других бонуса категории
- App-review → review этого бренда + сравнения приложений
- Payment-method → bookmakers использующие этот метод
- Guide → 3–5 related guides + глоссарий
- Guide → NEVER промо-ссылки напрямую на букмекеров
- Sport-category → top-5 бренды для этого спорта + guides + PREDICTION-SPORT-HUB (Фаза 3)
- Rating → все листинги в топе + методология
- Comparison → оба бренда review + related comparisons

---

## SEO RULES

- Title: 50–60 симв, целевой кейворд на ro в начале
- Meta description: 150–160 симв
- H1: один, содержит кейворд
- Внутренняя перелинковка: минимум 5 ссылок на странице
- Schema.org: соответствующий типу (`05.REGISTRIES/page-types.md`)
- Hreflang: ro-RO

---

## ANTI-DETECT (сетка сайтов)

- Rewrite ≥75% между сайтами
- Разная HTML-структура, имена CSS-классов
- Разные favicon, logo, палитра
- Whois-приватность
- Разные тексты T&C, About, Methodology
- Гайды: rewrite ≥85%
- Картинки: разные варианты трансформации (см. IMAGE STRATEGY)

---

## DISCOVERY WORKFLOW

Когда пользователь говорит «объедини URLs из discovery»:

1. Найди все CSV в `01.RAW/discovery/*/`
2. Прочти (колонки Screaming Frog: Address, Status Code, Title, Depth, Content-Length, Word Count и т.д.)
3. Фильтр:
   - Status Code == 200
   - Content Type == text/html
   - НЕ содержит: `/tag/`, `/author/`, `/page/`, `/?`, `/login`, `/register`, `/cart`
4. Классифицируй по URL-паттернам:
   - reviews: `/recenzie/`, `/review/`, `/casa-de-pariuri/`
   - bonuses: `/bonus/`, `/promotii/`, `/oferta/`, `/cashback/`, `/rotiri/`
   - guides: `/ghid/`, `/scoala/`, `/dictionar/`, `/cum-sa/`, `/ce-este/`, `/strategi/`
   - ratings: `/top-`, `/clasament/`, `/cele-mai-bune/`
   - sport: `/pariuri-fotbal/`, `/pariuri-tenis/`, `/pariuri-baschet/`, `/pariuri-hochei/`
   - apps: `/aplicatie/`, `/mobile/`, `/app-mobil/`
   - payments: `/metode-de-plata/`, `/skrill/`, `/netopia/`, `/paysafecard/`
5. Сохрани:
   - `01.RAW/discovery/urls-<тип>.txt` (по одному на тип)
   - `01.RAW/discovery/urls-all.csv` (сводный)
6. Дедупликация по URL (тот же URL с разных сайтов — оставить 3–5)
7. Отчёт: сколько URL в каждой категории, распределение по доменам

---

## FIRECRAWL AUTOMATION

Когда пользователь говорит «autoclip <тип>»:

1. Проверь `01.RAW/discovery/urls-<тип>-priority.txt`
2. Проверь `FIRECRAWL_API_KEY` в `.env`
3. Сводка: URL count, credits estimate, время, куда save
4. Жди «поехали»
5. Запусти: `cd scripts && npm run batch-<тип>`
6. Мониторь через `tail -f logs/firecrawl-*.log`
7. Постобработка автоматом:
   - Клипы < 500 слов → `01.RAW/web-clips/<тип>/_trash/`
   - Ошибочные HTTP → `_errors/`
   - Классификация: brand (по контенту, не URL), content_subtype
   - Frontmatter: brand, content_subtype, word_count, quality_score
8. Финальный отчёт

---

## IMAGE INDEX WORKFLOW

Каждая папка `01.RAW/web-clips/<тип>/imgs/` имеет `_index.json`:

```json
{
  "last_updated": "YYYY-MM-DD",
  "category": "reviews | bonuses | guides | ratings | sport-categories | apps | payments",
  "total_indexed": 0,
  "images": [
    {
      "file": "img-abc123.png",
      "brand": "superbet | null",
      "type": "logo | screenshot-main | screenshot-bonus | screenshot-app | screenshot-payment | photo | banner | icon",
      "theme": "keyword-on-romanian",
      "width": 1440,
      "height": 900,
      "quality": 1,
      "usable": true
    }
  ]
}
```

### При «reindex images»
1. Работай по всем 7 папкам параллельно
2. Batches по 20 картинок
3. Обновляй `_index.json` атомарно (temp + mv)

### При «index new images» (инкрементал)
1. Читай `_index.json`, diff с `ls`
2. Индексируй только новые
3. Не трогай уже индексированные

### При написании страницы
- Review бренда: `reviews/imgs` + `bonuses/imgs` + `apps/imgs`
- Bonus-page: `bonuses/imgs` + `reviews/imgs`
- App-review: `apps/imgs` + `reviews/imgs`
- Payment-method: `payments/imgs` + `reviews/imgs`
- Guide: `guides/imgs`
- Sport-hub: `sport-categories/imgs` + `reviews/imgs`
- Rating: `reviews/imgs`
- Приоритет: `usable=true` + quality 9–10
- Если нет — `images_needed: ["описание"]` в frontmatter

### Обработка (уникализация)
- Исходник: `01.RAW/web-clips/<тип>/imgs/<original>.png` (immutable!)
- Копия: `01.RAW/assets/<brand>/<original>.png`
- Обработка: `scripts/process-clip-image.sh`
- Финал: `07.SITES/<site>/public/images/<brand>/<seo-name>.webp`

---

## IMAGE STRATEGY (уникализация)

Варианты по сайтам сетки:
- site-01: variant=1 (жёлтая рамка 8px, 1200px, quality 85)
- site-02: variant=2 (синяя рамка 6px, 1100px, quality 88)
- site-03: variant=3 (скруглённые углы, 1000px, quality 82)
- site-04: variant=4 (тёмный градиент, 1150px, quality 90)
- site-05: variant=5 (mockup ноутбука, 1080px, quality 85)

Обязательно:
- WebP (кроме logo с прозрачностью → PNG lossless)
- ≤200KB
- Стирать EXIF
- Разные alt-теги для одной картинки между сайтами
- Разные имена файлов между сайтами

---

## CONTENT PIPELINE

НИКОГДА не пиши финальные тексты за один проход.
Всегда: SEO Plan → Copy Draft → Linguist Check.

Drafts: `07.SITES/site-01-ro/src/content/drafts/<slug>.md`  
status: `draft | seo-planned | copy-written | linguist-checked | ready`

1. **SEO Plan** — `.cursor/rules/seo-expert.mdc`, модель Sonnet → `seo-planned`
2. **Copy Draft** — `.cursor/rules/copywriter.mdc`, модель Opus, секциями → `copy-written`
3. **Linguist Check** — `.cursor/rules/linguist.mdc`, модель Sonnet → `linguist-checked`
4. **Final approval** (пользователь) → `ready`

Только `status: ready` идёт в Astro build.

---

## BATCH WORKFLOW

НИКОГДА не пиши по одной странице. Всегда batch'ами по типу.

Размеры — `05.REGISTRIES/batch-sizes.md`.

Группировка (Architect предлагает, пользователь одобряет):
1. Кластерная связность (все страницы про один бренд рядом)
2. По типу внутри кластера (review → bonus → app)
3. По SEO приоритету (высокий volume раньше)

Порядок batch:
1. `propose batches for <wave>`
2. Одобрение / корректировка
3. `start batch <N>: <type> × <size>`
4. SEO plans для всех
5. CHECKPOINT (если включен в `review-checkpoints.md`)
6. Copy drafts (Opus)
7. CHECKPOINT
8. Linguist checks (Sonnet)
9. CHECKPOINT
10. Final approval (всегда)
11. Batch complete → следующий

---

## PROGRESS TRACKING

После КАЖДОЙ операции с drafts обновляй:
`07.SITES/site-01-ro/PROGRESS.md` (slim; детали закрытых батчей — `PROGRESS-archive.md`)

Триггеры:
- Новый draft → increment «in progress»
- Статус изменился → пересчитать таблицы
- Batch стартовал → «Активный batch»
- Batch завершился → кратко в Wave status; детали → archive при необходимости
- Deploy → «Deployed»
- Проблемы → «Открытые риски»

Формат: атомарно (temp + mv), timestamp вверху.

При команде `progress`:
- Не дампи весь файл
- Только: общий %, текущий batch/этап, что застряло, next

---

## CHECKPOINT ENFORCEMENT

Перед batch: читай `05.REGISTRIES/review-checkpoints.md`, определи mode.

В процессе:
- checkpoint true → стоп, сводка, жди «ok»
- checkpoint false → следующий этап
- `final_approval` ВСЕГДА обязателен

Стоп и спроси при ЛЮБОЙ проблеме (даже `checkpoints=false`):
- Ошибка компиляции draft
- Уникальность < 70% от clip
- Ключ не встречается в тексте
- Заголовок > 70 символов
- Диакритика отсутствует

---

## PLACEHOLDERS внутренних ссылок

Copywriter НЕ вписывает URL — только:
- `[[concept:X]]`
- `[[concept:X@brand]]`
- `[[concept:X?section=name]]`

Linker разрешает на Astro Build (`05.REGISTRIES/concepts-map.md`).  
Минимум плейсхолдеров на странице: **5**.

---

Обновлено: 2026-07-21 (вынесено из `.cursorrules` для сжатия always-on контекста)
