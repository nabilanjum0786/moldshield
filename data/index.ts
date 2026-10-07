// ─────────────────────────────────────────────────────────────
// Typed data loaders. At pilot scale these read local JSON seeds;
// at 100k scale they read from the same interface backed by a
// database/CDN. Routes never touch JSON directly.
// ─────────────────────────────────────────────────────────────
import type { StateData, CityData, TownData, StormEventRecord } from "./types";
import stormEventsSeed from "./storm-events.json";
import ohioSeed from "./seed/ohio.json";
import daytonSeed from "./seed/dayton.json";
import beavercreekSeed from "./seed/towns/beavercreek.json";
import centervilleSeed from "./seed/towns/centerville.json";
import fairbornSeed from "./seed/towns/fairborn.json";
import huberHeightsSeed from "./seed/towns/huber-heights.json";
import ketteringSeed from "./seed/towns/kettering.json";
import piquaSeed from "./seed/towns/piqua.json";
import sidneySeed from "./seed/towns/sidney.json";
import springboroSeed from "./seed/towns/springboro.json";
import troySeed from "./seed/towns/troy.json";
import xeniaSeed from "./seed/towns/xenia.json";

const STATES: Record<string, StateData> = {
  ohio: ohioSeed as StateData,
};

// stateSlug -> citySlug -> CityData
const CITIES: Record<string, Record<string, CityData>> = {
  ohio: { dayton: daytonSeed as CityData },
};

// stateSlug -> citySlug -> townSlug -> TownData
const TOWNS: Record<string, Record<string, Record<string, TownData>>> = {
  ohio: {
    dayton: {
      beavercreek: beavercreekSeed as TownData,
      centerville: centervilleSeed as TownData,
      fairborn: fairbornSeed as TownData,
      "huber-heights": huberHeightsSeed as TownData,
      kettering: ketteringSeed as TownData,
      piqua: piquaSeed as TownData,
      sidney: sidneySeed as TownData,
      springboro: springboroSeed as TownData,
      troy: troySeed as TownData,
      xenia: xeniaSeed as TownData,
    },
  },
};

export function getState(slug: string): StateData | null {
  return STATES[slug] ?? null;
}

export function getCity(state: string, city: string): CityData | null {
  return CITIES[state]?.[city] ?? null;
}

export function getTown(
  state: string,
  city: string,
  town: string
): TownData | null {
  return TOWNS[state]?.[city]?.[town] ?? null;
}

export function listStates(): StateData[] {
  return Object.values(STATES);
}

export function listCities(state: string): CityData[] {
  return Object.values(CITIES[state] ?? {});
}

export function listTowns(state: string, city: string): TownData[] {
  const towns = Object.values(TOWNS[state]?.[city] ?? {});
  // Biggest towns first (blueprint: selection starts by population).
  return towns.sort((a, b) => (b.population ?? 0) - (a.population ?? 0));
}

/**
 * Pilot generateStaticParams set. At scale this enumerates the full
 * state/city/town/service matrix from the database.
 */
export function listPilotParams(): {
  state: string;
  city: string;
  page: string;
}[] {
  const params: { state: string; city: string; page: string }[] = [];
  for (const st of listStates()) {
    for (const c of listCities(st.slug)) {
      for (const t of listTowns(st.slug, c.slug)) {
        params.push({ state: st.slug, city: c.slug, page: t.slug });
      }
    }
  }
  return params;
}

/** Format population for stat strips: 136346 -> "136k". Null-safe. */
export function formatPopulation(pop: number | null): string {
  if (pop == null) return "—";
  if (pop >= 1000) return `${Math.round(pop / 1000)}k`;
  return String(pop);
}

// ── STORM RESPONSE (Workstream F) ──────────────────────────────────
// Records live in data/storm-events.json, written by
// scripts/generate-storm-page.mjs from VERIFIED event data only.
const STORM_EVENTS: StormEventRecord[] =
  (stormEventsSeed as { records: StormEventRecord[] }).records ?? [];

/** Every county slug with a published storm-response page. */
export function listStormCounties(): StormEventRecord[] {
  return STORM_EVENTS;
}

/** One county's storm event record, or null (→ 404). */
export function getStormCounty(countySlug: string): StormEventRecord | null {
  return (
    STORM_EVENTS.find((r) => r.countySlug === countySlug) ?? null
  );
}
