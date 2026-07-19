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
  - Cycle-time baseline (REDESIGN early-warning), **per client, WITH its
    cadence version, never the span alone** ~ {per-client baseline span,
    §7} at {cadence version this baseline was frozen under, e.g. `weekly
    (v1, since 2026-07-24)`, full value per `brief.md`'s versioned
    `Reporting cadence` field, NOT just the bare cadence word} · frozen/
    recalibrated: {date}: a bare "Client A: 4 days" doesn't say whether
    that's `weekly v1`, `monthly v2`, or a returning `weekly v3`, and
    §2's baseline-versioning rule means those can be genuinely different
    numbers for the same client ~ recording only the span risks a later
    walkthrough or the eventual §5b automation applying the right number
    to the wrong cohort (Codex catch, 2026-07-19) · margin: {≥20% OR
    STRICTLY >1 working day (never ≥1), whichever is larger ~ the
    absolute floor matters at a zero/near-zero baseline, §2. `>1`, not
    `≥1`, specifically so a trailing average of exactly one working day
    off a zero baseline ~ an ordinary next-day cycle ~ does NOT trip the
    floor; recording `≥1` here would preserve the wrong boundary and can
    propagate it into a later manual read or the eventual §5b automation
    (Codex catch, 2026-07-19)}
  - On-cadence threshold: {N%, v1 seed <80% per §3 ~ record here whatever
    Michele's actual current number is, even if still the unadjusted
    seed} · evaluation cohort: {trailing 90 days,
    row-level, `Due`-anchored ~ per §3 / §5a's Fixed evaluation cohort
    paragraph}
  - Rework (FIX_CORPUS), BOTH gates always, never either/or ~ they're
    sequential, not alternatives: {(a) N rounds/report frequency
    threshold, v1 seed ≥2 per §3 ~ record Michele's actual current number}
    AND {(b) N% round-tag-share threshold, always ≥half per §3/§5}
    · evaluation cohort:
    {trailing 90 days, but NOT the same mechanism as on-cadence above,
    don't record it as such ~ gate (a)'s DENOMINATOR is the UNION of two
    row sets, never just the `Due`-anchored one alone: (i) every row with
    STATUS `accepted` OR `revising (reopened)` SPECIFICALLY (never bare
    `revising`, never `delivered`) with `Due` in the trailing 90 days,
    including zero-round rows, same set on-cadence uses, PLUS its own
    `Start ≥ 2026-09-04` rollout-epoch floor (see below) ~ PLUS (ii) any
    `accepted`/`revising (reopened)` row that contributed at least one
    in-window round even though its OWN
    `Due` falls outside the window (a late reopen on an old report) ~
    omitting set (ii) undercounts the denominator for exactly the reopened
    case and can divide by zero in a month with live reopen activity but
    no row `Due`-in-window at all. **Record the rollout-epoch clamp
    explicitly, every walkthrough until 90 post-epoch days exist, not just
    the first one:** this whole cohort (numerator AND denominator) is
    windowed to `max(trailing 90 days, 2026-09-04)`, NOT the unconditional
    trailing 90 days alone, AND every row's dated rounds only count if
    that row's OWN `Start` is ALSO `≥ 2026-09-04` (an independent, permanent
    floor, never folded into the rolling window itself ~ see `INSTRUMENT.md`
    §5a/§5b for the full two-condition rule and why they're separate).
    Leaving this off the snapshot risks a later audit or implementation
    mixing under-instrumented August rows (before touch 1.5's QA gate went
    live) into the calculation, diluting or changing the route (Codex
    catch, 2026-07-19). Gate
    (a)'s NUMERATOR and all of gate (b) are ROUND-level instead: every
    individually-dated `Rework tag` entry, across every `accepted` OR
    `revising (reopened)` row
    regardless of THAT row's own `Due`, whose own date falls in the
    trailing 90 days ~ see §5a's "FIX_CORPUS's cohort works differently"
    block for why these mechanisms are deliberately different, and its
    "Why `accepted` OR `revising (reopened)` specifically" block for why
    this status scope (not `accepted`-only, not the broader
    `delivered`/`revising`/`accepted`) is the one that survived (Codex
    catch, 2026-07-19: an earlier draft of this snapshot line recorded
    only set (i), which silently reproduces the exact bug §5a's own
    history already worked through and fixed; a later draft recorded the
    since-superseded `accepted`-only and `delivered`/`revising`/`accepted`
    scopes in turn, both since replaced)}.
    Record both values even if (a)
    didn't clear and (b) was never reached ~ a later audit needs the full
    pair to know WHY FIX_CORPUS read absent, not just that it did.
  - WIP baseline, FULL formula, not just the frozen value (every part of
    this can change at quarterly calibration, §7): {N per analyst, frozen
    {date}} · margin: {+2} · sustain window: {≥5 of last 10 working days}
    · min valid-observation coverage: {≥7 of 10 working days per analyst}
  - Load structural line: {N ~ capchecker default unless Michele changed it}
    · per-analyst "overloaded day" sustain window: {≥7 of last 10 working
    days at/above N} ~ the SAME per-day line and window the team-average
    reading uses, evaluated per person for HIRE's breadth test below, not
    just the raw team-average threshold this line's `N` alone describes
    (Instrument §5b)
  - DATA completeness gate: {response-rate floor, e.g. ≥70%/7d · min
    history, e.g. ≥10 days}
  - REBALANCE headroom threshold: {relative-gap trigger, e.g. ≥2pt · rest-
    of-team absolute-headroom ceiling, e.g. ≤5}
  - HIRE portfolio-wide headcount, **record this snapshot whenever HIRE
    is evaluated at all, not only when a narrow AUTOMATE/REDESIGN/
    FIX_CORPUS signal coexists with elevated WIP/load:** {full roster size
    ~ the ACTUAL CURRENT headcount as of this walkthrough, never a
    hard-coded number ~ e.g. 6 today, but re-derive it fresh each time}
    / {N analysts had sufficient WIP data this cohort} /
    {N of those read elevated} / MOST = more than half of the FULL,
    CURRENT ROSTER,
    not the sufficient-data subset ~ e.g. "roster 6, 5 had data, 3
    elevated → 3 is not > half of 6 (needs more than half, i.e. ≥4 AT
    TODAY'S HEADCOUNT) → NOT most, narrow signal
    still blocks HIRE" (this denominator does NOT shrink to whoever
    reported ~ Instrument §5b). **Record perceived load's SAME breadth
    count SEPARATELY, its own line, never folded into the WIP figures
    above:** {N analysts individually read elevated on load (own daily
    rating ≥ the structural-line `N` recorded above, on ≥7 of the last 10
    working days)} / MOST = more than half of the SAME FULL, CURRENT
    ROSTER, plus the active sustain window this count was evaluated over
    ({most recent 10 working days as of this walkthrough}, so a later
    reviewer can reproduce which window the count came from, not just
    trust the number). Instrument §5b's HIRE predicate requires MORE THAN
    HALF of the roster individually clearing EACH signal's own elevation
    threshold INDEPENDENTLY, WIP and load both ~ recording only WIP's
    breadth and load's raw threshold value (above) leaves this audit trail
    unable to show whether load's OWN breadth predicate actually cleared,
    or to reproduce a HIRE decision that depended on it once dashboard
    history or thresholds later change (Codex catch, 2026-07-19). **This
    same dynamically-derived
    more-than-half-of-roster count is ALSO the
    unconditional BASE predicate for HIRE** (Instrument §5b: WIP AND load
    must EACH independently read
    elevated at this bar, re-derived from the roster's real size at every
    evaluation, even with NO narrow signal to
    scope-map against at all) ~ a clean HIRE month with every earlier
    route genuinely absent still needs both headcounts recorded, or the
    actual evidence that justified HIRE (how many of the roster, how many
    had data, how many read elevated, on EACH signal) is unreproducible
    from this audit
    trail later (Codex catch, 2026-07-19). Narrow-signal coexistence is
    ONE reason this count matters, not the only one this line applies to.
    **When a narrow AUTOMATE/REDESIGN/FIX_CORPUS signal DOES coexist,
    record a SECOND, separate line: the narrow signal's own named
    analyst(s), and the post-exclusion elevated count/bar, recorded
    SEPARATELY FOR WIP AND FOR LOAD, never one combined figure** ~ the
    excluded analyst set can leave the two predicates in different states
    (excluding a narrow signal's owner might drop WIP to 4-of-6 while
    load, a different set of people running hot, stays at 3-of-6, or vice
    versa), and Instrument §5b's HIRE predicate requires BOTH to
    independently clear, so one merged number can't show whether the
    override actually passed both, only that it passed AT LEAST one
    (Codex catch, 2026-07-19). Record each signal's own post-exclusion
    count/bar plus its own coverage/window evidence (WIP: ≥7-of-10-valid-
    observations coverage per analyst, same as the unconditional line
    above; load: the active sustain window it was evaluated over, same
    as the unconditional line above) (`INSTRUMENT.md`
    §3's narrow-signal override recomputes EACH signal's numerator
    EXCLUDING those named analysts before testing it against the same
    more-than-half bar)
    ~ the total-elevated counts above answer the unconditional base
    predicate, but they do NOT by themselves answer whether EITHER
    signal's elevation survives independently of the narrow signal, and
    owner mappings (`brief.md`'s
    lead-analyst field) can change after the walkthrough ~ without logging
    the excluded set and BOTH adjusted counts/bars separately, a later
    reviewer can't tell whether the override actually cleared both
    predicates, only that the unconditional totals did (Codex catch,
    2026-07-19).
- Routes fired: {one or more of AUTOMATE | REDESIGN | FIX_CORPUS |
  EXECUTION-GAP | REBALANCE | HIRE | none crossed ~ list every one that
  actually fired, not just the "final" one}
  (REBALANCE = capchecker's live signal, one analyst overloaded while the
  team has headroom, WITH genuine absolute headroom confirmed behind it ~
  see Instrument §3/§5a; a narrow signal here does not by itself block HIRE)
  **EXECUTION-GAP is its own distinct value, not a stand-in for FIX_CORPUS
  and not folded into "none crossed" either** ~ Instrument §3 step 3's
  clustered majority-`not-followed` finding (rework frequent and
  corpus-tagged, gates (a)/(b) both clear, but the STANDARD was already
  right, so the corpus-edit action correctly does NOT fire) is a fully
  RESOLVED check, not an absence: it names a real, clustered
  execution/coaching gap and blocks HIRE for that scope exactly like a
  narrow REDESIGN or FIX_CORPUS signal would. Neither existing value fits
  it: recording `FIX_CORPUS` here would falsely claim a corpus edit
  fired, and recording `none crossed` would falsely claim nothing
  explained the elevated rework at all, when this month's audit actually
  needs to say "checked, found a real cause, it just isn't a corpus
  problem" (Codex catch, 2026-07-19: this schema had no value for that
  resolved-but-not-a-corpus-edit outcome at all).
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
- **HIRE-EVALUATION-BLOCKED, its own separate line, recorded even when NO
  route above is individually PROVISIONAL:** {if capchecker's DATA signal
  was active (response rate <70%/7d or <10 days history) OR WIP DATA
  COVERAGE fell below its ≥70%-of-roster floor this walkthrough, say so
  here explicitly: "DATA gate: {clear / active}" and "WIP coverage: {N of
  full roster cleared ≥7-of-10-valid-observations ~ clear / insufficient}"}.
  This is DIFFERENT from the PROVISIONAL bullet above ~ REDESIGN/FIX_CORPUS
  PROVISIONAL means a SPECIFIC narrow candidate's evidence can't be read
  yet; DATA/WIP-insufficient means HIRE ITSELF cannot be evaluated AT ALL
  this walkthrough, regardless of what every other route reads (Instrument
  §3's HIRE check requires both gates clear before HIRE is even
  reachable). Leaving this state unrecorded lets a data-gated month fall
  through to "none crossed" by default ~ that reads as "every route was
  checked and genuinely absent," when the honest state is "HIRE couldn't
  be checked at all, chase the response rate up first" (Codex catch,
  2026-07-19). Note it here even on a month where AUTOMATE/REDESIGN/
  FIX_CORPUS all genuinely read absent, so a later audit can tell "checked
  everything, clean" from "couldn't finish checking."
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
