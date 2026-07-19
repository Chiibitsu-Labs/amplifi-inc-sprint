# Router Decisions ~ The When-to-Hire Instrument's Audit Trail

> **Append-only.** One entry per monthly router walkthrough (`INSTRUMENT.md`
> §5a), written by whoever ran it (Michele or Chii). This is a DIFFERENT
> file from `patterns.md` on purpose ~ `patterns.md` has a strict weekly
> REWORK/PROCESS tally schema written only by the promotion pass; a
> free-form routing decision doesn't fit that schema and would corrupt the
> counts the AUTOMATE/REDESIGN branches read. This file is the decision
> record; `patterns.md` is the theme tally. Different shapes, different
> files, both feed the instrument.

## Format per entry

**Routes can be plural.** Per `INSTRUMENT.md`'s portfolio-wide HIRE gate:
a narrow AUTOMATE/REDESIGN/FIX_CORPUS/REBALANCE signal on ONE client
doesn't automatically block a HIRE that's independently explained by
broad, team-wide capacity strain ~ both can be real findings from the
same walkthrough, and the log needs to hold both without implying the
narrow one was wrong or dismissed.

**Snapshot the thresholds too, not just which routes fired.** Michele's
numbers start as gut-seeded guesses and get recalibrated at quarterly
review (Instrument §7) ~ without a dated record of what was ACTIVE at
walkthrough time, a later audit (or whoever eventually wires §5b's
automation) can't tell whether an old decision used since-changed numbers,
or which threshold version to actually code up. Routes fired isn't enough
on its own; the numbers that fired them have to be dated too.

```markdown
## {YYYY-MM-DD} ~ monthly walkthrough
- Thresholds snapshot (EVERY signal evaluated this walkthrough, not just
  the ones checked below ~ as of today, note any value changed since the
  LAST entry, and when. Leave a line blank/`n/a` if that route genuinely
  wasn't evaluated this month, but don't drop the line):
  - AUTOMATE: {prevalence threshold, e.g. ≥40% of high-load days · min
    occurrence count, e.g. ≥3}
  - Cycle-time baseline (REDESIGN early-warning): {per-client baseline
    span, §7}
  - On-cadence threshold: {N%} · evaluation cohort: {trailing 90 days,
    per §3}
  - Rework (FIX_CORPUS): {N rounds/accepted-report threshold, AND/OR N%
    round-tag-share threshold ~ whichever actually fired or was checked}
    · evaluation cohort: {trailing 90 days, same as on-cadence}
  - WIP baseline: {N per analyst, frozen {date}}
  - Load structural line: {N ~ capchecker default unless Michele changed it}
  - DATA completeness gate: {response-rate floor, e.g. ≥70%/7d · min
    history, e.g. ≥10 days}
  - REBALANCE headroom threshold: {relative-gap trigger, e.g. ≥2pt · rest-
    of-team absolute-headroom ceiling, e.g. ≤5}
  - HIRE portfolio-wide headcount (only when a narrow AUTOMATE/REDESIGN/
    FIX_CORPUS signal coexists with elevated WIP/load): {N analysts had
    sufficient WIP data this cohort / N elevated / MOST = more than half
    of the sufficient-data count ~ e.g. "5 had data, 4 elevated, 4 > half
    of 5 → MOST, doesn't block HIRE"}
- Routes fired: {one or more of AUTOMATE | REDESIGN | FIX_CORPUS |
  REBALANCE | HIRE | none crossed ~ list every one that actually fired,
  not just the "final" one}
  (REBALANCE = capchecker's live signal, one analyst overloaded while the
  team has headroom, WITH genuine absolute headroom confirmed behind it ~
  see Instrument §3/§5a; a narrow signal here does not by itself block HIRE)
- Per route, one line each:
  - {ROUTE}: {evidence} → {scope: portfolio-wide, or narrow (name the
    client/theme)} → {action taken, or "insufficient to explain the
    breach, noted and not acted on separately" if narrow and coexisting
    with a HIRE}
- If HIRE fired: {which earlier routes were checked and found genuinely
  ABSENT (no signal at all) vs. checked and found PRESENT BUT NARROW
  (fired, scoped to one client/theme, judged insufficient to explain a
  portfolio-wide breach) ~ these are different findings, don't collapse
  "insufficient" into "ruled out" as if the narrow signal weren't real}
```

## Why this exists

This is the line Michele defends to Mells ~ *"Rework on Client X crossed
threshold in week 6 → routes to corpus fix (brief-alignment), not a
hire."* Dated and kept, so if a hire decision ever gets questioned
upward, the reasoning trail is already written down, not reconstructed
from memory.

---

## {YYYY-MM-DD} ~ first entry lands here
