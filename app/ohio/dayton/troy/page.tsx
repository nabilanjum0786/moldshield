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
 * TROY TOWN PAGE — /ohio/dayton/troy/
 * Seventh bespoke town page of the Dayton pilot (2026-10-28). A static route
 * here takes precedence over the generic app/[state]/[city]/[page] town
 * template, because this page carries Troy-only research, the locked
 * title/H1 formula, and pack-built FAQs that the generic template cannot
 * express.
 *
 * Every local fact below comes from town-research/troy-oh-research.md
 * (researched 2026-10-28). Anything that pack flagged UNVERIFIED is
 * deliberately absent: no Pike County, Alabama "Troy" tornado presented
 * as a Troy, Ohio event; the May 30, 2018 and May 27, 2019 tornadoes
 * are NOT claimed as Troy touchdowns (5 miles west and south of Troy);
 * no Troy city-level First Street flood property count (the "Troy
 * Levee R1 protects 3,512 properties" line is a First Street database
 * listing, cited only as such); no single merged median-age,
 * median-build, owner-share, income, or home-value figure (sources
 * differ by vintage/cut — one labeled source per claim; headline
 * median build 1972 from point2homes, headline owner share 65.5% from
 * Census QuickFacts); no Troy mold rate, radon level, groundwater
 * measurement, or "most common" problem claim; no invented review,
 * rating, address, price, customer, or job story; no Census Reporter
 * values (the direct API fetch failed twice in the research pass).
 * Cost figures are published market ranges, labeled as such. ZIP codes
 * are omitted. No current flood claim is made: the 1913 flood is
 * history, and the levee system is its sequel.
 */

export const revalidate = 3600;

const URL = `${siteConfig.siteUrl}/ohio/dayton/troy/`;

export const metadata: Metadata = {
  // `absolute` bypasses the layout's `%s | MoldShield` template so the
  // rendered title matches the locked formula exactly.
  title: {
    absolute:
      "Mold Removal Company in Troy, OH | Troy Mold Remediation — Costs & Booking",
  },
  description:
    "Mold removal company in Troy, OH: the Miami County seat, built on the Great Miami River in 1807 — 60.6% of homes built before 1980, median build 1972, 26,305 residents. The river built the town, flooded the town, and now the town is built against it. Attic, basement, crawl space and black mold remediation with free inspections and transparent market pricing.",
  alternates: { canonical: URL },
};

