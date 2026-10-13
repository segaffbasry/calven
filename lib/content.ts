/* Every word on the page. Calven Medical Supplies is a fictional brand, so it has no live site: the copy comes from
   its campaign copy sheet (copy-sheet.md in the Claude Design project, quoted verbatim and marked "sheet"), and the
   range and product imagery from ocura.co.uk (per the brief). Ocura's own claims are deliberately not carried over:
   the brand notes rule out clinical, regulatory, endorsement, statistical, availability and delivery claims.
   Range and product lines marked "written" are plain descriptions of what each category is, with no claims.
   UK English, and no em or en dashes anywhere (the standing demo rule). */

export const site = {
  name: "Calven Medical Supplies",
  title: "Calven Medical Supplies | Treatment seating and clinical essentials",
  // sheet: email preheader
  description: "Explore treatment seating and clinical essentials from Calven Medical Supplies.",
};

/* Header pill and menu. There is no live site to link to, so every item scrolls to a homepage section. */
export const sections = [
  { label: "Range", href: "#range" },
  { label: "Essentials", href: "#essentials" },
  { label: "Care spaces", href: "#guide" },
  { label: "Enquire", href: "#enquire" },
];

export const hero = {
  // sheet: email headline, split where the copy breathes
  lines: ["Make room", "for better care."],
  // sheet: email body, first sentence
  lead: "From treatment seating to clinical trolleys, the right equipment helps shape a space that works for patients and the people caring for them.",
  // sheet: primary and secondary CTA
  primary: { label: "Discuss your requirements", href: "#enquire" },
  secondary: { label: "Explore the range", href: "#range" },
  image: { src: "/media/hero.webp", w: 2400, h: 1013, alt: "A calm single patient room with a high-back bedside chair in green beside the bed" },
  // The collage around the room photograph (after doctronic.ai's hero: tilted photographs with floating pills).
  side: [
    { src: "/media/guide-comfort.webp", w: 537, h: 537, alt: "A nurse sits beside an older patient in a teal armchair" },
    { src: "/media/range-soft.webp", w: 1400, h: 787, alt: "Green armchairs and a sofa in a light reception lounge" },
  ],
  // sheet: email categories, shown as the floating pills
  chips: ["Treatment seating", "Examination couches", "Clinical trolleys"],
  // sheet: social post 01 subheading, the small line under the buttons
  note: "Thoughtful equipment for everyday care",
};

export type RangeItem = { id: string; title: string; text: string; image: { src: string; w: number; h: number; alt: string; pos?: string } };

export const range = {
  title: "Explore the range",
  // sheet: email body, second sentence
  lead: "Calven Medical Supplies brings together practical furniture and equipment for busy healthcare settings.",
  // Six categories, following the six tabs of Ocura's "Healthcare Furniture Solutions" block (written).
  items: [
    { id: "recliners", title: "Treatment recliners", text: "Recliners and riser chairs for treatment areas and day units, with wipe-clean upholstery.",
      image: { src: "/media/range-recliners.webp", w: 1400, h: 1400, alt: "A row of blue treatment recliners in a bright day unit", pos: "50% 60%" } },
    { id: "bedside", title: "Bedside chairs", text: "Supportive high-back seating beside the bed, in standard and wider sizes.",
      image: { src: "/media/range-bedside.webp", w: 1400, h: 933, alt: "A teal bedside chair in a ward bay next to a hospital bed" } },
    { id: "beam", title: "Beam seating", text: "Linked seating for waiting areas and corridors, with or without arms.",
      image: { src: "/media/range-beam.webp", w: 1400, h: 1050, alt: "Rows of linked beam seating in a waiting area" } },
    { id: "soft", title: "Soft seating", text: "Armchairs and sofas for lounges, receptions and family rooms.",
      image: { src: "/media/range-soft.webp", w: 1400, h: 787, alt: "Green armchairs and a sofa in a light reception lounge" } },
    { id: "trolleys", title: "Clinical trolleys", text: "Lockable trolleys for records, medicines and equipment, moved to where they are needed.",
      image: { src: "/media/range-trolleys.webp", w: 1400, h: 933, alt: "Clinical trolleys and a blue chair in a maternity room" } },
    { id: "cabinets", title: "Wheeled cabinets", text: "Mobile storage with a choice of doors, trays and modules, a flexible alternative to fitted units.",
      image: { src: "/media/range-cabinets.webp", w: 1400, h: 933, alt: "A row of wheeled storage cabinets with tray modules along a clinical room wall" } },
  ] as RangeItem[],
};

