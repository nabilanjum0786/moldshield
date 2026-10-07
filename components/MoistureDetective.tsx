"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { siteConfig } from "../lib/site-config";
import {
  ROOMS,
  ROOM_QUESTIONS,
  diagnose,
  NOT_A_DIAGNOSIS,
  type Room,
  type Answers,
} from "../lib/moisture-detective";

/* ── Hand-drawn-style house diagram: 7 clickable room zones ── */

type ZoneShape =
  | { kind: "poly"; points: string }
  | { kind: "rect"; x: number; y: number; w: number; h: number };

const ZONES: { room: Room; shape: ZoneShape; label: string[]; lx: number; ly: number }[] = [
  {
    room: "attic",
    shape: { kind: "poly", points: "210,16 88,102 332,102" },
    label: ["Attic"],
    lx: 210,
    ly: 74,
  },
  {
    room: "bedroom-closet",
    shape: { kind: "rect", x: 104, y: 102, w: 106, h: 78 },
    label: ["Bedroom", "Closet"],
    lx: 157,
    ly: 135,
  },
  {
    room: "bathroom",
    shape: { kind: "rect", x: 210, y: 102, w: 106, h: 78 },
    label: ["Bathroom"],
    lx: 263,
    ly: 143,
  },
  {
    room: "kitchen",
    shape: { kind: "rect", x: 104, y: 180, w: 106, h: 72 },
    label: ["Kitchen"],
    lx: 157,
    ly: 218,
  },
  {
    room: "laundry",
    shape: { kind: "rect", x: 210, y: 180, w: 106, h: 72 },
    label: ["Laundry"],
    lx: 263,
    ly: 218,
  },
  {
    room: "basement",
    shape: { kind: "rect", x: 104, y: 252, w: 212, h: 54 },
    label: ["Basement"],
    lx: 210,
    ly: 281,
  },
  {
    room: "exterior",
    shape: { kind: "rect", x: 336, y: 118, w: 68, h: 188 },
    label: ["Outside"],
    lx: 370,
    ly: 214,
  },
];

