export const d4Html = `
<div class="cover">
  <div class="eyebrow"><span class="num">04 / 05</span> Deliverable · Roadmap</div>
  <h1>Prioritized Implementation Roadmap</h1>
  <p class="dek">Sequenced by highest pain, lowest effort, first. Every task has a named owner and a date — dates move only by Michele's call.</p>
  <div class="cover-meta">
    <span><b>Anchor</b> week of Jul 20, 2026</span>
    <span><b>30 / 60 / 90</b> Aug 21 · Sep 18 · Oct 16</span>
  </div>
  <div class="cover-actions">
    <a class="btn btn-primary" href="/pdfs/amplifi-04-roadmap.pdf" download="amplifi-04-roadmap.pdf">Download PDF</a>
    <a class="btn btn-ghost" href="/">← Executive overview</a>
  </div>
</div>

<blockquote class="pull">The 90-day bar: “consistent quality, no AI slop, reports aligned with branding, evolving insights as data points of a client accumulate over time.” Every task below serves that sentence.
  <cite>Michele Curran, COO</cite>
</blockquote>

<h2>Phase 1 — Quick wins <span class="tag">by Aug 21</span></h2>
<p>High pain, low effort. The corpus goes live and the standard gets encoded.</p>
<div class="table-wrap">
<table>
<thead><tr><th>Action</th><th>Owner</th><th>Done by</th></tr></thead>
<tbody>
<tr><td>Copy the knowledge scaffold into shared Drive, full team access</td><td class="owner">Michele</td><td class="date">Jul 24</td></tr>
<tr><td>Fill the three standards frames from gold reports and the live template</td><td class="owner">Rica</td><td class="date">Jul 31</td></tr>
<tr><td>Seed every active client's folder from the template</td><td class="owner">Dale + Janelle</td><td class="date">Aug 3</td></tr>
<tr><td>Fill each client's brief and brand standard, including account status</td><td class="owner">Dale + Janelle</td><td class="date">Aug 7</td></tr>
<tr><td>Deploy all three skills to every analyst's own workstation, retire the old prompt-heavy approach</td><td class="owner">Chii</td><td class="date">Aug 7</td></tr>
<tr><td>Verify the capture loop end-to-end on a real session</td><td class="owner">Chii</td><td class="date">Aug 7</td></tr>
<tr><td>Rename capchecker's early signals to "-candidate" labels until the router backs them fully</td><td class="owner">Chii</td><td class="date">Aug 7</td></tr>
<tr><td>Open a delivery-log row for every cycle already in flight</td><td class="owner">Rica + team</td><td class="date">Aug 7</td></tr>
<tr><td>Delivery-log habit live for every cycle going forward</td><td class="owner">Rica + team</td><td class="date">Aug 7 on</td></tr>
<tr><td>First weekly promotion pass — then every Friday</td><td class="owner">Rica + Chii</td><td class="date">Aug 14</td></tr>
</tbody>
</table>
</div>
<div class="callout"><b>Gate out of Phase 1:</b> an analyst generates a report section with zero re-prompting of standards or brief content. If they had to paste context into chat, a corpus file is missing — fix and retest.</div>

<h2>Phase 2 — Builds <span class="tag">Sep 18 – Oct 16</span></h2>
<p>Higher impact, more effort. The system starts measuring itself.</p>
<div class="table-wrap">
<table>
<thead><tr><th>Action</th><th>Owner</th><th>Done by</th></tr></thead>
<tbody>
<tr><td>AI-QA gate live as a standing pre-assembly check</td><td class="owner">Rica / Chii</td><td class="date">Sep 4</td></tr>
<tr><td>Second QA pass live — the one that actually clears a report to ship</td><td class="owner">Rica / Chii</td><td class="date">Sep 4</td></tr>
<tr><td>First manual router walkthrough, as practice — Michele sets first-pass thresholds</td><td class="owner">Michele + Chii</td><td class="date">Sep 11</td></tr>
<tr><td>Router automated into the capchecker dashboard, in chain order</td><td class="owner">Chii</td><td class="date">Earliest Oct 9</td></tr>
<tr><td>Data-to-template transfer automated; minutes saved measured</td><td class="owner">Chii + Dale</td><td class="date">Oct 2</td></tr>
<tr><td>First automation spike, from the instrument's own highest-load theme</td><td class="owner">Chii + Michele</td><td class="date">Oct 16</td></tr>
<tr><td>90-day review against the success bar and the five questions</td><td class="owner">Michele + Chii</td><td class="date">Week of Oct 19</td></tr>
</tbody>
</table>
</div>
<p style="font-size:.86rem; color:var(--ink-soft);">The router itself is real and usable by hand from Sep 11 — Oct 9 is a convenience automation, not the moment it starts working.</p>

<h2>Phase 3 — Ongoing <span class="tag">no end date, by design</span></h2>
<div class="table-wrap">
<table>
<thead><tr><th>Rhythm</th><th>What happens</th></tr></thead>
<tbody>
<tr><td class="owner">Daily</td><td>3-tap capacity check-in; summary to Michele at 10:00</td></tr>
<tr><td class="owner">Per cycle</td><td>Delivery log opened at start, updated at ship, finalized at acceptance</td></tr>
<tr><td class="owner">Weekly</td><td>Promotion pass — real lessons move into the standard</td></tr>
<tr><td class="owner">Monthly</td><td>The router walked by hand, decision logged</td></tr>
<tr><td class="owner">Quarterly</td><td>Thresholds recalibrated against real data; corpus health checked</td></tr>
</tbody>
</table>
</div>

<h2>Deliberately not yet</h2>
<p>Scope discipline has a home — here's what's out of Core Build, and what would bring it back in.</p>
<div class="table-wrap">
<table>
<thead><tr><th>Not now</th><th>Why</th><th>Revisit when</th></tr></thead>
<tbody>
<tr><td>Git migration of the corpus</td><td>Blocked on CTO clearing GitHub access</td><td>The moment it clears — it's a copy-paste</td></tr>
<tr><td>Marketing + Product full builds</td><td>Core Build is analyst-only scope</td><td>A future engagement</td></tr>
<tr><td>Supplier / vendor fixes</td><td>Real pain, but process — not AI</td><td>Michele owns as a process track</td></tr>
<tr><td>Canva replacement</td><td>A bigger decision than this build; markdown-first already de-risks it</td><td>If Canva pain still dominates after Phase 2</td></tr>
<tr><td>New platforms</td><td>No gap the current stack doesn't already cover</td><td>Only if a real gap appears</td></tr>
<tr><td>Structured database for the logs</td><td>Bigger than Core Build scope; the touch-cost design mitigates it today</td><td>If real editing collisions start happening</td></tr>
</tbody>
</table>
</div>

<h2>The brief's Definition of Success</h2>
<p>Checked at the 90-day review — see the <a href="/">executive overview</a> for live status against each one.</p>
<ol>
  <li>Can any analyst produce a client-ready report to the same standard, without tribal knowledge?</li>
  <li>Does the COO have a near-real-time view of capacity and output per deliverable?</li>
  <li>Are existing subscriptions used to documented capability?</li>
  <li>Is there a living knowledge base growing with every engagement?</li>
  <li>Is there a clear, agreed signal for when AI augmentation is no longer sufficient and a hire is warranted?</li>
</ol>

<hr class="hr" />
<p class="brand-close">Chiibitsu Labs — more human, by design.</p>

`;
