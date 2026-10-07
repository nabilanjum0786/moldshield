// ─────────────────────────────────────────────────────────────
// ALERT TEMPLATES — pure functions that build plain-text alert emails.
//
// Usage (sending job, not yet built): pick a template, call renderZip()
// to substitute [ZIP], then send { subject, body } via the email provider.
// Keep bodies short, actionable, and honest — never claim predictive
// certainty. All mold facts below come from EPA guidance:
//   • EPA 24–48h rule: clean and dry wet building materials and
//     furnishings within 24–48 hours to prevent mold growth.
//   • EPA <10 sq ft: small patches (less than about 10 square feet,
//     ~3 ft × 3 ft) can usually be handled DIY with proper cleanup.
//   • EPA <60% RH: keep indoor humidity below 60% (ideally 30–50%) to
//     inhibit mold growth.
// RULE #0: no invented local statistics. Do not fabricate per-ZIP numbers.
// ─────────────────────────────────────────────────────────────

export type AlertTemplate = { subject: string; body: string };

/** ZIP placeholder the sending job fills in before sending. */
export const ZIP_TOKEN = "[ZIP]";

/**
 * Substitute [ZIP] with the subscriber's actual 5-digit ZIP.
 * The scheduled sending job calls this before handing the email to the provider.
 */
export function renderZip(t: AlertTemplate, zip: string): AlertTemplate {
  return {
    subject: t.subject.split(ZIP_TOKEN).join(zip),
    body: t.body.split(ZIP_TOKEN).join(zip),
  };
}

// ── 1. HIGH-RISK WINDOW ALERT ──────────────────────────────────
// Sent when sustained humid conditions or a post-storm window is detected
// for the subscriber's ZIP. Advisory, not a prediction of mold.

export function highRiskAlert(): AlertTemplate {
  return {
    subject: `Mold weather alert for ${ZIP_TOKEN}: humid spell ahead`,
    body: [
      `MOLD WEATHER ALERT — ZIP ${ZIP_TOKEN}`,
      ``,
      `A sustained humid spell (or post-storm humidity) is expected in your area over the next several days. Humid air plus any damp surfaces gives mold the two things it needs to start growing.`,
      ``,
      `THIS WEEK'S CHECKLIST`,
      `1. Keep indoor humidity below 60% — run a dehumidifier or AC if you have one.`,
      `2. Ventilate: run bathroom and kitchen exhaust fans during and 30 minutes after steam or cooking.`,
      `3. Walk your home's damp spots: basement corners, under sinks, around the water heater, behind the washer.`,
      `4. If you had a recent storm: check the attic and any ceiling stains — a small roof leak becomes mold fast.`,
      `5. Don't stack cardboard or fabric directly against basement walls — they feed mold.`,
      ``,
      `Remember: the EPA recommends drying wet materials within 24–48 hours. If you find a wet spot, act on it today, not this weekend.`,
      ``,
      `This is an advisory based on weather conditions, not a guarantee of mold in your home. Unsubscribe anytime: reply "unsubscribe" or use the link in any alert.`,
    ].join("\n"),
  };
}

// ── 2. POST-FLOOD 48-HOUR CHECKLIST ────────────────────────────
// Sent after a flood/storm event near the subscriber's ZIP.
// Anchored on the EPA 24–48h drying rule.

