---
name: amplifi-insights
description: Generate Amplifi intelligence-report insights and recommendations for a client period. Reads the knowledge base (standards + client folder) first, grounds only in current-period data, refuses generic recommendations. Use when drafting the monthly/weekly/bi-weekly report's insights, analysis, and recommendations sections.
---

# Amplifi Insight Generation

You draft the insight/analysis/recommendation sections of an Amplifi
intelligence report. Output must be indistinguishable from Amplifi's best
human work ~ that means reading the encoded standard before writing a word.

## Step 0 ~ Read the corpus (never skip)

**Resolve `{client}` to its ACTUAL folder name under `clients/` before any
of the reads below ~ never assume the display name IS the folder name,
EVEN when the name has no reserved characters and a folder matching it
literally exists.** A client whose real name contains `/` or another
filesystem-reserved
character (`\ : * ? " < > |`) is slugged per `README.md`'s rule (`ACME/EMEA`
→ folder `clients/ACME-EMEA/`); interpolating the raw display name
straight into `clients/{client}/...` breaks on exactly this case ~ either
failing outright or resolving into an unintended nested path
(`clients/ACME/EMEA/...`), silently missing the corpus this whole skill
exists to read. **A direct name-to-folder match is NOT automatically
safe, though, because `README.md`'s own collision rule can push a
DIFFERENT client into that exact folder name:** if `ACME/EMEA` was
onboarded first and took `clients/ACME-EMEA/`, a LATER client literally
named `ACME-EMEA` (no reserved characters at all) gets bumped to
`clients/ACME-EMEA-2/` by the collision suffix, not the literal name a
naive direct-match would reach for ~ confirming "the folder exists" alone
would silently read the FIRST client's brief, history, and brand rules
for the second client's request (Codex catch, 2026-07-19). Always take
the extra step: read the matched folder's `brief.md` Snapshot and confirm
its stored real name equals the REQUESTED name, whether or not the path
that got you there needed any character substitution. List `clients/*`
and match
against each folder's `brief.md` Snapshot table (which keeps the REAL,
unslugged name specifically for this lookup, per `README.md`) to find the
right folder ~ this Snapshot check is the resolution step itself, not an
optional extra confirmation skippable when the name looks clean. **If
MORE THAN ONE folder's `Client` plausibly matches the requested name**
(two genuinely different accounts that share a display name, per
`README.md`'s duplicate-name handling) **~ check whether the request
carries enough distinguishing detail to match exactly one folder's
`Account label` instead** (README.md's internal-only disambiguation row,
separate from `Client` ~ never the display name itself, which stays the
real, unqualified name in both colliding folders); if it does, resolve
there. **If it still doesn't, STOP and ask which account,
never silently pick one** (first found, alphabetical, or otherwise);
guessing between two real accounts risks generating against the wrong
client's brief and history entirely. Whichever folder resolution lands on,
generate using its `Client` value, never `Account label` ~ the qualifier
is for telling folders apart internally, not for anything a client sees.

From `amplifi-knowledge/`, read in this order:
1. `standards/house-voice.md` ~ how to sound
2. `standards/what-good-looks-like.md` ~ the quality bar
3. `standards/report-template-rules.md` ~ output shape + fresh-data rules
4. `clients/{client}/brief.md` ~ what they asked for, incl. FAQs + unique asks
5. `clients/{client}/brand-standard.md` ~ their voice/format rules
6. `clients/{client}/context.md` ~ what we know works/doesn't
7. `clients/{client}/insight-log.md` ~ the FULL accumulated thread

If any of these are missing or empty, say so before generating ~ name the
file, ask for it or flag the gap. Do not silently default to generic.

**One targeted extra read, only when checking the insight-log exception
below:** `clients/{client}/delivery-log.md`, scanned only for whether any
prior row exists with `Status = delivered`/`revising`/`revising
(reopened)`/`accepted` ~ not a
full read, just an existence check, and only needed to distinguish "this
is genuinely period one" from "the capture loop broke" (see the exception
below).

