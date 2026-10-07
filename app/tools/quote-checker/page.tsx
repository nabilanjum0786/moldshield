import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { QuoteChecker } from "@/components/QuoteChecker";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: `Free Remediation Quote Checker — Spot Red Flags | ${siteConfig.brandName}`,
  description:
    "Paste a mold remediation quote and check it for structural red flags: missing containment, no moisture-source fix, no clearance testing, flat pricing, pressure tactics. Free keyword-based check.",
  alternates: { canonical: `${siteConfig.siteUrl}/tools/quote-checker/` },
};

// "What a proper quote includes" — informed by EPA remediation guidance and
// the general concepts of the IICRC S520 standard. Paraphrased in plain
// language; nothing here is quoted verbatim from either standard.
const GUIDE: { title: string; why: string }[] = [
  {
    title: "Containment",
    why: "Plastic barriers seal the work zone so spores don't reach clean rooms during tear-out.",
  },
  {
    title: "Negative-air / HEPA filtration",
    why: "Keeps the work zone at lower air pressure and captures airborne spores as they're disturbed.",
  },
  {
    title: "Moisture-source repair",
    why: "The leak, pipe, or drainage problem is fixed first — without this the mold returns. EPA: dry wet materials within 24–48 hours.",
  },
  {
    title: "HEPA vacuuming and wiping",
    why: "Physical removal plus HEPA vacuuming of surfaces; spraying or fogging alone is not a substitute.",
  },
  {
    title: "Third-party clearance testing",
    why: "An independent post-remediation test verifies the work — not self-certified by the crew that did it.",
  },
  {
    title: "Itemized scope",
    why: "Line items for each task, so you can compare quotes and verify every promised step was done.",
  },
  {
    title: "Written timeline",
    why: "Start date, drying time, and completion date in writing — so there's a schedule to hold them to.",
  },
  {
    title: "Warranty",
    why: "A written guarantee on the work: what's covered and for how long.",
  },
];

export default function QuoteCheckerPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Free Tools", href: "/tools/" },
          { name: "Quote Checker" },
        ]}
      />
      <section className="block" aria-labelledby="qc-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <p className="eyebrow">Free tool · Hiring help</p>
          <h1 id="qc-h" style={{ marginBottom: 8 }}>
            Remediation Quote Checker
          </h1>
          <p
            className="speakable"
            style={{ maxWidth: 660, color: "var(--muted)", fontSize: 17 }}
          >
            A mold quote is a promise in writing — this tool checks whether the
            promise covers the structural pieces every proper remediation needs.
            Paste the line items below and it flags what&apos;s missing, in
            plain English.
          </p>
          <p style={{ maxWidth: 660, fontSize: 14.5, color: "var(--muted)" }}>
            <strong style={{ color: "inherit" }}>Honesty note:</strong> this is
            a keyword-based check, not a professional review. It can&apos;t see
            work quality, it can&apos;t verify prices, and it never judges
            whether a quote is &ldquo;too expensive.&rdquo;
          </p>
          <div style={{ marginTop: 24 }}>
            <QuoteChecker />
          </div>
        </div>
      </section>

      <section className="block" aria-labelledby="qc-guide-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <p className="eyebrow">Know what to ask for</p>
          <h2 id="qc-guide-h" style={{ marginBottom: 8 }}>
            What a proper quote includes
          </h2>
          <p
            style={{ maxWidth: 660, color: "var(--muted)", fontSize: 15.5 }}
          >
            Eight structural pieces, in plain language — informed by EPA mold
            remediation guidance and the general concepts of the IICRC S520
            standard (paraphrased, not quoted). If any are missing from your
            quote, ask the contractor about them in writing.
          </p>
          <ol
            style={{
              margin: "20px 0 0",
              padding: 0,
              listStyle: "none",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 12,
            }}
          >
            {GUIDE.map((g, i) => (
              <li
                key={g.title}
                style={{
                  border: "1px solid var(--line, #e5e5e5)",
                  borderRadius: 10,
                  padding: "14px 16px",
                  background: "var(--card, #fff)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 30,
                      height: 30,
                      borderRadius: 8,
                      background: "var(--brand-dark, #0B2B26)",
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <strong style={{ fontSize: 15.5 }}>{g.title}</strong>
                </div>
                <p
                  style={{
                    margin: 0,
                    fontSize: 14,
                    color: "var(--muted)",
                    lineHeight: 1.55,
                  }}
                >
                  {g.why}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="block" aria-labelledby="qc-honest-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div
            style={{
              border: "1px dashed var(--line, #e5e5e5)",
              borderRadius: 12,
              padding: "20px 22px",
              background: "var(--card, #fff)",
            }}
          >
            <h2 id="qc-honest-h" style={{ fontSize: 19, marginBottom: 8 }}>
              What this tool can&apos;t do
            </h2>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.6, margin: 0 }}>
              This tool can&apos;t see what isn&apos;t written. A missing
              keyword isn&apos;t proof of a missing step — contractors describe
              the same work in different words, and mentioning a keyword
              doesn&apos;t prove the work will be done well. Use the flags as
              questions, then{" "}
              <strong style={{ color: "inherit" }}>
                ask the contractor directly
              </strong>
              : &ldquo;Is containment included? Who does the clearance
              test? What&apos;s the moisture-source fix?&rdquo; Get the answers
              in writing before you sign.
            </p>
            <div style={{ marginTop: 14 }}>
              <Link
                className="btn btn-brand"
                href={siteConfig.phoneHref}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  textDecoration: "none",
                }}
              >
                <Icon name="phone" />
                Call {siteConfig.phoneDisplay} for a free second quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Two quotes are better than one."
        sub="Free inspection, itemized written quote, third-party clearance available — compare us against anyone."
      />
    </>
  );
}
