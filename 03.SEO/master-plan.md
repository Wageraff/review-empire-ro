---
title: Master Plan — Pariuri Sportive RO
lang: ro-RO
created: 2026-07-13
updated: 2026-07-13
revision: sanity-check-applied
sources:
  - 03.SEO/_audit-stage1.json
  - 03.SEO/_audit-stage2-clusters.json
  - 03.SEO/_audit-stage4-url-draft.json
  - 03.SEO/_audit-stage5-final.json
  - 01.RAW/ahrefs/
  - 01.RAW/discovery/
  - 01.RAW/web-clips/
type: seo-master-plan
---

# Master Plan — Site Pariuri Sportive (România)

> Generat din audit complet (Etape 1–5). Înlocuiește `master-plan.OLD-2026-07-13.md`.
> Scope: **pariuri sportive** (fără cazino). 92 branduri, **2 788 URL** planificate.
> Revizie sanity-check 2026-07-13: P1 rebalansat 647 → **217**, slug fixes aplicate.

---

## 1. Executive Summary

### Cifre cheie

| Metrică | Valoare |
|---------|--------:|
| **Total URL planificate** | **2,788** |
| P1 Foundation | **217** |
| P2 Extindere | **1,342** |
| P3 Long-term | **1,229** |
| Data ready (clips + dossier) | **~90%** (pre-autoclip round 2) |
| Volum SEO total (sumă KW) | **6,088,580** / lună |
| Volum P1 | lineup reviews + nav modifiers (vezi `05.TEMPLATES/review-page.md`) |
| Branduri în scope | 92 (discovery) · 20 dossier complet |
| Clips procesate | 2 722 |
| Competitori analizați | 8 (SF + Ahrefs) |

### Logica prioritizării (derivată din date, nu din ținte fixe)

| Prioritate | Criteriu | De ce |
|------------|----------|-------|
| **P1** | 20 recenzii lineup + 50 bonus offers + hubs + 40 KYC guides + 15 concepte + 4 feature ratings | Foundation realist ~100 pagini launch + restul P1 în 30 zile. |
| **P2** | Restul recenziilor (72), ~871 bonus offers, ghiduri ligă/archive, depunere/retragere, E-A-T extins joc responsabil | Extindere după indexare P1. **Wave 6:** `/joc-responsabil/*` subpagini. |
| **P3** | Ghiduri fără volum, promo codes, daily digest, calculatoare, branduri fără clips | Conținut de adâncime / Phase 3 (API ponturi). |

### Decizii structurale (agreate)

- **Recenzii editoriale:** `/recenzii/{brand}` — singura pagină money per brand
- **Păreri jucători:** `/pareri-jucatori/{brand}` — UGC separat
- **Bonusuri:** `/bonusuri/{brand}/` hub + `/bonusuri/{brand}/{offer}/` — categorii prin taguri, nu URL duplicate
- **KYC/înregistrare:** `/ghiduri/brand/{brand}/` — NU `/verificare-cont/` standalone
- **Eliminat:** `/verificare-bilet/`, `/case-de-pariuri/{brand}` (BRAND-LANDING), cazino

### Ordinea de lansare (primele 30 zile + Wave 6)

| Wave | Zile | Pagini | Conținut |
|------|------|-------:|----------|
| **0** | 1–3 | 27 | Homepage, E-A-T (6), Legal (3), Ratings (6), Bonus hubs (7), alte hub-uri (4) |
| **1** | 4–10 | 20 | Recenzii lineup (superbet → 12xbet) — **cu H2 navigaționali** (`review-page.md`) |
| **2** | 11–14 | 30 | 20 bonus brand hubs + 10 top bonus offers (FD/bun-venit) |
| **3** | 15–21 | 40 | Ghiduri brand: inregistrare + verificare-cont (20 lineup × 2) |
| **4** | 22–25 | 23 | 20 app reviews + 3 payment methods |
| **5** | 26–30 | 19 | 15 ghiduri concepte + 4 feature ratings + `/sport/fotbal` |
| **6** | 31–35 | 3 | **P2 E-A-T:** `/joc-responsabil/auto-excludere`, `/limite-de-joc`, `/varsta-minima-18-ani` |

**Prima sută (launch):** Wave 0 (27) + Wave 1 (20) + 10 bonus hubs + 10 top offers + 33 ghiduri brand/KYC prioritare.

**Autoclip înainte de Wave 1:** `01.RAW/discovery/urls-to-clip-additional.txt` (70 URL).

---

## 2. Clustere Semantice și Logică

Clustere descoperite din Ahrefs (16 338 KW unice) + URL patterns concurenți.

