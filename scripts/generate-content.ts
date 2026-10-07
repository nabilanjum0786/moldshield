/**
 * GROQ CONTENT PIPELINE — STUB (not executed in build)
 * =====================================================
 * Fills the {{SLOT}} data layer (data/seed/*.json) with unique,
 * honest, locally-grounded copy at 100k-page scale.
 *
 * RUN:  npx tsx scripts/generate-content.ts --state ohio --city dayton
 *       (tsx is a devDependency to add; NOT run by `next build`.)
 *
 * KEYS: set GROQ_API_KEYS as a comma-separated list. nabil holds 25 keys.
 *       The runner rotates keys round-robin; if a key hits a rate limit
 *       (429) it is parked for 60s and the next key is used. Never commit
 *       keys — they live in the environment only.
 *
 * This file type-checks (tsc) but performs NO network calls unless main()
 * is invoked explicitly. `next build` never imports it.
 */

import { writeFileSync, readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

// ── SlotFillingContract ─────────────────────────────────────────
// Which prompt fills which slot, and the QA gates each slot must pass.

export type PageType = "state" | "city" | "town" | "service-in-city";

export type SlotSpec = {
  /** e.g. "TOWN_INTRO" — the {{SLOT}} name from the HTML templates */
  slot: string;
  pageType: PageType;
  /** System prompt for this slot. {place} tokens are filled per record. */
  systemPrompt: string;
  /** User prompt template. Tokens: {name} {state} {city} {facts} */
  promptTemplate: string;
  /** Minimum character length of the filled value */
  minLength: number;
  /** Maximum character length (0 = no cap) */
  maxLength: number;
  /** Failing any required check rejects the record */
  required: boolean;
  /** Must the value be unique vs. all existing records of this page type? */
  uniquenessCheck: boolean;
};

/** Real, sourceable facts are injected as {facts} — never invented. */
const HONESTY_PREAMBLE = `You write for a mold remediation company. RULES:
- Use ONLY the facts provided. Never invent statistics, dates, prices, or reviews.
- Never claim work as "ours". Never write fake reviews or testimonials.
- Never present a single figure as fact unless its source is given in the facts.
- Health claims: only "reactions vary by person" (CDC 2006) and EPA/CDC guidance already quoted in the facts.
- Write 100% original copy — do not repeat phrasing used on other town/city pages.`;

export const SLOT_CONTRACT: SlotSpec[] = [
  {
    slot: "HERO_ANSWER",
    pageType: "town",
    systemPrompt: HONESTY_PREAMBLE,
    promptTemplate:
      "Write a 50-70 word direct answer for the hero of a mold-removal page for {name}, {state}. Name this town's mold drivers from these facts: {facts}. End with: free inspections, transparent pricing, photo-documented work.",
    minLength: 200,
    maxLength: 600,
    required: true,
    uniquenessCheck: true,
  },
  {
    slot: "TOWN_INTRO",
    pageType: "town",
    systemPrompt: HONESTY_PREAMBLE,
    promptTemplate:
      "Write 2-4 short paragraphs (the town's mold story) for {name}, {state}, for a mold-removal page. Facts: {facts}. Qualitative only — no invented numbers. Must read as town-unique.",
    minLength: 400,
    maxLength: 1400,
    required: true,
    uniquenessCheck: true,
  },
  {
    slot: "TOWN_MOLD_NOTE",
    pageType: "town",
    systemPrompt: HONESTY_PREAMBLE,
    promptTemplate:
      "In 1-2 sentences, tie {name}'s real data to its mold risk. Facts: {facts}. No invented statistics.",
    minLength: 80,
    maxLength: 400,
    required: true,
    uniquenessCheck: true,
  },
  {
    slot: "TOWN_PROBLEM_CARDS",
    pageType: "town",
    systemPrompt: HONESTY_PREAMBLE,
    promptTemplate:
      "List exactly 3 mold problems for {name}, {state}, as JSON: [{\"title\": ..., \"body\": \"1-2 line local explanation\", \"serviceSlug\": one of attic-mold-removal|crawl-space-mold-remediation|basement-mold-removal|black-mold-removal|mold-inspection-testing}]. Facts: {facts}. Cards must differ from other towns' cards.",
    minLength: 200,
    maxLength: 1200,
    required: true,
    uniquenessCheck: true,
  },
  {
    slot: "CITY_RISK_CARDS",
    pageType: "city",
    systemPrompt: HONESTY_PREAMBLE,
    promptTemplate:
      "List 3-4 mold risk cards for {name}, {state} as JSON: [{\"title\": ..., \"body\": ..., \"serviceSlug\": ...}]. Facts: {facts}. Same serviceSlug vocabulary as TOWN_PROBLEM_CARDS.",
    minLength: 300,
    maxLength: 1600,
    required: true,
    uniquenessCheck: true,
  },
  {
    slot: "CITY_CLIMATE_NOTE",
    pageType: "city",
    systemPrompt: HONESTY_PREAMBLE,
    promptTemplate:
      "One paragraph: {name}'s climate mold drivers (freeze-thaw, humidity season, storm/flood patterns). Facts: {facts}.",
    minLength: 150,
    maxLength: 600,
    required: false,
    uniquenessCheck: true,
  },
  {
    slot: "STATE_COST_NOTE",
    pageType: "state",
    systemPrompt: HONESTY_PREAMBLE,
    promptTemplate:
      "One sentence of state-specific pricing color for {name} mold remediation, ONLY if the facts support it; otherwise output the literal string NULL. Facts: {facts}.",
    minLength: 0,
    maxLength: 300,
    required: false,
    uniquenessCheck: false,
  },
];

// ── QA gates ────────────────────────────────────────────────────

/** Phrases/patterns that must never ship. Honesty guardrails as code. */
const BANNED_PATTERNS: { pattern: RegExp; reason: string }[] = [
  { pattern: /our (work|job|project|crew)/i, reason: "claims work as ours" },
  { pattern: /testimonial|review(s)? (from|by) (our )?customer/i, reason: "fake-review risk" },
  { pattern: /toxic mold.*50%|50%.*toxic mold/i, reason: "misrepresents the 47-50% dampness figure" },
  { pattern: /\$19\s?B.*mold/i, reason: "$19B covers ALL fungal infections, not mold (CDC)" },
  { pattern: /LocalBusiness/i, reason: "no per-town LocalBusiness schema — Service + areaServed only" },
  { pattern: /lorem ipsum/i, reason: "placeholder text" },
  { pattern: /\{\{[A-Z_]+\}\}/, reason: "unfilled template slot" },
];

export type GateResult = { ok: boolean; failures: string[] };

export function validateLength(value: string, spec: SlotSpec): string[] {
  const failures: string[] = [];
  if (value.length < spec.minLength)
    failures.push(`${spec.slot}: too short (${value.length} < ${spec.minLength})`);
  if (spec.maxLength > 0 && value.length > spec.maxLength)
    failures.push(`${spec.slot}: too long (${value.length} > ${spec.maxLength})`);
  return failures;
}

export function validateBanned(value: string, spec: SlotSpec): string[] {
  const failures: string[] = [];
  for (const b of BANNED_PATTERNS) {
    if (b.pattern.test(value)) failures.push(`${spec.slot}: banned — ${b.reason}`);
  }
  return failures;
}

/** Token-set Jaccard similarity; rejects near-duplicates vs existing records. */
export function similarity(a: string, b: string): number {
  const tok = (s: string) =>
    new Set(
      s
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 3)
    );
  const A = tok(a);
  const B = tok(b);
  if (A.size === 0 || B.size === 0) return 0;
  let inter = 0;
  for (const w of A) if (B.has(w)) inter++;
  return inter / (A.size + B.size - inter);
}

