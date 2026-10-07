import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HubHero } from "@/components/hub";
import { Faq } from "@/components/content";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd, faqPageSchema, speakableSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `What a Proper Mold Remediation Scope Includes | ${siteConfig.brandName}`,
  description:
    "The scope-of-work template: containment, negative air, HEPA, removal vs treatment, moisture-source repair, clearance testing, documentation, warranty. Hold any contractor to this.",
  alternates: { canonical: `${siteConfig.siteUrl}/guides/proper-scope/` },
};

const FAQS = [
  {
    question: "What is the difference between mold removal and mold remediation?",
    answer:
      "Removal is just the mold — scrubbed or torn out. Remediation is mold plus the moisture source plus prevention: containment, removal, HEPA treatment, fixing the water problem, and verification. Anyone selling just 'removal' is selling half the job, because mold without a fixed cause always returns.",
  },
  {
    question: "Should remediation include fixing the leak that caused the mold?",
    answer:
      "Yes — a proper scope either includes the moisture-source repair or clearly documents the referral for it. In New York, note that Article 32 legally separates mold remediation from moisture-source repair, so the remediation plan may document the source while a different contractor fixes it. Either way, it must be addressed, not ignored.",
  },
  {
    question: "What is third-party clearance testing?",
    answer:
      "After remediation, someone independent of the crew verifies the job: visual inspection, moisture readings back in normal range, and air or surface samples comparing indoor spore counts to an outdoor baseline. It's the written proof the remediation worked — and what insurers and real-estate transactions ask for.",
  },
  {
    question: "How long should a mold remediation job take?",
    answer:
      "One to three days is typical for a contained residential job; three to ten-plus days for whole-house or extensive work. The drying phase takes longer than the cleaning — a scope that promises same-day everything for a large job is a red flag.",
  },
];

const ITEMS = [
  {
    n: 1,
    name: "Written scope before work begins",
    text: "Rooms or areas to be worked on, quantities of materials to be removed or cleaned, the remediation method for each area, and a fixed price — in writing, signed before anything starts. In Texas this written protocol is a legal requirement (TMARR); everywhere else it's just how professionals operate. No scope, no signature.",
  },
  {
    n: 2,
    name: "Containment",
    text: "The work zone is sealed off with polyethylene barriers so disturbed spores can't migrate into your living space during the job. For larger jobs, containment is built as a full enclosure with a decontamination entry. This is the step that separates professionals from handymen with spray bottles.",
  },
  {
    n: 3,
    name: "Negative air pressure",
    text: "The contained zone is kept at lower air pressure than the surrounding rooms, so air flows in, not out — spores physically cannot drift past the barriers. Air scrubbers exhaust filtered air outside the containment to maintain it.",
  },
  {
    n: 4,
    name: "HEPA filtration and vacuuming",
    text: "HEPA-filtered air scrubbers run inside containment throughout the job, capturing airborne spores down to 0.3 microns. Every surface in the work zone gets HEPA-vacuumed. HEPA captures spores — it doesn't kill them at the source, which is why it's one step in the system, not the whole system.",
  },
  {
    n: 5,
    name: "Removal of porous materials — not just 'treatment'",
    text: "Contaminated porous materials (drywall, insulation, carpet, ceiling tiles) are removed and bagged for disposal — because biocides can't reach mold roots inside them (see the bleach myth). Non-porous surfaces (joists, sheathing, concrete) are mechanically cleaned to the substrate. Beware any quote that only sprays or fogs and calls it done: dry fogging reaches inaccessible areas as a supplement, never as a standalone fix, and it does not remove dead spores or fix the moisture source.",
  },
  {
    n: 6,
    name: "Moisture-source repair — or a documented referral",
    text: "The cause gets fixed: bath vents rerouted outside, plumbing leaks repaired, drainage corrected, ventilation balanced, dehumidifiers installed where needed. Mold without a fixed cause always returns — this step is why proper remediation doesn't. If the source repair is outside the remediator's trade, the scope must name what needs fixing and who should do it.",
  },
  {
    n: 7,
    name: "Third-party clearance testing",
    text: "After the work, an independent party verifies it: visual inspection, moisture readings back in normal range, and spore counts compared against an outdoor baseline — in a written report. The company that did the work should not be the only one grading it, especially on real-estate transactions.",
  },
  {
    n: 8,
    name: "Photo documentation of every stage",
    text: "Before, during, and after — what was found, what was removed, what was repaired. You receive the full set. Photos are your proof for insurers, buyers, and your own future disclosure forms.",
  },
  {
    n: 9,
    name: "Written timeline",
    text: "Start date, key milestones, and completion date in writing. Typical contained jobs run 1–3 days; whole-house jobs 3–10+. The drying phase takes longer than the cleaning — plan for it, and treat 'done today' promises for large jobs as a red flag.",
  },
  {
    n: 10,
    name: "Warranty in writing",
    text: "What exactly is warrantied (the work, not future unrelated leaks), for how long, and what's excluded. Get it in the contract, not in conversation. A contractor confident in their moisture-source diagnosis will put a rework guarantee on it.",
  },
];

