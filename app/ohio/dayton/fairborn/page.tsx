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
 * FAIRBORN TOWN PAGE — /ohio/dayton/fairborn/
 * Fifth bespoke town page of the Dayton pilot (2026-10-27). A static route
 * here takes precedence over the generic app/[state]/[city]/[page] town
 * template, because this page carries Fairborn-only research, the locked
 * title/H1 formula, and pack-built FAQs that the generic template cannot
 * express.
 *
 * Every local fact below comes from town-research/fairborn-oh-research.md
 * (researched 2026-10-26). Anything that pack flagged UNVERIFIED is
 * deliberately absent: no Fairborn tornado date or Fairborn tornado damage
 * (the May 27, 2019 EF3 ran Riverside to Xenia Township and is metro
 * context only; Fairborn that night had a radar-indicated warning, not a
 * confirmed touchdown), no city-level flood figure (none was verified),
 * no single count of moved Osborn houses (sources give nearly 200, 243,
 * and nearly 400 — the page says "hundreds" and picks none of them), no
 * Wright State or base personnel counts, and no invented review, rating,
 * address, price, customer, or job story. ZIP codes are omitted: the
 * pack's ZIP line and the seed file disagree, so no ZIP claim is made.
 * Cost figures are published market ranges, labeled as such.
 */

export const revalidate = 3600;

const URL = `${siteConfig.siteUrl}/ohio/dayton/fairborn/`;

export const metadata: Metadata = {
  // `absolute` bypasses the layout's `%s | MoldShield` template so the
  // rendered title matches the locked formula exactly.
  title: {
    absolute:
      "Mold Removal Company in Fairborn, OH | Fairborn Mold Remediation — Costs & Booking",
  },
  description:
    "Mold removal company in Fairborn, OH: the town that moved for the Huffman Dam, then merged in 1950 — and 61.4% of its homes predate 1980. In the most renter-heavy town in our service area, the discovery is often a move-in inspection or a landlord's leak. Attic, basement, crawl space and black mold remediation with free inspections and transparent market pricing.",
  alternates: { canonical: URL },
};

const FAQS: { q: string; aHtml: string }[] = [
  {
    q: "I'm renting and found mold — who pays for removal?",
    aHtml:
      "Start with documentation, not demolition. Photograph it, notify your landlord or property manager in writing, and get the moisture source scoped — removal without the source fixed comes back. This page gives no legal advice: what the lease says and what the documented scope shows decide who pays. What we can do is inspect, map the moisture, and put the scope in writing so the landlord has something real to act on.",
  },
  {
    q: "We're moving in / moving out — can you document the mold for the handover?",
    aHtml:
      "Yes — that is Fairborn's most common conversion moment. With Wright-Patterson Air Force Base next door and Wright State University inside the city limits, houses here change hands often, and every handover is a discovery: a move-in inspection, a maintenance request that sat too long, or a PCS move. A written scope, moisture readings, and before-and-after documentation give the landlord, the tenant, or the incoming family the same readable record.",
  },
  {
    q: "How much does mold removal cost in Fairborn?",
    aHtml:
      "The published market framing is $10–$25 per square foot for professional remediation, with metro sources also quoting $500 to $10,000+ by job type and location. Those are market ranges, not a quote for your home. Your free inspection produces the exact written price for your house, once the affected area, the location, and the moisture source are known.",
  },
  {
    q: "Does Fairborn flood?",
    aHtml:
      "Not as a river town — and the honest answer starts with why Fairborn exists at all. Old Osborn was moved out of the Huffman Dam basin after the Great Dayton Flood of March 1913, and the Miami Conservancy District's dams now hold the region's rivers back. Today's risk in a Fairborn house is basement seepage, storm-water intrusion, and aging plumbing — not a river story. We claim no city-level flood figure; check the specific address.",
  },
  {
    q: "My house is from the 1950s — is the basement the problem?",
    aHtml:
      "It is the first place to look. 37.0% of Fairborn was built in 1950–1969, and those basements are now 55–75 years old, with aging plumbing and later finishes that hide the first leak. An inspection finds the source before walls come down: visible growth means remediate, smell with no visible source means test first.",
  },
  {
    q: "Do I need mold testing before removal?",
    aHtml:
      "Visible growth means remediate; smell with no visible source, a real-estate deal, or a doctor's order means test first. In Fairborn that distinction matters because so much growth sits behind finished walls and under sinks in rentals, unreported for months — testing and moisture mapping find the source, so remediation removes the mold and fixes the water that fed it, instead of just cleaning what is visible.",
  },
  {
    q: "Is there a Fairborn tornado I should worry about for mold?",
    aHtml:
      "We claim no Fairborn tornado, because none was confirmed. The May 27, 2019 EF3 ran from Riverside to Xenia Township — metro context, not a Fairborn event — and Fairborn that night was under a tornado warning with radar-indicated rotation, not a confirmed touchdown. Fairborn's storm story is the ordinary one: heavy-rain intrusion into aging roofs and basements, and sewer backups after heavy rainfall.",
  },
];

