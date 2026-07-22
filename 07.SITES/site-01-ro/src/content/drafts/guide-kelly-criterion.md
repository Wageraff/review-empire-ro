---
title: "Criteriul Kelly la Pariuri Sportive — Formulă și Exemple"
type: GUIDE-PAGE
url: /ghiduri/strategii/criteriul-kelly-la-pariuri
status: ready
batch: W3-1
wave: 3
priority: P1
created: 2026-07-20
updated: 2026-07-20
target_keyword: "criteriul kelly pariuri"
volume: 0
kd: 0
sources:
  - 02.WIKI/guides-concepts/kelly-criterion.md
  - 01.RAW/web-clips/guides/2026-07-13-10pariuri.ro-sistemul-bazat-pe-criteriul-lui-kelly-in-pariuri-sportive.md
  - 01.RAW/web-clips/guides/2026-07-13-legalbet.ro-criteriul-kelly.md
  - 01.RAW/web-clips/guides/2026-07-13-xbets.ro-ce-este-criteriul-kelly-si-cum-se-aplica-la-pariuri-sportive.md
related:
  - "[[concept:value-betting]]"
  - "[[concept:bankroll]]"
  - "[[concept:cota]]"
  - "[[concept:martingale]]"
  - "[[concept:pariuri-1x2]]"
---

# SEO Plan — Criteriul Kelly la pariuri sportive

