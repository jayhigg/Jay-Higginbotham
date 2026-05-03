export function generateProjectImage(id: number, type: string, title: string): string {
  const colors = [
    { bg: '#EAE1D3', fg: '#2C3E50', border: '#D5C4A1' }, // Vintage Tan
    { bg: '#2C3E50', fg: '#EAE1D3', border: '#1A252F' }, // Navy
    { bg: '#D35400', fg: '#FFFFFF', border: '#A04000' }, // Orange
    { bg: '#27AE60', fg: '#FFFFFF', border: '#1E8449' }, // Green
    { bg: '#F1C40F', fg: '#2C3E50', border: '#D4AC0D' }, // Yellow
    { bg: '#8E44AD', fg: '#FFFFFF', border: '#732D91' }, // Purple
    { bg: '#C0392B', fg: '#FFFFFF', border: '#922B21' }, // Red
  ];
  
  const c = colors[id % colors.length];
  let svg = '';
  const textChars = title.substring(0, 2).toUpperCase();

  if (type === 'hat') {
    svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 160" width="100%" height="100%">
        <!-- Hat Crown -->
        <path d="M40 90 C 40 40, 160 40, 160 90 Z" fill="${c.bg}" stroke="${c.border}" stroke-width="4" stroke-linejoin="round"/>
        <!-- Hat Brim -->
        <path d="M20 90 C 20 80, 180 80, 180 90 C 180 110, 20 110, 20 90 Z" fill="${c.border}" />
        <!-- Top Button -->
        <circle cx="100" cy="42" r="6" fill="${c.border}"/>
        <!-- Front Patch -->
        <rect x="75" y="60" width="50" height="25" rx="4" fill="${c.fg}" opacity="0.9"/>
        <text x="100" y="77" font-family="sans-serif" font-weight="bold" font-size="12" fill="${c.bg}" text-anchor="middle">${textChars}</text>
      </svg>
    `;
  } else if (type === 'sketch') {
    svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
        <rect x="20" y="20" width="160" height="160" fill="#FDFBF7" stroke="#E2DED0" stroke-width="2" rx="4" transform="rotate(${id % 2 === 0 ? '-2' : '3'} 100 100)"/>
        <path d="M 40 60 Q 80 40, 120 70 T 160 50 M 50 100 Q 100 120, 150 90 M 60 140 Q 90 160, 140 130" fill="none" stroke="${c.bg}" stroke-width="3" stroke-linecap="round" />
        <circle cx="60" cy="60" r="15" fill="none" stroke="${c.fg}" stroke-width="2"/>
        <rect x="120" y="110" width="30" height="30" fill="none" stroke="${c.border}" stroke-width="2" transform="rotate(15 135 125)"/>
        <text x="100" y="180" font-family="monospace" font-size="10" fill="#A0A0A0" text-anchor="middle">SKETCH_${id}</text>
      </svg>
    `;
  } else {
    // Patch
    const shape = id % 3;
    let baseShape = '';
    
    if (shape === 0) { // Circle
      baseShape = `<circle cx="100" cy="100" r="80" fill="${c.bg}" stroke="${c.border}" stroke-width="6" stroke-dasharray="4 4" />`;
    } else if (shape === 1) { // Shield
      baseShape = `<path d="M 40 40 L 160 40 L 160 100 C 160 150, 100 180, 100 180 C 100 180, 40 150, 40 100 Z" fill="${c.bg}" stroke="${c.border}" stroke-width="6" stroke-dasharray="4 4" stroke-linejoin="round"/>`;
    } else { // Rectangle/Diamond
      baseShape = `<rect x="30" y="50" width="140" height="100" rx="12" fill="${c.bg}" stroke="${c.border}" stroke-width="6" stroke-dasharray="4 4" />`;
    }

    svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
        <!-- Drop Shadow -->
        <filter id="shadow${id}">
          <feDropShadow dx="2" dy="6" stdDeviation="4" flood-opacity="0.3"/>
        </filter>
        <g filter="url(#shadow${id})">
          ${baseShape}
          <circle cx="100" cy="100" r="60" fill="none" stroke="${c.fg}" stroke-width="2" opacity="0.3"/>
          <text x="100" y="115" font-family="sans-serif" font-weight="900" font-size="40" fill="${c.fg}" text-anchor="middle" letter-spacing="-2">${textChars}</text>
          <text x="100" y="160" font-family="sans-serif" font-size="12" font-weight="bold" fill="${c.fg}" text-anchor="middle" letter-spacing="2" opacity="0.7">EST. ${2020 + (id % 5)}</text>
        </g>
      </svg>
    `;
  }

  // Encode for data URI
  const encodedSvg = encodeURIComponent(svg.trim().replace(/\s+/g, ' '));
  return `data:image/svg+xml;utf8,${encodedSvg}`;
}
