"use client";

import { useState } from "react";
import { Icon } from "./icons";

/**
 * AlertSignup — email + ZIP + 3 preference checkboxes.
 * Posts to /api/alerts (stubbed: logs server-side; provider wiring is a TODO).
 * Honest microcopy only — email alerts, no spam, unsubscribe anytime.
 */

type Prefs = { highRisk: boolean; postFlood: boolean; seasonal: boolean };

const inputStyle: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid var(--line, #e5e5e5)",
  fontSize: 15,
  background: "var(--card, #fff)",
};

export function AlertSignup({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [prefs, setPrefs] = useState<Prefs>({
    highRisk: true,
    postFlood: true,
    seasonal: true,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">("idle");
  const [error, setError] = useState("");

  function toggle(key: keyof Prefs) {
    setPrefs((p) => ({ ...p, [key]: !p[key] }));
  }

  function validate(): string | null {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      return "That email doesn't look right — mind checking it?";
    if (!/^\d{5}$/.test(zip.trim()))
      return "Please enter a 5-digit ZIP code.";
    if (!prefs.highRisk && !prefs.postFlood && !prefs.seasonal)
      return "Pick at least one alert type — otherwise there's nothing to send you.";
    return null;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const problem = validate();
    if (problem) {
      setError(problem);
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          zip: zip.trim(),
          preferences: prefs,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Something went wrong — please try again in a moment.");
    }
  }

  if (status === "done") {
    return (
      <div
        role="status"
        style={{
          background: "#0B2B26",
          color: "#fff",
          borderRadius: 12,
          padding: "18px 20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 17 }}>
          <Icon name="check" />
          You&apos;re signed up.
        </div>
        <p style={{ margin: "8px 0 0", fontSize: 14.5, color: "#cfe3dd" }}>
          We&apos;ll email <strong>{email.trim()}</strong> when mold risk spikes
          near ZIP <strong>{zip.trim()}</strong>. Unsubscribe anytime — every
          alert has a link.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      aria-label="Sign up for free mold weather alerts"
      style={{ display: "grid", gap: 10, marginTop: compact ? 10 : 14 }}
    >
      <label style={{ display: "grid", gap: 6, fontSize: 14, fontWeight: 600 }}>
        Email
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          disabled={status === "sending"}
          style={inputStyle}
        />
      </label>
      <label style={{ display: "grid", gap: 6, fontSize: 14, fontWeight: 600 }}>
        ZIP code
        <input
          type="text"
          name="zip"
          inputMode="numeric"
          autoComplete="postal-code"
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/[^\d]/g, "").slice(0, 5))}
          placeholder="45402"
          disabled={status === "sending"}
          style={{ ...inputStyle, maxWidth: 180 }}
        />
      </label>

      <fieldset
        style={{
          border: "1px solid var(--line, #e5e5e5)",
          borderRadius: 10,
          padding: "12px 14px",
          display: "grid",
          gap: 8,
          margin: 0,
        }}
      >
        <legend style={{ fontSize: 14, fontWeight: 600, padding: "0 6px" }}>
          Alert me about
        </legend>
        {(
          [
            ["highRisk", "High-risk windows", "Sustained humid spells and post-storm conditions near your ZIP."],
            ["postFlood", "Post-flood 48-hour checklist", "Sent after flooding near your ZIP — the critical drying window."],
            ["seasonal", "Seasonal prep reminders", "Fall attic prep and spring AC checks, matched to your climate."],
          ] as [keyof Prefs, string, string][]
        ).map(([key, label, blurb]) => (
          <label
            key={key}
            style={{ display: "flex", gap: 10, alignItems: "flex-start", cursor: "pointer", fontSize: 14.5 }}
          >
            <input
              type="checkbox"
              checked={prefs[key]}
              onChange={() => toggle(key)}
              disabled={status === "sending"}
              style={{ marginTop: 3, accentColor: "#0B2B26", width: 17, height: 17 }}
            />
            <span>
              <strong>{label}</strong>
              <br />
              <span style={{ color: "var(--muted)", fontSize: 13.5 }}>{blurb}</span>
            </span>
          </label>
        ))}
      </fieldset>

      {status === "error" && error && (
        <p role="alert" style={{ color: "#b3261e", fontSize: 13.5, margin: 0 }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === "sending"}
        style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}
      >
        <Icon name="check" />
        {status === "sending" ? "Signing you up…" : "Get free mold weather alerts"}
        <Icon name="arrow" />
      </button>
      <p style={{ fontSize: 12.5, color: "var(--muted)", margin: 0 }}>
        Alerts when mold risk spikes near you. No spam, unsubscribe anytime.
      </p>
    </form>
  );
}
