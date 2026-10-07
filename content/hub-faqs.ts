import { siteConfig } from "@/lib/site-config";
import type { StateData, CityData, TownData } from "@/data/types";

export type HubFaq = { q: string; aHtml: string };

const insp = (label: string) =>
  `<br/><a href="/services/mold-inspection-testing/"><strong>${label} →</strong></a>`;

/** State hub FAQ (6) — from the state-hub template. */
export function stateFaqs(state: StateData): HubFaq[] {
  const cities = "Dayton";
  return [
    {
      q: `How much does mold remediation cost in ${state.name}?`,
      aHtml: `Professional remediation nationally averages <strong>$1,223–$3,757</strong>, with most homeowners spending about <strong>$2,368</strong> (HomeAdvisor, 2026).${
        state.costNote ? ` ${state.costNote}` : ""
      } Most jobs run $10–$25 per square foot; inspection costs $303–$1,075 (Angi, 2026). <span class="heo">The price nobody quotes you is the price of waiting.</span>${insp("Get your free inspection")}`,
    },
    {
      q: `Does ${state.name} require a license for mold remediation?`,
      aHtml: `${state.moldLawNote ?? ""} Regulations vary widely by state — a few (like Florida, Texas, and New York) have specific mold licensing laws. We follow certified containment protocol on every job regardless.<br/><a href="/process/"><strong>Our certified process →</strong></a>`,
    },
    {
      q: `Why do so many ${state.name} homes get basement mold?`,
      aHtml: `Basements sit below grade where moisture collects — seepage, condensation, and storm flooding all feed growth. Seasonal freeze-thaw cycles open small foundation cracks that become water entry points each spring. Fixing the water entry is always part of our remediation.<br/><a href="/services/basement-mold-removal/"><strong>Basement mold removal →</strong></a>`,
    },
    {
      q: `Will homeowners insurance cover mold damage in ${state.name}?`,
      aHtml: `Usually <strong>only when the mold results from a covered peril</strong> — a burst pipe, sudden appliance failure — not neglect or long-term leaks. Policies and state rules vary. <span class="heo">Call your insurer BEFORE you call us — the order matters.</span>${insp("Get documented for your claim")}`,
    },
    {
      q: `How fast can mold grow after a winter pipe burst?`,
      aHtml: `Within <strong>24–48 hours</strong> of water exposure (EPA). The clock starts when the water stops, not when you notice the damage — and without the moisture fix, mold comes back.<br/><a href="/process/"><strong>See the 24–48 hour timeline →</strong></a>`,
    },
    {
      q: `Which ${state.name} cities do you serve?`,
      aHtml: `Current coverage includes ${cities} — expanding as we grow. Every city page carries the same certified process.<br/><a href="/locations/"><strong>All locations →</strong></a>`,
    },
  ];
}

/** City hub FAQ (6) — from the city-hub template. */
export function cityFaqs(state: StateData, city: CityData): HubFaq[] {
  const n = city.neighborhoods.length
    ? city.neighborhoods.join(", ")
    : "the metro area";
  return [
    {
      q: `How much does mold remediation cost in ${city.name}?`,
      aHtml: `Nationally, professional remediation averages <strong>$1,223–$3,757</strong> (HomeAdvisor, 2026).${
        city.costNote ? ` ${city.costNote}` : ""
      } Most jobs run $10–$25 per square foot; inspection costs $303–$1,075 (Angi, 2026). <span class="heo">The price nobody quotes you is the price of waiting.</span><br/><a href="#city-estimator"><strong>Estimate your job above →</strong></a>`,
    },
    {
      q: `What are the most common mold problems in ${city.name} homes?`,
      aHtml: `${city.moldStory} The pattern we see most: attic growth from ice dams and poor ventilation, basement mold after spring storms, and bathroom mold from undersized exhaust fans.${insp("Get your home assessed")}`,
    },
    {
      q: `Do you serve ${n}?`,
      aHtml: `Yes — our ${city.name} coverage includes ${n} and surrounding communities. Same certified process on every visit.<br/><a href="#final-cta"><strong>Book your free inspection →</strong></a>`,
    },
    {
      q: `How long does mold remediation take in a ${city.name} home?`,
      aHtml: `Most residential jobs take <strong>1–3 days</strong>; whole-house jobs can take 3–10+ days. <span class="heo">The drying takes longer than the cleaning — plan for it.</span> We give you a timeline in writing before work starts.<br/><a href="/process/"><strong>Our 6-step process →</strong></a>`,
    },
    {
      q: `Can mold affect my home sale in ${city.name}?`,
      aHtml: `Yes. Visible mold or a failed inspection can stall or kill a sale — <span class="heo">buyers walk from mold they find, not mold you disclose.</span> Professional remediation with moisture-fix documentation protects your price.${insp("Pre-listing inspection")}`,
    },
    {
      q: `Is the free inspection in ${city.name} really free?`,
      aHtml: `Yes — no obligation, no pressure. We find the mold, scope the job, and give you a written quote. If there's no mold, we'll tell you that too.<br/><a href="#final-cta"><strong>Book it now →</strong></a>`,
    },
  ];
}

/** Town FAQ (4) — from the town template. */
export function townFaqs(
  state: StateData,
  city: CityData,
  town: TownData
): HubFaq[] {
  const base = `/${state.slug}/${city.slug}`;
  return [
    {
      q: `How much does mold removal cost in ${town.name}?`,
      aHtml: `Nationally, professional remediation averages <strong>$1,223–$3,757</strong>, with most homeowners spending about <strong>$2,368</strong> (HomeAdvisor, 2026).${
        town.costNote ? ` ${town.costNote}` : ""
      } Most jobs run $10–$25 per square foot. <span class="heo">The price nobody quotes you is the price of waiting.</span>${insp("Get your free inspection")}`,
    },
    {
      q: `What causes mold in ${town.name} homes?`,
      aHtml: `${town.moldNote ?? town.moldStory} The usual suspects everywhere: roof leaks feeding attic growth, basement seepage after storms, bathroom fans venting into attics, and indoor humidity above 60%. Mold can begin growing within 24–48 hours of water exposure (EPA).<br/><a href="${base}/"><strong>How ${city.name} compares →</strong></a>`,
    },
    {
      q: `Do you offer free mold inspections in ${town.name}?`,
      aHtml: `Yes — free, no obligation, no pressure. We find the mold, scope the job, and give you a written quote. If there's no mold, we'll tell you that too.<br/><a href="#final-cta"><strong>Book it now →</strong></a>`,
    },
    {
      q: `How quickly can you get to ${town.name}?`,
      aHtml: `We offer 24/7 response and schedule free inspections across the Miami Valley — call <a href="${siteConfig.phoneHref}">${siteConfig.phoneDisplay}</a> to book the next available slot. For active water damage, call immediately: mold starts within 24–48 hours (EPA).<br/><a href="/process/"><strong>What happens on the visit →</strong></a>`,
    },
  ];
}
