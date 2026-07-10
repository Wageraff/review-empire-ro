# Wiki Log

> Append-only журнал операций. Формат: ## [YYYY-MM-DD] operation | source

## [2026-06-21] init | Wiki created
- Created empty Wiki structure

## [2026-07-09] ingest | 01.RAW/regulatory/
- changed pages: [[onjn-autoritate-reglementare]], [[cadru-legal-jocuri-noroc-romania]], [[licente-onjn-clasa-i-ii-iii]], [[taxe-si-costuri-operatori-jocuri-noroc]], [[operatori-licentiati-onjn-2026]], [[joc-responsabil-romania]], [[restrictii-publicitate-jocuri-noroc]], [[definitie-joc-noroc-zone-gri-dfs-esports]]
- sources: onjn-licenses-2026.md, Romania-Legislation-LicenceTypes-LicenceFees.pdf, Romanian_Laws_on_Online_Gambling._What_the_Future_May_Hold.pdf
- skipped: Romania-Gambling-Licence_compressed.pdf (scan fără text, necesită OCR)
- gaps: limite concrete jucători, impozit câștiguri jucători (doar perspectivă)

## [2026-07-09] ingest | 01.RAW/ahrefs/
- created: 03.SEO/keyword-research.md, 03.SEO/content-cluster-map.md, 03.SEO/master-plan.md
- focus: pariuri sportive only (casino deferred to Site 2)
- excluded: comparații bookmakeri (no Ahrefs semantics), casino clusters
- sources: content-gap.csv, seeds/*.csv, top-pages-*.csv, keywords/*.csv

## [2026-07-10] ingest | 01.RAW/ahrefs/keywords/ + 01.RAW/web-clips/reviews/
- created: 04.COMPETITORS/ (20 dosare), [[competitors-overview]]
- assets: imagini copiate în 01.RAW/assets/{brand}/ (din 01.RAW/web-clips/imgs/)
- brand swaps: Mozzartbet→TopBet, PublicWin→Casa Pariurilor, AdmiralBet→Don.ro; adăugare 12xBet
- changed pages: [[competitors-overview]], 02.WIKI/index.md
- gaps: bonusuri contradictorii între surse, licențe expiră 2026 (7 operatori), TopBet fără app

## [2026-07-10] fix | lineup branduri — Fortuna + Vbet restaurate
- corectare: Fortuna (efortuna.ro) și Casa Pariurilor sunt branduri distincte (același operator Hattrick)
- corectare: Vbet/Victorybet restaurat; 12xBet rămâne ca adăugare, nu înlocuire
- created: [[fortuna]], [[vbet]] în 04.COMPETITORS/
- updated: [[casa-pariurilor]], [[12xbet]], [[competitors-overview]], 03.SEO/*

## [2026-07-10] reindex | 01.RAW/web-clips/imgs/
- indexed: 1968 images → reviews/imgs/_index.json (physical: web-clips/imgs/)
- usable: 1130 | ignored: 838
- empty indexes: ratings, bonuses, guides, sport-categories
