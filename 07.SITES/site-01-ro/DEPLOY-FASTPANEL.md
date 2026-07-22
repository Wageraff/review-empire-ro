# site-01-ro — Deploy notes (Fastpanel / VPS)

## Pilot build (2026-07-22)

- Output: **static** → `dist/`
- Brand placeholder: **Betoteca**
- Server: own VPS + Fastpanel (nginx)

## Fastpanel setup

1. Build on CI or locally: `cd 07.SITES/site-01-ro && npm ci && npm run link:pilot && npm run build`
2. In Fastpanel: website → document root = `.../site-01-ro/dist` (or rsync `dist/` to `/var/www/.../public`)
3. nginx: standard static site; enable gzip; TLS via Fastpanel
4. No Node process required for pilot (static HTML)

## Later (Faza 3 ponturi live)

- Add `@astrojs/node` (standalone) behind nginx reverse proxy **only** for `/ponturi/*` hybrid routes, or keep cron → rebuild static.

## Commands

```bash
npm run link:pilot   # resolve [[concept:]] for pilot drafts
npm run build
npm run preview      # local check
```
