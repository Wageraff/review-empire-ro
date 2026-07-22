# Page Types Registry

> Канонический реестр типов страниц сайта.
> Читать **по задаче** (batch / write page), не always-on.
> Шаблоны секций: `05.TEMPLATES/*.md`. Workflows: `05.REGISTRIES/workflows.md`.

См. также: `05.TEMPLATES/*.md` для шаблонов секций.

| Тип | URL pattern | Draft path | Template | Слова |
|-----|-------------|------------|----------|------:|
| REVIEW | `/recenzii/<brand>` | `drafts/<brand>.md` | `review-page.md` | 3000-5000 |
| BONUS-PAGE | `/bonusuri/<cat>/<brand>` | `drafts/bonus-<cat>-<brand>.md` | `bonus-page.md` | 1500-2500 |
| BONUS-CATEGORY-HUB | `/bonusuri/<cat>` | `drafts/hub-<cat>.md` | `category-hub.md` | 1200-2000 |
| BONUS-BRAND-HUB | `/bonusuri/<brand>` | `drafts/hub-bonusuri-<brand>.md` | — | 900-1400 |
| CATEGORY-RATING-HYBRID | `/bonusuri/<cat>` (flagship) | `drafts/hub-<cat>.md` | `category-hub.md` + `rating-page.md` | 2800-3800 |
| RATING | `/top-<criteriu>` | `drafts/rating-<slug>.md` | `rating-page.md` | 2000-3500 |
| FEATURE-RATING | `/top-case-de-pariuri-<feature>` | `drafts/rating-<feature>.md` | — | 1600-2200 |
| APP-REVIEW | `/aplicatii/<brand>` | `drafts/app-<brand>.md` | `app-page.md` | 1500-2500 |
| APP-HUB | `/aplicatii/` | `drafts/hub-aplicatii.md` | `category-hub.md` | 1200-2000 |
| PAYMENT-METHOD | `/metode-de-plata/<method>` | `drafts/payment-<method>.md` | — | 1200-2000 |
| GUIDE-PAGE | `/ghiduri/<cat>/<slug>` | `drafts/guide-<slug>.md` | `guide-page.md` | 1500-3000 |
| GUIDE-BRAND-PAGE | `/ghiduri/brand/<brand>/<topic>` | `drafts/guide-brand-<brand>-<topic>.md` | `guide-brand-page.md` | 1000-1800 |
| SPORT-CATEGORY | `/sport/<sport>` | `drafts/sport-<sport>.md` | `sport-category.md` | 2000-3500 |
| COMPARISON | `/vs/<a>-vs-<b>` | `drafts/vs-<a>-<b>.md` | — | 2000-3000 |
| REGULATORY-PAGE | `/legal/<slug>` | `drafts/legal-<slug>.md` | — | 1500-2500 |
| E-A-T | `/despre-noi`, `/metodologie`, … | `drafts/eat-<slug>.md` | — | 800-1500 |
| HOMEPAGE | `/` | `drafts/homepage.md` | — | 1500-2500 |
| DAILY-DIGEST | `/ponturi/pontul-zilei` | — | — | Фаза 3 |
| PREDICTION | `/ponturi/<sport>/<match>` | — | — | Фаза 3 |
| PREDICTION-SPORT-HUB | `/ponturi/<sport>/` | — | — | Фаза 3 |

## Specs pe tip (clasice)

### REVIEW
- URL: `/recenzii/<brand-slug>`
- Файл: `07.SITES/<site>/src/content/reviews/<slug>.md` (draft: `drafts/review-<slug>.md`)
- Шаблон: `05.TEMPLATES/review-page.md`
- Длина: 3000–5000 слов
- Секции: hero, quick-rating, licenta ONJN, bonus, sport disponibil, aplicatie mobila, plati, suport, avantaje-dezavantaje, concluzie, FAQ
- Schema.org: Review + Organization
- Cross-links: 5–8 (другие reviews, bonus-pages этого бренда, гайды)
- Источник: `04.BRANDS/<slug>.md` + wiki + клипы

### BONUS-PAGE
- URL: `/bonusuri/<categorie>/<brand-slug>` (ex. `/bonusuri/bonus-de-bun-venit/superbet`)
- Шаблон: `05.TEMPLATES/bonus-page.md`
- Длина: 1500–2500 слов
- Секции: bonus details (suma, cod, rulaj), cum activezi step-by-step, termeni cheie, avantaje-dezavantaje, comparație cu 2–3 alte, FAQ
- Schema.org: Offer + Product
- Cross-links: обязательный на review этого бренда

