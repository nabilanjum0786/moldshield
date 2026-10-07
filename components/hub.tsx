import Link from "next/link";
import { siteConfig, services } from "@/lib/site-config";
import { Icon } from "./icons";
import { HeroCtas, TrustBadges } from "./Hero";
import type { RiskCard } from "@/data/types";

/**
 * HubHero — hero for state/city/town/service-in-city pages.
 * H1 + 50–70 word speakable answer + dual CTA + trust badges.
 */
export function HubHero({
  h1,
  answer,
}: {
  h1: string;
  answer: string | null;
}) {
  return (
    <section className="hero">
      <div className="wrap">
        <h1>{h1}</h1>
        {answer && (
          <div className="answer speakable" role="note" aria-label="Quick answer">
            {answer}
          </div>
        )}
        <HeroCtas />
        <TrustBadges />
      </div>
    </section>
  );
}

/** Q&A callout block (speakable) — from the template's inline question bank. */
export function QaCallout({
  q,
  children,
}: {
  q: string;
  children: React.ReactNode;
}) {
  return (
    <div className="qa-callout speakable reveal" role="note" aria-label="Question and answer">
      <p className="q">{q}</p>
      <p className="a">{children}</p>
    </div>
  );
}

/**
 * ServicesStrip — the 5 pillar cards scoped to a place.
 * `hrefFor(serviceSlug)` decides the target: state hubs point at national
 * pillars; city/town pages point at service-in-city pages.
 */
export function ServicesStrip({
  eyebrow,
  title,
  lede,
  hrefFor,
  alt = false,
  extraCard,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  hrefFor: (serviceSlug: string) => string;
  alt?: boolean;
  extraCard?: React.ReactNode;
}) {
  return (
    <section className={`block${alt ? " alt" : ""}`} aria-labelledby="services-h">
      <div className="wrap">
        <span className="eyebrow reveal">{eyebrow}</span>
        <h2 id="services-h" className="reveal">
          {title}
        </h2>
        {lede && <p className="lede reveal">{lede}</p>}
        <div className="grid cols-3" style={{ marginTop: 26 }}>
          {services.map((s, i) => (
            <div
              key={s.slug}
              className="card reveal"
              {...(i % 3 > 0 ? { "data-delay": String(i % 3) } : {})}
            >
              <h3>{s.name}</h3>
              <p>{s.blurb}</p>
              <Link className="more" href={hrefFor(s.slug)}>
                {s.name} <Icon name="arrow" />
              </Link>
            </div>
          ))}
          {extraCard ?? (
            <div
              className="card reveal"
              data-delay="2"
              style={{
                background: "#0b2b26",
                color: "#eaf5f1",
                borderColor: "#0b2b26",
              }}
            >
              <h3 style={{ color: "#fff" }}>Not sure where to start?</h3>
              <p style={{ color: "#cfe3db" }}>
                Book a free inspection — we&apos;ll find it.
              </p>
              <a href="#final-cta" style={{ color: "#ffd98a" }}>
                <strong>
                  Book free inspection <Icon name="arrow" />
                </strong>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Risk/problem cards (city risk map, town problem cards). */
export function RiskCards({
  cards,
  cols = 2,
}: {
  cards: RiskCard[];
  cols?: 2 | 3;
}) {
  return (
    <div className={`grid cols-${cols}`} style={{ marginTop: 26 }}>
      {cards.map((c, i) => (
        <div
          key={c.title}
          className="card reveal"
          {...(i % cols > 0 ? { "data-delay": String(i % cols) } : {})}
        >
          <h3>{c.title}</h3>
          <p>{c.body}</p>
          <Link className="more" href={`/services/${c.serviceSlug}/`}>
            Learn more <Icon name="arrow" />
          </Link>
        </div>
      ))}
    </div>
  );
}

/** Pill links (towns). */
export function Pills({
  items,
}: {
  items: { href: string; label: string }[];
}) {
  return (
    <div className="reveal" style={{ marginTop: 20 }}>
      {items.map((t) => (
        <Link key={t.href} className="pill" href={t.href}>
          {t.label}
        </Link>
      ))}
    </div>
  );
}

export function PhoneLink({ className = "more" }: { className?: string }) {
  return (
    <a className={className} href={siteConfig.phoneHref}>
      <Icon name="phone" /> {siteConfig.phoneDisplay}
    </a>
  );
}
