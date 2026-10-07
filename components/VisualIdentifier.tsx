"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import {
  scoreMatches,
  type ColorOpt,
  type IdAnswers,
  type SmellOpt,
  type SurfaceOpt,
  type TextureOpt,
  type WhereOpt,
} from "../lib/identifier-engine";

type StepKey = keyof IdAnswers;

const STEPS: {
  key: StepKey;
  q: string;
  opts: { value: string; label: string }[];
}[] = [
  {
    key: "where",
    q: "Where is the growth?",
    opts: [
      { value: "bathroom", label: "Bathroom / shower" },
      { value: "basement", label: "Basement" },
      { value: "attic", label: "Attic" },
      { value: "wall", label: "Walls or ceiling" },
      { value: "hvac", label: "Near HVAC vents" },
      { value: "crawl", label: "Crawl space" },
      { value: "window", label: "Windowsills" },
    ],
  },
  {
    key: "color",
    q: "What color is it?",
    opts: [
      { value: "black", label: "Black / dark" },
      { value: "green", label: "Green" },
      { value: "white", label: "White" },
      { value: "gray", label: "Gray" },
      { value: "orangepink", label: "Orange / pink" },
      { value: "brown", label: "Brown" },
    ],
  },
  {
    key: "texture",
    q: "What does the texture look like?",
    opts: [
      { value: "fuzzy", label: "Fuzzy" },
      { value: "slimy", label: "Slimy / wet-looking" },
      { value: "powdery", label: "Powdery" },
      { value: "flat", label: "Flat stain, no texture" },
      { value: "crusty", label: "Crusty / salty" },
    ],
  },
  {
    key: "smell",
    q: "Is there a smell?",
    opts: [
      { value: "musty", label: "Yes — musty / earthy" },
      { value: "none", label: "No smell" },
      { value: "sweet", label: "Slightly sweet" },
    ],
  },
  {
    key: "surface",
    q: "What surface is it growing on?",
    opts: [
      { value: "grout", label: "Tile / grout" },
      { value: "drywall", label: "Drywall / painted wall" },
      { value: "wood", label: "Wood" },
      { value: "concrete", label: "Concrete / brick / stone" },
      { value: "fabric", label: "Fabric / carpet / curtains" },
    ],
  },
];

/** Guided visual mold identifier — matches, never diagnoses. */
export function VisualIdentifier() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<IdAnswers>>({});
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const current = STEPS[step];
  const matches = done ? scoreMatches(answers as IdAnswers) : [];
  const top = matches[0];
  const runnerUp = matches[1];

  function answer(value: string) {
    setPicked(value);
    const next = { ...answers, [current.key]: value } as Partial<IdAnswers>;
    window.setTimeout(() => {
      setAnswers(next);
      setPicked(null);
      if (step + 1 < STEPS.length) setStep(step + 1);
      else setDone(true);
    }, 250);
  }

  function back() {
    if (step === 0) return;
    const next = { ...answers };
    delete next[STEPS[step].key];
    delete next[STEPS[step - 1].key];
    setAnswers(next);
    setStep(step - 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setDone(false);
    setPicked(null);
  }

  return (
    <div className="tool reveal" id="visual-id">
      <h3>
        <Icon name="home" />
        What Am I Looking At? — Visual Mold Identifier
      </h3>
      <p className="micro">
        Five questions. We&apos;ll tell you what it&apos;s most consistent
        with — and what to do about it.
      </p>

      {!done ? (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <span style={{ fontSize: 13, color: "var(--muted)" }}>
              Question {step + 1} of {STEPS.length}
            </span>
            {step > 0 && (
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
                width: `${((step + 1) / STEPS.length) * 100}%`,
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

      {done && top && (
        <div className="result show" role="status">
          <p
            style={{
              fontSize: 13,
              color: "var(--muted)",
              margin: "0 0 6px",
              textTransform: "uppercase",
              letterSpacing: 1.5,
              fontWeight: 800,
            }}
          >
            Most consistent with
          </p>
          <div className="big" style={{ marginBottom: 4 }}>
            {top.candidate.name}
          </div>
          <p style={{ fontSize: 15, color: "var(--brand-dark)", fontWeight: 600 }}>
            {top.candidate.tagline}
          </p>
          <p style={{ fontSize: 15, marginTop: 10 }}>{top.candidate.description}</p>

          <div style={{ marginTop: 14 }}>
            <strong style={{ fontSize: 14 }}>How to tell it apart:</strong>
            <p style={{ fontSize: 14.5, marginTop: 6 }}>{top.candidate.tellApart}</p>
          </div>
          <div style={{ marginTop: 12 }}>
            <strong style={{ fontSize: 14 }}>Your next step:</strong>
            <p style={{ fontSize: 14.5, marginTop: 6 }}>{top.candidate.nextStep}</p>
          </div>

          {runnerUp && runnerUp.score > 0 && (
            <p style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 12 }}>
              Also possible: <strong>{runnerUp.candidate.name}</strong> —{" "}
              {runnerUp.candidate.isMold === top.candidate.isMold
                ? "similar profile"
                : top.candidate.isMold
                  ? "note this one isn't actually mold"
                  : "note this one IS mold"}{" "}
              ({runnerUp.candidate.tagline.toLowerCase()}).
            </p>
          )}

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}>
            <Link className="more" href="/checklist/">
              Get the free inspection checklist
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
              Identify something else
            </button>
          </p>
        </div>
      )}

      <p className="disclaimer">
        <strong>Visual ID is not a diagnosis</strong> — only lab testing
        confirms what you&apos;re looking at. And per CDC (2006), health
        effects depend on the person, not the mold type — so treat any
        significant growth seriously regardless of the match above.
      </p>
    </div>
  );
}

// Re-export answer types for page-level use if needed.
export type {
  WhereOpt,
  ColorOpt,
  TextureOpt,
  SmellOpt,
  SurfaceOpt,
} from "../lib/identifier-engine";
