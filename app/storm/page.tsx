import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { listStormCounties } from "@/data";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Icon } from "@/components/icons";

/**
 * Storm Response index — every county with a verified-event response page.
 * Grows automatically as scripts/generate-storm-page.mjs adds records.
 */

export const metadata: Metadata = {
  title: `Storm Response: 48-Hour Mold Action Plans | ${siteConfig.brandName}`,
  description:
    "After a flood or severe storm, mold can start in 24–48 hours. County-by-county action plans built from verified NOAA storm event data.",
  alternates: { canonical: `${siteConfig.siteUrl}/storm/` },
};

export default function StormIndexPage() {
  const counties = listStormCounties();
  return (
    <>
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Storm Response" }]}
      />
      <section className="block" aria-labelledby="storm-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <p className="eyebrow">Storm Response</p>
          <h1 id="storm-h">48-hour mold action plans, by county</h1>
          <p className="speakable" style={{ color: "var(--muted)" }}>
            After a flood or severe storm, the EPA says mold can begin growing
            within 24–48 hours. Each page below is built from a{" "}
            <strong>verified storm event</strong> — real NOAA data, real date —
            with a 24–72 hour checklist, insurance guidance, and a free mold
            triage.
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "28px 0 0",
              display: "grid",
              gap: 12,
            }}
          >
            {counties.map((r) => {
              const place = r.stateAbbr
                ? `${r.countyName}, ${r.stateAbbr}`
                : r.countyName;
              return (
                <li key={r.countySlug}>
                  <Link
                    href={`/storm/${r.countySlug}/`}
                    style={{
                      display: "block",
                      background: "#fff",
                      border: "1px solid var(--line)",
                      borderRadius: "var(--radius)",
                      padding: "18px 20px",
                      textDecoration: "none",
                    }}
                  >
                    <strong style={{ color: "var(--ink)" }}>
                      {r.eventType} in {place}
                    </strong>
                    <span
                      style={{
                        display: "block",
                        color: "var(--muted)",
                        fontSize: 14,
                        marginTop: 4,
                      }}
                    >
                      {r.eventDate} · 24–72h mold action plan{" "}
                      <Icon name="arrow" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
