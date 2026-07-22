#!/usr/bin/env python3
"""Rebuild 03.SEO/_brand-nav-modifiers.json — pariuri sportive scope only."""
import csv
import json
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AHREFS = ROOT / "01.RAW/ahrefs/keywords"
OUT_JSON = ROOT / "03.SEO/_brand-nav-modifiers.json"
OUT_TEMPLATE = ROOT / "05.TEMPLATES/review-page.md"
PREV_JSON = OUT_JSON  # compare casino volume loss vs current file on disk before overwrite

BRAND_FILES = {
    "superbet": "google_ro_superbet_matching-terms_2026-07-09_12-46-02.csv",
    "betano": "google_ro_betano_matching-terms_2026-07-09_12-45-38.csv",
    "casa-pariurilor": "google_ro_casa-pariurilor_matching-terms_2026-07-10_09-13-10.csv",
    "winbet": "google_ro_winbet_matching-terms_2026-07-09_12-48-05.csv",
    "totogaming": "google_ro_totogaming_matching-terms_2026-07-09_12-48-35.csv",
    "unibet": "google_ro_unibet_matching-terms_2026-07-09_12-46-11.csv",
    "fortuna": "google_ro_fortuna_matching-terms_2026-07-09_12-46-33.csv",
    "netbet": "google_ro_netbet_matching-terms_2026-07-09_12-50-01.csv",
    "maxbet": "google_ro_maxbet_matching-terms_2026-07-09_12-46-42.csv",
    "getsbet": "google_ro_gets-bet_matching-terms_2026-07-09_12-47-37.csv",
    "vbet": "google_ro_vbet_matching-terms_2026-07-09_12-48-46.csv",
    "don-ro": "google_ro_don.ro_matching-terms_2026-07-10_09-13-35.csv",
    "favbet": "google_ro_favbet_matching-terms_2026-07-09_12-47-14.csv",
    "winmasters": "google_ro_winmasters_matching-terms_2026-07-09_12-50-43.csv",
    "betfair": "google_ro_betfair_matching-terms_2026-07-09_12-48-14.csv",
    "pokerstars": "google_ro_pokerstars_matching-terms_2026-07-09_12-50-10.csv",
    "888sport": "google_ro_888-sport_matching-terms_2026-07-09_12-49-15.csv",
    "12xbet": "google_ro_12xbet_matching-terms_2026-07-10_09-11-15.csv",
    "stanleybet": "google_ro_stanleybet_matching-terms_2026-07-09_12-47-47.csv",
    "topbet": "google_ro_topbet_matching-terms_2026-07-10_09-12-59.csv",
}

BRAND_ALIASES = {
    "superbet": ["superbet"],
    "betano": ["betano"],
    "casa-pariurilor": ["casa pariurilor", "casa pariuri"],
    "winbet": ["winbet"],
    "totogaming": ["totogaming", "toto gaming"],
    "unibet": ["unibet"],
    "fortuna": ["fortuna", "efortuna"],
    "netbet": ["netbet"],
    "maxbet": ["maxbet"],
    "getsbet": ["getsbet", "gets bet", "gets-bet"],
    "vbet": ["vbet"],
    "don-ro": ["don ro", "don.ro", "don-ro"],
    "favbet": ["favbet"],
    "winmasters": ["winmasters"],
    "betfair": ["betfair"],
    "pokerstars": ["pokerstars"],
    "888sport": ["888sport", "888 sport"],
    "12xbet": ["12xbet", "12x bet"],
    "stanleybet": ["stanleybet"],
    "topbet": ["topbet"],
}

