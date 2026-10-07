"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./icons";

/**
 * Carousel — scroll-snap track with arrows + dots, ported from the template.
 * All slides stay in the DOM (SEO guard); arrows/dots only enhance.
 */
export function Carousel({
  children,
  label,
  className = "",
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const vpRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState(1);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const step = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.children.length) return 0;
    const first = track.children[0] as HTMLElement;
    return first.getBoundingClientRect().width + 16;
  }, []);

  const refresh = useCallback(() => {
    const vp = vpRef.current;
    const track = trackRef.current;
    if (!vp || !track || !track.children.length) return;
    const sw = step();
    const visible = Math.max(1, Math.floor(vp.clientWidth / Math.max(sw, 1)));
    const p = Math.max(1, track.children.length - visible + 1);
    setPages(p);
    const max = vp.scrollWidth - vp.clientWidth;
    setAtStart(vp.scrollLeft <= 2);
    setAtEnd(vp.scrollLeft >= max - 2);
    setActive((a) => Math.max(0, Math.min(p - 1, Math.round(vp.scrollLeft / Math.max(sw, 1)))));
  }, [step]);

  useEffect(() => {
    refresh();
    const onResize = () => refresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [refresh, children]);

  const goTo = (i: number) => {
    const vp = vpRef.current;
    if (!vp) return;
    const max = vp.scrollWidth - vp.clientWidth;
    vp.scrollTo({
      left: Math.min(max, Math.max(0, i * step())),
      behavior: "smooth",
    });
  };

  const onScroll = () => {
    const vp = vpRef.current;
    if (!vp) return;
    const sw = step();
    if (sw <= 0) return;
    const i = Math.max(0, Math.min(pages - 1, Math.round(vp.scrollLeft / sw)));
    setActive(i);
    const max = vp.scrollWidth - vp.clientWidth;
    setAtStart(vp.scrollLeft <= 2);
    setAtEnd(vp.scrollLeft >= max - 2);
  };

  const showUI = pages > 1;

  return (
    <div
      ref={rootRef}
      className={`car reveal ${className}`}
      aria-label={label}
      role="region"
    >
      <button
        className="car-arrow prev"
        aria-label={`Previous ${label.toLowerCase()}`}
        onClick={() => vpRef.current?.scrollBy({ left: -step(), behavior: "smooth" })}
        disabled={atStart}
        hidden={!showUI}
      >
        <Icon name="arrow" />
      </button>
      <div className="car-viewport" ref={vpRef} onScroll={onScroll}>
        <div className="car-track" ref={trackRef}>
          {children}
        </div>
      </div>
      <button
        className="car-arrow next"
        aria-label={`Next ${label.toLowerCase()}`}
        onClick={() => vpRef.current?.scrollBy({ left: step(), behavior: "smooth" })}
        disabled={atEnd}
        hidden={!showUI}
      >
        <Icon name="arrow" />
      </button>
      <div
        className="car-dots"
        aria-hidden="true"
        ref={dotsRef}
        style={{ display: showUI ? "" : "none" }}
      >
        {Array.from({ length: pages }).map((_, i) => (
          <button
            key={i}
            type="button"
            tabIndex={-1}
            aria-label={`Go to slide ${i + 1}`}
            className={i === active ? "active" : ""}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
