"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";

const AREAS: { label: string; lo: number; hi: number }[] = [
  { label: "Attic", lo: 1000, hi: 4000 },
  { label: "Basement", lo: 500, hi: 3000 },
  { label: "Bathroom", lo: 500, hi: 1000 },
  { label: "Crawl space", lo: 500, hi: 2000 },
  { label: "Behind drywall / walls", lo: 1000, hi: 20000 },
  { label: "HVAC system", lo: 3000, hi: 10000 },
  { label: "Whole house", lo: 10000, hi: 30000 },
];

const SEVERITIES = [
  { value: "light", label: "Light — small patches, surface only" },
  { value: "moderate", label: "Moderate — spreading, musty smell" },
  { value: "severe", label: "Severe — large areas, structural damage" },
] as const;

function fmt(n: number) {
  return "$" + (Math.round(n / 50) * 50).toLocaleString("en-US");
}

/** Cost estimator (§5) — real 2026 HomeAdvisor ranges, client-side. */
export function CostEstimator() {
  const [area, setArea] = useState(0);
  const [sev, setSev] = useState<(typeof SEVERITIES)[number]["value"]>("moderate");
  const [range, setRange] = useState<string | null>(null);

  function run() {
    const { lo, hi } = AREAS[area];
    const span = hi - lo;
    let rLo: number, rHi: number;
    if (sev === "light") {
      rLo = lo;
      rHi = lo + span * 0.33;
    } else if (sev === "moderate") {
      rLo = lo + span * 0.25;
      rHi = lo + span * 0.75;
    } else {
      rLo = lo + span * 0.6;
      rHi = hi;
    }
    setRange(`${fmt(rLo)} – ${fmt(rHi)}`);
  }

  return (
    <div className="tool reveal" id="estimator">
      <h3>
        <Icon name="check" />
        Mold Remediation Cost Estimator
      </h3>
      <p style={{ fontSize: 14.5, color: "var(--muted)" }}>
        Ranges: HomeAdvisor 2026 (attic $1k–$4k · basement $500–$3k · bath
        $500–$1k · crawl $500–$2k · drywall $1k–$20k · HVAC $3k–$10k · whole
        house $10k–$30k).
      </p>
      <label htmlFor="est-area">Where is the mold?</label>
      <select
        id="est-area"
        value={area}
        onChange={(e) => setArea(Number(e.target.value))}
      >
        {AREAS.map((a, i) => (
          <option key={a.label} value={i}>
            {a.label}
          </option>
        ))}
      </select>
      <label htmlFor="est-sev">How bad does it look?</label>
      <select
        id="est-sev"
        value={sev}
        onChange={(e) => setSev(e.target.value as typeof sev)}
      >
        {SEVERITIES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      <button
        className="btn btn-primary"
        style={{ marginTop: 18, width: "100%" }}
        onClick={run}
        type="button"
      >
        Estimate My Cost
      </button>
      <div className={`result${range ? " show" : ""}`} role="status">
        <div className="big">{range}</div>
        <p style={{ margin: "8px 0 0", fontSize: 14.5 }}>
          {range
            ? "Based on 2026 HomeAdvisor national ranges for your area and severity. A free inspection gives an exact written quote."
            : ""}
        </p>
        <p style={{ margin: "10px 0 0" }}>
          <Link className="more" href="#final-cta">
            Get an exact quote — free inspection
            <Icon name="arrow" />
          </Link>
        </p>
      </div>
      <p className="disclaimer">
        Estimate only, based on published 2026 national ranges. Your free
        inspection gives an exact, written quote.
      </p>
    </div>
  );
}
