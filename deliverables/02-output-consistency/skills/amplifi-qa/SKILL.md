---
name: amplifi-qa
description: Pre-finalization QA gate for Amplifi report drafts. Checks a draft against the encoded standards in the knowledge base (voice, branding, actionability, data freshness, hallucination risk) and returns a pass/flag checklist. Use before a report goes to internal alignment or the client.
---

# Amplifi Report QA Gate

You check a report draft against Amplifi's encoded standard **before** the
human verify step. You make that verification faster and sharper ~ you never
replace it. Flags are suggestions to a human who decides.

## Step 0 ~ Load the bar (rules live in the corpus, never in this skill)

Required inputs, all of them:
1. The report content, one of three tiers depending on which checkpoint
   AND what you're actually shown ~ these are not interchangeable:
   - **First pass (pre-Canva):** the full markdown draft. Run all five
     checks.
   - **Second pass, FULL CLEARANCE (post-Canva, see
     `standards/report-template-rules.md` §"Two checkpoints, not one"):**
     a **visually-rendered export** ~ page images/screenshots of every
     slide, or a PDF exported so charts, logos, and positioned text are
     actually rendered (not a raw text-extraction of a PDF, which drops
     exactly the visual layer this checkpoint exists to check). Run all
     five checks. This is the ONLY tier that counts as clearance to ship
     ~ **but "visually rendered" isn't the same as "every plotted value is
     verifiable."** A chart image proves logos/layout/brand and any
     figure that's actually LABELED in it (a data callout, an axis value
     with a printed number, a legend'd total), but an unlabeled bar,
     point, or series can't be reverse-engineered from pixels and
     compared against the export ~ seeing the chart isn't the same as
     confirming what it plots. Check 4 on this tier still only earns a
     plain `✔` for the figures actually readable in the render (labeled
     values, and anything also stated in surrounding prose); any plotted
     value with no visible label gets named in the output as **unverified
     from this render** (not silently passed, not a blocking flag either
     ~ a distinct third state: "plotted but unlabeled, source data would
     be needed to confirm"). Don't let "I can see the chart" quietly
     stand in for "I checked what the chart says."
   - **Second pass, TEXT-ONLY (a lesser tier, not clearance):** a bare
     text export/extraction with no visual rendering. Run check 4, SCOPED
     to whatever figures the extraction actually captured ~ text can
     confirm numbers, but a number that lives only inside a chart image
     (a label, an axis value never restated in prose) doesn't survive text
     extraction either, so this is coverage of the VISIBLE-AS-TEXT figures,
     not a guarantee every figure in the deck got checked. Mark checks 1,
     2, 3, 5 as `NOT EVALUATED (no visual render provided)`.
   - **Screenshots of just the key numbers:** same tier as text-only, same
     scoping caveat, tighter still ~ check 4 covers ONLY the figures
     actually visible in the screenshots handed over, nothing else in the
     report. Same `NOT EVALUATED` marks on the rest.
   **Neither lesser tier earns a plain `✔` on check 4** ~ mark it `◐
   PARTIAL (scoped to N figures actually shown; the rest of the report's
   numbers were not checked)` instead, and name what wasn't covered. A
   bare `✔` there would read as "data integrity confirmed for this
   report," when the honest claim is narrower: "confirmed for the figures
   I could see." Only a visually-rendered full-deck pass (the tier above)
   can see every figure in the report and earn an unqualified `✔`/`✘` on
   check 4. Never emit a PASS, and never imply clearance, for checks you
   couldn't actually see the content for. If what you're given doesn't
   visually render the deck, say so explicitly in the output header before
   running anything.
2. The **current period's source data** (the same Sentimo/MCP exports the
   draft was generated from). Without it, check 4 cannot trace a single
   figure ~ so if it's not provided, STOP and ask for it. Never run
   data-integrity blind and flag everything as untraceable.
3. From `amplifi-knowledge/`:
   - `standards/what-good-looks-like.md` (use its checklist section)
   - `standards/house-voice.md`
   - `standards/report-template-rules.md`
   - `clients/{client}/brand-standard.md`, `brief.md`, `context.md`,
     `insight-log.md`

If a standards file is an unfilled frame, run anyway but say so at the top:
"Bar not yet encoded for: {file} ~ checks in that area are generic."

## Step 1 ~ Run the five checks

1. **Brief alignment** ~ does the draft answer what `brief.md` (incl. FAQs
   and unique asks) actually asked? Their #1 rework cause; check hardest.
2. **Voice & brand** ~ house-voice violations, "AI tells" from the banned
   list, brand-standard misses (terminology, formatting, structure vs
   `report-template-rules.md`).
3. **Actionability** ~ every recommendation passes the actionable-when
   tests; "just continue" alone = automatic flag; recos the client already
   rejected (per `context.md`) = flag.
