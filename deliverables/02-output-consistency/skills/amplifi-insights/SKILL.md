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

**Exception, or every brand-new client permanently blocks their own first
report:** `brief.md` and `brand-standard.md` (files 4–5 above) still MUST
be filled before generating ~ they're what the client actually asked for,
never optional. But `context.md` and `insight-log.md` (files 6–7)
legitimately START templated for a client's very first period ~ the
roadmap only requires 4–5 filled before work begins (1.3a/1.3b);
`context.md` accumulates from real work over time, and `insight-log.md` is
by definition empty until a first report has ever shipped. Applying the
same "still-templated = missing = refuse to generate" rule to these two
would deadlock every new client's bootstrap: no first report without a
filled insight-log, no filled insight-log without a first report. For a
client's genuinely first period ONLY, treat unresolved `context.md`/
`insight-log.md` as "no history yet" ~ note it plainly ("no prior context/
trend to draw on, first period for this client") and generate anyway.
Once a real entry exists in either file, the normal missing/templated
check applies again as usual.

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
