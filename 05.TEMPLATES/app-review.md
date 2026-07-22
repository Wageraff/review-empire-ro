# Template — APP-REVIEW

> `/aplicatii/<brand-slug>` · 1500-2500 слов · Schema.org: `SoftwareApplication`
> Sursă principală: `01.RAW/web-clips/apps/<brand>*.md` + `07.SITES/site-01-ro/src/content/drafts/review-<brand>.md` (secțiunea „Aplicație mobilă" — consistență cifre/rating obligatorie).
> **Regulă:** pagina e despre APLICAȚIE, nu despre operator în general — licența/bonusurile se menționează scurt, cu link spre review complet.

## Frontmatter

```yaml
title: <H1>
type: APP-REVIEW
url: /aplicatii/<brand-slug>
status: seo-planned | copy-written | linguist-checked | ready
batch: <ID>
target_keyword: <kw>
volume: <vol>
kd: <kd>
sources: [01.RAW/web-clips/apps/..., 07.SITES/.../review-<brand>.md]
related: ["[[concept:recenzie@<brand>]]", ...]
```

## Secțiuni obligatorii

1. **Introducere** (~100-150 cuvinte) — de ce merită aplicația <brand>, context rapid
2. **Disponibilitate iOS/Android** — ambele magazine sau sideload (Google Play nu acceptă gambling apps în general — de menționat unde e cazul)
3. **Cerințe tehnice** — versiune minimă OS, mărime aproximativă, limbă
4. **Instalare pas-cu-pas** — separat pentru iOS și Android dacă diferă
5. **Funcții cheie** — live betting, cash-out, notificări, streaming, autentificare biometrică
6. **Pariuri live pe mobil** — dacă e feature distinctiv al brand-ului
7. **Interfață și experiență de utilizare** — onest, bazat pe surse
8. **Securitate** — Play Protect, autentificare, criptare
9. **Avantaje și dezavantaje** — minim 4 fiecare, onest
10. **Evaluare finală** — rating agregat, consistent cu `rating_aplicatie` din dosarul brand-ului
11. **FAQ** — 4-6 întrebări `<details>`

## Cross-links obligatorii

- `[[concept:recenzie@<brand>]]` — review complet al brand-ului
- Comparație cu 1-2 alte aplicații din lineup (dacă relevant)
- `[[concept:top-aplicatii-pariuri]]` — rating agregat aplicații

## Consistență cu review

Cifrele (rating_aplicatie, cerințe OS, funcții) trebuie să fie identice cu ce e deja scris în `review-<brand>.md`. Dacă surse noi contrazic review-ul existent (deja `ready`), NU corecta silențios — flag pentru user, documentează decizia în `log.md`.

## SEO

- Title: 50-60 caractere, keyword la început
- Meta description: 150-160 caractere
- H1 unic, conține keyword
- Minim 5 `[[concept:...]]`
- Schema.org: `SoftwareApplication`

Creat: 2026-07-16 (Wave-2, batch W2-3)
