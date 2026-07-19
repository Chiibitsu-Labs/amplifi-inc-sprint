# amplifi-knowledge

Amplifi's analyst-function knowledge base. One home, shared by everyone,
readable by humans and by Claude. Plain markdown, on purpose ~ this folder
is **owned by Amplifi** and moves to any platform (Drive today, git later)
without a rebuild.

## How to use this folder

**Starting a new client?** Copy `clients/_template-client/` → rename to the
client's name → fill `brief.md` and `brand-standard.md` from the kickoff.
**Slug the folder name first if the client's real name has a `/` or any
other filesystem-reserved character** (`\ : * ? " < > |`) ~ a client like
"ACME/EMEA" becomes the folder `clients/ACME-EMEA/`, never a literal `/`
in the path (that creates an unintended nested directory, or fails
outright, and breaks every skill's `clients/{client}/...` read). Same
slugging rule the improve skill uses for learning filenames. **Two MORE
Windows-specific cases need the same slugging pass, since the live corpus
syncs through Drive for Desktop and that commonly means a Windows
filesystem underneath, not just the reserved-character list above:**
- **Trailing dots or spaces** ~ Windows silently strips or rejects a
  folder name ending in `.` or a space (`"Acme Inc."` → Windows would try
  to create `"Acme Inc"`, dropping the period without asking). Trim any
  trailing `.`/space from the slug before using it, same as any other
  normalization here.
- **Reserved device names** ~ `CON`, `PRN`, `AUX`, `NUL`, `COM0`–`COM9`,
  `LPT0`–`LPT9` (case-insensitive, and reserved even WITH a file
  extension appended) cannot be created as a folder name on Windows at
  all. A client whose name IS or reduces to one of these (rare, but "Con
  Edison" abbreviated to "Con" is exactly the shape that would collide)
  needs a disambiguating suffix the same way a slug collision does above
  (e.g. `Con-client`), not just the ordinary character-substitution rule.
Skipping either case doesn't fail loudly ~ it fails as a sync error or a
silently-renamed folder days later, which is worse (Codex catch,
2026-07-19). Keep the
REAL, unslugged name inside `brief.md`'s Snapshot table ~ the slug is a
filesystem-safety measure for the folder name only. **If a Snapshot
table VALUE contains a literal `|`, escape it as `\|`, never a bare `|`
~ and this isn't scoped to the `Client` row alone.** The Snapshot is a
Markdown table with several free-form cells besides `Client` ~
`Platforms monitored` (e.g. "Sentimo | MCP"), `Client contacts`, and
`Amplifi lead analyst` (its own `{name} · backup: {name}` shape can
plausibly become "Dale | Janelle" for a handoff note) can all just as
easily contain a literal `|` as the client name can, and an unescaped one
in ANY of them is read as a NEW column boundary by any Markdown parser
the same way, corrupting the row and shifting every field after it out of
alignment (Codex catch, 2026-07-19) ~ this breaks not just the
name-resolution lookup but also `INSTRUMENT.md` §5b's automated ingestion
of the `Amplifi lead analyst` field specifically. Escape every Snapshot
cell's literal pipes, not only `Client`'s. The
Snapshot itself is a Markdown table, and an unescaped `|` inside a cell
is read as a NEW column boundary by any Markdown parser, corrupting the
row and breaking the exact lookup `amplifi-improve`, `amplifi-qa`, and
`amplifi-insights` all now rely on (matching a requested display name
against this table to resolve the slugged folder, per each skill's own
Step 0/Mode 2). The escaped form still displays
and reads back as the real value ~ un-escape `\|` → `|` when
comparing or reading any Snapshot cell, same as any other
Markdown-escaped value.

**Check for a slug COLLISION before creating the folder, and never
silently reuse an existing one ~ and never treat matching NAMES alone as
proof of matching ACCOUNTS.** Slugging is lossy ~ different real
names can normalize to the same string (`ACME/EMEA`, `ACME:EMEA`, and a
client literally named `ACME-EMEA` all slug to `clients/ACME-EMEA/`), so
the folder name alone can't be trusted to be unique without an explicit
check. Before finishing the copy, list `clients/*`: if the target slug
does NOT already exist, use it as-is. If it DOES already exist, read that
existing folder's `brief.md` Snapshot table and **STOP for a human
decision, don't auto-resolve either way:** "`clients/{slug}/` already
exists for a client named '{existing name}' ~ is this the SAME account
(reuse the existing folder, don't create a second one) or a DIFFERENT
account that just happens to share the name (needs its own folder)?"
**Two unrelated clients can genuinely share an identical display name**
(a churned "Acme Corp" engagement years ago, an unrelated new "Acme Corp"
signing up now) ~ this corpus has no stable account identifier beyond the
name itself, so name equality is a HINT, never proof, and auto-merging
two different accounts because their names match would silently point
every skill's Snapshot-based resolver at one shared brief/context/
delivery history for what are actually two separate clients (Codex
catch, 2026-07-19). Only once a human confirms "yes, same account" does
this become a non-collision; a confirmed DIFFERENT account (whether the
name differs OR merely happens to match) is a genuine collision. **Before
picking a numeric suffix, though, enumerate the base slug AND every
already-existing numbered variant (`-2`, `-3`, …), not just the base ~
this account being onboarded might already BE one of them.** Onboarding
rerun for an account that's already stored under a suffix is a real case,
not a hypothetical: if the base slug belongs to an unrelated client A and
THIS account already exists at `clients/{slug}-2/` from an earlier
onboarding, checking only the base folder finds client A there, correctly
calls it a different account, and would then allocate the next free
suffix (`-3`) for what's actually the SAME account already living at
`-2` ~ splitting its brief/context/delivery history across two folders
and making Snapshot resolution ambiguous between them (Codex catch,
2026-07-19). So: list `clients/*`, read the Snapshot/`Account label` of
the base slug AND every numbered variant already present, and compare
against the account being onboarded (the same human-confirmed identity
check above) BEFORE allocating anything new ~ if any of them already IS
this account, reuse that folder, don't create another. Only once none of
the existing base/variants match does allocating the next free suffix
apply: append a
numeric suffix,
DETERMINISTIC and creation-order based ~ `-2` if the base slug is taken,
`-3` if `-2` is also taken, and so on, first available number wins, same
"first suffix that doesn't already exist" rule `amplifi-improve` already
uses for colliding learning filenames.

**A suffixed FOLDER alone doesn't fix a duplicate NAME ~ the two accounts'
Snapshot `Client` cells would still read identically, and every skill
resolves by matching that cell, not the folder name.** Two folders named
`clients/ACME/` and `clients/ACME-2/` whose `brief.md` Snapshots BOTH say
`Client | ACME Corp` are still ambiguous to any resolver: a request for
"ACME Corp" now matches both, and picking one (first found, alphabetical,
whatever) silently reads or writes the WRONG account's brief/context/
delivery history exactly as often as it picks right (Codex catch,
2026-07-19). **When a genuine duplicate-name collision is confirmed, add
a distinguishing qualifier to BOTH accounts' `Account label` Snapshot row
~ a SEPARATE row from `Client`, never written into `Client` itself.**
`Client` is the real, client-facing name ~ it's what `amplifi-insights`
stamps onto anything a client actually sees (cover, exec summary), so it
has to stay the genuine, unqualified name forever, collision or not; a
generated report reading "ACME Corp (new account, 2026)" on its own cover
would be a visible, embarrassing leak of an internal disambiguation label
into client-facing output (Codex catch, 2026-07-19: an earlier draft of
this fix wrote the qualifier straight into `Client`, conflating the
resolver identity with the display name that same field is also used
for). `Account label` holds whatever real fact
tells the two accounts apart (`ACME Corp (Chicago office, since 2024)` vs
`ACME Corp (new account, 2026)`; region, industry, or onboarding date,
whichever is true and durable) ~ **add this row to BOTH accounts'
Snapshots the moment a collision is confirmed, not just the new one** ~
qualifying only the new account would leave the original account's
`Account label` blank, and a resolution request that DOES carry enough
distinguishing detail to match uniquely would then only ever match the
new account, silently treating the original as if it were never part of
the collision. Skills resolve `Client` first, same as always (unqualified,
identical across colliding accounts by design) ~ when MORE than one
folder's `Client` matches, THEN check whether the request carries enough
distinguishing detail to match exactly one folder's `Account label`; if it
does, resolve there without asking; **if it still doesn't, STOP and ask,
never guess.** `Client` never needs to be unique on its own ~ that was
never really the right invariant to enforce on a client-facing display
field; `Account label` is what carries the actual disambiguation burden,
scoped to internal resolution only ~ ambiguous is not the same
as resolved. Never let a second client's folder
silently overwrite or get merged into the first client's ~ the
Snapshot-based resolver every skill now uses (Codex catch, 2026-07-19)
would otherwise read or write the WRONG client's brief, context, and
delivery data for whichever name lost the collision.

**Delete the copied example row in the new `delivery-log.md` before
opening the client's first real row** ~ the copy carries the template's
own placeholder row (`{YYYY-MM-DD}` / `{Dale}` / etc.) verbatim, and
nothing else in this setup flow removes it. Leaving it in place doesn't
just look messy ~ it's a row Instrument §5b's future ingestion has to
treat as unresolved-template noise, same as it does for the retained
`_template-client` scaffold itself (see `INSTRUMENT.md` §5b for why that
ingestion defends against a missed cleanup here too, but don't rely on
the safety net when a 5-second delete is right here).

**A client clarifies something?** Write it into that client's `brief.md`
FAQ section, once. Nobody re-infers it again.

**Starting a client cycle?** Open a row in that client's `delivery-log.md`
~ 20 seconds. This is what makes an overdue, still-undelivered report
visible to the instrument, not just a shipped one.

**Shipping a report?** Add the key insights to the client's
`insight-log.md` ~ **new entry goes at the TOP, below the header, never
the bottom** (`insight-log.md`'s own convention: "newest at the top" ~
adding to the bottom instead reverses chronology over successive reports
and eventually buries the most relevant period under a long history,
making it the first content likely to get missed or truncated when the
insights skill reads the accumulated log, Codex catch, 2026-07-19) ~ and
mark the delivery-log row `delivered` (~1 minute
total).

**Client accepts the report?** Finalize that row's rounds + rework tag,
mark it `accepted` ~ 20 seconds. This is what feeds Michele's
when-to-hire instrument.

**Ending a work session with Claude?** Run the **improve skill** ~ it writes
learnings to `learnings/` automatically. See `learnings/README.md`.

**Generating insights or QA-ing a report with Claude?** The skills read
`standards/` and the client folder first. You shouldn't need to re-explain
Amplifi's voice or the client's brief in a prompt ~ if you do, the corpus is
missing something: add it there, not in the prompt.

## The rules

1. **Markdown stays markdown.** Don't convert files to Google Docs format ~
   upload/sync as `.md` so the structure survives the future git migration.
2. **One fact, one home.** Client facts live in the client folder; how-we-work
   facts live in `standards/`. If you wrote it twice, one of them is wrong.
   **Exception: a metric promoted from `insight-log.md` into `context.md`
   as a dated `CLIENT-FACT`, per the recurs-enough-to-promote convention
   ~ that's a deliberate cache, not a duplication mistake.** A repeatedly-
   needed figure lives in BOTH places on purpose, so it's still readable
   even when the linked full report isn't reachable, and
   `skills/amplifi-qa/SKILL.md` check 4 explicitly accepts either copy as
   a valid historical source for exactly this reason. `insight-log.md`'s
   entry is the canonical original; `context.md`'s `CLIENT-FACT` is the
   sourced copy, dated with when it was first promoted, and
   `insight-log.md`'s own "conditional third touch" requires a later
   correction to update BOTH when a matching promoted fact exists ~
   applying this rule's "one of them is wrong, delete the extra" reflex to
   that intentional cache would remove a source future sessions need
   (Codex catch, 2026-07-19). This exception is scoped to that one
   promotion pattern, not a general license to duplicate facts elsewhere.
3. **The corpus outranks memory.** If the corpus and someone's recollection
   disagree, fix the corpus ~ then it's fixed for everyone, forever.

## Map

```
clients/           per-client: living brief, brand standard, context,
                   insight log (compounding), delivery log (instrument feed)
standards/         the Amplifi bar: what good looks like, house voice,
                   report template rules
learnings/         auto-captured session learnings, promoted weekly;
                   patterns.md is the durable tally the instrument reads;
                   router-decisions.md is the monthly hire-router audit trail
```

*Chiibitsu Labs ~ more human, by design.*
