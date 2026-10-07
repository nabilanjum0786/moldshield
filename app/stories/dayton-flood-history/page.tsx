import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HubHero } from "@/components/hub";
import { Faq } from "@/components/content";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd, faqPageSchema, speakableSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Why Dayton Basements Flood: From the 1913 Flood to Today | ${siteConfig.brandName}`,
  description:
    "The 1913 Great Dayton Flood, the Miami Conservancy District it created, and why Dayton basements still flood — and grow mold — despite the best flood-control system in the country.",
  alternates: { canonical: `${siteConfig.siteUrl}/stories/dayton-flood-history/` },
};

const FAQS = [
  {
    question: "What was the 1913 Dayton flood?",
    answer:
      "The Great Dayton Flood of March 21–26, 1913 was Ohio's greatest natural disaster: the Great Miami River flooded after 8–11 inches of rain fell in three days on saturated soil, downtown Dayton sat under up to 20 feet of water, an estimated 360 people died, and damage exceeded $100 million in 1913 dollars. Sources: Wikipedia's Great Dayton Flood article and the Miami Conservancy District's own history.",
  },
  {
    question: "What is the Miami Conservancy District?",
    answer:
      "Created by Ohio's Conservancy Act (signed March 17, 1914; the District itself was officially formed in June 1915), the MCD built a flood-protection system of five dry dams, 43 miles of levees, and channel improvements between 1918 and 1922 for over $32 million. It has protected Dayton from a repeat of 1913 more than 1,500 times. It handles river flooding — not the localized flash floods and stormwater failures that still fill Dayton basements.",
  },
  {
    question: "Why do Dayton basements still flood if the flood-control system works?",
    answer:
      "The MCD's dams and levees protect against Great Miami River flooding. Modern basement flooding comes from elsewhere: intense cloudburst rain that overwhelms storm drains, sewer backups, sump pump failures during power outages, and groundwater pressure on foundations. The September 2026 Dayton flash flood — up to 6 inches of rain in hours, per weather.com — flooded basements the river system was never designed to prevent. Sources: weather.com, Sept 2026.",
  },
  {
    question: "My basement flooded. How fast does mold become a risk?",
    answer:
      "EPA guidance says mold can germinate within 24–48 hours on wet materials. For a flooded basement: remove standing water, run dehumidifiers and fans, and get porous materials that stayed wet drying or removed within that window. Our free flood planner tool walks through the first 48 hours, and our basement mold removal page covers the remediation side.",
  },
];

export default function DaytonFloodHistoryPage() {
  const url = `${siteConfig.siteUrl}/stories/dayton-flood-history/`;
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
          { name: "Stories", href: "/stories/" },
          { name: "Why Dayton Basements Flood" },
        ]}
      />
      <HubHero
        h1="Why Dayton Basements Flood: From the 1913 Flood to Today"
        answer="Dayton built the finest flood-control system in America after 1913 — and its basements still flood. The history explains the paradox: the system tamed the river, but modern flooding comes from the sky, the sewers, and the soil around your foundation. Sources verified below."
      />

      {/* 1913 — VERIFIED */}
      <section className="block" aria-labelledby="flood-1913">
        <div className="wrap">
          <span className="eyebrow reveal">Verified · March 1913</span>
          <h2 id="flood-1913" className="reveal">
            The Great Dayton Flood: March 21–26, 1913
          </h2>
          <div className="richtext">
            <p>
              In late March 1913, a series of severe winter rainstorms stalled
              over the Midwest. Within three days, 8–11 inches of rain fell
              across the Great Miami River watershed on already saturated
              soil — more than 90% ran off. The existing levees failed, and
              downtown Dayton flooded up to 20 feet deep. An estimated 360
              people died, and damage topped $100 million in 1913 dollars.
            </p>
            <p>
              It remains the greatest natural disaster in Ohio history, and the
              volume of water that passed through the river channel during the
              storm equaled the monthly flow over Niagara Falls. (
              <a
                href="https://en.wikipedia.org/wiki/Great_Dayton_Flood"
                rel="noopener noreferrer"
              >
                Wikipedia: Great Dayton Flood
              </a>
              )
            </p>
          </div>
        </div>
      </section>

      {/* MCD — VERIFIED */}
      <section className="block alt" aria-labelledby="mcd">
        <div className="wrap">
          <span className="eyebrow reveal">Verified · 1914–1922</span>
          <h2 id="mcd" className="reveal">
            The Answer: The Miami Conservancy District
          </h2>
          <div className="richtext">
            <p>
              Dayton's response to the flood was one of the great engineering
              stories in American history. The Ohio General Assembly passed the
              Conservancy Act — signed March 17, 1914 — enabling conservancy
              districts with taxing power. The Miami Conservancy District was
              officially created in June 1915, and under chief engineer Arthur
              Ernest Morgan it built a flood-protection system of five dry
              dams, 43 miles of levees, and river-channel improvements between
              1918 and 1922, at a cost exceeding $32 million.
            </p>
            <p>
              The system worked — spectacularly. Since completion, it has
              protected the Dayton area from flooding more than 1,500 times,
              and no flood as severe as 1913 has ever recurred. The Ohio model
              was later copied by Indiana, New Mexico, Colorado, and others. (
              <a
                href="https://www.mcdwater.org/about-mcd/the-history-of-mcd"
                rel="noopener noreferrer"
              >
                Miami Conservancy District: official history
              </a>
              ;{" "}
              <a
                href="https://en.wikipedia.org/wiki/Great_Flood_of_1913"
                rel="noopener noreferrer"
              >
                Wikipedia: Great Flood of 1913
              </a>
              )
            </p>
          </div>
        </div>
      </section>

      {/* Why it still floods — sourced + general building science */}
      <section className="block" aria-labelledby="still-floods">
        <div className="wrap">
          <span className="eyebrow reveal">
            The paradox · sourced + building science
          </span>
          <h2 id="still-floods" className="reveal">
            So Why Do Dayton Basements Still Flood?
          </h2>
          <div className="richtext">
            <p>
              Here's the honest answer: <strong>the MCD protects against river
              flooding, and modern basement flooding isn't river
              flooding.</strong> The five dry dams control the Great Miami
              River and its tributaries. They do nothing about:
            </p>
            <ul>
              <li>
                <strong>Cloudburst flash flooding.</strong> In September 2026,
                parts of Dayton saw up to 6 inches of rain in hours — flash
                flooding shattered a basement window and sent water rushing in.
                (
                <a
                  href="https://weather.com/2026/09/23/news/weather/video/dayton-ohio-basement-flood-window-breaks"
                  rel="noopener noreferrer"
                >
                  weather.com, Sept 24, 2026
                </a>
                ) In May 2026, Dayton recorded 6.73 inches of rain in days
                against a typical May total of about 4 inches.
              </li>
              <li>
                <strong>Sewer backups.</strong> When storm sewers fill faster
                than they drain, water comes up through floor drains — the
                river system can't help.
              </li>
              <li>
                <strong>Sump pump failures.</strong> Power goes out in the
                storm that causes the flooding; the pump that needed power most
                sits dead. General building science, not a Dayton quirk.
              </li>
              <li>
                <strong>Groundwater pressure.</strong> Saturated soil presses
                water through foundation cracks, cove joints, and porous
                concrete — the most common basement mold engine there is.
              </li>
            </ul>
            <p>
              The result: Dayton's river can't flood your basement anymore, but
              Dayton's weather still can. And every one of these events feeds
              mold — the EPA's 24–48 hour rule starts ticking the moment water
              touches drywall, carpet, or insulation.
            </p>
          </div>
        </div>
      </section>

      {/* Mold tie-in + CTAs */}
      <section className="block alt" aria-labelledby="basement-mold">
        <div className="wrap">
          <span className="eyebrow reveal">What this means for your home</span>
          <h2 id="basement-mold" className="reveal">
            What a Flooded Basement Means for Mold
          </h2>
          <div className="richtext">
            <p className="speakable">
              A basement flood is a mold project with a 48-hour deadline. The
              MCD's dams hold back the river; nothing holds back groundwater
              pressure or a backed-up floor drain except preparation — sump
              pumps with battery backup, sealed foundation cracks, and
              humidity control. If your basement has flooded, run the free{" "}
              <Link href="/tools/flood-planner/">
                14-day flood action planner
              </Link>{" "}
              to work the critical first 48 hours, then see our{" "}
              <Link href="/services/basement-mold-removal/">
                basement mold removal page
              </Link>{" "}
              for how remediation is scoped when water came from below instead
              of above.
            </p>
            <p>
              This story is Dayton-specific — the flood history, the
              Conservancy District, and the Miami Valley weather patterns that
              still fill basements today. The engineering triumph of 1922
              bought Dayton a century of river safety. It can't buy the 48
              hours after a flash flood. That's on the homeowner — and the
              planner link above is where to start.
            </p>
          </div>
        </div>
      </section>

      <Faq items={FAQS} heading="Dayton Flood History: Quick Answers" />

      <CtaBand
        title="Dayton basement flooded recently?"
        sub="Free inspection with documented findings — we'll check where the water came in and what's growing because of it."
      />
    </>
  );
}
