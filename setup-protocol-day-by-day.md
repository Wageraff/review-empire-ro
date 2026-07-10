# 🚀 Пошаговый протокол сборки системы (macOS + Cursor + Obsidian + Ahrefs)

> **Под вашу конфигурацию:**
> - 💻 macOS
> - 🤖 Cursor (вместо Claude Code)
> - 📊 Ahrefs (полная подписка)
> - 🎯 Первый сайт: ТОП-15-20 румынских букмекеров
> - ⏱ Базовый уровень Terminal (буду пояснять каждую команду)

---

https://legalbet.ro/
https://beturi.ro/
https://10pariuri.ro/
https://www.pontul-zilei.com/
https://biletu-zilei.com/
https://pariurix.com/
https://pariuriexpert.ro/
https://xbets.ro/

## 📅 План на 4 недели

| Неделя | Фаза | Главный результат |
|---|---|---|
| **1** | Установка + структура vault + правила Cursor | Cursor открывает vault, понимает структуру, готов к работе |
| **2** | Загрузка данных Ahrefs + ingest конкурентов | Wiki содержит SEO-стратегию + 15-20 досье букмекеров |
| **3** | Astro-шаблон + генерация первого сайта | Локально работающий сайт на 50-70 страниц |
| **4** | Деплой на Cloudflare + Search Console | Сайт в индексе Google |

---

# 🟢 ДЕНЬ 1. Установка софта (1.5–2 часа)

## ⚙️ Шаг 1.1 — Установить Homebrew (если ещё нет)

Homebrew — менеджер пакетов для macOS, через него установим всё остальное.

**Открываем Terminal** (Cmd+Space → пишем «Terminal» → Enter) и выполняем:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

> **Что делает:** скачивает и запускает официальный установщик. Спросит ваш пароль macOS — это нормально.

После установки выполните (терминал подскажет точные команды — скопируйте их):
```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

**Проверка:**
```bash
brew --version
```
Должно показать что-то вроде `Homebrew 4.x.x`.

## ⚙️ Шаг 1.2 — Установить Node.js, Git, ripgrep

```bash
brew install node git ripgrep
```

> **Что устанавливаем:**
> - `node` — нужен для Astro (сборка сайтов)
> - `git` — версионирование (Wiki = git-репозиторий)
> - `ripgrep` — быстрый поиск, Cursor его использует автоматически

**Проверка:**
```bash
node -v    # должно быть v20.x или v22.x
npm -v     # должно быть 10.x+
git --version
```

## ⚙️ Шаг 1.3 — Установить Obsidian

1. Откройте https://obsidian.md → **Get Obsidian** → скачайте `.dmg` для macOS
2. Перетащите Obsidian в Applications
3. Запустите. На первом экране — **«Create new vault»**
4. Имя vault: `review-empire`
5. Расположение: **`~/Documents/review-empire`** (рекомендую именно так — короткий путь, без пробелов)
6. Нажмите **Create**

## ⚙️ Шаг 1.4 — Установить Cursor

1. Откройте https://cursor.com → **Download** для macOS
2. Перетащите в Applications
3. Запустите. Пройдите авторизацию (можно бесплатно, но для нашей задачи нужен **Cursor Pro $20/мес** — оформите внутри приложения через Settings → Plans).
4. На первом экране пропустите импорт настроек VS Code.

## ⚙️ Шаг 1.5 — Подключить Obsidian-vault к Cursor

Это ключевой момент: vault Obsidian = просто папка с `.md` файлами, и Cursor работает с ней как с обычным проектом.

1. В Cursor: **File → Open Folder...**
2. Выберите папку `~/Documents/review-empire`
3. Cursor предложит «Trust this folder» — **Yes, I trust the authors**

Теперь у вас **одна и та же папка открыта в двух приложениях**:
- **Obsidian** — для чтения, графа связей, Web Clipper
- **Cursor** — для запуска Composer и генерации

> ⚠️ **Важно:** одновременно редактировать файл в обоих не нужно. Cursor пишет → Obsidian подхватывает изменения автоматически.

## ⚙️ Шаг 1.6 — Установить плагины Obsidian

В Obsidian: **Settings → Community plugins → Turn on community plugins → Browse**

Найдите и установите (каждый: Install → Enable):

| Плагин | Зачем |
|---|---|
| **Dataview** | Динамические таблицы (рейтинг букмекеров автоматом) |
| **Templater** | Шаблоны страниц |
| **Advanced Tables** | Удобное редактирование Markdown-таблиц |
| **Graph Analysis** | Расширенный граф связей |
| **Tag Wrangler** | Управление тегами |

**Obsidian Web Clipper** (отдельно, для браузера):
- Chrome/Brave: https://chromewebstore.google.com/detail/obsidian-web-clipper/
- В настройках расширения: укажите ваш vault `review-empire` и папку назначения `01.RAW/web-clips/`

## ✅ Чек-лист конца Дня 1

- [ ] Homebrew работает (`brew --version`)
- [ ] Node 20+ установлен
- [ ] Obsidian открывает vault `review-empire`
- [ ] Cursor открывает ту же папку
- [ ] Web Clipper установлен в браузере
- [ ] 5 плагинов Obsidian включены

---

# 🟢 ДЕНЬ 2. Структура vault + Cursor Rules (2–3 часа)

## ⚙️ Шаг 2.1 — Создать структуру папок

В Cursor откройте встроенный терминал: **Cmd+`** (или **View → Terminal**).

