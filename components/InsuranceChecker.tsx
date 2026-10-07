"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { siteConfig } from "../lib/site-config";
import {
  computeCoverage,
  type Acted,
  type Cause,
  type CoverageAnswers,
  type CoverageLevel,
  type Speed,
} from "../lib/insurance-engine";

const CAUSES: { value: Cause; label: string }[] = [
  { value: "burst", label: "Burst pipe" },
  { value: "appliance", label: "Appliance leak (washer, water heater…)" },
  { value: "storm", label: "Storm damage (wind/rain through roof)" },
  { value: "flood", label: "Flooding / rising water from outside" },
  { value: "slowleak", label: "Long-term slow leak" },
  { value: "humidity", label: "High humidity / condensation" },
  { value: "unknown", label: "Not sure what caused it" },
];

const SPEEDS: { value: Speed; label: string }[] = [
  { value: "sudden", label: "Sudden — hours to a couple of days" },
  { value: "gradual", label: "Gradual — weeks or months" },
  { value: "unsure", label: "Not sure" },
];

const ACTED: { value: Acted; label: string }[] = [
  { value: "yes", label: "Yes — within 48 hours" },
  { value: "no", label: "No — longer than that" },
  { value: "just", label: "It just happened — acting now" },
];

const LEVEL_STYLE: Record<CoverageLevel, { bg: string; fg: string }> = {
  covered: { bg: "#0B3D2E", fg: "#7CF5C8" },
  notcovered: { bg: "#4A0E0E", fg: "#FF8A8A" },
  review: { bg: "#4A2E00", fg: "#F5B301" },
};

/** Insurance coverage checker — honest decision tree, never promises coverage. */
export function InsuranceChecker() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<CoverageAnswers>>({});
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const steps = [
    { key: "cause" as const, q: "What caused the moisture?", opts: CAUSES },
    { key: "speed" as const, q: "Was it sudden or gradual?", opts: SPEEDS },
    {
      key: "acted48" as const,
      q: "Did you start drying / mitigation within 48 hours?",
      opts: ACTED,
    },
  ];
  const current = steps[step];
  const verdict = done ? computeCoverage(answers as CoverageAnswers) : null;
  const style = verdict ? LEVEL_STYLE[verdict.level] : null;

  function answer(value: string) {
    setPicked(value);
    const next = { ...answers, [current.key]: value } as Partial<CoverageAnswers>;
    window.setTimeout(() => {
      setAnswers(next);
      setPicked(null);
      if (step + 1 < steps.length) setStep(step + 1);
      else setDone(true);
    }, 250);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
    setPicked(null);
  }

  return (
    <div className="tool reveal" id="insurance-checker">
      <h3>
        <Icon name="shield" />
        Will Insurance Cover My Mold? — Coverage Checker
      </h3>
      <p className="micro">
        Three questions. An honest read on where your claim likely stands —
        and what to do next.
      </p>

      {!done ? (
        <div>
          <div style={{ marginBottom: 10 }}>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>
              Question {step + 1} of {steps.length}
            </span>
          </div>
          <div
            style={{
              height: 6,
              borderRadius: 3,
              background: "rgba(128,128,128,.15)",
              marginBottom: 16,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${((step + 1) / steps.length) * 100}%`,
                background: "var(--accent, #F59E0B)",
                borderRadius: 3,
                transition: "width .3s ease",
              }}
            />
          </div>
          <p style={{ fontWeight: 600, fontSize: 16 }}>{current.q}</p>
          <div className="quiz-opts" style={{ marginTop: 12 }}>
            {current.opts.map((o) => (
              <button
                key={o.value}
                type="button"
                className={`quiz-opt${picked === o.value ? " picked" : ""}`}
                onClick={() => answer(o.value)}
                style={{ textAlign: "left" }}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {verdict && style && (
        <div className="result show" role="status">
          <div
            style={{
              background: style.bg,
              color: style.fg,
              borderRadius: 12,
              padding: "18px 20px",
            }}
          >
            <div
              className="big"
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <Icon
                name={
                  verdict.level === "covered"
                    ? "check"
                    : verdict.level === "notcovered"
                      ? "shield"
                      : "clock"
                }
              />
              {verdict.title}
            </div>
            <p style={{ margin: "10px 0 0", fontSize: 15 }}>{verdict.summary}</p>
          </div>

          <div style={{ marginTop: 16 }}>
            <strong style={{ fontSize: 14 }}>Why:</strong>
            <ul
              style={{
                margin: "8px 0 0",
                padding: 0,
                listStyle: "none",
                display: "grid",
                gap: 8,
              }}
            >
              {verdict.reasons.map((r, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    fontSize: 14.5,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ color: "var(--accent, #F59E0B)", marginTop: 2 }}>
                    <Icon name="arrow" />
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ marginTop: 16 }}>
            <strong style={{ fontSize: 14 }}>Your next steps:</strong>
            <ul
              style={{
                margin: "8px 0 0",
                padding: 0,
                listStyle: "none",
                display: "grid",
                gap: 8,
              }}
            >
              {verdict.nextSteps.map((s, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    fontSize: 14.5,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ color: "var(--accent, #F59E0B)", marginTop: 2 }}>
                    <Icon name="check" />
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
            <a
              className="btn btn-brand"
              href={siteConfig.phoneHref}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
              }}
            >
              <Icon name="phone" />
              Get a documented inspection — {siteConfig.phoneDisplay}
            </a>
            <Link className="more" href="/checklist/">
              Free mold inspection checklist
              <Icon name="arrow" />
            </Link>
          </div>
          <p style={{ marginTop: 12 }}>
            <button
              type="button"
              onClick={restart}
              style={{
                background: "none",
                border: "none",
                color: "var(--muted)",
                fontSize: 13,
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Check a different scenario
            </button>
          </p>
        </div>
      )}

      <p className="disclaimer">
        General guidance only — not a coverage determination. Only your policy
        documents and your insurer can decide a claim. When in doubt, file and
        let the adjuster decide; documenting early never hurts.
      </p>
    </div>
  );
}
