#!/usr/bin/env node
'use strict';

const { spawnSync } = require('child_process');
const path = require('path');

const BATCHES = [
  ['reviews', '../01.RAW/discovery/urls-reviews.txt'],
  ['bonuses', '../01.RAW/discovery/urls-bonuses.txt'],
  ['guides', '../01.RAW/discovery/urls-guides.txt'],
  ['ratings', '../01.RAW/discovery/urls-ratings.txt'],
  ['sport-categories', '../01.RAW/discovery/urls-sport-categories.txt'],
  ['apps', '../01.RAW/discovery/urls-apps.txt'],
  ['payments', '../01.RAW/discovery/urls-payments.txt'],
  ['retail', '../01.RAW/discovery/urls-retail.txt'],
  ['player-reviews', '../01.RAW/discovery/urls-player-reviews.txt'],
];

function runBatch(type, urlsFile) {
  const script = path.join(__dirname, 'firecrawl-batch.js');
  const started = Date.now();
  const result = spawnSync('node', [script, type, urlsFile], {
    cwd: __dirname,
    stdio: 'inherit',
    env: process.env,
  });
  return {
    type,
    urlsFile,
    exitCode: result.status ?? 1,
    elapsedMin: ((Date.now() - started) / 1000 / 60).toFixed(1),
  };
}

function main() {
  console.log(`Firecrawl batch-all: ${BATCHES.length} categorii, ~2682 URL (fără uncategorized + bonuses-unused)\n`);

  const results = [];
  for (const [type, urlsFile] of BATCHES) {
    console.log(`\n${'='.repeat(60)}\n>>> START ${type}\n${'='.repeat(60)}`);
    results.push(runBatch(type, urlsFile));
  }

  const failed = results.filter((r) => r.exitCode !== 0);
  const ok = results.filter((r) => r.exitCode === 0);

  console.log(`\n${'='.repeat(60)}\n=== batch-all summary ===`);
  for (const r of results) {
    const mark = r.exitCode === 0 ? 'OK' : 'PARTIAL/ERR';
    console.log(`  [${mark}] ${r.type} — ${r.elapsedMin} min`);
  }
  console.log(`\nFinalizate fără erori: ${ok.length}/${results.length}`);
  if (failed.length) {
    console.log(`Cu erori parțiale: ${failed.map((r) => r.type).join(', ')}`);
    console.log('(batch-all continuă toate categoriile chiar dacă unele URL-uri eșuează)');
  }

  process.exit(failed.length === results.length ? 1 : 0);
}

main();
