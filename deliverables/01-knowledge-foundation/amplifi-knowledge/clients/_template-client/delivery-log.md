# {Client Name} ~ Delivery Log

> **One row per reporting cycle. Three quick touches, each ~20–30 seconds,
> each at a moment that already happens.** This is the when-to-hire
> instrument's report-level feed: cycle time, on-cadence rate, rework
> rounds, and effort all come from these rows ~ as a byproduct of the work,
> never a separate data-entry job.

## Three write moments

1. **At period start** (brief/data-pull for this cycle begins): create the
   row. `Period`, `Analyst`, `Start`, `Due` filled; `Status = open`;
   everything else blank. **This is the row that makes an overdue,
   still-undelivered report visible** ~ if `Due` passes while `Status` is
   still `open`, that cycle is already a cadence miss even though nothing
   has shipped yet. Don't wait for delivery to log the cycle.
2. **At ship:** fill `Delivered`, top up `Effort (h)`. `Status = delivered`.
   `Rounds` starts at `0`, tag at `none` ~ both provisional.
3. **At client acceptance** (or after any revision round): finalize
   `Rounds` and `Rework tag`, top up `Effort (h)`. `Status = accepted`.
   First version accepted as-is = just flip the status, numbers stay at 0/none.

**Why `Status` exists:** without it, a report still awaiting client sign-off
looks identical to one that shipped clean ~ both read `Rounds = 0`. A
forgotten row silently tells the instrument "no rework happened." `Status`
makes "not finalized yet" a visible state instead of an invisible one:
`accepted` rows are the only ones the rework signal trusts; `delivered`
rows are pending; `open` rows past `Due` are cadence misses in progress.

## How to fill a row

- **Analyst** ~ who's doing it (lead on the work, not the account). If it
  was a genuine handoff mid-cycle, name both: `Dale→Janelle`. This is how
  the instrument joins report facts to the daily capacity feed per person.
- **Period start** ~ when this cycle's work began (data pull / brief).
- **Due** ~ the date this client's cadence says it ships.
- **Delivered** ~ when the client actually received it. Blank while `open`.
- **Status** ~ `open` → `delivered` → `accepted`, in that order, never
  skipped. On-cadence is computed as `Delivered ≤ Due` for `delivered`/
  `accepted` rows, and as an automatic miss for any `open` row where `Due`
  has already passed.
- **Rounds** ~ revision rounds before client-accepted. Provisional (`0`)
  until `Status = accepted`; that's when it's trusted.
- **Effort (h)** ~ rough total hours, self-estimated, running total across
  the three touches. Gut feel is fine; consistency beats precision.
- **Rework tag** ~ once `Status = accepted` and `Rounds ≥ 1`, the *main*
  reason, one of: `brief-misalign` · `brand` · `data` · `client-new-ask` ·
  `none` (`brief-misalign` and `brand` are corpus gaps ~ they route to a
  corpus fix in the instrument, not to a hire.)

## The log

| Period | Analyst | Start | Due | Delivered | Status | Rounds | Effort (h) | Rework tag | Notes |
|---|---|---|---|---|---|---|---|---|---|
| {2026-07 / wk 29} | {Dale} | {YYYY-MM-DD} | {YYYY-MM-DD} | {YYYY-MM-DD or blank} | {open / delivered / accepted} | {0} | {6} | {none} | {—} |
