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
 * KETTERING TOWN PAGE — /ohio/dayton/kettering/
 * First bespoke town page of the Dayton pilot (2026-10-25). A static route
 * here takes precedence over the generic app/[state]/[city]/[page] town
 * template, because this page carries ~2,800 words of Kettering-only
 * research, the locked title/H1 formula, and pack-built FAQs that the
 * generic template cannot express.
 *
 * Every local fact below comes from town-research/kettering-oh-research.md
 * (researched 2026-10-24). Anything that pack flagged UNVERIFIED is
 * deliberately absent: no Glenmina Drive tornado claim, no Gentile Air
 * Force Station closure year, and no 2019 Memorial Day tornado damage
 * claim for Kettering. No invented reviews, ratings, addresses, or prices:
 * cost figures are published market ranges, labeled as such.
 */

export const revalidate = 3600;

const URL = `${siteConfig.siteUrl}/ohio/dayton/kettering/`;

export const metadata: Metadata = {
  // `absolute` bypasses the layout's `%s | MoldShield` template so the
  // rendered title matches the locked formula exactly.
  title: {
    absolute:
      "Mold Removal Company in Kettering, OH | Kettering Mold Remediation — Costs & Booking",
  },
  description:
    "Mold removal company in Kettering, OH: 85.5% of Kettering homes predate 1980, and the city itself documents creek flooding into basements. Attic, basement, crawl space and black mold remediation with free inspections and transparent market pricing.",
  alternates: { canonical: URL },
};

const FAQS: { q: string; aHtml: string }[] = [
  {
    q: "Why do so many Kettering basements have mold problems?",
    aHtml:
      "Because the whole city is aging at once: 85.5% of Kettering homes were built before 1980 and the median home dates to 1961 (American Community Survey 2024, via Census Reporter). A trade source names Kettering specifically for older drainage systems overwhelmed by heavy rain, and the city itself documents creek water reaching basements. Old drains, old foundations, and wet ground are the combination that keeps Kettering basements damp.",
  },
  {
    q: "Which parts of Kettering flood — and has it happened before?",
    aHtml:
      "The city's own flood-protection page names the low-lying areas and the homes built along Little Beaver Creek, Little Sugar Creek, Houk Stream, Penn Creek, and the Moraine Drainage Stream. Storms damaged Kettering homes in 1959 and again in 1973, when damage passed $800,000 — $750,000 of it to private homes. A commercial flood model (First Street) counts 585 Kettering properties inside the FEMA Special Flood Hazard Area. If your street sits near one of those waterways, assume your basement is in the water's path.",
  },
  {
    q: "My Kettering home was built in the 1950s or 60s — what mold risks come with that?",
    aHtml:
      "More than half the city's homes — 56% — went up between 1950 and 1969, so era problems are the norm, not the exception: clay drain tile that silts up with age, open sump pits without lids that humidify the basement all summer, and sump discharge mis-plumbed into floor drains in older homes. The oldest layers are wartime and Cold War fast-build stock: Greenmont Village (1941–42) and the Van Buren Apartments (1951–53), built for defense and Delco plant workers.",
  },
  {
    q: "We finished our basement years after the house was built. Does that change the mold risk?",
    aHtml:
      "Yes — and usually for the worse. A Kettering-focused contractor documents the pattern: the drywall, flooring, and furnace were added decades later to a space the original setup was never designed to protect, so the most expensive room in the house sits in the wettest one. Add a lidless sump pit or silted drain tile behind that finished wall, and mold can grow unseen for months. Finished basements deserve an inspection before you trust the walls.",
  },
  {
    q: "Can snowmelt and winter weather cause mold in a Kettering home?",
    aHtml:
      "Yes — Kettering's mold calendar runs two seasons. Winters bring about 17 inches of snow a year, and freeze-thaw cycling on 1950s–60s roof decks drives ice-dam and attic-condensation leaks. Spring thaw is the basement season: Dayton Daily News reporting documents Miami Valley basements flooding within days of a thaw, with sump pumps working overtime through winter and spring. Attic in winter, basement in spring — that is the Kettering pattern.",
  },
  {
    q: "How fast does mold grow after a basement takes water?",
    aHtml:
      "Mold can begin growing within 24–48 hours of water exposure (EPA guidance), which is why the first day matters more than the first week. Kettering's creek-overflow pattern makes that window tight: city records show floodwater spreading across yards and into basements quickly during storms. If your basement took water, call within 24 hours — drying and inspection on day one is what keeps a wet basement from becoming a mold job.",
  },
];

