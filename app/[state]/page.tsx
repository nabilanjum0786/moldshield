import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { getState, listStates, listCities } from "@/data";
import {
  JsonLd,
  serviceSchema,
  faqJsonLd,
  speakableSchema,
} from "@/lib/schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HubHero, QaCallout, ServicesStrip } from "@/components/hub";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/icons";
import { stateFaqs } from "@/content/hub-faqs";

export const revalidate = 3600;

export async function generateStaticParams() {
  return listStates().map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: slug } = await params;
  const state = getState(slug);
  if (!state) return {};
  return {
    title: state.metaTitle,
    description: state.metaDescription,
    alternates: { canonical: `${siteConfig.siteUrl}/${state.slug}/` },
  };
}

export default async function StateHubPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: slug } = await params;
  const state = getState(slug);
  if (!state) notFound();

  const url = `${siteConfig.siteUrl}/${state.slug}/`;
  const cities = listCities(state.slug);
  const faqs = stateFaqs(state);
  const cityNames = cities.map((c) => c.name);

  // Numeric stats only from real datasets; null slots don't render.
  const stats: { value: string; label: string; source: string }[] = [];
  if (state.avgHumidity) {
    stats.push({
      value: state.avgHumidity,
      label: "average relative humidity — above 60% is the mold danger zone (EPA)",
      source: `Source: ${state.avgHumiditySource ?? "NOAA climate normals"}`,
    });
  }
  if (state.housingPre1980Pct != null) {
    stats.push({
      value: `${state.housingPre1980Pct}%`,
      label: `of ${state.name} homes built before 1980 — older stock, more mold risk`,
      source: `Source: ${state.housingSource ?? "US Census, American Community Survey"}`,
    });
  }
  if (state.floodRisk) {
    stats.push({
      value: state.floodRisk,
      label: "flood risk — and mold follows water within 24–48 hours (EPA)",
      source: `Source: ${state.floodRiskSource ?? "FEMA flood data"}`,
    });
  }
  stats.push({
    value: "$2,368",
    label: "average US mold remediation cost — most jobs $10–$25/sq ft",
    source: "Source: HomeAdvisor, 2026",
  });

  return (
    <>
      <JsonLd
        data={[
          serviceSchema({
            serviceName: `Mold Remediation in ${state.name}`,
            description: state.metaDescription,
            url,
            areaServed: [state.name, ...cityNames],
          }),
          faqJsonLd(faqs),
          speakableSchema({ url, cssSelectors: [".speakable"] }),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: state.name },
        ]}
      />

      <HubHero h1={`${state.name} Mold Remediation`} answer={state.heroAnswer} />

      {/* State mold-risk profile */}
      <section className="trust-strip block" aria-label={`${state.name} mold risk profile`}>
        <div className="wrap">
          <span
            className="eyebrow reveal"
            style={{
              color: "#ffd98a",
              background: "rgba(255,255,255,.1)",
              borderColor: "rgba(255,255,255,.25)",
            }}
          >
            Why {state.name} Gets Mold
          </span>
          <h2 style={{ color: "#fff" }} className="reveal">
            The {state.name} Mold-Risk Profile
          </h2>
          <p className="lede reveal" style={{ color: "#cfe3db" }}>
            {state.moldStory}
          </p>
          <div className="stat-row" style={{ marginTop: 24 }}>
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
          <QaCallout q={`Why is mold such a problem in ${state.name}?`}>
            {state.heroAnswer}{" "}
            <span className="heo">
              Mold follows water — find the water, and you&apos;ve found the
              mold&apos;s address.
            </span>
            <br />
            <Link href="/services/mold-inspection-testing/">
              <strong>
                Not sure you have it? Get it tested <Icon name="arrow" />
              </strong>
            </Link>
          </QaCallout>
        </div>
      </section>

      {/* Cities grid */}
      <section className="block" aria-labelledby="cities-h">
        <div className="wrap">
          <span className="eyebrow reveal">Coverage</span>
          <h2 id="cities-h" className="reveal">
            Cities We Serve in {state.name}
          </h2>
          <p className="lede reveal">
            Every city page carries the same certified process: free
            inspection, transparent pricing, photo-documented work.
          </p>
          <div className="grid cols-3" style={{ marginTop: 26 }}>
            {cities.map((c, i) => (
              <div
                key={c.slug}
                className="card reveal"
                {...(i % 3 > 0 ? { "data-delay": String(i % 3) } : {})}
              >
                <div className="card-ic">
                  <Icon name="pin" />
                </div>
                <h3>{c.name}</h3>
                <p>{c.cardBlurb ?? c.moldStory}</p>
                <Link className="more" href={`/${state.slug}/${c.slug}/`}>
                  Mold remediation in {c.name} <Icon name="arrow" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services strip */}
      <ServicesStrip
        eyebrow="Our Services"
        title={`Five Specialties, Available Across ${state.name}`}
        lede="Every job follows the same protocol: containment, removal, treatment, moisture fix, verification."
        hrefFor={(serviceSlug) => `/services/${serviceSlug}/`}
        alt
      />

      {/* State FAQ */}
      <section className="block" aria-labelledby="faq-h">
        <div className="wrap">
          <span className="eyebrow reveal">{state.name} Questions</span>
          <h2 id="faq-h" className="reveal">
            Mold Questions {state.name} Homeowners Ask
          </h2>
          <p className="lede reveal">
            Straight answers. Every answer links deeper — that&apos;s what
            makes this a hub.
          </p>
          <div className="reveal" style={{ marginTop: 24, maxWidth: 860 }}>
            <FaqAccordion items={faqs} />
          </div>
        </div>
      </section>

      <CtaBand
        title={`Free Mold Inspection in ${state.name}`}
        sub="No obligation. We'll find the mold, scope the job, and give you a written quote — free."
      />
    </>
  );
}
