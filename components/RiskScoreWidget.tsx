"use client";

import Link from "next/link";
import { Icon } from "./icons";
import { siteConfig } from "@/lib/site-config";
import type { RiskScoreResult } from "@/lib/risk-score";

const TEAL_DARK = "#0B2B26";
const TEAL = "#0F3D3E";
const AMBER = "#F59E0B";

const BAND_STYLE: Record<string, { bg: string; fg: string; label: string }> = {
  Low: { bg: "#0B3D2E", fg: "#7CF5C8", label: "Low" },
  Moderate: { bg: "#3A2A00", fg: "#FFC53D", label: "Moderate" },
  High: { bg: "#4A1F00", fg: "#FFB25E", label: "High" },
  "Very High": { bg: "#4A0E0E", fg: "#FF8A8A", label: "Very High" },
};

function bandColor(band: string): string {
  switch (band) {
    case "Low":
      return "#2E9E6B";
    case "Moderate":
      return AMBER;
    case "High":
      return "#E8722A";
    default:
      return "#D64545";
  }
}

/** Semicircular gauge, 0–100, needle at score. Pure SVG, no assets. */
function Gauge({ score, band }: { score: number; band: string }) {
  const r = 80;
  const cx = 100;
  const cy = 100;
  // Angle: 180° (left) → 0° (right) maps 0 → 100.
  const angle = 180 - (score / 100) * 180;
  const rad = (angle * Math.PI) / 180;
  const nx = cx + r * Math.cos(rad);
  const ny = cy - r * Math.sin(rad);

  // Colored zone arcs: Low (0–30), Moderate (31–60), High (61–80), Very High (81–100)
  const zone = (from: number, to: number, color: string) => {
    const a1 = (180 - (from / 100) * 180) * (Math.PI / 180);
    const a2 = (180 - (to / 100) * 180) * (Math.PI / 180);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy - r * Math.sin(a1);
    const x2 = cx + r * Math.cos(a2);
    const y2 = cy - r * Math.sin(a2);
    return (
      <path
        key={`${from}-${to}`}
        d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
        fill="none"
        stroke={color}
        strokeWidth={14}
        strokeLinecap="butt"
        opacity={0.9}
      />
    );
  };

  return (
    <svg
      viewBox="0 0 200 118"
      role="img"
      aria-label={`Mold risk score ${score} out of 100, band ${band}`}
      style={{ width: "100%", maxWidth: 300, display: "block", margin: "0 auto" }}
    >
      {zone(0, 30, "#2E9E6B")}
      {zone(30, 60, AMBER)}
      {zone(60, 80, "#E8722A")}
      {zone(80, 100, "#D64545")}
      <line
        x1={cx}
        y1={cy}
        x2={nx}
        y2={ny}
        stroke={TEAL_DARK}
        strokeWidth={4}
        strokeLinecap="round"
      />
      <circle cx={cx} cy={cy} r={9} fill={TEAL_DARK} />
      <text
        x={cx}
        y={cy - 26}
        textAnchor="middle"
        fontSize={34}
        fontWeight={800}
        fill={TEAL_DARK}
      >
        {score}
      </text>
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        fontSize={11}
        fill="#666"
      >
        out of 100
      </text>
    </svg>
  );
}

type Props = {
  /** Result from computeRiskScore() — the widget never fetches. */
  result: RiskScoreResult;
  /** Display name, e.g. "Dayton, OH" */
  locationName: string;
  /** Compact mode: gauge + band + notice only (for embeds/sidebars) */
  compact?: boolean;
  /** Show the "how is this calculated" link (hide inside iframes) */
  showMethodologyLink?: boolean;
};

