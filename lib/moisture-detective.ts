// ─────────────────────────────────────────────────────────────
// MOISTURE DETECTIVE ENGINE — pure logic, no JSX.
// Rule-based ranking of likely moisture causes, in order worth checking.
// Honesty rules: no probabilities, no percentages, no invented stats.
// Every cause is established building science; outputs are labeled
// "likely causes to investigate, in order worth checking" — never a diagnosis.
// ─────────────────────────────────────────────────────────────

export type Room =
  | "attic"
  | "bedroom-closet"
  | "bathroom"
  | "kitchen"
  | "laundry"
  | "basement"
  | "exterior";

export const ROOMS: { id: Room; label: string; short: string }[] = [
  { id: "attic", label: "Attic", short: "Attic" },
  { id: "bedroom-closet", label: "Bedroom / Closet", short: "Bedroom" },
  { id: "bathroom", label: "Bathroom", short: "Bathroom" },
  { id: "kitchen", label: "Kitchen", short: "Kitchen" },
  { id: "laundry", label: "Laundry room", short: "Laundry" },
  { id: "basement", label: "Basement", short: "Basement" },
  { id: "exterior", label: "Outside / Exterior", short: "Outside" },
];

export type CauseId =
  | "missing-exhaust-fan"
  | "plumbing-leak"
  | "window-condensation"
  | "roof-leak-flashing"
  | "poor-attic-ventilation"
  | "grading-seepage"
  | "capillary-wicking"
  | "gutter-downspout"
  | "dryer-vent"
  | "ac-condensate"
  | "fan-vents-to-attic"
  | "sump-pump";

export type Cause = {
  id: CauseId;
  title: string;
  reasoning: string;
  checkThis: string;
};

