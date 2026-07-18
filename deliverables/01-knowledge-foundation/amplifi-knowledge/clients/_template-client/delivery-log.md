# {Client Name} ~ Delivery Log

> **One row per delivered report, added the moment it ships. ~60 seconds.**
> This is the when-to-hire instrument's report-level feed: cycle time,
> on-cadence rate, rework rounds, and effort all come from these rows ~ as a
> byproduct of finishing, never a separate data-entry job.

## How to fill a row

- **Period start** ~ when the reporting period's work began (data pull /
  brief for this cycle).
- **Due** ~ the date this client's cadence says it ships.
- **Delivered** ~ when the client actually received it.
- **Rounds** ~ revision rounds before client-accepted. First version
  accepted = 0.
- **Effort (h)** ~ rough total hours, self-estimated. Gut feel is fine;
  consistency beats precision.
- **Rework tag** ~ if Rounds ≥ 1, the *main* reason, one of:
  `brief-misalign` · `brand` · `data` · `client-new-ask` · `none`
  (`brief-misalign` and `brand` are corpus gaps ~ they route to a corpus
  fix in the instrument, not to a hire.)

## The log

| Period | Start | Due | Delivered | On-time | Rounds | Effort (h) | Rework tag | Notes |
|---|---|---|---|---|---|---|---|---|
| {2026-07 / wk 29} | {YYYY-MM-DD} | {YYYY-MM-DD} | {YYYY-MM-DD} | {y/n} | {0} | {6} | {none} | {—} |
