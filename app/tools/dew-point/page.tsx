import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/icons";
import { DewPointInterpreter } from "@/components/DewPointInterpreter";

export const metadata: Metadata = {
  title: `Dew-Point Interpreter — When Will Condensation Start? | ${siteConfig.brandName}`,
  description:
    "Enter a temperature and humidity reading and see the dew point instantly: which surfaces will sweat, your EPA humidity band, and what to do about it.",
  alternates: { canonical: `${siteConfig.siteUrl}/tools/dew-point/` },
};

export default function DewPointPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Free Tools", href: "/tools/" },
          { name: "Dew-Point Interpreter" },
        ]}
      />

      <section className="block" aria-labelledby="dp-h">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <p className="eyebrow">Free tool</p>
          <h1 id="dp-h" style={{ marginBottom: 8 }}>
            Dew-Point Interpreter
          </h1>
          <p className="lede">
            Your hygrometer says 65%. So what? The dew point turns that
            number into something you can act on: the exact temperature at
            which your walls, windows, and pipes start sweating — and sweating
            surfaces are where mold moves in.
          </p>

          <div style={{ marginTop: 24 }}>
            <DewPointInterpreter />
          </div>

          <section aria-label="What is dew point" style={{ marginTop: 28 }}>
            <h2 style={{ fontSize: 24 }}>What is dew point?</h2>
            <p>
              Dew point is the temperature at which air can&apos;t hold its
              moisture anymore — the excess falls out as liquid water on any
              surface colder than that number. That&apos;s why a cold drink
              sweats on a warm day, and why your single-pane windows drip in
              January: the glass is below the dew point of your indoor air.
            </p>
            <p>
              For mold, this is the number that matters. Mold germinates on
              damp surfaces within 24–48 hours (EPA), and condensation is the
              damp surface you can&apos;t always see. The EPA&apos;s humidity
              guidance — keep indoor relative humidity{" "}
              <strong>below 60%, ideally 30–50%</strong> — is really a way of
              keeping the dew point low enough that your surfaces stay dry.
            </p>
          </section>

          <section aria-label="Track your readings" style={{ marginTop: 28 }}>
            <div
              style={{
                background: "var(--tint)",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius)",
                padding: 22,
              }}
            >
              <h2 style={{ fontSize: 22, marginTop: 0 }}>
                One reading is a snapshot — seven days is a story
              </h2>
              <p style={{ marginBottom: 14 }}>
                Dew point moves with the weather, your heating, and your
                cooking and showering habits. The 7-Day Humidity Log turns
                this tool into a week-long early-warning system: morning and
                evening readings in three rooms, with a worked example showing
                what trouble looks like.
              </p>
              <Link
                className="more"
                href="/tools/humidity-log/"
                style={{ color: "var(--accent, #F59E0B)" }}
              >
                Track readings for 7 days with the Humidity Log
                <Icon name="arrow" />
              </Link>
            </div>
          </section>
        </div>
      </section>

      <CtaBand
        title="Condensation you can see is condensation you can fix"
        sub="A free inspection maps exactly where the moisture is coming from — and what it will take to fix it for good."
      />
    </>
  );
}
