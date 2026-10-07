import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { CtaCard } from "@/components/content";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DisclosureNotice } from "@/components/DisclosureNotice";
import { HubHero } from "@/components/hub";
import { JsonLd, speakableSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.brandName}`,
  description:
    "Who we are: certified mold remediation specialists who publish real prices, fix moisture causes, and document every job with photos.",
  alternates: { canonical: `${siteConfig.siteUrl}/about/` },
};

const PRINCIPLES: [string, string][] = [
  [
    "Certified technicians, documented protocol",
    "Every job follows EPA and IICRC S520 remediation guidelines: containment under negative air, HEPA filtration, and post-remediation verification. No shortcuts, no bleach-and-paint cover-ups.",
  ],
  [
    "Real prices, published upfront",
    "Every service page carries genuine price ranges so you can budget before anyone visits. Your free inspection ends with a fixed written quote — the number doesn't move once work starts.",
  ],
  [
    "We fix the cause, not just the colony",
    "A remediation without moisture-source repair is a recurring subscription. We reroute vents, correct drainage, balance ventilation, and install dehumidification — then verify with moisture readings.",
  ],
  [
    "Photo proof of everything",
    "Before, during, and after — severity-rated photo reports. You see exactly what was found and what was fixed, even if you never enter the attic, crawl space, or basement yourself.",
  ],
];

export default function AboutPage() {
  const url = `${siteConfig.siteUrl}/about/`;
  return (
    <>
      <JsonLd
        data={[speakableSchema({ url, cssSelectors: [".speakable"] })]}
      />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "About Us" }]}
      />

      <HubHero
        h1={`About ${siteConfig.brandName}`}
        answer={`${siteConfig.brandName} is a mold inspection and remediation company built on a simple frustration: homeowners facing mold get vague quotes, scare tactics, and jobs that treat the symptom while the moisture source keeps feeding the problem. We do the opposite — published price ranges, photo-documented work, and every remediation paired with a fix for the cause.`}
      />

      <section className="block" aria-labelledby="how-h">
        <div className="wrap">
          <span className="eyebrow reveal">How We Work</span>
          <h2 id="how-h" className="reveal">
            Four Principles, Every Job
          </h2>
          <div className="grid cols-2" style={{ marginTop: 24 }}>
            {PRINCIPLES.map(([title, body], i) => (
              <div
                key={title}
                className="card reveal"
                {...(i % 2 > 0 ? { "data-delay": "1" } : {})}
              >
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block alt" aria-labelledby="wont-h">
        <div className="wrap">
          <span className="eyebrow reveal">Our Promise</span>
          <h2 id="wont-h" className="reveal">
            What We Won&apos;t Do
          </h2>
          <p className="lede reveal">
            We won&apos;t invent health claims to scare you into a bigger job —
            we cite what the EPA and CDC actually say. We won&apos;t recommend
            remediation when cleaning or a simple repair will do. And if your
            free inspection finds a clean home, we&apos;ll tell you so and
            leave. That honesty is the whole business model: most of our work
            comes from people who trust us because we once told them they
            didn&apos;t need us.
          </p>
        </div>
      </section>

      <DisclosureNotice variant="full" />

      <div style={{ marginTop: 8 }}>
        <CtaCard
          title="Meet Us the Easy Way: Free Inspection"
          body="A certified inspector, moisture mapping, written findings with photos. Free, no obligation — and we'll tell you honestly if your home is clean."
        />
      </div>
    </>
  );
}
