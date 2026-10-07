
export type Stat = { value: string; label: string; source: string };

/** Homepage trust/stats strip (§3) — animated counters via ScrollEffects. */
export function TrustStrip() {
  const stats: Stat[] = [
    {
      value: "24–48 hrs",
      label: "for mold to start growing after water damage",
      source: "Source: EPA guidance",
    },
    {
      value: "30–50%",
      label: "ideal indoor humidity — above 60% is the danger zone",
      source: "Source: EPA guidance",
    },
    {
      value: "47–50%",
      label: "of US homes have some mold or dampness problem",
      source: "Source: KFF Health News / Harvard T.H. Chan; NIH meta-analysis",
    },
    {
      value: "$2,368",
      label: "average US mold remediation cost",
      source: "Source: HomeAdvisor, 2026",
    },
  ];
  return (
    <section className="trust-strip block" aria-label="Key mold facts">
      <div className="wrap">
        <div className="stat-row">
          {stats.map((s, i) => (
            <div
              key={s.value}
              className="stat reveal"
              {...(i > 0 ? { "data-delay": String(i) } : {})}
            >
              <div className="num" data-final={s.value}>
                {s.value}
              </div>
              <div className="lbl">{s.label}</div>
              <div className="src">{s.source}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Data-driven stat strip for hub pages (city/state facts). */
export function DataStatStrip({
  stats,
  ariaLabel,
}: {
  stats: Stat[];
  ariaLabel: string;
}) {
  return (
    <section className="trust-strip block" aria-label={ariaLabel}>
      <div className="wrap">
        <div className="stat-row">
          {stats.map((s) => (
            <div key={s.label} className="stat reveal">
              <div className="num" data-final={s.value}>
                {s.value}
              </div>
              <div className="lbl">{s.label}</div>
              <div className="src">{s.source}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Impact stat cards (§9) — sourced national figures, no animation needed. */
export function StatCards() {
  const cards = [
    {
      big: "47–50%",
      text: "of US residential buildings have some mold or dampness problem",
      src: "KFF Health News (quoting Harvard T.H. Chan); corroborated by NIH meta-analysis",
    },
    {
      big: "+50%",
      text: "higher risk of asthma and breathing problems in damp, moldy indoor spaces",
      src: "EPA (reported via The Conversation)",
    },
    {
      big: "$2,368",
      text: "average US mold remediation job; most jobs $10–$25 per sq ft",
      src: "HomeAdvisor, 2026",
    },
    {
      big: "$5.6B/yr",
      text: "mold-related infections cost the US yearly; asthma adds ~$16.8B",
      src: "Reported via industry analysis citing Journal of Environmental and Public Health + CDC — secondary source",
    },
  ];
  return (
    <section className="block alt" aria-labelledby="impact-h">
      <div className="wrap">
        <span className="eyebrow reveal">The National Picture</span>
        <h2 id="impact-h" className="reveal">
          Mold in America, by the Numbers
        </h2>
        <p className="lede reveal">
          Every figure below is cited to its source. If we can&apos;t source
          it, we don&apos;t print it.
        </p>
        <div className="grid cols-4" style={{ marginTop: 28 }}>
          {cards.map((c, i) => (
            <div
              key={c.big}
              className="card impact-card reveal"
              {...(i > 0 ? { "data-delay": String(i) } : {})}
            >
              <div className="big">{c.big}</div>
              <p>{c.text}</p>
              <p className="src-note">{c.src}</p>
            </div>
          ))}
        </div>
        <div
          className="card reveal"
          style={{
            marginTop: 20,
            background: "#fffbe9",
            borderColor: "#f0d48a",
            borderLeft: "5px solid var(--amber)",
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>A note on the big numbers:</strong> the CDC&apos;s
            often-quoted ~$19B/year figure covers <em>all fungal infections</em>{" "}
            — not mold specifically. We label it exactly that way, because
            &ldquo;the mold cost&rdquo; would be dishonest.{" "}
            <span className="src-note">
              Source: CDC fungal-disease burden estimates.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
