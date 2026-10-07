import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { listStormCounties, getStormCounty } from "@/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { TriageTool } from "@/components/TriageTool";
import { Icon } from "@/components/icons";
import {
  JsonLd,
  howToSchema,
  faqJsonLd,
  breadcrumbSchema,
  speakableSchema,
} from "@/lib/schema";

/**
 * Storm Response county page (Workstream F).
 *
 * Renders ONE verified storm event from data/storm-events.json — a file
 * written ONLY by scripts/generate-storm-page.mjs from real NOAA Storm
 * Events Database records (or verified local news). This template never
 * invents events, dates, or damage figures; unknown counties 404.
 */

export const revalidate = 3600;

/**
 * Only counties in data/storm-events.json get pages — anything else 404s
 * cleanly instead of hitting the dynamic-render path.
 */
export const dynamicParams = false;

export async function generateStaticParams() {
  return listStormCounties().map((r) => ({ county: r.countySlug }));
}

type Params = { county: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { county } = await params;
  const r = getStormCounty(county);
  if (!r) return {};
  const place = r.stateAbbr ? `${r.countyName}, ${r.stateAbbr}` : r.countyName;
  return {
    title: `${r.eventType} in ${place} — 48-Hour Mold Action Plan | ${siteConfig.brandName}`,
    description: `A ${r.eventType.toLowerCase()} hit ${place} on ${formatDate(r.eventDate)}. What to do in the first 24–72 hours so it doesn't become a mold problem — EPA-anchored checklist, insurance guidance, and a free mold triage.`,
    alternates: { canonical: `${siteConfig.siteUrl}/storm/${r.countySlug}/` },
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** EPA-anchored 24–72h checklist. Generic and honest — no invented deadlines. */
const CHECKLIST: { name: string; text: string }[] = [
  {
    name: "Safety first — don't enter standing water",
    text: "Turn off electricity at the breaker if water reached outlets or wiring. Never wade through floodwater you can't see the bottom of — it hides debris, chemicals, and live electrical hazards. Wear waterproof boots, gloves, and an N95 respirator before any cleanup.",
  },
  {
    name: "Document damage before you touch anything",
    text: "Photograph and video every room, wall, appliance, and waterline before cleanup begins. Your insurer needs 'before' evidence — once it's cleaned, that proof is gone. Save receipts for every emergency expense.",
  },
  {
    name: "Get the water out fast",
    text: "Pump, wet-vac, or mop out standing water the same day. Move soaked rugs, furniture, and boxes outside or to a dry area. Open windows and doors if the outside air is drier than inside.",
  },
  {
    name: "Dry everything within 24–48 hours (the EPA rule)",
    text: "Run dehumidifiers and fans continuously. The EPA warns mold can begin growing in 24–48 hours — the clock starts when the water stops. Carpet, drywall, and insulation that can't dry in that window must be cut out and discarded.",
  },
  {
    name: "Clean and disinfect — floodwater is contaminated",
    text: "Floodwater carries sewage, chemicals, and bacteria. Scrub hard non-porous surfaces with soap and water, then disinfect. Bleach whitens mold on surfaces but does not make porous materials safe — remove, don't bleach, soaked drywall and carpet.",
  },
  {
    name: "Call your insurer BEFORE remediation starts",
    text: "Notify your insurer promptly — then document everything. Know what's covered: standard homeowners policies typically exclude flood damage, so check your policy (and any separate flood coverage) before paying for remediation out of pocket.",
  },
];

export default async function StormCountyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { county } = await params;
  const r = getStormCounty(county);
  if (!r) notFound();

  const place = r.stateAbbr ? `${r.countyName}, ${r.stateAbbr}` : r.countyName;
  const url = `${siteConfig.siteUrl}/storm/${r.countySlug}/`;
  const eventDate = formatDate(r.eventDate);
  const eventEnd =
    r.eventEndDate && r.eventEndDate !== r.eventDate
      ? ` – ${formatDate(r.eventEndDate)}`
      : "";

  const faqs = [
    {
      q: `My home flooded in ${place} — how fast do I need to act?`,
      aHtml: `<p>The EPA says mold can begin growing within <strong>24–48 hours</strong> of water exposure. That makes the first two days decisive: extract water, run dehumidifiers, and remove porous materials (carpet, drywall, insulation) that can't dry in that window. Waiting a week turns a drying job into a remediation job.</p>`,
    },
    {
      q: "Should I call my insurance company before the mold remediation company?",
      aHtml: `<p><strong>Yes — call your insurer first.</strong> Report the loss promptly, document everything with photos before cleanup, and understand your coverage before authorizing paid work. Standard homeowners policies typically exclude flood damage, so ask specifically whether your policy (or a separate flood policy) covers this event.</p>`,
    },
    {
      q: "Does homeowners insurance cover mold after a flood?",
      aHtml: `<p>Usually only if the mold resulted from a <strong>covered peril</strong> (like a burst pipe) — not from flooding or neglected maintenance, which standard policies typically exclude. Flood damage generally needs separate flood coverage. Check your policy wording and ask your adjuster directly; keep every receipt either way.</p>`,
    },
    {
      q: "Can I just bleach the mold after the water recedes?",
      aHtml: `<p>No — bleach whitens mold on hard surfaces but <strong>does not make soaked porous materials safe</strong>. Drywall, carpet, and insulation that stayed wet more than 48 hours must be removed and discarded; cleaning them is not enough. Floodwater is also contaminated, so hard surfaces need soap, water, and disinfectant — not bleach alone.</p>`,
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          speakableSchema({ url, cssSelectors: [".speakable"] }),
          breadcrumbSchema([
            { name: "Home", url: siteConfig.siteUrl },
            { name: "Storm Response", url: `${siteConfig.siteUrl}/storm/` },
            { name: place, url },
          ]),
          howToSchema({
            name: `24–72 hour mold-prevention checklist after the ${r.eventType.toLowerCase()} in ${place}`,
            steps: CHECKLIST,
            url,
          }),
          faqJsonLd(faqs),
        ]}
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Storm Response", href: "/storm/" },
          { name: place },
        ]}
      />

      {/* ── Hero ── */}
      <section className="block" aria-labelledby="storm-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <p className="eyebrow">Storm Response · Verified event</p>
          <h1 id="storm-h">
            {r.eventType} Hit {place} on {eventDate}
          </h1>
          <blockquote className="speakable" style={{ marginTop: 16 }}>
            {r.eventNarrative
              ? `${r.eventNarrative} `
              : ""}
            The 48-hour clock is running: the EPA says mold can begin growing
            within 24–48 hours of water exposure. Follow the checklist below
            now, and most of it never becomes a mold problem.
          </blockquote>
          <div className="cta-row">
            <a className="btn btn-primary" href={siteConfig.phoneHref}>
              <Icon name="phone" /> {siteConfig.phoneDisplay}
            </a>
            <Link className="btn btn-secondary" href="#checklist">
              24–72h action checklist
            </Link>
          </div>
        </div>
      </section>

      {/* ── Verified event details ── */}
      <section className="block alt" aria-labelledby="event-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <span className="eyebrow">What happened</span>
          <h2 id="event-h">Verified event details</h2>
          <div className="richtext">
            <dl
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(120px,180px) 1fr",
                gap: "10px 18px",
                margin: "20px 0",
              }}
            >
              <dt style={{ fontWeight: 800 }}>Event</dt>
              <dd style={{ margin: 0 }}>{r.eventType}</dd>
              <dt style={{ fontWeight: 800 }}>Date</dt>
              <dd style={{ margin: 0 }}>
                {eventDate}
                {eventEnd}
                {r.eventTimeLabel ? ` (${r.eventTimeLabel})` : ""}
              </dd>
              {r.episodeNarrative && (
                <>
                  <dt style={{ fontWeight: 800 }}>Conditions</dt>
                  <dd style={{ margin: 0 }}>{r.episodeNarrative}</dd>
                </>
              )}
              {r.floodCause && (
                <>
                  <dt style={{ fontWeight: 800 }}>Cause</dt>
                  <dd style={{ margin: 0 }}>{r.floodCause}</dd>
                </>
              )}
              {r.propertyDamage && (
                <>
                  <dt style={{ fontWeight: 800 }}>Reported damage</dt>
                  <dd style={{ margin: 0 }}>{r.propertyDamage} (property)</dd>
                </>
              )}
              {r.reportSource && (
                <>
                  <dt style={{ fontWeight: 800 }}>Reported by</dt>
                  <dd style={{ margin: 0 }}>{r.reportSource}</dd>
                </>
              )}
            </dl>
            <p
              style={{
                fontSize: 14,
                color: "var(--muted)",
                borderTop: "1px solid var(--line)",
                paddingTop: 14,
              }}
            >
              Event data source: {r.sourceName}, retrieved {formatDate(r.retrievedDate)}
              {r.sourceUrl ? (
                <>
                  {" "}·{" "}
                  <a href={r.sourceUrl} rel="noopener noreferrer">
                    source file
                  </a>
                </>
              ) : null}
              . Event details are quoted from the official record — not written
              or embellished by us.
            </p>
          </div>
        </div>
      </section>

      {/* ── 24–72h checklist ── */}
      <section className="block" id="checklist" aria-labelledby="checklist-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <span className="eyebrow">Act now</span>
          <h2 id="checklist-h">
            Your 24–72 hour action checklist
          </h2>
          <p className="speakable" style={{ color: "var(--muted)" }}>
            Do these in order. The first 48 hours decide whether this stays a
            drying job or becomes a mold remediation job.
          </p>
          <div className="richtext" style={{ marginTop: 24 }}>
            <ol className="steps">
              {CHECKLIST.map((s, i) => (
                <li key={s.name}>
                  <span className="step-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <strong>{s.name}</strong>
                    <p style={{ margin: "8px 0 0" }}>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Insurance guidance ── */}
      <section className="block alt" aria-labelledby="ins-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <span className="eyebrow">Money</span>
          <h2 id="ins-h">Insurance: protect your claim before you clean</h2>
          <div className="richtext">
            <ol className="steps">
              <li>
                <span className="step-n" aria-hidden="true">1</span>
                <div>
                  <strong>Notify your insurer promptly</strong>
                  <p style={{ margin: "8px 0 0" }}>
                    Call as soon as it&apos;s safe. We don&apos;t quote state-specific
                    deadlines because they vary by policy —{" "}
                    <strong>check your policy</strong> and ask your adjuster
                    directly what your reporting window is.
                  </p>
                </div>
              </li>
              <li>
                <span className="step-n" aria-hidden="true">2</span>
                <div>
                  <strong>Document everything</strong>
                  <p style={{ margin: "8px 0 0" }}>
                    Photos of every waterline, damaged item, and room — before
                    and during cleanup. Keep receipts for pumps, dehumidifiers,
                    hotels, and emergency repairs. An undocumented loss is a
                    denied claim waiting to happen.
                  </p>
                </div>
              </li>
              <li>
                <span className="step-n" aria-hidden="true">3</span>
                <div>
                  <strong>Know what flood means for coverage</strong>
                  <p style={{ margin: "8px 0 0" }}>
                    Standard homeowners policies typically <strong>exclude</strong>{" "}
                    flood damage — it usually needs separate flood coverage.
                    Mold from a covered peril (a burst pipe) is treated
                    differently than mold after a flood. Ask your adjuster
                    exactly which bucket your damage falls in.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ── Mold-risk follow-up ── */}
      <section className="block" aria-labelledby="followup-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <span className="eyebrow">After the water&apos;s gone</span>
          <h2 id="followup-h">Mold-risk follow-up: the next 7 days</h2>
          <div className="richtext">
            <p className="speakable">
              Drying the visible water is half the job. Mold grows where you
              can&apos;t see it — watch for these signs over the next week:
            </p>
            <ul>
              <li>
                <strong>Musty smell</strong> that wasn&apos;t there before — if you
                can smell it but can&apos;t see it, it&apos;s behind something
                (baseboards, drywall, under flooring).
              </li>
              <li>
                <strong>Discoloration</strong> creeping up drywall from the
                waterline, or dark spots behind baseboards.
              </li>
              <li>
                <strong>Musty air from vents</strong> the first time the HVAC
                runs after the event — ducts spread spores through the whole
                house.
              </li>
              <li>
                <strong>Warping or soft spots</strong> in floors and lower wall
                sections where water wicked upward.
              </li>
            </ul>
            <p>
              Don&apos;t paint over suspect areas — paint seals mold in, it doesn&apos;t
              kill it. If anything stayed wet more than 48 hours, assume it
              needs removal, not cleaning.
            </p>
          </div>
        </div>
      </section>

      {/* ── Triage tool (embedded, not a dead link) ── */}
      <section className="block alt" aria-labelledby="triage-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <span className="eyebrow">Free tool</span>
          <h2 id="triage-h">Mold Emergency Triage: is this a call-a-pro situation?</h2>
          <p style={{ color: "var(--muted)" }}>
            Answer a few questions about what you&apos;re seeing — you&apos;ll get an
            honest GREEN / YELLOW / RED verdict on how urgent this is.
          </p>
          <div style={{ marginTop: 20 }}>
            <TriageTool />
          </div>
        </div>
      </section>

      {/* ── Related tools ── */}
      <section className="block" aria-labelledby="tools-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <span className="eyebrow">Keep going</span>
          <h2 id="tools-h">Plan the next 14 days</h2>
          <div className="cta-row">
            <Link className="btn btn-secondary" href="/tools/flood-planner/">
              14-Day Flood Recovery Planner <Icon name="arrow" />
            </Link>
            <Link className="btn btn-secondary" href="/tools/insurance-checker/">
              Insurance Coverage Checker <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="block alt" aria-labelledby="faq-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <span className="eyebrow">Questions</span>
          <h2 id="faq-h">Storm and mold FAQs</h2>
          <div style={{ marginTop: 16 }}>
            {faqs.map((f) => (
              <div className="qa-callout" key={f.q}>
                <p className="q">{f.q}</p>
                <div
                  className="a"
                  dangerouslySetInnerHTML={{ __html: f.aHtml }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`Water got in? Don't wait for the smell.`}
        sub={`Free inspection in ${place} — we'll moisture-map the damage and tell you honestly whether it's a drying job or a remediation job.`}
      />
    </>
  );
}
