# {Client Name} ~ Delivery Log

> **One row per reporting cycle. Quick touches, each ~20–30 seconds, each at
> a moment that already happens.** This is the when-to-hire instrument's
> report-level feed: cycle time, on-cadence rate, rework rounds, and effort
> all come from these rows ~ as a byproduct of the work, never a separate
> data-entry job.

## The write moments

1. **At the cycle's SCHEDULED start** ~ the date this client's cadence says
   the cycle begins (every Monday for a weekly client, the 1st for a
   monthly one), **known in advance, a calendar fact ~ NOT whenever an
   analyst actually gets around to the work:** create the row. `Period`,
   `Analyst`, `Start`, `Due` filled; `Status = open`; everything else
   blank. Whoever owns this client's queue (the lead analyst, or Rica)
   creates the row on schedule, independent of who ends up delivering it.
   **Create it even if nobody has started the actual work yet.** If
   capacity strain delays the real start, that's not a reason to skip or
   defer this write ~ it's the exact thing two of the five signals exist
   to catch: (a) a still-`open` row whose `Due` has passed is already a
   cadence miss, visible from day one, and (b) `Start` staying anchored
   to the SCHEDULED date (not sliding to match a late actual start) is
   what lets cycle time (`Delivered − Start`) show a growing backlog
   instead of hiding it. If row creation waited for real work to begin,
   a cycle delayed by queue backup could pass its due date while never
   having existed in the log at all ~ invisible to on-cadence tracking,
   and cycle time would only ever measure from whenever things finally
   started, silently erasing the wait.
