# Patterns ~ The Durable Tally

> **Append-only.** This file is written by the weekly promotion pass
> (`amplifi-improve`, promote mode ~ see `learnings/README.md`), never by
> hand mid-week, and never read back INTO a promotion pass as a source
> file (that would re-promote its own tally into itself). It's the running
> memory the when-to-hire instrument's AUTOMATE and REDESIGN reasoning
> reads across weeks ~ `learnings/*.md` session files are ephemeral inputs,
> this is the durable output.

## How a promotion pass writes here

One week-block per week, appended (never edited/overwritten). **One
bullet per DISTINCT theme, not one bullet per tag** ~ if a week surfaced
three unrelated REWORK themes, that's three `REWORK` bullets, not one
bullet trying to hold three themes:

```markdown
## {YYYY-MM-DD} (week of)
- REWORK: {theme, count, which clients} ~ e.g. "brief-misalign, 3x, ClientA×2 ClientB×1"
- REWORK: {a second, unrelated theme this same week, count, clients} ~ e.g. "stale data carried over, 2x, ClientD"
- PROCESS: {friction theme, count, which clients} ~ e.g. "long queue for data pulling, 4x, ClientA ClientC ClientD"
```

Keep entries terse ~ counts and themes, not narrative. The instrument's
manual router walkthrough (`INSTRUMENT.md` §5a) and any future automated
version (§5b) read the running counts PER THEME across entries ~ merging
distinct themes into one bullet would hide which one is actually
recurring, which is the entire thing this file exists to show.

## Reading this file

- **Trend, not snapshot:** a theme appearing once is noise; the same
  theme recurring across 3+ weekly entries is signal ~ that's what the
  router's AUTOMATE/REDESIGN branches are actually looking for.
- **Cross-reference with `delivery-log.md`:** this file gives the
  pattern (what keeps coming up); the delivery logs give the hard numbers
  (rework rounds, tags, on-cadence) the router's thresholds actually
  check. Neither replaces the other.

---

## {YYYY-MM-DD} (week of) ~ first entry lands here
