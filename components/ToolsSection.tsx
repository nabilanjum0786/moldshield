import Link from "next/link";
import { Icon } from "./icons";
import { CostEstimator } from "./CostEstimator";
import { MoldQuiz } from "./MoldQuiz";
import { CostBarChart } from "./infographics/CostBarChart";
import { HumidityGauge } from "./infographics/HumidityGauge";

/** Interactive tools section (§5) — estimator + quiz + cost/humidity visuals.
 *  Wrapped in the v3 "Before you panic, get oriented" editorial frame. */
export function ToolsSection() {
  return (
    <section className="block" id="tools" aria-labelledby="tools-h">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">A better first step</span>
            <h2 id="tools-h">
              Before you panic,
              <br />
              <em>get oriented.</em>
            </h2>
          </div>
          <p>
            Good decisions start with good information. Use these simple
            guides to understand what might be happening in your home.
          </p>
        </div>
        <div className="grid cols-2" style={{ marginTop: 8 }}>
          <CostEstimator />
          <MoldQuiz />
        </div>

        <h3 className="reveal" style={{ marginTop: 44 }}>
          What Remediation Costs by Location
        </h3>
        <div className="reveal">
          <CostBarChart />
        </div>

        <div
          className="grid cols-2 reveal"
          style={{ marginTop: 30, alignItems: "start" }}
        >
          <div>
            <h3>The 60% Rule: Humidity Is the Real Enemy</h3>
            <p>
              Mold doesn&apos;t need a flood — it needs sustained moisture. The
              EPA&apos;s guidance is simple: keep indoor relative humidity{" "}
              <strong>below 60%, ideally 30–50%</strong>. Above 60%, you&apos;re
              in the danger zone where mold germinates within 24–48 hours of a
              water event.
            </p>
            <p>
              <Link className="more" href="/services/mold-inspection-testing/">
                Suspect high humidity? Get it tested
                <Icon name="arrow" />
              </Link>
            </p>
          </div>
          <HumidityGauge />
        </div>
      </div>
    </section>
  );
}