1.5. **Any time between period start and the actual ship write ~ the QA
   gate (pass 1), internal alignment, OR the post-Canva pass 2 (steps
   9–11) ~ catches and corrects ANY material issue BEFORE the client ever
   sees the report: `brief-misalign`, `brand`, or `data`** (not just the
   corpus-tagged two): bump `Rounds`, append the cause (same rules as
   touch 3, below) ~ right then, while `Status` is still `open` (the ship
   write, touch 2, hasn't happened yet). This is real rework regardless of
   which tag it carries or which of the three pre-send checkpoints caught
   it ~ pass 2 exists specifically to catch Canva-stage drift, and a
   correction it finds is just as real as one steps 9–10 found; recording
   only the earlier two would systematically miss exactly the failures
   the LATER checkpoint exists to detect. Recording only
   `brief-misalign`/`brand` catches while silently skipping `data`
   corrections would ALSO inflate the corpus-tag SHARE artificially
   (imagine four internal `data` fixes and one `brand` fix in one cycle:
   skipping the four makes that a single 100%-corpus round instead of
   five rounds at a real 20% share). The tag vocabulary doesn't change ~
   `client-new-ask` still can't apply here, there's no client yet ~ only
   which catches get recorded does. **One round per PASS, not one round
   per issue found within a pass:** if QA gate pass 1 catches three
   separate material issues in the same review, that's ONE bump to
   `Rounds` (that pass), with all three causes bundled into that single
   round's tag entry by touch 3's priority order (`brief-misalign` >
   `brand` > `data` > `client-new-ask`, rest noted in **Notes**) ~ the
   same bundling rule touch 3 already uses for a client revision with
   multiple causes in one message. A pass that runs twice (fix, re-check,
   fix again) before it clears is two rounds, one per re-check, not one
   round for the whole back-and-forth. Skip this touch entirely for
   cycles where nothing needed fixing before send ~ most of them,
   hopefully.
2. **At ship:** fill `Delivered`, top up `Effort (h)`. `Status = delivered`.
   Stamp `Last Sent = Delivered` too (same date ~ the first version sent is
   so far also the last). `Rounds`/`Rework tag` carry forward whatever
   touch 1.5 already logged (default `0`/`none` if internal review caught
   nothing) ~ never reset to zero out pre-delivery catches.
3. **If the client asks for a revision:** bump `Rounds` by 1, top up
   `Effort (h)`, set `Rework tag`. **One tag entry per round, always ~
   if a single round has more than one cause** (e.g. a brand correction
   bundled with a genuinely new client ask in the same message), pick ONE
   per this priority order and note the rest in **Notes**:
   `brief-misalign` > `brand` > `data` > `client-new-ask` (corpus causes
   rank first ~ under-counting a real corpus gap is worse than
   over-counting one, and FIX_CORPUS existing to catch it is the whole
   point of this priority). One round, one entry, no exceptions ~ this
   keeps the entry count always equal to `Rounds`, which is what makes
   the per-round share countable at all. **"Replaces the provisional
   `none`" applies ONLY if `Rounds` is still 0 when this touch fires** ~
   i.e., this client revision really is the row's first-ever recorded
   round. If touch 1.5 already logged one or more pre-delivery catches,
   `Rounds` is already >0 and real tag entries already exist ~ this
   client revision **appends** like every other non-first round; there's
   no `none` left to replace. Round 1 `brand`, round 2 `client-new-ask`,
   round 3 also `client-new-ask` → cell reads `brand, client-new-ask,
   client-new-ask` (three entries for three rounds, matching `Rounds = 3`,
   regardless of whether round 1 happened pre- or post-delivery). This matters
   beyond bookkeeping: the instrument's FIX_CORPUS check computes the
   corpus share PER ROUND (how many of the actual revision rounds were
   corpus-caused, not just whether any round ever was) ~ a row with one
   `brand` fix among four `client-new-ask` fixes is 20% corpus-driven,
   not 100%, and the entry count must equal `Rounds` for that math to
   mean anything. `Status = revising` ~ **not** `accepted`. Once the
   corrected version actually goes back to the client, stamp `Last Sent`
   with THAT date ~ this is what touch 4's silence window counts from
   next, never the original `Delivered` date. `Delivered` itself never
   changes after the first ship (on-cadence stays anchored to when the
   client ORIGINALLY received a version, not to any later resend) ~
   `Last Sent` is the only field that moves on a revision. Repeat this
   touch for every additional round.
4. **At actual client acceptance ~ or after 5 business days of silence
   following the row's current `Last Sent` date, with no revision
   request:** `Status = accepted`. **Count the 5 days from `Last Sent`,
   never from the original `Delivered`** ~ this is what actually makes the
   rule work once a row has been revised: using the original `Delivered`
   date would auto-accept a row the moment a late-cycle revision goes back
   out (if enough days already elapsed since the first ship), while
   ignoring the resend date entirely and never re-arming the silence clock
   would leave every revised row stuck at `revising` forever, waiting on
   an explicit sign-off that may never come. `Last Sent` (touch 2's first
   stamp, or touch 3's latest resend stamp) gives the rule a fresh, correct
   anchor after every round, first ship or fifth. Explicit sign-off and "no
   news" are both real acceptance signals ~ most reports ship clean and
   nobody writes back to say so, and treating silence as permanently
   unresolved would starve the rework baseline of exactly the clean
   deliveries it needs to mean anything. **If a revision request arrives
   after a silent auto-accept, re-open the SAME row** ~ `Status` back to
   `revising`, bump `Rounds`, add the cause per touch 3 above (which also
   re-stamps `Last Sent`). Late feedback is still real rework on this
   report; a fresh row with no period/due/delivered of its own would just
   delete the evidence, not relocate it. Only re-finalize to `accepted`
   once the late round is actually resolved. First version accepted with
   no revisions, explicit or by silence = go straight from `delivered` to
   `accepted`, numbers stay at 0/none.

**If a client pauses reporting, cancels a period, or changes cadence after
a row is already open:** set `Status = cancelled` and note the reason in
**Notes** (`client paused, wk3` / `cadence changed to monthly, see brief`).
This can happen from ANY prior status, not just `open`. A `cancelled` row
is excluded entirely from on-cadence's numerator AND denominator ~ it was
never delivered late, it was never going to be delivered at all, and
counting it as a miss would permanently and unfairly depress the rate for
something no analyst failed at. Don't delete the row ~ the cancellation
itself is real history, and a pattern of client-cancelled cycles is worth
noticing in its own right.

**Why `Status` exists:** without it, a report still mid-revision or still
awaiting sign-off looks identical to one that shipped clean ~ all read
`Rounds = 0` or an unfinished count. A forgotten row silently tells the
instrument "no rework happened," and a between-rounds row read as final
undercounts the rework that's still coming. `accepted` is the only status
the rework signal trusts; `open` past `Due` is a cadence miss in progress;
`delivered` and `revising` are both "not final yet."

## How to fill a row

- **Analyst** ~ **one name**: whoever is the ship-of-record for this cycle
  (usually the lead). This field is the join key to capchecker's per-person
  capacity data, so it must resolve to exactly one person ~ never a
  composite. If ownership genuinely changed mid-cycle (Dale started it,
  Janelle shipped it), put `Janelle` here (whoever delivered it) and note
  the handback in **Notes** (`handed off from Dale, wk2`) for the human
  reading the row. The instrument only ever joins on the single name.
- **Period start** ~ the cycle's SCHEDULED cadence boundary (a calendar
  fact, known in advance ~ every Monday for a weekly client, the 1st for a
  monthly one), **not when the analyst actually began the work.** This
  field is what row creation (touch 1) is timed to, and it's what keeps
  `Start` anchored so cycle time (`Delivered − Start`) reflects the real
  wait, including any queue-backup delay, instead of hiding it behind a
  late actual start.
- **Due** ~ the date this client's cadence says it ships.
- **Delivered** ~ when the client actually received the FIRST version.
  Blank while `open`. **Never overwritten by a later revision resend** ~
  on-cadence measures against this original date only, so a slow
  revision round can't retroactively turn an on-time first ship into a
  late one, or vice versa.
- **Last Sent** ~ the date the most recently sent version (first ship, or
  the latest revision) actually went to the client. Equals `Delivered` at
  first ship (touch 2); updated at every touch-3 resend. This is what the
  5-business-day silent-acceptance rule (touch 4) counts from ~ using
  `Delivered` there instead would auto-accept a row the instant a late
  revision ships, if enough days had already passed since the first send;
  never updating anything would leave a revised row `revising` forever
  with no way to reach a silent accept. `Last Sent` gives the silence rule
  a correct, fresh anchor after every round.
- **Status** ~ `open` → `delivered` → (`revising` × as many rounds as
  needed) → `accepted`, always in that order. `accepted` is set once for
  the normal case (explicit sign-off, or 5 business days of silence
  following `Last Sent` ~ see above) ~ **with two documented exceptions:**
  (1) a revision request arriving AFTER a silent auto-accept re-opens the
  same row, `accepted → revising`, then back to `accepted` once that late
  round resolves (see touch 4) ~ not a violation of "exactly once" so much
  as "once per actual finalization," and the documented way late feedback
  stays counted instead of vanishing; (2) a row can exit to `cancelled`
  from ANY prior status if the client pauses, cancels, or changes cadence
  for that cycle (see above) ~ a terminal state outside the normal chain,
  never followed by `accepted`. On-cadence is computed as `Delivered ≤ Due`
  for any row that has shipped (`delivered`/`revising`/`accepted`), an
  automatic miss for any `open` row where `Due` has already passed, and
  **excluded entirely from both numerator and denominator** for any
  `cancelled` row and for any `open` row not yet past `Due` (future work,
  not yet resolved either way).
- **Rounds** ~ running count of revision rounds, from EITHER source:
  pre-delivery catches (QA gate, internal alignment, OR pass 2 ~ touch
  1.5, any point before the ship write) or client-requested revisions
  (touch 3, after delivery). Both are real rework; the router doesn't
  care which side of delivery it happened on, or which checkpoint caught
  it, only whether the standard needed correcting. Only trusted once
  `Status = accepted`.
- **Effort (h)** ~ rough total hours, self-estimated, running total across
  every touch. Gut feel is fine; consistency beats precision.
- **Rework tag** ~ **required, not optional, the moment `Rounds` goes above
  0** ~ exactly ONE entry per round (if a round has multiple causes, pick
  by priority `brief-misalign` > `brand` > `data` > `client-new-ask` and
  note the rest in Notes ~ see touch 3). The genuinely FIRST round
  recorded on this row (whichever touch fires first ~ 1.5 or 3) REPLACES
  the provisional `none`; every round after that, regardless of source,
  APPENDS its own entry, one per round, repeats allowed, never
  deduplicated: `brief-misalign` · `brand` · `data` · `client-new-ask`.
  `none` is valid ONLY while `Rounds = 0`; a row with `Rounds ≥ 1` and tag
  `none` is an incomplete row, not a real zero-rework report ~ **this is a
  data-quality gate, not a soft "leave it unrouted": until the tag is
  filled in, this row must be excluded from FIX_CORPUS's tag-share
  denominator AND must HARD-BLOCK any REDESIGN/FIX_CORPUS/HIRE conclusion
  that depends on it, not silently pass through as "corpus-caused: no."**
  An untagged round is unknown-caused, not zero-corpus-caused ~ letting it
  fall out of the math as if it were a clean `none` round would understate
  the real corpus-tag share and let HIRE proceed on a false "FIX_CORPUS
  checked, ruled out" when the honest state is "FIX_CORPUS can't be
  evaluated, data is incomplete." Fix the tag before trusting any router
  conclusion this row feeds. (`brief-misalign` and `brand` are corpus
  gaps ~ they route to a corpus fix in the instrument, not to a hire. The
  instrument computes FIX_CORPUS's tag share PER ROUND ~ count of
  `brief-misalign`/`brand` entries ÷ total entries, which equals `Rounds`
  ~ not per row, so a row like `brand, client-new-ask, client-new-ask`
  counts as 1-in-3 corpus-tagged, not "corpus-tagged: yes/no.") **The same
  hard-block gate applies to any PARTIAL mismatch, not just a bare
  `none`:** if `Rounds = 3` but only two tag entries are recorded (say
  `brand, data`), that row is just as incomplete as a bare `none` ~ the
  entry count must equal `Rounds` exactly, or the row's tag share is
  unknown, not "whatever the recorded entries happen to divide out to."
  Before trusting any row's tag-share contribution, count its entries and
  compare to `Rounds`; anything less is missing data and gets the same
  exclude-and-block treatment as an untagged row.

## The log

| Period | Analyst | Start | Due | Delivered | Last Sent | Status | Rounds | Effort (h) | Rework tag | Notes |
|---|---|---|---|---|---|---|---|---|---|---|
| {2026-07 / wk 29} | {Dale} | {YYYY-MM-DD} | {YYYY-MM-DD} | {YYYY-MM-DD or blank} | {YYYY-MM-DD or blank} | {open / delivered / revising / accepted / cancelled} | {0} | {6} | {none} | {—} |
