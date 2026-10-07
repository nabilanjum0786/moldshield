"use client";

import { useState } from "react";

/**
 * FaqAccordion — single-open accordion, smooth grid-rows animation
 * (ported from the template). Answers render as HTML strings produced
 * by the content pipeline (internal links + formatting allowed).
 */
export function FaqAccordion({ items }: { items: { q: string; aHtml: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`faq-item${isOpen ? " open" : ""}`}>
            <button
              className="faq-q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              <span className="icon" aria-hidden="true">
                +
              </span>
            </button>
            <div className="faq-a">
              <div className="faq-a-inner">
                <div
                  className="faq-a-pad"
                  dangerouslySetInnerHTML={{ __html: item.aHtml }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
