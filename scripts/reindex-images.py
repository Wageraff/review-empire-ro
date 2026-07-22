#!/usr/bin/env python3
"""Re-audit and rebuild image indexes under 01.RAW/web-clips/*/imgs/_index.json."""

from __future__ import annotations

import json
import re
from collections import Counter, defaultdict
from datetime import date
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    Image = None  # type: ignore

ROOT = Path(__file__).resolve().parents[1]
WEB = ROOT / "01.RAW/web-clips"
MANIFEST = ROOT / "03.SEO/_stage2-brands-manifest.json"
EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}
TODAY = date.today().isoformat()

CATEGORIES = [
    "reviews",
    "bonuses",
    "guides",
    "ratings",
    "sport-categories",
    "apps",
    "payments",
    "player-reviews",
    "retail",
]

# Canonical slug -> filename/title tokens (longer tokens first per brand)
BRAND_ALIASES: dict[str, list[str]] = {
    "casa-pariurilor": ["casa-pariurilor", "casapariurilor", "casa pariurilor"],
    "12xbet": ["12xbet", "12x-bet", "12x bet"],
    "888sport": ["888sport", "888 sport"],
    "888casino": ["888casino", "888 casino", "888-casino"],
    "888": ["888"],
    "pokerstars": ["pokerstars", "poker-stars", "poker stars"],
    "totogaming": ["totogaming", "toto-gaming", "toto gaming"],
    "stanleybet": ["stanleybet", "stanley-bet"],
    "winmasters": ["winmasters", "win-masters"],
    "don-ro": ["don-ro", "don.ro", "don ro", "donro"],
    "getsbet": ["getsbet", "gets-bet", "gets bet"],
    "vbet": ["vbet", "v-bet", "victorybet", "victory-bet", "victory bet"],
    "mr-bit": ["mr-bit", "mrbit", "mr bit"],
    "powerbet": ["powerbet", "power-bet", "power bet"],
    "las-vegas": ["las-vegas", "lasvegas", "las vegas"],
    "elite-slots": ["elite-slots", "elite slots"],
    "lucky-seven": ["lucky-seven", "lucky seven"],
    "game-world": ["game-world", "game world"],
    "pacanele-ro": ["pacanele-ro", "pacanele"],
    "real-bet": ["real-bet", "real bet"],
    "river-bet": ["river-bet", "river bet"],
    "clover-bet": ["clover-bet", "clover bet"],
    "total-bet": ["total-bet", "total bet"],
    "toto-gaming": ["toto-gaming"],
    "vip-cazino": ["vip-cazino", "vip cazino"],
    "vlad-cazino": ["vlad-cazino", "vlad cazino"],
    "casino-royale": ["casino-royale", "casino royale"],
    "kingcasino": ["kingcasino", "king-casino", "king casino"],
    "jokercasino": ["jokercasino", "joker-casino", "joker casino"],
    "conticazino": ["conticazino", "conti-cazino"],
    "admiralbet": ["admiralbet", "admiral-bet"],
    "admiral": ["admiral"],
    "superbet": ["superbet", "super-bet"],
    "betano": ["betano"],
    "unibet": ["unibet"],
    "fortuna": ["fortuna", "efortuna"],
    "winbet": ["winbet", "win-bet"],
    "maxbet": ["maxbet", "max-bet"],
    "netbet": ["netbet", "net-bet"],
    "favbet": ["favbet", "fav-bet"],
    "betfair": ["betfair", "bet-fair"],
    "topbet": ["topbet", "top-bet"],
    "mozzart": ["mozzart", "mozzartbet"],
    "sportingbet": ["sportingbet", "sporting-bet"],
    "pariuriplus": ["pariuriplus", "pariuri-plus"],
    "publicwin": ["publicwin", "public-win"],
    "betmen": ["betmen", "bet-men"],
    "excelbet": ["excelbet", "excel-bet"],
    "magnumbet": ["magnumbet", "magnum-bet"],
    "swiper": ["swiper"],
    "vivabet": ["vivabet", "viva-bet"],
    "prowin": ["prowin", "pro-win"],
    "32rosu": ["32rosu", "32-rosu", "32 rosu"],
    "bet7": ["bet7", "bet-7"],
    "frank": ["frank", "frank-sport"],
    "conti": ["conti"],
    "princess": ["princess", "princess-bet", "princessbet"],
    "royal": ["royal", "royalslots", "royal-slots"],
    "redsevens": ["redsevens", "red-sevens"],
    "million": ["million", "million-casino"],
    "mr-play": ["mr-play", "mrplay"],
    "slotv": ["slotv", "slot-v"],
    "seven": ["seven"],
    "zinx": ["zinx"],
    "player": ["player"],
    "napoleon": ["napoleon", "napoleon-games"],
    "betone": ["betone", "bet-one"],
    "manhattan": ["manhattan"],
    "win2": ["win2", "win-2"],
    "777-ro": ["777-ro", "777"],
    "bilion": ["bilion"],
    "gpcasino": ["gpcasino", "gp-casino"],
    "lady": ["lady", "lady-casino"],
    "playgg": ["playgg", "play-gg"],
    "prima": ["prima"],
    "hotspins": ["hotspins", "hot-spins"],
    "cashpot": ["cashpot", "cash-pot"],
    "luck": ["luck"],
    "winboss": ["winboss", "win-boss"],
    "spin": ["spin"],
    "ultrabet": ["ultrabet", "ultra-bet"],
    "vipbet": ["vipbet", "vip-bet"],
    "one": ["one-casino", "one casino"],
    "maxwin": ["maxwin", "max-win"],
    "baumbet": ["baumbet", "baum-bet"],
    "betstars": ["betstars", "bet-stars"],
    "vlad": ["vlad", "vlad-sport"],
    "king": ["king-sport", "king sport"],
    "winner": ["winner"],
}

