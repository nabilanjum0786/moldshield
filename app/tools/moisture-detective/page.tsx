import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { MoistureDetective } from "@/components/MoistureDetective";

export const metadata: Metadata = {
  title: `Moisture Detective: Find Where the Water Is Coming From (Free) | ${siteConfig.brandName}`,
  description:
    "Free interactive tool: tap the problem room, answer a few questions, and get the likely moisture sources to investigate — in the order worth checking.",
  alternates: { canonical: `${siteConfig.siteUrl}/tools/moisture-detective/` },
};

export default function MoistureDetectivePage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Free Tools", href: "/tools/" },
          { name: "Moisture Detective" },
        ]}
      />
      <section className="block" aria-labelledby="md-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <p className="eyebrow">Free tool · Find the source</p>
          <h1 id="md-h" style={{ marginBottom: 8 }}>
            Moisture Detective
          </h1>
          <p
            className="speakable"
            style={{ maxWidth: 660, color: "var(--muted)", fontSize: 17 }}
          >
            Mold is a moisture problem wearing a mold costume. Cleaning the
            mold without finding the water is a paint job over a leak — it
            always comes back. Tap the room, answer the questions, and get
            your investigation checklist.
          </p>
          <div style={{ marginTop: 24 }}>
            <MoistureDetective />
          </div>
        </div>
      </section>

      <section className="block" aria-labelledby="mm-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <p className="eyebrow">Building science 101</p>
          <h2 id="mm-h" style={{ marginBottom: 8 }}>
            How moisture moves in houses
          </h2>
          <p style={{ maxWidth: 660, color: "var(--muted)" }}>
            You don&apos;t need a physics degree to find a leak — you just need
            to know the three ways water travels inside a house. Every result
            the tool gives you traces back to one of these.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 16,
              marginTop: 24,
            }}
          >
            <div className="card">
              <h3 style={{ fontSize: 17, marginBottom: 8 }}>
                1. Condensation — warm meets cold
              </h3>
              <p style={{ fontSize: 14.5, color: "var(--muted)" }}>
                Warm air holds more moisture than cold air. When warm, moist
                indoor air touches a cold surface — a window, an exterior wall,
                the underside of a roof deck — it cools, and the moisture it
                was carrying drops out as liquid water. That&apos;s why windows
                sweat on cold mornings and why bathroom fans vented into
                attics quietly feed mold for years. The EPA&apos;s guidance:
                keep indoor humidity between 30% and 50%.
              </p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: 17, marginBottom: 8 }}>
                2. Stack effect — air rises
              </h3>
              <p style={{ fontSize: 14.5, color: "var(--muted)" }}>
                Warm air is lighter, so it rises through your house — from the
                basement, through wall cavities and ceiling gaps, up into the
                attic. It carries your home&apos;s moisture with it. That&apos;s
                why attic mold often starts with something happening two floors
                down: a steamy bathroom, a venting dryer, or simply humid
                living air with nowhere to exhaust.
              </p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: 17, marginBottom: 8 }}>
                3. Capillary action — water wicks
              </h3>
              <p style={{ fontSize: 14.5, color: "var(--muted)" }}>
                Concrete and masonry are porous. Groundwater wicks upward and
                through foundation walls by capillary action — the same force
                that pulls coffee up a paper towel. The white, chalky crust
                called efflorescence is the mineral residue left behind when
                wicked water evaporates. It&apos;s not mold, but it&apos;s proof
                water is moving through the wall.
              </p>
            </div>
          </div>

          <p
            style={{
              marginTop: 24,
              fontSize: 14.5,
              color: "var(--muted)",
              maxWidth: 660,
            }}
          >
            One rule ties it all together: mold can begin growing within
            24–48 hours of water exposure (EPA). The clock starts when the
            water stops, not when you notice — so the fastest win is always
            finding and stopping the source first.
          </p>
        </div>
      </section>

      <CtaBand
        title="Found dampness but can't pin the source?"
        sub="A free inspection with moisture mapping finds what guesswork misses — and tells you exactly what it costs to fix."
      />
    </>
  );
}