| Cluster | Vol total | KW | Competitori | Potențial | Tier plan |
|---------|----------:|---:|-------------|-----------|-----------|
| CORE: Recenzii branduri | 5,625,960 | 3,068 | 6/8 | high | P1 |
| SECONDARY: Sport — fotbal | 323,670 | 327 | 3/8 | medium | P2 |
| CORE: Bonusuri (general) | 245,830 | 657 | 4/8 | medium | P1 |
| CORE: Bonus fără depunere | 242,930 | 385 | 7/8 | high | P1 |
| OTHER: Brand navigational | 159,550 | 90 | 0/8 | high | P1 |
| OTHER: Pariuri generale | 144,980 | 586 | 0/8 | high | P1 |
| SECONDARY: Ponturi & predicții | 66,840 | 209 | 6/8 | high | P2 |
| SECONDARY: Metode plată | 62,120 | 117 | 4/8 | medium | P2 |
| SECONDARY: Sport — tenis/baschet/alte | 59,300 | 173 | 6/8 | medium | P2 |
| NICHE: Verificare bilet | 47,030 | 93 | 1/8 | medium | P3 |
| SECONDARY: Ghiduri & concepte pariuri | 20,480 | 148 | 7/8 | high | P2 |
| CORE: Top / listă case pariuri | 5,040 | 48 | 8/8 | high | P1 |
| NICHE: Licență ONJN / legal | 4,010 | 10 | 1/8 | medium | P3 |
| NICHE: Coduri bonus / promo | 2,110 | 15 | 2/8 | medium | P3 |
| CORE: Aplicații mobil | 1,540 | 21 | 6/8 | high | P1 |
| SECONDARY: Pariuri live | 1,420 | 15 | 7/8 | high | P2 |
| NICHE: Agenții stradale | 250 | 1 | 3/8 | low | P3 |
| NICHE: Bonus bun venit | 150 | 1 | 3/8 | low | P3 |
| NICHE: Ratings feature (plată/geo/live) | 100 | 1 | 3/8 | low | P3 |

### Mapare cluster → secțiuni site

| Cluster | Secțiuni URL |
|---------|-------------|
| Recenzii branduri | `/recenzii/`, `/pareri-jucatori/`, `/vs/` |
| Bonusuri | `/bonusuri/`, `/coduri-bonus/`, `/top-bonusuri` |
| Top / listă | `/top-case-de-pariuri`, `/top/{feature}` |
| Brand navigational | `/recenzii/{brand}` (title optimizat) |
| Pariuri generale | `/` homepage pillar |
| Ghiduri & concepte | `/ghiduri/`, `/scoala-pariurilor/` |
| Ghiduri brand | `/ghiduri/brand/{brand}/` |
| Ponturi | `/ponturi/` (P3 — carcasă) |
| Metode plată | `/metode-de-plata/` |
| Sport | `/sport/` |
| Aplicații | `/aplicatii/` |
| ONJN / legal | `/legal/` |

---

## 3. Hartă URL Completă (cu priorități)

> Nu listăm toate cele 2 795 URL. Structură + `{placeholder}` + count per prioritate.