THEME_PATTERNS: list[tuple[str, list[str]]] = [
    ("bonus-fara-depunere", [r"fara[\s_-]?depunere", r"freebet", r"rotiri[\s_-]?gratuite", r"no[\s_-]?deposit"]),
    ("bonus-de-bun-venit", [r"bun[\s_-]?venit", r"welcome", r"bonus[\s_-]?de[\s_-]?inregistrare"]),
    ("inregistrare", [r"inregistrare", r"register", r"cont[\s_-]?nou", r"sign[\s_-]?up"]),
    ("verificare", [r"verificare", r"kyc", r"identitate", r"document"]),
    ("depunere", [r"depunere", r"deposit", r"reincarcare"]),
    ("retragere", [r"retragere", r"withdraw", r"plata", r"payout"]),
    ("aplicatie", [r"aplicatie", r"app", r"android", r"ios", r"mobil"]),
    ("live", [r"live[\s_-]?bet", r"in[\s_-]?direct", r"live[\s_-]?streaming"]),
    ("casino", [r"casino", r"cazino", r"slot", r"pacanele", r"ruleta"]),
    ("pariuri", [r"pariuri", r"pariu", r"cote", r"betting", r"handicap", r"ponturi"]),
    ("branding", [r"logo", r"banner", r"promo"]),
]

GENERIC_FILENAME = re.compile(
    r"^(?:\d{1,4}(?:\s+\d+)?\.(?:png|jpe?g|webp|gif)|"
    r"[a-f0-9]{8,}(?:_\d+)?(?:-\d+x\d+)?(?:\s+\d+)?\.(?:png|jpe?g|webp|gif)|"
    r"image\d*|img\d*|screenshot\d*|photo\d*|"
    r"%2F|untitled|download|attachment)\b",
    re.I,
)

HASH_ASSET = re.compile(r"^[a-f0-9]{8,}_\d+", re.I)
NUMERIC_ONLY = re.compile(r"^\d{1,4}(?:\s+\d+)?$", re.I)


def load_canonical_brands() -> list[str]:
    if MANIFEST.exists():
        data = json.loads(MANIFEST.read_text(encoding="utf-8"))
        return sorted(set(data.get("brands", [])))
    return sorted(BRAND_ALIASES.keys())


def build_brand_matcher(brands: list[str]) -> list[tuple[str, re.Pattern[str]]]:
    patterns: list[tuple[str, re.Pattern[str]]] = []
    seen: set[str] = set()
    for slug in sorted(brands, key=len, reverse=True):
        tokens = BRAND_ALIASES.get(slug, [slug.replace("-", " "), slug])
        for token in sorted(set(tokens), key=len, reverse=True):
            escaped = re.escape(token).replace(r"\ ", r"[\s_-]?")
            pat = re.compile(rf"(?<![a-z0-9]){escaped}(?![a-z0-9])", re.I)
            key = pat.pattern
            if key not in seen:
                patterns.append((slug, pat))
                seen.add(key)
    return patterns


def detect_brand(name: str, matchers: list[tuple[str, re.Pattern[str]]]) -> str | None:
    stem = Path(name).stem.lower().replace("_", "-")
    text = stem.replace("-", " ")
    for slug, pat in matchers:
        if pat.search(stem) or pat.search(text):
            return slug
    return None


