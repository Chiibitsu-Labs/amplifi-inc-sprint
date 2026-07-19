# learnings/ ~ The Capture Loop's Inbox

Dated learning files land here **automatically** via the improve skill at
the end of work sessions. Nobody writes here by hand as a chore ~ capture is
a byproduct, or it dies.

## File convention (what the improve skill writes)

**One file per CLIENT per session**, not just one file per session:
`YYYY-MM-DD-HHMMSS-{analyst}-{client-or-topic}.md`
(seconds, not just HHMM ~ keeps two sessions in the same MINUTE for the
same analyst/client from colliding, not just two in the same day; if a
name still collides, append `-2`, `-3`, etc. before `.md`). **A session
touching more than one client writes a SEPARATE file per client**, since
the promotion pass resolves every item in a file through that ONE file's
own header ~ folding several clients under one header would send items
for anyone but the header's client to the wrong folder or fail the lookup
outright (`amplifi-improve/SKILL.md`'s Mode 1 has the full rule, including
the narrow `[ClientName]`-bracket exception for one incidental
cross-client fact inside an otherwise topic-scoped file ~ Codex catch,
2026-07-19). This applies in the no-write manual fallback too, not just
when the skill writes directly.

```markdown
# 2026-07-24 ~ Dale ~ {Client}
- CLIENT-FACT: {something learned about the client → destined for context.md or brief.md FAQ}
- STANDARD: {a quality/voice lesson → destined for standards/}
- REWORK: {what got revised and why → informs the delivery-log rework tag}
- PROCESS: {a workflow friction worth flagging → informs the roadmap/instrument}
- CONTRADICTS: {corpus file + what reality said instead → the most valuable capture, needs a human yes}
```

Tags matter: the promotion pass sorts by them.

## The promotion pass (weekly, ~15 minutes, owner: Rica)

Once a week, run the improve skill's *promote* mode (or do it by hand ~
same rules either way):

1. Read the week's learning files.
2. Move each durable item to its permanent home:
   - `CLIENT-FACT` → that client's `context.md` (or `brief.md` FAQ if it was
     a client answer)
   - `STANDARD` → the matching file in `standards/`
   - `CONTRADICTS` → **don't auto-apply.** Show Rica the corpus text and
     what contradicted it, side by side, and get an explicit yes/no before
     changing anything. This is the highest-value capture in the whole
     loop (it means the corpus was WRONG, not just incomplete) and also
     the one most likely to need judgment ~ never silently overwrite.
   - `REWORK` / `PROCESS` → append a dated pattern entry (theme, count,
     which clients) to `learnings/patterns.md` ~ the durable running tally
     the when-to-hire instrument's automate/redesign branches read across
     weeks
3. Prefix processed files with `archived-` (or move to an `archive/`
   subfolder) ~ only after their contents have landed in a permanent home
   (`patterns.md` included) AND every `CONTRADICTS` item has an explicit
   yes/no from Rica, not just a read. The inbox stays near-empty; the
   corpus stays current, and never silently wrong.

## Why this two-stage design

Writing straight into `context.md` mid-session is friction + merge risk.
An inbox that a weekly pass promotes keeps capture instant AND keeps the
permanent files curated. Inbox fills itself; promotion is the only manual
step, and it's 15 minutes with a skill doing the sorting.
