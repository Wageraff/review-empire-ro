# 🏗️ Мастер-протокол v4 — ДОПОЛНЕНИЕ к v3 (batch workflow + прогресс-трекинг)

> **Это дополнение к MASTER-PROTOCOL-v3.md**, не заменяет его.
> Добавляет пакетную работу, дашборд прогресса, настраиваемые чекпоинты
> и перелинковку на этапе Astro-сборки.
>
> **v3 остаётся актуальным по всем остальным частям** — установка, роли,
> discovery, Firecrawl, style/design анализ, ingest-серия.

---

## 📑 Что добавлено в v4

- **Часть A.** Batch Workflow (пакетная работа) — заменяет Часть 10 из v3
- **Часть B.** PROGRESS.md дашборд + команда `progress`
- **Часть C.** Настраиваемые Review Checkpoints (после каждого этапа / только в финале)
- **Часть D.** Логика группировки пакетов (Cursor предлагает — вы одобряете)
- **Часть E.** Перелинковка как отдельный этап (перенесена из SEO Plan в Astro Build)
- **Часть F.** Обновлённые роли в `.cursor/rules/` под batch
- **Часть G.** Практический пример: обработка 500 URL от старта до финиша

---

## <a name="часть-A"></a>📦 Часть A. Batch Workflow (замена Части 10 v3)

### A.1. Основной принцип

**Никогда не пиши по одной странице.** Всегда пакетами.

```
Batch = группа страниц одного типа/кластера + одинаковые размеры пакета
```

**Дефолтные размеры пакетов** (Cursor использует их автоматически):

| Тип страницы | Batch size | Обоснование |
|---|---|---|
| **review** | 10 | Длинные (3000-5000 слов), нужен внимательный ревью |
| **bonus-page** | 20 | Короче (1500-2500 слов), похожая структура |
| **bonus-category-hub** | 5 | Хабов немного, ревью каждого важен |
| **guide-page** | 15 | Средние (1500-3000), баланс объёма и разнообразия |
| **sport-category** | 8 | Разные виды спорта — важна уникальность |
| **app-review** | 12 | Средняя длина, часто похожие |
| **payment-method** | 10 | Средняя длина, детали важны |
| **rating** | 5 | Большие таблицы, нужен внимательный ревью |
| **comparison** | 8 | Специфичный жанр, нужна консистентность |
| **E-A-T pages** | 3-5 | Критично, каждая штучная |
| **prediction** (Фаза 3) | 30-50 | Однотипные, автоматизация через API |

Эти значения хранятся в `05.REGISTRIES/batch-sizes.md` — Cursor читает при формировании пакетов. **Вы можете менять** под свой темп работы.

### A.2. Полный batch workflow (заменяет Часть 10 v3)

