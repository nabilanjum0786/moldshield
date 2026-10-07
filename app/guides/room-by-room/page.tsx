import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HubHero } from "@/components/hub";
import { Faq } from "@/components/content";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd, faqPageSchema, speakableSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Where Mold Hides: Room-by-Room Inspection Guide | ${siteConfig.brandName}`,
  description:
    "The five most common indoor mold locations — bathroom, window sills, HVAC vents, exterior-wall closets, under sinks. What causes it, what to look for, and your first action in each spot.",
  alternates: { canonical: `${siteConfig.siteUrl}/guides/room-by-room/` },
};

const ROOMS = [
  {
    id: "bathroom",
    eyebrow: "Spot #1",
    name: "The Shower and Bathroom",
    cause:
      "A bathroom produces gallons of water vapor per shower. Without a fan that actually moves air outside (not into the attic), that vapor condenses on walls, ceilings, grout, and window frames — and stays there for hours.",
    lookFor: [
      "Pink, orange, or black film on grout and caulk lines — the earliest visible sign",
      "Peeling or bubbling paint near the shower, a sign moisture is behind it",
      "A musty smell that lingers after the room has dried — growth may be behind tile or in the wall",
      "Check the bath fan: hold toilet paper to the grille while it's running. If it won't hold, the fan is undersized or vented wrong",
    ],
    action:
      "Run the bath fan during every shower and for 30 minutes after. If mold is only on the surface of tile or grout, scrub with detergent and water and dry completely. Mold behind caulk, in drywall, or a persistent smell means a deeper problem — get an inspection before it spreads into the wall cavity.",
  },
  {
    id: "windows",
    eyebrow: "Spot #2",
    name: "Window Sills and Frames",
    cause:
      "In cold weather, warm indoor air hits cold glass and frames, and the moisture in it condenses. Water pools on sills and seeps into the frame and surrounding drywall — a slow, repeating wet cycle all winter long.",
    lookFor: [
      "Black speckling on the sill, frame, or the drywall just below the window",
      "Standing water or heavy condensation on glass on cold mornings",
      "Rotted or soft wood trim around older windows",
      "Blinds or curtains that stay damp against the glass",
    ],
    action:
      "Wipe condensation off glass and sills on cold mornings — it takes seconds and breaks the wet cycle. Keep blinds slightly open so air circulates over the glass. If the frame wood is soft or the drywall below is swollen, the moisture has gone deeper than the surface; replacement, not wiping, is the fix.",
  },
  {
    id: "hvac",
    eyebrow: "Spot #3",
    name: "HVAC Vents and Ductwork",
    cause:
      "Air conditioning cools air below its dew point, so condensation forms on cold duct surfaces — especially in hot, humid attics and crawl spaces. Dust plus condensate is mold food, and once growth starts in the ductwork, the system distributes spores through the whole house every cycle.",
    lookFor: [
      "Musty smell that gets stronger when the AC or heat kicks on",
      "Visible growth or dust buildup on supply registers",
      "Water staining on the air handler cabinet or around duct boots",
      "A drain pan that's full, slimy, or overflowing",
    ],
    action:
      "Check the condensate drain line and pan first — a clogged drain is the most common cause and the easiest fix. Change the filter on schedule. Never try to clean inside ductwork yourself with bleach or foggers; HVAC mold work needs containment so you don't blow spores everywhere. This one is a professional call.",
  },
  {
    id: "closets",
    eyebrow: "Spot #4",
    name: "Closets on Exterior Walls",
    cause:
      "Closets against outside walls get cold in winter while the rest of the room stays warm. Clothes and boxes block airflow, so the wall behind them condenses quietly — and nobody opens a packed closet until spring.",
    lookFor: [
      "Musty smell when you open the closet door",
      "Spots on the back wall, baseboard, or the wall side of stored boxes",
      "Shoes, handbags, or stored clothes with white or green growth on them",
      "Damp feeling on the wall behind hanging clothes",
    ],
    action:
      "Pull everything away from the exterior wall and leave a few inches of air gap — that alone often breaks the cycle. If there's growth on the wall itself, clean small surface areas with detergent and water and dry them. Growth behind baseboards or a spreading patch means the wall is wet inside; it needs professional drying and assessment.",
  },
  {
    id: "sinks",
    eyebrow: "Spot #5",
    name: "Under Sinks",
    cause:
      "Under every sink there's a small, dark, poorly ventilated cabinet wrapped around plumbing connections — supply lines, P-traps, and (in kitchens) dishwasher and disposal hookups. Any slow drip lands in the dark and stays wet.",
    lookFor: [
      "A damp or swollen cabinet floor, or water stains on the back wall",
      "Musty smell when you open the cabinet door",
      "Slow drips at the P-trap or supply-line connections — check with dry hands",
      "Dark staining on the cabinet floor that reappears after wiping",
    ],
    action:
      "Empty the cabinet, dry everything, and run the faucet while watching the connections — leaks often only show under pressure. Tighten or replace the leaking fitting. If the cabinet floor is swollen, soft, or the growth keeps coming back, the subfloor may be compromised; that's when removal beats another round of wiping.",
  },
];

const FAQS = [
  {
    question: "What is the most common place for mold in a house?",
    answer:
      "Bathrooms and anywhere plumbing meets a dark cabinet — under sinks, around showers and tubs. These spots combine the three things mold needs: moisture, darkness, and poor airflow. After that, the usual suspects are window sills in winter, HVAC drain pans, and closets on exterior walls.",
  },
  {
    question: "I can smell mold but can't see it. Where is it?",
    answer:
      "If you can smell it but can't see it, it's behind something — inside a wall cavity, under flooring, above a ceiling, or in ductwork. Musty odor is volatile compounds the mold releases; it travels through gaps that are too small to see through. Don't tear open walls yourself — a moisture meter survey by a professional finds the source without demolition guesswork.",
  },
  {
    question: "How fast does mold grow after a leak?",
    answer:
      "The EPA's rule: mold can begin growing within 24 to 48 hours of materials getting wet. That's why the first action after any leak is always the same — stop the water, then dry everything completely within that window. The clock starts when the water stops, not when you notice.",
  },
];

export default function RoomByRoomPage() {
  const url = `${siteConfig.siteUrl}/guides/room-by-room/`;
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
          { name: "Room-by-Room Mold Guide" },
        ]}
      />
      <HubHero
        h1="Where Mold Hides: Room by Room"
        answer="Mold grows where moisture sits still. These five spots produce the majority of residential mold calls — for each one, you get the common moisture cause, what to look for, and the first action to take. This is general homeowner guidance, not a substitute for an inspection."
      />

      {ROOMS.map((room, i) => (
        <section
          key={room.id}
          className={i % 2 === 1 ? "block alt" : "block"}
          aria-labelledby={room.id}
        >
          <div className="wrap">
            <span className="eyebrow reveal">{room.eyebrow}</span>
            <h2 id={room.id} className="reveal">
              {room.name}
            </h2>
            <div className="richtext">
              <p>
                <strong>Common moisture cause:</strong> {room.cause}
              </p>
              <h3>What to look for</h3>
              <ul>
                {room.lookFor.map((item) => (
                  <li key={item.slice(0, 24)}>{item}</li>
                ))}
              </ul>
              <h3>First action</h3>
              <p>{room.action}</p>
            </div>
          </div>
        </section>
      ))}

      <section className="block" aria-labelledby="smell">
        <div className="wrap">
          <span className="eyebrow reveal">The nose knows</span>
          <h2 id="smell" className="reveal">
            The Smell Test: Your Early Warning System
          </h2>
          <div className="richtext">
            <blockquote className="speakable">
              If you can smell mold but can't see it, it's behind something —
              inside a wall, under a floor, above a ceiling, or in the ducts.
              That musty, earthy smell is your signal to investigate, not to
              spray air freshener.
            </blockquote>
            <p>
              Not sure what you're looking at? Our{" "}
              <Link href="/tools/mold-identifier/">visual mold identifier</Link>{" "}
              walks you through identifying common growth by look and location.
              And if symptoms in your household ease when you're away from home
              and return when you're back, that pattern is worth mentioning to
              both your inspector and your doctor.
            </p>
          </div>
        </div>
      </section>

      <Faq items={FAQS} heading="Room-by-Room: Quick Answers" />

      <CtaBand
        title="Found something you're unsure about?"
        sub="A free inspection maps every suspicious spot with moisture meters — and tells you which ones matter and which don't. No obligation, written findings."
      />
    </>
  );
}
