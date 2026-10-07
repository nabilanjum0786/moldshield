"use client";

import { useState } from "react";
import { Icon } from "./icons";
import {
  EMPTY_LETTER_FORM,
  STATUTE_URL,
  buildLetter,
  letterReady,
  letterText,
  type LetterForm,
} from "../lib/landlord-letter";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 14px",
  fontSize: 16,
  border: "1.5px solid var(--line, #e5e5e5)",
  borderRadius: 10,
  background: "#fff",
  fontFamily: "var(--font)",
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 4 }}>
      <label
        style={{ fontWeight: 700, display: "block", margin: "14px 0 6px" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

/** Landlord complaint letter generator — formal Ohio demand letter. */
export function LandlordLetterGenerator() {
  const [form, setForm] = useState<LetterForm>(EMPTY_LETTER_FORM);
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  const todayIso = new Date().toISOString().slice(0, 10);
  const ready = letterReady(form);
  const paras = generated && ready ? buildLetter(form, todayIso) : [];

  function set<K extends keyof LetterForm>(k: K, v: LetterForm[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    setGenerated(false);
    setCopied(false);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(letterText(form, todayIso));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }

  function print() {
    window.print();
  }

  return (
    <div className="tool reveal" id="landlord-letter">
      <h3>
        <Icon name="shield" />
        Landlord Mold Complaint Letter Generator
      </h3>
      <p className="micro">
        Fill in the details — get a formal demand letter citing Ohio law,
        ready to print or copy.
      </p>

      <div className="no-print">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "0 16px",
          }}
        >
          <Field label="Your full name *">
            <input
              style={inputStyle}
              value={form.tenantName}
              onChange={(e) => set("tenantName", e.target.value)}
              placeholder="Jane Doe"
              autoComplete="name"
            />
          </Field>
          <Field label="Rental property address *">
            <input
              style={inputStyle}
              value={form.rentalAddress}
              onChange={(e) => set("rentalAddress", e.target.value)}
              placeholder="123 Main St, Dayton, OH 45402"
              autoComplete="street-address"
            />
          </Field>
          <Field label="Landlord / manager name *">
            <input
              style={inputStyle}
              value={form.landlordName}
              onChange={(e) => set("landlordName", e.target.value)}
              placeholder="ABC Properties LLC"
            />
          </Field>
          <Field label="Date you first noticed / reported the mold *">
            <input
              style={inputStyle}
              type="date"
              value={form.dateFirstReported}
              max={todayIso}
              onChange={(e) => set("dateFirstReported", e.target.value)}
            />
          </Field>
          <Field label="Where is the mold? *">
            <input
              style={inputStyle}
              value={form.moldLocation}
              onChange={(e) => set("moldLocation", e.target.value)}
              placeholder="e.g. the bathroom ceiling and the bedroom closet wall"
            />
          </Field>
          <Field label="Your phone (optional)">
            <input
              style={inputStyle}
              value={form.tenantPhone}
              onChange={(e) => set("tenantPhone", e.target.value)}
              placeholder="(937) 555-0100"
              autoComplete="tel"
            />
          </Field>
        </div>
        <Field label="Describe the problem *">
          <textarea
            style={{ ...inputStyle, minHeight: 90, resize: "vertical" }}
            value={form.moldDescription}
            onChange={(e) => set("moldDescription", e.target.value)}
            placeholder="e.g. Black spots spreading across the bathroom ceiling since the upstairs pipe leaked; musty smell throughout the hallway."
          />
        </Field>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "0 16px",
          }}
        >
          <Field label="Have you reported this before?">
            <select
              style={inputStyle}
              value={form.priorRequests}
              onChange={(e) =>
                set("priorRequests", e.target.value as "yes" | "no")
              }
            >
              <option value="no">No — first formal notice</option>
              <option value="yes">Yes — reported before, not fixed</option>
            </select>
          </Field>
          <Field label="Your email (optional)">
            <input
              style={inputStyle}
              type="email"
              value={form.tenantEmail}
              onChange={(e) => set("tenantEmail", e.target.value)}
              placeholder="jane@example.com"
              autoComplete="email"
            />
          </Field>
        </div>
        {form.priorRequests === "yes" && (
          <Field label="Prior report details (dates, who you told)">
            <textarea
              style={{ ...inputStyle, minHeight: 70, resize: "vertical" }}
              value={form.priorDetails}
              onChange={(e) => set("priorDetails", e.target.value)}
              placeholder="e.g. Told the manager by phone on Sept 12 and texted photos on Sept 20 — no action taken."
            />
          </Field>
        )}

        <div style={{ marginTop: 18 }}>
          <button
            type="button"
            className="btn btn-brand"
            disabled={!ready}
            onClick={() => setGenerated(true)}
            style={{
              opacity: ready ? 1 : 0.5,
              cursor: ready ? "pointer" : "not-allowed",
            }}
          >
            <Icon name="check" />
            Generate my letter
          </button>
          {!ready && (
            <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>
              Fill in the required (*) fields to generate the letter.
            </p>
          )}
        </div>
      </div>

      {generated && ready && (
        <div style={{ marginTop: 24 }}>
          <div
            className="no-print"
            style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}
          >
            <button type="button" className="btn btn-ghost" onClick={copy}>
              <Icon name="check" />
              {copied ? "Copied!" : "Copy letter"}
            </button>
            <button type="button" className="btn btn-ghost" onClick={print}>
              <Icon name="arrow" />
              Print letter
            </button>
          </div>
          <div
            style={{
              border: "1px solid var(--line, #e5e5e5)",
              borderRadius: 10,
              padding: "28px 32px",
              background: "#fff",
              fontFamily: "Georgia, serif",
              fontSize: 15.5,
              lineHeight: 1.75,
              color: "#1a1a1a",
            }}
          >
            {paras.map((p, i) =>
              p === "" ? (
                <div key={i} style={{ height: 14 }} />
              ) : p.includes("\n") ? (
                <p key={i} style={{ margin: 0, whiteSpace: "pre-line" }}>
                  {p}
                </p>
              ) : (
                <p key={i} style={{ margin: 0 }}>
                  {p}
                </p>
              )
            )}
          </div>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 10 }}>
            Legal basis: Ohio Revised Code §5321.04(A)(1)–(2) —{" "}
            <a
              href={STATUTE_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--brand-dark)" }}
            >
              read the statute at codes.ohio.gov
            </a>
            .
          </p>
        </div>
      )}

      <p className="disclaimer">
        <strong>Not legal advice.</strong> This generator produces a formal
        notice template citing Ohio law — it is not legal advice and creates
        no attorney–client relationship. For legal questions, consult an Ohio
        tenant-rights attorney. Keep a copy of every notice you send.
      </p>
    </div>
  );
}
