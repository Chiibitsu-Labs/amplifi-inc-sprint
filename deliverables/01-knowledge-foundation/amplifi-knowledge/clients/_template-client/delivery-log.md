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
   `Cadence`, `Analyst`, `Start`, `Due` filled; `Status = open`;
   `Rounds = 0`,
   `Rework tag = none` **explicitly initialized, not left implicit** ~
   this is the defined starting state touch 1.5's "bump `Rounds`" and
   "replaces the provisional `none`" operations are defined relative to;
   leaving these two blank instead of set makes the first increment/
   replace ambiguous and risks an accepted row with a missing tag that
   hard-blocks the router for no real reason. `Delivered`, `Last Sent`,
   `Effort (h)`, and `Notes` stay genuinely blank ~ nothing to default
   them to yet. Whoever owns this client's queue (the lead analyst, or Rica)
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
   started, silently erasing the wait. **`Cadence`: copy `brief.md`'s
   Snapshot `Reporting cadence` value AS OF right now, at row creation ~
   never leave it blank, and never treat it as inferable later.**
   `brief.md`'s Snapshot field is overwritten in place whenever a client's
   cadence actually changes, so it only ever answers "what's the cadence
   TODAY," not "what was it when THIS row opened" ~ without a per-row
   copy, Instrument §2's cadence-change baseline-versioning rule (cycle
   time) has no structured way to tell which rows belong to the old
   baseline and which to the new one once a change happens, and a
   trailing-90-day window would silently pool pre-change and post-change
   cycles into one reading (Codex catch, 2026-07-19). Once written, this
   value is historical fact for that row and never gets edited
   retroactively, even after a later cadence change.
