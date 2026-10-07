import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig, services } from "@/lib/site-config";
import { RenderBlocks } from "@/content/blocks";
import { AnswerBlock, Faq } from "@/components/content";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { ChecklistCta } from "@/components/ChecklistCta";
import { HeroCtas, TrustBadges } from "@/components/Hero";
import { Icon } from "@/components/icons";
import {
  JsonLd,
  serviceSchema,
  faqPageSchema,
  howToSchema,
  speakableSchema,
} from "@/lib/schema";
import { pillars } from "@/content/pillars";
import { listStates } from "@/data";
import { DisclosureNotice } from "@/components/DisclosureNotice";

export const revalidate = 3600;

// ─────────────────────────────────────────────────────────────
// Severity tiers — 1:1 with lib/triage-engine.ts verdicts.
// RED/YELLOW/GREEN are the engine's VerdictLevel; the copy below
// restates the engine's RED/YELLOW/GREEN trigger conditions only.
// ─────────────────────────────────────────────────────────────
type Severity = {
  letter: string;
  name: string;
  verdict: string;
  desc: string;
  chip: { bg: string; fg: string; ring: string };
  icon: "shield" | "clock" | "check";
};

const SEVERITIES: Severity[] = [
  {
    letter: "A",
    name: "Act now",
    verdict: "triage RED",
    desc: "Sewage water, HVAC contamination, more than ~10 sq ft, or spreading fast — the engine's RED verdict. Don't touch it, don't wait.",
    chip: { bg: "#4A0E0E", fg: "#FF8A8A", ring: "rgba(255,138,138,.35)" },
    icon: "shield",
  },
  {
    letter: "B",
    name: "Act this week",
    verdict: "triage YELLOW",
    desc: "Visible growth or a worsening musty smell — beyond DIY but not an emergency. The engine's YELLOW verdict: a pro should see it within 48 hours.",
    chip: { bg: "#4A2E00", fg: "#F5B301", ring: "rgba(245,179,1,.35)" },
    icon: "clock",
  },
  {
    letter: "C",
    name: "Inspect and plan",
    verdict: "triage GREEN",
    desc: "A small, isolated spot with no spread, no smell, no symptoms — the engine's GREEN verdict. Inspect it, gear up, and plan the fix.",
    chip: { bg: "#0B3D2E", fg: "#7CF5C8", ring: "rgba(124,245,200,.35)" },
    icon: "check",
  },
];

type ToolCard = { name: string; href: string; blurb: string };

const TOOL_CARDS: Record<string, ToolCard> = {
  triage: {
    name: "Mold Emergency Triage",
    href: "/tools/",
    blurb:
      "Answer 8 questions — get a RED, YELLOW, or GREEN verdict and exactly what to do next.",
  },
  "moisture-detective": {
    name: "Moisture Detective",
    href: "/tools/moisture-detective/",
    blurb:
      "Tap the problem room, answer a few questions — get the likely moisture sources to investigate, in the order worth checking.",
  },
  "quote-checker": {
    name: "Remediation Quote Checker",
    href: "/tools/quote-checker/",
    blurb:
      "Paste a remediation quote — get plain-English flags for missing containment, no clearance testing, flat pricing, and pressure tactics.",
  },
  "interview-kit": {
    name: "Pro Interview Kit",
    href: "/tools/interview-kit/",
    blurb:
      "The 10 questions to ask before hiring any mold remediator — printable, so no smooth talker slips past.",
  },
  "cost-estimator": {
    name: "Cost Estimator",
    href: "/#tools-h",
    blurb:
      "A 30-second ballpark from 2026 HomeAdvisor national ranges — your free inspection gives the exact written quote.",
  },
  "flood-planner": {
    name: "14-Day Flood Recovery Planner",
    href: "/tools/flood-planner/",
    blurb:
      "Pick your water-event date, get a day-by-day action plan anchored on the EPA 24–48h rule.",
  },
  "dew-point": {
    name: "Dew-Point Interpreter",
    href: "/tools/dew-point/",
    blurb:
      "Enter a temperature and humidity reading — see exactly which surfaces will sweat, and your EPA humidity band.",
  },
  "mold-identifier": {
    name: "Visual Mold Identifier",
    href: "/tools/mold-identifier/",
    blurb:
      "Describe what you're seeing — we'll tell you what it's most consistent with, and what to do next.",
  },
  "mold-myths": {
    name: "Mold Myths, Debunked",
    href: "/guides/mold-myths/",
    blurb:
      "Black mold, bleach, ozone machines — what the EPA and CDC actually say about common mold myths.",
  },
  checklist: {
    name: "Homeowner's Mold Inspection Checklist",
    href: "/checklist/",
    blurb:
      "Free printable room-by-room mold inspection checklist, built from EPA guidance.",
  },
  "humidity-log": {
    name: "7-Day Humidity Log",
    href: "/tools/humidity-log/",
    blurb:
      "Track your home's humidity for a week with a $15 meter — the cheapest early-warning system there is.",
  },
};

const PILLAR_TOOLS: Record<string, string[]> = {
  "attic-mold-removal": [
    "moisture-detective",
    "triage",
    "cost-estimator",
    "quote-checker",
    "interview-kit",
  ],
  "basement-mold-removal": [
    "triage",
    "flood-planner",
    "dew-point",
    "quote-checker",
    "cost-estimator",
  ],
  "crawl-space-mold-remediation": [
    "triage",
    "moisture-detective",
    "quote-checker",
    "interview-kit",
  ],
  "black-mold-removal": ["mold-identifier", "triage", "mold-myths", "quote-checker"],
  "mold-inspection-testing": ["checklist", "humidity-log", "interview-kit", "quote-checker"],
};

