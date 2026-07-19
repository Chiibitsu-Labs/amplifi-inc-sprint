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
filesystem-safety measure for the folder name only. **If the real name
contains a literal `|`** (one of the same reserved characters that
already triggers folder slugging above, e.g. "ACME|EMEA") **~ escape it
as `\|` when writing that Snapshot table cell, never a bare `|`.** The
Snapshot itself is a Markdown table, and an unescaped `|` inside a cell
is read as a NEW column boundary by any Markdown parser, corrupting the
row and breaking the exact lookup `amplifi-improve`, `amplifi-qa`, and
`amplifi-insights` all now rely on (matching a requested display name
against this table to resolve the slugged folder, per each skill's own
Step 0/Mode 2 ~ Codex catch, 2026-07-19). The escaped form still displays
and reads back as the real `ACME|EMEA` ~ un-escape `\|` → `|` when
comparing a requested name against this cell, same as any other
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
name differs OR merely happens to match) is a genuine collision: append a
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
2026-07-19). **When a genuine duplicate-name collision is confirmed,
write a DISTINGUISHING qualifier directly into the new account's Snapshot
`Client` cell, not just the folder name** ~ whatever real fact actually
tells them apart (`ACME Corp (Chicago office, since 2024)` vs `ACME Corp
(new account, 2026)`; region, industry, or onboarding date, whichever is
true and durable). This keeps the Snapshot `Client` field as the one
identity key every skill already reads ~ it just has to actually stay
UNIQUE per account once a duplicate name is confirmed, which a bare
display name can't guarantee on its own. **Any resolution request that
still matches MORE than one folder's Snapshot (the qualifier wasn't
included, or two accounts haven't been disambiguated yet) must STOP and
ask which account, never silently pick one** ~ ambiguous is not the same
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

**Shipping a report?** Append the key insights to the client's
`insight-log.md`, and mark the delivery-log row `delivered` (~1 minute
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
