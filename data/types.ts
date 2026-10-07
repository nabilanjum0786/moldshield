// ─────────────────────────────────────────────────────────────
// DATA SLOT TYPES — every {{SLOT}} from the five HTML templates,
// typed. The Groq pipeline fills these; routes render from them.
// Fields that have no verified source stay `null` — never invented.
// ─────────────────────────────────────────────────────────────

export type FaqItem = { q: string; aHtml: string };

export type CostRange = {
  /** "Attic", "Basement", … */
  label: string;
  low: number;
  high: number;
  source: string;
};

export type ServiceModule = {
  slug: string;
  name: string;
  /** City-scoped card blurb, e.g. "Ice dams and poor ventilation make Dayton attics mold's favorite hideout." */
  localBlurb: string | null;
};

export type RiskCard = {
  title: string;
  body: string;
  /** service slug the card links to */
  serviceSlug: string;
};

// ── STATE HUB slots ───────────────────────────────────────────
// Template slots: {{STATE_NAME}} {{STATE_SLUG}} {{HERO_ANSWER}}
// {{STATE_AVG_HUMIDITY}} {{STATE_HOUSING_AGE}} {{STATE_FLOOD_RISK}}
// {{STATE_COST_NOTE}} {{STATE_MOLD_LAW_NOTE}} {{CITY_CARDS}}
// {{CITY_CARDS_INLINE}}
// NOTE: phone is NOT a data slot — one site-wide number lives in
// lib/site-config.ts (phoneDisplay/phoneHref). Same for brand name.
export type StateData = {
  slug: string;
  name: string;
  /** 50–70 word direct answer naming the state's mold drivers. */
  heroAnswer: string | null;
  moldStory: string;
  /** e.g. "68%" + source, null until NOAA normals are pulled */
  avgHumidity: string | null;
  avgHumiditySource: string | null;
  /** e.g. "52%" of homes pre-1980, null until Census ACS pulled */
  housingPre1980Pct: number | null;
  housingSource: string | null;
  /** short flood-risk descriptor, null until FEMA data reviewed */
  floodRisk: string | null;
  floodRiskSource: string | null;
  /** state-specific pricing color, null = national ranges only */
  costNote: string | null;
  /** mold licensing/regulatory note for the state */
  moldLawNote: string | null;
  metaTitle: string;
  metaDescription: string;
};

// ── CITY HUB slots ────────────────────────────────────────────
// {{CITY_NAME}} {{CITY_SLUG}} {{HERO_ANSWER}} {{CITY_POPULATION}}
// {{CITY_HOUSING_AGE}} {{CITY_HUMIDITY}} {{CITY_CLIMATE_NOTE}}
// {{CITY_HOUSING_NOTE}} {{CITY_NEIGHBORHOODS}} {{CITY_MOLD_STORY}}
// {{CITY_RISK_CARDS}} {{CITY_COST_NOTE}} {{TOWN_PILLS}}
// NOTE: phone is NOT a data slot (see site-config.ts).
export type CityData = {
  slug: string;
  stateSlug: string;
  name: string;
  population: number | null;
  /** % of homes built before 1980 */
  housingPre1980Pct: number | null;
  /** average annual relative humidity, e.g. "70%" */
  avgHumidity: string | null;
  annualRainfallIn: number | null;
  moldStory: string;
  climateNote: string | null;
  housingNote: string | null;
  neighborhoods: string[];
  zips: string[];
  /** 3–4 generated risk cards (title/body/service link) */
  riskCards: RiskCard[];
  /** 1–2 line card blurb for the state hub city grid */
  cardBlurb: string | null;
  costNote: string | null;
  heroAnswer: string | null;
  metaTitle: string;
  metaDescription: string;
};

