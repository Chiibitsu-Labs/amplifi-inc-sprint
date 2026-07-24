export const d2Html = `
<div class="cover">
  <div class="eyebrow"><span class="num">02 / 05</span> Deliverable · Output Consistency</div>
  <h1>Output Consistency &amp; Quality System</h1>
  <p class="dek">"AI slop" isn't a mystery — it's what happens when the human gives AI too little to work with. This deliverable encodes the standard once and checks against it twice, before anything ships.</p>
  <div class="cover-meta">
    <span><b>Status</b> v1 · all four skills built, team onboarding next</span>
    <span><b>Built by</b> Chii / Chiibitsu Labs</span>
    <span><b>Runs on</b> Every analyst, as they work</span>
  </div>
  <div class="cover-actions">
    <a class="btn btn-primary" href="/pdfs/amplifi-02-output-consistency.pdf" download="amplifi-02-output-consistency.pdf">Download PDF</a>
    <a class="btn btn-ghost" href="/">← Executive overview</a>
  </div>
</div>

<h2>The root cause</h2>
<p>Generic AI output reads generic because nothing told it not to. Direction is the real variable: give an AI less input, less instruction, and it fills the gap with a guess. Give it real, explicit direction, and it has something to actually work from.</p>
<p>Treating AI as a reason to think less is exactly how slop happens — and how the thinking skill itself atrophies. This deliverable is built on the opposite bet: using AI is a reason to be <em>more</em> intentional, not less. Encode the standard explicitly, and "good" stops being a guess for the AI, or for whoever's checking its work.</p>

<h2>Same AI. Different input.</h2>
<div class="flow">
  <div class="flow-node is-bad"><span class="label">A thin ask</span><p>"Write the insights section for this client."</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node is-bad"><span class="label">The AI guesses</span><p>No standard, no brief, no voice — it fills every gap with the generic average.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node is-bad"><span class="label">Slop</span><p>Reads like anyone's report. A human rewrites it anyway.</p></div>
</div>
<div class="flow">
  <div class="flow-node is-good"><span class="label">The same ask + your standard</span><p>The skill reads your knowledge base first — the brief, the voice, what good looks like.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node is-good"><span class="label">The AI works from your bar</span><p>Nothing left to guess — it writes against what your best work already proved.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node is-good"><span class="label">On-brand, checked twice</span><p>Sounds like Amplifi. The human reviews instead of rewriting.</p></div>
</div>

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
  <div class="flow-node"><span class="label">QA · pass 1</span><p><code>amplifi-qa</code> checks the full markdown draft before it's assembled into the final report.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><span class="label">QA · pass 2</span><p>The same gate, re-run against the finished, visually rendered report. <strong>This is the only pass that actually clears a report to ship</strong> — layout drift, stale charts, and wrong logos all happen after pass 1 already ran.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><span class="label">Capture</span><p><code>amplifi-improve</code> closes the loop — what this session taught goes back into the standard.</p></div>
</div>

<h2>Why two QA passes, not one</h2>
<p>A markdown draft can pass every check and still ship with a stale chart or an off-brand layout once it's actually assembled into the final deck — because that assembly step happens <em>after</em> the first check runs. The second pass, against the rendered report, is the one checkpoint that's allowed to actually clear a report for the client. Anything it flags gets a human clear-or-rerun decision, every time.</p>

<h2>Argue with the draft before shipping it</h2>
<p>One more habit, taught during the sprint: before a report ships, ask what the worst version of this would look like, or have a second pass actively try to find what's wrong — not just confirm it looks fine. A same-angle re-check tends to agree with itself; a pass built to disagree catches what the first one won't. A genuinely different model makes that disagreement more likely than asking the same one to double-check itself — ChatGPT auditing a draft written in Claude, for instance, since that's the tool most people already have open.</p>

<h2>The loop-closer</h2>
<p><code>amplifi-improve</code> is what keeps this from calcifying. It's the same skill that runs Deliverable 1's capture loop — every session's real lessons get written down, and the good ones get promoted into these standards files, so the definition of "good" keeps sharpening instead of going stale the day it was written.</p>

<h2>Status</h2>
<p>All four skills are built and ready — that's done on our side.</p>
<ul>
  <li><code>amplifi-insights</code> drafts</li>
  <li><code>amplifi-qa</code> checks, twice</li>
  <li><code>amplifi-improve</code> captures</li>
  <li><code>amplifi-onboarding</code> installs the other three and fills the standards live, from real work — nobody's homework</li>
</ul>
<p>That install is the top of Phase 1 on the <a href="/deliverable/4">roadmap</a>. From there, it's on your team to actually use it day to day — that's the only part left.</p>

<hr class="hr" />
<p class="brand-close">Chiibitsu Labs — more human, by design.</p>
<p class="attribution">Prepared by <a href="https://linkedin.com/in/angelinev" target="_blank" rel="noopener">Angeline &ldquo;Chii&rdquo; Viray</a> · labs@chiibitsu.com · Viber/WhatsApp +63 924 113 1973 · @chiibitsulabs</p>

`;