```
/                                          [P1] HOMEPAGE
│
├── /recenzii/{brand}/                     ×91
│   P1: 20 (lineup) · P2: 65 · P3: 6
│
├── /pareri-jucatori/                      [P1] hub
│   └── /pareri-jucatori/{brand}/          ×52  [P2]
│
├── /bonusuri/                             [P1] main hub
│   ├── /bonusuri/{categorie}/             ×6   [P1] category hubs (CATEGORY-RATING-HYBRID/BONUS-CATEGORY-HUB)
│   ├── /bonusuri/{brand}/                 ×87  [P1:20 · P2:67] brand hubs (BONUS-BRAND-HUB, Wave-2)
│   └── /bonusuri/{categorie}/{brand}/     ×921 [P1:50 · P2:871] (BONUS-PAGE — corectat W1: nested sub categorie, nu sub brand; vezi `page-types.md`)
│
├── /top-case-de-pariuri/                  [P1]
├── /top-bonusuri/                         [P1]
├── ~~/top-bonus-fara-depunere/~~          [MERGED W0-5 → /bonusuri/bonus-fara-depunere/, vezi nota]
├── /top-aplicatii-pariuri/                [P1] (retarget keyword, vezi nota)
├── /top-case-de-pariuri-noi/              [P1]
├── /top-plati-rapide/                     [P1]
├── /top/{feature}/                        ×15  [P1:4 · P2:11] feature ratings
│
├── /vs/{brand-a}-vs-{brand-b}/            ×30  [P2/P3]
│
├── /coduri-bonus/                         [P3] hub + ×77 brand
│
├── /aplicatii/                            [P1] hub
│   └── /aplicatii/{brand}/                ×73  [P1:17 · P2:56]
│
├── /metode-de-plata/                       [P1] hub
│   └── /metode-de-plata/{method}/         ×12  [P1:3 · P2:8 · P3:1]
│
├── /ghiduri/                              [P1] hub
│   ├── /ghiduri/{categorie}/{slug}        ×959 [P1:15 · P2:38 · P3:906]
│   │   notiuni-de-baza · tipuri-de-pariuri · strategii · psihologie · gestionare
│   └── /ghiduri/brand/
│       ├── /ghiduri/brand/{brand}/        ×87  [P1:17 · P2:70]
│       └── /ghiduri/brand/{brand}/{topic} ×340 [P1:40 · P2:110 · P3:190]
│           inregistrare · verificare-cont · depunere · retragere
│
├── /scoala-pariurilor/                    [P2]
├── /instrumente/calculator-{cote,roi}/    ×2   [P3]
│
├── /sport/{sport}/                        ×10  [P1:fotbal · P2:rest]
├── /ponturi/{pontul-zilei,biletul-zilei,ponturi-azi}/  ×3 [P3, cross-sport digest]
├── /ponturi/{sport}/                      ×N   [P3, PREDICTION-SPORT-HUB —
│      listing prognoze per sport, decizie 2026-07-21, vezi page-types.md]
├── /ponturi/{sport}/{match-slug}          ×N   [P3, PREDICTION individuale]
│
├── /legal/{onjn,case-de-pariuri-licentiate,impozit-pariuri}/  ×3 [P1]
│
└── E-A-T: /despre-noi · /metodologie · /joc-responsabil ·
           /joc-responsabil/auto-excludere · /joc-responsabil/limite-de-joc ·
           /joc-responsabil/varsta-minima-18-ani ·
           /termeni-si-conditii · /politica-de-confidentialitate · /contact
           [P1: 6 root · P2: 3 joc-responsabil subpages]
```

### P1 Foundation — breakdown (post sanity-check)

| Tip pagină | P1 count | Rațiune |
|------------|--------:|---------|
| BONUS-PAGE | **50** | Cap max 5/brand — top FD/bun-venit lineup |
| GUIDE-BRAND-PAGE | **40** | 20 lineup × inregistrare + verificare-cont |
| REVIEW | **20** | Lineup `04.BRANDS/` only |
| BONUS-BRAND-HUB | **20** | Hub per lineup brand |
| APP-REVIEW | **20** | App per lineup brand |
| GUIDE-BRAND-HUB | **17** | — |
| GUIDE-PAGE | **15** | Concepte pariuri (DNB, handicap, cash-out…) |
| E-A-T | **6** | Trust root pages |
| RATING | **5** | Top lists (`/top-bonus-fara-depunere` merged în W0-5, vezi nota) |
| BONUS-CATEGORY-HUB | **6** | — |
| FEATURE-RATING | **4** | cash-out, cote mărite, live, bonus multiple |
| REGULATORY-PAGE | **3** | ONJN, licențiate, impozit |
| PAYMENT-METHOD | **3** | paysafecard, neteller, aircash |
| HOMEPAGE + hubs | **5** | /, /bonusuri/, /ghiduri/, /aplicatii/, /metode-de-plata/, /pareri-jucatori/ |
| SPORT-CATEGORY | **1** | /sport/fotbal |
| **Total P1** | **217** | — |

### Top 20 recenzii P1 (ordine publicare — lineup only)

| # | URL | KW | Vol | Ready |
|---|-----|-----|----:|:-----:|
| 1 | `/recenzii/superbet` | superbet | 2,040,000 | ✓ |
| 2 | `/recenzii/betano` | betano | 499,000 | ✓ |
| 3 | `/recenzii/casa-pariurilor` | casa pariurilor | 329,000 | ✓ |
| 4 | `/recenzii/winbet` | winbet | 328,000 | ✓ |
| 5 | `/recenzii/totogaming` | totogaming | 238,000 | ✓ |
| 6 | `/recenzii/unibet` | unibet | 217,000 | ✓ |
| 7 | `/recenzii/fortuna` | fortuna | 202,000 | ✓ |
| 8 | `/recenzii/netbet` | netbet | 167,000 | ✓ |
| 9 | `/recenzii/maxbet` | maxbet | 164,000 | ✓ |
| 10 | `/recenzii/vbet` | vbet | 145,000 | ✓ |
| 11 | `/recenzii/getsbet` | getsbet | 114,000 | ✓ |
| 12 | `/recenzii/stanleybet` | stanleybet | 56,000 | ✓ |
| 13 | `/recenzii/don-ro` | don ro | 45,000 | ✓ |
| 14 | `/recenzii/winmasters` | winmasters | 21,000 | ✓ |
| 15 | `/recenzii/favbet` | favbet | 19,000 | ✓ |
| 16 | `/recenzii/betfair` | betfair | 13,000 | ✓ |
| 17 | `/recenzii/topbet` | topbet | 12,000 | ✓ |
| 18 | `/recenzii/pokerstars` | pokerstars | 11,000 | ✓ |
| 19 | `/recenzii/888sport` | 888sport | 5,700 | ✓ |
| 20 | `/recenzii/12xbet` | 12xbet | 350 | ✓ |

