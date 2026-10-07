import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Icon } from "./icons";
import { MoldIdCards } from "./infographics/MoldIdCards";
import { RemovalVsRemediation } from "./infographics/RemovalVsRemediation";
import { SeasonCalendar } from "./infographics/SeasonCalendar";
import { Timeline24h } from "./infographics/Timeline24h";

export function Problems() {
  return (
  <section className="block" aria-labelledby="problems-h">
    <div className="wrap">
      <span className="eyebrow reveal">Why It Can't Wait</span>
      <h2 id="problems-h" className="reveal">The Three Problems That Make Homeowners Act</h2>
      <div className="grid cols-3" style={{marginTop:"28px"}}>
        <div className="card reveal">
          <h3>Health: The Air You're Breathing</h3>
          <p>Damp, moldy indoor spaces can raise the risk of asthma and other breathing problems by <strong>as much as 50%</strong> (EPA). Allergy flare-ups, chronic congestion, and musty-air headaches are the classic pattern.</p>
          <Link className="more" href="/services/black-mold-removal/">Health risks of black mold<Icon name="arrow" /></Link>
        </div>
        <div className="card reveal" data-delay="1">
          <h3>Structural: What It's Eating</h3>
          <p>Mold digests wood, drywall, and insulation. Left alone, it rots joists and sheathing — turning a $1,500 remediation into a $20,000 rebuild.</p>
          <Link className="more" href="/services/attic-mold-removal/">Attic &amp; structural mold<Icon name="arrow" /></Link>
        </div>
        <div className="card reveal" data-delay="2">
          <h3>Financial: The Cost of Waiting</h3>
          <p>Remediation gets more expensive the longer you wait — and visible mold can stall or kill a home sale at inspection. Buyers walk away from mold they discover.</p>
          <Link className="more" href="/services/mold-inspection-testing/">Protect your home value<Icon name="arrow" /></Link>
        </div>
      </div>
    
      <div className="qa-callout speakable reveal" role="note" aria-label="Question and answer">
        <p className="q">How do I know if mold is making my family sick?</p>
        <p className="a">Watch the pattern: symptoms like congestion, coughing, or headaches that <strong>get worse at home and ease away from home</strong> point to something in your indoor air. Health effects depend on each person's sensitivity — not just the mold type (CDC, 2006). If the pattern fits, an inspection with air testing gives you a definitive answer. <span className="heo">Your house is the experiment — track where symptoms ease.</span><br/><Link className="more" href="/services/mold-inspection-testing/" style={{marginTop:"8px"}}>Get answers with mold testing<Icon name="arrow" /></Link></p>
      </div>
    </div>
  </section>
  );
}

export function MoldTypes() {
  return (
  <section className="block alt" aria-labelledby="types-h">
    <div className="wrap">
      <span className="eyebrow reveal">Identify It</span>
      <h2 id="types-h" className="reveal">What Kind of Mold Is This?</h2>
      <p className="lede reveal"><strong>Honest framing first:</strong> the vast majority of molds are <em>not</em> hazardous, and reactions vary by person — that's the CDC's line, and ours. Below are the six molds US homeowners ask about most. Photos are labeled illustrative until real job photography exists.</p>
    
      <div className="reveal" style={{marginTop:"18px"}}>
      <div className="svg-pan" id="mold-id-pan">
      <MoldIdCards />
      </div>
      <span className="pan-hint"><Icon name="arrow" />Swipe to explore all six</span>
      </div>

      <h3 className="reveal" style={{marginTop:"34px"}}>Comparison Table</h3>
      <div className="table-scroll reveal">
      <table className="cmp" aria-label="Mold types comparison">
        <thead><tr><th>Type</th><th>Where it grows</th><th>Look / smell</th><th>Health note (honest)</th><th>Needs a pro?</th></tr></thead>
        <tbody>
          <tr><td><strong>Cladosporium</strong></td><td>Backs of toilets, painted surfaces, fiberglass ducts, damp carpet</td><td>Black or green, pepper-like</td><td>Nontoxic; watery eyes, sore throat, rashes in sensitive people</td><td className="check">If widespread</td></tr>
          <tr><td><strong>Penicillium</strong></td><td>Wall/ceiling insulation, damp carpet, water-damaged furnishings</td><td>Blue-green, spreads fast</td><td>Lung inflammation, sinus infections, allergy symptoms</td><td className="check">If widespread</td></tr>
          <tr><td><strong>Aspergillus</strong></td><td>Food, AC systems, damp indoor surfaces</td><td>Powdery, various colors</td><td>Allergic reactions, respiratory infections in susceptible people</td><td className="check">If in HVAC</td></tr>
          <tr><td><strong>Alternaria</strong></td><td>Showers, under sinks, after flooding</td><td>Dark, fuzzy</td><td>Hay fever, asthma trigger — severe risk for sensitive asthmatics</td><td className="check">Yes</td></tr>
          <tr><td><strong>Trichoderma</strong></td><td>Moist carpet, behind wallpaper</td><td>Green-white</td><td>Toxins can trigger allergies, sinus infections</td><td className="check">If widespread</td></tr>
          <tr><td><strong>Stachybotrys chartarum</strong> ("black mold")</td><td>Continuously damp areas: under sinks, showers, AC ducts</td><td>Greenish-black, musty odor</td><td>Produces mycotoxins; severe breathing problems, asthma attacks in susceptible people</td><td><strong className="check">Yes — certified</strong></td></tr>
        </tbody>
      </table>
      </div>
      <p className="src-note" style={{marginTop:"10px"}}>Sources: Tennessee Dept. of Health mold facts; Northwestern Medicine "Molds in the Environment"; ACAAI expert panel. Health effects vary by individual sensitivity (CDC, 2006).</p>
      <p><Link className="more" href="/services/black-mold-removal/">Think it's black mold? Here's what certified removal involves<Icon name="arrow" /></Link></p>
    </div>
  </section>
  );
}

