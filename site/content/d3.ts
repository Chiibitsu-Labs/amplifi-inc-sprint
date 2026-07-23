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
  <div class="flow-node"><span class="label">1 · Knowledge base</span><p>The knowledge foundation — client briefs, standards, the whole KB. Deliverable 1.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><span class="label">2 · Workflow</span><p>The 12-step path the work actually travels, in the team's own words.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><span class="label">3 · Consistent output</span><p>Lens-produced, standard-checked, on-brand. Deliverable 2.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><span class="label">4 · The instrument</span><p>Reads the whole system to know when it's time to hire. Deliverable 5.</p></div>
</div>

<h2>The real workflow — mapped by the team, on the wall</h2>
<p>Twelve steps, in the analysts' own words — silently mapped by each person, then walked through together in the room. Under each step, the pain your team pinned to it that day, in red. This is the map of where it hurts, and where to look when something's slow.</p>
<div class="wall-grid">
  <div class="wall-card"><span class="n">01</span><span class="step">Brief</span><span class="pain">Late, incomplete briefs; the same questions asked every cycle</span></div>
  <div class="wall-card"><span class="n">02</span><span class="step">Baseline</span><span class="pain">Custom asks from the client, handled from scratch each time</span></div>
  <div class="wall-card"><span class="n">03</span><span class="step">Internal Alignment</span><span class="pain">Report drifting from the brief; no master doc to align against</span></div>
  <div class="wall-card"><span class="n">04</span><span class="step">Present</span><span class="pain">Client context scattered across past decks and heads</span></div>
  <div class="wall-card"><span class="n">05</span><span class="step">Revisions</span><span class="pain">Rounds repeat because the correction never gets written down</span></div>
  <div class="wall-card"><span class="n">06</span><span class="step">Implement</span><span class="pain">Supplier dependency — late replies, late samples, slow updates</span></div>
  <div class="wall-card"><span class="n">07</span><span class="step">Monthly Analysis</span><span class="pain">Long queue for data pulling; tool limits mid-analysis</span></div>
  <div class="wall-card"><span class="n">08</span><span class="step">Insights</span><span class="pain">Reports not evolving; no actionable recommendations</span></div>
  <div class="wall-card"><span class="n">09</span><span class="step">Report</span><span class="pain">AI slop, hallucination, templates off-brand</span></div>
  <div class="wall-card"><span class="n">10</span><span class="step">Internal Alignment</span><span class="pain">Alignment scheduled late, after the work is already done</span></div>
  <div class="wall-card"><span class="n">11</span><span class="step">Client Presentation</span><span class="pain">Manual polish so the deck "doesn't look AI"</span></div>
  <div class="wall-card is-repeat"><span class="n">12</span><span class="step">Repeat</span><span class="pain">Lessons from this cycle don't carry into the next</span></div>
</div>

<h2>The pains that span the whole workflow</h2>
<p>Some pains don't live at one step — they run across the cycle. These are the six themes your team's sticky notes grouped into, and where each one gets answered.</p>
<div class="grid grid-2">
  <div class="signal-card"><p class="q">Brief &amp; input quality</p><p class="a">Answered by the client FAQ and living brief in the knowledge base → <a href="/deliverable/1">D1</a></p></div>
  <div class="signal-card"><p class="q">Alignment gaps</p><p class="a">Answered by one written standard everyone reads → <a href="/deliverable/1">D1</a> + <a href="/deliverable/2">D2</a></p></div>
  <div class="signal-card"><p class="q">AI output quality</p><p class="a">Answered by the encoded standard and two quality checks → <a href="/deliverable/2">D2</a></p></div>
  <div class="signal-card"><p class="q">Data &amp; pulling bottlenecks</p><p class="a">Named as the first automation candidate once the data confirms it → <a href="/deliverable/4">Roadmap</a></p></div>
  <div class="signal-card"><p class="q">Insight that doesn't compound</p><p class="a">Answered by the insight log that accumulates per client → <a href="/deliverable/1">D1</a></p></div>
  <div class="signal-card"><p class="q">Supplier dependency</p><p class="a">Out of AI scope on purpose — parked as Michele's process track → <a href="/deliverable/4">Roadmap</a></p></div>
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
<tr><td>Google Drive</td><td>The vault — where your knowledge base lives and everyone reaches it</td></tr>
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
  <li><strong>A knowledge base that goes stale.</strong> A vault that stops getting updated is worse than no vault — this is exactly what the capture loop in Deliverable 1 exists to prevent.</li>
</ul>

<hr class="hr" />
<p class="brand-close">Chiibitsu Labs — more human, by design.</p>
<p class="attribution">Prepared by Angeline &ldquo;Chii&rdquo; Viray — <a href="https://linkedin.com/in/angelinev" target="_blank" rel="noopener">LinkedIn</a> · <a href="mailto:labs@chiibitsu.com">labs@chiibitsu.com</a> · Viber/WhatsApp +63 924 113 1973 · @chiibitsulabs</p>

`;
