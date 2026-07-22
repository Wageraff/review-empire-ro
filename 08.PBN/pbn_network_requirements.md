# PBN / Anti-detect — network requirements

> Baseline pentru `generate-site`. Site-ul curent: **site-01-ro**.
> Actualizat: 2026-07-22

## Reguli globale (toate site-urile rețelei)

1. **Rewrite ≥75%** între site-uri pe același topic; ghiduri ≥85%.
2. **HTML/CSS diferit** — alte nume de clase, alt layout hero, alt tip de tabel.
3. **Paletă + tipografie unice** per site (vezi design-spec).
4. **Favicon / logo / brand name** diferite.
5. **T&C / About / Methodology** — texte distincte, nu clone.
6. **Imagini:** variant diferit (1–5) + alt filename + alt alt-text.
7. **Authors pool** — autori diferiți per site (`authors-pool.md`).
8. **Whois privacy** + hosting/CDN ne-corelate (ops, nu Cursor).
9. **Nu deploy** fără aprobare explicită.

## site-01-ro fingerprint

| Param | Valoare |
|-------|---------|
| Design spec | `06.DESIGN/site-01-ro-spec.md` |
| Primary | `#1a2b4a` |
| Accent | `#d97706` |
| Fonts | Source Serif 4 + Source Sans 3 |
| Image variant | `1` (ramă amber 8px, 1200px, q85) |
| Brand working | Betoteca (placeholder) |
| Class prefix sugerat | `bt-` (ex. `bt-hero`, `bt-trust`) — nu `sb-` / `bn-` |

## Ce NU facem pe site-01

- Culori Superbet/Betano
- Class names generice tip `bookmaker-card` (folosim `BrandCard` / `bt-brand-card`)
- Același HTML skeleton ca pe site-02+ (când vor exista)

## La generate-site

1. Citește acest fișier + `site-01-ro.md` + `authors-pool.md`
2. Aplică paleta/fonts din design-spec
3. Folosește prefix clase `bt-`
4. Nu copia layout 1:1 din inventory-ul legalbet/beturi
