# Vary Layout by Data — layout rules for town pages

**Status:** spec for consumption — `lib/layout-rules.ts` is a pure module the page
layer will call once the data pipeline ships per-town signals. It is **not**
wired into any route yet. **Rule #0: nothing here invents a town
classification** — every branch traces to a measured input, and missing data
always falls back to the balanced `mixed` archetype (never guessed).

Sources this doc derives from: `../api-data-spec.md` (which APIs feed each
signal), `../dayton-metro-research.md` (the Dayton worked example),
`lib/layout-rules.ts` (the code), `lib/layout-rules.example.ts` (consumption
example).

---

## 1. Inputs

```ts
type TownLayoutSignals = {
  avgHumidity: number | null;          // Open-Meteo, avg daily RH %
  annualRainfallIn: number | null;     // NOAA Access Data Service, normals
  floodRisk: "high" | "moderate" | "low" | "unknown";  // pipeline-computed
  heatingDegreeDays?: number | null;   // NOAA normals, base-65°F annual HDD
  housingMedianYearBuilt?: number | null; // Census ACS (county fallback)
};
```

Any field may be `null` — nulls mean "not yet fetched", never a default
value. `floodRisk` is the one qualitative input: the **pipeline** (not the
layout module) derives it from FEMA flood history, SFHA exposure, **and**
recent major storm events (tornado/hurricane roof damage). That folding is a
data-layer decision documented here in §3.

## 2. Thresholds — derived vs editorial

| Constant | Value | Provenance |
|---|---|---|
| `HUMIDITY_LINE` | 60% avg RH | **EPA-derived** — EPA's published mold guidance: keep indoor RH below 60% (see `api-data-spec.md` §3, the weather panel's red zone). |
| `RAIN_WET_IN` | 40 in/yr | **Editorial** — no EPA line exists. Above the US long-run average (~38 in/yr; Ohio statewide 38.3 [NATLAS] in the research doc) and met by Dayton's ~42 in/yr [NWS]. Revisit if the pipeline ships a climate-anchored value. |
| `RAIN_DRY_IN` | 25 in/yr | **Editorial** — below this, ambient humidity and storm intrusion are minor mold drivers; plumbing leaks dominate. |
| `HDD_COLD` | 5,000 HDD/yr | **Editorial** — northern-tier US states run ~5,000–9,000+ base-65 HDD; US residential average ~4,000. (Dayton metro ≈5,200 — the pipeline verifies from NOAA normals at build time.) |
| `HDD_MILD` + `OLD_HOUSE_YEAR` | 4,000 HDD, built < 1960 | **Editorial** — real winters (≥4,000 HDD) plus 65+ year-old envelopes (Ohio median year built is 1965 [TOPHAP]) = attic condensation / ice-dam risk even below the cold threshold. |

Every editorial constant is flagged `// EDITORIAL` in `lib/layout-rules.ts`
and re-derivable at build time — the page layer must never hard-code its own
thresholds.

## 3. The five archetypes

### `flood-prone` — storm/flood recovery leads
- **Triggers:** `floodRisk === "high"`. The pipeline sets this from documented
  flood history (e.g. FEMA repetitive-loss data), SFHA exposure, **or**
  recent major storm events that caused roof/water damage at scale.
- **Leads with:** `storm-flood → roof → basement → insurance → humidity-control → faq`
- **Why it wins precedence:** acute water intrusion (floods, storm damage)
  overwhelms chronic drivers — demand is event-driven, and post-event mold
  content is the conversion surface.
- **Blurb:** *"Storm and flood recovery drives this market — roof damage,
  flooding, and water-intrusion remediation lead the page."*

### `humid-subtropical` — plumbing + AC-condensate leads
- **Triggers:** `avgHumidity ≥ 60%` AND (`annualRainfallIn ≥ 40` OR rainfall unknown).
  Humidity alone is the EPA line; rainfall must agree (or be absent) — a humid
  reading with genuinely low rainfall doesn't make a subtropical regime.
