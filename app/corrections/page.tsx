import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd, speakableSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: `Correction Log | ${siteConfig.brandName}`,
  description: `How ${siteConfig.brandName} handles mistakes: when our reviewers change a page for accuracy, the change is logged here publicly with the date, what changed, and why.`,
  alternates: { canonical: `${siteConfig.siteUrl}/corrections/` },
};

// ─────────────────────────────────────────────────────────────
// CORRECTIONS — append-only. Each entry records a real accuracy
// change reviewed by a human editor. Do NOT invent entries.
// New corrections: document in docs/correction-process.md, then
// add an entry to this array.
// ─────────────────────────────────────────────────────────────
const CORRECTIONS: {
  date: string;
  page: string;
  pageHref: string;
  whatChanged: string;
  why: string;
  reviewer: string;
}[] = [];

export default function CorrectionsPage() {
  const url = `${siteConfig.siteUrl}/corrections/`;
  return (
    <>
      <JsonLd
        data={[speakableSchema({ url, cssSelectors: [".speakable"] })]}
      />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Correction Log" }]}
      />

      <section className="block" aria-labelledby="cl-h">
        <div className="wrap">
          <div className="richtext speakable" style={{ maxWidth: 780 }}>
            <h2 id="cl-h">Correction Log</h2>
            <p>
              We&apos;d rather admit a mistake than let it stand. Every page
              on {siteConfig.brandName} is reviewed by a human editor, and
              when a reviewer changes a page for accuracy — a wrong number,
              an outdated guideline, a misleading claim — the change is
              logged here publicly with the date, what changed, and why.
            </p>

            <h3>Our review standard</h3>
            <p>
              Every health, safety, and remediation claim on this site is
              checked against primary sources: U.S. EPA mold guidance
              (including the EPA&apos;s mold remediation guidelines) and CDC
              mold information. Secondary sources — news articles, forums,
              other blogs — are never treated as authorities. If a claim
              can&apos;t be traced to EPA, CDC, IICRC, or a comparable
              primary source, it doesn&apos;t ship.
            </p>

            <h3>Logged corrections</h3>
            {CORRECTIONS.length === 0 ? (
              <div className="card" style={{ marginTop: 16 }}>
                <p style={{ margin: 0 }}>
                  <strong>No corrections logged yet.</strong> When our
                  reviewers change a page for accuracy, it will appear here
                  with the date, what changed, and why. An empty log is the
                  honest state of this page — we won&apos;t pad it with
                  cosmetic edits.
                </p>
              </div>
            ) : (
              <ol>
                {CORRECTIONS.map((c) => (
                  <li key={`${c.date}-${c.page}`}>
                    <strong>{c.date}</strong> —{" "}
                    <a href={c.pageHref}>{c.page}</a>
                    <br />
                    What changed: {c.whatChanged}
                    <br />
                    Why: {c.why}
                    <br />
                    Reviewed by: {c.reviewer}
                  </li>
                ))}
              </ol>
            )}

            <h3>Spot something wrong?</h3>
            <p>
              If you see a claim that looks wrong or outdated, call{" "}
              <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a> and
              tell us. We&apos;ll check it against the sources above and log
              the correction here if we were wrong.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