Убедитесь что вы в корне vault:
```bash
pwd
# должно показать: /Users/<ваше_имя>/Documents/review-empire
```

Создайте структуру одной командой:
```bash
mkdir -p 00.SYSTEM 01.RAW/{ahrefs,competitors,regulatory,web-clips,assets} 02.WIKI 03.SEO 04.COMPETITORS 05.TEMPLATES 06.DESIGN 07.SITES 08.PBN
```

> **Что делает:** `mkdir -p` создаёт все папки рекурсивно. Фигурные скобки `{a,b,c}` создают сразу несколько подпапок внутри `01.RAW/`.

**Проверка:**
```bash
ls -la
```
Должно показать 9 папок с префиксами `00.` – `08.`.

## ⚙️ Шаг 2.2 — Создать стартовые служебные файлы

```bash
# index.md — Карпатовский каталог
cat > 02.WIKI/index.md << 'EOF'
# Wiki Index

> Каталог всех страниц Wiki. LLM читает этот файл первым при любом query.

## Конкуренты (букмекеры)
_(пока пусто — заполнится после ingest)_

## SEO и стратегия
_(пока пусто)_

## Концепты ниши
_(пока пусто)_

## Регуляторика
_(пока пусто)_
EOF

# log.md — Карпатовский лог
cat > 02.WIKI/log.md << 'EOF'
# Wiki Log

> Append-only журнал операций. Формат: ## [YYYY-MM-DD] operation | source

## [2026-06-21] init | Wiki created
- Created empty Wiki structure
EOF

# README
cat > README.md << 'EOF'
# Review Empire

База знаний и сетка review-сайтов о румынских букмекерах.

## Структура
- 01.RAW — сырые исходники (Ahrefs CSV, скриншоты, PDF)
- 02.WIKI — автогенерируемая Wiki (Cursor пишет, я читаю)
- 03.SEO — стратегия и план контента
- 04.COMPETITORS — досье букмекеров
- 07.SITES — Astro-проекты сайтов

## Workflow
Открываю проект в Cursor → Cmd+I (Composer) → даю команду
из @CLAUDE.md (например: "ingest 01.RAW/ahrefs/").
EOF
```

> **Что делает:** `cat > file << 'EOF' ... EOF` — это «heredoc», способ записать многострочный текст в файл одной командой.

## ⚙️ Шаг 2.3 — Создать `.cursorrules` (мозг системы для Cursor)

В Cursor правила хранятся в файле `.cursorrules` в корне проекта (старый формат) или в `.cursor/rules/*.mdc` (новый формат). Используем оба для надёжности.

**Создайте файл `.cursorrules` в корне vault:**

В Cursor: **Cmd+N** → введите текст ниже → **Cmd+S** → имя файла: `.cursorrules` (точка в начале обязательна).

