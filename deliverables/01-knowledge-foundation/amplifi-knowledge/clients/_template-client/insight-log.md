# {Client Name} ~ Insight Log

> Append the key insights from every delivered report. Newest at the top.
> The insight skill reads this WHOLE file before generating ~ it's what
> turns "difficult to generate new recos for boring months" into "flat
> month, but here's the 3-month trend." Reports compound or they don't;
> this file is the compounding.

Format per entry ~ keep it tight, 5–10 lines. Link the full report, don't
paste it.

**Two touches per entry, plus a conditional third:** create it at ship
(client reaction is genuinely unknown yet ~ don't guess), then update the
one line at the next REAL client feedback moment ~ the client
presentation, or a client email/call reacting to the report. **Two things
don't count as real feedback, and recording them as if they were is the
same category error either way:**
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

---

## {YYYY-MM} ({cadence period})

**Headline insight:** {the one thing this period}
**Data notes:** {volume/engagement level, anomalies, source gaps}
**Recommendations made:** {1–3 bullets}
**Client reaction:** `pending` at ship → update once known: {accepted /
pushed back / asked for X / no feedback ~ administratively accepted}
**Watch next period:** {the thread to pick up}
**Full report:** {Drive link}

---

## {YYYY-MM} ({cadence period})

…
