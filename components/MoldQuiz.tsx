"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";

const QUESTIONS = [
  "Do you smell a musty or earthy odor indoors?",
  "Have you seen spots or discoloration on walls, ceilings, or floors?",
  "Any water damage, leaks, or flooding in the past 2 years?",
  "Is indoor humidity often high — foggy windows, condensation?",
  "Does anyone's allergies or asthma get worse indoors?",
  "Is the home 20+ years old, or had roof/plumbing issues?",
  "Peeling paint, warped flooring, or water stains anywhere?",
];

/** "Do I have mold?" risk quiz (§5) — 7 questions, honest verdict. */
export function MoldQuiz() {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);

  function answer(v: number) {
    setPicked(v);
    const newScore = score + v;
    window.setTimeout(() => {
      setScore(newScore);
      setPicked(null);
      if (idx + 1 < QUESTIONS.length) {
        setIdx(idx + 1);
      } else {
        setDone(true);
      }
    }, 250);
  }

  const verdict =
    score <= 2
      ? "Low risk — stay vigilant."
      : score <= 4
        ? "Moderate risk — get a free inspection."
        : "High risk — book a free inspection now.";
  const note =
    score <= 2
      ? `You answered yes ${score} of 7 times. Keep humidity under 60% and fix leaks within 48 hours.`
      : score <= 4
        ? `You answered yes ${score} of 7 times. That's enough signal for a professional look — it's free.`
        : `You answered yes ${score} of 7 times. Multiple warning signs together strongly suggest active or hidden mold.`;

  return (
    <div className="tool reveal" data-delay="1" id="quiz">
      <h3>
        <Icon name="clock" />
        Do I Have Mold? — 60-Second Risk Quiz
      </h3>
      <p className="micro">Seven yes-or-no questions. Zero judgment. One honest verdict.</p>
      {!done ? (
        <div id="quiz-body">
          {QUESTIONS.map((q, i) => (
            <div key={i} className="quiz-q" hidden={i !== idx}>
              <p>
                {i + 1}. {q}
              </p>
              <div className="quiz-opts">
                <button
                  type="button"
                  className={`quiz-opt${picked === 1 ? " picked" : ""}`}
                  onClick={() => answer(1)}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className={`quiz-opt${picked === 0 ? " picked" : ""}`}
                  onClick={() => answer(0)}
                >
                  No
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div className={`result${done ? " show" : ""}`} role="status">
        <div className="big">{done ? verdict : ""}</div>
        <p style={{ margin: "8px 0 0", fontSize: 14.5 }}>{done ? note : ""}</p>
        <p style={{ margin: "10px 0 0" }}>
          <Link className="more" href="#final-cta">
            Book your free inspection
            <Icon name="arrow" />
          </Link>
        </p>
      </div>
      <p className="disclaimer">
        A quiz can&apos;t diagnose mold — only an inspection can. This just
        tells you how urgently to get one.
      </p>
    </div>
  );
}
