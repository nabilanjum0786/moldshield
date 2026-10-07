"use client";

import { useState } from "react";
import { Icon } from "./icons";

/**
 * EmailCapture — name + email capture form for the lead magnet.
 * Posts to /api/subscribe (stubbed; wire Mailchimp/ConvertKit there).
 * Honest microcopy only — see app/privacy for the email-data line.
 */
export function EmailCapture({
  source = "checklist-page",
  onSuccess,
  compact = false,
}: {
  source?: string;
  onSuccess?: () => void;
  compact?: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "done">(
    "idle"
  );
  const [error, setError] = useState("");

  function validate(): string | null {
    if (name.trim().length < 2) return "Please enter your first name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      return "That email doesn't look right — mind checking it?";
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
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), source }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("done");
      onSuccess?.();
    } catch {
      setStatus("error");
      setError(
        "Something went wrong sending that. Please try again — or call us and we'll send the checklist directly."
      );
    }
  }

  if (status === "done") {
    return (
      <div
        className="result show"
        role="status"
        style={{
          background: "#0B3D2E",
          color: "#7CF5C8",
          borderRadius: 12,
          padding: "16px 18px",
        }}
      >
        <div
          className="big"
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <Icon name="check" />
          You&apos;re in, {name.trim().split(" ")[0]}!
        </div>
        <p style={{ margin: "8px 0 0", fontSize: 14.5 }}>
          Your free Mold Inspection Checklist is unlocked below — print it or
          save it before your walkthrough.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      aria-label="Get the free mold inspection checklist"
      style={{ display: "grid", gap: 10, marginTop: compact ? 10 : 14 }}
    >
      <label style={{ display: "grid", gap: 6, fontSize: 14, fontWeight: 600 }}>
        First name
        <input
          type="text"
          name="name"
          autoComplete="given-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane"
          disabled={status === "sending"}
          style={{
            padding: "12px 14px",
            borderRadius: 10,
            border: "1px solid var(--line, #e5e5e5)",
            fontSize: 15,
            background: "var(--card, #fff)",
          }}
        />
      </label>
      <label style={{ display: "grid", gap: 6, fontSize: 14, fontWeight: 600 }}>
        Email
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@example.com"
          disabled={status === "sending"}
          style={{
            padding: "12px 14px",
            borderRadius: 10,
            border: "1px solid var(--line, #e5e5e5)",
            fontSize: 15,
            background: "var(--card, #fff)",
          }}
        />
      </label>
      {status === "error" && error && (
        <p role="alert" style={{ color: "#b3261e", fontSize: 13.5, margin: 0 }}>
          {error}
        </p>
      )}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === "sending"}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <Icon name="check" />
        {status === "sending" ? "Sending…" : "Send me the free checklist"}
        <Icon name="arrow" />
      </button>
      <p style={{ fontSize: 12.5, color: "var(--muted)", margin: 0 }}>
        Free checklist. No spam, ever. Unsubscribe anytime.
      </p>
    </form>
  );
}
