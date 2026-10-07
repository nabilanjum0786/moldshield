import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HubHero } from "@/components/hub";
import { Faq } from "@/components/content";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd, faqPageSchema, speakableSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Mold Remediation Licensing by State: Who Requires a License | ${siteConfig.brandName}`,
  description:
    "Which states require a mold remediation license — Texas, Florida, Louisiana, New York verified, plus where Ohio and Maryland stand — and how to verify any contractor.",
  alternates: { canonical: `${siteConfig.siteUrl}/guides/state-licensing/` },
};

const FAQS = [
  {
    question: "Is mold remediation licensed in my state?",
    answer:
      "Only a few states license mold work specifically. Verified: Texas, Florida, Louisiana, and New York all require state licenses. Ohio and Maryland currently have no dedicated state mold license. If your state isn't on this page, we haven't verified it yet — we won't guess. Check your state labor or consumer-protection agency directly.",
  },
  {
    question: "What's the difference between a mold license and a certification?",
    answer:
      "A license is issued by a state government and is legally required to do the work in that state. A certification (like IICRC mold remediation certification) is issued by an industry body and proves training — valuable everywhere, but not a legal requirement. In states with no license, certifications and insurance are your main quality signals.",
  },
  {
    question: "Can the same company inspect and remediate my mold?",
    answer:
      "In Texas and New York, no — the law requires the assessor and the remediator to be separate, so the party diagnosing the problem isn't the one profiting from fixing it. Everywhere else it's legal, but it's still a conflict of interest. For real-estate transactions, use an independent assessor regardless of state.",
  },
  {
    question: "How do I check a mold contractor's license?",
    answer:
      "Use your state's official license lookup portal — never the contractor's own website. Texas: TDLR License Search. Florida: DBPR license lookup. New York: NYSDOL licensed mold contractor search. Louisiana: LSLBC license verification. Confirm the license is active, matches the company name on your contract, and covers the work you're hiring for.",
  },
];

export default function StateLicensingPage() {
  const url = `${siteConfig.siteUrl}/guides/state-licensing/`;
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
          { name: "State Mold Licensing" },
        ]}
      />
      <HubHero
        h1="Mold Licensing, State by State"
        answer="Only a handful of states license mold work specifically — and in most states, anyone with a van can call themselves a mold remediator. Every row below is verified against a source. States we haven't verified stay off this page rather than risk a wrong claim."
      />

      <section className="block" aria-labelledby="table">
        <div className="wrap">
          <span className="eyebrow reveal">Verified rows only</span>
          <h2 id="table" className="reveal">
            Which States Require a Mold License?
          </h2>
          <div className="richtext">
            <figure>
              <figcaption>
                Verified as of October 2026. Laws change — confirm with the
                regulator before hiring.
              </figcaption>
              <table>
                <thead>
                  <tr>
                    <th>State</th>
                    <th>State mold license required?</th>
                    <th>Regulator</th>
                    <th>Key detail</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Texas</strong>
                    </td>
                    <td>Yes</td>
                    <td>
                      Texas Dept. of Licensing and Regulation (TDLR) — Texas
                      Mold Assessment and Remediation Rules (TMARR)
                    </td>
                    <td>
                      Separate licenses for assessment and remediation;
                      licensing generally applies at 25+ contiguous sq ft. The
                      same company may not assess and remediate the same
                      project. Verify at TDLR License Search. (
                      <a
                        href="https://www.texasattorneygeneral.gov/consumer-protection/home-real-estate-and-travel/mold-remediation"
                        rel="noopener noreferrer"
                      >
                        Texas AG: Mold Remediation
                      </a>
                      ;{" "}
                      <a
                        href="https://www.restoreadvisor.com/mold-remediation/dallas"
                        rel="noopener noreferrer"
                      >
                        TMARR threshold detail
                      </a>
                      )
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Florida</strong>
                    </td>
                    <td>Yes</td>
                    <td>
                      Dept. of Business and Professional Regulation (DBPR) —
                      Florida Statutes Ch. 468, Part XVI
                    </td>
                    <td>
                      Separate Mold Assessor and Mold Remediator licenses;
                      applies to work over 10 sq ft. Unlicensed practice is
                      enforceable since 2011. (
                      <a
                        href="https://www.csklegal.com/newsroom/publications/florida-legislature-cracks-down-on-unlicensed-practice-of-mold-assessors-and-mold-remediators"
                        rel="noopener noreferrer"
                      >
                        Cole, Scott &amp; Kissane: FL mold licensure
                      </a>
                      )
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Louisiana</strong>
                    </td>
                    <td>Yes</td>
                    <td>
                      Louisiana State Licensing Board for Contractors (LSLBC)
                    </td>
                    <td>
                      Mold remediation contractor license required when the
                      project value exceeds $7,500; qualifying party needs 24
                      hours of board-approved training. (
                      <a
                        href="https://www.moldcareer.com/resources/state-mold-legislation/louisiana/"
                        rel="noopener noreferrer"
                      >
                        MICRO: Louisiana requirements
                      </a>
                      ;{" "}
                      <a
                        href="https://lslbc.gov/faq/"
                        rel="noopener noreferrer"
                      >
                        LSLBC FAQ
                      </a>
                      )
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>New York</strong>
                    </td>
                    <td>Yes</td>
                    <td>
                      NY Dept. of Labor (NYSDOL) — Article 32 of the Labor Law
                    </td>
                    <td>
                      Mold Assessor, Mold Remediation Contractor, and Mold
                      Abatement Worker licenses; applies to areas over 10 sq
                      ft. Strict separation between the assessing and
                      remediating companies. (
                      <a
                        href="https://legalclarity.org/new-york-state-mold-law-article-32-compliance-guide/"
                        rel="noopener noreferrer"
                      >
                        LegalClarity: NY Article 32 guide
                      </a>
                      )
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Maryland</strong>
                    </td>
                    <td>
                      No — not currently
                    </td>
                    <td>
                      Maryland Home Improvement Commission (MHIC) — general
                      home-improvement licensing
                    </td>
                    <td>
                      Maryland passed a Mold Remediation Services Act in 2008,
                      but that subtitle was terminated on July 1, 2019 — no
                      additional mold license is required beyond MHIC
                      licensing, per the Commission's own FAQ. (
                      <a
                        href="https://www.dllr.state.md.us/license/mhic/mhicfaqlic.shtml"
                        rel="noopener noreferrer"
                      >
                        MHIC Licensing FAQ
                      </a>
                      )
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Ohio</strong> (our launch state)
                    </td>
                    <td>No dedicated state mold license</td>
                    <td>—</td>
                    <td>
                      Ohio has no dedicated state mold remediation license;
                      remediation and containment work alone is not state-licensed
                      (structural or contracting work may need a contractor
                      license). In Ohio, certifications, insurance, and a
                      written scope are your quality signals. (
                      <a
                        href="https://iriedu.com/mold-removal-license-requirements/mold-removal-license-requirements-ohio-oh.html"
                        rel="noopener noreferrer"
                      >
                        Ohio license requirements overview
                      </a>
                      )
                    </td>
                  </tr>
                </tbody>
              </table>
            </figure>
            <p>
              <strong>Not listed?</strong> We have not verified your state yet,
              and we refuse to guess. The row above is the full verified list as
              of October 2026 — more states will be added only after
              verification against an official source.
            </p>
          </div>
        </div>
      </section>

      <section className="block alt" aria-labelledby="verify">
        <div className="wrap">
          <span className="eyebrow reveal">The checklist</span>
          <h2 id="verify" className="reveal">
            How to Verify Any Mold Contractor
          </h2>
          <div className="richtext">
            <p>
              In states with no license, and even in states with one, run every
              contractor through this list before you sign:
            </p>
            <ol className="steps">
              <li className="reveal">
                <span className="step-n" aria-hidden="true">
                  1
                </span>
                <div>
                  <strong>Check the license on the official portal.</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    Use the state regulator's own lookup (links above), not the
                    contractor's website. Confirm it's active, matches the
                    company name on your contract, and covers the work you're
                    hiring for.
                  </p>
                </div>
              </li>
              <li className="reveal">
                <span className="step-n" aria-hidden="true">
                  2
                </span>
                <div>
                  <strong>Confirm insurance.</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    General liability at minimum; in Florida, assessors must
                    also carry errors-and-omissions coverage. Ask for the
                    certificate — real companies hand it over.
                  </p>
                </div>
              </li>
              <li className="reveal">
                <span className="step-n" aria-hidden="true">
                  3
                </span>
                <div>
                  <strong>Separate diagnosis from repair.</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    Required by law in Texas and New York; wise everywhere
                    else. A company that diagnoses the problem shouldn't be the
                    only voice deciding how much repair you need — especially
                    for real-estate transactions, use an independent assessor.
                  </p>
                </div>
              </li>
              <li className="reveal">
                <span className="step-n" aria-hidden="true">
                  4
                </span>
                <div>
                  <strong>Demand a written scope.</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    Areas to be worked on, materials to be removed or cleaned,
                    method per area, timeline, price. Hold them to our{" "}
                    <Link href="/guides/proper-scope/">
                      proper scope-of-work template
                    </Link>{" "}
                    — anyone who won't put it in writing is telling you
                    something.
                  </p>
                </div>
              </li>
              <li className="reveal">
                <span className="step-n" aria-hidden="true">
                  5
                </span>
                <div>
                  <strong>Require independent clearance.</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    Post-remediation verification by someone other than the
                    crew that did the work: visual check, moisture readings, and
                    spore counts against an outdoor baseline, in writing.
                  </p>
                </div>
              </li>
              <li className="reveal">
                <span className="step-n" aria-hidden="true">
                  6
                </span>
                <div>
                  <strong>Watch for the red flags.</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    "Free inspection" that ends in a same-day remediation quote
                    (illegal in Texas), quotes with no written scope, pressure
                    to sign today, and prices far below everyone else's — Home
                    Advisor's 2026 data puts typical remediation at{" "}
                    <a
                      href="https://www.homeadvisor.com/cost/environmental-safety/remove-mold-and-toxic-materials/"
                      rel="noopener noreferrer"
                    >
                      $1,223–$3,757 nationally
                    </a>
                    .
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <Faq items={FAQS} heading="Licensing: Quick Answers" />

      <CtaBand
        title="Licensed, insured, and documented — or it doesn't happen"
        sub="That's how we operate in every state we serve. Free inspection, written scope, independent clearance. Check our work against this page."
      />
    </>
  );
}
