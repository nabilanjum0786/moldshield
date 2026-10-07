"use client";

import { useState } from "react";
import { Icon } from "./icons";
import { analyzeQuote, type QuoteAnalysis } from "../lib/quote-checker";

const SEV: Record<string, { bg: string; fg: string; ring: string }> = {
  red: { bg: "#4A0E0E", fg: "#FF8A8A", ring: "rgba(255,138,138,.35)" },
  yellow: { bg: "#4A2E00", fg: "#F5B301", ring: "rgba(245,179,1,.35)" },
  green: { bg: "#0B3D2E", fg: "#7CF5C8", ring: "rgba(124,245,200,.35)" },
};

/** Remediation Quote Checker — paste quote line items, get structural flags. */
export function QuoteChecker() {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<QuoteAnalysis | null>(null);

  const banner = analysis
    ? analysis.empty
      ? "green"
      : analysis.redCount > 0
        ? "red"
        : analysis.yellowCount > 0
          ? "yellow"
          : "green"
    : null;

  return (
    <div className="tool reveal" id="quote-checker">
      <h3>
        <Icon name="shield" />
        Paste the quote, get an honest read
      </h3>
      <p className="micro">
        Copy the line items, scope of work, and any fine print from the quote —
        then run the check. It looks for the structural pieces every proper
        remediation quote should have.
      </p>

      <label
        htmlFor="quote-input"
        style={{ display: "block", fontSize: 13.5, fontWeight: 600, marginBottom: 6 }}
      >
        Quote text
      </label>
      <textarea
        id="quote-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        placeholder={"Example:\nMold remediation - basement\nContainment with poly barriers and negative air machine\nRemove and replace 60 sq ft drywall\nHEPA vacuum and antimicrobial wipe-down\nRepair leaking pipe joint\nTotal: $2,400"}
        style={{
          width: "100%",
          borderRadius: 10,
          border: "1px solid var(--line, #e5e5e5)",
          background: "var(--card, #fff)",
          color: "inherit",
          padding: "12px 14px",
          fontSize: 14.5,
          lineHeight: 1.55,
          resize: "vertical",
          fontFamily: "inherit",
        }}
      />

      <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
        <button
          type="button"
          className="btn btn-brand"
          onClick={() => setAnalysis(analyzeQuote(text))}
        >
          Check this quote
        </button>
        {analysis && (
          <button
            type="button"
            onClick={() => {
              setAnalysis(null);
              setText("");
            }}
            style={{
              background: "none",
              border: "none",
              color: "var(--muted)",
              fontSize: 13.5,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Clear
          </button>
        )}
      </div>

      {analysis && banner && (
        <div className="result show" role="status" style={{ marginTop: 18 }}>
          {/* Verdict banner — counts only, never a fake "score" */}
          <div
            style={{
              background: SEV[banner].bg,
              color: SEV[banner].fg,
              borderRadius: 12,
              padding: "18px 20px",
              boxShadow: `0 0 0 3px ${SEV[banner].ring}`,
            }}
          >
            <div
              className="big"
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <Icon
                name={
                  banner === "red" ? "shield" : banner === "yellow" ? "clock" : "check"
                }
              />
              {analysis.empty
                ? "Ready when you are"
                : analysis.redCount > 0
                  ? `${analysis.redCount} red flag${analysis.redCount === 1 ? "" : "s"} — ask about these before signing`
                  : analysis.yellowCount > 0
                    ? `${analysis.yellowCount} yellow flag${analysis.yellowCount === 1 ? "" : "s"} — worth asking about`
                    : "No structural flags — this one reads well"}
            </div>
            <p style={{ margin: "10px 0 0", fontSize: 15 }}>{analysis.summary}</p>
          </div>

          {/* Flags */}
          {analysis.flags.length > 0 && (
            <ul
              style={{
                margin: "16px 0 0",
                padding: 0,
                listStyle: "none",
                display: "grid",
                gap: 10,
              }}
            >
              {analysis.flags.map((f) => (
                <li
                  key={f.id}
                  style={{
                    border: `1px solid ${SEV[f.severity].ring}`,
                    borderRadius: 10,
                    padding: "12px 14px",
                    background: "var(--card, #fff)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginBottom: 6,
                    }}
                  >
                    <span
                      className="pill"
                      style={{
                        background: SEV[f.severity].bg,
                        color: SEV[f.severity].fg,
                        fontSize: 11.5,
                        textTransform: "uppercase",
                        letterSpacing: ".06em",
                      }}
                    >
                      {f.severity === "red" ? "Red flag" : "Yellow flag"}
                    </span>
                    <strong style={{ fontSize: 15 }}>{f.title}</strong>
                  </div>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      color: "var(--muted)",
                      lineHeight: 1.55,
                    }}
                  >
                    {f.explanation}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {/* Passed checks */}
          {analysis.passed.length > 0 && (
            <div style={{ marginTop: 18 }}>
              <h4 style={{ fontSize: 14.5, margin: "0 0 8px" }}>
                Passed checks ({analysis.passed.length})
              </h4>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "grid",
                  gap: 6,
                }}
              >
                {analysis.passed.map((p, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      gap: 10,
                      fontSize: 14,
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ color: "#0B7A4B", marginTop: 2 }}>
                      <Icon name="check" />
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <p className="disclaimer">
        Keyword-based check, not a professional review. It matches words in the
        quote against a structural checklist — it can&apos;t judge work quality,
        and a missing keyword isn&apos;t proof of a missing step. Cost context:
        US remediation jobs run roughly $1,223–$3,757 (HomeAdvisor 2026); we
        never flag a quote for being &ldquo;too expensive.&rdquo;
      </p>
    </div>
  );
}
