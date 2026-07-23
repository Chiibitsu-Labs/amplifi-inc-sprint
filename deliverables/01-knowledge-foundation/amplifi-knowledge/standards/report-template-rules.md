# Report Template Rules ~ Structure & Branding Every Report Follows

> **Status: FRAME ~ confirm against the current Canva template set.**
> **Version: 0.1.0 (unfilled)**
> The single description of what an Amplifi intelligence report IS ~ so the
> insight skill produces content already shaped for the deck, and the manual
> "transfer data to template so the deck doesn't look AI" step can shrink
> and eventually disappear. A living document from here on:
> `amplifi-onboarding` does the first fill, `amplifi-improve`'s weekly
> promotion pass sharpens it after ~ see the Changelog at the bottom.

## How to fill this file (30 minutes, once)

Unlike the other two standards frames, this one isn't extracted from
reports ~ it's extracted from the actual Canva template and brand kit,
since that's where the real structure and branding rules live.

1. Open the current Canva report template (and the brand kit / asset
   library) side by side with this file.
2. Export or screenshot the template's section order, fonts, colors, logo
   placement, and chart styles, then run the extraction prompt below with
   Claude, attaching those exports.
3. **Edit what it drafts** ~ Rica confirms the real structure, the AI just
   organizes it into this file's shape.
4. Delete this instruction block AND change line 3's `Status: FRAME` to
   `Status: LIVE` (or delete the whole blockquote). Both edits matter ~
   `amplifi-insights`' Step 0 corpus-readiness check treats a file still
   carrying `Status: FRAME` as unfilled regardless of what's below it, so
   removing the instructions alone doesn't actually make the file "live"
   as far as the skill can tell. The file is live once BOTH are gone.

**Extraction prompt** (paste with the Canva template exports attached):
> "This is Amplifi's current intelligence report template and brand kit.
> From it, extract: (1) the exact section order and what each section
> contains; (2) the specific fonts, colors (hex if visible), logo
> placement, and chart style rules; (3) anything the team currently fixes
> by hand every time (a recurring manual touch-up) that could instead be a
> written rule here. Draft the sections below. Be concrete ~ name actual
> values, not descriptions of them."

## Canonical report structure

| # | Section | Contains | Source |
|---|---|---|---|
| 1 | Cover | client name, period, Amplifi branding | Canva template |
| 2 | Executive summary | the period in {N} bullets, headline insight first | insight skill |
| 3 | Performance vs baseline | {the metrics blocks in order} | Sentimo / MCP data |
| 4 | Deep-dive analysis | {per-platform? per-campaign? confirm} | insight skill |
| 5 | Insights | insights meeting the `what-good-looks-like.md` bar | insight skill |
| 6 | Recommendations | actionable recos, trend-aware | insight skill |
| 7 | Appendix | methodology, data notes | standing copy |

