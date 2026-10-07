#!/usr/bin/env node
/**
 * generate-storm-page.mjs — post-storm county page generator (Workstream F).
 *
 * Takes a JSON payload describing ONE verified storm event and writes/updates
 * the county's record in data/storm-events.json. The app/storm/[county]/ page
 * renders from that file.
 *
 * Usage:
 *   node scripts/generate-storm-page.mjs --input event.json
 *   cat event.json | node scripts/generate-storm-page.mjs --stdin
 *
 * Required fields: county, state, eventType, eventDate.
 *   - county / state:     full names, e.g. "Montgomery County", "Ohio"
 *   - eventType:          NOAA event type, e.g. "Flash Flood" (never invented)
 *   - eventDate:          ISO date, e.g. "2026-06-07" (never invented)
 *
 * Optional fields: eventEndDate, eventTimeLabel, episodeNarrative,
 *   eventNarrative, floodCause, propertyDamage, reportSource, sourceName,
 *   sourceUrl, retrievedDate (defaults to today, UTC).
 *
 * RULE #0 — DON'T INVENT: this script REFUSES to generate when eventType or
 * eventDate is missing/empty. Every storm page must come from real event
 * data (NOAA Storm Events Database bulk CSV, NWS alert, or verified local
 * news) or clearly-labeled manual input. The script never fabricates values.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_FILE = resolve(ROOT, "data", "storm-events.json");

// Don't crash with EPIPE when stdout is piped into `head` etc.
for (const stream of [process.stdout, process.stderr]) {
  stream.on("error", (e) => {
    if (e.code === "EPIPE") process.exit(0);
    throw e;
  });
}

const STATE_ABBR = {
  Alabama: "AL", Alaska: "AK", Arizona: "AZ", Arkansas: "AR", California: "CA",
  Colorado: "CO", Connecticut: "CT", Delaware: "DE", Florida: "FL", Georgia: "GA",
  Hawaii: "HI", Idaho: "ID", Illinois: "IL", Indiana: "IN", Iowa: "IA",
  Kansas: "KS", Kentucky: "KY", Louisiana: "LA", Maine: "ME", Maryland: "MD",
  Massachusetts: "MA", Michigan: "MI", Minnesota: "MN", Mississippi: "MS",
  Missouri: "MO", Montana: "MT", Nebraska: "NE", Nevada: "NV", "New Hampshire": "NH",
  "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY", "North Carolina": "NC",
  "North Dakota": "ND", Ohio: "OH", Oklahoma: "OK", Oregon: "OR", Pennsylvania: "PA",
  "Rhode Island": "RI", "South Carolina": "SC", "South Dakota": "SD",
  Tennessee: "TN", Texas: "TX", Utah: "UT", Vermont: "VT", Virginia: "VA",
  Washington: "WA", "West Virginia": "WV", Wisconsin: "WI", Wyoming: "WY",
  "District of Columbia": "DC",
};

function fail(message) {
  process.stderr.write(
    `\n${"=".repeat(68)}\nSTORM PAGE GENERATOR — REFUSED TO GENERATE\n${"=".repeat(68)}\n${message}\n\nRULE #0: never invent storm events, dates, or damage figures.\nFix the input JSON with REAL event data and run again.\n${"=".repeat(68)}\n\n`
  );
  process.exit(1);
}

function slugify(s) {
  return s
    .trim()
    .toLowerCase()
    .replace(/[''']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isValidDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}/.test(value)) return false;
  const d = new Date(value);
  return !Number.isNaN(d.getTime()) && d.getFullYear() >= 1950 && d.getFullYear() <= 2100;
}

function readInput(args) {
  if (args.includes("--stdin")) {
    try {
      return JSON.parse(readFileSync(0, "utf8"));
    } catch (e) {
      fail(`Could not parse JSON from stdin: ${e.message}`);
    }
  }
  const i = args.indexOf("--input");
  if (i === -1 || !args[i + 1]) {
    process.stderr.write(
      "\nUsage: node scripts/generate-storm-page.mjs --input event.json\n" +
        "   or: cat event.json | node scripts/generate-storm-page.mjs --stdin\n\n"
    );
    process.exit(2);
  }
  const path = resolve(process.cwd(), args[i + 1]);
  if (!existsSync(path)) fail(`Input file not found: ${path}`);
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch (e) {
    fail(`Could not parse JSON from ${path}: ${e.message}`);
  }
}

function validate(input) {
  const errors = [];
  const { county, state, eventType, eventDate } = input ?? {};

  if (!county || typeof county !== "string" || !county.trim())
    errors.push("- 'county' is required (e.g. \"Montgomery County\").");
  if (!state || typeof state !== "string" || !state.trim())
    errors.push("- 'state' is required (e.g. \"Ohio\").");

  // ── HARD REFUSE: no event type/date → nothing is generated. Never guess. ──
  if (!eventType || typeof eventType !== "string" || !eventType.trim())
    errors.push(
      "- 'eventType' is REQUIRED (e.g. \"Flash Flood\"). " +
        "Refusing to generate: event type must come from a real NOAA event record."
    );
  if (!eventDate || typeof eventDate !== "string" || !eventDate.trim())
    errors.push(
      "- 'eventDate' is REQUIRED (e.g. \"2026-06-07\"). " +
        "Refusing to generate: event date must come from a real NOAA event record."
    );
  else if (!isValidDate(eventDate.trim()))
    errors.push(
      `- 'eventDate' "${eventDate}" is not a valid YYYY-MM-DD date. ` +
        "Check the NOAA Storm Events record and fix it."
    );

  if (errors.length) fail(errors.join("\n"));
  return { county: county.trim(), state: state.trim(), eventType: eventType.trim(), eventDate: eventDate.trim() };
}

function loadDataFile() {
  if (!existsSync(DATA_FILE)) return { records: [] };
  try {
    const parsed = JSON.parse(readFileSync(DATA_FILE, "utf8"));
    if (!parsed || !Array.isArray(parsed.records))
      fail(`data/storm-events.json is corrupt: expected { "records": [...] }.`);
    return parsed;
  } catch (e) {
    fail(`Could not parse ${DATA_FILE}: ${e.message}`);
  }
}

// ── main ─────────────────────────────────────────────────────────────
const input = readInput(process.argv.slice(2));
const { county, state, eventType, eventDate } = validate(input);

const countySlug = slugify(county);
const stateAbbr = STATE_ABBR[state] ?? null;
if (!stateAbbr) {
  process.stderr.write(
    `WARNING: state "${state}" not in the US state map — the page will show ` +
      `the full state name without an abbreviation. This is not a data error.\n`
  );
}

const today = new Date().toISOString().slice(0, 10);
const record = {
  countySlug,
  countyName: county,
  stateName: state,
  stateAbbr,
  eventType,
  eventDate,
  eventEndDate: input.eventEndDate ?? null,
  eventTimeLabel: input.eventTimeLabel ?? null,
  episodeNarrative: input.episodeNarrative ?? null,
  eventNarrative: input.eventNarrative ?? null,
  floodCause: input.floodCause ?? null,
  propertyDamage: input.propertyDamage ?? null,
  reportSource: input.reportSource ?? null,
  sourceName: input.sourceName ?? "NOAA Storm Events Database",
  sourceUrl: input.sourceUrl ?? null,
  retrievedDate: input.retrievedDate ?? today,
};

const data = loadDataFile();
const existing = data.records.findIndex(
  (r) => r.countySlug === countySlug && r.eventDate === eventDate
);
if (existing >= 0) {
  data.records[existing] = record;
  process.stdout.write(`Updated existing record for ${county}, ${state} (${eventDate}).\n`);
} else {
  data.records.push(record);
  process.stdout.write(`Added new record for ${county}, ${state} (${eventDate}).\n`);
}

writeFileSync(DATA_FILE, JSON.stringify(data, null, 2) + "\n");
process.stdout.write(`\nWrote ${DATA_FILE}\n`);
process.stdout.write(`Page will render at: /storm/${countySlug}/\n`);
process.stdout.write("Next: npm run build (or wait for Vercel preview), then QA per docs/post-storm-trigger.md.\n");