```markdown
# Review Empire — Cursor System Rules

## ROLE
Ты — senior SEO-инженер и контент-стратег для сетки review-сайтов
в нише "ставки на спорт / обзоры букмекеров". Основное ГЕО — Румыния.
Работаешь по модели LLM Wiki Андрея Карпатого
(https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f):
Obsidian = IDE, ты = программист, Wiki = codebase.

## LANGUAGE RULES
- Все wiki-страницы и контент сайтов — на РУМЫНСКОМ (ro-RO).
- Внутренняя коммуникация со мной — на РУССКОМ.
- Никогда не пиши шаблонный машинный перевод — используй живой
  румынский с локальными идиомами беттинг-индустрии (pariuri sportive,
  case de pariuri, cote, bonus de bun venit, rotiri gratuite).
- Запрещённые AI-клише: "В заключение", "Стоит отметить",
  "В современном мире", "Pe scurt", "Este important de menționat".

## DIRECTORY MAP
- 01.RAW/ahrefs/      — выгрузки Ahrefs (CSV)
- 01.RAW/competitors/ — скриншоты, скачанные страницы букмекеров
- 01.RAW/regulatory/  — документы ONJN, лицензии
- 01.RAW/web-clips/   — статьи из браузера через Web Clipper
- 01.RAW/assets/      — картинки локально
- 02.WIKI/            — твоя зона, ты пишешь, я читаю
  - index.md (каталог) — обновляй при каждом ingest
  - log.md (журнал)    — формат: ## [YYYY-MM-DD] op | source
- 03.SEO/             — keyword-research, content-cluster-map, master-plan
- 04.COMPETITORS/     — досье букмекеров (1 файл = 1 букмекер)
- 05.TEMPLATES/       — паттерны страниц
- 07.SITES/           — Astro-проекты

## CORE WORKFLOWS

### ingest <путь или тема>
1. Прочитай указанные файлы в 01.RAW/.
2. Выдели ключевые смысловые точки.
3. ОБСУДИ со мной key takeaways ПЕРЕД записью (human-in-the-loop).
4. Создай/обнови wiki-страницы в 02.WIKI/ по PAGE FORMAT.
5. Один источник может затронуть 10–15 страниц — это нормально.
6. Проставь cross-links через [[wiki-link]].
7. Обнови 02.WIKI/index.md (категория + ссылка + one-line summary).
8. Допиши в 02.WIKI/log.md:
   ## [YYYY-MM-DD] ingest | <source>
   - changed pages: [[page1]], [[page2]], ...
9. Если новый источник противоречит старому — НЕ удаляй старое
   молча. Создай заметку о противоречии и спроси меня.

### query <вопрос>
1. ВСЕГДА начни с чтения 02.WIKI/index.md.
2. Рекурсивно пройди по релевантным страницам через cross-links.
3. Собери полный контекст, дай ответ со ссылками [[на страницы]].
4. Если ответ содержит ценный синтез/сравнение — предложи
   сохранить его как новую страницу в 02.WIKI/.

### lint
1. Найди:
   - дубли страниц
   - противоречия между страницами
   - страницы-сироты (нет inbound links)
   - концепты, упомянутые но без своей страницы
   - устаревшие утверждения
   - пробелы в данных (нужен новый источник или web search)
2. Покажи список проблем, попроси подтверждения через "Fix all".
3. Предложи 3–5 новых вопросов для исследования.

### generate-site <site-name>
1. Прочитай 03.SEO/master-plan.md и 04.COMPETITORS/.
2. Возьми дизайн из 06.DESIGN/<site-name>-spec.md.
3. Создай Astro-проект в 07.SITES/<site-name>/.
4. Следуй анти-детект правилам из 08.PBN/pbn_network_requirements.md.
5. Сгенерируй 50–70 страниц.
6. Проверь: npm run build без ошибок, hreflang=ro-RO, schema.org.

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
+ тело Markdown с H2/H3 + минимум 3 cross-links.

## COMPETITOR DOSSIER FORMAT
- Основная инфо: лицензия ONJN №, год основания, владелец
- Бонус приветственный (с условиями отыгрыша x-rollover)
- Виды ставок и спорт (важно: fotbal, tenis, baschet — для РО)
- Платёжки (Netopia, mobilPay, Skrill, Neteller — локальные!)
- Мобильное приложение (iOS / Android, рейтинги)
- Поддержка (язык, скорость, способы)
- Плюсы / Минусы (5–7 пунктов каждое)
- Рейтинг по критериям 1–10:
  - Бонусы, Коэффициенты, UX, Скорость выплат, Поддержка
- Скриншоты: 01.RAW/assets/<bookmaker>/

## SEO RULES
- Title: 50–60 симв, главный кейворд на румынском в начале
- Meta description: 150–160 симв
- H1: один, содержит кейворд
- Перелинковка: минимум 5 контекстных ссылок на странице
- Schema.org: Review + Organization для review-страниц
- Hreflang: ro-RO

## ANTI-DETECT (для сетки сайтов)
- Уникальный rewrite ≥75% между сайтами
- Разная HTML-структура, имена CSS-классов
- Разные favicon, logo, палитра
- Whois-приватность включена
- Разные тексты T&C, About, Methodology

## ALWAYS ASK BEFORE
- Удалять страницы из 02.WIKI/
- Деплоить на продакшен
- Массово править несколько сайтов одновременно

## NEVER
- Не пиши контент на английском для румынского сайта
- Не дублируй контент между сайтами без rewrite ≥75%
- Не используй AI-клише (см. LANGUAGE RULES)
- Не удаляй файлы в 01.RAW/ — это immutable source of truth
```

После сохранения проверьте:
```bash
ls -la .cursorrules
```
Должно показать файл (с точкой в начале).

## ⚙️ Шаг 2.4 — Создать дополнительные `.mdc` правила (новый формат Cursor)

Новый формат правил Cursor — отдельные `.mdc` файлы в `.cursor/rules/`. Они **дополняют** `.cursorrules` и позволяют сделать правила контекстными (применяются только к нужным папкам).

```bash
mkdir -p .cursor/rules
```

Создайте 3 файла через Cursor (**Cmd+N** → текст → **Cmd+S** в `.cursor/rules/`):

**Файл `.cursor/rules/wiki-pages.mdc`** (применяется к 02.WIKI/):
```markdown
---
description: Правила для wiki-страниц
globs: 02.WIKI/**/*.md
alwaysApply: false
---

# Wiki Pages Rules

При создании или редактировании любого файла в 02.WIKI/:

1. ОБЯЗАТЕЛЬНО YAML-frontmatter с полями: title, type, lang, created, sources, related, tags
2. Минимум 3 cross-links [[link]] на каждой странице
3. Структура: H1 → краткое intro → H2 секции → H3 при необходимости
4. После создания страницы — допиши её в 02.WIKI/index.md в нужную категорию
```

**Файл `.cursor/rules/romanian-content.mdc`** (применяется к контенту):
```markdown
---
description: Правила румынского контента
globs: 07.SITES/**/*.{md,mdx,astro,html}, 02.WIKI/**/*.md
alwaysApply: false
---

# Romanian Content Rules

- Язык: ro-RO. Никаких слов на en/ru в финальном контенте.
- Используй локальные термины: pariuri sportive, cote, bonus, rulaj, retragere
- Запрещены кальки: "este important să" → используй "merită să"
- Числа: 1.000.000 (точка как разделитель тысяч в RO)
- Валюта: RON / lei
- Даты: DD.MM.YYYY
```

**Файл `.cursor/rules/astro-sites.mdc`**:
```markdown
---
description: Правила для Astro-сайтов
globs: 07.SITES/**/*
alwaysApply: false
---

# Astro Sites Rules

- Используй Astro 4+, TypeScript, Tailwind
- Все страницы — static (output: 'static')
- Каждая review-страница: schema.org Review + Organization
- Картинки: <Image /> компонент с lazy loading
- Sitemap.xml через @astrojs/sitemap
- Hreflang: ro-RO во всех <head>
```

