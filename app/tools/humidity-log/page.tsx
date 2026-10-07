import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { PrintButton } from "@/components/PrintButton";

export const metadata: Metadata = {
  title: `7-Day Humidity Log — Free Printable Tracker | ${siteConfig.brandName}`,
  description:
    "Free printable 7-day humidity log: track morning and evening readings in 3 rooms with a $10 hygrometer, and learn what the numbers mean for mold risk (EPA: keep indoor humidity below 60%, ideally 30–50%).",
  alternates: { canonical: `${siteConfig.siteUrl}/tools/humidity-log/` },
};

const DAYS = [
  "Day 1",
  "Day 2",
  "Day 3",
  "Day 4",
  "Day 5",
  "Day 6",
  "Day 7",
];

// Worked example row (clearly labeled EXAMPLE — realistic pattern: bathroom
// and basement running above the 60% EPA threshold).
const EXAMPLE = ["48%", "52%", "61%", "68%", "66%", "71%"];

const cell: React.CSSProperties = {
  border: "1px solid var(--line)",
  padding: "10px 8px",
  textAlign: "center",
  fontSize: 15,
  minWidth: 64,
  height: 44,
};

const headCell: React.CSSProperties = {
  ...cell,
  background: "var(--teal-950)",
  color: "#fff",
  fontWeight: 700,
  fontSize: 13,
};

