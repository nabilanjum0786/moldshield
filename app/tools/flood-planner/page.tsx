import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { FloodPlanner } from "@/components/FloodPlanner";

export const metadata: Metadata = {
  title: `14-Day Flood Recovery Planner (Free) | ${siteConfig.brandName}`,
  description:
    "Free day-by-day flood recovery plan: what to do each day for 14 days after a water event, anchored on the EPA 24–48 hour mold rule. Printable.",
  alternates: { canonical: `${siteConfig.siteUrl}/tools/flood-planner/` },
};

export default function FloodPlannerPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Free Tools", href: "/tools/" },
          { name: "14-Day Flood Recovery Planner" },
        ]}
      />
      <section className="block" aria-labelledby="fp-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <p className="eyebrow">Free tool · Emergencies</p>
          <h1 id="fp-h" style={{ marginBottom: 8 }}>
            14-Day Flood Recovery Planner
          </h1>
          <p
            className="speakable"
            style={{ maxWidth: 660, color: "var(--muted)", fontSize: 17 }}
          >
            Water damage is a race against the 48-hour clock — EPA says mold
            can begin growing within 24–48 hours. Pick your event date and get
            a concrete action plan for every day.
          </p>
          <div style={{ marginTop: 24 }}>
            <FloodPlanner />
          </div>
        </div>
      </section>
      <CtaBand
        title="Past day 5 and still damp? Don't wait it out."
        sub="Drying problems compound daily. A free inspection tells you exactly where you stand."
      />
    </>
  );
}