const UNIQUENESS_THRESHOLD = 0.55;

export function validateUniqueness(
  value: string,
  spec: SlotSpec,
  existing: string[]
): string[] {
  if (!spec.uniquenessCheck) return [];
  const failures: string[] = [];
  for (const e of existing) {
    if (similarity(value, e) >= UNIQUENESS_THRESHOLD) {
      failures.push(
        `${spec.slot}: too similar to an existing ${spec.pageType} record (>= ${UNIQUENESS_THRESHOLD})`
      );
      break;
    }
  }
  return failures;
}

export function runGates(
  value: string,
  spec: SlotSpec,
  existing: string[]
): GateResult {
  const failures = [
    ...validateLength(value, spec),
    ...validateBanned(value, spec),
    ...validateUniqueness(value, spec, existing),
  ];
  if (spec.required && value.trim().length === 0)
    failures.push(`${spec.slot}: required slot is empty`);
  return { ok: failures.length === 0, failures };
}

// ── Key rotation ──────────────────────────────────────────────

export function loadKeys(): string[] {
  const raw = process.env.GROQ_API_KEYS ?? "";
  return raw
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
}

export class KeyRing {
  private keys: string[];
  private parkedUntil: Map<string, number> = new Map();
  private cursor = 0;

  constructor(keys: string[]) {
    this.keys = keys;
  }