// ── TOWN PAGE slots ───────────────────────────────────────────
// {{TOWN_NAME}} {{TOWN_SLUG}} {{HERO_ANSWER}} {{TOWN_INTRO}}
// {{TOWN_MOLD_NOTE}} {{TOWN_COST_NOTE}} {{TOWN_PROBLEM_CARDS}}
// NOTE: phone is NOT a data slot (see site-config.ts).
export type TownData = {
  slug: string;
  citySlug: string;
  stateSlug: string;
  name: string;
  population: number | null;
  housingPre1980Pct: number | null;
  moldStory: string;
  neighborhoods: string[];
  zips: string[];
  landmarks: string[];
  /** 2–4 short paragraphs, town-unique, from real local data */
  intro: string | null;
  /** 1–2 sentences tying the town's data to mold risk */
  moldNote: string | null;
  costNote: string | null;
  /** exactly 3 problem cards */
  problemCards: RiskCard[];
  heroAnswer: string | null;
  metaTitle: string;
  metaDescription: string;
};

// ── SERVICE PILLAR slots ──────────────────────────────────────
// {{SERVICE_NAME}} {{SERVICE_SLUG}} {{SERVICE_NOUN}} {{META_TITLE}}
// {{META_DESC}} {{HERO_H1}} {{HERO_ANSWER}} {{SYMPTOMS}} {{SYMPTOM_QA}}
// {{PROCESS_STEPS}} {{PRICE_ROWS}} {{PRICE_RANGE}} {{MOLD_TYPES}}
// {{EST_RANGES}} {{FAQ_ITEMS}} {{RELATED_PILLARS}} {{TRUST_STATS}}
// {{SERVICE_AREA}} {{FAQ_JSONLD}} {{HOWTO_JSONLD}}
// (National pillars render from content/pillars/*.ts = PillarContent.)
// NOTE: phone is NOT a data slot (see site-config.ts).
export type PillarSlotData = {
  slug: string;
  name: string;
  serviceNoun: string;
  metaTitle: string;
  metaDescription: string;
  heroH1: string;
  heroAnswer: string;
  symptoms: string[];
  symptomQa: { q: string; a: string };
  processSteps: { name: string; text: string }[];
  priceRows: { location: string; low: number; high: number }[];
  priceRange: string;
  moldTypes: { name: string; look: string; risk: string }[];
  estRanges: CostRange[];
  faqs: FaqItem[];
  relatedSlugs: string[];
  trustStats: { value: string; label: string; source: string }[];
  serviceArea: string[];
};

// ── STORM RESPONSE slots (Workstream F) ─────────────────────────────
// One record per verified storm event. Every field must come from the
// NOAA Storm Events Database record (or verified local news) — nothing
// here is invented. Records are created by scripts/generate-storm-page.mjs,
// which REFUSES to run without eventType + eventDate.
export type StormEventRecord = {
  /** URL slug, e.g. "montgomery-county" */
  countySlug: string;
  countyName: string;
  stateName: string;
  /** null when the state name wasn't in the generator's US state map */
  stateAbbr: string | null;
  /** NOAA event type, e.g. "Flash Flood" */
  eventType: string;
  /** YYYY-MM-DD — from the NOAA BEGIN_DATE_TIME */
  eventDate: string;
  eventEndDate: string | null;
  /** Human label, e.g. "6:45 PM – 7:45 PM Eastern" */
  eventTimeLabel: string | null;
  /** NOAA EPISODE_NARRATIVE verbatim */
  episodeNarrative: string | null;
  /** NOAA EVENT_NARRATIVE verbatim */
  eventNarrative: string | null;
  /** NOAA FLOOD_CAUSE, e.g. "Heavy Rain" */
  floodCause: string | null;
  /** NOAA DAMAGE_PROPERTY, formatted, e.g. "$3,000" */
  propertyDamage: string | null;
  /** NOAA SOURCE, e.g. "State Official" */
  reportSource: string | null;
  sourceName: string;
  /** Link to the NOAA bulk file (or a news URL for manual entries) */
  sourceUrl: string | null;
  /** Date the record was pulled from the source, YYYY-MM-DD */
  retrievedDate: string;
};
