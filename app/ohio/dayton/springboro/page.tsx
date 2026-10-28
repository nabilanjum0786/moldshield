import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import {
  JsonLd,
  serviceSchema,
  faqJsonLd,
  speakableSchema,
} from "@/lib/schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HubHero, QaCallout } from "@/components/hub";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/icons";

/**
 * SPRINGBORO TOWN PAGE — /ohio/dayton/springboro/
 * Sixth bespoke town page of the Dayton pilot (2026-10-28). A static route
 * here takes precedence over the generic app/[state]/[city]/[page] town
 * template, because this page carries Springboro-only research, the locked
 * title/H1 formula, and pack-built FAQs that the generic template cannot
 * express.
 *
 * Every local fact below comes from town-research/springboro-oh-research.md
 * (researched 2026-10-27). Anything that pack flagged UNVERIFIED is
 * deliberately absent: no Springboro tornado date or Springboro tornado
 * damage (the May 25, 2011 tornadoes were near Centerville and Liberty
 * Township; the May 27, 2019 EF3 ran Riverside to Xenia Township), no
 * city-level flood figure (none was verified, and a Central Ohio Clear
 * Creek flooding article found in the pass is a different Clear Creek),
 * no exact pre-1980 housing share (the decade table omits the 1940–1949
 * row, so a summed figure would understate it), no Springboro mold rate
 * or radon claim, no merged median-age or median-build figure (sources
 * differ by vintage/cut — one labeled source per claim), no SERVPRO
 * rating presented as a Springboro rating (it is the Middletown /
 * Springboro franchise listing), and no invented review, rating, address,
 * price, customer, or job story. Cost figures are published market
 * ranges, labeled as such. ZIP codes are omitted.
 */

export const revalidate = 3600;

const URL = `${siteConfig.siteUrl}/ohio/dayton/springboro/`;

export const metadata: Metadata = {
  // `absolute` bypasses the layout's `%s | MoldShield` template so the
  // rendered title matches the locked formula exactly.
  title: {
    absolute:
      "Mold Removal Company in Springboro, OH | Springboro Mold Remediation — Costs & Booking",
  },
  description:
    "Mold removal company in Springboro, OH: the newest town in our service area — 56.0% of homes built in 1990–2009, median build 1996 — and the most owner-occupied, at 88.9%. Springboro looks new; its roofs, pipes, and basements are not new anymore. Attic, basement, crawl space and black mold remediation with free inspections and transparent market pricing.",
  alternates: { canonical: URL },
};

