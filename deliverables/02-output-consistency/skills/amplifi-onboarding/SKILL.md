---
name: amplifi-onboarding
description: One pass, run once per analyst per machine. Installs amplifi-insights, amplifi-qa, and amplifi-improve into this client, then bootstraps the shared standards files (and, in a client context, that client's brand-standard.md) from real, already-approved work — live, during onboarding, instead of a separately-scheduled extraction session. Idempotent: re-running skips anything already Status LIVE and offers a refresh pass instead. Use for the initial team rollout, and again for anyone who joins the analyst function later.
---

# Amplifi Onboarding ~ Install Once, Standard Bootstraps Live

Two jobs, one pass: **install** the toolchain, then **bootstrap** the
standard from whoever's onboarding own real work. Nobody schedules a
separate documentation hour for this ~ the fill happens as a byproduct of
sitting down with Claude for the first time, same "just-in-time, not the
cathedral" principle the corpus itself runs on.

**Resolve the live `amplifi-knowledge/` root before any step below**,
same requirement `amplifi-insights`, `amplifi-qa`, and `amplifi-improve`
each state for themselves ~ this skill's own file lives at
`.claude/skills/amplifi-onboarding/SKILL.md` (project- or user-level),
a different filesystem location from the Drive-synced corpus. Confirm the
real, synced path to `amplifi-knowledge/` before touching anything below;
don't assume the invoking client's working directory already is it.

## Step 1 ~ Install the toolchain

**Check which deployment tier applies first (`DRIVE-HANDOFF.md` step 6)
~ this determines which skills belong in THIS client, not just where to
find them.**

- **Tier (a), one client:** install all three ~ `amplifi-insights`,
  `amplifi-qa`, AND `amplifi-improve` ~ into this same client alongside
  `amplifi-onboarding` itself, per `DRIVE-HANDOFF.md` step 6a.
- **Tier (b), fallback:** insights and QA drafting stays in Claude
  Enterprise on purpose ~ do NOT install `amplifi-insights` or
  `amplifi-qa` into this client. Only `amplifi-improve` belongs here
  (alongside `amplifi-onboarding` itself), per `DRIVE-HANDOFF.md` step 6b.
  Installing insights/QA locally under tier (b) creates a second, unused
  copy that the tier-(b) redeployment instructions never update ~ it goes
  stale silently and risks getting invoked by mistake later. **Not
  installing them locally doesn't mean skipping them, though:** confirm
  `amplifi-insights` and `amplifi-qa` are actually uploaded and current in
  Claude Enterprise (step 4) before calling this step done under tier (b)
  ~ otherwise this pass can complete and report "verified" while the
  analyst has no drafting or QA skill available anywhere, local or
  Enterprise.

Check whether whichever skills the active tier calls for are already
present in this client's own skills location (for Claude Code:
`.claude/skills/{name}/SKILL.md`, project- or user-level). For each one
missing, copy it in from `amplifi-knowledge/skills/{name}/SKILL.md`
(Amplifi's own owned copy, per `DRIVE-HANDOFF.md` step 5 ~ never from
Chii's reference repo, which can drift from what Amplifi actually has
live).

If `amplifi-knowledge/skills/` itself doesn't have all four skills yet
(the three above AND `amplifi-onboarding` itself) ~ stop and flag it: the
Drive handoff's step 5 hasn't finished, and installing from an incomplete
source risks installing a stale or partial skill, or leaving the next
analyst with no canonical copy of `amplifi-onboarding` to install from at
all. Don't improvise a copy from anywhere else.

Verify each LOCAL install the same way `DRIVE-HANDOFF.md` step 4/6a
already do: fresh session, confirm the skill actually runs and reads the
corpus back. Don't report "installed" for a file that's present but
hasn't actually been exercised once. **Under tier (b), this alone isn't
the whole check** ~ also confirm `amplifi-insights` and `amplifi-qa` are
present and current in Claude Enterprise (they were never local installs
to verify this way in the first place); if either is missing there, this
step isn't done, regardless of how the local `amplifi-improve` and
`amplifi-onboarding` copies check out.

