"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { EmailCapture } from "./EmailCapture";
import {
  CHECKLIST_ROOMS,
  CHECKLIST_ITEM_COUNT,
  CHECKLIST_VERDICTS,
} from "./checklist-data";

/**
 * ChecklistGate — email gate → on success reveals the full printable checklist.
 * Print: window.print() + print stylesheet in globals.css (.print-checklist).
 */
export function ChecklistGate() {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggle(key: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function print() {
    window.print();
  }

  return (
    <div>
      {!unlocked ? (
        <div className="tool reveal" id="checklist-gate">
          <h3>
            <Icon name="check" />
            Free download: The Homeowner&apos;s Mold Inspection Checklist
          </h3>
          <p className="micro">
            {CHECKLIST_ITEM_COUNT} checks across 8 rooms — attic to gutters.
            Built from EPA guidance, no fluff. Enter your email and it&apos;s
            yours to print.
          </p>
          <EmailCapture
            source="checklist-page"
            onSuccess={() => setUnlocked(true)}
          />
        </div>
      ) : (
        <div className="print-checklist">
          <div
            className="no-print"
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              alignItems: "center",
              marginBottom: 18,
            }}
          >
            <button
              type="button"
              className="btn btn-primary"
              onClick={print}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Icon name="check" />
              Download / Print checklist
            </button>
            <span style={{ fontSize: 13.5, color: "var(--muted)" }}>
              {checked.size} of {CHECKLIST_ITEM_COUNT} checked
            </span>
          </div>

          <p
            className="micro"
            style={{ maxWidth: 720, marginBottom: 18 }}
          >
            Work through each room with a flashlight.{" "}
            <strong>
              The 24–48 hour rule (EPA):
            </strong>{" "}
            mold can begin growing within 24–48 hours of a water event — dry
            wet materials fast.
          </p>

          {CHECKLIST_ROOMS.map((r) => (
            <section key={r.room} style={{ marginBottom: 22 }}>
              <h3
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 18,
                  marginBottom: 10,
                }}
              >
                <Icon name={r.icon} />
                {r.room}
              </h3>
              <ul
                style={{
                  margin: 0,
                  padding: 0,
                  listStyle: "none",
                  display: "grid",
                  gap: 8,
                }}
              >
                {r.items.map((item, i) => {
                  const key = `${r.room}-${i}`;
                  const on = checked.has(key);
                  return (
                    <li key={key}>
                      <label
                        style={{
                          display: "flex",
                          gap: 10,
                          alignItems: "flex-start",
                          fontSize: 14.5,
                          cursor: "pointer",
                          padding: "10px 12px",
                          borderRadius: 10,
                          border: "1px solid var(--line, #e5e5e5)",
                          background: on
                            ? "rgba(124,245,200,.12)"
                            : "var(--card, #fff)",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() => toggle(key)}
                          className="no-print"
                          style={{
                            marginTop: 3,
                            width: 16,
                            height: 16,
                            accentColor: "#0F3D3E",
                          }}
                          aria-label={item}
                        />
                        <span
                          className="print-box"
                          aria-hidden="true"
                        >
                          ☐
                        </span>
                        <span
                          style={
                            on
                              ? {
                                  textDecoration: "line-through",
                                  color: "var(--muted)",
                                }
                              : undefined
                          }
                        >
                          {item}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}

          <section style={{ marginTop: 26 }}>
            <h3 style={{ fontSize: 18, marginBottom: 10 }}>
              What your results mean
            </h3>
            <div style={{ display: "grid", gap: 10 }}>
              {CHECKLIST_VERDICTS.map((v) => (
                <div
                  key={v.title}
                  style={{
                    borderLeft: "3px solid var(--accent, #F59E0B)",
                    padding: "10px 14px",
                    background: "var(--card, #fff)",
                    borderRadius: "0 10px 10px 0",
                  }}
                >
                  <strong style={{ fontSize: 14.5 }}>{v.title}</strong>
                  <p style={{ margin: "6px 0 0", fontSize: 14 }}>{v.body}</p>
                </div>
              ))}
            </div>
          </section>

          <p
            className="micro no-print"
            style={{ marginTop: 18, maxWidth: 720 }}
          >
            Sources: U.S. EPA mold guidance (24–48h drying rule, indoor RH
            below 60% / ideal 30–50%, homeowner cleanup for small surface
            areas); CDC 2006 (effects depend on individual susceptibility).{" "}
            <Link className="more" href="/contact/">
              Book a free inspection <Icon name="arrow" />
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
