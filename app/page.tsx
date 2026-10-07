import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { JsonLd, speakableSchema } from "@/lib/schema";
import { Hero } from "@/components/Hero";
import { TownTicker } from "@/components/TownTicker";
import { TrustStrip, StatCards } from "@/components/TrustStrip";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ToolsSection } from "@/components/ToolsSection";
import { ChecklistCta } from "@/components/ChecklistCta";
import {
  Problems,
  MoldTypes,
  VsComparison,
  SeasonCalendarSection,
  ProcessTeaser,
  WhyChoose,
  NotSure,
} from "@/components/home-sections";
import {
  StatesCarousel,
  CitiesCarousel,
  TownsPills,
} from "@/components/LocationsHome";
import { HomeFaq } from "@/components/HomeFaq";
import { BeforeAfter } from "@/components/BeforeAfter";
import { CtaBand } from "@/components/CtaBand";
import { DisclosureNotice } from "@/components/DisclosureNotice";

export const metadata: Metadata = {
  title: `Mold Remediation Across America | ${siteConfig.brandName}`,
  description:
    "Honest mold remediation guidance for American homeowners — attic, crawl space, basement and black mold removal. Free inspections, transparent 2026 pricing, 24/7 response.",
  alternates: { canonical: `${siteConfig.siteUrl}/` },
};

/**
 * Homepage — v3 "Clear air" flow:
 * hero → disclosure → town ticker → orient (tools) → stats → services
 * → checklist → process → before/after → problems/mold-types/compare
 * → impact stats → season calendar → location carousels → why/not-sure
 * → FAQ hub → final CTA.
 * All locked blueprint sections preserved, one unified design system.
 */
export default function HomePage() {
  const url = `${siteConfig.siteUrl}/`;
  return (
    <>
      <JsonLd
        data={[
          speakableSchema({ url, cssSelectors: [".speakable"] }),
        ]}
      />
      {/* Hero — v3 */}
      <Hero />
      {/* Early disclosure — before any marketing content */}
      <DisclosureNotice variant="short" />
      {/* Town ticker marquee */}
      <TownTicker />
      {/* Orient: quiz + estimator */}
      <ToolsSection />
      {/* Trust strip */}
      <TrustStrip />
      {/* Services grid */}
      <ServicesGrid />
      {/* Lead magnet: free checklist */}
      <ChecklistCta />
      {/* Process teaser */}
      <ProcessTeaser />
      {/* Before/after (honesty-labeled) */}
      <BeforeAfter />
      {/* Problems cluster */}
      <Problems />
      {/* Mold types */}
      <MoldTypes />
      {/* Specialist vs generalist */}
      <VsComparison />
      {/* Impact stats */}
      <StatCards />
      {/* Season calendar */}
      <SeasonCalendarSection />
      {/* Location carousels */}
      <StatesCarousel />
      <CitiesCarousel />
      <TownsPills />
      {/* Why choose us */}
      <WhyChoose />
      {/* Not sure teaser */}
      <NotSure />
      {/* FAQ hub */}
      <HomeFaq />
      {/* Final CTA — v3 deep teal band */}
      <CtaBand
        title={
          <>
            Let&apos;s make the
            <br />
            <em>unknown smaller.</em>
          </>
        }
        sub="Call for a calm, no-pressure conversation about what you're seeing at home. Free inspection, written quote, zero obligation."
      />
    </>
  );
}