## ⚙️ Шаг 2.5 — Инициализировать Git

```bash
git init
cat > .gitignore << 'EOF'
.obsidian/workspace*
.obsidian/cache
01.RAW/assets/
07.SITES/*/node_modules/
07.SITES/*/dist/
07.SITES/*/.astro/
.DS_Store
*.log
EOF

git add .
git commit -m "Initial: vault structure + Cursor rules"
```

> **Зачем:** Wiki будет накапливаться месяцами. Git даёт version history бесплатно. Карпатый: *«The wiki is just a git repo of markdown files.»*

## ✅ Чек-лист конца Дня 2

- [ ] 9 папок созданы (`ls` показывает 00.–08.)
- [ ] `02.WIKI/index.md` и `02.WIKI/log.md` существуют
- [ ] `.cursorrules` в корне (виден через `ls -la`)
- [ ] 3 файла в `.cursor/rules/`
- [ ] Git инициализирован, первый коммит сделан

---

# 🟢 ДЕНЬ 3. Выгрузка данных Ahrefs (2–3 часа)

> Это самый ценный этап: качество Wiki напрямую зависит от качества входных данных. Ahrefs даст вам реальную картину рынка, а не догадки.

## ⚙️ Шаг 3.1 — Определить ТОП-15-20 конкурентов

Откройте Ahrefs → **Site Explorer** → введите крупнейший румынский букмекер (например, `superbet.ro`) → **Organic competitors**.

Выпишите домены, которые:
- Имеют органический трафик > 10k/мес
- Это именно беттинг (не казино-only)
- Работают на румынском рынке

Стартовый список (проверьте по Ahrefs):
```
legalbet.ro
pariurix.com
beturi.ro
pontul-zilei.com
10pariuri.ro
biletu-zilei.com
supercazino.ro
jucatorul.ro
xbets.ro
pariuri1x2.ro
casepariurionline.ro
case-pariuri.ro

```

## ⚙️ Шаг 3.2 — Экспорт 1: Organic Keywords каждого конкурента

Для **каждого** домена из списка:

1. Site Explorer → введите домен → **Organic search** → **Organic keywords**
2. Фильтры:
   - Country: **Romania**
   - Position: **1-50**
   - Volume: **≥ 100**
3. Кнопка **Export** (правый верх) → **CSV, Full export, UTF-8**
4. Сохраняйте в `~/Documents/review-empire/01.RAW/ahrefs/keywords/`
5. Имя файла: `<bookmaker>-keywords.csv` (например, `superbet-keywords.csv`)

> **Сэкономьте время:** в Ahrefs есть **Batch Analysis** (Tools → Batch Analysis) — можно загнать все 20 доменов разом и экспортнуть сводный отчёт.

## ⚙️ Шаг 3.3 — Экспорт 2: Content Gap (золотая жила)

Это **самый ценный экспорт**: показывает ключи, по которым ранжируются конкуренты, но НЕ ранжируется ваш будущий сайт.

1. Ahrefs → **Competitive Analysis** → **Content Gap**
2. **Target:** оставьте пустым (у вас сайта ещё нет) ИЛИ введите ваш будущий домен
3. **Competitors:** добавьте все 15-20 доменов
4. Запустите анализ
5. Фильтры: Volume ≥ 100, Position ≤ 30
6. **Export → CSV** → сохраните как `01.RAW/ahrefs/content-gap.csv`

## ⚙️ Шаг 3.4 — Экспорт 3: Top Pages каждого конкурента

Покажет, какие *типы страниц* приносят трафик (важно для понимания структуры сайта).

Для топ-5 конкурентов (Superbet, Betano, Unibet, Fortuna, Mozzart):

1. Site Explorer → домен → **Top pages**
2. Country: Romania, Sort: Traffic desc
3. Export → сохраните как `01.RAW/ahrefs/top-pages-<bookmaker>.csv`

## ⚙️ Шаг 3.5 — Экспорт 4: Keyword Research (категории и кластеры)

1. Ahrefs → **Keywords Explorer**
2. Введите seed-кейворды по очереди:
   - `pariuri sportive`
   - `case de pariuri`
   - `bonus pariuri`
   - `pariuri online`
   - `cele mai bune case de pariuri`
   - `recenzii pariuri`
3. Для каждого: вкладка **Matching terms** → Country: Romania → Volume ≥ 50 → Export
4. Сохраните как `01.RAW/ahrefs/seeds/<seed>.csv`

Также вкладка **Related terms** для тех же seed-ов → export.

## ⚙️ Шаг 3.6 — Экспорт 5: Backlink Profile (необязательно, но полезно для PBN)

Для топ-5 конкурентов:
1. Site Explorer → **Backlinks** → **Referring domains**
2. Сортировка по DR desc
3. Export → `01.RAW/ahrefs/backlinks-<bookmaker>.csv`

## ⚙️ Шаг 3.7 — Сохранить дополнительные источники

**Регуляторика (важно для RO):**
1. Откройте https://onjn.gov.ro → раздел «Operatori licențiați»
2. Скачайте PDF реестра лицензий → положите в `01.RAW/regulatory/onjn-licenses-2026.pdf`