export default function KetteringPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            serviceName: "Mold Removal in Kettering, OH",
            description:
              "Mold remediation in Kettering, Ohio — attic, basement, crawl space and black mold, with free inspections and transparent market pricing.",
            url: URL,
            areaServed: ["Kettering", "Dayton", "Ohio"],
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
          { name: "Kettering" },
        ]}
      />

      <HubHero
        h1="Mold Remediation in Kettering, OH — Local Crew, Up-Front Prices"
        answer="Kettering is the Dayton metro's most populous suburb, and its homes are aging all at once: 85.5% were built before 1980, the median home dates to 1961, and the city itself documents creek water flooding into basements. We remediate attic, basement, crawl space, and black mold across Kettering with free inspections, transparent market pricing, and photo-documented work."
      />

      {/* Kettering by the numbers */}
      <section className="trust-strip block" aria-label="Kettering mold facts">
        <div className="wrap">
          <div className="stat-row">
            <div className="stat reveal">
              <div className="num">57,862</div>
              <div className="lbl">
                residents — the Dayton metro&apos;s most populous suburb
              </div>
              <div className="src">Source: 2020 Census</div>
            </div>
            <div className="stat reveal" data-delay="1">
              <div className="num">85.5%</div>
              <div className="lbl">of Kettering homes built before 1980</div>
              <div className="src">
                Source: American Community Survey 2024, via Census Reporter
              </div>
            </div>
            <div className="stat reveal" data-delay="2">
              <div className="num">40.5 in</div>
              <div className="lbl">
                average annual precipitation — plus 16.9 in of snow
              </div>
              <div className="src">Source: NOAA 30-year climate normals</div>
            </div>
            <div className="stat reveal" data-delay="3">
              <div className="num">24–48 hrs</div>
              <div className="lbl">
                for mold to start growing after water damage
              </div>
              <div className="src">Source: EPA guidance</div>
            </div>
          </div>
        </div>
      </section>

      {/* 1 — One-boom city */}
      <section className="block" aria-labelledby="boom-h">
        <div className="wrap">
          <span className="eyebrow reveal">Kettering, Ohio</span>
          <h2 id="boom-h" className="reveal">
            A City Built in One Boom — Now Aging All at Once
          </h2>
          <p className="lede reveal">
            Kettering was incorporated in 1955 out of Van Buren Township, and
            the numbers show a city that went up almost all at once. Of its
            27,191 homes, 23,246 were built before 1980 — that is 85.5% of
            the entire housing stock. More than half the city, 15,237 homes
            or 56%, was built in a single twenty-year post-war stretch from
            1950 to 1969. The median Kettering home dates to 1961.
          </p>
          <p className="reveal">
            That concentration is what makes Kettering different from every
            other Dayton suburb. This is not a town with a few old streets
            mixed among new subdivisions — the whole city&apos;s foundations,
            clay drain tile, and sump systems are reaching end of life in
            the same decade. The city&apos;s own 1995 Consolidated Plan
            already recorded the same picture thirty years ago: over 63% of
            homes built between 1950 and 1969, more than a third of them in
            the 1950s alone. A later city Housing Market Analysis found
            Kettering&apos;s stock older than both Montgomery County and the
            United States as a whole, with census-tract median build years
            ranging from 1942 to 1975.
          </p>
          <p className="reveal">
            For mold, that means the risk is not confined to one
            neighborhood. A 1961 median build year means original-era
            flashing, gutters, basement waterproofing, and drain tile across
            Greenmont Village, Marinole Park, Oak Creek, Fairmont Acres,
            Wilmington Hills, and Miriam Acres alike. When a whole city
            ages together, its mold calls arrive together too — and a trade
            source singles Kettering out by name, noting that its older
            drainage systems are often overwhelmed by heavy rains, leading
            to basement leaks that worsen over time.
          </p>
          <QaCallout q="Is mold common in Kettering homes?">
            The conditions are unusually widespread here: most homes predate
            modern waterproofing, and the city&apos;s own flood records show
            water reaching basements along its creeks. Musty odors that
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

      {/* 2 — Creek flooding */}
      <section className="block alt" aria-labelledby="creeks-h">
        <div className="wrap">
          <span className="eyebrow reveal">The Water Story</span>
          <h2 id="creeks-h" className="reveal">
            The Creeks That Flood Kettering Basements
          </h2>
          <p className="lede reveal">
            This is not inferred risk — it is the city&apos;s own record.
            Kettering&apos;s flood-protection page states that low-lying
            areas of the city flood from water settling on flat ground and
            from the overflow of Little Beaver Creek and Little Sugar
            Creek, that houses were built along the stream channels, and
            that floodwater can quickly spread across back yards or parking
            lots and into basements.
          </p>
          <p className="reveal">
            It has happened before, and the city kept the receipts. Storms
            caused flood damage to Kettering homes in 1959 and again in
            1973. The 1973 damage passed $800,000 in total, with $750,000
            of it to private homes. The same city page names three more
            problem watercourses — Houk Stream, Penn Creek, and the Moraine
            Drainage Stream — and the city&apos;s stormwater division
            describes its job as keeping flooding off roadways and out of
            residents&apos; basements. Kettering sits in the Little
            Beavercreek and Holes Creek watershed, and the U.S. Geological
            Survey maintains a stream gage on Holes Creek near Kettering.
            A commercial flood model (First Street) counts 585 Kettering
            properties inside the FEMA Special Flood Hazard Area.
          </p>
          <p className="reveal">
            For a homeowner, that record is a map. If your street runs near
            Little Beaver Creek, Little Sugar Creek, or any of the named
            tributaries, your basement is not unlucky when it takes water —
            it is in the water&apos;s documented path. Creekside homes need
            working sump discharge, sealed entry points, and an inspection
            after every major storm, because mold follows the water within
            a day or two. That is why our Kettering inspections always
            start with the water: where it comes in, where it sits, and
            what it has already fed.
          </p>
        </div>
      </section>

      {/* 3 — Defense housing */}
      <section className="block" aria-labelledby="defense-h">
        <div className="wrap">
          <span className="eyebrow reveal">Why Kettering Looks This Way</span>
          <h2 id="defense-h" className="reveal">
            Defense-Housing DNA: Built Fast, for War Workers
          </h2>
          <p className="lede reveal">
            Kettering&apos;s oldest housing layers were not built slowly —
            they were built at speed, for war workers. Greenmont Village,
            300 buildings and 500 units raised between September 1941 and
            June 1942 by the Federal Works Agency, housed defense workers
            in what was then northeast Van Buren Township, just south of
            the Dayton line.
          </p>
          <p className="reveal">
            The next layer came with the Cold War: the Van Buren Apartments,
            125 buildings put up in 1951–53, and the Huber fourplexes on
            Lesher Drive and Pennlyn Avenue from the same years, built for
            employees of the Delco plant and Gentile Air Force Station.
            Eighty-year-old wartime construction and seventy-year-old Cold
            War apartments are a distinct, datable mold-risk layer — fast
            construction, modest materials, and seven to eight decades of
            Ohio weather since. No generic suburb page can claim this
            history, and no Kettering inspection should ignore it: when we
            open a wall in Greenmont Village or a Van Buren-era fourplex,
            we expect to find what that era left behind.
          </p>
        </div>
      </section>

      {/* 4 — Finished-basement trap */}
      <section className="block alt" aria-labelledby="retrofit-h">
        <div className="wrap">
          <span className="eyebrow reveal">The Hidden Risk</span>
          <h2 id="retrofit-h" className="reveal">
            The Finished-Basement Retrofit Trap
          </h2>
          <p className="lede reveal">
            Kettering&apos;s 1950s–60s ranches and split-levels were built
            with unfinished utility basements. The living space came later
            — and that gap is where mold hides. A Kettering-focused local
            contractor documents the recurring pattern: finished basements
            added long after the build, so the drywall, flooring, and
            furnace sit in a space the original setup was never designed
            to protect.
          </p>
          <p className="reveal">
            The same guide lists what its crews keep finding behind those
            finished walls: open sump pits with no lid, acting as a
            standing humidity source all summer; drain tile silted shut,
            defeating brand-new pumps; and, in older homes, sump discharge
            wrongly plumbed into floor drains. Pumps themselves are often
            still original to the finishing era, not the build era — nobody
            remembers the last time they were tested, and fall storms knock
            out power while dumping rain, which is exactly when a battery
            backup matters. Meanwhile, the regional trend runs the other
            way: homeowners keep converting basements into offices,
            entertainment rooms, and guest suites, putting the most
            expensive room in the house in the wettest one — then losing
            it to leaks and mold.
          </p>
          <p className="reveal">
            If your Kettering basement was finished years after the house
            went up, the walls deserve suspicion, not trust. Our inspection
            checks what the finish covers: moisture readings behind
            drywall, sump pit condition, discharge routing, and drain tile
            function — before a musty smell becomes a remediation job.
          </p>
        </div>
      </section>

      {/* 5 — Two-season calendar */}
      <section className="block" aria-labelledby="seasons-h">
        <div className="wrap">
          <span className="eyebrow reveal">When It Happens</span>
          <h2 id="seasons-h" className="reveal">
            Kettering&apos;s Two-Season Mold Calendar
          </h2>
          <p className="lede reveal">
            Kettering gets about 40.5 inches of precipitation a year and
            16.9 inches of snow, with no true dry season — and Dayton
            station humidity averaging around 70% (a metro reference, not
            a Kettering-measured figure). That climate on a 1961-era
            housing stock produces two mold seasons, not one.
          </p>
          <p className="reveal">
            Winter is attic season. Snow load, melt, and refreeze cycle
            across aging roof decks, driving ice-dam leakage and attic
            condensation into insulation and sheathing that may not be
            opened again until spring. Spring is basement season: thaw
            arrives on already-wet ground, and Dayton Daily News reporting
            documents Miami Valley basements flooding within days of a
            thaw, with sump pumps working overtime in wet seasons like
            spring and winter. One local account notes a basement where
            clearing grit from a pump would have prevented $20,000 worth
            of damage — the difference between maintenance and a mold job
            is often that small.
          </p>
          <p className="reveal">
            The practical rule for Kettering homeowners: check the attic
            when winter ends, and check the basement sump before spring
            thaw. If either check finds moisture, the 24–48 hour mold
            clock is already running.
          </p>
        </div>
      </section>

      {/* 6 — Service sections, localized */}
      <section className="block alt" aria-labelledby="services-h">
        <div className="wrap">
          <span className="eyebrow reveal">Services in Kettering</span>
          <h2 id="services-h" className="reveal">
            Every Mold Service, Localized to Kettering
          </h2>
          <p className="lede reveal">
            Same certified protocol on every job: containment, removal,
            treatment, moisture fix, verification. Each service below is
            shaped by what Kettering homes actually present.
          </p>

          <h3 className="reveal" style={{ marginTop: 32 }}>
            Attic Mold Remediation in Kettering
          </h3>
          <p className="reveal">
            Kettering attics carry the winter half of the mold calendar.
            Ice-dam leakage and condensation on 1950s–60s roof decks feed
            growth on sheathing and insulation that can sit unseen between
            inspections, and bathroom fans vented into attics add warm,
            moist air all winter. We remove the growth with HEPA-filtered
            equipment, treat the surface, and fix the cause — ventilation,
            air sealing, and roof-leak repair — so it does not return with
            the next freeze-thaw cycle.{" "}
            <Link className="more" href="/ohio/dayton/attic-mold-removal/">
              Attic mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Crawl Space Mold Remediation in Kettering
          </h3>
          <p className="reveal">
            Where Kettering homes have crawl spaces, summer humidity and
            damp soil keep them wet for months, and the same aging drainage
            that troubles basements troubles the ground below the house.
            We remediate the mold, then address the moisture with
            encapsulation, drainage correction, and dehumidification —
            because a crawl space that stays damp will simply regrow what
            was removed.{" "}
            <Link
              className="more"
              href="/ohio/dayton/crawl-space-mold-remediation/"
            >
              Crawl space mold remediation in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Basement Mold Remediation in Kettering
          </h3>
          <p className="reveal">
            This is Kettering&apos;s signature job: creek overflow,
            silted clay tile, lidless sump pits, and finished walls hiding
            it all. Basement work here starts with the water — sump
            condition, discharge routing, and entry points along
            foundations near Little Beaver Creek, Little Sugar Creek, and
            the city&apos;s other named waterways — then containment,
            removal, treatment, and a moisture fix that matches the
            source. A basement that flooded in 1973&apos;s pattern can
            flood again; the remediation has to outlast the next storm.{" "}
            <Link className="more" href="/ohio/dayton/basement-mold-removal/">
              Basement mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Black Mold Remediation in Kettering
          </h3>
          <p className="reveal">
            Stachybotrys chartarum — the mold behind the health scares —
            thrives on the same chronically wet drywall and cellulose
            materials that Kettering&apos;s finished basements and
            long-undetected roof leaks provide. We work under certified
            containment with negative-air pressure, remove the affected
            material, and verify clearance before the space goes back into
            use. If a Kettering home has visible black growth, keep
            children and anyone with breathing trouble out of the room
            until it is assessed.{" "}
            <Link className="more" href="/ohio/dayton/black-mold-removal/">
              Black mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Mold Inspection &amp; Testing in Kettering
          </h3>
          <p className="reveal">
            Not sure it is mold? In a city where 85.5% of homes predate
            1980, uncertainty is the normal starting point — and a finished
            basement or a 1961-era attic can hide growth for months. A
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

      {/* 7 — Cost, as market ranges */}
      <section className="block" aria-labelledby="cost-h">
        <div className="wrap">
          <span className="eyebrow reveal">Transparent Pricing</span>
          <h2 id="cost-h" className="reveal">
            What Mold Remediation Costs in Kettering
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
            What moves the price in a Kettering home: the affected area in
            square feet; the location (attic, crawl space, or finished
            basement); whether the moisture source needs fixing — sump
            discharge, drainage, or ventilation — and not just the mold
            itself; how much finished material must come out; and whether
            verification testing is included. A small attic patch and a
            finished basement with silted drain tile are different jobs
            with different prices, and any quote that ignores the water
            source should be treated with suspicion.
          </p>
          <p className="disclaimer reveal">
            Ranges: published national market data. Kettering pricing is
            confirmed at your free inspection — no obligation, written
            quote.
          </p>
        </div>
      </section>

      {/* 8 — Where we work in Kettering */}
      <section className="block alt" aria-labelledby="areas-h">
        <div className="wrap">
          <span className="eyebrow reveal">Kettering Neighborhoods</span>
          <h2 id="areas-h" className="reveal">
            Areas We Serve in Kettering
          </h2>
          <p className="lede reveal">
            We serve homes across Kettering — Greenmont Village, Marinole
            Park, Oak Creek, Fairmont Acres, Wilmington Hills, Miriam
            Acres, Winding Ridge, Berkeley Heights, and Glengarry, in
            North, West, East, and South Kettering alike. Local landmarks
            include Fraze Pavilion, Polen Farm, the James S. Trent Arena,
            Rosewood Arts Center, Town &amp; Country Shopping Center,
            Lincoln Park Civic Commons, Delco Park, Indian Riffle Park,
            Hills and Dales MetroPark, and the Kettering Recreation
            Complex. Major employers here include Kettering Health and
            Reynolds and Reynolds.
          </p>
          <p className="reveal" style={{ fontSize: 15, color: "var(--muted)" }}>
            <strong>ZIP codes served:</strong> 45409, 45419, 45420, 45429,
            45430, 45432, 45439, 45440, 45459. Several of these are shared
            with Dayton mailing addresses; 45429 is the core Kettering ZIP.
            Serving the wider Dayton area from our{" "}
            <Link href="/ohio/dayton/">Dayton hub →</Link>
          </p>
        </div>
      </section>

      {/* 9 — FAQ */}
      <section className="block" aria-labelledby="faq-h">
        <div className="wrap">
          <span className="eyebrow reveal">Kettering Questions</span>
          <h2 id="faq-h" className="reveal">
            Kettering Mold Questions, Answered
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
        title="Free Mold Inspection in Kettering"
        sub="No obligation. We'll find the mold, scope the job, and give you a written quote — free."
      />
    </>
  );
}
