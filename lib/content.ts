/* Every word on the page. Calven Medical Supplies is a fictional brand, so it has no live site: the copy comes from
   its campaign copy sheet (copy-sheet.md in the Claude Design project, quoted verbatim and marked "sheet"), and the
   range and product imagery from ocura.co.uk. Lines marked "written" are plain, practical descriptions and planning
   guidance with no claims: the brand notes rule out clinical, regulatory, endorsement, statistical, availability and
   delivery claims, so nothing here promises a lead time, a warranty, a certification or a customer.
   UK English, and no em or en dashes anywhere (the standing demo rule). */

export const site = {
  name: "Calven Medical Supplies",
  title: "Calven Medical Supplies | Treatment seating and clinical essentials",
  // sheet: email preheader
  description: "Explore treatment seating and clinical essentials from Calven Medical Supplies.",
};

export type Link = { label: string; href: string; item?: string };

/* The utility bar and main navigation, after jnj.com's two-tier header. There is no live site to link to, so every
   item scrolls to a homepage section. */
export const utility = {
  left: [
    { label: "Discover Calven", href: "#top" },
    { label: "Treatment seating", href: "#seating" },
    { label: "Clinical equipment", href: "#equipment" },
  ] as Link[],
  right: [
    { label: "Care spaces", href: "#stories" },
    { label: "Contact", href: "#enquire" },
  ] as Link[],
  region: "UK",
};

export const sections: Link[] = [
  { label: "Our range", href: "#range" },
  { label: "Everyday essentials", href: "#essentials" },
  { label: "Care spaces", href: "#stories" },
  { label: "Enquire", href: "#enquire" },
];

export const hero = {
  // sheet: email headline
  lines: ["Make room", "for better care."],
  // sheet: email body, first sentence
  lead: "From treatment seating to clinical trolleys, the right equipment helps shape a space that works for patients and the people caring for them.",
  cta: { label: "Discuss your requirements", href: "#enquire" },
  image: { src: "/media/hero.webp", w: 2400, h: 1013, alt: "A calm single patient room with a high-back bedside chair in green beside the bed" },
};

export type RangeItem = { id: string; title: string; text: string; image: { src: string; w: number; h: number; alt: string; pos?: string } };