export function VsComparison() {
  return (
  <section className="block" aria-labelledby="vs-h">
    <div className="wrap">
      <span className="eyebrow reveal">Why Not Just Hire a Handyman?</span>
      <h2 id="vs-h" className="reveal">Certified Mold Specialist vs. General Contractor</h2>
      <p className="lede reveal">No competitor names, no trash talk — just the honest difference in method. Mold done wrong spreads spores through your whole house.</p>
      <div className="table-scroll reveal" style={{marginTop:"22px"}}>
      <table className="cmp" aria-label="Specialist versus generalist comparison">
        <thead><tr><th></th><th>Certified Mold Specialist</th><th>General Handyman / Contractor</th></tr></thead>
        <tbody>
          <tr><td><strong>Containment protocol</strong></td><td className="check">✓ Sealed barriers + negative air pressure</td><td className="cross">✗ Usually none — spores spread</td></tr>
          <tr><td><strong>HEPA equipment</strong></td><td className="check">✓ HEPA vacuums &amp; air scrubbers</td><td className="cross">✗ Shop-vac at best</td></tr>
          <tr><td><strong>Moisture-source repair</strong></td><td className="check">✓ Finds and fixes the cause</td><td className="cross">✗ Treats the symptom only</td></tr>
          <tr><td><strong>Photo documentation</strong></td><td className="check">✓ Before/during/after, for you &amp; insurers</td><td className="cross">✗ Rarely</td></tr>
          <tr><td><strong>Pricing transparency</strong></td><td className="check">✓ Written scope before work starts</td><td className="cross">✗ "We'll see once we open it up"</td></tr>
          <tr><td><strong>Post-job verification</strong></td><td className="check">✓ Clearance check that it's actually clean</td><td className="cross">✗ "Looks good to me"</td></tr>
        </tbody>
      </table>
      </div>
    
      <div className="grid cols-2 reveal" style={{marginTop:"30px",alignItems:"start"}}>
        <RemovalVsRemediation />
        <div>
          <h3>The bottom line for the smart shopper</h3>
          <p>"Anyone selling just 'removal' is selling half the job." No remediation method works without fixing the moisture source first — that's why the 24–48 hour rule comes before everything else. Ask any contractor these three questions: <em>How do you contain it? How do you fix the moisture? How do you verify it's clean?</em> If they can't answer all three in writing, keep looking.</p>
          <p><Link className="more" href="/process/">See our full 6-step process<Icon name="arrow" /></Link></p>
        </div>
      </div>
    </div>
  </section>
  );
}

export function SeasonCalendarSection() {
  return (
  <section className="block" aria-labelledby="season-h">
    <div className="wrap">
      <span className="eyebrow reveal">Timing Matters</span>
      <h2 id="season-h" className="reveal">The USA Mold Season Calendar</h2>
      <p className="lede reveal">Mold risk moves with the weather. Here's what to check, season by season:</p>
    
      <div className="reveal" style={{marginTop:"16px"}}>
      <SeasonCalendar />
      </div>
    
      <div className="qa-callout speakable reveal" role="note" aria-label="Question and answer">
        <p className="q">How fast does mold grow after a leak?</p>
        <p className="a">Within <strong>24 to 48 hours</strong>, per EPA guidance — that's the germination window, not the "we'll get to it next weekend" window. Dry wet materials inside that window and you usually prevent a colony; miss it and you're looking at remediation instead of a towel. <span className="heo">The clock starts when the water stops, not when you notice.</span><br/><Link className="more" href="/process/" style={{marginTop:"8px"}}>See how fast our process moves<Icon name="arrow" /></Link></p>
      </div>
    </div>
  </section>
  );
}

