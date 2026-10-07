import type { MetadataRoute } from "next";
import { siteConfig, services } from "@/lib/site-config";
import { listStates, listCities, listTowns, listStormCounties } from "@/data";

/**
 * Sitemap — enumerated from the data layer (data-driven, no hardcoded pages).
 *
 * AT 100k SCALE: split into per-state sitemap indexes. The plug-in point is
 * marked below — generate one sitemap per state (app/sitemap-ohio.xml style
 * via a [...sitemap] route or generateSitemaps) and list them in a sitemap
 * index at /sitemap.xml. Google caps a single sitemap at 50,000 URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/services/`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/locations/`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/process/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/about/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact/`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacy/`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms/`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/guides/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  for (const g of [
    "mold-myths",
    "home-types",
    "room-by-room",
    "buying-home",
    "state-licensing",
    "proper-scope",
    "mold-health",
    "selling-home",
    "property-managers",
  ]) {
    urls.push({
      url: `${base}/guides/${g}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  // Story pages (Dayton hyperlocal stories)
  for (const s of ["tornado-mold-dayton", "dayton-flood-history"]) {
    urls.push({
      url: `${base}/stories/${s}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const s of services) {
    urls.push({
      url: `${base}/services/${s.slug}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // ── AT SCALE: replace this loop with per-state sitemap generation ──
  // (see note above; each state's URLs go in that state's sitemap file).
  for (const st of listStates()) {
    urls.push({
      url: `${base}/${st.slug}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });
    for (const c of listCities(st.slug)) {
      urls.push({
        url: `${base}/${st.slug}/${c.slug}/`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.9,
      });
      // Service-in-city pages (disambiguation route: /{state}/{city}/{service}/)
      for (const s of services) {
        urls.push({
          url: `${base}/${st.slug}/${c.slug}/${s.slug}/`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
      // Town pages (disambiguation route: /{state}/{city}/{town}/)
      for (const t of listTowns(st.slug, c.slug)) {
        urls.push({
          url: `${base}/${st.slug}/${c.slug}/${t.slug}/`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
    }
  }

  // Storm-response pages (Workstream F) — one per verified event record.
  urls.push({
    url: `${base}/storm/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  });
  for (const r of listStormCounties()) {
    urls.push({
      url: `${base}/storm/${r.countySlug}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return urls;
}
