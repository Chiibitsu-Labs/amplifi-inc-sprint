# Report Template Rules ~ Structure & Branding Every Report Follows

> **Status: FRAME ~ confirm against the current Canva template set.**
> The single description of what an Amplifi intelligence report IS ~ so the
> insight skill produces content already shaped for the deck, and the manual
> "transfer data to template so the deck doesn't look AI" step can shrink
> and eventually disappear. Owner: **Rica**.

## Canonical report structure

| # | Section | Contains | Source |
|---|---|---|---|
| 1 | Cover | client name, period, Amplifi branding | Canva template |
| 2 | Executive summary | the period in {N} bullets, headline insight first | insight skill |
| 3 | Performance vs baseline | {the metrics blocks in order} | Sentimo / MCP data |
| 4 | Deep-dive analysis | {per-platform? per-campaign? confirm} | insight skill |
| 5 | Insights | insights meeting the `what-good-looks-like.md` bar | insight skill |
| 6 | Recommendations | actionable recos, trend-aware | insight skill |
| 7 | Appendix | methodology, data notes | standing copy |

{Adjust rows to the real template ~ then this table IS the contract between
the skill's output and the Canva deck.}

## Branding rules (the "doesn't align w/ amplifi branding" fix)

- Fonts: {…} · Colors: {hex values} · Logo placement: {…}
- Chart style: {…}
- {Anything the team currently fixes by hand in Canva, written down}

## Fresh-data rules (the "old data retained in templates" fix)

- Every number in sections 2–6 must come from THIS period's data pull or the
  insight-log trend ~ never typed over last period's deck.
- Period-stamp the exec summary: "{Month YYYY} · data window {start}–{end}."
- The QA skill cross-checks the deck's period stamp against the data window
  and flags any figure that matches last period's report verbatim.

**Two checkpoints, not one.** The QA gate runs on the markdown draft ~
before Canva. That catches drift the skill introduced, but the exact
failure this section names ("old data retained in templates," stale
charts/numbers) mostly happens DURING the manual transfer into last
period's Canva file, which is a step after QA already passed. Content that
was clean in the draft can still ship stale if the deck retained an old
chart image or a typed-over number. So:
- The markdown QA pass is checkpoint one: catches skill-introduced errors
  before Canva.
- **Before sending to the client, re-run the QA skill's data-integrity
  check against the assembled deck** (export as text/PDF, or screenshot
  the key numbers) ~ same check, second checkpoint, catches what the
  transfer step introduced. This is a few minutes, not a re-review.
- Until this second pass is habitual, the existing human "VERIFICATION OF
  AI RESULTS" step should explicitly include "does every number in the
  deck match the QA'd draft" as a checklist line ~ don't let the deck be
  the one artifact nothing checks.

## Format notes

- Working format: markdown from the skill → Canva for client-facing polish.
- MS Office only when the client asks (per intake ~ don't default to it).