**A freshly-copied `_template-client` folder is not a filled corpus, even
though every file technically exists and has bytes in it.** Treat these as
equivalent to "missing" and flag them the same way: unresolved template
markers (literal `{...}` placeholder text ~ `{Client Name}`, `{YYYY-MM-DD}`,
and the like), any file whose content is still the template's own
instructional/example prose rather than this client's real content, and
any standards file still carrying a `status: FRAME` header (`README.md`
of `learnings/`, or the standards files themselves, before Rica's
extraction pass fills them). File-not-empty is not the same test as
file-actually-filled-in ~ check for these before treating a read as
successful.

**This ONE exception is scoped to `report-template-rules.md` BY NAME,
never to "any file carrying a `Status: FRAME`/`Status: LIVE` marker" ~
`house-voice.md` and `what-good-looks-like.md` carry that SAME marker
mechanism too, but stay on the full brace-scan-AND-Status test, not this
exception** (an earlier draft of this paragraph over-generalized the
carve-out to every Status-marker file, which would let a `house-voice.md`
or `what-good-looks-like.md` still holding real unfilled `{...}`
placeholders pass as ready the moment Status merely flips to LIVE, with
no independent check that the fill-once content behind it is actually
real ~ Codex catch, 2026-07-19). **`report-template-rules.md` does NOT get
blanket marker-alone trust either, though ~ it gets a NARROWER exception:
brace-scan the WHOLE file as normal, but exempt ONLY the three specific,
known-permanent runtime tokens under its own Fresh-data rules section,
`{Month YYYY}`, `{start}`, and `{end}` (the exact period-stamp line,
`"{Month YYYY} · data window {start}–{end}"`), never every brace in the
file.** This file has BOTH kinds of placeholder ~ those three permanent
runtime tokens under Fresh-data rules, AND genuine one-shot fill-once
placeholders everywhere else (the Canonical report structure table's
`{N}` bullet count and `{the metrics blocks in order}`, Branding rules'
`{…}` fonts/colors/chart-style entries). Trusting the `Status: LIVE`
marker alone for the WHOLE file, as an earlier draft of this exception
did, would accept the file the moment Rica flips Status even if she
flipped it before actually replacing those one-shot placeholders ~ the
insight skill would then generate against a genuinely undefined report
contract (no real section order, no real branding rules) while believing
the corpus gap was already closed (Codex catch, 2026-07-19 ×2: first the
over-generalization to every Status-marker file, now the
all-or-nothing trust for this one file specifically). Scan for ANY `{...}`
outside that one exempted period-stamp line, exactly like any other
one-shot file; a hit there is still a real, unresolved placeholder.
`house-voice.md` and `what-good-looks-like.md` have no runtime
tokens at all ~ any brace still standing there after `Status: LIVE` is a real,
unfilled placeholder, and the brace-scan is a genuine independent defense
against Status being flipped prematurely, exactly like it is for
`brief.md`/`brand-standard.md`. Every standards file gets both checks
(marker AND brace-scan) ~ `report-template-rules.md` just has one small,
named exemption carved out of its brace-scan, not an exemption from the
brace-scan itself.

**This is a WHOLE-FILE test for the one-shot required files (the
standards files, `brief.md`, `brand-standard.md`) ~ they're written once,
so any remaining placeholder means genuinely not done yet.** It is NOT a
whole-file test for `context.md` and `insight-log.md` specifically ~ both
are accumulating logs that ship with unused template scaffold BY DESIGN
(insight-log.md's trailing "next entry goes here" placeholder block;
context.md's optional sections nobody's populated yet), and that scaffold
is expected to keep sitting there, unfilled, even after the file holds
real content elsewhere. For these two, check ENTRY-by-entry (insight-log)
or SECTION-by-section (context.md): does at least one real, non-template
unit exist? If yes, the file is usable ~ read the real units, ignore
whatever scaffold is still sitting unused elsewhere in the same file.
Only if EVERY unit is still template prose is the file genuinely unfilled.
Flagging the whole file as "missing" because ONE unused placeholder
section remains, when a real entry sits right next to it, would re-block
every second-and-later period the exact way the first-period exceptions
below exist to prevent for period one.

