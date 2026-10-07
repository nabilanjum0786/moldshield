// ─────────────────────────────────────────────────────────────
// SITE CONFIG — every brand/identity value lives here.
// Change these when the domain is purchased and branding is finalized,
// then redeploy. Nothing else needs editing.
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  // BRAND FINALIZED 2026-10-07 (nabil): MoldShield — domain moldshield.us
  brandName: "MoldShield",
  tagline: "America's Mold Remediation Specialists",

  // PHONE STRATEGY (nabil 2026-10-06): ONE site-wide number for the entire
  // site — no per-page dynamic numbers. Call attribution happens in the
  // Lead Smart console/dashboard, not via per-page numbers.
  // PLACEHOLDER number — swap with the real Lead Smart number once the
  // affiliate account is approved. One variable, whole site updates.
  phoneDisplay: "(800) 555-0199",
  phoneHref: "tel:+18005550199",

  // Updated automatically when the real domain is attached.
  // Until then the Vercel preview URL is used and the site stays noindexed.
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://mold-site.vercel.app",

  // KEEP TRUE until the purchased domain is attached. Prevents the preview
  // URL from getting indexed and splitting authority later.
  noindexPreview: true,

  email: "hello@example.com", // placeholder

  hours: "Open 24/7 for mold emergencies",
} as const;

export const services = [
  {
    slug: "attic-mold-removal",
    name: "Attic Mold Removal",
    shortName: "Attic Mold",
    blurb:
      "Mold in the attic from roof leaks, ice dams, and poor ventilation — removed with HEPA-filtered equipment and treated so it doesn't return.",
  },
  {
    slug: "crawl-space-mold-remediation",
    name: "Crawl Space Mold Remediation",
    shortName: "Crawl Space Mold",
    blurb:
      "Damp crawl spaces are mold factories. We remediate the mold, then fix the moisture — encapsulation, drainage, and dehumidification.",
  },
  {
    slug: "basement-mold-removal",
    name: "Basement Mold Removal",
    shortName: "Basement Mold",
    blurb:
      "Foundation seepage, flooding, and high humidity feed basement mold. Full remediation plus moisture control to keep it gone.",
  },
  {
    slug: "black-mold-removal",
    name: "Black Mold Removal",
    shortName: "Black Mold",
    blurb:
      "Stachybotrys chartarum — the mold behind the health scares. Certified containment, negative-air pressure, and verified clearance.",
  },
  {
    slug: "mold-inspection-testing",
    name: "Mold Inspection & Testing",
    shortName: "Mold Inspection",
    blurb:
      "Not sure it's mold? Certified inspection with moisture mapping, air and surface sampling, and a written remediation protocol.",
  },
] as const;

export type ServiceSlug = (typeof services)[number]["slug"];
