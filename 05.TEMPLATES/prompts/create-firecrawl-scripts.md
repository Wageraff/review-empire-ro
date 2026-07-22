Создай два скрипта в scripts/ для автоматического клиппинга через Firecrawl:

## scripts/firecrawl-single.js — тестовый скрипт одного URL

Использование:
node firecrawl-single.js https://legalbet.ro/superbet-recenzie/ reviews

Функциональность:
1. Читает FIRECRAWL_API_KEY из .env (корень vault, dotenv path: '../.env')
2. Использует @mendable/firecrawl-js SDK
3. Вызывает firecrawl.scrapeUrl(url, options) с параметрами:
   - formats: ['markdown', 'screenshot@fullPage']
   - onlyMainContent: true
   - excludeTags: ['nav', 'footer', '.ads', '.sidebar', '.comments', '.related-posts', 'aside']
   - includeTags: ['article', 'main', '.content', '.post-content', '.entry-content']
   - waitFor: 2000 (из env)
4. Сохраняет результат:
   - Markdown → 01.RAW/web-clips/<type>/YYYY-MM-DD-<domain>-<slug>.md
   - Screenshot → 01.RAW/web-clips/<type>/imgs/<slug>-screenshot.png
5. Добавляет YAML frontmatter:
   title: <из metadata.title>
   source: <оригинальный URL>
   domain: <хост>
   published: <из metadata.publishedTime если есть>
   clipped: <сегодня>
   language: ro-RO
   type: web-clip-<type>
   source_type: <reviews|bonuses|guides|ratings|sport>
   firecrawl_credits_used: 1
6. Выводит: путь к файлу, размер markdown, использованные credits
7. Обработка ошибок: 4xx/5xx → показать понятное сообщение и exit 1

## scripts/firecrawl-batch.js — батч-обработка

Использование:
node firecrawl-batch.js <type> <urls-file>
Примеры:
node firecrawl-batch.js reviews 01.RAW/discovery/urls-reviews.txt
node firecrawl-batch.js bonuses 01.RAW/discovery/urls-bonuses.txt

Функциональность:
1. Читает список URL из файла (один URL на строку, # = комментарий)
2. Использует p-limit для параллельности FIRECRAWL_CONCURRENCY (из env, default 5)
3. Для каждого URL — та же логика что в firecrawl-single.js
4. Rate limiting: пауза FIRECRAWL_RATE_LIMIT_MS между запросами
5. Retry logic: при 5xx или timeout — повторить FIRECRAWL_RETRY_ATTEMPTS раз
6. Пропуск существующих: если файл уже есть в целевой папке — skip (можно продолжить после прерывания)
7. Прогресс-бар в консоли: [42/500] processed, 8 errors, 15 skipped
8. Логирование в logs/firecrawl-YYYY-MM-DD.log:
   - Каждый обработанный URL (URL, status, duration_ms, credits_used, output_path)
   - Все ошибки полностью
9. Финальный отчёт:
   - Всего URL: N
   - Успешно: X (Y credits used)
   - Ошибок: Z (список)
   - Skipped (уже были): W
   - Средний размер markdown: V KB
   - Общее время: T мин
   - Оценка Firecrawl credits used vs remaining (парсинг response headers)
10. Graceful shutdown: Ctrl+C → сохранить прогресс, закончить текущие запросы, показать сколько сделано

Дополнительно:
- Валидация: URL должны быть HTTPS
- Slug generation: транслитерация ro-RO → латиница, lowercase, дефисы вместо пробелов
- Frontmatter должен быть парсибельным (используй yaml пакет)
- Skip если markdown < 300 символов (значит пустой ответ)

## scripts/package.json — добавь npm-скрипты для удобства

"scripts": {
  "test-single": "node firecrawl-single.js",
  "batch-reviews": "node firecrawl-batch.js reviews ../01.RAW/discovery/urls-reviews.txt",
  "batch-bonuses": "node firecrawl-batch.js bonuses ../01.RAW/discovery/urls-bonuses.txt",
  "batch-guides": "node firecrawl-batch.js guides ../01.RAW/discovery/urls-guides.txt",
  "batch-ratings": "node firecrawl-batch.js ratings ../01.RAW/discovery/urls-ratings.txt",
  "batch-sport": "node firecrawl-batch.js sport-categories ../01.RAW/discovery/urls-sport.txt",
  "batch-all": "npm run batch-reviews && npm run batch-bonuses && npm run batch-guides && npm run batch-ratings && npm run batch-sport"
}

Покажи мне оба скрипта, я проверю перед первым запуском.