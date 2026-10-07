// ─────────────────────────────────────────────────────────────
// 14-day flood/water-event action plan — pure logic, no JSX.
// Anchored on the EPA 24–48h rule (mold can begin growing within
// 24–48 hours of water exposure) and the ~10 sq ft DIY threshold.
// Dates are computed from the user-picked event date.
// ─────────────────────────────────────────────────────────────

export type PlanDay = {
  day: number; // 1..14
  date: string; // ISO yyyy-mm-dd
  dateLabel: string; // "Tue, Oct 7"
  title: string;
  actions: string[];
};

export function fmtDayLabel(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function addDays(iso: string, n: number): string {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + n);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${dd}`;
}

const PLAN: { title: string; actions: string[] }[] = [
  {
    title: "Safety first, document everything",
    actions: [
      "Turn off electricity to wet areas — never step into standing water near outlets.",
      "Photo and video every affected room BEFORE touching anything (insurer needs the 'before').",
      "Stop the source if it's safe (main water valve, tarps). Then call your insurer to open a claim.",
      "Move dry valuables, rugs, and furniture out of the wet zone.",
    ],
  },
  {
    title: "Get the water out",
    actions: [
      "Extract standing water with a wet vac or pump — every hour counts.",
      "Pull up wet carpet pad (it almost never dries clean) and remove baseboards.",
      "Set up fans and a dehumidifier; keep them running around the clock.",
    ],
  },
  {
    title: "Cut out what's ruined",
    actions: [
      "Remove drywall at least 12 inches above the waterline — floodwater contaminates it.",
      "Bag and haul out soaked insulation; it traps moisture and grows mold fast.",
      "Keep dehumidifiers running — target indoor humidity below 60%.",
    ],
  },
  {
    title: "Verify it's actually drying",
    actions: [
      "Check that surfaces feel dry and the musty smell is fading.",
      "Keep air moving; do NOT close up walls or lay new flooring yet.",
      "Empty dehumidifier tanks / check hoses so drying never stalls overnight.",
    ],
  },
  {
    title: "The 48-hour checkpoint",
    actions: [
      "EPA: mold can begin within 24–48 hours — inspect closely for spots, discoloration, musty odor.",
      "Photograph anything new with today's date for your claim file.",
      "If you see growth, don't panic — note size and location; small surface spots are manageable.",
    ],
  },
  {
    title: "Clean hard surfaces right",
    actions: [
      "Scrub non-porous surfaces (tile, glass, metal) with detergent and water, then dry fully.",
      "Don't rely on bleach alone — it whitens the stain but doesn't remove mold roots in porous materials.",
      "Wear an N95 mask and gloves for any cleaning near suspected growth.",
    ],
  },
  {
    title: "One-week review",
    actions: [
      "Still damp anywhere? Extend drying — closing up wet walls guarantees a mold problem.",
      "Any growth or persistent musty smell? Take the mold triage quiz or book a free inspection.",
      "Log humidity readings morning and evening if you have a meter.",
    ],
  },
  {
    title: "Build the insurance file",
    actions: [
      "Compile your photo log with dates into one folder; save every receipt.",
      "Call your adjuster with an update — ask what documentation they still need.",
      "Get one written professional assessment; it anchors the claim's scope.",
    ],
  },
  {
    title: "Professional inspection (if needed)",
    actions: [
      "If any signs persist: book an inspection with moisture mapping.",
      "Rule of thumb: under ~10 sq ft of surface mold can be DIY with protection; more than that calls for a pro.",
      "Ask the inspector for the moisture source, not just the mold — fixing the cause is the job.",
    ],
  },
  {
    title: "Contain, don't spread",
    actions: [
      "If remediation is scheduled: keep the area isolated — close doors, don't run HVAC through it.",
      "Don't disturb large mold areas yourself; disturbance releases spores.",
      "Move vulnerable people (kids, elderly, asthmatics) away from the work zone.",
    ],
  },
  {
    title: "Remediation window",
    actions: [
      "Professional remediation of a contained area typically takes 1–3 days.",
      "Drying takes longer than cleaning — the job isn't done until moisture readings are normal.",
      "Ask for photo documentation of the work as it progresses.",
    ],
  },
  {
    title: "Verify dry before rebuilding",
    actions: [
      "Hold indoor humidity at 30–50% for 48 hours before closing walls or laying floors.",
      "Sniff-test every room: no musty odor should remain.",
      "Keep your photo log going — 'after' shots protect you if problems return.",
    ],
  },
  {
    title: "Rebuild smarter",
    actions: [
      "Replace removed drywall/insulation; consider mold-resistant drywall in wet-prone areas.",
      "Repaint with mold-inhibiting primer on previously affected walls.",
      "Confirm the moisture source repair (grading, plumbing, roof) is complete first.",
    ],
  },
  {
    title: "Prevent the next one",
    actions: [
      "Clean gutters, check grading slopes away from the foundation, test the sump pump.",
      "Put a $15 humidity monitor in the previously wet area — early warning is cheap.",
      "Save this plan: the next water event starts at Day 1 again.",
    ],
  },
];

export function buildPlan(eventIso: string): PlanDay[] {
  return PLAN.map((p, i) => {
    const iso = addDays(eventIso, i);
    return {
      day: i + 1,
      date: iso,
      dateLabel: fmtDayLabel(iso),
      title: p.title,
      actions: p.actions,
    };
  });
}

export function isValidEventDate(iso: string): boolean {
  if (!iso) return false;
  const d = new Date(iso + "T12:00:00");
  if (Number.isNaN(d.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d.getTime() <= today.getTime();
}
