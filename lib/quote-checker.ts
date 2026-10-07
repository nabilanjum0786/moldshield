// ─────────────────────────────────────────────────────────────
// QUOTE CHECKER ENGINE — pure logic, no JSX.
// Keyword/phrase-based structural check of a mold remediation quote.
//
// HONESTY NOTES ON MATCHING LIMITS (read before extending this file):
// - Matching is naive keyword/phrase matching on lowercased text.
// - A contractor can do the right work and describe it in words we don't
//   match ("we'll seal the work zone" ≈ containment, but our keyword list
//   may miss it). A missing keyword is NOT proof of a missing step.
// - Conversely, a quote can mention a keyword without doing the work.
//   Words are not work. This tool surfaces questions, not verdicts on
//   the contractor.
// - We NEVER judge prices. The only cost figure in this file is the
//   sourced HomeAdvisor 2026 range ($1,223–$3,757), used as context only.
//   The flat-price check flags STRUCTURAL problems (single lump sum with
//   no itemized scope), never "too expensive."
// ─────────────────────────────────────────────────────────────

export type FlagSeverity = "red" | "yellow";

export type QuoteFlag = {
  id: string;
  severity: FlagSeverity;
  title: string;
  explanation: string; // 1–2 sentences, plain English, WHY it matters
};

export type QuoteAnalysis = {
  empty: boolean;
  flags: QuoteFlag[];
  passed: string[];
  redCount: number;
  yellowCount: number;
  summary: string;
};

/** HomeAdvisor 2026 national range, from the research pack — context only. */
export const SOURCED_COST_RANGE = "$1,223–$3,757 (HomeAdvisor 2026)";

function hasAny(lower: string, needles: string[]): boolean {
  return needles.some((n) => lower.includes(n));
}

function countPrices(lower: string): number {
  // Matches $1,200, $1,200.00, $ 850 — naive, per the honesty notes.
  const m = lower.match(/\$\s?[\d,]+(?:\.\d{2})?/g);
  return m ? m.length : 0;
}