## Step 2 ~ Bootstrap the shared standards (once per Amplifi-wide file)

Three files in `standards/` carry a `Status: FRAME` / `Status: LIVE`
marker: `what-good-looks-like.md`, `house-voice.md`,
`report-template-rules.md`. **Check each file's actual Status before
touching it ~ this step is per-file, not all-or-nothing.** A file already
`Status: LIVE` means someone already ran this bootstrap (or the old
manual extraction) for it; skip straight to Step 4 (refresh) for that one
file instead of re-filling it from scratch.

**A file at `Status: FRAME` isn't automatically a blank template either
~ check its Changelog section before starting extraction.** If it already
carries a dated "Drafted, pending Rica's approval" line (item 3 below)
with no later resolution, someone already ran items 1–4 on it and is just
waiting on her sign-off. Don't restart extraction and don't overwrite
that draft. If Rica is the one onboarding now: skip straight to reviewing
the existing draft, and once she signs off, finish at item 5/6. If she
isn't: leave the file exactly as is and report it as still pending
(Step 5) ~ don't touch it further this session.

For each file genuinely still blank (`Status: FRAME`, no pending-approval
changelog line):

1. **Use that file's own "How to fill this file" section and extraction
   prompt** ~ they already exist, already know the right source
   (`what-good-looks-like.md`/`house-voice.md` from 2–3 gold reports,
   `report-template-rules.md` from the live Canva template + brand kit,
   deliberately different sources). This skill doesn't reinvent that
   process, it just runs it live instead of waiting on a scheduled hour.
2. **Ask whoever's onboarding for the real source material** ~ their 2–3
   best reports, or the current Canva template exports, whichever the
   file calls for. If they don't have an opinion on which reports are the
   team's best work, that's a real stop, not a guess: ask, or fall back to
   whatever the most recent client-accepted report is and say so plainly
   in the changelog line (a provisional fill is fine; a silent guess
   presented as the real bar is not).
3. **Run the extraction prompt, then have the person onboarding edit the
   draft** ~ same rule the file's own instructions already state: the
   human authors the bar, the AI does the first pass. This skill doesn't
   get to skip that review step just because it's now automatic. **If the
   person onboarding isn't Rica**, that edited draft is a proposal, not a
   ship-ready file: roadmap item 1.2 assigns the shared-standard fill to
   Rica, and `amplifi-improve` already requires her confirmation before any
   promotion to these same three files. Send her the draft and wait for
   her sign-off before item 5 below flips `Status: LIVE` ~ don't let a
   first analyst who isn't Rica set the Amplifi-wide bar unreviewed.
4. **Actually replace every `{...}` placeholder in the file** ~ not just
   the instruction blockquote. `amplifi-insights`' Step 0 corpus-readiness
   check runs an independent brace-scan on top of the Status marker
   specifically because a file can have its Status flipped to LIVE while
   still carrying real unfilled placeholder text underneath; don't
   reproduce that gap by treating "Status says LIVE" as sufficient before
   confirming every placeholder is actually gone. **Exception:**
   `report-template-rules.md`'s own `{Month YYYY}`, `{start}`, and `{end}`
   tokens (the period-stamp line) are permanent runtime placeholders, not
   one-time fill-in text ~ `amplifi-insights` fills those fresh for every
   report and exempts them from its own brace-scan for the same reason.
   Leave those three exactly as written; only replace the fill-once
   placeholders around them.
5. **Now, with item 4's placeholder replacement actually done, check
   whether Rica has signed off (item 3).**
   - **If she hasn't yet:** write a dated "Drafted, pending Rica's
     approval" line into the file's Changelog section ~ only now, after
     item 4 has confirmed every fill-once placeholder is actually gone,
     never before it (writing this marker earlier is what makes the
     pending state falsely look finished to a later session that trusts
     it and skips straight to approval without re-checking placeholders).
     Status stays `FRAME`; the marker is what makes the pending state
     durable and resumable across sessions instead of something only
     this conversation remembers ~ it's what Step 2's check above looks
     for on a later run. **Stop here for this file** ~ don't continue
     into item 6 this session; that's the approved branch only, and
     running it now would finalize a version against a draft nobody's
     signed off on yet.
   - **If she has (or she was the one onboarding):** delete the
     instruction blockquote AND flip `Status: FRAME` to `Status: LIVE`
     ~ both, per the file's own rule; either alone doesn't clear the
     corpus-readiness check. Continue to item 6.
