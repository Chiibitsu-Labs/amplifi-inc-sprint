---
name: amplifi-improve
description: End-of-session capture for the Amplifi knowledge base. Reviews the work session, extracts durable learnings (client facts, standard lessons, rework causes, process friction) and writes a tagged learning file to learnings/. Also runs a weekly "promote" mode that files learnings into their permanent corpus homes. Use at the end of any analyst work session, and weekly for promotion.
---

# Amplifi Improve ~ The Capture Loop

You keep the corpus alive. Capture must be a byproduct of work ~ if it
feels like a documentation chore, you've failed. Two modes.

**Resolve the live `amplifi-knowledge/` root before doing anything below,
every run, in EITHER mode.** `DRIVE-HANDOFF.md`'s installation steps put
this skill's own file in the invoking client's skills location
(`.claude/skills/amplifi-improve/SKILL.md`, project- or user-level) ~ a
different filesystem location from the Drive-synced corpus itself, and the
two aren't guaranteed to share a working directory. Every `learnings/...`
and `clients/...` path anywhere in this file (Mode 1's write below, Mode
2's reads) is relative to the ACTUAL live `amplifi-knowledge/` folder
(`README.md`'s "the one home"), never to wherever this skill happens to
be invoked from. Confirm the real, synced filesystem path to that root
before touching any path below ~ don't assume the invoking client's
current working directory already IS it, even in the primary one-client
deployment tier where that's usually true. A relative `learnings/...`
write with no confirmed root can
silently land in the session's ordinary working directory instead of the
live corpus, or fail outright if that directory doesn't exist ~ appearing
to succeed while the capture never actually enters the corpus Mode 2 later
promotes from, exactly the failure `DRIVE-HANDOFF.md`'s write-path
requirement (step 6) exists to prevent, one level downstream of it (Codex
catch, 2026-07-19).

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
   human (or the promotion pass) actually reads. **Apply `README.md`'s
   TWO Windows-specific cases here too, not just the reserved-character
   list** ~ this is the primary Drive-for-Desktop deployment, commonly a
   Windows filesystem underneath, and a filename (not just a folder name)
   is exactly as exposed to both failure modes: trim any trailing `.` or
   space from the slugged `{analyst}`/`{client-or-topic}` components
   before use (Windows silently strips or rejects a name ending in either),
   and if a component IS or reduces to a reserved device name (`CON`,
   `PRN`, `AUX`, `NUL`, `COM0`–`COM9`, `LPT0`–`LPT9`, case-insensitive,
   reserved even with an extension appended), give it a disambiguating
   suffix the same way a slug collision does above. Skipping either case
   doesn't fail loudly here either ~ Mode 1's entire capture silently
   fails to persist, same as `README.md`'s folder-slug version of this gap
   (Codex catch, 2026-07-19).

   **If this session's client has a duplicate-name collision ~ an
   `Account label` set in its `brief.md` Snapshot, per `README.md`'s
   duplicate-name handling ~ record that `Account label` in the header
   too:** `# {date} ~ {analyst} ~ {client/topic} ({account label})` (or,
   for a bracketed incidental line, `CLIENT-FACT: [ClientName (account
   label)] {the fact}`). **Mode 1 has no Step 0 of its own and is
   explicitly meant to run at the end of ANY work session, standalone ~
   it is not always preceded by `amplifi-insights`/`amplifi-qa`'s Step 0,
   which is the only place this identity normally gets resolved** (Codex
   catch, 2026-07-19: the prior wording assumed "Step 0's Snapshot
   resolution already ran to get here," true only when this session
   generated or QA'd a report first; a standalone correction, brief edit,
   or process-friction capture session can invoke Mode 1 with no such
   resolution having happened at all). If THIS session already ran
   `amplifi-insights`/`amplifi-qa`'s Step 0 earlier (a normal generate-
   then-capture or QA-then-capture flow), reuse that already-resolved
   identity here rather than re-deriving it. If it didn't ~ Mode 1 running
   on its own ~ run the SAME resolution here, before writing: list
   `clients/*` and match each folder's `brief.md` Snapshot `Client` value
   against this session's client name; if more than one folder plausibly
   matches (two genuinely different accounts sharing a display name), check
   whether this session carries enough distinguishing detail to match
   exactly one folder's `Account label`, and resolve there if it does; if
   it still doesn't, STOP and ask which account before writing anything ~
   guessing between two real accounts risks filing this capture, and
   whatever Mode 2 later promotes from it, against the wrong client's
   corpus entirely. Whichever path resolved the identity, throwing it away
   at capture time means Mode 2 below can only recover it if the fact text
   HAPPENS to carry enough distinguishing detail on its own, which an
   ordinary `CLIENT-FACT` or `STANDARD` correction usually doesn't, leaving
   it permanently stuck at "flag to Rica, don't guess" even though the
   identity was already resolved once. Skip all of this for any client with
   no collision ~ a blank/never-set `Account label` needs no header
   addition and no extra resolution step.

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
later. **If this session touched MORE than one client, write a SEPARATE
capture file per client** (same filename pattern, one `{client-or-topic}`
each) rather than folding several clients' items under one header ~ the
file's single `# {date} ~ {analyst} ~ {client/topic}` header is what Mode
2 resolves every item in that file through, so a `CLIENT-FACT`/`REWORK`
line for a client OTHER than the header's would either get proposed for
the wrong folder or fail the Snapshot lookup outright and never get
promoted (Codex catch, 2026-07-19). **Exception: a genuinely topic-scoped
session** (not about any one client) **that happens to surface ONE
incidental fact about a NAMED client** doesn't need a whole second file
for that one line ~ prefix just that line with the client name in
brackets instead: `CLIENT-FACT: [ClientC] {the fact}`. Mode 2 resolves a
bracketed line against ITS named client, ignoring the file's own header
for that one item only; an un-bracketed line still resolves through the
header as normal. Use the bracket sparingly ~ if more than one or two
items in a "topic" file end up bracketed for actual clients, that session
was really multi-client and should have been split into separate files
per the rule above instead. **If a `CLIENT-FACT` IS or CONTAINS a metric** (a number describing
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

**If THIS capture is happening on a LATER date than the work session it
describes** (this skill wasn't run same-day, so `REWORK`/`PROCESS` items
are being written up after the fact) **~ prefix each `REWORK`/`PROCESS`
line with the ACTUAL occurrence date, not just the filename's capture
date:** `REWORK: {2026-06-13} {what got revised...}`. This is the
exception, not the rule ~ Mode 1 is meant to run "at the end of any work
session," so the filename date and the work date are the SAME day in the
normal case, and no prefix is needed. But when they diverge (a Monday
catch-up capture for Friday's session, say), Mode 2's weekly grouping
needs the REAL date the friction happened on, not the date someone got
around to writing it down ~ grouping by filename date alone would file a
Friday occurrence under Monday's week, misattributing it (see Mode 2's
grouping rule below for why that corrupts cross-week recurrence).

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
     find the right slugged folder ~ the same resolution direction
     `amplifi-qa`'s and `amplifi-insights`' own Step 0 now require when
     reading a client folder (Codex catch, 2026-07-19: an earlier draft of
     this bullet claimed those two skills already did this read-side
     resolution when neither actually did), just applied here on
     the write side. **If the item line itself carries a `[ClientName]`
     bracket** (Mode 1's exception for one incidental fact inside an
     otherwise topic-scoped file) **~ resolve THAT name instead of the
     file's header name for this one item,** same Snapshot-matching
     process, then continue reading the rest of the file's un-bracketed
     items against the header as normal. If no folder's `brief.md` matches, flag it to Rica
     rather than guessing or creating a new folder silently. **If MORE
     THAN ONE folder's `Client` plausibly matches** (two different
     accounts sharing a display name, per `README.md`'s duplicate-name
     handling) **~ check the header (or the item's own `[ClientName
     (account label)]` bracket) for an `Account label` FIRST, before
     falling back to scanning the fact text for incidental distinguishing
     detail.** Mode 1's collision paragraph above has the capturing
     session record its already-resolved `Account label` right there
     specifically so Mode 2 doesn't have to re-derive it from context ~ if
     the header carries one, match it directly against each candidate
     folder's `Account label` row. Only if the header carries none (an
     older capture written before this rule, say) fall back to checking
     whether the learning's fact text itself happens to carry enough
     distinguishing detail to match exactly one folder's `Account label`
     instead; if THAT still doesn't resolve it either, flag it to Rica
     rather than guessing which account this fact belongs to ~ promoting
     it into the wrong one of two same-named accounts is worse than not
     promoting it at all. **If the fact
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
   - `STANDARD` → **two different destinations depending on WHOSE standard
     it is, not one.** A lesson about Amplifi's own house voice, the
     quality bar, or the current report template ~ true for every client
     ~ goes to the matching shared `standards/` file, drafted as an edit
     in that file's own format. **But a lesson that's specific to ONE
     client** (a revision teaches a client-specific voice preference,
     terminology correction, or formatting deviation ~ "this client hates
     the word 'viral'," "always spell out their product name in full")
     **goes to THAT client's `clients/{x}/brand-standard.md` instead,
     per `ARCHITECTURE-MAP.md`'s workflow step 5** ("every correction →
     `brand-standard.md` / FAQs ~ the same note never twice") **~ and
     that file's own documented mechanism is a TWO-PART write, not one:**
     the extracted RULE itself moves into the applicable operative
     section above (Voice & tone, Formatting rules, or Terminology,
     whichever the correction actually is), and ONLY the correction STORY
     ~ what happened, what rule got extracted ~ lands in "Revision history
     lessons." Writing just the story and skipping the operative-section
     update leaves the actual enforceable rule buried as historical
     narrative that `amplifi-insights`/`amplifi-qa` never read as a
     current requirement (both read the operative sections, not the
     revision history, when generating or checking against this file) ~
     the correction can then recur next cycle exactly as if it had never
     been captured at all, defeating the purpose of promoting it (Codex
     catch, 2026-07-19). Write both parts, every time: the rule up top,
     the story in history. Writing a client-specific lesson into the shared
     `standards/` file instead would ALSO be wrong, a different failure ~
     it would globalize one client's preference across
     every account; leaving it uncaptured because the shared file felt
     like the only STANDARD destination would let the same correction
     recur next cycle too, exactly what `brand-standard.md`'s two-part
     mechanism exists to prevent. Resolve `{x}`
     the SAME way the `CLIENT-FACT` bullet above does ~ against the
     learning's own client identity (header or `[ClientName]` bracket),
     matched to the actual slugged folder via `brief.md` Snapshot, never
     the raw display name; flag to Rica rather than guess if no folder
     matches or more than one plausibly does, same as `CLIENT-FACT`.
   - `CONTRADICTS` → the correction, highlighted for Rica's explicit yes/no
   - `REWORK` / `PROCESS` → append a dated pattern entry (theme, count,
     which clients) to `learnings/patterns.md` ~ the durable, append-only
     running tally the when-to-hire instrument's automate/redesign branches
     read. Summarizing into chat and archiving the sources would lose the
     cross-week counts; the tally file is the memory. **If a Friday pass
     was skipped and this run is reading a backlog spanning more than one
     capture week, group EACH `REWORK`/`PROCESS` item by the date it
     actually happened on ~ its own occurrence-date prefix if Mode 1 wrote
     one (`REWORK: {2026-06-13} {...}`), or the file's filename date ONLY
     when no such prefix is present** (the normal case, filename date and
     work date match) **~ never group by filename date alone when an
     occurrence-date prefix exists, and never lump a multi-week backlog
     into a single "this week" entry.** Grouping by filename date alone
     misattributes a delayed capture (a Monday write-up for Friday's
     session) to the WRONG week, and can turn one real week's occurrence
     into apparent cross-week recurrence if the misattributed week already
     has its own genuine entry (Codex catch, 2026-07-19) ~ the whole point
     of Mode 1's occurrence-date prefix is giving this step the date it
     actually needs.
     `patterns.md`'s schema is one week-block per calendar week specifically
     because AUTOMATE/REDESIGN read RECURRENCE ACROSS weeks; collapsing
     three weeks of backlog into one block either manufactures a
     same-week spike that never happened or buries a real 3+-week
     recurrence inside a single inflated count, either way corrupting
     exactly the signal this file exists to preserve. Write one dated
     week-block per distinct week actually represented in the backlog,
     each dated to THAT WEEK'S MONDAY specifically (`patterns.md`'s own
     canonicalization rule ~ never today's date, never the date this
     catch-up pass happens to be running, never any other day inside that
     week), even if that means writing several
     historical blocks in one catch-up promotion pass. Two different
     promotion passes writing two different dates for the same real week
     (one the Monday, one the day it happened to run) would otherwise read
     as two distinct weeks to anything counting cross-week recurrence ~
     canonicalizing to Monday every time is what keeps the SAME week
     always matching itself (Codex catch, 2026-07-19). **Before writing
     any of those blocks, check whether `patterns.md` already has a
     `## {that week} (week of)` header** ~ a prior promotion pass may
     already have covered that week normally, and this run is only
     catching a straggler capture for it. If so, do NOT write a second
     normal week-block (that duplicates the week and inflates cross-week
     recurrence) ~ append a `LATE ADDITION to {that week's date}` block
     instead, exactly as `patterns.md`'s own "How a promotion pass writes
     here" section defines, so the router folds it into the ORIGINAL
     week's tally rather than reading it as a second occurrence week.
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
