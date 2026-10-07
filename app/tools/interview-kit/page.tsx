import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = {
  title: `10 Questions to Ask Before Hiring a Mold Remediator | ${siteConfig.brandName}`,
  description:
    "Free printable checklist: the 10 questions that separate real mold professionals from handymen with a spray bottle — what a good answer sounds like, and the red flags that mean walk away.",
  alternates: { canonical: `${siteConfig.siteUrl}/tools/interview-kit/` },
};

type QA = {
  q: string;
  why: string;
  good: string;
  redFlag: string;
};

const QUESTIONS: QA[] = [
  {
    q: "Are you licensed and insured specifically for mold work?",
    why: "A few states (Florida, Texas, New York) require a specific mold license; most don't — so everywhere else, proof of insurance and real certification is what separates pros from pretenders.",
    good: "Yes — here's our license number (where required), certificate of insurance, and IICRC AMRT certification.",
    redFlag:
      "\"We've been doing this 20 years, don't worry about paperwork\" — or can't produce a single document.",
  },
  {
    q: "What is your containment protocol?",
    why: "Remediation without containment spreads spores through the whole house — the cure becomes worse than the disease.",
    good: "Poly-sheeting barriers, negative air pressure, and sealed HVAC vents in the work area, every job.",
    redFlag: "\"We just spray and wipe.\" No mention of containment at all.",
  },
  {
    q: "Do you use HEPA filtration — air scrubbers and HEPA vacuums?",
    why: "Mold spores are microscopic. Regular shop-vacs just redistribute them; only HEPA captures them.",
    good: "Yes — HEPA air scrubbers under negative pressure, plus HEPA vacuuming of every surface.",
    redFlag:
      "\"Our fogger handles everything.\" Dry fogging alone doesn't remove dead spores or fix the moisture source.",
  },
  {
    q: "Will you fix the moisture source — or only remove the mold?",
    why: "Mold always returns if the leak or humidity isn't fixed. Removal without moisture repair is half a job.",
    good: "We find and fix the moisture source first. Anyone selling just 'removal' is selling half the job.",
    redFlag: "\"That's a plumber's problem.\" Walks away from the cause.",
  },
  {
    q: "Do you offer independent third-party clearance testing?",
    why: "The company grading its own work is a conflict of interest. Independent verification is the only proof that counts.",
    good: "We recommend — and can arrange — independent post-remediation verification testing.",
    redFlag: "\"Our own test says it's clean. Trust us.\"",
  },
  {
    q: "Will I get a written scope of work and a fixed price?",
    why: "Verbal quotes grow. A written scope with line items is the only quote you can compare or hold anyone to.",
    good: "Written scope, line items, fixed price before work starts — signed by both sides.",
    redFlag:
      "\"We'll see once we open the walls — probably around…\" with no cap and nothing in writing.",
  },
  {
    q: "Do you photo-document before, during, and after?",
    why: "You can't see inside your walls. Timestamped photos are your only proof of what was actually done.",
    good: "Yes — you'll receive timestamped photos at every stage of the job.",
    redFlag: "\"We'll tell you what we did.\" No photos, no proof.",
  },
  {
    q: "Can you give me references from recent local jobs?",
    why: "Local references prove they actually work in your area — not a call center routing jobs to whoever's free.",
    good: "Here are three recent customers nearby you can call today.",
    redFlag:
      "\"Our reviews speak for themselves\" — but can't name a single customer or show one verifiable review.",
  },
  {
    q: "What's the realistic timeline — including drying?",
    why: "Drying takes longer than cleaning. A typical job runs 1–3 days; whole-house cases run 3–10+ days.",
    good: "X days for remediation plus Y days of drying — here's the day-by-day schedule.",
    redFlag: "\"One afternoon, guaranteed.\" For anything beyond a tiny surface job, that's fantasy.",
  },
  {
    q: "Do you warranty your work — in writing?",
    why: "A warranty that excludes regrowth is worthless. Get the terms on paper before anyone lifts a tool.",
    good: "Written warranty covering regrowth for a stated period, provided the moisture source stays fixed.",
    redFlag: "No warranty in writing — or \"mold always comes back, nothing anyone can do.\"",
  },
];

