// ─────────────────────────────────────────────────────────────
// EXAMPLE ONLY — NOT WIRED INTO ANY PAGE.
// Shows how the town-page layer will consume resolveLayout once the
// data pipeline ships TownLayoutSignals. Do not import this file from
// app/ routes. Delete or promote it when the real wiring lands.
// ─────────────────────────────────────────────────────────────

import {
  resolveLayout,
  ARCHETYPE_DESCRIPTIONS,
  type TownLayoutSignals,
  type ContentSectionKey,
} from "./layout-rules";

/**
 * Pretend section renderers keyed by ContentSectionKey — stand-ins for the
 * town template's real content blocks (hero, local-picture, problems,
 * services, faq, final-cta). The page layer maps each key to its block
 * (see docs/vary-layout-rules.md §6).
 */
const SECTION_RENDERERS: Record<ContentSectionKey, () => string> = {
  "storm-flood": () => "<StormFloodRecovery />",
  roof: () => "<RoofInspection />",
  basement: () => "<BasementMoisture />",
  crawlspace: () => "<CrawlspaceMoisture />",
  attic: () => "<AtticCondensation />",
  "ice-dam": () => "<IceDams />",
  plumbing: () => "<PlumbingLeaks />",
  "hvac-condensate": () => "<HvacCondensate />",
  "humidity-control": () => "<HumidityControl />",
  insurance: () => "<InsuranceClaims />",
  faq: () => "<FaqAccordion />",
};

/**
 * Example: how a town page orders its sections from real signals.
 *
 * In production, `signals` is assembled at build time from the cached
 * pipeline JSON (Open-Meteo / NOAA / Census / flood-risk class) — never
 * hand-written. The three sample towns below are illustrative fixtures
 * showing the three most common branches, not real data.
 */
export function exampleTownPageOrder(signals: TownLayoutSignals): {
  archetype: string;
  blurb: string;
  rendered: string[];
  notes: string;
} {
  const { archetype, contentPriority, notes } = resolveLayout(signals);
  return {
    archetype,
    blurb: ARCHETYPE_DESCRIPTIONS[archetype],
    rendered: contentPriority.map((key) => SECTION_RENDERERS[key]()),
    notes,
  };
}

// ── Illustrative fixtures (NOT real town data) ─────────────────
export const EXAMPLE_HUMID = exampleTownPageOrder({
  avgHumidity: 72,
  annualRainfallIn: 48,
  floodRisk: "low",
  heatingDegreeDays: 2100,
  housingMedianYearBuilt: 1995,
});

export const EXAMPLE_COLD = exampleTownPageOrder({
  avgHumidity: 58,
  annualRainfallIn: 34,
  floodRisk: "low",
  heatingDegreeDays: 7200,
  housingMedianYearBuilt: 1952,
});

export const EXAMPLE_UNKNOWN = exampleTownPageOrder({
  avgHumidity: null,
  annualRainfallIn: null,
  floodRisk: "unknown",
  heatingDegreeDays: null,
  housingMedianYearBuilt: null,
});
