# Content Cluster Map — Pariuri Sportive

> Hub & Spoke для спортивного review-сайта
> Дата: 2026-07-09
> Казино — отдельный проект. Comparații букмекеров — **исключены** (нет семантики).

---

## Дерево сайта

```
🏠 /  (Pariuri Sportive Online România)
│
├── 📁 /case-de-pariuri/                    HUB — Букмекеры
│   ├── /case-de-pariuri/betano/            SPOKE — Бренд
│   ├── /case-de-pariuri/superbet/
│   ├── /case-de-pariuri/unibet/
│   ├── /case-de-pariuri/fortuna/
│   ├── /case-de-pariuri/casa-pariurilor/
│   ├── /case-de-pariuri/vbet/
│   ├── /case-de-pariuri/maxbet/
│   ├── /case-de-pariuri/topbet/
│   ├── /case-de-pariuri/favbet/
│   ├── /case-de-pariuri/getsbet/
│   ├── /case-de-pariuri/stanleybet/
│   ├── /case-de-pariuri/winbet/
│   ├── /case-de-pariuri/betfair/
│   ├── /case-de-pariuri/totogaming/
│   ├── /case-de-pariuri/12xbet/
│   ├── /case-de-pariuri/don-ro/
│   ├── /case-de-pariuri/888sport/
│   ├── /case-de-pariuri/netbet/
│   ├── /case-de-pariuri/pokerstars/
│   ├── /case-de-pariuri/winmasters/
│   │
│   ├── /case-de-pariuri/top/               SPOKE — Рейтинг
│   ├── /case-de-pariuri/cele-mai-bune/     SPOKE — Рейтинг (long-tail)
│   └── /case-de-pariuri/noi/               SPOKE — Новые БК
│
├── 📁 /bonusuri/                           HUB — Бонусы
│   ├── /bonusuri/betano/                   SPOKE — По бренду
│   ├── /bonusuri/superbet/
│   ├── /bonusuri/fortuna/
│   ├── /bonusuri/casa-pariurilor/
│   ├── /bonusuri/maxbet/
│   ├── /bonusuri/unibet/
│   ├── /bonusuri/getsbet/
│   ├── /bonusuri/topbet/
│   ├── /bonusuri/stanleybet/
│   ├── /bonusuri/winbet/
│   ├── /bonusuri/vbet/
│   ├── /bonusuri/12xbet/
│   │
│   └── /bonusuri/tipuri/                   SPOKE — Типы бонусов
│       ├── /bonusuri/tipuri/bun-venit/
│       ├── /bonusuri/tipuri/freebet/
│       ├── /bonusuri/tipuri/pariu-fara-risc/
│       ├── /bonusuri/tipuri/pariu-sansa/
│       └── /bonusuri/tipuri/cod-bonus/
│
├── 📁 /aplicatii/                          HUB — Приложения
│   ├── /aplicatii/betano/
│   ├── /aplicatii/superbet/
│   ├── /aplicatii/casa-pariurilor/
│   ├── /aplicatii/unibet/
│   ├── /aplicatii/maxbet/
│   ├── /aplicatii/winbet/
│   └── /aplicatii/getsbet/
│
├── 📁 /plati/                              HUB — Платежи
│   ├── /plati/paysafecard/
│   ├── /plati/skrill/
│   ├── /plati/neteller/
│   ├── /plati/revolut/
│   ├── /plati/apple-pay/
│   ├── /plati/visa-mastercard/
│   └── /plati/transfer-bancar/
│
├── 📁 /ponturi/                            HUB — Прогнозы (фаза 2–3)
│   ├── /ponturi/azi/
│   ├── /ponturi/fotbal/
│   ├── /ponturi/tenis/
│   └── /ponturi/baschet/
│
└── 📁 /ghid-pariuri/                       HUB — Руководства
    ├── /ghid-pariuri/incepatori/
    ├── /ghid-pariuri/1x2/
    ├── /ghid-pariuri/handicap-asiatic/
    ├── /ghid-pariuri/handicap-european/
    ├── /ghid-pariuri/cash-out/
    ├── /ghid-pariuri/dnb/
    ├── /ghid-pariuri/sansa-dubla/
    ├── /ghid-pariuri/pariuri-live/
    ├── /ghid-pariuri/cote/
    ├── /ghid-pariuri/fotbal/
    ├── /ghid-pariuri/tenis/
    ├── /ghid-pariuri/baschet/
    ├── /ghid-pariuri/esports/
    └── /ghid-pariuri/greseli-frecvente/
```

---

## Hub-страницы

