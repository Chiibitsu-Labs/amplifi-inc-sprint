# skills/

Amplifi's own canonical copies of the four analyst skills, one subfolder
each (`amplifi-onboarding/`, `amplifi-insights/`, `amplifi-qa/`,
`amplifi-improve/`). **This is the source of truth** ~ every local install
is copied FROM here, and every change to a skill happens HERE first, then
gets redeployed (`DRIVE-HANDOFF.md` step 5).

Nothing in this folder runs on its own. A skill only executes once it's
been installed into a client's own skills location (`amplifi-onboarding`
Step 1 does that).

---

## Who has what installed

**Maintained by whoever runs `amplifi-onboarding`, at the end of their
pass (that skill's Step 5).** This exists because a Claude session can't
see what happened in anyone else's session ~ without a written record
here, the next person checking rollout progress has no way to tell a
deliberate choice from a missed install.

**One row per skill per install location** ~ not one row per person. A
single analyst with four skills has four rows, and more if they work
across several project folders.

That granularity is the point: `DRIVE-HANDOFF.md` step 5 requires
redeploying **every** installed copy when a shared skill changes, and
"Dale, project scope" doesn't tell the next person which project folder
on which machine to actually open. A row nobody can act on is the same as
no row.

| Analyst | Machine | Installed as | Maps to | Scope | Exact path | Verified | Date |
|---|---|---|---|---|---|---|---|
| {name} | {machine, if they use more than one} | {the real folder name} | {which canonical skill} | user · project | {full path, e.g. `~/.claude/skills/capture/` or `~/work/amplifi/.claude/skills/capture/`} | yes/no | {YYYY-MM-DD} |

**`Installed as` and `Maps to` differ only when someone kept their own
name** (allowed for insights/qa/improve ~ see `amplifi-onboarding`
Step 1). When they match, write the canonical name in both.

**Fill it honestly.** A later rollout check reading only for canonical
folder names would otherwise call a deliberately-kept personal copy a
missing install, and try to "fix" a decision someone made on purpose.

`amplifi-onboarding` itself always keeps its canonical name ~ the written
instructions everyone follows name it directly.

**Keep this current when installs change, not just when they're first
created.** A redeploy that renames a merged skill, removes an alias, or
moves a copy between scopes makes the old row wrong, and a wrong row is
worse than a missing one ~ it sends the next person to a path that isn't
there while the real copy goes un-redeployed.

---

## Changelog ~ changes to the shared skills

**Every edit to any `SKILL.md` in this folder gets a line here**, newest
first. This is the only provenance record for the skills themselves;
`learnings/patterns.md` is for process patterns and the `standards/`
files are for report quality, neither of which is a home for "we changed
how a skill behaves."

Write the line at the same time you make the edit, not afterwards.

| Date | Skill | What changed | Why / whose practice it came from | Redeployed |
|---|---|---|---|---|
| {YYYY-MM-DD} | {skill name} | {one line, plain} | {the real reason, and who it came from if it came from someone's own version} | {yes, and to which installs · or "pending"} |

**`Redeployed` is not optional bookkeeping.** Neither Claude Code nor
Claude Enterprise re-reads this folder on its own ~ both run whatever was
last copied into them. A row sitting at `pending` means real installs are
still on the old behavior, and anyone reading this table can see that at
a glance instead of assuming an edit here went live everywhere.

---

*Chiibitsu Labs ~ more human, by design.*