### BONUS-CATEGORY-HUB
- URL: `/bonusuri/<categorie>`
- Шаблон: `05.TEMPLATES/category-hub.md`
- Длина: 1200–2000 слов
- Секции: определение, comparativ table, cum să alegi, top-3, termeni

### RATING
- URL: `/top-<criteriu>`
- Шаблон: `05.TEMPLATES/rating-page.md`
- Длина: 2000–3500 слов
- Секции: методология, TOP-N, детальный обзор каждого места, критерии, FAQ
- Schema.org: ItemList + Review
- Обновление: каждые 2–3 месяца (`updated` в frontmatter)

### APP-REVIEW
- URL: `/aplicatii/<brand-slug>`
- Шаблон: `05.TEMPLATES/app-page.md`
- Длина: 1500–2500 слов
- Секции: iOS/Android, установка, функции, live-betting, screenshots, безопасность, плюсы-минусы, FAQ
- Schema.org: SoftwareApplication
- Cross-links: review бренда + сравнения apps

### APP-HUB
- URL: `/aplicatii/`
- Список всех APP-REVIEW + сравнительная таблица + гайд по установке

### PAYMENT-METHOD
- URL: `/metode-de-plata/<method-slug>`
- Длина: 1200–2000 слов
- Секции: описание, как работает, комиссии, скорость, безопасность, таблица брендов, step-by-step депозит/вывод, лимиты, FAQ
- Schema.org: HowTo + FinancialProduct

### GUIDE-PAGE
- URL: `/ghiduri/<categorie>/<slug>`
- Шаблон: `05.TEMPLATES/guide-page.md`
- Длина: 1500–3000 слов
- Секции: introducere, разделы, exemple practice (с числами!), erori comune, FAQ, related guides
- Schema.org: HowTo или Article
- ВАЖНО: гайды НЕ рекламируют конкретных букмекеров
- Категории: notiuni-de-baza, strategii, gestionarea-banilor, psihologie, dictionar-de-pariuri

### SPORT-CATEGORY
- URL: `/sport/<sport>`
- Шаблон: `05.TEMPLATES/sport-category.md`
- Длина: 2000–3500 слов
- Секции: intro, tipuri de pariuri, top-5 case, strategii, bonusuri, ghid începători, bloc predicții (placeholder → PREDICTION-SPORT-HUB в Фазе 3), FAQ

### PREDICTION
- URL: `/ponturi/<sport>/<match-slug>`
- ФАЗА 1: заглушки. ФАЗА 3: API.
- Schema.org: SportsEvent
- Родительский хаб: PREDICTION-SPORT-HUB — каждый PREDICTION линкуется из хаба своего спорта

### DAILY-DIGEST
- URL: `/ponturi/pontul-zilei`, `/ponturi/biletul-zilei`
- ФАЗА 1: каркас. ФАЗА 3: ежедневно через API
- Digest = cross-sport; PREDICTION-SPORT-HUB = listing per sport

### COMPARISON
- URL: `/vs/<brand-a>-vs-<brand-b>`
- Длина: 2000–3000 слов
- Сравнительная таблица + анализ по 10 критериям

### E-A-T PAGES
- `/despre-noi`, `/metodologie`, `/joc-responsabil`, `/termeni-si-conditii`, `/politica-de-confidentialitate`, `/contact`
- 800–1500 слов каждая; живой тон, имена авторов

## proposed: true

Новые типы добавляются Architect'ом с флагом `proposed: true` до одобрения.

## CATEGORY-RATING-HYBRID (гибрид hub + rating)

Для **флагманских bonus-category keyword'ов** с высоким объёмом поиска (ориентир: volume ≥ 5000),
где конкуренты дают полноценный листикл 3000-4000 слов, а не обычный hub.

**Отличия от BONUS-CATEGORY-HUB:**
- Объём 2800-3800 слов (вместо 1200-2000).
- Обязательный `rating-widget`: сравнительная таблица **10-14 операторов** с реальными данными
  (сумма, cotă minimă, rulaj, termen) из клипов/досье.
- Секция **топ-5 детально**: мини-обзор каждого (2-4 предложения + pro/contra), не только строка в таблице.
- Секции по образцу конкурента: Ce este → Tipuri → Pro/Contra → Tabel comparativ →
  Top-5 detaliat → Cum obții → Cum alegi → Termeni → Joc responsabil → FAQ (8-9).
- Schema.org: `CollectionPage` + `ItemList` (агрегат рейтинга).

**Применён к:** `/bonusuri/bonus-fara-depunere/` (26 000 vol), `/bonusuri/bonus-de-bun-venit/` (KD 57).

