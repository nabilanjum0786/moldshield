// ─────────────────────────────────────────────────────────────
// MOLD RISK SCORE — pure scoring engine (no fetch, no DOM).
//
// RULE #0 (nabil, 2026-10-06): never invent. Every driver traces to a
// real dataset, verified before use. Drivers without a working data
// source get status "pending": they contribute nothing, the remaining
// weights renormalize, and the result is flagged partialData=true so
// the UI can say so out loud.
//
// Data-source verification status (2026-10-06, verified by the builder):
//   Open-Meteo forecast ......... VERIFIED (HTTP 200, live curl)
//   NOAA Access Data Service .... VERIFIED (HTTP 200, live curl)
//   FEMA National Risk Index ..... UNREACHABLE (host returned empty
//                                 reply from our environment — flood
//                                 driver stays "pending" until a real
//                                 value is integrated)
//   Census API .................. GATED (key required; we have none —
//                                 housing-age driver stays "pending"
//                                 until CENSUS_API_KEY exists)
// ─────────────────────────────────────────────────────────────

export type DriverStatus = "live" | "pending";

export type DriverKey =
  | "humidity"
  | "outlook"
  | "rainfall"
  | "flood"
  | "housingAge";

export type RiskDriver = {
  key: DriverKey;
  /** Display name, e.g. "Current humidity" */
  name: string;
  /** Human-readable value, e.g. "26% RH" — "Not yet available" when pending */
  value: string;
  /** Nominal weight (renormalized across live drivers when any are pending) */
  weight: number;
  /** 0–100 risk subscore before weighting (0 when pending) */
  subscore: number;
  /** Weighted contribution to the final score (0–100 scale) */
  contribution: number;
  status: DriverStatus;
  /** Dataset name for attribution, e.g. "Open-Meteo" */
  source: string;
  /** Extra context shown under the driver, e.g. why it is pending */
  note?: string;
};

/** Qualitative bands. EDITORIAL — chosen for readability, NOT scientific
 *  thresholds. The methodology page says this in plain language. */
export type RiskBand = "Low" | "Moderate" | "High" | "Very High";

export function bandForScore(score: number): RiskBand {
  if (score <= 30) return "Low";
  if (score <= 60) return "Moderate";
  if (score <= 80) return "High";
  return "Very High";
}

export type RiskInputs = {
  /** Current outdoor relative humidity %, 0–100 (Open-Meteo hourly) */
  currentHumidityPct: number | null;
  /** Optional current dew point °F — small upward nudge when very humid-feeling */
  dewPointF?: number | null;
  /** Days in the 7-day outlook with daily max RH > 60 (Open-Meteo daily) */
  daysAbove60: number | null;
  /** Annual rainfall in inches (NOAA climate normals / observed) */
  annualRainfallIn: number | null;
  /** FEMA NRI flood-risk percentile 0–100 — null until a value is integrated */
  floodRiskPercentile: number | null;
  /** % of housing units built before 1980 (Census ACS) — null without a key */
  pctHomesPre1980: number | null;
  /** ISO date the live inputs were fetched, e.g. "2026-10-06" */
  dataAsOf?: string;
};

export type RiskScoreResult = {
  /** Final score, 0–100, rounded to whole number */
  score: number;
  band: RiskBand;
  drivers: RiskDriver[];
  /** True when any driver is pending (FEMA/Census today) */
  partialData: boolean;
  /** Weights after renormalization, in driver order */
  effectiveWeights: Record<DriverKey, number>;
  dataAsOf?: string;
};

// ── Nominal weights (sum to 1). Documented rationale: ──────────
// humidity 0.35 — current moisture is the most direct, most actionable
//   signal; it is also the freshest (monthly refresh).
// outlook  0.20 — sustained dampness over the coming week is when mold
//   gets its foothold (EPA: sustained RH above 60% is the risk line).
// rainfall 0.20 — long-term moisture load for the area (NOAA normals).
// flood    0.15 — flood exposure raises risk, but it is a conditional
//   driver (only matters when flooding actually happens), so it weighs
//   less than the ever-present humidity drivers.
// housingAge 0.10 — older envelopes leak more, but it is the weakest and
//   least direct signal, so it gets the smallest weight.
const NOMINAL_WEIGHTS: Record<DriverKey, number> = {
  humidity: 0.35,
  outlook: 0.2,
  rainfall: 0.2,
  flood: 0.15,
  housingAge: 0.1,
};

// ── Subscore mappings (0–100). Piecewise and deliberately coarse — ──
// whole bands, not fake precision. Each reflects the same EPA-anchored
// intuition used by the weather panel: below ~50% RH is comfortable,
// 50–60% is watchful, above 60% is the mold-risk zone.

function humiditySubscore(rhPct: number, dewPointF?: number | null): number {
  const rh = Math.min(100, Math.max(0, rhPct));
  let s: number;
  if (rh <= 30) s = 5;
  else if (rh <= 40) s = 15;
  else if (rh <= 50) s = 30;
  else if (rh <= 60) s = 55;
  else if (rh <= 70) s = 75;
  else s = 90;
  // Dew point nudge: air that *feels* tropical holds more moisture.
  // Kept small and capped so it can never dominate.
  if (dewPointF != null) {
    if (dewPointF >= 70) s += 10;
    else if (dewPointF >= 65) s += 5;
  }
  return Math.min(100, s);
}

function outlookSubscore(daysAbove60: number): number {
  const d = Math.min(7, Math.max(0, Math.round(daysAbove60)));
  if (d === 0) return 10;
  if (d <= 2) return 40;
  if (d <= 4) return 65;
  if (d <= 6) return 85;
  return 95;
}

