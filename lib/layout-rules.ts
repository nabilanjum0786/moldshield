// ─────────────────────────────────────────────────────────────
// LAYOUT RULES ENGINE — pure logic, no JSX.
// Decides which content themes lead a town page based on REAL
// climate/housing data signals. RULE #0: never invent a town
// classification — every branch traces to a measured input, and
// missing data always falls back to the balanced 'mixed' archetype.
//
// Data provenance (see ~/workspace/rank-and-rent/api-data-spec.md):
//   avgHumidity        ← Open-Meteo (current + 7-day max-RH series)
//   annualRainfallIn   ← NOAA Access Data Service (1991–2020 normals)
//   floodRisk          ← data pipeline (FEMA flood history, recent storm
//                        events). NOTE: the pipeline — not this module —
//                        must fold recent major storm damage (e.g. roof
//                        destruction) into floodRisk, per docs.
//   heatingDegreeDays  ← NOAA climate normals (base-65°F annual HDD)
//   housingMedianYearBuilt ← Census ACS (median year built, county fallback)
// ─────────────────────────────────────────────────────────────

/** Page-layout archetypes. Every town lands in exactly one. */
export type LayoutArchetype =
  | "flood-prone"
  | "humid-subtropical"
  | "cold-climate"
  | "dry"
  | "mixed";

/**
 * Content-theme keys the town page consumes. The page layer maps each
 * key to template blocks (see docs/vary-layout-rules.md §6); the order
 * here IS the render order. Keys not in this list are never emitted.
 */
export type ContentSectionKey =
  | "storm-flood" // storm damage / flood / roof-leak recovery content
  | "roof" // roof repair, post-storm roof inspection
  | "basement" // basement flooding, sump, foundation seepage
  | "crawlspace" // crawl-space moisture, vapor barriers
  | "attic" // attic condensation, ventilation
  | "ice-dam" // ice dams, winter moisture cycles
  | "plumbing" // pipe leaks, slab leaks, water-heater failures
  | "hvac-condensate" // AC condensate drains, duct sweating
  | "humidity-control" // dehumidifiers, whole-home RH control
  | "insurance" // claims, coverage checks, documentation
  | "faq"; // question bank / PAA content

/** Real data signals feeding resolveLayout. Any field may be null when
 *  the pipeline hasn't fetched it yet — nulls never default to a guess. */
export type TownLayoutSignals = {
  /** Average daily relative humidity %, whole percent. Null = unknown. */
  avgHumidity: number | null;
  /** Annual rainfall, inches (NOAA normals). Null = unknown. */
  annualRainfallIn: number | null;
  /**
   * Pipeline-computed flood-risk class. 'unknown' = not yet computed.
   * The pipeline derives this from FEMA flood history, SFHA exposure,
   * AND recent major storm events (tornado/hurricane roof damage) —
   * not from this module.
   */
  floodRisk: "high" | "moderate" | "low" | "unknown";
  /** Base-65°F annual heating degree days (NOAA normals). Null = unknown. */
  heatingDegreeDays?: number | null;
  /** Median year housing was built (Census ACS; county fallback). Null = unknown. */
  housingMedianYearBuilt?: number | null;
};

export type LayoutResolution = {
  archetype: LayoutArchetype;
  /** Ordered section keys — first item leads the page. */
  contentPriority: ContentSectionKey[];
  /** Human-readable reason citing the actual numbers that triggered it. */
  notes: string;
};

/**
 * EPA-DERIVED — the EPA's published mold guidance ("keep indoor relative
 * humidity below 60% to inhibit mold growth"; see api-data-spec.md §3).
 * This line doubles as our humid-signal threshold.
 */
const HUMIDITY_LINE = 60;

/**
 * EDITORIAL — no EPA line exists for "wet" annual rainfall. Set at 40 in/yr:
 * above the US long-run average (~38 in/yr; Ohio statewide 38.3 [NATLAS]),
 * and met by Dayton's ~42 in/yr [NWS]. Labeled editorial; revisit if the
 * pipeline ever ships a climate-anchored value.
 */