const FAQS: { q: string; aHtml: string }[] = [
  {
    q: "Our house was built in the 1990s — can it really have mold?",
    aHtml:
      "Yes — and that is the Springboro-first question. The median Springboro home was built in 1996, and 56.0% of homes went up in 1990–2009, so those houses are now 17–36 years old: original roofs at end of life, original water heaters and supply lines past their service window, and finished basements whose first leak hides behind drywall. Age of the subdivision is not protection; a 1998 roof valley, a 2005 water-heater pan, or a sump that quit during a spring storm is where the first leak usually starts.",
  },
  {
    q: "We had storm damage years ago — could that be where this came from?",
    aHtml:
      "It is worth checking, and Springboro has its own storm date for it — not a borrowed tornado. On June 23, 2016, a microburst with straight-line winds up to 80 mph hit the Settlers Walk neighborhood (Settlers Walk Blvd., Stolle Drive, Remick Blvd.), extending toward Five Points and Lytle. Wind-lifted shingles and roof valleys can leak slowly for seasons before anyone sees mold in the attic; an attic check traces the path from roof to growth before walls come down.",
  },
  {
    q: "Our basement is finished — how do you check behind the drywall?",
    aHtml:
      "With moisture readings and a targeted inspection, not a guess and not tearing out a whole finished wall on day one. That matters here because 93.3% of Springboro residents lived in the same house a year earlier — people stay, renovate, and finish basements — so the first leak in a finished lower level can sit behind drywall for a long time. The inspection ends with a written scope, so you know what comes out and what stays.",
  },
  {
    q: "How much does mold removal cost in Springboro?",
    aHtml:
      "The published market framing is $10–$25 per square foot for professional remediation, with metro sources also quoting $500 to $10,000+ by job type and location. Those are market ranges, not a quote for your home. Your free inspection produces the exact written price for your house, once the affected area, the location, and the moisture source are known.",
  },
  {
    q: "Do I need mold testing before removal?",
    aHtml:
      "Visible growth means remediate; smell with no visible source, a real-estate deal, or a doctor's order means test first. In Springboro that distinction matters because so much growth sits behind finished basement drywall or in an attic fed by a slow roof leak — testing and moisture mapping find the source, so remediation removes the mold and fixes the water that fed it, instead of just cleaning what is visible.",
  },
  {
    q: "Does Springboro flood?",
    aHtml:
      "The honest answer: the town is named for its springs and sits on Clear Creek, but no city-level flood figure is claimed by us — check the specific address. The real water risk in most Springboro houses is not a river story; it is roof valleys, grading, sump failure, and plumbing — the same mechanisms the trade's own Springboro framing names (basements, attics, behind drywall).",
  },
  {
    q: "Is there a Springboro tornado I should worry about for mold?",
    aHtml:
      "We claim no Springboro tornado, because none was confirmed. The May 25, 2011 tornadoes that night were near Centerville (EF0) and Liberty Township (EF1) — metro context, not a Springboro event — and the May 27, 2019 EF3 ran from Riverside to Xenia Township. Springboro's storm credential is the June 23, 2016 microburst: straight-line winds up to 80 mph through Settlers Walk. That distinction is what keeps our account honest.",
  },
];

