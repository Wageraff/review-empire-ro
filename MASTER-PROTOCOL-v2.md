# 🏗️ Мастер-протокол v2: гибридный review-сайт румынских букмекеров

> **Стек:** macOS + Cursor + Obsidian + Ahrefs + Screaming Frog + Firecrawl
>
> **Продукт:** гибридный review-сайт с масштабированием до **тысяч страниц** (после подключения API прогнозов). Стартовый объём — 150-200 страниц, дальше рост без верхнего лимита.
>
> **Идеология:** LLM Wiki по модели А. Карпатого — [gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). Obsidian = IDE, Cursor = программист, Wiki = codebase.

---

## 🔑 Ключевые термины (важно не путать!)

| Термин | Что это | Пример | Где хранится |
|---|---|---|---|
| **Бренды / Букмекеры** | Операторы азартных игр, о которых мы **пишем обзоры**. Наши партнёры для affiliate, ГЕРОИ контента | Superbet, Betano, Unibet, Fortuna | `04.BRANDS/` |
| **Review-конкуренты** | Сайты-обзорники, с которыми мы **боремся за трафик**. У них учимся структуре | legalbet.ro, beturi.ro, 10pariuri.ro | `04.5.REVIEW-COMPETITORS/` |
| **Wiki** | Живая база знаний, компилируется автоматически. НЕ финальный сайт | Концепты, синтезы, кросс-ссылки | `02.WIKI/` |
| **Site content** | Финальные страницы сайта, генерятся Cursor'ом | Astro `.md`/`.astro` файлы | `07.SITES/<site>/` |

> ⚠️ **Не путайте:** бренды букмекеров ≠ конкуренты. Конкуренты — это review-сайты, у которых мы отгрызаем трафик.

---

## 📑 Оглавление

