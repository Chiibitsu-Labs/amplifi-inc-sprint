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
    row-level, `Due`-anchored ~ per §3 / §5a's Fixed evaluation cohort
    paragraph}
  - Rework (FIX_CORPUS), BOTH gates always, never either/or ~ they're
    sequential, not alternatives: {(a) N rounds/accepted-report frequency
    threshold} AND {(b) N% round-tag-share threshold} · evaluation cohort:
    {trailing 90 days, but NOT the same mechanism as on-cadence above,
    don't record it as such ~ gate (a)'s DENOMINATOR is the row-level,
    `Due`-anchored cohort (every `accepted` row with `Due` in the trailing
    90 days, including zero-round rows, same set on-cadence uses); gate
    (a)'s NUMERATOR and all of gate (b) are ROUND-level instead: every
    individually-dated `Rework tag` entry, across every `accepted` row
    regardless of THAT row's own `Due`, whose own date falls in the
    trailing 90 days ~ see §5a's "FIX_CORPUS's cohort works differently"
    block for why these two cohort mechanisms are deliberately different}.
    Record both values even if (a)
    didn't clear and (b) was never reached ~ a later audit needs the full
    pair to know WHY FIX_CORPUS read absent, not just that it did.
  - WIP baseline, FULL formula, not just the frozen value (every part of
    this can change at quarterly calibration, §7): {N per analyst, frozen
    {date}} · margin: {+2} · sustain window: {≥5 of last 10 working days}
    · min valid-observation coverage: {≥7 of 10 working days per analyst}
  - Load structural line: {N ~ capchecker default unless Michele changed it}
  - DATA completeness gate: {response-rate floor, e.g. ≥70%/7d · min
    history, e.g. ≥10 days}
  - REBALANCE headroom threshold: {relative-gap trigger, e.g. ≥2pt · rest-
    of-team absolute-headroom ceiling, e.g. ≤5}
  - HIRE portfolio-wide headcount (only when a narrow AUTOMATE/REDESIGN/
    FIX_CORPUS signal coexists with elevated WIP/load): {full roster size
    ~ fixed, e.g. 6} / {N analysts had sufficient WIP data this cohort} /
    {N of those read elevated} / MOST = more than half of the FULL ROSTER,
    not the sufficient-data subset ~ e.g. "roster 6, 5 had data, 3
    elevated → 3 is not > half of 6 (needs ≥4) → NOT most, narrow signal
    still blocks HIRE" (this denominator does NOT shrink to whoever
    reported ~ Instrument §5b)
- Routes fired: {one or more of AUTOMATE | REDESIGN | FIX_CORPUS |
  REBALANCE | HIRE | none crossed ~ list every one that actually fired,
  not just the "final" one}
  (REBALANCE = capchecker's live signal, one analyst overloaded while the
  team has headroom, WITH genuine absolute headroom confirmed behind it ~
  see Instrument §3/§5a; a narrow signal here does not by itself block HIRE)
- **Provisional/blocked routes, recorded SEPARATELY from "fired" and
  "none crossed":** {list any of REDESIGN or FIX_CORPUS marked PROVISIONAL
  this walkthrough (too few late/trending rows accepted yet; missing
  missing/not-followed qualifiers; or a swing-capable revising backlog ~
  Instrument §3 step 4), and note that this PROVISIONAL state blocks HIRE
  the same as a fired route would, until resolved}. Don't fold this into
  "none crossed" ~ a route marked provisional was never evaluated to
  absence, and collapsing the two would make a deliberately-deferred HIRE
  read, later, as if every earlier route had been checked and genuinely
  ruled out.
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
