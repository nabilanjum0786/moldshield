// Ported from the homepage template — hand-drawn SVG, real figures only.
export function Timeline24h() {
  return (
    <svg role="img" aria-labelledby="tl-title-Timeline24h tl-desc-Timeline24h" viewBox="0 0 720 220" style={{background:"#fff",border:"1px solid var(--line)",borderRadius:"14px",marginTop:"10px",boxShadow:"var(--shadow-sm)"}}>
      <title id="tl-title-Timeline24h">Mold growth timeline after water damage</title>
      <desc id="tl-desc-Timeline24h">Timeline: hour 0 water event; 24–48 hours germination window (act now); 48–72 hours visible colony forming; 1 week plus established infestation needing professional remediation. Data: EPA 24–48 hour rule.</desc>
      <line x1="40" y1="110" x2="680" y2="110" stroke="#dfe9e5" strokeWidth="6" strokeLinecap="round"/>
      <g fontFamily="system-ui,sans-serif" fontSize="12">
        <circle cx="80" cy="110" r="16" fill="#0e7c66"/><text x="80" y="145" textAnchor="middle" fontWeight="700" fill="#12261f">Hour 0</text><text x="80" y="162" textAnchor="middle" fill="#5c6f68">Water event</text><text x="80" y="80" textAnchor="middle" fill="#0a5f4e" fontWeight="700">DRY IT</text>
        <circle cx="260" cy="110" r="16" fill="#f59e0b"/><text x="260" y="145" textAnchor="middle" fontWeight="700" fill="#12261f">24–48 hrs</text><text x="260" y="162" textAnchor="middle" fill="#5c6f68">Germination window</text><text x="260" y="80" textAnchor="middle" fill="#92400e" fontWeight="700">ACT NOW</text>
        <circle cx="450" cy="110" r="16" fill="#b45309"/><text x="450" y="145" textAnchor="middle" fontWeight="700" fill="#12261f">48–72 hrs</text><text x="450" y="162" textAnchor="middle" fill="#5c6f68">Visible colony forms</text><text x="450" y="80" textAnchor="middle" fill="#9a3412" fontWeight="700">CALL A PRO</text>
        <circle cx="630" cy="110" r="16" fill="#b91c1c"/><text x="630" y="145" textAnchor="middle" fontWeight="700" fill="#12261f">1 week+</text><text x="630" y="162" textAnchor="middle" fill="#5c6f68">Established infestation</text><text x="630" y="80" textAnchor="middle" fill="#b91c1c" fontWeight="700">REMEDIATION</text>
      </g>
      <text x="360" y="200" textAnchor="middle" fontSize="12" fill="#5c6f68" fontFamily="system-ui,sans-serif">Data: EPA 24–48 hour rule — dry wet materials within this window to prevent growth.</text>
    </svg>
  );
}