export async function generateStaticParams() {
  return Object.keys(pillars).map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  const pillar = pillars[service];
  if (!pillar) return {};
  return {
    title: pillar.metaTitle,
    description: pillar.metaDescription,
    alternates: { canonical: `${siteConfig.siteUrl}/services/${pillar.slug}/` },
  };
}

export default async function ServicePillarPage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  const pillar = pillars[service];
  if (!pillar) notFound();

  const url = `${siteConfig.siteUrl}/services/${pillar.slug}/`;
  const related = services.filter((s) => s.slug !== pillar.slug);
  const states = listStates();
  const pillarTools = (PILLAR_TOOLS[pillar.slug] ?? [
    "triage",
    "quote-checker",
    "interview-kit",
  ]).map((key) => TOOL_CARDS[key]);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            serviceName: pillar.name,
            description: pillar.metaDescription,
            url,
            areaServed: pillar.areaServed,
          }),
          faqPageSchema(pillar.faqs),
          howToSchema({ name: `${pillar.name} Process`, steps: pillar.processSteps, url }),
          speakableSchema({ url, cssSelectors: [".speakable"] }),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services/" },
          { name: pillar.name },
        ]}
      />

      {/* Hero */}
      <section className="hero">
        <div className="wrap">
          <h1>{pillar.name}</h1>
          <div className="answer speakable" role="note" aria-label="Quick answer">
            <AnswerBlock>{pillar.heroAnswer}</AnswerBlock>
          </div>
          <HeroCtas />
          <TrustBadges />
        </div>
      </section>

      {/* Lead-gen disclosure — early, not buried */}
      <div className="wrap" style={{ marginTop: 24 }}>
        <DisclosureNotice variant="short" />
      </div>

      {/* How urgent is your situation? — severity tiers mirror triage-engine.ts */}
      <section className="block" aria-labelledby="urgency-h">
        <div className="wrap">
          <span className="eyebrow reveal">Urgency Check</span>
          <h2 id="urgency-h" className="reveal">
            How Urgent Is Your Situation?
          </h2>
          <p className="lede reveal">
            Mold jobs fall into three urgency tiers — the same tiers our
            triage tool uses to decide what you should do next.
          </p>
          <div className="grid cols-3" style={{ marginTop: 24 }}>
            {SEVERITIES.map((sev) => (
              <div
                key={sev.letter}
                className="card reveal"
                style={{
                  border: `1px solid ${sev.chip.ring}`,
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: sev.chip.bg,
                    color: sev.chip.fg,
                    boxShadow: `0 0 0 3px ${sev.chip.ring}`,
                    borderRadius: 10,
                    padding: "8px 14px",
                    marginBottom: 14,
                    fontWeight: 700,
                  }}
                >
                  <Icon name={sev.icon} />
                  <span>
                    {sev.letter} — {sev.name}
                  </span>
                </div>
                <p>{sev.desc}</p>
                <p style={{ fontSize: 14, color: "var(--muted)" }}>
                  Maps to {sev.verdict}
                </p>
                <Link className="more" href="/tools/">
                  Run the free 2-minute triage <Icon name="arrow" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body blocks */}
      <section className="block" aria-label={`${pillar.name} guide`}>
        <div className="wrap">
          <RenderBlocks blocks={pillar.blocks} />
        </div>
      </section>

      {/* Tools for this job */}
      <section className="block alt" aria-labelledby="job-tools-h">
        <div className="wrap">
          <span className="eyebrow reveal">Free Tools</span>
          <h2 id="job-tools-h" className="reveal">
            Tools for This Job
          </h2>
          <p className="lede reveal">
            Free, no-signup tools that go with {pillar.name.toLowerCase()} —
            built from EPA guidance.
          </p>
          <div className="grid cols-2" style={{ marginTop: 24 }}>
            {pillarTools.map((tool, i) => (
              <div
                key={tool.href}
                className="card reveal"
                {...(i % 2 > 0 ? { "data-delay": "1" } : {})}
              >
                <h3>{tool.name}</h3>
                <p>{tool.blurb}</p>
                <Link className="more" href={tool.href}>
                  Use this tool <Icon name="arrow" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related services — the internal-linking engine */}
      <section className="block alt" aria-labelledby="related-h">
        <div className="wrap">
          <span className="eyebrow reveal">Keep Exploring</span>
          <h2 id="related-h" className="reveal">
            Our Mold Remediation Services
          </h2>
          <div className="grid cols-2" style={{ marginTop: 24 }}>
            {related.map((s, i) => (
              <div
                key={s.slug}
                className="card reveal"
                {...(i % 2 > 0 ? { "data-delay": "1" } : {})}
              >
                <h3>{s.name}</h3>
                <p>{s.blurb}</p>
                <Link className="more" href={`/services/${s.slug}/`}>
                  {s.name} <Icon name="arrow" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section className="block" aria-labelledby="areas-h">
        <div className="wrap">
          <span className="eyebrow reveal">Coverage</span>
          <h2 id="areas-h" className="reveal">
            Areas We Serve
          </h2>
          <p className="lede reveal">
            Proudly serving homeowners across{" "}
            {states.map((st, i) => (
              <span key={st.slug}>
                {i > 0 && ", "}
                <Link href={`/${st.slug}/`}>{st.name}</Link>
              </span>
            ))}
            , including{" "}
            <Link href="/ohio/dayton/">Dayton</Link> and surrounding
            communities. More service areas opening soon.
          </p>
        </div>
      </section>

      <Faq items={pillar.faqs} heading={`${pillar.name}: Frequently Asked Questions`} />

      {pillar.slug === "mold-inspection-testing" && <ChecklistCta />}

      <CtaBand
        title={`Get Your Free ${pillar.name} Inspection`}
        sub="No obligation. We'll find the mold, scope the job, and give you a written quote — free."
      />
    </>
  );
}
