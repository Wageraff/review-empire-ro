# Site Progress — ARCHIVE (site-01-ro)

> Полная история батчей W0–W4-2 на момент архивации 2026-07-21.
> Актуальный slim-файл: `PROGRESS.md`. Не читать целиком без нужды — только для разбора инцидентов / closed batches.

---

## 📊 Общая статистика

| Метрика | Значение |
|---|---|
| **Всего запланировано** | 2 788 страниц (master-plan) |
| **Ready (готовы к сборке)** | 194 (6.96%) |
| **In progress (в pipeline)** | 0 |
| **Not started** | 2 594 (93.04%) |
| **Deployed to production** | 0 (0%) |

### Прогресс-бар

```
█░░░░░░░░░░░░░░░░░░░░░░░░ 6.96% ready
```

---

## 📈 По типам страниц

| Тип | Всего (P1) | Ready | In progress | Not started | % ready |
|---|---|---|---|---|---|
| review | 20 | 20 | 0 | 0 | 100% |
| bonus-page | 50 | 40 | 0 | 10 | 80% |
| guide-page | 15 | 15 | 0 | 0 | 100% |
| sport-category | 6 | 6 | 0 | 0 | 100% |
| app-review | 20 | 20 | 0 | 0 | 100% |
| payment-method | 9 | 9 | 0 | 0 | 100% |
| rating | 5 | 5 | 0 | 0 | 100% |
| E-A-T | 6 | 6 | 0 | 0 | 100% |
| REGULATORY-PAGE | 3 | 3 | 0 | 0 | 100% |
| BONUS-CATEGORY-HUB | 4 | 4 | 0 | 0 | 100% |
| CATEGORY-RATING-HYBRID | 2 | 2 | 0 | 0 | 100% |
| GUIDE-BRAND-PAGE | 40 | 40 | 0 | 0 | 100% |
| BONUS-BRAND-HUB | 20 | 20 | 0 | 0 | 100% |
| FEATURE-RATING | 4 | 4 | 0 | 0 | 100% |
| **P1 subtotal** | **204** | **194** | **0** | **10** | **95%** |

