# {Client Name} ~ Insight Log

> Append the key insights from every delivered report. Newest at the top.
> The insight skill reads this WHOLE file before generating ~ it's what
> turns "difficult to generate new recos for boring months" into "flat
> month, but here's the 3-month trend." Reports compound or they don't;
> this file is the compounding.

Format per entry ~ keep it tight, 5–10 lines. Link the full report, don't
paste it. **Heading = the exact `delivery-log.md` `Period` value for this
cycle, verbatim, never independently re-typed** (`## 2026-07 / wk 29` for
a weekly client, `## 2026-07` for monthly) ~ a bare `{YYYY-MM}` heading
collides for any client shipping more than once a month (weekly,
bi-weekly), leaving two entries both headed `2026-07` with no way to tell
which cycle either belongs to. The silent-acceptance scan and the
substantive-revision procedure (below) both need to find "the matching
insight-log entry" by period ~ that lookup only works if this heading and
`delivery-log.md`'s `Period` cell are the SAME string (Codex catch,
2026-07-19).

**Two touches per entry, plus a conditional third:** create it at ship
(client reaction is genuinely unknown yet ~ don't guess), then update the
one line at the next REAL client feedback moment ~ the client
presentation, or a client email/call reacting to the report.

**Creating it at ship means pasting what actually shipped, not the insight
skill's original draft trailer verbatim.** The skill drafts its
`INSIGHT-LOG ENTRY` trailer BEFORE the QA gate, human verify, or the
post-Canva pass run ~ any of those three pre-send checkpoints (delivery-log
touch 1.5) can still correct a number, a claim, or a recommendation before
this report ever reaches the client. If the analyst pastes the
skill's original trailer unchanged at ship, this file permanently records
content that was already known to be wrong before anyone outside Amplifi
saw it. Before saving this entry, check it against whatever touch 1.5
actually corrected and update `Headline insight` / `Data notes` /
`Recommendations made` to match what shipped, not what the skill first
drafted ~ same standard as the conditional third touch below, just
applied at creation time instead of after the fact.

**Two things don't count as real feedback, and recording them as if they
were is the same category error either way:**
- **Internal alignment** ~ that's Amplifi reviewing its own work before
  the client ever sees it.
- **The delivery-log's 5-day silent-acceptance touch** ~ that touch
  exists to let the REWORK signal treat "no news" as a real, countable
  zero-rework outcome (§ elsewhere in this corpus), which is a fair
  proxy for "nothing needed fixing." It is NOT a fair proxy for "the
  client liked the recommendations" ~ silence isn't endorsement, it
  might just mean nobody read it closely yet. If that touch fires before
  any real feedback moment, set `Client reaction` to `no feedback /
  administratively accepted` ~ a distinct value, never `accepted`.
The insight skill reads this field as what the CLIENT thinks; treating
internal opinion OR silence as client preference is worse than leaving it
pending, because a future report might then deliberately avoid a
recommendation the client never actually rejected. A `pending` (or
`no feedback`) left unupdated for more than a cycle is a sign the
feedback loop broke somewhere, not a sign nothing happened ~ worth a
PROCESS note to the improve skill.

**The conditional third touch:** if a client revision (delivery-log
touch 3) changes SUBSTANTIVE content ~ a number, an insight's claim, or a
recommendation, not just a wording/brand tweak ~ update the WHOLE entry
(`Headline insight`, `Data notes`, `Recommendations made`) to match what
was ACTUALLY delivered and accepted, not just `Client reaction`. This file
is read as trusted historical fact by every future period: `amplifi-
insights` pulls prior figures from it for the trend read, and `amplifi-qa`
validates historical figures against it too (see both skills' `SKILL.md`).
Leaving the originally-shipped ~ and since-corrected or client-rejected ~
version standing lets a wrong number or a walked-back claim propagate into
next period's report as trusted history, exactly the failure this log
exists to prevent. The delivery-log row already carries the evidence
(`Rework tag`, round count) that a substantive correction happened; when
it does, correct this entry in the same edit that updates `Client
reaction`, don't leave the two out of sync.

**If the corrected figure was ALREADY promoted into `context.md` as a
dated `CLIENT-FACT`, fixing only THIS entry isn't enough ~ check
`context.md` for a matching promoted fact and correct or supersede it too,
in the same edit.** Both files are accepted historical sources for the
SAME kind of figure (`amplifi-insights` Step 1 and `amplifi-qa` check 4
both read a dated `context.md` entry exactly like an insight-log entry,
see either `SKILL.md`) ~ correcting one while leaving the other stale
doesn't fix the problem, it just adds a second, conflicting "trusted"
value to the corpus, and a future report could easily pull the WRONG one
(Codex catch, 2026-07-19). Update the `context.md` fact's own value (keep
its original source-period date, per `README.md`'s "one fact, one home"
exception ~ that's still WHEN THE METRIC HAPPENED, unchanged by a later
correction to its value; note the correction date alongside it, e.g. "as
of Mar 2026, corrected Jun 2026") rather than leaving a second, newer fact
for the
same period sitting next to the stale one ~ two dated facts for one
period is the same ambiguity as one wrong one, just harder to notice.

---

## {Period}

**Headline insight:** {the one thing this period}
**Data notes:** {volume/engagement level, anomalies, source gaps}
**Recommendations made:** {1–3 bullets}
**Client reaction:** `pending` at ship → update once known: {accepted /
pushed back / asked for X / no feedback ~ administratively accepted}
**Watch next period:** {the thread to pick up}
**Full report:** {Drive link}

---

## {Period}

…
