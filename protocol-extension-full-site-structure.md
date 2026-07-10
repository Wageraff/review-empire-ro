# 🏗️ Расширение протокола: полная структура гибридного сайта

> **Это дополнение к предыдущему гайду** (setup-protocol-day-by-day.md).
> Не заменяет его, а добавляет то, чего не хватало: работу с типами страниц кроме review.
>
> **Ваша конфигурация (обновлённая):**
> - ✅ Cursor уже сделал ingest конкурентов, работает над досье букмекеров
> - ✅ Клипы лежат в `01.RAW/web-clips/{reviews, ratings, bonuses, guides}/`
> - ✅ Картинки — в общей куче `01.RAW/web-clips/reviews/imgs/`
> - ✅ Cursor при написании текстов перекладывает нужные в `01.RAW/assets/{brand}/`
> - 🎯 Финальный сайт: **гибрид** — обзоры + каталог бонусов (30-50 стр) + гайдовый хаб (15-25 стр) + прогнозы через API

---

## 📚 Оглавление

1. [Что упускалось раньше и почему](#часть-1)
2. [Обновлённая карта типов страниц](#часть-2)
3. [Логика привязки картинок из общей кучи](#часть-3)
4. [Новая структура папок](#часть-4)
5. [Расширенный `.cursorrules` — правила для всех типов](#часть-5)
6. [Пошагово: сбор данных для каждого типа](#часть-6)
7. [Промпты Cursor для каждого типа страниц](#часть-7)
8. [Структура прогнозов (готовим место под API)](#часть-8)
9. [Обновлённый чек-лист по неделям](#часть-9)

---

## <a name="часть-1"></a>📌 Часть 1. Что упускалось раньше

В прошлом протоколе фокус был на **review-страницах** букмекеров. Но у румынских review-сайтов (legalbet.ro, beturi.ro, 10pariuri.ro, xbets.ro) видно, что review — это лишь **~30% контента**. Остальное:

| Тип контента | Доля трафика (оценочно) | Роль |
|---|---|---|
| **Обзоры букмекеров** | 25-30% | commercial, деньги |
| **Каталог бонусов** | 15-20% | commercial, деньги |
| **Прогнозы/понты** | 25-35% | ежедневный трафик, engagement |
| **Гайды для новичков** | 10-15% | informational, топ воронки |
| **Спортивные категории** | 5-10% | навигация, hub-страницы |
| **Служебные (about, T&C…)** | E-A-T сигналы | — |

**Разные типы — разные механики создания:**
- Review: 1 ingest → 1 страница (long-form 3000-5000 слов)
- Бонусы: 1 клип с landing букмекера → 3-5 бонусных страниц
- Гайды: не привязаны к букмекерам, генерируются от кейвордов
- Прогнозы: обновляются ежедневно, требуют API/парсинга

Это дополнение делит работу на 4 параллельных потока.

---

## <a name="часть-2"></a>🗺️ Часть 2. Обновлённая карта типов страниц

### Hub & Spoke структура вашего первого сайта

```
                    ┌─────────────────────┐
                    │  ГЛАВНАЯ (/)        │
                    │  Рейтинг ТОП-15     │
                    └──────────┬──────────┘
                               │
        ┌──────────┬───────────┼───────────┬──────────┐
        ▼          ▼           ▼           ▼          ▼
   ┌────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌────────┐
   │ REVIEW │ │ BONUSURI│ │ PONTURI │ │ GHIDURI │ │ SPORT  │
   │  hub   │ │   hub   │ │   hub   │ │   hub   │ │  hub   │
   └───┬────┘ └────┬────┘ └────┬────┘ └────┬────┘ └───┬────┘
       │           │           │           │          │
   ┌───┴───┐   ┌───┴───┐   ┌───┴────┐  ┌───┴───┐  ┌───┴───┐
   │15-20  │   │30-50  │   │Обновл. │  │15-25  │  │6-10   │
   │review │   │бонус- │   │ежедн.  │  │гайдов │  │спортов│
   │страниц│   │страниц│   │через   │  │       │  │       │
   │       │   │       │   │API     │  │       │  │       │
   └───────┘   └───────┘   └────────┘  └───────┘  └───────┘
```

### Полная карта URL (стартовая версия)

```
/                                    ← главная (ТОП-15 рейтинг)
/recenzii/                           ← hub обзоров
  /recenzii/superbet
  /recenzii/betano
  /recenzii/unibet
  ... × 15-20

/bonusuri/                           ← hub каталога бонусов
  /bonusuri/bonus-de-bun-venit/      ← категория "welcome"
    /bonusuri/bonus-de-bun-venit/superbet
    /bonusuri/bonus-de-bun-venit/betano
    ... × 10-15
  /bonusuri/fara-depunere/           ← категория "no deposit"
    /bonusuri/fara-depunere/superbet
    ... × 5-8
  /bonusuri/cashback/                ← категория "cashback"
    ... × 5-8
  /bonusuri/rotiri-gratuite/         ← "free spins"
    ... × 5-8
  /bonusuri/pariu-fara-risc/         ← "risk-free bet"
    ... × 3-5

/ponturi/                            ← hub прогнозов
  /ponturi/fotbal/
  /ponturi/tenis/
  /ponturi/baschet/
  /ponturi/pontul-zilei/             ← ежедневная страница
  /ponturi/biletul-zilei/            ← ежедневная страница
  (наполнение через API — позже)

/ghiduri/                            ← гайдовый хаб (15-25 статей)
  /ghiduri/notiuni-de-baza/
    /ghiduri/notiuni-de-baza/ce-este-o-cota
    /ghiduri/notiuni-de-baza/tipuri-de-pariuri
    /ghiduri/notiuni-de-baza/cum-sa-parieze-un-incepator
    /ghiduri/notiuni-de-baza/inregistrare-la-o-casa-de-pariuri
    /ghiduri/notiuni-de-baza/verificare-cont-kyc
  /ghiduri/strategii/
    /ghiduri/strategii/strategia-martingale
    /ghiduri/strategii/pariuri-value
    /ghiduri/strategii/sistem-de-pariere-1-3-2-6
    /ghiduri/strategii/pariuri-live
  /ghiduri/gestionarea-banilor/
    /ghiduri/gestionarea-banilor/managementul-bankrollului
    /ghiduri/gestionarea-banilor/staking-plan
    /ghiduri/gestionarea-banilor/limitele-de-joc-responsabil
  /ghiduri/psihologie/
    /ghiduri/psihologie/emotii-la-pariere
    /ghiduri/psihologie/tilt-si-cum-il-eviti
    /ghiduri/psihologie/disciplina-in-pariuri
  /ghiduri/dictionar-de-pariuri/     ← глоссарий (все термины на одной странице)

/sport/                              ← hub видов спорта
  /sport/fotbal/
  /sport/tenis/
  /sport/baschet/
  /sport/handbal/
  /sport/hochei/
  /sport/formula-1/
  /sport/esports/

/metodologie                         ← как мы делаем рейтинги (E-A-T!)
/despre-noi                          ← команда, экспертиза (E-A-T!)
/contact
/termeni-si-conditii
/politica-de-confidentialitate
/joc-responsabil                     ← обязательно для RO (18+, ONJN)
```

**Итого на старте:** ~120-150 URL. Это здоровый размер для нового сайта без спам-сигналов.

---

## <a name="часть-3"></a>🖼️ Часть 3. Логика привязки картинок из общей кучи

Раз у вас картинки лежат в куче в `01.RAW/web-clips/reviews/imgs/`, а Cursor должен уметь при написании review выбрать релевантные и переложить их в `01.RAW/assets/{brand}/` — нужен **умный процесс отбора**.

### Как это работает

**Шаг 1 (единоразово):** Cursor анализирует всю кучу картинок и создаёт **индекс** — какая картинка о каком букмекере/теме.

**Шаг 2 (при написании статьи):** Cursor обращается к индексу, выбирает нужные картинки, копирует в `01.RAW/assets/{brand}/`, применяет уникализацию через `scripts/process-clip-image.sh` и вставляет в HTML сайта.

### Промпт для создания индекса (запускается ОДИН РАЗ)

```
Проиндексируй все изображения в 01.RAW/web-clips/reviews/imgs/.

Для каждой картинки:
1. Открой её, определи содержимое (visual analysis)
2. Определи:
   - К какому букмекеру относится (по логотипам, брендингу, интерфейсу)
   - Тип: logo / screenshot-main / screenshot-bonus / screenshot-mobile / 
     screenshot-payment / screenshot-live / photo / banner / icon
   - Ключевая тема (одним словом на румынском): bonus / cote / aplicatie / 
     retragere / inregistrare / live / fotbal / etc.
   - Размеры (width x height)
   - Приблизительное качество (1-10)

3. Если картинка не относится ни к одному букмекеру (общая, пейзаж, 
   иконка, tracking-pixel) — помечай как generic или ignore.

4. Сохрани индекс в 01.RAW/web-clips/reviews/imgs/_index.json:

{
  "generated_at": "2026-06-21",
  "total_images": 234,
  "images": [
    {
      "file": "img-abc123.png",
      "bookmaker": "superbet",
      "type": "screenshot-bonus",
      "theme": "bonus-de-bun-venit",
      "width": 1440,
      "height": 900,
      "quality": 8,
      "usable": true
    },
    {
      "file": "img-def456.png",
      "bookmaker": null,
      "type": "icon",
      "theme": "generic",
      "usable": false,
      "reason": "small icon"
    },
    ...
  ]
}

5. Дай мне отчёт:
   - Всего картинок: X
   - Распознано по букмекерам: Y (разбивка)
   - Нераспознано: Z
   - Игнорировать: W

Не переименовывай и не двигай файлы — только индекс. Работай батчами 
по 20 картинок (analysis+update JSON), чтобы не съесть контекст.
```

### Как Cursor использует индекс при написании review

Когда Cursor пишет `/recenzii/superbet.astro`, он:

1. Читает `_index.json`
2. Фильтрует `bookmaker == "superbet" AND usable == true`
3. Выбирает 5-7 самых релевантных по темам, которые упомянуты в статье:
   - hero → `type == "screenshot-main"` (главный интерфейс)
   - блок про бонус → `type == "screenshot-bonus" AND theme == "bonus-de-bun-venit"`
   - блок про приложение → `theme == "aplicatie"`
   - блок про платежи → `theme == "retragere"`
4. Копирует выбранные из `imgs/` в `01.RAW/assets/superbet/`
5. Запускает `scripts/process-clip-image.sh` для каждой → получает финальный WebP
6. Вставляет `<img src="/images/superbet/...webp" alt="...">` в статью

### Правило для `.cursorrules` (добавить в существующий файл)

```markdown
## IMAGE INDEX WORKFLOW

Есть индекс всех сырых картинок: 01.RAW/web-clips/reviews/imgs/_index.json

### При написании ЛЮБОЙ страницы, которой нужны картинки:

1. Читай _index.json (не сканируй папку заново!)
2. Определи, какие темы упоминаются в тексте страницы
3. Для каждой темы найди в индексе релевантные записи:
   - bookmaker matches (для review-страниц)
   - theme matches (для гайдов, категорий)
4. Выбирай ТОЛЬКО картинки с usable == true
5. Приоритет по quality: сначала 9-10, потом 7-8

### Процесс использования картинки:

- ИСХОДНИК: 01.RAW/web-clips/reviews/imgs/<original>.png
- Копируй в: 01.RAW/assets/<brand>/<original>.png (сохраняем оригинал для истории)
- Обрабатывай через scripts/process-clip-image.sh
- Финал сохраняется в: 07.SITES/site-01-ro/public/images/<brand>/<seo-name>.webp

### При работе с картинками для НЕ-review страниц (гайды, категории):

- Ищи в _index.json где theme соответствует теме статьи
- Игнорируй bookmaker (для гайдов картинки могут быть от любого букмекера)
- Например для гайда "как читать коэффициент" подойдут любые screenshot-main
  где видно cote

### Если в индексе нет подходящей картинки:

- НЕ используй нерелевантную "потому что есть"
- Отметь в frontmatter страницы: images_needed: ["описание1", "описание2"]
- Я потом накидаю таких картинок отдельно

### Обновление индекса:

Когда я говорю "reindex images" — перепроиндексируй только новые файлы 
(тех что не в текущем _index.json). Не трогай уже индексированные.
```

---

## <a name="часть-4"></a>📁 Часть 4. Обновлённая структура папок

Добавляем то, чего не было:

```
review-empire/
├── 00.SYSTEM/
├── 01.RAW/
│   ├── ahrefs/                        (уже есть)
│   ├── competitors/                    (уже есть)
│   ├── regulatory/                     (уже есть)
│   ├── web-clips/
│   │   ├── reviews/                    ← ваша существующая структура
│   │   │   ├── imgs/                   ← общая куча картинок
│   │   │   │   └── _index.json         ← НОВОЕ: индекс
│   │   │   └── *.md                    ← клипы обзоров с сайтов
│   │   ├── ratings/                    ← добавите позже
│   │   │   ├── imgs/
│   │   │   └── _index.json
│   │   ├── bonuses/                    ← добавите позже
│   │   │   ├── imgs/
│   │   │   └── _index.json
│   │   ├── guides/                     ← добавите позже
│   │   │   ├── imgs/
│   │   │   └── _index.json
│   │   └── sport-categories/
│   │       ├── imgs/
│   │       └── _index.json
│   └── assets/                         (общая папка обработанных исходников)
│       ├── superbet/
│       ├── betano/
│       └── ... (Cursor складывает сюда при написании review)
├── 02.WIKI/                            (уже есть, Cursor наполняет)
├── 03.SEO/                             (уже есть)
├── 04.COMPETITORS/                     (уже есть, Cursor работает)
├── 05.TEMPLATES/                       ← НОВОЕ: расширяем
│   ├── review-page.md                  ← шаблон обзора
│   ├── bonus-page.md                   ← НОВОЕ: шаблон страницы бонуса
│   ├── guide-page.md                   ← НОВОЕ: шаблон гайда
│   ├── category-hub.md                 ← НОВОЕ: шаблон hub-страницы
│   ├── sport-category.md               ← НОВОЕ
│   ├── prediction-page.md              ← НОВОЕ: заготовка под API
│   └── prompts/                        ← готовые промпты
│       ├── write-review.md
│       ├── write-bonus.md
│       ├── write-guide.md
│       └── ...
├── 06.DESIGN/                          (уже есть)
├── 07.SITES/                           (уже есть)
├── 08.PBN/                             (уже есть)
└── 09.API/                             ← НОВОЕ: конфиги API прогнозов
    ├── odds-provider-config.md
    ├── prediction-generation-flow.md
    └── (реализация позже)
```

Создание новых папок (в терминале Cursor):
```bash
mkdir -p 01.RAW/web-clips/{ratings,bonuses,guides,sport-categories}/imgs
mkdir -p 05.TEMPLATES/prompts
mkdir -p 09.API
```

---

## <a name="часть-5"></a>📜 Часть 5. Расширенный `.cursorrules`

Добавьте в конец существующего `.cursorrules` эту секцию:

```markdown
## PAGE TYPES REGISTRY

Каждый тип страницы имеет свой шаблон в 05.TEMPLATES/ и свои правила.

### REVIEW (обзор букмекера)
- Путь: 07.SITES/site-01-ro/src/content/reviews/<slug>.md
- Слаг: имя букмекера латиницей (superbet, betano)
- Шаблон: 05.TEMPLATES/review-page.md
- Длина: 3000-5000 слов
- Обязательные секции: hero, quick-rating, licenta ONJN, bonus, sport 
  disponibil, aplicatie mobila, plati, suport, avantaje-dezavantaje, 
  concluzie, FAQ
- Schema.org: Review + Organization
- Внутренние ссылки: 5-8 (на другие review, на бонус-страницу этого 
  букмекера, на релевантные гайды)

### BONUS PAGE (страница отдельного бонуса)
- Путь: /bonusuri/<categorie>/<bookmaker>
- Пример: /bonusuri/bonus-de-bun-venit/superbet
- Шаблон: 05.TEMPLATES/bonus-page.md
- Длина: 1500-2500 слов
- Обязательные секции: 
  - Bonus details (suma, cod promo, rulaj/rollover, termeni)
  - Cum activezi bonusul (step-by-step)
  - Termeni cheie (min. cotă, timp de rulaj, jocuri eligibile)
  - Avantaje și dezavantaje
  - Comparație cu bonusuri similare (link на 2-3 других)
  - FAQ (3-5 вопросов)
- Schema.org: Offer + Product
- Обязательно: cross-link на review этого букмекера

### BONUS CATEGORY HUB (категория бонусов)
- Путь: /bonusuri/<categorie>
- Пример: /bonusuri/bonus-de-bun-venit
- Шаблон: 05.TEMPLATES/category-hub.md
- Длина: 1200-2000 слов
- Обязательные секции:
  - Ce este [tipul de bonus]
  - Tabel comparativ (все бонусы этой категории с ключевыми параметрами)
  - Cum să alegi bonusul potrivit
  - Cele mai bune 3 bonusuri din categorie (короткие блоки-teaser)
  - Termeni și avertismente
- Schema.org: CollectionPage

### GUIDE PAGE (гайд для новичков)
- Путь: /ghiduri/<categorie>/<slug>
- Пример: /ghiduri/notiuni-de-baza/ce-este-o-cota
- Шаблон: 05.TEMPLATES/guide-page.md
- Длина: 1500-3000 слов
- Обязательные секции:
  - Introducere (что узнает читатель)
  - Основные разделы (по теме)
  - Exemple practice (обязательно с числами и расчётами!)
  - Erori comune (типичные ошибки)
  - Concluzie
  - FAQ (5-7 вопросов)
  - Articole related (ссылки на 3-5 других гайдов)
- Schema.org: HowTo (для step-by-step) или Article
- НЕ рекламируем конкретных букмекеров в гайдах — это EDUCATIONAL контент.
  Если нужен пример — говори "o casa de pariuri" абстрактно.

### GUIDE CATEGORY (гайд-хаб)
- Путь: /ghiduri/<categorie>
- Пример: /ghiduri/strategii
- Шаблон: 05.TEMPLATES/category-hub.md
- Длина: 800-1500 слов + список всех гайдов категории

### SPORT CATEGORY (вид спорта)
- Путь: /sport/<sport>
- Пример: /sport/fotbal
- Шаблон: 05.TEMPLATES/sport-category.md
- Длина: 2000-3500 слов
- Обязательные секции:
  - Ce înseamnă a paria pe <sport>
  - Cele mai populare tipuri de pariuri
  - Cele mai bune case de pariuri pentru <sport> (топ-5)
  - Strategii de pariere pe <sport>
  - Bonusuri specifice pentru <sport>
  - Predictii/ponturi <sport> (блок с последними прогнозами через API)
  - FAQ

### PREDICTION PAGE (прогноз — заготовка под API)
- Путь: /ponturi/<sport>/<match-slug>
- Пример: /ponturi/fotbal/real-madrid-vs-fcsb-2026-11-15
- ПОКА НЕ ГЕНЕРИРУЕМ РУЧНО. Только создаём структуру и шаблон.
- Шаблон: 05.TEMPLATES/prediction-page.md
- Наполнение — через API (см. 09.API/, реализация отдельно)

### DAILY DIGEST (Pontul Zilei, Biletul Zilei)
- Путь: /ponturi/pontul-zilei, /ponturi/biletul-zilei
- ПОКА НЕ ГЕНЕРИРУЕМ. Только шаблон и место в архитектуре.

### E-A-T PAGES (about, methodology, responsible gaming)
- Обязательны для ниши беттинга (Google YMYL требования)
- Пути: /despre-noi, /metodologie, /joc-responsabil
- Длина: 1000-1500 слов
- Тон: экспертный, но человечный
- Обязательно: имена авторов, годы опыта (можно псевдонимы, но 
  консистентные), фото или иллюстрации команды

## CROSS-LINKING RULES (обязательно между типами!)

Каждый тип страницы должен ссылаться на другие типы:

- Review букмекера → его bonus pages (все, минимум 2)
- Review → релевантные guide pages (минимум 3)
- Review → main rating (главная)
- Bonus page → review этого букмекера
- Bonus page → другие bonus pages той же категории (2-3)
- Bonus page → сравнительный hub /bonusuri/<categorie>
- Guide page → 3-5 related guides (по категории)
- Guide page → NEVER промо-ссылки на букмекеров напрямую
- Sport category → топ-5 review + прогнозы через API
- Category hub → все страницы категории + related категории

## ANTI-DETECT: ДОБАВЛЕНИЕ для гайдов

Гайды — самый деликатный тип, потому что информационные статьи 
конкуренты часто копируют друг у друга. Наш rewrite должен быть ≥85%.
- Уникальные примеры (не типовые "Real Madrid vs Barcelona", а 
  румынские клубы: FCSB, CFR Cluj, Universitatea Craiova)
- Свои схемы/таблицы (не копируем чужие)
- Локальные валюты (RON, не EUR) в примерах расчётов
- Живые формулировки, не "Википедия-стиль"
```

---

## <a name="часть-6"></a>📥 Часть 6. Пошагово: сбор данных для каждого типа

### 6.1. Обзоры букмекеров (у вас уже идёт)

Cursor работает по Шагу 4.4 из старого протокола. **Не мешаем.**

### 6.2. Каталог бонусов (после завершения обзоров)

**Что клипать в `01.RAW/web-clips/bonuses/`:**

**Из сайтов конкурентов** (по 2-3 клипа с каждого):
- `legalbet.ro/bonusuri/` — их обзор бонусов
- `beturi.ro/bonusuri-case-de-pariuri/`
- Всё, что находится по запросам:
  - "bonus de bun venit pariuri"
  - "bonus fara depunere pariuri" 
  - "cashback pariuri"
  - "rotiri gratuite pariuri"
  - "pariu fara risc"

**Из landing-страниц букмекеров** (по каждому из 15-20):
- Клипаете landing бонуса каждого букмекера
- Пример: `superbet.ro/promotii/bonus-de-bun-venit`

**Из Ahrefs Keywords Explorer:**
- Экспорт всех кейвордов по seed `bonus pariuri` → `01.RAW/ahrefs/seeds/bonus.csv`

**Итого в папке `01.RAW/web-clips/bonuses/`** должно быть 25-40 клипов.

### 6.3. Гайды для новичков (после бонусов)

**Что клипать в `01.RAW/web-clips/guides/`:**

Клипаем с ТОП-5 румынских сайтов их гайды:
- `legalbet.ro/scoala-de-pariuri/`
- `legalbet.ro/dictionar-de-pariuri/`
- `pariurix.com/ghidul-pariorului/`
- `10pariuri.ro/strategii/`
- Разделы "Cum sa pariez" любых крупных сайтов

**Топ-15 обязательных тем (проверьте что клипы покрывают все):**

1. Ce este o cotă și cum se calculează
2. Tipuri de pariuri sportive (1x2, over/under, handicap, live)
3. Cum să alegi o casă de pariuri
4. Cum să te înregistrezi la o casă de pariuri (KYC)
5. Ce este rulajul (rollover) unui bonus
6. Bankroll management (gestionarea banilor)
7. Strategii de bază (value betting, arbitraj)
8. Pariuri live — sfaturi și strategii
9. Cum să pariezi la fotbal
10. Cum să pariezi la tenis
11. Erori comune ale începătorilor
12. Impozitul pe câștiguri din pariuri (RO-специфика!)
13. Joc responsabil și autoexcluderea
14. Aplicatii mobile — cum se folosesc
15. Metode de plată (Netopia, mobilPay, portofel electronic)

**Из Ahrefs:**
- Keywords Explorer → seed "cum sa pariez" + "ce este in pariuri"
- Экспорт → `01.RAW/ahrefs/seeds/guides.csv`

### 6.4. Спортивные категории

**Что клипать в `01.RAW/web-clips/sport-categories/`:**

По каждому виду спорта (fotbal, tenis, baschet, handbal, hochei, F1, esports):
- 2-3 клипа со страниц типа `/pariuri-fotbal/` конкурентов
- 1 клип с академии/гайда про этот спорт

### 6.5. Регуляторика для E-A-T страниц

Уже клипнуто в `01.RAW/regulatory/` (из старого протокола). Проверьте что есть:
- ONJN реестр лицензий (PDF)
- Legea 227/2015 (налог на выигрыш в РО)
- Правила ответственной игры

---

## <a name="часть-7"></a>🎯 Часть 7. Промпты Cursor для каждого типа страниц

Все эти промпты сохраните в `05.TEMPLATES/prompts/`, потом просто ссылайтесь `@prompts/write-bonus`.

### 7.1. Индексация картинок (запуск ОДИН РАЗ после ingest)

Разместите в `05.TEMPLATES/prompts/reindex-images.md`:

```markdown
reindex images

Проиндексируй все .png/.jpg/.webp/.gif в 
01.RAW/web-clips/{reviews,ratings,bonuses,guides,sport-categories}/imgs/.

Работай батчами по 20 картинок:
1. Открывай (visual analysis) 
2. Определяй: bookmaker, type, theme, quality, usable
3. Записывай в _index.json той же папки
4. Прогресс: печатай "batch N/M complete"

Итоговый отчёт:
- Всего картинок обработано: X
- Распределение по букмекерам
- Топ-10 тем
- Игнорируемые: сколько и почему
```

### 7.2. Каталог бонусов (главный поток)

Разместите в `05.TEMPLATES/prompts/build-bonus-catalog.md`:

```markdown
build bonus catalog

Задача: построить полный каталог бонусов сайта из клипов в 
01.RAW/web-clips/bonuses/.

Шаг 1 — Аудит источников:
- Посчитай, сколько бонусов упоминается в клипах
- Классифицируй по категориям:
  * bonus-de-bun-venit (welcome)
  * fara-depunere (no deposit)
  * cashback
  * rotiri-gratuite (free spins/free bets)
  * pariu-fara-risc (risk-free)
  * incarcare (reload)
  * VIP / loialitate
- Покажи таблицу: категория → сколько бонусов → каких букмекеров

Шаг 2 — Wiki-страницы (в 02.WIKI/bonuses/):
- Создай по одной wiki-странице на каждую КАТЕГОРИЮ (7-8 страниц)
- Каждая содержит: определение, типичные условия, top-list букмекеров
- Обнови 02.WIKI/index.md и log.md

Шаг 3 — Продакшн-страницы (в 07.SITES/site-01-ro/src/content/):
- Для каждой категории (7-8 штук):
  * Hub-страница: /bonusuri/<categorie>/ по 05.TEMPLATES/category-hub.md
- Для каждого бонуса × букмекер (примерно 30-50 штук):
  * Bonus page: /bonusuri/<categorie>/<bookmaker> по 05.TEMPLATES/bonus-page.md
- Главная категорий: /bonusuri/ (общий hub)

Шаг 4 — Cross-linking:
- Каждая bonus-page ссылается на review этого букмекера
- Каждая bonus-page ссылается на 2-3 других бонуса той же категории
- Review букмекеров обновить: добавить блок "Bonusuri disponibile" со 
  ссылками на все bonus-pages этого букмекера

Шаг 5 — Отчёт:
- Всего создано: X hub + Y bonus-pages
- Ссылки успешно проставлены: Z
- Missing (какие бонусы упомянуты в clip'ах но не хватает данных для страницы)

ПЕРЕД шагом 2 — покажи мне план (табличка категорий с count), жди "поехали".
```

### 7.3. Гайды для новичков

Разместите в `05.TEMPLATES/prompts/build-guides-hub.md`:

```markdown
build guides hub

Задача: построить гайдовый центр из клипов в 01.RAW/web-clips/guides/ 
и данных Ahrefs.

Шаг 1 — План контента:
- Ingest'ни клипы гайдов + 01.RAW/ahrefs/seeds/guides.csv
- Составь список 15-25 приоритетных тем гайдов, разбитых на 4 категории:
  * notiuni-de-baza (5-7 гайдов)
  * strategii (4-5 гайдов)
  * gestionarea-banilor (3-4 гайда)
  * psihologie (3-4 гайда)
- Для каждого гайда: title, target keyword (из Ahrefs), search volume, 
  примерная длина, есть ли исходники в клипах

Покажи мне план табличкой. Жди "поехали".

Шаг 2 — Wiki (концепты):
- Создай в 02.WIKI/concepts/ страницы под ключевые понятия:
  cota, rulaj-rollover, value-betting, martingale, bankroll, kelly-criterion
- Каждая: определение + формула + пример + связь с другими концептами
- Обнови index.md и log.md

Шаг 3 — Глоссарий:
- Собери в 07.SITES/site-01-ro/src/content/dictionar-de-pariuri.md полный 
  глоссарий терминов (50-100 терминов из клипов и wiki)
- Формат: термин → короткое определение (1-2 предложения) → якорь 
  для навигации

Шаг 4 — Продакшн-гайды:
- Для каждой из 15-25 тем создай гайд по 05.TEMPLATES/guide-page.md
- 1500-3000 слов
- Обязательно с ПРИМЕРАМИ (числа на румынском: 100 RON, cotă 1.85)
- Используй румынские команды/имена в примерах (FCSB, Simona Halep)
- Cross-links: 3-5 related guides + ссылка на глоссарий
- Картинки через _index.json

Шаг 5 — Category hubs:
- 4 хаба категорий (/ghiduri/<cat>) с описанием и списком всех статей

Шаг 6 — Главный hub /ghiduri:
- Обзор всех 4 категорий с teaser'ами
- Featured guides (топ-5 самых полезных)
- Link to glossary

ВАЖНО: гайды НЕ должны рекламировать конкретных букмекеров. Если 
нужен пример — "o casă de pariuri", "un operator online" абстрактно.

Отчёт: сколько гайдов написано, cross-links проставлены, среднее слов 
на гайд, картинок вставлено.
```

### 7.4. Спортивные категории

Разместите в `05.TEMPLATES/prompts/build-sport-hubs.md`:

```markdown
build sport hubs

Задача: создать hub-страницы для 6-10 видов спорта.

Виды спорта (приоритет для RO):
1. Fotbal (обязательно первым — 60% рынка)
2. Tenis (высокий трафик Simona Halep effect)
3. Baschet (NBA + euroligă)
4. Handbal (популярен в RO)
5. Hochei
6. Formula 1
7. eSports (CS2, LoL, Dota 2)

Опционально:
8. Volei
9. Rugby
10. MMA

Для каждого спорта:
- Wiki-страница в 02.WIKI/sports/<sport>.md (концепт + связи)
- Продакшн-страница /sport/<sport> по 05.TEMPLATES/sport-category.md
- Длина 2000-3500 слов
- Секции:
  * Introducere (популярность в RO, ключевые лиги/турниры)
  * Tipuri de pariuri specifice pentru <sport>
  * Cele mai bune 5 case de pariuri pentru <sport> (топ-5 из 
    04.COMPETITORS/, отсортировано по релевантности)
  * Strategii de bază
  * Bonusuri specifice
  * Predictii recente (заглушка — блок будет заполняться через API)
  * FAQ

Cross-links:
- На топ-5 review букмекеров этого спорта
- На гайд "cum să pariez pe <sport>" (если есть)
- На /ponturi/<sport>/ (заглушка)

Отчёт по завершении.
```

### 7.5. E-A-T страницы (критично для беттинг-ниши!)

Разместите в `05.TEMPLATES/prompts/build-eat-pages.md`:

```markdown
build E-A-T pages

Google YMYL (Your Money Your Life) требует высокого E-A-T для беттинг-сайтов.
Создай следующие обязательные страницы:

1. /despre-noi (О нас)
   - История сайта (можно короткая: "запустили в 2026 pentru...")
   - Миссия: помочь румынским беттерам делать информированный выбор
   - Команда: 3-4 "эксперта" с био, годами опыта, областью экспертизы
     (это могут быть псевдонимы, но консистентные для всей сетки)
   - Пример: "Andrei Popescu, 12 лет в индустрии, специалист по 
     футбольным рынкам"
   - Обязательно: фото (можно AI-сгенерированные, но реалистичные)
   - Contact info

2. /metodologie (Методология рейтинга)
   - Как мы оцениваем букмекеров (5-7 критериев с весами)
   - Пример: "Cote (25%) + Bonusuri (20%) + UX (15%) + Плати (15%) + 
     Support (10%) + Licenta (10%) + Aplicatie (5%)"
   - Как обновляем данные
   - Тестируем ли лично каждого (да, но раз в квартал)
   - Прозрачность: monetization через affiliate — прямое заявление
   - Обновления рейтинга: monthly

3. /joc-responsabil (Ответственная игра — ОБЯЗАТЕЛЬНО для RO)
   - Признаки проблемной игры
   - Инструменты контроля (self-exclusion, limits)
   - Контакты помощи: Jocul Responsabil (https://www.jocresponsabil.ro/)
   - Возраст 18+
   - Секция "Cum să te autoexcluzi la casele de pariuri" со 
     step-by-step для топ-5 букмекеров

4. /termeni-si-conditii
5. /politica-de-confidentialitate (GDPR + RO)
6. /contact (form + email)
7. /sitemap-html (человекочитаемый sitemap)

Каждая: 800-1500 слов, живой румынский, персональный тон где уместно.

Обязательно в footer каждого сайта:
- Логотип 18+
- "Jocurile de noroc pot crea dependență. Joacă responsabil."
- Ссылка на /joc-responsabil
- Ссылка на ONJN
- Ссылка на jocresponsabil.ro
```

### 7.6. Главная страница

Разместите в `05.TEMPLATES/prompts/build-homepage.md`:

```markdown
build homepage

Задача: собрать главную /index.

Структура:
1. Hero
   - H1 с главным кейвордом (например: "Cele mai bune case de pariuri online 
     din România — TOP 15 pentru 2026")
   - Sub-heading (2-3 строки)
   - CTA "Vezi topul"
   
2. Rating TOP-15 (главный компонент)
   - Таблица/карточки топ-15 букмекеров из 04.COMPETITORS/
   - Колонки: rang, logo, name, rating (звёзды), bonus principal, 
     rating pentru (fotbal/tenis/baschet), CTA "Vezi recenzia"
   - Фильтры (sport, bonus, rating min.)
   
3. Как мы делаем рейтинг (короткий блок с ссылкой на /metodologie)

4. Быстрый вход в разделы (4 карточки):
   - Bonusuri (ссылка на /bonusuri)
   - Ponturi (ссылка на /ponturi)
   - Ghiduri (ссылка на /ghiduri)  
   - Sport (ссылка на /sport)

5. Featured content:
   - Ultimele 6 recenzii (updated recently)
   - Top 3 bonusuri
   - 3 гайда для начинающих

6. Trust signals:
   - Cifre: "15+ operatori analizați", "50+ bonusuri comparate", 
     "150+ articole publicate"
   - Trust badges (18+, ONJN, jocresponsabil)

7. FAQ (5-7 вопросов из content-cluster-map.md)

8. Footer:
   - Sitemap ссылки
   - 18+ дисклеймер
   - Ссылки на юр.страницы
   - Логотипы платёжных систем (декоративно)

SEO:
- Title: 55-60 символов, "Cele mai bune case de pariuri România 2026 | TOP 15"
- Meta description: 155-160 символов
- Schema.org: WebSite + BreadcrumbList + FAQPage
- Hreflang ro-RO
```

---

## <a name="часть-8"></a>🎲 Часть 8. Прогнозы — готовим место (API позже)

Сейчас реализуем только **структуру и заглушки**. Наполнение через API — отдельный этап, когда выберете провайдера.

### Что делаем сейчас

**Шаг 8.1. Создать документацию в `09.API/`**

Промпт для Cursor:
```
Создай в 09.API/ следующие документы:

1. odds-provider-research.md — сравнение API-провайдеров спортивных 
   данных для румынского рынка:
   - The Odds API (https://the-odds-api.com/) — доступный, freemium
   - API-Sports (https://api-sports.io/)
   - SportMonks — для football
   - RapidAPI Sports collection
   - OddsMatrix
   Для каждого: цена, покрытие RO лиг (Liga 1, Cupa României), 
   объём requests, поддержка live odds

2. prediction-structure.md — как будет устроена генерация прогнозов:
   - Cron/scheduled job: daily 06:00 RO time
   - Fetch: сегодняшние матчи всех приоритетных лиг
   - Analysis: cross-reference odds от 3-5 букмекеров → find value
   - LLM generation: Cursor Composer или отдельный API → генерит текст 
     прогноза по шаблону
   - Publish: commit в git → Cloudflare auto-deploy

3. prediction-page-template.md — детальный шаблон prediction-страницы:
   - URL: /ponturi/<sport>/<team1-vs-team2-YYYY-MM-DD>
   - Meta: schema.org SportsEvent
   - Секции: match info, coefficients comparison, our pick + reasoning,
     historical h2h stats, form guide, injuries/lineups, verdict
   - Разные версии текста для разных сайтов сетки

4. daily-digest-template.md — шаблоны для /pontul-zilei и /biletul-zilei
```

**Шаг 8.2. Создать заглушки на сайте**

```
Создай в 07.SITES/site-01-ro/src/pages/ponturi/ следующие заглушки:

1. index.astro — hub прогнозов, пока с пустым состоянием:
   - Explanation "Aici veți găsi zilnic ponturi..."
   - Категории по спорту (7 карточек)
   - Placeholder "Prima serie de ponturi va apărea curând"

2. [sport]/index.astro — динамические категории по спорту
   Для каждого sport из /sport/: заглушка + link back на sport hub

3. pontul-zilei.astro — заглушка с формой subscription "Anunță-mă 
   când începem publicarea ponturilor"

4. biletul-zilei.astro — то же самое

Также:
- Обнови главную: раздел "Ponturi de la experți" с блокировкой 
  "Coming soon" (не убирай, пусть пользователь видит что раздел планируется)
- Обнови sitemap: включи заглушки, но с priority=0.3 (низкий)
- Robots: не блокируй, пусть Google знает что раздел готовится

Реализация фактической генерации прогнозов через API — отдельный 
этап после выбора провайдера. Сейчас только каркас.
```

### Почему делаем сейчас, а не потом

1. **URL-структура фиксируется** — если /ponturi/ появится через месяц, поисковики уже увидят паттерн
2. **Внутренние ссылки** из sport-hub и review-страниц уже смогут ссылаться на /ponturi/<sport>/ (пусть на заглушку — Google это понимает как "будет контент")
3. **Sitemap готов заранее** — при первой генерации прогнозов индекс пойдёт быстрее
4. **Design consistency** — заглушки должны быть в едином стиле с сайтом

---

## <a name="часть-9"></a>📅 Часть 9. Обновлённый чек-лист по неделям

Учитывая где вы сейчас (Cursor доделывает Шаг 4.4):

### Неделя 2 (текущая) — досье букмекеров + расширение
- [x] Ingest клипов reviews (в процессе)
- [ ] После ingest — запустить `reindex images` (индексация картинок в куче)
- [ ] Создать дополнительные папки: `01.RAW/web-clips/{ratings,bonuses,guides,sport-categories}/imgs/`
- [ ] Начать клипать ratings и bonuses с сайтов конкурентов

### Неделя 3 — Astro-скелет + бонусы + гайды
- [ ] Astro-проект + дизайн (по старому протоколу)
- [ ] Собрать 25-40 клипов бонусов
- [ ] Запустить `build bonus catalog`
- [ ] Собрать 15-30 клипов гайдов
- [ ] Запустить `build guides hub`

### Неделя 4 — все остальные типы + деплой
- [ ] `build sport hubs` (спортивные категории)
- [ ] `build E-A-T pages` (про нас, методология, joc responsabil)
- [ ] `build homepage`
- [ ] Prediction placeholders (структура под будущий API)
- [ ] Финальный build + Cloudflare deploy
- [ ] GSC + Bing + sitemap

### Неделя 5+ — прогнозы через API (отдельный этап)
- [ ] Research провайдеров odds API
- [ ] Тест API (free tier)
- [ ] Скрипт fetch → analysis → generation → commit
- [ ] Cron / GitHub Action
- [ ] Первые 30 дней ручной валидации качества генерируемых прогнозов

---

## 📎 Итоговый список артефактов, которые Cursor создаст

К концу 4-й недели у вас будет:

**Wiki (`02.WIKI/`):** 100-150 страниц
- ~20 досье букмекеров
- 7-8 концептов бонусов (по категориям)
- 15-25 wiki-страниц гайдов/концептов
- 6-10 wiki по спортам
- Регуляторика (ONJN, налоги, joc responsabil)

**Продакшн-сайт (`07.SITES/site-01-ro/`):** 150-180 страниц
- 1 главная
- 15-20 review-страниц букмекеров
- 30-50 bonus-страниц + 7-8 hub'ов
- 15-25 гайдов + 4 hub'а
- 6-10 sport-hub'ов
- ~10 prediction-заглушек
- 7 E-A-T страниц
- 1 глоссарий
- Служебные (sitemap-html, 404, thanks)

**Юридически чистый минимум:** дисклеймеры 18+, jocresponsabil, отдельная страница /joc-responsabil.

---

## 🚦 Что делать прямо сейчас

Пока Cursor доделывает Шаг 4.4:

1. **Создайте новые папки** в терминале:
   ```bash
   cd ~/Documents/review-empire
   mkdir -p 01.RAW/web-clips/{ratings,bonuses,guides,sport-categories}/imgs
   mkdir -p 05.TEMPLATES/prompts
   mkdir -p 09.API
   ```

2. **Добавьте новые правила в `.cursorrules`** — секции PAGE TYPES REGISTRY, IMAGE INDEX WORKFLOW, CROSS-LINKING RULES из этого документа

3. **Сохраните промпты** (из Части 7) в `05.TEMPLATES/prompts/`. Каждый как отдельный `.md` файл.

4. **Когда Cursor доделает Шаг 4.4 (досье букмекеров)** — запустите:
   ```
   reindex images
   ```
   Он проиндексирует всю кучу картинок в `01.RAW/web-clips/reviews/imgs/`. После этого при написании review Cursor будет знать какая картинка о каком букмекере.

5. **Параллельно с работой Cursor** начинайте клипать сайты конкурентов в разделы:
   - `01.RAW/web-clips/bonuses/` — все страницы бонусов конкурентов + landing букмекеров
   - `01.RAW/web-clips/guides/` — гайды со scoala-de-pariuri, dictionar
   - `01.RAW/web-clips/ratings/` — рейтинговые страницы конкурентов
   - `01.RAW/web-clips/sport-categories/` — /pariuri-fotbal/, /pariuri-tenis/ etc.

6. **Не запускайте `build bonus catalog` или `build guides hub` пока Cursor не закончил review'ы.** Порядок важен: сначала букмекеры (базовая инфа), потом бонусы (зависят от букмекеров), потом гайды (могут ссылаться на конкретные бонусы), потом sport-hubs (ссылаются на всё).

---

## 💬 Открытые вопросы для обсуждения позже

1. **API прогнозов** — какой провайдер выбрать (сравнение в `09.API/odds-provider-research.md` после генерации)
2. **AI-фото авторов E-A-T** — какие сервисы генерации фото людей (Midjourney vs Nano Banana vs специализированные типа Generated.Photos)
3. **Автоматизация деплоя** — cron через GitHub Actions vs Cursor задача vs отдельный n8n workflow
4. **Мониторинг индексации** — что подключать помимо GSC (Ahrefs Rank Tracker, Serpstat?)
5. **Мультиязычность** — когда будете расширяться на другой язык (болгарский, венгерский?), архитектура позволит

Обсудим когда дойдёте до этих этапов.