const RAIN_WET_IN = 40;

/**
 * EDITORIAL — "dry" annual rainfall at 25 in/yr. Below this, outdoor
 * humidity and storm intrusion are minor drivers; plumbing leaks dominate
 * residential water claims. Labeled editorial.
 */
const RAIN_DRY_IN = 25;

/**
 * EDITORIAL — cold-climate threshold at 5,000 base-65°F HDD/yr. Northern-tier
 * US states run ~5,000–9,000+; the US residential average is ~4,000.
 * (Dayton metro ≈5,200 — pipeline verifies from NOAA normals at build.)
 */
const HDD_COLD = 5000;

/**
 * EDITORIAL — HDD floor (4,000) at which old housing still qualifies as
 * cold-climate risk: pre-1960 envelopes + real winters = attic condensation
 * and ice-dam cycles. Ohio's median year built is 1965 [TOPHAP], so
 * pre-1960 housing is 65+ years old.
 */
const HDD_MILD = 4000;
const OLD_HOUSE_YEAR = 1960;

/** Human-readable archetype descriptions for template use (copy-safe). */
export const ARCHETYPE_DESCRIPTIONS: Record<LayoutArchetype, string> = {
  "flood-prone":
    "Storm and flood recovery drives this market — roof damage, flooding, " +
    "and water-intrusion remediation lead the page.",
  "humid-subtropical":
    "Warm, damp air year-round — AC condensate, plumbing humidity, and " +
    "basement moisture are the top mold drivers here.",
  "cold-climate":
    "Cold winters meet older housing — attic condensation and ice-dam " +
    "moisture cycles lead this market.",
  dry:
    "Low outdoor moisture — plumbing leaks and roof failures, not humidity, " +
    "cause most mold calls here.",
  mixed:
    "Balanced layout — either the data is incomplete or no single climate " +
    "driver dominates, so all major mold sources share the page.",
};

/** Flag checks — small and explicit so each rule reads as data, not magic. */
function isHumid(s: TownLayoutSignals): boolean {
  return (
    s.avgHumidity !== null &&
    s.avgHumidity >= HUMIDITY_LINE &&
    (s.annualRainfallIn === null || s.annualRainfallIn >= RAIN_WET_IN)
  );
}

function isCold(s: TownLayoutSignals): boolean {
  const hdd = s.heatingDegreeDays ?? null;
  const oldHouse =
    (s.housingMedianYearBuilt ?? Infinity) < OLD_HOUSE_YEAR;
  return (
    (hdd !== null && hdd >= HDD_COLD) ||
    (hdd !== null && hdd >= HDD_MILD && oldHouse)
  );
}

function isDry(s: TownLayoutSignals): boolean {
  return (
    s.annualRainfallIn !== null &&
    s.annualRainfallIn <= RAIN_DRY_IN &&
    (s.avgHumidity === null || s.avgHumidity < HUMIDITY_LINE)
  );
}

function allUnknown(s: TownLayoutSignals): boolean {
  return (
    s.floodRisk === "unknown" &&
    s.avgHumidity === null &&
    s.annualRainfallIn === null &&
    (s.heatingDegreeDays ?? null) === null
  );
}

/**
 * Priority lists — ordered section keys per archetype. The first key is the
 * section that renders directly after the local-picture block in the town
 * template. 'faq' always trails (it closes every page).
 */
