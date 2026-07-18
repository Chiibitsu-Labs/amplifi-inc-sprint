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
2. **At ship:** fill `Delivered`, top up `Effort (h)`. `Status = delivered`.
   `Rounds` starts at `0`, tag at `none` ~ both provisional.
3. **If the client asks for a revision:** bump `Rounds` by 1, top up
   `Effort (h)`, set `Rework tag`. `Status = revising` ~ **not** `accepted`.
   Repeat this touch for every additional round. A row sitting at
   `revising` is exactly as trustworthy as `open`: not yet final.
4. **At actual client acceptance:** `Status = accepted`. This is the ONLY
   status that means "these numbers are final" ~ set it once, at real
   sign-off, never earlier. First version accepted with no revisions =
   go straight from `delivered` to `accepted`, numbers stay at 0/none.

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
  needed) → `accepted`, always in that order, `accepted` set exactly once.
  On-cadence is computed as `Delivered ≤ Due` for any row that has shipped
  (`delivered`/`revising`/`accepted`), and as an automatic miss for any
  `open` row where `Due` has already passed.
- **Rounds** ~ running count of revision rounds. Only trusted once
  `Status = accepted`.
- **Effort (h)** ~ rough total hours, self-estimated, running total across
  every touch. Gut feel is fine; consistency beats precision.
- **Rework tag** ~ **required, not optional, the moment `Rounds` goes above
  0** ~ pick the *main* driver of that round: `brief-misalign` · `brand` ·
  `data` · `client-new-ask`. `none` is valid ONLY while `Rounds = 0`; a row
  with `Rounds ≥ 1` and tag `none` is an incomplete row, not a real
  zero-rework report ~ the router can't act on untagged rework, so it goes
  unrouted instead of pointing at automate/redesign/fix-corpus.
  (`brief-misalign` and `brand` are corpus gaps ~ they route to a corpus
  fix in the instrument, not to a hire.)

## The log

| Period | Analyst | Start | Due | Delivered | Status | Rounds | Effort (h) | Rework tag | Notes |
|---|---|---|---|---|---|---|---|---|---|
| {2026-07 / wk 29} | {Dale} | {YYYY-MM-DD} | {YYYY-MM-DD} | {YYYY-MM-DD or blank} | {open / delivered / revising / accepted} | {0} | {6} | {none} | {—} |