- **Leads with:** `hvac-condensate → plumbing → basement → crawlspace → humidity-control → faq`
- **Blurb:** *"Warm, damp air year-round — AC condensate, plumbing humidity,
  and basement moisture are the top mold drivers here."*

### `cold-climate` — attic condensation / ice-dam leads
- **Triggers:** `heatingDegreeDays ≥ 5,000`, OR `HDD ≥ 4,000` with
  `housingMedianYearBuilt < 1960` (old envelopes + real winters).
- **Leads with:** `attic → ice-dam → roof → basement → humidity-control → faq`
- **Blurb:** *"Cold winters meet older housing — attic condensation and
  ice-dam moisture cycles lead this market."*

### `dry` — plumbing-leak leads
- **Triggers:** `annualRainfallIn ≤ 25` AND `avgHumidity < 60%` (or humidity unknown).
- **Leads with:** `plumbing → roof → hvac-condensate → humidity-control → faq`
- **Blurb:** *"Low outdoor moisture — plumbing leaks and roof failures, not
  humidity, cause most mold calls here."*

### `mixed` — balanced priority, never a guess
- **Triggers:** ALL signals unknown (`floodRisk: "unknown"` + nulls), OR no
  rule matched. This is the honest default, not a failure state.
- **Order:** `basement → plumbing → attic → roof → storm-flood → faq` — drawn
  from EPA's residential mold guidance (the most common indoor mold
  locations), balanced when no single driver dominates or when data is
  missing.
- **Blurb:** *"Balanced layout — either the data is incomplete or no single
  climate driver dominates, so all major mold sources share the page."*
- **Re-resolution:** when the pipeline later fills the signals, the page
  rebuilds into the correct archetype. Until then, `notes` says so plainly.

**Precedence:** flood-prone > humid-subtropical > cold-climate > dry > mixed.
Precedence order is a comment in the code and a deliberate choice: acute
intrusion outranks chronic dampness, which outranks seasonal cold-climate
cycles. `mixed` is always last.

## 4. Worked example — Dayton, OH

Inputs the pipeline would assemble from the research doc:

| Signal | Value used | Real source |
|---|---|---|
| avgHumidity | 70% | Dayton avg RH ~70% daily (morning ~80%, afternoon ~57%) [CR] in `dayton-metro-research.md` §2 |
| annualRainfallIn | 42 in | NWS 1991–2020 normals, Dayton station; no true dry season [NWS][NOAA-NCEI] |
| floodRisk | **high** | Pipeline derivation, see reasoning below |
| heatingDegreeDays | ~5,200 | NOAA 1991–2020 normals, Dayton Intl (pipeline verifies at build) |
| housingMedianYearBuilt | ~1940s–50s | 94.6% of Dayton units built pre-1980, 34.1% pre-1940 [INFOPLEASE] (2000 Census; ACS update still pending per §9.2 — pipeline uses county/current ACS when live) |

**Result: `flood-prone`** — storm/flood content leads, then roof, basement,
insurance.

**Why (the derivation, not an assertion):** Dayton's 2019 Memorial Day tornado
outbreak destroyed or badly damaged 3,500–4,000 homes across the Miami Valley
(Dayton alone: 39 homes destroyed incl. 33 in Old North Dayton, 95 with major
damage [OEMA]) — roof/water damage at exactly the scale the pipeline's
"recent storm events" clause is defined for. Add the 1913 Great Dayton Flood
(20 ft downtown, 14 sq mi inundated; downtown sits in the river's natural
flood plain at a four-river confluence [WIKI-FLOOD]). A pipeline that follows
this doc's rule — *floodRisk must fold in documented flood history and recent
major storm events* — emits `"high"` for Dayton, so `resolveLayout` returns
`flood-prone`.