export const CAUSES: Record<CauseId, Cause> = {
  "missing-exhaust-fan": {
    id: "missing-exhaust-fan",
    title: "No working exhaust fan",
    reasoning:
      "A hot shower loads the air with moisture. With no working fan to carry it outside, that damp air sits in the room and condenses on the coolest surfaces — walls, ceiling, mirrors — feeding mold between cleanings.",
    checkThis:
      "Hold a tissue to the fan grille while it's on — a working fan should hold it against the grille. Then confirm the duct vents outdoors, not into the attic or a wall cavity.",
  },
  "plumbing-leak": {
    id: "plumbing-leak",
    title: "Slow plumbing leak",
    reasoning:
      "Supply lines and drain traps fail slowly: a weeping supply valve or a loose drain can soak a cabinet or wall cavity for weeks before anyone sees water. A musty smell near fixtures with no visible water is the classic tell.",
    checkThis:
      "Look under sinks with a flashlight for stains, swollen particleboard, or crusty mineral deposits on valves. With all fixtures off, check your water meter — a moving meter means water is going somewhere.",
  },
  "window-condensation": {
    id: "window-condensation",
    title: "Window and cold-surface condensation",
    reasoning:
      "Condensation on glass is usually indoor humidity meeting a cold surface — not a leak from outside. Warm, moist indoor air cools at the window (or a cold exterior wall) and drops the moisture it was carrying as liquid water.",
    checkThis:
      "Check indoor humidity with an inexpensive hygrometer — EPA guidance is to keep it between 30% and 50%. If windows sweat on cold mornings, lower indoor humidity before blaming the windows.",
  },
  "roof-leak-flashing": {
    id: "roof-leak-flashing",
    title: "Roof leak at flashing or penetrations",
    reasoning:
      "Roofs rarely leak in the middle of a shingle field. Water almost always enters at flashing, plumbing vents, chimneys, and valleys — then travels along the underside of the roof deck before it drips, often far from where it got in.",
    checkThis:
      "In daylight, inspect the underside of the roof deck for dark stains near chimneys, vents, and valleys. A roof over 20 years old is past the point where its flashing should have been checked.",
  },
  "poor-attic-ventilation": {
    id: "poor-attic-ventilation",
    title: "Trapped attic moisture (poor ventilation)",
    reasoning:
      "Warm, moist air rises from the living space below (the stack effect). If soffit vents are blocked or ridge venting is weak, that moisture gets trapped and condenses on the cold underside of the roof deck.",
    checkThis:
      "Make sure soffit vents are visible and clear, with baffles keeping insulation off them. A healthy attic breathes — a damp-smelling one is telling you something.",
  },
  "grading-seepage": {
    id: "grading-seepage",
    title: "Grading slopes toward the foundation",
    reasoning:
      "Water follows the slope. When soil grades toward the house — or downspouts dump within a few feet of it — every rain drives water straight at the foundation wall, and some of it always finds a way in.",
    checkThis:
      "Sight along the foundation: soil should drop about 6 inches over the first 10 feet away from the house. Extend every downspout at least 6 feet out from the wall.",
  },
  "capillary-wicking": {
    id: "capillary-wicking",
    title: "Capillary wicking through foundation walls",
    reasoning:
      "Concrete and block are porous. Groundwater wicks up and through foundation walls by capillary action — the white, chalky crust called efflorescence is the mineral residue left behind when that wicked water evaporates.",
    checkThis:
      "Look for efflorescence on the walls and dampness at the wall-to-floor joint. The crust itself isn't mold, but it proves water is moving through the wall.",
  },
  "gutter-downspout": {
    id: "gutter-downspout",
    title: "Overflowing or misrouted gutters",
    reasoning:
      "A roof sheds a large volume of water in a single storm. Clogged gutters overflow and pour that water right down the wall and onto the foundation the system was built to protect.",
    checkThis:
      "Watch the gutters during rain — overflow anywhere means they're clogged or pitched wrong. Route every downspout well away from the foundation.",
  },
  "dryer-vent": {
    id: "dryer-vent",
    title: "Dryer venting indoors or disconnected",
    reasoning:
      "A clothes dryer drives a heavy load of moisture out with every load. If the duct is disconnected, crushed, or ends in the room, all of that moisture stays inside your house.",
    checkThis:
      "Trace the duct from the dryer to an outdoor termination — it should be smooth, rigid metal with a working damper flap, and it should never end in the room, the attic, or the crawl space.",
  },
  "ac-condensate": {
    id: "ac-condensate",
    title: "Clogged AC condensate drain",
    reasoning:
      "An air conditioner wrings a steady stream of water from the air on humid days and drains it through a small line. When that line clogs, the pan overflows — usually silently, inside a ceiling, wall, or closet.",
    checkThis:
      "Find the indoor air handler and check the drain pan for standing water. Clear or blow out the condensate line and make sure it slopes continuously to a drain.",
  },
  "fan-vents-to-attic": {
    id: "fan-vents-to-attic",
    title: "Bathroom fan vents into the attic",
    reasoning:
      "A bathroom fan that ends in the attic pumps shower steam straight into the coldest part of the house. That warm, moist air condenses on the roof sheathing — quietly feeding mold winter after winter.",
    checkThis:
      "Follow the duct from the bathroom fan: it must terminate outdoors through the roof or a gable wall, with a working damper. If it ends in the attic or a soffit, reroute it.",
  },
  "sump-pump": {
    id: "sump-pump",
    title: "Sump pump not keeping up",
    reasoning:
      "In wet weather a sump pit collects the groundwater your foundation can't shed. A dead pump, a stuck float, or an overwhelmed pit means that water rises through the floor instead.",
    checkThis:
      "Pour a few gallons of water into the pit — the pump should kick on quickly and drain it. If it doesn't, the float or the pump needs attention before the next rain.",
  },
};

/** Base candidate causes per room, in default check order. */
export const ROOM_CAUSES: Record<Room, CauseId[]> = {
  bathroom: [
    "missing-exhaust-fan",
    "plumbing-leak",
    "window-condensation",
    "fan-vents-to-attic",
  ],
  kitchen: ["plumbing-leak", "window-condensation", "gutter-downspout"],
  basement: [
    "grading-seepage",
    "capillary-wicking",
    "sump-pump",
    "gutter-downspout",
    "plumbing-leak",
  ],
  attic: [
    "roof-leak-flashing",
    "poor-attic-ventilation",
    "fan-vents-to-attic",
    "ac-condensate",
  ],
  laundry: ["dryer-vent", "plumbing-leak", "window-condensation"],
  "bedroom-closet": [
    "window-condensation",
    "ac-condensate",
    "roof-leak-flashing",
  ],
  exterior: [
    "grading-seepage",
    "gutter-downspout",
    "roof-leak-flashing",
    "capillary-wicking",
  ],
};

export type Option = { value: string; label: string };

export type Question = {
  key: string;
  q: string;
  why: string;
  options: Option[];
};

