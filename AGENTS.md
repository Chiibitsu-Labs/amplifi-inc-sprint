# AGENTS.md — amplifi-inc-sprint

Standing orders for this repo live in [`CLAUDE.md`](CLAUDE.md) — read it before doing
anything. This file exists because Codex reads `AGENTS.md`, not `CLAUDE.md`, for repo
standing instructions, and the two need to stay in sync rather than drift into two sources
of truth.

The one rule that matters most here, restated so it can't be missed even by a skim:

**Every PR gets an independent AI review before merge — always.** If you (Codex) implemented
the change, request a Claude Code review before merge. If Claude implemented it, it will
comment `@codex review` — that's this repo's Chiibitsu Labs company-wide rule (vault
`AGENTS.md`, "Code & pull requests"), not something to skip. Full loop, including the
two-consecutive-clean-passes-before-self-merge condition: `CLAUDE.md`, non-negotiable #2.

Everything else — stack, commands, other non-negotiables, canon pointers, gotchas — is in
`CLAUDE.md`. Don't duplicate it here; if this file and `CLAUDE.md` ever disagree, that's a
bug — fix `CLAUDE.md` and update this pointer, don't pick one to trust silently.
