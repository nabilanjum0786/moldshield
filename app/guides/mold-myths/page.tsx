import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HubHero } from "@/components/hub";
import { Faq } from "@/components/content";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd, faqPageSchema, speakableSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Mold Myths, Debunked: Black Mold, Bleach, Ozone Machines | ${siteConfig.brandName}`,
  description:
    "Black mold, bleach, ozone machines, mold-resistant paint — what the EPA and CDC actually say about common mold myths, and what to do instead.",
  alternates: { canonical: `${siteConfig.siteUrl}/guides/mold-myths/` },
};

const FAQS = [
  {
    question: "Is black mold really dangerous?",
    answer:
      "The mold people call \"black mold\" is usually Stachybotrys chartarum, which can produce mycotoxins. But the CDC's line is that health effects depend on the person's sensitivity, not just the mold type or color — many black-looking molds (like Cladosporium) are nontoxic. Treat any indoor mold as worth fixing; don't panic over color, and don't ignore growth either.",
  },
  {
    question: "Does bleach kill mold?",
    answer:
      "Bleach can kill surface mold on hard, non-porous surfaces like tile or glass, but the EPA does not recommend it as a routine mold cleanup method. On porous materials like drywall or wood, bleach cannot reach the mold's root structures (hyphae) below the surface, and because bleach is mostly water, it can add moisture that feeds deeper growth. Porous materials with mold growth should be removed and replaced.",
  },
  {
    question: "Do ozone machines kill mold?",
    answer:
      "No. The EPA's Guide to Air Cleaners in the Home says to avoid portable air cleaners that intentionally produce ozone, because ozone is a lung irritant. The EPA also notes that air cleaners do not address the cause of mold — a moisture problem must be fixed for mold to stop growing. HEPA filtration, not ozone, is the safe air-cleaning approach.",
  },
  {
    question: "Does mildew-resistant paint prevent mold?",
    answer:
      "Mildew-resistant paint protects the paint film itself from mildew — it does not stop mold from growing behind the wall or on the underlying material. Consumer Reports found nearly all tested paints resist mildew because of added chemicals, but paint is not a remediation method. Clean and remove existing mold first, fix the moisture source, and never paint over active mold.",
  },
  {
    question: "Can I clean up mold myself?",
    answer:
      "For a small area (roughly under 10 square feet) on a hard surface, the EPA says you can generally handle it yourself: scrub with detergent and water, dry the area completely within 24-48 hours, and wear gloves and a mask. Call a professional for larger areas, mold inside walls or HVAC systems, or if anyone in the home has asthma or immune problems.",
  },
];

export default function MoldMythsPage() {
  const url = `${siteConfig.siteUrl}/guides/mold-myths/`;
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
          { name: "Mold Myths, Debunked" },
        ]}
      />
      <HubHero
        h1="Mold Myths, Debunked"
        answer="The internet is full of confident, wrong mold advice. Every myth below is answered with what the EPA and CDC actually say — with sources — so you can tell the difference between a real fix and a half-fix that wastes your money."
      />

      {/* Myth 1 — black mold */}
      <section className="block" aria-labelledby="myth1">
        <div className="wrap">
          <span className="eyebrow reveal">Myth #1</span>
          <h2 id="myth1" className="reveal">
            "All black mold is toxic black mold"
          </h2>
          <div className="richtext">
            <p>
              <strong>The claim:</strong> any dark patch on your wall is the
              infamous "toxic black mold" that can seriously poison you.
            </p>
            <p>
              <strong>The reality:</strong> the mold known as "black mold" is{" "}
              <em>Stachybotrys chartarum</em>, a greenish-black mold that grows
              in continuously damp places (under sinks, showers, AC ducts) and
              can produce mycotoxins. But color alone tells you nothing. Common
              nontoxic molds like <em>Cladosporium</em> also look black or
              green. The CDC's key honesty line (from its June 2006 report on
              mold and health) is that excessive exposure to
              mold-contaminated materials can cause adverse health effects in
              susceptible persons <strong>regardless of the type of mold</strong>{" "}
              — in other words, effects depend on the person's sensitivity, not
              just the species or its color. The vast majority of molds are not
              hazardous.
            </p>
            <blockquote className="speakable">
              <strong>The takeaway:</strong> treat any indoor mold as worth
              fixing, and fix the moisture feeding it. Don't panic over color —
              and don't ignore a growing patch just because it's "not black."
            </blockquote>
            <p>
              See our full breakdown of the common indoor molds in our{" "}
              <Link href="/tools/mold-identifier/">visual mold identifier</Link>{" "}
              and the <Link href="/services/black-mold-removal/">black mold</Link>{" "}
              service page.
            </p>
          </div>
        </div>
      </section>

      {/* Myth 2 — bleach */}
      <section className="block alt" aria-labelledby="myth2">
        <div className="wrap">
          <span className="eyebrow reveal">Myth #2</span>
          <h2 id="myth2" className="reveal">
            "Bleach kills mold"
          </h2>
          <div className="richtext">
            <p>
              <strong>The claim:</strong> spray bleach on mold and the problem
              is gone.
            </p>
            <p>
              <strong>The reality:</strong> the EPA says it plainly: "The use of
              a chemical or biocide that kills organisms such as mold (chlorine
              bleach, for example) is{" "}
              <strong>not recommended as a routine practice during mold cleanup</strong>
              ." Bleach can kill surface mold on hard, non-porous surfaces like
              tile or glass. But mold anchors itself with root-like filaments
              (hyphae) that burrow into porous materials — drywall, wood,
              grout, insulation — where liquid bleach cannot follow. Worse,
              household bleach is roughly 90% water: the chlorine stays on the
              surface and evaporates while the water soaks in, adding the very
              moisture the colony feeds on. The stain fades; the organism
              survives underneath. (
              <a
                href="https://www.epa.gov/mold/should-i-use-bleach-clean-mold"
                rel="noopener noreferrer"
              >
                EPA: Should I use bleach to clean up mold?
              </a>
              )
            </p>
            <blockquote className="speakable">
              <strong>The takeaway:</strong> small mold on hard surfaces — scrub
              with detergent and water, then dry completely. Mold on porous
              materials — remove and replace the material. And dead spores are
              still allergenic, so physical removal matters more than chemical
              killing.
            </blockquote>
          </div>
        </div>
      </section>

      {/* Myth 3 — ozone */}
      <section className="block" aria-labelledby="myth3">
        <div className="wrap">
          <span className="eyebrow reveal">Myth #3</span>
          <h2 id="myth3" className="reveal">
            "Ozone machines purify your air and kill mold"
          </h2>
          <div className="richtext">
            <p>
              <strong>The claim:</strong> run an ozone generator and it will
              destroy mold and freshen the air.
            </p>
            <p>
              <strong>The reality:</strong> the EPA's Guide to Air Cleaners in
              the Home instructs homeowners to <strong>avoid</strong> portable
              air cleaners and furnace filters that intentionally produce ozone,
              because ozone is a lung irritant that can trigger coughing, chest
              pain, and asthma. The same guide notes that no portable air
              cleaner solves a mold problem on its own, because "mold is caused
              by a water or moisture problem in the building" — the moisture
              source must be removed for the mold to stop. Ozone levels high
              enough to kill mold are also high enough to damage your lungs and
              building materials. (
              <a
                href="https://www.epa.gov/indoor-air-quality-iaq/guide-air-cleaners-home"
                rel="noopener noreferrer"
              >
                EPA: Guide to Air Cleaners in the Home
              </a>
              )
            </p>
            <blockquote className="speakable">
              <strong>The takeaway:</strong> for air cleaning during or after
              remediation, use HEPA filtration — it captures airborne spores
              without adding a lung irritant to your air. No machine replaces
              fixing the moisture source.
            </blockquote>
          </div>
        </div>
      </section>

      {/* Myth 4 — paint */}
      <section className="block alt" aria-labelledby="myth4">
        <div className="wrap">
          <span className="eyebrow reveal">Myth #4</span>
          <h2 id="myth4" className="reveal">
            ""Mold-resistant" paint fixes moldy walls"
          </h2>
          <div className="richtext">
            <p>
              <strong>The claim:</strong> coat a moldy wall with mildew-proof
              paint and the mold problem is solved.
            </p>
            <p>
              <strong>The reality:</strong> paints labeled mildew-resistant
              protect the <strong>paint film itself</strong> — the mildewcide
              additives keep mildew from growing on the dried coating. Consumer
              Reports found nearly every paint they tested resisted mildew for
              this reason. But no paint reaches the mold growing inside the
              drywall or framing behind the coating, and painting over active
              mold simply traps it there. It is not a remediation method. (
              <a
                href="https://www.consumerreports.org/cro/news/2015/08/the-claims-on-paint-cans-that-matter-most/index.htm"
                rel="noopener noreferrer"
              >
                Consumer Reports: decoding paint-can claims
              </a>
              )
            </p>
            <blockquote className="speakable">
              <strong>The takeaway:</strong> use mildew-resistant paint in
              bathrooms and laundry rooms as a finishing touch <em>after</em>{" "}
              the mold is gone and the moisture is fixed. Never paint over
              existing mold — remove it first, always.
            </blockquote>
          </div>
        </div>
      </section>

      <Faq items={FAQS} heading="Mold Myths: Quick Answers" />

      <CtaBand
        title="Tried a half-fix that didn't work?"
        sub="Bleach, paint, fogging — if the spot keeps coming back, there's a moisture source hiding somewhere. We'll find it, scope it, and give you a written plan. Free inspection."
      />
    </>
  );
}
