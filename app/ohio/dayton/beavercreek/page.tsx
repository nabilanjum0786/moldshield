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
 * BEAVERCREEK TOWN PAGE — /ohio/dayton/beavercreek/
 * Second bespoke town page of the Dayton pilot (2026-10-25), following the
 * Kettering page's locked title/H1 formula and component pattern. A static
 * route here takes precedence over the generic app/[state]/[city]/[page]
 * town template, because this page carries ~2,700 words of
 * Beavercreek-only research that the generic template cannot express.
 *
 * Every local fact below comes from town-research/beavercreek-oh-research.md
 * (researched 2026-10-24). Anything that pack flagged UNVERIFIED is
 * deliberately absent: no Knollwood neighborhood claim, no Beaver Creek
 * USGS gage claim, and no Beavercreek attribution for the Bellbrook
 * "mold in our attic" survivor quote — that quote is labeled as a
 * Dayton-metro voice wherever it appears. No invented reviews, ratings,
 * addresses, or prices: cost figures are published market ranges,
 * labeled as such.
 */

export const revalidate = 3600;

const URL = `${siteConfig.siteUrl}/ohio/dayton/beavercreek/`;

export const metadata: Metadata = {
  // `absolute` bypasses the layout's `%s | MoldShield` template so the
  // rendered title matches the locked formula exactly.
  title: {
    absolute:
      "Mold Removal Company in Beavercreek, OH | Beavercreek Mold Remediation — Costs & Booking",
  },
  description:
    "Mold removal company in Beavercreek, OH: the 2019 EF3 tornado tore roofs off hundreds of homes, and the city's first stormwater study in 40 years found $15+ million in failing culverts and streams. Attic, basement, crawl space and black mold remediation with free inspections and transparent market pricing.",
  alternates: { canonical: URL },
};

const FAQS: { q: string; aHtml: string }[] = [
  {
    q: "Why is Beavercreek's mold story different from Kettering's?",
    aHtml:
      "Because Beavercreek's houses are much younger — only 51.1% of its 20,352 homes were built before 1980, against Kettering's 85.5%, and the median Beavercreek home dates to 1979 (American Community Survey 2024, via Census Reporter). The mold story here is not ancient housing. It is storm damage — the May 27, 2019 EF3 tornado — plus public drainage the city itself now says is failing, hitting a 1970s-and-2000s suburban stock.",
  },
  {
    q: "Which Beavercreek streets did the 2019 tornado hit hardest?",
    aHtml:
      "The National Weather Service survey traces the May 27, 2019 EF3 — 135–140 mph winds, a 10-mile path — through Beavercreek from I-675 into the east side of town. Its EF3 damage points include homes on Rushton Drive, where entire roofs were lifted and exterior walls collapsed; Gardenview and Wendover Drives; the Fairfield Lakes apartments near Anna Laura Lane; businesses near North Fairfield Road; the Stone Falls subdivision; and Kemp Road, where Fire Station 63 was heavily damaged and a historic barn at Wartinger Park was destroyed. A Dayton Daily News community assessment counted 300 homes heavily damaged, 200 moderately, and 350 lightly across the tornado's Beavercreek path.",
  },
  {
    q: "Why does mold show up months or years after storm damage?",
    aHtml:
      "Because a breached roof or wall lets water into attics and wall cavities that nobody opens again — and insurance fights can leave a home under a tarp for months while that water works. Beavercreek's Julia Stewart lived in two hotel rooms for five months while her insurer would not fix her storm damage, with a tarp still over her crumbling chimney (Dayton Daily News). A Dayton-metro tornado survivor put the delayed pattern in plain words: 'the tornado crisis is over but the domino effect is continuing on, and people are just now starting to realize we have all this mold in our attic' — that survivor lived in Bellbrook, not Beavercreek, but the mechanism is the same wherever a roof was breached and the repair was delayed.",
  },
  {
    q: "What did Beavercreek's 2025 stormwater study find — and what does it mean for my basement?",
    aHtml:
      "The city's first stormwater study in 40 years, presented October 13, 2025, found $15+ million in stormwater needs: 61 culverts identified for full replacement at $10.4 million, 16 more flagged for immediate maintenance, $3.9 million in stream improvements, and $500,000 in immediate stream maintenance. The city has no dedicated stormwater funding source and spends about $200,000 a year from the general fund. For a homeowner, that means basement water in Beavercreek can be a civic fact, not a personal failure — the public drainage your street relies on was last properly studied in 1983.",
  },
  {
    q: "Does homeowners insurance cover mold removal?",
    aHtml:
      "It depends on what caused the mold. Mold from a sudden, covered event — a burst pipe, or a storm breach like the 2019 tornado — is often covered; mold from slow, long-term seepage usually is not. That distinction is exactly why the 2019 insurance fights mattered: a Dayton homeowner fought nearly a year over a storm-damaged roof before she 'finally got the rest of the money to remediate the mold.' Document the water source, the date, and the damage in writing before you call either an insurer or a remediator.",
  },
  {
    q: "Do I need mold testing before removal?",
    aHtml:
      "Visible growth means remediate — testing first adds little. Testing earns its place when there is a smell but no visible source, when a real-estate deal needs documentation, or when a doctor has ordered it. Either way, the job starts with finding the water: a breached roof, a failed culvert's runoff, or a damp crawl space. Mold follows water — find the water, and you have found the mold's address.",
  },
];

