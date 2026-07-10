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