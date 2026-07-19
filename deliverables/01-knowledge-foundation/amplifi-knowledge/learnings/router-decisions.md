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
    to the wrong cohort (Codex catch, 2026-07-19) · margin: {≥20% OR ≥1 working day, whichever is larger ~
    the absolute floor matters at a zero/near-zero baseline, §2}
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
    including zero-round rows, same set on-cadence uses; PLUS (ii) any
    `accepted`/`revising (reopened)` row that contributed at least one
    in-window round even though its OWN
    `Due` falls outside the window (a late reopen on an old report) ~
    omitting set (ii) undercounts the denominator for exactly the reopened
    case and can divide by zero in a month with live reopen activity but
    no row `Due`-in-window at all. Gate
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
  - DATA completeness gate: {response-rate floor, e.g. ≥70%/7d · min
    history, e.g. ≥10 days}
  - REBALANCE headroom threshold: {relative-gap trigger, e.g. ≥2pt · rest-
    of-team absolute-headroom ceiling, e.g. ≤5}
  - HIRE portfolio-wide headcount, **record this snapshot whenever HIRE
    is evaluated at all, not only when a narrow AUTOMATE/REDESIGN/
    FIX_CORPUS signal coexists with elevated WIP/load:** {full roster size
    ~ fixed, e.g. 6} / {N analysts had sufficient WIP data this cohort} /
    {N of those read elevated} / MOST = more than half of the FULL ROSTER,
    not the sufficient-data subset ~ e.g. "roster 6, 5 had data, 3
    elevated → 3 is not > half of 6 (needs ≥4) → NOT most, narrow signal
    still blocks HIRE" (this denominator does NOT shrink to whoever
    reported ~ Instrument §5b). **This same ≥4-of-6 count is ALSO the
    unconditional BASE predicate for HIRE** (Instrument §5b: WIP must read
    elevated at this fixed-roster bar even with NO narrow signal to
    scope-map against at all) ~ a clean HIRE month with every earlier
    route genuinely absent still needs this headcount recorded, or the
    actual evidence that justified HIRE (how many of the roster, how many
    had data, how many read elevated) is unreproducible from this audit
    trail later (Codex catch, 2026-07-19). Narrow-signal coexistence is
    ONE reason this count matters, not the only one this line applies to.
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