4. **Data integrity** ~ check each figure against its claimed source, not
   one blanket source: figures presented as CURRENT must either appear
   directly in the provided period data OR be a deterministic calculation
   from it (total, average, rate, period-over-period change) that you can
   re-derive and show ~ that's a pass, not a flag; figures explicitly
   labeled with a past period (the insight-log trend reads the insights
   skill is required to include) must exist in `insight-log.md`'s entry
   for that period, OR ~ only if this session has live, already-confirmed
   Drive access reaching it, never assumed ~ in the full report that entry
   links to (`Full report: {Drive link}`); the log entry itself is a terse
   headline, not every figure from that period, so a historical number
   genuinely sourced from a reachable linked report is still a pass, not a
   flag. If the insights skill flagged a figure as unavailable this period
   (linked report not reachable this session, per its own Step 1 rule),
   don't re-flag that same gap here as a data-integrity failure ~ it's
   already surfaced honestly, not hidden.
   List any number that fails its OWN check ~ isn't in the export, can't
   be re-derived from it, and isn't a labeled historical figure ~ these go
   to the human verify step first. Also flag: any CURRENT-labeled figure
   that matches a past insight-log entry AND cannot independently be
   confirmed in the current-period export ~ that combination is the
   stale-template ghost. A figure that matches a past value BUT is also
   genuinely present in this period's export is a real flat metric, not a
   ghost ~ flat is expected and explicitly allowed elsewhere in this
   deliverable (the "boring months" trend-read case); don't flag it.
5. **Compounding** ~ does the draft use the insight-log trend where it
   should? A quiet month with no trend read = flag. **Exception: a
   client's genuinely first-ever period**, where `insight-log.md` is
   still correctly empty because no report has shipped yet (see
   `amplifi-insights/SKILL.md`'s Step 0 first-period exception, same
   corpus, same logic) ~ there is no trend to have used, so mark this
   check `PASS` (or `N/A`) instead of flagging an impossible requirement.
   Confirm it's genuinely period one the same way `amplifi-insights` does
   ~ check `delivery-log.md` for any prior `delivered`/`revising`/
   `accepted` row, not just whether `insight-log.md` is empty (an empty
   log alone doesn't distinguish real period one from a broken capture
   loop) ~ before applying this exception; a second period with a still-empty
   log is a real gap, not a bootstrap state, and gets flagged normally.

## Step 2 ~ Report format (fixed)

```
QA GATE ~ {client} {period} ~ {input: full draft | visually-rendered deck (clears) | text-only/screenshots (does NOT clear)} ~ {PASS | N flags | partial}

✔/✘/— Brief alignment       (— = not evaluated, screenshots-only input)
✔/✘/— Voice & brand         (— = not evaluated, screenshots-only input)
✔/✘/— Actionability         (— = not evaluated, screenshots-only input)
✔/✘/◐ Data integrity        (◐ = PARTIAL, scoped to N figures actually
                              shown ~ text-only/screenshots tier only;
                              visually-rendered/full-draft tiers get a
                              plain ✔/✘, never ◐)
✔/✘/— Compounding           (— = not evaluated, screenshots-only input)

FLAGS (each: location → issue → suggested fix, one line each)
1. {Exec summary ¶2} → {"maintain momentum" is a sole reco} → {add watch-threshold + experiment}
…

VERIFY-FIRST LIST (numbers the human must check before anything else)
- {figure} in {section} ~ {couldn't trace to period data}
```

Order flags by severity: data integrity first, then brief alignment, then
the rest. Be terse ~ the analyst should clear this list in minutes, not
re-read the report.

## Step 3 ~ If a flag gets corrected, log it

End every output with this reminder, verbatim:

```
If you fix any flag above before this report ships, log it now ~
delivery-log.md touch 1.5: bump Rounds by ONE (this whole pass, not once
per flag fixed) and append ONE cause tag, chosen by priority if more than
one check flagged something (brief-misalign > brand > quality-bar > data),
right on this row, before you move on. Checks 1/2/4 map to
brief-misalign/brand/data respectively; checks 3 (actionability) and 5
(compounding) map to quality-bar ~ they're failures against
what-good-looks-like.md's bar, not the brief, brand standard, or a data
problem specifically. Fixing BOTH a brief-alignment flag and a data flag
in this one pass is still ONE round, ONE tag (brief-misalign wins the
priority, data goes in Notes) ~ never one bump per flag, never more than
one tag entry for this pass.
```

This QA gate is one of the three pre-send checkpoints touch 1.5 exists to
catch (the other two are internal alignment and the post-Canva pass ~ see
`delivery-log.md` and `ARCHITECTURE-MAP.md` step 9). Without this
reminder, an analyst can clear every flag here, ship a clean-looking
report, and never touch the delivery-log row ~ the correction happened,
but the instrument's `Rounds` and `Rework tag` stay at their defaults,
silently understating both rounds-per-report and the corpus-tag share
FIX_CORPUS routes on. A `PASS` with nothing to fix needs no entry ~ only
an actual correction does.
