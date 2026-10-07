import { NextResponse } from "next/server";

/**
 * POST /api/subscribe — email capture stub for the lead magnet.
 *
 * Current behavior: validates, logs, returns success. The checklist page
 * unlocks on success — no email actually leaves the server yet.
 *
 * ── TO CONNECT A REAL PROVIDER (5-minute job) ──────────────────
 * Option A — Mailchimp (free tier: 500 contacts):
 *   1. Create a free Mailchimp account → Audience → Signup forms → get
 *      your List ID (Audience ID) and generate an API key (Account → Extras
 *      → API keys). Server prefix is the part after "-" in the key (e.g. us21).
 *   2. Set env vars (Vercel → Project → Settings → Environment Variables):
 *        MAILCHIMP_API_KEY=xxxx-us21
 *        MAILCHIMP_LIST_ID=xxxxxxxxxx
 *   3. Uncomment the Mailchimp block below.
 *
 * Option B — ConvertKit (free tier: 1,000 subscribers):
 *   1. Create a free ConvertKit account → Settings → Advanced → copy
 *      your API key; create a Form → copy its Form ID.
 *   2. Set env vars:
 *        CONVERTKIT_API_KEY=xxxxxxxx
 *        CONVERTKIT_FORM_ID=xxxxxxx
 *   3. Uncomment the ConvertKit block below.
 *
 * Never commit keys — env only.
 */

type Body = { name?: string; email?: string; source?: string };

function validEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
}

export async function POST(req: Request) {
  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "bad-json" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim().toLowerCase();
  const source = (body.source ?? "unknown").trim();

  if (name.length < 2 || !validEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // ── Stub: log the signup. Replace with provider call below. ──
  console.log("[subscribe]", {
    name,
    email,
    source,
    at: new Date().toISOString(),
  });

  // ── Option A: Mailchimp ──
  // const mcKey = process.env.MAILCHIMP_API_KEY;
  // const mcList = process.env.MAILCHIMP_LIST_ID;
  // if (mcKey && mcList) {
  //   const dc = mcKey.split("-")[1];
  //   const r = await fetch(
  //     `https://${dc}.api.mailchimp.com/3.0/lists/${mcList}/members`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: `apikey ${mcKey}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email_address: email,
  //         status: "subscribed",
  //         merge_fields: { FNAME: name },
  //         tags: [source],
  //       }),
  //     }
  //   );
  //   if (!r.ok && r.status !== 400) {
  //     return NextResponse.json({ ok: false, error: "provider" }, { status: 502 });
  //   }
  // }

  // ── Option B: ConvertKit ──
  // const ckKey = process.env.CONVERTKIT_API_KEY;
  // const ckForm = process.env.CONVERTKIT_FORM_ID;
  // if (ckKey && ckForm) {
  //   const r = await fetch(
  //     `https://api.convertkit.com/v3/forms/${ckForm}/subscribe`,
  //     {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         api_key: ckKey,
  //         email,
  //         first_name: name,
  //         tags: [source],
  //       }),
  //     }
  //   );
  //   if (!r.ok) {
  //     return NextResponse.json({ ok: false, error: "provider" }, { status: 502 });
  //   }
  // }

  return NextResponse.json({ ok: true });
}