export default function BeavercreekPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            serviceName: "Mold Removal in Beavercreek, OH",
            description:
              "Mold remediation in Beavercreek, Ohio — attic, basement, crawl space and black mold, with free inspections and transparent market pricing.",
            url: URL,
            areaServed: ["Beavercreek", "Dayton", "Ohio"],
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
          { name: "Beavercreek" },
        ]}
      />

      <HubHero
        h1="Mold Remediation in Beavercreek, OH — Local Crew, Up-Front Prices"
        answer="Beavercreek is Greene County's largest city and Dayton's second-largest suburb, and its mold story is not old houses — it is one violent night and one failing drainage system. The May 27, 2019 EF3 tornado tore roofs off hundreds of Beavercreek homes, and the city's first stormwater study in 40 years found $15+ million in failing culverts and streams with no dedicated money to fix them. We remediate attic, basement, crawl space, and black mold across Beavercreek with free inspections, transparent market pricing, and photo-documented work."
      />

      {/* Beavercreek by the numbers */}
      <section className="trust-strip block" aria-label="Beavercreek mold facts">
        <div className="wrap">
          <div className="stat-row">
            <div className="stat reveal">
              <div className="num">46,549</div>
              <div className="lbl">
                residents — Greene County&apos;s largest city, Dayton&apos;s
                second-largest suburb
              </div>
              <div className="src">Source: 2020 Census</div>
            </div>
            <div className="stat reveal" data-delay="1">
              <div className="num">51.1%</div>
              <div className="lbl">of Beavercreek homes built before 1980</div>
              <div className="src">
                Source: American Community Survey 2024, via Census Reporter
              </div>
            </div>
            <div className="stat reveal" data-delay="2">
              <div className="num">$15M+</div>
              <div className="lbl">
                in stormwater needs found by the city&apos;s 2025 study
              </div>
              <div className="src">
                Source: City of Beavercreek, October 2025
              </div>
            </div>
            <div className="stat reveal" data-delay="3">
              <div className="num">27 May 2019</div>
              <div className="lbl">
                the EF3 tornado — 135–140 mph, 10-mile path through town
              </div>
              <div className="src">
                Source: National Weather Service survey
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1 — Two waves, not one boom */}
      <section className="block" aria-labelledby="waves-h">
        <div className="wrap">
          <span className="eyebrow reveal">Beavercreek, Ohio</span>
          <h2 id="waves-h" className="reveal">
            A Young City Built in Two Waves — Now Facing Two Water Problems
          </h2>
          <p className="lede reveal">
            Beavercreek is one of Ohio&apos;s youngest cities of its size —
            incorporated in February 1980 out of Beavercreek Township — and
            its housing stock shows it. Of 20,352 homes, 10,398 were built
            before 1980, just 51.1%. The median Beavercreek home dates to
            1979. That is markedly younger than Kettering, where 85.5% of
            homes predate 1980 — and it changes the mold story completely.
          </p>
          <p className="reveal">
            The stock grew in two distinct waves, not one: 3,832 homes in
            the 1970s (18.8%) and 3,533 in the 2000s (17.4%), around the
            Wright-Patterson Air Force Base and Wright State corridors.
            So Beavercreek holds two different mold-risk layers side by
            side — 1970s subdivisions whose drainage and roofing are now
            half a century old, and 2000s subdivisions whose owners assume
            a newer house cannot have a mold problem. Both assumptions
            fail the same way: water does not check the build year before
            it comes in.
          </p>
          <p className="reveal">
            Military-family turnover around the base adds a third layer:
            homes change hands with deferred maintenance, and the new
            owner inherits the last owner&apos;s unrepaired roof leak or
            sump problem. A Beavercreek inspection therefore starts with
            different questions than a Kettering one — not &quot;how old
            is this house,&quot; but &quot;was this roof breached in 2019,
            and does this street&apos;s drainage still work?&quot;
          </p>
          <QaCallout q="Is mold common in newer Beavercreek homes?">
            Newer does not mean dry. The 2019 tornado breached roofs across
            subdivisions of every age, and the city&apos;s own 2025 study
            says the public drainage serving older streets is failing.
            Musty odors that survive cleaning, spots on ceilings or walls,
            or allergy symptoms that ease when you leave the house all
            earn a free inspection.{" "}
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

      {/* 2 — The tornado town */}
      <section className="block alt" aria-labelledby="tornado-h">
        <div className="wrap">
          <span className="eyebrow reveal">The Storm Story</span>
          <h2 id="tornado-h" className="reveal">
            The Tornado Town: One Night in May 2019, Mold Ever Since
          </h2>
          <p className="lede reveal">
            No other Dayton suburb has this documented chain. On May 27,
            2019, an EF3 tornado with 135–140 mph winds cut a 10-mile path
            through Beavercreek, touching down in Riverside, crossing
            I-675, and ending east of U.S. 68 in Xenia Township. The
            National Weather Service survey names the damage street by
            street: entire roofs lifted and exterior walls collapsed on
            Rushton Drive near I-675 and Grange Hall Road; roof structures
            removed on Gardenview and Wendover Drives; the Fairfield
            Lakes apartment complex near Anna Laura Lane with its roof
            removed and upper-floor walls collapsed; businesses near
            North Fairfield Road; the Stone Falls subdivision; and Kemp
            Road, where Fire Station 63 was heavily damaged and a
            historic barn at Wartinger Park was destroyed.
          </p>
          <p className="reveal">
            The community assessment that followed counted 300 homes
            heavily damaged, 200 moderately, and 350 lightly — plus 50
            apartment buildings and 10 commercial buildings heavily
            damaged. But the mold story is what happened after the
            cameras left. Insurance fights left homes under blue tarps for
            months: Beavercreek&apos;s Julia Stewart lived in two hotel
            rooms for five months because her insurer would not fix her
            storm damage, with a tarp still over her crumbling chimney
            and cracks down to the foundation. A Dayton homeowner fought
            nearly a year over a storm-damaged roof before she finally
            got the money to remediate the mold and finish the tornado
            repairs. That delay is the mechanism: a breached roof plus
            months of exposure equals hidden attic and wall-cavity mold
            in a town that remembers the exact night it happened.
          </p>
          <p className="reveal">
            Beavercreek had a tornado before, too — an EF1 confirmed on
            May 26, 2015 — and its city-owned golf club flooded twice in
            2014, with 350 gallons of water extracted from the clubhouse
            carpet in one 96-hour emergency. This town&apos;s water
            history is written in public records, not in marketing copy.
            If your Beavercreek home&apos;s roof was breached in 2019 and
            the repair was delayed, the attic deserves an inspection even
            if nothing smells yet — delayed mold is the pattern this
            town&apos;s own reporting documents.
          </p>
        </div>
      </section>

      {/* 3 — Failing drainage */}
      <section className="block" aria-labelledby="drainage-h">
        <div className="wrap">
          <span className="eyebrow reveal">The Civic Fact</span>
          <h2 id="drainage-h" className="reveal">
            A City That Just Discovered Its Drainage Is Failing
          </h2>
          <p className="lede reveal">
            The second half of Beavercreek&apos;s mold story arrived in
            October 2025, when the city presented its first stormwater
            study in 40 years. It found $15+ million in stormwater
            needs: 61 culverts identified for full replacement at $10.4
            million, 16 more flagged for immediate maintenance, $3.9
            million in stream segment improvements, and $500,000 in
            immediate stream maintenance. The previous study was completed
            in 1983.
          </p>
          <p className="reveal">
            The harder fact is the funding. Beavercreek has no dedicated
            stormwater funding source and spends about $200,000 a year
            from the general fund, while $7.1 million of the need sits on
            easements and private property ineligible for street-levy
            funds. The city&apos;s 2025–2029 Capital Improvement Plan
            adds two stormwater retention facilities near Willowcrest
            Road and restoration of the public drainage ditch south of
            Vineland Trail — a start, not a fix. Newer subdivisions
            manage their own stormwater, but the older stock drains
            through 1980s-era public infrastructure now rated deficient.
          </p>
          <p className="reveal">
            The city sits in the Great Miami and Little Miami watersheds,
            with Beaver Creek, Little Beaver Creek, and the Little Miami
            River as its named waterways. For a homeowner near one of
            them — or on a street whose culvert is on the replacement
            list — basement water is not a mystery and not a personal
            failure. It is the documented condition of the system your
            house drains into, and it will not be fixed by the next dry
            week.
          </p>
        </div>
      </section>

      {/* 4 — Services, localized */}
      <section className="block alt" aria-labelledby="services-h">
        <div className="wrap">
          <span className="eyebrow reveal">Services in Beavercreek</span>
          <h2 id="services-h" className="reveal">
            Every Mold Service, Localized to Beavercreek
          </h2>
          <p className="lede reveal">
            Same certified protocol on every job: containment, removal,
            treatment, moisture fix, verification. Each service below is
            shaped by what Beavercreek homes actually present.
          </p>

          <h3 className="reveal" style={{ marginTop: 32 }}>
            Attic Mold Remediation in Beavercreek
          </h3>
          <p className="reveal">
            This is Beavercreek&apos;s signature job. Tornado-breached
            roofs, delayed repairs, and months under tarps fed growth on
            sheathing and insulation that can sit unseen for years — the
            exact delayed-mold pattern the town&apos;s own tornado
            reporting documents. We remove the growth with HEPA-filtered
            equipment, treat the surface, and fix the cause — roof repair,
            ventilation, and air sealing — so the next storm does not
            reopen the same wound.{" "}
            <Link className="more" href="/ohio/dayton/attic-mold-removal/">
              Attic mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Crawl Space Mold Remediation in Beavercreek
          </h3>
          <p className="reveal">
            Where Beavercreek homes have crawl spaces, humid summers and
            damp soil keep them wet for months, and failing public
            drainage raises the water table the crawl space sits in. We
            remediate the mold, then address the moisture with
            encapsulation, drainage correction, and dehumidification —
            because a crawl space that stays damp will simply regrow what
            was removed.{" "}
            <Link
              className="more"
              href="/ohio/dayton/crawl-space-mold-removal/"
            >
              Crawl space mold remediation in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Basement Mold Remediation in Beavercreek
          </h3>
          <p className="reveal">
            Beavercreek basements take water two ways: storm runoff the
            public system can no longer carry, and the older stock&apos;s
            aging sump and drainage. Basement work here starts with the
            water — sump condition, discharge routing, and whether your
            street&apos;s culvert is on the city&apos;s replacement list —
            then containment, removal, treatment, and a moisture fix
            that matches the source. A basement that took water when the
            drainage failed can take water again; the remediation has to
            outlast the next storm.{" "}
            <Link className="more" href="/ohio/dayton/basement-mold-removal/">
              Basement mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Black Mold Remediation in Beavercreek
          </h3>
          <p className="reveal">
            Stachybotrys chartarum — the mold behind the health scares —
            thrives on the same chronically wet drywall and cellulose
            materials that tornado-delayed repairs and long-undetected
            leaks provide. We work under certified containment with
            negative-air pressure, remove the affected material, and
            verify clearance before the space goes back into use. If a
            Beavercreek home has visible black growth, keep children and
            anyone with breathing trouble out of the room until it is
            assessed.{" "}
            <Link className="more" href="/ohio/dayton/black-mold-removal/">
              Black mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Mold Inspection &amp; Testing in Beavercreek
          </h3>
          <p className="reveal">
            Not sure it is mold? In a town where the shared water date is
            May 27, 2019, uncertainty is the normal starting point — and a
            roof breached then, or a basement on a failing-drainage
            street, can hide growth for years. A certified inspection
            maps moisture, samples air and surfaces where warranted, and
            ends with a written remediation protocol and an exact quote.
            If there is no mold, we say so.{" "}
            <Link
              className="more"
              href="/ohio/dayton/mold-inspection-testing/"
            >
              Mold inspection &amp; testing in Dayton <Icon name="arrow" />
            </Link>
          </p>
        </div>
      </section>

      {/* 5 — Cost, as market ranges */}
      <section className="block" aria-labelledby="cost-h">
        <div className="wrap">
          <span className="eyebrow reveal">Transparent Pricing</span>
          <h2 id="cost-h" className="reveal">
            What Mold Remediation Costs in Beavercreek
          </h2>
          <p className="lede reveal">
            These are published market ranges, not our prices — your free
            inspection produces the exact written quote for your home.
            The market consensus across national pricing sources is
            $10–$25 per square foot for professional remediation, with the
            average job landing around $2,254–$2,368.
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
                  <td>Average whole job</td>
                  <td>~$2,254–$2,368</td>
                  <td>National average across job sizes (HomeAdvisor-cited data)</td>
                </tr>
                <tr>
                  <td>Attic jobs</td>
                  <td>$1,000–$4,000</td>
                  <td>Removal, treatment, and ventilation / air-sealing fixes</td>
                </tr>
                <tr>
                  <td>Crawl space jobs</td>
                  <td>$1,500–$4,000</td>
                  <td>Remediation plus encapsulation and moisture control</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="reveal" style={{ marginTop: 18 }}>
            What moves the price in a Beavercreek home: the affected area in
            square feet; the location (attic, crawl space, or finished
            basement); whether the moisture source needs fixing — a roof
            breach, drainage, or ventilation — and not just the mold
            itself; how much finished material must come out; and whether
            verification testing is included. A small attic patch and a
            tornado-damaged roof cavity are different jobs with different
            prices, and any quote that ignores the water source should be
            treated with suspicion.
          </p>
          <p className="disclaimer reveal">
            Ranges: published national market data. Beavercreek pricing is
            confirmed at your free inspection — no obligation, written
            quote.
          </p>
        </div>
      </section>

      {/* 6 — Where we work in Beavercreek */}
      <section className="block alt" aria-labelledby="areas-h">
        <div className="wrap">
          <span className="eyebrow reveal">Beavercreek Neighborhoods</span>
          <h2 id="areas-h" className="reveal">
            Areas We Serve in Beavercreek
          </h2>
          <p className="lede reveal">
            We serve homes across Beavercreek — Hunter&apos;s Ridge,
            Stone Hill Village, Stone Ridge, Windemere, Country Club of
            the North, Hickory Ridge, Nathanial&apos;s Grove, Stone Falls,
            Gardenview, Wendover, Rushton Drive, and Fairfield Lakes, in
            North Beavercreek, the Fairfield Commons area, and the Wright
            and State corridor alike. Local landmarks include The Greene
            Town Center, the Mall at Fairfield Commons, Wartinger Park,
            Russ Nature Preserve, the Beavercreek Golf Club, and the
            Narrows on the Little Miami River. Wright-Patterson Air Force
            Base and Wright State University sit just next door.
          </p>
          <p className="reveal" style={{ fontSize: 15, color: "var(--muted)" }}>
            <strong>ZIP codes served:</strong> 45305, 45324, 45430, 45431,
            45432, 45433, 45434, 45440. Several of these are shared with
            Dayton and Kettering mailing addresses; 45434 is the core
            Beavercreek ZIP. Serving the wider Dayton area from our{" "}
            <Link href="/ohio/dayton/">Dayton hub →</Link>
          </p>
        </div>
      </section>

      {/* 7 — FAQ */}
      <section className="block" aria-labelledby="faq-h">
        <div className="wrap">
          <span className="eyebrow reveal">Beavercreek Questions</span>
          <h2 id="faq-h" className="reveal">
            Beavercreek Mold Questions, Answered
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
        title="Free Mold Inspection in Beavercreek"
        sub="No obligation. We'll find the mold, scope the job, and give you a written quote — free."
      />
    </>
  );
}