DISPLAY = {
    "superbet": "Superbet", "betano": "Betano", "casa-pariurilor": "Casa Pariurilor",
    "winbet": "Winbet", "totogaming": "Toto Gaming", "unibet": "Unibet",
    "fortuna": "Fortuna", "netbet": "NetBet", "maxbet": "Maxbet",
    "getsbet": "Gets Bet", "vbet": "Vbet", "don-ro": "Don.ro",
    "favbet": "Favbet", "winmasters": "Winmasters", "betfair": "Betfair",
    "pokerstars": "PokerStars", "888sport": "888Sport", "12xbet": "12xBet",
    "stanleybet": "Stanleybet", "topbet": "TopBet",
}

SLUG = {k: k for k in BRAND_FILES}
SLUG["don-ro"] = "don-ro"
SLUG["casa-pariurilor"] = "casa-pariurilor"
SLUG["getsbet"] = "getsbet"
SLUG["12xbet"] = "12xbet"

MUST_INCLUDE = {
    "superbet": ["program superbet"],
    "betano": ["betano live", "betano pariuri sportive", "betano aplicatie", "betano casa de pariuri", "liga 1 betano"],
    "vbet": ["vbet bonus fara depunere", "vbet app", "vbet cod promo"],
    "winbet": ["winbet aplicatie", "winbet pariuri sportive", "winbet download", "winbet promotii"],
    "unibet": ["unibet pariuri sportive", "unibet aplicatie", "unibet live", "roata unibet", "unibet live streaming football"],
    "totogaming": ["totogaming aplicatie"],
}

EXCLUDE_KW = {
    "superbet": {"superbet contact"},
    "vbet": {"victorybet ro", "victorybet", "victory bet", "vbet. ro"},
}

PARIURI_SECONDARY_NOTE = "brand este casino-first, pariuri scope limitat"

PRODUCT_RE = re.compile(r"\b(club|program|exchange|missions|arena|superclub|card superbet)\b", re.I)
SERVICE_RE = re.compile(
    r"\b(verificare bilet|scanare bilet|cash[\s-]?out|retragere|live streaming)\b", re.I
)
CATEGORY_RE = re.compile(
    r"\b(pariuri sportive|pariuri live|pariuri online|pariuri fotbal|pariuri\b|oferta fotbal|"
    r"oferta de azi|oferta\b|fotbal azi|fotbal\b|aplicatie|aplicația|aplicatia|liga 1|"
    r"deschis acum|agentie|agentii|live\b|handicap|bilet)\b",
    re.I,
)
SPORT_EXPLICIT_RE = re.compile(
    r"\b(pariuri|sportive|fotbal|oferta|verificare bilet|scanare bilet|liga 1|"
    r"handicap|live streaming|live score|exchange|bilet|handbal|tenis|baschet)\b",
    re.I,
)
GENERIC_RE = re.compile(
    r"\b(login|contact|conectare|mobil|mobile|cont\b|suport|support)\b",
    re.I,
)
CASINO_BLOCK_RE = re.compile(
    r"\b(casino|cazino|cazinou|sloturi?|ruleta|blackjack|jocuri de noroc|rotiri|pacanele|loto|demo)\b",
    re.I,
)
JOCURI_RE = re.compile(r"\bjocuri\b", re.I)
POKER_RE = re.compile(r"\bpoker\b", re.I)

LONGTAIL_MIN_VOL = 50
TARGET_SLOTS = 10


def norm_kw(kw: str) -> str:
    return re.sub(r"\s+", " ", kw.strip().lower())


def parse_vol(v) -> int:
    try:
        return int(str(v).replace(",", "").strip() or 0)
    except ValueError:
        return 0


def is_exact_brand(kw: str, aliases: list[str]) -> bool:
    return kw in aliases


def is_modifier(kw: str, aliases: list[str]) -> bool:
    if is_exact_brand(kw, aliases):
        return False
    for a in aliases:
        if kw.startswith(a + " ") or kw.startswith(a + "."):
            return True
        if kw.endswith(" " + a):
            return True
        if re.search(rf"\b{re.escape(a)}\b", kw):
            return True
    return False


