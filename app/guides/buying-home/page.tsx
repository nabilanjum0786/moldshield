import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HubHero } from "@/components/hub";
import { Faq } from "@/components/content";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd, faqPageSchema, speakableSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Buying a Home with Mold: Disclosure Rules and Negotiation Guide | ${siteConfig.brandName}`,
  description:
    "How mold disclosure works when buying a home (including Ohio's disclosure form), what to do when an inspection finds mold, and how to negotiate remediation before closing.",
  alternates: { canonical: `${siteConfig.siteUrl}/guides/buying-home/` },
};

const FAQS = [
  {
    question: "Do sellers have to disclose mold when selling a house?",
    answer:
      "In Ohio, yes — the Residential Property Disclosure Form specifically asks whether the property has ever been inspected for mold by a qualified inspector, and requires details of any inspection report and remediation. Sellers must disclose known defects in writing. In other states, rules vary: some forms ask about mold directly, others rely on general defect disclosure. Check your state's disclosure form — never assume.",
  },
  {
    question: "Should I buy a house with mold?",
    answer:
      "Mold itself is fixable — buyers walk from mold they find, not mold that's handled properly. What matters is: the moisture source is identified, the remediation scope is written and priced by a qualified professional, and post-remediation clearance testing confirms it's resolved. Walk away if the seller won't document any of that.",
  },
  {
    question: "Who pays for mold remediation when buying a home?",
    answer:
      "It's negotiable. Common outcomes: the seller completes remediation before closing (with documentation and clearance testing), the seller credits you at closing to handle it yourself, or the price is reduced to reflect the cost. Get a written scope and fixed quote first — negotiating without a real number is guessing.",
  },
  {
    question: "What is post-remediation clearance testing?",
    answer:
      "After remediation, an independent party verifies the work: visual inspection, moisture readings back in normal range, and air or surface samples comparing indoor spore counts to an outdoor baseline. For a real-estate transaction, the clearance report is the document that proves the job was done — lenders and insurers may ask for it.",
  },
];

export default function BuyingHomePage() {
  const url = `${siteConfig.siteUrl}/guides/buying-home/`;
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
          { name: "Buying a Home with Mold" },
        ]}
      />
      <HubHero
        h1="Buying a Home with Mold"
        answer="Mold on an inspection report doesn't have to kill the deal — undocumented mold does. This guide covers how mold disclosure works (verified for Ohio below), what to demand when an inspection finds mold, and how to negotiate so the problem is actually solved before you close. Educational guidance, not legal advice."
      />

      {/* Ohio disclosure — VERIFIED */}
      <section className="block" aria-labelledby="ohio-disclosure">
        <div className="wrap">
          <span className="eyebrow reveal">Verified: Ohio</span>
          <h2 id="ohio-disclosure" className="reveal">
            Ohio's Mold Disclosure Rule
          </h2>
          <div className="richtext">
            <p>
              Ohio's Residential Property Disclosure Law (ORC Section 5302.30)
              requires sellers of residential property to disclose known
              defects in writing on the state's disclosure form. The form asks
              specifically about water intrusion — previous or current water
              leakage, accumulation, excess moisture, or defects below grade —
              and it asks this question directly:
            </p>
            <blockquote className="speakable">
              "Have you ever had the property inspected for mold by a qualified
              inspector?" — with a follow-up requiring details of the
              inspection report and any remediation undertaken.
            </blockquote>
            <p>
              If the seller answers yes, they must describe what was found and
              what was done about it. If they answer no but you later discover
              they knew about a mold problem, that false answer is where legal
              liability lives — buyers are protected because disclosure is in
              writing, and sellers are protected once they've disclosed. (
              <a
                href="https://www.lisasiskoteam.com/blog/ohio-residential-property-disclosure-form-guide"
                rel="noopener noreferrer"
              >
                Ohio Residential Property Disclosure Form guide
              </a>
              )
            </p>
            <p>
              <strong>What this means for Ohio buyers:</strong> read the
              disclosure form line by line, especially the water-intrusion and
              mold-inspection questions. Ask for copies of any inspection
              reports and remediation invoices the seller references. A
              documented, remediated problem with a clearance report is a
              selling point; an undocumented one is a risk you price in.
            </p>
          </div>
        </div>
      </section>

      {/* Other states */}
      <section className="block alt" aria-labelledby="other-states">
        <div className="wrap">
          <span className="eyebrow reveal">Other states</span>
          <h2 id="other-states" className="reveal">
            Disclosure Rules Vary by State — Check Yours
          </h2>
          <div className="richtext">
            <p>
              We verified Ohio because it's our launch state. For other states,
              we won't guess: mold disclosure requirements differ — some states
              have mold-specific questions on their disclosure forms, others
              rely on general "known material defect" language, and the
              lookback periods and exemptions vary too.
            </p>
            <ul>
              <li>
                <strong>Get your state's actual disclosure form</strong> and
                read every water, moisture, and environmental question before
                you make an offer.
              </li>
              <li>
                <strong>"As-is" doesn't mean "undisclosed."</strong> Even in
                as-is sales, sellers generally can't lie about known defects.
              </li>
              <li>
                <strong>Ask your agent or a local real-estate attorney</strong>{" "}
                how mold is treated in your state — this guide is educational,
                not legal advice.
              </li>
            </ul>
            <p>
              <strong>Pending verification:</strong> we are researching mold
              disclosure rules state by state and will publish verified
              summaries here as each is confirmed. Anything not yet verified
              stays off this page.
            </p>
          </div>
        </div>
      </section>

      {/* When inspection finds mold */}
      <section className="block" aria-labelledby="found-mold">
        <div className="wrap">
          <span className="eyebrow reveal">The playbook</span>
          <h2 id="found-mold" className="reveal">
            When the Inspection Finds Mold
          </h2>
          <div className="richtext">
            <p>
              An inspector finds mold. Don't panic, don't ignore it — run this
              sequence:
            </p>
            <ol className="steps">
              <li className="reveal">
                <span className="step-n" aria-hidden="true">
                  1
                </span>
                <div>
                  <strong>Get specifics, not vibes.</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    Where exactly? How extensive? What's the moisture source
                    feeding it? Ask the inspector to document locations with
                    photos and moisture readings. If testing was done, get the
                    lab report — not just "mold was found."
                  </p>
                </div>
              </li>
              <li className="reveal">
                <span className="step-n" aria-hidden="true">
                  2
                </span>
                <div>
                  <strong>Get a written remediation scope.</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    A qualified remediator scopes the job in writing: areas to
                    be worked on, materials to be removed or cleaned, method
                    per area, and a fixed price. See our{" "}
                    <Link href="/guides/proper-scope/">
                      proper scope-of-work guide
                    </Link>{" "}
                    for what that document must include. You can't negotiate
                    without a real number.
                  </p>
                </div>
              </li>
              <li className="reveal">
                <span className="step-n" aria-hidden="true">
                  3
                </span>
                <div>
                  <strong>Negotiate the fix, not the fear.</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    Three common outcomes: (a) the seller completes remediation
                    before closing, with documentation and clearance testing;
                    (b) the seller credits you at closing and you manage the
                    job after possession; (c) the price drops by the remediation
                    cost. Option (a) is cleanest — but only with a written scope
                    and independent clearance, not "my cousin handled it."
                  </p>
                </div>
              </li>
              <li className="reveal">
                <span className="step-n" aria-hidden="true">
                  4
                </span>
                <div>
                  <strong>Require third-party clearance.</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    After remediation: visual inspection, moisture readings
                    back in normal range, and spore counts compared against an
                    outdoor baseline. Get the clearance report in writing before
                    closing. This document protects your resale disclosure later
                    too.
                  </p>
                </div>
              </li>
              <li className="reveal">
                <span className="step-n" aria-hidden="true">
                  5
                </span>
                <div>
                  <strong>Keep every record.</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    Inspection report, remediation scope, invoices, clearance
                    report. When you sell the home someday, these are the
                    documents that turn "there was mold" into "there was mold,
                    professionally remediated, here's the proof."
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <Faq items={FAQS} heading="Buying with Mold: Quick Answers" />

      <CtaBand
        title="Buying a home with a mold flag?"
        sub="Get a written scope and fixed quote before you negotiate — free inspection, documented findings, no obligation."
      />
    </>
  );
}
