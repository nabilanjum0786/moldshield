import { NextResponse } from "next/server";

/**
 * POST /api/alerts — signup for Mold Weather Alerts (email only).
 *
 * Body: { email, zip, preferences: { highRisk, postFlood, seasonal } }
 *
 * Current behavior: validates email + 5-digit ZIP server-side, logs the
 * signup, returns success. No email is actually sent or stored anywhere yet.
 * See TODOs below for the wiring steps.
 *
 * NOTE: NO SMS. There is no SMS provider anywhere in this project — alerts
 * are email only, and nothing here should ever be described as SMS-capable.
 *
 * ── WHAT'S STUBBED (must be built to go live) ──────────────────
 * 1. STORAGE: signups are only console.logged. A real list needs either the
 *    email provider's audience/list (Mailchimp/ConvertKit — same env pattern
 *    as app/api/subscribe/route.ts) or a small database (e.g. Vercel KV /
 *    Postgres) holding email + zip + preferences.
 * 2. SENDING JOB: nothing watches the weather. To go live you need a
 *    scheduled job (e.g. Vercel Cron, GitHub Action) that, for each stored
 *    ZIP, pulls hourly humidity/dew-point from Open-Meteo (build-time-verified
 *    working), decides alert-worthiness (lib/alert-templates.ts), calls
 *    renderZip() to fill [ZIP], and sends via the provider.
 * 3. DOUBLE OPT-IN: production should confirm the address with a
 *    confirmation email before sending alerts. Not implemented.
 *
 * ── TO WIRE THE PROVIDER (same 5-minute job as /api/subscribe) ──
 *    MAILCHIMP_API_KEY / MAILCHIMP_LIST_ID, or
 *    CONVERTKIT_API_KEY / CONVERTKIT_FORM_ID
 * Store per-subscriber preferences as tags/segments (e.g. "alerts-high-risk",
 * "alerts-post-flood", "alerts-seasonal") plus a merge field for the ZIP.
 */

type Preferences = { highRisk: boolean; postFlood: boolean; seasonal: boolean };
type Body = { email?: string; zip?: string; preferences?: Partial<Preferences> };

/** 5-digit US ZIP. Trims whitespace; ZIP+4 and anything else is rejected. */
export function validZip(z: string) {
  return /^\d{5}$/.test(z.trim());
}

function validEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
}

const DEFAULT_PREFS: Preferences = { highRisk: true, postFlood: true, seasonal: true };

export async function POST(req: Request) {
  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "bad-json" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const zip = (body.zip ?? "").trim();

  if (!validEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid-email" }, { status: 400 });
  }
  if (!validZip(zip)) {
    return NextResponse.json({ ok: false, error: "invalid-zip" }, { status: 400 });
  }

  const prefs: Preferences = {
    highRisk: body.preferences?.highRisk ?? DEFAULT_PREFS.highRisk,
    postFlood: body.preferences?.postFlood ?? DEFAULT_PREFS.postFlood,
    seasonal: body.preferences?.seasonal ?? DEFAULT_PREFS.seasonal,
  };

  // ── Stub: log the signup. Replace with provider storage. ──
  console.log("[alerts-signup]", {
    email,
    zip,
    preferences: prefs,
    at: new Date().toISOString(),
  });

  // TODO: when the provider is wired, store the subscriber with:
  //   tags/segments: alerts-high-risk / alerts-post-flood / alerts-seasonal
  //   merge field:   ZIP = zip
  // then send (or queue) a double-opt-in confirmation email.

  return NextResponse.json({ ok: true });
}
