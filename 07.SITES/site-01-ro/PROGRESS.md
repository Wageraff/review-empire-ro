# Site Progress — site-01-ro

> Auto-updated by Cursor. НЕ редактировать вручную.
> Обновлено: 2026-07-22 08:42 UTC
> Архив детальной истории батчей: `PROGRESS-archive.md` (W0–W4-2).

---

## 📊 Общая статистика

| Метрика | Значение |
|---|---|
| **Всего запланировано** | 2 788 страниц (master-plan) |
| **Ready (готовы к сборке)** | 210 |
| **Built in dist/** | 212 (210 drafts + 2 ponturi stubs) |
| **In progress (в pipeline)** | 0 |
| **Not started** | ~2 578 |
| **Deployed to production** | 0 (0%) |

```
█░░░░░░░░░░░░░░░░░░░░░░░░ ~7.5% ready / built locally
```

---

## 📈 По типам страниц (P1)

| Тип | Всего | Ready | In progress | Not started | % ready |
|---|---|---|---|---|---|
| review | 20 | 20 | 0 | 0 | 100% |
| bonus-page | 50 | 50 | 0 | 0 | 100% |
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
| **P1 subtotal** | **204** | **204** | **0** | **0** | **100%** |

---

## Wave status

| Wave | Статус | Итог |
|---|---|---|
| Wave-0 | ✅ | 26/26 |
| Wave-1 | ✅ | 60/60 (reviews + bonuses) |
| Wave-2 | ✅ | 28/28 |
| Wave-3 | ✅ | 71/71 (guides + brand hubs + feature ratings) |
| Wave-4 | ✅ | W4-1 ✅, W4-2 ✅, W4-3 ✅ |

**Wave-4 batch-plan:**
- **W4-1** PAYMENT-METHOD ×6 — ✅ READY
- **W4-2** SPORT-CATEGORY ×5 — ✅ READY
- **W4-3** BONUS-PAGE ×10 — ✅ READY  
  cote-mărite ×4 (Betano, Maxbet, Fortuna, Casa Pariurilor) + cashback ×6 (Betano, Casa Pariurilor, Don.ro, Vbet, Winbet, Winmasters). Только Don.ro — механика публично полная; остальным cashback — с пометкой «mecanica nu e publicată».

---

## 🔄 Активный batch

Нет активного content-batch. **Full Astro build ✅ (2026-07-22)** — 212 pages в `dist/` (65MB).

**Next:** rsync `dist/` на Fastpanel; имя+логотип вместо Betoteca; UI ProsCons/BonusBadge; добить `concepts-map` pending (~8 после aliases).

---

## ⚠️ Открытые риски (кратко)

Полный список и закрытые инциденты — в `PROGRESS-archive.md`.

- 🟡 **Фаза 3:** `PREDICTION-SPORT-HUB` (`/ponturi/<sport>/`) — создать при API; обновить «Bloc predicții» во всех SPORT-CATEGORY
- 🟡 **YMYL лицензии:** 12xbet / NetBet / Unibet / Maxbet / Winmasters / Betfair / PokerStars — периодическая сверка onjn.gov.ro
- 🟡 **Pre-deploy:** заменить placeholder `Betoteca.ro`; юр. review T&C + privacy; фискальная сверка `/legal/impozit-pariuri`
- 🟡 **Pending links / concepts-map:** после full build осталось ~8 вхождений без id (vip-loialitate и др.) — см. `_link-report.json`
- 🟡 **Контент-ревизия (не блокер):** объём ниже target у части W0 pages (`/legal/onjn`, CATEGORY-RATING-HYBRID, RATING)

---

## 🔗 Astro Build

- Last build: **2026-07-22** — **full site ✅**
- Pages built: **212** HTML (`dist/`) = 210 ready drafts + 2 ponturi stubs
- Linker: **~1522+** `[[concept:]]` → URL; unresolved glossary → plain text / aliases; report `src/content/linked/_link-report.json`
- Homepage: RatingTable + HubCards + FAQAccordion + prose body
- Images: **full batch ✅** — brand galleries (main/bonus/app/live/payment) injected in prose; hubs/ratings/guides heroes; homepage RatingTable = logos + affiliate CTA
- Deploy: VPS Fastpanel → nginx `dist/` — `DEPLOY-FASTPANEL.md`
- Brand: **Betoteca** placeholder
- Commands: `npm run link:all` · `npm run build` · `npm run preview`

---

## При `progress`

Показывай только: общий %, текущий batch/этап, что застряло, next. Не дампи весь файл.