> **Template obligatoriu:** `05.TEMPLATES/review-page.md` — secțiune H2 «Modificatori navigaționali» (top-10 KW/brand din `03.SEO/_brand-nav-modifiers.json`).

---

## 4. Semantic Core — Top 100 Keywords

> Filtrat: pariuri-relevant, fără loto/cazino/euro-2024 noise. Sursă: Ahrefs organic + seeds + content-gap.

| # | Keyword | Vol | KD | Cluster țintă |
|---|---------|----:|---:|---------------|
| 1 | superbet | 2,040,000 | 3 | CORE: Recenzii / Navigational |
| 2 | betano | 499,000 | 61 | CORE: Recenzii / Navigational |
| 3 | casa pariurilor | 329,000 | 4 | CORE / SECONDARY |
| 4 | winbet | 328,000 | 6 | CORE: Recenzii / Navigational |
| 5 | unibet | 217,000 | 9 | CORE: Recenzii / Navigational |
| 6 | fortuna | 202,000 | 58 | CORE: Recenzii / Navigational |
| 7 | netbet | 167,000 | 43 | CORE: Recenzii / Navigational |
| 8 | maxbet | 164,000 | 63 | CORE: Recenzii / Navigational |
| 9 | euro | 294,000 | 64 | CORE / SECONDARY |
| 10 | totogaming | 238,000 | 0 | CORE: Recenzii / Navigational |
| 11 | getsbet | 114,000 | 2 | CORE: Recenzii / Navigational |
| 12 | vbet | 104,000 | 46 | CORE: Recenzii / Navigational |
| 13 | vivabet | 146,000 | 59 | CORE / SECONDARY |
| 14 | club superbet | 63,000 | 0 | CORE: Recenzii / Navigational |
| 15 | fotbal | 114,000 | 40 | CORE / SECONDARY |
| 16 | andrei rațiu | 105,000 | 0 | CORE / SECONDARY |
| 17 | grecia kino | 102,000 | 5 | CORE / SECONDARY |
| 18 | 888 | 49,000 | 35 | CORE: Recenzii / Navigational |
| 19 | romania fotbal | 94,000 | 26 | CORE / SECONDARY |
| 20 | liga 1 | 92,000 | 33 | CORE / SECONDARY |
| 21 | superbet club | 45,000 | 52 | CORE: Recenzii / Navigational |
| 22 | dennis man | 88,000 | 11 | CORE / SECONDARY |
| 23 | gets bet | 75,000 | 48 | CORE / SECONDARY |
| 24 | echipa națională de fotbal a belgiei | 70,000 | 0 | CORE / SECONDARY |
| 25 | romania vs ucraina | 69,000 | 0 | CORE / SECONDARY |
| 26 | cashpot | 67,000 | 0 | CORE / SECONDARY |
| 27 | rotiri gratuite fara depunere | 67,000 | 69 | CORE / SECONDARY |
| 28 | fortuna palace | 30,000 | 51 | CORE: Recenzii / Navigational |
| 29 | winner | 60,000 | 44 | CORE / SECONDARY |
| 30 | portugalia fc | 59,000 | 5 | CORE / SECONDARY |
| 31 | copa america | 58,000 | 18 | CORE / SECONDARY |
| 32 | stanleybet | 56,000 | 0 | CORE / SECONDARY |
| 33 | lasvegas | 55,000 | 88 | CORE / SECONDARY |
| 34 | meciuri azi | 54,000 | 59 | CORE / SECONDARY |
| 35 | bonus fara depunere | 26,000 | 28 | CORE: Bonusuri |
| 36 | echipa națională de fotbal a serbiei | 49,000 | 0 | CORE / SECONDARY |
| 37 | efortuna | 24,000 | 0 | CORE: Recenzii / Navigational |
| 38 | pariuriplus | 24,000 | 47 | CORE / SECONDARY |
| 39 | verificare bilet superbet | 23,000 | 49 | CORE: Recenzii / Navigational |
| 40 | spania georgia | 45,000 | 0 | CORE / SECONDARY |
| 41 | don ro | 45,000 | 41 | CORE / SECONDARY |
| 42 | argeș pitești - „u” cluj | 45,000 | 0 | CORE / SECONDARY |
| 43 | liga 2 | 45,000 | 9 | CORE / SECONDARY |
| 44 | echipa națională de fotbal a slovaciei | 43,000 | 0 | CORE / SECONDARY |
| 45 | campionat european | 41,000 | 7 | CORE / SECONDARY |
| 46 | echipa națională de fotbal a ungariei | 38,000 | 1 | CORE / SECONDARY |
| 47 | campionatul mondial | 37,000 | 4 | CORE / SECONDARY |
| 48 | betano ro | 18,000 | 69 | CORE: Recenzii / Navigational |
| 49 | echipa națională de fotbal a albaniei | 35,000 | 0 | CORE / SECONDARY |
| 50 | echipa națională de fotbal a germaniei | 35,000 | 2 | CORE / SECONDARY |
| 51 | germania fc | 34,000 | 6 | CORE / SECONDARY |
| 52 | echipa națională de fotbal a ucrainei | 34,000 | 0 | CORE / SECONDARY |
| 53 | powerbet | 33,000 | 0 | CORE / SECONDARY |
| 54 | pro arena online | 31,000 | 0 | CORE / SECONDARY |
| 55 | fotbal azi la tv | 30,000 | 56 | CORE / SECONDARY |
| 56 | meciuri romania | 29,000 | 1 | CORE / SECONDARY |
| 57 | unibet ro | 14,000 | 14 | CORE: Recenzii / Navigational |
| 58 | danemarca | 27,000 | 0 | CORE / SECONDARY |
| 59 | get bet | 27,000 | 7 | CORE / SECONDARY |
| 60 | echipa națională de fotbal a spaniei | 27,000 | 0 | CORE / SECONDARY |
| 61 | marius marin | 27,000 | 2 | CORE / SECONDARY |
| 62 | las vegas | 27,000 | 87 | CORE / SECONDARY |
| 63 | favbet | 13,000 | 0 | CORE: Recenzii / Navigational |
| 64 | betfair | 13,000 | 60 | CORE: Recenzii / Navigational |
| 65 | victorybet | 26,000 | 55 | CORE / SECONDARY |
| 66 | jocuri gratis | 26,000 | 35 | CORE / SECONDARY |
| 67 | magic jackpot | 25,000 | 1 | CORE / SECONDARY |
| 68 | winboss | 25,000 | 0 | CORE / SECONDARY |
| 69 | paysafecard | 25,000 | 7 | SECONDARY: Plăți |
| 70 | program pro tv azi | 24,000 | 4 | CORE / SECONDARY |
| 71 | curs valutar case schimb | 24,000 | 52 | CORE / SECONDARY |
| 72 | echipa națională de fotbal a scoției | 23,000 | 0 | CORE / SECONDARY |
| 73 | maxwin | 23,000 | 0 | CORE / SECONDARY |
| 74 | mr bit | 22,000 | 2 | CORE / SECONDARY |
| 75 | superbet verificare bilet | 11,000 | 57 | CORE: Recenzii / Navigational |
| 76 | csu craiova | 22,000 | 11 | CORE / SECONDARY |
| 77 | winmasters | 21,000 | 3 | CORE / SECONDARY |
| 78 | meciuri live | 21,000 | 37 | CORE / SECONDARY |
| 79 | efbet | 21,000 | 8 | CORE / SECONDARY |
| 80 | super bet | 21,000 | 3 | CORE / SECONDARY |
| 81 | stiri sportive | 21,000 | 83 | CORE / SECONDARY |
| 82 | vladislav blănuță | 21,000 | 1 | CORE / SECONDARY |
| 83 | loterie | 21,000 | 57 | CORE / SECONDARY |
| 84 | win for life | 20,000 | 1 | CORE / SECONDARY |
| 85 | total bet | 20,000 | 61 | CORE / SECONDARY |
| 86 | kino grecia | 20,000 | 3 | CORE / SECONDARY |
| 87 | petrolul | 20,000 | 9 | CORE / SECONDARY |
| 88 | magicjackpot | 19,000 | 1 | CORE / SECONDARY |
| 89 | table online | 19,000 | 0 | CORE / SECONDARY |
| 90 | echipa națională de fotbal a croației | 19,000 | 0 | CORE / SECONDARY |
| 91 | amicale | 19,000 | 0 | CORE / SECONDARY |
| 92 | turcia vs românia | 19,000 | 2 | CORE / SECONDARY |
| 93 | bonus fara depunere 2025 | 9,200 | 71 | CORE: Bonusuri |
| 94 | ponturi pariuri | 9,100 | 58 | SECONDARY: Ponturi |
| 95 | meci | 18,000 | 0 | CORE / SECONDARY |
| 96 | ultrabet | 18,000 | 39 | CORE / SECONDARY |
| 97 | rotiri gratuite fara depunere 2025 | 18,000 | 67 | CORE / SECONDARY |
| 98 | echipa națională de fotbal a angliei | 18,000 | 0 | CORE / SECONDARY |
| 99 | echipa națională de fotbal a italiei | 18,000 | 0 | CORE / SECONDARY |
| 100 | spania fc | 18,000 | 3 | CORE / SECONDARY |

