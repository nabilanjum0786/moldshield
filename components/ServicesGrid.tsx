import Link from "next/link";
import { services } from "@/lib/site-config";
import { Icon } from "./icons";
import { HouseDiagram } from "./infographics/HouseDiagram";

// Card copy ported from the homepage template (§4). Kept as data so the
// grid renders from the services registry + this copy table.
const CARD_COPY: Record<string, { text: string; linkLabel: string; icon: "shield" | "clock" }> = {
  "attic-mold-removal": {
    text: "Roof leaks and poor ventilation make attics mold's favorite hideout. We treat sheathing and joists without tearing your roof apart.",
    linkLabel: "Attic mold removal",
    icon: "shield",
  },
  "crawl-space-mold-remediation": {
    text: "Damp soil, standing water, no airflow — crawl spaces grow mold silently for years. Encapsulation options available.",
    linkLabel: "Crawl space remediation",
    icon: "shield",
  },
  "basement-mold-removal": {
    text: "Seepage, flooding, and condensation feed basement mold. We remediate and address the water entry point.",
    linkLabel: "Basement mold removal",
    icon: "shield",
  },
  "black-mold-removal": {
    text: "Stachybotrys chartarum needs strict containment and careful handling. Health effects vary by person — we treat every case seriously.",
    linkLabel: "Black mold removal",
    icon: "shield",
  },
  "mold-inspection-testing": {
    text: "Not sure it's mold? Air and surface testing with lab analysis gives you a definitive answer — and a remediation plan.",
    linkLabel: "Inspection & testing",
    icon: "clock",
  },
};

/** Services grid (§4) — 5 pillar cards + house-diagram infographic. */
export function ServicesGrid() {
  return (
    <section className="block" aria-labelledby="services-h">
      <div className="wrap">
        <span className="eyebrow reveal">Our Services</span>
        <h2 id="services-h" className="reveal">
          Five Specialties. One Honest Process.
        </h2>
        <p className="lede reveal">
          Every job follows the same protocol: containment, removal, treatment,
          moisture fix, verification. Pick your problem area:
        </p>
        <div className="grid cols-3" style={{ marginTop: 28 }}>
          {services.map((s, i) => {
            const copy = CARD_COPY[s.slug];
            return (
              <div
                key={s.slug}
                className="card reveal"
                {...(i % 3 > 0 ? { "data-delay": String(i % 3) } : {})}
              >
                <div className="card-ic">
                  <Icon name={copy.icon} />
                </div>
                <h3>{s.name}</h3>
                <p>{copy.text}</p>
                <Link className="more" href={`/services/${s.slug}/`}>
                  {copy.linkLabel}
                  <Icon name="arrow" />
                </Link>
              </div>
            );
          })}
          <div
            className="card reveal"
            data-delay="2"
            style={{
              background: "linear-gradient(135deg,#0b2b26,#123f36)",
              color: "#eaf5f1",
              borderColor: "#123f36",
            }}
          >
            <h3 style={{ color: "#fff" }}>Not sure where to start?</h3>
            <p style={{ color: "#cfe3db" }}>
              Take the 60-second quiz below or book a free inspection —
              we&apos;ll find it.
            </p>
            <a className="more" href="#quiz" style={{ color: "var(--amber-soft)" }}>
              Take the quiz
              <Icon name="arrow" />
            </a>
          </div>
        </div>

        <h3 className="reveal" style={{ marginTop: 44 }}>
          Where Mold Hides in Your Home
        </h3>
        <p className="lede reveal">
          Six hotspots cause the vast majority of residential mold calls. Click
          any hotspot to jump to the right service:
        </p>
        <div className="reveal">
          <HouseDiagram />
        </div>
      </div>
    </section>
  );
}
