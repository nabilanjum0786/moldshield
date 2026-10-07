import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import {
  getState,
  getCity,
  listStates,
  listCities,
  listTowns,
  formatPopulation,
} from "@/data";
import {
  JsonLd,
  serviceSchema,
  faqJsonLd,
  speakableSchema,
} from "@/lib/schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HubHero, QaCallout, ServicesStrip, RiskCards, Pills } from "@/components/hub";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/icons";
import { CostEstimator } from "@/components/CostEstimator";
import { cityFaqs } from "@/content/hub-faqs";

export const revalidate = 3600;

export async function generateStaticParams() {
  const params: { state: string; city: string }[] = [];
  for (const st of listStates()) {
    for (const c of listCities(st.slug)) {
      params.push({ state: st.slug, city: c.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}): Promise<Metadata> {
  const { state: sSlug, city: cSlug } = await params;
  const state = getState(sSlug);
  const city = getCity(sSlug, cSlug);
  if (!state || !city) return {};
  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: { canonical: `${siteConfig.siteUrl}/${sSlug}/${cSlug}/` },
  };
}

export default async function CityHubPage({
  params,
}: {
  params: Promise<{ state: string; city: string }>;
}) {
  const { state: sSlug, city: cSlug } = await params;
  const state = getState(sSlug);
  const city = getCity(sSlug, cSlug);
  if (!state || !city) notFound();

  const url = `${siteConfig.siteUrl}/${sSlug}/${cSlug}/`;
  const towns = listTowns(sSlug, cSlug);
  const faqs = cityFaqs(state, city);
  const townNames = towns.map((t) => t.name);

  const stats: { value: string; label: string; source: string }[] = [];
  if (city.population != null) {
    stats.push({
      value: formatPopulation(city.population),
      label: `residents in ${city.name} — every home a potential job`,
      source: "Source: US Census",
    });
  }
  if (city.housingPre1980Pct != null) {
    stats.push({
      value: `${city.housingPre1980Pct}%`,
      label: `of ${city.name} homes built before 1980`,
      source: "Source: US Census, American Community Survey",
    });
  }
  if (city.annualRainfallIn != null) {
    stats.push({
      value: `${city.annualRainfallIn} in`,
      label: "average annual rainfall — water is mold's invitation",
      source: "Source: NOAA climate normals",
    });
  }
  stats.push({
    value: "24–48 hrs",
    label: "for mold to start growing after water damage",
    source: "Source: EPA guidance",
  });

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            serviceName: `Mold Remediation in ${city.name}, ${state.name}`,
            description: city.metaDescription,
            url,
            areaServed: [city.name, ...townNames, state.name],
          }),
          faqJsonLd(faqs),
          speakableSchema({ url, cssSelectors: [".speakable"] }),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: state.name, href: `/${state.slug}/` },
          { name: city.name },
        ]}
      />

      <HubHero
        h1={`Mold Remediation in ${city.name}, ${state.name}`}
        answer={city.heroAnswer}
      />

      {/* City data strip */}
      <section className="trust-strip block" aria-label={`${city.name} mold facts`}>
        <div className="wrap">
          <div className="stat-row">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="stat reveal"
                {...(i > 0 ? { "data-delay": String(Math.min(i, 4)) } : {})}
              >
                <div className="num" data-final={s.value}>
                  {s.value}
                </div>
                <div className="lbl">{s.label}</div>
                <div className="src">{s.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hyperlocal intro */}
      <section className="block" aria-labelledby="local-h">
        <div className="wrap">
          <span className="eyebrow reveal">
            {city.name}, {state.name}
          </span>
          <h2 id="local-h" className="reveal">
            Why {city.name} Homes Get Mold
          </h2>
          {city.climateNote && <p className="lede reveal">{city.climateNote}</p>}
          {city.housingNote && <p className="lede reveal">{city.housingNote}</p>}
          <p className="reveal">
            We serve {city.neighborhoods.join(", ")} and the surrounding
            communities — every visit follows the same certified protocol:
            containment, removal, treatment, moisture fix, verification.
          </p>
          <QaCallout q={`How do I know if my ${city.name} home has a mold problem?`}>
            Musty odors that survive cleaning, visible spots on ceilings or
            walls, allergy symptoms that ease when you leave the house — any of
            these earns a free inspection.{" "}
            <span className="heo">
              Your house is the experiment — track where symptoms ease.
            </span>
            <br />
            <Link href="/services/mold-inspection-testing/">
              <strong>
                Get it tested in {city.name} →
              </strong>
            </Link>
          </QaCallout>
        </div>
      </section>

      {/* Mold risks in this city */}
      <section className="block alt" aria-labelledby="risks-h">
        <div className="wrap">
          <span className="eyebrow reveal">Local Risk Map</span>
          <h2 id="risks-h" className="reveal">
            The Mold Risks We See Most in {city.name}
          </h2>
          <RiskCards cards={city.riskCards} cols={2} />
        </div>
      </section>

      {/* Dayton-only: viral-angle stories + storm response.
          Wires FIX 3 angles into the city page. Story pages are built by
          FIX 2 (app/stories/…) — paths named here must match exactly. */}
      {sSlug === "ohio" && cSlug === "dayton" && (
        <section className="block" aria-labelledby="dayton-stories-h">
          <div className="wrap">
            <span className="eyebrow reveal">Dayton Stories</span>
            <h2 id="dayton-stories-h" className="reveal">
              Dayton&apos;s Mold Stories — Written for Locals
            </h2>
            <div className="grid cols-2" style={{ marginTop: 26 }}>
              <div className="card reveal">
                <h3>
                  The 2019 tornadoes are still growing mold in Dayton attics
                </h3>
                <p>
                  Months after the 2019 Memorial Day tornadoes, Dayton
                  homeowners were still discovering attic mold as insurance
                  disputes dragged on (Dayton Daily News, 2019). Why storm
                  damage hides, and what to check in your attic now.
                </p>
                <Link className="more" href="/stories/tornado-mold-dayton/">
                  Read the story <Icon name="arrow" />
                </Link>
              </div>
              <div className="card reveal" data-delay="1">
                <h3>
                  Why Dayton basements flood: from the 1913 flood to the Miami
                  Conservancy District
                </h3>
                <p>
                  After the 1913 Great Flood, Dayton invented modern flood
                  control — but basements still flood. What the floodplain
                  means for your home, and the warning signs to watch for.
                </p>
                <Link className="more" href="/stories/dayton-flood-history/">
                  Read the story <Icon name="arrow" />
                </Link>
              </div>
              <div className="card reveal" data-delay="2">
                <h3>Montgomery County storm response: 48-hour action plan</h3>
                <p>
                  Built from a verified June 7, 2026 NOAA flash-flood event in
                  Montgomery County — your 24–72 hour mold checklist,
                  insurance guidance, and a free mold triage.
                </p>
                <Link className="more" href="/storm/montgomery-county/">
                  See the action plan <Icon name="arrow" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Nearby towns */}
      <section className="block" aria-labelledby="towns-h">
        <div className="wrap">
          <span className="eyebrow reveal">Nearby Communities</span>
          <h2 id="towns-h" className="reveal">
            Towns We Serve Around {city.name}
          </h2>
          <p className="lede reveal">
            Each town has its own page with local detail. Click through for
            town-specific mold risks and pricing.
          </p>
          <Pills
            items={towns.map((t) => ({
              href: `/${state.slug}/${city.slug}/${t.slug}/`,
              label: t.name,
            }))}
          />
        </div>
      </section>

      {/* Services strip — city-scoped: links to service-in-city pages */}
      <ServicesStrip
        eyebrow="Our Services"
        title={`Mold Services in ${city.name}`}
        lede="Attic, basement, crawl space, black mold, and inspection — all five available city-wide, same protocol on every job."
        hrefFor={(serviceSlug) => `/${state.slug}/${city.slug}/${serviceSlug}/`}
        alt
      />

      {/* Cost estimator */}
      <section className="block" aria-labelledby="est-h">
        <div className="wrap">
          <span className="eyebrow reveal">Transparent Pricing</span>
          <h2 id="est-h" className="reveal">
            Estimate Your {city.name} Mold Job
          </h2>
          <p className="lede reveal">
            Real 2026 national ranges (HomeAdvisor), scoped to your area and
            severity. A free inspection gives the exact written quote.
          </p>
          <div style={{ marginTop: 24, maxWidth: 720 }} id="city-estimator">
            <CostEstimator />
          </div>
          <p className="disclaimer reveal" style={{ maxWidth: 720 }}>
            Ranges: HomeAdvisor 2026 national data. {city.name} pricing
            confirmed at your free inspection.
          </p>
        </div>
      </section>

      {/* City FAQ */}
      <section className="block alt" aria-labelledby="faq-h">
        <div className="wrap">
          <span className="eyebrow reveal">{city.name} Questions</span>
          <h2 id="faq-h" className="reveal">
            Mold Questions {city.name} Homeowners Ask
          </h2>
          <div className="reveal" style={{ marginTop: 24, maxWidth: 860 }}>
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      <CtaBand
        title={`Free Mold Inspection in ${city.name}`}
        sub="No obligation. We'll find the mold, scope the job, and give you a written quote — free."
      />
    </>
  );
}
