import type { PillarContent } from "../blocks";

/**
 * PILLAR 1/5 — Attic Mold Removal.
 * The quality bar: every other pillar follows this structure and depth.
 * 100% original content. No copied data.
 */
export const atticMoldRemoval: PillarContent = {
  slug: "attic-mold-removal",
  name: "Attic Mold Removal",
  metaTitle: "Attic Mold Removal | Certified Specialists, Transparent Pricing",
  metaDescription:
    "Professional attic mold removal: inspection, HEPA remediation, insulation replacement and moisture fixes. Transparent pricing, free inspections, 24/7 response.",
  heroAnswer:
    "Attic mold removal is the professional remediation of mold colonies growing on roof sheathing, rafters, and insulation — most often caused by roof leaks, ice dams, bathroom vents exhausting into the attic, or poor ventilation. Certified technicians contain the area, remove contaminated insulation, HEPA-vacuum and treat every surface, then fix the moisture source so the mold cannot return.",
  areaServed: ["Ohio", "Dayton"],

  blocks: [
    {
      type: "h2",
      text: "Why Attics Grow Mold",
    },
    {
      type: "p",
      text: "Your attic is the most common place for hidden mold in an American home, and most homeowners have no idea it's there. Attics sit at the intersection of everything mold needs: organic food (wood sheathing and paper-faced insulation), oxygen, and — the one ingredient that turns a clean attic into a colony — moisture. Here are the five causes we find on nearly every job:",
    },
    {
      type: "list",
      items: [
        "Roof leaks — even a slow drip around flashing or a lifted shingle feeds sheathing mold for months before anyone notices a ceiling stain.",
        "Bathroom or kitchen vents exhausting INTO the attic instead of outside. This is startlingly common and a code violation in most jurisdictions — every hot shower pumps warm, wet air directly onto cold roof decking.",
        "Ice dams — in freeze-thaw climates, melting snow refreezes at the eaves, backs water under shingles, and soaks the sheathing from above.",
        "Blocked or unbalanced ventilation — soffit vents choked with insulation plus no ridge vent means moist air has nowhere to go.",
        "Condensation — warm house air leaking through unsealed attic hatches and can lights condenses on cold nails and sheathing all winter.",
      ],
    },
    {
      type: "stat",
      text: "The U.S. Environmental Protection Agency states that mold can begin growing within 24 to 48 hours of water exposure, and recommends keeping indoor humidity between 30 and 50 percent to prevent growth.",
    },
    { type: "h2", text: "Warning Signs of Attic Mold" },
    {
      type: "p",
      text: "Attic mold rarely announces itself. Watch for these signs — any one of them justifies a professional inspection:",
    },
    {
      type: "list",
      items: [
        "A musty or earthy smell on the upper floor, especially on humid days",
        "Dark staining, streaks, or fuzzy patches on the underside of roof sheathing",
        "Frost on roofing nails or sheathing visible during winter",
        "A bathroom exhaust fan you can hear — but no vent cap visible on the roof or siding",
        "A roof leak repaired in the past without anyone checking the attic afterward",
        "Allergy symptoms — sneezing, itchy eyes, congestion — that ease when you leave the house",
        "Insulation that looks compressed, discolored, or matted down",
      ],
    },
    { type: "h2", text: "Our Attic Mold Removal Process" },
    {
      type: "p",
      text: "Every attic job follows the same documented six-step protocol. You receive photo documentation at each stage, so you see exactly what was found and what was fixed — even if you never climb the ladder yourself.",
    },
    {
      type: "process",
      heading: "The 6-Step Attic Remediation Protocol",
      steps: [
        {
          name: "Inspection and moisture mapping",
          text: "Certified inspector examines the full attic with moisture meters and thermal imaging, maps every affected area, and identifies the moisture source. You get a written findings report with photos before any work begins.",
        },
        {
          name: "Containment",
          text: "The attic access is sealed with polyethylene barriers and the work zone is placed under negative air pressure, so spores cannot migrate into your living space during remediation.",
        },
        {
          name: "Contaminated insulation removal",
          text: "Mold-compromised insulation is bagged on-site in sealed containment bags and removed for disposal. This is the step most DIY attempts skip — and the reason mold returns.",
        },
        {
          name: "HEPA vacuuming and antimicrobial treatment",
          text: "Every rafter, sheathing panel, and joist is HEPA-vacuumed (capturing 99.97% of particles at 0.3 microns), then treated with an EPA-registered antimicrobial. Remaining staining is sealed with a mold-inhibiting encapsulant.",
        },
        {
          name: "Moisture-source repair",
          text: "We fix what caused it: rerouting bath vents through the roof, restoring soffit-to-ridge airflow, sealing attic bypasses. Remediation without repair is just a pause button.",
        },
        {
          name: "Verification and documentation",
          text: "Post-remediation verification — visual inspection plus optional third-party air sampling — confirms clearance. You receive the complete photo log and a written warranty.",
        },
      ],
    },
    { type: "h2", text: "Attic Mold Removal Cost" },
    {
      type: "p",
      text: "We publish real price ranges because you deserve to budget before anyone climbs into your attic. Your free inspection produces an exact written quote — the ranges below are what most homeowners actually pay:",
    },
    {
      type: "table",
      caption: "Typical attic mold remediation pricing",
      head: ["Service", "Typical Range", "Notes"],
      rows: [
        ["Inspection & moisture mapping", "$0 (free)", "Written findings + photos; credited toward any work"],
        ["Small area (under 100 sq ft)", "$800 – $1,500", "Localized sheathing treatment"],
        ["Moderate attic (100–500 sq ft)", "$1,500 – $3,500", "Most common job size"],
        ["Whole-attic remediation", "$3,500 – $7,000+", "Full insulation removal + treatment"],
        ["Blown-in insulation replacement", "$1.50 – $3.50 / sq ft", "Added after remediation"],
        ["Bath vent reroute to exterior", "$300 – $600", "Per vent; fixes the #1 cause"],
      ],
    },
    {
      type: "p",
      text: "Severe cases involving structural sheathing replacement run higher, and your inspector will say so plainly during the free visit. We never upsell — the written quote is fixed before work starts.",
    },
    { type: "h2", text: "Black Mold in the Attic: What You Should Know" },
    {
      type: "answer",
      text: "Black mold (Stachybotrys chartarum) is a dark greenish-black mold that grows on consistently wet wood and drywall. The CDC notes that all molds can cause health issues in sensitive individuals — sneezing, skin rash, red eyes — and recommends removing mold regardless of type rather than testing first. Do not disturb large patches yourself; disturbance releases concentrated spores.",
    },
    {
      type: "p",
      text: "Not every dark stain is Stachybotrys — Cladosporium and Aspergillus also stain sheathing dark. Only lab testing identifies the species, and honestly, the species rarely changes the remediation plan: contained removal, HEPA filtration, and moisture repair. What matters is the extent and the water source behind it.",
    },
    { type: "h2", text: "DIY vs Professional Attic Mold Removal" },
    {
      type: "p",
      text: "An honest answer: the EPA's own guidance says homeowners can handle very small areas (under about 10 square feet) on hard surfaces themselves with proper protection — N95 respirator, gloves, eye protection, and containment of the work area. But attics are the worst DIY candidate in the house: confined space, fiberglass insulation, electrical, no floor in most areas, and the moisture source is almost always something you can't see from inside the attic. If the patch is bigger than a dinner plate, if insulation is involved, or if anyone in the home has asthma or allergies, bring in professionals. Disturbing a large colony without containment spreads spores through the whole house — turning a $1,500 job into a $6,000 one.",
    },
    { type: "h2", text: "Keeping Attic Mold From Coming Back" },
    {
      type: "list",
      items: [
        "Vent every bath and kitchen exhaust to the exterior — never into the attic.",
        "Balance intake and exhaust ventilation: clear soffit vents plus a continuous ridge vent.",
        "Seal attic air leaks: hatch, can lights, plumbing and wire penetrations.",
        "Keep attic humidity under 50% — a $15 hygrometer tells you where you stand.",
        "After any roof repair, have the attic inspected — leaks leave mold behind even after the drip stops.",
      ],
    },
    {
      type: "cta",
      title: "Suspect Attic Mold? Get a Free Inspection.",
      body: "Certified inspector, moisture mapping, written findings with photos — free, no obligation. If your attic is clean, we'll tell you so.",
    },
  ],

  faqs: [
    {
      question: "How much does attic mold removal cost?",
      answer:
        "Most homeowners pay $1,500 to $3,500 for a moderate attic remediation, with small localized jobs from $800 and whole-attic projects reaching $7,000 or more. Insulation replacement adds $1.50 to $3.50 per square foot. Your free inspection produces an exact written quote — the ranges above reflect what most of our customers actually pay.",
    },
    {
      question: "How long does attic mold remediation take?",
      answer:
        "A typical attic takes one to three days: day one for containment and insulation removal, day two for HEPA treatment and antimicrobial application, with verification on completion. Whole-attic jobs with insulation replacement can run four to five days. You'll have a firm schedule in writing before work begins.",
    },
    {
      question: "Can we stay in the house during attic mold removal?",
      answer:
        "Yes, in nearly all cases. The attic is sealed under negative-air containment, so spores cannot enter your living space during the work. You may hear equipment during the day. We only recommend temporary relocation for severe whole-house contamination, which your inspector will flag honestly if it applies.",
    },
    {
      question: "Will the mold come back after remediation?",
      answer:
        "Not if the moisture source is fixed — which is why source repair is step five of our protocol, not an optional add-on. Mold is a moisture problem wearing a mold costume. Jobs that return are almost always jobs where someone treated the mold but left the roof leak, the misrouted bath vent, or the blocked soffits in place.",
    },
    {
      question: "Does homeowners insurance cover attic mold removal?",
      answer:
        "Sometimes — it depends on the cause. Insurance typically covers mold resulting from a sudden, covered peril (like storm damage to the roof), but excludes mold from long-term neglect or maintenance issues (like a bath vent that was never routed outside). We document the cause thoroughly, which is exactly what adjusters need to see.",
    },
    {
      question: "How do I know it's mold and not just dirt on the sheathing?",
      answer:
        "Mold usually shows as irregular staining — black, dark green, gray, or white fuzzy patches — often following moisture patterns near leaks or vents, while dirt is uniform. But visual ID is unreliable: only lab testing confirms species. The practical rule: if staining covers more than a dinner plate or you smell mustiness, get a professional inspection rather than guessing.",
    },
    {
      question: "Is black mold in the attic dangerous?",
      answer:
        "All molds can affect sensitive individuals — the CDC lists sneezing, skin irritation, and red eyes, and notes people with asthma or mold allergy face higher risk. 'Black mold' (Stachybotrys) gets the headlines, but remediation practice doesn't change by species: contained professional removal. Don't disturb large patches yourself; call for an inspection.",
    },
    {
      question: "Do you replace the insulation after removing moldy insulation?",
      answer:
        "Yes — contaminated insulation can't be cleaned, only removed, and we install fresh blown-in insulation after remediation is verified. Many customers upgrade to a higher R-value at this stage since the attic is already empty, which is the cheapest time you'll ever add insulation. It's quoted as a separate line item.",
    },
    {
      question: "Is winter a bad time for attic mold remediation?",
      answer:
        "Winter is actually an ideal time. Crews aren't booked out like spring, and finding the moisture source is easier — ice dams and condensation patterns are visible. Containment and negative-air systems work identically year-round. If anything, waiting until spring lets the colony grow for months.",
    },
    {
      question: "How fast can you get someone to my house?",
      answer:
        "Inspections are typically scheduled within 24 to 48 hours, and emergency situations — active roof leak with visible growth, real-estate deadline — get same-day priority. Call before noon and we can usually have an inspector to you the next morning.",
    },
  ],

  processSteps: [
    {
      name: "Inspection and moisture mapping",
      text: "Certified inspector examines the full attic with moisture meters and thermal imaging and delivers a written findings report with photos.",
    },
    {
      name: "Containment",
      text: "Attic access sealed with polyethylene barriers under negative air pressure so spores cannot enter living spaces.",
    },
    {
      name: "Contaminated insulation removal",
      text: "Mold-compromised insulation is bagged on-site in sealed containment bags and removed for disposal.",
    },
    {
      name: "HEPA vacuuming and antimicrobial treatment",
      text: "Every surface HEPA-vacuumed, treated with EPA-registered antimicrobial, and sealed with mold-inhibiting encapsulant.",
    },
    {
      name: "Moisture-source repair",
      text: "Bath vents rerouted, ventilation restored, air leaks sealed — the cause fixed, not just the symptom.",
    },
    {
      name: "Verification and documentation",
      text: "Post-remediation verification with optional third-party air sampling, complete photo log, and written warranty.",
    },
  ],
};
