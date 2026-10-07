import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HubHero } from "@/components/hub";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/icons";
import { JsonLd, speakableSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Mold Guides: Myths, Home Types, Licensing, and More | ${siteConfig.brandName}`,
  description:
    "Sourced, no-nonsense guides: mold myths debunked, mold risk by home type, room-by-room inspection, buying a home with mold, state licensing, and what a proper remediation scope includes.",
  alternates: { canonical: `${siteConfig.siteUrl}/guides/` },
};

const GUIDES = [
  {
    slug: "mold-myths",
    name: "Mold Myths, Debunked",
    blurb:
      "Black mold panic, bleach, ozone machines, 'mold-resistant' paint — what the EPA and CDC actually say, with sources.",
  },
  {
    slug: "home-types",
    name: "Mold Risk by Home Type",
    blurb:
      "Why 1960s slab ranches, 1920s brick homes, and manufactured homes each grow mold differently — and what to check in each.",
  },
  {
    slug: "room-by-room",
    name: "Where Mold Hides: Room by Room",
    blurb:
      "Bathroom, window sills, HVAC vents, exterior-wall closets, under sinks: the cause, what to look for, and your first action in each spot.",
  },
  {
    slug: "buying-home",
    name: "Buying a Home with Mold",
    blurb:
      "How mold disclosure works (Ohio verified), what to do when an inspection finds mold, and how to negotiate remediation before closing.",
  },
  {
    slug: "state-licensing",
    name: "Mold Licensing, State by State",
    blurb:
      "Which states require a mold license (TX, FL, LA, NY verified), where Ohio and Maryland stand, and how to verify any contractor.",
  },
  {
    slug: "proper-scope",
    name: "What a Proper Mold Job Includes",
    blurb:
      "The 10-item scope-of-work template: containment, negative air, HEPA, clearance testing, documentation, warranty. Hold any contractor to this.",
  },
];

export default function GuidesIndexPage() {
  const url = `${siteConfig.siteUrl}/guides/`;
  return (
    <>
      <JsonLd data={speakableSchema({ url, cssSelectors: [".speakable"] })} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Guides" }]} />
      <HubHero
        h1="Mold Guides"
        answer="Sourced, plain-language guides for homeowners — every factual claim carries a source or is labeled as general guidance. No myths, no invented statistics."
      />
      <section className="block" aria-labelledby="guides-h">
        <div className="wrap">
          <h2 id="guides-h" className="reveal" style={{ marginBottom: 24 }}>
            All Guides
          </h2>
          <div className="grid cols-2">
            {GUIDES.map((g, i) => (
              <div
                key={g.slug}
                className="card reveal"
                {...(i % 2 > 0 ? { "data-delay": "1" } : {})}
              >
                <h3>{g.name}</h3>
                <p>{g.blurb}</p>
                <Link className="more" href={`/guides/${g.slug}/`}>
                  Read the guide <Icon name="arrow" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIX 3 angle wiring: quote fairness + renter tools, Dayton stories.
          Story pages are built by FIX 2 (app/stories/…) — paths must match. */}
      <section className="block alt" aria-labelledby="tools-stories-h">
        <div className="wrap">
          <span className="eyebrow reveal">Dayton, Start Here</span>
          <h2 id="tools-stories-h" className="reveal">
            Tools & Local Stories
          </h2>
          <div className="grid cols-2" style={{ marginTop: 26 }}>
            <div className="card reveal">
              <h3>Is That Mold Quote Fair?</h3>
              <p>
                Paste a remediation quote and check it for red flags: missing
                containment, no moisture-source fix, no clearance testing,
                flat pricing, pressure tactics.
              </p>
              <Link className="more" href="/tools/quote-checker/">
                Check a quote <Icon name="arrow" />
              </Link>
            </div>
            <div className="card reveal" data-delay="1">
              <h3>Ohio Renter? Make Your Landlord Fix the Mold</h3>
              <p>
                Generate a formal mold complaint letter citing Ohio Revised
                Code §5321.04. Free, printable, ready in 2 minutes.
              </p>
              <Link className="more" href="/tools/landlord-letter/">
                Generate the letter <Icon name="arrow" />
              </Link>
            </div>
            <div className="card reveal">
              <h3>
                The 2019 Tornadoes Are Still Growing Mold in Dayton Attics
              </h3>
              <p>
                Months after the 2019 Memorial Day tornadoes, Dayton
                homeowners were still discovering attic mold (Dayton Daily
                News, 2019). Why storm damage hides — and what to check now.
              </p>
              <Link className="more" href="/stories/tornado-mold-dayton/">
                Read the story <Icon name="arrow" />
              </Link>
            </div>
            <div className="card reveal" data-delay="1">
              <h3>
                Why Dayton Basements Flood: From the 1913 Flood to the Miami
                Conservancy District
              </h3>
              <p>
                After the 1913 Great Flood, Dayton invented modern flood
                control — but basements still flood. What the floodplain
                means for your home.
              </p>
              <Link className="more" href="/stories/dayton-flood-history/">
                Read the story <Icon name="arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Reading is good. Inspecting is better."
        sub="Free inspection, written scope, fixed price. We'll find the moisture and show you exactly what's happening."
      />
    </>
  );
}
