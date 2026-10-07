// ─────────────────────────────────────────────────────────────
// MOLD EMERGENCY TRIAGE ENGINE — pure logic, no JSX.
// Implements ~/workspace/rank-and-rent/triage-tool-spec.md §2.
// Deterministic rule-based verdicts; every threshold cites EPA/CDC.
// ─────────────────────────────────────────────────────────────

export type AnswerKey =
  | "size"
  | "location"
  | "growth"
  | "smell"
  | "water"
  | "symptoms"
  | "vulnerable"
  | "sewage";

export type Answers = Record<AnswerKey, string>;

export type Option = { value: string; label: string };

export type Question = {
  key: AnswerKey;
  q: string;
  why: string;
  options: Option[];
};

export const QUESTIONS: Question[] = [
  {
    key: "size",
    q: "How big is the affected area?",
    why: "Size decides whether it's DIY-able at all (EPA: ~10 sq ft threshold).",
    options: [
      { value: "lt10", label: "Less than 10 sq ft — a few tiles" },
      { value: "10to100", label: "10–100 sq ft — a wall section" },
      { value: "gt100", label: "More than 100 sq ft — multiple walls or rooms" },
    ],
  },
  {
    key: "location",
    q: "Where is it?",
    why: "Location decides whether spores can reach your whole house.",
    options: [
      { value: "bathroom", label: "Bathroom surface — tile, grout" },
      { value: "walls", label: "Walls or ceiling" },
      { value: "basement", label: "Basement or crawl space" },
      { value: "attic", label: "Attic" },
      { value: "hvac", label: "Inside HVAC ducts or vents" },
    ],
  },
  {
    key: "growth",
    q: "What does the growth look like?",
    why: "Thick, extensive growth means a deep colony — not a surface wipe.",
    options: [
      { value: "spotting", label: "Small spotting" },
      { value: "patches", label: "Spreading patches" },
      { value: "extensive", label: "Extensive, thick growth" },
    ],
  },
  {
    key: "smell",
    q: "Is there a musty or earthy smell?",
    why: "Smell you can't see usually means mold is behind something.",
    options: [
      { value: "no", label: "No" },
      { value: "yes", label: "Yes" },
    ],
  },
  {
    key: "water",
    q: "Was there a water event — leak, flood, burst pipe?",
    why: "Mold germinates within 24–48 hours of water exposure (EPA).",
    options: [
      { value: "48h", label: "Within the last 48 hours" },
      { value: "days", label: "In the last few days" },
      { value: "weeks", label: "Weeks ago" },
      { value: "none", label: "No known water event" },
    ],
  },
  {
    key: "symptoms",
    q: "Is anyone in the home having symptoms?",
    why: "Reactions depend on the person, not the mold (CDC 2006).",
    options: [
      { value: "none", label: "No symptoms" },
      { value: "allergies", label: "Allergy symptoms — sneezing, itchy eyes" },
      { value: "asthma", label: "Breathing problems — wheezing, shortness of breath" },
    ],
  },
  {
    key: "vulnerable",
    q: "Any kids, elderly, or people with asthma in the home?",
    why: "Susceptible people react at lower exposure (CDC 2006).",
    options: [
      { value: "no", label: "No" },
      { value: "yes", label: "Yes" },
    ],
  },
  {
    key: "sewage",
    q: "Is sewage or dirty floodwater involved?",
    why: "Sewage is Category-3 black water — always a professional job.",
    options: [
      { value: "no", label: "No" },
      { value: "yes", label: "Yes" },
    ],
  },
];

export type VerdictLevel = "green" | "yellow" | "red";

export type Verdict = {
  level: VerdictLevel;
  title: string;
  summary: string;
  actions: string[];
  cta: "diy" | "call48" | "callnow";
};

/**
 * Verdict rules (spec §2). RED conditions are evaluated first and always win.
 * GREEN requires the full small-and-surface-and-clean conjunction.
 * Everything else is YELLOW.
 */
