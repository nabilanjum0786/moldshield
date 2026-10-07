# Mold Weather Alerts — system documentation

**Status (2026-10-06): VERIFIED — capture path works; sending path STUBBED.**

Email-only alerts (no SMS — there is no SMS provider in this project, and none is planned).

## What exists today (VERIFIED)

| Piece | File | What it does |
|---|---|---|
| Alert templates | `lib/alert-templates.ts` | Pure functions returning `{ subject, body }` plain-text emails: high-risk window, post-flood 48-hour checklist, fall attic prep, spring AC condensate check. `[ZIP]` placeholder filled by `renderZip()` at send time. |
| Signup API | `app/api/alerts/route.ts` | `POST /api/alerts` accepts `{ email, zip, preferences: { highRisk, postFlood, seasonal } }`. Server-side email + 5-digit ZIP validation. **Stub: logs and returns `{ ok: true }` — nothing stored, nothing sent.** |
| Signup form | `components/AlertSignup.tsx` | Client form: email + ZIP + 3 preference checkboxes, success/error states, posts to `/api/alerts`. Honest microcopy. |
| Landing page | `app/alerts/page.tsx` | "Free Mold Weather Alerts": the 3 alert types, signup component, FAQ (honest about advisory nature), privacy note. Canonical: `/alerts/`. |

## What's stubbed (NOT built)

1. **Storage.** Signups are only `console.log`ed. No database, no provider audience — subscribers are lost when the serverless log rotates. Fix: wire Mailchimp/ConvertKit (same env pattern as `app/api/subscribe/route.ts`) storing per-subscriber tags `alerts-high-risk` / `alerts-post-flood` / `alerts-seasonal` and a `ZIP` merge field, or store email + zip + prefs in Vercel KV / Postgres.
2. **Sending job.** Nothing watches the weather. Fix: a scheduled job (Vercel Cron or GitHub Action, e.g. every 6 hours) that, for each subscribed ZIP:
   - pulls hourly humidity/dew-point from Open-Meteo (free, no key; verified working at build time);
   - applies alert rules (e.g. sustained dew point ≥ ~65°F / high RH over multiple days, or a recent flood/storm event near the ZIP);
   - renders the matching template from `lib/alert-templates.ts`, calls `renderZip(template, zip)`, sends via the provider;
   - records the send so the same ZIP isn't alerted twice for the same event.
3. **Double opt-in.** Production should send a confirmation email before alerts begin. Not implemented.

## Environment variables needed

Only needed when the provider is wired (same pattern as `/api/subscribe`):

```
MAILCHIMP_API_KEY=xxxx-us21        # Mailchimp option
MAILCHIMP_LIST_ID=xxxxxxxxxx
```
or
```
CONVERTKIT_API_KEY=xxxxxxxx        # ConvertKit option
CONVERTKIT_FORM_ID=xxxxxxx
```

No keys for the weather side — Open-Meteo is free and keyless. Seasonal reminders need no API at all (they're date-driven, e.g. September fall attic-prep, April spring AC check).

## Steps to go live

1. Set the env vars above on Vercel; uncomment/complete the provider block in `app/api/alerts/route.ts` (mirror the pattern in `app/api/subscribe/route.ts`).
2. Add a storage read path (list subscribers by tag + ZIP) or a DB table.
3. Build the scheduled job (Vercel Cron recommended: `vercel.json` → `crons`, route `/api/cron/weather-alerts`) that:
   - fetches subscribers (by tag/segment),
   - checks Open-Meteo per ZIP,
   - sends the matching template (use `renderZip()`),
   - logs sends to dedupe.
4. Add double opt-in confirmation before the first alert.
5. Wire seasonal sends to fixed dates (September, April) gated on the `seasonal` tag.

## Honesty rules (RULE #0)

- Alerts are **advisory, not predictive** — weather data says conditions favor mold; it never diagnoses a home. This is stated on `/alerts` and in every FAQ answer.
- No invented local statistics in templates. All facts are EPA-sourced: 24–48h drying rule, <10 sq ft DIY threshold, <60% RH indoor target.
- Never claim SMS capability. Email only.
