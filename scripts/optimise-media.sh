#!/usr/bin/env bash
# Resizes media-src/ originals into public/media/ as WebP (sips to resize, cwebp to encode). Run after fetch-media.sh.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p public/media .tmp-media
out() { # src, dest name, max width, quality
  local tmp=".tmp-media/$2.png"
  sips -s format png --resampleWidth "$3" "media-src/$1" --out "$tmp" >/dev/null
  cwebp -quiet -q "$4" "$tmp" -o "public/media/$2.webp"
  echo "$(sips -g pixelWidth -g pixelHeight "$tmp" | awk '/pixel/{printf $2" "}') public/media/$2.webp"
}
out hero-room.webp            hero              2400 78
out range-recliners.jpg       range-recliners   1400 76
out range-bedside.jpg         range-bedside     1400 76
out range-beam.jpg            range-beam        1400 76
out range-soft.jpg            range-soft        1400 76
out range-trolleys.jpg        range-trolleys    1400 76
out range-cabinets.jpg        range-cabinets    1400 76
out feature-clinic.jpg        feature           1800 78
out principle-equality.jpg    guide-comfort      537 82
out space-sdec.jpg            guide-workflow    1000 78
out principle-easy.jpg        guide-upkeep      1000 78
for f in Ocura-Medical-Furniture-product-Arvada-02 dominica CA3581-Stainless-Steel-Pole-4-hook-main CA2110-Odessa-Atlantic Over-Bed-Table-CA4860-5450 boston; do
  out "cut-$f.jpg" "cut-$(echo "$f" | tr 'A-Z' 'a-z' | sed -E 's/ocura-medical-furniture-product-//; s/-0?2$//; s/^ca[0-9]+-//; s/-ca4860-5450//; s/-4-hook-main//')" 800 80
done
rm -rf .tmp-media
