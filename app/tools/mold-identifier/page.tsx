import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { VisualIdentifier } from "@/components/VisualIdentifier";

export const metadata: Metadata = {
  title: `What Does Black Mold Look Like? Free Visual Identifier | ${siteConfig.brandName}`,
  description:
    "Free guided tool: describe what you're seeing and find out what it's most consistent with — black mold, mildew, efflorescence, soot, or wood rot.",
  alternates: { canonical: `${siteConfig.siteUrl}/tools/mold-identifier/` },
};

export default function MoldIdentifierPage() {
  return (
    <>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Free Tools", href: "/tools/" },
          { name: "Visual Mold Identifier" },
        ]}
      />
      <section className="block" aria-labelledby="vi-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <p className="eyebrow">Free tool · Identify</p>
          <h1 id="vi-h" style={{ marginBottom: 8 }}>
            What Am I Looking At?
          </h1>
          <p
            className="speakable"
            style={{ maxWidth: 660, color: "var(--muted)", fontSize: 17 }}
          >
            Not everything dark and fuzzy is black mold — it could be mildew,
            mineral deposits, or soot. Answer five questions and we&apos;ll
            narrow it down honestly.
          </p>
          <div style={{ marginTop: 24 }}>
            <VisualIdentifier />
          </div>
        </div>
      </section>
      <CtaBand
        title="Still not sure? That's what inspections are for."
        sub="Certified testing is the only way to confirm mold type — and the inspection is free."
      />
    </>
  );
}
