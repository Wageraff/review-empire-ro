# Concepts Map

> Сопоставление `[[concept:id]]` → URL. Cursor обновляет когда draft получает `status: ready`.

```yaml
# Concepts Map — site-01-ro
# Обновлено: 2026-07-21 (W3-5: 4× FEATURE-RATING → ready, final approval; fix retroactiv id `cash-out` lipsă din W2-1)

concepts:
  - id: homepage
    type: homepage
    url: /
    status: ready  # batch W0-1

  - id: bonusuri
    type: bonus-main-hub
    url: /bonusuri/
    status: ready  # batch W0-1

  - id: ghiduri
    type: guide-hub
    url: /ghiduri/
    status: ready  # batch W0-1

  - id: metode-de-plata
    type: payment-hub
    url: /metode-de-plata/
    status: ready  # batch W0-1

  - id: pareri-jucatori
    type: player-reviews-hub
    url: /pareri-jucatori/
    status: ready  # batch W0-1

  - id: despre-noi
    type: eat
    url: /despre-noi
    status: ready  # batch W0-2

  - id: methodology
    type: eat
    url: /metodologie
    status: ready  # batch W0-2 — rezolvă pending_links din W0-1

  - id: contact
    type: eat
    url: /contact
    status: ready  # batch W0-2

  - id: termeni-si-conditii
    type: eat
    url: /termeni-si-conditii
    status: ready  # batch W0-2

  - id: politica-de-confidentialitate
    type: eat
    url: /politica-de-confidentialitate
    status: ready  # batch W0-2

  - id: onjn
    type: regulatory-page
    url: /legal/onjn
    status: ready  # batch W0-3

  - id: case-de-pariuri-licentiate
    type: regulatory-page
    url: /legal/case-de-pariuri-licentiate
    status: ready  # batch W0-3

  - id: impozit-pariuri
    type: regulatory-page
    url: /legal/impozit-pariuri
    status: ready  # batch W0-3

  - id: joc-responsabil
    type: eat
    url: /joc-responsabil
    status: ready  # batch W0-3 — rezolvă pending_links din W0-1/W0-2

  - id: bonus-de-bun-venit
    type: category-rating-hybrid
    hub_url: /bonusuri/bonus-de-bun-venit
    status: ready  # batch W0-4 (hub); pages per_brand = copy-written (W1-1), nu ready încă
    per_brand:
      superbet: /bonusuri/bonus-de-bun-venit/superbet   # copy-written, batch W1-1
      betano: /bonusuri/bonus-de-bun-venit/betano       # copy-written, batch W1-1
      casa-pariurilor: /bonusuri/bonus-de-bun-venit/casa-pariurilor  # copy-written, batch W1-1
      winbet: /bonusuri/bonus-de-bun-venit/winbet       # copy-written, batch W1-1

  - id: bonus-fara-depunere
    type: category-rating-hybrid
    hub_url: /bonusuri/bonus-fara-depunere
    status: ready  # batch W0-4 — top keyword proiect (26.000 vol); pages per_brand = copy-written (W1-1)
    per_brand:
      superbet: /bonusuri/bonus-fara-depunere/superbet   # copy-written, batch W1-1
      betano: /bonusuri/bonus-fara-depunere/betano       # copy-written, batch W1-1
      casa-pariurilor: /bonusuri/bonus-fara-depunere/casa-pariurilor  # copy-written, batch W1-1
      winbet: /bonusuri/bonus-fara-depunere/winbet       # copy-written, batch W1-1

  - id: pariu-gratuit
    type: bonus-category
    hub_url: /bonusuri/pariu-gratuit
    status: ready  # batch W0-4
    per_brand: {}

  - id: pariu-sansa
    type: bonus-category
    hub_url: /bonusuri/pariu-sansa
    status: ready  # batch W0-4 — concept nou, fără dosar wiki (TODO)
    per_brand: {}

  - id: cote-marite
    type: bonus-category
    hub_url: /bonusuri/cote-marite
    status: ready  # batch W0-4
    per_brand: {}

  - id: cashback-pariuri
    type: bonus-category
    hub_url: /bonusuri/cashback
    status: ready  # batch W0-4
    per_brand: {}

  # NB: /top-bonus-fara-depunere NU se creează — merged în [[concept:bonus-fara-depunere]]
  # (aceleași keyword+intent, deja acoperit de CATEGORY-RATING-HYBRID). Vezi master-plan.md.

  - id: top-case-de-pariuri
    type: rating
    url: /top-case-de-pariuri/
    status: ready  # batch W0-5 — flagship money page, ranking pe rating_overall intern

  - id: top-bonusuri
    type: rating
    url: /top-bonusuri/
    status: ready  # batch W0-5

  - id: top-aplicatii-pariuri
    type: rating
    url: /top-aplicatii-pariuri/
    status: ready  # batch W0-5 — retarget keyword (vezi master-plan.md nota W0-5)

  - id: top-case-de-pariuri-noi
    type: rating
    url: /top-case-de-pariuri-noi/
    status: ready  # batch W0-5 — YMYL: 12xbet exclus din recomandare (licență expirată)

  - id: top-plati-rapide
    type: rating
    url: /top-plati-rapide/
    status: ready  # batch W0-5

  # NB: /top-bonus-fara-depunere NU se creează — merged în [[concept:bonus-fara-depunere]] (vezi mai sus)

  - id: aplicatie-mobila
    type: app-category
    hub_url: /aplicatii/
    per_brand: {}
    status: ready  # batch W0-1 (APP-HUB)

  # --- W1-1: recenzii brand (REVIEW v2) — copy scris pentru toate 4, în lucru linguist ---
  - id: recenzie
    type: review-group
    url_pattern: /recenzii/{brand}
    per_brand:
      superbet: /recenzii/superbet
      betano: /recenzii/betano
      casa-pariurilor: /recenzii/casa-pariurilor
      winbet: /recenzii/winbet
    status: copy-written  # batch W1-1 — nu e ready până la linguist + final approval

  # Ghid de înregistrare per brand (țintă pentru [[concept:inregistrare@brand]])
  - id: inregistrare
    type: guide
    hub_url: /ghiduri/notiuni-de-baza/inregistrare
    per_brand:
      superbet: /ghiduri/brand/superbet/inregistrare
      betano: /ghiduri/brand/betano/inregistrare
      casa-pariurilor: /ghiduri/brand/casa-pariurilor/inregistrare
      winbet: /ghiduri/brand/winbet/inregistrare
      totogaming: /ghiduri/brand/totogaming/inregistrare
      unibet: /ghiduri/brand/unibet/inregistrare
      fortuna: /ghiduri/brand/fortuna/inregistrare
      netbet: /ghiduri/brand/netbet/inregistrare
      maxbet: /ghiduri/brand/maxbet/inregistrare
      vbet: /ghiduri/brand/vbet/inregistrare
      12xbet: /ghiduri/brand/12xbet/inregistrare
      888sport: /ghiduri/brand/888sport/inregistrare
      betfair: /ghiduri/brand/betfair/inregistrare
      don-ro: /ghiduri/brand/don-ro/inregistrare
      favbet: /ghiduri/brand/favbet/inregistrare
      getsbet: /ghiduri/brand/getsbet/inregistrare
      pokerstars: /ghiduri/brand/pokerstars/inregistrare
      stanleybet: /ghiduri/brand/stanleybet/inregistrare
      topbet: /ghiduri/brand/topbet/inregistrare
      winmasters: /ghiduri/brand/winmasters/inregistrare
    status: partial  # W3-2+W3-3 — 20/20 branduri din lineup P1 ready; hub generic /ghiduri/notiuni-de-baza/inregistrare încă nescris, fallback pending pentru restul brandurilor din 04.BRANDS (nu fac parte din lineup P1)

  # Verificare cont / KYC per brand (țintă pentru [[concept:verificare-cont@brand]])
  - id: verificare-cont
    type: guide
    hub_url: /ghiduri/notiuni-de-baza/verificare-cont-kyc
    per_brand:
      superbet: /ghiduri/brand/superbet/verificare-cont
      betano: /ghiduri/brand/betano/verificare-cont
      casa-pariurilor: /ghiduri/brand/casa-pariurilor/verificare-cont
      winbet: /ghiduri/brand/winbet/verificare-cont
      totogaming: /ghiduri/brand/totogaming/verificare-cont
      unibet: /ghiduri/brand/unibet/verificare-cont
      fortuna: /ghiduri/brand/fortuna/verificare-cont
      netbet: /ghiduri/brand/netbet/verificare-cont
      maxbet: /ghiduri/brand/maxbet/verificare-cont
      vbet: /ghiduri/brand/vbet/verificare-cont
      12xbet: /ghiduri/brand/12xbet/verificare-cont
      888sport: /ghiduri/brand/888sport/verificare-cont
      betfair: /ghiduri/brand/betfair/verificare-cont
      don-ro: /ghiduri/brand/don-ro/verificare-cont
      favbet: /ghiduri/brand/favbet/verificare-cont
      getsbet: /ghiduri/brand/getsbet/verificare-cont
      pokerstars: /ghiduri/brand/pokerstars/verificare-cont
      stanleybet: /ghiduri/brand/stanleybet/verificare-cont
      topbet: /ghiduri/brand/topbet/verificare-cont
      winmasters: /ghiduri/brand/winmasters/verificare-cont
    status: partial  # W3-2+W3-3 — 20/20 branduri din lineup P1 ready; hub generic încă nescris, fallback pending pentru restul brandurilor din 04.BRANDS (nu fac parte din lineup P1)

  # Hub agregator de bonusuri per brand (țintă pentru [[concept:bonusuri-brand@brand]])
  # NOTĂ: id redenumit din „bonusuri" → „bonusuri-brand" la final approval W3-4, pentru a evita coliziunea
  # cu concept-ul existent `id: bonusuri` (type: bonus-main-hub, /bonusuri/, ready din W0-1). Niciun draft
  # nu folosea încă placeholder-ul [[concept:bonusuri@brand]], deci redenumirea nu afectează linkuri existente.
  - id: bonusuri-brand
    type: bonus-hub
    hub_url: /bonusuri/
    per_brand:
      superbet: /bonusuri/superbet/
      betano: /bonusuri/betano/
      casa-pariurilor: /bonusuri/casa-pariurilor/
      winbet: /bonusuri/winbet/
      totogaming: /bonusuri/totogaming/
      unibet: /bonusuri/unibet/
      fortuna: /bonusuri/fortuna/
      netbet: /bonusuri/netbet/
      maxbet: /bonusuri/maxbet/
      vbet: /bonusuri/vbet/
      12xbet: /bonusuri/12xbet/
      888sport: /bonusuri/888sport/
      betfair: /bonusuri/betfair/
      don-ro: /bonusuri/don-ro/
      favbet: /bonusuri/favbet/
      getsbet: /bonusuri/getsbet/
      pokerstars: /bonusuri/pokerstars/
      stanleybet: /bonusuri/stanleybet/
      topbet: /bonusuri/topbet/
      winmasters: /bonusuri/winmasters/
    status: ready  # W3-4 — 20/20 BONUS-BRAND-HUB aprobate final (2026-07-21)

  - id: cota
    type: guide-concept
    wiki: [[guides-concepts/cota]]
    url: /ghiduri/notiuni-de-baza/ce-este-o-cota
    status: ready  # batch W3-1

  - id: rulaj
    type: guide-concept
    wiki: [[guides-concepts/rulaj-rollover]]
    url: /ghiduri/notiuni-de-baza/rulaj-bonus
    status: ready  # batch W3-1

  - id: live-betting
    type: guide-concept
    wiki: [[guides-concepts/live-betting]]
    url: /ghiduri/notiuni-de-baza/ce-sunt-pariurile-live
    status: ready  # batch W3-1

  - id: value-betting
    type: guide-concept
    wiki: [[guides-concepts/value-betting]]
    url: /ghiduri/strategii/ce-este-value-betting
    status: ready  # batch W3-1

  - id: bankroll
    type: guide-concept
    wiki: [[guides-concepts/bankroll]]
    url: /ghiduri/gestionarea-banilor/bankroll-management
    status: ready  # batch W3-1

  - id: kelly-criterion
    type: guide-concept
    wiki: [[guides-concepts/kelly-criterion]]
    url: /ghiduri/strategii/criteriul-kelly-la-pariuri
    status: ready  # batch W3-1

  - id: martingale
    type: guide-concept
    wiki: [[guides-concepts/martingale]]
    url: /ghiduri/strategii/strategia-martingale-la-pariuri
    status: ready  # batch W3-1

  - id: cash-out
    type: guide-concept
    wiki: [[guides-concepts/cash-out]]
    url: /ghiduri/tipuri-de-pariuri/ce-este-cash-out-la-pariuri
    status: ready  # batch W2-1 (id lipsă din concepts-map — fix retroactiv W3-5, vezi notă)

  - id: case-de-pariuri-cash-out
    type: feature-rating
    url: /top-case-de-pariuri-cash-out/
    status: ready  # batch W3-5
    per_brand: {}

  - id: case-de-pariuri-cote-marite
    type: feature-rating
    url: /top-case-de-pariuri-cote-marite/
    status: ready  # batch W3-5 — doar 4/20 branduri confirmate, onestitate păstrată în conținut
    per_brand: {}

  - id: case-de-pariuri-live
    type: feature-rating
    url: /top-case-de-pariuri-live/
    status: ready  # batch W3-5
    per_brand: {}

  - id: case-de-pariuri-bonus-multiple
    type: feature-rating
    url: /top-case-de-pariuri-bonus-pariuri-multiple/
    status: ready  # batch W3-5 — doar 2/20 branduri confirmate (decizie user: opțiunea 1, extindere ulterioară)
    per_brand: {}
```

