#!/usr/bin/env node
'use strict';

const {
  loadEnv,
  createClient,
  validateHttpsUrl,
  resolveType,
  processUrl,
  formatHttpError,
} = require('./firecrawl-lib');

async function main() {
  const url = process.argv[2];
  const typeArg = process.argv[3];

  if (!url || !typeArg) {
    console.error('Использование: node firecrawl-single.js <url> <type>');
    console.error('Пример: node firecrawl-single.js https://legalbet.ro/superbet-recenzie/ reviews');
    process.exit(1);
  }

  try {
    validateHttpsUrl(url);
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

  const firecrawl = createClient(env.apiKey);

  try {
    const result = await processUrl(firecrawl, url, typeArg, env, { skipExisting: false });

    console.log(`Файл: ${result.outputPath}`);
    console.log(`Размер markdown: ${Math.round(result.markdownBytes / 1024)} KB`);
    console.log(`Credits used: ${result.creditsUsed}`);
    if (result.screenshotPath) {
      console.log(`Screenshot: ${result.screenshotPath}`);
    }
  } catch (err) {
    const status = err.status;
    console.error(formatHttpError(status, err.message));
    if (status && status >= 400 && status < 500) {
      process.exit(1);
    }
    if (status && status >= 500) {
      process.exit(1);
    }
    console.error(err.message);
    process.exit(1);
  }
}

main();
