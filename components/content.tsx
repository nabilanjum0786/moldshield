"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "./icons";

export type FaqItem = { question: string; answer: string };

/** Accessible FAQ accordion — ported design system (faq-item/faq-q/faq-a). */
export function Faq({
  items,
  heading = "Frequently Asked Questions",
}: {
  items: FaqItem[];
  heading?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="block" aria-label={heading} style={{ padding: "32px 0" }}>
      <div className="wrap" style={{ maxWidth: 860 }}>
        <h2 className="reveal in">{heading}</h2>
        <div style={{ marginTop: 20 }}>
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className={`faq-item${isOpen ? " open" : ""}`}>
                <button
                  className="faq-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{item.question}</span>
                  <span className="icon" aria-hidden="true">
                    +
                  </span>
                </button>
                <div className="faq-a">
                  <div className="faq-a-inner">
                    <div className="faq-a-pad speakable">{item.answer}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Direct-answer block: 40–70 word AEO unit. className "speakable" feeds Speakable schema. */
export function AnswerBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="answer speakable" role="note" aria-label="Quick answer">
      {children}
    </div>
  );
}

/** Big call-to-action card used mid-page and above footer. */
export function CtaCard({ title, body }: { title: string; body: string }) {
  return (
    <section className="block" aria-label={title}>
      <div className="wrap">
        <div className="dark-card reveal in">
          <h2 style={{ color: "#fff" }}>{title}</h2>
          <p style={{ color: "#cfe3db", maxWidth: 640 }}>{body}</p>
          <div className="cta-row">
            <a className="btn btn-primary" href={siteConfig.phoneHref}>
              <Icon name="phone" />
              Call {siteConfig.phoneDisplay}
            </a>
            <Link className="btn btn-ghost-light" href="/contact/">
              Book Online
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
