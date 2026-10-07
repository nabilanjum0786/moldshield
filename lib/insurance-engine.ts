// ─────────────────────────────────────────────────────────────
// Insurance coverage decision tree — pure logic, no JSX.
// General guidance only: never promises coverage. Flood exclusion and
// gradual-damage exclusion reflect standard HO-3 homeowners policy terms
// (widely documented by III/NAIC); the verdict always defers to the
// tenant's actual policy and insurer.
// ─────────────────────────────────────────────────────────────

export type Cause =
  | "burst" // burst pipe
  | "appliance" // appliance leak (washer, water heater)
  | "storm" // storm damage (wind/rain through roof)
  | "flood" // rising water / flooding
  | "slowleak" // long-term slow leak
  | "humidity" // condensation / high humidity
  | "unknown";

export type Speed = "sudden" | "gradual" | "unsure";
export type Acted = "yes" | "no" | "just";

export type CoverageAnswers = {
  cause: Cause;
  speed: Speed;
  acted48: Acted;
};

export type CoverageLevel = "covered" | "notcovered" | "review";

export type CoverageVerdict = {
  level: CoverageLevel;
  title: string;
  summary: string;
  reasons: string[];
  nextSteps: string[];
};

const NEXT_STEPS_BASE = [
  "Call your insurer BEFORE any remediation work starts — the order matters for claims.",
  "Photograph and video everything now, with dates. Keep every receipt.",
  "Get a professional mold inspection so the cause and scope are documented in writing.",
];

export function computeCoverage(a: CoverageAnswers): CoverageVerdict {
  // Flood: standard homeowners policies exclude flood damage. Plain truth.
  if (a.cause === "flood") {
    return {
      level: "notcovered",
      title: "Likely not covered",
      summary:
        "Standard homeowners insurance does not cover flood damage — rising water from outside needs separate flood insurance (for example, through the National Flood Insurance Program).",
      reasons: [
        "Flood is a standard exclusion on almost every homeowners policy.",
        "Mold that follows a flood is treated as part of the flood loss, not a separate covered event.",
      ],
      nextSteps: [
        "Check whether you carry separate flood insurance — if so, file there immediately.",
        "Document everything anyway: photos, dates, receipts. FEMA disaster assistance sometimes follows major floods.",
        "Dry and remediate regardless — mold won't wait for paperwork (EPA: mold can start in 24–48 hours).",
      ],
    };
  }

  // Gradual damage / neglect exclusion.
  if (a.cause === "slowleak" || a.speed === "gradual") {
    return {
      level: "notcovered",
      title: "Likely not covered",
      summary:
        "Insurers generally exclude damage that built up gradually over weeks or months — that's classified as maintenance/neglect, not a sudden insurable event.",
      reasons: [
        "Policies cover sudden, accidental events — not long-term leaks or deferred maintenance.",
        "If the leak was visible (or should have been found) and left alone, the resulting mold is usually excluded.",
      ],
      nextSteps: [
        "Still read your policy's mold endorsement — a few policies add limited mold coverage even here.",
        "Fix the source and remediate promptly; the longer it waits, the more it costs.",
        "Ask your agent what documentation would have changed the outcome, for next time.",
      ],
    };
  }

  // Sudden, accidental, covered-peril causes.
  if (
    (a.cause === "burst" || a.cause === "appliance" || a.cause === "storm") &&
    a.speed === "sudden"
  ) {
    if (a.acted48 === "no") {
      return {
        level: "review",
        title: "Needs review — act fast",
        summary:
          "The cause itself (burst pipe, appliance failure, storm damage) is the kind of sudden event policies usually cover — but waiting more than 48 hours to act can give the insurer room to dispute the mold portion of the claim.",
        reasons: [
          "Sudden water damage from a covered peril is typically a covered loss.",
          "Mold that grew because cleanup was delayed is where claims get contested.",
        ],
        nextSteps: [
          ...NEXT_STEPS_BASE,
          "Start drying and mitigation TODAY — insurers expect you to limit further damage.",
        ],
      };
    }
    return {
      level: "covered",
      title: "Likely covered",
      summary:
        "A sudden burst pipe, appliance failure, or storm damage is exactly the kind of event homeowners insurance is built for — and mold resulting from it is usually part of the same claim, up to your policy's terms and deductible.",
      reasons: [
        "Sudden, accidental water damage from a covered peril is a standard covered loss.",
        "You acted (or are acting) within 48 hours, which protects the mold portion of the claim.",
        "Many policies include a limited mold endorsement (often around $10,000) — check yours.",
      ],
      nextSteps: NEXT_STEPS_BASE,
    };
  }

  // Humidity / unknown / unsure → human review.
  return {
    level: "review",
    title: "Needs review",
    summary:
      "Humidity-driven mold and unclear causes sit in a gray area: coverage depends on whether an underlying covered event (like a hidden pipe leak) caused it. This one needs your policy and an adjuster, not a quiz.",
    reasons: [
      "No sudden, identifiable covered peril was established.",
      "An inspection may uncover a covered cause (for example, a slow supply-line leak behind a wall).",
    ],
    nextSteps: [
      ...NEXT_STEPS_BASE,
      "Ask the inspector specifically: is there a sudden, accidental source behind this moisture?",
    ],
  };
}
