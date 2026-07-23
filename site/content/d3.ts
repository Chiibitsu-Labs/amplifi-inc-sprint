export const d3Html = `
<div class="cover">
  <div class="eyebrow"><span class="num">03 / 05</span> Deliverable · Architecture</div>
  <h1>AI Ecosystem Architecture Map</h1>
  <p class="dek">What each tool actually does, where AI enters the workflow, and where a human always stays in charge — laid out as one map instead of six separate mental models.</p>
  <div class="cover-meta">
    <span><b>Status</b> v1</span>
    <span><b>Built by</b> Chii / Chiibitsu Labs</span>
  </div>
  <div class="cover-actions">
    <a class="btn btn-primary" href="/pdfs/amplifi-03-architecture-map.pdf" download="amplifi-03-architecture-map.pdf">Download PDF</a>
    <a class="btn btn-ghost" href="/">← Executive overview</a>
  </div>
</div>

<h2>The four layers</h2>
<div class="flow">
  <div class="flow-node"><span class="label">1 · Vault</span><p>The knowledge foundation — client briefs, standards, the corpus. Deliverable 1.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><span class="label">2 · Workflow</span><p>The 12-step path the work actually travels, in the team's own words.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><span class="label">3 · Consistent output</span><p>Lens-produced, standard-checked, on-brand. Deliverable 2.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><span class="label">4 · The instrument</span><p>Reads the whole system to know when it's time to hire. Deliverable 5.</p></div>
</div>

<h2>The real workflow — mapped by the team, on the wall</h2>
<p>Twelve steps, in the analysts' own words — silently mapped by each person, then walked through together in the room. This is the actual cycle, not a generic pipeline.</p>
<div class="wall-grid">
  <div class="wall-card"><span class="n">01</span><span class="step">Brief</span></div>
  <div class="wall-card"><span class="n">02</span><span class="step">Baseline</span></div>
  <div class="wall-card"><span class="n">03</span><span class="step">Internal Alignment</span></div>
  <div class="wall-card"><span class="n">04</span><span class="step">Present</span></div>
  <div class="wall-card"><span class="n">05</span><span class="step">Revisions</span></div>
  <div class="wall-card"><span class="n">06</span><span class="step">Implement</span></div>
  <div class="wall-card"><span class="n">07</span><span class="step">Monthly Analysis</span></div>
  <div class="wall-card"><span class="n">08</span><span class="step">Insights</span></div>
  <div class="wall-card"><span class="n">09</span><span class="step">Report</span></div>
  <div class="wall-card"><span class="n">10</span><span class="step">Internal Alignment</span></div>
  <div class="wall-card"><span class="n">11</span><span class="step">Client Presentation</span></div>
  <div class="wall-card is-repeat"><span class="n">12</span><span class="step">Repeat</span></div>
</div>

<h2>Where AI enters, and where it doesn't</h2>
<div class="grid grid-2">
  <div class="card">
    <h3>AI drafts and checks</h3>
    <p>First-pass writing, and both quality gates. Anywhere the output can be measured against an explicit, written standard.</p>
  </div>
  <div class="card">
    <h3>Humans always own</h3>
    <p>Data gathering, client relationship, final visual assembly, and every ship decision. Nothing ships without a human clearing it — including what the AI-QA gate itself flags.</p>
  </div>
</div>

<h2>Tools, and what they actually do for you</h2>
<div class="table-wrap">
<table>
<thead><tr><th>Tool</th><th>Function</th></tr></thead>
<tbody>
<tr><td>Claude (Enterprise)</td><td>Runs the four skills — onboard, draft, QA, capture</td></tr>
<tr><td>Google Drive</td><td>The vault — corpus storage and shared access</td></tr>
<tr><td>Sentimo + MCP</td><td>Data connection into the drafting step</td></tr>
<tr><td>Canva <span class="tag" style="border-color:var(--flag); color:var(--flag);">fragile</span></td><td>Final visual assembly — flagged below as a named risk</td></tr>
<tr><td>Telegram + capchecker</td><td>Daily capacity check-in — the instrument's first feed</td></tr>
<tr><td>MS Office</td><td>Supporting document work where needed</td></tr>
</tbody>
</table>
</div>

<h2>Four risks, named on purpose</h2>
<ul>
  <li><strong>Canva fragility.</strong> Crashes and access issues are real and already happening. Not replaced in this build — see the Roadmap for why, and what would change that call.</li>
  <li><strong>Supplier and vendor pain.</strong> Real, but a procurement problem, not an AI problem. Explicitly out of Core Build scope.</li>
  <li><strong>Claude usage caps.</strong> A ceiling worth watching as adoption scales past the first client.</li>
  <li><strong>Corpus rot.</strong> A vault that stops getting updated is worse than no vault — this is exactly what the capture loop in Deliverable 1 exists to prevent.</li>
</ul>

<hr class="hr" />
<p class="brand-close">Chiibitsu Labs — more human, by design.</p>

`;
