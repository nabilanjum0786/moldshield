// ─────────────────────────────────────────────────────────────
// Checklist data — mirrors ~/workspace/rank-and-rent/mold-inspection-checklist.md
// Every fact sourced from the research pack (EPA 24–48h, <60% RH,
// ~10 sq ft homeowner guidance, CDC 2006). No invented claims.
// ─────────────────────────────────────────────────────────────

export type ChecklistRoom = {
  room: string;
  icon: "home" | "shield" | "check" | "clock" | "pin";
  items: string[];
};

export const CHECKLIST_ROOMS: ChecklistRoom[] = [
  {
    room: "Attic",
    icon: "home",
    items: [
      "Dark staining on roof sheathing or rafters — especially around nail tips (condensation rusts nails first)",
      "Damp spots around vents, chimneys, or bath-fan terminations — fans must vent OUTSIDE, never into the attic",
      "Musty odor on a warm day (heat amplifies it)",
      "Frost or condensation on the underside of the roof deck in cold weather",
      "Damp, compressed, or displaced insulation (wet insulation = ongoing moisture)",
    ],
  },
  {
    room: "Basement",
    icon: "home",
    items: [
      "White crusty mineral deposits where wall meets floor (efflorescence — not mold itself, but where water goes, mold follows)",
      'Musty / earthy "old basement" smell',
      "Peeling paint, water stains, or warped paneling",
      "Dampness behind stored items and under stairs (mold hides where air doesn't move)",
      "Dehumidifier running? Indoor humidity should stay under 60% (EPA: ideal 30–50%)",
    ],
  },
  {
    room: "Crawl space",
    icon: "shield",
    items: [
      "Standing water or muddy soil after rain",
      "Dark staining or fuzzy growth on floor joists",
      "Vapor barrier torn, displaced, or missing entirely",
      "Musty air rising from the access hatch into the house",
    ],
  },
  {
    room: "Bathrooms",
    icon: "check",
    items: [
      "Black spotting along tub/shower caulk lines",
      "Ceiling staining above the shower (fan undersized — or never switched on?)",
      "Exhaust fan vents fully outside and runs 20+ minutes after showers",
      "Damp cabinet floor or musty odor under sinks",
    ],
  },
  {
    room: "Kitchen",
    icon: "check",
    items: [
      "Damp cabinet base, slow drips, or musty smell under the sink",
      "Moisture behind/around the dishwasher and fridge (supply lines, ice maker)",
      "Condensation staining on window sills",
    ],
  },
  {
    room: "Laundry room",
    icon: "clock",
    items: [
      "Dryer venting fully outside — not into the attic or crawl space",
      "Washer hoses and drain free of slow leaks",
      "Lint + moisture buildup around the dryer (mold food + water)",
    ],
  },
  {
    room: "HVAC system",
    icon: "shield",
    items: [
      "Standing water or slime in the AC drain pan / drain line",
      "Musty odor from vents when the system kicks on",
      "Clogged filter (poor airflow + trapped moisture)",
      "⚠️ If you suspect mold INSIDE ductwork: do NOT run the system to “test it” — call a professional. Disturbing HVAC mold spreads spores through the whole house.",
    ],
  },
  {
    room: "Exterior & drainage",
    icon: "pin",
    items: [
      "Gutters discharging at least 6 ft from the foundation; grading slopes AWAY from the house",
      "Splash-back staining on siding near the ground",
      "Clogged gutters or downspouts (fall leaves → winter ice dams → spring leaks)",
    ],
  },
];

export const CHECKLIST_ITEM_COUNT = CHECKLIST_ROOMS.reduce(
  (n, r) => n + r.items.length,
  0
);

export const CHECKLIST_VERDICTS = [
  {
    title: "A few checks, surface mold only, under ~10 sq ft",
    body: "EPA guidance says a homeowner can generally handle this — with protection: N95 mask, gloves, goggles. Scrub with detergent + water. Bleach whitens mold — it doesn't remove it. Dry the area completely, and fix the moisture source, or it comes back.",
  },
  {
    title: "Checks across multiple rooms, hidden areas, or over ~10 sq ft",
    body: "Call a professional. Don't scrub large patches yourself — you'll spread spores through the house.",
  },
  {
    title: "HVAC contamination, sewage involvement, or breathing symptoms",
    body: "Call now. Don't wait, don't disturb it.",
  },
];