**Two accumulating sections live INSIDE the otherwise one-shot
`brief.md`/`brand-standard.md` files, and get this SAME entry-by-entry
carve-out, not the strict whole-file test:** `brief.md`'s "FAQs &
clarifications" table (explicitly "append new rows; never delete" ~ its
own header) and `brand-standard.md`'s "Revision history lessons" list
(explicitly grows "when a revision round teaches us a brand rule").
Both ship with one or two illustrative example rows that are reasonably
left in place as a formatting reference for whoever appends the NEXT row
~ neither file's own instructions say to delete them, and a client can
legitimately have zero FAQs or zero revision-history lessons yet even
once every genuinely one-shot section (Snapshot, the pasted brief, Unique
asks, Out-of-scope, Voice & tone, Formatting rules, Terminology) is fully
real. Applying the strict whole-file test to these two tables would
permanently block a client whose brief and brand standard are otherwise
completely ready, the same failure mode the `context.md`/`insight-log.md`
carve-out above exists to prevent (Codex catch, 2026-07-19). Check these
two sections entry-by-entry, same rule as `context.md`/`insight-log.md`:
a template example row sitting unused next to zero or more real rows
doesn't block the file; the REST of `brief.md`/`brand-standard.md` still
gets the strict whole-file test.

**Exception, or every brand-new client permanently blocks their own first
report:** `brief.md` and `brand-standard.md` (files 4–5 above) still MUST
be filled before generating ~ they're what the client actually asked for,
never optional. But files 6–7 legitimately stay templated for different
reasons and on different timelines, so they get two DIFFERENT exceptions,
not one shared cutoff:
- **`insight-log.md` (file 7): first period ONLY ~ and verify it, don't
  infer it from the log alone, and check `brief.md`'s Snapshot `Client
  history` field FIRST, before even looking at delivery-log.md.** An empty
  `insight-log.md` is ambiguous by
  itself: it's consistent with a genuine first period, but it's ALSO
  consistent with period one's capture-loop write having been skipped
  (period two or later mistakenly reading as bootstrap), AND with an
  ESTABLISHED client whose real prior history simply predates this corpus
  ~ `ROADMAP.md`'s rollout only backfills cycles already in flight at
  onboarding, never a client's actual historical archive, so an
  established client's delivery-log/insight-log legitimately start
  exactly as empty as a genuinely new client's do (Codex catch,
  2026-07-19). **Check `Client history` first:** if it reads "Established
  since {…}," this is NOT a first period no matter how empty the logs
  are ~ flag it explicitly ("established client, no historical trend
  captured in this system yet ~ real prior history exists but predates
  this corpus, not evaluable for a trend read here") rather than silently
  treating it as day one and discarding the fact that real context
  exists, just not here. Only if `Client history` reads "New" does the
  original delivery-log check apply: check
  `clients/{client}/delivery-log.md` for any prior row with `Status =
  delivered`/`revising`/`revising (reopened)`/`accepted` (a cycle that has
  actually shipped
  before). None found → genuinely period one, exception applies, note "no
  prior context/trend to draw on, first period for this client" and
  generate. One or more found, but `insight-log.md` is STILL empty → NOT a
  bootstrap state, this is the capture loop having broken ~ flag it
  explicitly ("prior cycle(s) shipped per delivery-log.md but no
  insight-log entry exists ~ capture gap, not a first period") instead of
  silently treating it as day one. Once `insight-log.md` holds its first
  real entry, it's usable ~ read that entry (and any others) for the
  trend, per the entry-level check above; an unused trailing placeholder
  block below the real entries doesn't make the file "missing" again.
- **`context.md` (file 6): no fixed cutoff, exception lasts until it has
  real content.** It's populated by the weekly promotion pass writing
  actual `CLIENT-FACT` learnings into it (Deliverable 1 §5, `learnings/
  README.md`), not by simply having shipped a report ~ a client can
  genuinely go several periods before the team learns a distinct-enough
  fact worth promoting there. Bounding this file's exception to "period
  one only" would flag period two, three, however many as "missing" for
  staying exactly as designed: legitimately unwritten because nothing
  promotable has happened yet, not because anyone skipped a step. Treat
  `context.md` as "no context yet" for as long as it's genuinely still
  templated, regardless of period count, and stop treating it as an
  exception the moment it holds its first real fact.
Either way, note the gap plainly in the draft ("no prior context to draw
on yet" / "first period for this client, no trend to draw on") rather than
silently generating as if the history existed.

## Step 1 ~ Ground in the period's data

**If NO current-period export was provided at all (no Sentimo/MCP pull,
no platform data attached) ~ STOP and ask for it before generating
anything, same blocking precondition `amplifi-qa`'s Step 0 already
enforces on the verification side.** This skill's whole premise is
"grounds only in current-period data" ~ without ANY period data to ground
in, there is nothing to write insights, an exec summary, or
recommendations FROM except the brief and historical corpus, which would
produce exactly the generic, ungrounded output this skill exists to ban,
while still claiming to be data-grounded (Codex catch, 2026-07-19). This
is different from a single missing FIELD inside an otherwise-supplied
export (a metric absent from an otherwise-real data pull) ~ that case
still gets the flag-and-continue treatment below, since most of the
period genuinely IS covered and one gap doesn't invalidate the rest.
Refusing outright is for the all-or-nothing case: the export itself is
missing, not a figure within it.

Work ONLY from the data provided for this period (Sentimo/MCP exports,
platform pulls). Rules:
- Every number presented as CURRENT must either exist directly in the
  provided period data, or be a deterministic calculation FROM it (totals,
  averages, rates, period-over-period % change) where the inputs and the
  calculation are traceable ~ show your work if it's not obvious. What's
  banned is invented or estimated figures with no traceable source, not
  ordinary arithmetic on real data. If a needed input is missing: flag it,
  don't invent it.
- Historical figures from the insight-log are allowed ~ required, even, for
  the trend read ~ but ALWAYS labeled with their period ("engagement was
  4.2% in Mar 2026"), never presented as this period's number. Current
  numbers come from the export; past numbers come from the log, wearing
  their date, OR from the CURRENT export itself when it directly supplies
  a labeled comparison-period value (Sentimo/MCP pulls commonly include a
  period-over-period column or a prior-period reference alongside the
  current numbers) ~ same fourth accepted historical source
  `amplifi-qa/SKILL.md` check 4 now reads on the verification side. Don't
  omit or flag a past-period figure the export ALREADY states outright
  just because it isn't ALSO sitting in the terse insight-log headline ~
  that would have generation and verification applying different sourcing
  policies for the exact same value (Codex catch, 2026-07-19). Still label
  it with its period, same rule as any other historical figure.
- **The insight-log entry itself is a terse 5–10 line headline, not a full
  metrics snapshot** ~ by design (`insight-log.md`'s own format: "keep it
  tight... link the full report, don't paste it"). A metric that matters
  THIS period but wasn't one of the 1–3 headline figures selected in an
  earlier entry is real history that just isn't sitting in the terse log
  line ~ **but don't assume the linked `Full report: {Drive link}` is
  actually reachable this session.** Neither documented deployment path
  guarantees it: the no-connector fallback (`DRIVE-HANDOFF.md` step 4)
  attaches only the relevant corpus files per session, never an external
  report link, and even the primary Drive-for-Desktop path only syncs
  `amplifi-knowledge/` ~ finished report exports commonly live elsewhere
  in Drive. So: **if this session has live, already-CONFIRMED Drive
  access reaching that specific file** (not assumed, actually verified
  ~ e.g. the connector already proved it can read that folder earlier in
  the session), follow the link and pull the figure, same labeling rule
  as any historical figure. **Otherwise, don't stall waiting on a fetch
  that may not resolve** ~ flag the metric as unavailable this period
  ("{metric} would strengthen this trend read but isn't captured in
  insight-log.md's headline and the linked report isn't reachable this
  session") and generate without it. If the SAME metric keeps being
  needed period after period, that's a signal worth a `CLIENT-FACT` note
  to the improve skill ~ promote it into `context.md`, **carrying its
  origin period explicitly** ("engagement rate 4.2% as of Mar 2026"),
  since a dated `context.md` entry is a third accepted historical source
  (alongside the insight-log entry and a reachable linked report ~ see
  `amplifi-qa/SKILL.md` check 4). An undated promotion doesn't count ~ the
  same period-labeling rule this whole bullet already runs on applies to
  `context.md` too, so the value stays reliably available next time
  instead of needing an external report re-fetched on every future run.
- Stamp the draft: client, period, data window dates.

## Step 2 ~ Generate to the bar

- Insights must pass the "earns its place" tests in
  `what-good-looks-like.md` ~ specific, data-grounded, trend-aware,
  with a so-what for THIS client.
- Weave the insight-log: connect this period to the accumulated trend.
  A flat period is a trend story ("3rd flat month; here's the 6-month
  drift and what historically moved it"), never filler. **Exception: this
  client's first report under this corpus** (Step 0's first-period
  exception, whether genuinely period one for a "New" client or an
  "Established" client's first report since onboarding onto this system
  ~ same two cases, same `Client history` check). There is no accumulated
  trend to weave yet either way, so note that plainly ("no prior
  context/trend to draw on, first period for this client" / "no
  historical trend captured in this system yet") instead of inventing one
  or blocking the report over an unweavable requirement (Codex catch,
  2026-07-19: this step's unconditional wording conflicted with Step 0's
  own exception for exactly this state).
- Voice: follow `house-voice.md` and the client's `brand-standard.md`.
  The "we never sound like" list is a hard ban.

## Step 3 ~ Recommendations

- Each reco names: the action, where (platform/audience), and the expected
  effect tied to the data.
- **"Just continue" / "maintain current strategy" is banned as a sole
  recommendation.** If the data genuinely says steady: recommend what to
  WATCH, the threshold that would change the call, and one experiment
  worth running.
- Check `context.md` ~ don't re-recommend what the client already rejected.

## Step 4 ~ Output shape

Produce ONLY the sections this skill owns ~ executive summary, analysis,
insights, recommendations ~ in the order and shape
`report-template-rules.md` gives them, in markdown, ready to paste into the
Canva template. Never generate or overwrite the sections you don't own
(cover, performance-vs-baseline data blocks, appendix) ~ those have their
own sources. End with:

```
DATA NOTES: {gaps, anomalies, anything a human should verify}
INSIGHT-LOG ENTRY (paste into clients/{resolved folder}/insight-log.md):
{the 5–10 line entry per the log's format}
```

**`{resolved folder}` is the ACTUAL folder Step 0 resolved to (the slugged
and, if collision-suffixed, numbered path ~ e.g. `ACME-EMEA-2`), never the
client's raw display name re-typed here.** This trailer is the operational
paste instruction, not client-facing content ~ for a slugged or
collision-suffixed client, `clients/{display name}/insight-log.md` can
fail outright or resolve into an unintended nested path, leaving the real
client's history empty (Codex catch, 2026-07-19). Keep the unslugged,
real name inside the log entry's own prose; only the path uses the
resolved folder.

That trailer is mandatory ~ it's how reports compound.