def detect_theme(name: str, category: str) -> str:
    stem = Path(name).stem.lower()
    for theme, pats in THEME_PATTERNS:
        for p in pats:
            if re.search(p, stem, re.I):
                return theme
    defaults = {
        "bonuses": "bonus-de-bun-venit",
        "apps": "aplicatie",
        "payments": "depunere",
        "guides": "pariuri",
        "reviews": "pariuri",
        "ratings": "pariuri",
        "sport-categories": "pariuri",
        "player-reviews": "pariuri",
        "retail": "pariuri",
    }
    return defaults.get(category, "generic")


def detect_type(name: str, width: int | None, height: int | None) -> str:
    stem = Path(name).stem.lower()
    if stem.endswith("-screenshot") or "screenshot" in stem:
        if any(k in stem for k in ("depunere", "plata", "payment", "retragere")):
            return "screenshot-payment"
        if any(k in stem for k in ("bonus", "freebet", "rotiri")):
            return "screenshot-bonus"
        return "screenshot-main"
    if width and height and max(width, height) <= 120 and min(width, height) <= 80:
        return "icon"
    if any(k in stem for k in ("logo", "brand")):
        return "logo"
    return "photo"


def image_dims(path: Path, filename: str) -> tuple[int | None, int | None]:
    stem = Path(filename).stem
    m = re.search(r"(\d{2,5})x(\d{2,5})", stem)
    if m:
        return int(m.group(1)), int(m.group(2))
    # Re-audit: skip slow PIL decode; dimensions optional for usability heuristics
    return None, None


def score_quality(width: int | None, height: int | None, img_type: str, has_brand: bool) -> int:
    score = 5
    if has_brand:
        score += 1
    if img_type.startswith("screenshot"):
        score += 2
    if width and height:
        area = width * height
        if area >= 400_000:
            score += 2
        elif area >= 100_000:
            score += 1
        if min(width, height) < 80:
            score -= 2
    return max(1, min(10, score))


def usability(
    name: str,
    brand: str | None,
    theme: str,
    width: int | None,
    height: int | None,
    img_type: str,
) -> tuple[bool, str | None]:
    stem = Path(name).stem
    if GENERIC_FILENAME.match(name) or HASH_ASSET.match(stem) or NUMERIC_ONLY.match(stem):
        return False, "generic filename pattern"
    if img_type == "icon" or (width and height and max(width, height) <= 100):
        return False, "small icon"
    if brand is None and theme == "generic":
        return False, "no brand, generic"
    if brand is None and not name.endswith("-screenshot.png"):
        return False, "no brand, generic"
    return True, None


def resolve_file_path(category: str, filename: str) -> Path | None:
    local = WEB / category / "imgs" / filename
    if local.exists():
        return local
    if category == "reviews":
        legacy = WEB / "imgs" / filename
        if legacy.exists():
            return legacy
    return local if local.exists() else None


def collect_files(category: str) -> list[tuple[str, Path | None]]:
    """Return (filename, resolved_path) for category."""
    items: list[tuple[str, Path | None]] = []
    img_dir = WEB / category / "imgs"
    if img_dir.exists():
        for f in sorted(img_dir.iterdir()):
            if f.suffix.lower() in EXTS:
                items.append((f.name, f))
    if category == "reviews":
        legacy_dir = WEB / "imgs"
        if legacy_dir.exists():
            known = {n for n, _ in items}
            for f in sorted(legacy_dir.iterdir()):
                if f.suffix.lower() in EXTS and f.name not in known:
                    items.append((f.name, f))
    return items


def load_existing_index(category: str) -> dict[str, dict]:
    path = WEB / category / "imgs" / "_index.json"
    if not path.exists():
        return {}
    data = json.loads(path.read_text(encoding="utf-8"))
    out: dict[str, dict] = {}
    for img in data.get("images", []):
        fname = img.get("file")
        if fname:
            out[fname] = img
    return out


def migrate_entry(old: dict) -> dict:
    """Normalize legacy fields (bookmaker -> brand)."""
    out = dict(old)
    if not out.get("brand") and out.get("bookmaker"):
        out["brand"] = out["bookmaker"]
    out.pop("bookmaker", None)
    return out


