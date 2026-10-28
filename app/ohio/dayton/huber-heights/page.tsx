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
 * HUBER HEIGHTS TOWN PAGE — /ohio/dayton/huber-heights/
 * Third bespoke town page of the Dayton pilot (2026-10-26). A static route
 * here takes precedence over the generic app/[state]/[city]/[page] town
 * template, because this page carries ~2,800 words of Huber Heights-only
 * research, the locked title/H1 formula, and pack-built FAQs that the
 * generic template cannot express.
 *
 * Every local fact below comes from town-research/huber-heights-oh-research.md
 * (researched 2026-10-24). Anything that pack flagged UNVERIFIED is
 * deliberately absent: no "world's largest collection of two-story dome
 * homes" claim, no neighborhoodscout "98.52% built since 2000" snippet
 * (it conflicts with the decade-built table), and no "City of Music" tag.
 * No invented reviews, ratings, addresses, or prices: cost figures are
 * published market ranges plus dollar amounts from the city's own public
 * record, labeled as such. No competitor phone numbers or ratings appear.
 */

export const revalidate = 3600;

const URL = `${siteConfig.siteUrl}/ohio/dayton/huber-heights/`;

export const metadata: Metadata = {
  // `absolute` bypasses the layout's `%s | MoldShield` template so the
  // rendered title matches the locked formula exactly.
  title: {
    absolute:
      "Mold Removal Company in Huber Heights, OH | Huber Heights Mold Remediation — Costs & Booking",
  },
  description:
    "Mold removal company in Huber Heights, OH: half the city was built in 1960–1979 by one developer, and the city council record documents sewer backups and drainage fights. Attic, basement, crawl space and black mold remediation with free inspections and transparent market pricing.",
  alternates: { canonical: URL },
};

const FAQS: { q: string; aHtml: string }[] = [
  {
    q: "Sewage backed up into my Huber Heights basement — can I clean it myself?",
    aHtml:
      "No. Wastewater is Category-3 (black) water, and the city's own public record shows why professionals get called: a Hemingway Road homeowner told the city council that a June 28 storm pushed wastewater into his home's lower level, damaging flooring and disturbing material he identified as asbestos-containing — about $13,000 for asbestos removal and about $20,000 in other repairs. DIY cleanup spreads contamination and weakens any insurance argument. Document everything, keep people out of the water, and call a remediator.",
  },
  {
    q: "Who pays for mold after a sewer backup — me, the city, or insurance?",
    aHtml:
      "Often all three at once, and slowly. The Hemingway Road homeowner spent savings and credit on temporary repairs while his insurance claim and the sewer operator's investigation ran in parallel. The practical answer: document the damage with photos and a written timeline on day one, keep every receipt, and use a remediator who documents for adjusters — the insurance fight after a backup is routine, and good documentation is what wins it.",
  },
  {
    q: "Why do Huber Heights basements have mold problems if the houses look so new?",
    aHtml:
      "Because the brick is the disguise. Huber Heights calls itself 'America's largest community of brick homes,' and half the city — 50.0% of homes — was built in 1960–1979 by one developer, Huber Homes. Brick veneer does not rot, but the 50-year-old foundation behind it does: original exterior waterproofing, settling backfill, and clay-tile drains that collapse or silt up. The brick still looks new. The basement doesn't.",
  },
  {
    q: "My Huber Heights home had roof damage in 2019 — should I worry about mold now?",
    aHtml:
      "Yes, especially in the attic. The National Weather Service confirmed an EF1 tornado in Huber Heights on May 19, 2019 — a full week before the famous Memorial Day outbreak that hit the wider Dayton area. Roof and siding breaches from that storm are the start of the delayed-mold chain: water gets in behind walls and into attics, and mold grows in wall cavities months later, long after the storm is forgotten. A storm-damage inspection is worth it even years on.",
  },
  {
    q: "I just moved in and the basement smells musty — whose problem is this?",
    aHtml:
      "Document it on day one and notify your landlord or property manager in writing. Huber Heights sits next to Wright-Patterson Air Force Base, and with about 39% of housing in apartments or attached units, many residents are renters or military families on short rotations — mold here is often discovered at move-in or move-out, not by settled owners. Hidden mold behind finished-basement drywall is the number-one surprise in this town's 1970s stock, and a written day-one record protects you either way.",
  },
  {
    q: "Will mold come back after remediation?",
    aHtml:
      "Not if the moisture source is fixed — and that fix is part of the scope, not an extra. In Huber Heights that means the right fix for the right cause: a backwater valve for sewer-backup streets (one homeowner was quoted $6,500 for one), drainage correction for yards that collect field runoff, and a working sump system for 1970s basements. Remediation without the water fix is a pause, not a cure.",
  },
];

