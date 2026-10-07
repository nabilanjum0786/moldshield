import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ChecklistGate } from "@/components/ChecklistGate";
import { CtaBand } from "@/components/CtaBand";
import { CHECKLIST_ITEM_COUNT } from "@/components/checklist-data";

export const metadata: Metadata = {
  title: `Free Mold Inspection Checklist | ${siteConfig.brandName}`,
  description: `Free printable room-by-room mold inspection checklist (${CHECKLIST_ITEM_COUNT} checks, built from EPA guidance). Enter your email to download.`,
  alternates: { canonical: `${siteConfig.siteUrl}/checklist/` },
};

export default function ChecklistPage() {
  return (
    <>
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Free Checklist" }]}
      />
      <section className="block" aria-labelledby="checklist-h">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <p className="eyebrow">Free download</p>
          <h1 id="checklist-h" style={{ marginBottom: 8 }}>
            The Homeowner&apos;s Mold Inspection Checklist
          </h1>
          <p style={{ maxWidth: 640, color: "var(--muted)" }}>
            {CHECKLIST_ITEM_COUNT} checks across 8 rooms — from the attic to
            the gutters. Built from EPA guidance, honest and actionable, zero
            fluff. Give us your email and it&apos;s yours.
          </p>
          <div style={{ marginTop: 20 }}>
            <ChecklistGate />
          </div>
        </div>
      </section>
      <CtaBand
        title="Found something worrying?"
        sub="The checklist tells you what to look for. A free inspection tells you exactly what it means — no obligation."
      />
    </>
  );
}