export function computeVerdict(a: Answers): Verdict {
  // ── RED overrides (honesty rules: never soften these) ──
  if (a.sewage === "yes")
    return {
      level: "red",
      title: "Level 3 — Emergency: call now",
      summary:
        "Sewage water is Category-3 black water. This is always a professional job — don't touch it, don't wait.",
      actions: [
        "Stay out of the affected area entirely.",
        "Do NOT scrub, tear out, or disturb anything — you'll spread contamination.",
        "Call now — this can't wait for business hours.",
      ],
      cta: "callnow",
    };
  if (a.location === "hvac")
    return {
      level: "red",
      title: "Level 3 — Emergency: call now",
      summary:
        "Mold inside HVAC ducts circulates spores through your whole house every time the system runs. This is always a professional job.",
      actions: [
        "Turn the HVAC system OFF until it's inspected.",
        "Do NOT run fans or the system 'to air it out' — that spreads it.",
        "Call now — duct contamination gets worse with every cycle.",
      ],
      cta: "callnow",
    };
  if (a.size === "gt100")
    return {
      level: "red",
      title: "Level 3 — Emergency: call now",
      summary:
        "More than 100 sq ft is far beyond any DIY guideline (EPA: ~10 sq ft). Large colonies need containment, HEPA filtration, and professional removal.",
      actions: [
        "Do NOT disturb the area — tearing into large mold spreads spores everywhere.",
        "Close off the area if you can (shut doors).",
        "Call now — get a free inspection and a written quote.",
      ],
      cta: "callnow",
    };
  if (a.growth === "extensive")
    return {
      level: "red",
      title: "Level 3 — Emergency: call now",
      summary:
        "Thick, extensive growth means a deep, established colony — not a surface wipe. Disturbing it without containment makes it worse.",
      actions: [
        "Do NOT scrub or scrape it — you'll aerosolize a massive spore load.",
        "Keep people and pets away from the area.",
        "Call now — this needs professional containment.",
      ],
      cta: "callnow",
    };
  if (a.symptoms === "asthma")
    return {
      level: "red",
      title: "Level 3 — Emergency: call now",
      summary:
        "Breathing problems around mold are never 'fine.' Get fresh air, and if symptoms are serious, see a doctor — then get the mold handled by a professional immediately.",
      actions: [
        "Prioritize health first: fresh air, and medical help if breathing is bad.",
        "Do NOT try to clean it yourself while symptomatic.",
        "Call now — tell the inspector about the symptoms so they prioritize you.",
      ],
      cta: "callnow",
    };
  if (a.symptoms === "allergies" && a.vulnerable === "yes")
    return {
      level: "red",
      title: "Level 3 — Emergency: call now",
      summary:
        "Allergy symptoms plus kids, elderly, or asthma in the home is the CDC's susceptible-persons case — reactions happen at lower exposure. Don't gamble with it.",
      actions: [
        "Keep vulnerable people away from the affected area.",
        "Don't attempt DIY removal — disturbing mold spikes spore counts.",
        "Call now — mention the symptoms so you're prioritized.",
      ],
      cta: "callnow",
    };

  // ── GREEN: the full small-and-surface-and-clean conjunction ──
  const green =
    a.size === "lt10" &&
    a.location === "bathroom" &&
    a.growth === "spotting" &&
    a.smell === "no" &&
    a.symptoms === "none" &&
    a.vulnerable === "no" &&
    a.sewage === "no";
  if (green)
    return {
      level: "green",
      title: "Level 1 — DIY-able, with protection",
      summary:
        "Small surface mold under ~10 sq ft is the one case EPA guidance says a homeowner can generally handle — safely, with protection.",
      actions: [
        "Gear up: N95 mask, gloves, goggles. Ventilate the room.",
        "Scrub with detergent + water. Bleach whitens it — it doesn't remove it.",
        "Dry the area completely (EPA: within 24–48h of any water event).",
        "Fix the moisture source — or the mold comes back.",
        "If it spreads past ~10 sq ft or returns: stop and call a pro.",
      ],
      cta: "diy",
    };

  // ── YELLOW: everything else ──
  return {
    level: "yellow",
    title: "Level 2 — Call within 48 hours",
    summary:
      "This is beyond DIY but not an emergency — a professional should see it within 48 hours. Mold spreads fast once established (EPA: 24–48h germination window).",
    actions: [
      "Close off the area — shut doors; don't run fans blowing across it.",
      "Keep indoor humidity under 60% (EPA: ideal 30–50%) — run a dehumidifier.",
      "Don't scrub large patches yourself — you'll spread spores.",
      "Take dated photos for the inspector.",
      a.water === "48h"
        ? "The 48-hour clock is ticking on that water event — dry it fast."
        : "Book the free inspection — it's the fastest way to an exact quote.",
    ],
    cta: "call48",
  };
}

/** Damage-level reference cards (spec §4) — SVG/text only, no photos. */
export type DamageLevel = {
  level: number;
  name: string;
  desc: string;
  places: string;
  action: string;
};

export const DAMAGE_LEVELS: DamageLevel[] = [
  {
    level: 1,
    name: "Surface spotting",
    desc: "Small spots, under 10 sq ft, on non-porous surfaces.",
    places: "Bathroom tile, grout, window sills",
    action: "DIY with protection",
  },
  {
    level: 2,
    name: "Room patches",
    desc: "Spreading patches, 10–100 sq ft.",
    places: "Walls, ceilings",
    action: "Pro within 48h",
  },
  {
    level: 3,
    name: "Structural spread",
    desc: "Over 100 sq ft, or behind walls and under floors.",
    places: "Basement, attic, behind drywall",
    action: "Pro now",
  },
  {
    level: 4,
    name: "Systemic",
    desc: "HVAC contamination or sewage water.",
    places: "Ducts, vents, flooded areas",
    action: "Emergency — don't disturb",
  },
];
