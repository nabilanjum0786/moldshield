// Ported from the homepage template — hand-drawn SVG, real figures only.
export function RemovalVsRemediation() {
  return (
    <svg role="img" aria-labelledby="rvr-title-RemovalVsRemediation rvr-desc-RemovalVsRemediation" viewBox="0 0 340 300" style={{background:"#fff",border:"1px solid var(--line)",borderRadius:"14px",boxShadow:"var(--shadow-sm)"}}>
        <title id="rvr-title-RemovalVsRemediation">Mold removal versus mold remediation</title>
        <desc id="rvr-desc-RemovalVsRemediation">Two-column graphic: removal cleans visible mold only; remediation adds containment, moisture fix, and verification. Anyone selling just removal is selling half the job.</desc>
        <text x="170" y="28" textAnchor="middle" fontSize="15" fontWeight="700" fill="#12261f" fontFamily="system-ui,sans-serif">Removal vs. Remediation</text>
        <rect x="12" y="44" width="152" height="220" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
        <text x="88" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400e" fontFamily="system-ui,sans-serif">"Mold removal"</text>
        <g fontFamily="system-ui,sans-serif" fontSize="11.5" fill="#57534e">
          <text x="88" y="104" textAnchor="middle">Cleans what's</text><text x="88" y="122" textAnchor="middle">visible</text>
          <text x="88" y="152" textAnchor="middle">No containment</text>
          <text x="88" y="182" textAnchor="middle">Moisture source</text><text x="88" y="200" textAnchor="middle">untouched</text>
          <text x="88" y="230" textAnchor="middle" fontWeight="700" fill="#b91c1c">Mold comes back</text>
        </g>
        <rect x="176" y="44" width="152" height="220" rx="10" fill="#e2f3ee" stroke="#0e7c66" strokeWidth="2"/>
        <text x="252" y="72" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0a5f4e" fontFamily="system-ui,sans-serif">Remediation ✓</text>
        <g fontFamily="system-ui,sans-serif" fontSize="11.5" fill="#334155">
          <text x="252" y="104" textAnchor="middle">Containment +</text><text x="252" y="122" textAnchor="middle">HEPA filtration</text>
          <text x="252" y="152" textAnchor="middle">Removes growth +</text><text x="252" y="170" textAnchor="middle">treats surfaces</text>
          <text x="252" y="200" textAnchor="middle">Fixes moisture</text><text x="252" y="218" textAnchor="middle">source first</text>
          <text x="252" y="248" textAnchor="middle" fontWeight="700" fill="#0a5f4e">Verified clean</text>
        </g>
      </svg>
  );
}
