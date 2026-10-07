import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: `Terms of Service | ${siteConfig.brandName}`,
  description: `Terms of service for ${siteConfig.brandName}.`,
  alternates: { canonical: `${siteConfig.siteUrl}/terms/` },
};

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Terms of Service" }]}
      />
      <section className="block" aria-labelledby="tos-h">
        <div className="wrap">
          <div className="richtext" style={{ maxWidth: 780 }}>
            <h2 id="tos-h">Terms of Service</h2>
            <p>
              By using this website, you agree to these terms. {siteConfig.brandName}{" "}
              provides mold inspection and remediation services; all work is
              performed under a written scope and fixed quote agreed before
              work begins.
            </p>
            <h3>Estimates</h3>
            <p>
              The cost estimator on this site provides approximate ranges
              based on published 2026 national data. It is not a quote. Your
              free inspection produces the exact written quote.
            </p>
            <h3>Health information</h3>
            <p>
              Content on this site is educational and cites its sources (EPA,
              CDC, and others). It is not medical advice — consult a qualified
              professional for diagnosis or treatment.
            </p>
            <h3>Contact</h3>
            <p>
              Questions about these terms? Call{" "}
              <a href={siteConfig.phoneHref}>{siteConfig.phoneDisplay}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
