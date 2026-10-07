import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig, services } from "@/lib/site-config";
import {
  getState,
  getCity,
  getTown,
  listPilotParams,
  listStates,
  listCities,
} from "@/data";
import {
  JsonLd,
  serviceSchema,
  faqJsonLd,
  howToSchema,
  speakableSchema,
} from "@/lib/schema";
import { pillars } from "@/content/pillars";
import { RenderBlocks } from "@/content/blocks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  HubHero,
  QaCallout,
  ServicesStrip,
  RiskCards,
} from "@/components/hub";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/icons";
import { townFaqs } from "@/content/hub-faqs";

export const revalidate = 3600;

/**
 * DISAMBIGUATION ROUTE — /{state}/{city}/{page}
 * - `page` matches a service slug → Service-in-City page
 *   (keyword: "{service} in {city}", pillar modules + city data).
 * - `page` matches a town slug → Town page.
 * - otherwise → notFound().
 */
export async function generateStaticParams() {
  const params: { state: string; city: string; page: string }[] = [];
  for (const st of listStates()) {
    for (const c of listCities(st.slug)) {
      for (const s of services) {
        params.push({ state: st.slug, city: c.slug, page: s.slug });
      }
    }
  }
  for (const p of listPilotParams()) {
    params.push({ state: p.state, city: p.city, page: p.page });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; city: string; page: string }>;
}): Promise<Metadata> {
  const { state: sSlug, city: cSlug, page: pSlug } = await params;
  const state = getState(sSlug);
  const city = getCity(sSlug, cSlug);
  if (!state || !city) return {};
  const base = `${siteConfig.siteUrl}/${sSlug}/${cSlug}/${pSlug}/`;

  if (pillars[pSlug]) {
    const pillar = pillars[pSlug];
    return {
      title: `${pillar.name} in ${city.name}, ${state.name} | ${siteConfig.brandName}`,
      description: `${pillar.name} in ${city.name}, ${state.name}: certified specialists, free inspections, transparent 2026 pricing. ${pillar.metaDescription}`,
      alternates: { canonical: base },
    };
  }
  const town = getTown(sSlug, cSlug, pSlug);
  if (town) {
    return {
      title: town.metaTitle,
      description: town.metaDescription,
      alternates: { canonical: base },
    };
  }
  return {};
}

type Params = { state: string; city: string; page: string };

export default async function DisambiguationPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { state: sSlug, city: cSlug, page: pSlug } = await params;
  const state = getState(sSlug);
  const city = getCity(sSlug, cSlug);
  if (!state || !city) notFound();

  // Service slugs win the disambiguation.
  if (pillars[pSlug]) {
    return <ServiceInCity state={state} city={city} serviceSlug={pSlug} />;
  }
  const town = getTown(sSlug, cSlug, pSlug);
  if (town) {
    return <TownPage state={state} city={city} town={town} />;
  }
  notFound();
}

// ── Service-in-City ──────────────────────────────────────────

