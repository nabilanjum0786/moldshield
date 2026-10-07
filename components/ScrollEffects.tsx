"use client";

import { useEffect } from "react";

/**
 * ScrollEffects — mounts the template's progressive-enhancement behaviors:
 *  - `.reveal` elements gain `.in` when they scroll into view
 *    (IntersectionObserver; no-JS fallback leaves content visible since
 *    the animation classes only hide when JS runs — see globals.css note).
 *  - `.stat .num[data-final]` animated counters.
 * All content stays in the DOM (SEO guard) — these only enhance.
 */
export function ScrollEffects() {
  useEffect(() => {
    // ── scroll reveal ──
    const revealEls = Array.from(document.querySelectorAll(".reveal"));
    let revealIO: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      revealIO = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              revealIO?.unobserve(e.target);
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el) => revealIO!.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("in"));
    }

    // ── animated stat counters ──
    function animate(el: Element) {
      const final = el.getAttribute("data-final") || el.textContent || "";
      const m = final.match(/^\$?([\d,]+)/);
      if (!m) return;
      const target = parseFloat(m[1].replace(/,/g, ""));
      const prefix = final.charAt(0) === "$" ? "$" : "";
      const dur = 1200;
      let t0: number | null = null;
      function frame(t: number) {
        if (t0 == null) t0 = t;
        const p = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        const v = Math.round(target * e);
        el.textContent = prefix + v.toLocaleString("en-US");
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = final;
      }
      requestAnimationFrame(frame);
    }
    let countIO: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      countIO = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              animate(e.target);
              countIO?.unobserve(e.target);
            }
          }
        },
        { threshold: 0.5 }
      );
      document
        .querySelectorAll(".stat .num")
        .forEach((el) => countIO!.observe(el));
    }
    return () => {
      revealIO?.disconnect();
      countIO?.disconnect();
    };
  }, []);

  return null;
}