{Adjust rows to the real template ~ then this table IS the contract between
the skill's output and the Canva deck.}

## Branding rules (the "doesn't align w/ amplifi branding" fix)

- Fonts: {…} · Colors: {hex values} · Logo placement: {…}
- Chart style: {…}
- {Anything the team currently fixes by hand in Canva, written down}

## Fresh-data rules (the "old data retained in templates" fix)

- Every number in sections 2–6 must come from THIS period's data pull
  (including a deterministic figure derived from it ~ total, average,
  rate, period-over-period change) or a historical figure explicitly
  labeled with its past period and traceable to one of the FOUR sources
  `skills/amplifi-qa/SKILL.md` check 4 accepts: (a) `insight-log.md`'s
  entry for that period, (b) a reachable linked full report (only when
  this session has live, already-confirmed Drive access to it), (c) a
  dated `CLIENT-FACT` entry in `context.md`, or (d) the current-period
  export's own labeled comparison-period value ~ never typed over last
  period's deck untraced. **This rule and check 4 have to name the SAME
  four sources** ~ a figure `amplifi-insights` correctly sourced from (b),
  (c), or (d) and check 4 correctly passes would otherwise violate a
  narrower "insight-log trend only" reading of this rule, producing a
  report the generation skill and the QA skill disagree on (Codex catch,
  2026-07-19). **Exception: a
  clearly-labeled KPI target, contractual baseline, or campaign budget
  figure in section 3 ("Performance vs baseline") is a DIFFERENT kind of
  number from either of those and is sourced from `brief.md` instead** ~
  it was never measured this period (not a current pull) and was never
  logged as a past actual either (not any of the four accepted historical
  sources above), so this rule
  as written would wrongly forbid the exact figure section 3's own name
  describes as normal. `skills/amplifi-qa/SKILL.md` check 4 already
  accepts a brief-sourced target/baseline/budget as a pass, not a flag ~
  this rule needs the same carve-out, or QA can clear a figure this
  section still forbids (Codex catch, 2026-07-19).
- **A second, separate exception, this one for section 6 (Recommendations)
  specifically: a labeled PROPOSED ACTION PARAMETER is not a factual claim
  at all, and this rule's four-source whitelist was never meant to cover
  it.** "Test three posts per week for two weeks" or "raise the daily
  budget to $150 for the trial window" states what the recommendation
  itself IS ~ a number the analyst is proposing going forward, not a
  current-period result, a historical figure, or a brief-sourced
  contractual target. As written, this rule's source list has no category
  for it, so a genuinely well-formed, actionable recommendation reads as
  an untraceable figure under `skills/amplifi-qa/SKILL.md` check 4,
  penalizing exactly the concrete specificity the insight skill is
  required to produce there (Codex catch, 2026-07-19: this rule's number
  sourcing requirement, written for factual/performance figures, was
  applied unmodified through section 6, where the insight skill's own
  actionability bar explicitly demands numeric experiment settings and
  watch-thresholds that by definition describe a proposal, not a
  measurement). Add a labeled `PROPOSED`/`ASSUMPTION` category, scoped
  OUT of source tracing entirely: a number in section 6 explicitly framed
  as the recommendation's own parameter (a test duration, a cadence, a
  budget change, a threshold to watch for) needs no citation to any of the
  four sources above ~ it only needs to read unambiguously as a proposal,
  not a reported fact, so a reader (and QA check 4) can't mistake it for
  an unsourced current-period claim. A number in section 6 that DOES claim
  to describe something that already happened (past performance cited to
  justify the recommendation) still needs the normal four-source tracing
  ~ this exception covers only the forward-looking parameter itself, never
  smuggles an untraced factual claim through under a "recommendation"
  label.
- Period-stamp the exec summary: "{Month YYYY} · data window {start}–{end}."
- The QA skill cross-checks the deck's period stamp against the data window
  and flags any figure that matches last period's report verbatim AND
  can't independently be confirmed in this period's export ~ a figure that
  matches the prior period but IS genuinely present in the current data is
  a real flat metric, not a stale-template ghost, and isn't flagged (see
  `skills/amplifi-qa/SKILL.md` check 4 ~ same rule, stated once, read from
  both places).

**Two checkpoints, not one.** The QA gate runs on the markdown draft ~
before Canva. That catches drift the skill introduced, but the exact
failure this section names ("old data retained in templates," stale
charts/numbers) mostly happens DURING the manual transfer into last
period's Canva file, which is a step after QA already passed. Content that
was clean in the draft can still ship stale if the deck retained an old
chart image or a typed-over number. So:
- The markdown QA pass is checkpoint one: catches skill-introduced errors
  before Canva.
- **Before sending to the client, re-run the full QA skill against a
  VISUALLY-RENDERED export of the assembled deck ~ page images or a PDF
  that actually shows charts/logos/layout, not a text-only extraction.
  This is what clears the report to ship.** A text-only export or
  screenshots of just the key numbers are a faster interim sanity-check
  an analyst can run anytime, but they only cover check 4 (data
  integrity) ~ see `skills/amplifi-qa/SKILL.md`. Neither can see stale
  chart IMAGES, wrong logos, or off-brand layout ~ exactly what this
  checkpoint exists to catch, and exactly what a text extraction drops
  even when it technically counts as "the full deck." **Only a
  visually-rendered full-deck pass counts as clearance to send.**
- Until this second pass is habitual, the existing human "VERIFICATION OF
  AI RESULTS" step should explicitly include "has the full-deck QA pass
  run and passed" as a checklist line ~ don't let the deck be the one
  artifact nothing fully checks.

## Format notes

- Working format: markdown from the skill → Canva for client-facing polish.
- MS Office only when the client asks (per intake ~ don't default to it).

## Changelog

> `amplifi-onboarding` logs the first fill here. After that,
> `amplifi-improve`'s Mode 2 (weekly promotion) bumps the version and adds
> a line every time a real correction changes this file ~ patch (0.1.x)
> for a value tweak (a color, a font), minor (0.x.0) for a structural rule
> added, major (x.0.0) reserved for a full re-fill against a new Canva
> template. Newest entry at the top, same convention as `insight-log.md`.

- {YYYY-MM-DD} ~ v0.1.0 ~ Filled from the current Canva template + brand kit during onboarding.
