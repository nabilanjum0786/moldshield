import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HubHero } from "@/components/hub";
import { Faq } from "@/components/content";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd, faqPageSchema, speakableSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `The 2019 Tornadoes Are Still Growing Mold in Dayton Attics | ${siteConfig.brandName}`,
  description:
    "Months after the 2019 Memorial Day tornadoes, Dayton homeowners discovered mold in their attics — and insurance disputes kept repairs waiting. A Dayton story, sourced from local reporting.",
  alternates: { canonical: `${siteConfig.siteUrl}/stories/tornado-mold-dayton/` },
};

const FAQS = [
  {
    question: "Why did mold show up in Dayton attics months after the 2019 tornadoes?",
    answer:
      "The Memorial Day 2019 tornadoes damaged roofs across the Miami Valley. Many roofs were cracked, lifted, or punctured rather than destroyed outright — enough to let rain in slowly. That slow moisture, trapped in a dark attic, is ideal mold conditions. Residents like Bellbrook's Mindi Wynne told the Dayton Daily News months later that 'people are just now starting to realize we have all this mold in our attic.' Delayed discovery after storm damage is normal, not unusual.",
  },
  {
    question: "Did insurance disputes make the mold worse?",
    answer:
      "According to Dayton Daily News reporting via insurancenewsnet, yes — for some homeowners. Teresa Semons of Dayton fought nearly a year over tornado roof damage, and said 'I finally got the rest of the money to remediate the mold' only after the state overturned her insurer's position. The Ohio Department of Insurance received 47 complaints; the state sided with homeowners in 13. While repairs waited, moisture kept working — and mold kept growing.",
  },
  {
    question: "I have roof damage from a past storm. Should I check my attic now?",
    answer:
      "Yes — general guidance: after any significant roof damage, an attic check is worthwhile even years later. Look for dark staining on roof sheathing, musty smells, and damp insulation. Our attic mold removal service page and the mold emergency triage cover what to look for and when to call a professional.",
  },
];