**Volum cumulat top-100:** 7,977,300 / lună

---

## 5. Content Gap — Unde putem depăși concurența

Insights din `content-gap.csv` (5 402 KW) + structural gaps din discovery.

### Gaps structurale (KW există, secțiune slabă la concurenți)

| Gap | Vol | Oportunitate | Acțiune noastră |
|-----|----:|--------------|-----------------|
| Brand navigational fără landing dedicat | 159k | 0/8 secțiuni `/superbet/` | **H2 în `/recenzii/{brand}`** — vezi `review-page.md` |
| Hub pariuri sportive (homepage) | 145k | 0/8 dedicated | `/` pillar + embedded top-10 |
| Sport fotbal hub | 324k | 5 URL la 8 competitori | `/sport/fotbal` P1 |
| Feature ratings (visa, cash-out…) | mediu | fragmentat | **P1:** cash-out, cote mărite, live, bonus multiple |

### Content gap — KW unde 3+ competitori rankează (ținte directe)

| Keyword | Vol | KD | Comp. | Pagină țintă |
|---------|----:|---:|------:|--------------|
| getsbet | 92,000 | 55 | 3 | `/bonusuri/` |
| club superbet | 47,000 | 49 | 6 | `/recenzii/superbet` |
| club superbet ro | 6,900 | 36 | 6 | `/recenzii/superbet` |
| superclub superbet | 2,500 | 0 | 5 | `/recenzii/superbet` |
| fortuna pariuri sportive | 2,700 | 11 | 3 | `/bonusuri/` |
| program superbet | 2,300 | 0 | 6 | `/recenzii/superbet` |
| pariuri 1x2 | 2,200 | 0 | 5 | `/ghiduri/` |
| clubsuperbet | 2,700 | 19 | 5 | `/recenzii/superbet` |
| club.superbet | 3,500 | 48 | 5 | `/recenzii/superbet` |
| oferta casa pariurilor azi | 1,800 | 4 | 3 | `/bonusuri/` |
| card superbet club | 2,000 | 19 | 6 | `/recenzii/superbet` |
| superbet club card | 1,700 | 31 | 8 | `/recenzii/superbet` |
| card superbet | 2,100 | 48 | 6 | `/recenzii/superbet` |
| betano romania | 1,700 | 39 | 3 | `/bonusuri/` |
| superbet deschis acum | 1,000 | 0 | 5 | `/recenzii/superbet` |
| pariurix | 1,200 | 22 | 5 | `/bonusuri/` |
| stanleybet pariuri sportive | 900 | 5 | 3 | `/bonusuri/` |
| superbet contact | 2,000 | 58 | 7 | `/recenzii/superbet` |
| nr contact superbet online | 1,700 | 59 | 6 | `/recenzii/superbet` |
| superbetclub | 1,500 | 56 | 7 | `/recenzii/superbet` |

