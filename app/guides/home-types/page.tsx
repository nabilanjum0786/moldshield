import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HubHero } from "@/components/hub";
import { Faq } from "@/components/content";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd, faqPageSchema, speakableSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Mold Risk by Home Type: Slab Ranches, Brick Homes, Manufactured Homes | ${siteConfig.brandName}`,
  description:
    "Why 1960s slab ranches, 1920s brick homes, and manufactured homes each grow mold differently — what to check in each home type, in plain terms.",
  alternates: { canonical: `${siteConfig.siteUrl}/guides/home-types/` },
};

const FAQS = [
  {
    question: "Do older homes really have more mold risk?",
    answer:
      "In general, yes. The Census Bureau tracks housing age (year-built buckets) in its American Community Survey because older homes tend to have more moisture entry points: older plumbing, older roofs, settled foundations, and materials installed before modern moisture standards. The link is housing age and maintenance history, not age alone — a well-maintained 1920s home can outperform a neglected 2000s one.",
  },
  {
    question: "Why is a slab foundation a mold risk?",
    answer:
      "With a slab-on-grade home, plumbing runs under the concrete slab. A slow supply or drain leak there has nowhere to go but up into flooring and wall framing, and you can't see it happening. Warning signs include unexplained water-bill increases, warm spots on the floor, and musty baseboards.",
  },
  {
    question: "Is brick a problem for mold?",
    answer:
      "Older solid-brick walls (no air cavity) absorb rainwater, and deteriorated mortar joints let water wick inward. Inside, that moisture feeds mold in plaster and framing. Look for white powdery efflorescence on masonry — it's a sign water is migrating through — and check mortar joints regularly.",
  },
  {
    question: "Why do manufactured homes get mold in the floor?",
    answer:
      "Manufactured homes have plumbing and ductwork tucked into a shallow under-floor space sealed by a belly board (underbelly membrane). Tears in the belly board, condensation on ducts, or a slow plumbing drip trap moisture against wood and particleboard flooring — which softens and molds from the inside out.",
  },
];

export default function HomeTypesPage() {
  const url = `${siteConfig.siteUrl}/guides/home-types/`;
  return (
    <>
      <JsonLd
        data={[
          faqPageSchema(FAQS),
          speakableSchema({ url, cssSelectors: [".speakable"] }),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides/" },
          { name: "Mold Risk by Home Type" },
        ]}
      />
      <HubHero
        h1="Mold Risk by Home Type"
        answer="Mold doesn't care about your home's style — it cares about how your home was built. Three common American home types each hide moisture in different places. The playbooks below are general building-science guidance: they tell you why your home type is vulnerable and exactly what to check."
      />

      <section className="block" aria-labelledby="slab">
        <div className="wrap">
          <span className="eyebrow reveal">General guidance</span>
          <h2 id="slab" className="reveal">
            The 1960s Slab Ranch
          </h2>
          <div className="richtext">
            <p>
              <strong>Why it's vulnerable:</strong> a slab-on-grade ranch has
              no basement and no crawl space — the concrete slab is the ground
              floor. Water supply and drain lines run <em>through or under</em>{" "}
              the slab, and post-tension or rebar-era plumbing from the
              1960s–70s is now reaching the age where pinhole leaks and joint
              failures get common. A slow leak under the slab saturates the soil
              and wicks up through the concrete into flooring and the bottom
              plates of walls, hidden from view. Without a basement, there is
              no early-warning space where you'd spot the problem first.
            </p>
            <h3>What to check</h3>
            <ul>
              <li>
                <strong>Your water bill.</strong> A spike with no lifestyle
                change is the classic first sign of a slab leak.
              </li>
              <li>
                <strong>Warm or damp spots on the floor</strong> — feel barefoot
                for unusual warmth (hot-water line) or cool dampness.
              </li>
              <li>
                <strong>Baseboards and lower wall sections</strong> for musty
                smell, swelling, or discoloration, especially near bathrooms
                and kitchens.
              </li>
              <li>
                <strong>Slab-edge drainage outside</strong> — soil should slope
                away from the slab; standing water against the edge feeds
                wicking.
              </li>
            </ul>
            <p>
              Catching this early matters: drying out wet materials within{" "}
              <strong>24–48 hours</strong> (the EPA's window before mold can
              germinate) is much cheaper than remediating a slab leak that's
              been feeding for months. Our{" "}
              <Link href="/tools/humidity-log/">humidity log</Link> helps you
              track suspicious dampness before you call.
            </p>
          </div>
        </div>
      </section>

      <section className="block alt" aria-labelledby="brick">
        <div className="wrap">
          <span className="eyebrow reveal">General guidance</span>
          <h2 id="brick" className="reveal">
            The 1920s Brick Home
          </h2>
          <div className="richtext">
            <p>
              <strong>Why it's vulnerable:</strong> pre-war brick homes were
              built with solid multi-wythe masonry — several brick layers thick
              with no air cavity and no wall ventilation. Brick and old lime
              mortar are porous; they absorb wind-driven rain and wick it
              inward. After a century, mortar joints crack and erode, and the
              plaster applied directly to the masonry gives mold a food source
              the moment it stays damp. These homes also tend to have stone or
              brick foundations that wick groundwater, and original windows and
              flashing long past their service life.
            </p>
            <h3>What to check</h3>
            <ul>
              <li>
                <strong>Efflorescence</strong> — white powdery residue on brick
                or basement walls. It means water is migrating through the
                masonry.
              </li>
              <li>
                <strong>Mortar joints</strong> — crumbling or missing mortar is
                an open invitation for rain intrusion.
              </li>
              <li>
                <strong>Exterior walls inside</strong> — closets and furniture
                placed against solid-brick exterior walls trap condensation;
                check behind them for musty smell or staining. (See our{" "}
                <Link href="/guides/room-by-room/">room-by-room guide</Link>.)
              </li>
              <li>
                <strong>Foundation walls and floor-wall joint</strong> after
                heavy rain — the first place groundwater shows up.
              </li>
            </ul>
            <p>
              <strong>The honest ceiling:</strong> you can't retrofit a wall
              cavity into a solid-brick wall cheaply. The win is managing water
              at the source — repoint failing mortar, keep gutters and grading
              right, and ventilate the interior side so walls can dry.
            </p>
          </div>
        </div>
      </section>

      <section className="block" aria-labelledby="manufactured">
        <div className="wrap">
          <span className="eyebrow reveal">General guidance</span>
          <h2 id="manufactured" className="reveal">
            The Manufactured Home
          </h2>
          <div className="richtext">
            <p>
              <strong>Why it's vulnerable:</strong> manufactured homes pack
              plumbing and heating ducts into a shallow under-floor space,
              sealed underneath by a belly board (underbelly membrane). That
              design traps trouble: a torn or sagging belly board lets ground
              moisture and cold air in, ducts sweat condensation in humid
              weather, and any plumbing drip lands on wood and particleboard
              subflooring that has almost no drying potential. Because the
              vulnerable layer is sandwiched between the belly board and the
              floor you walk on, damage grows invisibly until the floor gets
              soft.
            </p>
            <h3>What to check</h3>
            <ul>
              <li>
                <strong>Soft spots in the floor</strong> — especially around
                toilets, tubs, washing machines, and the water heater. Soft
                means the subfloor is already compromised.
              </li>
              <li>
                <strong>The belly board</strong> — look for tears, sagging, or
                sections hanging open underneath the home.
              </li>
              <li>
                <strong>Under-floor insulation</strong> — soaked, compressed
                insulation holds moisture against the subfloor; it's usually
                removed during remediation.
              </li>
              <li>
                <strong>Duct sweating</strong> — condensation on under-floor
                ductwork in summer means humidity is winning; insulating and
                sealing the belly board helps.
              </li>
            </ul>
            <p>
              Under-floor work in manufactured homes is physically tight and
              dusty — this is one home type where a professional inspection is
              worth it before the floor goes soft.{" "}
              <Link href="/tools/mold-identifier/">
                Our visual mold identifier
              </Link>{" "}
              can help you classify what you're seeing first.
            </p>
          </div>
        </div>
      </section>

      <section className="block alt" aria-labelledby="housing-age">
        <div className="wrap">
          <span className="eyebrow reveal">Why this works</span>
          <h2 id="housing-age" className="reveal">
            Housing Age and Mold Risk
          </h2>
          <div className="richtext">
            <p>
              The US Census Bureau tracks housing age (the share of homes built
              before certain years, via its American Community Survey) for every
              town we serve, because it correlates with mold calls: older
              housing stock means older roofs, older plumbing, settled
              foundations, and more moisture entry points. The honest link is{" "}
              <strong>housing age and maintenance history</strong> — never "old
              homes cause mold." A maintained 1920s brick house with repointed
              mortar and working drainage will outperform a neglected 2000s
              build with a failed bath fan every time.
            </p>
            <p>
              Whatever your home type, the non-negotiable rules are the same:
              keep indoor humidity below 60% (ideally 30–50%, per EPA guidance),
              dry wet materials within 24–48 hours, and fix the moisture source
              before treating the mold.
            </p>
          </div>
        </div>
      </section>

      <Faq items={FAQS} heading="Home Types: Quick Answers" />

      <CtaBand
        title="Know your home type, not sure about the moisture?"
        sub="Free inspection. We'll map the moisture, identify your home's weak points, and leave you a written plan — no obligation."
      />
    </>
  );
}