> **Notă batch W0-1→W0-5:** conceptele `verificare-cont`, `cash-out`, `pariuri-1x2`, `pariuri-handicap`, `aplicatie-android/ios`, `netopia`, `mobilpay`, `skrill`, `neteller`, `carduri-bancare`, `criptomonede`, `transfer-bancar`, `suport-clienti`, `sport-fotbal`, `pariu-fara-risc`, `vip-loialitate`, `metodologie` (folosit ca alias inline distinct de `methodology`) și toate `@brand` (`superbet`, `betano`, `unibet`) folosite în draft-uri **nu au încă URL** — rămân `[[concept:X]]` nerezolvate până la scrierea paginilor-țintă. Linker le va marca `pending_links` la primul `build astro`. Conceptele `methodology` (W0-2), `onjn`, `case-de-pariuri-licentiate`, `impozit-pariuri`, `joc-responsabil` (W0-3), `bonus-de-bun-venit`, `bonus-fara-depunere`, `pariu-gratuit`, `pariu-sansa`, `cote-marite`, `cashback-pariuri` (W0-4), și `top-case-de-pariuri`, `top-bonusuri`, `top-aplicatii-pariuri`, `top-case-de-pariuri-noi`, `top-plati-rapide` (W0-5) au fost rezolvate. **W1-1 (review v2):** conceptele noi folosite în recenzii — `inregistrare@{brand}` (ghid nescris → pending), `pareri-jucatori@{brand}` (secțiune placeholder, se scrie în faza dedicată post-Wave-1), `aplicatie-mobila@{brand}` (per_brand al hub-ului `/aplicatii/`, încă gol) — rămân `pending_links` până la scrierea paginilor-țintă. **W3-1 (guide-page notiuni-de-baza/strategii):** `cota`, `rulaj`, `live-betting`, `value-betting`, `bankroll`, `kelly-criterion`, `martingale` rezolvate — închid cele mai dense `pending_links` din tot proiectul (referite din zeci de bonus-page/review/alte guide-page ready). **W3-5 (fix retroactiv + FEATURE-RATING seo-planned):** la pregătirea SEO plan-urilor pentru FEATURE-RATING s-a observat că `cash-out` era `status: ready` ca draft (`guide-cash-out.md`, batch W2-1) dar nu avea niciodată un bloc `id:` în acest fișier — rămăsese în nota narativă W0-1→W0-5 ca „pending" degeaba, cauzat de discrepanța de logging deja documentată la Wave-2 (vezi `log.md`). Fix aplicat acum, pentru că cele 20 recenzii `ready` folosesc masiv `[[concept:cash-out]]`. **Notă restanță (neaplicată încă, scop separat):** același gap probabil afectează și `pariuri-1x2`, `pariuri-handicap`, `btts`, `dnb`, `handicap-asiatic`, `over-under`, `pariu-sansa` (restul batch-ului W2-1, toate `ready` fără `id:` aici) — de verificat într-un batch de audit dedicat, nu în scope-ul W3-5.

