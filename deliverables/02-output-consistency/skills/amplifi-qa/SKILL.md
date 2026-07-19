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
     verifiable," and this checkpoint doesn't get to wave that away.** A
     chart image proves logos/layout/brand and any figure that's actually
     LABELED in it (a data callout, an axis value with a printed number, a
     legend'd total), but an unlabeled bar, point, or series can't be
     reverse-engineered from pixels and compared against the export ~
     seeing the chart isn't the same as confirming what it plots, and this
     is precisely the mandatory ship-gate whose whole job is catching a
     stale or wrong Canva chart. So: any plotted value with no visible
     label is a **BLOCKING flag on check 4**, not a silent pass and not a
     soft "unverified" note that still lets the deck clear ~ list it in
     FLAGS ("{chart, section} → plotted value has no visible label,
     can't be confirmed against source data → export the chart's
     underlying numbers or add data labels, then re-run"). The only way
     this tier still earns a plain `✔` on check 4 with unlabeled chart
     elements present is by tying the RENDERED chart's actual values to a
     source ~ either a labeled figure (a data callout, an axis value with
     a printed number, a legend'd total, as above), or the chart's OWN
     underlying/embedded data as Canva actually built it (e.g. an export
     of that specific chart object's live data table from inside Canva,
     not a description of what it should contain). **A separately-supplied
     source table the analyst says the chart "was built from" does NOT
     qualify, and does not earn a `✔` here** ~ it proves the INTENDED
     number is correct, not what's actually rendered. The chart could
     still be built from stale or misconfigured data (a link never
     refreshed, an old chart object copy-pasted from last month's deck),
     and this pass would never catch it if a matching source table alone
     were enough ~ that's precisely the failure this post-Canva checkpoint
     exists to catch (Codex catch, 2026-07-19). If you can't obtain the
     chart's own as-built underlying data, an unlabeled plotted value
     stays a BLOCKING flag on check 4, full stop. Don't let "I can see the
     chart" quietly stand in
     for "I checked what the chart says," don't let "here's the data it
     should show" stand in for "here's proof of what it actually shows,"
     and don't let a checkpoint whose
     entire purpose is catching stale Canva charts clear one it couldn't
     actually verify.
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
     `insight-log.md` ~ **resolve `{client}` to its ACTUAL folder name
     under `clients/` first, never assume the display name IS the folder
     name.** A client name with a `/` or other filesystem-reserved
     character is slugged per `README.md`'s rule (`ACME/EMEA` → folder
     `clients/ACME-EMEA/`); reading `clients/{client}/...` straight from
     the raw display name breaks on exactly this case (an unintended
     nested path, or an outright failure), silently missing the corpus
     this whole gate exists to check against (Codex catch, 2026-07-19).
     List `clients/*` and match against each folder's `brief.md` Snapshot
     table (which keeps the REAL, unslugged name for this lookup) to find
     the right folder.

If a standards file is an unfilled frame, run anyway but say so at the top:
"Bar not yet encoded for: {file} ~ checks in that area are generic."

**`brief.md` and `brand-standard.md` don't get this same "run anyway,
generic bar" treatment ~ they're required, not a frame.** A
freshly-copied `_template-client` folder has both still full of
unresolved `{...}` placeholders and the template's own instructional
prose, same detection `amplifi-insights/SKILL.md`'s Step 0 already uses.
If either is still templated, **STOP before running checks 1 or 2** and
say so plainly ("brief.md / brand-standard.md not filled for this client
~ checks 1/2 would be run against no real bar, refusing rather than
issuing a false pass"). A manually-assembled or externally-sourced report
run through this gate against a template-only client folder would
otherwise clear brief-alignment and voice/brand checks against nothing,
exactly the gap `amplifi-insights` already closes on the generation side
~ QA needs the same floor on the verification side, or a report can
route around the insights skill's check and still get a clean QA pass.
`context.md`/`insight-log.md` keep their existing first-period/no-context
exceptions (see check 5 below) ~ this stricter rule is brief.md/
brand-standard.md only. **Within those two files, the SAME "same
detection" cross-reference also carries over `amplifi-insights`' two
accumulating-section carve-outs** ~ `brief.md`'s FAQ table and
`brand-standard.md`'s revision-history list stay template-example rows by
design even once the rest of the file is genuinely filled, so check those
two sections entry-by-entry (per `amplifi-insights/SKILL.md`'s Step 0),
never as part of this whole-file STOP condition.

## Step 1 ~ Run the five checks

1. **Brief alignment** ~ does the draft answer what `brief.md` (incl. FAQs
   and unique asks) actually asked? Their #1 rework cause; check hardest.
2. **Voice & brand** ~ house-voice violations, "AI tells" from the banned
   list (against the shared `standards/house-voice.md`), brand-standard
   misses (terminology, formatting, structure vs `report-template-rules.md`
   AND `clients/{client}/brand-standard.md`). **These are two different
   corpus files ~ note which one an actual violation traces to** (Step 3's
   logging reminder needs this distinction; a bare "check 2 flagged
   something" loses it).
3. **Actionability** ~ every recommendation passes the actionable-when
   tests; "just continue" alone = automatic flag; recos the client already
   rejected (per `context.md`) = flag.
4. **Data integrity** ~ check each figure against its claimed source, not
   one blanket source: figures presented as CURRENT must either appear
   directly in the provided period data OR be a deterministic calculation
   from it (total, average, rate, period-over-period change) that you can
   re-derive and show ~ that's a pass, not a flag; figures explicitly
   labeled with a past period (the insight-log trend reads the insights
   skill is required to include) must exist in ONE of three accepted
   historical sources, all still needing the same period label: (a)
   `insight-log.md`'s entry for that period; (b) ~ only if this session has
   live, already-confirmed Drive access reaching it, never assumed ~ the
   full report that entry links to (`Full report: {Drive link}`); (c) a
   dated `CLIENT-FACT` entry in `context.md` that recorded the value at
   promotion time (the weekly promotion pass writes these with an origin
   date, per `learnings/README.md` ~ a metric promoted here because it
   recurs is exactly as valid a historical source as the terse log line,
   as long as its date travels with it). The log entry itself is a terse
   headline, not every figure from that period, so a historical number
   genuinely sourced from (b) or (c) is still a pass, not a flag, same
   labeling rule as any other historical figure. **Before passing a
   historical figure off ANY single source, cross-check the OTHER
   reachable sources for the SAME metric and period ~ don't stop looking
   the moment one source agrees with the draft.** The three sources are
   supposed to describe the same historical fact, but a correction can
   reach one without reaching the others (`insight-log.md`'s own
   "conditional third touch" is explicitly required to update a matching
   `context.md` fact when one exists, but that's a human step and can be
   missed ~ see `insight-log.md`). If `insight-log.md` and `context.md`
   (or either against a reachable linked report) disagree on the SAME
   period's SAME metric, that's a **data-integrity FLAG, not a pass**,
   regardless of which value the draft happens to use ~ list it
   explicitly ("{metric} for {period}: insight-log.md says {X}, context.md
   says {Y}, sources disagree, resolve before trusting either") rather
   than silently accepting whichever source matches (Codex catch,
   2026-07-19: without this check, a draft could reuse a stale `context.md`
   value and still clear check 4 because SOME accepted source technically
   agreed with it). If the insights skill
   flagged a figure as unavailable this period (none of the three sources
   reachable or dated, per its own Step 1 rule), don't re-flag that same
   gap here as a data-integrity failure ~ it's already surfaced honestly,
   not hidden.
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
one tag entry for this pass. IF the tag is brief-misalign, brand, or
quality-bar: attach its qualifier too, right on the same entry ~
`brief-misalign (missing)` if the brief/standard genuinely didn't cover
this, `brief-misalign (not-followed)` if it already did and this pass
just caught it not being applied. This isn't optional: delivery-log.md's
router treats a corpus-tagged entry with no qualifier as incomplete data,
same as a missing tag entirely. IF THE TAG IS BRAND SPECIFICALLY: the
qualifier needs a SECOND part too, since check 2 covers two different
corpus files ~ SLASH-separated, never comma-separated (a comma here would
parse as a second round entry and break the round-count check):
`brand (missing/house-voice)` if the violation was
against the shared standards/house-voice.md, `brand (not-followed/
brand-standard)` if it was against THIS client's own brand-standard.md.
Never log a bare `brand (missing)` or `brand (not-followed)` with no file
named ~ that's incomplete the same way a missing qualifier is, because it
points FIX_CORPUS at "the brand standard" without saying which one.
FINALLY, append TODAY's date to the entry as `[YYYY-MM-DD]`, e.g.
`brief-misalign (missing) [2026-06-01]` ~ every entry needs this, not just
corpus-tagged ones. This is NOT optional either: the instrument only
counts rework rounds whose OWN date falls in its trailing 90-day window,
so an otherwise-correct but undated entry silently drops out of that
count entirely ~ the correction genuinely happened, but the router never
sees it, and the corpus-tag share or rounds-per-report reading FIX_CORPUS
(and HIRE, downstream of it) acts on comes out artificially clean.
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