**Стат. данные ниши:**
1. https://www.statista.com → найдите «Online gambling Romania»
2. Сохраните PDF/скриншоты в `01.RAW/regulatory/market-stats-2026.pdf`

**Через Web Clipper в браузере:**
- Откройте топ-5 румынских беттинг-блогов (pariuri-sportive.ro, sport.ro, gsp.ro/pariuri)
- 10-15 актуальных статей → клипните в `01.RAW/web-clips/` (Web Clipper сам конвертирует в markdown)

## ✅ Чек-лист конца Дня 3

```bash
# Проверьте что у вас:
ls 01.RAW/ahrefs/keywords/ | wc -l    # должно быть ≥15
ls 01.RAW/ahrefs/seeds/ | wc -l       # должно быть 6
ls 01.RAW/ahrefs/                     # должно содержать content-gap.csv
ls 01.RAW/web-clips/ | wc -l          # должно быть ≥10
ls 01.RAW/regulatory/                 # должны быть PDF
```

---

# 🟢 ДЕНЬ 4–5. Первый ingest и построение SEO-стратегии (4–6 часов)

## ⚙️ Шаг 4.1 — Запустить Cursor Composer

В Cursor: **Cmd+I** (откроется Composer-панель) или **Cmd+L** (Chat).

> **Composer vs Chat:**
> - **Chat (Cmd+L)** — разговор, нет авто-применения изменений в файлы
> - **Composer (Cmd+I)** — agent mode, может редактировать много файлов сразу
>
> Для нашей системы используем **Composer в режиме Agent** (по умолчанию).

В правом верхнем углу Composer убедитесь что выбрана модель **Claude 4.5 Sonnet** (или новее).

## ⚙️ Шаг 4.2 — Первый promt: ingest регуляторики (разминка)

В Composer вставьте:

```
ingest 01.RAW/regulatory/

Цель: построить базовую wiki по регулированию беттинга в Румынии (ONJN, 
налоги, лимиты, ответственная игра). Это основа для всех будущих 
страниц сайта.

Перед записью в 02.WIKI/:
1. Покажи мне список выделенных топиков (5-10 штук)
2. После моего "ок" — создавай страницы по PAGE FORMAT
3. Обнови index.md и log.md

Язык wiki-страниц: ro-RO.
```

Cursor прочитает PDF (если установлен PDF reader через MCP — иначе попросит вас вручную скопировать текст; для PDF в Cursor работает встроенный парсер). Покажет список тем. Вы говорите «ок» → он создаёт 5-10 страниц в `02.WIKI/`.

> 💡 **Если Cursor не читает PDF:** в Cursor → Settings → Features → включите **«Read PDF files»**. Альтернатива: `brew install pdftotext` и потом `pdftotext file.pdf file.txt` — текстовая версия читается легко.

**Проверка:**
- Откройте `02.WIKI/index.md` — там должны появиться новые ссылки
- Откройте Obsidian → Graph View — увидите первые узлы

## ⚙️ Шаг 4.3 — Второй ingest: SEO-стратегия из Ahrefs

В Composer:

```
ingest 01.RAW/ahrefs/

Это полная выгрузка Ahrefs по 15-20 конкурентам в нише румынского 
беттинга:
- keywords/ — organic keywords каждого
- seeds/ — keyword research по 6 seed-фразам
- content-gap.csv — главный документ, упущенные кейворды
- top-pages-*.csv — самые трафиковые страницы

Создай в 03.SEO/ три ключевых документа:

1. **keyword-research.md** — кластеры кейвордов:
   - Группировка по интенту (informational / commercial / transactional)
   - Для каждого кластера: список ключей, total volume, средний KD
   - Топ-кластеры: "обзоры букмекеров", "бонусы", "способы оплаты",
     "мобильные приложения", "правила игры", "сравнения"

2. **content-cluster-map.md** — Hub & Spoke структура:
   - Hub-страницы (основные категории): рейтинг, обзоры, бонусы, гид
   - Spoke-страницы (детальные): по 1 на букмекера + по бонусам + 
     по способам оплаты + статьи блога
   - Связи между ними (визуально или списком)

3. **master-plan.md** — 90-дневный план публикаций:
   - Приоритет 1 (Quick wins): низкая конкуренция KD<15 + объём ≥500
   - Приоритет 2: средняя конкуренция + хороший объём
   - Приоритет 3: high-volume но KD>40 (на потом)
   - Для каждой страницы: title, target keyword, intent, est. words

Перед записью покажи мне:
- Топ-20 кластеров с объёмами
- Структуру Hub & Spoke
- Топ-30 страниц для первого спринта

Жду моего "поехали" перед созданием файлов.
```

Cursor вернётся с предварительным анализом. Прочитайте внимательно, скорректируйте если что-то не так (например: «убери кейворды про казино, у нас только sports»), потом разрешите создание.

## ⚙️ Шаг 4.4 — Третий ingest: досье букмекеров

В Composer:

```
ingest 01.RAW/ahrefs/keywords/ + 01.RAW/web-clips/

Создай в 04.COMPETITORS/ по одному файлу на каждого букмекера 
из списка (15-20 штук) по COMPETITOR DOSSIER FORMAT из .cursorrules.

Источники для досье:
- Ahrefs keywords/<bookmaker>.csv — какой трафик, какие страницы
- Web Clipper статьи из 01.RAW/web-clips/ — публичная инфа
- Их официальные сайты (можешь сходить если нужно через web search)

Если по букмекеру нет данных — отметь его как [INCOMPLETE] и спроси 
меня, какие дополнительные источники нужны.

Параллельно обнови:
- 02.WIKI/competitors-overview.md — сводная таблица всех букмекеров
- 02.WIKI/index.md — все новые страницы в категорию "Конкуренты"

Покажи мне план ДО старта: список 15-20 букмекеров + для каких из 
них данных недостаточно.
```

Это самый долгий ingest — займёт 30-60 минут. Cursor будет писать 15-20 файлов + сводку. Следите за процессом, отвечайте на уточняющие вопросы.

## ⚙️ Шаг 4.5 — Lint после первой большой загрузки

После всех ingest'ов запустите:

```
lint 02.WIKI/

Найди:
- Дубли страниц или почти-дубли (>70% совпадения по теме)
- Сирот (страницы без inbound links)
- Концепты, упомянутые в тексте но без своих страниц
- Пробелы в данных (что стоит дозагрузить)

После показа списка — жду моё "Fix all" чтобы применить.
```

После «Fix all» Wiki должна выглядеть так:
- `02.WIKI/` — 40-80 страниц
- `02.WIKI/index.md` — структурированный каталог
- `02.WIKI/log.md` — 4-5 записей о ingest'ах
- `04.COMPETITORS/` — 15-20 досье
- `03.SEO/` — 3 файла стратегии

## ✅ Чек-лист конца Дня 5

```bash
ls 02.WIKI/ | wc -l       # ≥40 файлов
ls 04.COMPETITORS/ | wc -l # 15-20 файлов
ls 03.SEO/                # keyword-research.md, content-cluster-map.md, master-plan.md
cat 02.WIKI/log.md         # минимум 4-5 ingest записей
```

**Откройте Obsidian → Graph View** — должна быть плотная сеть связей. Если узлы-сироты или несвязные кластеры — снова запустите `lint`.

---

# 🟢 ДЕНЬ 6–7. Astro-шаблон + дизайн (полный день)

## ⚙️ Шаг 6.1 — Создать первый Astro-сайт

В Cursor terminal:
```bash
cd 07.SITES
npm create astro@latest site-01-ro
```

В мастере выбираем:
- How would you like to start? → **Use blog template**
- Install dependencies? → **Yes**
- TypeScript? → **Yes, Strict**
- Initialize git? → **No** (у нас уже есть общий git)

После установки:
```bash
cd site-01-ro
npm install @astrojs/sitemap @astrojs/tailwind
npm run dev
```

Откроется http://localhost:4321 — увидите стандартный блог Astro.

