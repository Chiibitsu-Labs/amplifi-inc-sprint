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
1. The report **draft**.
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
4. **Data integrity** ~ every stated figure exists in the provided period
   data. List any number you cannot trace ~ these go to the human verify
   step first. Check the period stamp; flag any figure identical to the
   previous period's insight-log entry (stale-template ghost).
5. **Compounding** ~ does the draft use the insight-log trend where it
   should? A quiet month with no trend read = flag.

## Step 2 ~ Report format (fixed)

```
QA GATE ~ {client} {period} ~ {PASS | N flags}

✔/✘ Brief alignment
✔/✘ Voice & brand
✔/✘ Actionability
✔/✘ Data integrity
✔/✘ Compounding

FLAGS (each: location → issue → suggested fix, one line each)
1. {Exec summary ¶2} → {"maintain momentum" is a sole reco} → {add watch-threshold + experiment}
…

VERIFY-FIRST LIST (numbers the human must check before anything else)
- {figure} in {section} ~ {couldn't trace to period data}
```

Order flags by severity: data integrity first, then brief alignment, then
the rest. Be terse ~ the analyst should clear this list in minutes, not
re-read the report.