def reindex_category(category: str, matchers: list[tuple[str, re.Pattern[str]]]) -> dict:
    files = collect_files(category)
    existing = load_existing_index(category)
    images = []
    for filename, path in files:
        old = migrate_entry(existing.get(filename, {}))
        brand = detect_brand(filename, matchers) or old.get("brand")
        width = old.get("width")
        height = old.get("height")
        if (width is None or height is None) and path:
            width, height = image_dims(path, filename)

        theme = detect_theme(filename, category)
        if old.get("theme") and old.get("theme") != "generic" and theme == "generic":
            theme = old["theme"]

        img_type = old.get("type") or detect_type(filename, width, height)
        if not img_type:
            img_type = detect_type(filename, width, height)

        quality = old.get("quality") or score_quality(width, height, img_type, brand is not None)
        usable, reason = usability(filename, brand, theme, width, height, img_type)

        entry = {
            "file": filename,
            "brand": brand,
            "type": img_type,
            "theme": theme,
            "width": width,
            "height": height,
            "quality": quality,
            "usable": usable,
        }
        if path and category == "reviews":
            if path.parent == WEB / "imgs":
                entry["path"] = "legacy:01.RAW/web-clips/imgs/"
        if reason:
            entry["reason"] = reason
        if filename.endswith("-screenshot.png") or old.get("source") == "firecrawl-batch":
            entry["source"] = "firecrawl-batch"
        images.append(entry)

    usable_count = sum(1 for i in images if i["usable"])
    index = {
        "generated_at": TODAY,
        "category": category,
        "schema_version": 2,
        "total_images": len(images),
        "usable_images": usable_count,
        "legacy_note": (
            "Physical review assets may live in 01.RAW/web-clips/imgs/ (legacy flat folder)."
            if category == "reviews"
            else None
        ),
        "images": images,
    }
    if index["legacy_note"] is None:
        del index["legacy_note"]

    out_dir = WEB / category / "imgs"
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / "_index.json"
    tmp = out_path.with_suffix(".json.tmp")
    tmp.write_text(json.dumps(index, indent=2, ensure_ascii=False), encoding="utf-8")
    tmp.replace(out_path)

    return {
        "category": category,
        "total": len(images),
        "usable": usable_count,
        "ignored": len(images) - usable_count,
        "brands": Counter(i["brand"] for i in images if i["usable"] and i["brand"]),
        "themes": Counter(i["theme"] for i in images if i["usable"]),
        "ignore_reasons": Counter(i.get("reason", "?") for i in images if not i["usable"]),
    }


def main() -> None:
    brands = load_canonical_brands()
    matchers = build_brand_matcher(brands)
    per_cat = []
    total = usable = 0
    all_brands: Counter[str] = Counter()
    all_themes: Counter[str] = Counter()
    all_ignore: Counter[str] = Counter()

    for cat in CATEGORIES:
        stats = reindex_category(cat, matchers)
        per_cat.append(stats)
        total += stats["total"]
        usable += stats["usable"]
        all_brands.update(stats["brands"])
        all_themes.update(stats["themes"])
        all_ignore.update(stats["ignore_reasons"])
        print(
            f"batch {len(per_cat)}/{len(CATEGORIES)} complete — "
            f"{cat}: {stats['total']} images, {stats['usable']} usable",
            flush=True,
        )

    report = {
        "generated_at": TODAY,
        "schema_version": 2,
        "brands_canonical": len(brands),
        "categories": len(CATEGORIES),
        "total_images": total,
        "usable_images": usable,
        "ignored_images": total - usable,
        "by_category": {
            s["category"]: {
                "total": s["total"],
                "usable": s["usable"],
                "ignored": s["ignored"],
            }
            for s in per_cat
        },
        "by_brand": dict(all_brands.most_common()),
        "top_themes": dict(all_themes.most_common(15)),
        "ignore_reasons": dict(all_ignore.most_common()),
        "brands_with_usable_assets": len(all_brands),
        "brands_without_assets": sorted(set(brands) - set(all_brands.keys())),
    }

    report_path = WEB / "_reaudit-report.json"
    report_path.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")

    # Per-category mini reports for reviews compatibility
    reviews_stats = next(s for s in per_cat if s["category"] == "reviews")
    mini = {
        "generated_at": TODAY,
        "total": reviews_stats["total"],
        "usable": reviews_stats["usable"],
        "ignored": reviews_stats["ignored"],
        "by_bookmaker": dict(reviews_stats["brands"].most_common()),
        "top_themes": dict(reviews_stats["themes"].most_common(10)),
        "ignore_reasons": dict(reviews_stats["ignore_reasons"].most_common()),
    }
    (WEB / "reviews" / "imgs" / "_reindex-report.json").write_text(
        json.dumps(mini, indent=2, ensure_ascii=False), encoding="utf-8"
    )

    print(json.dumps(report, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
