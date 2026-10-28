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
 * SIDNEY TOWN PAGE — /ohio/dayton/sidney/
 * Tenth and LAST bespoke town page of the Dayton pilot (2026-10-28). A
 * static route here takes precedence over the generic
 * app/[state]/[city]/[page] town template, because this page carries
 * Sidney-only research, the locked title/H1 formula, and pack-built FAQs
 * that the generic template cannot express.
 *
 * Every local fact below comes from town-research/sidney-oh-research.md
 * (researched 2026-10-28). Anything that pack flagged UNVERIFIED is
 * deliberately absent: no Sidney-specific 1913 flood death toll or
 * damage figure (the valley-wide 360 killed and $100M+ damages are
 * cited only as valley-wide); no MCD levee protection claimed for
 * Sidney (the Main District corridor is described as Piqua to
 * Hamilton, and the April 2025 activation lists floodgates in Piqua,
 * Troy, West Carrollton, Miamisburg, Middletown, and Hamilton — not
 * Sidney); no Sidney-city tornado touchdown (the April 11, 1965 F4
 * was Fort Loramie to northwest of Maplewood, north of Sidney; the
 * July 19, 2025 EF0 was near Anna/Montra; the May 25, 2006 event 5
 * miles south of Sidney was thunderstorm wind, not a tornado);
 * no HomeFacts 30-mile-radius tornado figures as Sidney-city figures;
 * no Sidney city-level First Street/FEMA flood property count; no
 * single merged median-build, median-age, owner/renter-share, vacancy,
 * median-value, median-rent, or population figure (each labeled per
 * source; headline median build 1971 from Point2Homes, headline
 * owner share 62.0% from Census QuickFacts, headline value $169,900
 * from QuickFacts); no AreaVibes modeled figures as headlines; no
 * Honda plant as a Sidney employer (the plant is in Anna, Shelby
 * County); no SEMCORP jobs as current employment (announced May 2022
 * only — planned figures, operating status unverified); no single
 * bare "founded" year merging the 1819 plat with the 1830s canal era;
 * no Sidney mold rate, radon level, groundwater measurement, or "most
 * common" problem claim; no invented review, rating, address, price,
 * customer, or job story; no Census Reporter values. Cost figures are
 * published market ranges, labeled as such. ZIP codes are omitted.
 * The donor's surname is spelled Sterrett, Starrett, and Starett
 * across sources; this page uses "Charles Sterrett" anchored to the
 * 1881 county history.
 */

export const revalidate = 3600;

const URL = `${siteConfig.siteUrl}/ohio/dayton/sidney/`;

export const metadata: Metadata = {
  // `absolute` bypasses the layout's `%s | MoldShield` template so the
  // rendered title matches the locked formula exactly.
  title: {
    absolute:
      "Mold Removal Company in Sidney, OH | Sidney Mold Remediation — Costs & Booking",
  },
  description:
    "Mold removal company in Sidney, OH: the Shelby County seat and the northernmost town in our service area — laid out in 1819 on the west bank of the Great Miami, built on the canal, kept by the factories — with 62.4% of homes built before 1980 and a 22.1% pre-war core. Attic, basement, crawl space and black mold remediation with free inspections and transparent market pricing.",
  alternates: { canonical: URL },
};

