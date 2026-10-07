import { Carousel } from "./Carousel";

/**
 * Before/after gallery (§18b) — HONESTY-LABELED placeholder frames.
 * Photos will be real photos of mold remediation work done BY SOMEONE ELSE.
 * We NEVER claim them as our own work. Mandatory caption template:
 * "Example of professional mold remediation — illustrative photo, not our work."
 * Only photos we hold rights to (licensed stock or CC, with attribution).
 */
const SLOTS = [
  {
    label: "Placeholder for before/after photo pair 1",
    text: ["PHOTO SLOT 1", "Drop licensed/CC before/after pair here", "(attic remediation example)"],
  },
  {
    label: "Placeholder for before/after photo pair 2",
    text: ["PHOTO SLOT 2", "Drop licensed/CC before/after pair here", "(basement remediation example)"],
  },
  {
    label: "Placeholder for before/after photo pair 3",
    text: ["PHOTO SLOT 3", "Drop licensed/CC before/after pair here", "(crawl space remediation example)"],
  },
];

export function BeforeAfter() {
  return (
    <section className="block" aria-labelledby="ba-h">
      <div className="wrap">
        <span className="eyebrow reveal">What Remediation Looks Like</span>
        <h2 id="ba-h" className="reveal">
          Before &amp; After: Real Remediation Work
        </h2>
        <p className="lede reveal">
          Illustrative examples of professional mold remediation. These photos
          show work done by others and are <strong>not our jobs</strong> —
          they&apos;re here so you know what proper remediation looks like.
        </p>
        <Carousel label="Before and after gallery" className="ba-slider">
          {SLOTS.map((s) => (
            <figure key={s.label} className="ba-slide" style={{ margin: 0 }}>
              <div className="ba-frame" role="img" aria-label={s.label}>
                {s.text[0]}
                <br />
                {s.text[1]}
                <br />
                {s.text[2]}
              </div>
              <figcaption className="ba-cap">
                <strong>
                  Example of professional mold remediation — illustrative
                  photo, not our work.
                </strong>
                <br />
                <span className="src-note">
                  Source/license: [add attribution when photo is placed]
                </span>
              </figcaption>
            </figure>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
