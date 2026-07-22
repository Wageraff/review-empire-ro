# Template — PAYMENT-METHOD

> `/metode-de-plata/<method-slug>` · 1200-2000 слов · Schema.org: `HowTo` + `FinancialProduct`
> Sursă principală: `02.WIKI/payments/<method>.md` (mecanică, comisioane, brand-uri, avantaje/dezavantaje — deja structurate).
> **Regulă:** pagina NU promovează un singur bookmaker — listează case care acceptă metoda ca fapt verificabil, cu cross-link spre review-ul fiecăruia.

## Frontmatter

```yaml
title: <H1>
type: PAYMENT-METHOD
url: /metode-de-plata/<method-slug>
status: seo-planned | copy-written | linguist-checked | ready
batch: <ID>
target_keyword: <kw>
volume: <vol>
kd: <kd>
sources: [02.WIKI/payments/<method>.md, ...]
related: ["[[concept:...]]", ...]
```

## Secțiuni obligatorii

1. **Introducere** (~100-150 cuvinte) — ce este metoda, de ce ar alege-o un parior
2. **Ce este <metoda> și cum funcționează** — mecanică (voucher/e-wallet/card), din wiki `## Ce este`
3. **Comisioane și limite** — tabel (minim/maxim depunere, viteză, comisioane), din wiki `## Comisioane și limite`
4. **Case de pariuri care acceptă <metoda>** — tabel/listă cu cross-link la review-uri, din wiki `## Case de pariuri`
5. **Cum depui pas-cu-pas** — instrucțiuni concrete, numerotate
6. **Cum retragi câștiguri** — dacă diferă de depunere, explicit
7. **Avantaje și dezavantaje** — onest, din wiki
8. **Comparație cu alternative** — 1-2 metode similare, tabel scurt
9. **Concluzie** — sintetic, fără CTA promoțional pentru un singur brand
10. **FAQ** — 4-6 întrebări `<details>`

## SEO

- Title: 50-60 caractere, keyword la început
- Meta description: 150-160 caractere
- H1 unic, conține keyword
- Minim 5 `[[concept:...]]` (alte metode + brand-uri ca exemplu + bonus/rulaj)
- Schema.org: `HowTo` (pasul de depunere) + `FinancialProduct`

Creat: 2026-07-16 (Wave-2, batch W2-2)
