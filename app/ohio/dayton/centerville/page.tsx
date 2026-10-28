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
 * CENTERVILLE TOWN PAGE — /ohio/dayton/centerville/
 * Fourth bespoke town page of the Dayton pilot (2026-10-26). A static route
 * here takes precedence over the generic app/[state]/[city]/[page] town
 * template, because this page carries Centerville-only research, the locked
 * title/H1 formula, and pack-built FAQs that the generic template cannot
 * express.
 *
 * Every local fact below comes from town-research/centerville-oh-research.md
 * (researched 2026-10-24). Anything that pack flagged UNVERIFIED is
 * deliberately absent: no Centerville tornado date (the May 27, 2019 EF3
 * ran Riverside to Xenia Township and is metro context only), no
 * river-flooding story (First Street rates Centerville's flood risk minor),
 * no single bare "incorporated" year (1830 as a town and 1968 as a city
 * are different statuses), and no invented review, rating, address, price,
 * customer, or job story. No competitor phone numbers or ratings appear.
 * Cost figures are published market ranges, labeled as such.
 */

export const revalidate = 3600;

const URL = `${siteConfig.siteUrl}/ohio/dayton/centerville/`;

export const metadata: Metadata = {
  // `absolute` bypasses the layout's `%s | MoldShield` template so the
  // rendered title matches the locked formula exactly.
  title: {
    absolute:
      "Mold Removal Company in Centerville, OH | Centerville Mold Remediation — Costs & Booking",
  },
  description:
    "Mold removal company in Centerville, OH: almost half the city was built in 1960–1979, and its finished basements hide mold until an inspection finds it. Centerville is not a flood town — it seeps like a 1970s suburb. Attic, basement, crawl space and black mold remediation with free inspections and transparent market pricing.",
  alternates: { canonical: URL },
};

const FAQS: { q: string; aHtml: string }[] = [
  {
    q: "We found mold during the home inspection — can the sale still close?",
    aHtml:
      "Yes, with a documented remediation scope and clearance. This is Centerville's most likely conversion moment: with 85.3% of residents in the same house a year earlier and nearly a third of residents aged 65 and over, mold here is often found at a pre-sale inspection, a downsizing move, or when adult children clear a parent's house. Get the scope in writing, fix the moisture source first, and keep documentation the buyer's lender and inspector can read.",
  },
  {
    q: "My basement smells musty but I can't see mold — is it behind the drywall?",
    aHtml:
      "Often, yes — that is the finished-basement mechanism. Almost half of Centerville was built in 1960–1979, and those basements were commonly finished later into living space. Finished drywall hides the first leak, the first musty smell, and the growth behind the wall. An inspection maps the moisture and finds the source before walls come down; visible growth means remediate, smell with no visible source means test first.",
  },
  {
    q: "How much does mold removal cost in Centerville?",
    aHtml:
      "The published market framing is $10–$25 per square foot for professional remediation, with metro sources also quoting $500 to $10,000+ by job type and location. Those are market ranges, not a quote for your home. Your free inspection produces the exact written price for your house, once the affected area, the location, and the moisture source are known.",
  },
  {
    q: "Does Centerville flood?",
    aHtml:
      "Not like a river town. First Street rates Centerville's flood risk minor: only 182 properties, 1.7%, are at risk over the next 30 years. The basement risk here is seepage, sump failure, clogged culverts, and aging plumbing — not creek overflow. Check the specific address rather than buying a flood story for the whole town.",
  },
  {
    q: "Who maintains the ditch or culvert by my driveway?",
    aHtml:
      "You do, per the city of Centerville's own stormwater page: property owners keep open ditches mowed and driveway culverts clear, and roof and foundation drains into the sanitary sewer are prohibited. The city maintains the public storm sewer. A clogged private culvert is a free fix that can prevent a wet basement — check it before the next big rain.",
  },
  {
    q: "Do I need mold testing before removal?",
    aHtml:
      "Visible growth means remediate; smell with no visible source, a real-estate deal, or a doctor's order means test first. In Centerville that distinction matters because so much growth sits behind finished drywall: testing and moisture mapping find the source, so remediation removes the mold and fixes the water that fed it, instead of just cleaning what is visible.",
  },
];

export default function CentervillePage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            serviceName: "Mold Removal in Centerville, OH",
            description:
              "Mold remediation in Centerville, Ohio — attic, basement, crawl space and black mold, with free inspections and transparent market pricing.",
            url: URL,
            areaServed: ["Centerville", "Dayton", "Ohio"],
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
          { name: "Centerville" },
        ]}
      />

      <HubHero
        h1="Mold Remediation in Centerville, OH — Local Crew, Up-Front Prices"
        answer="Centerville doesn't flood like a river town — it seeps like a 1970s suburb. Almost half the city was built in 1960–1979, those basements got finished into family rooms, and the mold behind the drywall is usually found at an inspection, not by the owner. We remediate attic, basement, crawl space, and black mold across Centerville with free inspections, transparent market pricing, and photo-documented work."
      />

      {/* Centerville by the numbers */}
      <section className="trust-strip block" aria-label="Centerville mold facts">
        <div className="wrap">
          <div className="stat-row">
            <div className="stat reveal">
              <div className="num">24,240</div>
              <div className="lbl">residents at the 2020 census</div>
              <div className="src">Source: Census QuickFacts</div>
            </div>
            <div className="stat reveal" data-delay="1">
              <div className="num">48.2%</div>
              <div className="lbl">of Centerville homes built in 1960–1979</div>
              <div className="src">
                Source: point2homes decade-built table
              </div>
            </div>
            <div className="stat reveal" data-delay="2">
              <div className="num">1977</div>
              <div className="lbl">
                median construction year of a Centerville home
              </div>
              <div className="src">Source: point2homes</div>
            </div>
            <div className="stat reveal" data-delay="3">
              <div className="num">1.7%</div>
              <div className="lbl">
                of properties at flood risk over 30 years — minor risk
              </div>
              <div className="src">Source: First Street</div>
            </div>
          </div>
        </div>
      </section>

      {/* 1 — The 1970s boom, finished */}
      <section className="block" aria-labelledby="boom-h">
        <div className="wrap">
          <span className="eyebrow reveal">Centerville, Ohio</span>
          <h2 id="boom-h" className="reveal">
            The Basement You Bought as a Family Room
          </h2>
          <p className="lede reveal">
            Centerville&apos;s mold story is the 1970s suburban boom, not
            ancient housing: only 2.8% of homes predate 1940, while 18.8%
            were built in 1960–1969 and 29.4% in 1970–1979 — 48.2% of the
            city in twenty years, with a median construction year of
            1977. Those basements are now 45 to 65 years old, and
            Centerville listings routinely sell the finished lower level
            as living space, with half-baths, storage, and entertaining
            space.
          </p>
          <p className="reveal">
            That finishing is the mechanism. Finished drywall hides the
            first leak, the first musty smell, and the mold behind the
            wall — the same finished-basement lie as in other Dayton
            suburbs, but here it sits on a suburban-boom housing stock,
            not a single-builder template. A basement that reads as a
            family room at the walkthrough can hide extensive growth
            behind paneling and into block walls, and the owner may
            never see it until someone else opens the wall.
          </p>
          <QaCallout q="Is mold common in Centerville basements?">
            The conditions are widespread: nearly half the city shares
            one 45-to-65-year-old basement generation, and those
            basements were finished into rooms. Musty odors that
            survive cleaning, spots on ceilings or walls, or allergy
            symptoms that ease when you leave the house all earn a free
            inspection.{" "}
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

      {/* 2 — Not a flood town */}
      <section className="block alt" aria-labelledby="flood-h">
        <div className="wrap">
          <span className="eyebrow reveal">The Water Story</span>
          <h2 id="flood-h" className="reveal">
            Not a Flood Town — a Seeping Suburb
          </h2>
          <p className="lede reveal">
            Say it plainly, because it builds trust: Centerville
            doesn&apos;t flood like a river town. First Street rates its
            flood risk minor, with only 182 properties — 1.7% — at risk
            over the next 30 years. Do not buy a river-flooding story
            for this town. The real water story is urban runoff and
            streambank erosion in the Holes Creek watershed, a 27.13
            square-mile watershed between Centerville and Kettering
            whose state-endorsed 2024 plan targets exactly those two
            problems.
          </p>
          <p className="reveal">
            The city&apos;s own stormwater page puts the practical part
            on the homeowner: owners keep open ditches mowed and
            driveway culverts clear, and roof and foundation drains into
            the sanitary sewer are prohibited. Groundwater, failed sump
            systems, clogged culverts, and aging plumbing are the
            mechanisms here — not creek overflow. A clogged private
            culvert is a free fix that prevents a wet basement, and it
            is the kind of useful fact no metro service list will give
            you.
          </p>
          <p className="reveal">
            That is also why we carry no borrowed storm story.
            No Centerville-specific tornado was confirmed in this
            research pass — the May 27, 2019 EF3 ran from Riverside to
            Xenia Township, and it is metro context for the night Dayton
            was hit, not a Centerville event. Centerville&apos;s storm
            story is the ordinary one: heavy-rain intrusion into aging
            basements, and sewer backups after heavy rainfall.
          </p>
        </div>
      </section>

      {/* 3 — Found at the inspection */}
      <section className="block" aria-labelledby="inspection-h">
        <div className="wrap">
          <span className="eyebrow reveal">When It Happens</span>
          <h2 id="inspection-h" className="reveal">
            Found at the Inspection, Not by the Owner
          </h2>
          <p className="lede reveal">
            Centerville is the oldest population in our service area — median
            age 48.8 years, 29.5% aged 65 and over, 35.0% of households
            single-person — and its most stay-put market: 85.3% of
            residents lived in the same house one year earlier, with a
            67.0% owner-occupied rate. People live with a musty basement
            for years, then the mold is found at a pre-sale inspection,
            a downsizing move, or by adult children clearing a
            parent&apos;s house.
          </p>
          <p className="reveal">
            That makes the conversion moment different here. This page
            speaks to sellers, buyers, and families, not just the
            homeowner with a wet floor today. The answer for an
            inspection find is the same as for any other find: scope in
            writing, moisture source fixed first, and documentation the
            buyer&apos;s lender and inspector can read — because a sale
            can still close with a documented remediation scope and
            clearance, and it stalls without one.
          </p>
          <p className="reveal">
            If you are selling, buying, or clearing a Centerville home
            and the inspection mentions mold, do not let the word alone
            decide the deal. Get the moisture mapped, the scope written,
            and the source fixed — then the clearance letter does the
            talking.
          </p>
        </div>
      </section>

      {/* 4 — The limestone town, sparingly */}
      <section className="block alt" aria-labelledby="limestone-h">
        <div className="wrap">
          <span className="eyebrow reveal">Why Centerville Looks This Way</span>
          <h2 id="limestone-h" className="reveal">
            Ohio&apos;s Limestone Town — Identity, Not the Mold Risk
          </h2>
          <p className="lede reveal">
            Centerville&apos;s identity is stone, and it is worth one
            honest paragraph. Early log homes were replaced by stone
            homes from local limestone; at one point in the 19th century
            nearly 100 stone buildings lined local streets and
            homesteads, and about 30 such homes still stand in the town
            center — described locally as the largest collection of
            early limestone buildings in the state of Ohio. Uptown
            Centerville, the historic core at SR 48 and SR 725, is where
            that history lives, under the city motto &ldquo;Progress,
            Stability.&rdquo;
          </p>
          <p className="reveal">
            Use that flavor sparingly, and never backwards: the limestone
            houses are the minority here — only 2.8% of homes predate
            1940 — so they are not the mold risk. The risk is the 1970s
            suburb around them. And keep the dates straight, because
            Centerville&apos;s history has two of them: recognized by
            the state in 1803 and platted in 1805, incorporated as a town
            in 1830, with present city incorporation given as 1968.
            Different statuses, not one bare &ldquo;founded&rdquo; year.
          </p>
        </div>
      </section>

      {/* 5 — Service sections, localized */}
      <section className="block alt" aria-labelledby="services-h">
        <div className="wrap">
          <span className="eyebrow reveal">Services in Centerville</span>
          <h2 id="services-h" className="reveal">
            Every Mold Service, Localized to Centerville
          </h2>
          <p className="lede reveal">
            Same certified protocol on every job: containment, removal,
            treatment, moisture fix, verification. Each service below is
            shaped by what Centerville homes actually present.
          </p>

          <h3 className="reveal" style={{ marginTop: 32 }}>
            Attic Mold Remediation in Centerville
          </h3>
          <p className="reveal">
            Centerville attics carry the ordinary storm story: heavy-rain
            intrusion through aging roofs, growing unseen in sheathing
            and insulation for months. We remove the growth with
            HEPA-filtered equipment, treat the surface, and fix the cause
            — roof-leak repair, ventilation, and air sealing — so it
            does not return with the next storm.{" "}
            <Link className="more" href="/ohio/dayton/attic-mold-removal/">
              Attic mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Crawl Space Mold Remediation in Centerville
          </h3>
          <p className="reveal">
            Where Centerville homes have crawl spaces, summer humidity
            and damp soil keep them wet for months, and the same aging
            drainage that troubles basements troubles the ground below
            the house. We remediate the mold, then address the moisture
            with encapsulation, drainage correction, and dehumidification
            — because a crawl space that stays damp will simply regrow
            what was removed.{" "}
            <Link
              className="more"
              href="/ohio/dayton/crawl-space-mold-remediation/"
            >
              Crawl space mold remediation in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Basement Mold Remediation in Centerville
          </h3>
          <p className="reveal">
            This is Centerville&apos;s signature job: 1970s basements
            finished into family rooms, with original waterproofing,
            failing sumps, clogged culverts, and aging plumbing behind
            the drywall. Basement work here starts with the water — sump
            condition, discharge routing, culvert and ditch condition,
            and entry points — then containment, removal, treatment, and
            a moisture fix that matches the source.{" "}
            <Link className="more" href="/ohio/dayton/basement-mold-removal/">
              Basement mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Black Mold Remediation in Centerville
          </h3>
          <p className="reveal">
            Stachybotrys chartarum — the mold behind the health scares —
            thrives on the same chronically wet drywall and cellulose
            materials that Centerville&apos;s finished basements provide.
            We work under certified containment with negative-air
            pressure, remove the affected material, and verify clearance
            before the space goes back into use. If a Centerville home
            has visible black growth, keep children and anyone with
            breathing trouble out of the room until it is assessed.{" "}
            <Link className="more" href="/ohio/dayton/black-mold-removal/">
              Black mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Mold Inspection &amp; Testing in Centerville
          </h3>
          <p className="reveal">
            Not sure it is mold? In a town where so much growth sits
            behind finished drywall and is found at an inspection, not
            by the owner, uncertainty is the normal starting point. A
            certified inspection maps moisture, samples air and surfaces
            where warranted, and ends with a written remediation protocol
            and an exact quote. If there is no mold, we say so.{" "}
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
            What Mold Remediation Costs in Centerville
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
            What moves the price in a Centerville home: the affected area
            in square feet; the location (attic, crawl space, or finished
            basement); whether the moisture source needs fixing — a sump
            system, drainage correction, or a culvert fix — and not just
            the mold itself; how much finished material must come out;
            and whether verification testing is included. A small attic
            patch and a finished basement found at inspection are
            different jobs with different prices, and any quote that
            ignores the water source should be treated with suspicion.
          </p>
          <p className="disclaimer reveal">
            Ranges: published national market data plus metro-source
            ranges. Centerville pricing is confirmed at your free
            inspection — no obligation, written quote.
          </p>
        </div>
      </section>

      {/* 7 — Where we work in Centerville */}
      <section className="block alt" aria-labelledby="areas-h">
        <div className="wrap">
          <span className="eyebrow reveal">Centerville Neighborhoods</span>
          <h2 id="areas-h" className="reveal">
            Areas We Serve in Centerville
          </h2>
          <p className="lede reveal">
            We serve homes across Centerville — Yankee Trace, Rose
            Estates, Sweeney Place, and the central established
            neighborhoods, from South Centerville toward Springboro to
            East Centerville toward I-675 and West Centerville near
            Dayton Mall, along Far Hills Avenue (SR 48), Franklin Street
            (SR 725), and Wilmington Pike alike. Local landmarks include
            Uptown Centerville, Stubbs Park, Benham&apos;s Grove,
            Silvercreek Park, and Holes Creek Park, with Centerville City
            Schools the school-driven demand driver in every buyer guide.
          </p>
          <p className="reveal" style={{ fontSize: 15, color: "var(--muted)" }}>
            <strong>ZIP codes served:</strong> 45440, 45458–45459 are
            Centerville&apos;s ZIPs. Serving the wider Dayton area from our{" "}
            <Link href="/ohio/dayton/">Dayton hub →</Link>
          </p>
        </div>
      </section>

      {/* 8 — FAQ */}
      <section className="block" aria-labelledby="faq-h">
        <div className="wrap">
          <span className="eyebrow reveal">Centerville Questions</span>
          <h2 id="faq-h" className="reveal">
            Centerville Mold Questions, Answered
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
        title="Free Mold Inspection in Centerville"
        sub="No obligation. We'll find the mold, scope the job, and give you a written quote — free."
      />
    </>
  );
}