**Терминология:**
- **Batch** — один пакет (например, 10 review-страниц)
- **Wave** — серия пакетов одного типа (например, все review-страницы всех букмекеров)
- **Sprint** — недельная выработка (обычно 2-4 batch'а)

### A.3. Полный цикл одного batch'a

```
┌────────────────────────────────────────────────────────────┐
│  BATCH: 10 review-страниц Superbet, Betano, Unibet, ...    │
└─────────────────────────┬──────────────────────────────────┘
                          ▼
┌────────────────────────────────────────────────────────────┐
│  ЭТАП 1: SEO Plans (Sonnet) — 30-60 минут работы Cursor   │
│  • Читает досье, Ahrefs, style-guide, wiki                │
│  • Генерит 10 seo_plan для 10 drafts                      │
│  • Все получают status: seo-planned                       │
│  • Обновляет PROGRESS.md                                  │
└─────────────────────────┬──────────────────────────────────┘
                          ▼
       ┌─────────────────────────────────────────┐
       │  🔴 CHECKPOINT (если включен)          │
       │  Вы читаете 10 планов пачкой          │
       │  → "ok all" ИЛИ "правки к #3, #7"    │
       └─────────────────────┬───────────────────┘
                             ▼
┌────────────────────────────────────────────────────────────┐
│  ЭТАП 2: Copy Drafts (OPUS — переключить модель!)         │
│  2-4 часа работы Cursor                                    │
│  • Для каждого draft: пишет секцию → показывает           │
│    → авто-продолжает следующей (если не указано иное)     │
│  • Обновляет PROGRESS.md после каждой готовой страницы    │
└─────────────────────────┬──────────────────────────────────┘
                          ▼
       ┌─────────────────────────────────────────┐
       │  🔴 CHECKPOINT (если включен)          │
       │  Читаете 10 черновиков                 │
       │  → "ok all" ИЛИ конкретные правки     │
       └─────────────────────┬───────────────────┘
                             ▼
┌────────────────────────────────────────────────────────────┐
│  ЭТАП 3: Linguist Check (Sonnet) — 30-45 минут            │
│  • Вычитка всех 10 разом                                  │
│  • Inline правки + linguist_notes                         │
│  • Обновляет PROGRESS.md                                  │
└─────────────────────────┬──────────────────────────────────┘
                          ▼
       ┌─────────────────────────────────────────┐
       │  🟢 FINAL APPROVAL (всегда)            │
       │  Читаете 10 финальных версий           │
       │  → "approve all" ИЛИ конкретные       │
       │  → status: ready                       │
       └─────────────────────┬───────────────────┘
                             ▼
              [BATCH COMPLETE — 10 pages ready]
              ↓
       Следующий batch стартует автоматически
       или по вашей команде
```

### A.4. Команды для запуска batch'ей

**Простой запуск (одна команда — весь пакет):**

```
[SONNET] batch reviews wave-1

Активируй Architect + SEO Expert.
Возьми первые 10 review-страниц из 03.SEO/master-plan.md
(приоритет 1, отсортированные по target_volume desc).

Шаг 1 — покажи мне список 10 страниц которые войдут в batch:
| # | URL | Brand | Target keyword | Volume | KD |

Жду "ok" → запускаю SEO plans всей пачкой.
```

**После моего "ok":**

```
Cursor автоматически:
1. Генерит seo_plan для всех 10 → sve сохраняет в drafts/
2. Обновляет PROGRESS.md
3. Показывает мне сводку: 10/10 SEO plans готовы
4. Спрашивает: "review checkpoint after SEO? (y/n)"
   → если batch-review-checkpoint: batch → ждёт моё ok
   → если только final → продолжает автоматом к копирайту
```

### A.5. Мультибатч (несколько типов параллельно)

Cursor может обрабатывать батчи разных типов последовательно:

```
[SONNET] sprint week-1

Sprint plan (по master-plan.md приоритет 1):
- Batch A: 10 review-страниц (Superbet, Betano, ..., Fortuna)
- Batch B: 20 bonus-страниц (bonusuri de bun venit for top-10)
- Batch C: 15 guide-страниц (notiuni-de-baza + strategii)

Порядок:
1. Batch A SEO plans → checkpoint
2. Batch B SEO plans → checkpoint
3. Batch C SEO plans → checkpoint
   [сразу все планы, потом сразу все copy]
4. Batch A + B + C copy (Opus) → checkpoint
5. Batch A + B + C linguist → checkpoint
6. Final approvals

Оценка: 3-4 дня работы, 45 страниц ready в конце спринта.

Начать? (y/n)
```

### A.6. Регулировка размера batch'a

Если пакет слишком большой (Cursor устаёт, качество падает):

```
Сократи batch reviews до 5 страниц. Обнови 05.REGISTRIES/batch-sizes.md.
```

Если наоборот, слишком мелкий (много переключений контекста):

```
Увеличь batch bonuses до 25 страниц. Обнови registry.
```

---

## <a name="часть-B"></a>📊 Часть B. PROGRESS.md дашборд

### B.1. Что это и как работает

`07.SITES/site-01-ro/PROGRESS.md` — **живой файл**, который **Cursor автоматически обновляет** после каждой операции с drafts.

**Никогда не редактируйте вручную** — Cursor сам знает актуальное состояние.

### B.2. Структура PROGRESS.md

```markdown
# Site Progress — site-01-ro

> Auto-updated by Cursor. НЕ редактировать вручную.
> Обновлено: 2026-11-15 14:32 UTC

---

## 📊 Общая статистика

| Метрика | Значение |
|---|---|
| **Всего запланировано** | 218 страниц |
| **Ready (готовы к сборке)** | 47 (21%) |
| **In progress (в pipeline)** | 25 (11%) |
| **Not started** | 146 (67%) |
| **Deployed to production** | 15 (7%) |

### Прогресс-бар
```
█████░░░░░░░░░░░░░░░░░░░░ 21% ready
██░░░░░░░░░░░░░░░░░░░░░░░ 7%  deployed
```

---

## 📈 По типам страниц

| Тип | Всего | Ready | In progress | Not started | % ready |
|---|---|---|---|---|---|
| review | 20 | 10 | 5 | 5 | 50% |
| bonus-page | 45 | 15 | 10 | 20 | 33% |
| bonus-category-hub | 8 | 8 | 0 | 0 | 100% ✅ |
| guide-page | 20 | 5 | 5 | 10 | 25% |
| sport-category | 8 | 3 | 2 | 3 | 38% |
| app-review | 15 | 0 | 3 | 12 | 0% |
| payment-method | 10 | 0 | 0 | 10 | 0% |
| rating | 5 | 2 | 0 | 3 | 40% |
| comparison | 15 | 0 | 0 | 15 | 0% |
| E-A-T | 7 | 4 | 0 | 3 | 57% |
| homepage | 1 | 0 | 0 | 1 | 0% |
| prediction (заглушки) | 64 | 0 | 0 | 64 | 0% |
| **ИТОГО** | **218** | **47** | **25** | **146** | **21%** |

---

## 🔄 Активные batch'и

### Batch #12: guide-page wave-2 (in progress)
- **Тип:** guide-page
- **Размер:** 15 страниц
- **Этап:** Copy Draft (Opus)
- **Прогресс:** 8/15 страниц готовы
- **Стартовал:** 2026-11-15 09:15
- **Оценка завершения:** ~2 часа

**Страницы:**
| # | Slug | Status |
|---|---|---|
| 1 | strategii/martingale | ✅ copy-written |
| 2 | strategii/value-betting | ✅ copy-written |
| 3 | strategii/pariuri-live | 🔄 in progress (section 3/5) |
| 4 | strategii/1-3-2-6 | ⏳ queued |
| ... | ... | ... |

### Batch #13: bonus-page wave-3 (queued)
- **Тип:** bonus-page
- **Размер:** 20 страниц
- **Ожидает:** завершения #12
- **Целевые страницы:** cashback × 10 брендов

---

## 📅 История батчей

| # | Тип | Размер | Ready | Начат | Завершён | Длительность |
|---|---|---|---|---|---|---|
| 11 | review | 10 | 10/10 ✅ | 11-13 | 11-14 | 26h |
| 10 | bonus-category-hub | 8 | 8/8 ✅ | 11-12 | 11-13 | 15h |
| 9 | bonus-page | 20 | 20/20 ✅ | 11-10 | 11-12 | 40h |
| 8 | review | 10 | 10/10 ✅ | 11-08 | 11-10 | 35h |
| ... | ... | ... | ... | ... | ... | ... |

---

## 🚀 Deployed to production

- ✅ /despre-noi (deployed 2026-11-10)
- ✅ /metodologie (deployed 2026-11-10)
- ✅ /joc-responsabil (deployed 2026-11-10)
- ✅ /recenzii/superbet (deployed 2026-11-14)
- ... (11 more)

---

## ⚠️ Требует внимания

- 🔴 3 страницы застряли на copy-written > 3 дней:
  - /recenzii/mozzart (нужен linguist check)
  - /ghiduri/psihologie/tilt (нужен ваш ревью)
  - /aplicatii/betano (waiting for approval)
- 🟡 5 страниц с images_needed но нет подходящих в _index.json
- 🟡 12 внутренних ссылок ссылаются на страницы status != ready

---

## 📅 Sprint план (текущая неделя)

- [x] Batch #11: 10 reviews (Superbet family)
- [ ] Batch #12: 15 guides (strategii) — in progress
- [ ] Batch #13: 20 bonuses (cashback wave)
- [ ] Batch #14: 8 sport categories

**Прогноз недели:** 53 страницы ready, реально: 25/53 (47%)

---

## 🔗 Astro Build статус

- **Last build:** 2026-11-14 18:22 (success)
- **Pages built:** 32
- **Pending build:** 15 (status ready но не собраны)
- **Broken internal links:** 0
- **Lighthouse SEO:** 96
- **Lighthouse Performance:** 94

---

## 💾 Firecrawl / Ресурсы

- **Firecrawl credits used this month:** 2140 / 3000
- **Cursor tokens (estimated):** ~$18 spent this week
- **Estimated to finish Foundation phase:** $25-40 remaining
```

### B.3. Как Cursor обновляет PROGRESS.md

Правило в `.cursorrules` (добавить):

```markdown
## PROGRESS TRACKING

После КАЖДОЙ операции с draft-файлами обновляй:
07.SITES/<site>/PROGRESS.md

Операции которые триггерят обновление:
- Новый draft создан (status: draft/seo-planned) → increment "in progress"
- Статус draft'а изменился → пересчитать таблицы
- Batch стартовал → добавить в "Активные batch'и"
- Batch завершился → переместить в "История батчей"
- Deploy случился → добавить в "Deployed to production"
- Найдены проблемы → добавить в "Требует внимания"

Формат обновления:
- Атомарно (temp file + mv)
- Timestamp в верху файла
- Не удалять историю — append-only где возможно

При команде "progress":
- Прочитай PROGRESS.md
- Покажи мне краткую сводку (не весь файл, а ключевые метрики):
  * Общий %
  * Текущий batch
  * Что застряло
  * Прогноз завершения текущего wave
```

### B.4. Команды для просмотра прогресса

**Быстрый чек:**
```
progress
```
Cursor вернёт краткую сводку без открытия файла.

**Полный отчёт:**
```
full progress report

Покажи мне PROGRESS.md полностью + добавь:
- Средняя скорость на 1 страницу (по типам)
- Прогноз завершения Foundation phase
- Bottleneck (что тормозит больше всего)
- Рекомендации что запустить следующим
```

**Отчёт по типу:**
```
progress reviews

Только по review-страницам: какие ready, какие в pipeline,
на каком этапе застряли, что осталось написать.
```

---

## <a name="часть-C"></a>🎛️ Часть C. Настраиваемые Review Checkpoints

### C.1. Настройка чекпоинтов

Создайте файл `05.REGISTRIES/review-checkpoints.md`:

```markdown
# Review Checkpoints Configuration

> Настройка когда Cursor останавливается на ваше ревью в batch workflow.
> Меняйте по мере привыкания к качеству Cursor.

## Current mode: STRICT (стартовый режим)

Cursor останавливается ПОСЛЕ каждого этапа каждого batch'а.

```yaml
mode: strict
checkpoints:
  after_seo_plans: true         # ревью 10 планов сразу
  after_copy_drafts: true       # ревью 10 черновиков сразу
  after_linguist_check: true    # ревью 10 после лингвиста
  final_approval: true          # финальное одобрение (всегда true!)
```

## Доступные режимы

### strict (по умолчанию, первые 3-4 batch'а)
Все чекпоинты включены. Максимальный контроль, медленнее.

### medium (после 5-10 успешных batch'ей)
```yaml
mode: medium
checkpoints:
  after_seo_plans: true     # ревью планов
  after_copy_drafts: false  # copy и linguist автоматом
  after_linguist_check: false
  final_approval: true      # финал всегда
```

### fast (когда доверяете Cursor полностью)
```yaml
mode: fast
checkpoints:
  after_seo_plans: false
  after_copy_drafts: false
  after_linguist_check: false
  final_approval: true      # финал всегда
```

### custom (тонкая настройка)
Например: только для новых типов страниц (comparison, academia)
включаем strict, для проверенных (review, bonus) — fast.

```yaml
mode: custom
per_type:
  review: fast
  bonus-page: fast
  guide-page: medium
  comparison: strict         # новый тип, аккуратно
  academia: strict           # новый тип, аккуратно
```

## Как переключаться

Команда Cursor:
```
switch checkpoint mode to <mode>
```

Или для конкретного типа:
```
set checkpoint mode for <page-type> to <mode>
```

## История переключений

- 2026-11-01: strict (начало работы)
- 2026-11-15: medium для review (после 3 успешных batch'ей)
- 2026-11-22: fast для review (после 6 batch'ей без правок на copy этапе)
```

### C.2. Как Cursor соблюдает чекпоинты

Правило в `.cursorrules` (добавить):

```markdown
## CHECKPOINT ENFORCEMENT

Перед началом batch:
1. Прочитай 05.REGISTRIES/review-checkpoints.md
2. Определи mode для типа страниц в batch'е
3. Настрой pipeline соответственно

В процессе batch'а:
- Если чекпоинт true — останавливайся, показывай сводку, жди "ok"
- Если чекпоинт false — переходи к следующему этапу автоматом
- final_approval всегда обязателен — НЕ пропускай

При any_review = false на этапе, всё равно логируй что произошло
в PROGRESS.md → чтобы я мог откатить если что.

При обнаружении ЛЮБОЙ проблемы (даже с checkpoints: false):
- Ошибка компиляции draft
- Уникальность < 70% от клипа
- Ключ не встречается в тексте
- Заголовок > 70 символов
- Диакритика отсутствует в очевидных местах
→ ОСТАНОВИСЬ И СПРОСИ, независимо от режима.
```

### C.3. Рекомендованный timeline переключения

| Неделя | Батчей позади | Режим |
|---|---|---|
| 1-2 | 0-3 | **strict** — всё под контролем |
| 3-4 | 4-8 | **strict** — ещё привыкаете к качеству |
| 5-6 | 9-15 | **medium** для reviews (после 5 успешных подряд без правок на copy) |
| 7-8 | 16-25 | **medium** для всех типов кроме новых |
| 9+ | 25+ | **fast** для проверенных типов, **strict** для новых |

**Правило:** переходить в более быстрый режим **только если** предыдущий тип прошёл 5 batch'ей подряд без правок на этом этапе.

---

## <a name="часть-D"></a>🧩 Часть D. Логика группировки пакетов

### D.1. Cursor предлагает группировку, вы одобряете

Вы выбрали: **гибрид** — Cursor сам предлагает, вы соглашаетесь или корректируете.

### D.2. Как это работает

Команда:
```
propose batches for wave-1

Активируй Architect.
Прочитай 03.SEO/master-plan.md.
Прочитай 05.REGISTRIES/batch-sizes.md.

Предложи мне оптимальную группировку первых 60-80 страниц по batch'ам.

Учитывай:
- Приоритет из master-plan.md (P1 сначала)
- Целевой размер batch по типу
- Логические кластеры (review + bonus + app одного бренда рядом)
- SEO приоритет (высокий volume раньше)
- Cross-context: если batch по одной теме, Cursor лучше держит стиль

Формат предложения:
| Batch # | Тип | Размер | Логика | Приоритет | Est. время |
| 1 | review | 10 | Топ-10 брендов по volume | P1 | 30h |
| 2 | bonus-page | 20 | bonus-de-bun-venit для тех же 10 | P1 | 40h |
| 3 | app-review | 12 | приложения тех же 10 + 2 доп | P1 | 20h |
| 4 | guide-page | 15 | notiuni-de-baza (базовые) | P1 | 30h |
| 5 | payment-method | 10 | локальные RO (Netopia, mobilPay) | P1 | 15h |
| ... | ... | ... | ... | ... | ... |

Итого: 6-8 batch'ей на wave-1.
Общая оценка: 200-250 часов работы Cursor + мои ревью.

Жду "ok" или корректировок.
```

### D.3. Гибридная логика по умолчанию

Cursor группирует по такой приоритезации:

1. **Кластерная связность (сильнее всего)** — все страницы про Superbet вместе (review + bonus + app + payment ссылки), потом все Betano, и т.д.
2. **По типу внутри кластера** — сначала review Superbet, потом bonus Superbet (у review будут ссылки на bonus, а не наоборот)
3. **По SEO приоритету** — кластер Superbet перед кластером менее популярного бренда

**Обоснование:** когда Cursor пишет 10 review, у него в контексте остаётся стиль обзоров букмекеров. Когда переключается на 20 bonus-страниц — сохраняется тон, потому что это те же бренды.

### D.4. Пример готового плана wave-1

После `propose batches for wave-1`:

```
Wave-1: Foundation core (Топ-10 брендов + базовые гайды)

Batch 1: review × 10
├─ Superbet, Betano, Unibet, Fortuna, Mozzart
├─ CasaPariurilor, NetBet, Efbet, Winbet, MaxBet
└─ Est: 30h Cursor + 3h ваш ревью

Batch 2: bonus-page × 20
├─ bonus-de-bun-venit × 10 (те же бренды)
├─ + 10 cashback (те же бренды)
└─ Est: 40h Cursor + 4h ваш ревью

Batch 3: app-review × 12
├─ приложения тех же 10 брендов + 888 + PublicWin
└─ Est: 20h Cursor + 2h ваш ревью

Batch 4: bonus-category-hub × 7
├─ hub'ы для всех 7 категорий бонусов
└─ Est: 12h Cursor + 2h ваш ревью

Batch 5: payment-method × 8
├─ Netopia, mobilPay, Skrill, Neteller, Paysafecard,
├─ Carduri Bancare, Transfer Bancar, Criptomonede
└─ Est: 15h Cursor + 2h ваш ревью

Batch 6: guide-page × 15
├─ notiuni-de-baza × 7 (ce este cotă, cum functioneaza rulaj...)
├─ strategii × 4 (value betting, martingale, kelly, live)
├─ gestionarea-banilor × 2 (bankroll, staking)
├─ psihologie × 2 (tilt, disciplina)
└─ Est: 30h Cursor + 3h ваш ревью

Batch 7: sport-category × 8
├─ fotbal, tenis, baschet, handbal
├─ hochei, formula-1, esports, volei
└─ Est: 20h Cursor + 2h ваш ревью

Batch 8: rating × 5
├─ top-case-de-pariuri, top-bonusuri-bun-venit
├─ top-aplicatii, top-plati-rapide, top-cote-fotbal
└─ Est: 12h Cursor + 1.5h ваш ревью

────────────────────────────
Итого wave-1: 85 страниц
Est: 179h Cursor + 19.5h ваши ревью
Timeline: 2-3 недели
────────────────────────────

Плюс отдельно:
- E-A-T pages × 5 (парой в конце, ручнее): 
  despre-noi, metodologie, joc-responsabil, contact, termeni
- Homepage × 1 (в самом конце, после всего готового)

Жду одобрения плана wave-1.
```

Вы читаете, соглашаетесь или корректируете:
```
ok план wave-1. Только:
- В batch 6 убери "psihologie/tilt" в wave-2 (пока не приоритет)
- Добавь в batch 3 приложение MagicJackpot
- Batch 4 разбей на 2 части по 4 hub'а (мельче удобнее)
```

Cursor корректирует и запоминает.

---

## <a name="часть-E"></a>🔗 Часть E. Перелинковка на этапе Astro Build

### E.1. Изменение относительно v3

**В v3 я вписал `internal_links` в SEO Plan.** Это было неправильно — вы указали что перелинковка делается на этапе сборки Astro.

**В v4 логика:**
- SEO Plan содержит **семантические маркеры** — какие концепты упомянуть (без конкретных URL)
- Copywriter пишет с плейсхолдерами `[[concept:brand-superbet]]`, `[[concept:bonus-cashback]]`
- Linguist их не трогает
- **Builder на этапе Astro Build:**
  - Читает все `ready` drafts
  - Разрешает `[[concept:X]]` в реальные URL согласно тому какие страницы уже готовы
  - Проставляет ссылки в HTML
  - Проверяет что нет битых ссылок

### E.2. Формат плейсхолдеров в тексте

Copywriter пишет:
```markdown
Superbet este cea mai populară casă de pariuri din România, oferind
un [[concept:bonus-de-bun-venit@superbet]] de până la 500 RON și
o [[concept:aplicatie-mobila@superbet]] disponibilă pe iOS și Android.

Compară cu alți operatori din [[concept:top-case-de-pariuri]].

Pentru începători, recomandăm ghidul nostru despre 
[[concept:cum-sa-parieze-un-incepator]].
```

**Синтаксис:**
- `[[concept:X]]` — общий концепт (Cursor найдёт лучший URL)
- `[[concept:X@brand]]` — концепт связанный с брендом
- `[[concept:X?section=name]]` — ссылка на конкретную секцию

### E.3. Реестр концептов

Файл `05.REGISTRIES/concepts-map.md` — сопоставление концепта → URL:

```yaml
# Concepts Map
# Cursor обновляет когда draft получает status: ready

concepts:
  - id: bonus-de-bun-venit
    type: bonus-category
    hub_url: /bonusuri/bonus-de-bun-venit
    per_brand:
      superbet: /bonusuri/bonus-de-bun-venit/superbet
      betano: /bonusuri/bonus-de-bun-venit/betano
      # ...
      
  - id: aplicatie-mobila
    type: app-category
    hub_url: /aplicatii
    per_brand:
      superbet: /aplicatii/superbet
      betano: /aplicatii/betano
      
  - id: top-case-de-pariuri
    type: rating
    url: /top-case-de-pariuri
    
  - id: cum-sa-parieze-un-incepator
    type: guide
    url: /ghiduri/notiuni-de-baza/cum-sa-parieze-un-incepator
```

### E.4. Роль Linker (новая)

Файл `.cursor/rules/linker.mdc`:

```markdown
---
description: Роль Linker — перелинковка на этапе Astro Build
globs: 07.SITES/**/src/pages/**
alwaysApply: false
---

# LINKER ROLE

Активируется при: "resolve links", "build astro" (автоматически перед сборкой)

## Задачи
Разрешить все [[concept:...]] плейсхолдеры в реальные URL.

## Обязательный процесс
1. Читай 05.REGISTRIES/concepts-map.md
2. Для каждого draft со status: ready:
   - Найди все [[concept:X]] в теле
   - Для каждого:
     * Если X@brand — используй per_brand[brand] URL
     * Если просто X — используй hub_url
     * Если X?section=name — hub_url + #section
   - Если URL страница ещё НЕ ready:
     * Проверь next_wave targets
     * Если планируется в ближайшем wave — оставь плейсхолдер, 
       добавь в ⚠️ pending_links
     * Если не планируется вообще — заменить на ближайший ready URL
       (например, вместо ссылки на /bonusuri/cashback/x-brand 
       которая не готова — ссылка на hub /bonusuri/cashback/)
3. Проверь минимум 5 internal_links на странице:
   - Если меньше — добавь предложения concepts которые не были 
     упомянуты автором
   - Обнови draft с уведомлением "Copywriter: добавь ссылки на 
     [список]"
4. Проверь uniqueness — не должно быть дублированных внутренних 
   ссылок в одном параграфе

## Output
- Обновлённый draft (плейсхолдеры → URL)
- Обновление 05.REGISTRIES/concepts-map.md если появились новые страницы
- Отчёт в PROGRESS.md:
  * Batch X: N ссылок разрешено, M ожидают (pending_links)

## НИКОГДА
- Не разрешай [[concept:X]] в несуществующий URL — лучше в hub
- Не удаляй ссылки без замены — только замена или pending
- Не изменяй текст вокруг ссылки — только сам ссылочный анкор
```

### E.5. Обновлённый Astro Build workflow

```
build astro site-01-ro reviews

1. Активируй Builder + Linker
2. Найди все drafts со type: review и status: ready
3. LINKER: разреши все [[concept:X]] через concepts-map.md
4. BUILDER: собери Astro страницы:
   - Layout, компоненты, schema.org
   - Ссылки как <a href> с prefetch
   - Meta теги
5. npm run build проверка
6. Отчёт в PROGRESS.md:
   - N страниц собрано
   - K ссылок проставлено
   - M pending_links (ждут ready следующих страниц)
```

---

## <a name="часть-F"></a>👥 Часть F. Обновление ролей v3 → v4

### F.1. Изменения в существующих ролях

**`.cursor/rules/seo-expert.mdc`** — убрать блок `internal_links: [...]` из seo_plan.
Заменить на:
```yaml
semantic_concepts_to_link:
  - bonus-de-bun-venit@current_brand
  - aplicatie-mobila@current_brand  
  - top-case-de-pariuri
  - cum-sa-parieze-un-incepator
```

Copywriter будет использовать эти концепты как ориентир, вставляя `[[concept:X]]` плейсхолдеры.

**`.cursor/rules/copywriter.mdc`** — добавить:
```markdown
## Использование плейсхолдеров ссылок

Не пиши конкретные URL — пиши [[concept:X]]:
- [[concept:bonus-de-bun-venit@superbet]] — ссылка на конкретный bonus
- [[concept:top-case-de-pariuri]] — ссылка на rating hub
- [[concept:cota]] — ссылка на wiki-концепт

Linker разрешит их в URL на этапе Astro Build.

Минимум плейсхолдеров на странице: 5
Использовать концепты из seo_plan.semantic_concepts_to_link
Плюс добавлять свои если контекст требует.
```

**`.cursor/rules/builder.mdc`** — добавить триггер вызова Linker перед сборкой.

**`.cursor/rules/architect.mdc`** — добавить обязательное обновление PROGRESS.md после `propose batches`.

### F.2. Новая роль Linker (уже описана в E.4)

### F.3. Обновлённый список ролей v4

| Роль | Файл | Модель | Когда |
|---|---|---|---|
| 🧠 Architect | `architect.mdc` | Sonnet | Планирование, batch группировка |
| 🎨 Designer | `designer.mdc` | Sonnet | Дизайн-инвентаризация, спека |
| 🔍 SEO Expert | `seo-expert.mdc` | Sonnet | seo_plan для batch'а страниц |
| ✍️ Copywriter | `copywriter.mdc` | **Opus** | Copy draft секциями с плейсхолдерами |
| 🇷🇴 Linguist | `linguist.mdc` | Sonnet | Вычитка на нативность |
| 🔗 **Linker** | `linker.mdc` | Sonnet | **Перелинковка на этапе Build** |
| 🏗️ Builder | `builder.mdc` | Sonnet | Astro сборка (вызывает Linker) |

---

## <a name="часть-G"></a>🎯 Часть G. Практический пример: 500 URL от старта до финиша

### G.1. Разбивка на wave'ы

Условно 500 страниц финального сайта делятся так:

| Wave | Страниц | Тип | Timeline |
|---|---|---|---|
| **wave-0** | 5-7 | E-A-T (about, methodology, T&C) | Неделя 1 |
| **wave-1** | 85 | Foundation core (топ бренды, бонусы, гайды базовые) | Недели 2-3 |
| **wave-2** | 120 | Расширение (остальные бренды, приложения, платежи) | Недели 4-5 |
| **wave-3** | 100 | Sport, ratings, comparisons | Недели 6-7 |
| **wave-4** | 80 | Deep guides (strategii, psihologie, гид по каждому спорту) | Недели 8-9 |
| **wave-5** | 90 | News, calendar, calculator, аcademie (если approved) | Недели 10-12 |
| **wave-6** | 20 | Homepage + финальный полиш | Неделя 13 |
| **ИТОГО** | ~500 | | 3 месяца до полной Foundation |

Дальше — Фаза 2 (Content Expansion) и Фаза 3 (API прогнозы).

### G.2. Что делать прямо сейчас (начало wave-1)

Предполагая что установка v3 сделана, клипы собраны, style/design анализ проведён:

**День 1:**
```
propose batches for wave-1

Cursor:
[показывает план 8 batch'ей]

Вы: ok, но batch 4 разбить на 2

Cursor: обновил план, готов стартовать batch 1
```

**День 1-2:**
```
[SONNET] start batch 1: review × 10 (top brands)

Cursor:
- Читает досье 10 брендов
- Генерит 10 seo_plans (30 минут)
- Обновляет PROGRESS.md: batch 1 → SEO planned 10/10
- CHECKPOINT: показывает вам сводку 10 планов

Вы читаете 10 seo_plans → ok all (или правки)

[переключаете модель на OPUS]

Cursor:
- Пишет copy draft для #1 (Superbet) секциями
- После каждой секции показывает
- Идёт по всем 10 (4-8 часов работы)
- Обновляет PROGRESS.md после каждой готовой

Через день:
CHECKPOINT: все 10 copy-written

Вы читаете 10 черновиков → ok all

[переключаете модель обратно на SONNET]

Linguist check всех 10 (30-45 минут)

CHECKPOINT: все 10 linguist-checked

Финальный approval → все 10 ready
```

**День 3-4:**
```
[SONNET] start batch 2: bonus-page × 20

Аналогично, но batch крупнее.
```

**И так далее — весь wave-1 за 2-3 недели.**

**После wave-1:**
```
progress

Cursor:
✅ wave-1 complete: 85/85 pages ready (100%)
📊 Total site: 85/500 pages (17%)
🚀 Deployed: 0 (build ещё не запускали)
⏰ Ready for build: 85

Спросить: запустить build astro?
```

Вы решаете — билдить ли уже wave-1 или ждать больше страниц.

### G.3. Оценка ресурсов

**Cursor tokens (Opus для copy):**
- Средняя страница review: ~$0.30-0.50 tokens
- Средняя bonus/guide: ~$0.10-0.20
- 500 страниц Foundation: **~$100-150 tokens** за 3 месяца

**Firecrawl:**
- Один раз $16 (Hobby) для полного корпуса клипов
- Далее $16/мес если делаете quarterly recrawl

**Cursor Pro:** $20/мес

**Итого Foundation phase (3 месяца):**
- $60 Cursor subscriptions
- $48 Firecrawl (3 мес × $16)
- $100-150 Cursor tokens overage
- **Всего: ~$200-260 на 500 страниц** = $0.40-0.50 за страницу

Ручной копирайтинг такого объёма стоил бы $5000-15000. Экономия: **90%+.**

---

## 📋 Итоговый чек-лист внедрения v4

Прямо сейчас (после установки v3):

### Шаг 1: Дополнить файлы

- [ ] `05.REGISTRIES/batch-sizes.md` — размеры пакетов по типам
- [ ] `05.REGISTRIES/review-checkpoints.md` — режимы чекпоинтов (стартово strict)
- [ ] `05.REGISTRIES/concepts-map.md` — пустая заготовка

### Шаг 2: Обновить `.cursor/rules/`

- [ ] Обновить `seo-expert.mdc` — убрать internal_links, добавить semantic_concepts
- [ ] Обновить `copywriter.mdc` — добавить блок про плейсхолдеры
- [ ] Обновить `builder.mdc` — добавить вызов Linker
- [ ] Обновить `architect.mdc` — добавить обновление PROGRESS.md
- [ ] Создать НОВЫЙ `linker.mdc`

### Шаг 3: Обновить `.cursorrules`

- [ ] Добавить секцию PROGRESS TRACKING
- [ ] Добавить секцию CHECKPOINT ENFORCEMENT
- [ ] Добавить секцию BATCH WORKFLOW

### Шаг 4: Создать `PROGRESS.md` заготовку

- [ ] `07.SITES/site-01-ro/PROGRESS.md` — пустой с шаблонной структурой

### Шаг 5: Первый batch

- [ ] `propose batches for wave-1` — получить план
- [ ] Одобрить план
- [ ] `start batch 1: review × 10`
- [ ] Прошли через checkpoints
- [ ] 10 review страниц ready
- [ ] `progress` — проверить дашборд

Дальше — работа по накатанной, wave за wave'ой.

---

## 🎯 Финальные v4 напоминания

1. **Всё batch'ами, никогда по одной странице.** Даже если очень нужно единичную — временно ставите batch size = 1.
2. **PROGRESS.md — ваш главный экран.** Каждое утро начинайте с `progress`.
3. **Чекпоинты гибкие.** Начали strict → через 5 batch'ей → medium → через 15 → fast.
4. **Cursor предлагает batch'и, вы решаете.** Никогда не запускается сам.
5. **Ссылки — не в seo_plan, а через [[concept:X]] плейсхолдеры.** Linker разрешит в Astro Build.
6. **Модель для Copywriter — Opus. Всегда.** Sonnet для остального.
7. **500 страниц — 3 месяца.** Реалистичный timeline с качественным контентом.

---

## 📎 Приложение: полная структура пакета v4 (объединено с v3)

```
review-empire/
├── .cursorrules                       # v3 + v4 дополнения
├── .cursor/rules/
│   ├── brands-vs-competitors.mdc      # v3
│   ├── architect.mdc                  # v3 + v4 (обновлён)
│   ├── designer.mdc                   # v3
│   ├── seo-expert.mdc                 # v3 + v4 (обновлён)
│   ├── copywriter.mdc                 # v3 + v4 (обновлён)
│   ├── linguist.mdc                   # v3
│   ├── linker.mdc                     # ★ v4 НОВОЕ
│   └── builder.mdc                    # v3 + v4 (обновлён)
├── .env
├── 01.RAW/
│   └── ... (v3)
├── 02.WIKI/
│   └── ... (v3)
├── 03.SEO/
│   ├── keyword-research.md
│   ├── content-cluster-map.md
│   ├── master-plan.md
│   └── ...
├── 04.BRANDS/
├── 04.5.REVIEW-COMPETITORS/
├── 05.REGISTRIES/
│   ├── page-types.md                  # v3
│   ├── section-blocks.md              # v3
│   ├── ui-patterns.md                 # v3
│   ├── content-rules.md               # v3
│   ├── batch-sizes.md                 # ★ v4 НОВОЕ
│   ├── review-checkpoints.md          # ★ v4 НОВОЕ
│   └── concepts-map.md                # ★ v4 НОВОЕ
├── 05.TEMPLATES/
├── 06.DESIGN/
├── 07.SITES/
│   └── site-01-ro/
│       ├── PROGRESS.md                # ★ v4 НОВОЕ — авто-обновляется Cursor
│       ├── src/
│       │   ├── content/
│       │   │   ├── config.ts          # схема drafts collection
│       │   │   └── drafts/            # тексты в pipeline
│       │   └── pages/                 # финальные Astro страницы
│       └── ...
├── 08.PBN/
├── 09.API/
├── scripts/
│   └── firecrawl-batch.js
└── logs/
```
