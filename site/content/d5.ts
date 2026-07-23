export const d5Html = `
<div class="cover">
  <div class="eyebrow"><span class="num">05 / 05</span> Deliverable · The Instrument</div>
  <h1>When-to-Hire Instrument</h1>
  <p class="dek">Not a headcount calculator. A when-to-hire router — it tells you when strain in the analyst function means <em>hire</em>, versus <em>automate</em>, <em>redesign</em>, or <em>fix the knowledge base</em>. This is Michele's instrument.</p>
  <div class="cover-meta">
    <span><b>Status</b> Capacity feed live · report feed builds as tracking fills in</span>
    <span><b>Owner</b> Michele Curran, COO</span>
    <span><b>Live now</b> <a href="https://amplifi-capchecker.vercel.app" target="_blank" rel="noopener">Open the capacity checker ↗</a></span>
  </div>
  <div class="cover-actions">
    <a class="btn btn-primary" href="/pdfs/amplifi-05-when-to-hire-instrument.pdf" download="amplifi-05-when-to-hire-instrument.pdf">Download PDF</a>
    <a class="btn btn-ghost" href="/">← Executive overview</a>
  </div>
</div>

<p class="lede">Today the hiring call is gut. This turns <em>"I feel like we need someone"</em> into <em>"here's the trend line, here's the threshold we crossed, here's why it's a hire and not a tool."</em> Defensible upward, built in peacetime, on purpose.</p>

<blockquote class="pull">“Metrics in place before we trigger hiring.”
  <cite>Michele Curran, framing the brief</cite>
</blockquote>

<h2>One router, two feeds</h2>
<div class="flow">
  <div class="flow-node"><span class="label">Feed 1 · Capacity</span><p>Daily 3-tap check-in — perceived load, why, and who's working what. Live today.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><span class="label">The when-to-hire router</span><p>Automate → Redesign → Fix knowledge base → Hire, walked in that order, always.</p></div>
  <div class="flow-arrow">←</div>
  <div class="flow-node"><span class="label">Feed 2 · Delivery</span><p>Per-report facts — cycle time, on-cadence rate, rework rounds. Ships with Deliverable 1.</p></div>
</div>
<p>Two feeds because they capture different things at different natural moments. Capacity captures how the team <em>feels</em>, daily — three questions, no more, so the response rate stays protected. Delivery facts crystallize once, at the moment a report actually ships. Neither is a second job; both ride along on work that was happening anyway.</p>

<h2>The five signals — one glance, like the dashboard</h2>
<div class="tile-row">
  <div class="tile"><span class="tl">Load today</span><span class="tv">6.5<small>/10</small></span><span class="ts">How loaded everyone feels, daily — the earliest warning</span><span class="feed">Capacity</span></div>
  <div class="tile"><span class="tl">Clients in flight</span><span class="tv">4<small>/person</small></span><span class="ts">Active work per analyst — the "full hands" ceiling</span><span class="feed">Capacity</span></div>
  <div class="tile"><span class="tl">Cycle time</span><span class="tv">9<small> days</small></span><span class="ts">Start to delivered — climbs weeks before a deadline slips</span><span class="feed">Reports</span></div>
  <div class="tile"><span class="tl">On-time rate</span><span class="tv">84<small>%</small></span><span class="ts">Reports delivered by their due date</span><span class="feed">Reports</span></div>
  <div class="tile"><span class="tl">Revision rounds</span><span class="tv">1.7<small>/report</small></span><span class="ts">Your #1 named pain — usually a knowledge base gap, not headcount</span><span class="feed">Reports</span></div>
</div>
<p style="font-size:.82rem; color:var(--ink-faint);">Numbers above are illustrative — the real ones come from your own data. Five signals, not twenty: a COO should read this in 30 seconds or the instrument is wrong. Every threshold is Michele's to tune as real data comes in.</p>

<h2>The when-to-hire router — four questions, in order</h2>
<p>A 1990s tool asks "slammed → hire?" This asks four questions in order. Hire is the last answer, never the first reflex — because every earlier stop is cheaper and faster than a new salary.</p>
<div class="flow">
  <div class="flow-node"><span class="label">1 · Automate it?</span><p>Is the strain a repetitive, rules-based task? Then automate it — don't hire for it.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><span class="label">2 · Fix the workflow?</span><p>Does the slowdown cluster at one handoff or client? Then fix that step, not the headcount.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><span class="label">3 · Fix the knowledge base?</span><p>Is quality the issue because a standard lives in someone's head? Then write it down, once.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node is-bad"><span class="label">4 · Hire</span><p>Only when 1–3 are ruled out across the whole team, with enough data to trust the read. That's the defensible hire.</p></div>
</div>
<div class="callout"><b>The output is never "hire: yes/no."</b> It's "here's what crossed, here's why the answer is this route, here's the evidence trail."</div>

<h2>What's live today</h2>
<p><a href="https://amplifi-capchecker.vercel.app" target="_blank" rel="noopener">The capacity checker is live</a> — daily check-ins from the team, Michele's morning summary, the dashboard. The report-level view is next, and once the whole thing is proven it moves to Amplifi's own domain and accounts, with a step-by-step migration guide — it was always yours to keep.</p>
<a href="https://amplifi-capchecker.vercel.app" target="_blank" rel="noopener" style="display:block; margin:1.4rem 0 2rem;">
  <img src="/amplifi-cap-checker.png" alt="The live Amplifi capacity dashboard — hire signal, automate/redesign signal, team load, and the who's-strained-when heatmap" style="width:100%; height:auto; border:1px solid var(--line-strong); border-radius:8px; display:block;" />
</a>
<p>The when-to-hire reading itself is usable <em>by hand</em>, right now — it doesn't wait on any dashboard code. Michele and Chii walk it monthly with the dashboard and the report tracking open side by side, the moment each has a few weeks of data.</p>

<h2>What Michele sees</h2>
<ul>
  <li><strong>Daily, live today:</strong> a 10:00 summary — team average, everyone's load and reason, sorted most-loaded first, flags for anyone over the line.</li>
  <li><strong>Anytime, live today:</strong> the dashboard — tiles, trend, and plain-language signal detail.</li>
  <li><strong>Monthly, live today, by hand:</strong> the full router line — <em>"Rework on Client X crossed threshold in week 6 → routes to a knowledge base fix, not a hire."</em> Fifteen minutes to write, thirty seconds to read, defensible in one line.</li>
  <li><strong>Once the dashboard build lands (60–90 days):</strong> the same line, generated automatically instead of hand-assembled. Convenience, not new capability — the capability is already there.</li>
</ul>

<h2>Baselines &amp; calibration</h2>
<p>Thresholds can't be known upfront — v1 sets them, reality sharpens them. That's said plainly on purpose; it's the method, not a weakness. Trust is gated on <em>completed cycles</em>, not calendar time, because a weekly client and a monthly client reach a trustworthy baseline at very different speeds:</p>
<div class="table-wrap">
<table>
<thead><tr><th>Cadence</th><th>Time to a trustworthy baseline</th></tr></thead>
<tbody>
<tr><td>Weekly</td><td>~3 weeks (3 completed cycles)</td></tr>
<tr><td>Bi-weekly</td><td>~6 weeks</td></tr>
<tr><td>Monthly</td><td>~3 months</td></tr>
</tbody>
</table>
</div>
<p>Until a client crosses its own bar, its numbers are read qualitatively alongside broader patterns rather than trusted in isolation. Every threshold recalibrates quarterly with Michele against real distributions — living numbers, not one-time settings.</p>

<h2>Hard rules</h2>
<ul>
  <li><strong>Owned and portable.</strong> Signal data lives in your knowledge base and an exportable database — no vendor lock on the data itself.</li>
  <li><strong>Runs on the stack already in use.</strong> Drive, Telegram, the tools your team already touches.</li>
  <li><strong>Five signals, not twenty.</strong> Readable in 30 seconds, or it's wrong.</li>
  <li><strong>A router, not a binary.</strong> Never a bare hire/no-hire — always the evidence trail behind it.</li>
  <li><strong>Feeding it is never a second job.</strong> Three taps a day, one row opened per scheduled cycle, updated at ship, finalized at acceptance. That's the entire cost.</li>
</ul>

<h2>Why this matters above Michele's desk, too</h2>
<p>When the hire moment comes, the ask that goes upward isn't "we're slammed, we need someone." It's a trend line, the threshold it crossed, and the cheaper options already tried and ruled out — automation checked, workflow checked, knowledge base checked. That's a decision a CEO can approve in one read, because the homework is attached. Data carries the ask; the gut just started the conversation.</p>

<h2>The lines to hold</h2>
<div class="grid grid-2">
  <blockquote class="pull" style="margin:0;">Hire is the last resort on the router, not the first reflex.</blockquote>
  <blockquote class="pull" style="margin:0;">This tells you <em>why</em> it's a hire, not just <em>that</em> it's a hire — that's what you defend upward.</blockquote>
  <blockquote class="pull" style="margin:0;">The knowledge base is yours. The AI is rented.</blockquote>
  <blockquote class="pull" style="margin:0;">v1 sets baselines. Reality sharpens the thresholds.</blockquote>
</div>

<hr class="hr" />
<p class="brand-close">Chiibitsu Labs — more human, by design.</p>

`;
