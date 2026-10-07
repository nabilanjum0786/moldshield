import Link from "next/link";
import { Icon } from "./icons";
import { CHECKLIST_ITEM_COUNT } from "./checklist-data";

/**
 * ChecklistCta — compact lead-magnet band. Tasteful, not pushy:
 * one line of value, one button to the gated /checklist page.
 */
export function ChecklistCta() {
  return (
    <section
      className="block"
      aria-labelledby="checklist-cta-h"
      style={{ background: "var(--tint, #f6f8f7)" }}
    >
      <div
        className="wrap reveal"
        style={{
          display: "flex",
          gap: 18,
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span
            aria-hidden="true"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 44,
              height: 44,
              borderRadius: 12,
              background: "#0F3D3E",
              color: "#F59E0B",
              flexShrink: 0,
            }}
          >
            <Icon name="check" />
          </span>
          <div>
            <h2
              id="checklist-cta-h"
              style={{ margin: "0 0 6px", fontSize: 22 }}
            >
              Free: The Homeowner&apos;s Mold Inspection Checklist
            </h2>
            <p style={{ margin: 0, color: "var(--muted)", fontSize: 15 }}>
              {CHECKLIST_ITEM_COUNT} checks, 8 rooms, built from EPA guidance.
              Walk your home like a pro — free download with your email.
            </p>
          </div>
        </div>
        <Link
          className="btn btn-brand"
          href="/checklist/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Get the free checklist
          <Icon name="arrow" />
        </Link>
      </div>
    </section>
  );
}
