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
 * PIQUA TOWN PAGE — /ohio/dayton/piqua/
 * Eighth bespoke town page of the Dayton pilot (2026-10-28). A static route
 * here takes precedence over the generic app/[state]/[city]/[page] town
 * template, because this page carries Piqua-only research, the locked
 * title/H1 formula, and pack-built FAQs that the generic template cannot
 * express.
 *
 * Every local fact below comes from town-research/piqua-oh-research.md
 * (researched 2026-10-28). Anything that pack flagged UNVERIFIED is
 * deliberately absent: no Piqua-city tornado touchdown is claimed (the
 * May 24, 2017 EF1 was 5 miles southeast on Deweese Road; the June 8,
 * 2022 EF2 was West Milton → Tipp City → Casstown; the April 1, 2023
 * EF0 was Laura → Troy; the April 1, 2023 tornado warning listing
 * Piqua was radar-indicated only, not a touchdown); no Piqua
 * city-level First Street/FEMA flood property count (the First Street
 * Piqua page is gated and returned no data); no single merged
 * median-build figure (1953 point2homes headline; 1954 Neilsberg
 * occupied-units cut; 1960 BestNeighborhood block-group cut — never
 * averaged), vacancy rate, median age, or income/value figure; no
 * HomeFacts older-vintage decade shares as current figures; no
 * "risen from the ashes" etymology as settled fact (local lore only);
 * no Miami County rank claim; no "Atomic City" detail beyond the
 * 1962–1966 municipally-owned nuclear plant; no Piqua mold rate, radon
 * level, groundwater measurement, or "most common" problem claim; no
 * invented review, rating, address, price, customer, or job story; no
 * Census Reporter values (the direct API fetch failed in the research
 * pass). Cost figures are published market ranges, labeled as such.
 * ZIP codes are omitted. No current flood claim is made: the 1913
 * flood is history, and the levee system is its sequel.
 */

export const revalidate = 3600;

const URL = `${siteConfig.siteUrl}/ohio/dayton/piqua/`;

export const metadata: Metadata = {
  // `absolute` bypasses the layout's `%s | MoldShield` template so the
  // rendered title matches the locked formula exactly.
  title: {
    absolute:
      "Mold Removal Company in Piqua, OH | Piqua Mold Remediation — Costs & Booking",
  },
  description:
    "Mold removal company in Piqua, OH: the oldest town in our service area — median build 1953, 77.0% of homes built before 1980, 36.4% pre-1939 — and the town of the 1913 flood's deadliest day, 44 lives lost in Shawnee. Piqua was built on the river, drowned by the river, and rebuilt against it. Attic, basement, crawl space and black mold remediation with free inspections and transparent market pricing.",
  alternates: { canonical: URL },
};

