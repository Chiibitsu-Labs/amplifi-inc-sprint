---
title: Knowledge Foundation Blueprint
client: Amplifi Technologies Corp
function: Analyst (Core Build scope)
deliverable: 1 of 4
builder: Chii / Chiibitsu Labs
status: v1 ~ scaffold ready to copy to Drive
canon: AI adoption is not tool exposure. It is workflow incorporation.
---

# Knowledge Foundation Blueprint

The corpus. Amplifi's owned, machine-legible knowledge layer for the analyst
function ~ the single source of truth that makes output consistent regardless
of who's at the keyboard, and the foundation the other three deliverables
stand on.

---

## 1. Why this exists (your words, not ours)

From the intake: *"Where does the knowledge live right now?"* →
**"Canva, Claude, respective laptops of the analysts."**

From the pain map:
- "no reference for notes/revisions re: brand/client asks → **no master doc**"
- "Analyst did not align w/ client brief" · "Report not aligned w/ Brief"
- "Reports can only be accessed by assigned analyst → Canva limitation"
- "old data retained in templates" · "AI template does not align w/ amplifi branding"
- "Reports not evolving as more data points are collected over time"

One root cause under all of it: **the standard lives in heads and scattered
files.** Rework isn't a headcount problem or an AI problem ~ it's a corpus
problem. This is the highest-leverage fix in the whole engagement.

## 2. What it is

A plain-markdown folder called `amplifi-knowledge/` ~ one home, shared by all
six, readable by humans and by Claude. It lives in **Google Drive today**
(the bridge), and is structured so the move to a git repo (the destination,
once the CTO unblocks GitHub × Claude Enterprise) is a copy-paste, not a
rebuild. No format lock-in, no proprietary anything.

**Vault vs lens:** this folder is the vault ~ owned, permanent. Claude is the
lens ~ rented, swappable. The corpus never lives *inside* Claude or Canva.

## 3. The structure

```
amplifi-knowledge/
  README.md                     # how the team uses this folder, one page
  clients/
    _template-client/           # copy this folder for every client
      brief.md                  # the LIVING brief + FAQs ~ clarifications write back here
      brand-standard.md         # this client's voice, formatting, branding rules
      context.md                # accumulated client context, promoted from learnings
      insight-log.md            # every report's key insights ~ so month 6 reads richer than month 1
      delivery-log.md           # one line per delivered report ~ feeds the when-to-hire instrument
  standards/
    what-good-looks-like.md     # the analyst quality bar, encoded (frame ~ Rica fills from best work)
    house-voice.md              # how Amplifi actually writes ~ the anti-AI-slop layer
    report-template-rules.md    # structure + branding rules every report follows
  learnings/
    README.md                   # how the improve skill writes here + the promotion path
    (dated learning files accumulate here automatically)
```

Every file in the scaffold ships with structure, instructions, and
placeholders ~ the team fills content, never invents format.

## 4. The design decisions that matter

**Living briefs, not static.** `brief.md` accumulates FAQs and
clarifications. When a client answers a question once, it gets written back
once ~ and no analyst ever re-infers it. This is the direct fix for
"BRIEF DOC / REQS should automatically include FAQs," "incomplete information
from client," and slow-reply gaps.

**Insight log = compounding reports.** Each report's key insights append to
`insight-log.md`. The insight skill reads the whole thread before
generating, so "boring months" still yield signal ~ *"flat month, but here's
the 3-month trend"* instead of "just continue." Direct fix for "Reports not
evolving as more data pts are collected over time."

**Delivery log = the instrument's feed.** One table row at the moment a
report ships (analyst, dates, on-time or not, rough effort), finalized with
revision rounds + a rework tag when the client accepts. Two ~30-second
touches, both byproducts of finishing ~ never a separate job. This
is where the when-to-hire instrument gets its cycle-time, on-cadence, and
rework signals (see Deliverable 5).

**Brand standard as the anti-slop layer.** "AI slop," "AI tells," "AI
template does not align w/ amplifi branding" ~ all thin-context symptoms.
Encode the actual standard once; the lens applies it every run. Context
kills slop.

**One home, shared access.** Kills "reports only accessible by assigned
analyst" and the delegation scramble when someone's on leave. Knowledge
stops being person-dependent ~ which is the brief's own success bar:
*"institutional knowledge that travels with the organization, not with
individuals."*

## 5. The capture loop (how it stays alive)

A wiki nobody updates is a graveyard. This corpus fills as a **byproduct of
work**, via the improve skill (Deliverable 2, `skills/amplifi-improve/`):

1. At the end of a work session, the analyst runs the improve skill.
2. It writes what was learned ~ client clarifications, standard refinements,
   things that got reworked and why ~ to a dated file in `learnings/`.
3. Weekly, the promotion pass moves durable learnings into their permanent
   home: client facts → that client's `context.md` or `brief.md` FAQs,
   quality lessons → `standards/`.
4. Next session, the skills read the corpus and already know.

If capture is a second job, it dies. That's why there is no step here that
isn't attached to work the team already does.

## 6. Migration path (Drive → git, documented now so it's trivial later)

- **Today (Level 2):** `amplifi-knowledge/` is a shared Drive folder. All six
  have edit access. Files are markdown (`.md`) uploaded/synced as plain text
  ~ *not* converted to Google Docs format ~ so structure survives.
- **The day the CTO unblocks GitHub × Claude Enterprise (Level 3):**
  `git init` a repo, drag the folder in, commit. Because everything is plain
  markdown with stable relative paths, nothing rewrites. History starts
  accruing; access becomes PR-able; the improve skill writes via commits.
- **Nothing to undo:** no Drive-only features (comments-as-content, Docs
  formatting, Canva embeds) are load-bearing anywhere in the corpus.

## 7. What this must NOT become

- **Not a wiki chore** ~ capture is automated via the improve skill.
- **Not locked in Claude Projects or Canva** ~ owned markdown, portable.
- **Not a dumping ground** ~ the taxonomy is clients + standards + learnings,
  so retrieval stays clean and token-cheap.

## 8. Confirmed-in-session / still open

| Question | Status |
|---|---|
| Folder taxonomy matches how the team thinks about clients | **Confirm with Rica** on first real client seeding |
| Improve-skill write format + promotion path | Defined ~ see `learnings/README.md` in the scaffold |
| Drive → git move | Documented above, §6 |
| Shared access for all 6 without collisions | Drive folder edit-share; one file per concern keeps merge pain near zero |

*Feeds: Output Consistency (reads the standard) · the When-to-Hire
Instrument (delivery-log + the fix-corpus branch).*

*Chiibitsu Labs ~ more human, by design.*
