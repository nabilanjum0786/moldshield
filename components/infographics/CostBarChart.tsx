// Ported from the homepage template — hand-drawn SVG, real figures only.
export function CostBarChart() {
  return (
    <svg role="img" aria-labelledby="cost-title-CostBarChart cost-desc-CostBarChart" viewBox="0 0 720 400" style={{background:"#fff",border:"1px solid var(--line)",borderRadius:"14px",marginTop:"10px",boxShadow:"var(--shadow-sm)"}}>
      <title id="cost-title-CostBarChart">Mold remediation cost by location — bar chart</title>
      <desc id="cost-desc-CostBarChart">Bar chart of 2026 HomeAdvisor cost ranges: bathroom $500–$1,000, crawl space $500–$2,000, basement $500–$3,000, attic $1,000–$4,000, drywall $1,000–$20,000, HVAC $3,000–$10,000, whole house $10,000–$30,000.</desc>
      <text x="360" y="30" textAnchor="middle" fontSize="17" fontWeight="700" fill="#12261f" fontFamily="system-ui,sans-serif">Mold remediation cost by location (2026)</text>
      <text x="360" y="50" textAnchor="middle" fontSize="12" fill="#5c6f68" fontFamily="system-ui,sans-serif">Source: HomeAdvisor 2026 · bars show typical range</text>
      <g fontFamily="system-ui,sans-serif" fontSize="12">
        <text x="150" y="95" textAnchor="end" fill="#12261f">Bathroom</text><rect x="160" y="82" width="18" height="14" rx="7" fill="#0e7c66"/><text x="186" y="95" fill="#5c6f68">$500–$1,000</text>
        <text x="150" y="125" textAnchor="end" fill="#12261f">Crawl space</text><rect x="160" y="112" width="36" height="14" rx="7" fill="#0e7c66"/><text x="204" y="125" fill="#5c6f68">$500–$2,000</text>
        <text x="150" y="155" textAnchor="end" fill="#12261f">Basement</text><rect x="160" y="142" width="55" height="14" rx="7" fill="#0e7c66"/><text x="223" y="155" fill="#5c6f68">$500–$3,000</text>
        <text x="150" y="185" textAnchor="end" fill="#12261f">Attic</text><rect x="160" y="172" width="73" height="14" rx="7" fill="#0e7c66"/><text x="241" y="185" fill="#5c6f68">$1,000–$4,000</text>
        <text x="150" y="215" textAnchor="end" fill="#12261f">Drywall / walls</text><rect x="160" y="202" width="364" height="14" rx="7" fill="#f59e0b"/><text x="532" y="215" fill="#5c6f68">$1,000–$20,000</text>
        <text x="150" y="245" textAnchor="end" fill="#12261f">HVAC system</text><rect x="160" y="232" width="182" height="14" rx="7" fill="#f59e0b"/><text x="350" y="245" fill="#5c6f68">$3,000–$10,000</text>
        <text x="150" y="275" textAnchor="end" fill="#12261f">Whole house</text><rect x="160" y="262" width="545" height="14" rx="7" fill="#b91c1c"/><text x="160" y="292" fill="#5c6f68">$10,000–$30,000</text>
      </g>
      <line x1="160" y1="310" x2="705" y2="310" stroke="#dfe9e5" strokeWidth="1"/>
      <text x="360" y="332" textAnchor="middle" fontSize="12" fill="#5c6f68" fontFamily="system-ui,sans-serif">National average job: ~$2,368 · most jobs $10–$25/sq ft (HomeAdvisor 2026)</text>
      <text x="360" y="352" textAnchor="middle" fontSize="12" fill="#5c6f68" fontFamily="system-ui,sans-serif">Inspection $303–$1,075 · testing $250–$500 (Angi 2026)</text>
      <text x="360" y="380" textAnchor="middle" fontSize="11" fill="#8aa39b" fontFamily="system-ui,sans-serif">Alt text carries the numbers for screen readers and AI search.</text>
    </svg>
  );
}