const FAQS: { q: string; aHtml: string }[] = [
  {
    q: "Our house was built in the 1970s — or before the war — is that why this keeps coming back?",
    aHtml:
      "That is the Sidney-first question, and the numbers back it: the median Sidney home was built in 1971, 62.4% of homes were built before 1980, and 22.1% predate 1939. Age is the mechanism, not a diagnosis: original pipes, roofs, and basement walls at end of life. Sidney has no single-decade failure story — its story is a long, even spread from pre-war through the 1990s — so the fix has to read your house's decade and find the water, not just clean the spot.",
  },
  {
    q: "Does Sidney flood? Should I worry about the Great Miami?",
    aHtml:
      "Plainly: the Great Miami drowned the valley in 1913 — 360 people died valley-wide — and the dam-and-levee system built afterward protects the Piqua-to-Hamilton corridor. No Sidney-specific 1913 toll and no Sidney levee shield were verified, so we make no Sidney flood claim either way. The real risk in most Sidney houses is roof, grading, sump, and plumbing water, plus the river's high water table. Check the specific address — that line matters more in Sidney than anywhere else in our service area, because no verified levee shield stands behind the claim.",
  },
  {
    q: "We had tornado damage — was it the 1965 storm?",
    aHtml:
      "Plainly: the April 11, 1965 F4 ran from Fort Loramie to northwest of Maplewood — 18.4 miles, 3 deaths, 50 injuries, 53 of 68 railcars lifted near Swanders — and it passed north of Sidney, narrowly missing Anna and Fort Loramie. The July 19, 2025 EF0 was near Anna and Montra, not in Sidney. We claim no Sidney tornado. If your roof was touched by a county storm, wind-lifted shingles and roof valleys can leak slowly for seasons — an attic check traces the path from roof to growth before walls come down.",
  },
  {
    q: "We live near the river / on the west bank — does that matter for my basement?",
    aHtml:
      "It matters as mechanism, not as a verdict on your house. Sidney was laid out on the west bank of the Great Miami in 1819, and west-bank ground and the river's water table are why the moisture reading matters here — stated as mechanism, with a moisture reading deciding the individual house, not the neighborhood's history. Newer construction is concentrated in the southwest and the center holds the oldest housing, so the reading also depends on which Sidney your house belongs to.",
  },
  {
    q: "How much does mold removal cost in Sidney?",
    aHtml:
      "The published market framing is $10–$25 per square foot for professional remediation, with metro sources also quoting $500 to $10,000+ by job type and location. Those are market ranges, not a quote for your home — and in Sidney the cost door matters more than in most towns in our service area, because the median owner-occupied value here is $169,900, among the lowest in our service area Xenia. Your free inspection produces the exact written price for your house, once the affected area, the location, and the moisture source are known.",
  },
  {
    q: "Do I need mold testing before removal?",
    aHtml:
      "Visible growth means remediate; smell with no visible source, a real-estate deal, or a doctor's order means test first. In Sidney that distinction matters because so much growth sits in pre-war and 1960s–70s houses whose original systems are aging out together, behind walls, or in an attic fed by a slow roof leak — testing and moisture mapping find the source, so remediation removes the mold and fixes the water that fed it, instead of just cleaning what is visible.",
  },
  {
    q: "I rent — the leak is the landlord's, but the mold is in my home. What do I do?",
    aHtml:
      "Document the leak and the growth, tell the landlord in writing, and get an inspection scope you can hand over. Sidney's renter share is about 38% — among the highest in our service area — so this is a full-sentence Sidney question, not a footnote. We give no legal advice; the inspection gives you a written, professional scope to put in front of the landlord.",
  },
];

