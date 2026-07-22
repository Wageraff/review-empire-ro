# Template — SPORT-CATEGORY

> `/sport/<sport>` · 2000-3500 слов · Schema.org: `Article` (+ `ItemList` pentru top-5 case)
> Sursă principală: `02.WIKI/sports/<sport>.md` (ligi, tipuri de pariuri, metrici, top brand-uri — deja structurate).
> **Regulă:** hub-ul explică CUM se pariază pe acel sport (tipuri de pariuri, ligi, strategie) — NU e un review de brand. Brand-urile apar ca top-5 rating cu justificare scurtă, cross-link spre review complet.

## Frontmatter

```yaml
title: <H1>
type: SPORT-CATEGORY
url: /sport/<sport>
status: seo-planned | copy-written | linguist-checked | ready
batch: <ID>
target_keyword: <kw>
volume: <vol>
kd: <kd>
sources: [02.WIKI/sports/<sport>.md, ...]
related: ["[[concept:...]]", ...]
```

## Secțiuni obligatorii

1. **Introducere** (~150-200 cuvinte) — popularitatea sportului la pariuri în RO, volum
2. **Ligi și competiții principale** — tabel cu relevanță RO, din wiki `## Ligi și competiții`
3. **Tipuri de pariuri specifice** — 1X2, Over/Under, BTTS, handicap, live etc., cu `[[concept:...]]` spre ghiduri
4. **Metrici și factori de analiză** — ce se analizează la acest sport, din wiki `## Metrici`
5. **Top-5 case de pariuri pentru <sport>** — rating scurt cu justificare (sponsorizare, cote, streaming), cross-link review
6. **Strategii de bază** — 3-4 sfaturi, fără promisiuni de câștig garantat
7. **Bonusuri specifice sportului** — cote mărite, freebet pe evenimente majore (generic, nu un singur brand)
8. **Sezon și vârfuri de trafic** — tabel, din wiki
9. **Ghid pentru începători** — cum plasezi primul pariu pe acest sport
10. **Bloc predicții** — placeholder Fază 1 (ex. „Predicții zilnice — în curând" + link către [[concept:pontul-zilei]] dacă e cazul)
11. **Greșeli comune** — minim 4-5, din wiki
12. **FAQ** — 4-6 întrebări `<details>`

## SEO

- Title: 50-60 caractere, keyword la început
- Meta description: 150-160 caractere
- H1 unic, conține keyword
- Minim 5 `[[concept:...]]` (guide-concepts + brand-uri top-5 + top-case-de-pariuri)
- Schema.org: `Article` + `ItemList` (pentru secțiunea top-5)

Creat: 2026-07-16 (Wave-2, batch W2-2)
