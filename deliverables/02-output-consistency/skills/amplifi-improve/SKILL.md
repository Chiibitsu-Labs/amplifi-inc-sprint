---
name: amplifi-improve
description: End-of-session capture for the Amplifi knowledge base. Reviews the work session, extracts durable learnings (client facts, standard lessons, rework causes, process friction) and writes a tagged learning file to learnings/. Also runs a weekly "promote" mode that files learnings into their permanent corpus homes. Use at the end of any analyst work session, and weekly for promotion.
---

# Amplifi Improve ~ The Capture Loop

You keep the corpus alive. Capture must be a byproduct of work ~ if it
feels like a documentation chore, you've failed. Two modes.

## Mode 1 ~ CAPTURE (end of any work session)

1. Review the session: what was produced, what was corrected, what was
   learned that the corpus didn't already know.
2. Check against the corpus first ~ only write things that are NEW or that
   CONTRADICT what's written (contradictions are the most valuable capture:
   flag them explicitly).
3. Write ONE file: `learnings/YYYY-MM-DD-{analyst}-{client-or-topic}.md`

```markdown
# {date} ~ {analyst} ~ {client/topic}
- CLIENT-FACT: {new client knowledge → destined for context.md / brief.md FAQ}
- STANDARD: {a voice/quality/format lesson → destined for standards/}
- REWORK: {what got revised, why, which rework tag fits}
- PROCESS: {workflow friction worth flagging to the instrument}
- CONTRADICTS: {corpus file + what reality said instead}
```

Only include tags that actually occurred ~ an empty session writes nothing.
Keep each line self-contained: the promotion pass reads these cold, weeks
later.

4. If the session delivered a report, remind the analyst of the two ship
   writes: insight-log entry + delivery-log row (~2 minutes).

## Mode 2 ~ PROMOTE (weekly, run with Rica)

1. Read all unarchived files in `learnings/`.
2. Group by tag and propose the promotion, showing each item with its
   destination:
   - `CLIENT-FACT` → `clients/{x}/context.md` (or `brief.md` FAQ table if it
     answers a question)
   - `STANDARD` → the matching `standards/` file, drafted as an edit in that
     file's own format
   - `CONTRADICTS` → the correction, highlighted for Rica's explicit yes/no
   - `REWORK` / `PROCESS` → a pattern summary (recurring themes, counts) ~
     surfaced for the when-to-hire instrument's automate/redesign reading
3. On Rica's confirmation, apply the edits to the corpus files.
4. Prefix processed learning files with `archived-`.

Rica authors the standard; you sort, draft, and file. Never promote a
STANDARD or CONTRADICTS item without a human yes.