const FAQS: { q: string; aHtml: string }[] = [
  {
    q: "Our house was built before 1940 — is that why this keeps coming back?",
    aHtml:
      "That is the Piqua-first question, and the numbers back it: 36.4% of Piqua homes were built in 1939 or earlier — the largest pre-war core in our service area — and the median Piqua home was built in 1953, the oldest median build year in our service area. Age is the mechanism, not a diagnosis: original pipes, roofs, and basement walls at end of life. A pre-war basement that has been damp for decades, or a 1950s plumbing stack at end of life, will keep regrowing mold until the water source is found — so the fix has to find the water, not just clean the spot.",
  },
  {
    q: "Does Piqua flood? Should I worry about the river?",
    aHtml:
      "Plainly: the Great Miami drowned Shawnee in March 1913 — 44 people died in Piqua, the highest single-town death toll in the flood's Miami Valley story — and the town has lived behind Miami Conservancy District levees (finished 1922) with Lockington Dam upstream ever since. The river is history and a water-table neighbor, not a current flood claim. The real risk in most Piqua houses is roof, grading, sump, and plumbing water. Check the specific address.",
  },
  {
    q: "We live in Shawnee / Rossville — does the old flood matter for my basement?",
    aHtml:
      "It matters as mechanism, not as a verdict on your house. Shawnee, on the east bank, is the neighborhood the 1913 flood erased to its foundations under as much as 24 feet of water, and the river bend is why the water table matters here — but a moisture reading decides the individual house, not the neighborhood's history. Rossville, on the northeast side of the river off North County Road 25-A, carries its own history as the first local African-American settlement, from the Randolph freed slaves of 1833. Either way, the inspection starts with a reading, not a story.",
  },
  {
    q: "Our house is in the historic district — does that change the job?",
    aHtml:
      "The inspection is targeted — moisture readings and a written scope — not a tear-out. That matters in Piqua because the Piqua-Caldwell Historic District holds 256 buildings on the National Register (1985), with a median build year of 1942, and downtown's 23-block National Register section is the old core. Old fabric is worked around, not demolished on day one. No preservation rule is claimed; the scope says what comes out and what stays.",
  },
  {
    q: "How much does mold removal cost in Piqua?",
    aHtml:
      "The published market framing is $10–$25 per square foot for professional remediation, with metro sources also quoting $500 to $10,000+ by job type and location. Those are market ranges, not a quote for your home — and in Piqua the cost door matters more than anywhere else in our service area, because the median owner-occupied value here is $138,600, the lowest in our service area. Your free inspection produces the exact written price for your house, once the affected area, the location, and the moisture source are known.",
  },
  {
    q: "Do I need mold testing before removal?",
    aHtml:
      "Visible growth means remediate; smell with no visible source, a real-estate deal, or a doctor's order means test first. In Piqua that distinction matters because so much growth sits in pre-war basements, behind old walls, or in an attic fed by a slow roof leak — testing and moisture mapping find the source, so remediation removes the mold and fixes the water that fed it, instead of just cleaning what is visible.",
  },
  {
    q: "I rent — the leak is the landlord's, but the mold is in my home. What do I do?",
    aHtml:
      "Document the leak and the growth, tell the landlord in writing, and get an inspection scope you can hand over. Piqua's renter share is 34.6% — among the highest in our service area — so this is a full-sentence Piqua question, not a footnote. We give no legal advice; the inspection gives you a written, professional scope to put in front of the landlord.",
  },
];

