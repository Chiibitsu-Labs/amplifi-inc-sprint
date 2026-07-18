# {Client Name} ~ Delivery Log

> **One row per delivered report, added the moment it ships. ~60 seconds.**
> This is the when-to-hire instrument's report-level feed: cycle time,
> on-cadence rate, rework rounds, and effort all come from these rows ~ as a
> byproduct of finishing, never a separate data-entry job.

## Two write moments (both ~30 seconds)

1. **At ship:** add the row. `Rounds` starts at `0` and the tag at `none` ~
   they're provisional until the client accepts.
2. **At client acceptance** (or after any revision round): update the SAME
   row ~ final `Rounds`, `Rework tag`, top up `Effort (h)`. First version
   accepted as-is = nothing to update. This second touch is what makes the
   rework signal real; a log full of zeros that were never revisited would
   quietly tell Michele rework doesn't exist.

## How to fill a row

- **Analyst** ~ who delivered it (lead on the work, not the account). If it
  was a genuine handoff mid-cycle, name both: `Dale→Janelle`. This is how
  the instrument joins report facts to the daily capacity feed per person.
- **Period start** ~ when the reporting period's work began (data pull /
  brief for this cycle).
- **Due** ~ the date this client's cadence says it ships.
- **Delivered** ~ when the client actually received it.
- **Rounds** ~ revision rounds before client-accepted. First version
  accepted = 0. (Provisional at ship; finalized at acceptance ~ see above.)
- **Effort (h)** ~ rough total hours, self-estimated. Gut feel is fine;
  consistency beats precision.
- **Rework tag** ~ if Rounds ≥ 1, the *main* reason, one of:
  `brief-misalign` · `brand` · `data` · `client-new-ask` · `none`
  (`brief-misalign` and `brand` are corpus gaps ~ they route to a corpus
  fix in the instrument, not to a hire.)

## The log

| Period | Analyst | Start | Due | Delivered | On-time | Rounds | Effort (h) | Rework tag | Notes |
|---|---|---|---|---|---|---|---|---|---|
| {2026-07 / wk 29} | {Dale} | {YYYY-MM-DD} | {YYYY-MM-DD} | {YYYY-MM-DD} | {y/n} | {0} | {6} | {none} | {—} |