def is_geo_only(kw: str, aliases: list[str]) -> bool:
    base = kw
    for a in aliases:
        base = re.sub(rf"\b{re.escape(a)}\b", "", base)
    base = re.sub(r"[\.\s]+", " ", base).strip()
    base = re.sub(r"\b(ro|romania|com)\b", "", base).strip()
    return base == "" or base in {".ro", "ro", "romania"}


def is_generic(kw: str, aliases: list[str]) -> bool:
    if is_geo_only(kw, aliases):
        return True
    if ". ro" in kw:
        return True
    if GENERIC_RE.search(kw):
        return True
    if re.search(r"\.ro$", kw.replace(" ", "")):
        return True
    return False


def is_junk(kw: str, brand: str) -> bool:
    if kw in EXCLUDE_KW.get(brand, set()):
        return True
    if brand == "vbet" and "victory" in kw:
        return True
    if ". ro" in kw or ",ro" in kw.replace(" ", ""):
        return True
    if re.fullmatch(r"[a-z0-9\.\-]+\.", kw):
        return True
    return False


def is_casino_excluded(kw: str, brand: str) -> bool:
    kl = kw.lower()
    if re.search(r"casino\s+pariuri|pariuri\s+casino", kl):
        return False
    if re.search(r"poker\s+sportiv", kl):
        return False
    if brand == "pokerstars":
        return False
    if CASINO_BLOCK_RE.search(kl):
        return True
    if JOCURI_RE.search(kl) and "pariuri" not in kl:
        return True
    if POKER_RE.search(kl):
        return True
    return False


def is_sport_explicit(kw: str) -> bool:
    return bool(SPORT_EXPLICIT_RE.search(kw))


def tier(kw: str) -> str:
    if PRODUCT_RE.search(kw):
        return "product"
    if SERVICE_RE.search(kw):
        return "service"
    if CATEGORY_RE.search(kw):
        return "category"
    if re.search(r"\b(bonus|cod promo|cod bonus|promotii|promo)\b", kw, re.I):
        return "bonus"
    return "unique"


def score(kw: str, vol: int) -> float:
    mult = {"product": 8.0, "service": 6.0, "category": 4.0, "bonus": 2.0, "unique": 1.0}
    return vol * mult.get(tier(kw), 1.0)


def load_brand_kws(fname: str) -> dict[str, int]:
    path = AHREFS / fname
    kws: dict[str, int] = {}
    if not path.exists():
        return kws
    with path.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            kw = norm_kw(row.get("Keyword", ""))
            vol = parse_vol(row.get("Volume", ""))
            if kw and vol > 0:
                kws[kw] = max(kws.get(kw, 0), vol)
    return kws


def dedupe_geo_variants(items: list[tuple[str, int]]) -> list[tuple[str, int]]:
    groups: dict[str, list] = defaultdict(list)
    for kw, vol in items:
        base = kw
        for pat in [r"\bro\b", r"\bromania\b", r"\.ro", r"\. ro", r"\bcom\b"]:
            base = re.sub(pat, "", base)
        base = re.sub(r"\s+", " ", base).strip()
        groups[base].append((kw, vol))
    out = []
    for group in groups.values():
        group.sort(key=lambda x: (". ro" in x[0], x[0].endswith(" ro"), -x[1]))
        out.append(group[0])
    return out


def dedupe_word_order(items: list[tuple[str, int]], aliases: list[str]) -> list[tuple[str, int]]:
    """Keep higher-volume variant when only word order differs."""
    by_tokens: dict[frozenset, tuple[str, int]] = {}
    for kw, vol in items:
        tokens = frozenset(kw.split())
        if tokens not in by_tokens or by_tokens[tokens][1] < vol:
            by_tokens[tokens] = (kw, vol)
    return list(by_tokens.values())


