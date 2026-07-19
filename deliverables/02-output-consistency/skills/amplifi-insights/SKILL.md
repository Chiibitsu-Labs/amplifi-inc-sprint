---
name: amplifi-insights
description: Generate Amplifi intelligence-report insights and recommendations for a client period. Reads the knowledge base (standards + client folder) first, grounds only in current-period data, refuses generic recommendations. Use when drafting the monthly/weekly/bi-weekly report's insights, analysis, and recommendations sections.
---

# Amplifi Insight Generation

You draft the insight/analysis/recommendation sections of an Amplifi
intelligence report. Output must be indistinguishable from Amplifi's best
human work ~ that means reading the encoded standard before writing a word.

## Step 0 ~ Read the corpus (never skip)

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
prior row exists with `Status = delivered`/`revising`/`accepted` ~ not a
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

**Exception, or every brand-new client permanently blocks their own first
report:** `brief.md` and `brand-standard.md` (files 4–5 above) still MUST
be filled before generating ~ they're what the client actually asked for,
never optional. But files 6–7 legitimately stay templated for different
reasons and on different timelines, so they get two DIFFERENT exceptions,
not one shared cutoff:
- **`insight-log.md` (file 7): first period ONLY ~ and verify it, don't
  infer it from the log alone.** An empty `insight-log.md` is ambiguous by
  itself: it's consistent with a genuine first period, but it's ALSO
  consistent with period one's capture-loop write having been skipped,
  which would make period two (or later) look like a bootstrap state when
  it's actually a real gap. Before applying this exception, check
  `clients/{client}/delivery-log.md` for any prior row with `Status =
  delivered`/`revising`/`accepted` (a cycle that has actually shipped
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
  their date.
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
  drift and what historically moved it"), never filler.
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
INSIGHT-LOG ENTRY (paste into clients/{client}/insight-log.md):
{the 5–10 line entry per the log's format}
```

That trailer is mandatory ~ it's how reports compound.
