---
title: Criteriul Kelly la pariuri sportive
type: guide-concept
lang: ro-RO
created: 2026-07-14
updated: 2026-07-14
sources:
  - 01.RAW/web-clips/guides/2026-07-13-10pariuri.ro-sistemul-bazat-pe-criteriul-lui-kelly-in-pariuri-sportive.md
  - 01.RAW/web-clips/guides/2026-07-13-legalbet.ro-criteriul-kelly.md
  - 01.RAW/web-clips/guides/2026-07-13-xbets.ro-ce-este-criteriul-kelly-si-cum-se-aplica-la-pariuri-sportive.md
related:
  - [[guides-concepts/value-betting]]
  - [[guides-concepts/bankroll]]
  - [[guides-concepts/cota]]
  - [[guides-concepts/martingale]]
tags: [guide, concept, strategie, kelly]
---

# Criteriul Kelly la pariuri sportive

## Definiție

**Criteriul Kelly** e o formulă matematică care calculează ce procent din bankroll merită investit într-un pariu, în funcție de probabilitatea ta de câștig și de cotă. A fost dezvoltat de John Larry Kelly Jr. în secolul XX pentru investiții și adaptat la pariuri sportive de pariorii care practică [[guides-concepts/value-betting]].

Nu e pentru începători. Kelly presupune că poți estima corect probabilitatea unui rezultat — dacă greșești, formula îți spune să pariezi prea mult și riști falimentul bankroll-ului.

## Formulă / Cum se calculează

Formula clasică (cote zecimale):

```
f = (b × p − q) / b
```

Unde:
- **f** = fracțiunea din bankroll de pariat
- **p** = probabilitatea ta de câștig (0–1)
- **q** = probabilitatea de pierdere (1 − p)
- **b** = cotă − 1 (profit net per unitate mizată)

Varianta simplificată cu cotă zecimală **C**:

```
f = (p × C − 1) / (C − 1)
```

**Kelly fracționar** (recomandat în practică): folosești 25–50% din rezultatul Kelly (Half-Kelly, Quarter-Kelly) pentru a reduce variance-ul.

## Exemplu practic

Bankroll: **2.000 RON**. Meci Liga 1: **CFR Cluj – FCSB**. Estimezi 55% șanse ca FCSB să câștige sau să facă egal (practic pariu pe X2 la 1.45).

- p = 0.55, q = 0.45, C = 1.45, b = 0.45

```
f = (0.45 × 0.55 − 0.45) / 0.45 = (0.2475 − 0.45) / 0.45 = −0.45
```

Rezultat negativ → **nu pariezi**. Kelly îți spune că nu există edge.

Alt caz — ai găsit value: FCSB victorie la **2.40**, estimare **50%**:

```
f = (0.50 × 2.40 − 1) / (2.40 − 1) = (1.20 − 1) / 1.40 = 0.143
```

Kelly complet: 14,3% din bankroll = **286 RON**. Agresiv.

**Half-Kelly:** 7,15% = **143 RON** — mai rezonabil pentru un parior cu experiență.

## Când se aplică

- Ai identificat un [[guides-concepts/value-betting]] clar (valoare > 1.00)
- Estimarea probabilității e bazată pe analiză solidă (statistici, xG, absențe), nu pe intuiție
- Bankroll stabil, cu [[guides-concepts/bankroll]] separat de cheltuieli zilnice
- Pe termen lung, cu evidență a sute de pariuri

**Nu aplica Kelly** la pariuri impulsive, live fără plan sau când probabilitatea e „simțită".

## Greșeli comune

- **Folosești Kelly complet** — 40% din bancă pe un pariu (exemplul clasic cu 70% estimare) e suicidal
- **Supraestimezi p** — „sigur iese" nu e 70%, poate e 55%
- **Ignori variance-ul** — chiar cu edge, 10 pierderi consecutive sunt posibile
- **Aplici pe bilete multiple** — Kelly funcționează pe pariuri independente, nu pe acumulatori
- **Amesteci cu Martingale** — recuperarea prin dublare distruge logica Kelly ([[guides-concepts/martingale]])
- **Nu folosești fracționar** — Quarter-Kelly sau Half-Kelly e standardul în comunitatea de pariori serioși

## Concepte legate

- [[guides-concepts/value-betting]] — Kelly are sens doar cu edge pozitiv
- [[guides-concepts/bankroll]] — baza pentru calculul lui f
- [[guides-concepts/cota]] — variabila b din formulă
- [[guides-concepts/martingale]] — anti-pattern: sizing prin recuperare, nu prin edge
- [[sports/fotbal]] — sportul unde estimarea p e cel mai documentată
