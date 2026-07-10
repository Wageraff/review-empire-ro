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