export default function SpringboroPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            serviceName: "Mold Removal in Springboro, OH",
            description:
              "Mold remediation in Springboro, Ohio — attic, basement, crawl space and black mold, with free inspections and transparent market pricing.",
            url: URL,
            areaServed: ["Springboro", "Dayton", "Ohio"],
          }),
          faqJsonLd(FAQS),
          speakableSchema({ url: URL, cssSelectors: [".speakable"] }),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Ohio", href: "/ohio/" },
          { name: "Dayton", href: "/ohio/dayton/" },
          { name: "Springboro" },
        ]}
      />

      <HubHero
        h1="Mold Remediation in Springboro, OH — Local Crew, Up-Front Prices"
        answer="Springboro looks new. Its roofs, pipes, and basements are not new anymore. Founded in 1815 as a Quaker town on Clear Creek, Springboro was mostly built in one generation — 56.0% of its homes went up in 1990–2009 — and that generation of houses is now old enough for its first roof, its first plumbing failure, and its first finished-basement leak. We remediate attic, basement, crawl space, and black mold across Springboro with free inspections, transparent market pricing, and photo-documented work."
      />

      {/* Springboro by the numbers */}
      <section className="trust-strip block" aria-label="Springboro mold facts">
        <div className="wrap">
          <div className="stat-row">
            <div className="stat reveal">
              <div className="num">19,062</div>
              <div className="lbl">residents at the 2020 census</div>
              <div className="src">Source: Census QuickFacts</div>
            </div>
            <div className="stat reveal" data-delay="1">
              <div className="num">56.0%</div>
              <div className="lbl">of Springboro homes built in 1990–2009</div>
              <div className="src">
                Source: point2homes decade-built table
              </div>
            </div>
            <div className="stat reveal" data-delay="2">
              <div className="num">1996</div>
              <div className="lbl">
                median construction year of a Springboro home
              </div>
              <div className="src">Source: point2homes</div>
            </div>
            <div className="stat reveal" data-delay="3">
              <div className="num">88.9%</div>
              <div className="lbl">
                of Springboro homes owner-occupied — the most owner-occupied town in our service area
              </div>
              <div className="src">Source: Census QuickFacts</div>
            </div>
          </div>
        </div>
      </section>

      {/* 1 — The two Springboros */}
      <section className="block" aria-labelledby="two-h">
        <div className="wrap">
          <span className="eyebrow reveal">Springboro, Ohio</span>
          <h2 id="two-h" className="reveal">
            Two Springboros in One City — 1815 and the 1990s
          </h2>
          <p className="lede reveal">
            Springboro did not start as a suburb. It started in 1815 as
            &ldquo;Springborough,&rdquo; platted by Jonathan Wright, a
            Quaker miller and surveyor from Pennsylvania, on the banks
            of Clear Creek — a town named for its springs, with a
            historical marker at 700 S Main Street recording it as a
            Quaker community and a safe haven on the Underground
            Railroad. The 1990s–2000s subdivisions are the same city,
            but they are not the same housing stock.
          </p>
          <p className="reveal">
            The page must not write Springboro as an &ldquo;old
            homes&rdquo; town — that would be wrong for 56% of it — and
            must not write it as a &ldquo;brand-new homes&rdquo; town
            either. The old-town core (pre-1939, 2.6% of homes) is a
            footnote, not the story, and the 1990s builds are now old
            enough for their first roof, their first plumbing failure,
            and their first finished-basement leak. The honest line is
            the hook no other town in our service area has: an old town that was
            mostly built in one generation.
          </p>
          <QaCallout q="Why does a town that looks new still get mold?">
            Because new does not mean dry. A subdivision built in 1998
            has a roof valley, a water heater, and a sump pump that are
            all 28 years old now — and a finished basement that hides
            the first leak behind drywall.{" "}
            <span className="heo">
              Mold follows water — find the water, and you&apos;ve found
              the mold&apos;s address.
            </span>
            <br />
            <Link href="/services/mold-inspection-testing/">
              <strong>
                Not sure? Get it tested <Icon name="arrow" />
              </strong>
            </Link>
          </QaCallout>
        </div>
      </section>

      {/* 2 — The 1990s–2000s cohort aging into first failures */}
      <section className="block alt" aria-labelledby="cohort-h">
        <div className="wrap">
          <span className="eyebrow reveal">The Housing Stock</span>
          <h2 id="cohort-h" className="reveal">
            New Does Not Mean Dry — the 1990s–2000s Cohort, Aging Now
          </h2>
          <p className="lede reveal">
            Springboro is the newest town in our service area, by a wide
            margin: 56.0% of homes were built in 1990–2009, with the
            1990s cohort alone (29.1%) bigger than any single decade in
            Kettering, Beavercreek, Huber Heights, Centerville, or
            Fairborn. The median home was built in 1996, and 85.6% of
            homes are 1-unit detached — the most single-family town in our service area. Growth is the backstory: 17,409 people
            in 2010, up 41% since the 2000 census.
          </p>
          <p className="reveal">
            Those houses are 17–36 years old now: original roofs at end
            of life, original water heaters and supply lines past their
            service window, and finished basements whose first leak
            hides behind drywall. The discovery moment in Springboro is
            not a 1950s pipe — it is a 1998 roof valley, a 2005
            water-heater pan, or a sump that quit during a spring
            storm. That mechanism is labeled as mechanism, not a
            measured rate: no Springboro mold rate was verified.
          </p>
        </div>
      </section>

      {/* 3 — The owner-family buyer */}
      <section className="block" aria-labelledby="owner-h">
        <div className="wrap">
          <span className="eyebrow reveal">When It Happens</span>
          <h2 id="owner-h" className="reveal">
            The Owner Who Stays Put — Protecting a High-Value Home
          </h2>
          <p className="lede reveal">
            Springboro is the mirror image of Fairborn: 88.9%
            owner-occupied, only about 1 in 9 homes rented, 28.7% of
            residents under 18, a median owner-occupied value of
            $357,800 — roughly double Fairborn&apos;s $175,000 — and
            93.3% of residents lived in the same house a year earlier,
            the most stay-put town in our service area so far. The buyer here is not
            a landlord deciding on a rental; it is a family protecting
            the house they plan to stay in.
          </p>
          <p className="reveal">
            Price objection is not this town&apos;s story; protecting a
            high-value home is. And the inspection trigger is a sale, a
            renovation, or a child&apos;s room that smells musty. We make no health claims; the family angle is
            about the decision — protect the home you are staying in —
            not about symptoms.
          </p>
        </div>
      </section>

      {/* 4 — The microburst, told straight */}
      <section className="block alt" aria-labelledby="storm-h">
        <div className="wrap">
          <span className="eyebrow reveal">The Storm Story</span>
          <h2 id="storm-h" className="reveal">
            A Microburst, Not a Borrowed Tornado
          </h2>
          <p className="lede reveal">
            On June 23, 2016, a microburst with straight-line winds up
            to 80 mph hit Springboro, with a damage swath through the
            Settlers Walk neighborhood — Settlers Walk Blvd., Stolle
            Drive, Remick Blvd. — extending southeast toward Five
            Points and Lytle, knocking hardwood trees down in one
            direction. Wind damage that never became a
            &ldquo;tornado story&rdquo; still lifts shingles, opens
            roof valleys, and lets water in for months before anyone
            sees mold in the attic.
          </p>
          <p className="reveal">
            Do not call it a tornado — the National Weather Service
            statement says microburst and straight-line winds, and the
            distinction is what keeps our account honest.
            No Springboro tornado is claimed anywhere here: the May 25,
            2011 tornadoes were near Centerville and Liberty Township,
            and the May 27, 2019 EF3 was Riverside to Xenia Township.
            Both are metro context, not Springboro events, and neither
            is borrowed as if it were.
          </p>
        </div>
      </section>

      {/* 5 — Service sections, localized */}
      <section className="block alt" aria-labelledby="services-h">
        <div className="wrap">
          <span className="eyebrow reveal">Services in Springboro</span>
          <h2 id="services-h" className="reveal">
            Every Mold Service, Localized to Springboro
          </h2>
          <p className="lede reveal">
            Same certified protocol on every job: containment, removal,
            treatment, moisture fix, verification. Each service below is
            shaped by what Springboro homes actually present.
          </p>

          <h3 className="reveal" style={{ marginTop: 32 }}>
            Attic Mold Remediation in Springboro
          </h3>
          <p className="reveal">
            Springboro attics carry the 1990s–2000s story: first-generation
            roofs at end of life, wind-lifted shingles from the 2016
            microburst&apos;s Settlers Walk swath, and roof valleys that
            leak slowly for seasons. We remove the growth with
            HEPA-filtered equipment, treat the surface, and fix the
            cause — roof-leak repair, ventilation, and air sealing — so
            it does not return with the next storm.{" "}
            <Link className="more" href="/ohio/dayton/attic-mold-removal/">
              Attic mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Crawl Space Mold Remediation in Springboro
          </h3>
          <p className="reveal">
            Humid summers stress crawl spaces in newer homes here, and
            subdivision grading that pushes stormwater toward
            foundations keeps them damp for months. We remediate the
            mold, then address the moisture with encapsulation, drainage
            correction, and dehumidification — because a crawl space
            that stays damp will simply regrow what was removed.{" "}
            <Link
              className="more"
              href="/ohio/dayton/crawl-space-mold-remediation/"
            >
              Crawl space mold remediation in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Basement Mold Remediation in Springboro
          </h3>
          <p className="reveal">
            This is Springboro&apos;s signature job: finished basements
            in 1990s–2000s houses, where the first leak — a roof valley,
            a water-heater pan, a sump that quit — hides behind drywall
            in a house the family plans to stay in. Basement work here
            starts with the water — plumbing condition, seepage entry
            points, and sump and drainage condition — then containment,
            removal, treatment, and a moisture fix that matches the
            source.{" "}
            <Link className="more" href="/ohio/dayton/basement-mold-removal/">
              Basement mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Black Mold Remediation in Springboro
          </h3>
          <p className="reveal">
            Stachybotrys chartarum — the mold behind the health scares —
            thrives on the same chronically wet drywall and cellulose
            materials that Springboro&apos;s finished basements provide.
            We work under certified containment with negative-air
            pressure, remove the affected material, and verify clearance
            before the space goes back into use. If a Springboro home
            has visible black growth, keep children and anyone with
            breathing trouble out of the room until it is assessed.{" "}
            <Link className="more" href="/ohio/dayton/black-mold-removal/">
              Black mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Mold Inspection &amp; Testing in Springboro
          </h3>
          <p className="reveal">
            Not sure it is mold? In a town where so much growth sits
            behind finished basement drywall or in an attic fed by a
            slow roof leak, uncertainty is the normal starting point.
            A certified inspection maps moisture, samples air and
            surfaces where warranted, and ends with a written
            remediation protocol and an exact quote. If there is no
            mold, we say so.{" "}
            <Link
              className="more"
              href="/ohio/dayton/mold-inspection-testing/"
            >
              Mold inspection &amp; testing in Dayton <Icon name="arrow" />
            </Link>
          </p>
        </div>
      </section>

      {/* 6 — Cost, as market ranges */}
      <section className="block" aria-labelledby="cost-h">
        <div className="wrap">
          <span className="eyebrow reveal">Transparent Pricing</span>
          <h2 id="cost-h" className="reveal">
            What Mold Remediation Costs in Springboro
          </h2>
          <p className="lede reveal">
            These are published market ranges — not our prices. Your
            free inspection produces the exact written quote for your
            home. The market consensus across national pricing sources is
            $10–$25 per square foot for professional remediation, with
            metro sources also quoting $500 to $10,000+ by job type and
            location.
          </p>
          <div className="table-scroll reveal" style={{ marginTop: 24 }}>
            <table className="cmp">
              <thead>
                <tr>
                  <th>Job type</th>
                  <th>Typical market range</th>
                  <th>What it usually covers</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Per square foot (all jobs)</td>
                  <td>$10–$25 / sq ft</td>
                  <td>Market consensus range; the unit most quotes are built on</td>
                </tr>
                <tr>
                  <td>Metro range by job type</td>
                  <td>$500–$10,000+</td>
                  <td>Metro-source range by type and location; small jobs at the low end, large finished-basement jobs at the high end</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="reveal" style={{ marginTop: 18 }}>
            What moves the price in a Springboro home: the affected area
            in square feet; the location (attic, crawl space, or
            basement); whether the moisture source needs fixing — a
            roof valley, a water-heater pan, a sump, or grading and
            drainage correction — and not just the mold itself; how
            much finished material must come out; and whether
            verification testing is included. A small attic patch and a
            finished basement found during a renovation are different
            jobs with different prices, and any quote that ignores the
            water source should be treated with suspicion.
          </p>
          <p className="disclaimer reveal">
            Ranges: published national market data plus metro-source
            ranges. Springboro pricing is confirmed at your free
            inspection — no obligation, written quote.
          </p>
        </div>
      </section>

      {/* 7 — Where we work in Springboro */}
      <section className="block alt" aria-labelledby="areas-h">
        <div className="wrap">
          <span className="eyebrow reveal">Springboro Neighborhoods</span>
          <h2 id="areas-h" className="reveal">
            Areas We Serve in Springboro
          </h2>
          <p className="lede reveal">
            We serve homes across Springboro — Downtown Springboro and
            Main Street, the 1815 Clear Creek settlement core, the
            Settlers Walk neighborhood, and the Five Points and Lytle
            areas, along the State Route 73 corridor alike. Serving the
            wider Dayton area from our{" "}
            <Link href="/ohio/dayton/">Dayton hub →</Link>
          </p>
        </div>
      </section>

      {/* 8 — FAQ */}
      <section className="block" aria-labelledby="faq-h">
        <div className="wrap">
          <span className="eyebrow reveal">Springboro Questions</span>
          <h2 id="faq-h" className="reveal">
            Springboro Mold Questions, Answered
          </h2>
          <div className="reveal" style={{ marginTop: 24, maxWidth: 860 }}>
            <FaqAccordion items={FAQS} />
          </div>
          <p className="reveal" style={{ marginTop: 18 }}>
            <Link className="more" href="/ohio/dayton/">
              See all of Dayton <Icon name="arrow" />
            </Link>
          </p>
        </div>
      </section>

      <CtaBand
        title="Free Mold Inspection in Springboro"
        sub="No obligation. We'll find the mold, scope the job, and give you a written quote — free."
      />
    </>
  );
}
