# Template — GUIDE-PAGE

> `/ghiduri/<categorie>/<slug>` · 1500-3000 слов · Schema.org: `Article` (или `HowTo` дacă e proces pas-cu-pas)
> Sursă principală: `02.WIKI/guides-concepts/<concept>.md` (definiție, formulă, exemple, greșeli — deja structurate).
> **Regulă:** ghidurile NU au CONVERSION-BLOCK/BANNER și nu recomandă un singur bookmaker ca „cel mai bun". Brand-urile apar doar ca exemple factuale (cine oferă funcția), la fel ca în dosarele wiki.

## Frontmatter

```yaml
title: <H1>
type: GUIDE-PAGE
url: /ghiduri/<categorie>/<slug>
status: seo-planned | copy-written | linguist-checked | ready
batch: <ID>
target_keyword: <kw>
volume: <vol>
kd: <kd>
sources: [02.WIKI/guides-concepts/<concept>.md, ...]
related: ["[[concept:...]]", ...]
```

## Secțiuni obligatorii

1. **Introducere** (~100-150 cuvinte) — de ce contează conceptul, cine îl folosește
2. **Ce este <concept>?** — definiție clară, 1-2 paragrafe (din wiki `## Definiție`)
3. **Cum funcționează / formulă** — mecanica exactă, tabel sau formulă (din wiki `## Formulă`)
4. **Exemplu practic (cu cifre!)** — minim 2 exemple concrete, RON, cote reale (din wiki `## Exemplu practic`)
5. **Când se aplică** — situații/sporturi/strategii unde e util (din wiki `## Când se aplică`)
6. **Greșeli comune** — minim 4-5 (din wiki `## Greșeli comune`)
7. **Concluzie** — sintetic, fără CTA promoțional
8. **FAQ** — 4-6 întrebări `<details>`
9. **Ghiduri conexe** — 3-5 `[[concept:...]]` către guide-concepts + `[[concept:cota]]`/`[[concept:rulaj]]` etc.

## SEO

- Title: 50-60 caractere, keyword la început
- Meta description: 150-160 caractere
- H1 unic, conține keyword
- Minim 5 `[[concept:...]]` (guide-concepts + sport + brand ca exemplu, nu ca promo)
- Schema.org: `Article` (default) sau `HowTo` (dacă structura e pas-cu-pas, ex. cum calculezi cota)

Creat: 2026-07-16 (Wave-2, batch W2-1)
