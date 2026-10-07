"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {
  computeRiskScore,
  type RiskInputs,
} from "@/lib/risk-score";
import {
  RiskScoreWidget,
  RiskScoreAttribution,
} from "@/components/RiskScoreWidget";

// Verified Dayton, OH sample — Open-Meteo + NOAA, fetched 2026-10-06.
// Rendered only when the embedder passes no numeric params; labeled as
// a sample on the page.
const DAYTON_SAMPLE: RiskInputs = {
  currentHumidityPct: 26,
  daysAbove60: 6,
  annualRainfallIn: 41,
  floodRiskPercentile: null,
  pctHomesPre1980: null,
  dataAsOf: "2026-10-06",
};

function num(v: string | null): number | null {
  if (v == null || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export function EmbedClient() {
  const params = useSearchParams();
  const place = params.get("place") || "Dayton, OH";

  const { result, isSample } = useMemo(() => {
    const inputs: RiskInputs = {
      currentHumidityPct: num(params.get("rh")),
      dewPointF: num(params.get("dew")),
      daysAbove60: num(params.get("days")),
      annualRainfallIn: num(params.get("rain")),
      floodRiskPercentile: num(params.get("flood")),
      pctHomesPre1980: num(params.get("housing")),
      dataAsOf: params.get("asof") || undefined,
    };
    const hasAnyNumber =
      inputs.currentHumidityPct != null ||
      inputs.daysAbove60 != null ||
      inputs.annualRainfallIn != null ||
      inputs.floodRiskPercentile != null ||
      inputs.pctHomesPre1980 != null;
    if (!hasAnyNumber) {
      return { result: computeRiskScore(DAYTON_SAMPLE), isSample: true };
    }
    return { result: computeRiskScore(inputs), isSample: false };
  }, [params]);

  return (
    <div style={{ maxWidth: 640, margin: "0 auto" }}>
      {isSample && (
        <p
          style={{
            fontSize: 13,
            color: "#8a6d1a",
            background: "#FDEDC3",
            borderRadius: 8,
            padding: "8px 12px",
            margin: "0 0 12px",
          }}
        >
          Sample data — Dayton, OH (Open-Meteo + NOAA, fetched 2026-10-06).
          Pass your own numbers as query params to score any place. See{" "}
          <a
            href="/methodology/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 600, color: "#0F3D3E" }}
          >
            methodology
          </a>
          .
        </p>
      )}
      <RiskScoreWidget
        result={result}
        locationName={place}
        compact
        showMethodologyLink={false}
      />
      <RiskScoreAttribution />
    </div>
  );
}
