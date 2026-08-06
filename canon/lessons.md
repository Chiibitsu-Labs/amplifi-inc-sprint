# canon/lessons.md — amplifi-inc-sprint

Retro-distilled rules specific to this engagement/repo that don't fit a vibeOS charter
(vibeOS docs/07). Company-wide lessons belong in vibeOS's own `canon/lessons.md` instead —
only put something here if it's specific to `amplifi-inc-sprint`.

- **2026-08-05 — Verify anonymous reachability with an actually-unauthenticated fetch, not
  an authenticated one.** Reported `/onboard` as "live in production" based on checks that
  went through an authenticated Vercel fetch tool, which bypasses Vercel Authentication by
  design. The page was, in fact, walled off from real anonymous visitors the whole time.
  Before declaring any route "publicly reachable," confirm the check actually went out
  unauthenticated — an authenticated tool succeeding proves the page renders, nothing about
  who can reach it.

- **2026-08-05 — A closed PR with `merged_at` set is merged, even if the tool's own `merged`
  boolean says otherwise.** Pushed a follow-up commit onto `claude/onboard-route` assuming
  it was still an open, trackable branch; its PR (#8) had actually been squash-merged days
  earlier. Before pushing to a "designated" branch, check `merged_at` / whether the branch
  tip (or an equivalent squash commit) is already an ancestor of `main` — not just the PR's
  `state`/`merged` fields, which can be stale or self-contradictory.

- **2026-08-05 — This sandbox's own network egress policy, not just the target service's
  auth settings, can block a verification fetch.** Direct `curl`/`WebFetch` to this project's
  `*.vercel.app` hosts returned 403 regardless of Vercel Authentication being on or off — a
  session-level policy denial (see `/root/.ccr/README.md`), reported via
  `$HTTPS_PROXY/__agentproxy/status`. Don't read a blocked verification fetch as evidence
  about the target's own access controls without checking which layer actually blocked it.

- **2026-08-06 — Internal task-tracker IDs are not GitHub PR numbers, even when both are
  small integers that look plausible in prose.** Wrote "PR #245's build" in a `canon/decisions.md`
  entry, citing what was actually this session's own task-list item number (a different,
  ambient numbering system) as if it were a real PR reference. Codex caught it with a
  repo-wide search that found no such PR — the actual commit was `819bb5e` / PR #2. Before
  citing any `#N` as a PR or issue number, confirm it resolves in *this* repo's forge, not
  just that a number was floating around the same context.