export default function HumidityLogPage() {
  return (
    <>
      <div className="no-print">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Free Tools", href: "/tools/" },
            { name: "7-Day Humidity Log" },
          ]}
        />
      </div>

      <section className="block" aria-labelledby="log-h">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <p className="print-box" style={{ fontSize: 13, color: "#5c6f68" }}>
            {siteConfig.brandName} · Free homeowner tool · Print and log for 7
            days
          </p>
          <p className="eyebrow">Free tool · Printable</p>
          <h1 id="log-h" style={{ marginBottom: 8 }}>
            7-Day Humidity Log
          </h1>
          <p className="lede">
            Mold needs moisture — and your home&apos;s humidity tells you
            where it&apos;s hiding before you can see it. The EPA says keep
            indoor relative humidity <strong>below 60%, ideally 30–50%</strong>.
            This log turns a $10 gadget into an early-warning system.
          </p>
          <div style={{ marginTop: 20 }}>
            <PrintButton />
          </div>

          <div
            className="no-print"
            style={{
              background: "var(--tint)",
              border: "1px solid var(--line)",
              borderRadius: "var(--radius)",
              padding: 22,
              marginTop: 28,
            }}
          >
            <h2 style={{ fontSize: 22 }}>How to use this log</h2>
            <ol style={{ margin: "10px 0 0", paddingLeft: 22 }}>
              <li>
                Buy an inexpensive digital hygrometer — about $10 at any
                hardware store. No app or batteries beyond AAAs needed.
              </li>
              <li>
                Place it at breathing height, away from showers, stoves, and
                direct sun. Move it room to room, or buy two and rotate.
              </li>
              <li>
                Log readings <strong>morning and evening</strong> for 7 days
                in the 3 rooms you worry about most — bedroom, bathroom, and
                basement or crawl space are the usual suspects.
              </li>
            </ol>
          </div>

          <div className="print-checklist" style={{ marginTop: 28 }}>
            <section aria-label="Room names">
              <p style={{ fontWeight: 700, margin: "0 0 8px" }}>
                My 3 rooms:{" "}
                <span style={{ fontWeight: 400 }}>
                  Room 1:{" "}
                  <span
                    style={{
                      display: "inline-block",
                      borderBottom: "1px solid var(--faint)",
                      minWidth: 130,
                    }}
                  >
                    &nbsp;
                  </span>{" "}
                  · Room 2:{" "}
                  <span
                    style={{
                      display: "inline-block",
                      borderBottom: "1px solid var(--faint)",
                      minWidth: 130,
                    }}
                  >
                    &nbsp;
                  </span>{" "}
                  · Room 3:{" "}
                  <span
                    style={{
                      display: "inline-block",
                      borderBottom: "1px solid var(--faint)",
                      minWidth: 130,
                    }}
                  >
                    &nbsp;
                  </span>
                </span>
              </p>
            </section>

            <section aria-label="7-day log table" style={{ marginTop: 12 }}>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    borderCollapse: "collapse",
                    width: "100%",
                    background: "#fff",
                  }}
                >
                  <thead>
                    <tr>
                      <th style={headCell}>Day</th>
                      <th style={headCell}>
                        Room 1
                        <br />
                        AM
                      </th>
                      <th style={headCell}>
                        Room 1
                        <br />
                        PM
                      </th>
                      <th style={headCell}>
                        Room 2
                        <br />
                        AM
                      </th>
                      <th style={headCell}>
                        Room 2
                        <br />
                        PM
                      </th>
                      <th style={headCell}>
                        Room 3
                        <br />
                        AM
                      </th>
                      <th style={headCell}>
                        Room 3
                        <br />
                        PM
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {DAYS.map((day, i) => (
                      <tr key={day}>
                        <td
                          style={{
                            ...cell,
                            fontWeight: 700,
                            background:
                              i === 0 ? "#fffbe9" : "transparent",
                          }}
                        >
                          {day}
                          {i === 0 && (
                            <span
                              style={{
                                display: "block",
                                fontSize: 11,
                                fontWeight: 700,
                                color: "var(--amber-dark)",
                                letterSpacing: 1,
                              }}
                            >
                              EXAMPLE
                            </span>
                          )}
                        </td>
                        {EXAMPLE.map((v, j) => (
                          <td
                            key={j}
                            style={{
                              ...cell,
                              background:
                                i === 0 ? "#fffbe9" : "transparent",
                              color:
                                i === 0 && parseInt(v) >= 60
                                  ? "var(--danger)"
                                  : "inherit",
                              fontWeight: i === 0 ? 700 : 400,
                            }}
                          >
                            {i === 0 ? v : ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--muted)",
                  marginTop: 8,
                }}
              >
                Example row shows a realistic pattern: bedroom fine, bathroom
                and basement running above 60% — that&apos;s your signal to act
                (see below). Write your own readings in % RH.
              </p>
            </section>

            <section
              aria-label="What the numbers mean"
              style={{ marginTop: 24 }}
            >
              <h2 style={{ fontSize: 24 }}>What the numbers mean</h2>
              <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
                <p
                  style={{
                    margin: 0,
                    border: "1px solid #bfe6d9",
                    borderLeft: "5px solid var(--brand)",
                    borderRadius: 10,
                    padding: "12px 14px",
                    background: "#eef7f4",
                  }}
                >
                  <strong>30–50% — the safe zone.</strong> This is where the
                  EPA wants your home. Mold struggles to grow here.
                </p>
                <p
                  style={{
                    margin: 0,
                    border: "1px solid #f0d48a",
                    borderLeft: "5px solid var(--amber)",
                    borderRadius: 10,
                    padding: "12px 14px",
                    background: "#fffbe9",
                  }}
                >
                  <strong>50–60% — the watch zone.</strong> Not dangerous yet,
                  but trending wrong. Ventilate more — run bathroom and kitchen
                  exhaust fans every time you cook or shower.
                </p>
                <p
                  style={{
                    margin: 0,
                    border: "1px solid #f3c2c2",
                    borderLeft: "5px solid var(--danger)",
                    borderRadius: 10,
                    padding: "12px 14px",
                    background: "#fdf2f2",
                  }}
                >
                  <strong>Above 60% — the mold-risk zone.</strong> Sustained
                  readings here mean mold can germinate. Run a dehumidifier,
                  check for leaks, and dry any wet materials within 24–48
                  hours (EPA).
                </p>
                <p
                  style={{
                    margin: 0,
                    border: "1px solid var(--line)",
                    borderRadius: 10,
                    padding: "12px 14px",
                    background: "var(--white)",
                  }}
                >
                  <strong>Below 30% — too dry.</strong> Uncomfortable and hard
                  on woodwork and sinuses. A small humidifier fixes it — but
                  don&apos;t overshoot into the watch zone.
                </p>
              </div>
            </section>

            <section
              aria-label="If readings stay above 60 percent"
              style={{ marginTop: 24 }}
            >
              <h2 style={{ fontSize: 24 }}>
                If your readings stay above 60%, do this
              </h2>
              <ol style={{ margin: "10px 0 0", paddingLeft: 22 }}>
                <li>
                  <strong>Ventilate:</strong> run exhaust fans in bathrooms
                  and kitchen — the cheapest dehumidifier you own.
                </li>
                <li>
                  <strong>Dehumidify:</strong> a portable dehumidifier in the
                  basement or problem room, emptied regularly.
                </li>
                <li>
                  <strong>Hunt the source:</strong> check under sinks, around
                  toilets, behind the washing machine, and along foundation
                  walls for leaks or damp spots.
                </li>
                <li>
                  <strong>Trust your nose:</strong> if you can smell mustiness
                  but can&apos;t see mold, it&apos;s behind something — that
                  warrants a professional inspection, not guesswork.
                </li>
              </ol>
              <p
                style={{
                  fontSize: 13,
                  color: "var(--muted)",
                  marginTop: 12,
                }}
              >
                Humidity guidance: U.S. EPA — keep indoor relative humidity
                below 60%, ideally 30–50%; dry wet materials within 24–48
                hours. Health effects of mold vary by person (CDC, 2006).
              </p>
            </section>
          </div>
        </div>
      </section>

      <div className="no-print">
        <CtaBand
          title="Numbers telling a story you don't like?"
          sub="A free inspection maps exactly where the moisture is coming from — and what it will take to fix it for good."
        />
      </div>
    </>
  );
}