**Honest caveat (do not hand-wave):** if the pipeline instead weights the
Miami Conservancy District's flood-control protection and emits `"moderate"`,
Dayton falls through to **`humid-subtropical`** (70% RH ≥ 60% EPA line, 42 in
rain ≥ 40) — hvac-condensate/plumbing leads. The `notes` field in the
resolution always says which path was taken, so the classification is
auditable. The cold-climate rule also technically fires (HDD ~5,200), but
precedence puts chronic humidity above winter cycles — the humid-subtropical
fallback is the documented alternative, not a contradiction.

## 5. Consumption — the page layer's contract

```ts
import { resolveLayout, ARCHETYPE_DESCRIPTIONS } from "@/lib/layout-rules";

const { archetype, contentPriority, notes } = resolveLayout({
  avgHumidity: weather.avgRhPct,        // from cached pipeline JSON
  annualRainfallIn: weather.rainfallIn,
  floodRisk: location.floodRisk,        // pipeline-computed class
  heatingDegreeDays: climate.hdd,
  housingMedianYearBuilt: housing.medianYearBuilt,
});
// contentPriority[0] renders first after the local-picture block;
// ARCHETYPE_DESCRIPTIONS[archetype] feeds the intro blurb.
```

Rules for consumers:
1. **Never reorder, never skip.** The array order is the editorial decision.
2. **Never substitute your own thresholds.** If a page needs different
   thresholds, change `lib/layout-rules.ts` (and this doc), not the page.
3. **Log `notes` at build time** — it's the audit trail for why a town got
   its archetype.
4. **Do not invent signals at render time.** Missing data → `mixed`. A page
   showing the balanced layout is always correct; a page showing a
   classified layout on invented numbers is a bug.

`lib/layout-rules.example.ts` shows the call shape with illustrative
fixtures — it is explicitly NOT imported by any route.

## 6. Section-key → template-block mapping

Section keys are content themes, not components. The town page maps them
onto the existing template blocks (`town-template.html`: hero, local-picture
`#local-h`, problems `#problems-h`, services `#services-h`, faq `#faq-h`,
final CTA). The **problems block is the one that varies by data** — its
"3 mold problems" slots are filled from `contentPriority`; services
(`#services-h`) can likewise lead with the first two keys' services.

| Section key | Town-template block | Slot behavior |
|---|---|---|
| `storm-flood` | problems → slot 1 | Storm/flood recovery narrative + before/after imagery |
| `roof` | problems / services | Roof inspection & post-storm repair angle |
| `basement` | problems / services | Basement flooding, sump, foundation seepage |
| `crawlspace` | problems / services | Crawl-space moisture, vapor barriers |
| `attic` | problems / services | Attic condensation, ventilation |
| `ice-dam` | problems | Ice-dam winter moisture cycles |
| `plumbing` | problems / services | Pipe leaks, slab leaks, water-heater failures |
| `hvac-condensate` | problems / services | AC condensate drains, duct sweating |
| `humidity-control` | services | Dehumidifiers, whole-home RH control |
| `insurance` | local-picture sidebar | Claims, coverage checks, documentation |
| `faq` | faq `#faq-h` | Question bank (always last) |

The hero, local-picture weather panel, and final CTA are archetype-neutral
and never reorder.

## 7. What this module does NOT do (refused to invent)

- **No invented town classifications.** A town with incomplete data gets
  `mixed` — the module would rather show a balanced page than guess.
- **No fabricated flood-risk scores.** `floodRisk: "high"` is a
  pipeline-computed input from FEMA/storm-event data; the module accepts the
  label, it never computes one from thin air.
- **No fake precision.** Thresholds are round numbers; humidity is whole
  percent (per `api-data-spec.md` §6).
- **No page wiring.** This module only decides order; the page layer owns
  rendering (see §5 contract). The example file is explicitly marked
  not-for-production.
- **No per-town flood-map zone letters.** SFHA zones are address-level, not
  town-level — per `dayton-metro-research.md` §9.7, town pages say "Zone AE
  floodplain mapped along the [river] corridor" with the FEMA Map Service
  Center lookup, and no zone letters are invented.