> Примечание: `rating` total скорректирован с 6 → 5 после merge-решения W0-5 (`/top-bonus-fara-depunere` объединён с `bonus-fara-depunere`). P1 subtotal соответственно 144 → 143.
> Новый тип `GUIDE-BRAND-PAGE` (40 = 20 lineup × inregistrare+verificare-cont) добавлен la Wave-3 (W3-2/W3-3) — P1 subtotal 143 → 183.
> Новый тип `BONUS-BRAND-HUB` (20 = hub per lineup brand, `/bonusuri/{brand}/`) добавлен la Wave-3 (W3-4) — P1 subtotal 183 → 203. Definiție adăugată în `05.REGISTRIES/page-types.md`.
> Новый тип `FEATURE-RATING` (4 = cash-out, cote mărite, live, bonus pariuri multiple — clasamente pe o singură funcție) добавлен la Wave-3 (W3-5, ultimul batch din Wave-3) — P1 subtotal 203 → 207. Definiție adăugată în `05.REGISTRIES/page-types.md`. **Final approval dat (2026-07-21) — 4/4 ready, `GUIDE-BRAND-PAGE`+`BONUS-BRAND-HUB`+`FEATURE-RATING` toate la 100% → Wave-3 completă (5/5 batch'uri).**
> 🔧 **Corecție aritmetică (2026-07-21):** rândul „P1 subtotal" și statisticile generale de sus arătau „189 ready / ~18 not started" — sumă incorectă (o eroare de calcul acumulată, probabil la o actualizare anterioară). Recalculat direct din coloanele tabelului: 183 ready + 24 not started = 207.
> 📌 **Wave-4 batch-plan aprobat (2026-07-21):** cele 24 not-started (`bonus-page` ×10, `sport-category` ×5, `payment-method` ×9) au fost cercetate pentru data-readiness (mențiuni în cele 20 `review-*.md` + audit keyword). Decizie user: `netopia` și `paypal` (0/20 mențiuni — netopia e procesator backend nu metodă vizibilă jucătorului, PayPal nu operează cu case de pariuri RO) **descopiate din P1** → `payment-method` P1 scade de la 12 la **10**, P1 subtotal de la 207 la **205**, not-started de la 24 la **22**. `netopia` rămâne `pending_link` valid pentru P2/P3 (referit deja din `hub-metode-de-plata.md`), doar nu are pagină dedicată în Wave-4. **Fix adițional (2026-07-21):** `visa` și `mastercard` (0/0 vol amândouă) nu au dosare wiki separate — doar `02.WIKI/payments/carduri-bancare.md` (concept general, deja referit ca `[[concept:carduri-bancare]]` din `payment-paysafecard.md` ready). Conținut aproape identic între cele 2 (comisioane, 3D Secure, limite) — decizie user: **merge într-o singură pagină** `/metode-de-plata/carduri-bancare` care țintește ambele keyword-uri, fără duplicare. `payment-method` P1 scade de la 10 la **9** pagini reale, P1 subtotal de la 205 la **204**, not-started de la 22 la **21**.
Batch-plan final: **W4-1** PAYMENT-METHOD ×6 (carduri-bancare [visa+mastercard merge], skrill, okto-cash, transfer-bancar, apple-pay, revolut — ultimele 3 cu date parțiale, se scriu onest cu mențiune explicită) — **✅ READY (2026-07-21)**, **W4-2** SPORT-CATEGORY ×5 (tenis, baschet, esports, formula-1, box — ultimele 2 cu puține branduri confirmate, onest) — **✅ READY (2026-07-21)**, **W4-3** BONUS-PAGE ×10 (cote-marite ×4: Betano/Maxbet/Fortuna/Casa Pariurilor + cashback ×6: Betano/Casa Pariurilor/Don-ro/Vbet/Winbet/Winmasters — doar Don.ro are mecanică publicată complet, restul cu mențiune „mecanica exactă nu e publicată public").

### Hub pages (Wave-0, batch W0-1) — ✅ READY

| Тип | URL | Status | Batch | Слов |
|---|---|---|---|---:|
| HOMEPAGE | `/` | **ready** | W0-1 | ~1150 |
| BONUS-MAIN-HUB | `/bonusuri/` | **ready** | W0-1 | ~890 |
| GUIDE-HUB | `/ghiduri/` | **ready** | W0-1 | ~790 |
| APP-HUB | `/aplicatii/` | **ready** | W0-1 | ~750 |
| PAYMENT-HUB | `/metode-de-plata/` | **ready** | W0-1 | ~880 |
| PLAYER-REVIEWS-HUB | `/pareri-jucatori/` | **ready** | W0-1 | ~700 |

### E-A-T core (Wave-0, batch W0-2) — ✅ READY

| Тип | URL | Status | Batch | Слов |
|---|---|---|---|---:|
| E-A-T | `/despre-noi` | **ready** | W0-2 | ~605 |
| E-A-T | `/metodologie` | **ready** | W0-2 | ~720 |
| E-A-T | `/contact` | **ready** | W0-2 | ~450 |
| E-A-T | `/termeni-si-conditii` | **ready** | W0-2 | ~455 |
| E-A-T | `/politica-de-confidentialitate` | **ready** | W0-2 | ~500 |

> ⚠️ Brand/entitate juridică — **placeholder** (`Betoteca.ro` / `Betoteca Media SRL`), aprobat de user pentru fază content pipeline. De înlocuit înainte de deploy.
> ⚠️ `/termeni-si-conditii` + `/politica-de-confidentialitate` — необходима реальная юридическая/GDPR проверка перед публикацией (вне scope Copywriter/Linguist).
> ⚠️ **Объём ниже реестра:** все 5 страниц вышли на 45-90% от диапазона 800-1500 слов из `page-types.md` (одобрено пользователем как приемлемое, аналогично W0-1).

### Regulatory + joc responsabil (Wave-0, batch W0-3) — ✅ READY

| Тип | URL | Target keyword | Volume | KD | Status | Слов | Batch |
|---|---|---|---:|---:|---|---:|---|
| E-A-T | `/joc-responsabil` | joc responsabil | 250 | 6.0 | **ready** | ~955 | W0-3 |
| REGULATORY-PAGE | `/legal/onjn` | onjn | **2500** | 1.0 | **ready** | ~1075 | W0-3 |
| REGULATORY-PAGE | `/legal/case-de-pariuri-licentiate` | case de pariuri licentiate | 100 | 0.0 | **ready** | ~890 | W0-3 |
| REGULATORY-PAGE | `/legal/impozit-pariuri` | impozit pariuri | 300 | 1.0 | **ready** | ~1050 | W0-3 |

> 🟢 Первые страницы Wave-0 с реальным объёмом поиска (не volume=0 как большинство E-A-T/hub). `/legal/onjn` — самый ценный keyword в проекте на данный момент (2500 vol / KD ~1).
> ⚠️ Новый тип `REGULATORY-PAGE` добавлен в `page-types.md` (1500-2500 слов) — по аналогии с master-plan `03.SEO/master-plan.md`.
> ⚠️ **Объём ниже реестра:** все 3 REGULATORY-PAGE вышли на 43-69% от диапазона 1500-2500 слов (`onjn` — самый заметный разрыв, 43%, притом самый ценный keyword). Одобрено пользователем как приемлемое на этой фазе — кандидат №1 на расширение при будущей ревизии контента.
> ✅ `joc-responsabil` (E-A-T, ~955 слов) — в пределах диапазона 800-1500, без замечаний.
> 🔴 **Discrepancy найдена и исправлена:** вики-досье `taxe-si-costuri-operatori-jocuri-noroc.md` ошибочно утверждало отсутствие налога на выигрыш игрока. Копи `impozit-pariuri` переписан на реальные данные (grila art. 110 Cod Fiscal + taxă 2%/5%). Заметка в `02.WIKI/log.md`. **TODO вне batch:** обновить само вики-досье.
> ⚠️ `/legal/impozit-pariuri` — фискальная тема (YMYL), disclaimer «nu consultanță fiscală» присутствует — реальная фискальная проверка перед деплоем вне scope pipeline.

### Bonus category hubs (Wave-0, batch W0-4) — ✅ READY

| Тип | URL | Target keyword | Volume | KD | Status | Слов | Batch |
|---|---|---|---:|---:|---|---:|---|
| CATEGORY-RATING-HYBRID | `/bonusuri/bonus-fara-depunere/` | bonus fara depunere | **26 000** | 28 | **ready** | ~2310 | W0-4 |
| CATEGORY-RATING-HYBRID | `/bonusuri/bonus-de-bun-venit/` | bonus de bun venit pariuri | 200 | **57** | **ready** | ~2255 | W0-4 |
| BONUS-CATEGORY-HUB | `/bonusuri/pariu-sansa/` | pariu sansa power bet | 350 | 0 | **ready** | ~775 | W0-4 |
| BONUS-CATEGORY-HUB | `/bonusuri/pariu-gratuit/` | pariu gratuit fara depunere | 150 | 0 | **ready** | ~780 | W0-4 |
| BONUS-CATEGORY-HUB | `/bonusuri/cote-marite/` | cote marite pariuri | 0 | 0 | **ready** | ~815 | W0-4 |
| BONUS-CATEGORY-HUB | `/bonusuri/cashback/` | cashback pariuri | 0 | 0 | **ready** | ~765 | W0-4 |

> 🟢 `bonus-fara-depunere` — **самый ценный keyword всего проекта** (26 000 vol). `bonus-de-bun-venit` — самый высокий KD (57) в Wave-0.
> 🔴→✅ **Инцидент качества (исправлен в рамках batch'а):** первый проход по этим 6 страницам делался единым проходом (не секциями, против `copywriter.mdc`), с тонким объёмом (~900-990 слов) и всего 4 бренда в таблице для `bonus-fara-depunere` — при том что у главного конкурента (Legalbet) на этот keyword 3992 слова + 14 операторов + 5 детальных мини-обзоров. Пользователь поймал проблему на ревью. **Действие:** введён новый тип `CATEGORY-RATING-HYBRID` (2800-3800 слов, таблица 10-14 операторов + топ-5 детально) в `page-types.md`; `bonus-fara-depunere` и `bonus-de-bun-venit` полностью переписаны секциями (H2→показ→ok) до ~2255-2310 слов, 12 операторов в таблице, топ-5 мини-обзоров с реальными данными из клипов Legalbet/beturi.
> ⚠️ **Объём гибридов всё ещё ниже целевого диапазона 2800-3800** (~2255-2310, т.е. ~80% от нижней границы) — пользователь подтвердил approve при финальном ревью. Разница с конкурентом частично объясняется служебной вёрсткой виджета конкурента (~600-800 «слов» повторяющейся разметки карточек), но не полностью — кандидат на дальнейшее расширение.
> ⚠️ Остальные 4 BONUS-CATEGORY-HUB (`pariu-sansa`, `pariu-gratuit`, `cote-marite`, `cashback`) — объём ~765-815 слов, ниже реестра 1200-2000 (тот же паттерн, что в W0-1/W0-2/W0-3, одобрено пользователем).
> 🟡 `pariu-sansa` — концепт без досье в wiki (реконструирован из клипа Casa Pariurilor). TODO вне batch: создать `02.WIKI/bonuses/pariu-sansa.md`.
> ✅ Linguist check нашёл и исправил: логическую ошибку в сравнении плафонов (`bonus-fara-depunere`), калькированную фразу «Este important să» (`pariu-gratuit`), неуклюжий placeholder-оборот (`pariu-sansa`), несогласованность формата времени 24h/24 de ore.
> ✅ `[[concept:pariu-gratuit]]`, `[[concept:pariu-sansa]]`, `[[concept:cote-marite]]`, `[[concept:cashback-pariuri]]`, `[[concept:bonus-de-bun-venit]]`, `[[concept:bonus-fara-depunere]]` резолвлены — закрывают pending_links из hub-bonusuri (W0-1).

### Rating pages (Wave-0, batch W0-5) — ✅ READY

| Тип | URL | Target keyword | Volume | KD | Status | Слов | Batch |
|---|---|---|---:|---:|---|---:|---|
| RATING | `/top-case-de-pariuri/` | top case de pariuri online | 200 | 57 | **ready** | ~2705 | W0-5 |
| RATING | `/top-bonusuri/` | bonus pariuri | 400 | 69 | **ready** | ~1726 | W0-5 |
| RATING | `/top-aplicatii-pariuri/` | cea mai buna aplicatie de pariuri sportive (retarget) | 50 | 1 | **ready** | ~1572 | W0-5 |
| RATING | `/top-case-de-pariuri-noi/` | case de pariuri noi | 200 | 45 | **ready** | ~1488 | W0-5 |
| RATING | `/top-plati-rapide/` | retrageri rapide pariuri | 0 | 0 | **ready** | ~1483 | W0-5 |

> 🟢 Batch marcat ca **prioritate** de user (rating pages = money pages, flagship-ul proiectului `/top-case-de-pariuri/`).
> 🟢 **Ranking pe `rating_overall` intern** (din `04.BRANDS/*.md`), nu pe scorurile concurenților — decizie user explicită (2026-07-14). Top-3 flagship: Betano 8.7, Superbet 8.6, Fortuna 8.4.
> 🔴→✅ **2 conflicte de canibalizare găsite și rezolvate în planificare** (vezi `03.SEO/master-plan.md`, nota W0-5): `/top-bonus-fara-depunere` **eliminat** din plan (identic cu hybrid-ul ready din W0-4); `/top-aplicatii-pariuri` **retargetat** pe keyword cu KD 1 (identic anterior cu `/aplicatii/` hub ready din W0-1). RATING total: 6 → 5.
> 🔴→✅ **YMYL — 12xbet exclus din recomandare** (`top-case-de-pariuri-noi`): licența în dosar expirată 30.06.2026 (azi 14-15.07.2026), brand din 2016 (nu e nou). Folosit doar ca exemplu didactic „cum verifici licența". Decizie confirmată de user la aprobarea finală. TODO extern: reconfirmă statutul licenței 12xbet pe onjn.gov.ro și actualizează `04.BRANDS/12xbet.md`.
> ✅ **Linguist check (5/5) a găsit și corectat:** incoerență nume funcție Betano „Talk n' Bet" vs „Talk&Bet" între două pagini (unificat pe „Talk&Bet"); format cifre „1000 rotiri" → „1.000 rotiri" (`top-bonusuri`); referință neancorată la brandul „Admiral" (absent din lineup P1 și din restul paginii) eliminată din `top-plati-rapide` (2 locuri). Diacritice, date, separatori numerici — fără observații. 0 clișee AI în toate cele 5 fișiere.
> ⚠️ **Volum sub plan:** fapt ~1483-2705 vs. planificat ~2920-3450 (50-78% din intervalul RATING 2000-3500) — aprobat de user, tipar identic cu batch'urile precedente.
> ✅ `[[concept:top-case-de-pariuri]]`, `[[concept:top-bonusuri]]`, `[[concept:top-aplicatii-pariuri]]`, `[[concept:top-case-de-pariuri-noi]]`, `[[concept:top-plati-rapide]]` резолвлены în `concepts-map.md`.

---

## 🔄 Активные batch'и

### Batch W3-5 — FEATURE-RATING (4 pagini: cash-out, cote mărite, live, bonus pariuri multiple) — ✅ READY

Etapă: **SEO plans × 4 ✅** → **Copy drafts × 4 ✅** (Opus, pe secțiuni, cu insert expert unic/pagină) → **Linguist check × 4 ✅** (Sonnet) → **Final approval × 4 ✅** (2026-07-21). **Ultimul batch din Wave-3 — Wave-3 completă (5/5).**

Ultimul batch din Wave-3. Prima apariție a acestui tip — definiție adăugată în `05.REGISTRIES/page-types.md`. Surse: **fără researching nou de clipuri pentru lista de branduri** (clipurile din `01.RAW/web-clips/ratings/` și `bonuses/` folosite doar ca referință de structură — majoritatea listează operatori care nu sunt în lineup-ul P1) — sinteză strict din `04.BRANDS/*.md` (20) + `review-<brand>.md` (20, ready) +, pentru bonus pariuri multiple, dosarul wiki `02.WIKI/guides-concepts/pariuri-multiple.md` (nu există încă GUIDE-PAGE dedicat pe site).

| # | URL | Target keyword | Vol | KD | Confidence date | Status |
|---|---|---|---:|---:|---|---|
| 1 | `/top-case-de-pariuri-cash-out/` | case de pariuri online cu cash out | 100 | 16 | Ridicată — toate 20 branduri confirmate | ready |
| 2 | `/top-case-de-pariuri-cote-marite/` | case de pariuri cu cote marite | 0 | 0 | ⚠️ Scăzută — doar 4/20 branduri confirmate | ready |
| 3 | `/top-case-de-pariuri-live/` | case de pariuri live | 0 | 0 | Ridicată — toate 20 branduri au secțiune live | ready |
| 4 | `/top-case-de-pariuri-bonus-pariuri-multiple/` | bonus pariuri multiple | 0 | 0 | 🛑 Foarte scăzută — doar 2/20 branduri confirmate | ready |

> ⚠️ **Retarget manual de keyword pe 3/4 pagini** (documentat detaliat în fiecare SEO plan):
> - **Cash-out:** audit dădea „cash out pariuri" (0 vol) → retarget pe „case de pariuri online cu cash out" (100 vol/KD16, variantă găsită tot în audit la o pagină P3 nescrisă).
> - **Cote mărite:** audit dădea „cote marite pariuri" (0 vol) → **cannibalizare cu `/bonusuri/cote-marite/`** (BONUS-CATEGORY-HUB ready, W0-4, același keyword) → retarget pe „case de pariuri cu cote marite" (intent comparație, nu definiție).
> - **Live:** audit dădea „superbet pariuri live" (400 vol/KD18) → **contaminat cu brand** (același tip de problemă corectată anterior la sport/fotbal, Vbet, Favbet) → retarget pe „case de pariuri live".
> - Bonus pariuri multiple: „bonus pariuri multiple" (0 vol) păstrat, fără conflict.
> ⚠️ **Fix retroactiv `concepts-map.md`:** `id: cash-out` (guide-concept, `ready` din W2-1) nu avea niciodată bloc `id:` în registru — corectat acum, pentru că toate 20 recenzii `ready` folosesc `[[concept:cash-out]]`. **Restanță semnalată** (neaplicată, scop separat): probabil același gap afectează `pariuri-1x2`, `pariuri-handicap`, `btts`, `dnb`, `handicap-asiatic`, `over-under`, `pariu-sansa` (restul batch-ului W2-1) — de auditat separat.
> 🛑 **Decizie user necesară înainte de copywriting pe pagina #4 (bonus pariuri multiple):** doar Unibet (Combo Booster) și TopBet (Amplificator) au bonus la pariuri multiple confirmat în sursele interne — vezi cele 3 opțiuni detaliate în `drafts/rating-bonus-pariuri-multiple.md` (recomandare Architect: publicare onestă cu 2 branduri confirmate, opțiunea 1).
> 🟡 **Pagina #2 (cote mărite)** are de asemenea date mai subțiri (4/20 branduri confirmate: Betano, Fortuna, Maxbet, Casa Pariurilor) — semnalat, dar nu necesită decizie blocantă (poate fi publicată onest cu 4 branduri + secțiune „restul lineup-ului").
> ✅ **Decizie user (2026-07-21):** pagina #4 — opțiunea 1 aprobată (publicare onestă cu 2 branduri confirmate, extindere ulterioară). Copywriting pornit pe Opus, pe secțiuni.
> **Inserturi expert (unice/pagină):** cash-out → Radu Ilie (Fapt); cote mărite → Ioana Predescu (Atenție); live → Andrei Munteanu (Experiență personală); bonus multiple → Ioana Predescu (Sfat).
> ⚠️ **Discrepanță de reconciliat (semnalată la copy #4):** wiki `guides-concepts/pariuri-multiple.md` citează Betano/Superbet ca exemple de bonus multiplu, dar recenziile lor `ready` nu consolidează oferta — prioritizat sursa brand-specific; de reverificat la scrierea/actualizarea ofertei Betano/Superbet.
> ✅ **Linguist Check (2026-07-21):** 2 erori de gramatică corectate (`rating-cote-marite.md` — articol greșit cu substantiv plural; `rating-bonus-pariuri-multiple.md` — formă verbală inexistentă „am ști"), 1 clișeu eliminat („merită menționat" → „iese în evidență"), 3 duplicate/cvasi-duplicate de propoziție rescrise (2 auto-introduse la fix-ul de linkuri, 1 preexistent copywriting). Toate cele 4 pagini aveau sub minimul de 5 `[[concept:...]]` unice în text (2-4 reale, față de 5 declarate în self-check) — completate la 5 fiecare, cu legături firești (`cota`, `top-case-de-pariuri`, `pariuri-multiple`, `cote-marite`, `value-betting`, distribuite după context). `pariuri-multiple` documentat ca `pending_link` legitim în `concepts-map.md` (fără GUIDE-PAGE scris încă pe site). Volum sub intervalul 1600-2200 pe 2/4 pagini (`cote-marite` ~1.550, `bonus-multiple` ~1.365) — păstrat intenționat, fără umplutură, din cauza datelor confirmate mai puține (decizie deja acceptată la SEO plan/checkpoint).
> ✅ **Final approval (2026-07-21):** user a aprobat ("ok") — toate 4 pagini `status: ready`. `concepts-map.md` actualizat: `case-de-pariuri-cash-out`, `case-de-pariuri-cote-marite`, `case-de-pariuri-live`, `case-de-pariuri-bonus-multiple` → `ready`.
> **🎉 Wave-3 completă (5/5 batch'uri: W3-1 guide-page ×7, W3-2+W3-3 GUIDE-BRAND-PAGE ×40, W3-4 BONUS-BRAND-HUB ×20, W3-5 FEATURE-RATING ×4).**
> **Next:** Wave-4 pornit — vezi batch W4-1 mai jos.

## 🔄 Активные batch'и — Wave-4

### Batch W4-1 — PAYMENT-METHOD ×6 (carduri-bancare, skrill, okto-cash, transfer-bancar, apple-pay, revolut) — ✅ READY

Etapă: **SEO plans × 6 ✅** → **Copy drafts × 6 ✅** (Opus, pe secțiuni, inserturi expert variate) → **Linguist check × 6 ✅** (Sonnet) → **Final approval × 6 ✅** (2026-07-21).

Niciun tip nou de pagină — șabloane deja existente (`05.TEMPLATES/payment-method.md`, W2-2). Surse: `02.WIKI/payments/*.md` (dosare existente pentru 5/6; `revolut.md` creat în acest batch — nu exista dosar, sintetizat din `review-favbet.md` + `review-maxbet.md`, ambele `ready`, plus context general din web-clips competitori, fără a atribui date brandurilor lineup fără sursă).

| # | URL | Target keyword | Vol | KD | Confidence | Status |
|---|---|---|---:|---:|---|---|
| 1 | `/metode-de-plata/carduri-bancare` | carduri bancare pariuri | 0 | 0 | Ridicată — merge visa+mastercard, 6/20 branduri confirmate explicit + „toate ONJN" | ready (~1.240 c.) |
| 2 | `/metode-de-plata/skrill` | skrill romania | 90 | 1 | Ridicată — 6/20 branduri confirmate | ready (~1.150 c.) |
| 3 | `/metode-de-plata/okto-cash` | oktocash | 300 | 0 | Medie — 3/20 branduri confirmate | ready (~890 c.) |
| 4 | `/metode-de-plata/transfer-bancar` | transfer bancar pariuri | 0 | 0 | Ridicată — 6/20 branduri confirmate | ready (~975 c.) |
| 5 | `/metode-de-plata/apple-pay` | apple pay pariuri | 0 | 0 | Ridicată — 6/20 branduri confirmate | ready (~1.005 c.) |
| 6 | `/metode-de-plata/revolut` | revolut pariuri | 0 | 0 | ⚠️ Scăzută — doar 2/20 branduri confirmate explicit (Favbet, Maxbet); restul funcționează implicit ca card Visa/Mastercard | ready (~1.040 c.) |

> **Inserturi expert (tip variat, fără repetare):** carduri-bancare → Radu Ilie „Atenție" (blocare MCC 7995 de către bancă); skrill → Radu Ilie „Sfat" (retrageri rare/mari din cauza taxei fixe); okto-cash → Radu Ilie „Fapt" (soluție locală RO, campanii Liga 1); transfer-bancar → Radu Ilie „Experiență personală" (referință greșită de depunere); apple-pay → Radu Ilie „Exemplu" (viteza pe live-betting); revolut → citat preluat din analiza `review-favbet.md` (ready), atribuit explicit sursei, fără fabricare. Radu Ilie e expertul de plăți/aplicații — folosit consecvent tematic, dar cu 5 tipuri de insert diferite ca să nu fie repetitiv.
> ⚠️ **Volum sub intervalul template (1200-2000):** 5/6 pagini sunt la ~890-1150 cuvinte (doar carduri-bancare atinge ~1240). Conținutul acoperă toate secțiunile obligatorii; scăderea vine din refuzul de umplutură (multe metode au vol 0 și date confirmate limitate). Semnalat transparent pentru decizie la checkpoint — se poate extinde dacă se dorește.
> ✅ **Self-check copy:** 0 clișee AI interzise, 0 calcuri „si"/„sa", diacritice complete, 0 propoziții duplicate cross-file (>=6 cuvinte), 7-13 `[[concept:...]]` unice/pagină (peste minimul de 5).

> 🔧 **Decizie user — merge Visa+Mastercard:** cele 2 URL-uri din audit (0/0 vol amândouă, fără dosar wiki separat — doar `carduri-bancare.md` comun) au fost unite într-o singură pagină `/metode-de-plata/carduri-bancare`, ca să nu ducă la conținut cvasi-duplicat. `payment-method` P1: 10 → **9** pagini reale.
> 🔧 **Decizie user — descope netopia + paypal din P1:** 0/20 branduri lineup le oferă jucătorului (netopia = procesator backend, PayPal nu operează cu case RO). `payment-method` P1: 12 → 10 (înainte de merge-ul de mai sus).
> ✅ **Ingest nou:** `02.WIKI/payments/revolut.md` creat (Revolut = card Visa/Mastercard emis de neobank, nu metodă separată din punct de vedere tehnic) + adăugat în `02.WIKI/index.md`.
> ✅ **Linguist Check (2026-07-21):** 2 anglicisme corectate în `payment-skrill.md` („user-ul tău Skrill" → „identificatorul contului tău Skrill"; „doar user-ul Skrill" → „doar contul tău Skrill" — convenția „utilizator/cont" din paginile deja `ready`), 1 expresie neclară corectată în `payment-apple-pay.md` („confirmi din priviri" → „confirmi cu o privire"). Restul (4/6 pagini) — 0 modificări, text natural din prima variantă. Verificări confirmate pe toate cele 6: diacritice complete, 0 clișee AI, 0 calcuri „si"/„sa", terminologie consecventă (Netopia/mobilPay, Okto.Cash, 3D Secure), format numeric RO corect, 7-13 `[[concept:...]]` unice/pagină. Citatul din `revolut.md` (Radu Ilie, preluat trunchiat din `review-favbet.md`) verificat ca citare transparentă atribuită, nu duplicare silențioasă.
> ✅ **Final approval (2026-07-21):** user a aprobat ("ok") — toate 6 pagini `status: ready`. `concepts-map.md` actualizat cu notă narativă (payment-method concepts nu au bloc `id:` dedicat, consecvent cu `paysafecard`/`neteller`/`aircash` deja `ready` — gap cunoscut, pe lista de audit).
> **🎉 payment-method P1 la 100% (9/9).**

### Batch W4-2 — SPORT-CATEGORY ×5 (tenis, baschet, esports, formula-1, box) — ✅ READY

Etapă: **Final approval × 5 ✅ (2026-07-21)**. Volum final: **1965–2029 cuvinte/pagină**. Linguist Check (Sonnet) a corectat: 1 eroare de tastare (baschet: „paute"→„parieze"), 1 eroare de tastare (box: „trateză"→„tratează"), 3× anglicism „lineup" în conținut publicat (baschet, box) → termeni românești, 1 anglicism „sizing" (tenis) → „mize dimensionate diferit", 1 termen netradus „Grid position" (F1) → „Poziția pe grilă", 1 construcție greșită la FAQ (esports: prepoziție + persoană verb), uniformizare capitalizare „draw" (box). 0 clișee AI, 0 calcuri „si", diacritice complete în toate 5.

**Notă concepts-map.md:** consecvent cu `sport-fotbal.md` (ready, W2-2) și cu paginile `payment-method` din W4-1, cele 5 pagini SPORT-CATEGORY noi nu au blocuri `id:` dedicate în `concepts-map.md` — gap cunoscut, neblocant, de auditat separat.

`sport-category` P1 la 100% (6/6). P1 subtotal 204: 194 ready / 10 not started (95%).

Tip de pagină deja existent (`05.TEMPLATES/sport-category.md`, prima instanță `sport-fotbal.md`, W2-2, ready). Surse: `02.WIKI/sports/*.md` (dosare existente pentru 4/5; `box.md` creat în acest batch — nu exista dosar dedicat, sintetizat din clipul competitor `legalbet.ro-box.md` — secțiuni educaționale generice, nu date proprietare de brand — + `review-vbet.md`/`review-unibet.md`, ambele ready) + tabelele de marjă pe sport din recenziile `ready` (Betano, Superbet, Unibet, Fortuna, 888sport) pentru top-5 grounded factual.

| # | URL | Target keyword | Vol | KD | Confidence | Status |
|---|---|---|---:|---:|---|---|
| 1 | `/sport/tenis` | pariuri tenis | 450 | 12 | Ridicată — 20/20 branduri confirmate | ready |
| 2 | `/sport/baschet` | pariuri baschet | 300 | 0 | Ridicată — 20/20 branduri confirmate | ready |
| 3 | `/sport/esport` | pariuri esports | 150 | 0 | Ridicată — 19-20/20 branduri confirmate generic, 5 cu diferențiator documentat | ready |
| 4 | `/sport/formula-1` | pariuri formula 1 | 300 | 1 | ⚠️ Scăzută — doar 4/20 branduri confirmate explicit (Vbet, Unibet, Winmasters, Maxbet) | ready |
| 5 | `/sport/box` | pariuri box | 250 | 0 | 🛑 Foarte scăzută — doar 2/20 branduri confirmate explicit (Vbet, Unibet) | ready |

> ✅ **Top-5 grounded pe date reale, nu pe lista genericăa wiki-ului:** pentru tenis/baschet/esports, top-listele din SEO plan au fost verificate prin grep pe cele 20 `review-*.md` (tabele de marjă pe sport + citate expert) — nu se reutilizează lista „Case de pariuri recomandate" din `02.WIKI/sports/*.md` fără verificare, pentru că acele liste erau presupuneri generice fără citare directă. Ex: esports — wiki propunea betano/superbet/unibet/fortuna/maxbet, dar doar Winmasters (citat expert) și Totogaming (citat expert) au diferențiator documentat explicit; retarget la Winmasters/Totogaming/Betano/Getsbet/Unibet.
> 🔧 **Decizie user aplicată (F1 și box):** ambele scrise onest cu branduri confirmate reduse (4 pentru F1, 2 pentru box), verificate prin grep exact pe „Formula 1"/„box" în toate cele 20 recenzii (excluzând fals-pozitive precum „formular"). Fără liste artificiale completate la 5.
> ✅ **Ingest nou:** `02.WIKI/sports/box.md` creat (nu exista dosar dedicat — boxul era doar menționat generic în `sports/mma.md`) + adăugat în `02.WIKI/index.md`.
> ⚠️ **Notă URL esports:** audit-ul și `master-plan.md` folosesc slug singular `/sport/esport` — păstrat pentru consistență cu URL-ul canonic, deși „esports" (formă uzuală RO) e termenul corect în conținut.
> **Next:** ✅ Copy drafts (Opus, pe secțiuni) → extindere la 2000+ cuvinte/pagină → Linguist Check (Sonnet) → Final approval (2026-07-21). Batch W4-2 complet, `ready` (5/5). Următor: **W4-3 BONUS-PAGE ×10**.

### Batch W3-4 — BONUS-BRAND-HUB (20 brand × 1 hub) — ✅ READY

Etapă: **SEO plans × 20 ✅** → **Copy drafts × 20 ✅** (Opus, pe secțiuni) → **Linguist check × 20 ✅** (Sonnet) → **Final approval × 20 ✅** (2026-07-21).

Prima apariție a acestui tip — definiție adăugată în `05.REGISTRIES/page-types.md`. Surse: **fără researching nou de clipuri** — sinteză din `04.BRANDS/<brand>.md` + cele 2 pagini `BONUS-PAGE` deja `ready` per brand (bun venit + fără depunere) + `review-<brand>.md` (ready).

| Brand | Target keyword | Vol | KD | Cod promo | Status |
|---|---|---:|---:|---|---|
| Superbet | cod bonus superbet | 3200 | 62 | Nu | ready |
| Betano | bonus betano | 400 | 64 | Nu | ready |
| Casa Pariurilor | bonus casa pariurilor | 250 | 40 | Nu | ready |
| Winbet | cod bonus winbet | 400 | 57 | Nu | ready |
| Totogaming | bonus totogaming | 300 | 0 | Nu | ready |
| Unibet | cod bonus unibet | 350 | 48 | Nu | ready |
| Fortuna | bonus fortuna | 150 | 52 | Nu | ready |
| NetBet | cod bonus netbet | 400 | 56 | Nu | ready |
| Maxbet | cod bonus maxbet | 1000 | 53 | **Da** (GOL1/K_START50) | ready |
| Vbet | bonus vbet | 0 | 0 | Nu | ready |
| 12xBet | cod bonus 12xbet | 70 | 0 | Nu | ready |
| 888sport | bonus 888sport | 90 | 6 | Nu | ready |
| Betfair | bonus betfair | 70 | 55 | **Da** (ZSKW11) | ready |
| Don.ro | bonus don | 0 | 0 | Nu | ready |
| Favbet | bonus favbet | 70 | 0 | Nu | ready |
| Gets Bet | cod bonus gets bet | 300 | 62 | **Da** (SPORT1/2/3 + KYCF30/SC40) | ready |
| PokerStars | bonus pokerstars | 150 | 58 | Nu | ready |
| Stanleybet | cod bonus stanleybet | 200 | 58 | Nu | ready |
| TopBet | bonus topbet | 0 | 0 | Nu | ready |
| Winmasters | cod bonus winmasters | 150 | 49 | **Da** (SPORT600/300DORINTE) | ready |

> ✅ **Toate 20 branduri au deja ambele BONUS-PAGE `ready`** (bun venit + fără depunere, din W1-1→W1-5) — hub-ul e agregator pur, fără date noi de inventat.
> ⚠️ **Onestitate păstrată din BONUS-PAGE-urile sursă:** Unibet, NetBet, 12xBet, 888sport, TopBet, PokerStars au pagini fără-depunere/bun-venit cu titlu condiționat („Există la Pariuri Sportive?"/„Ce Ofertă Există?") — hub-ul nu inventează o ofertă confirmată unde sursa e condiționată. Fortuna și Betfair au oferte fără-depunere specifice cazinoului/inexistente pe sport — tratate la fel.
> ⚠️ **Cod promo obligatoriu** doar la Maxbet, Betfair, Gets Bet, Winmasters — restul brandurilor activează automat la depunere/verificare.
> 🟡 **Vbet, Favbet** — keyword ajustat manual („bonus vbet"/„bonus favbet" în loc de „bonus victory bet"/„bonus favbet casino" din audit) pentru consecvență cu denumirea și focusul sportiv al site-ului (ambele la volum 0, fără impact SEO real).
> ✅ **Linguist check (20/20):** terminologie — 8 corecturi „la cota minimă X" → „la cotă minimă X" (consecvență cu convenția din BONUS-PAGE ready, articol nedefinit când e urmat de valoare numerică). 0 clișee AI interzise, diacritice complete, format numeric RO corect.
> ✅ **Repetiție inter-pagini eliminată** (problemă reală de unicitate, nu doar stil): fraza de închidere a secțiunii „Alte promoții" era identică în 16/20 fișiere — rescrisă unic pentru fiecare brand. Fraza de onestitate „...spunem asta direct/din start" (cazuri fără bonus fără depunere) era identică în 6-7 fișiere — variată. 2 auto-duplicări interne (TopBet) și 2 duplicări încrucișate (Don.ro/Favbet, Vbet/Totogaming) corectate.
> ✅ **Final approval (2026-07-21):** toate cele 20 pagini `status: ready`.
> ✅ **`05.REGISTRIES/concepts-map.md`:** concept-ul per-brand redenumit `bonusuri` → `bonusuri-brand` (coliziune de `id` cu hub-ul general `/bonusuri/` din W0-1, niciun draft nu folosea încă placeholder-ul, deci redenumirea nu a rupt linkuri) și trecut la `status: ready`.
> ✅ **`BONUS-BRAND-HUB` P1 la 100% (20/20)** — tip de pagină închis pentru lineup-ul curent. P1 subtotal: 81% → 91% (185/203).
> **Next:** ✅ W3-5 (FEATURE-RATING × 4) finalizat, `ready` — vezi secțiunea activă de mai sus. 🎉 Wave-3 completă. Următor: propose batches for Wave-4.

### Batch W3-3 — GUIDE-BRAND-PAGE cluster 2/2 (10 brand × 2 topic) — ✅ READY

| Brand | Topic | Target keyword | Vol | KD | Surse | Status |
|---|---|---|---:|---:|---|---|
| 12xBet | inregistrare | 12xbet inregistrare | 0 | 0 | 1 clip (embedded) | ready |
| 12xBet | verificare-cont | verificare cont 12xbet | 0 | 0 | 1 clip (embedded) | ready |
| 888sport | inregistrare | 888sport inregistrare | 0 | 0 | 1 clip | ready |
| 888sport | verificare-cont | verificare cont 888sport | 0 | 0 | 1 clip (embedded) | ready |
| Betfair | inregistrare | creare cont betfair | 60 | 0 | 1 clip | ready |
| Betfair | verificare-cont | verificare cont betfair | 0 | 0 | 1 clip dedicat | ready |
| Don.ro | inregistrare | cont don.ro | 0 | 0 | 1 clip | ready |
| Don.ro | verificare-cont | verificare cont don.ro | 0 | 0 | 1 clip (embedded) | ready |
| Favbet | inregistrare | favbet inregistrare | 0 | 0 | 3 clip | ready |
| Favbet | verificare-cont | favbet verificare cont | 0 | 0 | 2 clip | ready |
| Gets Bet | inregistrare | gets bet inregistrare | 50 | 0 | **0 clip — synthesized** | ready |
| Gets Bet | verificare-cont | cont gets bet | 150 | 0 | **0 clip — synthesized** | ready |
| PokerStars | inregistrare | inregistrare pokerstars | 0 | 0 | 3 clip | ready |
| PokerStars | verificare-cont | verificare cont pokerstars | 0 | 0 | 1 clip dedicat | ready |
| Stanleybet | inregistrare | stanleybet cont | 100 | 30 | **0 clip — synthesized** | ready |
| Stanleybet | verificare-cont | cont stanleybet | 50 | 30 | **0 clip — synthesized** | ready |
| TopBet | inregistrare | topbet inregistrare | 0 | 0 | 1 clip (embedded) | ready |
| TopBet | verificare-cont | verificare cont topbet | 0 | 0 | 1 clip (embedded) | ready |
| Winmasters | inregistrare | inregistrare winmasters | 50 | 0 | 2 clip | ready |
| Winmasters | verificare-cont | verificare cont winmasters | 50 | 0 | 2 clip dedicat | ready |

> 🟡 **Gets Bet + Stanleybet — fără clip specific pentru cont** (la fel ca Vbet în W3-2): clipurile disponibile sunt program agenții/sărbători și verificare bilet fizic (intent diferit). Ambele branduri au 4 pagini `synthesized: true` + `fact_check_required: true` — sinteză din review-ul propriu (ready) + dosar, fără cifre inventate.
> ⚠️ **Atenție SEO (Gets Bet, Stanleybet):** NU se folosesc keyword-urile de mare volum „verificare bilet gets bet"/„verificare bilet stanleybet" (700-2.500 vol, intent = validare bilet fizic/cod, nu KYC) ca target pentru paginile verificare-cont — aceeași capcană semnalată la Superbet/Fortuna în W3-2.
> ⚠️ **12xBet — notă onestitate:** review-12xbet.md (ready) semnalează licența cu dată de valabilitate depășită (30.06.2026). Ghidul de înregistrare nu repetă analiza legală, dar FAQ include o întrebare care trimite spre recenzie pentru verificarea statutului curent — consecvent cu tratamentul deja stabilit.
> 888sport și Don.ro aveau clipuri cu `brand:` greșit clasificat în frontmatter (mislabeled ca `topbet`/`casa-pariurilor`), dar conținutul e confirmat corect prin URL/titlu — rezolvă concernul semnalat anterior că aceste 2 branduri nu ar avea surse.
> ✅ **`GUIDE-BRAND-PAGE` P1 la 100% (40/40)** — clustere 1/2 (W3-2) și 2/2 (W3-3) complete. `05.REGISTRIES/concepts-map.md` actualizat: `inregistrare@brand` + `verificare-cont@brand` rezolvate pentru toate cele 20 de branduri din lineup.

### Ghiduri strategii/notiuni-de-baza — Cotă/Rulaj/Live Betting/Value Betting/Bankroll/Kelly/Martingale (Wave-3, batch W3-1) — ✅ READY

| Тип | URL | Target keyword | Volume | KD | Status | Batch |
|---|---|---|---:|---:|---|---|
| GUIDE-PAGE | `/ghiduri/notiuni-de-baza/ce-este-o-cota` | cota pariuri | 70 | 48 | **ready** | W3-1 |
| GUIDE-PAGE | `/ghiduri/notiuni-de-baza/rulaj-bonus` | rulaj bonus pariuri | 0 | 0 | **ready** | W3-1 |
| GUIDE-PAGE | `/ghiduri/notiuni-de-baza/ce-sunt-pariurile-live` | pariuri live | 150 | 73 | **ready** | W3-1 |
| GUIDE-PAGE | `/ghiduri/strategii/ce-este-value-betting` | value bet | 30 | 61 | **ready** | W3-1 |
| GUIDE-PAGE | `/ghiduri/gestionarea-banilor/bankroll-management` | bankroll | 60 | 3 | **ready** | W3-1 |
| GUIDE-PAGE | `/ghiduri/strategii/criteriul-kelly-la-pariuri` | criteriul kelly pariuri | 0 | 0 | **ready** | W3-1 |
| GUIDE-PAGE | `/ghiduri/strategii/strategia-martingale-la-pariuri` | martingale | 200 | 4 | **ready** | W3-1 |

> 🟢 **Primul batch Wave-3** — 7 concepte-pilon din `notiuni-de-baza`/`strategii`/`gestionarea-banilor`, cele mai citate `[[concept:...]]` nerezolvate din tot proiectul (referite deja din zeci de bonus-page, review și alte guide-page ready).
> 🔴→✅ **Incident de proces (corectat la timp, fără a afecta rezultatul):** primul copy a fost scris pe Sonnet, cu skip peste checkpoint-uri (SEO plan → copy → linguist → approval scrise dintr-o singură trecere). Prins de user înainte de linguist check. **Acțiune:** cele 7 SEO plans (scrise pe Sonnet, rol permis) au fost păstrate; copy-ul a fost rescris integral pe Opus, pe secțiuni, cu checkpoint după SEO plans și după copy drafts, conform `.cursorrules` §CONTENT PIPELINE.
> ✅ **Verificare matematică completă (toate cele 7 pagini):** fiecare formulă și tabel numeric recalculat manual la linguist check — cotă/probabilitate implicită, rulaj (2 formule), miză live 2% bankroll, value betting (2 exemple), bankroll (tabel săptămânal +24 RON), Kelly (f=−0,45 / f=0,143), Martingale (secvența completă 1→640 + scenariu pas 8). Niciо eroare găsită.
> ✅ **Linguist check (7/7):** 2 corecturi — acord de gen greșit „o cotă arată tentant" → „tentantă" (`guide-value-betting.md`); frază calchiată/neclară în intro rescrisă (`guide-rulaj.md`). 0 clișee AI interzise.
> ✅ **Inserții expert:** 7 — Andrei Munteanu (redactor-șef) ×3 (cotă, rulaj, kelly-criterion), Ioana Predescu (analist pariuri sportive) ×3 (value-betting, bankroll, martingale), niciuna pe live-betting (fără citat expert, doar exemple).
> ✅ **Concepts-map:** `cota`, `rulaj`, `live-betting`, `value-betting`, `bankroll`, `kelly-criterion`, `martingale` rezolvate în `05.REGISTRIES/concepts-map.md` — închid cele mai dense `pending_links` din proiect.
> ✅ **Final approval (2026-07-20):** toate cele 7 pagini `status: ready`.

### APP-REVIEW batch 2 — Don.ro/Winmasters/Favbet/Betfair/TopBet/PokerStars/888sport/12xBet (Wave-2, batch W2-4) — ✅ READY

| Тип | URL | Target keyword | Volume | KD | Status | Batch |
|---|---|---:|---:|---|---|---|
| APP-REVIEW | `/aplicatii/don-ro` | aplicatie don | 0 | 0 | **ready** | W2-4 |
| APP-REVIEW | `/aplicatii/winmasters` | aplicatie winmasters | 150 | 0 | **ready** | W2-4 |
| APP-REVIEW | `/aplicatii/favbet` | aplicatie favbet | 0 | 0 | **ready** | W2-4 |
| APP-REVIEW | `/aplicatii/betfair` | aplicatie betfair | 0 | 0 | **ready** | W2-4 |
| APP-REVIEW | `/aplicatii/topbet` | aplicatie topbet | 0 | 0 | **ready** | W2-4 |
| APP-REVIEW | `/aplicatii/pokerstars` | aplicatie pokerstars | 0 | 0 | **ready** | W2-4 |
| APP-REVIEW | `/aplicatii/888sport` | aplicatie 888sport | 0 | 0 | **ready** | W2-4 |
| APP-REVIEW | `/aplicatii/12xbet` | aplicatie 12xbet | 0 | 0 | **ready** | W2-4 |

> 🟢 **Al doilea și ultimul batch APP-REVIEW din Wave-2** — finalizează lineup-ul de 20 app-review din master-plan (12 în W2-3 + 8 în W2-4).
> 🟡 **2 aplicații inexistente confirmate onest:** TopBet și 12xBet — fără aplicație nativă, doar browser mobil (rating_aplicatie 5/10 ambele), pagini structurate ca „Există sau Nu?" cu pași de acces prin browser.
> 🔴→✅ **2 discrepanțe surse rezolvate cu decizie explicită user (documentate în SEO Plan la data creării, 2026-07-16):** TopBet — clip nou afirmă existența unei aplicații native, dar review-ul existent (ready) + dosar confirmă lipsa ei — **păstrat review-ul**. Winmasters — clip tehnic nou afirmă absență din Google Play (necesită sideload), dar review-ul existent (ready) + dosar confirmă disponibilitate directă pe ambele magazine — **păstrat review-ul**.
> 🟡 **Betfair — nuanță fără conflict:** două aplicații separate (Exchange + Sportsbook); pe iOS doar Exchange e listată direct în App Store, Sportsbook necesită browser mobil pe iPhone.
> 🟡 **888sport — notă surse:** clipurile disponibile se referă predominant la 888Casino (produs separat), nu explicit la 888sport — detaliile fine (eSports streaming) vin din review+dosar. 12xBet — niciun clip disponibil, conținut integral din review+dosar.
> 🟢 **Favbet și PokerStars — cele mai bine cotate din batch** (rating_aplicatie 8, Favbet cu UX 9/10).
> ✅ **Linguist check (8/8):** 0 clișee AI, diacritice complete, 5/5 `[[concept:...]]` unice per pagină, consistență confirmată cu review-urile fiecărui brand.
> ✅ **Inserții expert:** 8 — Radu Ilie (analist plăți și aplicații) pe toate cele 8 pagini, unghiuri diferite.
> ✅ **Final approval (2026-07-20):** toate cele 8 pagini `status: ready`. **Wave-2 completă — 4/4 batch'uri (28/28 pagini: 8 guide-page/sport/payment + 20 app-review).**

### APP-REVIEW batch 1 — Superbet/Betano/Casa Pariurilor/Winbet/Totogaming/Unibet/Fortuna/NetBet/Maxbet/Vbet/GetsBet/Stanleybet (Wave-2, batch W2-3) — ✅ READY

| Тип | URL | Target keyword | Volume | KD | Status | Batch |
|---|---|---|---:|---:|---|---|
| APP-REVIEW | `/aplicatii/superbet` | aplicatie superbet | 1.600 | 4 | **ready** | W2-3 |
| APP-REVIEW | `/aplicatii/betano` | aplicatie betano | 100 | 43 | **ready** | W2-3 |
| APP-REVIEW | `/aplicatii/casa-pariurilor` | aplicatie casa pariurilor | 1.200 | 39 | **ready** | W2-3 |
| APP-REVIEW | `/aplicatii/winbet` | aplicatie winbet | 0 | 0 | **ready** | W2-3 |
| APP-REVIEW | `/aplicatii/totogaming` | aplicatie totogaming | 50 | 0 | **ready** | W2-3 |
| APP-REVIEW | `/aplicatii/unibet` | aplicatie unibet | 80 | 35 | **ready** | W2-3 |
| APP-REVIEW | `/aplicatii/fortuna` | fortuna app | 60 | 42 | **ready** | W2-3 |
| APP-REVIEW | `/aplicatii/netbet` | aplicatie netbet | 80 | 0 | **ready** | W2-3 |
| APP-REVIEW | `/aplicatii/maxbet` | aplicatie maxbet | 150 | 52 | **ready** | W2-3 |
| APP-REVIEW | `/aplicatii/vbet` | aplicatie vbet | 0 | 0 | **ready** | W2-3 |
| APP-REVIEW | `/aplicatii/getsbet` | aplicatie gets bet | 200 | 38 | **ready** | W2-3 |
| APP-REVIEW | `/aplicatii/stanleybet` | aplicatie stanleybet | 100 | 2 | **ready** | W2-3 |

> 🟢 **Șablon nou creat:** `05.TEMPLATES/app-review.md` (nu exista).
> 🟡 **Corecție keyword:** Fortuna — „aplicatie fortuna casino" (cluster casino contaminat) → **„fortuna app"** (60/KD42, scop sports betting) — al treilea caz de acest tip în Wave-2, după `/sport/fotbal`.
> 🔴 **2 discrepanțe surse identificate și rezolvate cu decizie explicită user (2026-07-16):**
> — **Winbet:** clip tehnic nou afirmă „nu există aplicație", dar `review-winbet.md` (ready) + dosar afirmă „iOS+Android, rating 7". **Decizie: păstrat review-ul existent** (aplicația tratată ca existentă).
> — **Vbet:** `review-vbet.md` (ready) + dosar aveau notă internă „iOS app menționată în alte surse, de verificat" (rating_aplicatie: 6, „doar browser"). Clip nou (biletu-zilei.com) confirmă exact acea mențiune — aplicații native pe ambele platforme („VBET - Pariuri & Casino" Android / „VBET Sport & Casino" iOS, 4,3/5). **Decizie: clipul rezolvă vechea întrebare** — pagina nouă tratează aplicația ca existentă, rating revizuit editorial 6→7.
> ⚠️ **TODO deschis (neexecutat, semnalat explicit):** `review-vbet.md` și `04.BRANDS/vbet.md` necesită actualizare într-un batch viitor pentru a reflecta noua informație despre aplicația Vbet — nu s-a editat retroactiv conținutul deja `ready`.
> 🟡 **Lungime sub target șablon:** pagini de 500–770 cuvinte (target șablon: 1500-2500) — densitate informațională prioritizată, nu „apă". Semnalat userului la checkpoint, fără cerere de expansiune.
> ✅ **Linguist check (12/12):** 2 corecturi (format numeric `app-vbet.md`; completare linkuri interne pe 9/12 pagini, de la 3-4 la minim 5 `[[concept:...]]` unice per pagină — regulă SEO).
> ✅ **Inserții expert:** 12 — Radu Ilie (analist plăți și aplicații) pe toate cele 12 pagini, unghiuri diferite (teste cronometrate, comparații funcții, avertismente securitate, observații de piață).
> ✅ **Final approval (2026-07-16 20:05):** toate cele 12 pagini `status: ready`.

### Metode de plată + Sport hub — Paysafecard/Neteller/Aircash/Fotbal (Wave-2, batch W2-2) — ✅ READY

| Тип | URL | Target keyword | Volume | KD | Status | Batch |
|---|---|---|---:|---:|---|---|
| PAYMENT-METHOD | `/metode-de-plata/paysafecard` | paysafecard | 25.000 | 7 | **ready** | W2-2 |
| PAYMENT-METHOD | `/metode-de-plata/neteller` | neteller | 900 | 31 | **ready** | W2-2 |
| PAYMENT-METHOD | `/metode-de-plata/aircash` | aircash | 700 | 0 | **ready** | W2-2 |
| SPORT-CATEGORY | `/sport/fotbal` | pariuri fotbal | 450 | 36 | **ready** | W2-2 |

> 🟢 **Flagship keyword al Wave-2:** `paysafecard` (25.000 vol/KD 7) — cel mai valoros din toată valul, competiție minimă.
> 🟡 **Corecție keyword documentată:** `/sport/fotbal` retarget de la „fortuna pariuri fotbal" (contaminare brand în audit) la „pariuri fotbal" (450/KD36) — vezi `03.SEO/master-plan.md` secțiunea Wave-2.
> 🟢 **Șabloane noi create:** `05.TEMPLATES/payment-method.md`, `05.TEMPLATES/sport-category.md` (nu existau, cerute de `.cursorrules`).
> 🟢 **Top-5 case pentru fotbal** — rating factual (sponsorizare/cote/streaming), fără promo unilateral; cross-link spre `/top-case-de-pariuri/`.
> ✅ **Linguist check (4/4):** 2 corecturi (diacritică „accepta"→"acceptă" în `payment-neteller.md`; typo „pariheze"→"parieze" în `payment-paysafecard.md`). 0 clișee AI.
> ✅ **Inserții expert:** 5 total — Radu Ilie (analist plăți) pe toate cele 3 payment-method, Andrei Munteanu (redactor-șef) ×2 pe sport-fotbal.
> ✅ **Final approval (2026-07-16 19:10):** toate cele 4 pagini `status: ready`.

### Ghiduri concepte pariuri — 1X2/Cash Out/Handicap/DNB/BTTS/Over-Under/Pariu Șansă (Wave-2, batch W2-1) — ✅ READY

| Тип | URL | Target keyword | Volume | KD | Status | Batch |
|---|---|---|---:|---:|---|---|
| GUIDE-PAGE | `/ghiduri/tipuri-de-pariuri/pariuri-1x2` | pariuri 1x2 | 2.200 | 0 | **ready** | W2-1 |
| GUIDE-PAGE | `/ghiduri/tipuri-de-pariuri/ce-este-cash-out-la-pariuri` | cash out | 500 | 11 | **ready** | W2-1 |
| GUIDE-PAGE | `/ghiduri/tipuri-de-pariuri/ce-sunt-pariurile-over-under-sub-peste` | peste 2.5 goluri | 500 | 0 | **ready** | W2-1 |
| GUIDE-PAGE | `/ghiduri/tipuri-de-pariuri/ce-inseamna-btts-la-pariuri` | ce inseamna gg la pariuri | 200 | 0 | **ready** | W2-1 |
| GUIDE-PAGE | `/ghiduri/tipuri-de-pariuri/ce-inseamna-dnb-la-pariuri` | dnb pariuri | 150 | 39 | **ready** | W2-1 |
| GUIDE-PAGE | `/ghiduri/tipuri-de-pariuri/ce-este-handicapul-la-pariuri` | handicap pariuri | 150 | 0 | **ready** | W2-1 |
| GUIDE-PAGE | `/ghiduri/tipuri-de-pariuri/ce-este-handicapul-asiatic` | handicap asiatic | 100 | 0 | **ready** | W2-1 |
| GUIDE-PAGE | `/ghiduri/tipuri-de-pariuri/ce-este-pariul-sansa` | pariu sansa | 80 | 0 | **ready** | W2-1 |

> 🟢 **Consolidare keyword cannibalization:** 15 URL din auditul original → 8 pagini canonice (fiecare concept unic acoperit o singură dată).
> 🟢 **Flagship:** `pariuri-1x2` (2.200 vol/KD 0) — cel mai valoros keyword ghid din Wave-2.
> 🟢 **`pariu-sansa` reclasificat** din brand-specific în concept generic — tabel comparativ pe 5 branduri (Superbet, Casa Pariurilor, Fortuna, Get's Bet, Power Bet) + variantă progresivă Superbet.
> 🟢 **Șablon nou creat:** `05.TEMPLATES/guide-page.md` (nu exista).
> ✅ **Linguist check (8/8):** 1 corectură diacritică. 0 clișee AI.
> ✅ **Inserții expert:** 11 total — Andrei Munteanu ×8, Ioana Predescu ×2, Radu Ilie ×1. Big guides (1x2, cash-out, pariu-sansa) = 2 inserții; restul = 1.
> ✅ **Final approval (2026-07-16 18:50):** toate cele 8 pagini `status: ready`.

### Review + bonusuri noi jucători — TopBet/PokerStars/888sport/12xBet (Wave-1, batch W1-5) — ✅ READY

| Тип | URL | Target keyword | Volume | KD | Status | Batch |
|---|---|---|---:|---:|---|---|
| REVIEW | `/recenzii/topbet` | topbet | 12.000 | 26 | **ready** | W1-5 |
| REVIEW | `/recenzii/pokerstars` | pokerstars | 11.000 | 65 | **ready** | W1-5 |
| REVIEW | `/recenzii/888sport` | 888sport | 5.700 | 68 | **ready** | W1-5 |
| REVIEW | `/recenzii/12xbet` | 12xbet | 4.100 | 2 | **ready** | W1-5 |
| BONUS-PAGE | `/bonusuri/bonus-de-bun-venit/topbet` | topbet bonus | 60 | — | **ready** | W1-5 |
| BONUS-PAGE | `/bonusuri/bonus-fara-depunere/topbet` | topbet bonus fara depunere | 700 | — | **ready** | W1-5 |
| BONUS-PAGE | `/bonusuri/bonus-de-bun-venit/pokerstars` | pokerstars bonus de bun venit | 100 | 53 | **ready** | W1-5 |
| BONUS-PAGE | `/bonusuri/bonus-fara-depunere/pokerstars` | pokerstars bonus fara depunere | 300 | 48 | **ready** | W1-5 |
| BONUS-PAGE | `/bonusuri/bonus-de-bun-venit/888sport` | bonus 888 sport | 150 | 65 | **ready** | W1-5 |
| BONUS-PAGE | `/bonusuri/bonus-fara-depunere/888sport` | 888 sport bonus fara depunere | 100 | 55 | **ready** | W1-5 |
| BONUS-PAGE | `/bonusuri/bonus-de-bun-venit/12xbet` | 12xbet bonus | 80 | — | **ready** | W1-5 |
| BONUS-PAGE | `/bonusuri/bonus-fara-depunere/12xbet` | 12xbet ro bonus fara depunere | 200 | — | **ready** | W1-5 |

> 🟢 **Al cincilea și ultimul cluster Wave-1** (TopBet, PokerStars, 888sport, 12xBet) — finalizează lineup-ul „Top 20 recenzii P1" din `03.SEO/master-plan.md`. Structură v2 identică W1-1…W1-4.
> 🟢 **FD sport real: niciun brand din batch.** TopBet — pivot total (fără FD nici pe sport, nici cazino). PokerStars — FD real dar exclusiv cazino (50 rotiri), fără bonus sport deloc (caz unic în lineup, confirmat de 2 surse). 888sport — freebeturile (până la 888 RON) sunt deposit-based, nu FD real. 12xBet — fără FD real, redirect explicit spre Winmasters (același operator, Level Up Interactive).
> 🟡 **Note finale:** TopBet 7,3 / PokerStars 6,9 / 888sport 7,3 / 12xBet 6,6 (cea mai mică din întregul lineup de 20 recenzii) — aliniate cu `rating_overall` din dosare.
> 🟡 **Licențe:** PokerStars expiră 31.08.2026, 12xBet — dată înregistrată 30.06.2026 (deja trecută la data curentă) — mențiune factuală, fără alarmism, consistent cu tratamentul Unibet/NetBet/Maxbet/Winmasters/Betfair din batch-urile precedente.
> 🟢 **Caz special PokerStars:** unicul brand din lineup fără bonus de bun venit pe sport (confirmat explicit de 2 surse independente) — pagina `bonus-de-bun-venit-pokerstars` tratează onest absența ofertei + tabel cu alternative reale (TopBet, 888sport, 12xBet), fără a inventa un welcome inexistent.
> 🟢 **Caz special 12xBet:** același operator ca Winmasters (Level Up Interactive, aceeași licență ONJN). Reviewul și pagina FD recomandă explicit Winmasters pentru cine caută FD sport real — decizie de onestitate editorială, semnalată userului la final approval.
> ✅ **Linguist check (12/12):** 1 corectură (diacritică greșită „să pariéze" → „să parieze" în `review-pokerstars.md`). 0 clișee AI. Verificat: ≥5 `[[concept:...]]` per pagină, note finale consistente rezumat↔verdict, cifre consistente review↔bonus-page pe fiecare brand.
> ✅ **Final approval (2026-07-16 11:30):** toate cele 12 pagini `status: ready`. **Wave-1 completă — 5/5 batch'uri (60/60 pagini: 20/20 review + 40/40 bonus-page).**

### Review + bonusuri noi jucători — Don.ro/Winmasters/Favbet/Betfair (Wave-1, batch W1-4) — ✅ READY

| Тип | URL | Target keyword | Volume | KD | Status | Batch |
|---|---|---|---:|---:|---|---|
| REVIEW | `/recenzii/don-ro` | don ro | 45.000 | — | **ready** | W1-4 |
| REVIEW | `/recenzii/winmasters` | winmasters | 21.000 | — | **ready** | W1-4 |
| REVIEW | `/recenzii/favbet` | favbet | 19.000 | — | **ready** | W1-4 |
| REVIEW | `/recenzii/betfair` | betfair | 13.000 | — | **ready** | W1-4 |
| BONUS-PAGE | `/bonusuri/bonus-de-bun-venit/don-ro` | don.ro bonus | 200 | — | **ready** | W1-4 |
| BONUS-PAGE | `/bonusuri/bonus-fara-depunere/don-ro` | don.ro bonus fara depunere | 400 | 55 | **ready** | W1-4 |
| BONUS-PAGE | `/bonusuri/bonus-de-bun-venit/winmasters` | winmasters bonus de bun venit | 150 | 48 | **ready** | W1-4 |
| BONUS-PAGE | `/bonusuri/bonus-fara-depunere/winmasters` | winmasters bonus fara depunere | 700 | 55 | **ready** | W1-4 |
| BONUS-PAGE | `/bonusuri/bonus-de-bun-venit/favbet` | favbet bonus | 60 | — | **ready** | W1-4 |
| BONUS-PAGE | `/bonusuri/bonus-fara-depunere/favbet` | favbet bonus fara depunere | 600 | 55 | **ready** | W1-4 |
| BONUS-PAGE | `/bonusuri/bonus-de-bun-venit/betfair` | betfair bonus de bun venit | 100 | — | **ready** | W1-4 |
| BONUS-PAGE | `/bonusuri/bonus-fara-depunere/betfair` | betfair bonus fara depunere | 300 | 55 | **ready** | W1-4 |

> 🟢 Al patrulea cluster Wave-1 (Don.ro, Winmasters, Favbet, Betfair). Structură v2 identică W1-1/W1-3.
> 🟢 **FD sport real: doar Winmasters** (50 RON freebet + 300 rotiri, cod 300DORINTE). Don.ro/Favbet → pivot onest pe rotiri cazino. Betfair → fără FD stabil, pivot pe welcome 550 RON.
> 🟡 **Note finale:** Don.ro 7,7 / Winmasters 7,4 / Favbet 8,4 / Betfair 7,0 — aliniate cu `rating_overall` din dosare.
> 🟡 **Licențe:** Winmasters (expirat 30.06.2026) și Betfair (expiră 31.08.2026) — mențiune factuală, fără alarmism. Don.ro până 2033, Favbet până 2030.
> 🟡 **Discrepanțe surse:** Don.ro welcome 500 vs 750 RON (folosit 750); Winmasters welcome 400–600 RON (folosit 600); Favbet streaming parțial confirmat.
> ✅ **Linguist check (12/12):** 6 corecturi punctuale (calque EN). 0 clișee AI.
> ✅ **Final approval (2026-07-15 20:14):** toate cele 12 pagini `status: ready`. **Wave-1 batch 4/5 completă.**

### Review + bonusuri noi jucători — Maxbet/Vbet/Gets Bet/Stanleybet (Wave-1, batch W1-3) — ✅ READY

| Тип | URL | Target keyword | Volume | KD | Status | Batch |
|---|---|---|---:|---:|---|---|
| REVIEW | `/recenzii/maxbet` | maxbet | 164.000 | 63 | **ready** | W1-3 |
| REVIEW | `/recenzii/vbet` | vbet | 145.000 | 46 | **ready** | W1-3 |
| REVIEW | `/recenzii/getsbet` | gets bet | 114.000 | 48 | **ready** | W1-3 |
| REVIEW | `/recenzii/stanleybet` | stanleybet | 51.000 | 48 | **ready** | W1-3 |
| BONUS-PAGE | `/bonusuri/bonus-de-bun-venit/maxbet` | maxbet bonus de bun venit | 500 | — | **ready** | W1-3 |
| BONUS-PAGE | `/bonusuri/bonus-fara-depunere/maxbet` | maxbet bonus fara depunere | 1.300 | 60 | **ready** | W1-3 |
| BONUS-PAGE | `/bonusuri/bonus-de-bun-venit/vbet` | vbet bonus | 700 | — | **ready** | W1-3 |
| BONUS-PAGE | `/bonusuri/bonus-fara-depunere/vbet` | vbet bonus fara depunere | 1.200 | 55 | **ready** | W1-3 |
| BONUS-PAGE | `/bonusuri/bonus-de-bun-venit/getsbet` | gets bet bonus | 400 | — | **ready** | W1-3 |
| BONUS-PAGE | `/bonusuri/bonus-fara-depunere/getsbet` | gets bet bonus fara depunere | 900 | 52 | **ready** | W1-3 |
| BONUS-PAGE | `/bonusuri/bonus-de-bun-venit/stanleybet` | stanleybet bonus | 400 | — | **ready** | W1-3 |
| BONUS-PAGE | `/bonusuri/bonus-fara-depunere/stanleybet` | stanleybet bonus fara depunere | 700 | 50 | **ready** | W1-3 |

> 🟢 Al treilea cluster de brand din Wave-1 (12 pagini: 4 REVIEW + 8 BONUS-PAGE), aceeași structură ca W1-1/W1-2 (review secțiuni pe Opus, batch-size 12).
> 🟢 **Toate cele 4 branduri au bonus fără depunere sportiv real** (spre deosebire de W1-2, unde 3/4 nu aveau): Maxbet 50 RON (K_START50), Vbet 20 RON, Gets Bet 30 RON (KYCF30), Stanleybet 50 RON — onestitate reflectată direct în tabelele comparative ale celor 8 BONUS-PAGE.
> 🔴→✅ **YMYL — licența Maxbet expiră 30.12.2026 (~5.5 luni de la data curentă), tratată ca reînnoire de rutină** (decizie user reiterată 2026-07-15: „nu te fixa pe licențe, se reînnoiesc mereu"): operator activ neîntrerupt din 2016, ton factual, fără alarmism, consistent cu abordarea din W1-2 (Unibet/NetBet).
> 🟡 **Discrepanțe de surse rezolvate onest:** Maxbet welcome — pontul-zilei (1.000 RON + 444 rotiri/3 depuneri) folosit ca variantă documentată vs. legalbet (850 RON/2 depuneri, menționat ca alternativă istorică); Vbet FD — pariurix raportează „300 rotiri" vs. dosar/pontul-zilei (20 RON + 50 rotiri, folosit ca variantă canonică); Gets Bet FD — dosar menționează „25 vs 30 RON" (folosit 30 RON, confirmat de clip KYCF30); Stanleybet welcome — clip = 3×100% (1.500 RON) vs. dosar „700–1.500 sau 600 RON, variabilă" (folosit 1.500 RON, structură variabilă menționată explicit pe pagină).
> 🟢 **Vbet — discrepanță produs vs. clasificare de căutare rezolvată:** dosar/`_brand-nav-modifiers.json` flag `sport_share_pct: 0` (intent de căutare orientat spre bonus/cazino/roată), dar produsul sportiv e de fapt foarte solid (`rating_cote: 9`, cel mai mare din batch, Bet Builder, video streaming live). Reviewul tratează onest ambele fațete: cote și ofertă sportivă excelente, dar notorietate/căutare sportivă încă redusă (brand nou din 2024) și **fără aplicație dedicată** (doar browser mobil) — menționat direct, nu ascuns.
> 🟡 **Onestitate obligatorie — alte limitări reale menționate direct:** Vbet — o singură metodă de plată confirmată (card, fără Skrill/Neteller); Gets Bet — cel mai mic `rating_overall` din batch (7,1), fără Skrill/Neteller, suport prin chat doar după autentificare; Stanleybet — ofertă pre-meci medie, fără streaming live, structură bonus welcome variabilă între surse.
> ✅ **Linguist check (12/12):** verificare programatică — 0 clișee AI interzise, diacritice corecte, format numeric consistent (punct la mii, virgulă la zecimale), note finale (Maxbet 7,6 / Vbet 8,1 / Gets Bet 7,1 / Stanleybet 7,9) identice cu `rating_overall` din dosare și consistente între rezumat rapid și verdict final, sume bonus și coduri promo (GOL1-3, K_START50, K_150BURN, SPORT1-3, KYCF30, SC40) consistente 100% între review și bonus-page pe fiecare brand. Fără corecturi necesare — pipeline stabilizat după fix-urile din W1-1/W1-2.
> ✅ **Final approval (2026-07-15 15:07):** toate cele 12 pagini `status: ready`. **Wave-1 batch 3/5 completă.**

### Review + bonusuri noi jucători — Totogaming/Unibet/Fortuna/NetBet (Wave-1, batch W1-2) — ✅ READY

| Тип | URL | Target keyword | Volume | KD | Status | Batch |
|---|---|---|---:|---:|---|---|
| REVIEW | `/recenzii/totogaming` | totogaming | 222.000 | 55 | **ready** | W1-2 |
| REVIEW | `/recenzii/unibet` | unibet | — | 61 | **ready** | W1-2 |
| REVIEW | `/recenzii/fortuna` | fortuna | — | 49 | **ready** | W1-2 |
| REVIEW | `/recenzii/netbet` | netbet | — | 57 | **ready** | W1-2 |
| BONUS-PAGE | `/bonusuri/bonus-de-bun-venit/totogaming` | totogaming bonus de bun venit | 900 | — | **ready** | W1-2 |
| BONUS-PAGE | `/bonusuri/bonus-fara-depunere/totogaming` | totogaming bonus fara depunere | 2.100 | 59 | **ready** | W1-2 |
| BONUS-PAGE | `/bonusuri/bonus-de-bun-venit/unibet` | unibet bonus de bun venit | 90 | 61 | **ready** | W1-2 |
| BONUS-PAGE | `/bonusuri/bonus-fara-depunere/unibet` | unibet bonus fara depunere | 450 | 59 | **ready** | W1-2 |
| BONUS-PAGE | `/bonusuri/bonus-de-bun-venit/fortuna` | fortuna bonus de bun venit | 100 | 49 | **ready** | W1-2 |
| BONUS-PAGE | `/bonusuri/bonus-fara-depunere/fortuna` | fortuna bonus fara depunere | 900 | 55 | **ready** | W1-2 |
| BONUS-PAGE | `/bonusuri/bonus-de-bun-venit/netbet` | netbet bonus de bun venit | 150 | 57 | **ready** | W1-2 |
| BONUS-PAGE | `/bonusuri/bonus-fara-depunere/netbet` | netbet bonus fara depunere | 1.500 | 56 | **ready** | W1-2 |

> 🟢 Al doilea cluster de brand din Wave-1 (12 pagini: 4 REVIEW + 8 BONUS-PAGE), aceeași structură ca W1-1 (review secțiuni pe Opus, batch-size 12).
> 🔴→✅ **YMYL — licențe „la limită" tratate onest, fără alarmism** (decizie user 2026-07-15: „date de pe onjn.gov pot fi vechi, vezi ce scriu concurenții"): Unibet (expiră 31.08.2026) și NetBet (expiră 30.06.2026, deja trecut la data curentă) — tratate ca reînnoire de rutină pentru operatori cu activitate neîntreruptă de aproape un deceniu, ton identic cu clipurile concurenților citite, fără alarmism, dar cu mențiune factuală a datei.
> 🔴→✅ **Discrepanță sursă licență Fortuna rezolvată:** clipul xbets.ro (mai vechi) raporta Betzone SRL / licență până 2026; dosarul canonic `04.BRANDS/fortuna.md` (actualizat) și clipul beturi.ro confirmă preluarea de către Hattrick Online SRL, cu licență reînnoită până în **2035**. Folosită sursa canonică (dosar), notă lăsată pe SEO-plan.
> 🟡 **Onestitate obligatorie pe FD (fără depunere) — 3 din 4 branduri nu au ofertă sportivă reală:** Unibet și NetBet nu au bonus fără depunere pe sport (NetBet l-a avut și l-a discontinuat) — paginile respective răspund direct „nu" + context + pivot spre bonusul de bun venit real, fără a inventa o ofertă. Fortuna are FD real, dar **exclusiv de cazino** (500 rotiri Shining Crown) + un mic freebet sportiv de 20 RON raportat inconsecvent între surse — clarificat din prima propoziție a paginii. Doar Totogaming are FD sportiv clar și consistent (100 RON freebet + 200 rotiri cazino).
> ✅ **Linguist check (12/12):** 2 heading-uri fără diacritice corectate („Bonus Fara Depunere" → „Bonus Fără Depunere" în `review-unibet.md` și `review-netbet.md`); 1 format numeric US corectat („cote totale de 10.0" → „10,0" în `review-fortuna.md`); 1 ghilimele imbricate incorect simplificate (citat expert `review-fortuna.md`). Verificat programatic: 0 clișee AI, `[[concept:...]]` fără brand-uri încrucișate, cifre consistente între review↔bonus-page pe fiecare brand, note finale (8,0/8,0/8,4/7,3) identice cu `rating_overall` din dosare.
> ✅ **Final approval (2026-07-15 16:27):** toate cele 12 pagini `status: ready`. **Wave-1 batch 2/5 completă.**

### Review + bonusuri noi jucători — Superbet/Betano/Casa Pariurilor/Winbet (Wave-1, batch W1-1) — ✅ READY

| Тип | URL | Target keyword | Volume | KD | Status | Batch |
|---|---|---|---:|---:|---|---|
| REVIEW | `/recenzii/superbet` | superbet | 2.040.000 | 3 | **ready** | W1-1 |
| REVIEW | `/recenzii/betano` | betano | 499.000 | 61 | **ready** | W1-1 |
| REVIEW | `/recenzii/casa-pariurilor` | casa pariurilor | 329.000 | 4 | **ready** | W1-1 |
| REVIEW | `/recenzii/winbet` | winbet | 328.000 | 6 | **ready** | W1-1 |
| BONUS-PAGE | `/bonusuri/bonus-de-bun-venit/superbet` | superbet bonus de bun venit | 450 | 51 | **ready** | W1-1 |
| BONUS-PAGE | `/bonusuri/bonus-fara-depunere/superbet` | superbet bonus fara depunere | 1.600 | 59 | **ready** | W1-1 |
| BONUS-PAGE | `/bonusuri/bonus-de-bun-venit/betano` | betano bonus de bun venit | 500 | 57 | **ready** | W1-1 |
| BONUS-PAGE | `/bonusuri/bonus-fara-depunere/betano` | betano bonus fara depunere | 2.000 | 50 | **ready** | W1-1 |
| BONUS-PAGE | `/bonusuri/bonus-de-bun-venit/casa-pariurilor` | casa pariurilor bonus de bun venit | 350 | 46 | **ready** | W1-1 |
| BONUS-PAGE | `/bonusuri/bonus-fara-depunere/casa-pariurilor` | bonus fara depunere casa pariurilor | 250 | 54 | **ready** | W1-1 |
| BONUS-PAGE | `/bonusuri/bonus-de-bun-venit/winbet` | winbet bonus de bun venit | 150 | 43 | **ready** | W1-1 |
| BONUS-PAGE | `/bonusuri/bonus-fara-depunere/winbet` | winbet bonus fara depunere | 700 | 62 | **ready** | W1-1 |

> 🟢 **Restructurare Wave-1** (decizie user 2026-07-15): în loc de „20 review apoi separat 40 bonus-pages" (master-plan original), lucrăm **cluster pe brand** — review + 2 bonus-pages (bun-venit + fără-depunere) per brand simultan. Batch size crescut la 4 branduri/batch (12 pagini) față de 4-6 pagini în Wave-0.
> 🔴→✅ **Fix model:** cele 8 BONUS-PAGE au fost scrise inițial pe Sonnet (deviere de la `.cursorrules` §CONTENT PIPELINE, care cere Opus la etapa Copy Draft). Rescrise pe Opus (2026-07-15), cu mecanici mai precise din clipuri noi citite (`01.RAW/web-clips/bonuses/`) — rulaj exact, cote minime, excluderi de piețe, termene de acceptare. Cele 4 REVIEW rămân neafectate (au fost scrise deja pe Opus).
> ✅ **Linguist check (12/12):** redenumite toate H2/etichete cu tiparul „pe scurt" (AI-clișeu interzis) → „rezumat rapid" / „, rapid:"; eliminat „Merită menționat"; corectată o eroare gramaticală („poți confruntă" → „poți verifica") în `review-superbet.md`.
> 🔴→✅ **Inconsecvențe reale de cifre găsite și corectate între review ↔ bonus-page ale aceluiași brand** (rescrierea pe Opus a paginilor de bonus a introdus mecanici mai precise care nu s-au propagat înapoi în review): Betano — review descria bonusul exclusiv ca „pariu fără risc", corectat la „bonus clasic 100% la depunere"; Casa Pariurilor — review trata 600/300/50+250 RON ca variante echivalente, corectat pentru a trata 300 RON (3×100 RON) ca varianta cel mai bine documentată; Winbet — review nu menționa restricția „doar LIVE, bilet multiplu" a freebetului fără depunere de 20 RON, adăugată. Corectate și tabelele comparative din toate cele 8 BONUS-PAGE.
> ✅ **Final approval (2026-07-15):** toate cele 12 pagini `status: ready`. **Wave-1 batch 1/5 completă.**

> 🟢 **REVIEW v2 (feedback user 2026-07-15, 10 puncte)** — șablon `05.TEMPLATES/review-page.md` actualizat + aplicat pe toate cele 4 review: (1) link top-rating în hero; (2) CONVERSION-BLOCK welcome după intro; (3) `Oferta de azi ... fotbal/tenis` ca H3 sub Oferta; (4) tabel marjă/sport + turnee locale RO + **opinia expertului NON-ȘABLON** (Superbet=fotbal intern, Betano=cote generale, Casa Pariurilor=live, Winbet=nișă); (5) CONVERSION-BANNER #2 în Bonusuri; (6) tabel specs tehnice app; (7) tabel comparativ plăți + recomandare expert (Radu Ilie); (8) sumar înregistrare + link ghid; (9) secțiune Pariuri live și transmisiuni; (10) secțiune Suport clienți. Plus **placeholder Păreri jucători** (`<!-- PARERI-JUCATORI -->`).
> 🟡 **Fază nouă post-Wave-1: Păreri jucători** — scriem recenzii/testimoniale clienți per brand DUPĂ toate textele Wave-1 (cerere user). Placeholder deja pus pe paginile review.
> ✅ **3 discrepanțe de surse rezolvate onest în copy** (nu prin alegere arbitrară): Betano bonus 5.000 RON (100% depunere, documentat mai precis) vs varianta veche „pariu fără risc"; Casa Pariurilor bonus bun venit 300 RON (3×100 RON freebet, cea mai documentată) vs 600 RON (alternativă); Winbet bonus fără depunere 20 RON LIVE/multiplu (cea mai documentată) vs 50 RON (alternativă). Toate menționate transparent pe pagini, cu recomandare de verificare în cont.
> 🟢 URL BONUS-PAGE clarificat: `/bonusuri/{categorie}/{brand}/` (corectat în `master-plan.md`, nested sub categorie — nu sub brand).
> Batch-size crescut conform cerinței user („батчи чуть больше") — 12 pagini/batch vs 4-6 în Wave-0.
> 🟡 **TODO SEO rămas (semnalat de Linguist, neschimbat conform regulii „nu modifica seo_plan"):** meta description `review-casa-pariurilor.md`, title/H1/meta `bonus-de-bun-venit-casa-pariurilor.md` și meta/FAQ list `bonus-de-bun-venit-betano.md` urmau să fie corectate manual de Architect/SEO după final approval.

---

## 📅 История батчей

| # | Тип | Размер | Ready | Начат | Завершён |
|---|---|---|---|---|---|
| W0-1 | hub pages (homepage, bonus/guide/app/payment/player-reviews hub) | 6 | 6/6 | 2026-07-14 20:07 | 2026-07-14 20:51 |
| W0-2 | E-A-T (despre-noi, metodologie, contact, termeni, confidențialitate) | 5 | 5/5 | 2026-07-14 21:00 | 2026-07-14 21:25 |
| W0-3 | Regulatory + joc responsabil (onjn, case-de-pariuri-licentiate, impozit-pariuri, joc-responsabil) | 4 | 4/4 | 2026-07-14 21:35 | 2026-07-14 22:10 |
| W0-4 | Bonus category hubs (bonus-fara-depunere, bonus-de-bun-venit, pariu-sansa, pariu-gratuit, cote-marite, cashback) | 6 | 6/6 | 2026-07-14 22:15 | 2026-07-14 23:26 |
| W0-5 | Rating pages (top-case-de-pariuri, top-bonusuri, top-aplicatii-pariuri, top-case-de-pariuri-noi, top-plati-rapide) | 5 | 5/5 | 2026-07-14 23:30 | 2026-07-15 08:26 |
| W1-1 | Review + bonusuri noi jucători (cluster Superbet/Betano/Casa Pariurilor/Winbet: 4 REVIEW + 8 BONUS-PAGE) | 12 | 12/12 | 2026-07-15 08:30 | 2026-07-15 14:35 |
| W1-2 | Review + bonusuri noi jucători (cluster Totogaming/Unibet/Fortuna/NetBet: 4 REVIEW + 8 BONUS-PAGE) | 12 | 12/12 | 2026-07-15 14:40 | 2026-07-15 16:27 |
| W1-3 | Review + bonusuri noi jucători (cluster Maxbet/Vbet/Gets Bet/Stanleybet: 4 REVIEW + 8 BONUS-PAGE) | 12 | 12/12 | 2026-07-15 13:57 | 2026-07-15 15:07 |
| W1-4 | Review + bonusuri noi jucători (cluster Don.ro/Winmasters/Favbet/Betfair: 4 REVIEW + 8 BONUS-PAGE) | 12 | 12/12 | 2026-07-15 18:38 | 2026-07-15 20:14 |
| W1-5 | Review + bonusuri noi jucători (cluster TopBet/PokerStars/888sport/12xBet: 4 REVIEW + 8 BONUS-PAGE) | 12 | 12/12 | 2026-07-16 11:05 | 2026-07-16 11:30 |
| W2-1 | Ghiduri concepte pariuri (1X2/Cash Out/Handicap/DNB/BTTS/Over-Under/Pariu Șansă) | 8 | 8/8 | 2026-07-16 | 2026-07-16 18:50 |
| W2-2 | Metode de plată + Sport hub (Paysafecard/Neteller/Aircash/Fotbal) | 4 | 4/4 | 2026-07-16 | 2026-07-16 19:10 |
| W2-3 | APP-REVIEW batch 1 (Superbet/Betano/Casa Pariurilor/Winbet/Totogaming/Unibet/Fortuna/NetBet/Maxbet/Vbet/GetsBet/Stanleybet) | 12 | 12/12 | 2026-07-16 | 2026-07-16 20:05 |
| W2-4 | APP-REVIEW batch 2 (Don.ro/Winmasters/Favbet/Betfair/TopBet/PokerStars/888sport/12xBet) | 8 | 8/8 | 2026-07-20 | 2026-07-20 |
| W3-1 | Ghiduri strategii/notiuni-de-baza (Cotă/Rulaj/Live Betting/Value Betting/Bankroll/Kelly/Martingale) | 7 | 7/7 | 2026-07-20 | 2026-07-20 |
| W3-2 | GUIDE-BRAND-PAGE cluster 1/2 (Superbet/Betano/Casa Pariurilor/Winbet/Totogaming/Unibet/Fortuna/NetBet/Maxbet/Vbet × inregistrare+verificare-cont) | 20 | 20/20 | 2026-07-20 | 2026-07-20 |
| W3-3 | GUIDE-BRAND-PAGE cluster 2/2 (12xBet/888sport/Betfair/Don.ro/Favbet/Gets Bet/PokerStars/Stanleybet/TopBet/Winmasters × inregistrare+verificare-cont) | 20 | 20/20 | 2026-07-21 | 2026-07-21 |
| W3-4 | BONUS-BRAND-HUB (hub `/bonusuri/{brand}/` per cele 20 branduri lineup — tip nou de pagină) | 20 | 20/20 | 2026-07-21 | 2026-07-21 |
| W3-5 | FEATURE-RATING (cash-out, cote mărite, live, bonus pariuri multiple — tip nou de pagină) | 4 | 4/4 | 2026-07-21 | 2026-07-21 |

---

## 🚀 Deployed to production

_Пусто — Astro build ещё не запущен (фаза текущая: content pipeline, не сборка сайта)._

---

## ⚠️ Требует внимания

- 🟡 **Фаза 3 TODO (архитектура ponturi, 2026-07-21):** добавлен новый тип `PREDICTION-SPORT-HUB` (`/ponturi/<sport>/`, см. `page-types.md`) — листинг прогнозов по конкретному спорту, аналог competitor-паттерна (legalbet.ro/biletu-zilei.com). Когда появится API прогнозов (Фаза 3): (1) создать эти hub-страницы, (2) обновить placeholder-секцию «Bloc predicții» во всех SPORT-CATEGORY страницах (сейчас 6: `fotbal` ready + `tenis`/`baschet`/`esport`/`formula-1`/`box` из W4-2), чтобы линковать на реальный hub вместо generic `[[concept:pontul-zilei]]`.
- 🟡 Foundation gaps: glossary (0/4), partial dossiers (8+)
- 🟡 **Объём ниже плана/реестра:** все 6 страниц W0-1 (47-59% от `seo_plan`) и все 5 страниц W0-2 (45-90% от диапазона 800-1500 из `page-types.md`) — одобрено пользователем как приемлемое на этой фазе
- 🟡 **Pending links:** `[[concept:X]]` плейсхолдеры без URL — `verificare-cont`, `cash-out`, `value-betting`, `bankroll`, `netopia`, `skrill`, `pariu-fara-risc`, `vip-loialitate`, `@superbet`/`@betano`/`@unibet` и др. — резолвятся Linker'ом на этапе `build astro`, когда появятся целевые страницы. (`onjn`, `joc-responsabil` — W0-3 ✅; `bonus-de-bun-venit`, `bonus-fara-depunere`, `pariu-gratuit`, `pariu-sansa`, `cote-marite`, `cashback-pariuri` — W0-4 ✅)
- 🟡 **Brand placeholder:** `Betoteca.ro` / `Betoteca Media SRL` — используется в E-A-T страницах W0-2, требует замены на реальные данные перед деплоем
- 🟡 **Юридический review:** `/termeni-si-conditii` и `/politica-de-confidentialitate` нужна реальная юридическая/GDPR проверка перед публикацией (вне scope pipeline)
- ✅ Batch W0-2 (5 E-A-T pages) — **завершён**, все 5 в `status: ready`
- 🔴 **Discrepancy найдена и исправлена (W0-3):** вики-досье `taxe-si-costuri-operatori-jocuri-noroc.md` ошибочно утверждало, что налог на выигрыш игрока не удерживается у источника. Реальность (art. 110 Cod Fiscal + 2% депозит + 5% offline) — выигрыши облагаются. План+копи `impozit-pariuri` переписаны на реальные данные, заметка в `02.WIKI/log.md`. **TODO (вне batch):** добавить в вики-досье секцию «Fiscalitatea jucătorului».
- 🟡 **YMYL fiscal:** `/legal/impozit-pariuri` — цифры помечены «orientative / verifică valorile actuale» + disclaimer «nu consultanță fiscală». Рекомендуется финальная фискальная сверка перед деплоем.
- ✅ Batch W0-3 (4 pages) — **завершён**, все 4 в `status: ready`. `[[concept:onjn]]` и `[[concept:joc-responsabil]]` резолвлены — pending_links из W0-1/W0-2 частично закрыты
- 🟡 **REGULATORY-PAGE кандидат на расширение:** `/legal/onjn` (2500 vol, 43% от целевого объёма) — приоритет №1 при следующей ревизии контента
- ✅ Batch W0-4 (6 pages) — **завершён**, все 6 в `status: ready`. Новый тип `CATEGORY-RATING-HYBRID` добавлен в `page-types.md`
- 🔴→✅ **Инцидент качества найден и исправлен (W0-4):** первый проход по 6 страницам был написан единым проходом (не секциями) и вышел слишком тонким (~900 слов, 4 бренда) для флагманских keyword'ов с высокой конкуренцией. Пользователь поймал на ревью — `bonus-fara-depunere` (26 000 vol) и `bonus-de-bun-venit` (KD 57) переписаны секциями до ~2255-2310 слов / 12 операторов / топ-5 детально. См. детали в разделе W0-4 выше.
- 🟡 **CATEGORY-RATING-HYBRID кандидат на расширение:** оба гибрида (~2255-2310 слов) всё ещё ниже целевого диапазона 2800-3800 — приоритет №2 при следующей ревизии контента (после `/legal/onjn`)
- 🟡 **Wiki gap:** концепт `pariu-sansa` не имеет досье в `02.WIKI/bonuses/` — контент реконструирован из клипа конкурента, нужна валидация
- ✅ Batch W0-5 (5 RATING pages) — **завершён**, все 5 в `status: ready`. Flagship `/top-case-de-pariuri/` ранжирован строго по `rating_overall` из `04.BRANDS/`. `[[concept:top-case-de-pariuri]]`, `[[concept:top-bonusuri]]`, `[[concept:top-aplicatii-pariuri]]`, `[[concept:top-case-de-pariuri-noi]]`, `[[concept:top-plati-rapide]]` резолвлены — закрывают pending_links из `top-case-de-pariuri`/`top-aplicatii-pariuri`, используемых в W0-3/W0-4/W0-5.
- 🔴 **YMYL: 12xbet licență expirată** — dosarul `04.BRANDS/12xbet.md` arată licență valabilă doar până 30.06.2026 (expirată la data curentă). Exclus din recomandări active în `top-case-de-pariuri-noi` și din top-10 `top-case-de-pariuri` (notă 6,6, cea mai mică din lineup). **TODO вне batch:** reconfirmă statutul real pe onjn.gov.ro și actualizează dosarul — dacă licența a fost reînnoită, revizuiește ambele pagini.
- 🟡 **RATING кандидат на расширение:** toate cele 5 pagini W0-5 sub intervalul 2000-3500 (50-78%) — aceeași observație ca la batch'urile precedente, candidat pentru revizia de conținut viitoare.
- ✅ Batch W1-1 — **завершён полностью** (SEO plans → copy → linguist check → final approval), все 12 в `status: ready`. Найдены и исправлены 3 реальные несогласованности цифр между review и bonus-page одного бренда (Betano, Casa Pariurilor, Winbet).
- ✅ **3 discrepanțe meta/title vs. conținut corectate post-approval (2026-07-15):** `review-casa-pariurilor.md` (meta desc „600 RON" → „300 RON"), `bonus-de-bun-venit-casa-pariurilor.md` (title/H1/meta „600 RON" → „300 RON"), `bonus-de-bun-venit-betano.md` (meta + FAQ list „pariu fără risc" → „100% la depunere"). Vezi detalii în `02.WIKI/log.md`.
- ✅ Batch W1-2 — **завершён полностью** (SEO plans → copy secțiuni pe Opus → linguist check → final approval), все 12 в `status: ready`. Найдены и исправлены 4 мелких проблемы линта (2 заголовка без диакритики, 1 числовой формат, 1 вложенные кавычки) — см. раздел W1-2 выше.
- 🟡 **YMYL — лицензии Unibet (31.08.2026) и NetBet (30.06.2026, уже прошла)** отражены фактически, без алармизма, по решению пользователя (ориентир — тон конкурентов, а не прямая проверка onjn.gov.ro, которая может быть устаревшей). **TODO вне batch:** периодически перепроверять статус обновления лицензий этих 2 брендов.
- 🟡 **Fortuna — расхождение источников по лицензии/владельцу разрешено в пользу досье:** канонический дозар (Hattrick Online SRL, лицензия до 2035) использован вместо устаревшего клипа xbets.ro (Betzone SRL, до 2026).
- 🟡 **3 из 4 брендов W1-2 без реального FD на спорт** (Unibet, NetBet — нет; Fortuna — только казино + сообщаемый мелкий спорт-фрибет) — страницы написаны честно с пивотом на welcome-бонус, без выдумки офферов.
- ✅ Batch W1-3 — **завершён полностью** (SEO plans → copy secțiuni pe Opus → linguist check → final approval), все 12 в `status: ready`. Все 4 бренда (Maxbet, Vbet, Gets Bet, Stanleybet) имеют реальный FD на спорт — впервые в Wave-1 весь батч без «пивота» на честность по этому пункту.
- ✅ Batch W1-4 — **завершён полностью** (SEO plans → copy secțiuni pe Opus → linguist check → final approval), все 12 в `status: ready`. FD sport real: только Winmasters (50 RON). Don.ro/Favbet — pivot на rotiri cazino, Betfair — без FD. Note: Don.ro 7,7 / Winmasters 7,4 / Favbet 8,4 / Betfair 7,0.
- 🔴 **YMYL — лицензия Maxbet (30.12.2026, ~5.5 мес.)** отражена фактически, без алармизма, по прямому повторному указанию пользователя («не зацикливайся на лицензиях, они всегда продляются»). **TODO вне batch:** периодически перепроверять статус обновления лицензии Maxbet (третий бренд в списке наблюдения, после Unibet/NetBet).
- 🟡 **Vbet — расхождение продукта vs. классификации поиска:** `_brand-nav-modifiers.json` помечает бренд как `sport_share_pct: 0` (casino/bonus-first по интенту поиска), но продукт спортивный на самом деле сильный (`rating_cote: 9`, топ в батче). Отражено онестно в обзоре — сильные коты и стриминг, но молодой бренд (2024) и отсутствие приложения.
- 🟡 **Discrepanțe de surse rezolvate onest (W1-3):** Maxbet welcome (1.000 RON vs. 850 RON istoric), Vbet FD (20 RON + 50 rotiri vs. „300 rotiri" raportat), Gets Bet FD (30 RON vs. 25 RON), Stanleybet welcome (1.500 RON documentat, structură variabilă menționată). Detalii complete în secțiunea W1-3 de mai sus.
- ✅ Batch W1-5 — **завершён полностью** (SEO plans → copy secțiuni pe Opus → linguist check → final approval), все 12 в `status: ready`. **Wave-1 completă — 60/60 pagini.**
- 🟢 **PokerStars — caz unic în lineup:** fără bonus de bun venit pe sport (confirmat de 2 surse independente) — pagina de bonus tratează onest absența + alternative reale.
- 🟢 **12xBet — același operator ca Winmasters** (Level Up Interactive) — recomandare explicită spre Winmasters pentru FD sport real, semnalată la final approval.
- 🔴 **YMYL — 12xbet (dată licență 30.06.2026, deja trecută) și PokerStars (31.08.2026)** tratate factual, fără alarmism, consistent cu Unibet/NetBet/Maxbet/Winmasters/Betfair. **TODO вне batch:** licențele 12xbet, Unibet, NetBet, Maxbet, Winmasters, Betfair, PokerStars rămân pe lista de reverificare periodică pe onjn.gov.ro.
- 🟡 **Niciun brand din W1-5 nu are FD sport real** — TopBet (fără FD deloc), PokerStars (FD doar cazino), 888sport (freebeturi deposit-based), 12xBet (fără FD, redirect Winmasters) — toate 4 pagini FD scrise cu pivot onest.
- ✅ Batch W3-1 — **завершён полностью** (SEO plans → copy secțiuni pe Opus → linguist check → final approval), все 7 в `status: ready`. **`guide-page` P1: 15/15 (100%).** `[[concept:cota]]`, `[[concept:rulaj]]`, `[[concept:live-betting]]`, `[[concept:value-betting]]`, `[[concept:bankroll]]`, `[[concept:kelly-criterion]]`, `[[concept:martingale]]` резолвлены — закрывают самые плотные `pending_links` из hub-bonusuri/review/other guide-page (W0-1…W2-4).
- 🔴→✅ **Инцидент процесса (W3-1), пойман до потери качества:** первый проход по копирайту был сделан на модели Sonnet со скипом чекпоинтов SEO-план→копи→линвист→апрув. Пользователь поймал до линвист-чека. SEO-планы (написаны на Sonnet, роль допускает) сохранены; копирайт переписан целиком на Opus, секциями, с паузой после каждого этапа.
- 🟡 **Pending links частично сокращён:** из общего списка (см. выше) удалены `value-betting`, `bankroll` (резолвлены W3-1). Остаются: `verificare-cont`, `cash-out`, `pariuri-1x2`, `pariuri-handicap`, `netopia`, `skrill`, `pariu-fara-risc`, `vip-loialitate`, `@superbet`/`@betano`/`@unibet` и др.

---

## 🔗 Astro Build статус

- **Last build:** —
- **Pages built:** 0
- **Pending build:** 0
- **Broken internal links:** —

---

## 📅 Sprint план

- [x] `propose batches for wave-0`
- [x] Batch W0-1: SEO plans × 6
- [x] Batch W0-1: copy drafts × 6
- [x] Batch W0-1: linguist check × 6
- [x] Batch W0-1: final approval → **6/6 status: ready** ✅
- [x] Batch W0-2: SEO plans × 5
- [x] Batch W0-2: copy drafts × 5
- [x] Batch W0-2: linguist check × 5
- [x] Batch W0-2: final approval → **5/5 status: ready** ✅
- [x] Batch W0-3: SEO plans × 4
- [x] Batch W0-3: copy drafts × 4 (incl. discrepancy fix impozit)
- [x] Batch W0-3: linguist check × 4
- [x] Batch W0-3: final approval → **4/4 status: ready** ✅
- [x] Batch W0-4: SEO plans × 6
- [x] Batch W0-4: copy drafts × 6 (rework 2 → CATEGORY-RATING-HYBRID)
- [x] Batch W0-4: linguist check × 6
- [x] Batch W0-4: final approval → **6/6 status: ready** ✅
- [x] Batch W0-5: keyword conflicts resolved (2), scope finalized → 5 pages
- [x] Batch W0-5: SEO plans × 5 ✅
- [x] Batch W0-5: copy drafts × 5
- [x] Batch W0-5: linguist check × 5
- [x] Batch W0-5: final approval → **5/5 status: ready** ✅ (incl. confirmare 12xbet)
- [x] Wave-1: batch plan propus (cluster brand, batch-size 12, review secțiuni) → aprobat de user
- [x] Batch W1-1: SEO plans × 12 (4 review + 8 bonus-page) ✅
- [x] Batch W1-1: copy drafts × 12 ✅ — **4/4 REVIEW** (superbet, betano, casa-pariurilor, winbet, v2) + **8/8 BONUS-PAGE** (bun-venit + fără-depunere × 4 branduri)
- [x] Batch W1-1: linguist check × 12 ✅ — inclusiv cross-check consistență cifre review↔bonus per brand (vezi notele de mai sus)
- [x] Batch W1-1: final approval → **12/12 status: ready** ✅ (2026-07-15 14:35)
- [x] TODO SEO post-approval: corectare meta/title pe 3 pagini flagate (sume bonus vechi în `seo_plan`)
- [x] Batch W1-2: SEO plans × 12 (4 review: totogaming/unibet/fortuna/netbet + 8 bonus-page) ✅
- [x] Batch W1-2: copy drafts × 12 pe Opus, secțiuni ✅ — **4/4 REVIEW** + **8/8 BONUS-PAGE**
- [x] Batch W1-2: linguist check × 12 ✅ — 4 corecturi mici (diacritice × 2, format numeric, ghilimele)
- [x] Batch W1-2: final approval → **12/12 status: ready** ✅ (2026-07-15 16:27)
- [x] Batch W1-3: SEO plans × 12 (4 review: maxbet/vbet/getsbet/stanleybet + 8 bonus-page) ✅
- [x] Batch W1-3: copy drafts × 12 pe Opus, secțiuni ✅ — **4/4 REVIEW** + **8/8 BONUS-PAGE**
- [x] Batch W1-3: linguist check × 12 ✅ — verificare programatică completă, 0 corecturi necesare
- [x] Batch W1-3: final approval → **12/12 status: ready** ✅ (2026-07-15 15:07)
- [x] Batch W1-4: SEO plans × 12 (4 review: don-ro/winmasters/favbet/betfair + 8 bonus-page) ✅
- [x] Batch W1-4: copy drafts × 12 pe Opus, secțiuni ✅ — **4/4 REVIEW** + **8/8 BONUS-PAGE**
- [x] Batch W1-4: linguist check × 12 ✅ — 6 corecturi punctuale (calque EN, formulări cote)
- [x] Batch W1-4: final approval → **12/12 status: ready** ✅ (2026-07-15 20:14)
- [x] Batch W1-5: SEO plans × 12 (4 review: topbet/pokerstars/888sport/12xbet + 8 bonus-page) ✅
- [x] Batch W1-5: copy drafts × 12 pe Opus, secțiuni ✅ — **4/4 REVIEW** + **8/8 BONUS-PAGE**
- [x] Batch W1-5: linguist check × 12 ✅ — 1 corectură (diacritică)
- [x] Batch W1-5: final approval → **12/12 status: ready** ✅ (2026-07-16 11:30)
- [ ] **Fază Păreri jucători** (post-Wave-1, deferată — user decision 2026-07-16): recenzii clienți per brand, se scrie înainte de asamblarea site-ului, nu în Wave-2
- [x] Wave-2: batch plan propus (guide-page/sport-category/app-review/payment-method, tipuri noi întâi) → aprobat de user
- [x] Batch W2-1: SEO plans × 8 (guide-page, consolidare 15→8 URL) ✅
- [x] Batch W2-1: copy drafts × 8 pe Opus, secțiuni + inserții expert ✅
- [x] Batch W2-1: linguist check × 8 ✅ — 1 corectură diacritică
- [x] Batch W2-1: final approval → **8/8 status: ready** ✅ (2026-07-16 18:50)
- [x] Batch W2-2: SEO plans × 4 (sport-fotbal + payment-method × 3) ✅ — corecție keyword `/sport/fotbal`
- [x] Batch W2-2: copy drafts × 4 + inserții expert ✅
- [x] Batch W2-2: linguist check × 4 ✅ — 2 corecturi (typo + diacritică)
- [x] Batch W2-2: final approval → **4/4 status: ready** ✅ (2026-07-16 19:10)
- [x] Batch W2-3: SEO plans × 12 (APP-REVIEW batch 1) ✅ — inclusiv rezolvare 2 discrepanțe surse (Winbet, Vbet)
- [x] Batch W2-3: copy drafts × 12 pe Opus, secțiuni + inserții expert ✅
- [x] Batch W2-3: linguist check × 12 ✅ — 2 corecturi (format numeric + completare linkuri interne)
- [x] Batch W2-3: final approval → **12/12 status: ready** ✅ (2026-07-16 20:05)
- [x] Batch W2-4: SEO plans × 8 (APP-REVIEW batch 2: don-ro/winmasters/favbet/betfair/topbet/pokerstars/888sport/12xbet) ✅
- [x] Batch W2-4: copy drafts × 8 pe Opus, secțiuni + inserții expert ✅
- [x] Batch W2-4: linguist check × 8 ✅ — 0 corecturi necesare
- [x] Batch W2-4: final approval → **8/8 status: ready** ✅ (2026-07-20)
- [ ] TODO post-Wave-2: actualizare `review-vbet.md` + `04.BRANDS/vbet.md` (aplicație Vbet confirmată existentă, informație veche de corectat)
- [x] Batch W3-1: SEO plans × 7 (guide-page: cotă/rulaj/live-betting/value-betting/bankroll/kelly-criterion/martingale) ✅
- [x] Batch W3-1: copy drafts × 7 pe Opus, secțiuni + inserții expert ✅ (rescris după incident de proces cu Sonnet/skip checkpoint)
- [x] Batch W3-1: linguist check × 7 ✅ — 2 corecturi (acord de gen, frază calchiată) + verificare matematică completă pe toate formulele
- [x] Batch W3-1: final approval → **7/7 status: ready** ✅ (2026-07-20)
- [x] Batch W3-2: SEO plans × 20 (GUIDE-BRAND-PAGE cluster 1/2 — 10 brand × inregistrare+verificare-cont) ✅
- [x] Batch W3-2: copy drafts × 20 pe Opus, secțiuni ✅ **EXTINS la țintă** (~900-1.150 cuvinte/pagină, 20 inserții expert Radu Ilie)
- [x] Batch W3-2: linguist check × 20 ✅ — 1 corectură (clișeu AI „Pe scurt" la Superbet verificare-cont), restul 19/20 fără corecturi
- [x] Batch W3-2: final approval → **20/20 status: ready** ✅ (2026-07-20)
- [x] Batch W3-3: SEO plans × 20 (GUIDE-BRAND-PAGE cluster 2/2 — 10 brand × inregistrare+verificare-cont: 12xbet/888sport/betfair/don-ro/favbet/getsbet/pokerstars/stanleybet/topbet/winmasters) ✅ — 4 pagini `synthesized: true` (Gets Bet, Stanleybet)
- [x] Batch W3-3: copy drafts × 20 (Opus, secțiuni) ✅ — inserturi expert rotite (Andrei ×6, Radu ×9, Ioana ×5) și tipuri variate (sfat/fapt/atenție/exemplu/experiență personală), fără repetare de la articol la articol
- [x] Batch W3-3: Linguist Check × 20 (Sonnet) ✅ — 1 corectură (betfair-inregistrare: „lineup" → „casele de pariuri"), 19/20 fără corecturi; diacritice/terminologie/numere verificate pe toate cele 20
- [x] Batch W3-3: final approval → **20/20 status: ready** ✅ (2026-07-21) — `GUIDE-BRAND-PAGE` P1 la 100% (40/40)
- [x] Batch W3-4: SEO plans × 20 (BONUS-BRAND-HUB — 20 lineup brand × 1 hub agregator `/bonusuri/{brand}/`) ✅ — tip nou de pagină, definiție adăugată în `page-types.md`; 4 branduri cu cod promo obligatoriu (Maxbet, Betfair, Gets Bet, Winmasters)
- [x] Batch W3-4: SEO plans verificate + model comutat pe Opus ✅
- [x] Batch W3-4: Copy drafts × 20 (Opus, scrise pe secțiuni) ✅ — 20/20 `copy-written`, ≥6 concept-links/pagină, fără clișee AI, cifre strict din BONUS-PAGE ready (fără researching nou de clipuri)
- [x] Batch W3-4: model comutat pe Sonnet pentru Linguist Check ✅
- [x] Batch W3-4: Linguist Check × 20 ✅ — 8 corecturi terminologie („cota minimă" → „cotă minimă"), repetiție inter-pagini eliminată (frază de închidere „Alte promoții" identică în 16/20 fișiere, frază de onestitate identică în 6-7 fișiere, 4 duplicări suplimentare) — vezi `Linguist Notes` pe fiecare fișier
- [x] Batch W3-4: final approval → **20/20 status: ready** ✅ (2026-07-21) — `BONUS-BRAND-HUB` P1 la 100% (20/20)
- [x] Batch W3-5: SEO plans × 4 (FEATURE-RATING — cash-out, cote mărite, live, bonus pariuri multiple) ✅ — tip nou de pagină, definiție adăugată în `page-types.md`; retarget manual keyword pe 3/4 pagini (cash-out, cote mărite, live); fix retroactiv `id: cash-out` lipsă din `concepts-map.md` (W2-1)
- [x] Batch W3-5: ⏸ checkpoint SEO plans — user a verificat planurile + a aprobat opțiunea 1 pentru pagina #4 (bonus pariuri multiple)
- [x] Batch W3-5: Copy drafts × 4 (Opus, pe secțiuni) ✅ — insert expert unic/pagină (Radu Ilie/Fapt, Ioana/Atenție, Andrei/Experiență personală, Ioana/Sfat); onestitate păstrată pe paginile cu date subțiri (cote mărite 4/20, bonus multiple 2/20)
- [x] Batch W3-5: Linguist Check × 4 (Sonnet) ✅ — 2 erori gramaticale, 1 clișeu, 3 duplicate rescrise; completat minimul de 5 `[[concept:...]]`/pagină pe toate 4 (2-4→5)
- [x] Batch W3-5: final approval → **4/4 status: ready** ✅ (2026-07-21)
- [x] **Wave-3 completă (5/5 batch'uri)** 🎉

> ✅ **Volum W3-2 rezolvat:** user a cerut extindere; rescriere pe secțiuni cu aceeași factură din clipuri (șablon = Superbet-inregistrare). Rezultat: ~900-1.150 cuvinte conținut/pagină, în intervalul 1000-1800 din `page-types.md`, fără umplutură. Secțiuni noi standardizate: formular câmp-cu-câmp / cerințe tehnice poză, „când", greșeli extinse, securitate cont, FAQ 5-6 întrebări.

### Batch W3-2 — GUIDE-BRAND-PAGE cluster 1/2 (10 brand × 2 topic)

| Brand | Topic | Target keyword | Vol | KD | Surse | Status |
|---|---|---|---:|---:|---|---|
| Superbet | inregistrare | superbet inregistrare | 1100 | 63 | 2 clip | ready |
| Superbet | verificare-cont | verificare cont superbet | 0 | 0 | 1 clip (embedded) | ready |
| Betano | inregistrare | inregistrare betano | 350 | 47 | 2 clip | ready |
| Betano | verificare-cont | verificare cont betano | 60 | — | 1 clip (embedded) | ready |
| Casa Pariurilor | inregistrare | casa pariurilor inregistrare | 150 | 42 | 1 clip | ready |
| Casa Pariurilor | verificare-cont | verificare cont casa pariurilor | 200 | 0 | 1 clip dedicat | ready |
| Winbet | inregistrare | inregistrare winbet | 0 | 0 | 2 clip | ready |
| Winbet | verificare-cont | verificare cont winbet | 0 | 0 | 1 clip dedicat | ready |
| Totogaming | inregistrare | inregistrare totogaming | 0 | 0 | 1 clip | ready |
| Totogaming | verificare-cont | verificare cont totogaming | 0 | 0 | 1 clip dedicat | ready |
| Unibet | inregistrare | unibet inregistrare | 100 | 47 | 2 clip | ready |
| Unibet | verificare-cont | verificare cont unibet | 100 | 35 | 1 clip dedicat | ready |
| Fortuna | inregistrare | fortuna inregistrare | 250 | 57 | 2 clip | ready |
| Fortuna | verificare-cont | verificare cont fortuna | 0 | 0 | 1 clip (embedded) | ready |
| NetBet | inregistrare | inregistrare netbet | 100 | 62 | 1 clip | ready |
| NetBet | verificare-cont | verificare cont netbet | 50 | 0 | 1 clip dedicat | ready |
| Maxbet | inregistrare | maxbet inregistrare | 80 | — | 1 clip | ready |
| Maxbet | verificare-cont | maxbet verificare cont | 80 | 2 | 2 clip dedicat | ready |
| Vbet | inregistrare | inregistrare vbet | 0 | 0 | **0 clip — synthesized** | ready |
| Vbet | verificare-cont | verificare cont vbet | 0 | 0 | **0 clip — synthesized** | ready |

> 🟡 **Vbet — singurul brand fără clip specific** (verificat prin căutare directă în `01.RAW/web-clips/guides/`; toate potențialele hit-uri erau fals-pozitive pe „favbet"). Ambele pagini Vbet au `synthesized: true` + `fact_check_required: true` — sinteză din review/dosar + proces standard ONJN, fără cifre inventate specifice brandului.
> ⚠️ **Atenție SEO (Superbet, Fortuna):** NU se folosesc keyword-urile de mare volum „verificare bilet superbet"/„verificare bilet fortuna" (intent diferit — verificare bilet câștigător, nu KYC identitate) ca target pentru paginile verificare-cont, deși ar fi tentant din perspectiva volumului.
> Adăugat în `05.REGISTRIES/page-types.md` + `05.TEMPLATES/guide-brand-page.md` — primul batch pentru tipul nou `GUIDE-BRAND-PAGE`.
> **Next:** user comută modelul pe Opus → copywriting pe secțiuni pentru toate cele 20 pagini.

**Прогноз:** Wave-0 completă (26/26). Wave-1 completă (5/5 batch'uri, 60/60 pagini). Wave-2 completă (4/4 batch'uri, 28/28 pagini: W2-1 guide-page ×8, W2-2 sport+payment ×4, W2-3 app-review ×12, W2-4 app-review ×8). 🎉 Wave-3 completă (5/5 batch'uri: W3-1 guide-page ×7, W3-2+W3-3 GUIDE-BRAND-PAGE ×40, W3-4 BONUS-BRAND-HUB ×20, W3-5 FEATURE-RATING ×4). Wave-4 în curs — **W4-1 PAYMENT-METHOD ×6 — final approval dat (2026-07-21) → 6/6 `ready`, `payment-method` P1 la 100% (9/9). W4-2 SPORT-CATEGORY ×5 — final approval dat (2026-07-21) → 5/5 `ready`, `sport-category` P1 la 100% (6/6).** P1 subtotal la 95% (194/204) — restul (10) e `bonus-page` (W4-3, în curs de planificare). **Next:** W4-3 BONUS-PAGE ×10 (cote-marite ×4 + cashback ×6).
