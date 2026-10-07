import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { listStates, listCities, listTowns } from "@/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HubHero } from "@/components/hub";
import { Icon } from "@/components/icons";
import { JsonLd, speakableSchema } from "@/lib/schema";

/**
 * All Locations — the SEO safety-net page: every live state, city, and
 * town as plain text links (no JS needed). Grows automatically as the
 * data layer grows.
 */
export const metadata: Metadata = {
  title: `All Service Locations | ${siteConfig.brandName}`,
  description:
    "Everywhere we remediate mold: browse all states, cities, and towns we serve, each with local mold-risk detail and free inspections.",
  alternates: { canonical: `${siteConfig.siteUrl}/locations/` },
};

export default function LocationsPage() {
  const url = `${siteConfig.siteUrl}/locations/`;
  const states = listStates();
  return (
    <>
      <JsonLd data={[speakableSchema({ url, cssSelectors: [".speakable"] })]} />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "All Locations" }]}
      />
      <HubHero
        h1="All Service Locations"
        answer="Every state, city, and town we serve — each location page carries local mold-risk detail, real pricing ranges, and the same certified process: free inspection, transparent pricing, photo-documented work."
      />
      <section className="block" aria-labelledby="loc-h">
        <div className="wrap">
          <span className="eyebrow reveal">Coverage Map</span>
          <h2 id="loc-h" className="reveal">
            Where We Remediate Mold
          </h2>
          {states.map((st) => (
            <div key={st.slug} style={{ marginTop: 28 }}>
              <h3 className="reveal">
                <Link href={`/${st.slug}/`}>{st.name}</Link>
              </h3>
              {listCities(st.slug).map((c) => (
                <div key={c.slug} style={{ marginTop: 14 }}>
                  <p style={{ margin: "0 0 6px" }}>
                    <Link
                      href={`/${st.slug}/${c.slug}/`}
                      style={{ fontWeight: 700 }}
                    >
                      {c.name}, {st.name} <Icon name="arrow" />
                    </Link>
                  </p>
                  <div className="reveal">
                    {listTowns(st.slug, c.slug).map((t) => (
                      <Link
                        key={t.slug}
                        className="pill"
                        href={`/${st.slug}/${c.slug}/${t.slug}/`}
                      >
                        {t.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