**Wave-4 (batch-plan, 2026-07-21):** `netopia` (referit din `hub-metode-de-plata.md`) și `paypal` au fost **descopiate din P1** — 0/20 recenzii lineup menționează vreun brand care le oferă efectiv jucătorului (netopia e procesator backend românesc, PayPal nu operează cu case de pariuri RO). `netopia` rămâne `pending_link`, fără `id:` aici, backlog P2/P3. `paypal` nu are nicio referință `[[concept:...]]` în drafts — nimic de urmărit. Adăugate 4 concepte noi `feature-rating` (`case-de-pariuri-cash-out`, `case-de-pariuri-cote-marite`, `case-de-pariuri-live`, `case-de-pariuri-bonus-multiple`) — id-uri distincte față de `cash-out`/`cote-marite`/`live-betting` (acelea sunt pagini definiționale, cele noi sunt clasamente comparative pe lineup); toate 4 trecute la `status: ready` după final approval (2026-07-21), încheind **Wave-3 completă**. **W3-5 (Linguist Check, copy drafts):** la verificarea minimului de 5 `[[concept:...]]` unice/pagină, s-a folosit și `[[concept:pariuri-multiple]]` în 3/4 pagini (cash-out, cote-marite, bonus-multiple) — concept fără `id:` în acest fișier și fără draft `GUIDE-PAGE` scris pe site (există doar dosarul wiki `02.WIKI/guides-concepts/pariuri-multiple.md`). Rămâne `pending_links`, consecvent cu convenția proiectului (nu se adaugă `id:` până la `status: ready`); semnalat explicit aici ca să nu se piardă, pentru batch-ul care va scrie GUIDE-PAGE-ul dedicat.

