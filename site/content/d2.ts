export const d2Html = `
<div class="cover">
  <div class="eyebrow"><span class="num">02 / 05</span> Deliverable · Output Consistency</div>
  <h1>Output Consistency &amp; Quality System</h1>
  <p class="dek">"AI slop" isn't a mystery — it's what happens when nobody's told the AI what "good" means for <em>this</em> brand. This deliverable encodes that definition and checks against it, twice, before anything ships.</p>
  <div class="cover-meta">
    <span><b>Status</b> v1 · skills ready, standards frames awaiting extraction</span>
    <span><b>Owner</b> Chii / Chiibitsu Labs</span>
  </div>
  <div class="cover-actions">
    <a class="btn btn-primary" href="/pdfs/amplifi-02-output-consistency.pdf" download="amplifi-02-output-consistency.pdf">Download PDF</a>
    <a class="btn btn-ghost" href="/">← Executive overview</a>
  </div>
</div>

<h2>The root cause</h2>
<p>Generic AI output reads generic because nothing told it not to. Fix that by writing down, explicitly, what good already looks like — then have every draft checked against that definition before a human ever has to catch it by eye.</p>

<h2>The encoded standard</h2>
<p>Four files, each with a different correct source and owner — deliberately pulled from where the real answer actually lives, not guessed:</p>
<div class="table-wrap">
<table>
<thead><tr><th>File</th><th>Answers</th><th>Correct source</th></tr></thead>
<tbody>
<tr><td class="mono">what-good-looks-like.md</td><td>What does a strong report actually contain?</td><td>2–3 gold reports</td></tr>
<tr><td class="mono">house-voice.md</td><td>How does Amplifi actually sound?</td><td>Same gold reports</td></tr>
<tr><td class="mono">report-template-rules.md</td><td>What does the template require, structurally?</td><td>The live Canva template + brand kit — a different source on purpose</td></tr>
<tr><td class="mono">brand-standard.md <span class="tag">per client</span></td><td>What does this specific client expect?</td><td>Kickoff material for that client</td></tr>
</tbody>
</table>
</div>

<h2>Three mechanisms, one pipeline</h2>
<div class="flow">
  <div class="flow-node"><span class="label">Draft</span><p><code>amplifi-insights</code> skill writes against the encoded standard — not a blank prompt.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><span class="label">QA · pass 1</span><p><code>amplifi-qa</code> checks the full markdown draft before it goes anywhere near Canva.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><span class="label">QA · pass 2</span><p>The same gate, re-run against the visually rendered Canva export. <strong>This is the only pass that actually clears a report to ship</strong> — layout drift, stale charts, and wrong logos all happen after pass 1 already ran.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><span class="label">Capture</span><p><code>amplifi-improve</code> closes the loop — what this session taught goes back into the standard.</p></div>
</div>

<h2>Why two QA passes, not one</h2>
<p>A markdown draft can pass every check and still ship with a stale chart or an off-brand layout once it's actually assembled in Canva — because that assembly step happens <em>after</em> the first check runs. The second pass, against the rendered deck, is the one checkpoint that's allowed to actually clear a report for the client. Anything it flags gets a human clear-or-rerun decision, every time.</p>

<h2>The loop-closer</h2>
<p><code>amplifi-improve</code> is what keeps this from calcifying. It's the same skill that runs Deliverable 1's capture loop — every session's real lessons get written down, and the good ones get promoted into these standards files weekly, so the definition of "good" keeps sharpening instead of going stale the day it was written.</p>

<h2>Status</h2>
<p>The skills and the QA gate are built and ready. What's still pending is content, not code: Rica extracting the actual standards frames from real gold reports (roughly 90 minutes of focused work) — tracked as Phase 1's highest-priority task on the <a href="/deliverable/4">roadmap</a>.</p>

<hr class="hr" />
<p class="brand-close">Chiibitsu Labs — more human, by design.</p>

`;