function ServiceInCity({
  state,
  city,
  serviceSlug,
}: {
  state: NonNullable<ReturnType<typeof getState>>;
  city: NonNullable<ReturnType<typeof getCity>>;
  serviceSlug: string;
}) {
  const pillar = pillars[serviceSlug];
  const url = `${siteConfig.siteUrl}/${state.slug}/${city.slug}/${serviceSlug}/`;
  const siblings = services.filter((s) => s.slug !== serviceSlug);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            serviceName: `${pillar.name} in ${city.name}, ${state.name}`,
            description: `${pillar.metaDescription} Serving ${city.name} and the surrounding Miami Valley communities.`,
            url,
            areaServed: [city.name, state.name],
          }),
          faqJsonLd(pillar.faqs.map((f) => ({ q: f.question, aHtml: f.answer }))),
          howToSchema({
            name: `${pillar.name} in ${city.name} — Our Process`,
            steps: pillar.processSteps,
            url,
          }),
          speakableSchema({ url, cssSelectors: [".speakable"] }),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: state.name, href: `/${state.slug}/` },
          { name: city.name, href: `/${state.slug}/${city.slug}/` },
          { name: `${pillar.name} in ${city.name}` },
        ]}
      />

      <HubHero
        h1={`${pillar.name} in ${city.name}, ${state.name}`}
        answer={`${pillar.heroAnswer} In ${city.name}, ${city.moldStory.split(".")[0].toLowerCase()}.`}
      />

      {/* City context */}
      <section className="block" aria-labelledby="local-h">
        <div className="wrap">
          <span className="eyebrow reveal">
            {city.name}, {state.name}
          </span>
          <h2 id="local-h" className="reveal">
            {pillar.name} for {city.name} Homes
          </h2>
          <p className="lede reveal">{city.moldStory}</p>
          <QaCallout q={`Do you offer ${pillar.name.toLowerCase()} in ${city.name}?`}>
            Yes — every {city.name} job follows the same certified protocol:
            containment, removal, treatment, moisture fix, verification. Free
            inspection, written quote, photo-documented work.{" "}
            <span className="heo">
              Mold follows water — find the water, and you&apos;ve found the
              mold&apos;s address.
            </span>
            <br />
            <Link href="#final-cta">
              <strong>
                Book your free {city.name} inspection →
              </strong>
            </Link>
          </QaCallout>
        </div>
      </section>

      {/* Pillar modules (national content, city-scoped page) */}
      <section className="block alt" aria-label={`${pillar.name} guide`}>
        <div className="wrap">
          <RenderBlocks blocks={pillar.blocks} />
        </div>
      </section>

      {/* Sibling services in this city (interlinking mesh) */}
      <ServicesStrip
        eyebrow={city.name}
        title={`More Mold Services in ${city.name}`}
        hrefFor={(slug) => `/${state.slug}/${city.slug}/${slug}/`}
        extraCard={
          <div
            className="card reveal"
            data-delay="2"
            style={{
              background: "#0b2b26",
              color: "#eaf5f1",
              borderColor: "#0b2b26",
            }}
          >
            <h3 style={{ color: "#fff" }}>Back to {city.name}</h3>
            <p style={{ color: "#cfe3db" }}>
              See every service, town, and local risk for the {city.name} hub.
            </p>
            <Link
              href={`/${state.slug}/${city.slug}/`}
              style={{ color: "#ffd98a" }}
            >
              <strong>
                {city.name} hub page <Icon name="arrow" />
              </strong>
            </Link>
          </div>
        }
      />

      {/* FAQ */}
      <section className="block alt" aria-labelledby="faq-h">
        <div className="wrap">
          <span className="eyebrow reveal">Questions, Answered</span>
          <h2 id="faq-h" className="reveal">
            {pillar.name} in {city.name} — FAQ
          </h2>
          <div className="reveal" style={{ marginTop: 24, maxWidth: 860 }}>
            <FaqAccordion
              items={pillar.faqs.map((f) => ({ q: f.question, aHtml: f.answer }))}
            />
          </div>
          <p className="reveal" style={{ marginTop: 18 }}>
            <Link className="more" href={`/services/${pillar.slug}/`}>
              Read the full national {pillar.name.toLowerCase()} guide{" "}
              <Icon name="arrow" />
            </Link>
          </p>
          {siblings.length > 0 && (
            <p className="reveal" style={{ marginTop: 6 }}>
              {siblings.slice(0, 2).map((s, i) => (
                <span key={s.slug}>
                  {i > 0 && " · "}
                  <Link
                    className="more"
                    href={`/${state.slug}/${city.slug}/${s.slug}/`}
                  >
                    {s.name} in {city.name} <Icon name="arrow" />
                  </Link>
                </span>
              ))}
            </p>
          )}
        </div>
      </section>

      <CtaBand
        title={`Free ${pillar.name} Inspection in ${city.name}`}
        sub="No obligation. We'll find the mold, scope the job, and give you a written quote — free."
      />
    </>
  );
}

// ── Town page ────────────────────────────────────────────────

