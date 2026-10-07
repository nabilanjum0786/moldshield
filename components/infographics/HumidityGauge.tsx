// Ported from the homepage template — hand-drawn SVG, real figures only.
export function HumidityGauge() {
  return (
    <svg role="img" aria-labelledby="hum-title-HumidityGauge hum-desc-HumidityGauge" viewBox="0 0 360 245" style={{background:"#fff",border:"1px solid var(--line)",borderRadius:"14px",boxShadow:"var(--shadow-sm)"}}>
        <title id="hum-title-HumidityGauge">Indoor humidity gauge</title>
        <desc id="hum-desc-HumidityGauge">Gauge showing 30 to 50 percent as the safe zone and 60 percent plus as the mold danger zone, per EPA guidance.</desc>
        <text x="180" y="26" textAnchor="middle" fontSize="15" fontWeight="700" fill="#12261f" fontFamily="system-ui,sans-serif">Indoor Humidity (EPA guidance)</text>
        <path d="M40 190 A130 130 0 0 1 320 190" fill="none" stroke="#e4ebe9" strokeWidth="26" strokeLinecap="round"/>
        <path d="M40 190 A130 130 0 0 1 173 64" fill="none" stroke="#0e7c66" strokeWidth="26" strokeLinecap="round"/>
        <path d="M173 64 A130 130 0 0 1 225 78" fill="none" stroke="#f59e0b" strokeWidth="26" strokeLinecap="round"/>
        <path d="M225 78 A130 130 0 0 1 320 190" fill="none" stroke="#b91c1c" strokeWidth="26" strokeLinecap="round"/>
        <g fontFamily="system-ui,sans-serif" fontSize="12" fill="#12261f">
          <text x="52" y="220" textAnchor="middle">30%</text>
          <text x="300" y="220" textAnchor="middle" fontWeight="700" fill="#b91c1c">DANGER</text>
        </g>
        <g fontFamily="system-ui,sans-serif" fontSize="12" fill="#12261f">
          <text x="136" y="112" textAnchor="middle" fontWeight="700">30–50% SAFE</text>
          <text x="238" y="112" textAnchor="middle">60%</text>
        </g>
        <text x="180" y="162" textAnchor="middle" fontSize="13" fill="#5c6f68" fontFamily="system-ui,sans-serif">Dry wet materials</text>
        <text x="180" y="180" textAnchor="middle" fontSize="13" fill="#5c6f68" fontFamily="system-ui,sans-serif">within 24–48 hours</text>
      </svg>
  );
}
