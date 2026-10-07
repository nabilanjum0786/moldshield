import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Icon, type IconName } from "@/components/icons";

export const metadata: Metadata = {
  title: `Free Mold Tools | ${siteConfig.brandName}`,
  description:
    "Free interactive mold tools: moisture detective, quote checker, landlord complaint letter generator, insurance coverage checker, visual mold identifier, 14-day flood recovery planner, pro interview kit, humidity log, and dew-point interpreter.",
  alternates: { canonical: `${siteConfig.siteUrl}/tools/` },
};

type Tool = {
  name: string;
  href: string;
  icon: IconName;
  blurb: string;
  tag: string;
};

const TOOLS: Tool[] = [
  {
    name: "Moisture Detective",
    href: "/tools/moisture-detective/",
    icon: "home",
    blurb:
      "Tap the problem room, answer a few questions — get the likely moisture sources to investigate, in the order worth checking.",
    tag: "Find the source",
  },
  {
    name: "Landlord Mold Complaint Letter Generator",
    href: "/tools/landlord-letter/",
    icon: "shield",
    blurb:
      "Answer a few questions, get a formal demand letter citing Ohio landlord law — ready to print or copy.",
    tag: "For renters",
  },
  {
    name: "Insurance Coverage Checker",
    href: "/tools/insurance-checker/",
    icon: "check",
    blurb:
      "Three questions about what happened — an honest read on whether your mold claim is likely covered.",
    tag: "Claims",
  },
  {
    name: "Visual Mold Identifier",
    href: "/tools/mold-identifier/",
    icon: "home",
    blurb:
      "Describe what you're seeing — we'll tell you what it's most consistent with, and what to do next.",
    tag: "Identify",
  },
  {
    name: "14-Day Flood Recovery Planner",
    href: "/tools/flood-planner/",
    icon: "clock",
    blurb:
      "Pick your water-event date, get a day-by-day action plan anchored on the EPA 24–48h rule.",
    tag: "Emergencies",
  },
  {
    name: "Pro Interview Kit",
    href: "/tools/interview-kit/",
    icon: "pin",
    blurb:
      "The 10 questions to ask before hiring any mold remediator — printable, so no smooth talker slips past.",
    tag: "Printable",
  },
  {
    name: "Remediation Quote Checker",
    href: "/tools/quote-checker/",
    icon: "check",
    blurb:
      "Paste a remediation quote — get plain-English flags for missing containment, no clearance testing, flat pricing, and pressure tactics.",
    tag: "Hiring help",
  },
  {
    name: "7-Day Humidity Log",
    href: "/tools/humidity-log/",
    icon: "arrow",
    blurb:
      "Track your home's humidity for a week with a $15 meter — the cheapest early-warning system there is.",
    tag: "Printable",
  },
  {
    name: "Dew-Point Interpreter",
    href: "/tools/dew-point/",
    icon: "home",
    blurb:
      "Enter a temperature and humidity reading — see exactly which surfaces will sweat, and your EPA humidity band.",
    tag: "Condensation",
  },
];

export default function ToolsHubPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Free Tools" }]}
      />
      <section className="block" aria-labelledby="tools-h">
        <div className="wrap" style={{ maxWidth: 980 }}>
          <p className="eyebrow">Free tools</p>
          <h1 id="tools-h" style={{ marginBottom: 8 }}>
            Free Mold Tools
          </h1>
          <p
            className="speakable"
            style={{ maxWidth: 660, color: "var(--muted)", fontSize: 17 }}
          >
            Nine free tools built from EPA guidance and real Ohio law — no
            signup, no catch. Use them, share them, print them.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
              marginTop: 28,
            }}
          >
            {TOOLS.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="card"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "var(--brand-dark, #0B2B26)",
                      color: "#fff",
                    }}
                  >
                    <Icon name={t.icon} />
                  </span>
                  <span
                    className="pill"
                    style={{ fontSize: 12 }}
                  >
                    {t.tag}
                  </span>
                </div>
                <strong style={{ fontSize: 17 }}>{t.name}</strong>
                <span style={{ fontSize: 14.5, color: "var(--muted)" }}>
                  {t.blurb}
                </span>
                <span
                  className="more"
                  style={{ marginTop: "auto", paddingTop: 8 }}
                >
                  Use it free
                  <Icon name="arrow" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand
        title="Tools tell you what's wrong. We fix it."
        sub="Free inspection, transparent pricing, photo-documented work — when you're ready for the human part."
      />
    </>
  );
}