function rainfallSubscore(inches: number): number {
  const r = Math.max(0, inches);
  if (r < 25) return 15;
  if (r < 35) return 35;
  if (r < 45) return 55;
  if (r < 55) return 75;
  return 90;
}

function floodSubscore(percentile: number): number {
  const p = Math.min(100, Math.max(0, percentile));
  if (p < 25) return 15;
  if (p < 50) return 40;
  if (p < 75) return 65;
  if (p < 90) return 85;
  return 95;
}

function housingAgeSubscore(pctPre1980: number): number {
  const h = Math.min(100, Math.max(0, pctPre1980));
  if (h < 30) return 20;
  if (h < 50) return 40;
  if (h < 65) return 60;
  if (h < 80) return 75;
  return 90;
}

// ── Main entry point ────────────────────────────────────────────

export function computeRiskScore(inputs: RiskInputs): RiskScoreResult {
  const specs: {
    key: DriverKey;
    name: string;
    source: string;
    pendingNote?: string;
    value: string;
    subscore: number | null;
  }[] = [
    {
      key: "humidity",
      name: "Current humidity",
      source: "Open-Meteo",
      value:
        inputs.currentHumidityPct == null
          ? "Not yet available"
          : `${Math.round(inputs.currentHumidityPct)}% RH`,
      subscore:
        inputs.currentHumidityPct == null
          ? null
          : humiditySubscore(inputs.currentHumidityPct, inputs.dewPointF),
    },
    {
      key: "outlook",
      name: "7-day humidity outlook",
      source: "Open-Meteo",
      value:
        inputs.daysAbove60 == null
          ? "Not yet available"
          : `${inputs.daysAbove60} of 7 days above 60% RH`,
      subscore: inputs.daysAbove60 == null ? null : outlookSubscore(inputs.daysAbove60),
    },
    {
      key: "rainfall",
      name: "Annual rainfall",
      source: "NOAA",
      value:
        inputs.annualRainfallIn == null
          ? "Not yet available"
          : `≈${Math.round(inputs.annualRainfallIn)} in/year`,
      subscore:
        inputs.annualRainfallIn == null
          ? null
          : rainfallSubscore(inputs.annualRainfallIn),
    },
    {
      key: "flood",
      name: "Flood risk",
      source: "FEMA National Risk Index",
      pendingNote:
        "Flood data is not yet integrated — the FEMA endpoint was unreachable from our environment when checked (2026-10-06).",
      value:
        inputs.floodRiskPercentile == null
          ? "Not yet available"
          : `${Math.round(inputs.floodRiskPercentile)}th percentile`,
      subscore:
        inputs.floodRiskPercentile == null
          ? null
          : floodSubscore(inputs.floodRiskPercentile),
    },
    {
      key: "housingAge",
      name: "Older housing stock",
      source: "US Census Bureau (ACS)",
      pendingNote:
        "Housing-age data needs a free Census API key (not yet set up).",
      value:
        inputs.pctHomesPre1980 == null
          ? "Not yet available"
          : `${Math.round(inputs.pctHomesPre1980)}% of homes pre-1980`,
      subscore:
        inputs.pctHomesPre1980 == null
          ? null
          : housingAgeSubscore(inputs.pctHomesPre1980),
    },
  ];

  // Renormalize: pending drivers contribute nothing; live drivers absorb
  // their nominal weight proportionally. If NOTHING is live, every weight
  // is 0 and the score is 0 — an all-pending score carries no information.
  const liveWeightTotal = specs.reduce(
    (sum, s) => sum + (s.subscore == null ? 0 : NOMINAL_WEIGHTS[s.key]),
    0,
  );
  const renorm = (key: DriverKey) =>
    liveWeightTotal > 0 ? NOMINAL_WEIGHTS[key] / liveWeightTotal : 0;

  const drivers: RiskDriver[] = specs.map((s) => {
    const live = s.subscore != null;
    const weight = live ? renorm(s.key) : 0;
    const contribution = live ? s.subscore! * weight : 0;
    return {
      key: s.key,
      name: s.name,
      value: s.value,
      weight: NOMINAL_WEIGHTS[s.key],
      subscore: live ? s.subscore! : 0,
      contribution: Math.round(contribution * 10) / 10,
      status: live ? "live" : "pending",
      source: s.source,
      ...(s.pendingNote && !live ? { note: s.pendingNote } : {}),
    };
  });

  const raw = drivers.reduce((sum, d) => sum + d.contribution, 0);
  const score = Math.round(Math.min(100, Math.max(0, raw)));
  const partialData = drivers.some((d) => d.status === "pending");

  const effectiveWeights = Object.fromEntries(
    specs.map((s) => [s.key, s.subscore == null ? 0 : renorm(s.key)]),
  ) as Record<DriverKey, number>;

  return {
    score,
    band: bandForScore(score),
    drivers,
    partialData,
    effectiveWeights,
    ...(inputs.dataAsOf ? { dataAsOf: inputs.dataAsOf } : {}),
  };
}

/** Convenience: one-line plain-English summary for meta/SEO copy. */
export function riskSummary(result: RiskScoreResult, placeName: string): string {
  return (
    `Mold risk score for ${placeName}: ${result.score}/100 (${result.band}).` +
    (result.partialData
      ? " Computed from available data; flood and housing-age drivers are still pending integration."
      : " Computed from all five drivers.")
  );
}