export const essentials = {
  // sheet: social post 01 headline, subheading and caption
  title: "Care starts here",
  lead: "Thoughtful care spaces start with the everyday details.",
  // The six product cut-outs from Ocura's homepage product strip, named by what they are (no model names).
  items: [
    { label: "Patient chair", src: "/media/cut-arvada.webp", w: 800, h: 600 },
    { label: "Visitor armchair", src: "/media/cut-odessa-atlantic.webp", w: 800, h: 800 },
    { label: "Over-bed table", src: "/media/cut-over-bed-table.webp", w: 800, h: 800 },
    { label: "Riser recliner", src: "/media/cut-boston.webp", w: 800, h: 533 },
    { label: "Bedside cabinet", src: "/media/cut-dominica.webp", w: 800, h: 533 },
    { label: "Drip stand", src: "/media/cut-stainless-steel-pole.webp", w: 800, h: 800 },
  ],
};

export const feature = {
  // sheet: social post 02 headline (its line breaks) and footer caption
  lines: ["Supporting patients", "and the teams", "who care for them."],
  text: "Treatment seating for clinics, wards and care spaces, selected around the people who use it.",
  // sheet: social post 02 caption, last sentence
  cta: { label: "Talk to Calven Medical Supplies about your requirements", href: "#enquire" },
  image: { src: "/media/feature.webp", w: 1800, h: 1197, alt: "Light blue riser recliners, one raised to stand, in a bright clinic treatment room" },
};

export const guide = {
  // sheet: social post 03 headline and caption, verbatim
  lines: ["3 ways to build", "a better care space"],
  lead: "Planning a care space? Three practical things to consider.",
  items: [
    { title: "Patient comfort", text: "Who will use the space, and for how long.",
      image: { src: "/media/guide-comfort.webp", w: 537, h: 537, alt: "A nurse sits beside an older patient in a teal armchair" } },
    { title: "Everyday workflow", text: "How your team moves, works and reaches what it needs.",
      image: { src: "/media/guide-workflow.webp", w: 1000, h: 666, alt: "A same-day care unit with rows of green seating and clear walkways" } },
    { title: "Cleaning and upkeep", text: "What day-to-day care of the equipment will involve.",
      image: { src: "/media/guide-upkeep.webp", w: 1000, h: 666, alt: "Wipe-clean seating and a side table in a diagnostic centre" } },
  ],
  close: "Calven Medical Supplies can help you explore suitable options.",
};

export const enquire = {
  // sheet: email section title, categories, supporting text and primary CTA
  title: "Find the right fit for your space.",
  text: "Tell us about your space, your team and your priorities. We’ll help you explore suitable options.",
  categories: ["Treatment seating", "Examination couches", "Clinical trolleys"],
  submit: "Discuss your requirements",
  // Shown in place of sending: this preview has no inbox behind it.
  thanks: "Thank you. Your note is ready, and nothing has been sent from this preview.",
};

export const footer = {
  // sheet: social post 01 caption, last two sentences
  line: "Discover treatment seating and clinical essentials for patients and the teams who care for them.",
  groups: [
    { title: "Range", links: range.items.map((r) => ({ label: r.title, href: "#range", item: r.id })) },
    { title: "Calven", links: [
      { label: "Everyday essentials", href: "#essentials" },
      { label: "Patients and teams", href: "#feature" },
      { label: "Planning a care space", href: "#guide" },
      { label: "Discuss your requirements", href: "#enquire" },
    ] },
  ],
  legal: `© ${new Date().getFullYear()} Calven Medical Supplies`,
};
