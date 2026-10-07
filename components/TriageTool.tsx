"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { siteConfig } from "../lib/site-config";
import {
  QUESTIONS,
  DAMAGE_LEVELS,
  computeVerdict,
  type Answers,
  type AnswerKey,
} from "../lib/triage-engine";

const LEVEL_COLOR: Record<string, { bg: string; fg: string; ring: string }> = {
  green: { bg: "#0B3D2E", fg: "#7CF5C8", ring: "rgba(124,245,200,.35)" },
  yellow: { bg: "#4A2E00", fg: "#F5B301", ring: "rgba(245,179,1,.35)" },
  red: { bg: "#4A0E0E", fg: "#FF8A8A", ring: "rgba(255,138,138,.35)" },
};

function SeverityBars({ level }: { level: number }) {
  return (
    <span
      style={{ display: "inline-flex", gap: 3, alignItems: "flex-end" }}
      aria-label={`Damage level ${level} of 4`}
    >
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          style={{
            width: 7,
            height: 6 + i * 5,
            borderRadius: 2,
            background:
              i <= level ? "var(--accent, #F59E0B)" : "rgba(128,128,128,.25)",
          }}
        />
      ))}
    </span>
  );
}

/** Mold Emergency Triage Tool — 8 questions, honest rule-based verdict. */
export function TriageTool() {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Partial<Answers>>({});
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const q = QUESTIONS[idx];
  const verdict = done ? computeVerdict(answers as Answers) : null;

  function answer(value: string) {
    setPicked(value);
    const next = { ...answers, [q.key]: value } as Partial<Answers>;
    window.setTimeout(() => {
      setAnswers(next);
      setPicked(null);
      if (idx + 1 < QUESTIONS.length) {
        setIdx(idx + 1);
      } else {
        setDone(true);
      }
    }, 250);
  }

  function back() {
    if (idx === 0) return;
    const prevKey = QUESTIONS[idx - 1].key as AnswerKey;
    const next = { ...answers };
    delete next[prevKey];
    delete next[q.key as AnswerKey];
    setAnswers(next);
    setIdx(idx - 1);
  }

  function restart() {
    setAnswers({});
    setIdx(0);
    setDone(false);
    setPicked(null);
  }

  const c = verdict ? LEVEL_COLOR[verdict.level] : null;

  return (
    <div className="tool reveal" id="triage">
      <h3>
        <Icon name="shield" />
        Mold Emergency Triage — How Urgent Is Yours?
      </h3>
      <p className="micro">
        Eight questions. One honest verdict: handle it yourself, call within
        48 hours, or call now.
      </p>

      {/* Damage-level reference strip (spec §4) */}
      {!done && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 10,
            margin: "14px 0 20px",
          }}
        >
          {DAMAGE_LEVELS.map((d) => (
            <div
              key={d.level}
              style={{
                border: "1px solid var(--line, #e5e5e5)",
                borderRadius: 10,
                padding: "10px 12px",
                background: "var(--card, #fff)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <strong style={{ fontSize: 13 }}>Level {d.level}</strong>
                <SeverityBars level={d.level} />
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>{d.name}</div>
              <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 4 }}>
                {d.desc}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  marginTop: 6,
                  color: "var(--brand, #0F3D3E)",
                }}
              >
                {d.action}
              </div>
            </div>
          ))}
        </div>
      )}

      {!done ? (
        <div id="triage-body">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <span style={{ fontSize: 13, color: "var(--muted)" }}>
              Question {idx + 1} of {QUESTIONS.length}
            </span>
            {idx > 0 && (
              <button
                type="button"
                onClick={back}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--muted)",
                  fontSize: 13,
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                ← Back
              </button>
            )}
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
                width: `${((idx + 1) / QUESTIONS.length) * 100}%`,
                background: "var(--accent, #F59E0B)",
                borderRadius: 3,
                transition: "width .3s ease",
              }}
            />
          </div>
          {QUESTIONS.map((qq, i) => (
            <div key={qq.key} className="quiz-q" hidden={i !== idx}>
              <p style={{ fontWeight: 600, fontSize: 16 }}>
                {i + 1}. {qq.q}
              </p>
              <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>
                {qq.why}
              </p>
              <div className="quiz-opts" style={{ marginTop: 12 }}>
                {qq.options.map((o) => (
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
          ))}
        </div>
      ) : null}

      {verdict && c && (
        <div className="result show" role="status">
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
              className="big"
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <Icon
                name={
                  verdict.level === "red"
                    ? "phone"
                    : verdict.level === "yellow"
                      ? "clock"
                      : "check"
                }
              />
              {verdict.title}
            </div>
            <p style={{ margin: "10px 0 0", fontSize: 15 }}>{verdict.summary}</p>
          </div>

          <ul
            style={{
              margin: "16px 0 0",
              padding: 0,
              listStyle: "none",
              display: "grid",
              gap: 8,
            }}
          >
            {verdict.actions.map((a, i) => (
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
                <span>{a}</span>
              </li>
            ))}
          </ul>

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginTop: 18,
            }}
          >
            {(verdict.cta === "callnow" || verdict.cta === "call48") && (
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
                Call {siteConfig.phoneDisplay}
                {verdict.cta === "callnow" ? " now" : ""}
              </a>
            )}
            <Link className="more" href="#final-cta">
              {verdict.cta === "diy"
                ? "Still unsure? Book a free inspection"
                : "Or book a free inspection online"}
              <Icon name="arrow" />
            </Link>
            {verdict.cta === "diy" && (
              <Link
                className="more"
                href="/checklist/"
                style={{ color: "var(--accent, #F59E0B)" }}
              >
                Want the full room-by-room version? Get the free checklist
                <Icon name="arrow" />
              </Link>
            )}
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
              Retake the triage
            </button>
          </p>
        </div>
      )}

      <p className="disclaimer">
        This tool can&apos;t diagnose mold or replace an inspection — it tells
        you how urgently to get one. Thresholds: EPA 24–48h drying rule and
        ~10 sq ft guidance; health guidance per CDC 2006 (susceptible persons).
      </p>
    </div>
  );
}
