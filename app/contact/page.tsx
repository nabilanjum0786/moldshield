import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HubHero } from "@/components/hub";
import { Icon } from "@/components/icons";
import { JsonLd, speakableSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Contact Us | ${siteConfig.brandName}`,
  description:
    "Contact our mold remediation team: 24/7 phone line, free inspection booking, and emergency response for water damage and visible mold.",
  alternates: { canonical: `${siteConfig.siteUrl}/contact/` },
};

export default function ContactPage() {
  const url = `${siteConfig.siteUrl}/contact/`;
  return (
    <>
      <JsonLd
        data={[speakableSchema({ url, cssSelectors: [".speakable"] })]}
      />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Contact Us" }]}
      />

      <HubHero
        h1="Contact Us"
        answer={`The fastest way to reach us is the phone — ${siteConfig.hours}. For non-urgent questions, send a message and we'll respond within one business day. Every inquiry starts with a conversation, never a sales pitch.`}
      />

      <section className="block" aria-label="Contact options">
        <div className="wrap">
          <div className="grid cols-2" style={{ marginTop: 8 }}>
            <div
              className="card reveal"
              style={{
                textAlign: "center",
                borderColor: "var(--brand)",
                borderWidth: 2,
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 2.5,
                  textTransform: "uppercase",
                  color: "var(--brand-dark)",
                }}
              >
                {siteConfig.hours}
              </p>
              <a
                href={siteConfig.phoneHref}
                style={{
                  marginTop: 12,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 30,
                  fontWeight: 800,
                  color: "var(--ink)",
                  textDecoration: "none",
                }}
              >
                <Icon name="phone" />
                {siteConfig.phoneDisplay}
              </a>
              <p style={{ marginTop: 12, color: "var(--muted)" }}>
                Emergency? Active leak, visible mold spreading, real-estate
                deadline — call now, we prioritize same-day.
              </p>
            </div>
            <div className="card reveal" data-delay="1">
              <h3>Book a Free Inspection</h3>
              <p>
                Call the number and mention &ldquo;free inspection&rdquo; —
                we&apos;ll schedule a certified inspector to visit, map
                moisture, and leave written findings with photos. No
                obligation, no pressure.
              </p>
              <Link
                className="more"
                href="/services/mold-inspection-testing/"
              >
                What the inspection includes <Icon name="arrow" />
              </Link>
            </div>
          </div>

          <div
            className="card reveal"
            style={{ marginTop: 20, background: "var(--paper)" }}
          >
            <h3>Service Area</h3>
            <p>
              Currently serving Dayton, Ohio and surrounding Miami Valley
              communities —{" "}
              <Link href="/ohio/dayton/">
                see all 10 towns we cover <Icon name="arrow" />
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