| Hub | URL | Target KW | Vol | KD | ~Words | Фаза |
|-----|-----|-----------|-----|-----|--------|------|
| Главная | `/` | pariuri sportive online | 1 000 | — | 2 000 | 1 |
| Букмекеры | `/case-de-pariuri/` | case de pariuri | 1 000 | 74 | 3 500 | 1 |
| Рейтинг | `/case-de-pariuri/top/` | cele mai bune case de pariuri online | 700 | 68 | 3 000 | 1 |
| Бонусы | `/bonusuri/` | bonus pariuri | 500 | 31 | 2 500 | 2 |
| Типы бонусов | `/bonusuri/tipuri/` | bonus de bun venit | 1 000 | 62 | 2 000 | 2 |
| Приложения | `/aplicatii/` | aplicație case de pariuri | 1 700 | 39 | 2 000 | 2 |
| Платежи | `/plati/` | metode de plată case de pariuri | — | — | 2 500 | 2 |
| Прогнозы | `/ponturi/` | ponturi pariuri | 13 000 | 61 | 2 500 | 3 |
| Руководства | `/ghid-pariuri/` | pariuri sportive | 4 900 | 72 | 2 800 | 1 |

---

## Spoke-страницы — подсчёт

| Категория | Кол-во | URL-паттерн |
|-----------|--------|-------------|
| Recenzii branduri | 17 | `/case-de-pariuri/{brand}/` |
| Bonusuri per brand | 9 | `/bonusuri/{brand}/` |
| Tipuri bonus | 5 | `/bonusuri/tipuri/{tip}/` |
| Aplicații per brand | 7 | `/aplicatii/{brand}/` |
| Metode de plată | 7 | `/plati/{metoda}/` |
| Ponturi per sport | 4 | `/ponturi/{sport}/` |
| Ghiduri | 14 | `/ghid-pariuri/{topic}/` |
| **Итого** | **~63** | |

---

## Карта перелинковки

```mermaid
flowchart TB
    HOME["/"]

    H_CP["/case-de-pariuri/"]
    H_TOP["/case-de-pariuri/top/"]
    H_BON["/bonusuri/"]
    H_APP["/aplicatii/"]
    H_PAY["/plati/"]
    H_PON["/ponturi/"]
    H_GHI["/ghid-pariuri/"]

    B1["/case-de-pariuri/vbet/"]
    B2["/case-de-pariuri/betano/"]
    B3["/case-de-pariuri/superbet/"]

    BN1["/bonusuri/betano/"]
    BN2["/bonusuri/tipuri/freebet/"]

    AP1["/aplicatii/betano/"]
    PY1["/plati/paysafecard/"]

    G1["/ghid-pariuri/1x2/"]
    G2["/ghid-pariuri/cash-out/"]

    HOME --> H_CP & H_BON & H_GHI
    H_CP --> H_TOP
    H_CP --> B1 & B2 & B3
    H_BON --> BN1 & BN2
    H_APP --> AP1
    H_PAY --> PY1
    H_GHI --> G1 & G2

    B2 --> BN1 & AP1
    B2 --> PY1
    B2 --> G1
    BN1 --> B2
    G1 --> H_CP
    G1 --> B1 & B2 & B3
    H_TOP --> B1 & B2 & B3
    H_PON -.->|"faza 3"| G2
```

### Правила cross-linking

1. **Каждая recenzie brand** ссылается на: `/bonusuri/{brand}/`, `/aplicatii/{brand}/` (если есть), `/plati/`, 2–3 релевантных гида
2. **Каждый гид** ссылается на: `/case-de-pariuri/top/` + 3 бренда-примера
3. **Hub `/bonusuri/`** ссылается на все `/bonusuri/{brand}/` и `/bonusuri/tipuri/`
4. **Hub `/case-de-pariuri/`** ссылается на `/top/`, `/noi/` и все recenzii
5. **Footer** на каждой странице: ссылки на 4 hub-а + disclaimer ONJN + [[joc-responsabil-romania]]

---

## Маппинг на конкурентов

| Наш раздел | Аналог legalbet.ro | Аналог pariurix.com | Аналог beturi.ro |
|------------|-------------------|---------------------|------------------|
| /case-de-pariuri/ | /case-de-pariuri/ | /agentii/ | /case-pariuri-oferte/ |
| /case-de-pariuri/{brand}/ | /case-de-pariuri/{brand}/ | /agentii/recenzii/{brand}/ | /recenzie/{brand}/ |
| /bonusuri/ | /bonus/ | /promotii/ | /oferte-cazino/ |
| /aplicatii/ | — | — | — |
| /plati/ | /metode-de-plata/ | — | /ghid-casino/metode-de-plata-{brand}/ |
| /ponturi/ | /centrul-de-pariere/ | /ponturi | /ponturi-pariuri/ |
| /ghid-pariuri/ | /ghid-pariuri/ | / | /ghid-pariuri/ |

**Наше отличие:** чистая спортивная структура без casino-разделов. Aplicații и Plăți — отдельные hub-ы (у конкурентов размазаны).

---

## [CASINO — deferred]

Структура для Site 2 (не включена в текущий map):

```
/cazinouri-online/
/cazinouri-online/{brand}/
/bonusuri-casino/
/bonusuri-casino/fara-depunere/
/rotiri-gratuite/
```

---

## Schema.org по типам страниц

| Тип | Schema |
|-----|--------|
| Recenzie brand | `Review` + `Organization` |
| Hub top | `ItemList` |
| Ghid | `Article` + `FAQPage` (если есть Q&A) |
| Bonus | `Article` + `Offer` |
| Ponturi | `Article` |
| Aplicații | `Article` + `SoftwareApplication` |
