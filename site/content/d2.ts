export const d2Html = `
<div class="cover">
  <div class="eyebrow"><span class="num">02 / 05</span> Deliverable · Output Consistency</div>
  <h1>Output Consistency &amp; Quality System</h1>
  <p class="dek">"AI slop" isn't a mystery — it's what happens when the human gives AI too little to work with. This deliverable encodes the standard once and checks against it twice, before anything ships.</p>
  <div class="cover-meta">
    <span><b>Status</b> v1 · three skills built, onboarding pass next</span>
    <span><b>Built by</b> Chii / Chiibitsu Labs</span>
    <span><b>Runs on</b> Every analyst, as they work</span>
  </div>
  <div class="cover-actions">
    <a class="btn btn-primary" href="/pdfs/amplifi-02-output-consistency.pdf" download="amplifi-02-output-consistency.pdf">Download PDF</a>
    <a class="btn btn-ghost" href="/">← Executive overview</a>
  </div>
</div>

<h2>The root cause</h2>
<p>Generic AI output reads generic because nothing told it not to. That's not a smarter-model problem — it's a direction problem. Give an AI less input, less instruction, and it fills the gap with a guess; give it real, explicit direction, and it has something to actually work from.</p>
<p>Treating AI as a reason to think less is exactly how slop happens — and how the thinking skill itself atrophies. This deliverable is built on the opposite bet: using AI is a reason to be <em>more</em> intentional, not less. Encode the standard explicitly, and "good" stops being a guess for the AI, or for whoever's checking its work.</p>

<h2>Built just-in-time, not as homework</h2>
<p>No one sits down to write four documentation files before they're allowed to start. Every analyst runs one onboarding pass on Claude — it installs the three skills below, and pulls their own function's gold-standard files straight from their own real, already-shipped work. The standard writes itself as a byproduct of work that already proved it, not a project someone has to schedule.</p>
<div class="table-wrap">
<table>
<thead><tr><th>File</th><th>Answers</th><th>Where it comes from</th></tr></thead>
<tbody>
<tr><td class="mono">what-good-looks-like.md</td><td>What does a strong report actually contain?</td><td>Your own best past reports</td></tr>
<tr><td class="mono">house-voice.md</td><td>How does Amplifi actually sound?</td><td>Same reports</td></tr>
<tr><td class="mono">report-template-rules.md</td><td>What does the template require, structurally?</td><td>The live template + brand kit</td></tr>
<tr><td class="mono">brand-standard.md <span class="tag">per client</span></td><td>What does this client expect?</td><td>That client's kickoff material</td></tr>
</tbody>
</table>
</div>
<p>Living documents, not a set of files written once and forgotten — versioned with a changelog, sharpened every time the capture loop feeds something new back in.</p>

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

<h2>Argue with the draft before shipping it</h2>
<p>One more habit, taught during the sprint: before a report ships, ask what the worst version of this would look like, or have a second pass actively try to find what's wrong — not just confirm it looks fine. A same-angle re-check tends to agree with itself; a pass built to disagree catches what the first one won't.</p>

<h2>The loop-closer</h2>
<p><code>amplifi-improve</code> is what keeps this from calcifying. It's the same skill that runs Deliverable 1's capture loop — every session's real lessons get written down, and the good ones get promoted into these standards files, so the definition of "good" keeps sharpening instead of going stale the day it was written.</p>

<h2>Status</h2>
<p><code>amplifi-insights</code>, <code>amplifi-qa</code>, and <code>amplifi-improve</code> are built and ready — that's done on our side. What's next isn't anyone's homework: it's the onboarding pass that installs all three and bootstraps each function's gold-standard files automatically. That's the top of Phase 1 on the <a href="/deliverable/4">roadmap</a>. From there, consistency depends on the team actually running it — the tool's built, the ball's in play.</p>

<hr class="hr" />
<p class="brand-close">Chiibitsu Labs — more human, by design.</p>

`;
