---
name: amplifi-onboarding
description: One pass, run once per analyst per machine. Installs amplifi-improve into this client always; also installs amplifi-insights and amplifi-qa there under the one-client deployment tier, while the fallback tier keeps those two in Claude Enterprise instead (see Step 1). Then bootstraps the shared standards files (and, in a client context, that client's brand-standard.md) from real, already-approved work — live, during onboarding, instead of a separately-scheduled extraction session. Idempotent: re-running skips anything already Status LIVE and offers a refresh pass instead. Use for the initial team rollout, and again for anyone who joins the analyst function later.
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

The skills the active tier calls for get installed into this client's own
skills location (for Claude Code: `.claude/skills/{name}/SKILL.md`,
project- or user-level), copied from `amplifi-knowledge/skills/{name}/SKILL.md`
(Amplifi's own owned copy, per `DRIVE-HANDOFF.md` step 5 ~ never from
Chii's reference repo, which can drift from what Amplifi actually has
live). **But survey what's already there before copying anything in ~ the
install is only unconditional for a skill with nothing of its own already
in place.**

**Before installing anything, list EVERY skill already in this client's
skills location and read each one's `description` ~ not just the four
names this skill installs.** Several analysts built their own personal
capture/learning skill during the in-person sprint and have been using it
since, and **most of them did not name it `amplifi-improve`** ~ it might
be `improve`, `capture`, `learnings`, `eod`, their own initials, anything.
Matching on filename alone will miss it entirely and then install
`amplifi-improve` *alongside* it, leaving that person with two skills
doing the same job, writing to different places, and no idea which one to
run. **Match on what a skill DOES (its description and its actual
instructions), not on what it's called.** If you find one that overlaps
any of the four ~ same job, different name ~ treat it exactly like a
same-name match below, and say plainly which existing skill you think it
overlaps and why before touching anything. If you're unsure whether it
overlaps, ask; don't assume it doesn't.

**A skill that's already present is NOT automatically the same skill ~
never overwrite one without asking.** A local file existing tells you
nothing about whose version it is. For every skill already present
locally (same name, or a differently-named overlap found above), compare
it against `amplifi-knowledge/skills/{name}/SKILL.md` and act on what you
find:

- **Byte-identical to the Drive copy:** nothing to do, leave it, move on.
- **Different in any way:** STOP and show the person what differs in
  plain terms (what their copy does that the shared one doesn't, and
  vice versa), then ask which they want:
  1. **Merge** (default recommendation) ~ keep everything their version
     does that the shared one doesn't, and add the shared version's rules
     on top. This is the right answer almost always: their additions are
     real working knowledge earned over weeks of use, and the shared copy
     carries conventions the rest of the corpus depends on (where files
     land, how they're named and tagged, what the other skills expect to
     read back).
  2. **Replace** with the shared copy ~ only if they say their version
     was a throwaway experiment.
  3. **Keep theirs** untouched ~ fine, but tell them plainly which shared
     conventions they'll be missing, and don't report the skill as
     installed-and-current if it can't do what the rest of the corpus
     expects of it.

  **Never pick for them, and never silently overwrite** ~ weeks of
  someone's own accumulated practice is exactly the kind of thing this
  corpus exists to preserve, and blowing it away during a setup pass
  teaches the team that the system takes work away rather than compounds
  it.

  **On a merge, ask which name the result should live under, and end up
  with exactly ONE skill doing that job**, not the merged one plus their
  original sitting beside it. Keeping their name is completely fine (it's
  what their muscle memory reaches for); if they keep a name other than
  the canonical one, note that in the Step 5 report-back so nobody later
  reads a missing `amplifi-improve` folder as "never installed." What's
  not fine is leaving two overlapping skills installed ~ that's the
  same confusion this whole check exists to prevent.

**If a merge surfaces something genuinely good in their personal version
~ a rule, a habit, a check the shared copy lacks ~ that belongs back in
the shared copy, not just in their local one.** Say so, and offer to
capture it with `amplifi-improve` (or write it up for the next promotion
pass) so the rest of the team gets it too. One person's private
improvement staying private is the same tribal-knowledge problem the
whole knowledge base is here to end.

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
carries a dated "Drafted, pending Rica's approval" line (item 3 below):
- **If that same line already notes her approval** (item 3's "approved by
  Rica, {date}" addendum): the draft is done and reviewed, only the
  finalization steps never ran. Don't treat this as blank and don't
  restart extraction ~ skip straight to item 5/6 and finish it. This is
  exactly the case item 5 below means by "her approval is already noted
  on the pending Changelog line" ~ any operator can close it out, not
  only Rica.
- **If it has no resolution yet:** someone already ran items 1–4 on it
  and is just waiting on her sign-off. Don't restart extraction and
  don't overwrite that draft. If Rica is the one onboarding now: skip
  straight to reviewing the existing draft, and once she signs off,
  finish at item 5/6. If she isn't: leave the file exactly as is and
  report it as still pending (Step 5) ~ don't touch it further this
  session.

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
   first analyst who isn't Rica set the Amplifi-wide bar unreviewed. Her
   sign-off doesn't have to land inside a live onboarding session to
   count: if it arrives afterward (a reply, a message), append it to the
   pending Changelog line item 5 writes below, keeping the source count
   already on it — e.g. "Drafted, pending Rica's approval — N sources,
   {drafted date} — approved by Rica, {approval date}" ~ that's the
   durable record a later session's Step 2 check (and item 5) reads, not
   something only this conversation remembers.
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
     approval — N sources, {date}" line into the file's Changelog
     section (N = the real count of sources used in item 2, {date} =
     today), replacing the still-unfilled seed changelog line rather
     than adding alongside it ~ only now, after item 4 has confirmed
     every fill-once placeholder is actually gone, never before it
     (writing this marker earlier is what makes the pending state
     falsely look finished to a later session that trusts it and skips
     straight to approval without re-checking placeholders). Recording N
     here matters because the session that later finalizes this draft
     (item 6) may not be the one that ran item 2 ~ without it on the
     durable marker, that count can be gone for good by approval time.
     Status stays `FRAME`; the marker is what makes the pending state
     durable and resumable across sessions instead of something only
     this conversation remembers ~ it's what Step 2's check above looks
     for on a later run. **Stop here for this file** ~ don't continue
     into item 6 this session; that's the approved branch only, and
     running it now would finalize a version against a draft nobody's
     signed off on yet.
   - **If she's already signed off** ~ she's the one onboarding right
     now, or her approval is already noted on the pending Changelog line
     from an earlier exchange (item 3): delete the instruction blockquote AND flip
     `Status: FRAME` to `Status: LIVE` ~ both, per the file's own rule;
     either alone doesn't clear the corpus-readiness check.
     **Documented approval is what gates this, not who's at the
     keyboard** ~ whoever's running this session can finish it once her
     sign-off is on record; don't leave an approved draft stuck at
     `Status: FRAME` just because Rica isn't the one onboarding today.
     Continue to item 6.
6. **Set the Changelog** (approved branch only, continuing from item 5).
   Change the header's `Version: 0.1.0 (unfilled)` to `Version: 0.1.0`.
   Replace whichever line is sitting where the seed changelog line used
   to be with the real first-version entry:
   - If item 5 wrote a "Drafted, pending Rica's approval" line in an
     earlier session, pull the date and source count straight off that
     line (it recorded them for exactly this reason) rather than asking
     again or re-deriving them ~ the source material or the analyst who
     ran item 2 may not even be available in this session anymore.
   - Otherwise (direct approval, no pending line ever written), fill
     the seed line's own `{YYYY-MM-DD}` and `{N}` placeholders with
     today's actual date and the real count of sources used from item 2.

   One line either way, not two: the pending line's job was to mark the
   wait, and it ends here by becoming the real entry, not by sitting
   alongside it. This is the file's first real version ~ every later
   edit from `amplifi-improve`'s Mode 2 promotion pass bumps it from
   here, per each file's own Changelog section rules (patch for a
   tweak, minor for a new rule, major for a full re-fill).

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
  was verified (Step 1). **Name any skill that was merged with, kept
  instead of, or lives under a different name than the canonical one
  (Step 1), and say which name it's actually installed under** ~ a later
  session or a rollout check that just looks for the four canonical
  folder names would otherwise read a deliberately-kept personal copy as
  a missing install and try to "fix" it.
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
