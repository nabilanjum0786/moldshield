// ─────────────────────────────────────────────────────────────
// DEW-POINT ENGINE — pure logic, no JSX.
// Real psychrometric math (Magnus formula, standard constants a=17.27,
// b=237.7 °C). RH-band advice mirrors the 7-Day Humidity Log (EPA: keep
// indoor RH below 60%, ideally 30–50%).
// ─────────────────────────────────────────────────────────────
//
// MAGNUS VERIFICATION (checked against published dew-point tables —
// must stay within 0.5 °F of these reference values):
//   1. 20 °C @ 50% RH → ref 9.1–9.15 °C | Magnus 9.25 °C ✓
//      (psychrometric process problem set: "The dew point T of moist air
//      at initial state = 9.15 deg.C" for 20 °C/50% RH)
//   2. 20 °C @ 65% RH → ref 13.3 °C | Magnus 13.21 °C ✓
//      (coatings dew-point chart, ambient 20 °C / 65% RH → 13.3 °C)
//   3. 34 °C @ 60% RH → ref 25.1 °C | Magnus 25.12 °C ✓
//      (construction dew-point table: ambient 34 °C / 60% RH → 25.1 °C)
//
// REFUSED TO INVENT: condensation-risk tiers for specific materials
// (there is no published "concrete condenses at X" table we can cite).
// We state only the physical principle — any surface colder than the
// dew point condenses moisture — and list cold surfaces qualitatively.

// Magnus constants (standard, °C scale)
const MAGNUS_A = 17.27;
const MAGNUS_B = 237.7;

export const EPSILON = 0.001;

function clamp(n: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, n));
}

/**
 * Dew point in °C from dry-bulb temp (°C) and relative humidity (%).
 * Magnus formula: γ = (a·T)/(b+T) + ln(RH/100); dp = b·γ / (a − γ).
 */
export function dewPointC(tempC: number, rh: number): number {
  const r = clamp(rh, 0.5, 100) / 100;
  const gamma =
    (MAGNUS_A * tempC) / (MAGNUS_B + tempC) + Math.log(r);
  return (MAGNUS_B * gamma) / (MAGNUS_A - gamma);
}

export function cToF(c: number): number {
  return (c * 9) / 5 + 32;
}

export function fToC(f: number): number {
  return ((f - 32) * 5) / 9;
}

export type RhBand = "dry" | "ideal" | "watch" | "risk";

export const RH_BAND_LABELS: Record<RhBand, string> = {
  dry: "Dry — below 30%",
  ideal: "Ideal — 30–50%",
  watch: "Watch — 50–60%",
  risk: "Risk — above 60%",
};

/**
 * RH band boundaries mirror the 7-Day Humidity Log:
 * 30–50% safe zone, 50–60% watch zone, >60% mold-risk zone (EPA).
 */
export function rhBand(rh: number): RhBand {
  if (rh < 30) return "dry";
  if (rh <= 50) return "ideal";
  if (rh <= 60) return "watch";
  return "risk";
}

export type CondensationRisk = "low" | "moderate" | "high";

export const CONDENSATION_LABELS: Record<CondensationRisk, string> = {
  low: "Low",
  moderate: "Moderate",
  high: "High",
};

/**
 * Condensation risk — a qualitative tier, not a material-specific
 * threshold (we refuse to invent per-material values). Rationale:
 * at high RH the dew point sits close to room temperature, so even
 * mildly cool surfaces fall below it and sweat.
 */
export function condensationRisk(rh: number): CondensationRisk {
  if (rh > 60) return "high";
  if (rh >= 50) return "moderate";
  return "low";
}

/** Cold surfaces where condensation shows up first — qualitative list only. */
export const TYPICAL_COLD_SURFACES: string[] = [
  "single-pane windows",
  "uninsulated exterior walls",
  "cold water pipes",
  "bare basement concrete",
];

export type DewPointReport = {
  dewPointC: number;
  dewPointF: number;
  band: RhBand;
  bandLabel: string;
  condensationRisk: CondensationRisk;
  condensationLabel: string;
  actions: string[];
};

/** Actions mirror the humidity log's advice: ventilate, dehumidify, hunt the source, trust your nose. */
const ACTIONS: Record<RhBand, string[]> = {
  ideal: [
    "Keep doing what you're doing — 30–50% is exactly where the EPA wants your home.",
    "Run bathroom and kitchen exhaust fans whenever you cook or shower; that's the cheapest humidity control you own.",
  ],
  watch: [
    "Ventilate more: run bathroom and kitchen exhaust fans every time you cook or shower.",
    "Watch windows and exterior walls for condensation — the first surfaces to sweat when humidity climbs.",
    "Log your readings for 7 days (see the Humidity Log) to see if this is a pattern or a blip.",
  ],
  risk: [
    "Ventilate: run exhaust fans in bathrooms and the kitchen — the cheapest dehumidifier you own.",
    "Dehumidify: put a portable dehumidifier in the problem room or basement and empty it regularly.",
    "Hunt the moisture source: check under sinks, around toilets, behind the washing machine, and along foundation walls for leaks or damp spots.",
    "Trust your nose: if you can smell mustiness but can't see mold, it's behind something — that warrants a professional inspection, not guesswork.",
    "Dry any wet materials within 24–48 hours (EPA) — that's the mold germination window.",
  ],
  dry: [
    "Below 30% is uncomfortable and hard on woodwork and sinuses — a small humidifier fixes it.",
    "Don't overshoot: keep an eye on the dial so you don't push into the 50%+ watch zone.",
  ],
};

/**
 * Full interpretation of one temperature + RH reading.
 * tempC — dry-bulb temperature in °C; rh — relative humidity in %.
 */
export function interpret(tempC: number, rh: number): DewPointReport {
  const band = rhBand(rh);
  const risk = condensationRisk(rh);
  const dpC = dewPointC(tempC, rh);
  return {
    dewPointC: dpC,
    dewPointF: cToF(dpC),
    band,
    bandLabel: RH_BAND_LABELS[band],
    condensationRisk: risk,
    condensationLabel: CONDENSATION_LABELS[risk],
    actions: ACTIONS[band],
  };
}