def select_modifiers(brand: str, all_kws: dict[str, int]) -> list[tuple[str, int]]:
    aliases = BRAND_ALIASES[brand]
    pool: list[tuple[str, int]] = []

    for kw, vol in all_kws.items():
        if is_junk(kw, brand):
            continue
        if not is_modifier(kw, aliases):
            continue
        if is_generic(kw, aliases):
            continue
        if is_casino_excluded(kw, brand):
            continue
        pool.append((kw, vol))

    pool = dedupe_geo_variants(pool)
    pool = dedupe_word_order(pool, aliases)

    for kw in MUST_INCLUDE.get(brand, []):
        kw = norm_kw(kw)
        if is_casino_excluded(kw, brand) or is_generic(kw, aliases):
            continue
        vol = all_kws.get(kw, LONGTAIL_MIN_VOL)
        if not any(x[0] == kw for x in pool):
            pool.append((kw, vol))

    scored = sorted(((kw, vol, score(kw, vol)) for kw, vol in pool), key=lambda x: -x[2])
    selected: list[tuple[str, int]] = []
    seen: set[str] = set()

    for kw in MUST_INCLUDE.get(brand, []):
        kw = norm_kw(kw)
        match = next((x for x in scored if x[0] == kw), None)
        if match and match[0] not in seen:
            selected.append((match[0], match[1]))
            seen.add(match[0])

    for kw, vol, _ in scored:
        if len(selected) >= TARGET_SLOTS:
            break
        if kw in seen:
            continue
        selected.append((kw, vol))
        seen.add(kw)

    if len(selected) < TARGET_SLOTS:
        extras = sorted(pool, key=lambda x: -x[1])
        for kw, vol in extras:
            if len(selected) >= TARGET_SLOTS:
                break
            if kw in seen:
                continue
            if vol >= LONGTAIL_MIN_VOL:
                selected.append((kw, vol))
                seen.add(kw)

    selected.sort(key=lambda x: -x[1])
    return selected[:TARGET_SLOTS]


def load_prev_modifiers() -> dict[str, list]:
    if not PREV_JSON.exists():
        return {}
    data = json.loads(PREV_JSON.read_text(encoding="utf-8"))
    out = {}
    for brand, val in data.get("brands", data).items():
        if brand.startswith("_"):
            continue
        if isinstance(val, dict):
            out[brand] = val.get("modifiers", [])
        else:
            out[brand] = val
    return out


def h2_title(brand: str, kw: str) -> str:
    display = DISPLAY[brand]
    tail = kw
    for a in sorted(BRAND_ALIASES[brand], key=len, reverse=True):
        tail = re.sub(rf"^{re.escape(a)}\s*", "", tail, flags=re.I)
        tail = re.sub(rf"^{re.escape(a)}\.\s*", "", tail, flags=re.I)
    tail = tail.strip(" .-") or kw
    words = []
    for w in re.split(r"[\s\-]+", tail):
        if w in {"ro", "uk"}:
            words.append(w.upper())
        elif w == "apk":
            words.append("APK")
        else:
            words.append(w.capitalize())
    return f"## {display} — {' '.join(words)}"


def render_appendix(brands: dict) -> str:
    order = sorted(BRAND_FILES.keys(), key=lambda b: DISPLAY[b].lower())
    lines = [
        "## Anexă: Top-10 modificatori per brand (lineup 20)",
        "",
        "> Scope: **pariuri sportive** — casino/cazino/sloturi excluse. Generat din Ahrefs matching-terms.",
        "",
    ]
    for brand in order:
        entry = brands[brand]
        items = entry["modifiers"]
        display = DISPLAY[brand]
        slug = SLUG[brand]
        sparse = entry.get("sparse_modifiers", False)
        flag = " ⚠️ sparse" if sparse else ""
        lines.append(f"### {display} (`/recenzii/{slug}`){flag}")
        lines.append("")
        lines.append("| # | KW | Vol | H2 obligatoriu |")
        lines.append("|---:|---|--:|---|")
        for i, (kw, vol) in enumerate(items, 1):
            lines.append(f"| {i} | `{kw}` | {vol:,} | `{h2_title(brand, kw)}` |")
        missing = TARGET_SLOTS - len(items)
        if missing > 0:
            lines.append(f"| — | *{missing} slot(uri) libere — scope pariuri limitat* | — | — |")
        if entry.get("pariuri_secondary"):
            lines.append("")
            lines.append(f"> Copywriter: {entry['pariuri_secondary']}")
        lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def patch_review_template(appendix: str) -> None:
    text = OUT_TEMPLATE.read_text(encoding="utf-8")
    marker = "## Anexă: Top-10 modificatori per brand (lineup 20)"
    idx = text.find(marker)
    if idx == -1:
        raise SystemExit("marker not found in review-page.md")
    OUT_TEMPLATE.write_text(text[:idx] + appendix, encoding="utf-8")


