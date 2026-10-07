import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { LandlordLetterGenerator } from "@/components/LandlordLetterGenerator";

export const metadata: Metadata = {
  title: `Free Landlord Mold Complaint Letter Generator (Ohio) | ${siteConfig.brandName}`,
  description:
    "Generate a formal mold complaint letter to your landlord citing Ohio Revised Code §5321.04. Free, printable, ready in 2 minutes.",
  alternates: { canonical: `${siteConfig.siteUrl}/tools/landlord-letter/` },
};

export default function LandlordLetterPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Free Tools", href: "/tools/" },
          { name: "Landlord Letter Generator" },
        ]}
      />
      <section className="block" aria-labelledby="ll-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <p className="eyebrow">Free tool · For renters</p>
          <h1 id="ll-h" style={{ marginBottom: 8 }}>
            Landlord Mold Complaint Letter Generator
          </h1>
          <p
            className="speakable"
            style={{ maxWidth: 660, color: "var(--muted)", fontSize: 17 }}
          >
            Ohio landlords must keep rentals fit and habitable — including
            fixing mold from building defects and plumbing failures (Ohio
            Revised Code §5321.04). Put it in writing: a formal letter gets
            attention that phone calls don&apos;t.
          </p>
          <div style={{ marginTop: 24 }}>
            <LandlordLetterGenerator />
          </div>
        </div>
      </section>
      <CtaBand
        title="Landlord won't act? Document it, then call us."
        sub="A free inspection gives you a written professional assessment — the strongest evidence a tenant can have."
      />
    </>
  );
}
