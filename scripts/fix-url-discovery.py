#!/usr/bin/env python3
"""Apply fix-url.md rules to 01.RAW/discovery/ URL lists."""

from __future__ import annotations

import csv
import json
import re
from collections import Counter, defaultdict
from pathlib import Path
from typing import Optional
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
DISCOVERY = ROOT / "01.RAW/discovery"
FIX = ROOT / "fix-url.md"

# Slugs that are section indexes, not brands
IGNORE_SLUGS = {
    "recenzii",
    "recenzie",
    "recenzii",
    "pareri",
    "case-de-pariuri",
    "bookmaker-awards",
    "diverse",
    "home-page",
    "agentii",
    "recenzii",
    "calendar-vara-betano",
}

STRIP_PREFIXES = (
    "casa-de-pariuri-online-",
    "casa-de-pariuri-",
    "agentia-",
    "pareri-",
    "discutii-si-pareri-despre-",
)

STRIP_SUFFIXES = (
    "-pareri-casino",
    "-pariuri-sportive",
    "-sportsbook",
    "-pariuri",
    "-pareri",
    "-recenzii",
    "-recenzie",
    "-romania",
    "-palace",
    "-casino",
    "-sport",
    "-online",
    "-10-lucruri-pe-care-trebuie-sa-le-stii-inainte-de-a-paria-aici",
    "-10-lucruri-pe-care-trebuie-sa-le-stii-inainte-de-a-paria-aici",
)

# biletu-zilei.com/{slug} — only these root paths are brand pages
BILETU_ROOT_BRANDS = {"netbet", "winmasters"}

REVIEW_EXTRACTORS = [
  (re.compile(r"beturi\.ro/recenzie/([^/?#]+)"), 1),
  (re.compile(r"pariuriexpert\.ro/recenzie/([^/?#]+)"), 1),
  (re.compile(r"pariurix\.com/agentii/recenzii/([^/?#]+)"), 1),
  (re.compile(r"xbets\.ro/agentie/([^/?#]+)"), 1),
  (re.compile(r"biletu-zilei\.com/recenzii/([^/?#]+)"), 1),
  (re.compile(r"10pariuri\.ro/([^/]+)-pariuri$"), 1),
  (re.compile(r"10pariuri\.ro/case-de-pariuri/recenzii/([^/?#]+)"), 1),
  (re.compile(r"10pariuri\.ro/\d+-lucruri-pe-care-trebuie-sa-le-stii-inainte-de-a-paria-la-([^/?#]+)"), 1),
]


def parse_fix_url_md(path: Path) -> dict[str, list[str]]:
    text = path.read_text(encoding="utf-8")
    sections: dict[str, list[str]] = {}
    current = None
    for line in text.splitlines():
        line = line.strip()
        if not line:
            continue
        if line.startswith("http"):
            if current:
                sections.setdefault(current, []).append(line)
            continue
        low = line.lower()
        if "оффлайн" in low or "stradale" in low or "уличн" in low:
            current = "retail"
        elif "рейтинг" in low and "промокод" not in low:
            current = "ratings"
        elif "промокод" in low:
            current = "bonuses"
        elif "отзывы игроков" in low:
            current = "player-reviews"
        elif "бонусы букмекеров" in low:
            current = "bonuses"
        elif "гайды" in low or "биржу" in low:
            current = "guides"
        elif "бонусов огромный" in low:
            current = None
    return sections


def load_csv(path: Path) -> dict[str, dict]:
    rows = {}
    with path.open(encoding="utf-8") as f:
        for row in csv.DictReader(f):
            rows[row["url"]] = row
    return rows


def normalize_brand_slug(raw: str) -> Optional[str]:
    s = raw.lower().replace(".html", "").strip("/-")
    if not s or s in IGNORE_SLUGS:
        return None

    for prefix in STRIP_PREFIXES:
        if s.startswith(prefix):
            s = s[len(prefix) :]

    changed = True
    while changed:
        changed = False
        for suffix in sorted(STRIP_SUFFIXES, key=len, reverse=True):
            if s.endswith(suffix):
                s = s[: -len(suffix)]
                changed = True
                break

    s = s.strip("/-")
    if not s or s in IGNORE_SLUGS or len(s) < 2:
        return None
    return s