def main() -> None:
    prev = load_prev_modifiers()
    brands: dict = {}
    report_rows = []
    sparse_count = 0
    lost_casino_vol = 0
    prev_total_nav_vol = 0

    for brand, fname in BRAND_FILES.items():
        kws = load_brand_kws(fname)
        modifiers = select_modifiers(brand, kws)
        sparse = len(modifiers) < TARGET_SLOTS
        if sparse:
            sparse_count += 1

        sport_count = sum(1 for kw, _ in modifiers if is_sport_explicit(kw))
        sport_share = round(100 * sport_count / len(modifiers), 1) if modifiers else 0.0
        total_vol = sum(v for _, v in modifiers)

        entry = {
            "modifiers": [[kw, vol] for kw, vol in modifiers],
            "sparse_modifiers": sparse,
            "sport_share_pct": sport_share,
            "total_volume": total_vol,
        }
        if sparse:
            entry["pariuri_secondary"] = PARIURI_SECONDARY_NOTE
        brands[brand] = entry

        # casino volume lost vs previous top-10
        prev_items = prev.get(brand, [])
        for kw, vol in prev_items:
            prev_total_nav_vol += vol
            if is_casino_excluded(kw, brand):
                lost_casino_vol += vol

        report_rows.append((brand, total_vol, sport_share, sparse, len(modifiers)))

    payload = {
        "_meta": {
            "scope": "pariuri-sportive",
            "excludes": ["casino", "cazino", "cazinou", "slot", "sloturi", "ruleta", "blackjack", "poker", "jocuri de noroc", "rotiri", "loto"],
            "longtail_min_volume": LONGTAIL_MIN_VOL,
            "generated": "regenerate-brand-nav-modifiers.py",
        },
        "brands": brands,
    }
    OUT_JSON.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    patch_review_template(render_appendix(brands))

    lost_pct = round(100 * lost_casino_vol / prev_total_nav_vol, 1) if prev_total_nav_vol else 0

    print(f"sparse_modifiers: {sparse_count}/20 brands")
    print(f"Casino volume excluded from prev top-10: {lost_casino_vol:,} ({lost_pct}% of prev navigational sum)\n")

    print("SEMANTIC FOCUS REPORT")
    print(f"{'brand':18} {'slots':>5} {'total_vol':>10} {'sport%':>7} sparse")
    for brand, total_vol, sport_share, sparse, slots in sorted(report_rows, key=lambda x: -x[1]):
        print(f"{brand:18} {slots:5} {total_vol:10,} {sport_share:6.1f}% {'YES' if sparse else 'no'}")

    for b in ["betano", "vbet", "totogaming", "maxbet", "winbet", "casa-pariurilor"]:
        print(f"\n=== {b} ===")
        for i, (kw, vol) in enumerate(brands[b]["modifiers"], 1):
            print(f"  {i:2}. {vol:>6,}  {kw}")
        if brands[b]["sparse_modifiers"]:
            print(f"  >> sparse_modifiers + {brands[b].get('pariuri_secondary', '')}")


if __name__ == "__main__":
    main()