const PRIORITY: Record<LayoutArchetype, ContentSectionKey[]> = {
  "flood-prone": [
    "storm-flood",
    "roof",
    "basement",
    "insurance",
    "humidity-control",
    "faq",
  ],
  "humid-subtropical": [
    "hvac-condensate",
    "plumbing",
    "basement",
    "crawlspace",
    "humidity-control",
    "faq",
  ],
  "cold-climate": [
    "attic",
    "ice-dam",
    "roof",
    "basement",
    "humidity-control",
    "faq",
  ],
  dry: ["plumbing", "roof", "hvac-condensate", "humidity-control", "faq"],
  // Balanced order drawn from EPA's residential mold guidance: the most
  // common indoor mold locations (basements, plumbing, attics, roofs)
  // share the page when no single driver dominates — or when data is
  // missing and we refuse to guess.
  mixed: ["basement", "plumbing", "attic", "roof", "storm-flood", "faq"],
};

/**
 * resolveLayout — pure function. Precedence order reflects mold-driver
 * severity, not aesthetics:
 *   1. flood-prone — acute water intrusion (floods, storm damage) overwhelms
 *      chronic drivers; remediation demand is event-driven.
 *   2. humid-subtropical — chronic damp air is the everyday driver.
 *   3. cold-climate — winter moisture cycles dominate older housing stock.
 *   4. dry — low ambient moisture; plumbing leaks lead.
 *   5. mixed — unknown data OR no rule matched; never invent a classification.
 */
export function resolveLayout(s: TownLayoutSignals): LayoutResolution {
  const facts: string[] = [];
  if (s.avgHumidity !== null) facts.push(`${s.avgHumidity}% avg RH`);
  if (s.annualRainfallIn !== null)
    facts.push(`${s.annualRainfallIn} in/yr rainfall`);
  facts.push(`flood risk ${s.floodRisk}`);
  if (s.heatingDegreeDays != null)
    facts.push(`${s.heatingDegreeDays} HDD`);
  if (s.housingMedianYearBuilt != null)
    facts.push(`median build year ${s.housingMedianYearBuilt}`);

  if (allUnknown(s)) {
    return {
      archetype: "mixed",
      contentPriority: PRIORITY["mixed"],
      notes:
        "No layout signals available (humidity, rainfall, flood risk, HDD all " +
        "unknown). Balanced layout used — classification will re-resolve once " +
        "the data pipeline fills the signals. Never guessed.",
    };
  }

  if (s.floodRisk === "high") {
    return {
      archetype: "flood-prone",
      contentPriority: PRIORITY["flood-prone"],
      notes:
        `High flood risk (pipeline signal; fold in documented flood history ` +
        `and recent major storm events). Signals: ${facts.join(", ")}. ` +
        `Storm/flood recovery content leads.`,
    };
  }

  if (isHumid(s)) {
    return {
      archetype: "humid-subtropical",
      contentPriority: PRIORITY["humid-subtropical"],
      notes:
        `Avg RH ${s.avgHumidity}% is at/above the EPA 60% mold-risk line ` +
        `with ${s.annualRainfallIn ?? "unknown"} in/yr rainfall. ` +
        `AC condensate and plumbing humidity lead.`,
    };
  }

  if (isCold(s)) {
    return {
      archetype: "cold-climate",
      contentPriority: PRIORITY["cold-climate"],
      notes:
        `${s.heatingDegreeDays} heating degree days ` +
        (s.heatingDegreeDays != null && s.heatingDegreeDays >= HDD_COLD
          ? "marks a cold-winter climate"
          : "plus pre-1960 housing marks a cold-climate risk market") +
        ". Attic condensation and ice-dam content leads.",
    };
  }

  if (isDry(s)) {
    return {
      archetype: "dry",
      contentPriority: PRIORITY["dry"],
      notes:
        `Only ${s.annualRainfallIn} in/yr rainfall with RH below the EPA 60% ` +
        `line — ambient moisture is a minor driver. Plumbing leaks lead.`,
    };
  }

  return {
    archetype: "mixed",
    contentPriority: PRIORITY["mixed"],
    notes:
      `Signals (${facts.join(", ")}) matched no archetype rule — no single ` +
      `climate driver dominates. Balanced layout used rather than inventing ` +
      `a classification.`,
  };
}
