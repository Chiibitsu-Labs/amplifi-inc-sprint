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

   **Slug `{analyst}` and `{client-or-topic}` before interpolating them
   into the path ~ never write the raw label straight into a filename.**
   A client/topic name containing a `/` (`ACME/EMEA`), or any other
   filesystem-reserved character (`\ : * ? " < > |`), turns "one file"
   into an unintended nested path, which fails outright if the
   directories don't already exist and silently misfiles the learning if
   they do. Replace any such character with `-` when building the
   filename (`ACME/EMEA` → `ACME-EMEA`), collapse repeated `-`, and keep
   the ORIGINAL, unslugged names inside the file's own `# {date} ~
   {analyst} ~ {client/topic}` header ~ the slug is a filesystem-safety
   measure for the path only, never a substitute for the readable name a
   human (or the promotion pass) actually reads.

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
later. **If a `CLIENT-FACT` IS or CONTAINS a metric** (a number describing
some period's performance, not a qualitative observation), **write its
SOURCE PERIOD into the line right now, at capture** ("engagement rate
4.2% as of Mar 2026" ~ not just "engagement rate 4.2%"), same requirement
Mode 2 enforces at promotion ~ don't defer it. Capturing the number
without the period it describes and expecting the weekly promotion pass to
recover it later loses exactly the context that's freshest at the moment
of capture and often unrecoverable by Friday (which report, which period
was actually being discussed, may no longer be obvious from a terse
one-line session note read cold a week on). Purely qualitative
`CLIENT-FACT`s don't need this ~ the period requirement is for metrics
specifically, same scope as Mode 2's rule below.

4. If the session delivered a report, remind the analyst of the two ship
   writes: insight-log entry + delivery-log row (~2 minutes).

## Mode 2 ~ PROMOTE (weekly, run with Rica)

1. Read only files matching the dated session-file pattern,
   `learnings/YYYY-MM-DD-HHMMSS-*.md`, that are NOT already prefixed
   `archived-`. **Explicitly exclude `learnings/patterns.md` and
   `learnings/README.md` as PROMOTION INPUTS** ~ `patterns.md` is the
   permanent output of this step, not an input to it; reading its COUNTS
   back in would re-promote its own tally into itself and double-count
   every theme on every future run. **But DO skim `patterns.md`'s
   existing theme NAMES first, as a naming reference only, never as
   data:** each promotion pass groups this week's free-form `REWORK`/
   `PROCESS` text in isolation, with no visibility into how the SAME
   recurring problem got named in prior weeks ~ without a shared
   vocabulary, one real issue can fragment across several distinct theme
   bullets ("data pulling" one week, "long data-pull queue" the next,
   "waiting for exports" the week after), and the cross-week occurrence
   count that AUTOMATE/REDESIGN actually read never crosses its
   threshold because no single name ever accumulates enough hits. Before
   naming a new week's theme, check whether an existing `patterns.md`
   bullet already describes the same underlying problem and reuse ITS
   exact name if so ~ this is purely a naming lookup (read-only, no
   counts touched, no tally re-entered), never a substitute for actually
   tallying this week's fresh occurrences.
2. Group by tag and propose the promotion, showing each item with its
   destination:
   - `CLIENT-FACT` → `clients/{x}/context.md` (or `brief.md` FAQ table if it
     answers a question). **Resolve `{x}` against the ACTUAL, already-
     slugged folder name under `clients/`, never against the raw display
     name sitting in the learning file's own `# {date} ~ {analyst} ~
     {client/topic}` header.** Mode 1 deliberately keeps that header
     unslugged (`README.md`'s slugging rule is a filesystem-safety measure
     for folder/file names only, not a mandate to rewrite the readable
     name everywhere) ~ so a learning captured for "ACME/EMEA" carries that
     exact unslugged string in its header, while the real folder on disk is
     `clients/ACME-EMEA/`. Writing `clients/{x}/context.md` straight from
     the header string reproduces the same bug the folder-naming rule
     exists to prevent, one layer downstream: an unintended nested
     `clients/ACME/EMEA/context.md` path, or an outright failure if
     `clients/ACME/` doesn't exist. Before writing, list `clients/*` and
     match the learning's client name against each folder's `brief.md`
     Snapshot (which keeps the real, unslugged name per `README.md`) to
     find the right slugged folder ~ same resolution direction QA/insights
     skills already use when reading a client folder, just applied here on
     the write side. If no folder's `brief.md` matches, flag it to Rica
     rather than guessing or creating a new folder silently. **If the fact
     IS or CONTAINS a metric** (a
     number that describes some period's performance, not just a
     qualitative observation), **the promoted entry must carry that
     metric's own SOURCE PERIOD explicitly** ("engagement rate 4.2% as of
     Mar 2026" ~ not just "engagement rate 4.2%"), and that source period
     is the period the metric DESCRIBES, not the date this learning file
     was captured or promoted ~ a session captured in July can easily be
     writing up something observed about March's numbers. `amplifi-
     insights` and `amplifi-qa` both only accept a `context.md` fact as a
     valid historical source when it's dated this way (see amplifi-qa's
     check 4) ~ promoting a metric without its source period produces an
     entry neither skill can actually use later, silently defeating the
     point of promoting it. Purely qualitative CLIENT-FACTs (a preference,
     a rejected idea, "don't use humor in captions") don't need this ~
     the date requirement is for metrics specifically.
   - `STANDARD` → the matching `standards/` file, drafted as an edit in that
     file's own format
   - `CONTRADICTS` → the correction, highlighted for Rica's explicit yes/no
   - `REWORK` / `PROCESS` → append a dated pattern entry (theme, count,
     which clients) to `learnings/patterns.md` ~ the durable, append-only
     running tally the when-to-hire instrument's automate/redesign branches
     read. Summarizing into chat and archiving the sources would lose the
     cross-week counts; the tally file is the memory. **If a Friday pass
     was skipped and this run is reading a backlog spanning more than one
     capture week, group the input files by their OWN filename date
     (`YYYY-MM-DD` in `learnings/YYYY-MM-DD-HHMMSS-*.md`) before tallying
     ~ never lump a multi-week backlog into a single "this week" entry.**
     `patterns.md`'s schema is one week-block per calendar week specifically
     because AUTOMATE/REDESIGN read RECURRENCE ACROSS weeks; collapsing
     three weeks of backlog into one block either manufactures a
     same-week spike that never happened or buries a real 3+-week
     recurrence inside a single inflated count, either way corrupting
     exactly the signal this file exists to preserve. Write one dated
     week-block per distinct week actually represented in the backlog,
     each with its own real date, even if that means writing several
     historical blocks in one catch-up promotion pass.
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