1.5. **Any time between period start and the actual ship write ~ the QA
   gate (pass 1), internal alignment, OR the post-Canva pass 2 (steps
   9–11) ~ catches and corrects ANY material issue BEFORE the client ever
   sees the report: `brief-misalign`, `brand`, `quality-bar`, or `data`**
   (not just the corpus-tagged three): bump `Rounds`, append the cause
   (same rules as touch 3, below) ~ right then, while `Status` is still
   `open` (the ship write, touch 2, hasn't happened yet). This is real
   rework regardless of which tag it carries or which of the three
   pre-send checkpoints caught it ~ pass 2 exists specifically to catch
   Canva-stage drift, and a correction it finds is just as real as one
   steps 9–10 found; recording only some of the four categories would
   systematically miss exactly the failures the skipped ones exist to
   detect. Recording only `brief-misalign`/`brand`/`quality-bar` catches
   while silently skipping `data` corrections would ALSO inflate the
   corpus-tag SHARE artificially (imagine four internal `data` fixes and
   one `brand` fix in one cycle: skipping the four makes that a single
   100%-corpus round instead of five rounds at a real 20% share). The tag
   vocabulary doesn't change ~ `client-new-ask` still can't apply here,
   there's no client yet ~ only which catches get recorded does. **One round per PASS, not one round
   per issue found within a pass:** if QA gate pass 1 catches three
   separate material issues in the same review, that's ONE bump to
   `Rounds` (that pass), with all three causes bundled into that single
   round's tag entry by touch 3's priority order (`brief-misalign` >
   `brand` > `quality-bar` > `data` > `client-new-ask`, rest noted in
   **Notes**) ~ the
   same bundling rule touch 3 already uses for a client revision with
   multiple causes in one message. **Stamp the entry with TODAY's date**
   (see the `Rework tag` bullet below for the exact format) ~ same
   requirement as every other touch that appends a round. A pass that runs
   twice (fix, re-check,
   fix again) before it clears is two rounds, one per re-check, not one
   round for the whole back-and-forth. Skip this touch entirely for
   cycles where nothing needed fixing before send ~ most of them,
   hopefully.
2. **At ship:** fill `Delivered`, top up `Effort (h)`. `Status = delivered`.
   Stamp `Last Sent = Delivered` too (same date ~ the first version sent is
   so far also the last). **If ownership changed since touch 1** (Rica
   opened the row for the queue, or a different analyst started it, but
   someone else is actually shipping) **~ update `Analyst` NOW to whoever
   is delivering,** and note the handback in **Notes** (`handed off from
   Dale, wk2`). Touch 1 only ever fills `Analyst` with whoever owns the
   queue at period start, which may not be the ship-of-record this field's
   definition actually requires (see "How to fill a row" below) ~ leaving
   it unrefreshed at ship attributes the whole cycle to the wrong person in
   capchecker's per-analyst join, including the HIRE router's
   analyst-level scope check (§3). `Rounds`/`Rework tag` carry forward
   whatever touch 1.5 already logged (default `0`/`none` if internal
   review caught nothing) ~ never reset to zero out pre-delivery catches.
   **This `Analyst` update is scoped to THIS ONE CYCLE ~ a temporary
   cover, not a change of who owns the account.** If the reassignment is
   actually PERMANENT (the client's lead analyst changed for good, not
   just this cycle's coverage), that's a DIFFERENT write, in a DIFFERENT
   file: update `brief.md`'s Snapshot "Amplifi lead analyst" field too,
   right when the reassignment happens, not deferred to whenever someone
   next touches that file. Nothing else in this corpus updates that field
   automatically ~ it's the source Instrument §3's HIRE analyst-scope test
   trusts as CURRENT ownership specifically because delivery-log's
   `Analyst` only ever answers "who shipped THIS cycle," not "who owns the
   account now" (see "How to fill a row" → Analyst, below); skipping this
   write lets `brief.md` go stale and quietly point that scope test at the
   former lead's WIP/load instead of the actual current owner's (Codex
   catch, 2026-07-19).
3. **If the client asks for a revision:** bump `Rounds` by 1, set
   `Rework tag`. **Do NOT top up `Effort (h)` here** ~ at the moment a
   revision request arrives, no revision work has actually happened yet,
   so there are no real hours to add; top it up later, at the SAME moment
   the corrected version actually goes back out (see below), when the
   analyst actually knows how long the fix took. Topping up here instead
   would record effort before the work exists, and since a resend can be
   the LAST write this round gets before the next request arrives, the
   hours actually spent implementing the fix could go unrecorded entirely
   (Codex catch, 2026-07-19). **One tag entry per round, always ~
   if a single round has more than one cause** (e.g. a brand correction
   bundled with a genuinely new client ask in the same message), pick ONE
   per this priority order and note the rest in **Notes**:
   `brief-misalign` > `brand` > `quality-bar` > `data` > `client-new-ask`
   (`quality-bar` = the report didn't clear `what-good-looks-like.md`'s
   bar ~ a weak/generic recommendation, missing trend read, or other
   actionability/compounding defect that isn't specifically a brief miss
   or a brand miss; corpus causes rank first ~ under-counting a real
   corpus gap is worse than over-counting one, and FIX_CORPUS existing to
   catch it is the whole point of this priority). One round, one entry, no exceptions ~ this
   keeps the entry count always equal to `Rounds`, which is what makes
   the per-round share countable at all. **Stamp the entry with TODAY's
   date** (see the `Rework tag` bullet below for the exact format) ~ the
   same requirement touch 1.5 uses for its own entries, and for the same
   reason: a later 90-day cohort read needs to know when THIS round
   happened, not just when the row was `Due`. **"Replaces the provisional
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
   mean anything. `Status = revising` ~ **not** `accepted`. **Blank
   `Last Sent` too, at this same moment ~ don't leave the old date sitting
   there while the fix is still in progress.** A revision request logged
   this way but not yet resent is otherwise indistinguishable from a
   PRIOR resend that's genuinely gone quiet: both read `Status = revising`
   with a `Last Sent` date on the row, and if the request itself arrives
   late (close to or past the OLD `Last Sent`'s 5-business-day mark) or
   the fix simply takes a while, touch 4's silence scan could see that
   stale date age past 5 business days and auto-accept a report that was
   never actually resent ~ genuinely unfinished work marked `accepted`
   (Codex catch, 2026-07-19). A blank `Last Sent` gives the weekly scan
   nothing to count 5 days from, so a `revising` row with no `Last Sent`
   is never eligible for silent acceptance, full stop, no matter how old
   the row otherwise looks ~ it waits until the next step re-stamps a real
   date. Once the
   corrected version actually goes back to the client, stamp `Last Sent`
   with THAT date, AND top up `Effort (h)` NOW ~ this is the moment the
   revision work is actually done and the analyst actually knows how many
   hours it took, unlike the request-arrival moment above. `Last Sent`
   is what touch 4's silence window counts from
   next, never the original `Delivered` date. `Delivered` itself never
   changes after the first ship (on-cadence stays anchored to when the
   client ORIGINALLY received a version, not to any later resend) ~
   `Last Sent` is the only date field that moves on a revision, but
   `Effort (h)` moves here too, every round. Repeat this
   touch for every additional round.
4. **At actual client acceptance ~ or after 5 business days of silence
   following the row's current `Last Sent` date, with no revision
   request:** `Status = accepted`. **A row with `Last Sent` blank (touch
   3 blanks it the instant a revision request arrives, before the fix is
   resent) is NEVER eligible for this ~ there's no valid date to count 5
   days from, which is exactly the point: a fix still in progress reads
   as "not yet eligible," not as "quiet long enough to auto-accept."**
   This transition needs someone to
   actually check** ~ plain markdown doesn't revisit a row on its own once
   5 days pass, so relying on "whoever happens to notice" leaves silently-
   clean reports sitting at `delivered`/`revising` indefinitely, excluded
   from the accepted-only rework calculation the whole time (skewing
   rounds-per-report upward, since the clean majority never counts).
   `ROADMAP.md`'s Phase 3 rhythm covers this: a weekly scan (piggybacked on
   the Friday promotion-pass sitting, no new habit needed) finalizes every
   row whose silence window has quietly closed ~ **and updates that same
   row's `insight-log.md` entry's `Client reaction` from `pending` to `no
   feedback / administratively accepted` in the same pass, `insight-log.md`'s
   own required distinction** (see `ROADMAP.md`'s Phase 3 rhythm for why
   this is the one place that write actually happens, since the
   feedback-moment touch only fires when the client reacts). **Count the 5 days from
   `Last Sent`,
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
   after EITHER form of acceptance ~ explicit sign-off or a silent
   auto-accept, no distinction between the two here ~ re-open the SAME
   row** (a client who explicitly said "looks great" and then comes back
   with a late ask is exactly as real a reopen as one who simply stayed
   quiet past the silence window; scoping this to "after a silent
   auto-accept" only would leave the analyst with no valid transition to
   record a late round on an explicitly-accepted report, forcing either a
   silently-dropped round or a detached new row with no period/due/
   delivered of its own, understating FIX_CORPUS's metrics either way,
   Codex catch, 2026-07-19) ~ `Status` to
   **`revising (reopened)`, NOT bare `revising`** (a new, distinct value,
   not a first-pass revision relabeled), then bump `Rounds` and add the dated cause per touch 3
   above ~ **which means `Last Sent` follows touch 3's own two-step
   sequence here too: BLANK it the instant this reopen is logged, then
   stamp the real resend date only once the corrected version actually
   goes back out, never re-stamp it immediately at reopen** (a reopened
   row skipping the blank step and jumping straight to a fresh `Last
   Sent` stamp would reproduce the exact pending-resend ambiguity touch
   3/4's blank-`Last-Sent` rule exists to prevent, just on a
   `revising (reopened)` row instead of a first-pass one ~ if the fix
   then takes a while, the weekly silence scan could auto-accept a
   reopened report that was never actually resent, Codex catch,
   2026-07-19) ~ repeating touch 3 for as many
   additional rounds as this late feedback actually takes to resolve ~ a
   reopen isn't always exactly one round. Late feedback is
   still real rework on this
   report; a fresh row with no period/due/delivered of its own would just
   delete the evidence, not relocate it. **Why `revising (reopened)`
   specifically, not just `revising`:** this row already reached
   `accepted` once ~ that's an established fact worth keeping visible in
   the one field every downstream read already checks, distinct from a
   row still working through its FIRST-EVER, never-yet-resolved pass
   (bare `revising`), which has no such established baseline yet.
   Instrument §3's rounds-per-report denominator reads exactly this
   distinction: a reopened row (once-accepted, temporarily back for late
   feedback) still counts as a real, existing report; a still-unresolved
   first-pass row does not, yet (Codex catch, 2026-07-19). No separate
   marker or episode
   bookkeeping is needed beyond this one status value ~ each round's own date, stamped per touch
   3/1.5 same as any other round, is what a later 90-day cohort read
   filters on directly (see Instrument §3), so there's nothing extra to
   track at reopen time beyond the normal per-round entry every round
   already gets. Re-finalize to `accepted` once the late round is actually
   resolved, exactly the same as finalizing after any other round of
   revision. If the row reopens AGAIN later, that's just more dated rounds
   appended to the same row ~ there's no meaningful difference between a
   first-pass round and a late-reopen round once every entry carries its
   own date, so nothing distinguishes them beyond the dates themselves.
   First version accepted with
   no revisions, explicit or by silence = go straight from `delivered` to
   `accepted`, numbers stay at 0/none.

**If a client pauses reporting or cancels a period BEFORE it ships ~ the
row is still `open`:** set `Status = cancelled` and **stamp `Last Sent`
with today's date ~ the cancellation date, structured, not buried in free
text.** (`Last Sent` is otherwise only used for shipped rows; a `cancelled`
row repurposes it as "the date this row was finalized as cancelled,"
which is exactly the one piece of structured data §5b's automated
ingestion needs to reconstruct the before/after-`Due` distinction below
without parsing **Notes**.) **Also top up `Effort (h)` with whatever time
was genuinely spent before cancellation, same as any other touch** ~ a
cycle that gets cancelled after real drafting/research work already
happened is NOT zero-effort just because it never shipped, and leaving
this field blank on cancellation silently drops exactly the wasted work a
recurring pattern of late client cancellations should surface in the
effort-per-deliverable signal. Also note the reason in **Notes**
(`client paused, wk3` / `cadence cancelled, see brief`) for the human
reading the row. This transition is ONLY valid from `open` ~ a cycle that
never shipped has no `Delivered` date, but **it can already carry real,
dated `Rounds`/`Rework tag` entries from touch 1.5's pre-send catches
(QA gate pass 1, internal alignment, or post-Canva pass 2), and those are
NOT lost by cancelling** ~ every entry a cancelled row carries is, by
construction, a pre-send catch (touches 3/4 only ever fire on a row
that's already shipped, which this one never did), so nothing about
cancellation invalidates them as real corpus-vs-process evidence. Leave
`Rounds`/`Rework tag` exactly as touch 1.5 left them ~ don't clear them
on cancellation, and see `INSTRUMENT.md` §5a's round-level cohort for how
these dated entries stay counted even though the row itself is excluded
from FIX_CORPUS's row-level denominator (Codex catch, 2026-07-19). Any
hours already logged toward it are still real
and still belong in `Effort (h)`. **But "still `open`"
splits into two different cases, distinguished by comparing `Last Sent`
(the cancellation date) against `Due` ~ and only ONE of them is a clean
exclusion:**
- **Cancelled BEFORE, or ON, `Due`** (`Last Sent ≤ Due` ~ same-day counts
  as on-time here, matching `Delivered ≤ Due`'s own boundary elsewhere in
  this doc)**:** the cycle was never late and was never going to exist ~
  fully excluded from on-cadence's numerator AND denominator. It was never
  a miss, so there's nothing to preserve.
- **Cancelled AFTER `Due` has already passed** (`Last Sent > Due`, strictly
  ~ a cancellation stamped ON `Due` itself is same-day, not yet overdue,
  same boundary rule as `Delivered ≤ Due` counting the due date itself as
  on-time)**, while still `open`:** this row was ALREADY counted as an automatic
  overdue-in-progress miss the moment `Due` passed (see "How to fill a
  row" → Status, below) ~ that miss is a fact that already happened, not a
  future obligation the client can retroactively un-create by cancelling
  now. Setting `Status = cancelled` here still stops the row from
  generating any FURTHER tracking (no phantom future delivery expected),
  but **the miss it already accrued stays counted** ~ don't let
  cancellation silently subtract an overdue cycle from the denominator and
  inflate on-cadence after the fact. Note both facts in **Notes**
  (`overdue since {Due date}, then cancelled {date}, see brief`) too, for
  the human reading the row, but the ROUTING decision reads `Last Sent` vs
  `Due`, never the free text.
Either way, don't delete the row ~ the cancellation itself is real
history, and a pattern of client-cancelled cycles is worth noticing in its
own right.

**If a client pauses FUTURE reporting or changes cadence AFTER a cycle has
already shipped** (`delivered`/`revising`/`revising (reopened)`/`accepted`)**:
leave that row
exactly as it is.** Never retarget an already-shipped row to `cancelled`
~ it represents a report that was genuinely produced, with real
`Delivered`/`Effort (h)`/`Rounds` evidence behind it, and overwriting its
status would erase completed cadence and rework data the instrument still
needs (a client who accepts cycle 6 clean, then pauses before cycle 7, did
NOT fail to deliver cycle 6 late ~ that row stays `accepted`, full stop).
The pause itself is represented by simply not opening a touch-1 row for
the next scheduled period, plus a note in `brief.md`/`context.md` on why
~ future-tense cadence changes and past-tense delivered cycles are
different facts and belong in different places, never the same row.

**Why `Status` exists:** without it, a report still mid-revision or still
awaiting sign-off looks identical to one that shipped clean ~ all read
`Rounds = 0` or an unfinished count. A forgotten row silently tells the
instrument "no rework happened," and a between-rounds row read as final
undercounts the rework that's still coming. `accepted` AND
`revising (reopened)` are the statuses the rework signal trusts ~ a
reopened row already has an established `accepted` baseline behind it, so
Instrument §5a deliberately counts its dated rounds too, not just a bare
`accepted` row's (excluding it during the reopened interval would drop
real, dated late rounds and understate rounds-per-report/corpus-tag
share, Codex catch, 2026-07-19); `open` past `Due` is a cadence miss in
progress; `delivered` and bare `revising` are both "not final yet."

## How to fill a row

**This is a Markdown table ~ escape any literal `|` in ANY free-text
cell, not just a client's real name.** `Analyst`, `Notes`, and any other
field an analyst types by hand can end up holding a pasted client phrase
or a shorthand like `Dale | Janelle` for a handoff; an unescaped `|`
inside a cell reads as a NEW column boundary to any Markdown parser,
shifting every field after it in that row out of alignment with this
table's fixed 12-column schema (`Period | Cadence | Analyst | Start |
Due | Delivered | Last Sent | Status | Rounds | Effort (h) | Rework tag |
Notes`). A shifted row either loses or misassigns its own data to §5b's
future automated ingestion (Codex catch, 2026-07-19), the same corruption
`README.md`'s Snapshot-table pipe-escaping rule exists to prevent, just
here on every cell instead of one specific one. Write `\|` for a literal
pipe in any cell (`Dale \| Janelle`), never a bare `|`.

- **Period** ~ a short, human-readable label for this cycle (e.g. `2026-07
  / wk 29` for a weekly client, `2026-07` for a monthly one). **Written
  ONCE at row creation (touch 1) and NEVER edited afterward** ~ together
  with the client (this file's own folder), `Period` is the stable
  composite key any external ingestion (capchecker's weekly pull,
  Instrument §5b) upserts against, so a label that drifts mid-life would
  silently orphan the row it used to match instead of updating the same
  one, creating a duplicate under the new label. **Use the SAME format
  for every row on THIS client's log, matching that client's cadence
  exactly** (a weekly client always writes `{YYYY-MM} / wk {N}`, a
  monthly client always writes `{YYYY-MM}`, etc.) ~ format drift within
  one client's own log (`2026-07 / wk 29` one row, `Jul wk29` the next)
  breaks the same automated matching the `Analyst` field's exact-spelling
  rule protects, just one column over.
- **Analyst** ~ **one name**: whoever is the ship-of-record for this cycle
  (usually the lead). This field is the join key to capchecker's per-person
  capacity data, so it must resolve to exactly one person ~ never a
  composite. **Use the EXACT same spelling capchecker uses for that
  person** (their Telegram display name / capchecker identity, not a
  nickname, initial, or shorthand) ~ every time, across every client's log
  ~ this is the literal string the automated per-analyst join (Instrument
  §5b) and the manual analyst-level HIRE scope check (§3) match on; `Dale`
  in one row and `Dale S.` in another silently splits one person into two
  for that join. If a person's capchecker identity itself ever changes
  (renamed Telegram handle, etc.), keep using their established
  delivery-log spelling going forward and fix the mapping on the
  capchecker side (a capchecker-side change, noted on the roadmap, never
  edited here directly) rather than letting spellings drift mid-history.
  If ownership genuinely changed mid-cycle (Dale started it, Janelle
  shipped it), put `Janelle` here (whoever delivered it) and note the
  handback in **Notes** (`handed off from Dale, wk2`) for the human
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
- **Last Sent** ~ for a shipped row: the date the most recently sent
  version (first ship, or the latest revision) actually went to the
  client. Equals `Delivered` at first ship (touch 2); updated ONLY at
  the moment of every touch-3 RESEND, never at the moment the revision
  request itself arrives ~ touch 3 blanks this field the instant a
  request comes in, precisely so a fix still in progress (not yet
  resent) can never be mistaken for a resend that's gone quiet (see
  touch 3). This is what the 5-business-day silent-acceptance rule
  (touch 4) counts from ~ using `Delivered` there instead would
  auto-accept a row the instant a late revision ships, if enough days had
  already passed since the first send; never updating anything would
  leave a revised row `revising` forever with no way to reach a silent
  accept. `Last Sent` gives the silence rule a correct, fresh anchor after
  every round. **For a `cancelled` row instead: the cancellation date** ~
  a different meaning for a row that never shipped, but the same field,
  reused rather than adding a second date column. This is the structured
  value on-cadence compares against `Due` to tell a before-`Due`
  cancellation (excluded) from an after-`Due` one (miss stays counted) ~
  see above and the `Status` bullet below.
- **Status** ~ `open` → `delivered` → (`revising` × as many rounds as
  needed) → `accepted`, always in that order. `accepted` is set once for
  the normal case (explicit sign-off, or 5 business days of silence
  following `Last Sent` ~ see above) ~ **with two documented exceptions:**
  (1) a revision request arriving AFTER acceptance ~ explicit sign-off OR
  a silent auto-accept, either one ~ re-opens the
  same row, `accepted → revising (reopened)` ~ a DISTINCT status value
  from bare `revising`, not the same label reused (see touch 4) ~ then
  back to `accepted` once that late
  round resolves. `revising (reopened)` exists specifically to keep
  visible, in the one field every downstream read already checks, that
  THIS row already reached `accepted` once before, unlike a row still
  working through its first-ever, never-yet-resolved pass (bare
  `revising`) ~ Instrument §3's rounds-per-report denominator reads this
  distinction directly: a reopened row still counts as an existing,
  established report; a still-unresolved first-pass row doesn't yet
  (Codex catch, 2026-07-19). Not a violation of "exactly once" so much
  as "once per actual finalization," and the documented way late feedback
  stays counted instead of vanishing; (2) a row can exit to `cancelled`
  ONLY from `open`, if the client pauses or cancels that cycle before it
  ships (see above) ~ a terminal state outside the normal chain, never
  followed by `accepted`, and never applied to a row that's already
  `delivered`/`revising`/`revising (reopened)`/`accepted` (a shipped cycle's evidence stays
  exactly as recorded, even if the client pauses future reporting
  afterward). On-cadence is computed as `Delivered ≤ Due` for any row that
  has shipped (`delivered`/`revising`/`revising (reopened)`/`accepted` ~ on-cadence reads the shipped-or-not fact, unaffected by which revising variant applies), an automatic miss for
  any `open` row where `Due` has already passed, and excluded entirely
  from both numerator and denominator for any `open` row not yet past
  `Due` (future work, not yet resolved either way). **`cancelled` rows are
  NOT uniformly excluded** ~ compare `Last Sent` (the cancellation date,
  stamped when `Status` was set to `cancelled`) against `Due`: cancelled
  BEFORE `Due` passed, `Last Sent ≤ Due` (same-day cancellation counts as
  before, matching `Delivered ≤ Due`'s own boundary), exclude fully (never
  a miss); cancelled AFTER `Due` had already passed while still `open`
  (`Last Sent > Due`, strictly), the automatic miss it already accrued
  STAYS in the numerator
  shortfall and denominator (see above) ~ cancelling only stops further
  tracking, it doesn't retroactively erase a miss that already happened.
  This comparison reads the structured `Last Sent` field, never the free
  text in **Notes** ~ what makes it reconstructable later, by a human or
  by §5b's automated ingestion, without parsing prose.
- **Rounds** ~ running count of revision rounds, from EITHER source:
  pre-delivery catches (QA gate, internal alignment, OR pass 2 ~ touch
  1.5, any point before the ship write) or client-requested revisions
  (touch 3, after delivery). Both are real rework; the router doesn't
  care which side of delivery it happened on, or which checkpoint caught
  it, only whether the standard needed correcting. Only trusted once
  `Status = accepted` OR `revising (reopened)` ~ **not `accepted`-only**
  (a reopened row already has an established `accepted` baseline behind
  it; excluding it here would drop its real, dated rounds from the
  rework signal for however long the late feedback takes to resolve,
  contradicting the trust rule stated elsewhere in this same file at the
  `Status` bullet below and `INSTRUMENT.md` §5a's gate (a), Codex catch,
  2026-07-19). A `cancelled` row's dated rounds are ALSO trusted, but
  narrower still ~ they feed a SEPARATE, corroborating count the
  instrument tracks alongside FIX_CORPUS's reading, never gate (a)'s
  numerator or gate (b)'s tag-share directly (a cancelled row never
  became a report, so blending its rounds into either gate's core math
  would decouple the reading from the reports it's supposed to describe)
  ~ see `INSTRUMENT.md` §5a's gate (b) definition for the full reasoning.
- **Effort (h)** ~ rough total hours, self-estimated, running total across
  every touch. Gut feel is fine; consistency beats precision.
- **Rework tag** ~ **required, not optional, the moment `Rounds` goes above
  0** ~ exactly ONE entry per round (if a round has multiple causes, pick
  by priority `brief-misalign` > `brand` > `quality-bar` > `data` >
  `client-new-ask` and note the rest in Notes ~ see touch 3). The genuinely
  FIRST round recorded on this row (whichever touch fires first ~ 1.5 or
  3) REPLACES the provisional `none`; every round after that, regardless
  of source, APPENDS its own entry, one per round, repeats allowed, never
  deduplicated: `brief-misalign` · `brand` · `quality-bar` · `data` ·
  `client-new-ask`.
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
  conclusion this row feeds. (`brief-misalign`, `brand`, and `quality-bar`
  are corpus gaps ~ they route to a corpus fix in the instrument, not to a
  hire. The instrument computes FIX_CORPUS's tag share PER ROUND ~ count
  of `brief-misalign`/`brand`/`quality-bar` entries ÷ total entries, which
  equals `Rounds` ~ not per row, so a row like `brand, client-new-ask,
  client-new-ask` counts as 1-in-3 corpus-tagged, not "corpus-tagged:
  yes/no.") **The same
  hard-block gate applies to any PARTIAL mismatch, not just a bare
  `none`:** if `Rounds = 3` but only two tag entries are recorded (say
  `brand, data`), that row is just as incomplete as a bare `none` ~ the
  entry count must equal `Rounds` exactly, or the row's tag share is
  unknown, not "whatever the recorded entries happen to divide out to."
  Before trusting any row's tag-share contribution, count its entries and
  compare to `Rounds`; anything less is missing data and gets the same
  exclude-and-block treatment as an untagged row.

  **A `brief-misalign`/`brand`/`quality-bar` tag names WHAT kind of defect
  it was, not WHY it happened ~ and those are different questions with
  different fixes.** Two very different situations both earn the same
  tag: (a) the governing corpus entry was genuinely missing or wrong (the
  brief never asked for X, the brand standard didn't say what logo to
  use, `what-good-looks-like.md` doesn't cover this case) ~ a real corpus
  gap, exactly what FIX_CORPUS exists to catch; (b) the corpus entry was
  already correct and complete, but the report shipped wrong anyway (the
  brand standard already specifies the right logo, Canva assembly just
  used the wrong one; the brief already lists an ask, someone skimmed
  past it) ~ an execution or workflow miss, not a corpus gap at all.
  Counting (b) toward FIX_CORPUS's share doesn't just add noise ~ acted
  on, it sends Rica to "fix" a file that was never broken, over and over,
  while masking whatever's actually causing the misses (individual
  attention, or a process gap REDESIGN should be looking at instead).
  **When logging one of these three tags, attach the qualifier directly
  to THAT entry, not as separate free text in Notes:** `brief-misalign
  (missing)` or `brief-misalign (not-followed)`, same pattern for `brand`
  and `quality-bar` ~ `missing` = the corpus genuinely didn't cover this,
  or was stale; `not-followed` = the corpus was already right, it just
  wasn't applied. A multi-round cell then reads like
  `brief-misalign (missing), brand (not-followed/brand-standard),
  client-new-ask` ~ three
  entries for three rounds, matching `Rounds = 3`, each qualifier
  unambiguously bound to its own entry by position, same list, same
  ordering rule as the tags themselves (entries append in order, never
  reordered, never deduplicated). **Why in the tag cell and not Notes:**
  Notes is free text where an unrelated sentence could accidentally
  contain the words "missing" or "not-followed," and a multi-round cell
  in Notes has no positional link back to which round a given word
  belongs to ~ the router can't reliably parse that. A parenthetical
  suffix on the tag entry itself has no such ambiguity: one qualifier,
  one position, one round. `client-new-ask` and `data` entries never take
  a qualifier ~ only the three corpus-cause tags do (a `client-new-ask`
  round was never a corpus question to begin with). This doesn't change
  the tag, the round-level math, or the ≥half threshold ~ FIX_CORPUS's
  first-pass share still counts corpus-tagged entries together, same as
  before, reading past the parenthetical. But before actually routing to
  "go edit the corpus file," check the qualifying rounds' qualifiers:
  majority `missing` → real FIX_CORPUS work; majority `not-followed` → a
  different problem, don't edit an already-correct file, look at coaching
  or process instead; a genuine tie → a resolved "no clear majority"
  finding, not provisional, don't edit the corpus off a tie either (see
  Instrument §3 for the full three-way handling). Read the tag share as
  WHERE to look, this qualifier as WHETHER editing the corpus is actually
  the fix.

  **`brand` specifically covers THREE different corpus files, and the tag
  alone can't say which ~ its qualifier carries a second component to
  disambiguate, SLASH-separated, never comma-separated.** **The two
  components are INDEPENDENT axes, never a fixed pairing ~ cause
  (`missing`/`not-followed`) says WHY, source (`house-voice`/
  `brand-standard`/`report-template-rules`) says WHICH FILE, and all six
  combinations are real,
  distinct findings:** `brand (missing/house-voice)` (the shared standard
  genuinely didn't cover this), `brand (not-followed/house-voice)` (the
  shared standard already covered it, just wasn't applied), `brand
  (missing/brand-standard)` (this client's own standard genuinely didn't
  cover this), `brand (not-followed/brand-standard)` (this client's own
  standard already covered it, just wasn't applied), `brand
  (missing/report-template-rules)` (the current template's own
  formatting/structure rules genuinely didn't cover this), `brand
  (not-followed/report-template-rules)` (the template rules already
  covered it, just wasn't applied). **`report-template-rules` is a
  distinct third source, not folded into `brand-standard`** ~
  `amplifi-qa/SKILL.md` check 2 explicitly checks terminology/formatting/
  structure against `report-template-rules.md` AND
  `clients/{client}/brand-standard.md` as two separate files, and without
  a matching qualifier value a check-2 catch against
  `report-template-rules.md` has no valid source to record: `house-voice`
  is factually wrong (a different file caught it), `brand-standard` is
  also wrong (a different file caught it), and logging no source at all
  makes the row incomplete data, hard-blocking routing the same as a
  missing qualifier does elsewhere in this cell (Codex catch,
  2026-07-19). Never assume
  `missing` implies `house-voice` or `not-followed` implies
  `brand-standard` (or any other fixed pairing across the three sources)
  ~ an already-encoded house-voice rule that was simply
  ignored is `not-followed/house-voice`, not `missing/house-voice`, and
  logging it as `missing` would incorrectly send FIX_CORPUS to edit a
  file that was never broken while masking the real execution gap; a
  genuinely absent client-specific rule is `missing/brand-standard`, and
  logging it as `not-followed` would incorrectly suppress a real corpus
  edit the client's own standard actually needs (Codex catch,
  2026-07-19). Never log a bare `brand (missing)` on its
  own, either qualifier component missing. **Slash, not comma, on purpose:** the comma is already load-bearing
  as the TOP-LEVEL separator between round entries in this cell (`entry1,
  entry2, entry3`) ~ a comma inside one entry's own parenthetical would
  make a single one-round value like `brand (missing, house-voice)` parse
  as TWO entries to anything splitting the cell on commas, silently
  breaking the "entry count must equal `Rounds`" completeness gate on a
  perfectly valid single round (Codex catch, 2026-07-19). The slash never
  appears anywhere else in this cell's grammar, so it's a safe, unambiguous
  choice for this ONE internal pairing. `brief-misalign` always points at
  `brief.md` and `quality-bar`
  always points at `what-good-looks-like.md` ~ each maps to exactly one
  file, no ambiguity. `brand` is different: `amplifi-qa`'s check 2 ("Voice
  & brand") covers BOTH `standards/house-voice.md` (Amplifi-wide, shared
  across every client) AND THIS client's own `brand-standard.md`, and a
  bare `brand` tag can't tell a later reader which one actually failed ~
  reading it as "the brand standard" by default would send FIX_CORPUS to
  edit `brand-standard.md` for what might really be a shared `house-voice.md`
  gap, leaving the real corpus problem untouched (Codex catch,
  2026-07-19). Write `house-voice` when the violation was a voice/tone/
  banned-phrase miss against the shared standard, `brand-standard` when it
  was a terminology/formatting/structure miss against this client's own
  standard ~ if check 2 caught both in the same round, pick by the SAME
  corpus-gap-first logic the tag priority order already uses (the shared
  file first, since a `house-voice.md` gap affects every client, not just
  this one) and note the other in **Notes**.

  **Every entry also carries its own date, appended last as `[YYYY-MM-DD]`
  ~ EVERY tag, not just the three corpus-cause ones:** `brief-misalign
  (missing) [2026-06-01]`, `data [2026-06-14]`, `client-new-ask
  [2026-06-20]`. Stamp it with TODAY's date at the moment that specific
  round is actually logged (touch 1.5 for a pre-delivery catch, touch 3
  for a client revision, including every round of a late reopen) ~ never
  backdated to `Period start` or `Due`, and never left off. **A missing
  date is the SAME class of incomplete data as a missing or partial tag,
  and gets the SAME hard-block treatment** ~ an otherwise-correct entry
  (right tag, right qualifier, right position) with no `[YYYY-MM-DD]`
  suffix can't be tested against Instrument §3's trailing-90-day window at
  all, so it silently drops out of BOTH FIX_CORPUS gates rather than
  counting as either in-window or out-of-window (Codex catch, 2026-07-19)
  ~ the same false-absence failure mode the tag-completeness gate above
  exists to prevent, one field over. Before trusting any row's
  contribution to FIX_CORPUS's math, confirm every entry has all three
  parts (tag, qualifier where required, date) ~ missing any one of them
  excludes the row and hard-blocks the reading the same way a bare `none`
  does. A multi-round
  cell then reads `brief-misalign (missing) [2026-06-01], brand
  (not-followed/house-voice) [2026-06-14], client-new-ask [2026-07-02]`
  ~ still one
  entry per round, matching `Rounds`, now with an unambiguous date bound
  to each entry by the same position-based rule the qualifier already
  uses. **Why this exists:** a row's `Due`/`Delivered`/`Last Sent` dates
  describe the ROW, not any individual round within it, and a revising row
  can span rounds that happened months apart (an early pre-delivery catch,
  then a late reopen well after the original ship). Without a per-round
  date, a later trailing-90-day cohort read has no honest way to know
  which of a row's rounds actually happened inside its window and which
  didn't ~ every earlier attempt at solving this by dating the ROW or the
  REOPEN EPISODE instead of the round itself eventually broke on some
  layout of rounds the coarser marker couldn't distinguish. Dating the
  round directly removes the guesswork at the source: FIX_CORPUS's
  rounds-per-report and tag-share math (Instrument §3) reads individual
  dated entries against the trailing window, full stop, regardless of
  which row or which touch logged them, or where `Due`/`Last Sent` happen
  to fall.

## The log

| Period | Cadence | Analyst | Start | Due | Delivered | Last Sent | Status | Rounds | Effort (h) | Rework tag | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| {2026-07 / wk 29} | {weekly} | {Dale} | {YYYY-MM-DD} | {YYYY-MM-DD} | {YYYY-MM-DD or blank} | {YYYY-MM-DD or blank} | {open / delivered / revising / revising (reopened) / accepted / cancelled} | {0} | {6} | {none, or e.g. brief-misalign (missing) [YYYY-MM-DD]} | {—} |
