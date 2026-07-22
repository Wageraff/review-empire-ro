# 🏗️ Мастер-протокол: сборка гибридного review-сайта румынских букмекеров

> **Стек:** macOS + Cursor + Obsidian + Ahrefs + Screaming Frog + Firecrawl
>
> **Финальный продукт:** гибридный сайт (150-200 страниц) — обзоры букмекеров + каталог бонусов + гайды для новичков + прогнозы через API (заготовка)
>
> **Идеология:** LLM Wiki по модели А. Карпатого — [gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f). Obsidian = IDE, Cursor = программист, Wiki = codebase.
>
> **Время до первого сайта в продакшене:** 3-4 недели

---

## 📑 Оглавление

- [Часть 0. Философия и архитектура](#часть-0)
- [Часть 1. Установка окружения (Дни 1-2)](#часть-1)
- [Часть 2. Структура vault + правила Cursor (День 2)](#часть-2)
- [Часть 3. Discovery конкурентов через Screaming Frog (День 3)](#часть-3)
- [Часть 4. Автоклиппинг через Firecrawl (День 4)](#часть-4)
- [Часть 5. Ahrefs — свои данные (День 5)](#часть-5)
- [Часть 6. Первый ingest + построение структуры сайта (Дни 6-7)](#часть-6)
- [Часть 7. Работа с картинками (индексация + уникализация)](#часть-7)
- [Часть 8. Astro-сайт: дизайн и генерация страниц (Дни 8-12)](#часть-8)
- [Часть 9. Деплой на Cloudflare (День 13)](#часть-9)
- [Часть 10. Регулярная работа и масштабирование](#часть-10)

---

## <a name="часть-0"></a>🧠 Часть 0. Философия и архитектура

### Как работает система

```
┌─────────────────────────────────────────────────────────────┐
│                    ВАШ MAC (локально)                       │
│                                                             │
│  Obsidian (просмотр)         Cursor (генерация)             │
│         ↓                          ↓                        │
│  ┌──────────────────────────────────────────────────┐       │
│  │        review-empire (единый Vault)              │       │
│  │  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────────┐      │       │
│  │  │ RAW  │→ │ WIKI │→ │ SEO  │→ │  SITES   │      │       │
│  │  │сырьё │  │знания│  │план  │  │  Astro   │      │       │
│  │  └──────┘  └──────┘  └──────┘  └──────────┘      │       │
│  └──────────────────────────────────────────────────┘       │
│                       ↑                    ↓                │
└───────────────────────┼────────────────────┼────────────────┘
                        │                    │
             ┌──────────┴──────┐    ┌────────┴──────────┐
             │ Screaming Frog  │    │ Cloudflare Pages  │
             │ + Firecrawl API │    │   (deploy)        │
             │ (сбор данных)   │    │                   │
             └─────────────────┘    └───────────────────┘
```

### Ключевые принципы

1. **Curator = вы, Programmer = Cursor.** Вы направляете, Cursor пишет весь код и контент.
2. **Wiki накапливается, не переписывается.** Новый источник противоречит старому → создаётся заметка о противоречии, а не молчаливое удаление.
3. **Один источник = 10-15 wiki-страниц.** Это норма для Карпатовского ingest.
4. **Human-in-the-loop.** Cursor всегда показывает план перед массовыми изменениями.
5. **Discovery-first подход.** Структура сайта строится ПОСЛЕ анализа конкурентов, а не до.
6. **Immutable RAW.** Сырьё (`01.RAW/`) никогда не удаляется — источник истины.

### Типы контента на финальном сайте

| Тип | Кол-во страниц | Источник данных |
|---|---|---|
| Обзоры букмекеров | 15-20 | Ahrefs + landing букмекеров + клипы review-сайтов конкурентов |
| Каталог бонусов (страница на бонус × букмекер) | 30-50 | Landing букмекеров + клипы конкурентов |
| Hub бонусов по категориям (welcome, cashback...) | 7-8 | Аналитика Cursor поверх собранных бонусов |
| Гайды для новичков | 15-25 | Клипы гайдов конкурентов + Ahrefs seeds |
| Sport-категории | 6-10 | Клипы + wiki + структура сайта |
| E-A-T страницы (about, метод, joc responsabil) | 7 | Регуляторика ONJN + собственный контент |
| Прогнозы (заглушки под API) | 10-15 | Заготовка — наполнение позже |
| Главная + служебные | 5 | Агрегация всего |
| **ИТОГО** | **~150-180** | |

### Юридические оговорки (для беттинг-ниши в RO)

- Обязательно: 18+, дисклеймер, ONJN упоминание, страница /joc-responsabil
- Использование торговых марок букмекеров: fair use в обзорах допустим, дисклеймер "Recenzie independentă" обязателен
- Скрейпинг: fair use, rewrite ≥70%, не публиковать чужие тексты дословно
- Whois privacy на доменах включена

---

## <a name="часть-1"></a>🟢 Часть 1. Установка окружения (Дни 1-2)

### 1.1. Homebrew (если ещё нет)

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# После установки:
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

brew --version   # проверка
```

### 1.2. Основные утилиты

```bash
brew install node git ripgrep imagemagick exiftool webp pandoc wget

# Проверка версий
node -v      # v20.x или v22.x
npm -v       # 10.x+
git --version
magick --version
```

> ⚠️ **Если `npm init` падает с ошибкой** `Class extends value undefined is not a constructor`:
> ```bash
> brew uninstall --ignore-dependencies node
> rm -rf ~/.npm ~/.node-gyp
> brew install node
> ```

### 1.3. Obsidian

1. https://obsidian.md → скачать `.dmg`
2. **Create new vault** → имя `review-empire` → расположение `~/Documents/review-empire`
3. Community plugins → включить → установить:
   - **Dataview** (динамические таблицы)
   - **Templater** (шаблоны)
   - **Advanced Tables** (редактирование таблиц)
   - **Local Images Plus** (авто-скачивание картинок из клипов)
4. **Settings → Files and links** → Attachment folder path = `./imgs` (относительный путь = соседняя папка `imgs/` рядом с клипом)
5. **Settings → Hotkeys** → «Download attachments for current file» → `Cmd+Shift+D` (запасной нативный способ)

### 1.4. Cursor

1. https://cursor.com → скачать
2. **File → Open Folder** → выбрать `~/Documents/review-empire`
3. Trust folder → Yes
4. Settings → Plans → Cursor Pro ($20/мес)
5. Выбрать модель Claude 4.5 Sonnet (или Claude 4 Opus для сложных задач)

### 1.5. Obsidian Web Clipper (для точечных клипов)

1. Chrome/Brave: https://obsidian.md/clipper → установить расширение
2. В настройках → Vault: `review-empire`
3. Создать 5 шаблонов (по одному на тип контента):

| Шаблон | URL trigger (regex) | Note location |
|---|---|---|
| `RO Betting — Review` | `recenzie\|review\|casa-de-pariuri` | `01.RAW/web-clips/reviews/` |
| `RO Betting — Bonus` | `bonus\|promotii\|oferta\|cashback\|rotiri` | `01.RAW/web-clips/bonuses/` |
| `RO Betting — Guide` | `ghid\|scoala\|dictionar\|cum-sa\|ce-este\|strategie` | `01.RAW/web-clips/guides/` |
| `RO Betting — Rating` | `top-\|clasament\|rating\|cele-mai-bune` | `01.RAW/web-clips/ratings/` |
| `RO Betting — Sport` | `pariuri-fotbal\|pariuri-tenis\|pariuri-baschet` | `01.RAW/web-clips/sport-categories/` |

Frontmatter шаблон:
```yaml
title: {{title}}
source: {{url}}
domain: {{domain}}
clipped: {{date}}
language: ro-RO
type: web-clip
```

---

## <a name="часть-2"></a>🟢 Часть 2. Структура vault + правила Cursor (День 2)

### 2.1. Создание структуры папок

В Cursor terminal (Cmd+`), в корне vault:

```bash
# Основная структура
mkdir -p 00.SYSTEM
mkdir -p 01.RAW/{ahrefs/{keywords,seeds},competitors,regulatory,assets}
mkdir -p 01.RAW/web-clips/{reviews,bonuses,guides,ratings,sport-categories}
mkdir -p 01.RAW/web-clips/{reviews,bonuses,guides,ratings,sport-categories}/imgs
mkdir -p 01.RAW/discovery/{legalbet,beturi,10pariuri,pontul-zilei,biletu-zilei,pariurix,xbets,pariuriexpert}
mkdir -p 02.WIKI
mkdir -p 03.SEO
mkdir -p 04.COMPETITORS
mkdir -p 05.TEMPLATES/prompts
mkdir -p 06.DESIGN
mkdir -p 07.SITES
mkdir -p 08.PBN
mkdir -p 09.API
mkdir -p scripts
mkdir -p logs
```

### 2.2. Стартовые служебные файлы

```bash
# index.md — каталог по модели Карпатого
cat > 02.WIKI/index.md << 'EOF'
# Wiki Index

> Каталог всех страниц Wiki. Cursor читает этот файл первым при любом query.

## Конкуренты (букмекеры)
_(заполнится после ingest)_

## Концепты бонусов
_(заполнится)_

## SEO и стратегия
_(заполнится)_

## Регуляторика
_(заполнится)_
EOF

# log.md — хронологический журнал
cat > 02.WIKI/log.md << 'EOF'
# Wiki Log

> Формат: ## [YYYY-MM-DD] operation | source

## [$(date +%Y-%m-%d)] init | Wiki created
- Empty structure initialized
EOF

# README
cat > README.md << 'EOF'
# Review Empire
База знаний и сетка review-сайтов о румынских букмекерах.
EOF
```

### 2.3. Главный `.cursorrules`

Создайте `.cursorrules` в корне vault. **Полный текст файла:**

```markdown
# Review Empire — Cursor System Rules

## ROLE
Ты — senior SEO-инженер и контент-стратег для сетки review-сайтов
в нише "ставки на спорт / обзоры букмекеров". ГЕО — Румыния.
Работаешь по модели LLM Wiki Андрея Карпатого:
Obsidian = IDE, ты = программист, Wiki = codebase.

## LANGUAGE RULES
- Все wiki-страницы и контент сайтов — на РУМЫНСКОМ (ro-RO).
- Коммуникация со мной — на РУССКОМ.
- Никогда не пиши шаблонный машинный перевод — используй живой
  румынский с идиомами беттинг-индустрии (pariuri sportive,
  case de pariuri, cote, bonus de bun venit, rotiri gratuite, rulaj).
- Запрещённые AI-клише: "В заключение", "Стоит отметить",
  "În concluzie", "Este important de menționat", "Pe scurt",
  "Merită menționat faptul că".

## DIRECTORY MAP
- 00.SYSTEM/          — системные документы
- 01.RAW/             — immutable сырьё, не удалять
  - ahrefs/           — CSV экспорты Ahrefs
  - discovery/        — CSV от Screaming Frog + классифицированные txt
  - web-clips/        — клипы конкурентов (Firecrawl + Web Clipper)
    - reviews/, bonuses/, guides/, ratings/, sport-categories/
    - каждая имеет свою imgs/ с _index.json
  - competitors/      — скриншоты, брендинг
  - regulatory/       — ONJN, законы
  - assets/           — обработанные картинки на букмекера
- 02.WIKI/            — твоя зона; index.md + log.md обязательны
- 03.SEO/             — стратегия: keyword-research, cluster-map, master-plan
- 04.COMPETITORS/     — досье букмекеров (1 файл = 1 букмекер)
- 05.TEMPLATES/       — шаблоны страниц + готовые промпты
- 06.DESIGN/          — дизайн-спеки, компоненты
- 07.SITES/           — Astro-проекты
- 08.PBN/             — anti-detect правила
- 09.API/             — конфиги API прогнозов (позже)
- scripts/            — Node.js скрипты (Firecrawl и т.д.)
- logs/               — логи запусков

## CORE WORKFLOWS (по модели Карпатого)

### ingest <путь или тема>
1. Прочитай указанные файлы в 01.RAW/.
2. Выдели ключевые смысловые точки.
3. ОБСУДИ со мной key takeaways ПЕРЕД записью (human-in-the-loop).
4. Создай/обнови wiki-страницы в 02.WIKI/ по PAGE FORMAT.
5. Один источник может затронуть 10-15 страниц — это нормально.
6. Проставь cross-links через [[wiki-link]].
7. Обнови 02.WIKI/index.md (категория + ссылка + one-line summary).
8. Допиши в 02.WIKI/log.md:
   ## [YYYY-MM-DD] ingest | <source>
   - changed pages: [[page1]], [[page2]], ...
9. Противоречия старым данным — НЕ удаляй молча, создай заметку.

### query <вопрос>
1. ВСЕГДА начни с чтения 02.WIKI/index.md.
2. Рекурсивно пройди по релевантным страницам через cross-links.
3. Собери полный контекст, дай ответ со ссылками [[на страницы]].
4. Если ответ — ценный синтез — предложи сохранить как новую wiki-страницу.

### lint
1. Найди: дубли, противоречия, страницы-сироты, unlinked концепты,
   устаревшие утверждения, пробелы в данных.
2. Покажи список проблем, попроси "Fix all".
3. Предложи 3-5 новых вопросов для исследования.

### discovery <домен>
1. Запусти Screaming Frog для указанного домена (я делаю вручную).
2. После получения CSV — работай с ним из 01.RAW/discovery/<домен>/.
3. См. секцию DISCOVERY WORKFLOW ниже.

### autoclip <тип>
См. секцию FIRECRAWL AUTOMATION ниже.

### generate-site <site-name>
1. Прочитай 03.SEO/master-plan.md и 04.COMPETITORS/.
2. Возьми дизайн из 06.DESIGN/<site-name>-spec.md.
3. Создай/обнови Astro-проект в 07.SITES/<site-name>/.
4. Следуй anti-detect правилам из 08.PBN/.
5. Проверь npm run build без ошибок.

## PAGE TYPES REGISTRY

### REVIEW (обзор букмекера)
- URL: /recenzii/<slug>
- Файл: 07.SITES/<site>/src/content/reviews/<slug>.md
- Шаблон: 05.TEMPLATES/review-page.md
- Длина: 3000-5000 слов
- Секции: hero, quick-rating, licenta ONJN, bonus, sport disponibil,
  aplicatie mobila, plati, suport, avantaje-dezavantaje, concluzie, FAQ
- Schema.org: Review + Organization
- Cross-links: 5-8 (другие review, bonus-pages этого букмекера, гайды)

### BONUS PAGE (страница бонуса)
- URL: /bonusuri/<categorie>/<bookmaker>
- Файл: 07.SITES/<site>/src/content/bonusuri/<categorie>-<bookmaker>.md
- Шаблон: 05.TEMPLATES/bonus-page.md
- Длина: 1500-2500 слов
- Секции: bonus details (suma, cod promo, rulaj/rollover),
  cum activezi step-by-step, termeni cheie, avantaje-dezavantaje,
  сomparație cu 2-3 alte bonusuri, FAQ
- Schema.org: Offer + Product
- Cross-links: обязательный на review этого букмекера

### BONUS CATEGORY HUB
- URL: /bonusuri/<categorie>
- Шаблон: 05.TEMPLATES/category-hub.md
- Длина: 1200-2000 слов
- Секции: Ce este [тип], comparativ table, cum să alegi, top-3, termeni

### GUIDE PAGE (гайд для новичков)
- URL: /ghiduri/<categorie>/<slug>
- Шаблон: 05.TEMPLATES/guide-page.md
- Длина: 1500-3000 слов
- Секции: introducere, основные разделы, exemple practice (обязательно
  с числами RON!), erori comune, concluzie, FAQ, related guides
- Schema.org: HowTo или Article
- ВАЖНО: гайды НЕ рекламируют конкретных букмекеров абстракция!

### SPORT CATEGORY
- URL: /sport/<sport>
- Шаблон: 05.TEMPLATES/sport-category.md
- Длина: 2000-3500 слов
- Секции: introducere, tipuri de pariuri, top-5 case de pariuri,
  strategii, bonusuri specifice, predictii block (заглушка API), FAQ

### PREDICTION (заготовка под API)
- URL: /ponturi/<sport>/<match-slug>
- Пока НЕ генерируем — только структура + шаблон + заглушки

### E-A-T PAGES (обязательны для беттинг-ниши YMYL)
- /despre-noi, /metodologie, /joc-responsabil, /termeni-si-conditii,
  /politica-de-confidentialitate, /contact
- 800-1500 слов каждая
- Живой тон, имена авторов (можно псевдонимы), фото команды

## PAGE FORMAT (для wiki-страниц)
```yaml
---
title: <название>
type: competitor | concept | seo-cluster | regulatory | template
lang: ro-RO
created: YYYY-MM-DD
updated: YYYY-MM-DD
sources: [path/to/raw1, path/to/raw2]
related: [[link1]], [[link2]]
tags: [tag1, tag2]
---
```

## COMPETITOR DOSSIER FORMAT
- Основная инфо: лицензия ONJN №, год основания, владелец
- Бонус приветственный (с условиями rulaj)
- Виды спорта (fotbal, tenis, baschet приоритет для RO)
- Платёжки (Netopia, mobilPay, Skrill — локальные!)
- Мобильное приложение (iOS/Android)
- Поддержка (язык, скорость)
- Плюсы / Минусы (5-7 пунктов)
- Рейтинг по критериям 1-10:
  Бонусы, Коэффициенты, UX, Скорость выплат, Поддержка
- Скриншоты: 01.RAW/assets/<bookmaker>/

## CROSS-LINKING RULES
- Review букмекера → его bonus pages (все, минимум 2)
- Review → релевантные guides (минимум 3)
- Review → главная страница /
- Bonus page → review этого букмекера
- Bonus page → 2-3 других бонуса той же категории
- Guide page → 3-5 related guides
- Guide page → NEVER промо-ссылки на букмекеров напрямую
- Sport category → топ-5 review + прогнозы через API
- Category hub → все страницы категории + related категории

## SEO RULES
- Title: 50-60 симв, главный кейворд на румынском в начале
- Meta description: 150-160 симв
- H1: один, содержит кейворд
- Перелинковка: минимум 5 контекстных ссылок на странице
- Schema.org: Review+Organization для review; Offer для bonus; HowTo для guides
- Hreflang: ro-RO

## ANTI-DETECT (для сетки сайтов)
- Rewrite ≥75% между сайтами
- Разная HTML-структура, имена CSS-классов
- Разные favicon, logo, палитра
- Whois-приватность
- Разные тексты T&C, About, Methodology
- Гайды: rewrite ≥85% (высокий риск копипаста между конкурентами)

## DISCOVERY WORKFLOW

Когда я говорю "объедини URLs из discovery":

1. Найди все CSV в 01.RAW/discovery/*/
2. Прочти (колонки Screaming Frog: Address, Status Code, Title...)
3. Фильтр:
   - Status Code == 200
   - Content Type == text/html
   - НЕ содержит: /tag/, /author/, /page/, /?, /login, /register, /cart
4. Классифицируй по URL-паттернам:
   - reviews: /recenzie/, /review/
   - bonuses: /bonus/, /promotii/, /oferta/, /cashback/
   - guides: /ghid/, /scoala/, /dictionar/, /cum-sa/, /ce-este/, /strategi/
   - ratings: /top-, /clasament/, /cele-mai-bune/
   - sport: /pariuri-fotbal/, /pariuri-tenis/, /pariuri-baschet/, /pariuri-hochei/
5. Сохрани:
   - 01.RAW/discovery/urls-reviews.txt
   - 01.RAW/discovery/urls-bonuses.txt
   - 01.RAW/discovery/urls-guides.txt
   - 01.RAW/discovery/urls-ratings.txt
   - 01.RAW/discovery/urls-sport.txt
   - 01.RAW/discovery/urls-all.csv (сводный)
6. Дедупликация по URL
7. Отчёт: сколько URL в каждой категории, распределение по доменам

## FIRECRAWL AUTOMATION

Когда я говорю "autoclip <тип>" или "запусти firecrawl для <тип>":

1. Проверь 01.RAW/discovery/urls-<тип>.txt существует
2. Проверь FIRECRAWL_API_KEY в .env
3. Покажи сводку: сколько URL, оценка credits, времени, куда save
4. Жди "поехали"
5. Запусти: cd scripts && npm run batch-<тип>
6. Мониторь через tail -f logs/firecrawl-*.log
7. По завершении — постобработка автоматом:
   - Клипы < 500 слов → 01.RAW/web-clips/<тип>/_trash/
   - Ошибочные HTTP → _errors/
   - Классификация: bookmaker (по контенту, не URL), content_subtype
   - Обнови frontmatter: bookmaker, content_subtype, word_count, quality_score
8. Финальный отчёт: распределение, аномалии, готовность к indexation

## IMAGE INDEX WORKFLOW

Каждая папка 01.RAW/web-clips/<тип>/imgs/ имеет свой _index.json:
{
  "last_updated": "YYYY-MM-DD",
  "category": "reviews | bonuses | guides | ratings | sport-categories",
  "total_indexed": N,
  "images": [
    {
      "file": "img-abc123.png",
      "bookmaker": "superbet | null",
      "type": "logo | screenshot-main | screenshot-bonus | photo | banner | icon",
      "theme": "keyword-on-romanian",
      "width": 1440, "height": 900,
      "quality": 1-10,
      "usable": true,
      "reason": "if false — why"
    }
  ]
}

### При команде "index new images":
1. Работай по всем 5 папкам параллельно
2. Читай _index.json, вычисляй diff с ls папки
3. Только НОВЫЕ файлы отправляй на visual analysis (batches по 20)
4. Обновляй _index.json атомарно (temp file + mv)

### При написании страницы (использование индекса):
- Определи тип страницы → какие индексы читать
- Review букмекера: reviews/imgs + bonuses/imgs (для блока про бонусы)
- Bonus-page: bonuses/imgs + reviews/imgs (для logo)
- Guide: guides/imgs + reviews/imgs (для абстрактных примеров)
- Sport-hub: sport-categories/imgs + reviews/imgs
- Homepage: любые, приоритет по quality
- Приоритет: usable=true + quality 9-10 сначала

### Обработка картинок (уникализация):
- ИСХОДНИК: 01.RAW/web-clips/<тип>/imgs/<original>.png (не двигать!)
- Копируй в: 01.RAW/assets/<brand>/<original>.png
- Обработай через scripts/process-clip-image.sh (см. IMAGE STRATEGY)
- Финал: 07.SITES/<site>/public/images/<brand>/<seo-name>.webp

### Если картинки не хватает:
- НЕ используй нерелевантную "потому что есть"
- Отметь: images_needed: ["описание1", "описание2"] в frontmatter страницы

## IMAGE STRATEGY (уникализация для сетки)

### Варианты уникализации по сайтам:
- site-01: variant=1 — жёлтая рамка 8px, размер 1200px, quality 85
- site-02: variant=2 — синяя рамка 6px, размер 1100px, quality 88
- site-03: variant=3 — скруглённые углы, размер 1000px, quality 82
- site-04: variant=4 — тёмный градиент по углам, quality 90
- site-05: variant=5 — mockup ноутбука (шаблон 06.DESIGN/mockup-laptop.png)

### Обязательно:
- WebP формат (кроме logo с прозрачностью → PNG lossless)
- ≤200KB финальный размер
- Стирать EXIF (уже в скрипте, но проверять)
- Разные alt-теги для одной картинки на разных сайтах
- Разные имена файлов между сайтами

## ALWAYS ASK BEFORE
- Удалять страницы из 02.WIKI/
- Деплоить на продакшен
- Массовые правки в нескольких сайтах одновременно

## NEVER
- Не пиши контент на английском для румынского сайта
- Не дублируй контент между сайтами без rewrite ≥75%
- Не используй AI-клише (см. LANGUAGE RULES)
- Не удаляй файлы в 01.RAW/ — immutable source of truth
- Не переиспользуй картинки между сайтами без трансформации variant
```

### 2.4. Дополнительные `.mdc` правила (контекстные)

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
- ОБЯЗАТЕЛЬНО YAML-frontmatter (см. PAGE FORMAT в .cursorrules)
- Минимум 3 cross-links [[link]] на странице
- Структура: H1 → intro → H2 секции → H3 при необходимости
- После создания страницы — добавь в 02.WIKI/index.md
```

**`.cursor/rules/romanian-content.mdc`:**
```markdown
---
description: Правила румынского контента
globs: 07.SITES/**/*.{md,mdx,astro,html}, 02.WIKI/**/*.md
alwaysApply: false
---

# Romanian Content Rules
- Язык: ro-RO. Никаких en/ru в финальном контенте.
- Локальные термины: pariuri sportive, cote, bonus, rulaj, retragere
- Числа: 1.000.000 (точка = разделитель тысяч в RO)
- Валюта: RON / lei
- Даты: DD.MM.YYYY
- Диакритика обязательна: ă, â, î, ș, ț
```

**`.cursor/rules/astro-sites.mdc`:**
```markdown
---
description: Правила для Astro-сайтов
globs: 07.SITES/**/*
alwaysApply: false
---

# Astro Sites Rules
- Astro 4+, TypeScript, Tailwind
- output: 'static'
- Каждая review-страница: schema.org Review + Organization
- <Image /> с lazy loading
- Sitemap.xml через @astrojs/sitemap
- Hreflang: ro-RO
```

### 2.5. Git и .gitignore

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
*.log
EOF

git add .
git commit -m "Initial: vault structure + Cursor rules"
```

### ✅ Чек-лист конца Дня 2

- [ ] 12+ папок в корне vault созданы
- [ ] `.cursorrules` в корне (проверить `ls -la .cursorrules`)
- [ ] 3 файла в `.cursor/rules/`
- [ ] `02.WIKI/index.md` и `02.WIKI/log.md` существуют
- [ ] `.gitignore` включает `.env`, `node_modules`, `logs`
- [ ] Git инициализирован, первый коммит

---

## <a name="часть-3"></a>🔍 Часть 3. Discovery конкурентов через Screaming Frog (День 3)

**Ключевая идея:** сначала находим все URL конкурентов (Screaming Frog), потом их парсим (Firecrawl), и только ПОТОМ строим SEO-стратегию и структуру сайта на основе найденного.

### 3.1. Установка Screaming Frog

1. https://www.screamingfrog.co.uk/seo-spider/ → Download for macOS
2. Установить как обычное приложение
3. Free версия = 500 URL/сайт (хватит для большинства румынских порталов)

### 3.2. Сайты для сканирования (8 конкурентов)

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

### 3.3. Настройка Screaming Frog перед сканированием

**Configuration → Include** (regex, релевантные страницы):
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
```

**Configuration → Exclude** (мусор):
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
- ❌ Check Images
- ❌ Check CSS
- ❌ Check JavaScript
- ❌ Check External Links
- ❌ Check Hreflang
- ✅ Follow Internal "nofollow" Links

**Configuration → Speed:**
- Max Threads: 5
- Max URLs/s: 2

**Configuration → HTTP Header → User-Agent:** Chrome (последний)

### 3.4. Сканирование каждого сайта

1. В поле URL: `https://legalbet.ro`
2. **Start** → ждать 5-15 минут
3. Вкладка **Internal** → фильтр `Status Code = 200`, `Content = text/html`
4. **Export** (или Bulk Export → Response Codes → Success 2xx Inlinks → CSV)
5. Сохранить в: `01.RAW/discovery/legalbet/urls-raw.csv`
6. Повторить для остальных 7 сайтов

### 3.5. Объединение и классификация в Cursor

После того как все 8 CSV сохранены, в Cursor Composer (Cmd+I):

```
объедини URLs из discovery
```

Cursor выполнит `DISCOVERY WORKFLOW` из `.cursorrules`:
- Прочтёт все CSV
- Отфильтрует по статусу и мусору
- Классифицирует по URL-паттернам
- Создаст 5 txt-файлов + сводный CSV
- Покажет отчёт

Ожидаемый результат:
```
01.RAW/discovery/urls-reviews.txt     (200-300 URL)
01.RAW/discovery/urls-bonuses.txt     (300-500 URL)
01.RAW/discovery/urls-guides.txt      (400-600 URL)
01.RAW/discovery/urls-ratings.txt     (100-200 URL)
01.RAW/discovery/urls-sport.txt       (300-500 URL)
```

### 3.6. Приоритизация (сокращаем до ТОП-20%)

**Не клипаем всё** — оставляем самое важное:

```
приоритизируй URLs discovery

Для каждого файла urls-*.txt оставь топ-20% приоритетных URL. 
Приоритет по эвристике:
1. Глубина в структуре сайта (Depth из CSV) — чем меньше, тем важнее
2. Content-Length — длинные статьи важнее (>3000 символов)
3. Title содержит целевые кейворды: recenzie, bonus, cel mai bun
4. Уникальность темы (не 5 статей про Superbet, а по одной с топ-5 доменов)

Сохрани в: 01.RAW/discovery/urls-<type>-priority.txt
Итого должно получиться:
- reviews: ~100
- bonuses: ~150
- guides: ~100
- ratings: ~50
- sport: ~100

Всего: ~500 URL (влезает в Firecrawl Free план)
```

### ✅ Чек-лист конца Дня 3

- [ ] Screaming Frog установлен
- [ ] 8 сайтов просканированы, CSV в `01.RAW/discovery/<домен>/urls-raw.csv`
- [ ] Cursor объединил и классифицировал → 5 txt файлов
- [ ] Приоритизация сделана → 5 `*-priority.txt` файлов по 100-150 URL
- [ ] Итого ~500 URL готовы к клиппингу

---

## <a name="часть-4"></a>🔥 Часть 4. Автоклиппинг через Firecrawl (День 4)

### 4.1. Как работает Firecrawl

**Firecrawl — облачный SaaS** (не работает локально):
```
ВАШ MAC                              ОБЛАКО FIRECRAWL
Node.js скрипт   → HTTPS URL →       Headless Chrome
+ API key        ← markdown ←        Прокси-сеть, anti-bot
Сохраняет в vault локально
```

- Chrome и парсинг работают в облаке
- Обходит блокировки через прокси
- Возвращает **чистый markdown** без навигации/футера
- Free план = 500 credits/мес (1 URL = 1 credit)
- Hobby $16/мес = 3000 credits

### 4.2. Регистрация и API ключ

1. https://firecrawl.dev → Sign up
2. Dashboard → API Keys → скопировать ключ (`fc-xxx...`)
3. Free план активен автоматически

### 4.3. Настройка `.env`

В корне vault:

```bash
cat > .env << 'EOF'
# Firecrawl API
FIRECRAWL_API_KEY=fc-ВАШ_КЛЮЧ_СЮДА

# Настройки батча
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

# Проверить что .env в .gitignore
grep '^.env$' .gitignore || echo '.env' >> .gitignore
```

### 4.4. Установка Node зависимостей

```bash
cd scripts
npm init -y
npm install @mendable/firecrawl-js dotenv p-limit yaml
```

> **Если ошибка `Class extends value undefined`:** переустановить Node:
> ```bash
> brew uninstall --ignore-dependencies node
> rm -rf ~/.npm ~/.node-gyp
> brew install node
> ```

### 4.5. Создание скриптов

В Cursor Composer (Cmd+I), из корня vault:

```
Создай два скрипта в scripts/ для автоматического клиппинга через Firecrawl:

## scripts/firecrawl-single.js — тест одного URL

Использование:
node firecrawl-single.js <URL> <тип>
Пример: node firecrawl-single.js https://legalbet.ro/superbet reviews

Функциональность:
1. Читает FIRECRAWL_API_KEY из ../.env (корень vault)
2. Использует @mendable/firecrawl-js SDK
3. Вызывает firecrawl.scrapeUrl(url, {
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
   title: <metadata.title>
   source: <URL>
   domain: <хост>
   published: <metadata.publishedTime если есть>
   clipped: <today>
   language: ro-RO
   type: web-clip
   source_type: <тип>
   firecrawl_credits_used: 1
6. Вывод: путь, размер markdown, credits
7. Ошибки: понятное сообщение + exit 1

## scripts/firecrawl-batch.js — батч

Использование:
node firecrawl-batch.js <тип> <urls-file>

Функциональность:
1. Читает список URL (1 на строку, # = комментарий)
2. p-limit параллельность = FIRECRAWL_CONCURRENCY
3. Логика firecrawl-single.js для каждого URL
4. Rate limiting: FIRECRAWL_RATE_LIMIT_MS
5. Retry: FIRECRAWL_RETRY_ATTEMPTS при 5xx/timeout
6. Skip логика: если файл уже есть — пропустить (возобновляемость)
7. Прогресс в консоли: [42/500] processed, 8 errors, 15 skipped
8. Логи в ../logs/firecrawl-YYYY-MM-DD.log
9. Graceful shutdown (Ctrl+C): сохранить прогресс
10. Финальный отчёт:
    - Всего/успешно/ошибок/skipped
    - Credits used
    - Средний размер markdown
    - Время работы
    - Список failed URLs

## scripts/package.json — npm-скрипты

"scripts": {
  "test-single": "node firecrawl-single.js",
  "batch-reviews": "node firecrawl-batch.js reviews ../01.RAW/discovery/urls-reviews-priority.txt",
  "batch-bonuses": "node firecrawl-batch.js bonuses ../01.RAW/discovery/urls-bonuses-priority.txt",
  "batch-guides": "node firecrawl-batch.js guides ../01.RAW/discovery/urls-guides-priority.txt",
  "batch-ratings": "node firecrawl-batch.js ratings ../01.RAW/discovery/urls-ratings-priority.txt",
  "batch-sport": "node firecrawl-batch.js sport-categories ../01.RAW/discovery/urls-sport-priority.txt",
  "batch-all": "npm run batch-reviews && npm run batch-bonuses && npm run batch-guides && npm run batch-ratings && npm run batch-sport"
}

Дополнительно:
- Валидация: URL должны быть HTTPS
- Slug generation: транслитерация ro-RO → латиница, lowercase, дефисы
- Frontmatter парсибельный (используй yaml пакет)
- Skip если markdown < 300 символов (пустой ответ)

Покажи оба скрипта, я проверю перед первым запуском.
```

### 4.6. Тест на одном URL

```bash
cd scripts
node firecrawl-single.js "https://legalbet.ro/superbet-recenzie/" reviews
```

Ожидаемый вывод:
```
🔥 Firecrawl scraping: https://legalbet.ro/superbet-recenzie/
✅ Success! (4.2s)
📄 Markdown: 8,432 chars
💾 Saved: 01.RAW/web-clips/reviews/2026-07-10-legalbet.ro-superbet-recenzie.md
💳 Credits: 1 used / 499 remaining
```

Откройте файл в Obsidian → должен быть **чистый markdown**, без нав/футера, с корректным frontmatter.

### 4.7. Батч всех типов

```bash
# По одному типу за раз (или все сразу через batch-all)
npm run batch-reviews
npm run batch-bonuses
npm run batch-guides
npm run batch-ratings
npm run batch-sport
```

Или через Cursor Composer:
```
autoclip reviews
autoclip bonuses
autoclip guides
autoclip ratings
autoclip sport-categories
```

Cursor покажет сводку → жди «поехали» → запустит `npm run batch-<тип>` → мониторит через tail логов.

### 4.8. Постобработка (Cursor автоматом)

После завершения батча Cursor выполнит согласно `.cursorrules`:
- Клипы <500 слов → `_trash/`
- Ошибочные HTTP → `_errors/`
- Классификация каждого по букмекеру
- Обновление frontmatter (word_count, quality_score)
- Отчёт по итогам

### ✅ Чек-лист конца Дня 4

- [ ] Firecrawl API ключ получен
- [ ] `.env` создан, `.env` в .gitignore
- [ ] npm пакеты установлены (`ls scripts/node_modules/` → пусто? запустить `npm install`)
- [ ] `firecrawl-single.js` работает на тестовом URL
- [ ] Батч по 5 типам выполнен → ~500 клипов в `01.RAW/web-clips/*/`
- [ ] Скриншоты в `imgs/` каждого типа
- [ ] Логи в `logs/firecrawl-*.log`

---

## <a name="часть-5"></a>📊 Часть 5. Ahrefs — свои SEO-данные (День 5)

Параллельно с discovery работаем с Ahrefs для получения **ваших** SEO-данных (кейвордов, gap, top pages).

### 5.1. Экспорт 1: Organic Keywords конкурентов

Для каждого из 15-20 букмекеров (не сайтов-конкурентов, а самих букмекеров типа Superbet, Betano):

1. Ahrefs → Site Explorer → домен (`superbet.ro`)
2. Organic search → Organic keywords
3. Фильтры: Country=Romania, Position 1-50, Volume ≥100
4. Export → CSV, Full export, UTF-8
5. Сохранить: `01.RAW/ahrefs/keywords/<bookmaker>-keywords.csv`

**Сэкономьте время:** Tools → Batch Analysis → загнать все 20 доменов разом.

### 5.2. Экспорт 2: Content Gap (золотая жила)

1. Ahrefs → Competitive Analysis → Content Gap
2. Target: оставить пустым
3. Competitors: добавить все 15-20 доменов букмекеров
4. Фильтры: Volume ≥100, Position ≤30
5. Export → `01.RAW/ahrefs/content-gap.csv`

### 5.3. Экспорт 3: Top Pages конкурентов

Для топ-5 (Superbet, Betano, Unibet, Fortuna, Mozzart):
1. Site Explorer → Top pages → Country=Romania, sort by Traffic
2. Export → `01.RAW/ahrefs/top-pages-<bookmaker>.csv`

### 5.4. Экспорт 4: Keyword Research по seed-фразам

Ahrefs → Keywords Explorer → введите seed-фразы:
- `pariuri sportive`
- `case de pariuri`
- `bonus pariuri`
- `pariuri online`
- `cele mai bune case de pariuri`
- `recenzii pariuri`
- `ponturi pariuri`
- `cum sa pariez`

Для каждой: вкладка Matching terms → Country=Romania, Volume ≥50 → Export.
Сохранить в: `01.RAW/ahrefs/seeds/<seed>.csv`

### 5.5. Дополнительно: Регуляторика

1. https://onjn.gov.ro → Operatori licențiați → PDF реестра
2. Сохранить в: `01.RAW/regulatory/onjn-licenses-2026.pdf`

### ✅ Чек-лист конца Дня 5

```bash
ls 01.RAW/ahrefs/keywords/ | wc -l    # ≥15
ls 01.RAW/ahrefs/seeds/ | wc -l       # 8
ls 01.RAW/ahrefs/                     # содержит content-gap.csv, top-pages-*.csv
ls 01.RAW/regulatory/                 # содержит ONJN PDF
```

---

## <a name="часть-6"></a>🧠 Часть 6. Первый ingest + структура сайта (Дни 6-7)

Теперь у нас есть **всё сырьё**:
- Ahrefs данные о рынке (свой seed keyword research)
- 500 клипов конкурентов через Firecrawl
- Screaming Frog карты сайтов конкурентов (URL структуры)
- Регуляторика

### 6.1. Ingest 1: Регуляторика (разминка)

В Cursor Composer (Cmd+I):

```
ingest 01.RAW/regulatory/

Цель: базовая wiki по регулированию беттинга в Румынии (ONJN, налоги,
лимиты, joc responsabil). Это основа для всех страниц сайта.

Перед записью в 02.WIKI/:
1. Покажи список выделенных топиков (5-10 штук)
2. После моего "ок" — создавай страницы по PAGE FORMAT
3. Обнови index.md и log.md

Язык wiki-страниц: ro-RO.
```

### 6.2. Ingest 2: Ahrefs + Discovery → SEO стратегия

Ключевой промпт — здесь мы **строим стратегию** на основе данных конкурентов, а не гадаем.

```
ingest 01.RAW/ahrefs/ + 01.RAW/discovery/

Задача: построить SEO-стратегию сайта на основе анализа рынка.

Источники:
- 01.RAW/ahrefs/keywords/*.csv — organic keywords 15-20 букмекеров
- 01.RAW/ahrefs/seeds/*.csv — keyword research по 8 seed
- 01.RAW/ahrefs/content-gap.csv — упущенные ключи
- 01.RAW/discovery/urls-all.csv — URL структуры 8 review-сайтов
  (это НЕ букмекеры, это конкуренты нашего будущего сайта)

Создай в 03.SEO/:

1. keyword-research.md — кластеры кейвордов:
   - Группировка по интенту (informational / commercial / transactional)
   - Для каждого кластера: список ключей, total volume, средний KD
   - Отметь Quick wins (KD<15 + volume≥500)

2. competitors-structure.md — анализ структуры review-сайтов:
   - Из discovery URL: какие типы страниц есть у каждого конкурента
   - Сравнительная таблица: у кого есть /ponturi, у кого /academia,
     у кого /clasament, у кого /bonusuri по категориям
   - Уникальные типы страниц у топ-конкурентов (что можно скопировать)

3. content-cluster-map.md — Hub & Spoke структура НАШЕГО сайта:
   - Учитывай structure конкурентов + наши доступные ресурсы
   - Финальная карта URL: /recenzii/, /bonusuri/*/, /ghiduri/*/, 
     /sport/*/, /ponturi/*/ (заглушки), E-A-T страницы
   - Для каждого раздела: приоритет 1/2/3

4. master-plan.md — 90-дневный план публикаций:
   - Приоритет 1 (Quick wins): низкая конкуренция + хороший объём
   - Приоритет 2: средний объём + средняя конкуренция
   - Приоритет 3: high-volume но конкурентно (на потом)
   - Для каждой страницы: title, target keyword, intent, est. words,
     ссылки на raw источники в 01.RAW/

Перед созданием файлов покажи мне:
- Топ-20 кластеров кейвордов с объёмами
- Структуру Hub & Spoke (визуально или списком)
- Топ-30 страниц для первого спринта

Жду "поехали" перед созданием файлов.
```

**Это самый важный ingest всего проекта** — здесь формируется структура и приоритеты. Не спешите, проверяйте что Cursor предлагает, спорьте с ним.

### 6.3. Ingest 3: Досье букмекеров

```
ingest 01.RAW/ahrefs/keywords/ + 01.RAW/web-clips/reviews/

Создай в 04.COMPETITORS/ по одному файлу на каждого букмекера
из ТОП-15-20 (Superbet, Betano, Unibet, Fortuna, Mozzart, Casa 
Pariurilor, NetBet, Efbet, Princess-bet, Winbet, MaxBet, PublicWin, 
Baumbet, MagicJackpot, 888, plus 3-5 на твой выбор).

Формат по COMPETITOR DOSSIER FORMAT из .cursorrules.

Источники:
- 01.RAW/ahrefs/keywords/<bookmaker>.csv — какой трафик, страницы
- 01.RAW/web-clips/reviews/*.md — что пишут о них конкуренты
- При недостатке данных — web search или отметь [INCOMPLETE]

Параллельно обнови:
- 02.WIKI/competitors-overview.md — сводная таблица
- 02.WIKI/index.md — новые страницы в категорию "Конкуренты"

Покажи мне план ДО старта: список 15-20 букмекеров + пробелы данных.
```

### 6.4. Ingest 4: Каталог бонусов

```
ingest 01.RAW/web-clips/bonuses/

Задача: построить каталог бонусов сайта.

Шаг 1 — Аудит:
- Сколько бонусов упоминается в клипах?
- Классификация по категориям:
  * bonus-de-bun-venit (welcome)
  * fara-depunere (no deposit)
  * cashback
  * rotiri-gratuite (free spins/free bets)
  * pariu-fara-risc (risk-free)
  * incarcare (reload)
  * VIP / loialitate
- Таблица: категория → сколько бонусов → каких букмекеров

Шаг 2 — Wiki (в 02.WIKI/bonuses/):
- Одна wiki-страница на КАТЕГОРИЮ (7-8 штук)
- Каждая: определение, типичные условия, top-list букмекеров

Шаг 3 — Обнови index.md и log.md

Перед шагом 2 — покажи план категорий + count, жди "поехали".
```

### 6.5. Ingest 5: Гайды для новичков

```
ingest 01.RAW/web-clips/guides/ + 01.RAW/ahrefs/seeds/

Задача: план гайдового хаба (15-25 статей).

Шаг 1 — План:
- Разбивка на 4 категории:
  * notiuni-de-baza (5-7 гайдов)
  * strategii (4-5)
  * gestionarea-banilor (3-4)
  * psihologie (3-4)
- Для каждого гайда: title, target keyword (Ahrefs volume), длина,
  есть ли исходники в клипах

Показать план таблицей → "поехали"

Шаг 2 — Wiki концепты (02.WIKI/concepts/):
- Ключевые понятия: cota, rulaj-rollover, value-betting, martingale,
  bankroll, kelly-criterion
- Каждая: определение + формула + пример + связи

Шаг 3 — Обнови index.md и log.md
```

### 6.6. Lint после всех ingest'ов

```
lint 02.WIKI/

Найди:
- Дубли страниц или почти-дубли (>70% совпадения по теме)
- Сирот (страницы без inbound links)
- Концепты, упомянутые в тексте но без своих страниц
- Пробелы в данных (что стоит дозагрузить)

После показа списка — жду "Fix all".
```

### ✅ Чек-лист конца Дня 7

```bash
ls 02.WIKI/ | wc -l           # ≥50 файлов
ls 04.COMPETITORS/ | wc -l    # 15-20
ls 03.SEO/                    # keyword-research, competitors-structure,
                              #   content-cluster-map, master-plan
cat 02.WIKI/log.md             # 5-6 ingest записей
```

Откройте Obsidian → Graph View → должна быть плотная сеть связей.

---

## <a name="часть-7"></a>🖼️ Часть 7. Работа с картинками

### 7.1. Индексация картинок

После завершения всех клип-батчей у вас 5 куч картинок:
```
01.RAW/web-clips/reviews/imgs/           (~150-300 картинок)
01.RAW/web-clips/bonuses/imgs/           (~100-200)
01.RAW/web-clips/guides/imgs/            (~100-200)
01.RAW/web-clips/ratings/imgs/           (~50-100)
01.RAW/web-clips/sport-categories/imgs/  (~50-100)
```

В Cursor Composer:

```
reindex images

Проиндексируй все .png/.jpg/.webp/.gif в:
- 01.RAW/web-clips/reviews/imgs/
- 01.RAW/web-clips/bonuses/imgs/
- 01.RAW/web-clips/guides/imgs/
- 01.RAW/web-clips/ratings/imgs/
- 01.RAW/web-clips/sport-categories/imgs/

Работай батчами по 20:
1. Открывай (visual analysis)
2. Определяй: bookmaker, type, theme, quality (1-10), usable
3. Записывай в _index.json той же папки

Итоговый отчёт:
- Всего обработано: X
- Распределение по букмекерам
- Топ-10 тем
- Игнорируемых: сколько и почему
```

### 7.2. Инкрементальная индексация (при добавлении новых картинок)

```
index new images

Проверь _index.json во всех папках web-clips/*/imgs/.
Проиндексируй только файлы которых нет в _index.json (инкрементал).
Не трогай уже индексированные.

Отчёт по каждой папке: было X, добавлено Y, всего Z.
```

### 7.3. Скрипт уникализации `scripts/process-clip-image.sh`

```
Создай scripts/process-clip-image.sh для уникализации картинок 
между сайтами сетки.

Принимает: source_path bookmaker_slug image_type site_variant seo_keyword

Логика:
1. Ресайз под размер сайта:
   - variant 1: 1200px, quality 85
   - variant 2: 1100px, quality 88
   - variant 3: 1000px, quality 82
   - variant 4: 1150px, quality 90
   - variant 5: 1080px, quality 85

2. Уникальная трансформация:
   - variant 1: жёлтая рамка 8px + caption сверху
   - variant 2: обрезка 5% сверху + синяя рамка 6px
   - variant 3: скруглённые углы 20px + shadow
   - variant 4: тёмный градиент по углам
   - variant 5: помещение в mockup ноутбука (06.DESIGN/mockup-laptop.png)

3. Для logo (независимо от variant):
   - 300x300 max, сохранение прозрачности
   - PNG lossless

4. Метаданные:
   - magick -strip (первичная зачистка)
   - exiftool -all= -overwrite_original (вторичная)

5. Финал WebP (кроме logo):
   - cwebp -q <QUALITY>

6. Уникальное имя:
   <bookmaker>-<type>-<seo-keyword>-<random-4chars>.webp

7. Путь output:
   07.SITES/site-0<VARIANT>-ro/public/images/<bookmaker>/

8. Вывод пути готового файла (Cursor подхватит)

Используй ImageMagick + exiftool + cwebp (уже установлены через brew).
После создания — chmod +x scripts/process-clip-image.sh
```

### 7.4. Master-промпт использования картинок при написании страниц

Сохраните в `05.TEMPLATES/prompts/process-clips-images.md`:

```markdown
# Prompt: Process new web clips → uniquified images

## Использование
Запускай при написании конкретной страницы для конкретного сайта.

## Параметры
- SITE: site-01-ro | site-02-ro | ...
- VARIANT: 1 | 2 | 3 | 4 | 5

## Промпт:

process new clips → SITE (variant=VARIANT)

Pipeline из IMAGE INDEX WORKFLOW в .cursorrules.

Шаг 1 — Найди клипы без images_processed=true.
Покажи таблицу: | Клип | Картинок | Игнор | К обработке | Букмекер |

Шаг 2 — Жди "поехали".

Шаг 3 — Для каждой картинки:
- type определи по индексу
- seo-keyword из контекста абзаца
- вызови: bash scripts/process-clip-image.sh <src> <bookmaker> <type> VARIANT <keyword>
- обнови markdown клипа с новым путём + новый alt-тег (варьируй под сайт)

Шаг 4 — Frontmatter клипа:
    images_processed: true
    images_processed_at: <today>
    images_output_site: SITE

Шаг 5 — Отчёт:
| Клип | Обработано | Путь | Средний размер |
```

---

## <a name="часть-8"></a>🎨 Часть 8. Astro-сайт: дизайн и генерация страниц (Дни 8-12)

### 8.1. Создание Astro проекта

```bash
cd 07.SITES
npm create astro@latest site-01-ro
```

В мастере:
- Template → **Blog** (или Empty)
- Install deps → **Yes**
- TypeScript → **Yes, Strict**
- Initialize git → **No** (общий git в корне vault)

```bash
cd site-01-ro
npm install @astrojs/sitemap @astrojs/tailwind
```

### 8.2. Дизайн-спека через Cursor

```
Создай 06.DESIGN/site-01-spec.md — детальную дизайн-спеку.

Контекст:
- Ниша: румынский беттинг, аудитория м/25-45, активные беттеры
- Конкуренты: тёмные темы + красные/жёлтые акценты (Superbet, Betano)
- Наша палитра должна отличаться — уникальная

Содержит:
1. Цветовая палитра (4-5 hex)
2. Шрифты (heading + body, поддержка ro-RO диакритики: ă, â, î, ș, ț)
3. Структура главной (hero, ТОП-15 таблица, разделы)
4. Структура review-страницы (hero, quick-rating, плюсы/минусы, CTA, FAQ)
5. UI компоненты: StarRating, BookmakerCard, BookmakerTable, ProsCons,
   BonusBadge, CallToAction
6. Адаптивность mobile-first

Затем сгенерируй компоненты в 07.SITES/site-01-ro/src/components/.
Использовать Tailwind.
```

### 8.3. Layouts и служебные страницы

```
Создай в 07.SITES/site-01-ro/src/layouts/:

1. BaseLayout.astro — общий (head с meta, hreflang=ro-RO, schema base),
   header (logo + navigation: Acasă/Recenzii/Bonusuri/Ghiduri/Sport/Ponturi),
   footer (юр.инфо, 18+, ONJN, jocresponsabil, дисклеймер)

2. ReviewLayout.astro — для review букмекеров
3. BonusLayout.astro — для страниц бонусов
4. GuideLayout.astro — для гайдов
5. CategoryLayout.astro — для hub-страниц

Плюс страницы в src/pages/:
- metodologie.astro (как делаем рейтинги)
- despre-noi.astro
- contact.astro
- termeni-si-conditii.astro
- politica-de-confidentialitate.astro
- joc-responsabil.astro (обязательно для RO!)

Все на румынском.
```

### 8.4. Генерация review-страниц

```
build reviews

Создай review-страницы для всех букмекеров из 04.COMPETITORS/.

Для каждого:
- Путь: 07.SITES/site-01-ro/src/content/reviews/<slug>.md
- ReviewLayout
- 3000-5000 слов
- Структура из PAGE TYPES REGISTRY в .cursorrules
- Schema.org: Review + Organization
- Cross-links: 5-8

Картинки бери через IMAGE INDEX WORKFLOW:
- process new clips → site-01-ro (variant=1)
- каждый review = 5-7 картинок (hero, bonus, mobile, plati, sport)

Пиши на ro-RO, без AI-клише. Стиль: экспертный, но живой.
Vary lengths: 3000, 3500, 4000, 4500, 5000 (не одинаковые!).

Отчёт: сколько написано, средний размер, картинок использовано.
```

### 8.5. Каталог бонусов

```
build bonus catalog

Продакшн-страницы (в 07.SITES/site-01-ro/src/content/):
- Для каждой из 7-8 категорий:
  * Hub-страница: /bonusuri/<categorie>/ по 05.TEMPLATES/category-hub.md
- Для каждого бонуса × букмекер (~30-50 штук):
  * Bonus page: /bonusuri/<categorie>/<bookmaker> по 05.TEMPLATES/bonus-page.md
- Главная категорий: /bonusuri/ (общий hub)

Cross-linking:
- Каждая bonus-page → review этого букмекера
- Каждая bonus-page → 2-3 других бонуса той же категории
- Обнови review-страницы: блок "Bonusuri disponibile" со ссылками

Картинки: process new clips → site-01-ro (variant=1) 
для клипов из 01.RAW/web-clips/bonuses/

Отчёт: X hub + Y bonus-pages, cross-links проставлены.
```

### 8.6. Гайды для новичков

```
build guides hub

Продакшн-гайды в 07.SITES/site-01-ro/src/content/ghiduri/:
- 15-25 статей по 05.TEMPLATES/guide-page.md
- 1500-3000 слов каждый
- Обязательно ПРИМЕРЫ (числа: 100 RON, cotă 1.85)
- Румынские команды: FCSB, CFR Cluj, Simona Halep
- Cross-links: 3-5 related guides + глоссарий
- Картинки через IMAGE INDEX WORKFLOW

Category hubs (4 штуки): /ghiduri/<categorie>
Главный hub: /ghiduri/ с всеми категориями + featured

Rewrite ≥85% от источников (гайды копируются между конкурентами).
```

### 8.7. Sport hubs

```
build sport hubs

Для каждого из 6-10 видов спорта (fotbal, tenis, baschet, handbal,
hochei, F1, esports):
- /sport/<sport> по 05.TEMPLATES/sport-category.md
- 2000-3500 слов
- Секции из PAGE TYPES REGISTRY
- Прогнозы: заглушка блока "Predictii recente" (заполнится через API)
```

### 8.8. E-A-T страницы

```
build E-A-T pages

Google YMYL требования для беттинга:
- /despre-noi (команда, экспертиза, миссия)
- /metodologie (критерии рейтинга с весами)
- /joc-responsabil (обязательно для RO!)
- /termeni-si-conditii
- /politica-de-confidentialitate (GDPR + RO)
- /contact

Каждая: 800-1500 слов, живой румынский.
В footer каждой страницы: 18+, jocresponsabil.ro ссылка, ONJN.
```

### 8.9. Главная страница

```
build homepage

Собери /index.astro:

1. Hero: H1 с целевым кейвордом + subheading + CTA
2. TOP-15 rating (BookmakerTable + фильтры)
3. "Как делаем рейтинг" → ссылка /metodologie
4. Категории (4 карточки): Bonusuri / Ponturi / Ghiduri / Sport
5. Featured content: последние 6 recenzii + топ-3 bonusuri + 3 гайда
6. Trust signals: цифры + badges (18+, ONJN, jocresponsabil)
7. FAQ (5-7 из content-cluster-map.md)
8. Footer

SEO:
- Title: 55-60 симв
- Meta: 155-160 симв
- Schema.org: WebSite + BreadcrumbList + FAQPage
- Hreflang ro-RO
```

### 8.10. Технический SEO

```
Создай:
- src/pages/sitemap-index.xml.ts
- src/pages/robots.txt.ts
- src/pages/rss.xml.ts (RSS блога)
- src/middleware.ts (hreflang headers)

Установить @astrojs/sitemap, интегрировать в astro.config.mjs
site: 'https://your-domain.ro'
```

### 8.11. Финальная проверка

```bash
cd 07.SITES/site-01-ro
npm run build      # без ошибок
npm run preview    # localhost:4321
```

- Пройтись по 10 страницам вручную
- Chrome DevTools → Lighthouse → score >95 (SEO, Performance)

Если ошибки → скопировать в Cursor: «исправь ошибки билда».

### ✅ Чек-лист конца Дня 12

```bash
cd 07.SITES/site-01-ro
ls src/content/reviews/    | wc -l   # 15-20
ls src/content/bonusuri/   | wc -l   # 30-50
ls src/content/ghiduri/    | wc -l   # 15-25
find src/pages -name "*.astro" | wc -l # 10+
npm run build                        # SUCCESS
```

Всего 150-180 страниц готовых.

---

## <a name="часть-9"></a>🚀 Часть 9. Деплой на Cloudflare Pages (День 13)

### 9.1. Купить домен

Namecheap или Porkbun. Варианты:
- `pariuri-ghid.ro`
- `top-recenzii-pariuri.com`
- `expert-pariuri.ro`

**Обязательно:** включить Whois Privacy при покупке.

### 9.2. Git репо

```bash
cd 07.SITES/site-01-ro
git init
git add .
git commit -m "Initial site"
```

На GitHub → создать **приватный** репо `site-01-ro`.

```bash
git remote add origin git@github.com:USERNAME/site-01-ro.git
git branch -M main
git push -u origin main
```

### 9.3. Cloudflare Pages

1. https://cloudflare.com → регистрация (если нет)
2. Workers & Pages → **Create application → Pages → Connect to Git**
3. Авторизовать GitHub, выбрать репо
4. Настройки:
   - Framework: **Astro**
   - Build command: `npm run build`
   - Output: `dist`
5. Save and Deploy

Через ~2 минуты будет URL `site-01-ro.pages.dev`.

### 9.4. Кастомный домен

- Pages → Custom domains → Set up
- Ввести домен
- Cloudflare попросит поменять nameservers → сделать в Namecheap
- 5-30 минут DNS propagation
- HTTPS через Cloudflare автоматически

### 9.5. Search Console + Bing

1. https://search.google.com/search-console → Add property
2. Верификация через DNS TXT (Cloudflare = один клик)
3. Sitemaps → отправить `https://your-domain.ro/sitemap-index.xml`
4. То же в https://www.bing.com/webmasters

### 9.6. Прогнозы — заглушка под API (не забыть!)

```
Создай в 09.API/ документацию:
- odds-provider-research.md — сравнение API (The Odds API, API-Sports, 
  SportMonks, OddsMatrix) для румынского рынка
- prediction-structure.md — архитектура генерации через API
- prediction-page-template.md — детальный шаблон
- daily-digest-template.md — /pontul-zilei, /biletul-zilei

Также заглушки на сайте:
- 07.SITES/site-01-ro/src/pages/ponturi/index.astro
- Категории по спорту (7 карточек с "Coming soon")
- В sitemap: priority=0.3

Реализация — отдельный этап после выбора провайдера.
```

### ✅ Чек-лист конца Дня 13

- [ ] Домен куплен с Whois Privacy
- [ ] Сайт открывается на боевом домене
- [ ] HTTPS работает
- [ ] Google Search Console подключён
- [ ] Sitemap submitted
- [ ] Прогнозы: заглушки готовы, документация API в 09.API/

---

## <a name="часть-10"></a>🔄 Часть 10. Регулярная работа и масштабирование

### Еженедельный workflow

**Понедельник — обновление данных:**
```
1. Ahrefs: свежие выгрузки → 01.RAW/ahrefs/keywords/refreshed/
2. Screaming Frog: пересканировать 1-2 конкурентов
3. Cursor: "объедини URLs из discovery" (обновит списки)
4. Firecrawl: autoclip только новых URL (skip логика)
```

**Среда — контент:**
```
Возьми из 03.SEO/master-plan.md 3 приоритетные статьи на эту неделю.
Напиши по 05.TEMPLATES/ и требованиям SEO.
Заверстай в 07.SITES/ + обнови sitemap.
Покажи дифф перед коммитом.
```

**Пятница — lint + деплой:**
```
lint 02.WIKI/
git add . && git commit -m "week X updates" && git push
(Cloudflare auto-deploy при push в main)
```

### Второй сайт сетки

Через 3-4 недели после первого:

```
generate-site site-02-ro

Используй те же данные из 04.COMPETITORS/, но:
- Rewrite ≥75% (другие формулировки, структура)
- Другая палитра из 06.DESIGN/site-02-spec.md (создай сначала)
- Другая структура главной: карточки вместо таблицы
- Другие "авторы" из 08.PBN/authors-pool.md
- Anti-detect правила из .cursorrules
- Картинки: variant=2 (синяя рамка, обрезка сверху, ...)
```

### Quarterly recrawl

Раз в 3 месяца:

```
1. Screaming Frog пересканировать все 8 сайтов
2. Cursor: "объедини URLs из discovery" (diff со старыми)
3. Найти новые URL → 01.RAW/discovery/urls-new-YYYY-MM-DD.txt
4. autoclip только новых URL
5. Cursor: "обнови 03.SEO/content-gap.md — новые темы"
6. Добавить приоритетные новые темы в master-plan.md
```

### Прогнозы через API (когда готовы)

```
1. Выбрать провайдера из 09.API/odds-provider-research.md
2. Free tier тест: fetch сегодняшних матчей
3. Написать scripts/generate-predictions.js:
   - fetch odds для приоритетных лиг (Liga 1, EPL, La Liga...)
   - cross-reference odds от 3-5 букмекеров → find value
   - LLM generation текста прогноза по шаблону
   - commit в git → Cloudflare auto-deploy
4. Cron / GitHub Action:
   - Daily 06:00 RO time
   - Обновление /ponturi/pontul-zilei, /ponturi/<sport>/*
5. Первые 30 дней ручной валидации качества
```

---

## 📊 Итоговый чек-лист по неделям

### Неделя 1: Установка + Discovery
- [ ] День 1-2: Homebrew, Node, Obsidian, Cursor, папки, .cursorrules, git
- [ ] День 3: Screaming Frog + сканирование 8 сайтов + объединение URL
- [ ] День 4: Firecrawl setup + скрипты + первый батч (500 URL)
- [ ] День 5: Ahrefs экспорты + регуляторика

### Неделя 2: Ingest + структура
- [ ] Дни 6-7: Ingest регуляторики → SEO стратегия → досье букмекеров → бонусы → гайды
- [ ] Индексация картинок
- [ ] Wiki 50+ страниц, master-plan.md готов

### Неделя 3: Astro-сайт
- [ ] Дни 8-9: Astro проект + дизайн + компоненты + layouts
- [ ] Дни 10-11: Генерация review + бонусов + гайдов
- [ ] День 12: Sport hubs + E-A-T + homepage + технический SEO

### Неделя 4: Деплой + прогнозы
- [ ] День 13: Купить домен + git push + Cloudflare Pages + GSC
- [ ] Дни 14-15: Заглушки под API прогнозов + мониторинг индексации

### Дальше:
- Второй сайт сетки (недели 5-6)
- API прогнозов (недели 7-8)
- Quarterly recrawl (каждые 3 месяца)

---

## 💰 Бюджет проекта

| Категория | Разово | В месяц |
|---|---|---|
| Cursor Pro | — | $20 |
| Ahrefs (у вас есть) | — | — |
| Screaming Frog | 0 (Free 500 URL) | 0 |
| Firecrawl (первый заход) | 0 (Free 500 credits) | 0 |
| Firecrawl (если нужно больше) | — | $16 (Hobby) |
| Домен .ro | $10-15/год | — |
| Cloudflare Pages | 0 | 0 |
| VPN (для теста в RO) | — | $5-10 |
| **Минимум** | $10-15 | **$25-45/мес** |

**Экономия времени:** ~200 часов ручной работы (автосбор + автогенерация) заменяются 30 часами настройки и curation.

---

## 🆘 Типовые проблемы

| Проблема | Решение |
|---|---|
| `npm init` падает `Class extends value undefined` | `brew uninstall node && rm -rf ~/.npm && brew install node` |
| Cursor не видит `.cursorrules` | Перезапустить Cursor (Cmd+Q → снова) |
| Composer пишет на английском | Уточнить: «ОБЯЗАТЕЛЬНО ro-RO». Усилить `.cursor/rules/romanian-content.mdc` |
| Firecrawl `429 Too Many Requests` | Увеличить `FIRECRAWL_RATE_LIMIT_MS` до 500-1000 |
| Firecrawl пустой markdown | Увеличить `FIRECRAWL_WAIT_FOR_MS` до 5000 |
| `npm run build` падает | `npx astro check` → скопировать ошибки в Cursor |
| Ahrefs CSV кракозябры | Экспорт UTF-8 (не Excel-compatible) |
| Screaming Frog не находит все | Configuration → Robots.txt → Include Sitemap |
| Google не индексирует | Подождать 14-21 день, проверить robots/sitemap/noindex |

---

## 📎 Ключевые ссылки

**Идеология:**
- Karpathy LLM Wiki gist: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f

**Инструменты:**
- Cursor: https://cursor.com
- Obsidian: https://obsidian.md
- Web Clipper: https://obsidian.md/clipper
- Astro: https://docs.astro.build
- Screaming Frog: https://www.screamingfrog.co.uk/seo-spider/
- Firecrawl: https://firecrawl.dev
- Cloudflare Pages: https://pages.cloudflare.com

**Ниша (RO):**
- ONJN (регулятор): https://onjn.gov.ro
- Jocul Responsabil: https://jocresponsabil.ro

---

> **💡 Главный принцип:** discovery-first подход. Сначала анализируем что делают конкуренты (Screaming Frog + Firecrawl), потом строим свою стратегию (master-plan.md), потом генерируем сайт. Не пытайтесь спроектировать структуру заранее — рынок уже её знает.
