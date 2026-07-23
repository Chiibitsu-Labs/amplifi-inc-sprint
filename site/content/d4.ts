export const d4Html = `
<div class="cover">
  <div class="eyebrow"><span class="num">04 / 05</span> Deliverable · Roadmap</div>
  <h1>Prioritized Implementation Roadmap</h1>
  <p class="dek">What happens after the sprint, in order — sequenced by biggest pain, easiest win, first. Exact dates are set with Michele; the order is the deliverable.</p>
  <div class="cover-meta">
    <span><b>Shape</b> Three phases: start, build, keep</span>
    <span><b>Owners</b> Named on every step</span>
  </div>
  <div class="cover-actions">
    <a class="btn btn-primary" href="/pdfs/amplifi-04-roadmap.pdf" download="amplifi-04-roadmap.pdf">Download PDF</a>
    <a class="btn btn-ghost" href="/">← Executive overview</a>
  </div>
</div>

<blockquote class="pull">The 90-day bar: “consistent quality, no AI slop, reports aligned with branding, evolving insights as data points of a client accumulate over time.” Every step below serves that sentence.
  <cite>Michele Curran, COO</cite>
</blockquote>

<h2>The path, at a glance</h2>
<div class="phasebar">
  <div class="phase-seg is-now"><span class="pn">Phase 1</span><span class="pt">Get everyone set up</span><span class="pd">First weeks</span></div>
  <div class="phase-seg"><span class="pn">Phase 2</span><span class="pt">Add the checks &amp; the hire signal</span><span class="pd">Following months</span></div>
  <div class="phase-seg"><span class="pn">Phase 3</span><span class="pt">Keep it alive</span><span class="pd">Ongoing, no end date</span></div>
</div>

<h2>Phase 1 — Get everyone set up</h2>
<p>The knowledge base goes live and the whole team starts working through it. Low effort, high relief.</p>
<div class="table-wrap">
<table>
<thead><tr><th>What happens</th><th>Who</th></tr></thead>
<tbody>
<tr><td>Put the shared knowledge base in the team's Drive, everyone gets access</td><td class="owner">Michele</td></tr>
<tr><td>Each analyst does a one-time setup with Claude — it installs the tools and builds their standards from their own best past work</td><td class="owner">Every analyst</td></tr>
<tr><td>Set up a client's folder the first time you do real work for them — brief, brand notes, and what's happened with them so far, in one place</td><td class="owner">The analyst on that client</td></tr>
<tr><td>Start tracking every report as it moves — one quick line when it starts, when it ships, when the client signs off</td><td class="owner">The whole team</td></tr>
</tbody>
</table>
</div>
<div class="callout"><b>You'll know Phase 1 worked when</b> an analyst can produce a report to the Amplifi standard without re-explaining the brand or the client to the AI every time. If they still have to, something's missing from the knowledge base — add it, and it's fixed for everyone.</div>

<h2>Phase 2 — Add the checks and the hire signal</h2>
<p>Now the system starts watching its own quality and its own capacity.</p>
<div class="table-wrap">
<table>
<thead><tr><th>What happens</th><th>Who</th></tr></thead>
<tbody>
<tr><td>The quality checks become a habit: analysts run the AI check on every draft, and once more on the finished report before it goes to the client. Rica makes it the team routine; Chii tunes the check whenever it misses something or flags too much</td><td class="owner">Rica (routine) · Chii (tuning)</td></tr>
<tr><td>Walk the when-to-hire signal by hand for the first time, together — Michele sets the first-pass "when does this feel like too much" lines</td><td class="owner">Michele + Chii</td></tr>
<tr><td>Add the report-level feed to the capacity checker, so Michele sees cycle time, on-time rate, and revision rounds in the same place as daily load</td><td class="owner">Chii</td></tr>
<tr><td>Once the capacity checker is working as intended, move it onto Amplifi's own accounts and domain — with a step-by-step migration guide. It was always yours to keep</td><td class="owner">Chii + your IT</td></tr>
<tr><td>Take the team's single biggest recurring time-sink (likely the data-pulling queue) and automate it</td><td class="owner">Chii + Michele pick it</td></tr>
<tr><td>90-day review — sit down against the original five goals and see what's true</td><td class="owner">Michele + Chii</td></tr>
</tbody>
</table>
</div>

<h2>Phase 3 — Keep it alive</h2>
<p>The rhythms that stop this from going stale. None of them is a new job — they ride along on work already happening.</p>
<div class="table-wrap">
<table>
<thead><tr><th>How often</th><th>What happens</th></tr></thead>
<tbody>
<tr><td class="owner">Every day</td><td>Three-tap check-in on how loaded everyone feels; a short summary lands with Michele each morning</td></tr>
<tr><td class="owner">Every report</td><td>Three quick notes per report: one when work starts, one when it's sent to the client, one when the client approves. Under two minutes total — and it's what makes the when-to-hire signal real</td></tr>
<tr><td class="owner">Every week</td><td>A short pass that gathers what the team learned that week and files it into the knowledge base, so it keeps getting smarter</td></tr>
<tr><td class="owner">Every month</td><td>Michele walks the when-to-hire signal and notes the call</td></tr>
<tr><td class="owner">Every quarter</td><td>Re-tune the alert thresholds — the numbers that decide when the dashboard flags "overloaded" or "off-track" — against what actually happened; check the knowledge base is still healthy</td></tr>
</tbody>
</table>
</div>

<h2>Not in this build — and when to come back for it</h2>
<p>Kept out on purpose, to keep this focused on the analyst function. Each one is a real next step when the need shows up.</p>
<div class="table-wrap">
<table>
<thead><tr><th>Not now</th><th>Why it's parked</th><th>Worth doing when…</th></tr></thead>
<tbody>
<tr><td>Move the knowledge base to GitHub</td><td>Waiting on IT to clear access</td><td>Access clears — it's a copy-paste, not a rebuild</td></tr>
<tr><td>Same system for Marketing &amp; Product</td><td>This engagement is the analyst function only</td><td>You want the other functions on the same footing — a natural next engagement</td></tr>
<tr><td>Fixing supplier &amp; vendor delays</td><td>Real pain, but it's a supplier-management problem, not an AI one</td><td>Michele wants it run as its own track</td></tr>
<tr><td>Replacing Canva</td><td>Bigger decision than this build; nothing here is locked to it</td><td>Canva crashes still dominate after Phase 2</td></tr>
<tr><td>A proper database behind the tracking</td><td>The lightweight version does the job today</td><td>The team grows enough that people start colliding on the same files</td></tr>
</tbody>
</table>
</div>
<div class="callout"><b>When any of these becomes real:</b> each one is a scoped build with Chiibitsu Labs — priced per project, sequenced by your own data, on the same playbook as this sprint. The ongoing rhythms above are what a retainer covers. Say the word and it gets a plan.</div>

<h2>The original five goals</h2>
<p>Checked at the 90-day review — the <a href="/">executive overview</a> shows live status against each.</p>
<ol>
  <li>Can any analyst produce a client-ready report to the same standard, without it living in one person's head?</li>
  <li>Does Michele have a near-real-time view of capacity and output?</li>
  <li>Is the team getting full value from tools they already pay for?</li>
  <li>Is there a knowledge base that actually grows with every engagement?</li>
  <li>Is there a clear, agreed signal for when it's genuinely time to hire?</li>
</ol>

<hr class="hr" />
<p class="brand-close">Chiibitsu Labs — more human, by design.</p>
<p class="attribution">Prepared by Angeline &ldquo;Chii&rdquo; Viray — <a href="https://linkedin.com/in/angelinev" target="_blank" rel="noopener">LinkedIn</a> · <a href="mailto:labs@chiibitsu.com">labs@chiibitsu.com</a> · Viber/WhatsApp +63 924 113 1973 · @chiibitsulabs</p>

`;
