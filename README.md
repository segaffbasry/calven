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
| `/` | Header, hero, two divisions, story grid (5 stories with full text), range, essentials carousel, enquiry, footer |

The build is static: `/` plus the framework's own `/_not-found` (and `/icon.svg`).

## Design direction (jnj.com, client request 14 Oct 2026)

The client asked for the site to look "more like jnj.com, very solid, proper", with more content. Measured from
jnj.com:

- **Two-tier header:** a 40px dark warm-grey utility bar (#312C2A, here Charcoal) with the divisions on the left
  and Contact and the region on the right. Under it, an 88px solid white bar with the logo and main navigation.
  The header stays in place while scrolling.
- **Split hero:** a large light display headline (80px, line-height 1) beside a square-cornered photograph.
- **Divisions:** two halves, each a full-colour bar (92px, padding 32px 80px, 24px title) over a pale panel
  (#F9F8F7) with a paragraph, inline links with arrows and the round arrow button.
- **Story grid:** a 64px heading, three stories, then two at 2:1. Each has a photograph, a 24px headline and
  "Read more". Here "Read more" opens the full story in an on-page dialog.
- **Careers-style band:** a warm-grey band with a list of rows divided by hairlines, each ending in an arrow,
  beside a photograph. This is used for the range: hovering a row swaps the photograph and unfolds its text.
- **Carousel:** cards running off the edge, then a hairline with round previous and next buttons. This is used for
  the six everyday essentials.
- **Dark footer:** the lock-up, three link groups, a "Get in touch" row and small print. A round back-to-top
  button sits bottom right.
- Square corners throughout, black-on-white type (here Charcoal on Warm white) and generous 80 to 116px spacing.

Earlier directions (doctronic.ai, medivide.io, sunflowermedical.co.uk) are superseded. The preloader was removed
at the client's request.

## Palette (confirmed)

Teal `#00A19B`, Charcoal `#181A1C`, Warm white `#FAF9F6`, Stone `#E9E7E2`.

- `--sand` (Stone at 45% over Warm white) is jnj's pale panel.
- `--teal-deep` (Teal mixed with Charcoal) is only the hover shade.
- **Contrast:** buttons are Teal with Warm white text at the client's request. That pairing is 3.0:1, below the
  4.5:1 AA level for normal-size text, so labels are 17px at 600 weight to help. Charcoal on Teal (5.5:1) is the
  accessible alternative if needed.
- Small links are Charcoal with a Teal arrow.

## Typography

- **Federo** (Cyreal, OFL): the wordmark face. It stands in for jnj's Johnson Display in the hero, headings,
  story and product titles, and division bars.
- **Plus Jakarta Sans** (variable, OFL): body text, at jnj's 18px.
- Both are self-hosted latin subsets in `public/fonts`.

## How it works

- **Smooth scroll and reveals** (`components/Motion.tsx`): Lenis (`lerp .12`) runs on the GSAP ticker and is
  synced with ScrollTrigger. A capture-phase link guard keeps every click on the page and routes `#` links
  through Lenis. Reveal moves are declared with `data-reveal`; anything in `[data-late]` plays at 0.75 of the
  duration:

  | Move | Used for | Animation |
  | --- | --- | --- |
  | `head` | headings | the whole phrase fades and rises 24px, 1.1s |
  | `text` | paragraphs | words rise out of a line mask, 1s |
  | `label` | division panels, the form | fade and rise 12px, 0.8s |
  | `cards` | story rows, range list, carousel | children rise 32px in batches, 1s, 80ms stagger |
  | `image` | photo frames | clip opens from the bottom edge, 1.2s |

  The easing family is `calven` = `cubic-bezier(.25,1,.33,1)` for settling, and `power3.inOut` for frames.
  Buttons use jnj's own `.3s`.
- **Hero** (`components/home/Hero.tsx`): plays on load. The lines rise out of masks, the photograph opens upward,
  and the copy follows.
- **Divisions** (`components/home/Divisions.tsx`): range links carry `data-item`, so the range opens on that
  category.
- **Stories** (`components/home/Stories.tsx`): a native `<dialog>`. The browser holds focus inside, Esc closes
  it, focus returns to the card, and smooth scroll pauses while it is open.
- **Range** (`components/home/Range.tsx`): hovering, focusing or tapping a row opens it and wipes the photograph.
  All six photographs load up front. "Ask about…" fills the enquiry form's category.
- **Essentials** (`components/home/Essentials.tsx`): a native horizontal scroller with snap points. The arrows
  move it one card at a time and grey out at either end.
- **Enquiry** (`components/home/Enquire.tsx`): validates, then says plainly that nothing was sent. There is no
  inbox behind this preview.
- **Header and menu** (`components/Header.tsx`): below 1100px the navigation folds into a full-screen menu. The
  panel wipes down, the items rise, and it reverses out. It traps focus, closes on Esc and returns focus to the
  toggle.
- **The copied interaction:** jnj's round "Learn more" button (`CircleCta` in `components/ui.tsx`).
  - At rest it is a 64px Teal circle with an arrow.
  - On hover or focus, padding goes from 0 to 0 32px and the underlined label slides out (theirs:
    `transition: background .3s, padding .3s`).
  - The label is always in the accessibility tree.
- **Reduced motion:** no smooth scroll, and all content is visible. **No JavaScript:** nothing is hidden.

## Verification (14 Oct 2026)

- `npm run typecheck` and `npm run build` pass. The static pages are `/` and `/_not-found`.
- **Page height:**

  | Width | Height | Viewports |
  | --- | --- | --- |
  | 1440 | 5,829 px | 6.5 |
  | 768 | 9,227 px | 9.0 |
  | 375 | 8,557 px | 10.5 |

  The client asked for more content, so phones run past the brief's 6 to 8 viewport target.
- At all three widths there is no horizontal scroll, there are no broken images and there are no console errors
  (`scripts/shots.mjs`).
- **Keyboard and behaviour** (`scripts/keys.mjs`, at 1024px):
  - the menu opens from the keyboard, Tab stays trapped, Esc closes, and focus returns to the toggle
  - a menu range link opens that category, and "Ask about…" fills the form
  - a story dialog opens with focus inside, then closes on Esc with focus back on the card
  - the round button measures 64px at rest and 230px on hover
  - the form shows its note, and no click leaves the page
  - with reduced motion, nothing is hidden
- **Content per section:**

  | Section | Source | Items |
  | --- | --- | --- |
  | Hero | campaign email | headline, lead, CTA, photograph |
  | Divisions | written, campaign post 02 | 2 divisions, 8 links |
  | Stories | campaign posts 01 to 03 and written guides | 5, each with full text |
  | Range | Ocura's six tabs | 6 of 6 |
  | Essentials | Ocura's product strip | 6 of 6 |
  | Enquiry | campaign email | 3 categories and a form |

  Not carried over from Ocura: the case study, the client logos, the 48-hour claim and the 6Es ethos. These are a
  real company's claims and clients, and Calven's brand notes rule such claims out.

## Private demo settings

- `robots` is `noindex, nofollow` in `app/layout.tsx`. There is no sitemap.
- PostHog EU and the 25/50/75/100 `scroll_depth` events live in `lib/posthog.ts`. The key can be overridden with
  `NEXT_PUBLIC_POSTHOG_KEY`. No visible UI is added.

## Images

- Everything in `public/media` comes from ocura.co.uk. `scripts/fetch-media.sh` downloads the originals, and
  `scripts/optimise-media.sh` resizes them to WebP.
- Ocura's homepage banner still has a play button baked in, so it is not used.
- Calven's own AI-generated campaign photographs live in the Claude Design project and could not be exported.

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
