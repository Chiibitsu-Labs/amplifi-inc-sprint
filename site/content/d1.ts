export const d1Html = `
<div class="cover">
  <div class="eyebrow"><span class="num">01 / 05</span> Deliverable · Knowledge Foundation</div>
  <h1>Knowledge Foundation Blueprint</h1>
  <p class="dek">A single, shared home for everything an analyst needs to know — instead of it living in six people's heads and a scatter of files.</p>
  <div class="cover-meta">
    <span><b>Status</b> v1 · scaffold ready to copy to Drive</span>
    <span><b>Owner</b> Chii / Chiibitsu Labs</span>
  </div>
  <div class="cover-actions">
    <a class="btn btn-primary" href="/pdfs/amplifi-01-knowledge-foundation.pdf" download="amplifi-01-knowledge-foundation.pdf">Download PDF</a>
    <a class="btn btn-ghost" href="/">← Executive overview</a>
  </div>
</div>

<h2>Why this exists</h2>
<p>Ask two analysts what "good" looks like for the same client and today you'll get two answers — not because anyone's careless, but because the standard was never written down anywhere both of them could read it. New context gets re-explained every engagement. A person leaving takes the knowledge with them. That's the root cause this deliverable fixes: not a training problem, a <em>storage</em> problem.</p>

<h2>What it is</h2>
<p>A plain-markdown folder, <code>amplifi-knowledge/</code>, living in the shared Drive everyone already uses — readable and editable by hand, no new software to learn. It separates two things that are easy to blur together:</p>
<div class="grid grid-2">
  <div class="card">
    <h3>The vault</h3>
    <p>The actual knowledge — client briefs, brand standards, what "good" looks like, the lessons log. This is Amplifi's, permanently, regardless of which AI tool reads it next year.</p>
  </div>
  <div class="card">
    <h3>The lens</h3>
    <p>Whatever AI skill or tool reads the vault today. Tools change; the vault doesn't have to. Swap the lens without losing the knowledge underneath it.</p>
  </div>
</div>

<h2>How it's organized</h2>
<div class="table-wrap">
<table>
<thead><tr><th>Folder</th><th>Holds</th></tr></thead>
<tbody>
<tr><td class="mono">clients/[client]/</td><td>Living brief, brand standard, context notes, insight log, delivery log — one set per client, seeded from a template.</td></tr>
<tr><td class="mono">standards/</td><td>What good looks like, house voice, report-template rules — the encoded definition of quality, shared across every client.</td></tr>
<tr><td class="mono">learnings/</td><td>Patterns spotted across sessions and clients, plus the router-decision log — the corpus's own memory of itself.</td></tr>
</tbody>
</table>
</div>

<h2>Five decisions worth knowing about</h2>
<ol>
  <li><strong>Living briefs, not static onboarding docs.</strong> A client brief updates as the relationship evolves — it's never "finished."</li>
  <li><strong>The insight log compounds.</strong> Every delivered report adds a dated entry; next period's analysis reads the whole history, not just this cycle.</li>
  <li><strong>The delivery log feeds the instrument.</strong> Cycle time, on-cadence rate, and rework rounds are captured as a byproduct of shipping — not a separate tracking chore. This is also Deliverable 5's second data feed.</li>
  <li><strong>The brand standard is the anti-slop layer.</strong> It's the one file that makes AI output actually sound like Amplifi instead of generic AI.</li>
  <li><strong>One home, shared access.</strong> All six people on the function get edit access to the same folder — no person-locked knowledge.</li>
</ol>

<h2>The capture loop</h2>
<p>How the vault gets smarter instead of going stale:</p>
<div class="flow">
  <div class="flow-node"><span class="label">1 · Session ends</span><p>Run the capture skill — what worked, what didn't, what should be remembered.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><span class="label">2 · Learnings/</span><p>Raw notes land in the corpus's own memory folder, dated and attributed.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><span class="label">3 · Weekly promotion</span><p>Every Friday, real patterns get promoted into the operative standards files.</p></div>
  <div class="flow-arrow">→</div>
  <div class="flow-node"><span class="label">4 · Next session</span><p>Already knows it — no one has to re-explain the same lesson twice.</p></div>
</div>

<h2>Migration path</h2>
<p>Lives in Google Drive today, because that's what the team already has open. The day the CTO clears GitHub access for Claude Enterprise, it's a documented copy-paste to git — nothing about the structure changes, just where it's hosted.</p>

<h2>What it must not become</h2>
<p>Not a second inbox. Not a wiki nobody maintains. Not a place where "we'll document it later" quietly means never. The capture loop above exists specifically so the vault stays a byproduct of real work, not an extra job.</p>

<hr class="hr" />
<p class="brand-close">Chiibitsu Labs — more human, by design.</p>

`;
