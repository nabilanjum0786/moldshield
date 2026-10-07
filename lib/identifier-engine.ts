// ─────────────────────────────────────────────────────────────
// Guided visual mold identifier — pure logic, no JSX.
// Rule-based scoring over five candidates. The result is ALWAYS framed
// as "most consistent with", never a diagnosis: only lab testing
// confirms mold type. Health framing follows CDC 2006 (effects depend
// on the person, not the mold type).
// ─────────────────────────────────────────────────────────────

export type WhereOpt =
  | "bathroom"
  | "basement"
  | "attic"
  | "wall"
  | "hvac"
  | "crawl"
  | "window";
export type ColorOpt =
  | "black"
  | "green"
  | "white"
  | "gray"
  | "orangepink"
  | "brown";
export type TextureOpt =
  | "fuzzy"
  | "slimy"
  | "powdery"
  | "flat"
  | "crusty";
export type SmellOpt = "musty" | "none" | "sweet";
export type SurfaceOpt =
  | "grout"
  | "drywall"
  | "wood"
  | "concrete"
  | "fabric";

export type IdAnswers = {
  where: WhereOpt;
  color: ColorOpt;
  texture: TextureOpt;
  smell: SmellOpt;
  surface: SurfaceOpt;
};

export type CandidateId =
  | "stachybotrys"
  | "mildew"
  | "efflorescence"
  | "soot"
  | "woodrot";

export type Candidate = {
  id: CandidateId;
  name: string;
  tagline: string;
  description: string;
  tellApart: string;
  nextStep: string;
  isMold: boolean;
};

export const CANDIDATES: Record<CandidateId, Candidate> = {
  stachybotrys: {
    id: "stachybotrys",
    name: "Stachybotrys chartarum (black mold)",
    tagline: "The one behind the health scares",
    description:
      "Greenish-black, slimy growth that needs constant moisture — typically on drywall, wood, or paper backing after sustained water exposure. It produces mycotoxins, and CDC guidance says health effects hit susceptible people hardest.",
    tellApart:
      "Unlike mildew it is slimy rather than powdery, and unlike soot it wipes with a musty odor and sits on water-damaged material — not near vents or fireplaces.",
    nextStep:
      "Do not disturb a large patch. Get a professional inspection with containment — this is not a DIY scrub job.",
    isMold: true,
  },
  mildew: {
    id: "mildew",
    name: "Mildew",
    tagline: "Surface-level, common in bathrooms",
    description:
      "White, gray, or light-colored powdery or flat growth on damp surfaces — shower grout, windowsills, fabrics. It stays on the surface and is the mildest of the common indoor growths.",
    tellApart:
      "Powdery and light-colored, unlike the slimy dark patches of Stachybotrys; unlike efflorescence it grows on grout and fabric, not bare concrete.",
    nextStep:
      "Small areas can be cleaned with detergent and thorough drying — then fix the ventilation or the moisture keeps bringing it back.",
    isMold: true,
  },
  efflorescence: {
    id: "efflorescence",
    name: "Efflorescence",
    tagline: "Not mold at all — mineral deposits",
    description:
      "White, crusty, salty-looking deposits on concrete, brick, or stone. It's mineral salts left behind when water moves through masonry — a moisture signal, not a mold colony.",
    tellApart:
      "Crushes to powder between your fingers and has no musty smell. If it dissolves in water, it's efflorescence, not mold.",
    nextStep:
      "No remediation needed — but the water getting through the masonry does need fixing, or real mold follows.",
    isMold: false,
  },
  soot: {
    id: "soot",
    name: "Soot / ghosting",
    tagline: "Not mold — combustion staining",
    description:
      "Flat black staining near HVAC vents, fireplaces, or candles. It's airborne soot particles sticking to walls, not a living colony — it won't be fuzzy or smell musty.",
    tellApart:
      "Flat and dry with no texture and no musty odor, usually in streaks near air movement — vents, door frames, above candles.",
    nextStep:
      "Wipes off with a dry sponge; check HVAC filters and any combustion appliances for the source.",
    isMold: false,
  },
  woodrot: {
    id: "woodrot",
    name: "Wood-decay fungi (rot)",
    tagline: "Structural threat, not just surface",
    description:
      "Brown, sometimes fuzzy growth on wood in damp crawl spaces and basements. Unlike surface mold, wood-decay fungi eat the wood itself — this is a structural problem, not a cosmetic one.",
    tellApart:
      "The wood feels soft, spongy, or crumbly — surface mold leaves wood hard underneath. Probe gently with a screwdriver.",
    nextStep:
      "Get a professional assessment promptly: rotted framing or joists need repair, not just cleaning.",
    isMold: true,
  },
};

export type Match = { candidate: Candidate; score: number };

export function scoreMatches(a: IdAnswers): Match[] {
  const s: Record<CandidateId, number> = {
    stachybotrys: 0,
    mildew: 0,
    efflorescence: 0,
    soot: 0,
    woodrot: 0,
  };

  // Color
  if (a.color === "black") {
    s.stachybotrys += 3;
    s.soot += 2;
  }
  if (a.color === "green") s.stachybotrys += 2;
  if (a.color === "white" || a.color === "gray") {
    s.mildew += 3;
    s.efflorescence += 2;
  }
  if (a.color === "orangepink") s.mildew += 1;
  if (a.color === "brown") s.woodrot += 2;

  // Texture
  if (a.texture === "slimy") s.stachybotrys += 3;
  if (a.texture === "fuzzy") {
    s.stachybotrys += 1;
    s.mildew += 1;
    s.woodrot += 2;
  }
  if (a.texture === "powdery") s.mildew += 3;
  if (a.texture === "flat") {
    s.soot += 3;
    s.mildew += 1;
  }
  if (a.texture === "crusty") s.efflorescence += 4;

  // Smell
  if (a.smell === "musty") {
    s.stachybotrys += 2;
    s.woodrot += 1;
  }
  if (a.smell === "none") {
    s.efflorescence += 2;
    s.soot += 2;
    s.mildew += 1;
  }

  // Surface
  if (a.surface === "drywall") s.stachybotrys += 2;
  if (a.surface === "wood") {
    s.stachybotrys += 1;
    s.woodrot += 3;
  }
  if (a.surface === "concrete") s.efflorescence += 3;
  if (a.surface === "grout") s.mildew += 2;
  if (a.surface === "fabric") s.mildew += 2;

  // Location
  if (a.where === "bathroom" || a.where === "window") s.mildew += 2;
  if (a.where === "basement" || a.where === "wall") {
    s.stachybotrys += 1;
    s.efflorescence += 1;
  }
  if (a.where === "hvac") s.soot += 2;
  if (a.where === "crawl" || a.where === "attic") s.woodrot += 1;

  return (Object.keys(s) as CandidateId[])
    .map((id) => ({ candidate: CANDIDATES[id], score: s[id] }))
    .sort((x, y) => y.score - x.score);
}
