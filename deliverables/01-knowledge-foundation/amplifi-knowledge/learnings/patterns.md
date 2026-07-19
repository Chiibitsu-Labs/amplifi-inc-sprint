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

**`{YYYY-MM-DD}` in the header is ALWAYS that week's Monday (ISO-week
start), never whatever day the promotion pass happened to run on.** Two
different operators covering the same calendar week could otherwise write
two different dates for it (one writes the Monday, another writes the
Friday they actually ran the pass) ~ since week-block matching is exact-
date, that reads as TWO distinct weeks to anything counting cross-week
recurrence, letting occurrences that all happened in ONE real week
falsely satisfy a multi-week threshold (Codex catch, 2026-07-19).
Normalize whatever date you're tempted to write (today's date, the
Friday the pass ran, the date of the underlying session) to that week's
Monday before writing the header ~ this is the SAME normalization step
`REWORK`/`PROCESS` items' own occurrence-date prefixes (per
`amplifi-improve/SKILL.md` Mode 1) get grouped against, so the two stay
consistent.

Keep entries terse ~ counts and themes, not narrative. The instrument's
manual router walkthrough (`INSTRUMENT.md` §5a) and any future automated
version (§5b) read the running counts PER THEME across entries ~ merging
distinct themes into one bullet would hide which one is actually
recurring, which is the entire thing this file exists to show.

**A late-arriving capture for an ALREADY-promoted week needs a defined
home too, not silence.** Session captures don't always land inside the
same week they describe (a Monday capture for last Friday's work, a
delayed manual save) ~ if that week's block has already been written and
promoted, this file's own rules leave nowhere valid to put it: editing
the existing block violates "never edited/overwritten," but appending
ANOTHER `## {that same week} (week of)` header violates "one block per
week" AND would make the router's cross-week recurrence count read two
blocks from ONE real week as if the theme recurred across two, inflating
exactly the signal this file exists to measure honestly. **The fix: append
a clearly-marked LATE ADDITION block instead of a normal week-block,
naming which earlier week it actually belongs to:**

```markdown
## {YYYY-MM-DD} (week of) ~ LATE ADDITION to {original week's date}
- REWORK: {theme}, +{N}, {clients} (late capture, belongs to week of
  {original week's date})
```

This stays append-only (nothing already written is ever touched) while
giving the late data a home. **When counting how many DISTINCT weeks a
theme recurs across (the number the router actually reads), fold a LATE
ADDITION block's counts into the week it names, not the week it was
appended under** ~ a `REWORK: brief-misalign, +1` late-added to "week of
2026-06-01" adds to THAT week's brief-misalign tally for recurrence
purposes, it does not create a second distinct week where brief-misalign
happened to show up. Reading two blocks (the original + the late
addition) as two separate weeks of recurrence would be the same
inflation bug as if they'd been silently merged into one over-counted
block ~ this notation exists specifically so a human or the router can
tell "same week, split across two promotion passes" from "genuinely
recurred again."

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
