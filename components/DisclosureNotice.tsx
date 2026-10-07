// ─────────────────────────────────────────────────────────────
// DisclosureNotice — reusable conflict-of-interest disclosure.
// variant="short": one-liner for tool pages.
// variant="full":  paragraph for about/methodology pages.
//
// HONESTY RULE: only describe revenue streams that exist or are
// explicitly planned in lib/site-config.ts / the project plan.
// - Lead Smart pay-per-call: PLANNED (signup deferred; phone number
//   is a placeholder until approved) — NOT yet active.
// - Affiliate links (e.g. hygrometers): PLANNED — not active yet.
// No invented revenue streams, ever.
// ─────────────────────────────────────────────────────────────
import { siteConfig } from "@/lib/site-config";

export function DisclosureNotice({
  variant = "short",
}: {
  variant?: "short" | "full";
}) {
  if (variant === "full") {
    return (
      <section className="block" aria-labelledby="money-h">
        <div className="wrap">
          <span className="eyebrow reveal">Transparency</span>
          <h2 id="money-h" className="reveal">
            How We Make Money
          </h2>
          <div className="card reveal" style={{ maxWidth: 780 }}>
            <p>
              {siteConfig.brandName} is a lead-generation website: we publish
              free mold guidance, and we earn money when visitors call the
              phone number on our pages. Our call partner pays us for
              qualifying calls (pay-per-call).
            </p>
            <p>
              <strong>Not yet active:</strong> call-partner integration is
              still pending — the phone number currently shown is a
              placeholder until our pay-per-call partner signup is complete.
              Affiliate links for products such as hygrometers are planned,
              but not active yet.
            </p>
            <p>
              This doesn&apos;t change our advice. Every health and
              remediation claim on this site is checked against EPA and CDC
              sources, we recommend the smallest fix that will actually work,
              and when we get something wrong we log it publicly in our{" "}
              <a href="/corrections/">correction log</a>.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <p className="disclaimer">
      How we make money: this is a lead-generation site — if you call the
      number on this page, we may earn a fee from our call partner (call
      integration not yet active; affiliate links planned, not active). Our
      advice stays independent: every claim is checked against EPA/CDC
      sources.
    </p>
  );
}