**Wave-4, batch W4-1 (2026-07-21):** 6 pagini `PAYMENT-METHOD` noi trecute la `status: ready` — `carduri-bancare` (merge visa+mastercard), `skrill`, `okto-cash`, `transfer-bancar`, `apple-pay`, `revolut` (nou, dosar wiki sintetizat din `review-favbet.md`/`review-maxbet.md`). Ca și restul conceptelor `payment` (`paysafecard`, `neteller`, `aircash`, deja `ready` din batch-uri anterioare), acestea **nu au bloc `id:` dedicat** în acest fișier — se leagă direct pe convenția de URL `/metode-de-plata/<slug>`, consecvent cu gap-ul deja documentat mai sus („Notă restanță"). Nu blochează Linker-ul, dar rămâne pe lista de audit pentru un batch dedicat de normalizare a `concepts-map.md`.

> **Notă batch W3-4:** conceptul `bonusuri-brand@brand` (redenumit din `bonusuri@brand` la final approval, pentru a evita coliziunea de `id` cu hub-ul general `/bonusuri/`) e rezolvat pentru toate cele 20 de branduri din lineup-ul P1 — `status: ready`. Tipul `BONUS-BRAND-HUB` e la 100% (20/20).

> **Notă batch W3-2+W3-3:** conceptele `inregistrare@brand` și `verificare-cont@brand` sunt rezolvate pentru cele 20 de branduri din lineup-ul P1 — cluster 1/2 (superbet, betano, casa-pariurilor, winbet, totogaming, unibet, fortuna, netbet, maxbet, vbet, din W3-2) și cluster 2/2 (12xbet, 888sport, betfair, don-ro, favbet, getsbet, pokerstars, stanleybet, topbet, winmasters, din W3-3) — toate `status: ready`. Tipul `GUIDE-BRAND-PAGE` e la 100% (40/40) pentru lineup-ul P1. Pentru brandurile din afara acestui lineup (restul din `04.BRANDS/`), `[[concept:inregistrare@X]]`/`[[concept:verificare-cont@X]]` rămân `pending_links` (fallback pe `hub_url`, generic încă nescris).

## Правила разрешения

1. `[[concept:X@brand]]` → `per_brand[brand]` если ready, иначе `hub_url`
2. `[[concept:X]]` → `url` или `hub_url`
3. `[[concept:X?section=name]]` → URL + `#name`
4. Если target не ready → `pending_links` в PROGRESS.md
