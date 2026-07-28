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

Add or update your own row. One row per analyst per machine.

| Analyst | Machine / profile | Scope | Skills installed, and under what name | Verified | Date |
|---|---|---|---|---|---|
| {name} | {which machine, if they use more than one} | project · user | {e.g. all four canonical; or "capture" = amplifi-improve, merged} | yes/no | {YYYY-MM-DD} |

**Fill the name column honestly.** If someone kept their own skill under
their own name (allowed for insights/qa/improve ~ see
`amplifi-onboarding` Step 1), write the real name and what it maps to.
A later rollout check reading only for canonical folder names would
otherwise call that a missing install and try to "fix" a deliberate
decision.

`amplifi-onboarding` itself always keeps its canonical name ~ the written
instructions everyone follows name it directly.

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
