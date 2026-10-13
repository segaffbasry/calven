#!/usr/bin/env bash
# Downloads the homepage imagery (from ocura.co.uk, per the brief) and the Federo font.
# Ocura's HTML sits behind a JS challenge, so the image URLs were read from the live
# homepage in a real browser (13 Oct 2026); the asset CDN itself answers plain requests.
set -euo pipefail
cd "$(dirname "$0")/.."
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
BASE="https://ocura.co.uk/assets/images"
mkdir -p media-src public/fonts
get() { curl -sfL -A "$UA" "$BASE/$1" -o "media-src/$2" && echo "ok   $2" || echo "MISS $2 <- $1"; }

# Hero (homepage banner) and range photography (homepage tabs, 1196px transforms)
get "_5090x2148_crop_center-center_75_none/113622/Homepage-Arvada-2-room-2.webp" hero-room.webp
get "Boston-application.jpg"                     range-recliners.jpg
get "Clini-cart-WhippsCrossMaternity_019.jpg"    range-trolleys.jpg
get "Thurrock-CDC-Odessa-beam.jpg"               range-beam.jpg
get "Clini-Store-Apollo-U-in-situ.jpg"           range-cabinets.jpg
get "CA3253-Teal-Room-Render.jpg"                range-bedside.jpg
get "Armana-Reception-in-situ.jpg"               range-soft.jpg
# Feature film still and case-study photograph
# The homepage banner still (Homepage-Banner-Video.png) has a play button baked in, so the feature uses this instead:
get "MR_191105_Colchester_0016.jpg"            feature-clinic.jpg
get "_1200x800_crop_center-center_95_none/120066/SDEC9-edit.jpg"         space-sdec.jpg
# Product cut-outs (express range strip)
for f in Ocura-Medical-Furniture-product-Arvada-02.jpg dominica.jpg CA3581-Stainless-Steel-Pole-4-hook-main.jpg CA2110-Odessa-Atlantic.jpg Over-Bed-Table-CA4860-5450.jpg boston.jpg; do get "$f" "cut-$f"; done
# Six principles carousel
get "equality.jpg" principle-equality.jpg
get "_280x280_crop_center-center_none/2350/Economic-6e-Slideshow-image_2022-08-11-103257_byxe.webp" principle-economic.webp
get "_280x280_crop_center-center_none/118838/CA1991-Nottingham-Manual-Recliner-replaceable-components.webp" principle-environmental.webp
get "Slough-Community-Diagnostic-Centre-Equala-19.jpg" principle-ergonomic.jpg
get "Arvada-2/_280x280_crop_center-center_none/126831/Arvada-2-Removable-Seat-Cushion.webp" principle-efficient.webp
get "Newmarket-CDC-Verona.jpg" principle-easy.jpg

# Federo Regular (Cyreal, SIL OFL 1.1): the wordmark face named in the Calven brand notes
curl -sfL "https://github.com/google/fonts/raw/main/ofl/federo/Federo-Regular.ttf" -o public/fonts/Federo-Regular.ttf && echo "ok   Federo"

# Web subsets (latin) from Google Fonts: Federo for headlines, Plus Jakarta Sans (variable 200-800) for body
curl -sfL "https://fonts.gstatic.com/s/federo/v20/iJWFBX-cbD_ETsbWilmf-2fW7A.woff2" -o public/fonts/federo-latin.woff2 && echo "ok   federo woff2"
curl -sfL "https://fonts.gstatic.com/s/plusjakartasans/v12/LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko20yygg_vb.woff2" -o public/fonts/plus-jakarta-sans-latin.woff2 && echo "ok   jakarta woff2"