function TownPage({
  state,
  city,
  town,
}: {
  state: NonNullable<ReturnType<typeof getState>>;
  city: NonNullable<ReturnType<typeof getCity>>;
  town: NonNullable<ReturnType<typeof getTown>>;
}) {
  const url = `${siteConfig.siteUrl}/${state.slug}/${city.slug}/${town.slug}/`;
  const faqs = townFaqs(state, city, town);

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            serviceName: `Mold Removal in ${town.name}, ${state.name}`,
            description: town.metaDescription,
            url,
            areaServed: [town.name, city.name, state.name],
          }),
          faqJsonLd(faqs),
          speakableSchema({ url, cssSelectors: [".speakable"] }),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: state.name, href: `/${state.slug}/` },
          { name: city.name, href: `/${state.slug}/${city.slug}/` },
          { name: town.name },
        ]}
      />

      <HubHero h1={`${town.name} Mold Removal`} answer={town.heroAnswer} />

      {/* Hyperlocal intro */}
      <section className="block" aria-labelledby="local-h">
        <div className="wrap">
          <span className="eyebrow reveal">
            {town.name}, {state.name}
          </span>
          <h2 id="local-h" className="reveal">
            Mold in {town.name}: The Local Picture
          </h2>
          {town.intro ? (
            <p className="lede reveal">{town.intro}</p>
          ) : (
            <p className="lede reveal">{town.moldStory}</p>
          )}
          <div className="reveal" style={{ marginTop: 14 }}>
            {town.landmarks.length > 0 && (
              <p style={{ fontSize: 15, color: "var(--muted)" }}>
                <strong>Local landmarks:</strong> {town.landmarks.join(" · ")}
              </p>
            )}
            {town.zips.length > 0 && (
              <p style={{ fontSize: 15, color: "var(--muted)" }}>
                <strong>ZIP codes served:</strong> {town.zips.join(", ")}
              </p>
            )}
          </div>
          <QaCallout q={`Is mold common in ${town.name} homes?`}>
            {town.moldNote ?? town.moldStory} Nationally, an estimated 47–50%
            of US homes have some mold or dampness problem (KFF Health News /
            Harvard; NIH meta-analysis).{" "}
            <span className="heo">
              Mold follows water — find the water, and you&apos;ve found the
              mold&apos;s address.
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

      {/* 3 problem cards */}
      <section className="block alt" aria-labelledby="problems-h">
        <div className="wrap">
          <span className="eyebrow reveal">Watch For These</span>
          <h2 id="problems-h" className="reveal">
            The 3 Mold Problems We See Most in {town.name}
          </h2>
          <RiskCards cards={town.problemCards} cols={3} />
        </div>
      </section>

      {/* Full service menu — links to service-in-city pages */}
      <section className="block" aria-labelledby="services-h">
        <div className="wrap">
          <span className="eyebrow reveal">Full Service Menu</span>
          <h2 id="services-h" className="reveal">
            Every Mold Service, Available in {town.name}
          </h2>
          <p className="lede reveal">
            Same certified protocol on every job: containment, removal,
            treatment, moisture fix, verification.{" "}
            <Link href={`/${state.slug}/${city.slug}/`}>
              See all of {city.name} →
            </Link>
          </p>
          <div className="grid cols-2" style={{ marginTop: 26 }}>
            {services.map((s, i) => (
              <div
                key={s.slug}
                className="card reveal"
                {...(i % 2 > 0 ? { "data-delay": String(i % 2) } : {})}
              >
                <h3>
                  {s.name} in {town.name}
                </h3>
                <p>{s.blurb}</p>
                <Link
                  className="more"
                  href={`/${state.slug}/${city.slug}/${s.slug}/`}
                >
                  {s.shortName} in {town.name} <Icon name="arrow" />
                </Link>
              </div>
            ))}
            <div
              className="card reveal"
              style={{
                background: "#0b2b26",
                color: "#eaf5f1",
                borderColor: "#0b2b26",
              }}
            >
              <h3 style={{ color: "#fff" }}>
                Serving the wider {city.name} area
              </h3>
              <p style={{ color: "#cfe3db" }}>
                {town.name} is one of the Miami Valley communities we cover
                from our {city.name} hub.
              </p>
              <Link
                href={`/${state.slug}/${city.slug}/`}
                style={{ color: "#ffd98a" }}
              >
                <strong>
                  {city.name} hub page <Icon name="arrow" />
                </strong>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Town FAQ */}
      <section className="block alt" aria-labelledby="faq-h">
        <div className="wrap">
          <span className="eyebrow reveal">{town.name} Questions</span>
          <h2 id="faq-h" className="reveal">
            {town.name} Mold Questions, Answered
          </h2>
          <div className="reveal" style={{ marginTop: 24, maxWidth: 860 }}>
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      <CtaBand
        title={`Free Mold Inspection in ${town.name}`}
        sub="No obligation. We'll find the mold, scope the job, and give you a written quote — free."
      />
    </>
  );
}