export default function FairbornPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            serviceName: "Mold Removal in Fairborn, OH",
            description:
              "Mold remediation in Fairborn, Ohio — attic, basement, crawl space and black mold, with free inspections and transparent market pricing.",
            url: URL,
            areaServed: ["Fairborn", "Dayton", "Ohio"],
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
          { name: "Fairborn" },
        ]}
      />

      <HubHero
        h1="Mold Remediation in Fairborn, OH — Local Crew, Up-Front Prices"
        answer="Fairborn is the town that moved — and its houses still carry that history. After the Great Dayton Flood of 1913, old Osborn was moved out of the Huffman Dam basin, then merged with Fairfield in 1950. Today 61.4% of Fairborn homes predate 1980, nearly half are rented, and the mold is usually found at a move-in inspection or in a landlord's leak. We remediate attic, basement, crawl space, and black mold across Fairborn with free inspections, transparent market pricing, and photo-documented work."
      />

      {/* Fairborn by the numbers */}
      <section className="trust-strip block" aria-label="Fairborn mold facts">
        <div className="wrap">
          <div className="stat-row">
            <div className="stat reveal">
              <div className="num">34,510</div>
              <div className="lbl">residents at the 2020 census</div>
              <div className="src">Source: Census QuickFacts</div>
            </div>
            <div className="stat reveal" data-delay="1">
              <div className="num">61.4%</div>
              <div className="lbl">of Fairborn homes built before 1980</div>
              <div className="src">
                Source: point2homes decade-built table
              </div>
            </div>
            <div className="stat reveal" data-delay="2">
              <div className="num">1970</div>
              <div className="lbl">
                median construction year of a Fairborn home
              </div>
              <div className="src">Source: point2homes</div>
            </div>
            <div className="stat reveal" data-delay="3">
              <div className="num">48.8%</div>
              <div className="lbl">
                of Fairborn homes renter-occupied — the most renter-heavy town in our service area
              </div>
              <div className="src">Source: Census QuickFacts</div>
            </div>
          </div>
        </div>
      </section>

      {/* 1 — The town that moved */}
      <section className="block" aria-labelledby="moved-h">
        <div className="wrap">
          <span className="eyebrow reveal">Fairborn, Ohio</span>
          <h2 id="moved-h" className="reveal">
            The Town That Moved — Then Merged
          </h2>
          <p className="lede reveal">
            Fairborn did not exist as one town until January 1, 1950, when
            Osborn and Fairfield merged — &ldquo;Fair&rdquo; from Fairfield,
            &ldquo;born&rdquo; from Osborn. And Osborn itself had already
            moved once: after the Great Dayton Flood of March 1913, the
            Miami Conservancy District&apos;s Huffman Dam project put old
            Osborn inside a flood-control basin, so the town moved
            itself. The move began in 1921/1922, took about two years, and
            relocated hundreds of houses — sources differ on the exact
            count, so we pick none of them.
          </p>
          <p className="reveal">
            Many of those original Osborn houses still stand in
            Fairborn&apos;s Osborn Historic District — moved houses on
            1920s foundations, now a century old. That is Fairborn-only
            flavor no competitor page carries, and it is a mechanism
            worth a closer look, not a measured claim: a house moved in
            1922 sits on a foundation poured a century ago, under a
            structure older still, re-set, re-plumbed, and re-graded by
            hand. Moved-house basements and crawl spaces deserve a
            closer look at the sill, the grade, and the old plumbing
            runs — but we never sell &ldquo;moved houses get more
            mold,&rdquo; because that rate was not measured.
          </p>
          <QaCallout q="Why does a town that moved matter for mold?">
            Because the flood story is history, not a river-flooding
            page. Fairborn exists because of flood control, and the
            dams now hold the region&apos;s rivers back. The water story
            in today&apos;s houses is the ordinary one: aging plumbing,
            basement seepage, and storm-water intrusion.{" "}
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

      {/* 2 — The 1950s–60s bulge */}
      <section className="block alt" aria-labelledby="bulge-h">
        <div className="wrap">
          <span className="eyebrow reveal">The Housing Stock</span>
          <h2 id="bulge-h" className="reveal">
            1950s–60s, Not Ancient — and 55–75 Years Old Now
          </h2>
          <p className="lede reveal">
            Fairborn is an older-housing town, but its bulge is the
            1950s–60s, not the 1970s boom of Centerville or the
            brick-ranch template of Huber Heights: 18.7% of homes were
            built in 1950–1959 and 18.2% in 1960–1969 — 37.0% of the city
            in two decades, with a median construction year of 1970 and
            61.4% of all homes predating 1980. Only 55.6% of homes are
            1-unit detached; the rest is heavily small-multi-unit and
            apartment stock, and that rental layer is a real part of
            this town&apos;s mold story, not a footnote.
          </p>
          <p className="reveal">
            That combination — 1950s–60s stock, now 55–75 years old, with
            nearly half the homes rented — is why the discovery moment
            here is different. The youngest town in our service area (median age
            35.7, only 16.4% aged 65 and over) is also its most
            affordable owner market so far (median owner-occupied value
            $175,000, median gross rent $977), and its houses change
            hands more than most Dayton towns. Every handover is a
            mold discovery.
          </p>
        </div>
      </section>

      {/* 3 — The landlord's leak */}
      <section className="block" aria-labelledby="renter-h">
        <div className="wrap">
          <span className="eyebrow reveal">When It Happens</span>
          <h2 id="renter-h" className="reveal">
            The Landlord&apos;s Leak Is the Tenant&apos;s Mold
          </h2>
          <p className="lede reveal">
            In Fairborn, the discovery is often a move-in inspection, a
            maintenance request that sat too long, or a PCS move — not
            just an owner with a wet basement. Wright-Patterson Air
            Force Base sits next door and Wright State University sits
            inside the city limits, so arrivals and departures are
            constant, and heavy student-rental turnover near Wright
            State means deferred maintenance: slow leaks behind walls,
            under sinks, and in bathrooms that go unreported for
            semesters at a time.
          </p>
          <p className="reveal">
            This page speaks to tenants, landlords, and property
            managers as well as owners — and it never promises a tenant
            a remedy it cannot deliver. Scope first, documentation
            second, and the landlord&apos;s fix first: removal without
            the source fixed comes back. A written scope, moisture
            readings, and before-and-after documentation are what a
            landlord, a tenant, or an incoming family can all read —
            and what keeps a handover from becoming a dispute.
          </p>
        </div>
      </section>

      {/* 4 — No borrowed storm story */}
      <section className="block alt" aria-labelledby="storm-h">
        <div className="wrap">
          <span className="eyebrow reveal">The Storm Story</span>
          <h2 id="storm-h" className="reveal">
            No Fairborn Tornado — and That Honesty Is the Point
          </h2>
          <p className="lede reveal">
            Say it plainly, because it builds trust: no Fairborn
            tornado is claimed by us, because none was
            confirmed. The May 27, 2019 EF3 ran from Riverside to Xenia
            Township, 10 miles at 135–140 mph — metro context, not a
            Fairborn event. Fairborn that night was under a tornado
            warning with radar-indicated rotation over the town, not a
            confirmed touchdown, and Fairborn&apos;s Cemex Reserve park
            later received Beavercreek&apos;s tornado yard debris. Both
            are honest Fairborn-adjacent facts; neither is Fairborn
            tornado damage, and neither is borrowed here as if it
            were.
          </p>
          <p className="reveal">
            Fairborn&apos;s storm story is the ordinary one: heavy-rain
            intrusion into aging roofs and basements, and sewer backups
            after heavy rainfall — the same mechanisms PuroClean&apos;s
            own Dayton framing names for older homes with aging
            plumbing, finished-basement flooding, storm-water intrusion,
            and sewer backups. A page that invents a tornado would sell
            better for a week and lose trust forever; this one does
            not.
          </p>
        </div>
      </section>

      {/* 5 — Service sections, localized */}
      <section className="block alt" aria-labelledby="services-h">
        <div className="wrap">
          <span className="eyebrow reveal">Services in Fairborn</span>
          <h2 id="services-h" className="reveal">
            Every Mold Service, Localized to Fairborn
          </h2>
          <p className="lede reveal">
            Same certified protocol on every job: containment, removal,
            treatment, moisture fix, verification. Each service below is
            shaped by what Fairborn homes actually present.
          </p>

          <h3 className="reveal" style={{ marginTop: 32 }}>
            Attic Mold Remediation in Fairborn
          </h3>
          <p className="reveal">
            Fairborn attics carry the mid-century story: flat-roof
            additions that pond water and leak at seams, and aging roofs
            over 1950s–60s stock, growing unseen in sheathing and
            insulation for months. We remove the growth with
            HEPA-filtered equipment, treat the surface, and fix the
            cause — roof-leak repair, ventilation, and air sealing — so
            it does not return with the next storm.{" "}
            <Link className="more" href="/ohio/dayton/attic-mold-removal/">
              Attic mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Crawl Space Mold Remediation in Fairborn
          </h3>
          <p className="reveal">
            Where Fairborn homes have crawl spaces — including under
            moved Osborn houses re-set a century ago — summer humidity
            and damp soil keep them wet for months, and old plumbing runs
            and grade problems feed the damp. We remediate the mold,
            then address the moisture with encapsulation, drainage
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
            Basement Mold Remediation in Fairborn
          </h3>
          <p className="reveal">
            This is Fairborn&apos;s signature job: 1950s–60s basements,
            aging plumbing, and later finishes hiding the first leak —
            often found at a move-in inspection or after a maintenance
            request sat too long. Basement work here starts with the
            water — plumbing condition, seepage entry points, and
            sump and drainage condition — then containment, removal,
            treatment, and a moisture fix that matches the source.{" "}
            <Link className="more" href="/ohio/dayton/basement-mold-removal/">
              Basement mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Black Mold Remediation in Fairborn
          </h3>
          <p className="reveal">
            Stachybotrys chartarum — the mold behind the health scares —
            thrives on the same chronically wet drywall and cellulose
            materials that Fairborn&apos;s finished-over basements and
            rental bathrooms provide. We work under certified
            containment with negative-air pressure, remove the affected
            material, and verify clearance before the space goes back
            into use. If a Fairborn home has visible black growth, keep
            children and anyone with breathing trouble out of the room
            until it is assessed.{" "}
            <Link className="more" href="/ohio/dayton/black-mold-removal/">
              Black mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Mold Inspection &amp; Testing in Fairborn
          </h3>
          <p className="reveal">
            Not sure it is mold? In a town where so much growth sits
            behind walls and under sinks in rentals, unreported for
            months, uncertainty is the normal starting point — and it is
            exactly what a handover inspection is for. A certified
            inspection maps moisture, samples air and surfaces where
            warranted, and ends with a written remediation protocol and
            an exact quote. If there is no mold, we say so.{" "}
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
            What Mold Remediation Costs in Fairborn
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
            What moves the price in a Fairborn home: the affected area
            in square feet; the location (attic, crawl space, or
            basement); whether the moisture source needs fixing — aging
            plumbing, a flat-roof leak, or drainage correction — and not
            just the mold itself; how much finished material must come
            out; and whether verification testing is included. A small
            attic patch and a rental basement found at move-in are
            different jobs with different prices, and any quote that
            ignores the water source should be treated with suspicion.
          </p>
          <p className="disclaimer reveal">
            Ranges: published national market data plus metro-source
            ranges. Fairborn pricing is confirmed at your free
            inspection — no obligation, written quote.
          </p>
        </div>
      </section>

      {/* 7 — Where we work in Fairborn */}
      <section className="block alt" aria-labelledby="areas-h">
        <div className="wrap">
          <span className="eyebrow reveal">Fairborn Neighborhoods</span>
          <h2 id="areas-h" className="reveal">
            Areas We Serve in Fairborn
          </h2>
          <p className="lede reveal">
            We serve homes across Fairborn — Downtown Fairborn and Main
            Street, the Osborn Historic District, the Wright State
            University area, and the base-adjacent neighborhoods near
            Wright-Patterson Air Force Base, along Colonel Glenn
            Highway and Hebble Avenue and the I-675 corridor alike.
            Serving the wider Dayton area from our{" "}
            <Link href="/ohio/dayton/">Dayton hub →</Link>
          </p>
        </div>
      </section>

      {/* 8 — FAQ */}
      <section className="block" aria-labelledby="faq-h">
        <div className="wrap">
          <span className="eyebrow reveal">Fairborn Questions</span>
          <h2 id="faq-h" className="reveal">
            Fairborn Mold Questions, Answered
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
        title="Free Mold Inspection in Fairborn"
        sub="No obligation. We'll find the mold, scope the job, and give you a written quote — free."
      />
    </>
  );
}
