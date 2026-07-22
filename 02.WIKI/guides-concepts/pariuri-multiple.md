---
title: Pariuri multiple (bilete cumulate)
type: guide-concept
lang: ro-RO
created: 2026-07-14
updated: 2026-07-14
sources:
  - 01.RAW/web-clips/guides/2026-07-13-biletu-zilei.com-ce-inseamna-multiplu-la-pariuri-sportive.md
related:
  - [[guides-concepts/cota]]
  - [[guides-concepts/pariuri-1x2]]
  - [[guides-concepts/bankroll]]
  - [[guides-concepts/cash-out]]
  - [[bonuses/bonus-de-bun-venit]]
tags: [guide, concept, multiplu, accumulator]
---

# Pariuri multiple (bilete cumulate)

## Definiție

**Pariul multiplu** (acumulator, bilet cumulat) combină minimum **două selecții** pe un singur bilet. Toate trebuie să câștige — o singură greșeală anulează tot biletul. Cotele se înmulțesc, deci câștigul potențial crește exponențial față de pariurile simple.

E cel mai popular format la pariorii recreaționali din România: 5 meciuri Liga 1 pe un bilet de 20 RON, cotă totală 15.00, vis de 300 RON. Problema: probabilitatea reală de câștig e mult mai mică decât pare.

## Formulă / Cum se calculează

**Cotă totală (acumulator):**

```
Cotă totală = cotă₁ × cotă₂ × cotă₃ × ... × cotăₙ
```

**Câștig:**

```
Câștig = miză × cotă totală
Profit = miză × (cotă totală − 1)
```

**Probabilitate combinată** (dacă selecțiile sunt independente):

```
P(total) = P₁ × P₂ × P₃ × ... × Pₙ
```

Exemplu: 3 pariuri la 60% fiecare → 0.6³ = **21,6%** șanse reale, nu 60%.

**Pariu sistem** (alternativă): nu toate selecțiile trebuie să iasă — plătești mai multe combinații (Trixie, Patent, Yankee), dar ai șanse parțiale de câștig.

## Exemplu practic

Bilet **triplu** Liga 1, miză **25 RON**:

| Meci | Selecție | Cotă |
|------|----------|------|
| FCSB – Rapid | 1 (FCSB) | 1.80 |
| CFR Cluj – Sepsi | X2 | 1.55 |
| Universitatea Craiova – Farul | Over 2.5 | 1.90 |

```
Cotă totală = 1.80 × 1.55 × 1.90 = 5.30
Câștig potențial = 25 × 5.30 = 132,50 RON (profit 107,50 RON)
```

Dacă FCSB pierde → **tot biletul pierdut**, indiferent că celelalte 2 au ieșit.

**Bonus multiplu** la [[brands/betano]]: 5+ selecții cu cotă min. 1.50 → +5-15% la câștig. Bilet 6 selecții, câștig 200 RON → bonus 10% = **220 RON**.

**Sistem 2/3** (3 selecții, minim 2 corecte): plătești 3 pariuri duble. 2 din 3 corecte → un bilet dublu câștigă.

## Când se aplică

- **Cote mici, vrei profit decent** — 4 selecții la 1.40 = cotă totală 3.84
- **Bonus multiplu operator** — [[brands/betano]], [[brands/superbet]] oferă extra % la 5+ selecții
- **DNB pe favorite** — 7-8 selecții [[guides-concepts/draw-no-bet]] la cotă 1.25-1.40
- **Cu Cash Out** — protejezi acumulatorul aproape de final ([[guides-concepts/cash-out]])

**Evită acumulatori** cu 8+ selecții la cotă 2.00+ — variance-ul e enorm.

## Greșeli comune

- **Prea multe selecții** — 10 meciuri × cotă 1.50 = cotă 57.67, dar probabilitate ~1%
- **Miză mare pe acumulator** — 100 RON pe bilet de 8 selecții e gambling, nu strategie
- **Corelații ignorate** — FCSB câștigă + Over 2.5 pe același meci nu sunt independente
- **Urmărirea cotelor mari** — 6 outsideri la cotă 3.00 = cotă 729, iluzie de bogăție
- **Nu folosești sistem** — când ai 3-4 selecții solide, sistem 2/3 reduce riscul
- **Bonus multiplu ca scuză** — +10% nu compensează o selecție proastă
- **Fără [[guides-concepts/bankroll]]** — acumulatorii consumă bugetul rapid

## Concepte legate

- [[guides-concepts/cota]] — înmulțirea cotelor
- [[guides-concepts/pariuri-1x2]] — selecția clasică pe acumulator
- [[guides-concepts/cash-out]] — protejare bilet aproape câștigător
- [[guides-concepts/bankroll]] — miză mică pe acumulatori (1-2%)
- [[guides-concepts/draw-no-bet]] — selecții sigure pe bilete lungi