### Asimetrii concurență (de exploatat)

1. **Bonus-silo pariurix:** 1 704/1 826 URL bonus-brand — restul nu mirroruiesc → hub `/bonusuri/{brand}/` fără a clona 1700 pagini
2. **Ghiduri = moat structural:** 890 URL la 7/8 competitori — `/ghiduri/` e infrastructură SEO, nu money direct
3. **92 recenzii vs 20 dossier:** 72 branduri P2/P3 pot publica din clips fără dossier complet
4. **Player pareri separat:** concurenții amestecă UGC cu editorial — noi `/pareri-jucatori/` distinct

---

## 6. Data Readiness

### Snapshot: **90.4%** pagini au surse suficiente pentru scriere imediată

| Sursă | Status |
|-------|--------|
| Web clips (2 722) | ✅ reviews 242 · bonuses 933 · guides 1 135 · apps 108 · payments 130 |
| 04.BRANDS dossier | ✅ 20/92 branduri (P1 lineup) |
| 02.WIKI brands | ✅ 20 concept pages |
| 02.WIKI regulatory | ✅ 8 pagini |
| Discovery URLs | ✅ 4 623 clasificate (8 competitori) |
| Ahrefs | ✅ 16 338 KW · content-gap 5 402 |

### Ready by page type

| Tip | Total | Ready | % |
|-----|------:|------:|--:|
| GUIDE-PAGE | 959 | 959 | 100.0 |
| BONUS-PAGE | 921 | 921 | 100.0 |
| GUIDE-BRAND-PAGE | 344 | 134 | 39.0 |
| REVIEW | 92 | 85 | 92.4 |
| BONUS-BRAND-HUB | 88 | 88 | 100.0 |
| GUIDE-BRAND-HUB | 87 | 55 | 63.2 |
| PROMO-CODE | 77 | 77 | 100.0 |
| APP-REVIEW | 73 | 73 | 100.0 |
| PLAYER-REVIEWS | 53 | 53 | 100.0 |
| COMPARISON | 30 | 30 | 100.0 |
| FEATURE-RATING | 15 | 0 | 0.0 |
| PAYMENT-METHOD | 12 | 9 | 75.0 |
| SPORT-CATEGORY | 10 | 8 | 80.0 |
| E-A-T | 6 | 6 | 100.0 |
| RATING | 6 | 6 | 100.0 |
| BONUS-CATEGORY-HUB | 6 | 6 | 100.0 |
| REGULATORY-PAGE | 3 | 3 | 100.0 |
| DAILY-DIGEST | 3 | 3 | 100.0 |
| CALCULATOR | 2 | 2 | 100.0 |
| HOMEPAGE | 1 | 1 | 100.0 |
| BONUS-MAIN-HUB | 1 | 1 | 100.0 |
| APP-HUB | 1 | 1 | 100.0 |
| PAYMENT-HUB | 1 | 1 | 100.0 |
| GUIDE-HUB | 1 | 1 | 100.0 |
| BETTING-SCHOOL | 1 | 1 | 100.0 |
| PLAYER-REVIEWS-HUB | 1 | 1 | 100.0 |
| PROMO-CODE-HUB | 1 | 1 | 100.0 |

