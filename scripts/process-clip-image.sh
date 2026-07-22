#!/usr/bin/env bash
# process-clip-image.sh — uniquify clip images for PBN sites
# Usage: bash scripts/process-clip-image.sh <source> <bookmaker> <type> <variant> <seo-keyword>
# Requires: magick (ImageMagick), cwebp; exiftool optional
set -euo pipefail

SRC="${1:?source path}"
BOOKIE="${2:?bookmaker slug}"
TYPE="${3:?image type}"
VARIANT="${4:?1-5}"
KEYWORD="${5:?seo-keyword}"

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RAND="$(openssl rand -hex 2 2>/dev/null || echo $((RANDOM % 9999)))"
SAFE_KW="$(echo "$KEYWORD" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9ăâîșț-]/-/g' | tr -s '-' | sed 's/^-//;s/-$//')"
OUT_DIR="$ROOT/07.SITES/site-0${VARIANT}-ro/public/images/${BOOKIE}"
mkdir -p "$OUT_DIR"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# Logo path: PNG lossless, no frame
if [[ "$TYPE" == "logo" ]]; then
  OUT="$OUT_DIR/${BOOKIE}-logo-${SAFE_KW}-${RAND}.png"
  magick "$SRC" -strip -resize '300x300>' "$OUT"
  if command -v exiftool >/dev/null 2>&1; then
    exiftool -all= -overwrite_original "$OUT" >/dev/null 2>&1 || true
  fi
  echo "$OUT"
  exit 0
fi

case "$VARIANT" in
  1) WIDTH=1200; QUALITY=85; FRAME='#d97706'; FRAME_W=8 ;;
  2) WIDTH=1100; QUALITY=88; FRAME='#1e3a8a'; FRAME_W=6 ;;
  3) WIDTH=1000; QUALITY=82; FRAME=''; FRAME_W=0 ;;
  4) WIDTH=1150; QUALITY=90; FRAME=''; FRAME_W=0 ;;
  5) WIDTH=1080; QUALITY=85; FRAME=''; FRAME_W=0 ;;
  *) echo "Unknown variant: $VARIANT" >&2; exit 1 ;;
esac

WORK="$TMP/work.png"
# Full-page Firecrawl screenshots are often extremely tall — crop top viewport first
H=$(magick identify -format '%h' "$SRC" 2>/dev/null || echo 0)
W=$(magick identify -format '%w' "$SRC" 2>/dev/null || echo 0)
if [[ "$H" -gt 2000 && "$W" -gt 0 ]]; then
  magick "$SRC" -strip -crop "${W}x1100+0+0" +repage "$WORK"
else
  magick "$SRC" -strip "$WORK"
fi
magick "$WORK" -resize "${WIDTH}x${WIDTH}>" "$WORK"

case "$VARIANT" in
  1)
    magick "$WORK" -bordercolor "$FRAME" -border "${FRAME_W}" "$WORK"
    ;;
  2)
    H=$(magick identify -format '%h' "$WORK")
    CROP=$(( H * 5 / 100 ))
    magick "$WORK" -crop "100%x$((100-5))+0+${CROP}" +repage \
      -bordercolor "$FRAME" -border "${FRAME_W}" "$WORK"
    ;;
  3)
    magick "$WORK" \( +clone -alpha extract -draw 'fill black polygon 0,0 0,20 20,0 fill white circle 20,20 20,0' \
      \( +clone -flip \) -compose Multiply -composite \
      \( +clone -flop \) -compose Multiply -composite \) \
      -alpha off -compose CopyOpacity -composite -background none -flatten "$WORK" 2>/dev/null \
      || magick "$WORK" -resize "${WIDTH}x" "$WORK"
    ;;
  4)
    magick "$WORK" -fill 'rgba(0,0,0,0.35)' -draw "rectangle 0,0 $WIDTH,80" \
      -fill 'rgba(0,0,0,0.35)' -draw "rectangle 0,%[fx:h-80] $WIDTH,%[fx:h]" "$WORK" 2>/dev/null \
      || true
    ;;
  5)
    MOCK="$ROOT/06.DESIGN/mockup-laptop.png"
    if [[ -f "$MOCK" ]]; then
      magick "$MOCK" "$WORK" -gravity center -compose over -composite "$WORK"
    fi
    ;;
esac

OUT="$OUT_DIR/${BOOKIE}-${TYPE}-${SAFE_KW}-${RAND}.webp"
cwebp -q "$QUALITY" "$WORK" -o "$OUT" >/dev/null
# Enforce ~200KB soft target: recompress if huge
SIZE=$(wc -c < "$OUT" | tr -d ' ')
if (( SIZE > 220000 )); then
  cwebp -q $((QUALITY - 10)) "$WORK" -o "$OUT" >/dev/null
fi

if command -v exiftool >/dev/null 2>&1; then
  exiftool -all= -overwrite_original "$OUT" >/dev/null 2>&1 || true
fi

echo "$OUT"
