import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HubHero } from "@/components/hub";
import { Faq } from "@/components/content";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd, faqPageSchema, speakableSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Mold and Your Health: What the Science Actually Says | ${siteConfig.brandName}`,
  description:
    "What health agencies actually say about mold exposure — the CDC's key honesty line, the EPA's dampness and asthma research, and safe-handling basics. No scare tactics.",
  alternates: { canonical: `${siteConfig.siteUrl}/guides/mold-health/` },
};

const FAQS = [
  {
    question: "Can mold make my family sick?",
    answer:
      "It can, in some people. The CDC's key line is that excessive exposure to mold-contaminated materials can cause adverse health effects in susceptible persons regardless of the type of mold. Reactions vary widely by individual sensitivity — some people feel nothing, others develop allergy symptoms, asthma flare-ups, or breathing problems. The EPA also links damp, moldy indoor spaces to higher asthma risk. This is general health information, not medical advice — talk to your doctor about your symptoms.",
  },
  {
    question: "Is black mold really dangerous?",
    answer:
      "Only one mold, Stachybotrys chartarum, is the true 'black mold,' and the CDC's position is that health effects depend on the person's sensitivity, not just the mold type. What matters is whether susceptible people are exposed — not the color. Any visible mold patch deserves to be cleaned up and its moisture source fixed, whatever color it is.",
  },
  {
    question: "Can I clean up a small patch of mold myself?",
    answer:
      "For small areas — a widely cited EPA guideline draws the line around 10 square feet — homeowners can generally handle cleanup themselves with basic protection: gloves, an N95 respirator, eye protection, and ventilation. Porous materials that stay wet usually need to be removed, not wiped. Call a professional for larger areas, HVAC contamination, or mold inside walls. This is general guidance from EPA materials, not a personal recommendation.",
  },
  {
    question: "Will a mold test tell me whether it's dangerous?",
    answer:
      "Not really. Tests can identify the mold type, but per the CDC, health effects depend on the exposed person's sensitivity regardless of type — so a lab result doesn't determine how worried you should be. Testing is most useful for documenting a problem (e.g., for a real-estate transaction or insurance) or finding hidden mold, not for diagnosing health risk. Talk to your doctor about health concerns, and a qualified inspector about the building problem.",
  },
  {
    question: "When should I talk to my doctor about mold?",
    answer:
      "If anyone in your home has symptoms that are worse indoors and better away from home — persistent coughing, wheezing, sneezing, watery eyes, or asthma flare-ups — that's the pattern health agencies describe as worth discussing with your doctor. We can assess and remediate the building; a doctor assesses the person. This page is not medical advice.",
  },
];

export default function MoldHealthPage() {
  const url = `${siteConfig.siteUrl}/guides/mold-health/`;
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
          { name: "Mold and Your Health" },
        ]}
      />
      <HubHero
        h1="Mold and Your Health: What the Science Actually Says"
        answer="Most mold-health writing online is either scare tactics or dismissal. The science is calmer than both: mold exposure affects susceptible people, the reaction depends on the person, and the fix is the same either way — remove the mold and fix the moisture feeding it. This page is educational, not medical advice."
      />

      {/* The honesty line — SOURCED */}
      <section className="block" aria-labelledby="cdc-line">
        <div className="wrap">
          <span className="eyebrow reveal">Sourced: CDC, 2006</span>
          <h2 id="cdc-line" className="reveal">
            The One Sentence That Matters Most
          </h2>
          <div className="richtext">
            <p>
              In 2006, the Centers for Disease Control and Prevention published
              its review of mold health research. The sentence that still
              defines the agency's position:
            </p>
            <blockquote className="speakable">
              "Excessive exposure to mold-contaminated materials can cause
              adverse health effects in susceptible persons regardless of the
              type of mold or the extent of contamination." — CDC, "Mold
              Prevention Strategies and Possible Health Effects," 2006
            </blockquote>
            <p>
              Read that twice, because it corrects two common myths at once.
              First: health effects depend on the <strong>person</strong> — your
              sensitivity, your asthma history, your immune status — not just
              the mold. A black, fuzzy patch in a healthy adult may cause
              nothing; the same patch in an asthmatic child may cause a
              flare-up. Second: "regardless of the type" means the mold's color
              or species isn't the decision-maker. The industry's obsession with
              testing and identifying mold types matters far less than most
              companies imply.
            </p>
          </div>
        </div>
      </section>

      {/* EPA evidence — SOURCED */}
      <section className="block alt" aria-labelledby="epa-evidence">
        <div className="wrap">
          <span className="eyebrow reveal">Sourced: EPA</span>
          <h2 id="epa-evidence" className="reveal">
            What the EPA's Research Links Dampness and Mold To
          </h2>
          <div className="richtext">
            <p>
              The U.S. Environmental Protection Agency has studied indoor dampness
              and mold for decades, and its conclusions are measured rather
              than alarming. According to EPA research (as reported by The
              Conversation), living with damp, moldy indoor conditions can raise
              the risk of asthma and other breathing problems by as much as
              50%. In our research we also documented that an estimated 47–50%
              of US homes have some mold or dampness problem — citing a KFF
              Health News report quoting Harvard T.H. Chan School of Public
              Health research — so this isn't a rare edge case; it's a common
              housing condition. (
              <a
                href="https://kffhealthnews.org/public-health/mold-health-crisis-natural-disasters-public-health/"
                rel="noopener noreferrer"
              >
                KFF Health News
              </a>
              ;{" "}
              <a href="https://www.epa.gov/mold" rel="noopener noreferrer">
                EPA mold guidance
              </a>
              )
            </p>
            <p>
              The EPA's practical guidance is equally plain: keep indoor
              relative humidity below 60% (ideally 30–50%), and dry wet
              materials within 24–48 hours, because mold can germinate in that
              window. The health risk and the building guidance point the same
              direction — control moisture, and the mold problem never starts.
            </p>
          </div>
        </div>
      </section>

      {/* Who is more sensitive — general, CDC-based */}
      <section className="block" aria-labelledby="sensitive-groups">
        <div className="wrap">
          <span className="eyebrow reveal">General guidance</span>
          <h2 id="sensitive-groups" className="reveal">
            Who Is More Sensitive — and How You'd Notice
          </h2>
          <div className="richtext">
            <p>
              Health agencies consistently flag the same groups as more likely
              to react: people with asthma or mold allergies, people with
              weakened immune systems, and children and older adults. That's a
              general pattern from CDC and EPA materials, not a diagnosis of
              anyone's situation.
            </p>
            <p>
              The most useful signal is the <strong>pattern</strong>, not any
              single symptom. Health agencies describe reactions like sneezing,
              watery eyes, coughing, and asthma flare-ups — and the telling
              pattern is when they're worse at home and ease up at school, at
              work, or on vacation. If you notice that pattern in your
              household, the answer isn't a mold test from the hardware store;
              it's two parallel conversations: one with your doctor about the
              people, one with a qualified inspector about the building.
            </p>
          </div>
        </div>
      </section>

      {/* Small cleanup basics — general guidance */}
      <section className="block alt" aria-labelledby="small-cleanup">
        <div className="wrap">
          <span className="eyebrow reveal">General guidance</span>
          <h2 id="small-cleanup" className="reveal">
            Safe Handling Basics for Small Cleanups
          </h2>
          <div className="richtext">
            <p>
              A widely cited EPA guideline draws the homeowner-vs-professional
              line around <strong>10 square feet</strong>: areas larger than
              that — and mold in HVAC systems or inside walls — are best
              handled by professionals regardless of what you're willing to
              tackle. Below that line, EPA's cleanup materials describe basic
              precautions for do-it-yourself cleanup:
            </p>
            <ul>
              <li>
                <strong>Protect yourself:</strong> gloves, an N95 respirator,
                and eye protection while working. Ventilate the area.
              </li>
              <li>
                <strong>Remove, don't just wipe:</strong> hard surfaces can be
                scrubbed with detergent and dried completely; porous materials
                (drywall, ceiling tiles, carpet) that stayed wet generally need
                to be cut out and discarded.
              </li>
              <li>
                <strong>Fix the moisture source first:</strong> mold returns
                wherever the moisture does. Dry everything within 24–48 hours
                of getting wet.
              </li>
              <li>
                <strong>Skip the bleach myth:</strong> bleach whitens mold on
                porous surfaces without removing the roots — and it doesn't fix
                the moisture that fed it.
              </li>
            </ul>
            <p>
              This is general guidance from EPA materials, not a personal
              recommendation. If anyone in the home is in a sensitive group,
              leave it to a professional regardless of the patch size.
            </p>
          </div>
        </div>
      </section>

      {/* When to call a pro regardless */}
      <section className="block" aria-labelledby="call-pro">
        <div className="wrap">
          <span className="eyebrow reveal">The bright line</span>
          <h2 id="call-pro" className="reveal">
            When a Professional Is Needed, No Matter What
          </h2>
          <div className="richtext">
            <p>Skip the DIY question and call a qualified remediator when:</p>
            <ul>
              <li>The affected area is larger than about 10 square feet.</li>
              <li>
                Mold is in the HVAC system or ductwork — disturbing it spreads
                spores through the whole house.
              </li>
              <li>
                Mold is behind walls, under floors, or above ceilings — you
                can't assess what you can't see.
              </li>
              <li>The moisture source is still active (ongoing leak, flood).</li>
              <li>
                Anyone in the home has asthma, severe allergies, or a weakened
                immune system.
              </li>
            </ul>
            <p>
              And for the health question: if symptoms worry you, that
              conversation belongs with your doctor, not with a remediator and
              not with this page. We're experts in buildings; doctors are
              experts in people. Use the right one for each job.
            </p>
          </div>
        </div>
      </section>

      <Faq items={FAQS} heading="Mold and Health: Quick Answers" />

      <CtaBand
        title="Concerned about mold in your home?"
        sub="Free inspection with documented findings — we'll tell you exactly what's there and what it takes to fix it. No scare tactics, no obligation."
      />
    </>
  );
}
