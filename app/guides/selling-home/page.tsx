import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HubHero } from "@/components/hub";
import { Faq } from "@/components/content";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd, faqPageSchema, speakableSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Selling a Home With Mold (Ohio): Disclosure, Inspection Strategy, Negotiation | ${siteConfig.brandName}`,
  description:
    "Ohio's mold disclosure rule, pre-listing inspection strategy, why deals die at inspection, and whether to remediate before listing or credit the buyer.",
  alternates: { canonical: `${siteConfig.siteUrl}/guides/selling-home/` },
};

const FAQS = [
  {
    question: "Do I have to disclose mold when selling my home in Ohio?",
    answer:
      "Yes. Ohio's Residential Property Disclosure Law (ORC 5302.30) requires sellers to disclose known defects in writing, and the state's disclosure form asks directly whether the property has ever been inspected for mold by a qualified inspector — with a follow-up requiring details of any inspection report and remediation. This is educational information about the law, not legal advice; consult a real-estate attorney for your situation.",
  },
  {
    question: "Should I remediate mold before listing or credit the buyer?",
    answer:
      "General guidance: remediating before listing usually produces the better outcome — the problem is solved, documented, and can't be used against you at inspection. A credit can work, but buyers typically overestimate the cost and discount the offer accordingly. Get a written scope and fixed quote either way so you're negotiating with a real number.",
  },
  {
    question: "Will mold kill my home sale?",
    answer:
      "Undocumented mold kills deals; documented, remediated mold usually doesn't. Buyers walk from mold they find at inspection — especially when the scope and cost are unknown. A completed remediation with a written scope, invoices, and post-remediation clearance testing turns 'there was mold' into a selling point about a well-maintained home.",
  },
  {
    question: "What is post-remediation clearance testing and why does it matter for a sale?",
    answer:
      "After remediation, an independent party verifies the work: visual inspection, moisture readings back in normal range, and indoor spore counts compared against an outdoor baseline. The written clearance report is the document that proves the job was done — buyers, agents, and sometimes lenders or insurers rely on it. See our buying-home guide for how buyers use these documents.",
  },
];

export default function SellingHomePage() {
  const url = `${siteConfig.siteUrl}/guides/selling-home/`;
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
          { name: "Selling a Home With Mold" },
        ]}
      />
      <HubHero
        h1="Selling a Home With Mold (Ohio)"
        answer="Mold doesn't have to cost you the sale — but undocumented mold almost always costs you something at the negotiating table. This guide covers Ohio's disclosure rule (verified below), why deals die at inspection, and the remediate-vs-credit decision. Educational guidance, not legal advice."
      />

      {/* Ohio disclosure — VERIFIED (same claim as buying-home guide) */}
      <section className="block" aria-labelledby="ohio-disclosure">
        <div className="wrap">
          <span className="eyebrow reveal">Verified: Ohio</span>
          <h2 id="ohio-disclosure" className="reveal">
            Ohio's Mold Disclosure Rule for Sellers
          </h2>
          <div className="richtext">
            <p>
              Ohio's Residential Property Disclosure Law (ORC Section 5302.30)
              requires sellers of residential property to disclose known
              defects in writing on the state's disclosure form. As documented
              in our{" "}
              <Link href="/guides/buying-home/">buying-a-home guide</Link>,
              the form asks water-intrusion questions and this question
              directly:
            </p>
            <blockquote className="speakable">
              "Have you ever had the property inspected for mold by a qualified
              inspector?" — with a follow-up requiring details of the
              inspection report and any remediation undertaken.
            </blockquote>
            <p>
              Answering yes means describing what was found and what was done
              about it. Answering no when you knew of a problem is where legal
              liability lives. The practical takeaway for sellers:{" "}
              <strong>disclosure is mandatory either way — what you control is
              what the disclosure says.</strong> "Mold found, professionally
              remediated, clearance report attached" is a disclosed,
              neutralized fact. "Mold found at the buyer's inspection, no
              records of repair" is a negotiating weapon handed to the other
              side. (
              <a
                href="https://codes.ohio.gov/ohio-revised-code/section-5302.30"
                rel="noopener noreferrer"
              >
                ORC 5302.30
              </a>
              ;{" "}
              <a
                href="https://www.lisasiskoteam.com/blog/ohio-residential-property-disclosure-form-guide"
                rel="noopener noreferrer"
              >
                Ohio disclosure form guide
              </a>
              )
            </p>
          </div>
        </div>
      </section>

      {/* Pre-listing strategy */}
      <section className="block alt" aria-labelledby="prelisting">
        <div className="wrap">
          <span className="eyebrow reveal">The strategy · general guidance</span>
          <h2 id="prelisting" className="reveal">
            Pre-Listing Inspection Strategy: Find It Before They Do
          </h2>
          <div className="richtext">
            <p>
              The single best strategy for selling a home with mold is also the
              simplest: <strong>be the first to find it, document it, and fix
              it</strong>. The order matters:
            </p>
            <ol className="steps">
              <li className="reveal">
                <span className="step-n" aria-hidden="true">
                  1
                </span>
                <div>
                  <strong>Inspect before you list.</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    Get a qualified mold inspection of the usual hiding spots —
                    attic, basement, crawl space, bathrooms, HVAC — before the
                    home hits the market. Finding the problem on your schedule
                    is always cheaper than finding it on the buyer's.
                  </p>
                </div>
              </li>
              <li className="reveal">
                <span className="step-n" aria-hidden="true">
                  2
                </span>
                <div>
                  <strong>Get a written remediation scope with a fixed price.</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    A qualified remediator documents areas, methods, and price
                    in writing. See our{" "}
                    <Link href="/guides/proper-scope/">
                      proper scope-of-work guide
                    </Link>{" "}
                    for what that document must include. This number is your
                    negotiating anchor for everything that follows.
                  </p>
                </div>
              </li>
              <li className="reveal">
                <span className="step-n" aria-hidden="true">
                  3
                </span>
                <div>
                  <strong>Remediate, then get clearance testing.</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    Complete the work and have an independent party verify it —
                    visual inspection, moisture readings normal, spore counts
                    against an outdoor baseline. Keep the clearance report with
                    your closing documents.
                  </p>
                </div>
              </li>
              <li className="reveal">
                <span className="step-n" aria-hidden="true">
                  4
                </span>
                <div>
                  <strong>Disclose with the documentation.</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    On Ohio's disclosure form, you answer the mold-inspection
                    question honestly — and attach the inspection report,
                    remediation invoice, and clearance report. The disclosure
                    that kills deals is the surprise one; the disclosure with
                    proof of resolution is a non-event.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Why deals die */}
      <section className="block" aria-labelledby="deals-die">
        <div className="wrap">
          <span className="eyebrow reveal">The failure pattern · general guidance</span>
          <h2 id="deals-die" className="reveal">
            Why Deals Die at Inspection — and How to Prevent It
          </h2>
          <div className="richtext">
            <p>
              Deals rarely die because mold exists. They die because of what
              <em> unknown</em> mold creates: <strong>fear, delay, and an
              information gap the buyer fills with the worst case.</strong> The
              sequence is predictable — the inspector notes "visible mold,
              recommend specialist evaluation," the buyer panics, the agent asks
              for a credit, nobody has a real number, and the negotiation
              stalls or collapses.
            </p>
            <p>
              Prevention has three layers, all cheap compared to a dead deal:
            </p>
            <ul>
              <li>
                <strong>Documentation beats discovery.</strong> A seller who
                hands over a written scope, a fixed quote, and a clearance
                report removes the unknowns that breed worst-case thinking.
              </li>
              <li>
                <strong>Fix the moisture source visibly.</strong> Buyers' fear
                spikes when they suspect the mold will return. Documenting that
                the roof, gutter, or plumbing issue feeding it was repaired —
                with the receipt — closes the loop.
              </li>
              <li>
                <strong>Never hide it.</strong> In Ohio, concealment is both a
                legal exposure and a deal-killer: when the buyer's inspector
                finds what the seller didn't mention, trust evaporates and the
                negotiation gets adversarial. Buyers walk from mold they find,
                not mold you disclose.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Remediate vs credit */}
      <section className="block alt" aria-labelledby="remediate-vs-credit">
        <div className="wrap">
          <span className="eyebrow reveal">The framing decision · general guidance</span>
          <h2 id="remediate-vs-credit" className="reveal">
            Remediate Before Listing vs. Credit to the Buyer
          </h2>
          <div className="richtext">
            <p>
              There are two honest ways to handle mold in a sale. Neither is
              automatically wrong — but one usually wins on price:
            </p>
            <ul>
              <li>
                <strong>Remediate before listing (usually better).</strong> The
                problem is solved, documented, and disclosed with proof. The
                listing attracts buyers without a mold discount baked in, and
                the inspection finds nothing to argue about. Best when the
                scope is clear and the work is affordable.
              </li>
              <li>
                <strong>Credit to the buyer (workable, but discounted).</strong>{" "}
                The buyer gets a closing credit to handle the job after
                possession. The catch: buyers consistently overestimate
                remediation costs and discount the offer by more than the job
                would actually cost — plus they may pick a cheap, incomplete
                fix. If you offer a credit, base it on a real written quote, not
                a guess, so the negotiation stays anchored.
              </li>
            </ul>
            <p>
              <strong>The rule that covers both:</strong> never negotiate mold
              without a real number. Get the written scope and fixed quote
              first — it's the cheapest document you'll produce in the whole
              sale, and it's the one that keeps the negotiation about the fix
              instead of about the fear.
            </p>
          </div>
        </div>
      </section>

      <Faq items={FAQS} heading="Selling with Mold: Quick Answers" />

      <CtaBand
        title="Selling a home with a mold flag?"
        sub="Get a written scope and fixed quote before you list — free inspection, documented findings, clearance testing available."
      />
    </>
  );
}
