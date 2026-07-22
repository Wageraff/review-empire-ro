# Template — GUIDE-BRAND-PAGE

> `/ghiduri/brand/<brand>/<topic>` · 1000-1800 слов · Schema.org: `HowTo`
> `topic` ∈ `inregistrare` | `verificare-cont` (P1); `depunere` | `retragere` (P2/P3, не в этом batch'e)
> Sursă principală: clip specific brand (`01.RAW/web-clips/guides/`) — dacă lipsește, se sintetizează din `review-<brand>.md` + `04.BRANDS/<brand>.md` (flag `synthesized: true`).
> **Regulă:** brandul e subiectul paginii (spre diferență de GUIDE-PAGE), dar tonul rămâne factual/instrucțional — fără CONVERSION-BLOCK, fără „cel mai bun bonus".

## Frontmatter

```yaml
title: <H1>
type: GUIDE-BRAND-PAGE
url: /ghiduri/brand/<brand>/<topic>
status: seo-planned | copy-written | linguist-checked | ready
batch: <ID>
brand: <brand-slug>
topic: inregistrare | verificare-cont
target_keyword: <kw>
volume: <vol>
kd: <kd>
synthesized: true | false   # true dacă nu există clip specific brand+topic
sources: [01.RAW/web-clips/guides/..., 04.BRANDS/<brand>.md, drafts/<brand>.md (review)]
related: ["[[concept:X@brand]]", ...]
```

## Secțiuni obligatorii — `inregistrare`

1. **Introducere** (~80-120 cuvinte) — de ce ai nevoie de cont, ce urmează după (bonus, KYC)
2. **Ce ai nevoie înainte de a începe** — 18+, CNP, e-mail valid, date reale
3. **Pași de înregistrare** (numerotați, HowTo) — din formular la confirmare e-mail
4. **Ce urmează: verificarea contului (KYC)** — 2-3 fraze + link către `[[concept:verificare-cont@brand]]`
5. **Bonus de bun venit la înregistrare** — 1-2 fraze factuale + link `[[concept:bonus-de-bun-venit@brand]]`
6. **Greșeli frecvente la înregistrare** — 3-4 (date greșite, cont duplicat, minor etc.)
7. **FAQ** — 3-5 `<details>`
8. **Ghiduri conexe** — review + verificare-cont + bonus-page ale brandului (minim 5 `[[concept:...]]`)

## Secțiuni obligatorii — `verificare-cont`

1. **Introducere** (~80-120 cuvinte) — de ce e obligatorie (ONJN/KYC), ce se blochează fără ea
2. **Documente necesare** — listă (CI/pașaport, uneori extras de cont/factură utilități)
3. **Pași de verificare** (numerotați, HowTo) — din contul personal la confirmare
4. **Termen de procesare și termen limită** — cifre reale (ore procesare, zile limită de la prima depunere)
5. **Ce se întâmplă dacă nu verifici la timp** — cont blocat/închis, bani către buget de stat
6. **FAQ** — 3-5 `<details>`
7. **Ghiduri conexe** — review + inregistrare + bonus-page ale brandului (minim 5 `[[concept:...]]`)

## SEO

- Title: 50-60 caractere, brand + topic la început
- Meta description: 150-160 caractere
- H1 unic, conține brand + topic
- Minim 5 `[[concept:...]]` (review@brand, celălalt topic@brand, bonus-de-bun-venit@brand, plus 1-2 generice: `[[concept:cota]]`/`[[concept:bankroll]]` dacă relevant contextual)
- Schema.org: `HowTo` (pași numerotați cu `HowToStep`)

## Onestitate pe date sintetizate

Când `synthesized: true` (nu există clip specific), pașii generici (formular, buton înregistrare, upload document) sunt universali pentru operatorii licențiați ONJN — se pot descrie factual. Detaliile specifice brandului (termene exacte, praguri de depunere, canal de suport) vin din `review-<brand>.md`/`04.BRANDS/<brand>.md`; unde nu există cifră exactă, se folosește formularea generică ONJN (ex. „termen de maxim 30 de zile", cf. reglementărilor standard) și se semnalează `fact_check_required: true`.

Creat: 2026-07-20 (Wave-3, batch W3-2)
