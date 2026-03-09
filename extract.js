const fs = require('fs');
const html = fs.readFileSync('../axiom-marketplace.html', 'utf8');
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (styleMatch) {
    let css = styleMatch[1];
    // Add our new manifesto styles
    css += `
  /* MANIFESTO */
  .manifesto-section {
    padding: 120px 48px;
    border-bottom: 1px solid var(--gray-200);
    background: var(--ink);
    color: var(--white);
  }
  .manifesto-header {
    text-align: center;
    margin-bottom: 64px;
  }
  .manifesto-tag {
    font-family: 'DM Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gray-400);
    margin-bottom: 32px;
    display: flex; align-items: center; justify-content: center; gap: 12px;
  }
  .manifesto-tag::before, .manifesto-tag::after {
    content: '';
    display: inline-block;
    width: 24px; height: 1px;
    background: var(--gray-400);
  }
  .manifesto-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(40px, 5vw, 72px);
    font-weight: 900;
    line-height: 1.1;
  }
  .manifesto-title em {
    font-style: italic;
    font-weight: normal;
  }
  .manifesto-content {
    max-width: 900px;
    margin: 0 auto;
    column-count: 2;
    column-gap: 48px;
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    font-size: 18px;
    line-height: 1.7;
    color: var(--gray-200);
  }
  .manifesto-content p {
    margin-bottom: 24px;
  }
  .manifesto-content p.dropcap::first-letter {
    font-family: 'Playfair Display', serif;
    font-size: 64px;
    font-weight: 900;
    float: left;
    margin-right: 12px;
    margin-top: 4px;
    line-height: 1;
  }
  .manifesto-content h3 {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    font-size: 24px;
    color: var(--white);
    margin-top: 48px;
    margin-bottom: 24px;
    break-inside: avoid;
  }
  .manifesto-box {
    padding: 24px;
    border: 1px solid rgba(255,255,255,0.2);
    background: rgba(255,255,255,0.05);
    font-family: 'DM Mono', monospace;
    font-size: 14px;
    letter-spacing: 0.1em;
    text-align: center;
    margin: 24px 0 32px;
    break-inside: avoid;
  }
  .manifesto-actions {
    margin-top: 80px;
    padding-top: 48px;
    border-top: 1px solid rgba(255,255,255,0.1);
    text-align: center;
  }
  @media (max-width: 768px) {
    .manifesto-section { padding: 80px 24px; }
    .manifesto-content { column-count: 1; font-size: 16px; }
  }
  `;
    fs.writeFileSync('src/app/globals.css', css);
    console.log("CSS Extracted successfully.");
} else {
    console.log("No style tag found.");
}