6. **Set the Changelog** (approved branch only, continuing from item 5).
   Change the header's `Version: 0.1.0 (unfilled)`
   to `Version: 0.1.0`, and replace the seed changelog line's `{YYYY-MM-DD}`
   with today's actual date and `{N}` with the real count of sources used.
   If a "Drafted, pending Rica's approval" line (item 3) is already
   sitting in the Changelog from an earlier session, replace it with this
   real entry rather than leaving both ~ the pending line's job was to
   mark the wait, and the wait is over now that this is running. This is
   the file's first real version ~ every later edit from
   `amplifi-improve`'s Mode 2 promotion pass bumps it from here, per each
   file's own Changelog section rules (patch for a tweak, minor for a new
   rule, major for a full re-fill).

## Step 3 ~ Bootstrap this client's brand-standard.md (if run in a client context)

If this onboarding pass is happening alongside a specific client's setup
(not just the shared Amplifi-wide standards), and that client's
`clients/{slug}/brand-standard.md` is still the unfilled template: run the
same fill using that client's kickoff material (brief, past presentations,
any voice/terminology notes already in `brief.md`'s FAQ) as the source,
the person onboarding edits the draft, replace every placeholder, set
`Version: 0.1.0` and the first Changelog line the same way Step 2 does.
Resolve `{slug}` the same way every other skill does ~ list `clients/*`
and match the requested client against each folder's `brief.md` Snapshot,
never assume the display name is the folder name.

Skip this step entirely for a purely internal/team onboarding pass with no
specific client in view ~ Step 2's three shared files are what every
analyst needs regardless; a client's own `brand-standard.md` only needs
filling once real work with that client exists to draw from.

## Step 4 ~ Refresh pass (a file already Status: LIVE)

Onboarding a later analyst, or re-running against a materially better set
of gold reports, doesn't mean re-filling a file from zero. For a file
already `Status: LIVE`: read what's there, ask whether anything in it is
now wrong or thin given the new source material, and if so **treat the
edit exactly like `amplifi-improve`'s Mode 2 promotion** ~ bump the
version (patch/minor per that file's own Changelog rules), add a dated
changelog line describing what changed and why, never silently overwrite
without a version bump. If nothing needs to change, don't touch the file
just to have touched it ~ a live file with nothing new to say gets left
alone.

## Step 5 ~ Report back

End with a plain summary, not a claim of "done" that outruns what actually
happened:

- Which tier applied, which of the skills that tier calls for were
  already installed vs. freshly installed this session, and whether each
  was verified (Step 1).
- Which standards files are now `Status: LIVE` for the first time, which
  were already live and left alone, which are still `Status: FRAME`
  because no source material was available this session (name what's
  still missing and who'd need to supply it), and which are drafted and
  waiting on Rica's sign-off (Step 2, item 3) ~ these are a different
  state from "no source material": the fill exists, it's just not
  approved yet, so say that plainly and name that it's Rica's sign-off
  blocking it, not a missing input.
- If a client's `brand-standard.md` was filled (Step 3), name the client.

Never report a file as filled if any placeholder inside it wasn't actually
replaced, and never report a skill as installed if it wasn't run once to
confirm. **Exception:** `report-template-rules.md`'s `{Month YYYY}`,
`{start}`, and `{end}` tokens (Step 2, item 4) are supposed to still be
there ~ a correctly bootstrapped copy of that file has them; don't count
those three against it when deciding whether to report it as filled.

---

*This skill is new (built {2026-07-23}) and hasn't been through the same
adversarial hardening pass the other three skills have. Treat it as a
solid working v1 ~ if a real onboarding run surfaces a gap, capture it with
`amplifi-improve` like any other process friction, same as this corpus
learns anything else.*

*Chiibitsu Labs ~ more human, by design.*
