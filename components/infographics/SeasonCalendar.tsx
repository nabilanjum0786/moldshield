// Ported from the homepage template — hand-drawn SVG, real figures only.
export function SeasonCalendar() {
  return (
    <svg role="img" aria-labelledby="seas-title-SeasonCalendar seas-desc-SeasonCalendar" viewBox="0 0 720 300" style={{background:"#fff",border:"1px solid var(--line)",borderRadius:"14px",boxShadow:"var(--shadow-sm)"}}>
      <title id="seas-title-SeasonCalendar">Seasonal mold risk calendar</title>
      <desc id="seas-desc-SeasonCalendar">Four-season calendar: winter — ice dams, condensation, pipe bursts; spring — flooding, snowmelt seepage; summer — humidity, AC condensate; fall — leaf-clogged gutters, pre-winter leaks.</desc>
      <g fontFamily="system-ui,sans-serif">
        <g>
          <rect x="14" y="20" width="162" height="260" rx="12" fill="#dbeafe"/>
          <g stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round"><line x1="95" y1="44" x2="95" y2="64"/><line x1="85" y1="54" x2="105" y2="54"/><line x1="88" y1="47" x2="102" y2="61"/><line x1="102" y1="47" x2="88" y2="61"/></g>
          <text x="95" y="86" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1e3a8a">Winter</text>
          <text x="95" y="116" textAnchor="middle" fontSize="12" fill="#334155">Ice dams</text><text x="95" y="138" textAnchor="middle" fontSize="12" fill="#334155">Condensation</text><text x="95" y="160" textAnchor="middle" fontSize="12" fill="#334155">Pipe bursts</text>
          <text x="95" y="196" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="700">Check: attic for</text><text x="95" y="214" textAnchor="middle" fontSize="11" fill="#1e40af" fontWeight="700">frost &amp; drips</text>
          <text x="95" y="252" textAnchor="middle" fontSize="11" fill="#64748b">Risk: HIGH</text>
        </g>
        <g>
          <rect x="190" y="20" width="162" height="260" rx="12" fill="#dcfce7"/>
          <g fill="none" stroke="#14532d" strokeWidth="2"><circle cx="271" cy="52" r="6"/><circle cx="259" cy="52" r="6"/><circle cx="283" cy="52" r="6"/><circle cx="271" cy="42" r="6"/><circle cx="271" cy="62" r="6"/><circle cx="271" cy="52" r="2.5" fill="#14532d"/></g>
          <text x="271" y="86" textAnchor="middle" fontSize="16" fontWeight="700" fill="#14532d">Spring</text>
          <text x="271" y="116" textAnchor="middle" fontSize="12" fill="#334155">Flooding</text><text x="271" y="138" textAnchor="middle" fontSize="12" fill="#334155">Snowmelt seepage</text><text x="271" y="160" textAnchor="middle" fontSize="12" fill="#334155">Foundation leaks</text>
          <text x="271" y="196" textAnchor="middle" fontSize="11" fill="#166534" fontWeight="700">Check: basement</text><text x="271" y="214" textAnchor="middle" fontSize="11" fill="#166534" fontWeight="700">walls after rain</text>
          <text x="271" y="252" textAnchor="middle" fontSize="11" fill="#64748b">Risk: HIGH</text>
        </g>
        <g>
          <rect x="366" y="20" width="162" height="260" rx="12" fill="#fef3c7"/>
          <g stroke="#92400e" strokeWidth="2" strokeLinecap="round"><circle cx="447" cy="54" r="9" fill="none"/><line x1="447" y1="38" x2="447" y2="32"/><line x1="447" y1="76" x2="447" y2="70"/><line x1="431" y1="54" x2="425" y2="54"/><line x1="469" y1="54" x2="463" y2="54"/><line x1="436" y1="43" x2="432" y2="39"/><line x1="462" y1="65" x2="458" y2="69"/><line x1="458" y1="43" x2="462" y2="39"/><line x1="432" y1="65" x2="436" y2="69"/></g>
          <text x="447" y="86" textAnchor="middle" fontSize="16" fontWeight="700" fill="#92400e">Summer</text>
          <text x="447" y="116" textAnchor="middle" fontSize="12" fill="#334155">Humidity spikes</text><text x="447" y="138" textAnchor="middle" fontSize="12" fill="#334155">AC condensate</text><text x="447" y="160" textAnchor="middle" fontSize="12" fill="#334155">Storm damage</text>
          <text x="447" y="196" textAnchor="middle" fontSize="11" fill="#b45309" fontWeight="700">Check: humidity</text><text x="447" y="214" textAnchor="middle" fontSize="11" fill="#b45309" fontWeight="700">stays under 60%</text>
          <text x="447" y="252" textAnchor="middle" fontSize="11" fill="#64748b">Risk: PEAK</text>
        </g>
        <g>
          <rect x="542" y="20" width="162" height="260" rx="12" fill="#ffedd5"/>
          <g><ellipse cx="623" cy="54" rx="7" ry="11" fill="none" stroke="#9a3412" strokeWidth="2" transform="rotate(24 623 54)"/><line x1="623" y1="65" x2="623" y2="72" stroke="#9a3412" strokeWidth="2"/></g>
          <text x="623" y="86" textAnchor="middle" fontSize="16" fontWeight="700" fill="#9a3412">Fall</text>
          <text x="623" y="116" textAnchor="middle" fontSize="12" fill="#334155">Clogged gutters</text><text x="623" y="138" textAnchor="middle" fontSize="12" fill="#334155">Pre-winter leaks</text><text x="623" y="160" textAnchor="middle" fontSize="12" fill="#334155">Leaf dams</text>
          <text x="623" y="196" textAnchor="middle" fontSize="11" fill="#c2410c" fontWeight="700">Check: roof &amp;</text><text x="623" y="214" textAnchor="middle" fontSize="11" fill="#c2410c" fontWeight="700">gutters pre-winter</text>
          <text x="623" y="252" textAnchor="middle" fontSize="11" fill="#64748b">Risk: MODERATE</text>
        </g>
      </g>
    </svg>
  );
}
