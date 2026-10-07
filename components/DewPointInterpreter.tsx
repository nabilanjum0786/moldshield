"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import {
  interpret,
  fToC,
  cToF,
  TYPICAL_COLD_SURFACES,
} from "../lib/dew-point";

const BAND_COLORS: Record<string, { bg: string; fg: string; ring: string }> = {
  ideal: { bg: "#0B3D2E", fg: "#7CF5C8", ring: "rgba(124,245,200,.35)" },
  watch: { bg: "#4A2E00", fg: "#F5B301", ring: "rgba(245,179,1,.35)" },
  risk: { bg: "#4A0E0E", fg: "#FF8A8A", ring: "rgba(255,138,138,.35)" },
  dry: { bg: "#10233B", fg: "#9CC4F5", ring: "rgba(156,196,245,.35)" },
};

const RISK_COPY: Record<string, string> = {
  low: "Cool surfaces can still sweat — single-pane glass is the usual suspect — but your humidity is low enough that it's rarely an issue.",
  moderate:
    "Surfaces just a few degrees cooler than the room can start sweating. First place to look: windows and uninsulated exterior walls on cold mornings.",
  high: "The dew point is close to room temperature, so even mildly cool surfaces will sweat. Windows, pipes, and bare basement concrete are all at risk — and sustained damp is exactly how mold starts.",
};

type Unit = "F" | "C";

