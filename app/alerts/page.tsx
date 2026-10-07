import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AlertSignup } from "@/components/AlertSignup";
import { CtaBand } from "@/components/CtaBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: `Free Mold Weather Alerts | ${siteConfig.brandName}`,
  description:
    "Free email alerts when mold risk spikes near your ZIP: high-risk humid windows, post-flood 48-hour checklists, and seasonal prep reminders. No spam, unsubscribe anytime.",
  alternates: { canonical: `${siteConfig.siteUrl}/alerts/` },
};

const ALERT_TYPES = [
  {
    icon: "clock",
    title: "High-risk window alerts",
    blurb:
      "An email when a sustained humid spell or post-storm conditions hit your ZIP — plus a short checklist of what to check that week.",
  },
  {
    icon: "shield",
    title: "Post-flood 48-hour checklists",
    blurb:
      "Sent after flooding near your ZIP. The EPA's rule: clean and dry everything within 24–48 hours to prevent mold growth.",
  },
  {
    icon: "home",
    title: "Seasonal prep reminders",
    blurb:
      "Fall attic prep before winter condensation season, and a spring AC condensate-line check before cooling season.",
  },
] as const;

const FAQS = [
  {
    q: "How do you decide a 'high-risk window'?",
    aHtml:
      "<p>We look at real weather data for your ZIP — sustained high dew point and humidity over several days, and post-storm conditions — from weather services like Open-Meteo. When the pattern matches conditions where mold commonly starts growing, you get an alert.</p><p>Be straight with you: these are advisories, not predictions. Weather data can tell us the conditions are right for mold, but it can't tell us whether <em>your</em> home has a leak or damp spot. Treat an alert as a reminder to check, not a diagnosis.</p>",
  },
  {
    q: "How often will I get emails?",
    aHtml:
      "<p>Only when there's something to act on. High-risk alerts go out when conditions actually spike — many months you'll hear nothing. Seasonal reminders come twice a year. No newsletters, no promotions, no spam.</p>",
  },
  {
    q: "Do I have to live in Ohio?",
    aHtml:
      "<p>No. Alerts are driven by weather data, which works for any US ZIP code. (We're building out full town coverage in Ohio first — the alerts work everywhere.)</p>",
  },
  {
    q: "How do I stop the alerts?",
    aHtml:
      "<p>Every alert email includes an unsubscribe link, and you can reply \"unsubscribe\" to any alert. One click, no retention tricks. See how we handle your data on the <a href=\"/privacy/\">privacy page</a>.</p>",
  },
];

export default function AlertsPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Mold Weather Alerts" }]}
      />

      <section className="block" aria-labelledby="alerts-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <p className="eyebrow">Free email alerts</p>
          <h1 id="alerts-h" style={{ marginBottom: 10 }}>
            Free Mold Weather Alerts
          </h1>
          <p style={{ maxWidth: 640, color: "var(--muted)", fontSize: 17 }}>
            Mold doesn&apos;t appear out of nowhere — it follows weather. Give
            us your email and ZIP and we&apos;ll tell you when conditions near
            you turn in mold&apos;s favor, so you can act while the drying
            window is still open.
          </p>

          <div
            style={{
              display: "grid",
              gap: 14,
              marginTop: 28,
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            }}
          >
            {ALERT_TYPES.map((t) => (
              <div
                key={t.title}
                style={{
                  border: "1px solid var(--line, #e5e5e5)",
                  borderRadius: 14,
                  padding: "20px 18px",
                  background: "var(--card, #fff)",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: "#0B2B26",
                    color: "#F59E0B",
                    marginBottom: 12,
                  }}
                >
                  <Icon name={t.icon} />
                </span>
                <h2 style={{ fontSize: 17, margin: "0 0 6px" }}>{t.title}</h2>
                <p style={{ fontSize: 14.5, color: "var(--muted)", margin: 0 }}>
                  {t.blurb}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block" aria-labelledby="signup-h">
        <div className="wrap" style={{ maxWidth: 640 }}>
          <h2 id="signup-h" style={{ fontSize: 24, marginBottom: 6 }}>
            Sign up — free, takes 20 seconds
          </h2>
          <p style={{ color: "var(--muted)", marginTop: 0 }}>
            One email, one ZIP, and pick which alerts you want. That&apos;s it.
          </p>
          <AlertSignup />
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 14 }}>
            Email only — no texts, no calls. We store your email and ZIP to
            send alerts and nothing else. Full details:{" "}
            <Link href="/privacy/">privacy policy</Link>.
          </p>
        </div>
      </section>

      <section className="block" aria-labelledby="alerts-faq-h">
        <div className="wrap" style={{ maxWidth: 760 }}>
          <h2 id="alerts-faq-h" style={{ fontSize: 24 }}>
            Alert questions, answered straight
          </h2>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      <CtaBand
        title="Mold risk doesn't wait. Neither should you."
        sub="Sign up for free weather alerts — or get a professional inspection today."
      />
    </>
  );
}
