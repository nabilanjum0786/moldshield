// ─────────────────────────────────────────────────────────────
// Landlord complaint letter builder — pure logic, no JSX.
// Ohio Rev. Code §5321.04(A)(1)–(2), verified 2026-10-06 via
// https://codes.ohio.gov/ohio-revised-code/section-5321.04
// (A)(1): landlord must comply with applicable building, housing,
// health, and safety codes that materially affect health and safety.
// (A)(2): landlord must "make all repairs and do whatever is reasonably
// necessary to put and keep the premises in a fit and habitable condition."
// ─────────────────────────────────────────────────────────────

export const STATUTE_URL =
  "https://codes.ohio.gov/ohio-revised-code/section-5321.04";

export type LetterForm = {
  tenantName: string;
  tenantPhone: string;
  tenantEmail: string;
  rentalAddress: string;
  landlordName: string;
  moldLocation: string;
  moldDescription: string;
  dateFirstReported: string; // ISO date
  priorRequests: "no" | "yes";
  priorDetails: string;
};

export const EMPTY_LETTER_FORM: LetterForm = {
  tenantName: "",
  tenantPhone: "",
  tenantEmail: "",
  rentalAddress: "",
  landlordName: "",
  moldLocation: "",
  moldDescription: "",
  dateFirstReported: "",
  priorRequests: "no",
  priorDetails: "",
};

export function letterReady(f: LetterForm): boolean {
  return (
    f.tenantName.trim() !== "" &&
    f.rentalAddress.trim() !== "" &&
    f.landlordName.trim() !== "" &&
    f.moldLocation.trim() !== "" &&
    f.moldDescription.trim() !== "" &&
    f.dateFirstReported !== ""
  );
}

function fmtDate(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Builds the letter as an array of paragraphs (also joined for copy). */
export function buildLetter(f: LetterForm, todayIso: string): string[] {
  const today = fmtDate(todayIso);
  const reported = fmtDate(f.dateFirstReported);
  const contact = [f.tenantPhone.trim(), f.tenantEmail.trim()]
    .filter(Boolean)
    .join(" | ");

  const paras: string[] = [
    today,
    "",
    `${f.tenantName.trim()}\n${f.rentalAddress.trim()}`,
    "",
    `Re: Formal request for mold remediation — ${f.rentalAddress.trim()}`,
    "",
    `Dear ${f.landlordName.trim()},`,
    "",
    `I am writing to formally notify you of a mold problem at the rental property above, first observed on or about ${reported}. The problem is located ${f.moldLocation.trim()}. Description: ${f.moldDescription.trim()}`,
    "",
    "Under Ohio Revised Code \u00a75321.04(A), a landlord who is a party to a rental agreement must (1) comply with all applicable building, housing, health, and safety codes that materially affect health and safety, and (2) \u201cmake all repairs and do whatever is reasonably necessary to put and keep the premises in a fit and habitable condition.\u201d A mold condition caused by a building defect, plumbing failure, or other issue within your control falls under this duty.",
  ];

  if (f.priorRequests === "yes") {
    const detail = f.priorDetails.trim()
      ? ` Details: ${f.priorDetails.trim()}`
      : "";
    paras.push(
      "",
      `I have previously reported this problem and it has not been resolved.${detail} This letter serves as a further formal written notice.`
    );
  }

  paras.push(
    "",
    "I request that you arrange for a professional inspection and complete remediation of the affected areas within 14 days of the date of this letter, and confirm your plan to me in writing.",
    "",
    "If the condition is not addressed, I understand that Ohio law provides tenants with remedies for a landlord\u2019s failure to meet these obligations, and I will consider my options, including contacting the local health department and consulting a tenant-rights attorney.",
    "",
    "Sincerely,",
    "",
    f.tenantName.trim(),
    contact
  );

  return paras;
}

export function letterText(f: LetterForm, todayIso: string): string {
  return buildLetter(f, todayIso).join("\n");
}