export default function SidneyPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            serviceName: "Mold Removal in Sidney, OH",
            description:
              "Mold remediation in Sidney, Ohio — attic, basement, crawl space and black mold, with free inspections and transparent market pricing.",
            url: URL,
            areaServed: ["Sidney", "Dayton", "Ohio"],
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
          { name: "Sidney" },
        ]}
      />

      <HubHero
        h1="Mold Remediation in Sidney, OH — Local Crew, Up-Front Prices"
        answer="Sidney was picked for the courthouse, built on the canal, and kept by the factories — and its houses are old enough to remember all three. Laid out in 1819 on the west bank of the Great Miami, about 40 miles north of Dayton, this is the Shelby County seat and the northernmost town in our service area. We remediate attic, basement, crawl space, and black mold across Sidney with free inspections, transparent market pricing, and photo-documented work."
      />

      {/* Sidney by the numbers */}
      <section className="trust-strip block" aria-label="Sidney mold facts">
        <div className="wrap">
          <div className="stat-row">
            <div className="stat reveal">
              <div className="num">20,541</div>
              <div className="lbl">residents at the 2020 census</div>
              <div className="src">Source: Census / World Population Review</div>
            </div>
            <div className="stat reveal" data-delay="1">
              <div className="num">62.4%</div>
              <div className="lbl">of Sidney homes built before 1980</div>
              <div className="src">
                Source: point2homes decade-built table
              </div>
            </div>
            <div className="stat reveal" data-delay="2">
              <div className="num">1971</div>
              <div className="lbl">
                median construction year of a Sidney home
              </div>
              <div className="src">Source: point2homes</div>
            </div>
            <div className="stat reveal" data-delay="3">
              <div className="num">22.1%</div>
              <div className="lbl">
                of Sidney homes built in 1939 or earlier
              </div>
              <div className="src">Source: point2homes</div>
            </div>
          </div>
        </div>
      </section>

      {/* 1 — Picked for the courthouse */}
      <section className="block" aria-labelledby="seat-h">
        <div className="wrap">
          <span className="eyebrow reveal">Sidney, Ohio</span>
          <h2 id="seat-h" className="reveal">
            Picked for the Courthouse — Laid Out in 1819
          </h2>
          <p className="lede reveal">
            Sidney is the Shelby County seat — and its
            northernmost town. In September 1819, Commissioners Van
            Horne and Steele selected a 70-acre parcel in fraction 36,
            township 8, range 6, on the west bank of the Great Miami
            River, donated by Charles Sterrett in consideration of the
            seat of justice being permanently located here. The
            proprietor was to receive one-half the proceeds of town-lot
            sales after survey; one acre was reserved for a public
            square, two half-acres for two religious societies, two
            acres for cemetery uses, and one acre for school purposes.
            David Henry was appointed director of the town in December
            1819, and Benjamin S. Cox made the survey. The town was
            named in honor of Sir Philip Sidney, poet and member of
            the British Parliament.
          </p>
          <p className="reveal">
            Three transport eras built the town in sequence: the
            Miami-Erie Canal, built 1825–1837, connected Sidney north
            and south and brought the first significant outside trade;
            east-west rail was laid in 1851 and north-south rail in
            1856, and Sidney is still served by those lines today; and
            in the 1950s the Interstate arrived — today I-75 connects
            Sidney to Canada and Florida, with four interchanges in
            town. The canal&apos;s ghost is still walkable: the Canal
            Feeder bike path runs from southern Sidney to just south
            of downtown at Graceland Cemetery.
          </p>
          <QaCallout q="Why does a courthouse town's history matter for mold?">
            Because the town&apos;s age is written into its houses. A
            town laid out in 1819 has a pre-war core of 22.1%, a
            1960s–70s generation aging out together, and a river at
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

      {/* 2 — The even-spread old town */}
      <section className="block alt" aria-labelledby="stock-h">
        <div className="wrap">
          <span className="eyebrow reveal">The Housing Stock</span>
          <h2 id="stock-h" className="reveal">
            The Even-Spread Old Town — No Single Bulge, Just Age
          </h2>
          <p className="lede reveal">
            Sidney has no Xenia-style 1970s bulge — and that is the
            story. The 1970s are the largest single decade at 13.8%,
            but the spread is long and even: 22.1% predate 1939, 28.4%
            predate 1950, 62.4% predate 1980 (5,890 of 9,433 homes), and
            only 13.1% were built after 1999. The median construction
            year is 1971 — the same generation as Xenia — and the
            page must not force a single-decade story Sidney does not
            have. The inspection has to read the individual
            house&apos;s decade.
          </p>
          <p className="reveal">
            Sidney is also the least detached-heavy town in our service area
            in the Point2Homes cuts: 64.9% 1-unit detached, with 8.8%
            2-unit and 7.2% 3–4-unit homes — a duplex and
            small-multifamily presence other towns in our service area do not
            show at this level. And the geography of age is honest and
            usable: newer construction is concentrated in the
            southwest, and the center holds the oldest housing. That
            mechanism is labeled as mechanism, not a measured rate: no
            Sidney mold rate was verified.
          </p>
        </div>
      </section>

      {/* 3 — The river town above the shield */}
      <section className="block" aria-labelledby="river-h">
        <div className="wrap">
          <span className="eyebrow reveal">The River Story</span>
          <h2 id="river-h" className="reveal">
            The River Town Above the Shield
          </h2>
          <p className="lede reveal">
            Sidney sits on the west bank of the Great Miami River —
            the same river that drowned Piqua&apos;s Shawnee
            neighborhood and Dayton in March 1913, killing 360 people
            valley-wide and causing more than $100 million in damages.
            The sequel is the Miami Conservancy District system: five
            dry dams, 43 original miles of levees, and channel
            improvements built 1918–1922, a system that has stored
            floodwaters more than 2,100 times since 1922. But the
            honest Sidney line is what the Conservancy District sources
            do not say: the Main District corridor is described as
            &ldquo;the Great Miami from Piqua to Hamilton,&rdquo; and
            the April 2025 full-activation notice lists floodgates
            closed in Piqua, Troy, West Carrollton, Miamisburg,
            Middletown, and Hamilton — not Sidney.
          </p>
          <p className="reveal">
            So we claim neither a Sidney 1913 toll nor a Sidney
            levee shield — neither was verified — and the
            check-the-specific-address line carries the weight. Sidney
            is the river town at the top of the valley, upstream of
            the shield that protects its southern neighbors. Basement
            water in Sidney today is the ordinary kind — grading, sump,
            plumbing, and the river&apos;s high water table — stated as
            mechanism, not a measured rate. The river is history and a
            water-table neighbor, not a current flood claim.
          </p>
        </div>
      </section>

      {/* 4 — No Sidney tornado, and the page says so */}
      <section className="block alt" aria-labelledby="storm-h">
        <div className="wrap">
          <span className="eyebrow reveal">The Storm Story</span>
          <h2 id="storm-h" className="reveal">
            No Sidney Tornado — and This Page Does Not Borrow One
          </h2>
          <p className="lede reveal">
            No Sidney-city tornado touchdown was confirmed in the
            research pass, and we do not invent one. The
            county&apos;s violent tornado is the April 11, 1965 F4
            from Fort Loramie to northwest of Maplewood — 18.4 miles,
            300 yards, 3 deaths, 50 injuries, destroying almost 25
            homes and severely damaging 20 others, lifting 53 of 68
            railcars near Swanders and lofting a car 200 yards — a
            storm that passed north of Sidney and narrowly missed
            Anna and Fort Loramie. The most recent nearby tornado is
            the July 19, 2025 EF0 near Anna and Montra — 1.08 miles,
            $5,000 in damage, corn-field and minor tree damage east of
            Sidney-Freyburg Road — an Anna-area event, not a Sidney
            touchdown. The nearest ordinary wind in the pass is a May
            25, 2006 thunderstorm wind 5 miles south of Sidney that
            damaged a pole barn.
          </p>
          <p className="reveal">
            Like Piqua&apos;s &ldquo;no Piqua tornado&rdquo; honesty,
            Sidney&apos;s storm story is ordinary wind and slow roof
            leaks, stated generally and without a borrowed tornado
            date. Wind-lifted shingles and roof valleys can leak slowly
            for seasons before anyone sees mold in the attic — an
            attic check traces the path from roof to growth before
            walls come down. The page&apos;s honesty is that it says
            so, plainly.
          </p>
        </div>
      </section>

      {/* 5 — Court Square and the factory town */}
      <section className="block" aria-labelledby="square-h">
        <div className="wrap">
          <span className="eyebrow reveal">Downtown Sidney</span>
          <h2 id="square-h" className="reveal">
            Court Square — and the Factories That Kept the Town
          </h2>
          <p className="lede reveal">
            Sidney&apos;s downtown is the fingerprint. The Shelby
            County Courthouse — Second Empire — occupies one full city
            block known as Court Square, recently named one of the
            Great American Public Places. On the same downtown stage:
            the Monumental Building, erected as a monument to Shelby
            Countians who died in the Civil War; the People&apos;s
            Federal Savings and Loan building designed by Louis
            Sullivan; and the Big Four Bridge, a large concrete rail
            bridge carrying traffic since 1924. Graceland Cemetery
            holds many monuments and memorials of large concrete
            angels; Tawawa Park is the scenic natural park with trails,
            ponds, and picnic areas, home to the Sidney Water Park.
          </p>
          <p className="reveal">
            And Sidney works: Emerson Climate Technologies (heating
            and cooling systems) and Wilson Health (health care) are
            named among the town&apos;s largest employers. One
            announced story is labeled as announced only: SEMCORP
            announced in May 2022 an 850,000 sq ft battery-separator
            plant, $916 million in capital investment, and about 1,200
            jobs planned — planned figures, with operating status not
            verified, so we do not present those jobs as
            current Sidney employment. The Honda engine and
            transmission plant sometimes listed with Sidney is in
            Anna, Shelby County — a county neighbor, not a Sidney
            employer — and it is not claimed here.
          </p>
        </div>
      </section>

      {/* 6 — Service sections, localized */}
      <section className="block alt" aria-labelledby="services-h">
        <div className="wrap">
          <span className="eyebrow reveal">Services in Sidney</span>
          <h2 id="services-h" className="reveal">
            Every Mold Service, Localized to Sidney
          </h2>
          <p className="lede reveal">
            Same certified protocol on every job: containment, removal,
            treatment, moisture fix, verification. Each service below is
            shaped by what Sidney homes actually present.
          </p>

          <h3 className="reveal" style={{ marginTop: 32 }}>
            Attic Mold Remediation in Sidney
          </h3>
          <p className="reveal">
            Sidney attics carry the even-spread story: pre-war
            rooflines in the center, 1960s–70s roofs aging out
            together, and 1990s roofs hitting their first cycle — with
            wind-lifted shingles from county storms leaking slowly for
            seasons. We remove the growth with HEPA-filtered equipment,
            treat the surface, and fix the cause — roof-leak repair,
            ventilation, and air sealing — so it does not return with
            the next storm.{" "}
            <Link className="more" href="/ohio/dayton/attic-mold-removal/">
              Attic mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Crawl Space Mold Remediation in Sidney
          </h3>
          <p className="reveal">
            River-bank crawl spaces near the Great Miami live with a
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
            Basement Mold Remediation in Sidney
          </h3>
          <p className="reveal">
            This is Sidney&apos;s signature job: pre-war and 1960s–70s
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
            Black Mold Remediation in Sidney
          </h3>
          <p className="reveal">
            Stachybotrys chartarum — the mold behind the health scares —
            thrives on the same chronically wet drywall and cellulose
            materials that Sidney&apos;s old basements provide. We work
            under certified containment with negative-air pressure,
            remove the affected material, and verify clearance before
            the space goes back into use. If a Sidney home has visible
            black growth, keep children and anyone with breathing
            trouble out of the room until it is assessed.{" "}
            <Link className="more" href="/ohio/dayton/black-mold-removal/">
              Black mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Mold Inspection &amp; Testing in Sidney
          </h3>
          <p className="reveal">
            Not sure it is mold? In a town where growth sits in
            pre-war and 1960s–70s houses whose original systems are
            aging out together, behind walls, or in an attic fed by a
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

      {/* 7 — Cost, as market ranges */}
      <section className="block" aria-labelledby="cost-h">
        <div className="wrap">
          <span className="eyebrow reveal">Transparent Pricing</span>
          <h2 id="cost-h" className="reveal">
            What Mold Remediation Costs in Sidney
          </h2>
          <p className="lede reveal">
            These are published market ranges — not our prices. Your
            free inspection produces the exact written quote for your
            home. The market consensus across national pricing sources is
            $10–$25 per square foot for professional remediation, with
            metro sources also quoting $500 to $10,000+ by job type and
            location. In Sidney the cost door matters more than in most towns in our service area: the median owner-occupied value here is
            $169,900, among the lowest in our service area
            Xenia — so the range leads, the written scope follows, and
            the promise is &ldquo;find the water first.&rdquo;
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
            What moves the price in a Sidney home: the affected area
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
            ranges. Sidney pricing is confirmed at your free
            inspection — no obligation, written quote.
          </p>
        </div>
      </section>

      {/* 8 — Where we work in Sidney */}
      <section className="block alt" aria-labelledby="areas-h">
        <div className="wrap">
          <span className="eyebrow reveal">Sidney Neighborhoods</span>
          <h2 id="areas-h" className="reveal">
            Areas We Serve in Sidney
          </h2>
          <p className="lede reveal">
            We serve homes across Sidney — Downtown Sidney and Court
            Square, the center&apos;s oldest housing, the southwest&apos;s
            newer construction, the west bank of the Great Miami, the
            Canal Feeder path to Graceland Cemetery, and Tawawa Park,
            along the I-75 corridor alike. Serving the wider Dayton
            area from our{" "}
            <Link href="/ohio/dayton/">Dayton hub →</Link>
          </p>
        </div>
      </section>

      {/* 9 — FAQ */}
      <section className="block" aria-labelledby="faq-h">
        <div className="wrap">
          <span className="eyebrow reveal">Sidney Questions</span>
          <h2 id="faq-h" className="reveal">
            Sidney Mold Questions, Answered
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
        title="Free Mold Inspection in Sidney"
        sub="No obligation. We'll find the mold, scope the job, and give you a written quote — free."
      />
    </>
  );
}