export default function InterviewKitPage() {
  return (
    <>
      <div className="no-print">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Free Tools", href: "/tools/" },
            { name: "Pro Interview Kit" },
          ]}
        />
      </div>

      <section className="block" aria-labelledby="kit-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <p className="print-box" style={{ fontSize: 13, color: "#5c6f68" }}>
            {siteConfig.brandName} · Free homeowner tool · Print this and take
            it to every estimate
          </p>
          <p className="eyebrow">Free tool · Printable</p>
          <h1 id="kit-h" style={{ marginBottom: 8 }}>
            10 Questions to Ask Before Hiring a Mold Remediator
          </h1>
          <p className="lede">
            A true professional <strong>welcomes</strong> these questions —
            they prove you know what good work looks like. Print this page,
            check the boxes as you interview each company, and compare the
            answers side by side. The company that flinches at question 1 is
            telling you everything.
          </p>
          <div style={{ marginTop: 20 }}>
            <PrintButton />
          </div>

          <div className="print-checklist" style={{ marginTop: 36 }}>
            {QUESTIONS.map((item, i) => (
              <section
                key={i}
                aria-label={`Question ${i + 1}`}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: "var(--radius)",
                  padding: 22,
                  marginBottom: 16,
                  background: "var(--white)",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    aria-label={`Asked question ${i + 1}`}
                    style={{
                      width: 22,
                      height: 22,
                      marginTop: 4,
                      flex: "none",
                      accentColor: "var(--brand-dark)",
                    }}
                  />
                  <span>
                    <span
                      style={{
                        display: "block",
                        fontSize: 12,
                        fontWeight: 800,
                        letterSpacing: 1.5,
                        color: "var(--faint)",
                        textTransform: "uppercase",
                        marginBottom: 4,
                      }}
                    >
                      Question {i + 1} of 10
                    </span>
                    <strong style={{ fontSize: 18 }}>{item.q}</strong>
                  </span>
                </label>
                <p style={{ margin: "12px 0 0", color: "var(--muted)" }}>
                  <strong style={{ color: "var(--ink)" }}>
                    Why this matters:
                  </strong>{" "}
                  {item.why}
                </p>
                <div
                  style={{
                    display: "grid",
                    gap: 10,
                    marginTop: 14,
                    gridTemplateColumns: "1fr",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      background: "#eef7f4",
                      border: "1px solid #bfe6d9",
                      borderRadius: 10,
                      padding: "12px 14px",
                      fontSize: 15,
                    }}
                  >
                    <span className="check">✓ GOOD sounds like: </span>
                    {item.good}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      background: "#fdf2f2",
                      border: "1px solid #f3c2c2",
                      borderRadius: 10,
                      padding: "12px 14px",
                      fontSize: 15,
                    }}
                  >
                    <span className="cross">✗ RED FLAG: </span>
                    {item.redFlag}
                  </p>
                </div>
                <p style={{ margin: "12px 0 0", fontSize: 14 }}>
                  <strong>Their answer:</strong>{" "}
                  <span
                    style={{
                      display: "inline-block",
                      borderBottom: "1px solid var(--faint)",
                      minWidth: 220,
                    }}
                  >
                    &nbsp;
                  </span>
                </p>
              </section>
            ))}
          </div>

          <div
            className="no-print"
            style={{
              background: "var(--tint)",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius)",
              padding: 22,
              marginTop: 8,
            }}
          >
            <h2 style={{ fontSize: 22 }}>How to use this kit</h2>
            <ol style={{ margin: "10px 0 0", paddingLeft: 22 }}>
              <li>Print one copy per company you interview (aim for 3).</li>
              <li>Ask every question. Check the box. Write their answer.</li>
              <li>
                Compare the sheets side by side — the pattern of red flags
                will be obvious.
              </li>
            </ol>
            <p style={{ margin: "14px 0 0", color: "var(--muted)", fontSize: 15 }}>
              Built from EPA remediation guidance and IICRC S520 principles.
              No company paid to appear here — and no company can pay to be
              removed.
            </p>
          </div>
        </div>
      </section>

      <div className="no-print">
        <CtaBand
          title="Already know you need a pro?"
          sub="Skip the interviews — get a free inspection from certified specialists with transparent pricing and photo-documented work."
        />
      </div>
    </>
  );
}
