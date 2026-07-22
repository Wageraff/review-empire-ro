#!/usr/bin/env python3
"""Stage 0 data audit — fast scan, writes summary to stdout."""
import json, re, sys
from pathlib import Path
from collections import defaultdict, Counter

ROOT = Path(__file__).resolve().parents[1]
WEB = ROOT / "01.RAW/web-clips"
AUDIT = json.loads((ROOT / "03.SEO/_audit-stage5-final.json").read_text())
BRANDS_JSON = json.loads((ROOT / "01.RAW/discovery/brands-from-reviews.json").read_text())
BRANDS_DIR = ROOT / "04.BRANDS"

BRAND_RE = re.compile(r"^brand:\s*(.+)$", re.M)


def brand_from_file(path: Path):
    head = path.read_bytes()[:2048].decode("utf-8", errors="ignore")
    m = BRAND_RE.search(head)
    if m:
        return m.group(1).strip().strip('"').strip("'")
    return None


def title_from_file(path: Path) -> str:
    head = path.read_bytes()[:2048].decode("utf-8", errors="ignore")
    m = re.search(r"^title:\s*(.+)$", head, re.M)
    return (m.group(1).strip().strip('"').strip("'") if m else "").lower()


def scan_text(path: Path) -> str:
    return (path.stem + " " + title_from_file(path)).lower()


def match_any(text: str, kws: list[str]) -> bool:
    return any(kw in text for kw in kws)


# --- brands ---
discovery_brands = BRANDS_JSON["brands"]
audit_brands: set[str] = set()
p1_brands: set[str] = set()
p1p2: set[str] = set()
for p in AUDIT["pages"]:
    b = p.get("brand")
    if not b:
        continue
    audit_brands.add(b)
    pr = p.get("priority", "P3")
    if pr == "P1":
        p1_brands.add(b)
    if pr in ("P1", "P2"):
        p1p2.add(b)

existing = {f.stem for f in BRANDS_DIR.glob("*.md")}
p2_only = p1p2 - p1_brands

# --- clip inventory (single pass per category) ---
cats = [
    "reviews", "bonuses", "guides", "ratings", "sport-categories",
    "apps", "payments", "player-reviews", "retail",
]
cat_totals: Counter[str] = Counter()
brand_clips: dict[str, Counter] = defaultdict(Counter)
review_by_slug: Counter[str] = Counter()

for cat in cats:
    d = WEB / cat
    if not d.exists():
        continue
    for f in d.glob("*.md"):
        cat_totals[cat] += 1
        b = brand_from_file(f)
        if b:
            brand_clips[b][cat] += 1
        if cat == "reviews":
            t = scan_text(f)
            for slug in audit_brands:
                s = slug.replace("-", "")
                if slug in t or s in t.replace("-", ""):
                    review_by_slug[slug] += 1

review_status = {
    p["brand"]: p
    for p in AUDIT["pages"]
    if p.get("type") == "REVIEW" and p.get("brand")
}

# --- concept patterns ---
bonus_pats = {
    "bonus-de-bun-venit": ["bun-venit", "bun venit", "welcome"],
    "fara-depunere": ["fara-depunere", "fără-depunere", "fara depunere", "no-deposit"],
    "cashback": ["cashback"],
    "rotiri-gratuite": ["rotiri-gratuite", "rotiri gratuite", "free spins"],
    "pariu-fara-risc": ["fara-risc", "freebet", "free-bet", "free bet"],
    "incarcare": ["reload", "incarcare", "încărcare", "reincarcare"],
    "vip-loialitate": ["vip", "loialitate", "loyalty"],
    "cod-promo": ["cod-bonus", "cod bonus", "cod-promo", "coduri bonus"],
    "refer-a-friend": ["refer", "recomanda", "prieten"],
    "bonus-liga-1": ["liga-1", "liga 1"],
    "bonus-aniversar": ["aniversar", "ziua ta"],
    "cote-marite": ["cote-marite", "cote mărite", "cota marita"],
}

guide_pats = {
    "cota": ["cota", "cote", "coeficient"],
    "rulaj-rollover": ["rulaj", "rollover"],
    "value-betting": ["value-bet", "value bet", "valoare"],
    "martingale": ["martingale"],
    "bankroll": ["bankroll"],
    "kelly-criterion": ["kelly"],
    "pariuri-1x2": ["1x2", "1-x-2", "solist"],
    "pariuri-handicap": ["handicap"],
    "pariuri-over-under": ["over-under", "over under", "peste-sub", "sub-peste"],
    "live-betting": ["pariuri-live", "live-betting", "in-direct"],
    "cash-out": ["cash-out", "cashout", "cash out"],
    "pariuri-multiple": ["multiplu", "multiple", "bilet", "accumulator", "sistem"],
    "draw-no-bet": ["dnb", "draw-no-bet", "draw no bet"],
    "pariu-sansa-dubla": ["sansa-dubla", "șansă-dubla", "double-chance", "sansa dubla"],
}

