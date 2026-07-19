---
title: Prioritized Implementation Roadmap
client: Amplifi Technologies Corp
function: Analyst (Core Build scope)
deliverable: 4 of 5
builder: Chii / Chiibitsu Labs
anchor: week of 2026-07-20 (delivery week) ~ 30d = Aug 21 · 60d = Sep 18 · 90d = Oct 16
canon: AI adoption is not tool exposure. It is workflow incorporation.
---

# Prioritized Implementation Roadmap

Sequenced by **highest pain × lowest effort first**. Every item has an owner
and a date ~ otherwise it's just ideas. Owners confirmed by Michele; dates
shift only by her call.

**The 90-day success bar (Michele's own words):** *"consistent quality, no
AI slop, reports aligned with branding, evolving insights as data points of
a client accumulate over time."* Everything below serves that sentence.

---

## Phase 1 ~ Quick wins (by Aug 21 · 30 days)

High pain, low effort. The corpus goes live and the standard gets encoded.

| # | Action | Owner | Done by | Kills (their words) |
|---|---|---|---|---|
| 1.1 | Copy `amplifi-knowledge/` scaffold into shared Drive; all 6 get edit access | **Michele** | Jul 24 | "no master doc"; person-locked knowledge |
| 1.2 | Rica fills the three standards frames ~ extraction prompts included in each file: `what-good-looks-like.md` + `house-voice.md` from 2–3 gold reports (~1 hour), `report-template-rules.md` from the current Canva template + brand kit, a different source on purpose (~30 min) | **Rica** | Jul 31 | "AI slop", "AI tells", "doesn't align w/ branding" |
| 1.3a | Seed client folders: copy `_template-client/` per active client (creates each client's `delivery-log.md` etc., empty but present) | **Dale + Janelle** | **Aug 3** | prerequisite for 1.5a ~ can't open a delivery-log row in a folder that doesn't exist yet |
| 1.3b | Fill `brief.md` + `brand-standard.md` content for each client (split the portfolio) | **Dale + Janelle** | Aug 7 | "incomplete information", "unique asks", re-inferring |
| 1.4 | Deploy all three skills (insights · qa · improve) to ONE write-capable client (Claude Code or equivalent, via Drive for Desktop ~ set that up first) so a full analyst session ~ draft, QA, capture ~ never splits across clients; retire the old reprompt-heavy skill. Claude Enterprise is a fallback for insights/qa only if local sync genuinely isn't an option, and if used, `amplifi-improve` needs a short recap handoff, not silence (`DRIVE-HANDOFF.md` step 6) | **Chii** | Aug 7 | "still requires reprompting", "not optimized for what good looks like" |
| 1.4a | Verify `amplifi-improve` end-to-end: run a real session, run the capture, confirm the resulting `learnings/` file reflects something that actually happened (not just that a file appeared) ~ **required before 1.4 can be called done**. Without this, Phase 1 could look complete while zero MEANINGFUL learning files exist and the first promotion pass (1.6) has nothing real to process | **Chii** | Aug 7, same day as 1.4 | capture loop silently does nothing, or captures nothing meaningful |
| 1.4b | Rename capchecker's live `HIRE` → `HIRE-CANDIDATE` AND `AUTOMATE` → `AUTOMATE-CANDIDATE` (`lib/analytics.ts` + dashboard labels) ~ HIRE fires on load alone with nothing ruled out yet; AUTOMATE fires on theme prevalence with no automatable-work eligibility check. Neither label should claim more certainty than v1 can back up | **Chii** | Aug 7 | premature hire signal + false-positive automate calls before the router is fully wired (Instrument §4) |
| 1.5a | Open a delivery-log row (`Status = open`) for EVERY cycle already in flight, backdated to its real period start ~ not just new cycles going forward (needs 1.3a's folders to exist first, same day). Skipping this means the first baseline (2.2) can't see any report that was already overdue before Aug 3 | **Rica** (enforces) · all analysts (do) | Aug 3, after 1.3a | overdue work invisible to on-cadence tracking |
| 1.5b | Delivery-log habit live for the full cycle: open at period start, ship-touch + insight-log entry at delivery, finalize at client sign-off **or via the 5-business-day silent-acceptance rule** (`delivery-log.md` ~ don't let silently-clean reports sit at `delivered` forever; that undercounts the on-time majority and skews the rework baseline high) | **Rica** (enforces) · all analysts (do) | Aug 3 onward | "reports not evolving"; feeds the instrument |
| 1.6 | First weekly promotion pass (improve skill, promote mode) ~ then every Friday | **Rica + Chii** | Aug 14, recurring | corpus rot; same-mistake-twice |

**Gate out of Phase 1:** an analyst generates a report section via the
insight skill with zero re-prompting of standards/brief content. If they
had to paste context into chat, a corpus file is missing ~ fix and retest.

## Phase 2 ~ Builds (by Sep 18–Oct 16 · 60–90 days)

High impact, more effort. The system starts measuring itself.

| # | Action | Owner | Done by | Kills / unlocks |
|---|---|---|---|---|
| 2.1 | AI-QA gate wired into the report flow as a standing step before internal alignment (the pre-Canva, full-markdown-draft pass ~ `report-template-rules.md`'s checkpoint one) | **Rica** (process) · **Chii** (tuning) | Sep 4 | rework rounds; makes human verify faster |
| 2.1b | Wire the SECOND, mandatory QA pass: full `amplifi-qa` re-run against a visually-rendered export of the assembled Canva deck (page images or a real rendered PDF, never a text-only extraction), standing step before client presentation, with an explicit human clear-or-rerun gate on any flag it raises. This is `report-template-rules.md`'s ONLY checkpoint that actually clears a report to ship ~ Canva-stage drift (stale charts, wrong logos, off-brand layout) happens AFTER 2.1's pass already ran, so without this dated step Phase 2 could read "done" while the exact failures this checkpoint exists to catch go unchecked | **Rica** (process) · **Chii** (tuning) | Sep 4, same day as 2.1 | stale charts/logos/layout shipping past a "passed QA" pre-Canva draft |
| 2.2 | First manual router walk-through as PRACTICE (Instrument §5a ~ no code needed, just the two feeds side by side); Michele sets first-pass gut-seed thresholds. **Not a calibrated baseline yet for monthly-cadence clients** ~ they have one completed cycle at this point, not enough for a trend (weekly clients are further along by now). Real per-client trust arrives on Instrument §7's schedule: ≥3 completed cycles, which lands on a different calendar date per client cadence | **Michele + Chii** | Sep 11 | gut-feel resourcing ~ the full router (automate/redesign/fix-corpus/hire) is live and usable from THIS date, by hand, with that caveat honestly attached |
| 2.3 | Automate the router into capchecker's dashboard: delivery-log feed ingested; REDESIGN + FIX-CORPUS branches coded; panel in chain order (automate → redesign → fix-corpus → hire). HIRE's portfolio-wide scope check runs at the ANALYST level (Instrument §3/§5b) since WIP/load have no client attribution today ~ **not required for 2.3, but if capacity ever justifies it:** adding per-client task attribution to capchecker's daily check-in would let this test run at the finer client grain instead, a capchecker-side data model change, scoped here only, never touched directly | **Chii** | **Gated, not calendar-driven: earliest Oct 9** (after ≥2 monthly manual walkthroughs ~ Sep 11 + Oct 9 ~ per Instrument §5b's own prerequisite: "once the manual version has run a few cycles and thresholds feel right." One walkthrough by Sep 18 isn't "a few"; committing to that date would mean automating gut-seed thresholds instead of calibrated ones) | convenience, not capability ~ the router itself has been real and in use since 2.2; this just stops Michele doing the arithmetic by hand, once it's worth automating |
| 2.4 | Automate data-transfer-to-template: skill output shaped to `report-template-rules.md`, paste-and-style into Canva; measure minutes saved per report | **Chii + Dale** | Oct 2 | "we still transfer data so the deck doesn't look AI" |
| 2.5 | Automation candidates from instrument themes: top recurring high-load theme (likely data pulling / sync ~ "LONG QUEUE FOR PULLING") gets an automation spike | **Chii + Michele** (pick) | Oct 16 | the AUTOMATE branch earning its keep |
| 2.6 | 90-day review vs the success bar + the brief's five Definition-of-Success questions | **Michele + Chii** | week of Oct 19 | ~ |

## Phase 3 ~ Ongoing (no end date, by design)

| Rhythm | What | Owner |
|---|---|---|
| Daily | capchecker 3-tap check-in (08:00) · summary to Michele (10:00) | all · auto |
| Per cycle | delivery-log: **open at start** (`delivery-log.md`'s own touch 1 ~ whoever owns this client's queue, the lead analyst or Rica, since the eventual ship-of-record isn't always known yet at period start and ownership can change mid-cycle), **ship-touch + insight-log entry at delivery, finalize at acceptance** (~20–30s each) | **queue owner** (Rica or lead analyst) opens the row; **delivering analyst** (whoever actually ships, refreshed at touch 2 if handed off) does the ship/finalize touches |
| Per cycle (feedback moment) | insight-log: **update the `Client reaction` line, and the WHOLE entry if the feedback was substantive** (`insight-log.md`'s own second touch, plus its conditional third) ~ at the presentation, or whenever the client actually reacts by email/call, never inferred from silence. Without an assigned owner for this specific touch, `Client reaction` sits at `pending` indefinitely and a late substantive correction never reaches the entry `amplifi-insights` reads as trusted history next period (~20–30s, same order of cost as the other touches, just at a different, less predictable moment in the cycle) | **delivering analyst** (present for or told about the reaction) |
| Weekly (Fri) | promotion pass: learnings → corpus | Rica (+ improve skill) |
| Weekly (Fri, same sitting) | silent-acceptance scan: any `delivered`/`revising` row whose `Last Sent` + 5 business days has passed with no revision request finalizes to `accepted` now ~ plain markdown doesn't do this on its own, nothing revisits a row automatically after 5 quiet days, so without this scan a silently-clean report can sit unresolved indefinitely and stay excluded from the accepted-only rework calculation (skewing rounds-per-report upward). Piggybacks on the promotion pass's existing Friday sitting rather than adding a new habit | Rica |
| Monthly | walk the router chain by hand (Instrument §5a) and log the routing decision ~ starts at 2.2 (Sep 11), continues on this cadence whether or not 2.3's automation has shipped | Michele |
| Quarterly | threshold calibration against real distributions · corpus health check (stale files, unfilled frames) | Michele + Chii |

The quarterly calibration is a standing working session ~ thresholds are
living numbers, and the instrument evolves as Amplifi does.

## Deliberately NOT yet (scope discipline ~ creep has a home)

| What | Why not now | Revisit when |
|---|---|---|
| **Git migration of the corpus** | CTO blocker on GitHub × Claude Enterprise; Drive bridges fine | CTO unblocks ~ then it's a copy-paste (documented, Blueprint §6) |
| **Marketing + Product full builds** | Core Build = analyst only; Aubrey & Sen got guided-DIY in-session | a future engagement (Full tier) |
| **Supplier/vendor fixes** (dependency, late delivery, thin pool, cascade system) | real pain, but process/procurement ~ not AI; bolting it on dilutes the build | Michele owns as a process track; instrument's reason-themes will show if it's eating analyst capacity |
| **Canva replacement** | crashes/access pains are real, but a deck-tool swap is its own decision; markdown-first already de-risks outages | if Canva pain still dominates reason-themes after Phase 2 |
| **New platforms** (Obsidian, NotebookLM, …) | brief says maximize existing tools; no genuine gap identified that the stack + corpus doesn't cover | only if a real, non-overlapping gap appears |
| **Structured feed / database for delivery-log + insight-log** (replacing plain markdown for concurrent-write safety) | Drive's shared-folder model doesn't merge simultaneous edits within one file ~ a real fix needs a database or a merge-capable structured store, which is a bigger build than Core Build scope (Blueprint §8); the ~20–30s touch design + a documented conflict-recovery rule mitigate it in the meantime | collisions start happening in practice, not just in theory (watch via Rica noting near-misses per Blueprint §8) |

## The brief's own Definition of Success (checked at the 90-day review)

1. Can any analyst produce a client-ready report to the same standard,
   without tribal knowledge? → *corpus + skills (Phases 1–2)*
2. Does the COO have a near-real-time view of capacity and output per
   deliverable? → *capchecker + delivery logs + panel (2.2–2.3)*.
   **Cost per deliverable specifically is not yet in scope** ~ the feeds
   capture effort hours, not a labor rate or cost formula; "cost" from the
   brief's own definition of success would need that input added
   deliberately (a rate table, or a simple hours × blended-rate calc),
   which nobody has asked for yet. Flagged here so it's a known gap, not a
   silent miss ~ revisit with Michele if cost visibility becomes a real ask.
3. Are existing subscriptions used to documented capability? → *skills on
   Claude Enterprise; Drive as vault; no new platforms*
4. Is there a living knowledge base growing with every engagement? →
   *capture loop (1.5–1.6)*
5. Is there a clear, agreed signal for when AI augmentation is no longer
   sufficient and a hire is warranted? → *the router, live and in manual
   use from 2.2 (Sep 11), automated by 2.3 ~ the whole point*

*Sequences: everything. The map shows the system; this builds it in order.*

*Chiibitsu Labs ~ more human, by design.*
