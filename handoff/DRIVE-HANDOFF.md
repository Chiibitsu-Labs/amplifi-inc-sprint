# Drive Handoff Runbook ~ repo → Amplifi's Google Drive

The repo is the working copy; **Amplifi's Drive copy is the live system.**
This is the vault changing hands ~ after handoff, the corpus is theirs and
grows under their roof. Chii's repo remains the reference/spec copy.

## What moves where

| From (repo) | To (Amplifi Drive) | Becomes |
|---|---|---|
| `deliverables/01-knowledge-foundation/amplifi-knowledge/` | shared folder `amplifi-knowledge/` at the team's Drive root | **the live corpus** ~ the one home |
| `deliverables/02-output-consistency/skills/*/SKILL.md` | (a) the write-capable client (Claude Code or equivalent, via Drive for Desktop) for ALL THREE skills, ideally ~ Claude Enterprise as a fallback for `amplifi-insights`/`amplifi-qa` only if local sync isn't set up, (b) `amplifi-knowledge/skills/{skill-name}/SKILL.md` in Drive (one subfolder per skill, NOT three files flattened into one folder ~ they'd collide on the shared filename) | (a) the three live skills, one client where possible (see step 6), (b) **Amplifi's owned copy** ~ see steps 4–6 |
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
   not a config to leave broken permanently. **"The relevant corpus files"
   has to include more than just the one client's own folder, though.**
   `amplifi-insights/SKILL.md` and `amplifi-qa/SKILL.md` both require
   listing `clients/*` and matching every folder's `brief.md` Snapshot
   table before trusting a client-name resolution, specifically to catch
   the duplicate-account case (`README.md`'s collision handling) ~ a
   fallback that attaches only the preselected client's files gives the
   skill nothing to enumerate, so it either has to stop for lack of the
   corpus listing it's required to check, or silently skip the check and
   risk running against the wrong same-named account (Codex catch,
   2026-07-19). Attach either (a) every client's `brief.md` (small files,
   cheap to include every session, and this is exactly what "enumerate
   `clients/*`" needs), or (b) a standing index file listing every client
   folder + Snapshot name, kept current the same way the corpus itself is;
   if truly attaching only one client's files, name the account
   explicitly as a pre-verified override ("this session is confirmed
   `{client}` at `clients/{folder}/`, skip the collision scan") so the
   skills have a documented, deliberate reason to skip enumeration rather
   than silently doing so by omission.

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
   **But neither Claude Enterprise nor Claude Code re-reads Drive
   automatically** ~ both run whatever was last installed into THEM, not
   whatever's currently in the Drive source of truth. Every time a skill
   changes in Drive, redeploy to EVERY location it's actually installed in
   ~ which locations that is depends on which deployment tier (step 6) is
   active, so check that first, don't assume the same split always
   applies:
   - **Running tier (a), one client (the deployment to aim for):** all
     three skills ~ `amplifi-insights`, `amplifi-qa`, AND `amplifi-improve`
     ~ live ONLY in the write-capable client's local skills location
     (step 6a). Re-copy whichever skill changed there and re-verify (fresh
     session, confirm the new behavior). Re-uploading to Claude Enterprise
     does nothing here if Enterprise isn't the session actually doing the
     work ~ that copy, if one still exists from an earlier setup, is
     already dead weight.
   - **Running tier (b), the fallback:** `amplifi-insights` / `amplifi-qa`
     live in Claude Enterprise ~ re-upload there (step 4), re-verify
     (fresh session, confirm the new behavior). `amplifi-improve` lives
     separately, in the write-capable client's local skills location
     (step 6b) ~ re-copy it there too, independently. It's installed in
     two places for two different reasons (drafting/QA access vs. write
     access) and both copies go stale independently; updating only the
     Enterprise copy leaves the write-capable session ~ the one that
     actually runs captures ~ on the old behavior.
   Don't tell anyone an update is live until every installed copy FOR THE
   TIER ACTUALLY IN USE is confirmed, not just the first one you
   remembered.
6. **Give the improve skill an actual write path ~ and don't let the fix
   for "can't write" accidentally create "can't see what happened."**
   Read access (step 4) is not enough for `amplifi-improve`: the
   read-only Drive connector (or attaching files per session) satisfies
   `amplifi-insights` and `amplifi-qa` fine, but leaves `amplifi-improve`
   unable to save anything. The naive fix ~ "run improve in a different
   client that CAN write" ~ creates a worse problem: `amplifi-improve` is
   supposed to review THE SESSION that just happened (what was produced,
   corrected, learned), and a fresh Claude Code session has zero access to
   a conversation that happened over in Claude Enterprise. A file landing
   in `learnings/` proves write access works; it doesn't prove the capture
   is about anything real. Two tiers, in order of preference:

   **(a) Primary ~ one client, no split.** Set up **Drive for Desktop**
   synced to `amplifi-knowledge/`, and do the WHOLE session ~ drafting
   with `amplifi-insights`, checking with `amplifi-qa`, AND the
   end-of-session `amplifi-improve` capture ~ in the one client that has
   both read (via the local sync) and write access (Claude Code, or any
   client with real filesystem access to that synced folder). No
   context-switch, no handoff needed, because there's only ever one
   session. This is the deployment to aim for.

   **(b) Fallback ~ only if the team keeps drafting in Claude Enterprise.**
   If insights/QA work stays in Claude Enterprise (paid seat, org
   preference, whatever the reason) and `amplifi-improve` has to run
   separately in a write-capable client: the analyst carries a short
   recap forward, typed once, right after finishing in Enterprise ~ 2-3
   sentences on what got corrected and what was learned, not a full
   transcript paste. `amplifi-improve` captures FROM that recap in this
   mode, not from a session it never saw. Install `amplifi-improve` in
   the write-capable client's own skills location (for Claude Code: the
   project's `.claude/skills/amplifi-improve/SKILL.md`, or
   `~/.claude/skills/amplifi-improve/SKILL.md` for a user-level install)
   ~ uploading it to Claude Enterprise in step 4 does NOT make it
   available there, that upload only registers the skill where it can't
   write. Verify by running it once end-to-end with a real recap and
   confirming a real, meaningful file lands in `learnings/` ~ not just
   that a file appears, that it reflects something that actually happened.

   Until either tier is fully set up, the skill outputs the learning
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