sport_pats = {
    "fotbal": ["fotbal", "liga-1", "liga-2", "champions"],
    "tenis": ["tenis", "wimbledon", "atp", "wta"],
    "baschet": ["baschet", "nba"],
    "handbal": ["handbal"],
    "hochei": ["hochei", "hockey"],
    "formula-1": ["formula-1", "f1-", "motogp"],
    "esports": ["esport", "esports", "dota", "cs-go", "csgo"],
    "volei": ["volei"],
    "rugby": ["rugby"],
    "mma": ["mma", "ufc", "box-"],
}

pay_pats = {
    "netopia": ["netopia"],
    "mobilpay": ["mobilpay", "mobil-pay"],
    "skrill": ["skrill"],
    "neteller": ["neteller"],
    "paysafecard": ["paysafecard", "paysafe"],
    "carduri-bancare": ["visa", "mastercard", "card-bancar", "carduri"],
    "transfer-bancar": ["transfer-bancar", "transfer bancar"],
    "criptomonede": ["crypto", "bitcoin", "ethereum"],
    "paypal": ["paypal"],
    "revolut": ["revolut"],
    "aircash": ["aircash"],
    "apple-pay": ["apple-pay", "apple pay"],
    "google-pay": ["google-pay", "google pay"],
    "okto": ["okto"],
}

app_pats = {
    "aplicatie-android": ["android", "apk"],
    "aplicatie-ios": ["ios", "app-store", "iphone"],
    "live-betting-mobil": ["live", "mobil", "mobile"],
    "cash-out-mobil": ["cash-out", "cashout"],
    "securitate-mobil": ["secur", "sigur"],
    "notificari-mobil": ["notific", "push"],
}


def count_patterns(directory: Path, patterns: dict[str, list[str]]) -> dict[str, int]:
    hits = {k: 0 for k in patterns}
    if not directory.exists():
        return hits
    for f in directory.glob("*.md"):
        text = scan_text(f)
        for slug, kws in patterns.items():
            if match_any(text, kws):
                hits[slug] += 1
    return hits


# --- output ---
print("=== CLIPS BY CATEGORY ===")
for c in cats:
    print(f"  {c:20} {cat_totals.get(c, 0):5}")

print("\n=== BRAND UNIVERSE ===")
print(f"  discovery brands: {len(discovery_brands)}")
print(f"  audit brands: {len(audit_brands)}")
print(f"  P1 brands: {len(p1_brands)}")
print(f"  P2-only brands: {len(p2_only)}")
print(f"  P1+P2 dossier scope: {len(p1p2)}")
print(f"  P3-only (skip dossier): {len(audit_brands - p1p2)}")
print(f"  04.BRANDS existing: {len(existing)}")
print(f"  NEW dossiers to create: {len(p1p2 - existing)}")
print(f"  UPDATE existing dossiers: {len(p1p2 & existing)}")

full_p1p2, partial_p1p2, stub_p1p2 = [], [], []
for b in sorted(p1p2):
    rc = brand_clips.get(b, Counter())
    rev = max(rc.get("reviews", 0), review_by_slug.get(b, 0))
    tot = sum(rc.values())
    dr = b in existing
    rs = review_status.get(b, {})
    if dr and rev >= 1 and rs.get("data_ready"):
        full_p1p2.append(b)
    elif rev >= 1 or tot >= 2:
        partial_p1p2.append(b)
    else:
        stub_p1p2.append(b)

with_review = sum(
    1 for b in audit_brands
    if max(brand_clips.get(b, Counter()).get("reviews", 0), review_by_slug.get(b, 0)) > 0
)
with_any = sum(1 for b in audit_brands if sum(brand_clips.get(b, Counter()).values()) > 0)

print("\n=== 92 BRANDS: CLIPS + DOSSIER ===")
print(f"  with review clip: {with_review}")
print(f"  with any clip (fm brand): {with_any}")
print(f"  dossier ready (04.BRANDS): {len(existing)}")
print(f"  dossier missing: {len(audit_brands - existing)}")
print(f"  P1+P2 full: {len(full_p1p2)} | partial: {len(partial_p1p2)} | stub: {len(stub_p1p2)}")
print(f"  REVIEW data_ready: {sum(1 for v in review_status.values() if v.get('data_ready'))}/{len(review_status)}")