const FAQS: { q: string; aHtml: string }[] = [
  {
    q: "Our house was built in the 1960s — is that why this keeps coming back?",
    aHtml:
      "That is the Troy-first question, and the numbers back it: the 1960s cohort alone is 16.9% of Troy homes — the single largest decade — and 60.6% of homes were built before 1980. Age is the mechanism, not a diagnosis: original pipes, roofs, and basement walls at end of life. A 1960s ranch whose original plumbing finally lets go, or a pre-war house whose basement has been damp for decades, will keep regrowing mold until the water source is found — so the fix has to find the water, not just clean the spot.",
  },
  {
    q: "We had tornado damage in 2020 / 2022 — could that be where this came from?",
    aHtml:
      "It is worth checking. Troy has its own tornadoes, not borrowed ones: on January 11, 2020, an EF0 crossed the city center and the Great Miami River at night, with the most concentrated damage near Troy High School and along/east of North Market Street, where several downtown-east businesses lost all or portions of their roofs; on July 23, 2022, an EF1 ran from west to southeast Troy, heaviest at Drury Ln / Ridge Ave. Wind-lifted shingles and roof valleys can leak slowly for seasons before anyone sees mold in the attic — an attic check traces the path from roof to growth before walls come down.",
  },
  {
    q: "Does Troy flood? Should I worry about the river?",
    aHtml:
      "Plainly: the Great Miami drowned southwest Troy in March 1913 — a 48-hour downpour that covered the southwest district as far north as the Canal and as far east as Plum Street, and took 15 lives in Troy — and the town has lived behind Miami Conservancy District levees (3.5 miles) and improved channel (2.2 miles) ever since. The river is history and a water-table neighbor, not a current flood claim. The real risk in most Troy houses is roof, grading, sump, and plumbing water. Check the specific address.",
  },
  {
    q: "Our basement is old and always damp — how do you check behind the walls?",
    aHtml:
      "With moisture readings and a targeted inspection, not a guess and not tearing out a whole basement on day one. That matters in Troy because 15.7% of homes were built in 1939 or earlier, and the center of town holds the oldest housing — a pre-war basement that has been damp for decades needs a scope that says what comes out and what stays, and an inspection ends with exactly that written scope.",
  },
  {
    q: "How much does mold removal cost in Troy?",
    aHtml:
      "The published market framing is $10–$25 per square foot for professional remediation, with metro sources also quoting $500 to $10,000+ by job type and location. Those are market ranges, not a quote for your home. Your free inspection produces the exact written price for your house, once the affected area, the location, and the moisture source are known.",
  },
  {
    q: "Do I need mold testing before removal?",
    aHtml:
      "Visible growth means remediate; smell with no visible source, a real-estate deal, or a doctor's order means test first. In Troy that distinction matters because so much growth sits in old basements, behind walls, or in an attic fed by a slow roof leak from a storm years ago — testing and moisture mapping find the source, so remediation removes the mold and fixes the water that fed it, instead of just cleaning what is visible.",
  },
  {
    q: "I rent — the leak is the landlord's, but the mold is in my home. What do I do?",
    aHtml:
      "Document the leak and the growth, tell the landlord in writing, and get an inspection scope you can hand over. Troy's renter share is about 3 in 10 homes — among the highest in our service area — so this is a real Troy question, not a footnote. We give no legal advice; the inspection gives you a written, professional scope to put in front of the landlord.",
  },
];