export default function PiquaPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            serviceName: "Mold Removal in Piqua, OH",
            description:
              "Mold remediation in Piqua, Ohio — attic, basement, crawl space and black mold, with free inspections and transparent market pricing.",
            url: URL,
            areaServed: ["Piqua", "Dayton", "Ohio"],
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
          { name: "Piqua" },
        ]}
      />

      <HubHero
        h1="Mold Remediation in Piqua, OH — Local Crew, Up-Front Prices"
        answer="Piqua was built on the river, drowned by the river, and rebuilt against it — and its houses are old enough to remember all three. Surveyed in 1807 as Washington, renamed Piqua in 1816, incorporated in 1823, this is the oldest town in our service area: median build 1953, 77.0% of homes built before 1980, and the 1913 flood's deadliest day, when 44 people died in Shawnee. We remediate attic, basement, crawl space, and black mold across Piqua with free inspections, transparent market pricing, and photo-documented work."
      />

      {/* Piqua by the numbers */}
      <section className="trust-strip block" aria-label="Piqua mold facts">
        <div className="wrap">
          <div className="stat-row">
            <div className="stat reveal">
              <div className="num">20,354</div>
              <div className="lbl">residents at the 2020 census</div>
              <div className="src">Source: Census QuickFacts</div>
            </div>
            <div className="stat reveal" data-delay="1">
              <div className="num">77.0%</div>
              <div className="lbl">of Piqua homes built before 1980</div>
              <div className="src">
                Source: point2homes decade-built table
              </div>
            </div>
            <div className="stat reveal" data-delay="2">
              <div className="num">1953</div>
              <div className="lbl">
                median construction year of a Piqua home — the
                oldest in our service area
              </div>
              <div className="src">Source: point2homes</div>
            </div>
            <div className="stat reveal" data-delay="3">
              <div className="num">36.4%</div>
              <div className="lbl">
                of Piqua homes built in 1939 or earlier — the
                largest pre-war core in our service area
              </div>
              <div className="src">Source: point2homes</div>
            </div>
          </div>
        </div>
      </section>

      {/* 1 — The river town that remembers */}
      <section className="block" aria-labelledby="river-h">
        <div className="wrap">
          <span className="eyebrow reveal">Piqua, Ohio</span>
          <h2 id="river-h" className="reveal">
            The River Town That Remembers
          </h2>
          <p className="lede reveal">
            Piqua is older than the town it lost the county seat to —
            and it remembers it. The land was entered by John Manning
            and Mathew Caldwell and formally surveyed by Armstrong
            Brandon in 1807, when the town had seven houses and was
            called Washington; the residents petitioned the legislature
            in 1816 to restore the old Indian name Piqua, and
            succeeded. The village was incorporated in 1823. The name
            reaches back further, to 1747: Fort Pickawillany, a Miami
            village and British trading post, stood about a mile
            northeast of the present city where the Great Miami meets
            Loramie Creek, ground the Johnston Farm &amp; Indian
            Agency preserves today.
          </p>
          <p className="reveal">
            Two neighborhoods carry real history, not just names.
            Rossville, since incorporated into Piqua, was the first
            local African-American settlement after the Randolph slaves
            were freed on John Randolph&apos;s death in 1833, on the
            northeast side of the river off North County Road 25-A.
            Shawnee, on the east bank, is the neighborhood the 1913
            flood erased to its foundations. And Piqua works: Hartzell
            Propeller and French Oil Mill Machinery anchor a
            manufacturing base, and the town sits north of Dayton on
            I-75 — about 27 miles up the river from the city it once
            rivaled.
          </p>
          <QaCallout q="Why does a town's memory matter for mold?">
            Because the town&apos;s age is written into its houses. A
            town surveyed in 1807 has a historic district with a
            median build year of 1942, a pre-war core of 36.4%, and a
            river bend that has flooded it nine times before 1913.{" "}
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

      {/* 2 — The pilot's oldest housing */}
      <section className="block alt" aria-labelledby="stock-h">
        <div className="wrap">
          <span className="eyebrow reveal">The Housing Stock</span>
          <h2 id="stock-h" className="reveal">
            The Pilot&apos;s Oldest Town — Not Aging Into Failure,
            Old for a Generation
          </h2>
          <p className="lede reveal">
            Piqua has the oldest median build year in our service area (1953)
            — older than Kettering (1961), Fairborn (1970), and Troy
            (1972) — and its pre-war core is the largest in our service area:
            36.4% of homes predate 1939, against Troy&apos;s 15.7% and
            Springboro&apos;s 2.6%. In total, 77.0% of homes were built
            before 1980 (7,174 of 9,311), second only to Kettering&apos;s
            85.5% — but with a much older center of gravity: 46.4%
            predate 1950. And almost nothing is new: only 7.7% of homes
            were built after 1999.
          </p>
          <p className="reveal">
            Piqua is not aging into its first failures the way
            Springboro is — it has been old for a generation. The
            discovery moment here is not a 1990s roof; it is a pre-war
            basement that has been damp for decades, a 1950s plumbing
            stack at end of life, or a historic-district house whose
            walls have seen a century of seasons. The geography of age
            is honest and usable: newer construction is concentrated
            in the northeast, and the center holds the oldest housing.
            The northeast&apos;s newer houses are the exception, not
            the story. That mechanism is labeled as mechanism, not a
            measured rate: no Piqua mold rate was verified.
          </p>
        </div>
      </section>

      {/* 3 — The 1913 flood, the pilot's deadliest */}
      <section className="block" aria-labelledby="flood-h">
        <div className="wrap">
          <span className="eyebrow reveal">The River Story</span>
          <h2 id="flood-h" className="reveal">
            The Pilot&apos;s Deadliest Flood — and the Levee Sequel
          </h2>
          <p className="lede reveal">
            March 22–25, 1913: rain fell steadily all weekend, then in
            torrents on Monday. A levee in the northeast part of town
            broke despite repeated mending, and water surged through
            downtown and the eastern sections. On Tuesday March 25 the
            river reached 108 inches and destroyed hundreds of homes
            and businesses. In Shawnee, on the east bank, as much as 24
            feet of water ran through the neighborhood, leaving entire
            blocks as foundations only; houses were dislodged and
            carried into the river with their occupants riding along,
            and men at a bridge pulled nearly a dozen people off the
            rushing homes and debris.
          </p>
          <p className="reveal">
            Forty-four people died in Piqua — the highest single-town
            death toll in the flood&apos;s Miami Valley story, and the
            deadliest flood fact in our service area. Most of the town was on
            the west side; Shawnee, completely submerged, is where most
            of the deaths occurred. The river&apos;s discharge hit
            70,000 cubic feet per second against a channel capacity of
            25,000 — roughly a 1-in-500 event. This was not Piqua&apos;s
            first flood: the river flooded Piqua nine times between
            1805 and 1905, and after the 1898 record of 41 inches the
            levees were repaired but not enlarged, leaving the town
            unprepared. The sequel: Miami Conservancy District levees
            and dams built from 1917, Piqua&apos;s levees finished in
            1922 with dirt dredged from the channel, Lockington Dam
            just north of town regulating Loramie Creek — and downtown
            buildings still carrying historical markers showing the
            high point of the 1913 waters. Flood refugees were
            sustained at the Fort Piqua Hotel&apos;s fourth-floor
            restaurant, and the hotel — built 1890–91, now the public
            library, rededicated October 19, 2008 — never closed during
            the flood despite a flooded basement and first floor. The
            flood story is history and a water-table neighbor, not a
            current flood claim: basement water in Piqua today is the
            ordinary kind — grading, sump, plumbing, and the
            river&apos;s high water table near the bend — stated as
            mechanism, not a measured rate.
          </p>
        </div>
      </section>

      {/* 4 — No Piqua tornado, and the page says so */}
      <section className="block alt" aria-labelledby="storm-h">
        <div className="wrap">
          <span className="eyebrow reveal">The Storm Story</span>
          <h2 id="storm-h" className="reveal">
            No Piqua Tornado — and This Page Does Not Borrow One
          </h2>
          <p className="lede reveal">
            No Piqua-city tornado touchdown was confirmed in the
            research pass, and we do not invent one. The
            nearest confirmed tornado is the May 24, 2017 EF1, five
            miles southeast of Piqua along Deweese Road — 90 mph, a
            0.35-mile path, maple trees snapped and a barn moved off
            its foundation — near, not in. The other Miami County
            tornadoes in the record are all metro context: the June 8,
            2022 EF2 from West Milton through Tipp City to Casstown;
            the April 1, 2023 EF0 from Laura through Troy&apos;s north
            side (the same night&apos;s tornado warning listed Piqua
            on radar indication only — a warning is not a touchdown);
            and the May 27, 2019 EF3 from Riverside to Xenia Township.
          </p>
          <p className="reveal">
            Piqua&apos;s storm credential is the river, not the sky —
            a deliberate honesty differentiator against Troy, which
            has two city tornadoes to tell. Wind-lifted shingles and
            slow roof leaks are still a real mechanism in Piqua, stated
            generally and without a borrowed tornado date. Piqua&apos;s
            own recorded storm wind in the pass is ordinary: an
            October 31, 2013 thunderstorm wind, 50 knots estimated,
            $1,000 in damage. The page&apos;s honesty is that it says
            so, plainly.
          </p>
        </div>
      </section>

      {/* 5 — Service sections, localized */}
      <section className="block alt" aria-labelledby="services-h">
        <div className="wrap">
          <span className="eyebrow reveal">Services in Piqua</span>
          <h2 id="services-h" className="reveal">
            Every Mold Service, Localized to Piqua
          </h2>
          <p className="lede reveal">
            Same certified protocol on every job: containment, removal,
            treatment, moisture fix, verification. Each service below is
            shaped by what Piqua homes actually present.
          </p>

          <h3 className="reveal" style={{ marginTop: 32 }}>
            Attic Mold Remediation in Piqua
          </h3>
          <p className="reveal">
            Piqua attics carry the old-roof story: pre-war and 1950s
            rooflines in the historic district and the old center,
            with flashing and valleys at end of life, feeding
            sheathing mold for years unseen. We remove the growth with
            HEPA-filtered equipment, treat the surface, and fix the
            cause — roof-leak repair, ventilation, and air sealing — so
            it does not return with the next storm.{" "}
            <Link className="more" href="/ohio/dayton/attic-mold-removal/">
              Attic mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Crawl Space Mold Remediation in Piqua
          </h3>
          <p className="reveal">
            River-bend crawl spaces near the Great Miami live with a
            high water table, and humid summers keep them damp for
            months. We remediate the mold, then address the moisture
            with encapsulation, drainage correction, and
            dehumidification — because a crawl space that stays damp
            will simply regrow what was removed.{" "}
            <Link
              className="more"
              href="/ohio/dayton/crawl-space-mold-removal/"
            >
              Crawl space mold remediation in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Basement Mold Remediation in Piqua
          </h3>
          <p className="reveal">
            This is Piqua&apos;s signature job: pre-war and 1950s
            basements in the center of town, where the first leak — a
            roof valley, a plumbing stack at end of life, a sump that
            quit, or river-valley groundwater — has had decades to
            work. Basement work here starts with the water — plumbing
            condition, seepage entry points, and sump and drainage
            condition — then containment, removal, treatment, and a
            moisture fix that matches the source.{" "}
            <Link className="more" href="/ohio/dayton/basement-mold-removal/">
              Basement mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Black Mold Remediation in Piqua
          </h3>
          <p className="reveal">
            Stachybotrys chartarum — the mold behind the health scares —
            thrives on the same chronically wet drywall and cellulose
            materials that Piqua&apos;s old basements provide. We work
            under certified containment with negative-air pressure,
            remove the affected material, and verify clearance before
            the space goes back into use. If a Piqua home has visible
            black growth, keep children and anyone with breathing
            trouble out of the room until it is assessed.{" "}
            <Link className="more" href="/ohio/dayton/black-mold-removal/">
              Black mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Mold Inspection &amp; Testing in Piqua
          </h3>
          <p className="reveal">
            Not sure it is mold? In a town where growth sits in
            pre-war basements, behind old walls, or in an attic fed by
            a slow roof leak, uncertainty is the normal starting point.
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
            What Mold Remediation Costs in Piqua
          </h2>
          <p className="lede reveal">
            These are published market ranges — not our prices. Your
            free inspection produces the exact written quote for your
            home. The market consensus across national pricing sources is
            $10–$25 per square foot for professional remediation, with
            metro sources also quoting $500 to $10,000+ by job type and
            location. In Piqua the cost door matters more than anywhere
            else in our service area: the median owner-occupied value here is
            $138,600, the lowest in our service area — so the range leads, the
            written scope follows, and the promise is &ldquo;find the
            water first.&rdquo;
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
            What moves the price in a Piqua home: the affected area
            in square feet; the location (attic, crawl space, or
            basement); whether the moisture source needs fixing — a
            roof valley, a plumbing stack, a sump, or grading and
            drainage correction — and not just the mold itself; how
            much old material must come out; and whether
            verification testing is included. A small attic patch and
            a pre-war basement found during a renovation are different
            jobs with different prices, and any quote that ignores the
            water source should be treated with suspicion.
          </p>
          <p className="disclaimer reveal">
            Ranges: published national market data plus metro-source
            ranges. Piqua pricing is confirmed at your free
            inspection — no obligation, written quote.
          </p>
        </div>
      </section>

      {/* 7 — Where we work in Piqua */}
      <section className="block alt" aria-labelledby="areas-h">
        <div className="wrap">
          <span className="eyebrow reveal">Piqua Neighborhoods</span>
          <h2 id="areas-h" className="reveal">
            Areas We Serve in Piqua
          </h2>
          <p className="lede reveal">
            We serve homes across Piqua — Downtown Piqua and Main
            Street, the Piqua-Caldwell Historic District, Shawnee on
            the east bank, Rossville on the northeast side of the
            river, Water and Main Streets, and the northeast newer
            edge, along the I-75 corridor alike. Serving the wider
            Dayton area from our{" "}
            <Link href="/ohio/dayton/">Dayton hub →</Link>
          </p>
        </div>
      </section>

      {/* 8 — FAQ */}
      <section className="block" aria-labelledby="faq-h">
        <div className="wrap">
          <span className="eyebrow reveal">Piqua Questions</span>
          <h2 id="faq-h" className="reveal">
            Piqua Mold Questions, Answered
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
        title="Free Mold Inspection in Piqua"
        sub="No obligation. We'll find the mold, scope the job, and give you a written quote — free."
      />
    </>
  );
}
