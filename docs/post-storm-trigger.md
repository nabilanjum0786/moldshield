# Post-Storm Page Trigger Process

**Workstream F** — how a storm-response county page goes from "it flooded in
Dayton" to a live `/storm/<county>/` page. Last verified: **2026-10-06**.

---

## NOAA access status: VERIFIED (script-accessible)

The NOAA Storm Events Database bulk CSV files are reachable with plain `curl`
— no key, no login. Verified 2026-10-06 by downloading the full 2026
details file (~7.5 MB) and filtering real Montgomery County, OH flood events
from it.

**Download + filter snippet:**

```bash
# 1. List available detail files, pick the newest for the target year
curl -s "https://www.ncei.noaa.gov/pub/data/swdi/stormevents/csvfiles/" \
  | grep -oE 'StormEvents_details-ftp_v1.0_d2026_c[0-9]+\.csv\.gz' \
  | sort -u | tail -3

# 2. Download (example: cut dated 2026-09-18)
curl -s --max-time 120 \
  "https://www.ncei.noaa.gov/pub/data/swdi/stormevents/csvfiles/StormEvents_details-ftp_v1.0_d2026_c20260918.csv.gz" \
  -o /tmp/se2026.csv.gz

# 3. Filter for a target county + flood-type events
zcat /tmp/se2026.csv.gz | python3 -c "
import csv, sys
with open('/dev/stdin', newline='', encoding='latin-1') as f:
    for row in csv.DictReader(f):
        if (row['STATE'] == 'OHIO' and row['CZ_NAME'] == 'MONTGOMERY'
                and row['EVENT_TYPE'] in ('Flash Flood', 'Flood', 'Heavy Rain')):
            print(row['BEGIN_DATE_TIME'], '|', row['EVENT_TYPE'],
                  '| dmg:', row['DAMAGE_PROPERTY'],
                  '|', (row['EVENT_NARRATIVE'] or '')[:160])
"
```

> **Note:** NOAA cuts a new file as the year progresses (`d2026_cYYYYMMDD`).
> Always pick the newest cut — a file dated Sept 18 won't contain Sept 23
> events yet. Event records lag by days to weeks; if a fresh storm isn't in
> the bulk file, use NWS storm reports or verified local news as the interim
> source and re-verify against NOAA later.

### What is NOT the right endpoint

The SWDI REST API (`www.ncdc.noaa.gov/swdiws/…`, now redirecting to
`www.ncei.noaa.gov`) is also script-accessible, but it only serves radar
products (tornado vortex signatures, mesocyclone, hail, lightning) — **not**
county-level flood/storm events with damage narratives. Use the bulk CSV.

---

## The trigger flow (4 steps)

### Step 1 — Monitor (manual, ~10 min after a storm)

Watch, in priority order:

1. **NWS alerts / local NWS office** (e.g. NWS Wilmington for Dayton) —
   fastest signal a flood/flash-flood event happened.
2. **Local news** (e.g. Dayton Daily News, WHIO, weather.com) — confirms
   real-world impact (roads closed, basements flooded).
3. **NOAA Storm Events bulk CSV** — the authoritative record; confirms the
   event is real and gives verbatim narratives, dates, damage, and cause.

Only proceed when you have a **real event record** — county, event type, and
date from NOAA or a verified news report. Never invent any of these.

### Step 2 — Generate (scripted, human-supervised)

Build the input JSON from the verified record — copy the NOAA narratives
**verbatim**, don't embellish — then run:

```bash
node scripts/generate-storm-page.mjs --input /tmp/montgomery-event.json
```

Example input (the Montgomery County, OH worked example — real record):

```json
{
  "county": "Montgomery County",
  "state": "Ohio",
  "eventType": "Flash Flood",
  "eventDate": "2026-06-07",
  "eventEndDate": "2026-06-07",
  "eventTimeLabel": "6:45 PM – 7:45 PM Eastern",
  "episodeNarrative": "Isolated thunderstorms produced locally heavy rainfall during the late afternoon and early evening hours.",
  "eventNarrative": "Several cars were stuck in high water at the Bethany Village community.",
  "floodCause": "Heavy Rain",
  "propertyDamage": "$3,000",
  "reportSource": "State Official",
  "sourceName": "NOAA Storm Events Database",
  "sourceUrl": "https://www.ncei.noaa.gov/pub/data/swdi/stormevents/csvfiles/StormEvents_details-ftp_v1.0_d2026_c20260918.csv.gz",
  "retrievedDate": "2026-10-06"
}
```

**The generator refuses loudly (exit 1, nothing written) when `eventType` or
`eventDate` is missing.** This is Rule #0 enforced in code: a storm page is
never generated from a guess. It also validates the date format and refuses
to write a corrupt data file.

### Step 3 — Rebuild / deploy

```bash
npm run build   # or push and let Vercel build
```

`generateStaticParams` reads `data/storm-events.json`, so the new
`/storm/<county-slug>/` page is pre-rendered automatically. The sitemap
picks it up too (no manual sitemap edit needed).

### Step 4 — QA checklist (do NOT skip — human eyes on every publish)

- [ ] Event type, date, narratives, and damage match the NOAA record exactly.
- [ ] "Event data source: NOAA Storm Events Database, retrieved [date]" line is present.
- [ ] Page renders at `/storm/<slug>/` (check the production URL, not just localhost).
- [ ] No lorem ipsum / placeholder text anywhere on the page.
- [ ] HowTo (checklist), FAQPage, and BreadcrumbList structured data present — spot-check with the Rich Results Test.
- [ ] Phone number is the current site-wide number from `lib/site-config.ts`.
- [ ] CTA links resolve: `/tools/flood-planner/`, `/tools/insurance-checker/`, triage section renders.
- [ ] Mobile check: checklist steps and event details table readable at 360px.
- [ ] Canonical URL correct; page appears in `/sitemap.xml`.
- [ ] `noindexPreview` in `lib/site-config.ts` is still `true` (until the real domain is attached).

---

## What IS automated vs manual

| Task | Status |
|---|---|
| Downloading NOAA Storm Events bulk CSV via `curl` | **Automated — verified working** |
| Filtering by county / state / event type / date | **Automated** (python one-liner above) |
| Fetching new NOAA cuts on a schedule | Possible via cron/GitHub Actions — **not yet built** |
| Verifying the event is real and relevant to a target county | **Manual — required** |
| Copying narratives verbatim into the input JSON | **Manual — required** |
| Deciding to publish (is this event worth a page?) | **Manual — required** |
| Writing `data/storm-events.json` from the input | Scripted (`generate-storm-page.mjs`) |
| Pre-rendering the page, sitemap entry | **Automated** (Next.js build) |
| QA before publish | **Manual — required** |

**Bottom line:** the data pipeline from NOAA is proven script-accessible,
but publishing is deliberately **manual-trigger for now** — a human confirms
the event and the QA checklist before anything goes live. Auto-publish stays
off until the system has run cleanly on several manual cycles.

---

## Files involved

- `scripts/generate-storm-page.mjs` — the generator (refuses without eventType/eventDate).
- `data/storm-events.json` — the event records (written by the generator only).
- `app/storm/[county]/page.tsx` — the county page template.
- `app/storm/page.tsx` — the county index (auto-lists records).
- `data/types.ts` (`StormEventRecord`), `data/index.ts` (loaders), `app/sitemap.ts` (entries).