export function ProcessTeaser() {
  return (
  <section className="block alt" aria-labelledby="process-h">
    <div className="wrap">
      <span className="eyebrow reveal">Our Process</span>
      <h2 id="process-h" className="reveal">From First Call to Verified Clean in 6 Steps</h2>
      <div className="grid cols-3" style={{marginTop:"28px"}}>
        <div className="card reveal"><h3><span className="step-num">1</span>Free Inspection</h3><p>We find every growth site — including the hidden ones — and document everything with photos.</p></div>
        <div className="card reveal" data-delay="1"><h3><span className="step-num">2</span>Testing &amp; Scope</h3><p>Air and surface testing with lab analysis, then a written scope and fixed quote. No surprises.</p></div>
        <div className="card reveal" data-delay="2"><h3><span className="step-num">3</span>Containment</h3><p>Sealed barriers and negative air pressure keep spores from spreading through your home during work.</p></div>
        <div className="card reveal"><h3><span className="step-num">4</span>Removal &amp; Treatment</h3><p>Contaminated materials removed, HEPA vacuuming, antimicrobial treatment of affected surfaces.</p></div>
        <div className="card reveal" data-delay="1"><h3><span className="step-num">5</span>Moisture Fix</h3><p>The step others skip: we fix the leak, ventilation, or drainage issue that caused it — or it comes back.</p></div>
        <div className="card reveal" data-delay="2"><h3><span className="step-num">6</span>Verification</h3><p>Post-job clearance check confirms the space is clean. You get the photo record and documentation.</p></div>
      </div>
    
      <h3 className="reveal" style={{marginTop:"40px"}}>Why Speed Matters: The 24–48 Hour Timeline</h3>
      <div className="reveal">
      <Timeline24h />
      </div>
      <p className="reveal" style={{marginTop:"20px"}}><Link className="btn btn-brand" href="/process/">See the Full Process<Icon name="arrow" /></Link></p>
    </div>
  </section>
  );
}

export function WhyChoose() {
  return (
  <section className="block alt" aria-labelledby="why-h">
    <div className="wrap">
      <span className="eyebrow reveal">Why Us</span>
      <h2 id="why-h" className="reveal">Why Homeowners Choose {siteConfig.brandName}</h2>
      <div className="grid cols-4" style={{marginTop:"28px"}}>
        <div className="card reveal"><div className="card-ic"><Icon name="check" /></div><h3>Transparent Pricing</h3><p>Written scope and fixed quote before work starts. The estimator above uses real 2026 ranges — no bait pricing.</p></div>
        <div className="card reveal" data-delay="1"><div className="card-ic"><Icon name="shield" /></div><h3>We Fix the Cause</h3><p>Removal without a moisture fix is half a job. We address the leak, ventilation, or drainage behind the mold.</p></div>
        <div className="card reveal" data-delay="2"><div className="card-ic"><Icon name="check" /></div><h3>Photo-Documented</h3><p>Before, during, and after — a full photo record for your files and your insurer.</p></div>
        <div className="card reveal" data-delay="3"><div className="card-ic"><Icon name="clock" /></div><h3>Pro-Grade Containment</h3><p>Sealed barriers, negative air pressure, HEPA filtration. Spores don't get a tour of your house.</p></div>
      </div>
    </div>
  </section>
  );
}

export function NotSure() {
  return (
  <section className="block" aria-labelledby="notsure-h">
    <div className="wrap">
      <div className="dark-card reveal">
        <span className="eyebrow">Symptom Checker</span>
        <h2 id="notsure-h">Not Sure It's Mold?</h2>
        <p style={{color:"#cfe3db",maxWidth:"640px"}}>Musty smell with no visible growth? Spots you're not sure about? Our inspection and testing service gives you a lab-backed answer — and a plan if it's positive.</p>
        <div className="cta-row">
          <Link className="btn btn-primary" href="/services/mold-inspection-testing/">How Testing Works<Icon name="arrow" /></Link>
          <a className="btn btn-ghost-light" href={siteConfig.phoneHref}><Icon name="phone" />{siteConfig.phoneDisplay}</a>
        </div>
      </div>
    </div>
  </section>
  );
}
