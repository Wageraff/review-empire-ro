#!/usr/bin/env python3
"""Stage 2: find review clips per brand, refresh P1 metadata, report gaps."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BRANDS_DIR = ROOT / "04.BRANDS"
WIKI_BRANDS = ROOT / "02.WIKI/brands"
REVIEWS = ROOT / "01.RAW/web-clips/reviews"
MANIFEST = ROOT / "03.SEO/_stage2-brands-manifest.json"

P1_LINEUP = [
    "betano", "superbet", "unibet", "fortuna", "casa-pariurilor", "vbet", "maxbet",
    "topbet", "favbet", "getsbet", "stanleybet", "winbet", "betfair", "totogaming",
    "12xbet", "don-ro", "888sport", "netbet", "pokerstars", "winmasters",
]

FLAGS = {
    "12xbet": {"guide_synthesis_needed": True, "pariuri_secondary": True},
    "stanleybet": {"guide_synthesis_needed": True},
    "vbet": {"pariuri_secondary": True},
    "don-ro": {"pariuri_secondary": True},
    "888sport": {"pariuri_secondary": True},
    "topbet": {"pariuri_secondary": True},
}

DATA_READY_FALSE = {
    "hotspins", "jokercasino", "kingcasino", "million", "playgg", "redsevens",
}

STAGE1_LINKS = """
## Legături wiki (Stage 1)

- Bonusuri: [[bonuses/bonus-de-bun-venit]], [[bonuses/fara-depunere]], [[bonuses/pariu-fara-risc]]
- Plăți: [[payments/carduri-bancare]], [[payments/paysafecard]], [[payments/skrill]]
- App: [[apps/aplicatie-android]], [[apps/aplicatie-ios]], [[apps/live-betting-mobil]]
- Sport: [[sports/fotbal]], [[sports/tenis]], [[sports/baschet]]
- Ghiduri: [[guides-concepts/live-betting]], [[guides-concepts/cash-out]], [[guides-concepts/rulaj-rollover]]
"""


def slug_tokens(slug: str) -> list[str]:
    base = slug.replace("-", "")
    return list({slug, slug.replace("-", ""), base})


def find_clips(slug: str) -> list[Path]:
    tokens = slug_tokens(slug)
    hits = []
    for f in REVIEWS.glob("*.md"):
        name = f.name.lower()
        fm_brand = ""
        try:
            text = f.read_text(encoding="utf-8", errors="ignore")[:2000]
            m = re.search(r"^brand:\s*(.+)$", text, re.M)
            if m:
                fm_brand = m.group(1).strip().lower()
        except OSError:
            continue
        if any(t in name or t in fm_brand.replace("-", "") for t in tokens):
            hits.append(f)
    return sorted(hits, key=lambda p: p.stat().st_size, reverse=True)


def refresh_p1(path: Path, slug: str) -> bool:
    text = path.read_text(encoding="utf-8")
    if "updated: 2026-07-14" in text and "Legături wiki (Stage 1)" in text:
        return False
    text = re.sub(r"updated: \d{4}-\d{2}-\d{2}", "updated: 2026-07-14", text, count=1)
    flags = FLAGS.get(slug, {})
    if flags and "guide_synthesis_needed" not in text:
        block = "\n# Stage 2 flags\n"
        for k, v in flags.items():
            block += f"{k}: {str(v).lower()}\n"
        text = text.replace("\n---\n\n#", block + "\n---\n\n#", 1)
    if "Legături wiki (Stage 1)" not in text:
        text = text.rstrip() + "\n" + STAGE1_LINKS
    path.write_text(text, encoding="utf-8")
    return True


def main() -> None:
    manifest = json.loads(MANIFEST.read_text())
    report = {"p1_refreshed": [], "p1_skipped": [], "clip_counts": {}}
    for slug in P1_LINEUP:
        clips = find_clips(slug)
        report["clip_counts"][slug] = len(clips)
        p = BRANDS_DIR / f"{slug}.md"
        if p.exists():
            if refresh_p1(p, slug):
                report["p1_refreshed"].append(slug)
            else:
                report["p1_skipped"].append(slug)
    out = ROOT / "03.SEO/_stage2-batch1-report.json"
    out.write_text(json.dumps(report, indent=2, ensure_ascii=False))
    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
