import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { InsuranceChecker } from "@/components/InsuranceChecker";

export const metadata: Metadata = {
  title: `Will Insurance Cover Mold Remediation? Free Checker | ${siteConfig.brandName}`,
  description:
    "Free 3-question checker: find out if your homeowners insurance likely covers mold remediation — burst pipes, storms, floods, and slow leaks explained honestly.",
  alternates: { canonical: `${siteConfig.siteUrl}/tools/insurance-checker/` },
};

export default function InsuranceCheckerPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Free Tools", href: "/tools/" },
          { name: "Insurance Coverage Checker" },
        ]}
      />
      <section className="block" aria-labelledby="ic-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <p className="eyebrow">Free tool · Claims</p>
          <h1 id="ic-h" style={{ marginBottom: 8 }}>
            Will Insurance Cover My Mold?
          </h1>
          <p
            className="speakable"
            style={{ maxWidth: 660, color: "var(--muted)", fontSize: 17 }}
          >
            The short version: sudden disasters are usually covered, slow
            leaks usually aren&apos;t, and floods need separate insurance.
            Answer three questions for an honest read on your situation.
          </p>
          <div style={{ marginTop: 24 }}>
            <InsuranceChecker />
          </div>
        </div>
      </section>
      <CtaBand
        title="Filing a claim? Get it documented first."
        sub="Insurers pay documented claims. A professional inspection with moisture mapping is the paperwork that wins."
      />
    </>
  );
}
