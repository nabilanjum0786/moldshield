import Link from "next/link";
import type { ReactNode } from "react";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "./icons";
import { Reveal } from "./Reveal";

/**
 * CtaBand — final CTA band (§19), v3 deep-teal "unknown smaller" style.
 * id="final-cta" so every booking link lands here.
 */
export function CtaBand({
  title,
  sub,
  bookHref = "/contact/",
}: {
  title: ReactNode;
  sub: string;
  bookHref?: string;
}) {
  return (
    <section className="final-cta" id="final-cta" aria-labelledby="cta-h">
      <div className="final-air" aria-hidden="true" />
      <Reveal>
        <span className="eyebrow light">Your next step can be simple</span>
        <h2 id="cta-h">{title}</h2>
        <p>{sub}</p>
        <div className="cta-row" style={{ justifyContent: "center" }}>
          <a className="btn btn-primary" href={siteConfig.phoneHref}>
            <Icon name="phone" />
            Call {siteConfig.phoneDisplay}
          </a>
          <Link className="btn btn-ghost-light" href={bookHref}>
            Book Online
            <Icon name="arrow" />
          </Link>
        </div>
        <p style={{ fontSize: 13, color: "#8fb3a8", marginTop: 22, marginBottom: 0 }}>
          24/7 response · Serving homes across America
        </p>
      </Reveal>
    </section>
  );
}
