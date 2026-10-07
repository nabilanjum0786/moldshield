import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HubHero } from "@/components/hub";
import { Faq } from "@/components/content";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd, faqPageSchema, speakableSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Mold Playbook for Property Managers: Intake, Documentation, Vendors | ${siteConfig.brandName}`,
  description:
    "A property manager's mold playbook: tenant complaint intake protocol, documentation standards, multi-unit moisture patterns, vendor vetting, and Ohio landlord obligations.",
  alternates: { canonical: `${siteConfig.siteUrl}/guides/property-managers/` },
};

const FAQS = [
  {
    question: "What should a property manager do first when a tenant reports mold?",
    answer:
      "Log the complaint in writing with the date, take the tenant's description, and schedule a unit visit within days — not weeks. Photograph and moisture-test the area, identify the moisture source, and notify the owner. Fast, documented response protects the tenant, the property, and the manager. Our landlord letter generator gives tenants a formal written-notice tool that makes the paper trail cleaner for everyone.",
  },
  {
    question: "Can a property manager be liable for ignoring mold complaints?",
    answer:
      "Generally, yes — that's why documentation matters. Under Ohio law (ORC 5321.04), landlords must comply with applicable health and safety codes and make all repairs reasonably necessary to keep the premises fit and habitable. A documented history of ignored complaints is the evidence tenants use in disputes. This is general information, not legal advice — consult an attorney for your portfolio.",
  },
  {
    question: "How do you vet a mold remediation vendor for rental properties?",
    answer:
      "Demand a written scope of work with fixed pricing before authorizing any job: areas to be worked, materials removed vs. cleaned, method per area, containment plan, and post-remediation verification. Compare it against our proper scope-of-work guide and interview vendors with the questions in our interview kit. Never authorize work on a phone quote alone — at portfolio scale, the phone-quote jobs are where budgets die.",
  },
  {
    question: "Should the tenant or the landlord handle small mold in a rental?",
    answer:
      "Responsibility follows the cause, not the size. Mold caused by a building defect — roof or plumbing leaks, HVAC condensation, inadequate ventilation — is a landlord responsibility under Ohio law. Mold caused by tenant behavior (never running the bath fan, drying laundry indoors without ventilation) is a different conversation, but document the cause either way. When in doubt, treat the moisture source as the owner's problem to investigate.",
  },
];

export default function PropertyManagersPage() {
  const url = `${siteConfig.siteUrl}/guides/property-managers/`;
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
          { name: "Mold Playbook for Property Managers" },
        ]}
      />
      <HubHero
        h1="Mold Playbook for Property Managers"
        answer="For property managers, mold is a process problem: intake, document, diagnose the moisture source, fix it with a vetted vendor, verify. This playbook covers the full cycle — including your Ohio legal obligations (general information, not legal advice)."
      />

      {/* Intake protocol */}
      <section className="block" aria-labelledby="intake">
        <div className="wrap">
          <span className="eyebrow reveal">Step 1 · general guidance</span>
          <h2 id="intake" className="reveal">
            Tenant Complaint Intake Protocol
          </h2>
          <div className="richtext">
            <p>
              Every mold complaint should enter a written intake process the day
              it arrives. Verbal reports that never get logged are how managers
              end up in "you never told me" disputes. The protocol:
            </p>
            <ol className="steps">
              <li className="reveal">
                <span className="step-n" aria-hidden="true">
                  1
                </span>
                <div>
                  <strong>Log it in writing immediately.</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    Date, unit, tenant name, the tenant's own description, and
                    how the report arrived (call, email, portal). A shared
                    log or ticketing system beats a sticky note — and if the
                    tenant sent written notice, keep their original.
                  </p>
                </div>
              </li>
              <li className="reveal">
                <span className="step-n" aria-hidden="true">
                  2
                </span>
                <div>
                  <strong>Point the tenant at formal written notice.</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    Our free{" "}
                    <Link href="/tools/landlord-letter/">
                      landlord letter generator
                    </Link>{" "}
                    gives tenants a structured written complaint referencing
                    Ohio law — which, counterintuitively, helps you: a formal
                    written record starts the clock cleanly for both sides.
                  </p>
                </div>
              </li>
              <li className="reveal">
                <span className="step-n" aria-hidden="true">
                  3
                </span>
                <div>
                  <strong>Visit the unit within days.</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    Photograph the area, take moisture readings if you have a
                    meter, and ask about leaks, condensation, and ventilation
                    habits. You're scoping, not diagnosing — your job is to
                    determine whether this needs a vendor or a conversation.
                  </p>
                </div>
              </li>
              <li className="reveal">
                <span className="step-n" aria-hidden="true">
                  4
                </span>
                <div>
                  <strong>Notify the owner and propose the fix.</strong>
                  <p style={{ margin: "4px 0 0" }}>
                    Owners hate surprises more than they hate invoices. Send a
                    written summary with photos, the likely moisture source, and
                    a proposed action with a cost range — not just "there's mold
                    in unit 4."
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Documentation standards */}
      <section className="block alt" aria-labelledby="documentation">
        <div className="wrap">
          <span className="eyebrow reveal">Step 2 · general guidance</span>
          <h2 id="documentation" className="reveal">
            Documentation Standards: The Paper Trail Is the Product
          </h2>
          <div className="richtext">
            <p>
              In every tenant dispute, health complaint, and insurance claim,
              the winner is the party with the documents. For each mold case,
              keep one file containing:
            </p>
            <ul>
              <li>The tenant's original written complaint (date-stamped).</li>
              <li>Your unit-visit photos and notes, with moisture readings.</li>
              <li>
                The vendor's written scope of work and fixed quote — not a
                phone estimate.
              </li>
              <li>The remediation invoice and any post-remediation clearance.</li>
              <li>
                Evidence the moisture source was repaired (plumber or roofer
                invoice), not just the mold cleaned.
              </li>
              <li>
                Your written confirmation to the tenant that the issue was
                resolved.
              </li>
            </ul>
            <p>
              This file is worth more than the remediation itself: it resolves
              liability questions, supports insurance claims, and — when the
              owner eventually sells the building — converts "there was mold in
              the rentals" into documented professional handling.
            </p>
          </div>
        </div>
      </section>

      {/* Multi-unit moisture patterns — general building science */}
      <section className="block" aria-labelledby="multi-unit">
        <div className="wrap">
          <span className="eyebrow reveal">
            Step 3 · general building science
          </span>
          <h2 id="multi-unit" className="reveal">
            Multi-Unit Moisture Patterns Worth Knowing
          </h2>
          <div className="richtext">
            <p>
              Single-family mold is usually one leak in one place. Multi-unit
              buildings have patterns — and knowing them helps you triage
              faster:
            </p>
            <ul>
              <li>
                <strong>Top-floor units under flat or low-slope roofs:</strong>{" "}
                roof leaks show up as ceiling mold on the top floor first. If
                multiple top units report mold, suspect the roof, not the
                tenants.
              </li>
              <li>
                <strong>Stacked bathrooms and kitchens:</strong> plumbing runs
                in shared walls mean a leak in unit 6B shows up as mold in 5B.
                When the complaint is below the source, test the plumbing
                above.
              </li>
              <li>
                <strong>Shared HVAC:</strong> condensation and drain-line
                problems in a central system affect every unit on the run. Musty
                supply vents across multiple units are a system problem, not a
                unit problem.
              </li>
              <li>
                <strong>Slab-on-grade ground floors:</strong> moisture wicking
                up through the slab causes recurring floor-level mold that
                cleaning never permanently fixes — the fix is below, not on
                the surface.
              </li>
              <li>
                <strong>Stairwell and common-wall humidity:</strong> inadequate
                ventilation in shared spaces pushes humidity into units. Bath
                fans that vent into attics instead of outside are a classic.
              </li>
            </ul>
            <p>
              This is general building science, not a diagnosis of your
              building. The pattern recognition just tells you where to look
              first when the second complaint lands.
            </p>
          </div>
        </div>
      </section>

      {/* Vendor vetting */}
      <section className="block alt" aria-labelledby="vendor-vetting">
        <div className="wrap">
          <span className="eyebrow reveal">Step 4 · general guidance</span>
          <h2 id="vendor-vetting" className="reveal">
            Vendor Vetting at Portfolio Scale
          </h2>
          <div className="richtext">
            <p>
              At portfolio scale, your biggest cost isn't the remediation —
              it's authorizing the wrong job. Before you approve any vendor:
            </p>
            <ul>
              <li>
                <strong>Demand a written scope with fixed pricing.</strong>{" "}
                Compare it against our{" "}
                <Link href="/guides/proper-scope/">proper scope-of-work guide</Link>{" "}
                — areas to be worked, materials removed vs. cleaned, method per
                area, containment plan, and post-remediation verification. No
                scope, no authorization.
              </li>
              <li>
                <strong>Interview with the kit.</strong> Run vendors through the
                questions in our{" "}
                <Link href="/tools/interview-kit/">contractor interview kit</Link>{" "}
                — licensing, insurance, containment practice, how they handle
                moisture-source repair they don't do themselves.
              </li>
              <li>
                <strong>Separate the roles.</strong> The inspector who finds the
                mold should ideally not be the contractor paid to remove it —
                especially when you're approving spend on someone else's
                building.
              </li>
              <li>
                <strong>Keep two or three vetted vendors.</strong> One vendor is
                a single point of failure and a pricing monopoly. Competitive
                scopes on every job above a threshold you set.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Ohio obligations — VERIFIED (reuse verified claim from letter generator) */}
      <section className="block" aria-labelledby="ohio-obligations">
        <div className="wrap">
          <span className="eyebrow reveal">Verified: Ohio law</span>
          <h2 id="ohio-obligations" className="reveal">
            Ohio Landlord Obligations (General Reference)
          </h2>
          <div className="richtext">
            <p>
              Under Ohio Revised Code §5321.04(A) — verified in our{" "}
              <Link href="/tools/landlord-letter/">
                landlord letter generator
              </Link>{" "}
              against the official text — a landlord who is a party to a rental
              agreement must (1) comply with all applicable building, housing,
              health, and safety codes that materially affect health and
              safety, and (2) "make all repairs and do whatever is reasonably
              necessary to put and keep the premises in a fit and habitable
              condition." A mold condition caused by a building defect, plumbing
              failure, or another issue within the landlord's control falls
              under this duty. (
              <a
                href="https://codes.ohio.gov/ohio-revised-code/section-5321.04"
                rel="noopener noreferrer"
              >
                ORC 5321.04
              </a>
              )
            </p>
            <p>
              Practical meaning for managers: when the moisture source is a
              building issue, the repair obligation is the landlord's — and the
              intake, documentation, and vendor-vetting steps above are how you
              demonstrate it was handled diligently. This is general
              information about the statute, not legal advice for your
              portfolio; consult an attorney for disputes.
            </p>
          </div>
        </div>
      </section>

      <Faq items={FAQS} heading="Property Managers: Quick Answers" />

      <CtaBand
        title="Managing mold across multiple units?"
        sub="Free inspections with written scopes and fixed pricing — the documentation your owners and your files need."
      />
    </>
  );
}