/** 4–6 questions per room. Option values are matched by SIGNALS. */
export const ROOM_QUESTIONS: Record<Room, Question[]> = {
  bathroom: [
    {
      key: "fan",
      q: "Does the bathroom have an exhaust fan that works?",
      why: "A working fan is the main way shower moisture leaves the room.",
      options: [
        { value: "yes-working", label: "Yes — and it moves air well" },
        { value: "weak", label: "Yes, but it's weak or noisy and old" },
        { value: "no-fan", label: "No fan at all" },
      ],
    },
    {
      key: "condensation",
      q: "After a hot shower, do mirrors or walls stay fogged?",
      why: "Fog that lingers means moisture is hanging around instead of venting out.",
      options: [
        { value: "yes", label: "Yes — it takes a while to clear" },
        { value: "no", label: "No — clears quickly" },
      ],
    },
    {
      key: "leak-signs",
      q: "Any stains on the ceiling below, or soft spots around the tub or toilet?",
      why: "Stains and soft drywall point to water getting where it shouldn't.",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      key: "smell",
      q: "Musty or earthy smell near the vanity, tub, or toilet?",
      why: "Smell without visible water often means a slow leak inside the wall or cabinet.",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
  ],
  kitchen: [
    {
      key: "sink-leak",
      q: "Any drips, wet spots, or warped wood under the sink?",
      why: "The sink cabinet is where kitchen leaks start — and hide.",
      options: [
        { value: "yes", label: "Yes — something's damp under there" },
        { value: "no", label: "No — dry as a bone" },
      ],
    },
    {
      key: "dishwasher",
      q: "Water stains or dampness around the dishwasher?",
      why: "Dishwasher supply and drain lines fail slowly behind the kick plate.",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      key: "fridge",
      q: "Dampness or staining behind or under the fridge, near the ice-maker line?",
      why: "Ice-maker lines are small, plastic, and often forgotten until they leak.",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      key: "condensation",
      q: "Do the kitchen windows fog up when you cook?",
      why: "Cooking adds moisture to the air — fogged windows mean it's not clearing.",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
  ],
  basement: [
    {
      key: "grading",
      q: "Does the ground slope toward the house, or do downspouts dump near the foundation?",
      why: "The slope of your soil decides where rainwater goes.",
      options: [
        { value: "yes-toward", label: "Yes — slopes toward the house" },
        { value: "no-away", label: "No — slopes away" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      key: "efflorescence",
      q: "White, chalky crust on the foundation walls?",
      why: "That's efflorescence — mineral left behind by water moving through the wall.",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      key: "sump",
      q: "Sump pump situation?",
      why: "The pump is your last line of defense in wet weather.",
      options: [
        { value: "works", label: "Have one — it runs fine" },
        { value: "dead", label: "Have one, but it doesn't run" },
        { value: "no-pump", label: "Pit, but no pump in it" },
        { value: "no-pit", label: "No sump pit at all" },
      ],
    },
    {
      key: "water-event",
      q: "Standing water or a damp floor after heavy rain?",
      why: "Water that appears after rain is coming from outside, not inside.",
      options: [
        { value: "yes", label: "Yes — after rain" },
        { value: "no", label: "No" },
      ],
    },
  ],
  attic: [
    {
      key: "roof-age",
      q: "How old is the roof?",
      why: "Flashing and shingles wear out — age narrows the suspect list.",
      options: [
        { value: "under10", label: "Under 10 years" },
        { value: "10to20", label: "10–20 years" },
        { value: "20plus", label: "Over 20 years" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      key: "stains",
      q: "Dark stains on the underside of the roof deck?",
      why: "Stains on the sheathing mark where water has traveled — check near chimneys, vents, and valleys.",
      options: [
        { value: "yes", label: "Yes — I can see stains" },
        { value: "no", label: "No" },
        { value: "unsure", label: "Can't get a good look" },
      ],
    },
    {
      key: "bath-vents",
      q: "Where do the bathroom fans vent?",
      why: "A fan dumping into the attic is one of the most common attic moisture sources.",
      options: [
        { value: "outdoors", label: "Outside — through the roof or wall" },
        { value: "attic", label: "Into the attic or soffit" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      key: "soffit",
      q: "Are the soffit vents clear and visible?",
      why: "Blocked soffits starve the attic of airflow, trapping moisture rising from below.",
      options: [
        { value: "yes", label: "Yes — clear" },
        { value: "no-blocked", label: "No — blocked or hard to find" },
        { value: "unsure", label: "Not sure" },
      ],
    },
  ],
  laundry: [
    {
      key: "dryer-vent",
      q: "Does the dryer duct run all the way outdoors with a working damper flap?",
      why: "Every load of laundry adds a big dose of moisture — it has to go outside.",
      options: [
        { value: "yes", label: "Yes — solid duct to the outside" },
        { value: "no", label: "No — ends indoors, or it's disconnected" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      key: "condensation",
      q: "Does the room feel damp or humid when the dryer runs?",
      why: "Humidity during a cycle means exhaust air is escaping into the room.",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      key: "washer",
      q: "Water stains or dampness around the washer hoses or floor drain?",
      why: "Washer hoses and drains leak slowly before they fail outright.",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      key: "wall-stains",
      q: "Stains on the wall behind or beside the machines?",
      why: "Stains mark where water has run or condensed repeatedly.",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
  ],
  "bedroom-closet": [
    {
      key: "window",
      q: "Condensation or mold on the window glass, frames, or sills?",
      why: "Cold glass is where indoor humidity condenses first.",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      key: "exterior-wall",
      q: "Is the problem wall an exterior (cold) wall?",
      why: "Cold exterior walls condense indoor moisture the same way windows do.",
      options: [
        { value: "yes", label: "Yes — exterior wall" },
        { value: "no", label: "No — interior wall" },
      ],
    },
    {
      key: "hvac",
      q: "Is there an AC air handler or furnace in or next to this room or closet?",
      why: "Air handlers carry condensate drains that clog and overflow silently.",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
    {
      key: "stains",
      q: "Brown water stains on the ceiling?",
      why: "Ceiling stains usually mean water from above — roof or plumbing.",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
      ],
    },
  ],
  exterior: [
    {
      key: "grading",
      q: "Does the ground slope toward the house?",
      why: "Slope decides where rain goes — toward you or away.",
      options: [
        { value: "yes-toward", label: "Yes — slopes toward the house" },
        { value: "no-away", label: "No — slopes away" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      key: "gutters",
      q: "Are gutters clogged, overflowing, or missing in spots?",
      why: "One storm's roof runoff is a large volume of water — it has to go somewhere.",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No — clean and complete" },
      ],
    },
    {
      key: "downspouts",
      q: "Do downspouts discharge within a few feet of the foundation?",
      why: "A downspout that ends at the wall just relocates the problem.",
      options: [
        { value: "yes", label: "Yes — right at the wall" },
        { value: "no", label: "No — routed well away" },
      ],
    },
    {
      key: "roof-age",
      q: "How old is the roof?",
      why: "Flashing and shingles wear out — age narrows the suspect list.",
      options: [
        { value: "under10", label: "Under 10 years" },
        { value: "10to20", label: "10–20 years" },
        { value: "20plus", label: "Over 20 years" },
        { value: "unsure", label: "Not sure" },
      ],
    },
  ],
};

export type Answers = Record<string, string>;

type Signal = {
  room?: Room;
  cause: CauseId;
  key: string;
  values: string[];
  boost: number;
};

/** Answer → cause relevance boosts. No probabilities — just ranking weight. */
const SIGNALS: Signal[] = [
  // Bathroom
  { room: "bathroom", cause: "missing-exhaust-fan", key: "fan", values: ["no-fan"], boost: 4 },
  { room: "bathroom", cause: "missing-exhaust-fan", key: "fan", values: ["weak"], boost: 3 },
  // A fan confirmed working rules this cause down (negative weight is fine —
  // it's ranking evidence, not a probability).
  { room: "bathroom", cause: "missing-exhaust-fan", key: "fan", values: ["yes-working"], boost: -12 },
  { room: "bathroom", cause: "window-condensation", key: "condensation", values: ["yes"], boost: 5 },
  { room: "bathroom", cause: "plumbing-leak", key: "leak-signs", values: ["yes"], boost: 4 },
  { room: "bathroom", cause: "plumbing-leak", key: "smell", values: ["yes"], boost: 2 },
  // Kitchen
  { room: "kitchen", cause: "plumbing-leak", key: "sink-leak", values: ["yes"], boost: 3 },
  { room: "kitchen", cause: "plumbing-leak", key: "dishwasher", values: ["yes"], boost: 2 },
  { room: "kitchen", cause: "plumbing-leak", key: "fridge", values: ["yes"], boost: 2 },
  { room: "kitchen", cause: "window-condensation", key: "condensation", values: ["yes"], boost: 4 },
  // Basement
  { room: "basement", cause: "grading-seepage", key: "grading", values: ["yes-toward"], boost: 3 },
  { room: "basement", cause: "grading-seepage", key: "water-event", values: ["yes"], boost: 2 },
  { room: "basement", cause: "capillary-wicking", key: "efflorescence", values: ["yes"], boost: 4 },
  { room: "basement", cause: "sump-pump", key: "sump", values: ["dead"], boost: 7 },
  { room: "basement", cause: "sump-pump", key: "sump", values: ["no-pump"], boost: 2 },
  { room: "basement", cause: "sump-pump", key: "water-event", values: ["yes"], boost: 2 },
  { room: "basement", cause: "plumbing-leak", key: "water-event", values: ["no"], boost: 1 },
  // Attic
  { room: "attic", cause: "roof-leak-flashing", key: "roof-age", values: ["20plus"], boost: 3 },
  { room: "attic", cause: "roof-leak-flashing", key: "roof-age", values: ["10to20"], boost: 1 },
  { room: "attic", cause: "roof-leak-flashing", key: "stains", values: ["yes"], boost: 3 },
  { room: "attic", cause: "fan-vents-to-attic", key: "bath-vents", values: ["attic"], boost: 8 },
  { room: "attic", cause: "fan-vents-to-attic", key: "bath-vents", values: ["unsure"], boost: 3 },
  { room: "attic", cause: "poor-attic-ventilation", key: "soffit", values: ["no-blocked"], boost: 4 },
  { room: "attic", cause: "poor-attic-ventilation", key: "soffit", values: ["unsure"], boost: 1 },
  // Laundry
  { room: "laundry", cause: "dryer-vent", key: "dryer-vent", values: ["no"], boost: 4 },
  { room: "laundry", cause: "dryer-vent", key: "dryer-vent", values: ["unsure"], boost: 2 },
  { room: "laundry", cause: "dryer-vent", key: "condensation", values: ["yes"], boost: 2 },
  { room: "laundry", cause: "window-condensation", key: "condensation", values: ["yes"], boost: 2 },
  { room: "laundry", cause: "plumbing-leak", key: "washer", values: ["yes"], boost: 3 },
  { room: "laundry", cause: "plumbing-leak", key: "wall-stains", values: ["yes"], boost: 2 },
  // Bedroom / closet
  { room: "bedroom-closet", cause: "window-condensation", key: "window", values: ["yes"], boost: 3 },
  { room: "bedroom-closet", cause: "window-condensation", key: "exterior-wall", values: ["yes"], boost: 2 },
  { room: "bedroom-closet", cause: "ac-condensate", key: "hvac", values: ["yes"], boost: 4 },
  { room: "bedroom-closet", cause: "roof-leak-flashing", key: "stains", values: ["yes"], boost: 4 },
  // Exterior
  { room: "exterior", cause: "grading-seepage", key: "grading", values: ["yes-toward"], boost: 3 },
  { room: "exterior", cause: "grading-seepage", key: "downspouts", values: ["yes"], boost: 2 },
  { room: "exterior", cause: "gutter-downspout", key: "gutters", values: ["yes"], boost: 4 },
  { room: "exterior", cause: "gutter-downspout", key: "downspouts", values: ["yes"], boost: 2 },
  { room: "exterior", cause: "roof-leak-flashing", key: "roof-age", values: ["20plus"], boost: 4 },
  { room: "exterior", cause: "capillary-wicking", key: "grading", values: ["yes-toward"], boost: 1 },
];

export type RankedCause = Cause & { order: number };

export type Diagnosis = {
  room: Room;
  roomLabel: string;
  causes: RankedCause[];
  note: string;
};

export const NOT_A_DIAGNOSIS =
  "This is not a diagnosis — these are likely causes to investigate, in order worth checking. Work down the list and rule each one out. If you find the source, fix the moisture first: mold treated without fixing the water always comes back.";

/**
 * Rank the likely moisture causes for a room given the user's answers.
 * Deterministic: base check-order per room, plus relevance boosts from
 * matching answers. Never asserts a single cause — returns 3–5 ranked
 * candidates, most relevant first.
 */
export function diagnose(room: Room, answers: Answers): Diagnosis {
  const base = ROOM_CAUSES[room];
  const scored = base.map((id, i) => {
    // Base check-order weight is deliberately small (3 per rank) so that
    // real evidence from answers can reorder the list; a decisive answer
    // can move its cause to the top.
    let score = (base.length - i) * 3;
    for (const s of SIGNALS) {
      if (s.cause !== id) continue;
      if (s.room && s.room !== room) continue;
      const v = answers[s.key];
      if (v !== undefined && s.values.includes(v)) score += s.boost;
    }
    return { id, score, baseIdx: i };
  });
  scored.sort((a, b) => b.score - a.score || a.baseIdx - b.baseIdx);
  const causes: RankedCause[] = scored
    .slice(0, 4)
    .map((s, i) => ({ ...CAUSES[s.id], order: i + 1 }));
  const label = ROOMS.find((r) => r.id === room)?.label ?? room;
  return { room, roomLabel: label, causes, note: NOT_A_DIAGNOSIS };
}