export function analyzeQuote(rawText: string): QuoteAnalysis {
  const text = rawText.trim();

  if (text.length === 0) {
    return {
      empty: true,
      flags: [],
      passed: [],
      redCount: 0,
      yellowCount: 0,
      summary:
        "Nothing to check yet — paste the quote text above (copy it or type the line items) and hit the button.",
    };
  }

  const lower = text.toLowerCase();
  const flags: QuoteFlag[] = [];
  const passed: string[] = [];

  // ── RED (a) — no containment mentioned ──
  const containmentWords = [
    "containment",
    "contain the",
    "poly sheeting",
    "polyethylene",
    "barrier",
    "negative air",
    "negative pressure",
    "seal off",
    "sealed off",
    "sealing off",
    "zipper door",
  ];
  if (hasAny(lower, containmentWords)) {
    passed.push("Containment mentioned — the work zone gets isolated.");
  } else {
    flags.push({
      id: "no-containment",
      severity: "red",
      title: "No containment mentioned",
      explanation:
        "Containment (plastic barriers, negative air) keeps spores from spreading through the house while moldy material is torn out. Industry practice (the IICRC S520 concepts) always isolates the work zone — without it, removal can contaminate clean rooms.",
    });
  }

  // ── RED (b) — no moisture-source fix mentioned ──
  const sourceWords = [
    "moisture source",
    "water source",
    "leak",
    "repair",
    "plumbing",
    "water intrusion",
    "drainage",
    "gutter",
    "cause of",
    "fix the",
  ];
  if (hasAny(lower, sourceWords)) {
    passed.push("Moisture-source repair mentioned — the cause gets fixed.");
  } else {
    flags.push({
      id: "no-source-fix",
      severity: "red",
      title: "No moisture-source fix mentioned",
      explanation:
        "Mold always comes back if the water source isn't fixed — EPA guidance is blunt: dry wet materials within 24–48 hours and fix the leak first. A quote that only cleans, without repairing the cause, is half a job.",
    });
  }

  // ── RED (c) — no post-remediation verification / clearance testing ──
  const verifyWords = [
    "clearance",
    "verification",
    "third-party",
    "third party",
    "post-remediation",
    "post remediation",
    "independent test",
    "independent inspection",
  ];
  if (hasAny(lower, verifyWords)) {
    passed.push("Post-remediation verification mentioned — proof it worked.");
  } else {
    flags.push({
      id: "no-clearance",
      severity: "red",
      title: "No post-remediation verification mentioned",
      explanation:
        "Clearance testing — ideally by an independent third party, not the company that did the work — is the only real proof the job worked. Without it, you're taking the crew's word for it.",
    });
  }

  // ── RED (d) — flat lump-sum price with no itemized scope ──
  // Structural check only: we never judge the price itself.
  const priceCount = countPrices(lower);
  const itemizedWords = [
    "itemized",
    "line item",
    "breakdown",
    "per sq ft",
    "per square foot",
    "per ft",
    "per hour",
    "labor:",
    "materials:",
  ];
  if (priceCount === 0) {
    // No prices in the pasted text — nothing to judge; stay silent.
  } else if (priceCount === 1 && !hasAny(lower, itemizedWords)) {
    flags.push({
      id: "flat-lump-sum",
      severity: "red",
      title: "Single lump-sum price, no itemized scope",
      explanation:
        "One total with no line items means you can't compare what's included — or check that everything promised was actually done. Itemized scope is how you hold a contractor to the work. (We never judge whether a price is 'too high' — that varies by job.)",
    });
  } else {
    passed.push("Itemized pricing — scope broken into line items.");
  }

  // ── RED (e) — pressure tactics (fires on PRESENCE, not absence) ──
  const pressurePhrases = [
    "today only",
    "sign now",
    "sign today",
    "discount expires",
    "expires today",
    "limited time",
    "act now",
    "offer ends",
    "only valid today",
    "must decide today",
    "price goes up",
  ];
  if (hasAny(lower, pressurePhrases)) {
    flags.push({
      id: "pressure-tactics",
      severity: "red",
      title: "High-pressure sales language",
      explanation:
        "Legitimate remediators don't need 'today only' discounts — mold doesn't negotiate, and you shouldn't have to either. Get two more quotes and compare line items before signing anything.",
    });
  } else {
    passed.push("No high-pressure language spotted.");
  }

  // ── RED (f) — no license/insurance mention ──
  const licenseWords = [
    "license",
    "licensed",
    "insured",
    "insurance",
    "bonded",
    "iicrc",
    "certified",
    "certification",
  ];
  if (hasAny(lower, licenseWords)) {
    passed.push("License/insurance mentioned.");
  } else {
    flags.push({
      id: "no-license",
      severity: "red",
      title: "No license or insurance mentioned",
      explanation:
        "You want a licensed, insured company — if something goes wrong (damaged drywall, a worker hurt on your property), insurance is what protects you. Ask for proof in writing, not just a logo on a truck.",
    });
  }

  // ── YELLOW — vague "treat/spray/fog" without removal steps ──
  const vagueWords = ["treat", "treatment", "spray", "fog", "fogging"];
  const removalWords = [
    "remove",
    "removal",
    "tear out",
    "demolish",
    "replace",
    "hepa",
    "wipe down",
    "physical removal",
  ];
  if (hasAny(lower, vagueWords) && !hasAny(lower, removalWords)) {
    flags.push({
      id: "vague-scope",
      severity: "yellow",
      title: "Vague treatment language, no removal steps",
      explanation:
        "Spraying or fogging without physically removing moldy material treats the surface, not the problem — industry guidance centers on removal plus HEPA cleanup, with fogging as a supplement at best.",
    });
  } else if (hasAny(lower, removalWords)) {
    passed.push("Removal steps described, not just spraying/fogging.");
  }

  // ── YELLOW — no timeline ──
  const timelineWords = [
    "day",
    "days",
    "week",
    "weeks",
    "timeline",
    "schedule",
    "duration",
    "completion",
    "start date",
    "begin",
  ];
  if (hasAny(lower, timelineWords)) {
    passed.push("Timeline mentioned — you can plan around the work.");
  } else {
    flags.push({
      id: "no-timeline",
      severity: "yellow",
      title: "No written timeline",
      explanation:
        "A quote with no start date, duration, or completion date gives you no way to hold the contractor to a schedule — or plan around the drying time remediation needs.",
    });
  }

  const redCount = flags.filter((f) => f.severity === "red").length;
  const yellowCount = flags.filter((f) => f.severity === "yellow").length;

  let summary: string;
  if (redCount === 0 && yellowCount === 0) {
    summary =
      "No structural red flags found — this quote mentions containment, moisture-source repair, verification, and the other basics we check for. Still compare it against two more quotes before signing.";
  } else {
    summary = `This quote raised ${redCount} red flag${
      redCount === 1 ? "" : "s"
    } and ${yellowCount} yellow flag${yellowCount === 1 ? "" : "s"}.`;
    if (redCount > 0) {
      summary +=
        " Red flags are structural problems — ask the contractor about each one in writing before you sign.";
    } else {
      summary +=
        " No red flags, but the yellow items are worth asking about.";
    }
  }

  return { empty: false, flags, passed, redCount, yellowCount, summary };
}
