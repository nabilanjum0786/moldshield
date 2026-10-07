import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, services } from "@/lib/site-config";
import { CtaCard } from "@/components/content";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HubHero } from "@/components/hub";
import { Icon } from "@/components/icons";
import { JsonLd, howToSchema, speakableSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Our Mold Remediation Process | ${siteConfig.brandName}`,
  description:
    "How certified mold remediation works: inspection, containment, removal, HEPA treatment, moisture repair, and verification. Photo-documented at every step.",
  alternates: { canonical: `${siteConfig.siteUrl}/process/` },
};

const STEPS = [
  {
    name: "Inspection and moisture mapping",
    text: "A certified inspector examines the affected areas with moisture meters and thermal imaging, maps every colony, and identifies the moisture source feeding it. You receive a written findings report with photos before any work begins — and a fixed quote.",
  },
  {
    name: "Containment",
    text: "The work zone is sealed with polyethylene barriers and placed under negative air pressure. Spores cannot migrate into your living space during remediation — this is the step that separates professionals from handymen with bleach.",
  },
  {
    name: "Removal",
    text: "Contaminated porous materials (insulation, drywall, carpet) are removed and bagged for disposal. Non-porous surfaces (joists, sheathing, concrete) are HEPA-vacuumed and mechanically cleaned down to the substrate.",
  },
  {
    name: "HEPA treatment",
    text: "Every surface in the work zone gets HEPA-filtered air scrubbing and antimicrobial treatment. Air scrubbers run throughout the job and after, capturing airborne spores down to 0.3 microns.",
  },
  {
    name: "Moisture-source repair",
    text: "The cause gets fixed — bath vents rerouted outside, roof leaks flagged for repair, drainage corrected, ventilation balanced, dehumidifiers installed. Mold without a fixed cause always returns; this step is why ours doesn't.",
  },
  {
    name: "Verification",
    text: "Post-remediation verification: visual inspection, moisture readings back in normal range, and photo documentation of every stage. You get the full report — proof of what was found and fixed.",
  },
];

export default function ProcessPage() {
  const url = `${siteConfig.siteUrl}/process/`;
  return (
    <>
      <JsonLd
        data={[
          howToSchema({
            name: "Our 6-Step Mold Remediation Process",
            url,
            steps: STEPS,
          }),
          speakableSchema({ url, cssSelectors: [".speakable"] }),
        ]}
      />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Our Process" }]}
      />

      <HubHero
        h1="Our 6-Step Mold Remediation Process"
        answer={`Every ${siteConfig.brandName} job follows the same documented six-step protocol — inspection, containment, removal, HEPA treatment, moisture-source repair, and verification. You receive photo documentation at each stage, so you see exactly what was found and what was fixed, even if you never enter the work zone yourself.`}
      />

      <section className="block" aria-labelledby="steps-h">
        <div className="wrap">
          <span className="eyebrow reveal">How It Works</span>
          <h2 id="steps-h" className="reveal">
            From First Call to Verified Clean
          </h2>
          <div className="richtext" style={{ marginTop: 8 }}>
            <ol className="steps">
              {STEPS.map((s, i) => (
                <li key={s.name} className="reveal">
                  <span className="step-n" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <strong>{s.name}</strong>
                    <p style={{ margin: "4px 0 0" }}>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="block alt" aria-labelledby="applies-h">
        <div className="wrap">
          <span className="eyebrow reveal">Coverage</span>
          <h2 id="applies-h" className="reveal">
            What This Process Applies To
          </h2>
          <div className="grid cols-2" style={{ marginTop: 24 }}>
            {services.map((s, i) => (
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

      <div style={{ marginTop: 8 }}>
        <CtaCard
          title="See the Process in Action — Free Inspection"
          body="A certified inspector walks your home, shows you exactly what's happening, and leaves a written plan. Free, no obligation."
        />
      </div>
    </>
  );
}
