# {Client Name} ~ Delivery Log

> **One row per reporting cycle. Quick touches, each ~20–30 seconds, each at
> a moment that already happens.** This is the when-to-hire instrument's
> report-level feed: cycle time, on-cadence rate, rework rounds, and effort
> all come from these rows ~ as a byproduct of the work, never a separate
> data-entry job.

## The write moments

1. **At period start** (brief/data-pull for this cycle begins): create the
   row. `Period`, `Analyst`, `Start`, `Due` filled; `Status = open`;
   everything else blank. **This is the row that makes an overdue,
   still-undelivered report visible** ~ if `Due` passes while `Status` is
   still `open`, that cycle is already a cadence miss even though nothing
   has shipped yet. Don't wait for delivery to log the cycle.
1.5. **If the QA gate or internal alignment (steps 9–10) catches and
   corrects a `brief-misalign` or `brand` issue BEFORE the client ever
   sees the report:** bump `Rounds`, append the cause (same rules as
   touch 3, below) ~ right then, while `Status` is still `open` (nothing
   has shipped yet). This is real rework and a real corpus signal ~ if it
   only counted client-requested revisions, FIX_CORPUS would never see
   the brief/brand problems the QA gate is specifically catching and
   fixing before they reach the client, which understates the exact
   pain (rework, standard-in-heads) this instrument exists to route on.
   Skip this touch entirely for cycles where internal review found
   nothing to fix ~ most of them, hopefully.
2. **At ship:** fill `Delivered`, top up `Effort (h)`. `Status = delivered`.
   `Rounds`/`Rework tag` carry forward whatever touch 1.5 already logged
   (default `0`/`none` if internal review caught nothing) ~ never reset to
   zero out pre-delivery catches.
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
   the per-round share countable at all. First revision **replaces** the
   provisional `none` with that round's (prioritized) cause. Every
   revision after that **appends** its own entry ~ repeats allowed, never
   deduplicated. Round 1 `brand`, round 2 `client-new-ask`, round 3 also
   `client-new-ask` → cell reads `brand, client-new-ask, client-new-ask`
   (three entries for three rounds, matching `Rounds = 3`). This matters
   beyond bookkeeping: the instrument's FIX_CORPUS check computes the
   corpus share PER ROUND (how many of the actual revision rounds were
   corpus-caused, not just whether any round ever was) ~ a row with one
   `brand` fix among four `client-new-ask` fixes is 20% corpus-driven,
   not 100%, and the entry count must equal `Rounds` for that math to
   mean anything. `Status = revising` ~ **not** `accepted`. Repeat this
   touch for every additional round.
4. **At actual client acceptance ~ or after 5 business days of silence
   post-delivery with no revision request:** `Status = accepted`. Explicit
   sign-off and "no news" are both real acceptance signals ~ most reports
   ship clean and nobody writes back to say so, and treating silence as
   permanently unresolved would starve the rework baseline of exactly the
   clean deliveries it needs to mean anything. **If a revision request
   arrives after the 5-day auto-accept, re-open the SAME row** ~ `Status`
   back to `revising`, bump `Rounds`, add the cause per touch 3 above.
   Late feedback is still real rework on this report; a fresh row with no
   period/due/delivered of its own would just delete the evidence, not
   relocate it. Only re-finalize to `accepted` once the late round is
   actually resolved. First version accepted with no revisions, explicit
   or by silence = go straight from `delivered` to `accepted`, numbers
   stay at 0/none.

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
- **Period start** ~ when this cycle's work began (data pull / brief).
- **Due** ~ the date this client's cadence says it ships.
- **Delivered** ~ when the client actually received it. Blank while `open`.
- **Status** ~ `open` → `delivered` → (`revising` × as many rounds as
  needed) → `accepted`, always in that order. `accepted` is set once for
  the normal case (explicit sign-off, or 5 business days of post-delivery
  silence ~ see above) ~ **with one documented exception:** a revision
  request arriving AFTER a silent auto-accept re-opens the same row,
  `accepted → revising`, then back to `accepted` once that late round
  resolves (see touch 4). That's the only case a row leaves `accepted`
  once reached; it's not a violation of "exactly once" so much as "once
  per actual finalization," and it's the documented way late feedback
  stays counted instead of vanishing. On-cadence is computed as
  `Delivered ≤ Due` for any row that has
  shipped (`delivered`/`revising`/`accepted`), and as an automatic miss for
  any `open` row where `Due` has already passed (an `open` row not yet
  past `Due` is neither ~ it's future work, exclude it from the rate
  entirely until it resolves one way or the other).
- **Rounds** ~ running count of revision rounds, from EITHER source:
  internal catches (QA gate / internal alignment, touch 1.5, before the
  client sees anything) or client-requested revisions (touch 3, after
  delivery). Both are real rework; the router doesn't care which side of
  delivery it happened on, only whether the standard needed correcting.
  Only trusted once `Status = accepted`.
- **Effort (h)** ~ rough total hours, self-estimated, running total across
  every touch. Gut feel is fine; consistency beats precision.
- **Rework tag** ~ **required, not optional, the moment `Rounds` goes above
  0** ~ exactly ONE entry per round (if a round has multiple causes, pick
  by priority `brief-misalign` > `brand` > `data` > `client-new-ask` and
  note the rest in Notes ~ see touch 3). The first round REPLACES the
  provisional `none`; every round after that APPENDS its own entry, one
  per round, repeats allowed, never deduplicated:
  `brief-misalign` · `brand` · `data` · `client-new-ask`.
  `none` is valid ONLY while `Rounds = 0`; a row with `Rounds ≥ 1` and tag
  `none` is an incomplete row, not a real zero-rework report ~ the router
  can't act on untagged rework, so it goes unrouted instead of pointing at
  automate/redesign/fix-corpus. (`brief-misalign` and `brand` are corpus
  gaps ~ they route to a corpus fix in the instrument, not to a hire. The
  instrument computes FIX_CORPUS's tag share PER ROUND ~ count of
  `brief-misalign`/`brand` entries ÷ total entries, which equals `Rounds`
  ~ not per row, so a row like `brand, client-new-ask, client-new-ask`
  counts as 1-in-3 corpus-tagged, not "corpus-tagged: yes/no.")

## The log

| Period | Analyst | Start | Due | Delivered | Status | Rounds | Effort (h) | Rework tag | Notes |
|---|---|---|---|---|---|---|---|---|---|
| {2026-07 / wk 29} | {Dale} | {YYYY-MM-DD} | {YYYY-MM-DD} | {YYYY-MM-DD or blank} | {open / delivered / revising / accepted} | {0} | {6} | {none} | {—} |