print("\n=== P1 LINEUP (20) ===")
for b in sorted(p1_brands):
    rc = brand_clips.get(b, Counter())
    rev = max(rc.get("reviews", 0), review_by_slug.get(b, 0))
    rs = review_status.get(b, {})
    print(
        f"  {b:18} dossier={'Y' if b in existing else 'N'} "
        f"rev={rev:2} clips={sum(rc.values()):3} ready={rs.get('data_ready')}"
    )

print("\n=== BONUS CLIPS ===")
for k, v in sorted(count_patterns(WEB / "bonuses", bonus_pats).items(), key=lambda x: -x[1]):
    print(f"  {v:3}  {k}")

print("\n=== GUIDE CONCEPTS ===")
for k, v in sorted(count_patterns(WEB / "guides", guide_pats).items(), key=lambda x: -x[1]):
    st = "OK" if v >= 2 else ("WEAK" if v else "GAP")
    print(f"  {st:4} {v:3}  {k}")

print("\n=== SPORTS ===")
sport_hits: Counter[str] = Counter()
for cat in ["guides", "sport-categories", "reviews", "ratings"]:
    for k, v in count_patterns(WEB / cat, sport_pats).items():
        sport_hits[k] += v
for k, v in sport_hits.most_common():
    print(f"  {v:3}  {k}")

print("\n=== PAYMENTS ===")
for k, v in sorted(count_patterns(WEB / "payments", pay_pats).items(), key=lambda x: -x[1]):
    print(f"  {v:3}  {k}")

print("\n=== APPS ===")
for k, v in sorted(count_patterns(WEB / "apps", app_pats).items(), key=lambda x: -x[1]):
    print(f"  {v:3}  {k}")

print("\n=== IMAGES ===")
total_imgs = 0
for cat in ["reviews", "bonuses", "guides", "ratings", "sport-categories", "apps", "payments"]:
    imgd = WEB / cat / "imgs"
    n = (
        len([x for x in imgd.glob("*") if x.suffix.lower() in (".png", ".jpg", ".jpeg", ".webp", ".gif")])
        if imgd.exists()
        else 0
    )
    idx = (imgd / "_index.json").exists()
    total_imgs += n
    print(f"  {cat:18} {n:5}  indexed={idx}")
print(f"  TOTAL: {total_imgs}")

p1_concepts = [p for p in AUDIT["pages"] if p.get("type") == "GUIDE-PAGE" and p.get("priority") == "P1"]
print(f"\n=== P1 GUIDE-PAGE audit: {len(p1_concepts)} (ready {sum(1 for p in p1_concepts if p.get('data_ready'))}) ===")

print("\n=== REVIEW COMPETITORS ===")
for c in ["legalbet", "beturi", "10pariuri", "pontul-zilei", "biletu-zilei", "pariurix", "xbets", "pariuriexpert"]:
    crawl = (ROOT / f"01.RAW/discovery/{c}/internal_all.csv").exists()
    bl = len(list((ROOT / "01.RAW/ahrefs").glob(f"*{c}*")))
    kw = len(list((ROOT / "01.RAW/ahrefs/keywords").glob(f"*{c}*")))
    print(f"  {c:15} crawl={crawl} backlinks={bl} keywords={kw}")

# write JSON for report
out = {
    "brands": {
        "discovery": len(discovery_brands),
        "audit": len(audit_brands),
        "p1": len(p1_brands),
        "p2_only": len(p2_only),
        "p1p2_scope": len(p1p2),
        "dossiers_existing": len(existing),
        "dossiers_new": len(p1p2 - existing),
        "full": full_p1p2,
        "partial": partial_p1p2,
        "stub": stub_p1p2,
    },
    "clips": dict(cat_totals),
    "bonus": count_patterns(WEB / "bonuses", bonus_pats),
    "guides": count_patterns(WEB / "guides", guide_pats),
    "sports": dict(sport_hits),
    "payments": count_patterns(WEB / "payments", pay_pats),
    "apps": count_patterns(WEB / "apps", app_pats),
    "images_total": total_imgs,
}
(ROOT / "03.SEO/_stage0-audit.json").write_text(json.dumps(out, indent=2, ensure_ascii=False))
print("\nWrote 03.SEO/_stage0-audit.json")