export function postFloodChecklist(): AlertTemplate {
  return {
    subject: `Post-flood in ${ZIP_TOKEN}: your 48-hour mold-prevention checklist`,
    body: [
      `POST-FLOOD 48-HOUR CHECKLIST — ZIP ${ZIP_TOKEN}`,
      ``,
      `Floodwater is gone, but the clock is running. The EPA's rule: clean and dry everything within 24–48 hours to prevent mold growth. Here's what to do, in order:`,
      ``,
      `1. SAFETY FIRST: wear gloves, boots, and an N95 mask. If water reached electrical outlets, don't go in until power is off.`,
      `2. REMOVE STANDING WATER: pump, mop, or wet-vac it out today.`,
      `3. PULL OUT THE TRAP: carpet, padding, and wet drywall are mold hotels. Remove anything soaked that can't be dried in 48 hours.`,
      `4. DRY AGGRESSIVELY: fans + open windows + dehumidifier pointed at the wet area. Concrete can take days — start now.`,
      `5. CLEAN HARD SURFACES: scrub with detergent and water; disinfect non-porous surfaces. Never mix bleach and ammonia.`,
      `6. WATCH THE SPOTS YOU FORGET: behind the washer and dryer, under sinks, inside closets on exterior walls, the crawl space hatch.`,
      ``,
      `SMALL vs. BIG: a patch smaller than about 10 square feet (roughly 3 ft × 3 ft) can usually be cleaned yourself. Anything larger, sewage-involved, or in your HVAC — call a professional.`,
      ``,
      `Check the affected rooms again in 7 and 30 days. Musty smell with no visible mold means it's hiding — often behind drywall.`,
      ``,
      `This is guidance, not a diagnosis of your home. Unsubscribe anytime: reply "unsubscribe" or use the link in any alert.`,
    ].join("\n"),
  };
}

// ── 3. SEASONAL REMINDERS ──────────────────────────────────────
// General building guidance only — no invented local statistics.
// Subscribers get the one matching their climate type.

export function seasonalFallAtticPrep(): AlertTemplate {
  return {
    subject: `Fall attic prep — get ahead of winter condensation`,
    body: [
      `FALL MOLD PREP — ATTIC — ZIP ${ZIP_TOKEN}`,
      ``,
      `Cold weather is coming to your area, and attics are where winter mold starts: warm, moist indoor air leaks up, hits a cold roof deck, and condenses. A little fall prep now saves a moldy surprise in February.`,
      ``,
      `1. CHECK BATHROOM FANS: confirm they vent OUTSIDE through the roof or gable — not into the attic. Fans dumping warm moist air into the attic are the #1 cause of winter attic mold.`,
      `2. LOOK FOR LEAKS: scan the roof deck from inside for water stains, damp insulation, or daylight through boards.`,
      `3. SEAL THE LEAKS YOU CAN'T SEE: attic hatch gaps and recessed-light openings let warm air rise. Seal or weatherstrip them.`,
      `4. CONFIRM VENTILATION: soffit vents should be clear of insulation; ridge or gable vents should be unobstructed.`,
      `5. KEEP IT DRY: attic humidity should stay below 60%, just like the rest of the house.`,
      ``,
      `General building guidance — not specific to your home's construction. If your attic already shows stains or fuzz, get it inspected before winter seals it in.`,
      ``,
      `Unsubscribe anytime: reply "unsubscribe" or use the link in any alert.`,
    ].join("\n"),
  };
}

export function seasonalSpringAcCheck(): AlertTemplate {
  return {
    subject: `Spring AC tune-up — check the condensate line`,
    body: [
      `SPRING MOLD PREP — AIR CONDITIONING — ZIP ${ZIP_TOKEN}`,
      ``,
      `Before cooling season starts, check the one spot every AC owner forgets: the condensate drain line. A clogged line backs water up into the drain pan, the pan overflows, and you get mold — inside the unit or in the ceiling below it.`,
      ``,
      `1. FIND THE DRAIN LINE: the PVC pipe near your indoor air handler that runs to a floor drain or outside.`,
      `2. CHECK THE PAN: if there's standing water or slime in the drain pan, the line is clogged.`,
      `3. FLUSH IT: pour a cup of white vinegar (not bleach) through the line to clear algae — do this at the start of each cooling season.`,
      `4. CHECK THE FILTER: a dirty filter restricts airflow, freezes the coil, and drips water when it thaws. Replace it.`,
      `5. LOOK AROUND THE UNIT: damp drywall or insulation near the air handler means water is going somewhere it shouldn't.`,
      ``,
      `While you're at it: set your thermostat to keep indoor humidity below 60% — your AC is a dehumidifier too, but only if it drains properly.`,
      ``,
      `General building guidance — not specific to your HVAC system. If you see mold inside the unit or ducts, don't run it until it's inspected.`,
      ``,
      `Unsubscribe anytime: reply "unsubscribe" or use the link in any alert.`,
    ].join("\n"),
  };
}
