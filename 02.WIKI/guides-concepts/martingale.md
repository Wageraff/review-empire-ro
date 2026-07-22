---
title: Strategia Martingale la pariuri
type: guide-concept
lang: ro-RO
created: 2026-07-14
updated: 2026-07-14
sources:
  - 01.RAW/web-clips/guides/2026-07-13-10pariuri.ro-strategia-de-pariere-martingale-formula-de-calcul-exemple-avantaje-si-dezavantaj.md
  - 01.RAW/web-clips/guides/2026-07-13-legalbet.ro-strategia-martingale.md
  - 01.RAW/web-clips/guides/2026-07-13-biletu-zilei.com-strategia-martingale-prezentare-sfaturi-utile-si-exemple.md
related:
  - [[guides-concepts/bankroll]]
  - [[guides-concepts/cota]]
  - [[guides-concepts/pariuri-1x2]]
  - [[guides-concepts/value-betting]]
  - [[regulatory/joc-responsabil-romania]]
tags: [guide, concept, strategie, martingale]
---

# Strategia Martingale la pariuri

## Definiție

**Martingale** e o strategie de gestionare a mizei în care dublezi pariul după fiecare pierdere, până când un pariu câștigător recuperează toate pierderile anterioare plus un profit mic. Provine din jocurile de noroc (ruletă, cap-pajură) și a fost adaptată la [[guides-concepts/pariuri-1x2]] și alte piețe cu cotă apropiată de 2.00.

Sună logic pe hârtie: oricât de des pierzi, un singur câștig „rezolvă totul". În practică, e una dintre cele mai riscante abordări — și casele de pariuri din România impun limite de miză care o fac și mai periculoasă.

## Formulă / Cum se calculează

Secvența clasică de mize (în unități):

```
1 → 2 → 4 → 8 → 16 → 32 → 64 → 128 ...
```

Fiecare pas dublează miza anterioară.

**Investiție totală** după n pierderi:

```
Total = 2^n − 1  (unități)
```

**Profit la primul câștig** (cotă 2.00):

```
Profit = miza_câștigătoare − total_pierdut
```

La cotă exact 2.00, profitul e egal cu miza inițială (1 unitate). La cotă mai mare (ex. 3.10), profitul crește.

## Exemplu practic

Unitate = **10 RON**. Pariezi pe egal (X) în meciuri din Bundesliga, cotă **3.10**:

| Pas | Miză | Rezultat | Pierdut cumulat |
|-----|------|----------|-----------------|
| 1 | 10 RON | Pierdut | 10 RON |
| 2 | 20 RON | Pierdut | 30 RON |
| 3 | 40 RON | Pierdut | 70 RON |
| 4 | 80 RON | Pierdut | 150 RON |
| 5 | 160 RON | Pierdut | 310 RON |
| 6 | 320 RON | Pierdut | 630 RON |
| 7 | 640 RON | **Câștigat** | — |

Câștig: 640 × 3.10 = **1.984 RON**. Investiție totală: **1.270 RON**. Profit net: **714 RON**.

Dar ai avut nevoie de **1.270 RON** în cont și 7 pierderi consecutive — nu e deloc rar în fotbal. La pasul 7, o singură limită de miză de la [[brands/superbet]] sau [[brands/betano]] te blochează.

## Când se aplică

Teoretic, pe piețe cu cotă ≥ 2.00:
- Egal (X) în campionate cu multe remize
- Pariuri pe outsideri la cotă 2.00+
- Piețe binare (over/under la linie echilibrată)

În realitate, **nu recomandăm Martingale** ca strategie principală. E util să o înțelegi ca exemplu de ce [[guides-concepts/bankroll]] fix bate recuperarea agresivă.

## Greșeli comune

- **Bankroll prea mic** — 7 pierderi consecutive consumă 127× miza inițială
- **Ignorarea limitei de miză** — operatorul nu acceptă 640 RON pe o selecție
- **Cotă sub 2.00** — la 1.80, un câștig nu acoperă pierderile anterioare
- **Serii lungi de pierderi** — în Liga 1, 8–10 meciuri fără egal pe aceeași echipă e posibil
- **Emoție la recuperare** — dublezi din panică, nu din plan
- **Confundarea cu value betting** — Martingale gestionează miza, nu găsește edge ([[guides-concepts/value-betting]])

## Concepte legate

- [[guides-concepts/bankroll]] — alternativa sănătoasă la Martingale
- [[guides-concepts/cota]] — de ce ai nevoie de cotă ≥ 2.00
- [[guides-concepts/kelly-criterion]] — sizing bazat pe edge, nu pe recuperare
- [[guides-concepts/pariuri-1x2]] — piața clasică pentru aplicare
- [[regulatory/joc-responsabil-romania]] — riscul de dependență la recuperare