### Necesită scrape / dossier suplimentar (269 pagini)

| Tip | Count | Acțiune |
|-----|------:|---------|
| GUIDE-BRAND-PAGE | 210 | Firecrawl tutoriale 10pariuri (depunere/retragere) |
| GUIDE-BRAND-HUB | 32 | Evaluare per URL |
| FEATURE-RATING | 15 | Sinteză din 04.BRANDS + ratings clips |
| REVIEW | 7 | Firecrawl recenzie + creare dossier 04.BRANDS |
| PAYMENT-METHOD | 3 | Clip payment pages (netopia, visa, paypal…) |
| SPORT-CATEGORY | 2 | Clip sport guides (handbal, f1, box, nba) |

### Autoclip batch 6 URL (2026-07-14) ✅

| # | URL | Rezultat | Clip |
|---|-----|----------|------|
| 1 | `10pariuri.ro/cashpot-sport` | **ok** (new) | `reviews/2026-07-14-10pariuri.ro-cashpot-sport.md` |
| 2 | `…/verificare-cont-winbet` | **ok** (new) | `guides/…-verificare-cont-winbet.md` |
| 3 | `…/verificarea-contului-la-unibet` | **ok** (new) | `guides/…-verificarea-contului-la-unibet.md` |
| 4 | `…/verificare-cont-betfair` | **ok** (new) | `guides/…-verificare-cont-betfair.md` |
| 5 | `…/verificarea-contului-don` | **ok** (new) | `guides/…-verificarea-contului-don.md` |
| 6 | `xbets.ro/…/handicap-la-pariuri` | **skipped** (clip existent) | `guides/2026-07-14-xbets.ro-ce-inseamna-handicap-la-pariuri.md` |

**Exclus:** `biletu-zilei.com/recenzii/pareri-cashpot` — 399 cuvinte, UGC, rămâne în `_trash`.

**P1 KYC `data_ready: true`:** winbet, unibet, betfair, don-ro (verificare-cont).  
**P2 review cashpot:** `data_ready: true` (clip editorial 10pariuri).

### KYC synthesize — fără clip discovery

| Brand | URL | `guide_source` | `confidence` | `fact_check_required` |
|-------|-----|----------------|--------------|----------------------|
| 12xbet | `/ghiduri/brand/12xbet/verificare-cont` | synthesize from betfair/pokerstars KYC + brand dossier | medium | **true** |
| stanleybet | `/ghiduri/brand/stanleybet/verificare-cont` | synthesize from betfair/pokerstars KYC + brand dossier | medium | **true** |