Обновлено: 2026-07-14 (W0-4: добавлен CATEGORY-RATING-HYBRID)

## GUIDE-BRAND-PAGE (ghid KYC per brand)

Pentru procesele operaționale per-brand din `/ghiduri/brand/{brand}/{topic}` — `topic` ∈ {`inregistrare`, `verificare-cont`} pentru P1 (depunere/retragere = P2/P3).

- Volum 1000-1800 cuvinte — pași concreți, nu umplutură (competitorii au 1200-1700 cuvinte/topic).
- Schema.org: `HowTo` (proces pas-cu-pas, numerotat).
- **Regulă:** spre diferență de GUIDE-PAGE (concepte generale), aici brandul apare explicit (e subiectul paginii), dar tratamentul rămâne factual, nu promoțional — fără CONVERSION-BLOCK/BANNER, fără limbaj de tip „cel mai bun bonus".
- Secțiuni: Intro → Ce ai nevoie/Documente → Pași (numerotați, HowTo) → Termen de procesare → Ce se întâmplă dacă nu respecți termenul/greșeli frecvente → FAQ → Related (review + bonus-page + app-review ale brandului).
- Surse: clip specific brand (dacă există) + `review-<brand>.md`/`04.BRANDS/<brand>.md` pentru sinteză când clipul lipsește (flag `synthesized: true` în frontmatter).

Adăugat: 2026-07-20 (W3-2: primul batch GUIDE-BRAND-PAGE)

## BONUS-BRAND-HUB (agregator de oferte per brand)

Pentru `/bonusuri/{brand}/` — pagină care agregă **toate ofertele de bonus ale unui brand** (spre diferență de BONUS-CATEGORY-HUB, care agregă un brand per categorie). Țintește keyword-uri navigaționale/comerciale de tip „cod bonus {brand}" / „bonus {brand}".

- Volum 900-1400 cuvinte — agregator, nu articol de profunzime (brandurile P1 au doar 2 oferte scrise: bun-venit + fără-depunere; nu inventăm oferte suplimentare).
- Schema.org: `CollectionPage` + `ItemList` (2 oferte ca items).
- **Regulă:** răspunde onest la intenția „cod bonus" — majoritatea ofertelor lineup NU necesită cod (activare automată la depunere), câteva da (ex. Winmasters SPORT600, Maxbet K_START50, Get's Bet SPORT1/2/3) — verifică fiecare caz în sursă, nu presupune.
- Secțiuni: Intro (ce bonusuri oferă brandul) → Tabel comparativ (cele 2 oferte) → Bonus de bun venit (mini + link spre BONUS-PAGE completă) → Bonus fără depunere (mini + link) → Ai nevoie de cod bonus? → Cum revendici (pași generali) → Termeni comuni → Alte promoții (disclaimer scurt, fără cifre inventate, link spre review pentru actualizări) → FAQ (5-6).
- Surse: `04.BRANDS/<brand>.md`, `drafts/bonus-de-bun-venit-<brand>.md` (ready), `drafts/bonus-fara-depunere-<brand>.md` (ready), `drafts/review-<brand>.md` (ready) — **fără researching nou de clipuri**, sinteză din pagini deja aprobate.
- Cross-link obligatoriu: → review brand, → ambele BONUS-PAGE ale brandului, → `[[concept:bonus-de-bun-venit]]`/`[[concept:bonus-fara-depunere]]` (hub-uri categorie).

Adăugat: 2026-07-21 (W3-4: primul batch BONUS-BRAND-HUB)

## FEATURE-RATING (top operatori pe o singură funcție)

Pentru `/top-case-de-pariuri-{feature}/` — clasament **îngust, pe o singură funcție/caracteristică** (cash-out, cote mărite, pariuri live, bonus pariuri multiple), spre diferență de RATING (clasament general) sau BONUS-CATEGORY-HUB (categorie de bonus explicată generic).