export default function TroyPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            serviceName: "Mold Removal in Troy, OH",
            description:
              "Mold remediation in Troy, Ohio — attic, basement, crawl space and black mold, with free inspections and transparent market pricing.",
            url: URL,
            areaServed: ["Troy", "Dayton", "Ohio"],
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
          { name: "Troy" },
        ]}
      />

      <HubHero
        h1="Mold Remediation in Troy, OH — Local Crew, Up-Front Prices"
        answer="Troy was built on the river. The river built the town, flooded the town, and now the town is built against it. Platted in 1807 to be the seat of Miami County, drowned in the Great Flood of 1913, rebuilt behind 3.5 miles of levee — Troy is the Miami County seat, and the only town in our service area with a river-and-levee story. We remediate attic, basement, crawl space, and black mold across Troy with free inspections, transparent market pricing, and photo-documented work."
      />

      {/* Troy by the numbers */}
      <section className="trust-strip block" aria-label="Troy mold facts">
        <div className="wrap">
          <div className="stat-row">
            <div className="stat reveal">
              <div className="num">26,305</div>
              <div className="lbl">residents at the 2020 census</div>
              <div className="src">Source: Census QuickFacts</div>
            </div>
            <div className="stat reveal" data-delay="1">
              <div className="num">60.6%</div>
              <div className="lbl">of Troy homes built before 1980</div>
              <div className="src">
                Source: point2homes decade-built table
              </div>
            </div>
            <div className="stat reveal" data-delay="2">
              <div className="num">1972</div>
              <div className="lbl">
                median construction year of a Troy home
              </div>
              <div className="src">Source: point2homes</div>
            </div>
            <div className="stat reveal" data-delay="3">
              <div className="num">65.5%</div>
              <div className="lbl">
                of Troy homes owner-occupied (ACS 2020–24)
              </div>
              <div className="src">Source: Census QuickFacts</div>
            </div>
          </div>
        </div>
      </section>

      {/* 1 — The county seat the river built */}
      <section className="block" aria-labelledby="seat-h">
        <div className="wrap">
          <span className="eyebrow reveal">Troy, Ohio</span>
          <h2 id="seat-h" className="reveal">
            The County Seat the River Built
          </h2>
          <p className="lede reveal">
            Troy did not grow into a county seat by accident — it was
            built to be one. Miami County was formed on January 16,
            1807, and in the summer of that year the site of Troy was
            selected as the county seat and platted by Andrew Wallace.
            The first court met on November 5, 1808, in an upstairs
            room at Benjamin Overfield&apos;s tavern — believed to be
            the first house built in the new town — and the seat was
            contested: Staunton held the first court and Piqua wanted
            the honor. Troy won it and never lost it. The current
            Miami County Courthouse opened in 1888 and still anchors
            downtown today.
          </p>
          <p className="reveal">
            The river made that possible, in stages: the Great Miami
            first, then the Miami &amp; Erie Canal, then railroads,
            then the Dixie Highway. Today Troy has four I-75
            interchanges, the I-75/I-70 intersection 10 minutes south,
            and a working economy — manufacturing is 25.4% of
            employment, and Hobart Corporation is headquartered at 701
            S Ridge Ave. This is a working town, not a bedroom suburb,
            and its houses were built to be lived in for decades — which
            is exactly why their age matters for mold.
          </p>
          <QaCallout q="Why does a county seat's history matter for mold?">
            Because the town&apos;s age is written into its houses. A
            seat platted in 1807 has a pre-war core (15.7% of homes
            built in 1939 or earlier), a 1960s bulge, and a river at
            its edge — three water stories in one town.{" "}
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

      {/* 2 — Old houses, honest water */}
      <section className="block alt" aria-labelledby="stock-h">
        <div className="wrap">
          <span className="eyebrow reveal">The Housing Stock</span>
          <h2 id="stock-h" className="reveal">
            Old Houses, Honest Water — 60.6% Built Before 1980
          </h2>
          <p className="lede reveal">
            Troy&apos;s housing stock runs old:
            7,111 of 11,733 homes were built before 1980, the 1960s
            cohort alone is 16.9% — the single largest decade — and
            underneath it sits a real pre-war core of 15.7% built in
            1939 or earlier. Above it, a second wave: 27.6% of homes
            went up in 1990–2009, the southwest new builds. And 72.2%
            of homes are 1-unit detached — a detached-house town.
          </p>
          <p className="reveal">
            The geography of age is honest and usable: newer
            construction is concentrated in the southwest, and the
            center holds the oldest housing. Downtown and the center
            are the old Troy; the southwest is the new Troy. The
            discovery moment here is not a subdivision&apos;s first
            leak — it is a 1960s ranch whose original plumbing finally
            lets go, or a pre-war basement that has been damp for
            decades. That mechanism is labeled as mechanism, not a
            measured rate: no Troy mold rate was verified.
          </p>
        </div>
      </section>

      {/* 3 — The 1913 flood and the levee sequel */}
      <section className="block" aria-labelledby="flood-h">
        <div className="wrap">
          <span className="eyebrow reveal">The River Story</span>
          <h2 id="flood-h" className="reveal">
            The Flood Is History. The Levee Is the Sequel.
          </h2>
          <p className="lede reveal">
            On March 23–25, 1913, a 48-hour downpour pushed the Great
            Miami to its highest point by midnight Monday, and by
            Tuesday noon Troy&apos;s streets surged with the rush of
            waters. The flood covered all the southwest district as
            far north as the Canal and as far east as Plum Street.
            Fifteen people in Troy died by drowning. At Troy no levees
            broke — the water simply rose from the river and covered
            much of the town with what one observer called
            &ldquo;a gigantic lake.&rdquo; Citizens dynamited the
            railroad embankment that trapped water south of downtown,
            and the relief committee raised over $10,000 under the
            slogan &ldquo;Troy will take care of her own.&rdquo;
          </p>
          <p className="reveal">
            Today the Miami Conservancy District maintains 3.5 miles
            of levee and 2.2 miles of improved channel in Troy. That
            is why a Troy page can talk about river water honestly
            without claiming the town floods today: the river is
            history and a water-table neighbor, not a current flood
            claim. Basement water in Troy today is the ordinary kind —
            grading, sump, plumbing, and the river&apos;s high water
            table near Morgan Ditch, which enters the Great Miami at
            the north end of the city — stated as mechanism, not a
            measured rate. First Street&apos;s adaptation database
            lists &ldquo;Troy Levee R1&rdquo; as protecting 3,512
            properties; that is a database listing, never a Troy city
            figure, and it is cited only as such.
          </p>
        </div>
      </section>

      {/* 4 — Two city tornadoes, told straight */}
      <section className="block alt" aria-labelledby="storm-h">
        <div className="wrap">
          <span className="eyebrow reveal">The Storm Story</span>
          <h2 id="storm-h" className="reveal">
            Two City Tornadoes — and Two Near-Misses, Labeled as Such
          </h2>
          <p className="lede reveal">
            Troy has more in-city tornadoes than any other town in our service area
            — two, in three years. On January 11, 2020, an EF0 touched
            down in southwest Troy at 10:11 PM, moved northeast through
            the center of the city, crossed the Great Miami River, and
            lifted in far northeast Troy: 80 mph winds, a 3.2-mile
            path, 350 yards wide, with the most concentrated damage
            near Troy High School and along/east of North Market
            Street, where several downtown-east businesses lost all or
            portions of their roofs. On July 23, 2022, an EF1 ran from
            west to southeast Troy: 90 mph, 1.8 miles, 200 yards —
            Cheshire Rd / Dorset Rd, Armand Dr / McKaig Ave, the
            Red Cedar Dr apartments, heaviest at Drury Ln / Ridge Ave
            with very large healthy trees downed, and a car crushed by
            a limb on W Simpson St.
          </p>
          <p className="reveal">
            Two more events are metro context, not Troy touchdowns,
            and we do not borrow them: the May 30, 2018 EF0
            was 5 miles west of Troy, and the May 27, 2019 EF0 was
            south of Troy, in subdivisions south of Swailes Rd.
            Other Troy damage on July 23, 2022 — Stanfield Rd, W Ross
            St, Dakota St — was straight-line winds of 60–70 mph, and
            is labeled as such, not folded into the tornado path.
            Roof damage that never became a &ldquo;disaster
            story&rdquo; still opens valleys and lets water in for
            seasons before anyone sees mold in the attic — and
            Beavercreek&apos;s single 2019 EF3 was far stronger, but it
            was one. Troy&apos;s count is two.
          </p>
        </div>
      </section>

      {/* 5 — Service sections, localized */}
      <section className="block alt" aria-labelledby="services-h">
        <div className="wrap">
          <span className="eyebrow reveal">Services in Troy</span>
          <h2 id="services-h" className="reveal">
            Every Mold Service, Localized to Troy
          </h2>
          <p className="lede reveal">
            Same certified protocol on every job: containment, removal,
            treatment, moisture fix, verification. Each service below is
            shaped by what Troy homes actually present.
          </p>

          <h3 className="reveal" style={{ marginTop: 32 }}>
            Attic Mold Remediation in Troy
          </h3>
          <p className="reveal">
            Troy attics carry the tornado story: the 2020 EF0&apos;s
            North Market Street roof damage and the 2022 EF1&apos;s
            west-to-southeast path both lifted shingles and opened
            roof valleys that can leak slowly for seasons. We remove
            the growth with HEPA-filtered equipment, treat the
            surface, and fix the cause — roof-leak repair, ventilation,
            and air sealing — so it does not return with the next
            storm.{" "}
            <Link className="more" href="/ohio/dayton/attic-mold-removal/">
              Attic mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Crawl Space Mold Remediation in Troy
          </h3>
          <p className="reveal">
            River-adjacent crawl spaces near the Great Miami and
            Morgan Ditch live with a high water table, and humid
            summers keep them damp for months. We remediate the mold,
            then address the moisture with encapsulation, drainage
            correction, and dehumidification — because a crawl space
            that stays damp will simply regrow what was removed.{" "}
            <Link
              className="more"
              href="/ohio/dayton/crawl-space-mold-removal/"
            >
              Crawl space mold remediation in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Basement Mold Remediation in Troy
          </h3>
          <p className="reveal">
            This is Troy&apos;s signature job: pre-war and 1960s
            basements in the center of town, where the first leak — a
            roof valley, a plumbing failure, a sump that quit, or
            river-valley groundwater — has had decades to work.
            Basement work here starts with the water — plumbing
            condition, seepage entry points, and sump and drainage
            condition — then containment, removal, treatment, and a
            moisture fix that matches the source.{" "}
            <Link className="more" href="/ohio/dayton/basement-mold-removal/">
              Basement mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Black Mold Remediation in Troy
          </h3>
          <p className="reveal">
            Stachybotrys chartarum — the mold behind the health scares —
            thrives on the same chronically wet drywall and cellulose
            materials that Troy&apos;s old basements provide. We work
            under certified containment with negative-air pressure,
            remove the affected material, and verify clearance before
            the space goes back into use. If a Troy home has visible
            black growth, keep children and anyone with breathing
            trouble out of the room until it is assessed.{" "}
            <Link className="more" href="/ohio/dayton/black-mold-removal/">
              Black mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Mold Inspection &amp; Testing in Troy
          </h3>
          <p className="reveal">
            Not sure it is mold? In a town where growth sits in old
            basements, behind walls, or in an attic fed by a slow roof
            leak from a storm years ago, uncertainty is the normal
            starting point. A certified inspection maps moisture,
            samples air and surfaces where warranted, and ends with a
            written remediation protocol and an exact quote. If there
            is no mold, we say so.{" "}
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
            What Mold Remediation Costs in Troy
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
                  <td>Metro-source range by type and location; small jobs at the low end, large old-basement jobs at the high end</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="reveal" style={{ marginTop: 18 }}>
            What moves the price in a Troy home: the affected area
            in square feet; the location (attic, crawl space, or
            basement); whether the moisture source needs fixing — a
            roof valley, a plumbing failure, a sump, or grading and
            drainage correction — and not just the mold itself; how
            much old material must come out; and whether
            verification testing is included. A small attic patch and
            a pre-war basement found during a renovation are different
            jobs with different prices, and any quote that ignores the
            water source should be treated with suspicion.
          </p>
          <p className="disclaimer reveal">
            Ranges: published national market data plus metro-source
            ranges. Troy pricing is confirmed at your free
            inspection — no obligation, written quote.
          </p>
        </div>
      </section>

      {/* 7 — Where we work in Troy */}
      <section className="block alt" aria-labelledby="areas-h">
        <div className="wrap">
          <span className="eyebrow reveal">Troy Neighborhoods</span>
          <h2 id="areas-h" className="reveal">
            Areas We Serve in Troy
          </h2>
          <p className="lede reveal">
            We serve homes across Troy — Downtown Troy and the
            downtown square, North Market Street and the Troy High
            School area, Cheshire Rd / Dorset Rd, Armand Dr / McKaig
            Ave, Red Cedar Dr, Drury Ln / Ridge Ave, the Morgan Ditch
            north end, and Staunton, along the I-75 corridor alike.
            Serving the wider Dayton area from our{" "}
            <Link href="/ohio/dayton/">Dayton hub →</Link>
          </p>
        </div>
      </section>

      {/* 8 — FAQ */}
      <section className="block" aria-labelledby="faq-h">
        <div className="wrap">
          <span className="eyebrow reveal">Troy Questions</span>
          <h2 id="faq-h" className="reveal">
            Troy Mold Questions, Answered
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
        title="Free Mold Inspection in Troy"
        sub="No obligation. We'll find the mold, scope the job, and give you a written quote — free."
      />
    </>
  );
}
