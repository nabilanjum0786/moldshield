import Link from "next/link";
// Ported from the homepage template — hand-drawn SVG, real figures only.
export function HouseDiagram() {
  return (
    <svg role="img" aria-labelledby="house-title-HouseDiagram house-desc-HouseDiagram" viewBox="0 0 720 460" style={{background:"#fff",border:"1px solid var(--line)",borderRadius:"14px",marginTop:"14px",boxShadow:"var(--shadow-sm)"}}>
      <title id="house-title-HouseDiagram">Where mold hides in a house — diagram</title>
      <desc id="house-desc-HouseDiagram">A house cross-section showing six mold hotspots: attic, behind drywall, under sinks, crawl space, HVAC system, under flooring.</desc>
      <rect x="0" y="0" width="720" height="460" fill="#f2f8f6"/>

      <polygon points="360,40 120,180 120,400 600,400 600,180" fill="#e8f0ed" stroke="#0e7c66" strokeWidth="3"/>
      <rect x="120" y="400" width="480" height="14" fill="#c9d8d2"/>
      <line x1="120" y1="290" x2="600" y2="290" stroke="#0e7c66" strokeWidth="2" strokeDasharray="6 4"/>
      <line x1="360" y1="180" x2="360" y2="400" stroke="#0e7c66" strokeWidth="2" strokeDasharray="6 4"/>

      <text x="360" y="24" textAnchor="middle" fontSize="12" fill="#5c6f68" fontFamily="system-ui,sans-serif">Red = most common · Amber = frequent — tap a number for the right service</text>

      <g fontFamily="system-ui,sans-serif" fontSize="14">
        <Link href="/services/attic-mold-removal/">
          <text x="360" y="80" textAnchor="middle" fontWeight="700" fill="#12261f">Attic</text>
          <text x="360" y="97" textAnchor="middle" fill="#5c6f68" fontSize="12">leaks &amp; poor venting</text>
          <circle cx="360" cy="130" r="24" fill="#b91c1c" opacity="0.85"/><text x="360" y="135" textAnchor="middle" fill="#fff" fontWeight="700">1</text>
        </Link>
        <Link href="/services/basement-mold-removal/">
          <text x="250" y="196" textAnchor="middle" fontWeight="700" fill="#12261f">Behind drywall</text>
          <text x="250" y="213" textAnchor="middle" fill="#5c6f68" fontSize="12">hidden leaks</text>
          <circle cx="250" cy="248" r="24" fill="#b91c1c" opacity="0.85"/><text x="250" y="253" textAnchor="middle" fill="#fff" fontWeight="700">2</text>
        </Link>
        <Link href="/services/basement-mold-removal/">
          <text x="470" y="196" textAnchor="middle" fontWeight="700" fill="#12261f">Under sinks</text>
          <text x="470" y="213" textAnchor="middle" fill="#5c6f68" fontSize="12">slow plumbing drips</text>
          <circle cx="470" cy="248" r="24" fill="#f59e0b" opacity="0.95"/><text x="470" y="253" textAnchor="middle" fill="#231600" fontWeight="700">3</text>
        </Link>
        <Link href="/services/crawl-space-mold-remediation/">
          <text x="250" y="306" textAnchor="middle" fontWeight="700" fill="#12261f">Crawl space</text>
          <text x="250" y="323" textAnchor="middle" fill="#5c6f68" fontSize="12">damp soil, no airflow</text>
          <circle cx="250" cy="354" r="24" fill="#b91c1c" opacity="0.85"/><text x="250" y="359" textAnchor="middle" fill="#fff" fontWeight="700">4</text>
        </Link>
        <Link href="/services/mold-inspection-testing/">
          <text x="470" y="306" textAnchor="middle" fontWeight="700" fill="#12261f">HVAC system</text>
          <text x="470" y="323" textAnchor="middle" fill="#5c6f68" fontSize="12">condensate, ducts</text>
          <circle cx="470" cy="354" r="24" fill="#f59e0b" opacity="0.95"/><text x="470" y="359" textAnchor="middle" fill="#231600" fontWeight="700">5</text>
        </Link>
        <Link href="/services/basement-mold-removal/">
          <text x="360" y="258" textAnchor="middle" fontWeight="700" fill="#12261f">Under flooring</text>
          <text x="360" y="275" textAnchor="middle" fill="#5c6f68" fontSize="12">seepage wicks upward</text>
          <circle cx="360" cy="306" r="24" fill="#f59e0b" opacity="0.95"/><text x="360" y="311" textAnchor="middle" fill="#231600" fontWeight="700">6</text>
        </Link>
      </g>
    </svg>
  );
}