function HouseDiagram({
  selected,
  onSelect,
}: {
  selected: Room | null;
  onSelect: (room: Room) => void;
}) {
  const ink = "currentColor";
  return (
    <div>
      <style>{`.room-zone:hover{stroke:var(--accent,#F59E0B);stroke-width:3;}`}</style>
      <svg
        viewBox="0 0 420 340"
        role="group"
        aria-label="House diagram — tap a room"
        style={{ width: "100%", maxWidth: 460, height: "auto", display: "block", margin: "0 auto" }}
      >
        {/* house outline (hand-drawn wobble approximated with mid-point offsets) */}
        <g fill="none" stroke={ink} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" opacity={0.55}>
          <path d="M208 16 L92 100 L88 104" />
          <path d="M212 16 L328 100 L332 104" />
          <path d="M86 104 L334 104" />
          <path d="M102 104 L102 306" />
          <path d="M318 104 L318 306" />
          <path d="M100 306 L320 306" />
          <path d="M102 180 L318 180" />
          <path d="M210 102 L210 180" />
          <path d="M210 180 L210 252" />
          {/* chimney */}
          <path d="M262 48 L262 22 L286 22 L286 66" />
          {/* ground line */}
          <path d="M40 252 L380 252" strokeDasharray="10 7" />
          <path d="M40 252 L60 258 M90 252 L110 258" strokeWidth={1.5} />
          {/* door + window doodles */}
          <path d="M148 252 L148 226 L176 226 L176 252" strokeWidth={1.5} />
          <circle cx="262" cy="216" r="10" strokeWidth={1.5} />
        </g>
        {/* clickable zones */}
        {ZONES.map((z) => {
          const isSel = selected === z.room;
          const common = {
            role: "button" as const,
            tabIndex: 0,
            "aria-label": z.label.join(" "),
            "aria-pressed": isSel,
            className: "room-zone",
            onClick: () => onSelect(z.room),
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(z.room);
              }
            },
            style: {
              cursor: "pointer",
              fill: isSel ? "rgba(245,158,11,.14)" : "transparent",
              stroke: isSel ? "#F59E0B" : "transparent",
              strokeWidth: isSel ? 3 : 2,
              outline: "none",
            },
          };
          return z.shape.kind === "poly" ? (
            <polygon key={z.room} points={z.shape.points} {...common} />
          ) : (
            <rect
              key={z.room}
              x={z.shape.x}
              y={z.shape.y}
              width={z.shape.w}
              height={z.shape.h}
              rx={z.room === "exterior" ? 8 : 0}
              strokeDasharray={z.room === "exterior" ? "8 6" : undefined}
              {...common}
            />
          );
        })}
        {/* labels */}
        {ZONES.map((z) => (
          <g key={`lbl-${z.room}`} pointerEvents="none">
            {z.label.map((line, i) => (
              <text
                key={i}
                x={z.lx}
                y={z.ly + i * 15}
                textAnchor="middle"
                fontSize={12.5}
                fontWeight={700}
                fill={selected === z.room ? "#F59E0B" : "currentColor"}
                opacity={selected === z.room ? 1 : 0.8}
              >
                {line}
              </text>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ── Moisture Detective tool ── */

export function MoistureDetective() {
  const [room, setRoom] = useState<Room | null>(null);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [picked, setPicked] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const questions = room ? ROOM_QUESTIONS[room] : [];
  const q = questions[idx];
  const result = done && room ? diagnose(room, answers as Answers) : null;

  function pickRoom(r: Room) {
    setRoom(r);
    setIdx(0);
    setAnswers({});
    setPicked(null);
    setDone(false);
  }

  function answer(value: string) {
    if (!room) return;
    setPicked(value);
    const key = ROOM_QUESTIONS[room][idx].key;
    const next = { ...answers, [key]: value };
    window.setTimeout(() => {
      setAnswers(next);
      setPicked(null);
      if (idx + 1 < questions.length) {
        setIdx(idx + 1);
      } else {
        setDone(true);
      }
    }, 250);
  }

  function back() {
    if (!room) return;
    if (idx === 0) {
      setRoom(null);
      setAnswers({});
      return;
    }
    const prevKey = ROOM_QUESTIONS[room][idx - 1].key;
    const curKey = ROOM_QUESTIONS[room][idx].key;
    const next = { ...answers };
    delete next[prevKey];
    delete next[curKey];
    setAnswers(next);
    setIdx(idx - 1);
  }

  function restart() {
    setRoom(null);
    setIdx(0);
    setAnswers({});
    setPicked(null);
    setDone(false);
  }

  return (
    <div className="tool reveal" id="moisture-detective">
      <h3>
        <Icon name="home" />
        Moisture Detective — Where Is the Water Coming From?
      </h3>
      <p className="micro">
        Tap the room with the problem, answer a few quick questions, and get
        the likely moisture sources to investigate — in the order worth
        checking.
      </p>

      {/* Step 1: room picker */}
      {!room && (
        <div id="md-rooms" style={{ marginTop: 18 }}>
          <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 12 }}>
            Step 1 — Where&apos;s the problem?
          </p>
          <HouseDiagram selected={room} onSelect={pickRoom} />
          <div
            className="quiz-opts"
            style={{
              marginTop: 14,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: 8,
            }}
          >
            {ROOMS.map((r) => (
              <button
                key={r.id}
                type="button"
                className="quiz-opt"
                onClick={() => pickRoom(r.id)}
                style={{ textAlign: "center", padding: "10px 8px" }}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: questions */}
      {room && !done && q && (
        <div id="md-questions">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <span style={{ fontSize: 13, color: "var(--muted)" }}>
              {ROOMS.find((r) => r.id === room)?.label} — Question {idx + 1}{" "}
              of {questions.length}
            </span>
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
                width: `${((idx + 1) / questions.length) * 100}%`,
                background: "var(--accent, #F59E0B)",
                borderRadius: 3,
                transition: "width .3s ease",
              }}
            />
          </div>
          <div className="quiz-q">
            <p style={{ fontWeight: 600, fontSize: 16 }}>
              {idx + 1}. {q.q}
            </p>
            <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>
              {q.why}
            </p>
            <div className="quiz-opts" style={{ marginTop: 12 }}>
              {q.options.map((o) => (
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
        </div>
      )}

      {/* Step 3: ranked results */}
      {result && (
        <div className="result show" role="status">
          <div
            style={{
              border: "1px solid var(--line, #e5e5e5)",
              borderRadius: 12,
              padding: "18px 20px",
              background: "var(--card, #fff)",
            }}
          >
            <div
              className="big"
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <Icon name="check" />
              Likely causes to investigate — {result.roomLabel}
            </div>
            <p style={{ margin: "10px 0 0", fontSize: 14.5 }}>
              {NOT_A_DIAGNOSIS}
            </p>
          </div>

          <ol
            style={{
              margin: "16px 0 0",
              padding: 0,
              listStyle: "none",
              display: "grid",
              gap: 12,
            }}
          >
            {result.causes.map((c) => (
              <li
                key={c.id}
                style={{
                  border: "1px solid var(--line, #e5e5e5)",
                  borderRadius: 10,
                  padding: "14px 16px",
                  background: "var(--card, #fff)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "var(--brand-dark, #0B2B26)",
                      color: "#fff",
                      fontWeight: 800,
                      fontSize: 15,
                    }}
                  >
                    {c.order}
                  </span>
                  <div>
                    <strong style={{ fontSize: 16 }}>
                      Check #{c.order}: {c.title}
                    </strong>
                    <p
                      style={{
                        margin: "6px 0",
                        fontSize: 14.5,
                        color: "var(--muted)",
                      }}
                    >
                      {c.reasoning}
                    </p>
                    <p style={{ margin: 0, fontSize: 14.5 }}>
                      <strong
                        style={{ color: "var(--brand, #0F3D3E)" }}
                      >
                        Check this:{" "}
                      </strong>
                      {c.checkThis}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div
            style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 18 }}
          >
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
              Found the source? Call {siteConfig.phoneDisplay}
            </a>
            <Link className="more" href="#final-cta">
              Or book a free inspection online
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
              Start over with a different room
            </button>
          </p>
        </div>
      )}

      <p className="disclaimer">
        This tool suggests where to look — it can&apos;t diagnose your house.
        Work down the list, rule each cause out, and fix the moisture source
        before treating any mold.
      </p>
    </div>
  );
}
