# Drive Handoff Runbook ~ repo → Amplifi's Google Drive

The repo is the working copy; **Amplifi's Drive copy is the live system.**
This is the vault changing hands ~ after handoff, the corpus is theirs and
grows under their roof. Chii's repo remains the reference/spec copy.

## What moves where

| From (repo) | To (Amplifi Drive) | Becomes |
|---|---|---|
| `deliverables/01-knowledge-foundation/amplifi-knowledge/` | shared folder `amplifi-knowledge/` at the team's Drive root | **the live corpus** ~ the one home |
| `deliverables/02-output-consistency/skills/*/SKILL.md` | (a) Claude Enterprise, (b) `amplifi-knowledge/skills/{skill-name}/SKILL.md` in Drive (one subfolder per skill, NOT three files flattened into one folder ~ they'd collide on the shared filename), (c) the Claude Code / write-capable client for `amplifi-improve` specifically | (a)+(c) the three live skills across two clients, (b) **Amplifi's owned copy** ~ see steps 4–6 |
| `BLUEPRINT.md`, `CONSISTENCY-SYSTEM.md`, `ARCHITECTURE-MAP.md`, `ROADMAP.md`, `INSTRUMENT.md` | a `deliverables/` folder in Drive (reading copies) | the engagement documents Michele circulates |

## Steps (~30 minutes, Chii + Michele)

1. **Create the folder.** Michele (or Rica) creates `amplifi-knowledge/` in
   the team's shared Drive space ~ *team-owned*, not in anyone's personal
   My Drive (knowledge that lives on one person's account is the exact
   disease this cures).
2. **Upload the scaffold** exactly as structured here. Keep files as `.md`
   (do NOT "open as Google Doc and save" ~ that converts the format and
   breaks the future git migration). Drive for desktop sync or direct
   upload both work.
3. **Share:** edit access for all six ~ Michele, Rica, Dale, Janelle +
   the two others on the function roster. No per-file permissions; the
   folder is the unit.
4. **Connect Claude to the corpus BEFORE calling the skills live.**
   Uploading `SKILL.md` files to Claude Enterprise makes the instructions
   available, but every one of them opens by reading `amplifi-knowledge/`
   ~ without an actual connection to the Drive folder, `amplifi-insights`
   and `amplifi-qa` fail their very first step. In Claude Enterprise:
   connect the Google Drive integration (org admin: Settings →
   Connectors → Google Drive, or per-user connector depending on the
   plan) and grant it read access to the `amplifi-knowledge/` folder
   specifically. **Verify it, don't assume it:** open a fresh Claude
   session, run `amplifi-insights` against any client, and confirm it
   actually reads `house-voice.md` back to you (ask it to quote a line)
   before treating deployment as done. If the connector isn't available on
   the plan, fall back to attaching the relevant corpus files per session
   ~ works, but means re-attaching every time, so note it as a rough edge,
   not a config to leave broken permanently.

5. **Keep an owned copy ~ and know that editing it isn't enough on its
   own.** Copy each skill into its OWN subfolder in Drive ~
   `amplifi-knowledge/skills/amplifi-insights/SKILL.md`,
   `.../amplifi-qa/SKILL.md`, `.../amplifi-improve/SKILL.md`. All three
   source files are literally named `SKILL.md`; dumping them into one flat
   folder means the second and third uploads silently overwrite the first.
   This is Amplifi's own canonical record ~ without it, the operating
   instructions for "how the analyst function uses AI" live only in
   Chii's reference repo and inside a vendor product; if Claude access
   changes or the lens swaps, Amplifi would be reconstructing its own
   process from someone else's copy. The Drive copy is the source of
   truth going forward ~ if a skill gets edited, edit it in Drive first.
   **But Claude Enterprise runs whatever was uploaded in step 4, not
   whatever's currently in Drive** ~ the two don't sync themselves. Every
   time a skill changes in Drive: re-upload the updated `SKILL.md` to
   Claude Enterprise, then re-run step 4's verification (fresh session,
   confirm the new behavior) before telling anyone the update is live.
   Skipping this means analysts keep running the stale version while
   believing the Drive copy is authoritative.
6. **Give the improve skill an actual write path ~ and actually install it
   there, not just Claude Enterprise.** Read access (step 4) is not enough
   for this one. The read-only Drive connector (or attaching files per
   session) satisfies `amplifi-insights` and `amplifi-qa` fine, but leaves
   `amplifi-improve` unable to save anything, which breaks the capture
   loop this whole deliverable is built on. Two things, not one:
   (a) Set up **Drive for Desktop** synced to the `amplifi-knowledge/`
   folder so it's a real local path.
   (b) **Install `amplifi-improve` in the write-capable client itself** ~
   uploading it to Claude Enterprise in step 4 does NOT make it available
   in Claude Code or whatever local-filesystem client runs this step; that
   upload only registers the skill where you just said it can't write.
   Copy `amplifi-improve/SKILL.md` into that client's own skills location
   (for Claude Code: the project's `.claude/skills/amplifi-improve/
   SKILL.md`, or `~/.claude/skills/amplifi-improve/SKILL.md` for a
   user-level install) so it can actually be invoked in the session that
   has write access to the synced folder. Verify by running it once and
   confirming a real file lands in `learnings/`.
   Until both (a) and (b) are set up, the skill outputs the learning
   file's content and asks the analyst to save it by hand ~ workable, but
   confirm this is temporary, not the plan.
7. **Copy the deliverable docs** into a Drive `deliverables/` folder for
   circulation. Canva/Slides visual of the architecture map: optional
   polish, the markdown is canonical.
8. **First write, same day:** Rica schedules the gold-report extraction
   hour (roadmap 1.2). An empty corpus teaches the team it's decorative ~
   a filling one teaches them it's load-bearing. Don't let the folder sit
   empty a week.

## Rules that survive the handoff

- **Markdown stays markdown** ~ the git migration (when the CTO unblocks)
  must stay a copy-paste, not a conversion project.
- **The repo does not auto-sync to Drive.** Spec changes flow through Chii;
  corpus content changes happen ONLY in Drive (the live copy). One-way,
  deliberate, no drift wars.
- **Exportable always:** the corpus is plain files; capchecker's Supabase
  has a documented migration runbook (`MIGRATION.md` in that repo). At any
  moment, Amplifi can walk away with everything. That's the point.

*Chiibitsu Labs ~ more human, by design.*
