# Calven Medical Supplies homepage

A private one-page demo for **Calven Medical Supplies**, a fictional brand from a Claude Design campaign. It uses
Calven's real logo, colours and campaign copy, with products and photography from ocura.co.uk. It is built with
Next.js 16 (App Router) and TypeScript, using GSAP with ScrollTrigger and CustomEase, and Lenis. There are no UI kits
or CSS frameworks.

## Run locally

Run `npm install`, then `npm run dev` (http://127.0.0.1:3055). For production, run `npm run build` and `npm start`.
`npm run typecheck` checks the TypeScript.

Deploying: Vercel detects Next.js from `package.json` at the repo root and needs no settings. The framework preset
is Next.js, the build command is `next build` and the output is `.next`.

## The single route

| Route | What it is |
| --- | --- |
| `/` | Preloader, hero, range, essentials, feature, care-space guide, enquiry, footer |

The build is static: `/` plus the framework's own `/_not-found` (and `/icon.svg`).

## Design direction

- **doctronic.ai (look, added by the client after recon):** soft and calm.
  - a cream page with soft gradient bands that fade from a pale tint into the page
  - a centred serif hero at a modest size, with a collage of rounded, slightly tilted photographs and floating
    speech-bubble pills
  - 32px cards with hairline borders and 20px photo wells inside, and dashed separators
  - pill buttons
- **medivide.io:** the single-colour type discipline, the staggered product marquee, and the indexed category list.
- **sunflowermedical.co.uk:** the split range layout (a photograph held beside the category list) and the tile
  lift on hover.

## Palette (confirmed)

Teal `#00A19B`, Charcoal `#181A1C`, Warm white `#FAF9F6`, Stone `#E9E7E2`.

- `--mist` and `--mist-strong` are Teal at 10% and 22% over Warm white. They are tints, used for the gradient
  bands and pills.
- `--teal-deep` (Teal mixed with Charcoal) is only the primary button's hover shade.
- Teal type is only used at 24px and above (3.0:1 on Warm white). Body copy is Charcoal (17.4:1). Primary buttons
  are Teal with Charcoal text (5.5:1).

## Typography

- **Federo** (Cyreal, OFL): the wordmark face. Used for the preloader, hero, headings, range names and the menu.
- **Plus Jakarta Sans** (variable, OFL): everything else.
- Both are self-hosted latin subsets in `public/fonts` (from Google Fonts). The full Federo TTF is kept beside
  them.

## How it works

- **Preloader** (`components/Preloader.tsx`): built from the real lock-up's parts (`lib/logo.ts`). It stays in
  the centre the whole time, and nothing flies to the corner (client feedback). One GSAP timeline, about 2.1s:
  1. The C arc is drawn with `stroke-dashoffset` over a faint track of itself. It is the progress element, with
     a 00 to 100 counter in a pill beneath.
  2. The dot pops into the opening.
  3. C A L V E N rise one by one out of a baseline mask, and MEDICAL SUPPLIES is wiped in from the left.
  4. At 1.55s comes the handover: `is-loading` is removed from `<html>`, `data-intro="done"` is set and
     `intro:done` is dispatched. The lock-up lifts and fades, and the Warm white ground draws up like a curtain
     over the hero's own Warm white, so there is no colour jump.

  Lenis stays stopped until the handover. The preloader plays on every load, is skipped with reduced motion,
  is hidden without JavaScript, and has a 3s failsafe.
- **Hero** (`components/home/Hero.tsx`): waits for `intro:done`. The headline lines rise out of masks, then the
  copy follows. The collage photographs rise and settle into their tilt, and the pills pop in. Each photograph
  drifts with the pointer at its own depth.
- **Smooth scroll and reveals** (`components/Motion.tsx`): Lenis (`lerp .12`) runs on the GSAP ticker and is
  synced with ScrollTrigger. A capture-phase link guard keeps every click on the page and routes `#` links
  through Lenis. Reveal moves are declared with `data-reveal`; anything in `[data-late]` plays at 0.75 of the
  duration:

  | Move | Used for | Animation |
  | --- | --- | --- |
  | `head` | headings | the whole phrase fades and rises 24px, 1.1s |
  | `text` | paragraphs | words rise out of a line mask, 1s, 8ms stagger |
  | `label` | small lines, buttons, the form | fade and rise 12px, 0.8s |
  | `cards` | lists | children rise 32px in batches, 1s, 80ms stagger |
  | `image` | photo frames | clip opens from the bottom edge, 1.2s; `data-parallax` drifts the image about 10% |

  The easing family is `calven` = `cubic-bezier(.25,1,.33,1)`, medivide's Salient curve. Frames use
  `power3.inOut`, and the preloader arc uses `power2.inOut`.
- **Range** (`components/home/Range.tsx`): six categories in a soft card. Hovering, focusing or tapping a row
  opens it and wipes the large frame to its photograph. All six photographs load up front. The frame is CSS
  sticky beside the list, with no scroll pin. Each row's link carries its category into the enquiry form.
- **Essentials** (`components/home/Essentials.tsx`): a ticker of the six product cut-outs on soft cards at
  staggered heights. It drifts at 28px/s, speeds up with scroll velocity, and rests under the pointer or focus.
- **Enquiry** (`components/home/Enquire.tsx`): the campaign email's closing block. The form validates, then says
  plainly that nothing was sent. There is no inbox behind this preview.
- **Header** (`components/Header.tsx`): after doctronic. The logo is on the left. On the right are an outline
  pill, a solid pill, a hairline and a round menu button. There is no bar. The header hides on scroll down and
  returns on scroll up. The menu is full-screen: the panel wipes down, then items rise, and it reverses out. It
  traps focus, closes on Esc and returns focus to the button. Every item scrolls to a homepage section.
- **Buttons** (`.btn` in `components/ui.tsx` and `app/globals.css`): the copied interaction, doctronic's button,
  rebuilt with its own structure and values:
  - a pill with radius 52 and padding 12px 24px
  - .15s ease-in at rest and ease-out on hover; on press it scales to .98
  - a coloured shadow `0 4px 7px` that lifts to `0 6px 10px` on hover, while the fill darkens
  - a one-time shimmer band sweeping across on hover (`translate(-150%)` to `150%`, .45s ease-out)
  - the outline variant fills with Charcoal on hover
- **Reduced motion:** no preloader and no smooth scroll. All content is visible, and the ticker becomes a
  sideways-scrolling row. **No JavaScript:** nothing is hidden, and the preloader is hidden by `<noscript>`.

## Private demo settings

- `robots` is `noindex, nofollow` in `app/layout.tsx`. There is no sitemap.
- PostHog EU and the 25/50/75/100 `scroll_depth` events live in `lib/posthog.ts`, injected in `<head>`. The key
  can be overridden with `NEXT_PUBLIC_POSTHOG_KEY`. Surveys are off and no visible UI is added.

## Images

- Everything in `public/media` comes from ocura.co.uk. `scripts/fetch-media.sh` downloads the originals, and
  `scripts/optimise-media.sh` resizes them to WebP (732 KB in all).
- Ocura's homepage banner still has a play button baked in, so the feature uses Ocura's Colchester clinic
  photograph instead.
- Calven's own AI-generated campaign photographs live in the Claude Design project and could not be exported
  from it.
- Photographs are shown in natural colour.

## Recon note (Phase 1, 13 Oct 2026)

### What Calven is
Calven Medical Supplies is a **fictional brand** created for a portfolio campaign in Claude Design
(project "Calven Medical campaign brief"). It has no live website. Its notes say:

- No trademark clearance. The people in the photos and the treatment chair are fictional.
- **No claims:** no clinical, regulatory (CE/UKCA, ISO), endorsement, statistical, availability
  or delivery claims.
- UK English.

What exists, and what this build uses from it:

| Asset | Source | Used for |
| --- | --- | --- |
| Lockup SVG (symbol + CALVEN + MEDICAL SUPPLIES, outlined) | `assets/logo/calven-lockup.svg` | `public/brand/calven-lockup.svg`, header, footer |
| Symbol: a 16-unit stroked arc `M77.85 30.5 A34 34 0 1 0 77.85 69.5` plus a dot `r=8` at (84,50) | `calven-symbol.svg` | Preloader (the arc is drawn with stroke-dashoffset, then the dot lands) |
| Wordmark face: Federo Regular (Cyreal, SIL OFL 1.1) | brand notes | `public/fonts/Federo-Regular.ttf` (from google/fonts) |
| Colours: teal `#00A19B`, charcoal `#181A1C`, warm white `#FAF9F6`, grey `#737879`, campaign canvas `#E9E7E2` | `NOTES.md`, overview CSS | Palette proposal below |
| Campaign copy (email + 3 social posts) | `copy-sheet.md` | Hero, feature and guide copy, verbatim |
| Campaign type: Georgia headings, Arial body (email-safe stacks) | overview + email CSS | Informs the web type proposal |

The logo is split into parts for the preloader: **arc**, **dot**, **CALVEN** (6 letter subpaths,
teal), and **MEDICAL SUPPLIES** (charcoal).

### Content and imagery source: ocura.co.uk
Per the brief ("items/image can take ocura.co.uk"). The Ocura homepage, read in a real browser
because its HTML is behind a JS challenge:

| Live Ocura section | Items |
| --- | --- |
| Hero ("Healthcare Solutions") + purpose statement + 1 CTA | 1 photo (Arvada 2 room) |
| Healthcare furniture solutions (tabs) | 6: Recliners, Lockable trolleys, Beam seating, Lockable wheeled cabinets, Patient bedside chairs, Soft seating |
| Product feature (Arvada 2) + video link | 1 |
| 48 hour express range | 6 product cut-outs |
| Case study (Weston General SDEC) | 1 |
| Trusted by (client logos) | 6 logos |
| 6Es ethos carousel | 6 |

All 21 images are downloaded by `scripts/fetch-media.sh` into `media-src/` (originals up to
6000 px). Ocura's own claims are **not** carried over: no 48-hour delivery, no 7-year
warranty, no NHS or hospital names, no client logos, no case study. Calven's notes forbid those,
and they belong to a real company. The products appear as Calven's range categories, without
model names.

### References
- **medivide.io (look and layout).** The live page currently shows raw page-builder
  shortcodes. Values were read from computed styles and the shortcode parameters:
  - ground `#F7F7F7`, every piece of type in one deep colour `#124743`
  - MZD geometric sans; hero H1 is 100px (7vw) with line-height 1 and -5px tracking, split
    across lines
  - H2 30px/35px at -1.2px; H3 26px at -0.78px; body 16px/22px
  - floating header pill: `rgba(255,255,255,.7)`, `blur(12px)`, radius 16px
  - outline CTA: 1px border, radius 9px, padding 15px 20px, fills on hover
  - sections: a slow marquee of staggered white product cards, an indexed category list
    with product imagery, a two-column "about" block with four value points, and a popular
    products carousel
- **sunflowermedical.co.uk (motion and scroll).** WordPress (Impreza). There is no smooth
  scroll, GSAP or scroll animation. The whole homepage is a single 1073px screen: a split
  hero (photo left, headline over it) and a 3 by 3 grid of category tiles on the right. Each
  tile is a white card with radius 10px, a product cut-out on white, a brand-colour label
  band, and shadow `0 16px 32px rgba(0,0,0,.08)` (the transition is `all`, with no duration).
  **This conflicts with the brief's "motion reference" role.** Decision: take its split
  layout and tile treatment for the range section. Motion follows the brief's own calm system
  and the standing demo rules (Lenis `lerp .12`, one-shot reveals, no pins, no scroll
  recolouring).
- **Copied interaction:** the medivide outline CTA (border, radius 9px, fill on hover), rebuilt
  as `.btn` with its easing in CSS variables.

### Site structure (proposed; Calven has no real site)
- Nav: Range, Care spaces, About, Contact. All items scroll to homepage sections.
- Footer: lockup, the category list, company line, and legal text from the brand notes. No
  social accounts exist, so no social icons are shown.
- Links: there is no live site to link to. Every link scrolls to a homepage section, so there
  are no outbound or `#` dead links. This keeps to the "links must not navigate" demo rule by
  design.

### Proposed homepage (7 sections, target about 6.5 viewport heights at 1440)
1. **Hero:** split headline "Make room for better care." over the Arvada room photograph,
   with the email body copy and two CTAs.
2. **The range** (image-led): six categories in an indexed list. Hovering swaps a large
   photograph (Sunflower split). All six images are preloaded.
3. **Everyday essentials:** a scroll-reactive ticker of the six product cut-outs on white
   cards (medivide marquee, Sunflower tiles).
4. **Feature:** "Supporting patients and the teams who care for them" (post 02), with the
   nurse-and-patient photograph.
5. **Care space guide:** "3 ways to build a better care space" (post 03), with three
   photographs.
6. **Enquiry:** "Find the right fit for your space." with the three categories and the
   "Discuss your requirements" form (non-submitting).
7. **Footer.**

Imagery leads sections 1 to 3. Sections 5 and 6 alternate image and text.
