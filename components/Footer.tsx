import Link from "next/link";
import { siteConfig, services } from "@/lib/site-config";
import { Icon } from "./icons";
import { listStates } from "@/data";

/** Sticky mobile call bar — v3 amber bar with availability dot. */
export function MobileCallBar() {
  return (
    <div className="mobile-callbar" role="navigation" aria-label="Mobile quick actions">
      <span className="availability-dot" aria-hidden="true" />
      <a href={siteConfig.phoneHref}>
        <span>Have a mold concern?</span>
      </a>
      <a href={siteConfig.phoneHref} aria-label={`Call ${siteConfig.phoneDisplay}`}>
        <b>
          Call now <Icon name="arrow" />
        </b>
      </a>
    </div>
  );
}

export function Footer() {
  const states = listStates();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 25,
            paddingBottom: 42,
            borderBottom: "1px solid rgba(255,255,255,.1)",
            flexWrap: "wrap",
          }}
        >
          <Link
            className="logo"
            href="/"
            style={{ color: "#fff" }}
            aria-label={`${siteConfig.brandName} home`}
          >
            <span className="logo-mark" style={{ background: "#315d54" }} aria-hidden="true">
              <Icon name="shield" />
            </span>
            MoldShield
          </Link>
          <p style={{ fontSize: 12.5, color: "#8ca8a1", lineHeight: 1.55, margin: 0 }}>
            Clear answers for healthier-feeling homes
            <br />
            across America.
          </p>
          <a
            href={siteConfig.phoneHref}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              color: "#fff",
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            <Icon name="phone" />
            {siteConfig.phoneDisplay}
          </a>
        </div>

        <div className="footer-grid" style={{ marginTop: 36 }}>
          <div>
            <h4>States</h4>
            <div className="state-links">
              {states.map((s) => (
                <Link key={s.slug} href={`/${s.slug}/`}>
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4>Services</h4>
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}/`}
                style={{ display: "block", marginBottom: 6 }}
              >
                {s.name}
              </Link>
            ))}
          </div>
          <div>
            <h4>Company</h4>
            <Link href="/process/" style={{ display: "block", marginBottom: 6 }}>
              Our Process
            </Link>
            <Link href="/about/" style={{ display: "block", marginBottom: 6 }}>
              About Us
            </Link>
            <Link href="/contact/" style={{ display: "block", marginBottom: 6 }}>
              Contact
            </Link>
            <Link href="/locations/" style={{ display: "block", marginBottom: 6 }}>
              All Locations
            </Link>
          </div>
          <div>
            <h4>Free tools</h4>
            <Link href="/tools/" style={{ display: "block", marginBottom: 6 }}>
              All free tools
            </Link>
            <Link href="/checklist/" style={{ display: "block", marginBottom: 6 }}>
              Inspection checklist
            </Link>
            <Link href="/tools/quote-checker/" style={{ display: "block", marginBottom: 6 }}>
              Quote checker
            </Link>
            <Link href="/risk-score/" style={{ display: "block", marginBottom: 6 }}>
              Mold risk score
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © 2026 {siteConfig.brandName}. Educational information, not medical
            advice. | <Link href="/privacy/">Privacy Policy</Link> ·{" "}
            <Link href="/terms/">Terms of Service</Link>
          </p>
          <p style={{ marginTop: 8 }}>
            Statistics on this page are cited to their sources (EPA, CDC,
            HomeAdvisor, Angi, KFF Health News, NIH). Health information is
            educational, not medical advice — consult a professional for
            diagnosis.
          </p>
        </div>
      </div>
    </footer>
  );
}