export default function TornadoMoldDaytonPage() {
  const url = `${siteConfig.siteUrl}/stories/tornado-mold-dayton/`;
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
          { name: "The 2019 Tornadoes and Dayton Attic Mold" },
        ]}
      />
      <HubHero
        h1="The 2019 Tornadoes Are Still Growing Mold in Dayton Attics"
        answer="This is a Dayton story. After the Memorial Day 2019 tornadoes ripped through the Miami Valley, homeowners discovered mold growing in their attics months later — as insurance fights dragged on and damaged roofs kept letting rain in. Reported facts below, sourced to local journalism; brief excerpts quoted for research purposes."
      />

      {/* The discovery — sourced */}
      <section className="block" aria-labelledby="the-discovery">
        <div className="wrap">
          <span className="eyebrow reveal">Dayton-specific · sourced</span>
          <h2 id="the-discovery" className="reveal">
            "People Are Just Now Starting to Realize We Have All This Mold in
            Our Attic"
          </h2>
          <div className="richtext">
            <p>
              The tornado outbreak of Memorial Day 2019 damaged thousands of
              homes across Montgomery County and the surrounding Miami Valley.
              By November 2019, months after the storms, a delayed second wave
              of damage was surfacing. The Dayton Daily News reported that
              Bellbrook resident Mindi Wynne, whose home was tornado-damaged,
              said "people are just now starting to realize we have all this
              mold in our attic." The paper described the situation as a
              continuing aftershock: "The tornado crisis is over but the domino
              effect is continuing." (
              <a
                href="https://insurancenewsnet.com/oarticle/tracking-the-money-how-millions-in-tornado-assistance-is-being-spent"
                rel="noopener noreferrer"
              >
                Dayton Daily News via insurancenewsnet, Nov 2019
              </a>
              )
            </p>
            <p>
              The same investigation found at least 78 houses and condos in
              Montgomery County sitting vacant and deteriorating after the
              tornadoes — so-called "zombie properties" where moisture damage
              went unaddressed for months or longer. (
              <a
                href="https://insurancenewsnet.com/oarticle/zombie-properties-haunt-neighborhoods-after-tornadoes"
                rel="noopener noreferrer"
              >
                Dayton Daily News via insurancenewsnet, Dec 2019
              </a>
              )
            </p>
          </div>
        </div>
      </section>

      {/* Insurance delay — sourced */}
      <section className="block alt" aria-labelledby="insurance-delay">
        <div className="wrap">
          <span className="eyebrow reveal">Dayton-specific · sourced</span>
          <h2 id="insurance-delay" className="reveal">
            While Homeowners Fought Insurers, the Mold Kept Growing
          </h2>
          <div className="richtext">
            <p>
              Tornado roof damage is rarely clean — insurers and homeowners
              disagreed about what was storm damage and what wasn't, and while
              the arguments played out, damaged roofs kept leaking. The Dayton
              Daily News followed Teresa Semons of Dayton, who fought nearly a
              year over tornado roof damage. After the state overturned her
              insurer's position, she said: "I finally got the rest of the
              money to remediate the mold."
            </p>
            <p>
              The Ohio Department of Insurance received 47 complaints from
              tornado-damaged homeowners; the state sided with homeowners in 13
              cases. Every month a roof repair waited was a month of slow
              moisture feeding an attic that the homeowner couldn't see. (
              <a
                href="https://insurancenewsnet.com/oarticle/tornado-recovery-insurance-disputes-continue-to-slow-repairs-for-some-homeowners"
                rel="noopener noreferrer"
              >
                Dayton Daily News via insurancenewsnet, 2020
              </a>
              )
            </p>
            <p>
              <strong>The lesson for any Dayton homeowner:</strong> the clock
              on storm-related mold starts when the roof is damaged, not when
              you notice the stain. If your roof was touched by the 2019 storms
              — or any storm since — and your attic hasn't been checked, the
              check is overdue.
            </p>
          </div>
        </div>
      </section>

      {/* Why months later — general building science */}
      <section className="block" aria-labelledby="why-months-later">
        <div className="wrap">
          <span className="eyebrow reveal">General building science</span>
          <h2 id="why-months-later" className="reveal">
            Why Attic Mold Appears Months After the Storm
          </h2>
          <div className="richtext">
            <p>
              This isn't mysterious — it's building physics, and it explains
              why delayed discovery is the norm rather than the exception:
            </p>
            <ul>
              <li>
                <strong>Tornado wind damage is often partial.</strong> Lifted
                shingles, cracked flashing, and punctured decking let water in
                slowly — a drip, not a flood. Slow leaks are worse for mold
                than obvious ones because they run unnoticed for months.
              </li>
              <li>
                <strong>Attics are mold's ideal climate.</strong> Dark, warm in
                summer, poorly ventilated in many older Miami Valley homes.
                Moist air trapped against roof sheathing condenses on the cold
                wood — steady moisture with no drying cycle.
              </li>
              <li>
                <strong>You can't see it from the driveway.</strong> Nobody
                inspects their attic after a storm. The first sign is usually a
                musty smell, a ceiling stain — or a neighbor's contractor
                finding it during unrelated roof work.
              </li>
              <li>
                <strong>Every humid season accelerates it.</strong> Dayton's
                summers push indoor humidity up (June–August is the demand
                peak); an attic with a slow leak from 2019 gets a fresh growth
                cycle every single summer until the leak is fixed.
              </li>
            </ul>
            <p>
              The fix follows the same logic as the cause: find the moisture
              source (the roof damage), repair it, then remediate the mold. See
              our{" "}
              <Link href="/services/attic-mold-removal/">
                attic mold removal service page
              </Link>{" "}
              for how attic jobs are scoped — and if storm damage is involved,
              our{" "}
              <Link href="/storm/">
                storm response resources
              </Link>{" "}
              cover the first 24–72 hours after any water event.
            </p>
          </div>
        </div>
      </section>

      {/* Marked clearly as Dayton-specific */}
      <section className="block alt" aria-labelledby="about-this-story">
        <div className="wrap">
          <span className="eyebrow reveal">About this story</span>
          <h2 id="about-this-story" className="reveal">
            Why We're Telling This Story
          </h2>
          <div className="richtext">
            <p className="speakable">
              This page is about Dayton, Ohio specifically — the 2019 Memorial
              Day tornadoes, Montgomery County homeowners, and the Miami Valley
              housing stock. The quotes are brief excerpts from Dayton Daily
              News reporting, attributed and linked, quoted here for research
              purposes. If you're in Dayton and your roof was touched by the
              2019 storms — or by any storm since — run the free{" "}
              <Link href="/risk-score/">mold risk check</Link> and consider an
              attic inspection before the next humid season.
            </p>
          </div>
        </div>
      </section>

      <Faq items={FAQS} heading="Dayton Tornado Mold: Quick Answers" />

      <CtaBand
        title="Dayton attic hasn't been checked since 2019?"
        sub="Free attic inspection — we'll find the moisture source and tell you exactly what's growing up there. No obligation."
      />
    </>
  );
}
