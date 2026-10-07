// ─────────────────────────────────────────────────────────────
// Hand-drawn inline-SVG icon set (ported from the HTML template).
// No emoji in UI, no external assets. Stroke style: 2px, round caps.
// ─────────────────────────────────────────────────────────────

export type IconName =
  | "phone"
  | "check"
  | "arrow"
  | "shield"
  | "clock"
  | "pin"
  | "home";

const PATHS: Record<IconName, { sw: number; body: React.ReactNode }> = {
  phone: {
    sw: 2,
    body: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
  },
  check: {
    sw: 2.4,
    body: <path d="M20 6L9 17l-5-5" />,
  },
  arrow: {
    sw: 2.2,
    body: (
      <>
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
      </>
    ),
  },
  shield: {
    sw: 2,
    body: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
  },
  clock: {
    sw: 2,
    body: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
  },
  pin: {
    sw: 2,
    body: (
      <>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
  home: {
    sw: 2,
    body: (
      <>
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9 21v-6h6v6" />
      </>
    ),
  },
};

export function Icon({
  name,
  className = "ic",
}: {
  name: IconName;
  className?: string;
}) {
  const { sw, body } = PATHS[name];
  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {body}
    </svg>
  );
}