- Volum 1600-2200 cuvinte — mai restrâns decât RATING (2000-3500), pentru că nu reface explicația generică dacă există deja o pagină dedicată (GUIDE-PAGE sau BONUS-CATEGORY-HUB) pentru concept — doar linkuim și comparăm operatorii.
- Schema.org: `CollectionPage` + `ItemList`.
- **Regulă de-duplicare obligatorie:** înainte de a scrie, verifică `concepts-map.md` dacă feature-ul are deja o pagină definițională (`GUIDE-PAGE`/`BONUS-CATEGORY-HUB`). Dacă da → secțiune intro scurtă + link, fără re-explicare. Dacă nu (ex. „bonus pariuri multiple" nu are încă GUIDE-PAGE dedicat pe site) → include o secțiune definițională sintetizată din `02.WIKI/guides-concepts/*.md`, hibrid similar cu `CATEGORY-RATING-HYBRID`.
- **Regulă keyword:** target_keyword din `_audit-stage5-final.json` poate fi contaminat (brand în keyword, ex. „superbet pariuri live") sau duplicat cu o pagină definițională deja existentă (ex. „cote marite pariuri" e deja target-ul `/bonusuri/cote-marite/`) — retarget manual pe varianta cu intent de comparație/ranking (ex. „case de pariuri live”, „case de pariuri cu cote marite”), documentat explicit în notele SEO plan-ului.
- **Regulă onestitate:** nu toate cele 20 branduri din lineup au date confirmate pentru fiecare feature (verificat în `04.BRANDS/` + `drafts/review-<brand>.md` ready). Clasează doar brandurile cu dovezi în surse; pentru rest, notează transparent „nu am date confirmate" — nu inventează. Aplică mai ales la „bonus pariuri multiple”, unde doar 2-3 branduri din lineup au promoție documentată.
- Secțiuni tipice: Intro (+ link definițional sau mini-definiție) → Cum evaluăm → Tabel comparativ lineup (20 branduri, coloană „confirmat/neconfirmat") → Top detaliat (6-10 branduri cu cele mai bune dovezi) → Nuanțe/tipuri → FAQ (5-6).
- Surse: `04.BRANDS/<brand>.md` + `drafts/review-<brand>.md` (ready, toate 20) — sinteză, fără researching nou de clipuri (clipurile ratings/bonuses din `01.RAW/web-clips/` folosite doar ca referință de structură, NU ca sursă de branduri, pentru că majoritatea listează operatori care nu sunt în lineup-ul nostru P1).
- Cross-link obligatoriu: → pagina definițională a feature-ului (dacă există) → `[[concept:top-case-de-pariuri]]` → review-urile brandurilor incluse în top.

Adăugat: 2026-07-21 (W3-5: primul batch FEATURE-RATING)

## PREDICTION-SPORT-HUB (listing de prognoze per sport)

Pentru `/ponturi/{sport}/` — pagină de tip listing/index, agregă **toate paginile PREDICTION ale unui singur sport** (spre diferență de DAILY-DIGEST, care e cross-sport, 1-2 selecții pe zi din tot lineup-ul de sporturi).

- **Origine decizie:** analiză competitor (2026-07-21) — clipurile din `01.RAW/web-clips/sport-categories/` conțin de fapt 2 tipuri distincte de conținut: (a) ghiduri generice „cum pariezi pe sportul X" (= modelul nostru SPORT-CATEGORY, deja corect implementat) și (b) hub-uri de prognoze concrete pe meci, actualizate zilnic, grupate pe sport/ligă (ex. `ponturi-fotbal-romania-liga-1`, `ponturi-tenis` — legalbet.ro/biletu-zilei.com/10pariuri.ro). Fără acest tip, paginile `PREDICTION` (`/ponturi/<sport>/<match>`) rămân orfane — fără index dedicat, doar cele 2 digest-uri cross-sport din `master-plan.md`.
- **Fază:** Faza 3 (API prognoze) — nu se scrie conținut acum, doar tipul e formalizat în avans, ca arhitectura să fie pregătită când apare API-ul.
- Volum: nedefinit încă (depinde de numărul de PREDICTION active per sport la momentul lansării) — de specificat la primul batch real.
- Schema.org: `CollectionPage` + `ItemList`.
- Secțiuni tipice (provizoriu, de rafinat în Faza 3): intro scurtă (metodologie prognoze) → listă PREDICTION (cele mai recente primele, filtrabile pe ligă/competiție) → CTA spre DAILY-DIGEST.
- **Cross-link obligatoriu:** SPORT-CATEGORY (`/sport/<sport>`) — secțiunea „Bloc predicții" (deja existentă ca placeholder în șablon, ex. `sport-fotbal.md` linkează azi doar la `[[concept:pontul-zilei]]`) trebuie actualizată să linkeze la acest hub, o dată ce e populat cu PREDICTION reale.
- Nu blocant pentru Wave-4 — SPORT-CATEGORY-urile scrise acum (fotbal, tenis, baschet, esport, formula-1, box) rămân valide, placeholder-ul se actualizează separat în Faza 3.

Adăugat: 2026-07-21 (decizie arhitecturală, la analiza competitorilor pentru batch W4-2)