export default function ProperScopePage() {
  const url = `${siteConfig.siteUrl}/guides/proper-scope/`;
  return (
    <>
      <JsonLd
        data={[
          faqPageSchema(FAQS),
          speakableSchema({ url, cssSelectors: [".speakable"] }),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides/" },
          { name: "Proper Scope of Work" },
        ]}
      />
      <HubHero
        h1="What a Proper Mold Job Includes"
        answer="This is the scope-of-work template to hold any contractor to. Ten items, in order. If a quote skips containment, skips the moisture source, or won't put anything in writing, you now know exactly what you're looking at. Educational guidance — not a contract and not legal advice."
      />

      <section className="block" aria-labelledby="scope">
        <div className="wrap">
          <span className="eyebrow reveal">The template</span>
          <h2 id="scope" className="reveal">
            The 10-Item Scope Checklist
          </h2>
          <div className="richtext">
            <p>
              The industry's professional standard (IICRC S520) describes these
              concepts in technical detail; what follows is a plain-language
              description of what each item means in your home — described
              generally, not quoted from the standard. Any legitimate quote
              should address all ten.
            </p>
            <ol className="steps">
              {ITEMS.map((item) => (
                <li key={item.n} className="reveal">
                  <span className="step-n" aria-hidden="true">
                    {item.n}
                  </span>
                  <div>
                    <strong>{item.name}</strong>
                    <p style={{ margin: "4px 0 0" }}>{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="block alt" aria-labelledby="redflags">
        <div className="wrap">
          <span className="eyebrow reveal">Watch for these</span>
          <h2 id="redflags" className="reveal">
            Five Red Flags in a Mold Quote
          </h2>
          <div className="richtext">
            <ul>
              <li>
                <strong>No containment mentioned.</strong> If the plan is "we'll
                just spray and wipe," spores will migrate through your house
                during the job.
              </li>
              <li>
                <strong>Fogging or spraying as the whole job.</strong> Dry
                fogging is a supplement, not a standalone remediation — it
                doesn't remove dead spores and it doesn't fix the moisture
                source.
              </li>
              <li>
                <strong>No mention of the moisture source.</strong> The #1
                predictor of "the mold came back." If the scope doesn't name
                the cause and how it's being fixed or referred out, it's
                incomplete.
              </li>
              <li>
                <strong>Nothing in writing.</strong> Verbal scopes become
                disputes. A professional hands you the written plan before
                work starts.
              </li>
              <li>
                <strong>No clearance or documentation.</strong> No
                post-remediation verification and no photos means you have no
                proof the job worked — and nothing to show an insurer or buyer.
              </li>
            </ul>
            <blockquote className="speakable">
              The bottom line from our remediation-methods research: no method
              works without fixing the moisture source first. That's why the
              EPA's 24–48 hour drying rule comes before every product and every
              technique.
            </blockquote>
            <p>
              Checking licenses too? See{" "}
              <Link href="/guides/state-licensing/">
                which states require a mold license
              </Link>{" "}
              and how to verify any contractor.
            </p>
          </div>
        </div>
      </section>

      <Faq items={FAQS} heading="Scope of Work: Quick Answers" />

      <CtaBand
        title="Get a quote that passes this checklist"
        sub="Free inspection, written 10-item scope, fixed price, photo documentation, and independent clearance. That's the whole job — nothing less."
      />
    </>
  );
}
