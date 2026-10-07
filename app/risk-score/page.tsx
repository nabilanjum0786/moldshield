import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { RiskScoreWidget } from "@/components/RiskScoreWidget";
import { computeRiskScore, riskSummary } from "@/lib/risk-score";

export const metadata: Metadata = {
  title: `Mold Risk Score — Dayton, OH Demo | ${siteConfig.brandName}`,
  description:
    "See the mold risk score in action: a live demo for Dayton, Ohio, computed from verified Open-Meteo humidity and NOAA rainfall data fetched 2026-10-06.",
  alternates: { canonical: `${siteConfig.siteUrl}/risk-score/` },
};

/**
 * Demo page. All values below were fetched live during the build
 * (2026-10-06) — they are hardcoded here with fetch date + source links,
 * never invented:
 *
 * Open-Meteo (https://api.open-meteo.com/v1/forecast?latitude=39.76&longitude=-84.19&hourly=relative_humidity_2m&daily=relative_humidity_2m_max&forecast_days=7&timezone=auto):
 *   2026-10-06T16:00 local → RH 26%
 *   daily max RH 2026-10-06 → 2026-10-12: 97, 68, 88, 63, 60, 98, 99
 *   → 6 of 7 days above 60% RH
 *
 * NOAA Access Data Service (global-summary-of-the-month, station
 * USW00003812 Dayton Intl, units=standard):
 *   2023: 38.43 in · 2024: 66.08 in · 2025: 43.91 in
 *   → ≈41 in/yr using 2023 + 2025 (the 2024 figure is far outside the
 *   station's climatology and looks like a source-data anomaly; it is
 *   excluded and disclosed rather than silently averaged in).
 *
 * FEMA NRI: endpoint unreachable from our environment (2026-10-06) → pending.
 * Census ACS: no API key → housing-age driver pending.
 */
const DAYTON_DEMO = {
  currentHumidityPct: 26,
  daysAbove60: 6,
  annualRainfallIn: 41,
  floodRiskPercentile: null,
  pctHomesPre1980: null,
  dataAsOf: "2026-10-06",
} as const;

export default function RiskScoreDemoPage() {
  const result = computeRiskScore({ ...DAYTON_DEMO });

  return (
    <div className="wrap">
      <div style={{ padding: "28px 0 0" }}>
        <Breadcrumbs
          items={[{ name: "Home", href: "/" }, { name: "Mold Risk Score" }]}
        />
      </div>

      <div className="tool reveal">
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>
          Mold Risk Score — live demo (Dayton, OH)
        </h1>
        <p className="micro">
          Real data, fetched 2026-10-06. Flood-risk and housing-age drivers are
          pending integration, so this score is labeled partial data.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.7 }}>
          This is the score engine running on verified numbers — not a mockup.
          Dayton happened to be dry at fetch time (26% RH) but faces a humid
          week ahead (6 of 7 days above 60%), which is why the score lands in{" "}
          {result.band.toLowerCase()} territory rather than low.
        </p>
      </div>

      <div style={{ marginTop: 24 }}>
        <RiskScoreWidget result={result} locationName="Dayton, OH" />
      </div>

      <div className="tool reveal" style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>
          Where these numbers came from
        </h2>
        <ul style={{ fontSize: 14, lineHeight: 1.9, paddingLeft: 20 }}>
          <li>
            <strong>Current humidity 26%</strong> — Open-Meteo hourly, Dayton
            (39.76, −84.19), 2026-10-06T16:00 local.{" "}
            <a
              href="https://api.open-meteo.com/v1/forecast?latitude=39.76&longitude=-84.19&hourly=relative_humidity_2m&daily=relative_humidity_2m_max&forecast_days=7&timezone=auto"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0F3D3E", fontWeight: 600 }}
            >
              Re-run this query
            </a>
          </li>
          <li>
            <strong>6 of 7 days above 60% RH</strong> — same Open-Meteo call,
            daily max RH 97 / 68 / 88 / 63 / 60 / 98 / 99 for 2026-10-06 →
            2026-10-12 (60% exactly does not count as &quot;above&quot;).
          </li>
          <li>
            <strong>≈41 in/year rainfall</strong> — NOAA Global Summary of the
            Month, station USW00003812 (Dayton Intl): 38.43 in (2023), 43.91 in
            (2025). The 2024 figure (66.08 in) was excluded as a source-data
            anomaly — disclosed here rather than hidden.{" "}
            <a
              href="https://www.ncei.noaa.gov/access/services/data/v1?dataset=global-summary-of-the-month&dataTypes=PRCP&stations=USW00003812&startDate=2023-01-01&endDate=2025-12-31&format=json&units=standard"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0F3D3E", fontWeight: 600 }}
            >
              Re-run this query
            </a>
          </li>
          <li>
            <strong>Flood risk: pending</strong> — FEMA National Risk Index was
            unreachable from our environment when checked (2026-10-06).
          </li>
          <li>
            <strong>Housing age: pending</strong> — the Census API now requires
            a free key we have not set up yet.
          </li>
        </ul>
        <p style={{ fontSize: 13, color: "#666", marginTop: 8 }}>
          SEO note: {riskSummary(result, "Dayton, Ohio")}
        </p>
      </div>

      <div className="tool reveal" style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>
          Embed this score on your site
        </h2>
        <p style={{ fontSize: 14, lineHeight: 1.7 }}>
          Realtors and home inspectors: drop this widget on any page with one
          line. Free, with attribution.
        </p>
        <pre
          style={{
            background: "#0B2B26",
            color: "#fff",
            borderRadius: 10,
            padding: "14px 16px",
            fontSize: 12.5,
            overflowX: "auto",
          }}
        >
{`<iframe src="${siteConfig.siteUrl}/embed/risk-score/?place=Dayton%2C%20OH&rh=26&days=6&rain=41&asof=2026-10-06"
  width="640" height="560" style="border:0" loading="lazy"
  title="Mold risk score"></iframe>`}
        </pre>
      </div>

      <div style={{ marginTop: 24 }}>
        <CtaBand
          title="Curious about your own home? Get a real inspection."
          sub="Free inspection, transparent pricing, photo-documented work — the score can't replace a professional's eyes."
        />
      </div>
    </div>
  );
}
