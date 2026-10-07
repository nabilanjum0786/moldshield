import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "./icons";

/**
 * Homepage hero — v3 "Clear air" structure.
 * Abstract airflow visual (pure CSS/SVG, no photos), floating honesty
 * cards, staggered load-in. Copy: v3's finalized calm tone.
 */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-h">
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="eyebrow">Calm, honest help for American homes</span>
          <h1 id="hero-h">
            <span className="hrow">Clear air.</span>
            <span className="hrow">Clear answers.</span>
            <span className="hrow">A safer-feeling</span>
            <span className="hrow">home.</span>
          </h1>
          <p className="hero-sub">
            Mold can make everything feel uncertain. {siteConfig.brandName}{" "}
            helps you understand what you&apos;re seeing, what it may cost,
            and what to do next — without pressure or scare tactics.
          </p>
          <div className="cta-row">
            <a
              className="btn btn-primary btn-pulse"
              href={siteConfig.phoneHref}
            >
              <Icon name="phone" />
              Call {siteConfig.phoneDisplay}
            </a>
            <a className="btn btn-ghost" href="#tools">
              Get a free estimate
              <Icon name="arrow" />
            </a>
          </div>
          <div className="hero-badges" aria-label="Our approach">
            <span>
              <Icon name="check" />
              Plain-language guidance
            </span>
            <span>
              <Icon name="check" />
              No pressure
            </span>
            <span>
              <Icon name="check" />
              Free inspections
            </span>
          </div>
        </div>

        <div
          className="hero-art"
          role="img"
          aria-label="Abstract illustration of clean air flowing through a home"
        >
          <div className="air-orb orb-one" aria-hidden="true" />
          <div className="air-orb orb-two" aria-hidden="true" />
          <div className="air-orb orb-three" aria-hidden="true" />
          <svg
            className="air-lines"
            viewBox="0 0 600 600"
            aria-hidden="true"
          >
            <path d="M-30 350C120 250 175 475 330 360S490 190 650 270" />
            <path d="M-20 410C135 310 200 520 355 405S500 260 650 335" />
            <path d="M20 290C150 210 220 390 355 300S500 130 640 220" />
            <path d="M40 480C180 380 240 560 405 455S530 360 650 405" />
          </svg>
          <div className="hero-note note-top">
            <Icon name="check" />
            <span>
              <b>Start with clarity</b>
              <small>Know what you&apos;re dealing with</small>
            </span>
          </div>
          <div className="hero-note note-bottom">
            <Icon name="shield" />
            <span>
              <b>Honest by design</b>
              <small>No invented promises</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Shared trust-badge row for hub-page heroes (no emoji — icons only). */
export function TrustBadges() {
  return (
    <div className="hero-badges" aria-label="Our approach">
      <span>
        <Icon name="check" />
        Plain-language guidance
      </span>
      <span>
        <Icon name="check" />
        No pressure
      </span>
      <span>
        <Icon name="check" />
        Free inspections
      </span>
    </div>
  );
}

/** Shared hero CTA row (phone + estimate). */
export function HeroCtas({ bookLabel = "Get a free estimate" }: { bookLabel?: string }) {
  return (
    <div className="cta-row">
      <a className="btn btn-primary" href={siteConfig.phoneHref}>
        <Icon name="phone" />
        Call {siteConfig.phoneDisplay}
      </a>
      <Link className="btn btn-ghost" href="#tools">
        {bookLabel}
        <Icon name="arrow" />
      </Link>
    </div>
  );
}