  /** Next usable key (round-robin, skipping parked keys). */
  next(): string {
    if (this.keys.length === 0)
      throw new Error("GROQ_API_KEYS is empty — set it before running.");
    for (let i = 0; i < this.keys.length; i++) {
      const k = this.keys[this.cursor % this.keys.length];
      this.cursor++;
      if ((this.parkedUntil.get(k) ?? 0) < Date.now()) return k;
    }
    throw new Error("All Groq keys are parked (rate-limited). Wait 60s and retry.");
  }

  /** Park a key for 60s after a 429. */
  park(key: string) {
    this.parkedUntil.set(key, Date.now() + 60_000);
  }
}

// ── Seed writer (validated) ───────────────────────────────────

const SEED_DIR = join(__dirname, "..", "data", "seed");

export function loadExistingSlotValues(pageType: PageType, slot: string): string[] {
  // Reads the same JSON the routes read, so uniqueness is checked
  // against exactly what is live.
  const values: string[] = [];
  const townsDir = join(SEED_DIR, "towns");
  if (pageType === "town" && existsSync(townsDir)) {
    for (const f of readdirSync(townsDir)) {
      if (!f.endsWith(".json")) continue;
      try {
        const rec = JSON.parse(readFileSync(join(townsDir, f), "utf8")) as Record<
          string,
          unknown
        >;
        const v = rec[slotCamel(slot)];
        if (typeof v === "string") values.push(v);
      } catch {
        /* skip unreadable seeds */
      }
    }
  }
  return values;
}

/** {{TOWN_INTRO}} -> intro, {{CITY_RISK_CARDS}} -> riskCards, ... */
function slotCamel(slot: string): string {
  const map: Record<string, string> = {
    HERO_ANSWER: "heroAnswer",
    TOWN_INTRO: "intro",
    TOWN_MOLD_NOTE: "moldNote",
    TOWN_COST_NOTE: "costNote",
    TOWN_PROBLEM_CARDS: "problemCards",
    CITY_RISK_CARDS: "riskCards",
    CITY_CLIMATE_NOTE: "climateNote",
    STATE_COST_NOTE: "costNote",
  };
  return map[slot] ?? slot.toLowerCase();
}

export function writeValidatedSeed(
  pageType: PageType,
  slug: string,
  filled: Record<string, string>
): GateResult {
  const failures: string[] = [];
  for (const spec of SLOT_CONTRACT.filter((s) => s.pageType === pageType)) {
    const value = filled[spec.slot] ?? "";
    const existing = loadExistingSlotValues(pageType, spec.slot);
    const r = runGates(value, spec, existing);
    failures.push(...r.failures);
  }
  if (failures.length > 0) return { ok: false, failures };

  const path =
    pageType === "town"
      ? join(SEED_DIR, "towns", `${slug}.json`)
      : join(SEED_DIR, `${slug}.json`);
  const current = existsSync(path)
    ? (JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>)
    : { slug };
  for (const spec of SLOT_CONTRACT.filter((s) => s.pageType === pageType)) {
    const value = filled[spec.slot];
    if (value != null && value !== "NULL") current[slotCamel(spec.slot)] = value;
  }
  writeFileSync(path, JSON.stringify(current, null, 1) + "\n");
  return { ok: true, failures: [] };
}

// ── Entry point (manual runs only) ────────────────────────────

function main() {
  const keys = new KeyRing(loadKeys());
  console.log(
    `[groq-pipeline] stub: ${keys ? "keys loaded" : "no keys"}. ` +
      "Network calls are implemented in the batch runner (not in this stub). " +
      "See SLOT_CONTRACT for the prompt-per-slot map and QA gates."
  );
  console.log(
    `[groq-pipeline] ${SLOT_CONTRACT.length} slots contracted across page types: ` +
      [...new Set(SLOT_CONTRACT.map((s) => s.pageType))].join(", ")
  );
  // Intentionally does nothing else: the batch runner (Groq Batch API +
  // KeyRing rotation + writeValidatedSeed) plugs in here at scale.
}

if (require.main === module) {
  main();
}