def extract_raw_slugs_from_url(url: str) -> list[str]:
    low = url.lower()
    found: list[str] = []

    for pattern, group in REVIEW_EXTRACTORS:
        m = pattern.search(low)
        if m:
            found.append(m.group(group))

    path = urlparse(low).path.strip("/")
    if not path:
        return found

    host = urlparse(low).netloc.replace("www.", "")
    segments = path.split("/")

    if host == "biletu-zilei.com" and len(segments) == 1 and segments[0] in BILETU_ROOT_BRANDS:
        found.append(segments[0])

    return found


def build_brand_index(review_urls: list[str]) -> dict[str, set[str]]:
    """canonical slug -> all URL tokens used for matching bonuses."""
    index: dict[str, set[str]] = defaultdict(set)

    for url in review_urls:
        for raw in extract_raw_slugs_from_url(url):
            canon = normalize_brand_slug(raw)
            if not canon:
                continue
            index[canon].add(canon)
            clean_raw = raw.lower().replace(".html", "").strip("/-")
            if clean_raw:
                index[canon].add(clean_raw)
            for part in re.split(r"[-_]", canon):
                if len(part) >= 4:
                    index[canon].add(part)

    return dict(index)


def token_in_path(token: str, path: str) -> bool:
    token = token.strip("/").lower()
    if len(token) < 2:
        return False
    if len(token) <= 3:
        return bool(re.search(rf"(^|[/\-_.]){re.escape(token)}([/\-_.]|$)", path))
    return bool(re.search(rf"(^|[/\-_.]){re.escape(token)}", path))


def match_brand_in_url(url: str, brand_index: dict[str, set[str]]) -> Optional[str]:
    path = urlparse(url.lower()).path
    best: Optional[tuple[int, str]] = None

    for canon, tokens in brand_index.items():
        for token in sorted(tokens, key=len, reverse=True):
            if token_in_path(token, path):
                score = len(token)
                if best is None or score > best[0]:
                    best = (score, canon)

    return best[1] if best else None


def apply_pattern_rules(url: str, category: str) -> str:
    low = url.lower()

    if "/agentii/stradale" in low or "/agentii-stradale" in low:
        return "retail"
    if re.search(r"10pariuri\.ro/pareri(/|$)", low):
        return "player-reviews"
    if "/coduri-bonus/" in low or "/cod-bonus" in low or "/cod-promo" in low:
        return "bonuses"
    if "/case-pariuri-oferte/" in low:
        return "bonuses"

    return category


def write_txt(path: Path, category: str, urls: list[str], extra: str = "") -> None:
    with path.open("w", encoding="utf-8") as f:
        f.write(f"# {category} — {len(urls)} URLs{extra}\n\n")
        for u in sorted(urls):
            f.write(u + "\n")