> **Не закрывайте terminal** — оставьте `npm run dev` работать. Откройте **второй terminal** в Cursor (плюсик в panel terminal'а) для дальнейших команд.

## ⚙️ Шаг 6.2 — Сгенерировать дизайн-спеку через Cursor

В Composer:
```
Создай 06.DESIGN/site-01-spec.md — детальную дизайн-спеку для нашего 
первого review-сайта.

Контекст:
- Ниша: румынский беттинг, целевая аудитория — мужчины 25-45, 
  активные беттеры
- Конкуренты: используют преимущественно тёмные темы + красные/жёлтые 
  акценты (как Superbet, Betano)
- Чтобы не сливаться — выбери уникальную палитру

Спека должна содержать:
1. Цветовая палитра (4-5 цветов с hex-кодами)
2. Шрифты (heading + body, обязательно поддержка ro-RO диакритики)
3. Структура главной (hero, ТОП-15 таблица с фильтрами, разделы)
4. Структура review-страницы (hero, quick-rating, плюсы/минусы, 
   детальные секции, FAQ, CTA)
5. UI-компоненты: рейтинг звёздами/числами, badge'ы для бонусов, 
   таблицы, кнопки CTA
6. Адаптивность (mobile-first)

После создания спеки — сразу сгенерируй компоненты в 
07.SITES/site-01-ro/src/components/:
- StarRating.astro
- BookmakerCard.astro
- BookmakerTable.astro
- ProsCons.astro
- BonusBadge.astro
- CallToAction.astro

Используй Tailwind для стилизации.
```

Cursor сгенерирует спеку и компоненты. Откройте http://localhost:4321 чтобы посмотреть hot-reload.

## ⚙️ Шаг 6.3 — Сгенерировать макеты страниц

```
Создай в 07.SITES/site-01-ro/src/layouts/:

1. BaseLayout.astro — общий layout с <head> (meta, hreflang=ro-RO, 
   schema.org base), header (logo, navigation), footer (юр.инфо, 18+, 
   ONJN, дисклеймер)

2. ReviewLayout.astro — для страниц-обзоров букмекеров. 
   Включает hero с быстрым рейтингом + sidebar с CTA + основной 
   контент

3. CategoryLayout.astro — для категорий (бонусы, спорт, платёжки)

Также создай:
- src/pages/index.astro — главная (рейтинг ТОП-15)
- src/pages/metodologie.astro — как мы делаем рейтинги
- src/pages/despre-noi.astro — О нас
- src/pages/contact.astro
- src/pages/termeni.astro — условия

Все на румынском, с учётом 18+ дисклеймера в footer.
```

## ✅ Чек-лист конца Дня 7

```bash
cd ~/Documents/review-empire/07.SITES/site-01-ro
ls src/components/  # ≥6 компонентов
ls src/layouts/     # 3 layout
ls src/pages/       # 5+ страниц
npm run build       # должно собраться БЕЗ ошибок
```

Откройте http://localhost:4321 → главная должна выглядеть как заготовка рейтингового сайта (пусть пока с заглушками).

---

# 🟢 ДЕНЬ 8–14. Генерация контента и заполнение сайта

## ⚙️ Шаг 8.1 — Генерация review-страниц

```
generate-site site-01-ro

Создай review-страницы для всех букмекеров из 04.COMPETITORS/.

Для каждого:
- Путь: 07.SITES/site-01-ro/src/content/reviews/<slug>.md
- Используй ReviewLayout
- Длина: 2500-4500 слов (варьируй между букмекерами для уникальности)
- Структура: см. 04.COMPETITORS/<bookmaker>.md
- Schema.org: Review + Organization
- Внутренняя перелинковка: минимум 5 ссылок на другие страницы сайта

Также генерируй параллельно:
- src/content/bonusuri/<slug>.md — отдельные страницы под каждый 
  крупный бонус (топ-10)
- src/content/sport/<slug>.md — категории по видам спорта (fotbal, 
  tenis, baschet, hochei, handbal, baseball)
- src/content/plati/<slug>.md — страницы платёжек (Netopia, 
  mobilPay, Skrill, Neteller, criptomonede)

Перед началом — покажи мне план: сколько всего страниц, какие 
типы, примерное распределение. Жду "поехали".
```

Это займёт **2-4 часа**. Cursor сгенерирует 60-80 страниц.

## ⚙️ Шаг 8.2 — Главная страница и навигация

```
Теперь собери главную страницу 07.SITES/site-01-ro/src/pages/index.astro:
- Hero: H1 с главным кейвордом + краткое intro 
- Блок ТОП-15 (используй BookmakerTable, данные из 04.COMPETITORS/)
- Раздел "Как мы делаем рейтинги" → ссылка на /metodologie
- Раздел "Категории": бонусы / спорт / платёжки → карточки
- Раздел "Последние обзоры" → последние 6 review-карточек
- FAQ блок (5-7 вопросов из content-cluster-map)
- Footer с 18+, ONJN, юр.инфо

Также обнови:
- src/components/Header.astro — навигация (Acasă, Top, Bonusuri, 
  Sport, Plăți, Despre, Contact)
- src/components/Footer.astro — с обязательными элементами для RO
```

## ⚙️ Шаг 8.3 — SEO-технические страницы

```
Создай в 07.SITES/site-01-ro:
- src/pages/sitemap-index.xml.ts — генератор sitemap
- src/pages/robots.txt.ts — robots с allow всех
- src/pages/rss.xml.ts — RSS-фид для блога
- src/middleware.ts — установка hreflang headers

Также:
- Установи и настрой @astrojs/sitemap (npm install @astrojs/sitemap)
- В astro.config.mjs пропиши site: 'https://your-domain.ro'
- Добавь интеграцию sitemap()
```

## ⚙️ Шаг 8.4 — Финальная проверка перед деплоем

```bash
cd 07.SITES/site-01-ro
npm run build
```

Должно показать что-то вроде:
```
✓ building (built in 12s)
✓ 78 pages built
```

Если ошибки — отправьте в Cursor:
```
Исправь ошибки билда:
[вставь вывод ошибок]
```

Также:
```bash
npm run preview
```
Откройте http://localhost:4321 → пройдитесь по 5-10 страницам, проверьте:
- Все ссылки работают
- Нет английских/русских артефактов в тексте
- Картинки загружаются
- Lighthouse (Chrome DevTools → Lighthouse): score > 95 по Performance/SEO

---

# 🟢 ДЕНЬ 15. Деплой на Cloudflare Pages

## ⚙️ Шаг 15.1 — Купить домен

Рекомендую Namecheap или Porkbun. Идеи названий:
- `pariuri-ghid.ro`
- `cazinou-recenzii.com`
- `top-pariuri.ro`

Включите **Whois Privacy** при покупке.

## ⚙️ Шаг 15.2 — Запушить в GitHub

```bash
cd ~/Documents/review-empire/07.SITES/site-01-ro

# Отдельный git репо для сайта (vault и сайт — разные репо)
git init
git add .
git commit -m "Initial site"
```

На GitHub создайте **приватный** репо `site-01-ro`. Скопируйте git remote URL.

```bash
git remote add origin git@github.com:YOUR_USERNAME/site-01-ro.git
git branch -M main
git push -u origin main
```

> **Если нет SSH-ключа:** используйте HTTPS URL и Personal Access Token из GitHub Settings → Developer settings.

## ⚙️ Шаг 15.3 — Cloudflare Pages

1. Зарегистрируйтесь на https://cloudflare.com (если нет аккаунта)
2. Workers & Pages → **Create application** → **Pages** → **Connect to Git**
3. Авторизуйте GitHub, выберите репо `site-01-ro`
4. Настройки билда:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variables: пусто
5. **Save and Deploy**

Через ~2 минуты получите URL `site-01-ro.pages.dev`.

## ⚙️ Шаг 15.4 — Подключить кастомный домен

1. В Pages → **Custom domains** → Set up a custom domain
2. Введите ваш домен (например, `pariuri-ghid.ro`)
3. Cloudflare попросит изменить nameservers в Namecheap → сделайте это
4. Подождите 5-30 минут для DNS propagation

## ⚙️ Шаг 15.5 — Google Search Console + Bing

1. https://search.google.com/search-console → **Add property** → введите домен
2. Верифицируйте через DNS TXT record (Cloudflare сделает в один клик)
3. **Sitemaps** → введите `https://your-domain.ro/sitemap-index.xml` → Submit
4. То же самое в Bing Webmaster Tools (https://www.bing.com/webmasters)

## ✅ Чек-лист конца Дня 15

- [ ] Домен куплен с Whois Privacy
- [ ] Сайт открывается на боевом домене
- [ ] HTTPS работает (Cloudflare ставит автоматически)
- [ ] GSC и Bing подключены
- [ ] Sitemap submitted

---

# 🔁 Регулярная работа (после Дня 15)

## Еженедельно

### Понедельник — апдейт данных
```
ingest 01.RAW/ahrefs/keywords/<refreshed>.csv

Я выгрузил свежие данные Ahrefs за неделю. Обнови:
- Позиции конкурентов в 04.COMPETITORS/
- Content-gap.csv → проверь, какие новые ключи появились
- Master-plan: если есть quick-wins — добавь в план на эту неделю
```

### Среда — пишем статьи
```
Возьми из 03.SEO/master-plan.md 3 приоритетные статьи на эту 
неделю. Напиши их по SEO-требованиям и шаблонам из 05.TEMPLATES/.

После — заверстай в 07.SITES/site-01-ro/src/content/blog/ и 
обнови sitemap. Покажи дифф перед коммитом.
```

### Пятница — lint и публикация
```
lint 02.WIKI/

Затем: git add . && git commit && git push 
(Cloudflare задеплоит автоматически при push в main)
```

## Создание второго сайта (Неделя 5-6)

```
generate-site site-02-ro

Создай 07.SITES/site-02-ro/ как Astro-проект.
Используй те же данные из 04.COMPETITORS/, но:
- Rewrite текстов ≥75% (другие формулировки, структура)
- Другая палитра (см. 06.DESIGN/site-02-spec.md — создай её сначала)
- Другая структура главной: карточки вместо таблицы
- Другие "авторы" статей (используй 08.PBN/authors-pool.md)
- Соблюдай anti-detect правила из 08.PBN/pbn_network_requirements.md
```

---

# 💡 Шпаргалка по Cursor для нашей задачи

| Действие | Hotkey | Когда использовать |
|---|---|---|
| Composer (агент, правит файлы) | **Cmd+I** | Основной режим работы |
| Chat (разговор без правок) | **Cmd+L** | Спросить совет, разведать |
| Inline-edit (поправить выделенное) | **Cmd+K** | Доточить конкретный кусок |
| Открыть terminal в Cursor | **Cmd+`** | Запуск команд |
| Упомянуть файл в промпте | `@filename` | Дать Cursor конкретный контекст |
| Упомянуть папку | `@folder/` | Точечно ограничить scope |
| Web search в promtе | `@Web` | Когда нужны свежие данные из сети |

**Пример хорошего промпта:**
```
@03.SEO/master-plan.md @04.COMPETITORS/superbet.md 

Напиши review-страницу Superbet по нашему шаблону. Целевой кейворд: 
"recenzie superbet" (объём 2400 / KD 18). 3500 слов. Verbatim quotes 
от румынских беттеров — придумай 2-3 в духе reddit.com/r/Romania.
```

---

# 🆘 Если что-то пошло не так

| Проблема | Решение |
|---|---|
| Cursor не видит `.cursorrules` | Перезапустите Cursor (Cmd+Q → открыть заново) |
| Composer пишет на английском | Уточните в промпте: «ОБЯЗАТЕЛЬНО на ro-RO, перепиши». Усильте правило в `.cursor/rules/romanian-content.mdc` |
| `npm run build` падает с ошибкой типов | `npx astro check` покажет точные ошибки. Скопируйте в Cursor: «исправь». |
| Ahrefs CSV в кириллице кракозябры | При экспорте выберите UTF-8 (не Excel-compatible). |
| Obsidian не видит файлы после Cursor | В Obsidian: View → Reload current vault. |
| Cloudflare билд падает | Логи в Pages → Deployments → клик на failed deploy. Скопируйте логи в Cursor. |
| Google не индексирует | Подождите 14-21 день. Проверьте robots.txt, sitemap, что нет noindex. |

---

# 🎯 Главные принципы (которые легко забыть)

1. **Curator = вы, Programmer = Cursor.** Не пишите Wiki сами — только направляйте.
2. **Один источник = 10-15 страниц.** Это норма для Карпатовского ingest.
3. **Human-in-the-loop при ingest.** Всегда подтверждайте топики перед записью.
4. **Wiki накапливается, не переписывается.** Противоречия → новая заметка, не молчаливое удаление.
5. **Главное правило сетки:** разные тексты, разные структуры, никакой кросс-линковки между сайтами.
6. **18+, ONJN, дисклеймеры.** На каждом сайте, в footer. Иначе — юридический риск.

---

> Если на любом шаге что-то непонятно — пришлите мне ошибку или промпт, который не сработал. Подкорректируем правила и пойдём дальше.
