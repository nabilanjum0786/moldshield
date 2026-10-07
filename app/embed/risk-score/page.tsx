import type { Metadata } from "next";
import { Suspense } from "react";
import { siteConfig } from "@/lib/site-config";
import { EmbedClient } from "./embed-client";

export const metadata: Metadata = {
  title: `Mold Risk Score Embed | ${siteConfig.brandName}`,
  description:
    "Embeddable mold risk score widget for realtors and home inspectors. Free to embed with attribution.",
  alternates: { canonical: `${siteConfig.siteUrl}/embed/risk-score/` },
  robots: { index: false, follow: false },
};

/**
 * Iframe-friendly embed page. Query params (all optional):
 *   place  — display name, e.g. ?place=Austin,%20TX
 *   rh     — current outdoor RH %, e.g. ?rh=72
 *   dew    — current dew point °F (optional)
 *   days   — 7-day outlook days above 60% RH, e.g. ?days=4
 *   rain   — annual rainfall in inches, e.g. ?rain=41
 *   flood  — FEMA NRI flood-risk percentile (optional)
 *   housing— % homes pre-1980 (optional)
 *   asof   — ISO fetch date, e.g. ?asof=2026-10-06
 *
 * Any numeric driver left out renders as "pending" — never invented.
 * With no numeric params at all, the page shows the verified Dayton, OH
 * sample (labeled as a sample, fetched 2026-10-06).
 */
export default function EmbedRiskScorePage() {
  return (
    <div className="wrap" style={{ paddingTop: 24, paddingBottom: 24 }}>
      <Suspense fallback={<p>Loading…</p>}>
        <EmbedClient />
      </Suspense>
    </div>
  );
}