def main() -> None:
    manual = parse_fix_url_md(FIX)
    rows = load_csv(DISCOVERY / "urls-all.csv")

    moves = Counter()

    # 1) Manual overrides from fix-url.md
    for cat, urls in manual.items():
        for url in urls:
            if url in rows:
                old = rows[url]["category"]
                rows[url]["category"] = cat
                if old != cat:
                    moves[f"manual:{old}->{cat}"] += 1
            else:
                host = urlparse(url).netloc.replace("www.", "")
                source = host.split(".")[0]
                rows[url] = {
                    "url": url,
                    "category": cat,
                    "source_site": source,
                    "title": "",
                    "topic_key": "",
                    "brand": "",
                }
                moves["manual:new"] += 1

    # 2) Pattern rules
    for url, row in rows.items():
        old = row["category"]
        new = apply_pattern_rules(url, old)
        if new != old:
            row["category"] = new
            moves[f"pattern:{old}->{new}"] += 1

    # 3) Extract ALL unique brands from review URLs (no 04.BRANDS limit)
    review_urls = [u for u, r in rows.items() if r["category"] == "reviews"]
    brand_index = build_brand_index(review_urls)

    # 4) Re-split bonuses: merge prior bonuses-unused back first
    bonuses_all = [
        u
        for u, r in rows.items()
        if r["category"] in ("bonuses", "bonuses-unused")
    ]
    for url in bonuses_all:
        rows[url]["category"] = "bonuses"
        rows[url]["brand"] = ""

    bonuses_used: list[str] = []
    bonuses_unused: list[str] = []

    for url in bonuses_all:
        brand = match_brand_in_url(url, brand_index)
        if brand:
            rows[url]["category"] = "bonuses"
            rows[url]["brand"] = brand
            bonuses_used.append(url)
        else:
            rows[url]["category"] = "bonuses-unused"
            rows[url]["brand"] = ""
            bonuses_unused.append(url)

    # 5) Write files
    by_cat: dict[str, list[str]] = defaultdict(list)
    for url, row in rows.items():
        by_cat[row["category"]].append(url)

    cats = [
        "reviews",
        "bonuses",
        "bonuses-unused",
        "guides",
        "ratings",
        "sport-categories",
        "apps",
        "payments",
        "uncategorized",
        "retail",
        "player-reviews",
    ]
    for cat in cats:
        urls = sorted(by_cat.get(cat, []))
        extra = ""
        if cat == "bonuses-unused":
            extra = " (branduri fără recenzie în discovery)"
        write_txt(DISCOVERY / f"urls-{cat}.txt", cat, urls, extra=extra)

    with (DISCOVERY / "urls-all.csv").open("w", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        w.writerow(["url", "category", "source_site", "title", "topic_key", "brand"])
        for url in sorted(rows):
            r = rows[url]
            w.writerow(
                [
                    url,
                    r["category"],
                    r.get("source_site", ""),
                    r.get("title", ""),
                    r.get("topic_key", ""),
                    r.get("brand", ""),
                ]
            )

    review_brand_counts = Counter()
    review_url_brands: dict[str, str] = {}
    for u in review_urls:
        b = match_brand_in_url(u, brand_index)
        if b:
            review_brand_counts[b] += 1
            review_url_brands[u] = b

    brand_details = {
        canon: {
            "review_urls": len([u for u, b in review_url_brands.items() if b == canon]),
            "match_tokens": sorted(tokens),
        }
        for canon, tokens in sorted(brand_index.items())
    }

    report = {
        "moves": dict(moves),
        "counts": {c: len(by_cat.get(c, [])) for c in cats},
        "review_brands_total": len(brand_index),
        "review_brands": sorted(brand_index.keys()),
        "review_brand_counts": dict(review_brand_counts.most_common()),
        "bonuses_used": len(bonuses_used),
        "bonuses_unused": len(bonuses_unused),
    }
    (DISCOVERY / "fix-url-report.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (DISCOVERY / "brands-from-reviews.json").write_text(
        json.dumps(
            {
                "source": "extracted from urls-reviews (all unique slugs, no 04.BRANDS limit)",
                "brands_total": len(brand_index),
                "brands": sorted(brand_index.keys()),
                "counts_per_brand": dict(review_brand_counts.most_common()),
                "brand_details": brand_details,
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )

    dr_path = DISCOVERY / "discovery-report.json"
    if dr_path.exists():
        dr = json.loads(dr_path.read_text(encoding="utf-8"))
        dr["fix_url_applied"] = "2026-07-13"
        dr["by_category"] = {c: report["counts"][c] for c in cats if c != "bonuses-unused"}
        dr["by_category"]["bonuses_used"] = report["bonuses_used"]
        dr["by_category"]["bonuses_unused"] = report["bonuses_unused"]
        dr["review_brands_total"] = report["review_brands_total"]
        dr["review_brands"] = report["review_brands"]
        dr_path.write_text(json.dumps(dr, ensure_ascii=False, indent=2), encoding="utf-8")

    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
