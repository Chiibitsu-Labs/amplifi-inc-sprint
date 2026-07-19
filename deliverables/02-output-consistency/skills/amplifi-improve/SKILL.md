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
2. Check against the corpus first ~ only write `CLIENT-FACT`/`STANDARD`
   items that are NEW or that CONTRADICT what's written (contradictions
   are the most valuable capture: flag them explicitly). **This novelty
   filter does NOT apply to `REWORK` and `PROCESS`.** A recurring theme
   is not "old news" for those two tags ~ it's the exact signal
   AUTOMATE/REDESIGN need: `patterns.md` counts OCCURRENCES across weeks,
   and a theme that already happened once still needs every SUBSEQUENT
   occurrence logged, or the count that's supposed to cross a threshold
   never grows past one. If rework happened or friction showed up this
   session, log it under `REWORK`/`PROCESS` even if the exact same theme
   was captured last week too ~ especially then.
3. Write ONE file:
   `learnings/YYYY-MM-DD-HHMMSS-{analyst}-{client-or-topic}.md` (seconds,
   not just HHMM ~ two sessions for the same analyst/client inside the
   same minute, e.g. a quick correction pass right after the first
   capture, would otherwise collide on an identical filename. **Never
   overwrite an existing learning file, full stop:** if a name still
   collides even with seconds included, append `-2`, `-3`, etc. before
   `.md` and use the first suffix that doesn't already exist)

   **This requires an actual write path to the live corpus** ~ a
   Drive-connector attachment that only lets you *read* files can't create
   this one. Before relying on this step, confirm which applies:
   - **Filesystem access to the synced folder** (Drive for Desktop, or any
     setup where `amplifi-knowledge/` is a real local path) ~ write the
     file directly. This is the deployment `handoff/DRIVE-HANDOFF.md`
     recommends, precisely because it's the one that actually writes.
   - **No write access** (read-only Drive connector, or files attached
     per-session with no save-back) ~ you cannot persist anything. Output
     the learning file's full content in a fenced block instead, and end
     the session with: *"No write path to the corpus ~ save this as
     `learnings/{filename}` yourself."* Never silently skip the write and
     never claim you saved something you didn't.

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

1. Read only files matching the dated session-file pattern,
   `learnings/YYYY-MM-DD-HHMMSS-*.md`, that are NOT already prefixed
   `archived-`. **Explicitly exclude `learnings/patterns.md` and
   `learnings/README.md`** ~ `patterns.md` is the permanent output of this
   step, not an input to it; reading it back in would re-promote its own
   tally into itself and double-count every theme on every future run.
2. Group by tag and propose the promotion, showing each item with its
   destination:
   - `CLIENT-FACT` → `clients/{x}/context.md` (or `brief.md` FAQ table if it
     answers a question)
   - `STANDARD` → the matching `standards/` file, drafted as an edit in that
     file's own format
   - `CONTRADICTS` → the correction, highlighted for Rica's explicit yes/no
   - `REWORK` / `PROCESS` → append a dated pattern entry (theme, count,
     which clients) to `learnings/patterns.md` ~ the durable, append-only
     running tally the when-to-hire instrument's automate/redesign branches
     read. Summarizing into chat and archiving the sources would lose the
     cross-week counts; the tally file is the memory.
3. On Rica's confirmation, apply the edits to the corpus files. Same write-
   path requirement as Mode 1: if you can't write to `amplifi-knowledge/`
   directly, output every edit as a fenced block per destination file and
   have Rica (or whoever has edit access) apply them ~ don't claim
   "promoted" for anything not actually written.
4. Prefix processed learning files with `archived-` (never archive before
   step 2's destinations ~ including `patterns.md` ~ are written). **This
   step is not optional in the no-write fallback either** ~ if you printed
   fenced-block edits in step 3 for Rica to apply by hand, the pass isn't
   done until the renames ALSO happen (by Rica, or by you if you regain
   write access later in the session). A source file left un-archived
   still matches the dated-session-file pattern and gets read again next
   week, double-counting its REWORK/PROCESS entries into `patterns.md`.
   Don't report the promotion pass as complete until archival is
   confirmed, same as you wouldn't claim "promoted" for an unwritten edit.

Rica authors the standard; you sort, draft, and file. Never promote a
STANDARD or CONTRADICTS item without a human yes.