### Modifiers nav — scope pariuri sportive (2026-07-14)

`_brand-nav-modifiers.json` refăcut: **casino/cazino/sloturi/ruletă/poker/rotiri exclus** din top-10.  
**5/20 brands** `sparse_modifiers: true` (vbet, don-ro, topbet, 12xbet, 888sport).  
Volum casino eliminat din top-10 anterior: **~67.7k** (~**21.8%** vs total pariuri top-10 curent).

### Autoclip round 2 (legacy list)

| Fișier | URL | Scop |
|--------|----:|------|
| `01.RAW/discovery/urls-to-clip-additional.txt` | **6** | batch final pre-Wave 0 (înlocuiește lista 70 URL) |

### Review template — modificatori navigaționali

Fiecare review **trebuie** să includă min. 10 H2 din `03.SEO/_brand-nav-modifiers.json`.
Template complet: `05.TEMPLATES/review-page.md`.

### Wave-0 batch W0-5 — cannibalizare keyword RATING (2026-07-14)

La planificarea batch-ului W0-5 (RATING × 6) s-au găsit **2 conflicte de keyword** cu pagini deja `ready`:

1. **`/top-bonus-fara-depunere`** (audit: target_keyword `bonus fara depunere`, 26 000 vol) — identic cu `/bonusuri/bonus-fara-depunere/` (`CATEGORY-RATING-HYBRID`, ready din W0-4, ~2310 cuvinte, deja include tabel comparativ 12 operatori + top-5 detaliat). **Decizie (user):** pagina se **elimină din plan** — hybrid-ul acoperă complet rating-intent-ul pentru acest keyword. RATING total: 6 → **5**.
2. **`/top-aplicatii-pariuri`** (audit: target_keyword `aplicatii pariuri sportive`, 150 vol) — identic cu `/aplicatii/` (`APP-HUB`, ready din W0-1). **Decizie (user):** **retarget** pe `cea mai buna aplicatie de pariuri sportive` (vol 50, KD 1) — intent diferit (superlativ/ranking vs hub director).

Batch W0-5 final: `/top-case-de-pariuri`, `/top-bonusuri`, `/top-aplicatii-pariuri` (retarget), `/top-case-de-pariuri-noi`, `/top-plati-rapide`.

### Wave-2 — corecție keyword SPORT-CATEGORY (2026-07-16)

`_audit-stage5-final.json` asocia `/sport/fotbal` cu `target_keyword: "fortuna pariuri fotbal"` (1000 vol, KD 47) — artefact de clusterizare (brand `fortuna` s-a infiltrat în selecția keyword-ului reprezentativ al clusterului „SECONDARY: Sport — fotbal", deși `brand: null` pe rând). Sesizat de user: pagina `/sport/fotbal` e un hub generic „cum să pariezi pe fotbal" (tipuri de pariuri, ligi, echipe, top-5 case ca rating — NU un review de brand). **Retarget:** `pariuri fotbal` (450 vol, KD 36 — sursă `01.RAW/ahrefs/seeds/pariuri.csv`; variantă apropiată 300 vol/KD 36 în `content-gap.csv`, diferență probabil de snapshot). Aceeași logică de audit (brand infiltrat în cluster keyword) e un risc latent și pe restul P2 SPORT-CATEGORY (`tenis`, `baschet`, `handbal`, `hochei`, `volei`, `esport`, `formula-1`, `box`, `nba`) — de reverificat la planificarea acelui batch, nu blocant pentru P1 (`fotbal`).

---

## Anexe

| Fișier | Conținut |
|--------|----------|
| `03.SEO/_audit-stage1.json` | Data audit |
| `03.SEO/_audit-stage2-clusters.json` | Clustere semantice |
| `03.SEO/_audit-stage4-url-draft.json` | Hartă URL completă (2 795 rânduri) |
| `03.SEO/_audit-stage5-final.json` | Priorități P1/P2/P3 per URL (rev. sanity-check) |
| `03.SEO/_brand-nav-modifiers.json` | Top-10 KW navigaționali per brand (Ahrefs) |
| `05.TEMPLATES/review-page.md` | Template review + H2 obligatorii |
| `01.RAW/discovery/urls-to-clip-additional.txt` | Autoclip round 2 (70 URL) |
| `03.SEO/master-plan.OLD-2026-07-13.md` | Plan anterior (referință) |

---

*Generat: 2026-07-13 · Revizie sanity-check aplicată: 2026-07-13*