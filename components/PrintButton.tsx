"use client";

/**
 * PrintButton — client-side "Download / Print" button.
 * window.print() + the print stylesheet in globals.css
 * (.no-print hides chrome; .print-box shows print-only headers).
 * The button itself carries .no-print so it never appears on paper.
 */
export function PrintButton({ label = "Download / Print" }: { label?: string }) {
  return (
    <button
      type="button"
      className="btn btn-primary no-print"
      onClick={() => window.print()}
    >
      {label}
    </button>
  );
}
