#!/usr/bin/env node
'use strict';

const {
  loadEnv,
  createClient,
  resolveType,
  processUrl,
  ensureLogFile,
  appendLog,
  readUrlList,
  sleep,
  formatHttpError,
} = require('./firecrawl-lib');

async function main() {
  const typeArg = process.argv[2];
  const urlsFile = process.argv[3];

  if (!typeArg || !urlsFile) {
    console.error('Использование: node firecrawl-batch.js <type> <urls-file>');
    console.error('Пример: node firecrawl-batch.js reviews ../01.RAW/discovery/urls-reviews.txt');
    process.exit(1);
  }

  try {
    resolveType(typeArg);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  let env;
  try {
    env = loadEnv();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  let urls;
  try {
    urls = readUrlList(urlsFile);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  if (!urls.length) {
    console.error('Список URL пуст');
    process.exit(1);
  }

  const pLimit = (await import('p-limit')).default;
  const limit = pLimit(env.concurrency);
  const firecrawl = createClient(env.apiKey);
  const logPath = ensureLogFile();

  let shuttingDown = false;
  process.on('SIGINT', () => {
    if (!shuttingDown) {
      shuttingDown = true;
      console.error('\nCtrl+C — graceful shutdown: дожидаемся текущих запросов...');
    }
  });

  const startedAt = Date.now();
  let creditUsageBefore;
  let creditUsageAfter;
  try {
    creditUsageBefore = await firecrawl.getCreditUsage();
  } catch {
    creditUsageBefore = null;
  }

  const stats = {
    total: urls.length,
    ok: 0,
    errors: 0,
    skipped: 0,
    creditsUsed: 0,
    markdownBytes: [],
    errorList: [],
  };

  const inFlight = new Set();

  const tasks = urls.map((url, index) =>
    limit(async () => {
      if (shuttingDown) return;

      if (env.rateLimitMs > 0) {
        await sleep(env.rateLimitMs);
      }

      const taskId = `${index + 1}:${url}`;
      inFlight.add(taskId);
      const t0 = Date.now();

      try {
        const result = await processUrl(firecrawl, url, typeArg, env, { skipExisting: true });

        if (result.status === 'skipped') {
          stats.skipped += 1;
          appendLog(
            logPath,
            JSON.stringify({
              ts: new Date().toISOString(),
              url,
              status: 'skipped',
              duration_ms: 0,
              credits_used: 0,
              output_path: result.outputPath,
            })
          );
        } else {
          stats.ok += 1;
          stats.creditsUsed += result.creditsUsed;
          stats.markdownBytes.push(result.markdownBytes);
          appendLog(
            logPath,
            JSON.stringify({
              ts: new Date().toISOString(),
              url,
              status: 'ok',
              duration_ms: result.durationMs,
              credits_used: result.creditsUsed,
              output_path: result.outputPath,
              screenshot_path: result.screenshotPath,
            })
          );
        }
      } catch (err) {
        stats.errors += 1;
        const message = formatHttpError(err.status, err.message);
        stats.errorList.push({ url, message });
        appendLog(
          logPath,
          JSON.stringify({
            ts: new Date().toISOString(),
            url,
            status: 'error',
            duration_ms: Date.now() - t0,
            error: message,
            stack: err.stack,
          })
        );
      } finally {
        inFlight.delete(taskId);
        const processed = stats.ok + stats.errors + stats.skipped;
        process.stdout.write(
          `\r[${processed}/${stats.total}] processed, ${stats.errors} errors, ${stats.skipped} skipped`
        );
      }
    })
  );

  await Promise.all(tasks);
  process.stdout.write('\n');

  try {
    creditUsageAfter = await firecrawl.getCreditUsage();
  } catch {
    creditUsageAfter = null;
  }

  const elapsedMin = ((Date.now() - startedAt) / 1000 / 60).toFixed(1);
  const avgKb =
    stats.markdownBytes.length > 0
      ? (
          stats.markdownBytes.reduce((a, b) => a + b, 0) /
          stats.markdownBytes.length /
          1024
        ).toFixed(1)
      : '0';

  console.log('\n=== Firecrawl batch report ===');
  console.log(`Всего URL: ${stats.total}`);
  console.log(`Успешно: ${stats.ok} (${stats.creditsUsed} credits used)`);
  console.log(`Ошибок: ${stats.errors}`);
  console.log(`Skipped (уже были): ${stats.skipped}`);
  console.log(`Средний размер markdown: ${avgKb} KB`);
  console.log(`Общее время: ${elapsedMin} мин`);
  console.log(`Лог: ${logPath}`);

  if (creditUsageBefore && creditUsageAfter) {
    const usedEstimate =
      (creditUsageBefore.remainingCredits ?? 0) - (creditUsageAfter.remainingCredits ?? 0);
    console.log(
      `Credits: было ${creditUsageBefore.remainingCredits}, осталось ${creditUsageAfter.remainingCredits}` +
        (usedEstimate > 0 ? ` (использовано ~${usedEstimate} по API)` : '')
    );
  }

  if (stats.errorList.length) {
    console.log('\nОшибки:');
    for (const item of stats.errorList) {
      console.log(`- ${item.url}\n  ${item.message}`);
    }
  }

  if (shuttingDown) {
    console.log(`\nПрервано пользователем. Завершено: ${stats.ok + stats.skipped} из ${stats.total}`);
  }

  process.exit(stats.ok === 0 && stats.errors > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
