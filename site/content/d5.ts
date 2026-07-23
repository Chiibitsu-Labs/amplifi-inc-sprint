export const d5Html = `
<div class="cover">
  <div class="eyebrow"><span class="num">05 / 05</span> Deliverable · The Instrument</div>
  <h1>When-to-Hire Instrument</h1>
  <p class="dek">Not a headcount calculator. A router — it tells you when strain in the analyst function means <em>hire</em>, versus <em>automate</em>, <em>redesign</em>, or <em>fix the corpus</em>. This is Michele's instrument.</p>
  <div class="cover-meta">
    <span><b>Status</b> Capacity feed live · delivery-log feed ships with Deliverable 1</span>
    <span><b>Owner</b> Michele Curran, COO</span>
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
  <div class="flow-node"><span class="label">The router</span><p>Automate → Redesign → Fix corpus → Hire, walked in that order, always.</p></div>
  <div class="flow-arrow">←</div>
  <div class="flow-node"><span class="label">Feed 2 · Delivery</span><p>Per-report facts — cycle time, on-cadence rate, rework rounds. Ships with Deliverable 1.</p></div>
</div>
<p>Two feeds because they capture different things at different natural moments. Capacity captures how the team <em>feels</em>, daily — three questions, no more, so the response rate stays protected. Delivery facts crystallize once, at the moment a report actually ships. Neither is a second job; both ride along on work that was happening anyway.</p>

<h2>The five signals</h2>
<div class="table-wrap">
<table>
<thead><tr><th>Signal</th><th>What it is</th><th>Feed</th></tr></thead>
<tbody>
<tr><td><strong>WIP per analyst</strong></td><td>Active clients/tasks in flight per person — the "full hands" ceiling</td><td>Capacity</td></tr>
<tr><td><strong>Perceived load</strong></td><td>Daily 1–10 self-rating plus a reason — the earliest warning, since people feel strain before metrics show it</td><td>Capacity</td></tr>
<tr><td><strong>Cycle time</strong></td><td>Period start to delivered — a slow climb here shows up weeks before a due date is actually missed</td><td>Delivery</td></tr>
<tr><td><strong>On-cadence rate</strong></td><td>% of reports delivered by their due date</td><td>Delivery</td></tr>
<tr><td><strong>Rework rounds</strong></td><td>Revision rounds before client acceptance — your team's #1 named pain, and usually a corpus gap, not a headcount gap</td><td>Delivery</td></tr>
</tbody>
</table>
</div>
<p style="font-size:.86rem; color:var(--ink-soft);">Five signals, not twenty — a COO should read this in 30 seconds or the instrument is wrong. Every threshold below is a v1 <em>seed</em>: Michele's number to adjust as real data comes in, not a fixed formula handed down from outside.</p>

<h2>The router chain</h2>
<p>A 1990s tool asks "slammed → hire?" This walks the chain in order — hire is the last branch, never the first reflex.</p>
<div class="chain">
  <div class="chain-step">
    <div class="badge">01</div>
    <div><h4>Automate?</h4><p>Is the strained step repetitive and rules-based? Evidence: the same manual step named repeatedly in check-ins and delivery notes. → Route: automate it — data sync, formatting, first-draft work.</p></div>
  </div>
  <div class="chain-step">
    <div class="badge">02</div>
    <div><h4>Redesign?</h4><p>Is the <em>workflow</em> the bottleneck — not capacity, not quality? Evidence: on-cadence rate below threshold, or cycle time trending up while still narrowly making due dates — and the slowdown clusters at one identifiable handoff, client, or process. A slowdown spread evenly across the whole team, alongside elevated capacity signals, is a capacity problem, not a redesign — it's let through to the hire check instead. → Route: fix the handoff, not the headcount.</p></div>
  </div>
  <div class="chain-step">
    <div class="badge">03</div>
    <div><h4>Fix the corpus?</h4><p>Is quality inconsistent because the standard still lives in someone's head? Evidence: rework rounds meaningfully frequent, and mostly tagged as a corpus-alignment cause rather than a one-off client ask. → Route: fill the gap in the standard, not the roster.</p></div>
  </div>
  <div class="chain-step is-hire">
    <div class="badge">04</div>
    <div><h4>Hire</h4><p>Only once 1–3 are ruled out <em>portfolio-wide</em> — not just "a signal exists somewhere." Capacity has to be sustainedly maxed across the team, not one person; a genuine redistribution option has to be checked and ruled out first; and there has to be enough real data behind the read to trust it. → This is the defensible hire: the ruled-out trail above is the evidence Michele takes upward.</p></div>
  </div>
</div>
<div class="callout"><b>The output is never "hire: yes/no."</b> It's "here's what crossed, here's why the answer is this route, here's the evidence trail."</div>

<h2>What's live today</h2>
<p>This chain is real and usable <em>by hand</em>, right now — it doesn't wait on any dashboard code. Michele or Chii can walk it monthly with the capacity dashboard and the delivery logs open side by side, the moment each has a few weeks of data. Wiring it into the dashboard automates the arithmetic; it isn't what makes the router real — the instrument was never meant to wait on a piece of software to be the real thing.</p>

<h2>What Michele sees</h2>
<ul>
  <li><strong>Daily, live today:</strong> a 10:00 summary — team average, everyone's load and reason, sorted most-loaded first, flags for anyone over the line.</li>
  <li><strong>Anytime, live today:</strong> the dashboard — tiles, trend, and plain-language signal detail.</li>
  <li><strong>Monthly, live today, by hand:</strong> the full router line — <em>"Rework on Client X crossed threshold in week 6 → routes to a corpus fix, not a hire."</em> Fifteen minutes to write, thirty seconds to read, defensible in one line.</li>
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
  <li><strong>Owned and portable.</strong> Signal data lives in the corpus and an exportable database — no vendor lock on the data itself.</li>
  <li><strong>Runs on the stack already in use.</strong> Drive, Telegram, the tools your team already touches.</li>
  <li><strong>Five signals, not twenty.</strong> Readable in 30 seconds, or it's wrong.</li>
  <li><strong>A router, not a binary.</strong> Never a bare hire/no-hire — always the evidence trail behind it.</li>
  <li><strong>Feeding it is never a second job.</strong> Three taps a day, one row opened per scheduled cycle, updated at ship, finalized at acceptance. That's the entire cost.</li>
</ul>

<h2>The lines to hold</h2>
<div class="grid grid-2">
  <blockquote class="pull" style="margin:0;">Hire is the last resort on the router, not the first reflex.</blockquote>
  <blockquote class="pull" style="margin:0;">This tells you <em>why</em> it's a hire, not just <em>that</em> it's a hire — that's what you defend upward.</blockquote>
  <blockquote class="pull" style="margin:0;">The vault is yours. The lens is rented.</blockquote>
  <blockquote class="pull" style="margin:0;">v1 sets baselines. Reality sharpens the thresholds.</blockquote>
</div>

<hr class="hr" />
<p class="brand-close">Chiibitsu Labs — more human, by design.</p>

`;