export function RiskScoreWidget({
  result,
  locationName,
  compact = false,
  showMethodologyLink = true,
}: Props) {
  const band = BAND_STYLE[result.band];
  const pendingDrivers = result.drivers.filter((d) => d.status === "pending");

  return (
    <div className="tool reveal" id="risk-score">
      <h3>
        <Icon name="shield" />
        Mold Risk Score — {locationName}
      </h3>
      <p className="micro">
        A 0–100 snapshot of mold-favorable conditions, built from real public
        datasets. Bands are editorial, not scientific thresholds.
      </p>

      <Gauge score={result.score} band={result.band} />

      <div style={{ textAlign: "center", margin: "8px 0 4px" }}>
        <span
          style={{
            display: "inline-block",
            background: band.bg,
            color: band.fg,
            borderRadius: 999,
            padding: "6px 18px",
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          {band.label} risk
        </span>
      </div>

      {result.partialData && (
        <div
          role="note"
          style={{
            border: `1px solid ${AMBER}`,
            borderLeft: `4px solid ${AMBER}`,
            borderRadius: 8,
            padding: "10px 12px",
            margin: "14px 0",
            background: "#FFF9EE",
            fontSize: 14,
            color: TEAL_DARK,
          }}
        >
          <strong>Partial data.</strong> This score is computed from the
          drivers below that have real data.{" "}
          {pendingDrivers.map((d) => d.name).join(" and ")}{" "}
          {pendingDrivers.length === 1 ? "is" : "are"} still pending
          integration — no numbers were invented to fill the gap. The score
          will sharpen once those drivers come online.
        </div>
      )}

      {!compact && (
        <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
          {result.drivers.map((d) => (
            <div key={d.key}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  gap: 8,
                  fontSize: 14,
                }}
              >
                <span style={{ fontWeight: 600, color: TEAL_DARK }}>
                  {d.name}
                  {d.status === "pending" && (
                    <span
                      style={{
                        marginLeft: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#8a6d1a",
                        background: "#FDEDC3",
                        borderRadius: 999,
                        padding: "2px 8px",
                      }}
                    >
                      pending
                    </span>
                  )}
                </span>
                <span style={{ color: "#555", textAlign: "right" }}>
                  {d.value}
                </span>
              </div>
              <div
                style={{
                  height: 8,
                  borderRadius: 999,
                  background: "rgba(128,128,128,.18)",
                  marginTop: 6,
                  overflow: "hidden",
                }}
                role="img"
                aria-label={`${d.name}: ${
                  d.status === "pending"
                    ? "pending"
                    : `subscore ${d.subscore} of 100`
                }`}
              >
                <div
                  style={{
                    width:
                      d.status === "pending"
                        ? "100%"
                        : `${d.subscore}%`,
                    height: "100%",
                    borderRadius: 999,
                    background:
                      d.status === "pending"
                        ? "repeating-linear-gradient(45deg,#e8e2d4,#e8e2d4 6px,#d8d0ba 6px,#d8d0ba 12px)"
                        : `linear-gradient(90deg, ${TEAL}, ${AMBER})`,
                  }}
                />
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "#777",
                  marginTop: 4,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Source: {d.source}</span>
                {d.status === "live" && (
                  <span>
                    weight {Math.round(d.weight * 100)}%
                  </span>
                )}
              </div>
              {d.note && (
                <div style={{ fontSize: 12, color: "#8a6d1a", marginTop: 2 }}>
                  {d.note}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          marginTop: 16,
          paddingTop: 12,
          borderTop: "1px solid var(--line, #e5e5e5)",
          fontSize: 13,
          color: "#666",
          display: "flex",
          flexWrap: "wrap",
          gap: "6px 16px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>
          {result.dataAsOf
            ? `Data as of ${result.dataAsOf} · `
            : ""}
          Sources:{" "}
          {result.drivers
            .filter((d) => d.status === "live")
            .map((d) => d.source)
            .filter((s, i, a) => a.indexOf(s) === i)
            .join(", ")}
        </span>
        {showMethodologyLink && (
          <Link
            href="/methodology/"
            style={{ color: TEAL, fontWeight: 600 }}
          >
            How is this calculated?
          </Link>
        )}
      </div>
    </div>
  );
}

/** Attribution line for embeds — the backlink mechanism. */
export function RiskScoreAttribution() {
  return (
    <div
      style={{
        marginTop: 12,
        fontSize: 13,
        color: "#666",
        textAlign: "center",
      }}
    >
      Mold risk data by{" "}
      <a
        href={`${siteConfig.siteUrl}/risk-score/`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: TEAL, fontWeight: 600 }}
      >
        {siteConfig.brandName}
      </a>
    </div>
  );
}
