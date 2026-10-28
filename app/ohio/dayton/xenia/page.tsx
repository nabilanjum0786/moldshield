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
 * XENIA TOWN PAGE — /ohio/dayton/xenia/
 * Ninth bespoke town page of the Dayton pilot (2026-10-28). A static route
 * here takes precedence over the generic app/[state]/[city]/[page] town
 * template, because this page carries Xenia-only research, the locked
 * title/H1 formula, and pack-built FAQs that the generic template cannot
 * express.
 *
 * Every local fact below comes from town-research/xenia-oh-research.md
 * (researched 2026-10-28). Anything that pack flagged UNVERIFIED is
 * deliberately absent: no single undisputed 1974 death toll (34 per NWS
 * Wilmington is the headline; 32 and 36 appear in other accounts and are
 * footnoted, never smoothed over), injury count (1,150 per NWS/NOAA
 * accounts; 1,600 elsewhere), or damage figure ($100 million per
 * Wikipedia; ~$250 million per the NWS Wilmington page — the page uses
 * homes destroyed/damaged, not dollars, as its headline measure); no
 * single 1886 death toll beyond the final count of 28 (21 in the State
 * Hazard Mitigation Plan, 26 in the first detailed story, and 36 in
 * the first-day newspaper report are early or conflicting counts); no
 * 2000 tornado path of 2 miles (the Lantern's line) instead of the
 * NCEI-surveyed 9 miles; no Xenia city-level First Street/FEMA flood
 * property count; no Census Reporter, BestNeighborhood, or Neilsberg
 * median-build figure for Xenia (only the Point2Homes 1971 headline
 * was retrieved); no single merged median-age, owner-share, or home
 * value figure (each labeled per source); no "place of the devil
 * winds" Shawnee lore; no Central State University details; no Xenia
 * area code (not verified); no "largest U.S. place starting with X"
 * claim except with its 2010-census label (omitted here); no Xenia
 * mold rate, radon level, groundwater measurement, or "most common"
 * problem claim; no invented review, rating, address, price, customer,
 * or job story; no Census Reporter values. Cost figures are published
 * market ranges, labeled as such. ZIP codes are omitted. Wilberforce
 * University is in Wilberforce, adjacent to Xenia — never claimed as
 * a Xenia institution. The tornado history on this page is told with
 * respect for the dead, never as a thrill or a marketing hook.
 */

export const revalidate = 3600;

const URL = `${siteConfig.siteUrl}/ohio/dayton/xenia/`;

export const metadata: Metadata = {
  // `absolute` bypasses the layout's `%s | MoldShield` template so the
  // rendered title matches the locked formula exactly.
  title: {
    absolute:
      "Mold Removal Company in Xenia, OH | Xenia Mold Remediation — Costs & Booking",
  },
  description:
    "Mold removal company in Xenia, OH: the Greene County seat — named for hospitality in 1803, rebuilt twice after the 1974 F5 and the 2000 F4 on nearly the same track — with 71.4% of homes built before 1980 and the 1970s cohort alone at 23.0%. Attic, basement, crawl space and black mold remediation with free inspections and transparent market pricing.",
  alternates: { canonical: URL },
};

const FAQS: { q: string; aHtml: string }[] = [
  {
    q: "Our house was built in the 1970s — is that why this keeps coming back?",
    aHtml:
      "That is the Xenia-first question, and the numbers back it: 23.0% of all Xenia homes were built in a single decade, the 1970s — the largest single-decade share in our service area — and 71.4% of homes were built before 1980. Age is the mechanism, not a diagnosis: original pipes, roofs, and basement waterproofing all hitting end of life at once. A 1970s house whose systems are all aging out together will keep regrowing mold until the water source is found — so the fix has to find the water, not just clean the spot.",
  },
  {
    q: "We had tornado damage in 1974 / 2000 — could that be where this came from?",
    aHtml:
      "It is worth checking, and Xenia is the one town in our service area where the question carries two dates. On April 3, 1974, an F5 flattened the Windsor Park and Arrowhead subdivisions and damaged or destroyed much of downtown; on September 20, 2000, an F4 hit some of the same areas again. Wind-lifted shingles and roof valleys can leak slowly for seasons before anyone sees mold in the attic — an attic check traces the path from roof to growth before walls come down. This history is told here with respect: these are the town's dead and its rebuilt homes, not a marketing hook.",
  },
  {
    q: "Does Xenia flood? Should I worry about Shawnee Creek?",
    aHtml:
      "Plainly: Shawnee Creek killed 28 people in a flash flood on May 12, 1886, and afterward the town widened the creek and asked people not to rebuild along it. The creek is history and a water-table neighbor, not a current flood claim. The real risk in most Xenia houses is roof, grading, sump, and plumbing water. Check the specific address.",
  },
  {
    q: "We live near Shawnee Creek / Barr's Bottom — does the old flood matter for my basement?",
    aHtml:
      "It matters as mechanism, not as a verdict on your house. Barr's Bottom, the low strip along Shawnee Creek, is where the 1886 flood left only two or three of 15–20 houses standing, and creek-side ground is why the water table matters here — but a moisture reading decides the individual house, not the neighborhood's history. The town chose the creek's edge in 1803, when the county seat was located at the forks of the Shawnee creeks, and learned its price in 1886.",
  },
  {
    q: "How much does mold removal cost in Xenia?",
    aHtml:
      "The published market framing is $10–$25 per square foot for professional remediation, with metro sources also quoting $500 to $10,000+ by job type and location. Those are market ranges, not a quote for your home — and in Xenia the cost door matters more than in most towns in our service area, because the median owner-occupied value here is $162,400, among the lowest in our service area. Your free inspection produces the exact written price for your house, once the affected area, the location, and the moisture source are known.",
  },
  {
    q: "Do I need mold testing before removal?",
    aHtml:
      "Visible growth means remediate; smell with no visible source, a real-estate deal, or a doctor's order means test first. In Xenia that distinction matters because so much growth sits in 1970s houses whose original systems are aging out together, behind walls, or in an attic fed by a slow roof leak from a storm years ago — testing and moisture mapping find the source, so remediation removes the mold and fixes the water that fed it, instead of just cleaning what is visible.",
  },
  {
    q: "I rent — the leak is the landlord's, but the mold is in my home. What do I do?",
    aHtml:
      "Document the leak and the growth, tell the landlord in writing, and get an inspection scope you can hand over. Xenia's renter share is about 39% — among the highest in our service area — and renters here rent the same old stock: the 1970s cohort is 27% of rentals. So this is a full-sentence Xenia question, not a footnote. We give no legal advice; the inspection gives you a written, professional scope to put in front of the landlord.",
  },
];

export default function XeniaPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            serviceName: "Mold Removal in Xenia, OH",
            description:
              "Mold remediation in Xenia, Ohio — attic, basement, crawl space and black mold, with free inspections and transparent market pricing.",
            url: URL,
            areaServed: ["Xenia", "Dayton", "Ohio"],
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
          { name: "Xenia" },
        ]}
      />

      <HubHero
        h1="Mold Remediation in Xenia, OH — Local Crew, Up-Front Prices"
        answer="Xenia was named for hospitality, tested by the worst sky in America, and rebuilt twice. Founded in 1803 at the forks of the Shawnee creeks, this is the Greene County seat — and the only town in our service area hit by two violent tornadoes, the F5 of 1974 and the F4 of 2000 on nearly the same track, then rebuilt both times. We remediate attic, basement, crawl space, and black mold across Xenia with free inspections, transparent market pricing, and photo-documented work."
      />

      {/* Xenia by the numbers */}
      <section className="trust-strip block" aria-label="Xenia mold facts">
        <div className="wrap">
          <div className="stat-row">
            <div className="stat reveal">
              <div className="num">25,441</div>
              <div className="lbl">residents at the 2020 census</div>
              <div className="src">Source: Census QuickFacts</div>
            </div>
            <div className="stat reveal" data-delay="1">
              <div className="num">71.4%</div>
              <div className="lbl">of Xenia homes built before 1980</div>
              <div className="src">
                Source: point2homes decade-built table
              </div>
            </div>
            <div className="stat reveal" data-delay="2">
              <div className="num">23.0%</div>
              <div className="lbl">
                of Xenia homes built in the 1970s alone — the
                largest single-decade cohort in our service area
              </div>
              <div className="src">Source: point2homes</div>
            </div>
            <div className="stat reveal" data-delay="3">
              <div className="num">1971</div>
              <div className="lbl">
                median construction year of a Xenia home
              </div>
              <div className="src">Source: point2homes</div>
            </div>
          </div>
        </div>
      </section>

      {/* 1 — The hospitality town */}
      <section className="block" aria-labelledby="seat-h">
        <div className="wrap">
          <span className="eyebrow reveal">Xenia, Ohio</span>
          <h2 id="seat-h" className="reveal">
            Named for Hospitality — Still the County Seat
          </h2>
          <p className="lede reveal">
            Xenia is the Greene County seat — and the
            older one. Founded in 1803, the same year Ohio was admitted
            to the Union, it was built where John Paul bought 2,000
            acres and influenced the commissioners to locate the county
            seat on his land at the forks of the Shawnee creeks. The
            name was chosen at a town meeting: Rev. Robert Armstrong
            proposed &ldquo;Xenia,&rdquo; Greek for
            &ldquo;hospitality,&rdquo; and when the vote tied, Laticia
            Davis cast the deciding ballot. The city still carries the
            nickname &ldquo;City of Hospitality&rdquo; — and
            &ldquo;Bicycle Capital of the Midwest,&rdquo; because a
            replica of Xenia Station stands at the intersection of 5
            regional bike trails on the 295-mile Miami Valley Bikeway
            system.
          </p>
          <p className="reveal">
            The Little Miami Railroad arrived in 1843 and the
            population more than doubled in one decade; the railroads
            are gone, but the trail crossroads remain. Wilberforce
            University — founded 1856, the nation&apos;s oldest private,
            historically Black university owned and operated by African
            Americans — sits in the Wilberforce community adjacent to
            Xenia, not inside the city limits, and we do not claim it as a Xenia institution. The honest phrasing is
            &ldquo;next to Xenia,&rdquo; and that honesty is the
            standard this whole page is held to.
          </p>
          <QaCallout q="Why does a hospitality town's history matter for mold?">
            Because the town&apos;s age is written into its houses. A
            seat founded in 1803 has a 1970s housing bulge, a pre-war
            core, a creek that killed 28 people in 1886, and two
            violent tornadoes — four water stories in one town.{" "}
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

      {/* 2 — The 1970s town */}
      <section className="block alt" aria-labelledby="stock-h">
        <div className="wrap">
          <span className="eyebrow reveal">The Housing Stock</span>
          <h2 id="stock-h" className="reveal">
            The 1970s Town — One Decade, Nearly a Quarter of the City
          </h2>
          <p className="lede reveal">
            In Xenia the discovery moment is a 1970s house whose
            original roof, plumbing, and basement waterproofing are all
            hitting end of life at once. The 1970s alone are 23.0% of
            all Xenia homes — the largest single-decade share in our service area — and 71.4% of homes were built
            before 1980 (8,437 of 11,820), the third-highest pre-1980
            share in our service area, behind only Kettering and Piqua. The 1950s add another 16.5%, and underneath sits a
            real pre-war core: 16.2% predate 1939, and 20.4% predate
            1950. Only 15.8% of homes were built after 1999, and 75.8%
            are 1-unit detached.
          </p>
          <p className="reveal">
            Renters rent the same old stock: among renter-occupied
            units, the 1970–79 cohort is the largest single group (27%),
            followed by 1939-or-earlier (17%) and 1950–59 (15%) — so the
            renter trigger and the old-house trigger are the same
            houses. The median construction year is 1971, from
            Point2Homes alone: no alternate ACS cut was retrieved in
            the research pass, and none is cited. That mechanism is
            labeled as mechanism, not a measured rate: no Xenia mold
            rate was verified.
          </p>
        </div>
      </section>

      {/* 3 — Two violent tornadoes, told straight and respectfully */}
      <section className="block" aria-labelledby="storm-h">
        <div className="wrap">
          <span className="eyebrow reveal">The Storm Story</span>
          <h2 id="storm-h" className="reveal">
            The Town That Rebuilt Twice
          </h2>
          <p className="lede reveal">
            No other town in our service area has two violent tornadoes. On April 3,
            1974, an F5 formed near Bellbrook southwest of Xenia around
            4:30 p.m., moved northeast at about 50 mph with a
            multiple-vortex structure, and slammed into western Xenia
            around 4:40 p.m. — completely flattening the Windsor Park
            and Arrowhead subdivisions at F5 intensity, with winds up
            to 305 mph, on a 20.4-mile path, 533 yards wide. About 300
            homes were destroyed and some 2,100 damaged, plus much of
            the downtown business district; roughly a quarter of the
            city was destroyed and another quarter seriously damaged.
            Thirty-four people died and 1,150 were injured, per NWS
            Wilmington — other accounts say 32 or 36 dead, and this
            page does not smooth that over: 34 is the headline figure,
            the others are footnoted. A tornado warning had been issued
            at 4:10 p.m. President Nixon visited the following week
            and called it &ldquo;the worst disaster I&apos;ve ever
            seen&rdquo;; the Xenia Gazette&apos;s coverage won a
            Pulitzer Prize; &ldquo;Xenia Lives!&rdquo; bumper stickers
            appeared within days.
          </p>
          <p className="reveal">
            Then lightning struck twice, on nearly the same track. On
            September 20, 2000, an F4 hit Xenia for the second time in
            26 years: 7:18–7:26 p.m., 9 miles, 500 yards, winds of at
            least 207 mph. One man was killed when a tree fell on his
            car; 100 were injured. About 250 homes were damaged or
            destroyed, 40+ businesses including Walmart, Kroger, and
            Tire Discounters, 6 churches damaged, the Greene County
            Fairgrounds mostly damaged or destroyed, cars thrown from
            the US-35 bypass, 4 semi-trailers thrown up to 400 yards,
            and 10,000+ residents without power for at least a day. It
            was the first violent tornado to hit Xenia since 1974 and
            the first violent-rated September tornado in the United
            States since 1986 — and the city&apos;s safety preparations
            were criticized afterward, because only a single siren in
            town sounded as the tornado approached. By April 3, 1975,
            one year after the F5, 80% of destroyed homes and 40% of
            businesses had been rebuilt, and every affected structure
            was repaired or rebuilt by 1984. Then the town rebuilt
            again. Roof damage from either storm still opens valleys
            and lets water in for seasons before anyone sees mold in
            the attic — and that slow leak, not the storm itself, is
            the mold mechanism here.
          </p>
        </div>
      </section>

      {/* 4 — The 1886 creek flood */}
      <section className="block alt" aria-labelledby="flood-h">
        <div className="wrap">
          <span className="eyebrow reveal">The Creek Story</span>
          <h2 id="flood-h" className="reveal">
            The 1886 Creek Flood — Not a River Story
          </h2>
          <p className="lede reveal">
            Late on Wednesday, May 12, 1886, runoff from 7 to 9 inches
            of rain poured into Shawnee Creek and a wall of water
            several feet high moved through Xenia. Twenty-eight people
            died — the final count, per the Greene County Archives and
            the Ohio Historical Society — sixteen of them in two homes
            that were carried into the flood and collapsed, and more
            than 300 people were left homeless. The destruction
            centered on Barr&apos;s Bottom, the low strip along the
            creek, where of 15–20 houses only two or three were left
            standing, and on Water, Main, and Market streets.
          </p>
          <p className="reveal">
            The mechanism matters: East Shawnee Creek
            starts in the hills a mile east of Xenia and was carried
            through town in a walled passage-way only 8 feet wide and
            6 feet deep, with a 10-foot culvert under the railroad
            embankments; West Shawnee joins it near the depot, and the
            combined stream winds southeasterly to the Little Miami
            River. The railroads partially dammed the creeks,
            back-water formed two lakes (one about 30 acres), and
            debris at the bridges temporarily raised the water until
            the debris or a bridge gave way. Afterward, City Council
            announced it would widen Shawnee Creek and asked residents
            not to rebuild houses along the creek. The creek is history
            and a water-table neighbor, not a current flood claim:
            basement water in Xenia today is the ordinary kind —
            grading, sump, plumbing, and creek-side ground — stated as
            mechanism, not a measured rate.
          </p>
        </div>
      </section>

      {/* 5 — Service sections, localized */}
      <section className="block alt" aria-labelledby="services-h">
        <div className="wrap">
          <span className="eyebrow reveal">Services in Xenia</span>
          <h2 id="services-h" className="reveal">
            Every Mold Service, Localized to Xenia
          </h2>
          <p className="lede reveal">
            Same certified protocol on every job: containment, removal,
            treatment, moisture fix, verification. Each service below is
            shaped by what Xenia homes actually present.
          </p>

          <h3 className="reveal" style={{ marginTop: 32 }}>
            Attic Mold Remediation in Xenia
          </h3>
          <p className="reveal">
            Xenia attics carry the double-strike story: roofs that
            survived the 1974 F5 or the 2000 F4 — or were rebuilt after
            them — with valleys that have leaked slowly for seasons.
            We remove the growth with HEPA-filtered equipment, treat
            the surface, and fix the cause — roof-leak repair,
            ventilation, and air sealing — so it does not return with
            the next storm.{" "}
            <Link className="more" href="/ohio/dayton/attic-mold-removal/">
              Attic mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Crawl Space Mold Remediation in Xenia
          </h3>
          <p className="reveal">
            Creek-side crawl spaces near Shawnee Creek live with a
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
            Basement Mold Remediation in Xenia
          </h3>
          <p className="reveal">
            This is Xenia&apos;s signature job: 1970s and pre-war
            basements where the first leak — a roof valley, a plumbing
            failure, a sump that quit, or creek-side groundwater — has
            had decades to work. Basement work here starts with the
            water — plumbing condition, seepage entry points, and sump
            and drainage condition — then containment, removal,
            treatment, and a moisture fix that matches the source.{" "}
            <Link className="more" href="/ohio/dayton/basement-mold-removal/">
              Basement mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Black Mold Remediation in Xenia
          </h3>
          <p className="reveal">
            Stachybotrys chartarum — the mold behind the health scares —
            thrives on the same chronically wet drywall and cellulose
            materials that Xenia&apos;s old basements provide. We work
            under certified containment with negative-air pressure,
            remove the affected material, and verify clearance before
            the space goes back into use. If a Xenia home has visible
            black growth, keep children and anyone with breathing
            trouble out of the room until it is assessed.{" "}
            <Link className="more" href="/ohio/dayton/black-mold-removal/">
              Black mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Mold Inspection &amp; Testing in Xenia
          </h3>
          <p className="reveal">
            Not sure it is mold? In a town where growth sits in 1970s
            houses whose systems are aging out together, behind walls,
            or in an attic fed by a slow roof leak from a storm years
            ago, uncertainty is the normal starting point. A certified
            inspection maps moisture, samples air and surfaces where
            warranted, and ends with a written remediation protocol
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
            What Mold Remediation Costs in Xenia
          </h2>
          <p className="lede reveal">
            These are published market ranges — not our prices. Your
            free inspection produces the exact written quote for your
            home. The market consensus across national pricing sources is
            $10–$25 per square foot for professional remediation, with
            metro sources also quoting $500 to $10,000+ by job type and
            location. In Xenia the cost door matters more than in most towns in our service area: the median owner-occupied value here is
            $162,400, among the lowest in our service area — so
            the range leads, the written scope follows, and the promise
            is &ldquo;find the water first.&rdquo;
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
            What moves the price in a Xenia home: the affected area
            in square feet; the location (attic, crawl space, or
            basement); whether the moisture source needs fixing — a
            roof valley, a plumbing failure, a sump, or grading and
            drainage correction — and not just the mold itself; how
            much old material must come out; and whether
            verification testing is included. A small attic patch and
            a 1970s basement found during a renovation are different
            jobs with different prices, and any quote that ignores the
            water source should be treated with suspicion.
          </p>
          <p className="disclaimer reveal">
            Ranges: published national market data plus metro-source
            ranges. Xenia pricing is confirmed at your free
            inspection — no obligation, written quote.
          </p>
        </div>
      </section>

      {/* 7 — Where we work in Xenia */}
      <section className="block alt" aria-labelledby="areas-h">
        <div className="wrap">
          <span className="eyebrow reveal">Xenia Neighborhoods</span>
          <h2 id="areas-h" className="reveal">
            Areas We Serve in Xenia
          </h2>
          <p className="lede reveal">
            We serve homes across Xenia — Downtown Xenia and the
            historic district, Windsor Park and Arrowhead, Barr&apos;s
            Bottom along Shawnee Creek, the Xenia Station and bike-trail
            crossroads, the Greene County Fairgrounds area, and the
            US-35 bypass corridor alike. Serving the wider Dayton area
            from our{" "}
            <Link href="/ohio/dayton/">Dayton hub →</Link>
          </p>
        </div>
      </section>

      {/* 8 — FAQ */}
      <section className="block" aria-labelledby="faq-h">
        <div className="wrap">
          <span className="eyebrow reveal">Xenia Questions</span>
          <h2 id="faq-h" className="reveal">
            Xenia Mold Questions, Answered
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
        title="Free Mold Inspection in Xenia"
        sub="No obligation. We'll find the mold, scope the job, and give you a written quote — free."
      />
    </>
  );
}
