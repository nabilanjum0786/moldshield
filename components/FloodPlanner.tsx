"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { buildPlan, isValidEventDate } from "../lib/flood-plan";

const inputStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: 320,
  padding: "13px 14px",
  fontSize: 16,
  border: "1.5px solid var(--line, #e5e5e5)",
  borderRadius: 10,
  background: "#fff",
  fontFamily: "var(--font)",
};

/** 14-day flood recovery planner — day-by-day actions from the event date. */
export function FloodPlanner() {
  const todayIso = new Date().toISOString().slice(0, 10);
  const [eventDate, setEventDate] = useState(todayIso);
  const [show, setShow] = useState(false);
  const valid = isValidEventDate(eventDate);
  const plan = show && valid ? buildPlan(eventDate) : [];

  function print() {
    window.print();
  }

  return (
    <div className="tool reveal" id="flood-planner">
      <h3>
        <Icon name="clock" />
        14-Day Flood Recovery Planner
      </h3>
      <p className="micro">
        Pick the day the water event happened — get a day-by-day action plan
        anchored on the EPA 24–48h rule.
      </p>

      <div className="no-print" style={{ marginTop: 6 }}>
        <label
          style={{ fontWeight: 700, display: "block", margin: "14px 0 6px" }}
        >
          When did the water event happen?
        </label>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "flex-end",
          }}
        >
          <input
            style={inputStyle}
            type="date"
            value={eventDate}
            max={todayIso}
            onChange={(e) => {
              setEventDate(e.target.value);
              setShow(false);
            }}
          />
          <button
            type="button"
            className="btn btn-brand"
            disabled={!valid}
            onClick={() => setShow(true)}
            style={{
              opacity: valid ? 1 : 0.5,
              cursor: valid ? "pointer" : "not-allowed",
            }}
          >
            <Icon name="check" />
            Build my 14-day plan
          </button>
        </div>
        {!valid && (
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>
            Please pick a valid date — today or earlier.
          </p>
        )}
      </div>

      {plan.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div
            className="no-print"
            style={{ display: "flex", gap: 10, marginBottom: 14 }}
          >
            <button type="button" className="btn btn-ghost" onClick={print}>
              <Icon name="arrow" />
              Print my plan
            </button>
          </div>
          <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 12 }}>
            {plan.map((d) => (
              <li
                key={d.day}
                style={{
                  border: "1px solid var(--line, #e5e5e5)",
                  borderRadius: 10,
                  padding: "14px 16px",
                  background: "var(--card, #fff)",
                  breakInside: "avoid",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <strong style={{ fontSize: 15 }}>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 30,
                        height: 30,
                        borderRadius: "50%",
                        background: "var(--brand-dark, #0B2B26)",
                        color: "#fff",
                        fontSize: 13,
                        marginRight: 10,
                      }}
                    >
                      {d.day}
                    </span>
                    {d.title}
                  </strong>
                  <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>
                    {d.dateLabel}
                  </span>
                </div>
                <ul
                  style={{
                    margin: "10px 0 0",
                    padding: 0,
                    listStyle: "none",
                    display: "grid",
                    gap: 7,
                  }}
                >
                  {d.actions.map((a, i) => (
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
              </li>
            ))}
          </ol>
          <div className="no-print" style={{ marginTop: 18 }}>
            <Link className="more" href="/checklist/">
              Pair this with the free mold inspection checklist
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      )}

      <p className="disclaimer">
        Timings follow EPA guidance (mold can begin within 24–48 hours of
        water exposure; keep indoor humidity below 60%, ideally 30–50%). Every
        situation differs — when in doubt, get a professional assessment
        rather than waiting out the plan.
      </p>
    </div>
  );
}
