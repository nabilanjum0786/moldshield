import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: `Mold Risk Score Methodology — How We Calculate It | ${siteConfig.brandName}`,
  description:
    "Full transparency: the exact formula, weights, data sources, and limitations behind the Mold Risk Score (0–100). What the score is — and what it is not.",
  alternates: { canonical: `${siteConfig.siteUrl}/methodology/` },
};

const TEAL = "#0F3D3E";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="tool reveal" style={{ marginTop: 24 }}>
      <h2 style={{ fontSize: 22, marginBottom: 12 }}>{title}</h2>
      {children}
    </section>
  );
}

function SourceRow({ name, url, status, use }: { name: string; url: string; status: string; use: string }) {
  return (
    <div style={{ borderBottom: "1px solid var(--line, #e5e5e5)", padding: "12px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <strong>
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: TEAL }}>
            {name}
          </a>
        </strong>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: status.startsWith("Live") ? "#1e7a4f" : "#8a6d1a",
          }}
        >
          {status}
        </span>
      </div>
      <p style={{ fontSize: 14, color: "#555", margin: "6px 0 0" }}>{use}</p>
    </div>
  );
}

export default function MethodologyPage() {
  return (
    <div className="wrap">
      <div style={{ padding: "28px 0 0" }}>
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Mold Risk Score Methodology" },
          ]}
        />
      </div>

      <div className="tool reveal">
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>
          Mold Risk Score: the full methodology
        </h1>
        <p className="micro">
          Every number we show, where it comes from, and what the score cannot
          tell you. Updated 2026-10-06.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.7 }}>
          The Mold Risk Score is a 0–100 snapshot of how favorable local
          conditions are for mold growth. It is computed from real public
          datasets — never from estimates, never from invented numbers. When a
          dataset is unavailable, its driver is marked{" "}
          <strong>pending</strong>, the remaining drivers absorb its weight,
          and the score is labeled <strong>partial data</strong>. We would
          rather show a weaker honest score than a stronger fake one.
        </p>
      </div>

      <Section id="formula" title="1. The formula">
        <p style={{ fontSize: 15, lineHeight: 1.7 }}>
          Each of the five drivers is converted to a 0–100 subscore using the
          piecewise mappings below. The final score is the weighted sum:
        </p>
        <div
          style={{
            background: "#0B2B26",
            color: "#fff",
            borderRadius: 10,
            padding: "14px 18px",
            fontFamily: "ui-monospace, monospace",
            fontSize: 15,
            overflowX: "auto",
            margin: "12px 0",
          }}
        >
          score = Σ ( subscore<sub>i</sub> × weight<sub>i</sub> )
        </div>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 14,
            marginTop: 8,
          }}
        >
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "2px solid #0B2B26" }}>
              <th style={{ padding: "8px 6px" }}>Driver</th>
              <th style={{ padding: "8px 6px" }}>Weight</th>
              <th style={{ padding: "8px 6px" }}>Why this weight</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px 6px" }}><strong>Current humidity</strong></td>
              <td style={{ padding: "8px 6px" }}>35%</td>
              <td style={{ padding: "8px 6px" }}>The most direct, most actionable, and freshest signal.</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px 6px" }}><strong>7-day humidity outlook</strong></td>
              <td style={{ padding: "8px 6px" }}>20%</td>
              <td style={{ padding: "8px 6px" }}>Sustained dampness is when mold gets its foothold (EPA: sustained RH above 60% is the risk line).</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px 6px" }}><strong>Annual rainfall</strong></td>
              <td style={{ padding: "8px 6px" }}>20%</td>
              <td style={{ padding: "8px 6px" }}>Long-term moisture load for the area.</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px 6px" }}><strong>Flood risk</strong></td>
              <td style={{ padding: "8px 6px" }}>15%</td>
              <td style={{ padding: "8px 6px" }}>Conditional — it only matters when flooding actually happens — so it weighs less than the ever-present humidity drivers.</td>
            </tr>
            <tr>
              <td style={{ padding: "8px 6px" }}><strong>Older housing stock</strong></td>
              <td style={{ padding: "8px 6px" }}>10%</td>
              <td style={{ padding: "8px 6px" }}>The weakest and least direct signal; older envelopes leak more, but housing age alone predicts little.</td>
            </tr>
          </tbody>
        </table>
        <p style={{ fontSize: 14, color: "#555", marginTop: 10 }}>
          When a driver is pending, its weight is redistributed across the
          live drivers in proportion to their nominal weights. The partial-data
          notice is always shown in that case.
        </p>
      </Section>

      <Section id="subscores" title="2. Driver subscore mappings">
        <p style={{ fontSize: 15, lineHeight: 1.7 }}>
          Mappings are deliberately coarse — whole bands, not fake precision.
          Each reflects the same EPA-anchored intuition used across our site:
          below ~50% relative humidity is comfortable, 50–60% is watchful, and
          above 60% is the mold-risk zone (EPA guidance: keep indoor RH below
          60%, ideally 30–50%).
        </p>
        <ul style={{ fontSize: 14, lineHeight: 1.9, paddingLeft: 20 }}>
          <li><strong>Current humidity:</strong> ≤30% → 5 · 31–40% → 15 · 41–50% → 30 · 51–60% → 55 · 61–70% → 75 · &gt;70% → 90. Dew point ≥65°F adds 5, ≥70°F adds 10 (capped at 100).</li>
          <li><strong>7-day outlook</strong> (days above 60% RH): 0 → 10 · 1–2 → 40 · 3–4 → 65 · 5–6 → 85 · 7 → 95.</li>
          <li><strong>Annual rainfall:</strong> &lt;25 in → 15 · 25–35 → 35 · 35–45 → 55 · 45–55 → 75 · &gt;55 → 90.</li>
          <li><strong>Flood risk</strong> (FEMA NRI percentile): &lt;25th → 15 · 25–50th → 40 · 50–75th → 65 · 75–90th → 85 · &gt;90th → 95.</li>
          <li><strong>Older housing stock</strong> (% pre-1980): &lt;30% → 20 · 30–50% → 40 · 50–65% → 60 · 65–80% → 75 · &gt;80% → 90.</li>
        </ul>
      </Section>

      <Section id="bands" title="3. Score bands (editorial)">
        <p style={{ fontSize: 15, lineHeight: 1.7 }}>
          We group the 0–100 score into four bands for readability:{" "}
          <strong>0–30 Low</strong>, <strong>31–60 Moderate</strong>,{" "}
          <strong>61–80 High</strong>, <strong>81–100 Very High</strong>.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.7 }}>
          These bands are <strong>editorial, not scientific thresholds</strong>.
          No public-health body publishes a 0–100 mold-risk scale; we chose
          round, memorable cutoffs so the number is interpretable at a glance.
          A score of 59 vs. 61 is not a meaningful difference — both mean
          roughly the same thing.
        </p>
      </Section>

      <Section id="sources" title="4. Data sources">
        <SourceRow
          name="Open-Meteo Forecast API"
          url="https://open-meteo.com/en/docs"
          status="Live — verified 2026-10-06"
          use="Current relative humidity (hourly) and the 7-day daily-max RH outlook. No API key required. Free tier: 10,000 calls/day."
        />
        <SourceRow
          name="NOAA Access Data Service"
          url="https://www.ncei.noaa.gov/access/services/data/v1"
          status="Live — verified 2026-10-06"
          use="Annual rainfall from the Global Summary of the Month dataset, nearest airport station (e.g. Dayton Intl USW00003812). No token required."
        />
        <SourceRow
          name="FEMA National Risk Index"
          url="https://hazards.fema.gov/nri/"
          status="Pending — unreachable 2026-10-06"
          use="Planned: flood-risk percentile per county. When checked, the endpoint returned empty replies from our environment, so the driver stays pending rather than showing unverified numbers."
        />
        <SourceRow
          name="US Census Bureau API (ACS 5-year)"
          url="https://www.census.gov/data/developers/data-sets.html"
          status="Pending — key required"
          use="Planned: % of housing units built before 1980 (table B25034). The API now requires a free key, which we have not set up yet. Fields stay null until then."
        />
        <p style={{ fontSize: 14, color: "#555", marginTop: 12 }}>
          Refresh cadence: humidity data is refetched monthly; rainfall normals
          and housing-age figures are stable and fetched once (housing annually
          with each new ACS release). Every score display carries its{" "}
          <strong>data-as-of</strong> date.
        </p>
      </Section>

      <Section id="limitations" title="5. Limitations">
        <ul style={{ fontSize: 15, lineHeight: 1.9, paddingLeft: 20 }}>
          <li><strong>Outdoor weather ≠ indoor conditions.</strong> The score uses outdoor humidity and rainfall; your home's actual risk depends on ventilation, HVAC, plumbing, and building envelope. Indoor RH can differ dramatically from outdoor RH.</li>
          <li><strong>Partial scores are weaker.</strong> With flood and housing-age drivers pending, today's score leans entirely on weather. It will sharpen as drivers come online — the partial-data notice says so explicitly.</li>
          <li><strong>Weather is a snapshot.</strong> A dry week does not mean a dry year, and one wet week does not mean you have mold. The score describes conditions, not outcomes.</li>
          <li><strong>Geography is coarse.</strong> Scores are computed per city/metro from the nearest weather station and apply broadly to the area — microclimates and individual homes vary.</li>
          <li><strong>Bands are editorial.</strong> See §3 — the cutoffs are our choice for readability, not a scientific standard.</li>
        </ul>
      </Section>

      <Section id="not" title="6. What this score is NOT">
        <ul style={{ fontSize: 15, lineHeight: 1.9, paddingLeft: 20 }}>
          <li><strong>Not a professional assessment.</strong> It is not an inspection, not a test result, and not a substitute for a certified mold inspector or industrial hygienist.</li>
          <li><strong>Not a health claim.</strong> The score says nothing about whether anyone will get sick. Health questions belong to your doctor and, for indoor air, a qualified assessor.</li>
          <li><strong>Not a prediction.</strong> A high score does not mean you have mold; a low score does not mean you cannot. It describes how favorable conditions are — nothing more.</li>
          <li><strong>Not financial or insurance advice.</strong> Do not use the score to price a home, file a claim, or negotiate anything.</li>
        </ul>
        <p style={{ fontSize: 15, lineHeight: 1.7 }}>
          If you suspect mold in your home, the honest next step is a{" "}
          <Link href="/services/mold-inspection-testing/" style={{ color: TEAL, fontWeight: 600 }}>
            professional mold inspection
          </Link>{" "}
          — or, for urgent situations, our{" "}
          <Link href="/tools/" style={{ color: TEAL, fontWeight: 600 }}>
            free triage tool
          </Link>{" "}
          can help you judge how quickly to act.
        </p>
      </Section>

      <Section id="changelog" title="7. Change log">
        <ul style={{ fontSize: 14, lineHeight: 1.9, paddingLeft: 20 }}>
          <li><strong>2026-10-06</strong> — Score launched. Live drivers: Open-Meteo humidity + 7-day outlook, NOAA annual rainfall. Pending: FEMA flood risk (endpoint unreachable from our environment), Census housing age (API key not yet set up).</li>
        </ul>
      </Section>

      <div style={{ marginTop: 24 }}>
        <CtaBand
          title="The score is a starting point. An inspection is the answer."
          sub="Free inspection, transparent pricing, photo-documented work — when you're ready for the human part."
        />
      </div>
    </div>
  );
}
