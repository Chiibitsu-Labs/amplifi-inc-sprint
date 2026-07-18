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
     five checks. This is the ONLY tier that counts as clearance to ship.
   - **Second pass, TEXT-ONLY (a lesser tier, not clearance):** a bare
     text export/extraction with no visual rendering. Run check 4 only ~
     text can confirm numbers but tells you nothing about a stale chart
     image, wrong logo, or off-brand layout, which is most of what this
     checkpoint is FOR. Mark checks 1, 2, 3, 5 as `NOT EVALUATED (no
     visual render provided)`.
   - **Screenshots of just the key numbers:** same tier as text-only ~
     check 4 only, same `NOT EVALUATED` marks on the rest.
   Never emit a PASS, and never imply clearance, for checks you couldn't
   actually see the content for. If what you're given doesn't visually
   render the deck, say so explicitly in the output header before running
   anything.
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
   skill is required to include) must exist in `insight-log.md` instead.
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
   should? A quiet month with no trend read = flag.

## Step 2 ~ Report format (fixed)

```
QA GATE ~ {client} {period} ~ {input: full draft | visually-rendered deck (clears) | text-only/screenshots (does NOT clear)} ~ {PASS | N flags | partial}

✔/✘/— Brief alignment       (— = not evaluated, screenshots-only input)
✔/✘/— Voice & brand         (— = not evaluated, screenshots-only input)
✔/✘/— Actionability         (— = not evaluated, screenshots-only input)
✔/✘   Data integrity        (always evaluated when any data is provided)
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