- [Часть 0. Философия и фазы роста](#часть-0)
- [Часть 1. Установка окружения](#часть-1)
- [Часть 2. Структура vault + `.cursorrules`](#часть-2)
- [Часть 3. Wiki: разделы под гибридный сайт](#часть-3)
- [Часть 4. Форматы досье для всех типов сущностей](#часть-4)
- [Часть 5. Discovery конкурентов через Screaming Frog](#часть-5)
- [Часть 6. Автоклиппинг через Firecrawl](#часть-6)
- [Часть 7. Ahrefs — свои SEO-данные](#часть-7)
- [Часть 8. Ingest-серия: заполняем Wiki](#часть-8)
- [Часть 9. Работа с картинками](#часть-9)
- [Часть 10. Генерация сайта на Astro](#часть-10)
- [Часть 11. Деплой на Cloudflare](#часть-11)
- [Часть 12. Регулярная работа и масштабирование](#часть-12)

---

## <a name="часть-0"></a>🧠 Часть 0. Философия и фазы роста

### Три фазы жизни сайта

```
┌───────────────────────────────────────────────────────────────┐
│  ФАЗА 1: Foundation (недели 1-4)                              │
│  150-200 стартовых страниц                                    │
│  • Обзоры букмекеров (15-20)                                  │
│  • Каталог бонусов (30-50)                                    │
│  • Гайды (15-25)                                              │
│  • Sport-hubs (6-10)                                          │
│  • Приложения-hub (5-10)                                      │
│  • Рейтинги (5-8)                                             │
│  • E-A-T страницы (7)                                         │
│  • Заглушки под прогнозы                                      │
└───────────────────────────────────────────────────────────────┘
                              ↓
┌───────────────────────────────────────────────────────────────┐
│  ФАЗА 2: Content Expansion (недели 5-12)                      │
│  500-1500 страниц                                             │
│  • Расширение гайдов (стратегии, глубокие темы)               │
│  • Обзоры конкретных приложений                               │
│  • Гиды по методам оплаты                                     │
│  • Гиды по видам ставок для каждого спорта                    │
│  • Comparison-страницы (X vs Y)                               │
│  • News/блог секция                                           │
│  • Landing под каждый бонус × букмекер                        │
└───────────────────────────────────────────────────────────────┘
                              ↓
┌───────────────────────────────────────────────────────────────┐
│  ФАЗА 3: API-Powered Growth (месяцы 4+)                       │
│  1000-10000+ страниц                                          │
│  • Ежедневные прогнозы через API                              │
│  • Страница под каждый матч (по спорту, по лиге)              │
│  • Live cotes (динамические)                                  │
│  • Автоматические сравнения коэффициентов                     │
│  • Pontul Zilei / Biletul Zilei (обновляется ежедневно)       │
│  • Статистика (auto-generated из API)                         │
└───────────────────────────────────────────────────────────────┘
```

**Вывод: нет верхнего лимита страниц.** Мастер-протокол описывает Фазу 1 подробно, Фазы 2-3 — как расширяются те же паттерны.

### Ключевые принципы

1. **Curator = вы, Programmer = Cursor.** Вы направляете, Cursor пишет весь код и контент
2. **Wiki накапливается, не переписывается.** Новый источник противоречит старому → создаётся заметка о противоречии
3. **Один источник = 10-15 wiki-страниц.** Норма для Карпатовского ingest
4. **Human-in-the-loop.** Cursor всегда показывает план перед массовыми изменениями
5. **Discovery-first.** Структура сайта строится ПОСЛЕ анализа конкурентов, а не до
6. **Immutable RAW.** Сырьё (`01.RAW/`) никогда не удаляется — источник истины
7. **Wiki ≠ сайт.** Wiki — это знания; сайт — это генерация из знаний

---

## <a name="часть-1"></a>🟢 Часть 1. Установка окружения

### 1.1. Homebrew + утилиты

```bash
# Homebrew (если ещё нет)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# Основные утилиты
brew install node git ripgrep imagemagick exiftool webp pandoc wget

# Проверка
node -v && npm -v
```

> ⚠️ **Если `npm init` падает с `Class extends value undefined`:**
> ```bash
> brew uninstall --ignore-dependencies node
> rm -rf ~/.npm ~/.node-gyp
> brew install node
> ```

### 1.2. Obsidian

1. https://obsidian.md → скачать
2. Create new vault → `review-empire` → `~/Documents/review-empire`
3. Community plugins → включить → установить:
   - **Dataview** (динамические таблицы по frontmatter)
   - **Templater** (шаблоны)
   - **Advanced Tables**
   - **Local Images Plus** (авто-скачивание картинок из клипов)
4. Settings → Files and links → Attachment folder path = `./imgs`
5. Settings → Hotkeys → «Download attachments for current file» → `Cmd+Shift+D`

### 1.3. Cursor

1. https://cursor.com → скачать
2. File → Open Folder → `~/Documents/review-empire`
3. Trust folder → Yes
4. Settings → Plans → Cursor Pro ($20/мес)
5. Выбрать модель Claude 4.5 Sonnet

### 1.4. Web Clipper (для точечных клипов позже)

Chrome/Brave: https://obsidian.md/clipper → установить → в настройках Vault: `review-empire`.

Создать 5 шаблонов клиппера с URL-триггерами и папками — см. Часть 5.

---

## <a name="часть-2"></a>🟢 Часть 2. Структура vault + `.cursorrules`

### 2.1. Полная структура папок

```bash
# В корне vault:
mkdir -p 00.SYSTEM
mkdir -p 01.RAW/{ahrefs/{keywords,seeds},regulatory,assets}
mkdir -p 01.RAW/web-clips/{reviews,bonuses,guides,ratings,sport-categories,apps,payments}
mkdir -p 01.RAW/web-clips/{reviews,bonuses,guides,ratings,sport-categories,apps,payments}/imgs
mkdir -p 01.RAW/discovery/{legalbet,beturi,10pariuri,pontul-zilei,biletu-zilei,pariurix,xbets,pariuriexpert}
mkdir -p 02.WIKI/{brands,bonuses,sports,payments,apps,guides-concepts,regulatory,seo,glossary}
mkdir -p 03.SEO
mkdir -p 04.BRANDS
mkdir -p 04.5.REVIEW-COMPETITORS
mkdir -p 05.TEMPLATES/prompts
mkdir -p 06.DESIGN
mkdir -p 07.SITES
mkdir -p 08.PBN
mkdir -p 09.API
mkdir -p scripts
mkdir -p logs
```

**Пояснения по ключевым папкам:**

| Папка | Что там | Кто её пишет |
|---|---|---|
| `01.RAW/` | Immutable сырьё (Ahrefs CSV, клипы, PDF ONJN) | Вы (Screaming Frog + Firecrawl + Ahrefs export) |
| `02.WIKI/` | Живая база знаний с cross-links | Cursor (по ingest'ам) |
| `03.SEO/` | Стратегия сайта (keyword-research, master-plan) | Cursor |
| `04.BRANDS/` | Досье букмекеров-брендов (Superbet, Betano…) | Cursor |
| `04.5.REVIEW-COMPETITORS/` | Досье review-сайтов-конкурентов (legalbet, beturi…) | Cursor |
| `05.TEMPLATES/` | Шаблоны страниц + готовые промпты | Вы + Cursor |
| `07.SITES/<site>/` | Финальный Astro-сайт | Cursor |

### 2.2. Полный `.cursorrules`

Создайте `.cursorrules` в корне vault:

```markdown
# Review Empire — Cursor System Rules

## ROLE
Ты — senior SEO-инженер и контент-стратег для гибридного review-сайта
в нише "ставки на спорт" (ГЕО: Румыния). Пишешь обзоры букмекеров,
каталоги бонусов, спорт-хабы, гайды, обзоры приложений и методов оплаты.
Работаешь по модели LLM Wiki А. Карпатого:
Obsidian = IDE, ты = программист, Wiki = codebase.

## КРИТИЧЕСКИЕ ТЕРМИНЫ (не путать!)

- **BRANDS / БУКМЕКЕРЫ** — операторы (Superbet, Betano, Unibet…),
  о которых мы пишем ОБЗОРЫ. Наши "герои", возможные affiliate-партнёры.
  Досье в 04.BRANDS/. НЕ называй их "конкурентами".

- **REVIEW-COMPETITORS / КОНКУРЕНТЫ** — сайты (legalbet.ro,
  beturi.ro, 10pariuri.ro…), с которыми мы боремся за трафик.
  Досье в 04.5.REVIEW-COMPETITORS/. У них мы учимся структуре
  и семантике, но НЕ копируем контент.

## LANGUAGE RULES
- Wiki-страницы и контент сайтов — на РУМЫНСКОМ (ro-RO)
- Коммуникация со мной — на РУССКОМ
- Идиомы: pariuri sportive, cote, bonus de bun venit, rulaj,
  rotiri gratuite, casă de pariuri, operator, retragere
- Диакритика обязательна: ă, â, î, ș, ț
- Запрещённые AI-клише: "În concluzie", "Este important de menționat",
  "Pe scurt", "Merită menționat faptul că", "В заключение", "Стоит отметить"

## DIRECTORY MAP

### Сырьё (immutable)
- 01.RAW/ahrefs/          — SEO-данные Ahrefs
- 01.RAW/discovery/       — CSV Screaming Frog + классифицированные txt
- 01.RAW/web-clips/       — клипы конкурентов (Firecrawl/Web Clipper)
  - reviews/              — обзоры букмекеров от конкурентов
  - bonuses/              — бонусные лендинги
  - guides/               — гайды конкурентов
  - ratings/              — рейтинговые страницы
  - sport-categories/     — /pariuri-fotbal/, /pariuri-tenis/…
  - apps/                 — обзоры мобильных приложений
  - payments/             — гайды по методам оплаты
  - каждая подпапка имеет свою imgs/ с _index.json
- 01.RAW/regulatory/      — ONJN, законы
- 01.RAW/assets/          — обработанные картинки на букмекера

### Wiki (Cursor пишет)
- 02.WIKI/index.md        — КАТАЛОГ Wiki, читать первым при query
- 02.WIKI/log.md          — журнал операций
- 02.WIKI/brands/         — страницы про каждого букмекера (концепт)
- 02.WIKI/bonuses/        — концепты типов бонусов
- 02.WIKI/sports/         — концепты видов спорта
- 02.WIKI/payments/       — концепты методов оплаты
- 02.WIKI/apps/           — концепты приложений
- 02.WIKI/guides-concepts/— базовые концепты (cotă, rulaj, value-betting)
- 02.WIKI/regulatory/     — ONJN, налог, joc responsabil
- 02.WIKI/seo/            — SEO-кластеры и стратегии
- 02.WIKI/glossary/       — глоссарий терминов

### Стратегия и досье
- 03.SEO/                 — keyword-research, cluster-map, master-plan
- 04.BRANDS/              — досье букмекеров (1 файл = 1 бренд)
- 04.5.REVIEW-COMPETITORS/— досье review-сайтов-конкурентов
- 05.TEMPLATES/           — шаблоны + промпты
- 06.DESIGN/              — спеки, компоненты
- 07.SITES/               — Astro-проекты
- 08.PBN/                 — anti-detect правила
- 09.API/                 — конфиги API прогнозов (позже)
- scripts/                — Node.js скрипты
- logs/                   — логи

## CORE WORKFLOWS (модель Карпатого)

### ingest <путь>
1. Прочитай указанные файлы в 01.RAW/
2. Выдели ключевые смысловые точки
3. ОБСУДИ со мной key takeaways ПЕРЕД записью
4. Создай/обнови wiki-страницы в СООТВЕТСТВУЮЩИХ подпапках 02.WIKI/:
   - Про букмекера → 02.WIKI/brands/<slug>.md
   - Про бонус-концепт → 02.WIKI/bonuses/<slug>.md
   - Про спорт → 02.WIKI/sports/<slug>.md
   - и т.д.
5. Один источник может затронуть 10-15 страниц — норма
6. Проставь cross-links через [[wiki-link]]
7. Обнови 02.WIKI/index.md (соотв. категория + one-line summary)
8. Допиши в 02.WIKI/log.md:
   ## [YYYY-MM-DD] ingest | <source>
   - changed pages: [[page1]], [[page2]]
9. Противоречия старым данным — НЕ удаляй молча, создай заметку

### query <вопрос>
1. ВСЕГДА начни с 02.WIKI/index.md
2. Рекурсивно пройди по cross-links к релевантным страницам
3. Собери полный контекст, дай ответ со ссылками [[на страницы]]
4. Ценный синтез — предложи сохранить как новую wiki-страницу

### lint
1. Найди: дубли, противоречия, сирот, unlinked концепты, устаревшее,
   пробелы в данных
2. Покажи список, жди "Fix all"
3. Предложи 3-5 новых вопросов для исследования

### discovery <домен>
1. Screaming Frog вручную (я делаю)
2. После CSV — работай из 01.RAW/discovery/<домен>/
3. См. DISCOVERY WORKFLOW ниже

### autoclip <тип>
См. FIRECRAWL AUTOMATION ниже

### generate-site <site-name>
1. Прочитай 03.SEO/master-plan.md
2. Возьми дизайн из 06.DESIGN/<site-name>-spec.md
3. Создай/обнови Astro-проект в 07.SITES/<site-name>/
4. Следуй anti-detect правилам из 08.PBN/
5. Проверь npm run build без ошибок

## PAGE TYPES REGISTRY (типы страниц сайта)

### REVIEW (обзор бренда/букмекера)
- URL: /recenzii/<brand-slug>
- Файл: 07.SITES/<site>/src/content/reviews/<slug>.md
- Шаблон: 05.TEMPLATES/review-page.md
- Длина: 3000-5000 слов
- Секции: hero, quick-rating, licenta ONJN, bonus, sport disponibil,
  aplicatie mobila, plati, suport, avantaje-dezavantaje, concluzie, FAQ
- Schema.org: Review + Organization
- Cross-links: 5-8 (другие reviews, bonus-pages этого бренда, гайды)
- Источник данных: 04.BRANDS/<slug>.md + wiki + клипы

### BONUS-PAGE (одна конкретная бонус-оферта)
- URL: /bonusuri/<categorie>/<brand-slug>
- Пример: /bonusuri/bonus-de-bun-venit/superbet
- Шаблон: 05.TEMPLATES/bonus-page.md
- Длина: 1500-2500 слов
- Секции: bonus details (suma, cod, rulaj), cum activezi step-by-step,
  termeni cheie, avantaje-dezavantaje, comparație cu 2-3 alte, FAQ
- Schema.org: Offer + Product
- Cross-links: обязательный на review этого бренда

### BONUS-CATEGORY-HUB (категория бонусов)
- URL: /bonusuri/<categorie>
- Пример: /bonusuri/bonus-de-bun-venit
- Шаблон: 05.TEMPLATES/category-hub.md
- Длина: 1200-2000 слов
- Секции: определение, comparativ table, cum să alegi, top-3, termeni

### RATING (топ / рейтинговый список)
- URL: /top-<criteriu> (напр. /top-case-de-pariuri, /top-bonusuri,
  /top-aplicatii, /top-plati-rapide)
- Файл: 07.SITES/<site>/src/content/ratings/<slug>.md
- Шаблон: 05.TEMPLATES/rating-page.md
- Длина: 2000-3500 слов
- Секции: методология рейтинга, TOP-N (таблица с фильтрами),
  детальный обзор каждого места, критерии, FAQ
- Schema.org: ItemList + Review
- Обновление: каждые 2-3 месяца (в frontmatter: `updated`)

### APP-REVIEW (обзор мобильного приложения)
- URL: /aplicatii/<brand-slug>
- Файл: 07.SITES/<site>/src/content/apps/<slug>.md
- Шаблон: 05.TEMPLATES/app-page.md
- Длина: 1500-2500 слов
- Секции: iOS/Android доступность, требования, установка step-by-step,
  функции, live-betting, интерфейс (screenshots), безопасность,
  плюсы-минусы, оценка, FAQ
- Schema.org: SoftwareApplication
- Cross-links: review этого бренда + сравнение с другими apps

### APP-HUB (обзор всех приложений)
- URL: /aplicatii/
- Список всех APP-REVIEW + сравнительная таблица + гайд по установке

### PAYMENT-METHOD (обзор метода оплаты)
- URL: /metode-de-plata/<method-slug>
- Пример: /metode-de-plata/netopia, /metode-de-plata/skrill
- Длина: 1200-2000 слов
- Секции: описание метода, как работает, комиссии, скорость,
  безопасность, у каких букмекеров доступен (таблица),
  step-by-step депозит/вывод, лимиты, FAQ
- Schema.org: HowTo + FinancialProduct
- Cross-links: bookmakers использующие этот метод

### GUIDE-PAGE (гайд)
- URL: /ghiduri/<categorie>/<slug>
- Пример: /ghiduri/notiuni-de-baza/ce-este-o-cota
- Шаблон: 05.TEMPLATES/guide-page.md
- Длина: 1500-3000 слов
- Секции: introducere, основные разделы, exemple practice (с числами!),
  erori comune, concluzie, FAQ, related guides
- Schema.org: HowTo или Article
- ВАЖНО: гайды НЕ рекламируют конкретных букмекеров абстракция!
- Категории: notiuni-de-baza, strategii, gestionarea-banilor,
  psihologie, dictionar-de-pariuri

### SPORT-CATEGORY (спорт-хаб)
- URL: /sport/<sport>
- Пример: /sport/fotbal, /sport/tenis
- Шаблон: 05.TEMPLATES/sport-category.md
- Длина: 2000-3500 слов
- Секции: intro, tipuri de pariuri specifice, top-5 case pentru <sport>,
  strategii, bonusuri specifice, gid pentru începători,
  blok predicţii (заглушка под API), FAQ

### PREDICTION (прогноз матча)
- URL: /ponturi/<sport>/<match-slug>
- Пример: /ponturi/fotbal/fcsb-vs-cfr-cluj-2026-11-15
- ФАЗА 1: только заглушки. ФАЗА 3: генерация через API.
- Schema.org: SportsEvent

### DAILY-DIGEST (Pontul Zilei, Biletul Zilei)
- URL: /ponturi/pontul-zilei, /ponturi/biletul-zilei
- ФАЗА 1: только каркас. ФАЗА 3: обновляется ежедневно через API

### COMPARISON (X vs Y)
- URL: /vs/<brand-a>-vs-<brand-b>
- Пример: /vs/superbet-vs-betano
- Длина: 2000-3000 слов
- Сравнительная таблица + детальный анализ по 10 критериям
- Часто ищется — high-value для SEO

### E-A-T PAGES (обязательны для беттинга YMYL)
- /despre-noi, /metodologie, /joc-responsabil, /termeni-si-conditii,
  /politica-de-confidentialitate, /contact
- 800-1500 слов каждая
- Живой тон, имена авторов, фото команды

## PAGE FORMAT (для wiki-страниц)
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

## CROSS-LINKING RULES

### Обязательные связи между типами:
- Review бренда → его bonus-pages (все, минимум 2)
- Review бренда → app-review этого бренда
- Review бренда → релевантные guides (минимум 3)
- Review бренда → главная / rating
- Bonus-page → review этого бренда + 2-3 других бонуса категории
- App-review → review этого бренда + сравнения приложений
- Payment-method → bookmakers использующие этот метод
- Guide → 3-5 related guides + глоссарий
- Guide → NEVER промо-ссылки напрямую на букмекеров
- Sport-category → top-5 бренды для этого спорта + guides + predictii
- Rating → все листинги в топе + методология
- Comparison → оба бренда review + related comparisons

## SEO RULES
- Title: 50-60 симв, целевой кейворд на ro в начале
- Meta description: 150-160 симв
- H1: один, содержит кейворд
- Внутренняя перелинковка: минимум 5 ссылок на странице
- Schema.org: соответствующий типу (см. PAGE TYPES REGISTRY)
- Hreflang: ro-RO

## ANTI-DETECT (для сетки сайтов)
- Rewrite ≥75% между сайтами
- Разная HTML-структура, имена CSS-классов
- Разные favicon, logo, палитра
- Whois-приватность
- Разные тексты T&C, About, Methodology
- Гайды: rewrite ≥85%
- Картинки: разные варианты трансформации (см. IMAGE STRATEGY)

## DISCOVERY WORKFLOW

Когда я говорю "объедини URLs из discovery":

1. Найди все CSV в 01.RAW/discovery/*/
2. Прочти (колонки Screaming Frog: Address, Status Code, Title, Depth,
   Content-Length, Word Count и т.д.)
3. Фильтр:
   - Status Code == 200
   - Content Type == text/html
   - НЕ содержит: /tag/, /author/, /page/, /?, /login, /register, /cart
4. Классифицируй по URL-паттернам:
   - reviews: /recenzie/, /review/, /casa-de-pariuri/
   - bonuses: /bonus/, /promotii/, /oferta/, /cashback/, /rotiri/
   - guides: /ghid/, /scoala/, /dictionar/, /cum-sa/, /ce-este/, /strategi/
   - ratings: /top-, /clasament/, /cele-mai-bune/
   - sport: /pariuri-fotbal/, /pariuri-tenis/, /pariuri-baschet/, /pariuri-hochei/
   - apps: /aplicatie/, /mobile/, /app-mobil/
   - payments: /metode-de-plata/, /skrill/, /netopia/, /paysafecard/
5. Сохрани:
   - 01.RAW/discovery/urls-<тип>.txt (по одному на тип)
   - 01.RAW/discovery/urls-all.csv (сводный)
6. Дедупликация по URL (тот же URL с разных сайтов — оставить 3-5)
7. Отчёт: сколько URL в каждой категории, распределение по доменам

## FIRECRAWL AUTOMATION

Когда я говорю "autoclip <тип>":

1. Проверь 01.RAW/discovery/urls-<тип>-priority.txt
2. Проверь FIRECRAWL_API_KEY в .env
3. Сводка: URL count, credits estimate, время, куда save
4. Жди "поехали"
5. Запусти: cd scripts && npm run batch-<тип>
6. Мониторь через tail -f logs/firecrawl-*.log
7. Постобработка автоматом:
   - Клипы < 500 слов → 01.RAW/web-clips/<тип>/_trash/
   - Ошибочные HTTP → _errors/
   - Классификация: brand (по контенту, не URL), content_subtype
   - Frontmatter: brand, content_subtype, word_count, quality_score
8. Финальный отчёт

## IMAGE INDEX WORKFLOW

Каждая папка 01.RAW/web-clips/<тип>/imgs/ имеет _index.json:
{
  "last_updated": "YYYY-MM-DD",
  "category": "reviews | bonuses | guides | ratings | sport-categories | apps | payments",
  "total_indexed": N,
  "images": [
    {
      "file": "img-abc123.png",
      "brand": "superbet | null",
      "type": "logo | screenshot-main | screenshot-bonus | screenshot-app | 
              screenshot-payment | photo | banner | icon",
      "theme": "keyword-on-romanian",
      "width": 1440, "height": 900,
      "quality": 1-10,
      "usable": true
    }
  ]
}

### При "reindex images":
1. Работай по всем 7 папкам параллельно
2. Batches по 20 картинок
3. Обновляй _index.json атомарно (temp + mv)

### При "index new images" (инкрементал):
1. Читай _index.json, diff с ls
2. Индексируй только новые
3. Не трогай уже индексированные

### При написании страницы:
- Определи тип страницы → какие индексы читать:
  - Review бренда: reviews/imgs + bonuses/imgs (для блока бонусов) +
    apps/imgs (для блока приложения)
  - Bonus-page: bonuses/imgs + reviews/imgs (для logo)
  - App-review: apps/imgs + reviews/imgs
  - Payment-method: payments/imgs + reviews/imgs
  - Guide: guides/imgs
  - Sport-hub: sport-categories/imgs + reviews/imgs
  - Rating: reviews/imgs (для миниатюр брендов)
- Приоритет: usable=true + quality 9-10
- Если нет — отметь: images_needed: ["описание"] в frontmatter

### Обработка (уникализация):
- Исходник: 01.RAW/web-clips/<тип>/imgs/<original>.png (immutable!)
- Копия в: 01.RAW/assets/<brand>/<original>.png
- Обработка: scripts/process-clip-image.sh
- Финал: 07.SITES/<site>/public/images/<brand>/<seo-name>.webp

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

## ALWAYS ASK BEFORE
- Удалять страницы из 02.WIKI/
- Деплоить на продакшен
- Массовые правки в нескольких сайтах одновременно

## NEVER
- Не пиши контент на английском для румынского сайта
- Не дублируй контент между сайтами без rewrite ≥75%
- Не используй AI-клише
- Не удаляй файлы в 01.RAW/
- Не переиспользуй картинки между сайтами без trans variant
- Не называй букмекеров "конкурентами" — они BRANDS
```

### 2.3. `.cursor/rules/` (контекстные правила)

```bash
mkdir -p .cursor/rules
```

**`.cursor/rules/wiki-pages.mdc`:**
```markdown
---
description: Правила для wiki-страниц
globs: 02.WIKI/**/*.md
alwaysApply: false
---
# Wiki Pages Rules
- ОБЯЗАТЕЛЬНО YAML-frontmatter (PAGE FORMAT в .cursorrules)
- Минимум 3 cross-links [[link]] на странице
- Type ДОЛЖЕН соответствовать подпапке
- После создания — добавь в 02.WIKI/index.md в нужную секцию
```

**`.cursor/rules/romanian-content.mdc`:**
```markdown
---
description: Правила румынского контента
globs: 07.SITES/**/*.{md,mdx,astro,html}, 02.WIKI/**/*.md
alwaysApply: false
---
# Romanian Content Rules
- Язык: ro-RO
- Диакритика: ă, â, î, ș, ț
- Числа: 1.000.000 (точка = разделитель)
- Валюта: RON / lei
- Даты: DD.MM.YYYY
```

**`.cursor/rules/brands-vs-competitors.mdc`:**
```markdown
---
description: Не путать бренды и конкурентов
alwaysApply: true
---
# CRITICAL: Brands ≠ Review-competitors

- Superbet, Betano, Unibet, Fortuna, Mozzart, Casa Pariurilor,
  NetBet, Efbet, Winbet, MaxBet, PublicWin, Baumbet, 888,
  MagicJackpot, Princess-bet — это BRANDS. Досье → 04.BRANDS/
  
- legalbet.ro, beturi.ro, 10pariuri.ro, pontul-zilei.com,
  biletu-zilei.com, pariurix.com, xbets.ro, pariuriexpert.ro —
  это REVIEW-COMPETITORS. Досье → 04.5.REVIEW-COMPETITORS/

- В общении не используй "конкурент" для брендов — говори
  "букмекер" или "бренд" или "оператор"
```

### 2.4. Git init

```bash
git init

cat > .gitignore << 'EOF'
.obsidian/workspace*
.obsidian/cache
01.RAW/assets/
07.SITES/*/node_modules/
07.SITES/*/dist/
07.SITES/*/.astro/
scripts/node_modules/
scripts/package-lock.json
logs/*.log
.env
.env.local
.DS_Store
EOF

git add .
git commit -m "Initial: vault structure + Cursor rules"
```

---

## <a name="часть-3"></a>📚 Часть 3. Wiki: разделы под гибридный сайт

### Что такое `02.WIKI/index.md` — назначение

По модели Карпатого `index.md` — это **каталог всей Wiki**. Cursor читает его **первым при любом query**, чтобы найти релевантные страницы.

**Без index.md** Cursor будет искать вслепую по всем файлам.
**С index.md** Cursor знает точно куда идти.

### Структура `02.WIKI/index.md` под гибридный сайт

Создайте этот файл сразу после создания папок:

```bash
cat > 02.WIKI/index.md << 'EOF'
# Wiki Index

> Каталог живой базы знаний. Cursor читает первым при любом query.
> Формат: `[[link]] — one-line summary`

---

## 🏢 Букмекеры (Brands)
> Концептуальные страницы про каждого букмекера-оператора.
> Детальные досье с рейтингами: 04.BRANDS/

_(заполнится через ingest 04.BRANDS/)_

---

## 🎁 Бонусы — концепты типов
> Что такое каждый тип бонуса, типичные условия, специфика RO рынка

_(заполнится через ingest клипов bonuses)_

- `[[bonuses/bonus-de-bun-venit]]` — приветственный бонус
- `[[bonuses/fara-depunere]]` — no-deposit бонусы  
- `[[bonuses/cashback]]` — кэшбэк
- `[[bonuses/rotiri-gratuite]]` — фри-спины / фри-беты
- `[[bonuses/pariu-fara-risc]]` — risk-free
- `[[bonuses/incarcare]]` — reload
- `[[bonuses/vip-loialitate]]` — VIP программы

---

## ⚽ Виды спорта — концепты для ставок
> Специфика ставок на каждый вид, популярные лиги в RO

- `[[sports/fotbal]]` — футбол (60% рынка RO)
- `[[sports/tenis]]` — теннис (Simona Halep эффект)
- `[[sports/baschet]]` — баскетбол
- `[[sports/handbal]]` — гандбол
- `[[sports/hochei]]` — хоккей
- `[[sports/formula-1]]` — F1
- `[[sports/esports]]` — киберспорт
- `[[sports/volei]]` — волейбол
- `[[sports/rugby]]` — регби

---

## 💳 Методы оплаты
> Специфика платёжных систем для беттинга в RO

- `[[payments/netopia]]` — Netopia (локальный RO)
- `[[payments/mobilpay]]` — mobilPay (локальный RO)
- `[[payments/skrill]]` — Skrill
- `[[payments/neteller]]` — Neteller
- `[[payments/paysafecard]]` — Paysafecard
- `[[payments/carduri-bancare]]` — Visa/Mastercard
- `[[payments/criptomonede]]` — Bitcoin, Ethereum (если применимо)
- `[[payments/transfer-bancar]]` — банковский перевод

---

## 📱 Мобильные приложения
> Общие концепты про приложения букмекеров (iOS/Android)

- `[[apps/aplicatie-android]]` — Android специфика (APK, доступ)
- `[[apps/aplicatie-ios]]` — iOS специфика
- `[[apps/live-betting-mobil]]` — live-беттинг в приложениях
- `[[apps/cash-out-mobil]]` — cash-out в приложениях
- `[[apps/securitate-mobil]]` — безопасность мобильных приложений

---

## 📖 Базовые концепты (для гайдов)
> Cursor использует при написании гайдов и обзоров

- `[[guides-concepts/cota]]` — что такое коэффициент
- `[[guides-concepts/rulaj-rollover]]` — рулаж/отыгрыш
- `[[guides-concepts/value-betting]]` — value-стратегия
- `[[guides-concepts/martingale]]` — Martingale стратегия
- `[[guides-concepts/bankroll]]` — управление банкроллом
- `[[guides-concepts/kelly-criterion]]` — критерий Келли
- `[[guides-concepts/pariuri-1x2]]` — 1x2 ставки
- `[[guides-concepts/pariuri-handicap]]` — handicap
- `[[guides-concepts/pariuri-over-under]]` — over/under
- `[[guides-concepts/live-betting]]` — live-ставки
- `[[guides-concepts/cash-out]]` — cash-out
- `[[guides-concepts/pariuri-multiple]]` — экспрессы/systems

---

## 📊 SEO-кластеры и стратегия
> Тематические кластеры + анализ рынка

- `[[seo/cluster-recenzii-case-pariuri]]` — обзоры букмекеров
- `[[seo/cluster-bonusuri]]` — бонусные запросы
- `[[seo/cluster-cum-sa-pariez]]` — обучающие запросы
- `[[seo/cluster-aplicatii]]` — мобильные приложения
- `[[seo/cluster-metode-plata]]` — способы оплаты
- `[[seo/cluster-sport-specific]]` — по видам спорта
- `[[seo/cluster-ponturi-predictii]]` — прогнозы (для Фазы 3)
- `[[seo/content-gap-analysis]]` — упущенные темы

---

## ⚖️ Регуляторика (Румыния)
> Юридические аспекты, налоги, ответственная игра

- `[[regulatory/onjn-oficiul]]` — регулятор ONJN
- `[[regulatory/licenta-clasa-1]]` — лицензии Класса I
- `[[regulatory/impozit-castiguri]]` — налог на выигрыш (Legea 227/2015)
- `[[regulatory/varsta-legala]]` — 18+ и верификация
- `[[regulatory/joc-responsabil]]` — ответственная игра, autoexcludere
- `[[regulatory/spalarea-banilor]]` — AML/KYC требования
- `[[regulatory/publicitate]]` — правила рекламы азартных игр

---

## 📖 Глоссарий (термины)
> Единая точка для всех терминов индустрии

- `[[glossary/index]]` — алфавитный указатель
- `[[glossary/cote-si-cotari]]` — коэффициенты и котировки
- `[[glossary/tipuri-pariuri]]` — типы ставок
- `[[glossary/termeni-bonus]]` — терминология бонусов

---

## 🔗 Внешние ссылки на детальные досье
- **Букмекеры (детальные досье):** 04.BRANDS/
- **Review-конкуренты (анализ сайтов):** 04.5.REVIEW-COMPETITORS/
- **Стратегия сайта:** 03.SEO/
EOF
```

**Аналогично создайте `02.WIKI/log.md`:**

```bash
cat > 02.WIKI/log.md << 'EOF'
# Wiki Log

> Append-only журнал операций. Формат:
> ## [YYYY-MM-DD] operation | source
> - Changed pages: [[page1]], [[page2]]

## [YYYY-MM-DD] init | Wiki created
- Empty structure initialized with 9 categories
- Waiting for first ingest
EOF
```

Замените `YYYY-MM-DD` на сегодняшнюю дату.

---

## <a name="часть-4"></a>📋 Часть 4. Форматы досье для всех типов сущностей

Не только `COMPETITOR DOSSIER FORMAT`, а **полный набор форматов** для каждого типа. Сохраните их как шаблоны в `05.TEMPLATES/`.

### 4.1. `04.BRANDS/<brand-slug>.md` — досье букмекера

Создайте `05.TEMPLATES/brand-dossier.md`:

```markdown
---
title: <Brand Name>
slug: <brand-slug>
type: brand-dossier
lang: ro-RO
created: YYYY-MM-DD
updated: YYYY-MM-DD

# Основные данные
official_url: https://<domain>
launched_ro: YYYY  # год выхода на RO рынок
owner: <parent company>
onjn_license: L1234567 / YYYY  # номер и год лицензии
license_class: I  # класс лицензии ONJN
country_origin: <страна происхождения>

# Оценки (Cursor заполняет через анализ)
rating_overall: 8.5  # 1-10
rating_cote: 8      # качество коэффициентов
rating_bonusuri: 9  # бонусы
rating_ux: 7        # интерфейс
rating_plati: 8     # скорость выплат
rating_suport: 7    # поддержка
rating_aplicatie: 8 # моб. приложение
rating_licenta: 10  # надёжность/лицензия

# Категоризация
best_for_sport: [fotbal, tenis]
best_for_bettors: [incepatori, high-rollers]
tags: [brand, licenta-ro, retail-si-online]

# Cross-links в Wiki
wiki_concept: [[brands/<slug>]]
related_bonuses: [[bonuses/bonus-de-bun-venit]], [[bonuses/cashback]]
related_apps: [[apps/aplicatie-android]]

sources:
  - 01.RAW/ahrefs/keywords/<slug>-keywords.csv
  - 01.RAW/web-clips/reviews/*-<slug>-*.md
  - <official_url>/despre-noi (сходить если нужно)
---

# <Brand Name> — Досье бренда

## Prezentare generală
2-3 abzацa: краткое интро (год основания, лидерство/позиция в RO,
ключевые сильные стороны).

## Licențiere și securitate
- ONJN Licența: <номер>
- Класс: I (jocuri online) / II / etc
- Год получения лицензии в RO: YYYY
- Материнская компания: <company>
- Регуляторы других юрисдикций (MGA, UKGC): <перечислить>

## Oferta sportivă
- Виды спорта: <перечислить> (для каждого — сколько лиг/событий типично)
- Уникальные предложения: <например, exclusive Liga 1 markets>
- Live-беттинг: качество, скорость обновления cotes
- Cash-out: доступно / полное / partial / auto

## Bonusuri
Список актуальных бонусов (краткие описания, ссылки на детальные страницы):
- Bonus de bun venit: <сумма>, rulaj x<N>, <период>
- Cashback: <условия>
- Другие акции: <перечислить>

## Aplicații mobile
- iOS: доступно / нет / ссылка на App Store
- Android: APK / Play Store / rating
- Функциональность: <ключевое отличие от web>

## Metode de plată
Таблица: метод → depozit min/max → retragere min/max → timp → comision

## Suport clienți
- Языки: RO, EN, <ещё>
- Каналы: chat live, email, telefon RO
- Часы работы: 24/7 / <часы>
- Скорость ответа: <оценка>

## Interfață și UX
- Дизайн: <оценка стиля>
- Мобильная адаптация
- Скорость сайта
- Регистрация (сколько шагов, KYC-требования)

## Avantaje (5-7 пунктов)
- ✅ <плюс 1>
- ✅ <плюс 2>
...

## Dezavantaje (5-7 пунктов)
- ❌ <минус 1>
...

## Concluzie
Кто должен выбирать этот бренд, кому не подойдёт, финальный вердикт.

## Скриншоты
- 01.RAW/assets/<slug>/hero.png
- 01.RAW/assets/<slug>/bonuses.png
- 01.RAW/assets/<slug>/mobile.png
- 01.RAW/assets/<slug>/payments.png
```

### 4.2. `04.5.REVIEW-COMPETITORS/<domain>.md` — досье review-конкурента

Создайте `05.TEMPLATES/review-competitor-dossier.md`:

```markdown
---
title: <Domain> — Analiză competitor
slug: <domain>
type: review-competitor-dossier
lang: ru-RU  # мы для себя пишем, поэтому русский
created: YYYY-MM-DD
updated: YYYY-MM-DD

# Основные данные
domain: <domain>
total_urls: N  # из Screaming Frog
organic_traffic_monthly: N  # из Ahrefs
domain_rating: N  # DR из Ahrefs
top_country: RO

# Категоризация по типу контента
has_reviews: true/false
has_bonuses: true/false
has_ratings: true/false
has_guides: true/false
has_predictions: true/false
has_academia: true/false
has_forum: true/false

# Метрики
avg_content_length: N  # слов
top_traffic_pages_count: N
publishes_daily: true/false

sources:
  - 01.RAW/discovery/<domain>/urls-raw.csv
  - 01.RAW/web-clips/*/<domain>-*.md
tags: [competitor-analysis]
---

# <Domain> — Анализ review-конкурента

## Позиционирование
Что за сайт, кому адресован, основной оффер.

## Структура контента (типы страниц)
| Тип | URL-паттерн | Кол-во страниц | Средняя длина | Трафик |
|---|---|---|---|---|
| Reviews | /recenzii/* | N | X слов | Y visits/mo |
| Ratings | /top-* | N | X | Y |
| Bonuses | /bonusuri/* | N | X | Y |
| Guides | /ghiduri/* | N | X | Y |
| Predictions | /ponturi/* | N | X | Y |

## Топ-10 страниц по трафику (из Ahrefs)
1. URL → traffic → keyword
2. ...

## Уникальные фишки, которых нет у других
- <например, они делают video-обзоры букмекеров>
- <profile tipsteros (авторы прогнозов) с историей ставок>
- <калькулятор рулажа bonusов>

## Слабые места
- <например, тонкий гид-контент (<1500 слов)>
- <нет comparison-страниц (X vs Y)>
- <устаревшие обзоры (2023 год)>

## Content Gap для нашего сайта
Темы/страницы, где мы можем обойти конкурента:
- <тема 1 — почему>
- <тема 2 — почему>

## Что стоит скопировать (структуру, не текст!)
- <паттерн 1>
- <паттерн 2>

## Что НЕ стоит копировать
- <антипаттерн 1>
```

### 4.3. Wiki-концепт бренда `02.WIKI/brands/<slug>.md`

Отличается от досье `04.BRANDS/<slug>.md`: **концепт** более лёгкий, содержит cross-links и синтезы, а не полные табличные данные.

Формат:
```markdown
---
title: <Brand Name>
type: brand
lang: ro-RO
created: YYYY-MM-DD
related: [[brands/<slug-alt>]], [[bonuses/bonus-de-bun-venit]]
tags: [brand, bookmaker]
---

# <Brand Name>

## Ключевые факты
- Год основания в RO: YYYY
- ONJN лицензия: L<номер>
- Материнская компания: <company>

## Сильные стороны
1. <главный плюс>
2. <второй плюс>
3. ...

## Слабые стороны
1. <главный минус>
2. ...

## Уникальное предложение (USP)
Что делает этот бренд особенным в RO контексте.

## Позиция на рынке
Топ-N по количеству активных игроков, топ-N по трафику
(из [[seo/cluster-recenzii-case-pariuri]]).

## Связанные страницы
- [[bonuses/bonus-de-bun-venit]] — их приветственный бонус
- [[apps/aplicatie-android]] — их приложение
- [[sports/fotbal]] — их предложения по футболу
- Detailed dossier: 04.BRANDS/<slug>.md
```

### 4.4. Wiki-концепт бонуса `02.WIKI/bonuses/<type>.md`

```markdown
---
title: <Bonus Type>
type: bonus-concept
lang: ro-RO
created: YYYY-MM-DD
tags: [bonus, <type>]
related: [[bonuses/rulaj-rollover]], [[guides-concepts/rulaj-rollover]]
---

# <Bonus Type>

## Определение
Что это за тип бонуса, механика.

## Типичные условия в RO
- Средняя сумма: XXX RON
- Средний rulaj (rollover): xN
- Средний период отыгрыша: N дней
- Минимальные cote для отыгрыша: XX

## Как правильно оценивать этот тип бонуса
Критерии: <перечислить>

## У каких букмекеров лучшие условия
Топ-5 брендов с этим типом бонуса:
1. [[brands/<slug>]] — <детали>
2. ...

## Частые "подводные камни"
- <камень 1>
- <камень 2>

## Связанные бонусы
- [[bonuses/<related-type>]]

## Примеры страниц продакшн-сайта
- /bonusuri/<type>/superbet
- /bonusuri/<type>/betano
- /bonusuri/<type>/ (hub)
```

### 4.5. Wiki-концепт спорта `02.WIKI/sports/<sport>.md`

```markdown
---
title: Pariuri pe <sport>
type: sport
lang: ro-RO
created: YYYY-MM-DD
tags: [sport, <sport-slug>]
related: [[sports/<related-sport>]]
---

# Pariuri pe <sport>

## Популярность в RO
% пользователей ставит на этот спорт, топ-лиги.

## Основные лиги/турниры
- <Liga 1 pentru fotbal>
- <Champions League>
- ...

## Типы ставок специфичные для этого спорта
- <тип 1 (например, для тенниса — set correct score)>
- <тип 2>

## Ключевые метрики для value-betting
- <например для футбола: xG, home advantage, form last 5>

## Топ букмекеры для этого спорта
1. [[brands/<slug>]] — почему они хороши для <sport>
2. ...

## Специфичные бонусы (если есть)
- Bonus <sport>-only от <brand>: <детали>

## Календарь событий в RO
Когда пик трафика по этому спорту (сезон, крупные турниры).

## Связанные гайды
- [[guides-concepts/cum-sa-pariezi-pe-<sport>]]
- [[guides-concepts/strategii-<sport>]]
```

### 4.6. Wiki-концепт метода оплаты `02.WIKI/payments/<method>.md`

```markdown
---
title: <Method> pentru pariuri
type: payment
lang: ro-RO
tags: [payment, <method-slug>]
related: [[payments/<alternative>]]
---

# <Method>

## Что это и как работает
Краткое описание метода.

## Специфика для RO пользователей
- Доступность в RO: да/ограничено
- Локальный оператор: да/нет
- KYC-требования: <детали>

## У каких букмекеров доступно
- [[brands/<slug1>]] — deposit/withdrawal
- [[brands/<slug2>]] — только deposit
- ...

## Комиссии и лимиты
- Минимальный депозит: XX RON
- Максимальный депозит: XXX RON
- Комиссия: X% / бесплатно
- Скорость: мгновенно / N часов

## Плюсы и минусы для беттинга
- ✅ <плюс>
- ❌ <минус>

## Альтернативы
- [[payments/<alt1>]] — когда лучше использовать
```

### 4.7. Wiki-концепт приложения `02.WIKI/apps/<topic>.md`

```markdown
---
title: <App Topic>
type: app
lang: ro-RO
tags: [app, mobile]
---

# <App Topic>

## Общие принципы
Как это работает в контексте букмекерских приложений.

## Разница между iOS и Android
- iOS: App Store (или нет), обходы, вопросы
- Android: APK vs Play Store

## Топ приложения (перекрёстно с брендами)
- [[brands/superbet]] — оценка приложения
- [[brands/betano]] — оценка
- ...

## Технические аспекты
- Требования (версия OS)
- Размер типичный
- Разрешения
- Обновления
```

### 4.8. Wiki-концепт для гайдов `02.WIKI/guides-concepts/<concept>.md`

```markdown
---
title: <Concept>
type: guide-concept
lang: ro-RO
tags: [guide, concept]
related: [[guides-concepts/<related>]]
---

# <Concept>

## Определение
Что это такое, простым языком.

## Формула / формулы (если есть)
```
<формула>
```

## Пример расчёта
Конкретный числовой пример на RO валюте (RON) и лигах.

## Когда применяется
Ситуации, где этот концепт релевантен.

## Ошибки новичков
- <ошибка 1>
- <ошибка 2>

## Связанные концепты
- [[guides-concepts/<related>]]

## Используется в гайдах
- /ghiduri/<category>/<slug1>
- /ghiduri/<category>/<slug2>
```

---

## <a name="часть-5"></a>🔍 Часть 5. Discovery конкурентов через Screaming Frog

### 5.1. Установка

1. https://www.screamingfrog.co.uk/seo-spider/ → Download for macOS
2. Установить как обычное приложение
3. Free версия = 500 URL/сайт

### 5.2. Список 8 review-конкурентов

```
https://legalbet.ro/
https://beturi.ro/
https://10pariuri.ro/
https://pontul-zilei.com/
https://biletu-zilei.com/
https://pariurix.com/
https://xbets.ro/
https://pariuriexpert.ro/
```

### 5.3. Настройки Screaming Frog перед сканированием

**Configuration → Include** (regex):
```
.*recenzie.*
.*review.*
.*bonus.*
.*promotii.*
.*ghid.*
.*scoala.*
.*dictionar.*
.*strategi.*
.*cum-sa.*
.*ce-este.*
.*pariuri-fotbal.*
.*pariuri-tenis.*
.*pariuri-baschet.*
.*pariuri-hochei.*
.*top-.*
.*clasament.*
.*cele-mai-bune.*
.*aplicatie.*
.*mobile.*
.*metode-de-plata.*
```

**Configuration → Exclude**:
```
.*\?.*
.*/tag/.*
.*/author/.*
.*/page/[0-9]+.*
.*/search.*
.*/login.*
.*/register.*
.*/comment.*
.*/feed.*
```

**Configuration → Spider → Crawl:**
- ❌ Check Images, CSS, JS, External Links, Hreflang
- ✅ Follow Internal "nofollow" Links

**Configuration → Speed:** Max Threads 5, Max URLs/s 2

### 5.4. Экспорт и обработка

1. Ввести URL → **Start** → ждать 5-15 минут
2. Вкладка **Internal** → фильтр `Status Code = 200`, `Content = text/html`
3. **Export** → сохранить в `01.RAW/discovery/<домен>/urls-raw.csv`
4. Повторить для 8 сайтов

### 5.5. Cursor: объединение

В Cursor Composer (Cmd+I):
```
объедини URLs из discovery
```

Cursor выполнит `DISCOVERY WORKFLOW` из `.cursorrules`:
- Прочитает все CSV
- Отфильтрует
- Классифицирует по 7 типам (reviews, bonuses, guides, ratings, sport, apps, payments)
- Создаст 7 txt-файлов + сводный CSV

### 5.6. Приоритизация

```
приоритизируй URLs discovery

Оставь топ-20% из каждого типа. Приоритет по:
1. Depth (низкая — важнее)
2. Word Count (высокое — важнее)
3. Title содержит целевые кейворды
4. Уникальность темы

Сохрани в: 01.RAW/discovery/urls-<type>-priority.txt
Целевые объёмы (для Firecrawl Free 500):
- reviews: ~100
- bonuses: ~120
- guides: ~80
- ratings: ~40
- sport: ~80
- apps: ~40
- payments: ~40

Итого: ~500 URL
```

### 5.7. Создание досье review-конкурентов

После сканирования у нас есть данные про **каждый сайт-конкурент**:

```
создай досье review-конкурентов

Для каждого домена в 01.RAW/discovery/*/ создай файл в 
04.5.REVIEW-COMPETITORS/<domain>.md по 05.TEMPLATES/review-competitor-dossier.md.

Данные бери из:
- 01.RAW/discovery/<domain>/urls-raw.csv — структура сайта
- 01.RAW/ahrefs/ если есть данные по домену — трафик, DR

Определи:
- Какие типы страниц у них есть (has_reviews, has_predictions...)
- Метрики (total URLs, avg content length)
- Топ страницы по трафику (если Ahrefs данные есть)
- Уникальные фишки vs слабые места (сравни между собой)
- Content Gap для нашего сайта

После создания — обнови 02.WIKI/index.md, добавь секцию "Review-конкуренты"
со ссылками на каждое досье.
```

---

## <a name="часть-6"></a>🔥 Часть 6. Автоклиппинг через Firecrawl

### 6.1. Как работает Firecrawl

**Облачный SaaS** (не работает локально):
```
ВАШ MAC → HTTPS URL → Облако Firecrawl (headless Chrome + прокси)
                    ← markdown ←
```

- Chrome работает у них, не грузит ваш Mac
- Обходит блокировки через прокси
- Free план = 500 credits/мес (1 URL = 1 credit)
- Hobby = $16/мес = 3000 credits

### 6.2. Регистрация и API ключ

1. https://firecrawl.dev → Sign up
2. Dashboard → API Keys → скопировать `fc-xxx...`

### 6.3. `.env` в корне vault

```bash
cat > .env << 'EOF'
FIRECRAWL_API_KEY=fc-ВАШ_КЛЮЧ_СЮДА
FIRECRAWL_CONCURRENCY=5
FIRECRAWL_WAIT_FOR_MS=2000
FIRECRAWL_RETRY_ATTEMPTS=3
FIRECRAWL_RATE_LIMIT_MS=200
EOF

cat > .env.example << 'EOF'
FIRECRAWL_API_KEY=fc-your-key-here
FIRECRAWL_CONCURRENCY=5
FIRECRAWL_WAIT_FOR_MS=2000
FIRECRAWL_RETRY_ATTEMPTS=3
FIRECRAWL_RATE_LIMIT_MS=200
EOF

grep '^.env$' .gitignore || echo '.env' >> .gitignore
```

### 6.4. Установка Node зависимостей

```bash
cd scripts
npm init -y
npm install @mendable/firecrawl-js dotenv p-limit yaml
```

### 6.5. Создание скриптов

В Cursor Composer:

```
Создай в scripts/:

## firecrawl-single.js — тест одного URL
Usage: node firecrawl-single.js <URL> <тип>
Типы: reviews | bonuses | guides | ratings | sport-categories | apps | payments

1. Читает FIRECRAWL_API_KEY из ../.env
2. Использует @mendable/firecrawl-js
3. firecrawl.scrapeUrl(url, {
     formats: ['markdown', 'screenshot@fullPage'],
     onlyMainContent: true,
     excludeTags: ['nav', 'footer', '.ads', '.sidebar', '.comments', 
                   '.related-posts', 'aside'],
     includeTags: ['article', 'main', '.content', '.post-content',
                   '.entry-content'],
     waitFor: process.env.FIRECRAWL_WAIT_FOR_MS
   })
4. Сохраняет:
   - Markdown → ../01.RAW/web-clips/<тип>/YYYY-MM-DD-<domain>-<slug>.md
   - Screenshot → ../01.RAW/web-clips/<тип>/imgs/<slug>-screenshot.png
5. YAML frontmatter:
   title, source, domain, published, clipped, language: ro-RO,
   type: web-clip, source_type: <тип>, firecrawl_credits_used: 1

## firecrawl-batch.js — батч

1. Читает URL из аргумента (txt файл)
2. p-limit параллельность = FIRECRAWL_CONCURRENCY
3. Логика single для каждого URL
4. Rate limiting + retry
5. Skip если файл уже существует (возобновляемость)
6. Прогресс: [42/500] processed, 8 errors, 15 skipped
7. Логи в ../logs/firecrawl-YYYY-MM-DD.log
8. Финальный отчёт: успешно/ошибок/skipped, credits, средний размер

## package.json — npm scripts
"scripts": {
  "test-single": "node firecrawl-single.js",
  "batch-reviews": "node firecrawl-batch.js reviews ../01.RAW/discovery/urls-reviews-priority.txt",
  "batch-bonuses": "node firecrawl-batch.js bonuses ../01.RAW/discovery/urls-bonuses-priority.txt",
  "batch-guides": "node firecrawl-batch.js guides ../01.RAW/discovery/urls-guides-priority.txt",
  "batch-ratings": "node firecrawl-batch.js ratings ../01.RAW/discovery/urls-ratings-priority.txt",
  "batch-sport": "node firecrawl-batch.js sport-categories ../01.RAW/discovery/urls-sport-priority.txt",
  "batch-apps": "node firecrawl-batch.js apps ../01.RAW/discovery/urls-apps-priority.txt",
  "batch-payments": "node firecrawl-batch.js payments ../01.RAW/discovery/urls-payments-priority.txt",
  "batch-all": "npm run batch-reviews && npm run batch-bonuses && npm run batch-guides && npm run batch-ratings && npm run batch-sport && npm run batch-apps && npm run batch-payments"
}

Покажи оба скрипта, я проверю.
```

### 6.6. Тест на одном URL

```bash
cd scripts
node firecrawl-single.js "https://legalbet.ro/superbet-recenzie/" reviews
```

Ожидаемый вывод:
```
✅ Success! (4.2s)
📄 Markdown: 8,432 chars
💾 Saved: 01.RAW/web-clips/reviews/2026-07-10-legalbet.ro-superbet-recenzie.md
💳 Credits: 1 used / 499 remaining
```

### 6.7. Батч

```bash
npm run batch-all
```

Или по одному типу через Cursor:
```
autoclip reviews
autoclip bonuses
autoclip guides
autoclip ratings
autoclip sport-categories
autoclip apps
autoclip payments
```

---

## <a name="часть-7"></a>📊 Часть 7. Ahrefs — свои SEO-данные

### 7.1. Organic Keywords букмекеров

Для каждого из 15-20 букмекеров:
1. Site Explorer → домен (`superbet.ro`)
2. Organic keywords → Country=Romania, Position 1-50, Volume≥100
3. Export CSV → `01.RAW/ahrefs/keywords/<brand>-keywords.csv`

**Через Batch Analysis** можно загнать все 20 доменов разом.

### 7.2. Content Gap

1. Competitive Analysis → Content Gap
2. Competitors: все 15-20 доменов букмекеров
3. Volume≥100, Position≤30
4. Export → `01.RAW/ahrefs/content-gap.csv`

### 7.3. Top Pages конкурентов

Для топ-5 (Superbet, Betano, Unibet, Fortuna, Mozzart):
- Site Explorer → Top pages → sort by Traffic
- Export → `01.RAW/ahrefs/top-pages-<brand>.csv`

### 7.4. Keyword Research по seed

8 seed-фраз в Keywords Explorer:
- `pariuri sportive`
- `case de pariuri`
- `bonus pariuri`
- `pariuri online`
- `cele mai bune case de pariuri`
- `recenzii pariuri`
- `ponturi pariuri`
- `cum sa pariez`

Matching terms → Country=Romania, Volume≥50 → Export.
Сохранять в: `01.RAW/ahrefs/seeds/<seed>.csv`

### 7.5. Регуляторика

- https://onjn.gov.ro → Operatori licențiați → PDF
- Сохранить: `01.RAW/regulatory/onjn-licenses-2026.pdf`

---

## <a name="часть-8"></a>🧠 Часть 8. Ingest-серия — заполняем Wiki

Теперь у нас есть всё сырьё. Запускаем ingest'ы по цепочке.

### 8.1. Ingest 1: Регуляторика

```
ingest 01.RAW/regulatory/

Цель: базовая wiki по регулированию беттинга в RO.

Создай в 02.WIKI/regulatory/:
- onjn-oficiul.md
- licenta-clasa-1.md
- impozit-castiguri.md
- varsta-legala.md
- joc-responsabil.md
- spalarea-banilor.md
- publicitate.md

Перед созданием — покажи список топиков + жди "ок".
После — обнови 02.WIKI/index.md секцию "Регуляторика" и log.md.
```

### 8.2. Ingest 2: SEO-стратегия из Ahrefs + Discovery

**Ключевой ingest.** Здесь строится стратегия сайта на реальных данных.

```
ingest 01.RAW/ahrefs/ + 01.RAW/discovery/

Задача: построить SEO-стратегию гибридного сайта.

Источники:
- 01.RAW/ahrefs/keywords/*.csv — organic keywords 20 букмекеров
- 01.RAW/ahrefs/seeds/*.csv — keyword research по 8 seed
- 01.RAW/ahrefs/content-gap.csv — упущенные ключи
- 01.RAW/discovery/urls-all.csv — структуры review-конкурентов

Создай в 03.SEO/:

1. keyword-research.md — кластеры по интенту (informational/commercial/transactional)
   с volume, KD, quick wins

2. content-cluster-map.md — Hub & Spoke структура НАШЕГО сайта:
   - Учитывай структуру review-конкурентов из 01.RAW/discovery/
   - Финальная карта URL для всех типов страниц (reviews, bonusuri,
     ghiduri, sport, aplicatii, plati, top-*, ponturi заглушки, comparisons)
   - Для каждого раздела: приоритет 1/2/3

3. master-plan.md — 90-дневный план публикаций с приоритетами

4. content-gap-analysis.md — упущенные темы vs review-конкуренты

Также обнови в 02.WIKI/seo/:
- cluster-recenzii-case-pariuri.md
- cluster-bonusuri.md
- cluster-cum-sa-pariez.md
- cluster-aplicatii.md
- cluster-metode-plata.md
- cluster-sport-specific.md
- cluster-ponturi-predictii.md
- content-gap-analysis.md

Перед созданием файлов покажи:
- Топ-20 кластеров с объёмами
- Структуру Hub & Spoke (визуально)
- Топ-30 приоритетных страниц

Жди "поехали".
```

### 8.3. Ingest 3: Досье букмекеров (04.BRANDS/)

```
ingest 01.RAW/ahrefs/keywords/ + 01.RAW/web-clips/reviews/

Создай:

Часть A — Полные досье в 04.BRANDS/:
Для каждого из 15-20 букмекеров (Superbet, Betano, Unibet, Fortuna,
Mozzart, Casa Pariurilor, NetBet, Efbet, Winbet, MaxBet, PublicWin,
Baumbet, MagicJackpot, 888, Princess-bet + 3-5 на твой выбор):
- Файл 04.BRANDS/<slug>.md по 05.TEMPLATES/brand-dossier.md
- Полное досье с рейтингами, licenta ONJN, бонусами, платежами, etc.

Часть B — Wiki концепты в 02.WIKI/brands/:
- Файл 02.WIKI/brands/<slug>.md — лёгкий концепт с cross-links
- Опирается на детальное досье, но КРАТКО (не дублирует)

Источники:
- 01.RAW/ahrefs/keywords/<brand>.csv
- 01.RAW/web-clips/reviews/*.md
- 01.RAW/regulatory/ (для licenta info)

Обнови 02.WIKI/index.md секцию "Букмекеры" и 02.WIKI/log.md.

Покажи мне план ДО старта: список букмекеров + пробелы данных.
```

### 8.4. Ingest 4: Досье review-конкурентов

```
создай досье review-конкурентов

Для каждого домена в 01.RAW/discovery/*/ создай:
- 04.5.REVIEW-COMPETITORS/<domain>.md по 05.TEMPLATES/review-competitor-dossier.md

Данные из:
- 01.RAW/discovery/<domain>/urls-raw.csv
- 01.RAW/web-clips/*/ (клипы с этого домена)
- 01.RAW/ahrefs/ (если есть)

Определи:
- Типы страниц (has_reviews, has_predictions, has_academia...)
- Метрики (total URLs, avg length, publish frequency)
- Топ страницы (если есть Ahrefs)
- Уникальные фишки vs слабые места
- Content gap для НАШЕГО сайта

Обнови 02.WIKI/index.md секцию "Review-конкуренты".
```

### 8.5. Ingest 5: Концепты бонусов

```
ingest 01.RAW/web-clips/bonuses/

Задача: концепты типов бонусов в 02.WIKI/bonuses/.

Создай страницы по 05.TEMPLATES/bonus-concept-template.md:
- bonus-de-bun-venit.md
- fara-depunere.md
- cashback.md
- rotiri-gratuite.md
- pariu-fara-risc.md
- incarcare.md (reload)
- vip-loialitate.md

Каждая: определение, типичные условия в RO, оценки, топ-5 брендов,
подводные камни, cross-links.

Обнови 02.WIKI/index.md и log.md.
```

### 8.6. Ingest 6: Концепты спорта

```
ingest 01.RAW/web-clips/sport-categories/

Задача: концепты видов спорта в 02.WIKI/sports/.

Приоритет:
1. fotbal (60% рынка RO)
2. tenis
3. baschet
4. handbal
5. hochei
6. formula-1
7. esports

По 05.TEMPLATES/sport-concept-template.md.
```

### 8.7. Ingest 7: Концепты платежей и приложений

```
ingest 01.RAW/web-clips/payments/ + 01.RAW/web-clips/apps/

Создай:
- 02.WIKI/payments/{netopia, mobilpay, skrill, neteller, paysafecard,
  carduri-bancare, criptomonede, transfer-bancar}.md
- 02.WIKI/apps/{aplicatie-android, aplicatie-ios, live-betting-mobil,
  cash-out-mobil, securitate-mobil}.md
```

### 8.8. Ingest 8: Базовые концепты для гайдов

```
ingest 01.RAW/web-clips/guides/ + 01.RAW/ahrefs/seeds/

Создай в 02.WIKI/guides-concepts/:
- cota.md
- rulaj-rollover.md
- value-betting.md
- martingale.md
- bankroll.md
- kelly-criterion.md
- pariuri-1x2.md
- pariuri-handicap.md
- pariuri-over-under.md
- live-betting.md
- cash-out.md
- pariuri-multiple.md

Каждая с формулами, примерами RON, ошибками новичков.
```

### 8.9. Lint после всех ingest'ов

```
lint 02.WIKI/

Найди дубли, сирот, unlinked концепты, устаревшее, пробелы.
Покажи → жди "Fix all".
Предложи 3-5 новых вопросов.
```

### ✅ Итоговое состояние Wiki после всех ingest'ов

```bash
ls 02.WIKI/brands/ | wc -l          # 15-20
ls 02.WIKI/bonuses/ | wc -l         # 7
ls 02.WIKI/sports/ | wc -l          # 7-9
ls 02.WIKI/payments/ | wc -l        # 8
ls 02.WIKI/apps/ | wc -l            # 5
ls 02.WIKI/guides-concepts/ | wc -l # 12
ls 02.WIKI/regulatory/ | wc -l      # 7
ls 02.WIKI/seo/ | wc -l             # 7-8

ls 04.BRANDS/ | wc -l                    # 15-20
ls 04.5.REVIEW-COMPETITORS/ | wc -l      # 8

ls 03.SEO/                # keyword-research, content-cluster-map, 
                          # master-plan, content-gap-analysis
```

**Всего в Wiki: 60-80+ страниц с cross-links.** Откройте Obsidian Graph View — должна быть плотная сеть.

---

## <a name="часть-9"></a>🖼️ Часть 9. Работа с картинками

### 9.1. Индексация (после всех клип-батчей)

```
reindex images

Проиндексируй все .png/.jpg/.webp в 7 папках:
01.RAW/web-clips/{reviews,bonuses,guides,ratings,sport-categories,apps,payments}/imgs/

Batches по 20. Формат _index.json — см. IMAGE INDEX WORKFLOW.

Особое внимание:
- brand поле: определяй по контенту, не URL
- type: logo | screenshot-main | screenshot-bonus | screenshot-app |
        screenshot-payment | photo | banner | icon

Итоговый отчёт по 7 папкам.
```

### 9.2. Скрипт уникализации

Тот же `scripts/process-clip-image.sh` из v1 (5 variant трансформаций). Промпт для генерации есть в предыдущих мастер-версиях.

---

## <a name="часть-10"></a>🎨 Часть 10. Генерация сайта на Astro

### 10.1. Создание Astro проекта

```bash
cd 07.SITES
npm create astro@latest site-01-ro
cd site-01-ro
npm install @astrojs/sitemap @astrojs/tailwind
```

Мастер: Blog template, TypeScript strict, no git.

### 10.2. Дизайн-спека

```
Создай 06.DESIGN/site-01-spec.md — дизайн-спека.

Уникальная палитра (не как конкуренты).
Шрифты с поддержкой ro-RO диакритики.
Структура главной, review, bonus, guide, sport, rating, app, payment страниц.
Компоненты: StarRating, BrandCard, BrandTable, ProsCons, BonusBadge, 
CTA, AppBadge, PaymentIcon, ComparisonTable, PredictionCard (заглушка).

Затем сгенерируй компоненты в 07.SITES/site-01-ro/src/components/.
```

### 10.3. Layouts + служебные страницы

```
Создай в 07.SITES/site-01-ro/src/layouts/:
- BaseLayout.astro
- ReviewLayout.astro (для reviews букмекеров)
- BonusLayout.astro
- GuideLayout.astro
- CategoryLayout.astro (для hubs)
- RatingLayout.astro
- AppLayout.astro
- PaymentLayout.astro

Плюс страницы src/pages/:
- metodologie, despre-noi, contact, termeni-si-conditii,
  politica-de-confidentialitate, joc-responsabil (обязательно!)

Все на ro-RO. Footer: 18+, ONJN, jocresponsabil.ro.
```

### 10.4. Генерация review-страниц

```
build reviews

Создай /recenzii/<slug> для всех букмекеров из 04.BRANDS/.
- 3000-5000 слов
- ReviewLayout
- Секции по PAGE TYPES REGISTRY
- Schema.org: Review + Organization
- Cross-links: 5-8

Картинки через "process new clips → site-01-ro (variant=1)".
Vary lengths: не одинаковые (3000/3500/4000/4500/5000).

Отчёт: сколько написано, средний размер.
```

### 10.5. Каталог бонусов

```
build bonus catalog

Для каждой из 7 категорий:
- Hub-страница /bonusuri/<categorie>/
- ~4-7 bonus-pages /bonusuri/<categorie>/<brand-slug>

Обнови review-страницы: блок "Bonusuri disponibile".
Cross-linking обязателен.

Картинки через process-clips (variant=1).
```

### 10.6. Гайды

```
build guides hub

15-25 гайдов в 4 категориях (notiuni-de-baza, strategii, 
gestionarea-banilor, psihologie).
1500-3000 слов каждый.

+ 4 category hubs
+ главный hub /ghiduri/
+ /ghiduri/dictionar-de-pariuri (глоссарий из 02.WIKI/glossary/)

Rewrite ≥85%. Никаких прямых рекламных ссылок на букмекеров.
```

### 10.7. Sport hubs

```
build sport hubs

6-10 видов спорта: /sport/<sport>
2000-3500 слов каждый.
Заглушка блока "Predictii recente" под API (Фаза 3).
```

### 10.8. App-hub и app-reviews

```
build app section

- /aplicatii/ — hub всех приложений (сравнительная таблица + гайд установки)
- /aplicatii/<brand-slug> для каждого бренда — детальный обзор приложения
- 1500-2500 слов каждый

Схема SoftwareApplication.
```

### 10.9. Payment methods

```
build payment methods

- /metode-de-plata/ — hub всех методов
- /metode-de-plata/<method-slug> для каждого (Netopia, mobilPay, Skrill,
  Neteller, Paysafecard, Carduri Bancare, etc.)
- 1200-2000 слов
- Таблица "У каких букмекеров доступен"
```

### 10.10. Ratings / TOP-страницы

```
build ratings

- /top-case-de-pariuri — общий топ (можно как homepage tab)
- /top-bonusuri-de-bun-venit
- /top-aplicatii
- /top-plati-rapide
- /top-cote-fotbal
- /top-case-pariuri-live
- 2000-3500 слов каждая
- Обновляются каждые 2-3 месяца
```

### 10.11. E-A-T страницы + главная

```
build E-A-T pages

/despre-noi, /metodologie, /joc-responsabil (обязательно RO!),
/termeni-si-conditii, /politica-de-confidentialitate, /contact
```

```
build homepage

Hero + TOP-15 rating + категории + featured + trust + FAQ + footer.
Title, Meta, Schema.org (WebSite, BreadcrumbList, FAQPage).
```

### 10.12. Предзаготовки для Фазы 3 (прогнозы)

```
Создай заглушки в 07.SITES/site-01-ro/src/pages/ponturi/:
- index.astro — hub с "Coming soon" + explanation
- [sport]/index.astro — динамические заглушки по спорту
- pontul-zilei.astro, biletul-zilei.astro — заглушки с subscription form

Добавь в sitemap с priority=0.3.
Не блокируй robots.

Также создай 09.API/:
- odds-provider-research.md (сравнение The Odds API, API-Sports, 
  SportMonks, OddsMatrix)
- prediction-structure.md (архитектура генерации через API)
- prediction-page-template.md
- daily-digest-template.md

Активный запуск API — Фаза 3 через 3-4 недели.
```

### 10.13. Технический SEO + финальная проверка

```
Создай:
- src/pages/sitemap-index.xml.ts
- src/pages/robots.txt.ts
- src/pages/rss.xml.ts
- src/middleware.ts (hreflang)

В astro.config.mjs: site: 'https://your-domain.ro', integration sitemap()
```

```bash
cd 07.SITES/site-01-ro
npm run build       # без ошибок
npm run preview     # localhost:4321
```

Chrome DevTools → Lighthouse → SEO/Performance >95.

---

## <a name="часть-11"></a>🚀 Часть 11. Деплой на Cloudflare

### 11.1. Домен

Namecheap/Porkbun → `.ro` домен → **Whois Privacy ON**.

### 11.2. Git + GitHub

```bash
cd 07.SITES/site-01-ro
git init
git add .
git commit -m "Initial site"
```

GitHub → приватный репо → connect:
```bash
git remote add origin git@github.com:USERNAME/site-01-ro.git
git branch -M main
git push -u origin main
```

### 11.3. Cloudflare Pages

1. https://cloudflare.com → Workers & Pages → Create → Connect to Git
2. Framework: Astro, Build: `npm run build`, Output: `dist`
3. Deploy

Custom domain: подключить, поменять nameservers, ждать DNS propagation.

### 11.4. Search Console + Bing

- https://search.google.com/search-console → Add property (Domain)
- Верификация через Cloudflare DNS TXT
- Sitemaps → `/sitemap-index.xml`
- То же в Bing Webmaster

---

## <a name="часть-12"></a>🔄 Часть 12. Регулярная работа и масштабирование

### Еженедельно

**Понедельник — обновление данных:**
```
- Ahrefs: свежие выгрузки → 01.RAW/ahrefs/refreshed/
- Screaming Frog: пересканировать 1-2 review-конкурентов
- "объедини URLs из discovery" (обновит списки)
- autoclip только новых URL (skip)
```

**Среда — контент:**
```
Из 03.SEO/master-plan.md 3-5 приоритетных на неделю.
Пиши по PAGE TYPES REGISTRY. Обновляй sitemap.
```

**Пятница — lint + деплой:**
```
lint 02.WIKI/
git commit + push
```

### Фаза 2 расширение (месяцы 2-3)

Добираем контент по мере роста трафика:
- **Comparison страницы** (X vs Y) — 20-40 страниц с высоким intent
- **Гид по каждому виду ставок для каждого спорта** — 50+ страниц
- **News/блог** — 2-3 статьи в неделю по актуальным темам
- **Дополнительные payment methods** и специфичные bonus-lists

### Фаза 3: Прогнозы через API (месяцы 3-4)

```
После выбора провайдера odds API:

1. Купить план (обычно $50-200/мес)
2. scripts/generate-predictions.js:
   - Cron 06:00 RO time
   - Fetch odds для приоритетных лиг (Liga 1, EPL, La Liga, CL, ...)
   - Cross-reference odds от 3-5 брендов → find value
   - LLM generation текста прогноза
   - Commit → Cloudflare auto-deploy
3. GitHub Actions workflow
4. Первые 30 дней — ручная валидация каждого прогноза
5. После валидации — полностью автоматика

Целевой объём:
- Ежедневно 20-50 новых prediction страниц (по видам спорта)
- Обновление /pontul-zilei и /biletul-zilei ежедневно
- Обновление /sport/<sport>/predictii каждые несколько часов
```

### Второй сайт сетки

Через 3-4 недели:
```
generate-site site-02-ro

Same data 04.BRANDS/ но:
- Rewrite ≥75%
- Палитра 06.DESIGN/site-02-spec.md
- Другая структура главной
- Другие "авторы" 08.PBN/authors-pool.md
- Anti-detect правила
- Картинки variant=2
```

### Quarterly recrawl

Раз в 3 месяца:
```
1. Screaming Frog пересканировать 8 review-конкурентов
2. "объедини URLs из discovery" (diff со старыми)
3. autoclip только новых URL
4. Обнови 03.SEO/content-gap.md
5. Обнови досье в 04.5.REVIEW-COMPETITORS/ (что изменилось)
6. Добавь приоритетные новые темы в master-plan.md
```

---

## 📊 Итоговые чек-листы

### Фаза 1 (недели 1-4) — Foundation

**Неделя 1:**
- [ ] Установка (Homebrew, Node, Obsidian, Cursor)
- [ ] Структура vault + `.cursorrules` + `.cursor/rules/`
- [ ] `02.WIKI/index.md` создан с 9 категориями
- [ ] Git init
- [ ] Screaming Frog: сканирование 8 сайтов
- [ ] Cursor: объединение URLs → 7 txt файлов + priority

**Неделя 2:**
- [ ] Firecrawl setup + скрипты
- [ ] Батч 500 URL по 7 типам
- [ ] Ahrefs 4 типа экспортов + регуляторика
- [ ] Ingest 1-2 (регуляторика + SEO стратегия)

**Неделя 3:**
- [ ] Ingest 3-8 (все концепты Wiki)
- [ ] Досье 15-20 букмекеров в 04.BRANDS/
- [ ] Досье 8 review-конкурентов в 04.5.REVIEW-COMPETITORS/
- [ ] Индексация картинок
- [ ] Astro setup + дизайн + компоненты + layouts

**Неделя 4:**
- [ ] Генерация всех типов страниц (150-200)
- [ ] E-A-T + homepage + технический SEO
- [ ] Заглушки под прогнозы (Фаза 3)
- [ ] Деплой на Cloudflare + GSC

### После Фазы 1

- [ ] Мониторинг индексации (14-21 день до появления в Google)
- [ ] Первые органические переходы (30-60 дней)
- [ ] Планирование Фазы 2 (comparison, news, глубокие гайды)
- [ ] Выбор API провайдера прогнозов
- [ ] Планирование второго сайта сетки

---

## 💰 Бюджет проекта

| Категория | Разово | В месяц |
|---|---|---|
| Cursor Pro | — | $20 |
| Ahrefs (у вас есть) | — | — |
| Screaming Frog Free (до 500 URL) | 0 | 0 |
| Firecrawl Free (500 credits) | 0 | 0 |
| Firecrawl Hobby (если 1000-3000 URL) | — | $16 |
| Домен .ro | $10-15/год | — |
| Cloudflare Pages | 0 | 0 |
| VPN (для тестов) | — | $5-10 |
| **Фаза 1 (foundation)** | **$10-15** | **$25-45** |
| Odds API (Фаза 3) | — | +$50-200 |
| **Фаза 3 (с прогнозами)** | | **$75-245** |

---

## 🔗 Ключевые ссылки

- Karpathy LLM Wiki: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
- Cursor: https://cursor.com
- Obsidian: https://obsidian.md
- Screaming Frog: https://www.screamingfrog.co.uk/seo-spider/
- Firecrawl: https://firecrawl.dev
- Astro: https://docs.astro.build
- Cloudflare Pages: https://pages.cloudflare.com
- ONJN: https://onjn.gov.ro
- Jocul Responsabil: https://jocresponsabil.ro

---

> **💡 Главный принцип:** discovery-first, потом брендо-центричная генерация, потом масштабирование через API. Сайт растёт без верхнего лимита — Фаза 1 закладывает основу, Фазы 2-3 наполняют её тысячами страниц по тем же паттернам.