export default function HuberHeightsPage() {
  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            serviceName: "Mold Removal in Huber Heights, OH",
            description:
              "Mold remediation in Huber Heights, Ohio — attic, basement, crawl space and black mold, with free inspections and transparent market pricing.",
            url: URL,
            areaServed: ["Huber Heights", "Dayton", "Ohio"],
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
          { name: "Huber Heights" },
        ]}
      />

      <HubHero
        h1="Mold Remediation in Huber Heights, OH — Local Crew, Up-Front Prices"
        answer="Huber Heights is America's largest community of brick homes — and the basements behind the brick are 50 years old. Half the city was built in 1960–1979 by a single developer, the city council record documents sewer backups and drainage fights, and a 2019 tornado left roof breaches still feeding attic mold today. We remediate attic, basement, crawl space, and black mold across Huber Heights with free inspections, transparent market pricing, and photo-documented work."
      />

      {/* Huber Heights by the numbers */}
      <section className="trust-strip block" aria-label="Huber Heights mold facts">
        <div className="wrap">
          <div className="stat-row">
            <div className="stat reveal">
              <div className="num">43,455</div>
              <div className="lbl">
                residents — the Dayton metro&apos;s third-largest suburb
              </div>
              <div className="src">Source: DataUSA, 2024 profile</div>
            </div>
            <div className="stat reveal" data-delay="1">
              <div className="num">50.0%</div>
              <div className="lbl">of Huber Heights homes built in 1960–1979</div>
              <div className="src">
                Source: point2homes decade-built table
              </div>
            </div>
            <div className="stat reveal" data-delay="2">
              <div className="num">1976</div>
              <div className="lbl">
                median construction year of a Huber Heights home
              </div>
              <div className="src">Source: point2homes / city-data</div>
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

      {/* 1 — One-developer city */}
      <section className="block" aria-labelledby="brick-h">
        <div className="wrap">
          <span className="eyebrow reveal">Huber Heights, Ohio</span>
          <h2 id="brick-h" className="reveal">
            A City Built by One Developer — Now Aging Below Grade
          </h2>
          <p className="lede reveal">
            Huber Heights is one of Ohio&apos;s youngest cities of its size
            — incorporated on January 23, 1981, out of Wayne Township —
            and its entire housing stock grew up under one developer&apos;s
            template. Charles H. Huber started building here in 1956, and
            Huber Homes put up 10,707 single-family homes and 2,258
            multi-family units between 1956 and 1992. The city motto says
            the rest: &ldquo;America&apos;s largest community of brick
            homes.&rdquo;
          </p>
          <p className="reveal">
            The decade-built table is the mold story in numbers. Of the
            city&apos;s homes, 22.1% were built in 1960–1969 and 27.9% in
            1970–1979 — exactly half the city in a single twenty-year
            Huber Homes brick-ranch boom. The median Huber Heights home
            dates to 1976. That generation is now about 50 years old:
            original foundations, aging basement waterproofing, old
            clay-tile drainage, and first-generation sump pits, all
            sitting on roughly 40 inches of Dayton-metro rain a year and
            silty clay soil.
          </p>
          <p className="reveal">
            That concentration is what makes Huber Heights different from
            every other Dayton suburb. This is not a town with a few old
            streets mixed among new subdivisions — one era, one builder,
            one brick-ranch template, repeated across Brandt Pike,
            Chambersburg Road, Old Troy Pike, and the original Huber
            Ridge plats. When a whole city&apos;s below-grade systems age
            together, its mold calls arrive together too. Brick veneer
            does not rot. The foundation behind it does.
          </p>
          <QaCallout q="Is mold common in Huber Heights homes?">
            The conditions are unusually widespread here: half the city
            shares the same 50-year-old below-grade generation, and the
            city&apos;s own meeting minutes document water reaching homes.
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

      {/* 2 — Sewer backup on the public record */}
      <section className="block alt" aria-labelledby="sewer-h">
        <div className="wrap">
          <span className="eyebrow reveal">The Water Story</span>
          <h2 id="sewer-h" className="reveal">
            The Sewer Backup on the Public Record
          </h2>
          <p className="lede reveal">
            This is not inferred risk — it is the city council&apos;s own
            record. At a July council meeting, a Hemingway Road homeowner
            reported that a June 28 storm pushed wastewater back up into
            his home&apos;s lower level, damaging flooring and disturbing
            material he identified as asbestos-containing. His figures,
            given on the record: about $13,000 for asbestos removal, about
            $20,000 in other repairs, and a $6,500 quote for a backwater
            valve. An insurance claim was filed and the sewer operator
            was investigating.
          </p>
          <p className="reveal">
            Sewage backup is Category-3 water — black water — and that
            category changes everything about the job. It is not a
            mop-and-dry situation: contaminated flooring and finishes come
            out, affected material is removed under containment, and the
            space is disinfected before anything is rebuilt. It also
            changes the prevention question. A backwater valve, quoted
            here at $6,500, is the device that stops the next storm from
            pushing the street&apos;s wastewater back into the house —
            and on streets with a backup history, it belongs in the
            remediation scope, not as an afterthought.
          </p>
          <p className="reveal">
            For a Huber Heights homeowner, that record is also a warning
            about timing. The homeowner in the council record spent
            savings and credit on temporary repairs while the claim and
            the investigation ran in parallel. After a backup, document
            everything on day one — photos, a written timeline, every
            receipt — and use a remediator who documents for adjusters,
            because the insurance fight after a backup is routine, and
            good documentation is what wins it.
          </p>
        </div>
      </section>

      {/* 3 — The town's own tornado */}
      <section className="block" aria-labelledby="tornado-h">
        <div className="wrap">
          <span className="eyebrow reveal">Why Huber Heights Looks This Way</span>
          <h2 id="tornado-h" className="reveal">
            The 2019 Tornado&apos;s Second Bill
          </h2>
          <p className="lede reveal">
            Huber Heights has its own storm date, and it is not the one
            everyone remembers. The National Weather Service confirmed an
            EF1 tornado in Huber Heights on May 19, 2019 — a full week
            before the famous Memorial Day EF3/EF4 outbreak that hit the
            wider Dayton area on May 27. Roof and siding breaches from
            the May 19 storm are the start of the delayed-mold chain.
          </p>
          <p className="reveal">
            That chain is why a 2019 roof still matters in 2026. Water
            gets in behind walls, into attics and wall cavities, and mold
            grows there months later — long after the storm debris is
            cleared and the insurance claim is closed. The city even sent
            crews to help neighboring Riverside clear debris after the
            May 27 storms, so the whole week is in the town&apos;s memory.
            But the mold-relevant date for a Huber Heights attic is May
            19: the storm that opened the roof, quietly, a week before
            the famous one.
          </p>
          <p className="reveal">
            If your Huber Heights home took roof or siding damage in
            May 2019 — or in any storm since — the attic deserves an
            inspection even if nothing looks wrong from below. Attic
            mold from a breached roof does not announce itself in the
            living room. It announces itself years later, when the
            sheathing is opened and the growth is already extensive.
          </p>
        </div>
      </section>

      {/* 4 — Drainage fights + new homes */}
      <section className="block alt" aria-labelledby="drainage-h">
        <div className="wrap">
          <span className="eyebrow reveal">The Hidden Risk</span>
          <h2 id="drainage-h" className="reveal">
            Drainage Fights in the City&apos;s Own Minutes — and New Homes
            That Aren&apos;t Dry
          </h2>
          <p className="lede reveal">
            Huber Heights&apos; water problems are not hypothetical — they
            fill the city&apos;s own meeting minutes. A 2021
            zoning-appeals transcript records a resident describing a
            creek through his backyard that flooded for the first time in
            20 years, with water coming within about 30 feet of his home
            — and city engineers and the mayor visiting in person. A 2022
            planning-commission transcript shows residents on new
            development edges describing field-to-backyard runoff,
            drainage easements, and retention-pond routing.
          </p>
          <p className="reveal">
            The second wave of building did not escape the water either.
            The 2010–2019 wave added 2,024 homes — 11% of the city — in
            subdivisions like Carriage Trails, and buyers there found
            their backyards sitting lower than surrounding fields,
            collecting the field&apos;s runoff. New construction does not
            mean dry: final grading and retention ponds decide where the
            water goes, and too often the buyer&apos;s backyard loses.
            A new home with a wet yard is a mold job with a newer roof.
          </p>
          <p className="reveal">
            The practical rule for Huber Heights homeowners, old house or
            new: watch where the water goes in the first big storm, not
            the first year. If the yard holds water, the basement or
            crawl space is next — and the 24–48 hour mold clock starts
            with the first wet wall, not the first visible spot.
          </p>
        </div>
      </section>

      {/* 5 — Renters and military families */}
      <section className="block" aria-labelledby="renters-h">
        <div className="wrap">
          <span className="eyebrow reveal">When It Happens</span>
          <h2 id="renters-h" className="reveal">
            Renters, Military Families, and the Move-In Discovery
          </h2>
          <p className="lede reveal">
            Huber Heights sits along I-70, adjacent to Wright-Patterson
            Air Force Base, and its housing mix shows it: only about 55%
            single-family detached, with 26.7% in large apartment
            complexes and 12% in row houses or attached homes. Many
            residents are renters or military families on two-to-three
            year rotations — and in this town, mold is often discovered at
            move-in or move-out, not by settled owners.
          </p>
          <p className="reveal">
            That turnover creates a specific pattern. A renter lives with
            a musty basement for months without calling anyone, assuming
            the smell is the house. A military family moves in, finds the
            basement wrong on day one, and has no history for the house
            at all. And a finished basement that looked normal at the
            walkthrough can hide extensive mold behind wall paneling and
            into block walls — a trade case study of exactly that pattern
            is the reason our inspections open walls and check block,
            rather than trusting the finish.
          </p>
          <p className="reveal">
            If you just moved into a Huber Heights home and the basement
            smells wrong, you are not the first tenant to find it.
            Document it on day one, notify the landlord or property
            manager in writing, and get an inspection before the smell
            becomes your problem alone. A written day-one record is the
            difference between a landlord&apos;s repair and a tenant&apos;s
            bill.
          </p>
        </div>
      </section>

      {/* 6 — Service sections, localized */}
      <section className="block alt" aria-labelledby="services-h">
        <div className="wrap">
          <span className="eyebrow reveal">Services in Huber Heights</span>
          <h2 id="services-h" className="reveal">
            Every Mold Service, Localized to Huber Heights
          </h2>
          <p className="lede reveal">
            Same certified protocol on every job: containment, removal,
            treatment, moisture fix, verification. Each service below is
            shaped by what Huber Heights homes actually present.
          </p>

          <h3 className="reveal" style={{ marginTop: 32 }}>
            Attic Mold Remediation in Huber Heights
          </h3>
          <p className="reveal">
            Huber Heights attics carry the May 19, 2019 tornado&apos;s
            second bill: roof breaches that let water into sheathing and
            insulation, growing unseen for months or years. We remove the
            growth with HEPA-filtered equipment, treat the surface, and
            fix the cause — roof-leak repair, ventilation, and air sealing
            — so it does not return with the next storm.{" "}
            <Link className="more" href="/ohio/dayton/attic-mold-removal/">
              Attic mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Crawl Space Mold Remediation in Huber Heights
          </h3>
          <p className="reveal">
            Where Huber Heights homes have crawl spaces, summer humidity
            and damp silty clay soil keep them wet for months, and the
            same aging drainage that troubles basements troubles the
            ground below the house. We remediate the mold, then address
            the moisture with encapsulation, drainage correction, and
            dehumidification — because a crawl space that stays damp
            will simply regrow what was removed.{" "}
            <Link
              className="more"
              href="/ohio/dayton/crawl-space-mold-remediation/"
            >
              Crawl space mold remediation in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Basement Mold Remediation in Huber Heights
          </h3>
          <p className="reveal">
            This is Huber Heights&apos; signature job: 1970s brick-ranch
            basements with original waterproofing and silted clay tile,
            sewer-backup streets where Category-3 water came in, and
            finished walls hiding it all. Basement work here starts with
            the water — sump condition, discharge routing, backwater
            protection, and entry points — then containment, removal,
            treatment, and a moisture fix that matches the source.{" "}
            <Link className="more" href="/ohio/dayton/basement-mold-removal/">
              Basement mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Black Mold Remediation in Huber Heights
          </h3>
          <p className="reveal">
            Stachybotrys chartarum — the mold behind the health scares —
            thrives on the same chronically wet drywall and cellulose
            materials that Huber Heights&apos; finished basements and
            long-undetected roof leaks provide. We work under certified
            containment with negative-air pressure, remove the affected
            material, and verify clearance before the space goes back
            into use. If a Huber Heights home has visible black growth,
            keep children and anyone with breathing trouble out of the
            room until it is assessed.{" "}
            <Link className="more" href="/ohio/dayton/black-mold-removal/">
              Black mold removal in Dayton <Icon name="arrow" />
            </Link>
          </p>

          <h3 className="reveal" style={{ marginTop: 28 }}>
            Mold Inspection &amp; Testing in Huber Heights
          </h3>
          <p className="reveal">
            Not sure it is mold? In a city where half the homes share one
            50-year-old below-grade generation, uncertainty is the normal
            starting point — and a finished basement or a 2019-era attic
            can hide growth for months. A certified inspection maps
            moisture, samples air and surfaces where warranted, and ends
            with a written remediation protocol and an exact quote. If
            there is no mold, we say so.{" "}
            <Link
              className="more"
              href="/ohio/dayton/mold-inspection-testing/"
            >
              Mold inspection &amp; testing in Dayton <Icon name="arrow" />
            </Link>
          </p>
        </div>
      </section>

      {/* 7 — Cost, as market ranges + public-record anchors */}
      <section className="block" aria-labelledby="cost-h">
        <div className="wrap">
          <span className="eyebrow reveal">Transparent Pricing</span>
          <h2 id="cost-h" className="reveal">
            What Mold Remediation Costs in Huber Heights
          </h2>
          <p className="lede reveal">
            These are published market ranges plus dollar amounts from
            Huber Heights&apos; own public record — not our prices. Your
            free inspection produces the exact written quote for your
            home. The market consensus across national pricing sources is
            $10–$25 per square foot for professional remediation.
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
                  <td>Backwater valve</td>
                  <td>~$6,500</td>
                  <td>Quoted to a Huber Heights homeowner after a sewer backup (council record)</td>
                </tr>
                <tr>
                  <td>Asbestos removal after backup</td>
                  <td>~$13,000</td>
                  <td>Same Hemingway Road case — specialist removal after wastewater disturbed asbestos material</td>
                </tr>
                <tr>
                  <td>Other backup repairs</td>
                  <td>~$20,000</td>
                  <td>Same case — flooring and other repairs beyond the asbestos work</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="reveal" style={{ marginTop: 18 }}>
            What moves the price in a Huber Heights home: the affected
            area in square feet; the location (attic, crawl space, or
            finished basement); whether the moisture source needs fixing
            — a backwater valve, drainage correction, or a sump system —
            and not just the mold itself; how much finished material must
            come out; and whether verification testing is included. A
            small attic patch and a sewer-backed basement with disturbed
            asbestos are different jobs with different prices, and any
            quote that ignores the water source should be treated with
            suspicion.
          </p>
          <p className="disclaimer reveal">
            Ranges: published national market data plus Huber Heights
            public-record figures. Huber Heights pricing is confirmed at
            your free inspection — no obligation, written quote.
          </p>
        </div>
      </section>

      {/* 8 — Where we work in Huber Heights */}
      <section className="block alt" aria-labelledby="areas-h">
        <div className="wrap">
          <span className="eyebrow reveal">Huber Heights Neighborhoods</span>
          <h2 id="areas-h" className="reveal">
            Areas We Serve in Huber Heights
          </h2>
          <p className="lede reveal">
            We serve homes across Huber Heights — Carriage Trails, Wayne
            Meadows, Huber Ridge, and Miami Villa Plat, along Brandt Pike
            (SR 201), Executive Boulevard, Chambersburg Road, Old Troy
            Pike, Taylorsville Road, and Fishburg Road, and the I-70
            corridor alike. Local landmarks include the Music Center at
            The Heights, The Dome, Thomas Cloud Park, Hensley Park, and
            Heatherwoode Golf Club, with the National Museum of the U.S.
            Air Force a short drive away in Dayton. The town&apos;s
            economic anchor is Wright-Patterson Air Force Base, right
            next door.
          </p>
          <p className="reveal" style={{ fontSize: 15, color: "var(--muted)" }}>
            <strong>ZIP code served:</strong> 45424 is the core Huber
            Heights ZIP. Serving the wider Dayton area from our{" "}
            <Link href="/ohio/dayton/">Dayton hub →</Link>
          </p>
        </div>
      </section>

      {/* 9 — FAQ */}
      <section className="block" aria-labelledby="faq-h">
        <div className="wrap">
          <span className="eyebrow reveal">Huber Heights Questions</span>
          <h2 id="faq-h" className="reveal">
            Huber Heights Mold Questions, Answered
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
        title="Free Mold Inspection in Huber Heights"
        sub="No obligation. We'll find the mold, scope the job, and give you a written quote — free."
      />
    </>
  );
}