/** Dew-Point Interpreter — enter a hygrometer reading, get a dew-point readout and condensation verdict. */
export function DewPointInterpreter() {
  const [unit, setUnit] = useState<Unit>("F");
  const [temp, setTemp] = useState(72);
  const [rh, setRh] = useState(55);

  const tempC = unit === "F" ? fToC(temp) : temp;
  const report = interpret(tempC, rh);
  const c = BAND_COLORS[report.band];
  const dpPrimary = unit === "F" ? report.dewPointF : report.dewPointC;
  const dpSecondary = unit === "F" ? report.dewPointC : report.dewPointF;
  const tempLabel = unit === "F" ? "°F" : "°C";

  const surfaces = TYPICAL_COLD_SURFACES;
  const sentence = `At ${Math.round(temp)}${tempLabel} and ${Math.round(
    rh
  )}% RH, any surface colder than about ${Math.round(dpPrimary)}${tempLabel} will sweat — think ${surfaces[0]} in winter, ${surfaces[1]}, or ${surfaces[2]}.`;

  function setUnitKeepingTemp(u: Unit) {
    if (u === unit) return;
    // Convert the current value so the physical temperature doesn't change.
    const converted = u === "C" ? fToC(temp) : cToF(temp);
    setTemp(Math.round(converted));
    setUnit(u);
  }

  return (
    <div className="tool reveal" id="dew-point">
      <h3>
        <Icon name="shield" />
        Dew-Point Interpreter
      </h3>
      <p className="micro">
        Enter a temperature and a humidity reading — from your hygrometer or
        your thermostat — and see exactly where condensation will start.
      </p>

      {/* Inputs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 18,
          marginTop: 18,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <label
              htmlFor="dp-temp"
              style={{ fontWeight: 700, fontSize: 14 }}
            >
              Room temperature
            </label>
            <div
              role="group"
              aria-label="Temperature unit"
              style={{ display: "inline-flex", gap: 4 }}
            >
              {(["F", "C"] as Unit[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => setUnitKeepingTemp(u)}
                  aria-pressed={unit === u}
                  style={{
                    border: `1px solid ${
                      unit === u ? "var(--brand, #0F3D3E)" : "var(--line)"
                    }`,
                    borderRadius: 8,
                    padding: "4px 12px",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    background:
                      unit === u ? "var(--brand, #0F3D3E)" : "transparent",
                    color: unit === u ? "#fff" : "inherit",
                  }}
                >
                  °{u}
                </button>
              ))}
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: 10 }}
          >
            <input
              id="dp-temp"
              type="number"
              inputMode="decimal"
              value={temp}
              min={unit === "F" ? 40 : 4}
              max={unit === "F" ? 100 : 38}
              step={1}
              onChange={(e) => {
                const v = parseFloat(e.target.value);
                if (!Number.isNaN(v)) setTemp(v);
              }}
              style={{
                width: 110,
                fontSize: 22,
                fontWeight: 700,
                padding: "8px 12px",
                borderRadius: 10,
                border: "1px solid var(--line)",
                color: "var(--ink)",
                background: "var(--card, #fff)",
              }}
            />
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "var(--muted)",
              }}
            >
              {tempLabel}
            </span>
          </div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <label
              htmlFor="dp-rh"
              style={{ fontWeight: 700, fontSize: 14 }}
            >
              Relative humidity
            </label>
            <output
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "var(--brand, #0F3D3E)",
              }}
            >
              {rh}%
            </output>
          </div>
          <input
            id="dp-rh"
            type="range"
            min={10}
            max={90}
            step={1}
            value={rh}
            onChange={(e) => setRh(parseInt(e.target.value, 10))}
            style={{
              width: "100%",
              accentColor: "var(--accent, #F59E0B)",
              height: 36,
            }}
            aria-describedby="dp-rh-scale"
          />
          <div
            id="dp-rh-scale"
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            <span>10%</span>
            <span>30 · 50 · 60%</span>
            <span>90%</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="result show" role="status" style={{ marginTop: 8 }}>
        <div
          style={{
            background: c.bg,
            color: c.fg,
            borderRadius: 12,
            padding: "18px 20px",
            boxShadow: `0 0 0 3px ${c.ring}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontSize: 12, letterSpacing: 1, opacity: 0.85 }}>
                DEW POINT
              </div>
              <div
                className="big"
                style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.1 }}
              >
                {Math.round(dpPrimary)}
                {tempLabel}
              </div>
              <div style={{ fontSize: 13, opacity: 0.85 }}>
                ({dpSecondary.toFixed(1)}
                {unit === "F" ? "°C" : "°F"})
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 12, letterSpacing: 1, opacity: 0.85 }}>
                HUMIDITY BAND
              </div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>
                {report.bandLabel}
              </div>
              <div style={{ fontSize: 13, marginTop: 4, opacity: 0.9 }}>
                Condensation risk: {report.condensationLabel}
              </div>
            </div>
          </div>
        </div>

        <p style={{ margin: "14px 0 0", fontSize: 15.5, lineHeight: 1.6 }}>
          {sentence}
        </p>
        <p
          style={{
            margin: "10px 0 0",
            fontSize: 14,
            lineHeight: 1.6,
            color: "var(--muted)",
          }}
        >
          {RISK_COPY[report.condensationRisk]}
        </p>

        <ul
          style={{
            margin: "16px 0 0",
            padding: 0,
            listStyle: "none",
            display: "grid",
            gap: 8,
          }}
        >
          {report.actions.map((a, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: 10,
                fontSize: 14.5,
                alignItems: "flex-start",
                lineHeight: 1.55,
              }}
            >
              <span style={{ color: "var(--accent, #F59E0B)", marginTop: 2 }}>
                <Icon name="check" />
              </span>
              <span>{a}</span>
            </li>
          ))}
        </ul>

        <div
          style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}
        >
          <Link
            className="more"
            href="/tools/humidity-log/"
            style={{ color: "var(--accent, #F59E0B)" }}
          >
            Track readings for 7 days with the Humidity Log
            <Icon name="arrow" />
          </Link>
        </div>
      </div>

      <p className="disclaimer">
        Dew point computed with the Magnus formula (a=17.27, b=237.7°C) —
        verified against published psychrometric tables within 0.5°F.
        Humidity bands follow EPA guidance (keep indoor RH below 60%,
        ideally 30–50%). This tool can&apos;t diagnose mold — it shows you
        where condensation and mold risk start.
      </p>
    </div>
  );
}