> Fără volum de căutare direct (`criteriul kelly pariuri` — 0/0; cel mai apropiat KW cu volum e „pariuri matematice", 150 vol, dar intent mai larg). Pagină de profunzime pentru secțiunea strategii — completează triunghiul `value-betting` → `kelly-criterion` → `bankroll`.

## Meta

| Câmp | Valoare |
|------|---------|
| **H1** | Criteriul Kelly la Pariuri Sportive — Formulă și Exemple (55) |
| **Meta title** | Criteriul Kelly — Formula de Calcul a Mizei (44) |
| **Meta description** | Ce este criteriul Kelly, cum calculezi fracțiunea optimă din bankroll și exemple practice pe RON. Ghid pentru pariori avansați. (130) |
| **Schema.org** | Article |

---

# CONTENT (copy-written)

## Cât pariezi când ai găsit, într-adevăr, un avantaj

Ai identificat un value bet — estimarea ta arată clar mai bine decât cota implică. Urmează întrebarea la fel de importantă ca prima: cât pui pe acel pariu? Prea puțin și avantajul nu se vede; prea mult și un șir de pierderi îți rade bankroll-ul. Criteriul Kelly răspunde cu o formulă, nu cu o intuiție.

## Ce este criteriul Kelly

**Criteriul Kelly** e o formulă care calculează ce procent din bankroll merită investit într-un pariu, în funcție de probabilitatea ta estimată de câștig și de cotă. A fost dezvoltat de John Larry Kelly Jr. în secolul XX pentru optimizarea investițiilor și a fost preluat de pariorii care practică [[concept:value-betting]] pentru dimensionarea mizei.

Nu e o unealtă pentru începători. Kelly presupune că poți estima corect probabilitatea unui rezultat; dacă greșești estimarea, formula îți spune să pariezi prea mult și erodează rapid bankroll-ul.

## Cum se calculează

Formula clasică, pentru cote zecimale:

```
f = (b × p − q) / b
```

Unde:
- **f** = fracțiunea din bankroll de pariat
- **p** = probabilitatea ta estimată de câștig (0–1)
- **q** = probabilitatea de pierdere (1 − p)
- **b** = cotă − 1 (profitul net per unitate mizată)

Varianta echivalentă, mai practică, cu cota zecimală **C**:

```
f = (p × C − 1) / (C − 1)
```

În practică se folosește **Kelly fracționar**: aplici doar 25–50% din rezultatul formulei (Quarter-Kelly sau Half-Kelly), ca să reduci semnificativ variance-ul.

## Exemplu practic cu cifre

**Fără edge.** Bankroll de **2.000 RON**. Estimezi 55% șanse ca o echipă să nu piardă (un X2 la cota 1,45).

- p = 0,55, q = 0,45, C = 1,45, b = 0,45

```
f = (0,45 × 0,55 − 0,45) / 0,45 = (0,2475 − 0,45) / 0,45 = −0,45
```

Rezultat negativ → **nu pariezi**. Formula îți spune direct că nu există avantaj.

**Cu edge real.** Estimezi 50% șanse de victorie la cota **2,40**:

```
f = (0,50 × 2,40 − 1) / (2,40 − 1) = (1,20 − 1) / 1,40 = 0,143
```

Kelly complet: 14,3% din bankroll = **286 RON**, o miză agresivă. **Half-Kelly**: 7,15% = **143 RON**, mult mai rezonabil pentru un parior cu experiență medie.

> Sfatul pe care îl repet oricui descoperă Kelly: nu aplica niciodată formula completă. Kelly complet presupune că estimarea ta de probabilitate e perfectă — și rar e. Half-Kelly, sau chiar Quarter-Kelly, reduc considerabil riscul unui șir de pierderi care să-ți lovească grav bankroll-ul, în schimbul unei creșteri mai lente, dar mult mai stabile. Diferența dintre 14% și 7% dintr-o bancă pe un singur pariu e diferența dintre a supraviețui unei serii proaste și a nu-i supraviețui.
>
> — Andrei Munteanu, redactor-șef

## Când se aplică

- Ai deja un [[concept:value-betting]] clar, cu valoare calculată peste 1,00
- Estimarea probabilității vine din analiză solidă (statistici, formă, absențe), nu din intuiție
- Ai un [[concept:bankroll]] stabil, separat de cheltuielile zilnice
- Ai evidență pe termen lung, pe cel puțin câteva sute de pariuri

Kelly nu are sens la pariuri impulsive, la [[concept:live-betting]] fără plan sau când probabilitatea e „simțită", nu calculată.

## Greșeli comune

- **Aplici Kelly complet** — 40% din bancă pe un pariu, chiar cu estimare de 70%, e aproape de faliment garantat pe termen lung
- **Îți supraestimezi p** — „sigur iese" nu e 70%, poate e 55%
- **Ignori variance-ul** — chiar cu edge, 10 pierderi consecutive rămân posibile statistic
- **Aplici pe bilete multiple** — formula e gândită pentru pariuri independente, nu pentru acumulatori
- **Combini cu Martingale** — dublarea mizei după pierderi contrazice logica Kelly, care se bazează pe edge, nu pe recuperare ([[concept:martingale]])
- **Nu folosești varianta fracționară** — Quarter-Kelly sau Half-Kelly sunt standardul în comunitatea de pariori serioși

## Concluzie

Criteriul Kelly transformă dimensionarea mizei dintr-o alegere arbitrară într-un calcul precis, ancorat în edge-ul real identificat prin [[concept:value-betting]]. Aplicat corect — de preferință fracționar — reduce mult riscul unui declin brusc al bankroll-ului, fără să elimine variance-ul inerent pariurilor. Rămâne, totuși, o unealtă pentru pariori cu experiență și evidență documentată, nu o scurtătură pentru cineva la început de drum.

## Întrebări frecvente

<details><summary>Ce este criteriul Kelly la pariuri?</summary>O formulă care calculează procentul optim din bankroll de investit într-un pariu, în funcție de probabilitatea estimată de câștig și de cotă.</details>

<details><summary>Ce este Half-Kelly?</summary>O variantă mai prudentă: folosești doar 50% din procentul calculat prin Kelly complet, pentru a reduce riscul și variance-ul.</details>

<details><summary>Kelly funcționează pe bilete multiple?</summary>Nu în forma clasică. Formula presupune pariuri independente; pe acumulatori, calculul corect e mult mai complex și rar folosit.</details>

<details><summary>Am nevoie de o estimare exactă de probabilitate?</summary>Da, formula depinde direct de acuratețea estimării tale. O estimare greșită duce la o miză prea mare sau prea mică față de riscul real.</details>

## Linguist Notes

- Verificat: matematică (f = −0,45 fără edge; f = 0,143 cu edge → 286 RON Kelly complet / 143 RON Half-Kelly) — corectă.
- Diacritice complete; format numeric RO consecvent.
- Fără clișee AI interzise.
- Nicio corecție de fond necesară.