export const range = {
  title: "Our range",
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

/* The two divisions, after jnj.com's "Medicines & therapies" and "Medical devices & technology" bars (written). */
export const divisions = [
  {
    id: "seating", title: "Treatment seating",
    // sheet: social post 02 footer caption, then written
    text: "Treatment seating for clinics, wards and care spaces, selected around the people who use it. From the day unit to the ward bay and the waiting room, every chair is chosen with the patient who sits in it and the team who moves, cleans and cares around it.",
    links: [
      { label: "Treatment recliners", href: "#range", item: "recliners" },
      { label: "Bedside chairs", href: "#range", item: "bedside" },
      { label: "Beam seating", href: "#range", item: "beam" },
      { label: "Soft seating", href: "#range", item: "soft" },
    ] as Link[],
    cta: { label: "Explore seating", href: "#range" },
  },
  {
    id: "equipment", title: "Clinical equipment",
    text: "Storage and equipment that keeps the essentials close at hand: trolleys for records and medicines, mobile cabinets that move with the room, and the over-bed tables and drip stands that every bay relies on. Practical pieces for the rooms where care happens.",
    links: [
      { label: "Clinical trolleys", href: "#range", item: "trolleys" },
      { label: "Wheeled cabinets", href: "#range", item: "cabinets" },
      { label: "Over-bed tables", href: "#essentials" },
      { label: "Drip stands", href: "#essentials" },
    ] as Link[],
    cta: { label: "Explore equipment", href: "#essentials" },
  },
];

/* Care spaces: planning guides, after jnj.com's "Innovating in healthcare" story grid. Each opens in full on the page
   (a dialog), since there is no site to link to. The first and second are the campaign's own posts. */
export type Story = { id: string; tag: string; title: string; image: { src: string; w: number; h: number; alt: string }; body: string[] };
export const stories = {
  title: "Inside better care spaces",
  items: [
    {
      id: "three-ways", tag: "Planning guide", title: "3 ways to build a better care space",
      image: { src: "/media/guide-comfort.webp", w: 537, h: 537, alt: "A nurse sits beside an older patient in a teal armchair" },
      body: [
        // sheet: social post 03 caption, verbatim
        "Planning a care space? Three practical things to consider.",
        "Patient comfort: who will use the space, and for how long.",
        "Everyday workflow: how your team moves, works and reaches what it needs.",
        "Cleaning and upkeep: what day-to-day care of the equipment will involve.",
        "Calven Medical Supplies can help you explore suitable options.",
      ],
    },
    {
      id: "patients-and-teams", tag: "Treatment seating", title: "Supporting patients and the teams who care for them",
      image: { src: "/media/feature.webp", w: 1800, h: 1197, alt: "Light blue riser recliners, one raised to stand, in a bright clinic treatment room" },
      body: [
        // sheet: social post 02 caption
        "Supporting patients and the teams who care for them. Explore treatment seating for clinics, wards and care spaces, selected around the people who use it.",
        // written
        "A good treatment chair works for two people at once. For the patient it should be easy to get into and out of, comfortable for the length of a session and simple to adjust. For the team it should move freely, sit at a working height and wipe down quickly between patients.",
        "Talk to Calven Medical Supplies about your requirements.",
      ],
    },
    {
      id: "waiting-areas", tag: "Waiting areas", title: "Planning a waiting area that stays calm",
      image: { src: "/media/story-waiting.webp", w: 1600, h: 1199, alt: "A bright waiting area with rows of sage green linked seating" },
      body: [
        // written
        "Waiting areas see more people, for longer, than almost any other part of a building. Linked beam seating keeps rows tidy and walkways clear, while a mix of seats with and without arms gives people the support they need to sit and stand.",
        "Think about sightlines to reception, space for wheelchairs and buggies beside the rows, and a few higher or wider seats for those who need them. Calm colours and good light do the rest.",
      ],
    },
    {
      id: "everyday-details", tag: "Everyday care", title: "Thoughtful care spaces start with the everyday details",
      image: { src: "/media/guide-workflow.webp", w: 1000, h: 666, alt: "A same-day care unit with rows of green seating and clear walkways" },
      body: [
        // sheet: social post 01 caption
        "Thoughtful care spaces start with the everyday details. Discover treatment seating and clinical essentials for patients and the teams who care for them.",
        // written
        "The pieces that matter most are often the smallest: an over-bed table at the right height, a drip stand that rolls where it is needed, a bedside cabinet within reach. Getting these right makes every shift a little easier.",
      ],
    },
    {
      id: "cleaning-upkeep", tag: "Planning guide", title: "Cleaning and upkeep: what to ask before you choose",
      image: { src: "/media/guide-upkeep.webp", w: 1000, h: 666, alt: "Wipe-clean seating and a side table in a diagnostic centre" },
      body: [
        // written
        "Equipment is cleaned many times a day, so it pays to ask early how each piece will be looked after. Which surfaces are wipe-clean? Are there seams, gaps or hard-to-reach corners? Can cushions or covers be removed and replaced?",
        "Answering these questions before you choose helps keep a space ready for the next patient, with less time spent on upkeep.",
      ],
    },
  ] as Story[],
};

export const essentials = {
  // sheet: social post 01 headline and subheading
  title: "Everyday essentials",
  lead: "Thoughtful equipment for everyday care.",
  // The six product cut-outs from Ocura's homepage product strip, named by what they are (no model names); text written.
  items: [
    { label: "Patient chair", text: "A high-back chair with arms for bedside and treatment rooms.", src: "/media/cut-arvada.webp", w: 800, h: 600 },
    { label: "Visitor armchair", text: "A light, stackable chair for visitors and consulting rooms.", src: "/media/cut-odessa-atlantic.webp", w: 800, h: 800 },
    { label: "Over-bed table", text: "A height-adjustable table that rolls over the bed or chair.", src: "/media/cut-over-bed-table.webp", w: 800, h: 800 },
    { label: "Riser recliner", text: "A recliner that rises to help patients stand.", src: "/media/cut-boston.webp", w: 800, h: 533 },
    { label: "Bedside cabinet", text: "Storage within reach of the bed, on castors.", src: "/media/cut-dominica.webp", w: 800, h: 533 },
    { label: "Drip stand", text: "A stainless steel stand with four hooks, on a wheeled base.", src: "/media/cut-stainless-steel-pole.webp", w: 800, h: 800 },
  ],
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
  // sheet: social post 01 caption, last sentence
  line: "Discover treatment seating and clinical essentials for patients and the teams who care for them.",
  groups: [
    { title: "Discover Calven", links: sections },
    { title: "Treatment seating", links: divisions[0].links },
    { title: "Clinical equipment", links: divisions[1].links },
  ],
  touch: { title: "Get in touch", text: "Tell us about your space, your team and your priorities.", cta: { label: "Discuss your requirements", href: "#enquire" } },
  legal: `© ${new Date().getFullYear()} Calven Medical Supplies`,
};
