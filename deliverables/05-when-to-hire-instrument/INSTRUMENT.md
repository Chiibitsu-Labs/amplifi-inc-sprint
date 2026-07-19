---
title: When-to-Hire Instrument ~ v1 Specification
client: Amplifi Technologies Corp
function: Analyst (Core Build scope)
deliverable: 5 of 5
owner: Michele Curran (COO) ~ this is her instrument
builder: Chii / Chiibitsu Labs
status: v1 ~ capacity feed LIVE (amplifi-capchecker); delivery-log feed ships with Deliverable 1. The FULL 4-branch router is usable by hand the moment both feeds have a few weeks of data ~ it does not wait on any capchecker code change. Auto-computing it inside capchecker's dashboard is a separate 60–90d convenience item (§5).
canon: AI adoption is not tool exposure. It is workflow incorporation.
---

# When-to-Hire Instrument ~ v1

A decision instrument that tells Michele **when strain in the analyst
function means hire ~ vs automate, redesign, or fix the corpus.** Not a
headcount calculator. A router.

Today the hiring call is gut. This converts *"I feel like we need someone"*
into *"here's the trend line, here's the threshold we crossed, here's why
it's a hire and not a tool"* ~ defensible upward to Mells, built in
peacetime on purpose (Michele's framing: *"metrics in place before we
trigger hiring"*; current state: 6 on the function, still within capacity).

---

## 1. Architecture: one router, two feeds

```
FEED 1 ~ amplifi-capchecker (LIVE)          FEED 2 ~ delivery logs (ships w/ D1)
daily Telegram check-in, 3 taps             one row per cycle, 3 touches ~20-30s ea
· perceived load 1–10 (10 = drowning)       · cycle time  (start → delivered)
· why (free text → themes)                  · on-cadence  (due vs delivered)
· clients & tasks (WIP)                     · rework rounds + rework tag
        │                                   · effort hours (self-est)
        └──────────────┬────────────────────┘
                       ▼
                  THE ROUTER
     automate → redesign → fix-corpus → hire   (in that order, always)
                       ▼
                MICHELE'S PANEL
   signal · baseline · threshold · trend · route + evidence trail
```

**Why two feeds:** capchecker captures how the team *feels* daily ~
frictionless, already running, response-rate-protected (3 questions is the
ceiling; we don't add more). But rework rounds, cycle time, and cadence are
**per-report facts, not per-day feelings** ~ they crystallize at one natural
moment, report delivery, which is exactly where Deliverable 1's capture
loop already sits. Each feed captures at its own natural moment; neither is
a second job. Capture as byproduct, both times.

## 2. The five signals (spec ↔ where each lives)

| Signal | Definition | Feed | Why it predicts strain |
|---|---|---|---|
| **WIP per analyst** | active clients/tasks in flight per person, from capchecker's `client_count` field (Q3, parsed to a number) | capchecker (daily Q3) | the "full hands" ceiling. **v1 threshold, same pattern as capchecker's other signals:** WIP baseline = per-analyst average `client_count` over a **FROZEN** reference window ~ the first 10 working days once `client_count` data starts (mirrors `SCALE_EPOCH`'s frozen-reference pattern, not `minHistoryDays`'s rolling one). **The healthy-window guard applies to THIS initial freeze too, not just quarterly recalibration** ~ there's no prior baseline to compare the first window against, so the check instead cross-reads capchecker's perceived-load signal (Q1, already live daily) over that same first-10-days window: if load is ALSO reading structurally elevated during it (not just a rough day or two), that's a sign tracking started mid-overload, and the initial window normalizes strain instead of measuring a genuine baseline ~ the exact failure mode the quarterly guard exists to prevent, just hit on day one instead of at a quarterly boundary. In that case, don't freeze from this window: flag it to Michele and either **discard it entirely and start a fresh 10-working-day window once load reads normal** (extending the same tainted window by appending more days still leaves the original overloaded days inside the average, keeping the frozen baseline elevated and making later `baseline + 2` breaches harder to reach than they honestly should be ~ the average has to be over a genuinely clean window, not a padded one), or seed the baseline manually from her judgment of what a normal WIP count looks like, noting it as a judgment call to revisit once a genuinely calm window is observed. **This cross-check only catches OVERLOAD, though ~ it has no equivalent signal for a window that's abnormally QUIET instead.** If tracking happens to start during a genuine lull (an analyst on leave, a seasonal shutdown, an account-transition gap with fewer active clients than normal), BOTH `client_count` and perceived load read low together, exactly the way they would in a normal, healthy week ~ nothing in the automated cross-check distinguishes "ordinarily light" from "artificially, atypically light," so a lull passes this guard clean and freezes a baseline that's too LOW, after which perfectly ordinary workload later reads as `baseline + 2` and can falsely corroborate HIRE off a threshold that was never realistic to begin with (Codex catch, 2026-07-19). Close this the same way cycle time's baseline handles the gap it has no automated cross-check for either (below): before trusting ANY freeze off this window, Michele/Rica also confirm out loud that it doesn't coincide with a known lull ~ not just "is it below the overload line," but "does this actually look like an ordinary week for this team." If there's real doubt, don't freeze silently: defer freezing until a window with no known lull is observed, or seed manually from Michele's judgment of ordinary WIP, same fallback the overload case already offers. **A second, independent gate on the same window: per-analyst observation completeness.** The healthy-window check above validates that the window isn't a hidden overload; it says nothing about whether a given analyst actually ANSWERED enough of it to average meaningfully ~ Q3 is one of three daily taps and can go unanswered like any of them, and an analyst who logs a parseable `client_count` on only 2 of the 10 window days can have their personal baseline set almost entirely by whichever 2 days happened to be light, making every ordinary day afterward misread as `baseline + 2` sooner than it honestly should. Require, per analyst, **at least 7 of the 10 window days with a valid parsed `client_count`** before freezing THAT analyst's baseline (mirrors DATA's own ≥70%/7d response-rate bar, same reasoning, applied to WIP instead of daily-checkin-as-a-whole) ~ an analyst who falls short gets their window quietly extended a few more working days rather than frozen on a thin sample, flagged to Michele as running on a manual/unseeded baseline meanwhile. **Extension defined precisely, not left as "add some more days":** extend one working day at a time and re-test after each ~ does the analyst's MOST RECENT 10 working days (a sliding 10-day window, not a growing one) now contain ≥7 valid observations? Stop extending the moment yes. Freeze the baseline from THAT final 10-working-day window specifically (average the valid observations within it, not every observation collected across the whole extended span ~ older days that fell out of the final 10-day window don't count, same as they wouldn't for an analyst who cleared the bar on day one). Re-apply the healthy-window guard (the perceived-load cross-check, above) to this SAME final window before freezing, not just the original first 10 days ~ extending for observation-completeness doesn't exempt the extended window from also needing to be a genuinely healthy one. This is a per-analyst gate, not a per-team one ~ one analyst's sparse week shouldn't hold up freezing everyone else's baseline on schedule. **Deliberately not a continuously-rolling trailing average** ~ a rolling baseline absorbs the same sustained increase the threshold is supposed to catch (10 days at 3, then a genuine step up to 5: a rolling baseline creeps from 3.0 toward 3.2 on day one of the increase, chasing the threshold it's compared against, so a real sustained rise can mathematically never clear "baseline + 2" ~ Codex catch, 2026-07-18). WIP threshold = `client_count` ≥ frozen baseline + 2, sustained on ≥5 of the last 10 working days (a lower bar than load's `structuralDays: 7` since WIP moves more slowly, day to day, than a self-rated feeling) ~ **and the same ≥7-of-10-valid-observations bar from the initial freeze applies to EVERY evaluated 10-day window, not just the freeze itself.** Q3 can go unanswered or come back unparsable independently of the other two daily taps, so an analyst with only 5 valid `client_count` readings (all of them high) and 5 missing/unparsable ones in the current window could technically satisfy "≥5 of the last 10 working days ≥ baseline + 2" on a half-empty sample, even while capchecker's general DATA flag stays clear off their Q1/Q2 answers. Require the same ≥7-of-10-valid-`client_count` coverage before letting a live window corroborate HIRE ~ a window that falls short doesn't clear WIP's threshold either way, it's read as insufficient data and flagged, not as evidence of anything. The frozen baseline itself still recalculates only at quarterly calibration (§7) ~ **and only from a window confirmed to be healthy, never blindly from "whatever the last N days looked like."** A blind quarterly reset reproduces the exact bug the freeze exists to prevent: if WIP rose from a genuine baseline of 3 to a sustained breach at 5 shortly before a quarterly boundary, recalculating from the most recent days would set the new baseline to 5 and the new threshold to 7 ~ silently clearing an overload that was never resolved, just relabeled as normal. Rule: if the WIP threshold is CURRENTLY firing (or fired at any point in the window under consideration) when quarterly calibration comes around, carry the OLD baseline forward unchanged rather than recalculating from an active-breach window; only recalculate from a period that was itself below threshold, confirming it reflects genuinely healthy load, not a new-normal that's actually still the problem (Codex catch, 2026-07-18). **"Below threshold" rules out an active breach, but the same quiet-window gap from the initial freeze (above) applies here too** ~ a quarterly recalibration window that happens to fall during a lull (leave, seasonal shutdown, an account-transition gap) reads as comfortably below threshold while still being an unrepresentatively light sample, and recalibrating from it would ratchet the baseline DOWN below its own genuine normal, making the NEXT ordinary quarter read as elevated (Codex catch, 2026-07-19). Same fix, same discipline: Michele/Rica confirm out loud the recalibration window doesn't coincide with a known lull before trusting it, not just that it stayed under the threshold line. Gut-seed like every other v1 number here ~ Michele adjusts the FORMULA (window length, +2 margin) at quarterly review, and the baseline VALUE only from confirmed-healthy data ~ **at the initial freeze as well as every quarterly recalibration after it** ~ never mid-cycle and never from an unresolved breach. Without a stated number, "WIP sustainedly elevated" isn't checkable and two people could read the same dashboard and disagree ~ this is that number, however roughly. |
| **Perceived load** | daily 1–10 self-rating + reason | capchecker (Q1+Q2) | earliest warning ~ people feel strain before metrics show it |
| **Cycle time per report** | period start → delivered | delivery log | rising = falling behind cadence; the early-warning half of REDESIGN's evidence (see §3) ~ cycle time can trend up for weeks before it actually breaches the due date and shows up in on-cadence rate. **v1 threshold, same frozen-reference pattern as WIP above, so "trending up" is a checkable number instead of a vibe:** `Delivered − Start` is counted in **WORKING days, not calendar days** ~ same unit as WIP's window and the 5-business-day silent-acceptance rule elsewhere in this doc, for one consistent business calendar across every signal here rather than mixing units; a Friday `Start` to Monday `Delivered` is 1 working day, not 3 calendar days, and holidays follow whatever calendar capchecker/the team already treats as non-working (no new calendar to maintain). Per-client baseline = that client's average `Delivered − Start` WORKING-day span over their first 3 completed cycles ~ reuses §7's existing ≥3-completed-cycles mark (the point §7 already calls a client's own numbers trustworthy) instead of inventing a second threshold. **Healthy-seed guard, same principle as WIP's above, but no live independent cross-signal exists here to automate it against** ~ WIP could cross-check perceived load because both are captured in real time; cycle time's first 3 cycles are, by construction, the ONLY data that exists yet, so there's nothing independent to compare them against. A client whose first 3 cycles are already slow but still narrowly meet `Due` would freeze that slowness as "normal," and neither on-cadence (still clean) nor the `+20%` threshold (measured against an already-elevated baseline) would ever catch it. So this gate is a human judgment call, not a code check: before trusting the freeze, Michele/Rica confirm out loud that the seed cycles reflect ordinary pace ~ not a client's first-ever onboarding cycles, not a known short-staffed stretch, nothing already flagged as unusual. If there's real doubt, don't freeze silently: seed the baseline manually from Michele's judgment of what normal cycle time looks like for that cadence (same manual-seed fallback WIP offers), and revisit once enough cycles exist to judge it properly. FROZEN, not rolling, same reason as WIP's baseline: a rolling average would absorb the exact sustained slide this signal exists to catch. "Trending up" = the client's trailing-90-day cohort (§3's fixed-cohort rule) average cycle time exceeds the frozen baseline by ≥20%, **OR by ≥1 full working day, whichever margin is LARGER** ~ the absolute floor matters specifically when the frozen baseline itself is zero or near-zero (a client whose first 3 cycles all shipped same-day as their scheduled `Start`, `Delivered − Start` = 0 working days each): a pure percentage margin off a zero baseline is mathematically undefined, or worse, trivially satisfied by ANY nonzero cycle time at all (0 × 1.2 = 0, so a single perfectly normal 1-day cycle would already read as "exceeding" the threshold), spuriously firing REDESIGN's early-warning check on a client that's actually still shipping same-day or next-day (Codex catch, 2026-07-19). This floor changes nothing for a normal, nonzero baseline, where the percentage margin is already the larger and more sensitive of the two in most cases ~ gut-seeded like every other v1 margin here, Michele adjusts both numbers at quarterly review. Recalibrates only at quarterly review, from a confirmed-healthy window ~ same guard as WIP's baseline (above): never recalculate from a window where cycle time is itself currently trending up, or the baseline just relabels the slide as the new normal. **The recalibration cohort, defined exactly, not left to operator judgment:** the client's most recent 3 completed cycles as of the quarterly review date ~ same SIZE and same "3 completed cycles, simple average" rule as the initial freeze, just anchored to "most recent" instead of "first" (Codex catch, 2026-07-19: "a confirmed-healthy window" alone left the cohort size and selection undefined, so two operators reading the same log could average a different span and land on different baselines, and therefore different REDESIGN outcomes, from identical data). Same healthy-seed human judgment call as the initial freeze applies to THIS cohort too (Michele/Rica confirm out loud these 3 cycles reflect ordinary pace, not a known short-staffed stretch or anything already flagged unusual) on top of the currently-trending-up exclusion already stated above. **One more trigger reseeds this baseline outside the quarterly schedule: a client CHANGING reporting cadence** (`delivery-log.md`'s own supported "pauses future reporting or changes cadence" transition ~ e.g. weekly to monthly). A cadence change can genuinely shift what a normal `Delivered − Start` span looks like (more prep work for a monthly rollup than a weekly one, say), so a baseline frozen under the OLD cadence and a trailing-90-day window that now mixes cycles from both schedules can either spuriously fire REDESIGN off a new cadence's naturally-different pace, or mask a real slowdown inside the noise of the mismatch (Codex catch, 2026-07-19). The moment a cadence change is noted, version the baseline rather than silently reusing it: freeze a NEW baseline from the client's first 3 completed cycles under the NEW cadence (same rule as the original freeze, same healthy-seed judgment call), and until that new baseline exists, exclude this client's cycle-time reading from REDESIGN's early-warning check entirely rather than comparing new-cadence cycles against an old-cadence number ~ "not yet evaluable" is the honest state, not a number that quietly compares apples to oranges. Once both a pre-change and post-change baseline exist, the trailing-90-day comparison window itself must also only pool cycles governed by the SAME baseline version ~ never average a pre-change and post-change cycle together into one reading. **Which baseline version governs a given row is read directly off that row's own `Cadence` column** (`delivery-log.md`'s per-row field, copied from `brief.md`'s Snapshot cadence AT ROW-CREATION time, never inferred from `brief.md`'s CURRENT value, which is overwritten in place on every cadence change and so only ever answers "what's the cadence today," not what it was when an older row opened): filter the trailing-90-day window to rows whose `Cadence` matches the baseline version being evaluated before averaging, the same structured, per-row filter §5b's automated ingestion needs to implement this without a human re-deriving it from an unstructured note each time (Codex catch, 2026-07-19: the original wording pointed at a `brief.md`/`context.md` note with no field for automated ingestion to actually read). **Match on the FULL `Cadence` value, `v{n}` tag included, never the bare cadence word alone** ~ a client who goes weekly → monthly → weekly has two DIFFERENT weekly-era baselines (`v1` and `v3`, per `brief.md`'s never-reused version counter), and a filter keyed on the word "weekly" would wrongly pool both eras' cycles into one trailing-window average even though a returning-weekly baseline isn't guaranteed to match the original one (Codex catch, 2026-07-19: cadence VALUES can repeat across a client's history even though each actual CHANGE still needs its own baseline). |
| **On-cadence rate** | % reports delivered by their due date | delivery log | mixed weekly/bi-weekly/monthly clients; CLUSTERED misses (one client, one handoff) point at a workflow problem (routes to REDESIGN ~ see §3); BROAD misses across most clients/analysts, with WIP/load also elevated, point at capacity instead |
| **Rework rounds per report** | revision rounds before client-accepted, + tag | delivery log | their #1 pain ~ and usually a **corpus gap, not a headcount gap** |

Effort-per-deliverable rides along as the delivery log's `Effort (h)` column
~ rising effort at flat output = process decay.

## 3. The router (the differentiated core)

A 1990s tool asks "slammed → hire?" This walks the chain **in order ~ hire
is the last branch, never the first reflex:**

```
threshold crossed →
 1. AUTOMATE?    Is the strained step repetitive + rules-based?
                 Evidence: capchecker reason-themes dominating high-load days
                 (live today); delivery-log notes naming the same manual step.
                 → route: automate it (data sync, formatting, first-draft work).
 2. REDESIGN?    Is the workflow itself the bottleneck ~ not capacity, not
                 quality?
                 Evidence, EITHER of: (a) on-cadence rate below threshold
                 **~ v1 seed: <80%, Michele's number to override, not
                 invent-per-walkthrough** (unlike WIP/cycle-time above,
                 this signal has no frozen-baseline derivation mechanism
                 of its own to compute a number FROM ~ without a stated
                 starting value, two operators reading the identical
                 delivery-log data could route it differently purely
                 because each picked a different unstated threshold in
                 their head, and the eventual §5b automation would have
                 nothing to hard-code either; §7's "Michele sets
                 first-pass thresholds" already covers WHO sets it, this
                 is WHAT the seed actually is until she says otherwise,
                 same pattern as REBALANCE's `≤5`/`≥2pt` v1 seeds below,
                 Codex catch, 2026-07-19)**
                 WHILE rework stays low or isn't corpus-tagged (the work is
                 fine, the SCHEDULE isn't) ~ the confirmed version, once a
                 due date has actually been missed; OR (b) cycle time
                 trending up against baseline while still narrowly making
                 due dates ~ the early-warning version, catching a slide
                 before it becomes a miss.
                 **PLUS a hard requirement, not optional supporting color:
                 the slowdown must CLUSTER** at an identifiable point ~ one
                 handoff step, one client, one specific process ~ not be
                 spread evenly across most clients and most analysts at
                 once. A broad, uniform "everyone's a little late on
                 everything," co-occurring with elevated WIP/load
                 team-wide, is the capacity-exhaustion pattern, not a
                 process defect ~ there's no specific handoff to redesign
                 because nothing specific is broken, there's just more work
                 than hands. THAT pattern must be allowed through to the
                 HIRE check, not absorbed by REDESIGN. (This is the same
                 failure mode as the original HIRE-unreachable bug from
                 earlier in this doc's history, recurring in a new shape:
                 REDESIGN's own definition, without the clustering
                 requirement, was broad enough to claim genuine
                 capacity-exhaustion cycles and block HIRE from ever firing
                 in exactly the scenario HIRE most needs to catch ~ Codex
                 catch, 2026-07-18.)
                 → route: fix the handoff/process, not the headcount ~
                 ONLY when there's an actual handoff/process to point at.
                 On-cadence and cycle time are REDESIGN's signals and ONLY
                 REDESIGN's ~ see §5 for why HIRE deliberately never reads
                 on-cadence.
 3. FIX CORPUS?  Is quality inconsistent because the standard lives in heads?
                 Evidence: rework is meaningfully frequent (not just
                 present) **~ v1 seed: ≥2 rounds/report average (gate a),
                 Michele's number to override, not invent-per-walkthrough**
                 (most reports carry 0–1 rounds normally; unlike WIP/
                 cycle-time above, this signal has no frozen-baseline
                 derivation of its own to compute a starting number FROM,
                 so without a stated seed the same rework data could route
                 differently depending on which unstated number an
                 operator had in mind, and §5b's eventual automation would
                 have nothing to hard-code either ~ same reasoning as
                 on-cadence's v1 seed above, Codex catch, 2026-07-19)
                 AND, of the individual revision ROUNDS behind
                 that rework (not the rows ~ a 5-round report with one
                 brand fix and four client-new-ask fixes is 20% corpus,
                 not 100%), half or more are tagged brief-misalign,
                 brand, or quality-bar ~ their exact loudest pain, and
                 the two-gate order that keeps one stray tag from firing
                 this on its own (see §5). **Data-quality gate, THREE
                 forms,
                 all hard-block, and all apply to `accepted` OR `revising
                 (reopened)` rows equally, never `accepted`-only** (a
                 reopened row's fresh, still-incomplete tag entry is
                 exactly as capable of silently undercounting either gate
                 as an accepted row's would be, and the row-level
                 denominator/numerator scope elsewhere in this doc already
                 treats the two statuses identically ~ scoping just this
                 validation to `accepted` alone would let an incomplete
                 `revising (reopened)` row's round slip through unvalidated
                 while still counting toward the denominator, understating
                 FIX_CORPUS on exactly the data this gate exists to catch,
                 Codex catch, 2026-07-19):** (a) such a row with `Rounds ≥ 1`
                 but `Rework tag = none` is untagged, not zero-corpus; (b)
                 such a row where the tag entry count doesn't equal
                 `Rounds` (e.g. `Rounds = 3`, only two comma-separated
                 entries recorded) is PARTIALLY untagged and just as
                 unusable ~ the missing round(s) could swing the
                 half-or-more threshold either way, same as a bare `none`
                 would; (c) an entry with a complete tag (and qualifier,
                 where required) but no `[YYYY-MM-DD]` date suffix is just
                 as unusable ~ it can't be placed inside or outside the
                 trailing 90-day window at all, so it silently drops out
                 of the count instead of counting as either. Any form:
                 exclude the row from BOTH gates, not
                 just the tag-SHARE gate (b), until
                 fixed. **This matters for gate (a) too, not only (b):**
                 gate (a)'s numerator counts the SAME dated tag entries,
                 so a `Rounds = 3`/2-entries row would silently undercount
                 to 2 rounds instead of 3, which can drop the frequency
                 average below threshold and stop the whole FIX_CORPUS
                 check at gate (a), before gate (b)'s tag-share is ever
                 evaluated ~ FIX_CORPUS reads as absent when the honest
                 state is "can't be evaluated, logging is incomplete"
                 (Codex catch, 2026-07-19). If enough rows are sitting
                 untagged or
                 partially-tagged to plausibly swing EITHER gate's
                 threshold either way, that's not a clean FIX_CORPUS
                 reading to route on (or rule out) at all ~ flag the gap
                 and fix the logging before trusting the number
                 (`delivery-log.md`'s own hard-block rule, same reasoning,
                 covers all three forms). **Before actually editing a corpus
                 file, check the qualifier attached to each qualifying
                 round's tag entry** (`missing` vs `not-followed`, a
                 parenthetical on the tag itself, e.g. `brief-misalign
                 (missing)` ~ delivery-log.md's own convention, not a
                 separate Notes field): the tag says WHAT kind of defect, the
                 qualifier says WHY. Majority `not-followed` means the
                 corpus was already correct and this isn't a real corpus
                 gap at all ~ routing there anyway means repeatedly
                 "fixing" a file that was never broken while the actual
                 cause (an execution/attention miss, or a process gap
                 REDESIGN should examine) goes unaddressed. **"Majority
                 missing" here means within the corpus-tagged rounds
                 specifically ~ ALSO require that missing-round count to
                 clear ≥half of ALL rework rounds, not just a majority of
                 the smaller tagged subset** (see §5 for the worked
                 example of why a subset-only majority can pass while only
                 ~30% of all rework is a genuine gap).
                 → route: Deliverable 1+2 ~ align the brief, encode the
                 standard, ONLY when the `missing`-tagged round count
                 clears ≥half of ALL rework
                 rounds (the real, standalone test ~ this is what a
                 qualifier "majority reading `missing`" cashes out to in
                 the normal case, but it's the all-rounds bar that
                 actually fires the edit, including at an exact
                 subset-level tie where `missing` alone still reaches
                 half of everything, see §5 for why the two aren't
                 interchangeable at that boundary). NEVER route this to hire. (Watch survivorship
                 bias: bare `revising` rows (first-ever, never-yet-accepted
                 pass) aren't counted yet by design ~ `revising (reopened)`
                 rows ARE, since they already reached `accepted` once ~ but a
                 backlog of long-open, high-round bare-`revising` rows during
                 an active problem means the `accepted`/`revising
                 (reopened)` rate reads as a
                 lower bound, not the truth ~ see §5.) A majority
                 `not-followed` instead ~ frequent, corpus-tagged rework
                 against an ALREADY-correct standard ~ never edits the
                 corpus either, but still counts as real execution/
                 coaching evidence feeding HIRE's narrow-vs-portfolio-wide
                 gate below, the same way a clustered REDESIGN signal does
                 (see §5 for the full clustering test).
 4. HIRE.        Only when 1–3 are **portfolio-wide** ruled out ~ not just
                 "some AUTOMATE/REDESIGN/FIX_CORPUS signal exists
                 somewhere." A narrow signal on ONE client or theme,
                 sitting alongside WIP/load elevated broadly across MOST
                 clients and analysts, does not explain away team-wide
                 strain ~ fixing that one thing wouldn't relieve the
                 pressure the capacity signals are actually reporting.
                 Only let an earlier branch block HIRE when its fix would
                 plausibly absorb enough of the breach to matter; a small,
                 already-being-handled signal shouldn't be allowed to
                 permanently shield a real portfolio-wide capacity need
                 (same principle as REDESIGN's clustering requirement
                 above, applied to the whole chain: narrow ≠ portfolio-
                 wide, and only portfolio-wide explanations rule out HIRE)
                 AND capchecker's REBALANCE
                 signal is ALSO ruled out (this isn't one person absorbing
                 load while the team has headroom ~ that's a redistribution
                 fix, cheaper than a hire ~ **but check REBALANCE'S OWN
                 claim before trusting it**: it only proves a RELATIVE gap
                 [outlier ≥2pts above team average], not ABSOLUTE headroom.
                 Five analysts at load 6 and one at 8.5 average 6.42 ~ that
                 satisfies REBALANCE's "≥2pts lower" test AND independently
                 crosses the structural HIRE line, because a team where
                 "everyone but one" is ALSO sitting at the overload line
                 has nowhere to redistribute INTO. REBALANCE only actually
                 blocks HIRE when the rest of the team, excluding the
                 outlier, has genuine slack ~ v1 seed: their average sits
                 meaningfully below the structural line [≤5, a full point
                 of margin under the 6-point "overloaded day" threshold],
                 not just numerically lower than whoever's worst off) AND
                 capchecker's DATA signal is
                 CLEAR (response rate ≥70% over the last 7 days, ≥10 days
                 of post-epoch history) AND capchecker's WIP DATA COVERAGE
                 is ALSO clear ~ **its own gate, separate from DATA above,
                 because Q3 can go unanswered or unparsable independently
                 of Q1/Q2 (§2's WIP row) ~ DATA reading clear says nothing
                 about whether enough people actually have a usable WIP
                 number.** Require ≥70% of the FULL roster (same bar DATA
                 already uses, reused rather than inventing a second
                 number) to individually clear the ≥7-of-10-valid-
                 observations bar (§2) before WIP can corroborate HIRE at
                 all ~ for today's 6-person function, ≥5 of 6 need
                 sufficient WIP data. Below that floor, WIP reads as
                 insufficient-coverage and does NOT corroborate HIRE,
                 same effective outcome as DATA itself failing to clear.
                 This is NOT the same check as the analyst-level "MOST of
                 the roster" scope test elsewhere in this section (§5b) ~
                 that one only asks whether an ALREADY-elevated reading is
                 broad or narrow; THIS gate asks whether enough of the
                 roster has a WIP reading AT ALL. Without it, a tiny
                 sample (2 of 6 with data, both elevated) could satisfy a
                 "more than half of those WITH data" test while WIP is
                 genuinely unknown for the other two-thirds of the team ~
                 not evidence of team-wide strain, evidence of a mostly-
                 unread signal. AND the CAPACITY signals ~
                 specifically WIP per analyst and perceived load, NOT
                 on-cadence ~ are sustainedly maxed ACROSS THE TEAM, not
                 concentrated in one person. The DATA gate matters here
                 specifically: "maxed across the team" is only a real
                 claim if the team's numbers ARE the data ~ a <70%
                 response rate means load/WIP are computed from whoever
                 happened to answer, and a systematically non-responding
                 subset (the busiest people, ironically, tend to skip
                 check-ins first) could make a partial team look maxed
                 when the full team isn't, or hide the opposite. HIRE
                 waits for the data to actually represent the team it's
                 claiming to describe.
                 → the defensible hire: the ruled-out trail above IS the
                 evidence Michele takes to Mells.
```

The output is never "hire: yes/no." It's **"here's what crossed, here's why
the answer is [X], here's the evidence trail."**

**This chain is real and usable today, by hand ~ it is not blocked on
capchecker.** Look at what each branch actually reads: AUTOMATE and HIRE
touch capchecker (reason-themes, load, and eventually WIP), but REDESIGN
and FIX_CORPUS are pure delivery-log reads ~ on-cadence rate and rework
tags, sitting in plain markdown in the corpus. Michele (or Chii, monthly)
can walk this whole chain with two things open side by side ~ the
capchecker dashboard and the delivery logs ~ the moment there's a few
weeks of data in each. Wiring it into capchecker's own dashboard (§5) is a
convenience that automates the arithmetic; it is not what makes the router
real. The instrument doesn't wait on a piece of software to be the real
deal ~ that's the whole point of keeping the evidence in owned, portable
markdown instead of locked inside one tool.

## 4. What's live today (amplifi-capchecker)

Repo: `Chiibitsu-Labs/amplifi-capchecker` · Next.js + Supabase + Vercel +
Telegram. Weekday 08:00 check-in, 10:00 summary to Michele, dashboard with
signal panel. Already implements five router actions on the capacity feed:

| Action | Fires when (defaults; tunable in-app, no redeploy) |
|---|---|
| **HIRE** ⚠ see caveat below | team avg > 6/10 on ≥7 of last 10 working days (needs ≥10 days history) |
| **REBALANCE** | one person's 5-day avg ≥ 7.5 while team sits ≥2 pts lower |
| **AUTOMATE** ⚠ see caveat below | one reason-theme ≥40% of high-load reports (≥3 occurrences, 14d) |
| **WATCH** | ≥2 people at/above strain zone (8/10) same day |
| **DATA** | response rate <70% (7d) or <10 days history ~ "calibrating" gate |

**Read this before treating today's live HIRE label as a decision.** The
deployed rule fires on sustained perceived load alone ~ it has no way to
check WIP, on-cadence, or rework, because feed 2 doesn't exist yet and
REDESIGN/FIX_CORPUS aren't wired in. That means today's label is exactly
what §3 says the instrument must never produce on its own: a hire signal
that hasn't ruled out automate/redesign/corpus-fix. Until §5's v2 wiring
ships, treat this label as **"go look, don't decide"** ~ Michele
cross-checks it by hand against rework tags and cadence misses in the
delivery logs before it means anything close to a hire.

**Same caveat applies to the live AUTOMATE label, for a different reason.**
The deployed rule is pure prevalence ~ ≥40% of high-load reasons, no check
for whether the dominant theme is actually repetitive and rules-based. A
theme like "client meetings" or "supplier delays" can hit 40% and fire
AUTOMATE even though nothing about it is automatable (§5a walks through
the eligibility test a human has to apply; the live code doesn't apply
it). This matters beyond a wrong recommendation: HIRE's own gate requires
"automate not currently firing," so a false-positive AUTOMATE on a
non-automatable theme could silently block a real hire need, and §5b (not
yet built) doesn't add the eligibility check either ~ it inherits this
gap. Until it's coded (own item, alongside HIRE's rename below), treat
the live AUTOMATE label the same way as HIRE: a candidate to check by
hand, never a routing to act on directly.

**Action items, not yet done** ~ two labels on the live dashboard need the
same rename, for the same reason (the UI shouldn't claim more certainty
than v1 can back up):
1. `HIRE` → `HIRE-CANDIDATE` in `lib/analytics.ts` + the dashboard label.
2. `AUTOMATE` → `AUTOMATE-CANDIDATE`, same file, same reasoning ~ AND when
   §5b eventually gets built, code the eligibility test in (a small
   keyword/category tag on themes marking them automatable or not, set
   once when the theme taxonomy is defined, read by the router before it
   fires) rather than carrying the caveat forever.
Small changes, real product behavior ~ ship deliberately, not folded into
this spec.

Trial learnings already banked: the load-scale flip (10 = drowning) with an
epoch cutoff so old-scale data can't corrupt signals; thresholds
env/settings-tunable; summary idempotent. The habit loop is proven ~ that's
the hard part, and it's done.

## 5. The manual router (usable now) + its future automation

### 5a. How Michele runs the full chain by hand today

No code, no wiring, no waiting on capchecker. Once each client's
`delivery-log.md` has 3–4 weeks of rows (see §7 for why "3–4 weeks" means
practice-ready, not calibrated ~ trust per client scales with completed
cycles, not elapsed time):

0. **Skim `learnings/patterns.md` first.** This is where the read
   actually happens ~ it's cross-week corroborating context for steps 1
   and 2 below, not its own separate check. capchecker's live theme
   breakdown only sees the last 14 days; `patterns.md`'s weekly
   REWORK/PROCESS entries show whether a theme has been recurring for
   MONTHS, which is stronger evidence than one window, and often names
   the specific client/handoff a delivery-log number alone wouldn't.
1. **AUTOMATE check:** open the capchecker dashboard's theme breakdown
   (live today). First ask the eligibility question §3 actually poses ~
   **is the dominant theme repetitive and rules-based** (data sync,
   formatting, first-draft pulls)? Themes like "client meetings," "supplier
   delays," or "too many accounts" can dominate the reasons list without
   being automatable at all ~ prevalence alone doesn't clear the bar. Only
   once a theme passes that eligibility test does the ≥40%-of-high-load,
   ≥3-occurrences threshold matter, and only then does AUTOMATE fire. A
   non-automatable dominant theme is real information (it may point at
   REDESIGN instead ~ see below) but it is NOT an AUTOMATE routing. Cross-
   check against step 0's `patterns.md` skim: a PROCESS theme recurring
   there for 2+ months strengthens a borderline 14-day call; if
   capchecker's window shows nothing but `patterns.md` shows the same
   theme recurring for months, that's worth a note even without a live
   threshold crossed.
**Fixed evaluation cohort for REDESIGN's two checks below (on-cadence,
cycle time):** both are computed over the **trailing
90 days of that client's rows as of the walkthrough date**, never the
row's entire history. (FIX_CORPUS's rounds-per-report/tag-share metric in
step 3 uses a related but distinct ROUND-level version of this same
fixed-window principle, not this row-level one ~ see the "FIX_CORPUS's
cohort works differently" block below, after the worked-through reasoning
for why `Due` is the right row-level anchor.) Without a stated cutoff, months (or years) of
old, mostly-clean rows dilute a recent cadence collapse into invisibility
~ a client with 40 clean historical cycles and 3 recent misses reads as
"basically fine" on all-time data and "actively breaching" on the last 90
days, and only one of those is the read this month's walkthrough needs.
It also removes an operator degree of freedom: without a fixed window,
two people picking different ranges from the same log could reach
different routes off identical data. **Anchored to `Due` specifically, not
`Start`, `Delivered`, or acceptance date** ~ a row is IN the
cohort if its `Due` falls in the trailing 90 days, regardless
of when it actually started, shipped, or finalized. Those other dates can
land on the opposite side of the 90-day line from `Due` for a cycle
straddling the boundary, which is exactly the operator-freedom problem
this paragraph exists to remove; picking one date consistently closes it.
`Due` is the right anchor because it's the one date every row has from the
moment it's created (touch 1, a calendar fact, not an execution outcome)
and it's the obligation both on-cadence
and rounds-per-report are ultimately measuring performance against ~
anchoring to a resolution date instead would let a slow cycle's actual
finish date drag it into or out of a window keyed to when it was
originally due. Unresolved rows (`open`, `Due` not yet passed) still get
tested for cohort membership the same way (by `Due`), but stay separately
excluded from the on-cadence rate itself per step 2's existing rule
(future work, not yet a hit or a miss) ~ cohort membership and hit/miss
resolution are different questions, don't conflate them.

**One exception to the strict `Due`-anchored cohort test above: a row
that's STILL `open` PAST its `Due` (an active, unresolved miss) stays in
the cohort regardless of how far in the past that `Due` now sits, until
it's actually `delivered` or `cancelled`.** Applying the plain 90-day
`Due` window to this case would let the single worst kind of miss ~ a
report that's been sitting overdue and unresolved for months ~ silently
AGE OUT of every future month's cohort the moment its fixed `Due` date
turns 90+ days old, even though nothing about the row actually changed
and the miss is still live. §5a's on-cadence denominator already counts
an overdue-open row as a miss specifically because it's still
unresolved; letting that same row vanish from cohort membership purely
by elapsed time would make a persistent backlog improve the router's
cadence signals just by aging, exactly backwards from what those signals
exist to catch (Codex catch, 2026-07-19). The moment a long-overdue row
finally resolves (`delivered` or `cancelled`), it reverts to the
ordinary `Due`-anchored test like any other row ~ this exception only
protects a row for as long as it's genuinely still open and unresolved,
never permanently.

**FIX_CORPUS's cohort works differently, at the round level, not the row
level.** Earlier drafts of this section tried to fit FIX_CORPUS into the
same row-level, `Due`-anchored cohort as on-cadence, patched with a `Last
Sent` exception and a `late-reopen` start/end marker to approximate which
of a row's rounds actually happened inside the 90-day window. That
approximation went through five different failed shapes across successive
walkthroughs (single-marker delta → earliest-in-window marker →
most-recent-marker-overall → sum-by-episode-start-date → exact start/end
interval overlap), and the last of those still broke: an episode's
start/end dates bound the EPISODE, not each individual round inside it, so
a long-spanning episode with 9 old rounds and 1 fresh one still got counted
as all 10 the moment its span merely overlapped the window.

`delivery-log.md` now stamps every individual `Rework tag` entry with its
own date (`brief-misalign (missing) [YYYY-MM-DD]`, one per round, at touch
1.5 or touch 3) specifically to remove this guesswork at the source. So
the cohort rule for FIX_CORPUS is direct, with no row-level anchoring, no
exceptions, and no marker bookkeeping:

**Validate BEFORE filtering, never after ~ the completeness/date gate
(below) has to run across EVERY `accepted`/`revising (reopened)` row
with `Rounds ≥ 1` first, independent of `Due` and independent of whether
any entry's date would otherwise land it in-window** (plus every
`cancelled` row with `Rounds ≥ 1`, for the separate cancelled-row
corroborating signal below ~ that signal needs its own dated, validated
entries just as much as gate (a)/(b) do, even though it never feeds their
core math). (Bare `revising` and
bare `delivered` rows stay outside this gate entirely ~ they contribute
nothing to gate (a) or (b) until they finalize, per the status-scope
reasoning below.) Reading dated entries directly (the next
paragraph) is a filter that can only test a row it's actually given ~ a
row whose `Due` is outside the 90-day window AND whose only recent round
is UNDATED never gets a valid date to test in the first place, so a
"read every dated entry whose date falls in-window" pass run BY ITSELF
just silently skips it: not counted as in-window, not counted as
out-of-window, not flagged as broken data either. That row was never
going to enter the round-level filter's view long enough for the
completeness gate to catch it if the gate only ran on rows the filter
already surfaced (Codex catch, 2026-07-19). Running validation first,
against the FULL set of `accepted`/`revising (reopened)`/`cancelled`
`Rounds ≥ 1`
rows regardless of `Due`, closes this ~ an undated entry gets caught and
hard-blocks its row whether or not that row's `Due` would ever have made
it "interesting" to the window filter on its own.

**Read every individual dated `Rework tag` entry, across every `accepted`
OR `revising (reopened)` row (regardless of that row's own `Due`,
`Delivered`, or `Last Sent`), whose OWN date falls in the trailing 90
days.** That's the cohort test for
COUNTING ROUNDS ~ a filter on rounds, not rows, and it's what gate (a)'s
numerator and all of gate (b) read (cancelled rows feed a separate,
corroborating signal instead ~ see gate (b) below for why they're
deliberately kept out of this core round set). A row's `Due` sitting outside the
90-day window doesn't exclude its recent rounds, and a row's `Due` sitting
inside the window doesn't pull in its old ones ~ each round is judged
solely on its own date, which is exactly what the row-level approximation
could never guarantee. (Gate (a) also needs a row-level, `Due`-anchored
DENOMINATOR on top of this round filter, so it's counting rounds per
REPORT and not just rounds per reworked report ~ see gate (a) below for
why that's a second, deliberately separate test, not a contradiction of
"filter on rounds, not rows.")

- **Rounds-per-report (gate a):** numerator = count of in-window dated
  rounds, read from `accepted` OR `revising (reopened)` rows (see below
  for why the reopened variant counts here too). **Denominator = count
  of DISTINCT rows with STATUS `accepted` OR `revising (reopened)`
  SPECIFICALLY (never bare `revising`, never `delivered`) in the UNION of
  two sets, never just one:**
  **(i)** every such row whose OWN `Due` falls in the trailing 90 days,
  including rows with ZERO rework rounds
  (this is what keeps gate
  (a) a genuine per-REPORT average, not per-REWORKED-report: a clean row
  has no dated `Rework tag` entry to filter by at all, so relying on set
  (ii) alone would silently drop every clean accepted report and let one
  two-round report among nine clean ones read 2.0 instead of 0.2,
  firing the gate on noise); **(ii)** every row that contributed AT LEAST
  ONE in-window dated round to the numerator, even if that row's OWN `Due`
  falls OUTSIDE the trailing 90 days ~ the late-reopen-on-an-old-report
  case (touch 4: a report due and accepted months ago reopens with a
  fresh revision dated inside the window). Count a row that qualifies
  through BOTH sets only ONCE. Set (ii) is required, not optional
  polish: without it, a row whose `Due` sits outside the window but whose
  reopen just added an in-window round would contribute to the numerator
  with NO matching place in the denominator, inflating the ratio for
  every other row's benefit, and in the extreme case (every qualifying row
  with recent activity has an old `Due`, none currently `Due`-in-window)
  the denominator could hit ZERO while the numerator is nonzero ~ a
  division-by-zero that set (i) alone can never prevent (Codex catch,
  2026-07-19: an earlier draft of this gate called that divergence
  "intentional," which was wrong ~ every row that feeds the numerator
  needs a place in the denominator, full stop).

  **Why `accepted` OR `revising (reopened)` specifically ~ not
  `accepted`-only, and NOT the broader `delivered`/`revising`/`accepted`
  either:** this status scope went through two wrong drafts before
  landing here, each fixing one bug while introducing the other. Draft 1
  (`accepted`-only): `delivery-log.md` touch 4 flips a reopened row
  straight back to plain `revising`, so an `accepted`-only denominator
  silently DROPS every reopened row from the count the instant it
  reopens, shrinking the denominator with no offsetting numerator change
  ~ 8 previously-clean rows reopening while 2 unrelated rows hold 2 total
  rounds moves the reading from `2÷10=0.2` to `2÷2=1.0` off a temporary
  status flip alone (Codex catch, 2026-07-19). Draft 2 (widen to
  `delivered`/`revising`/`accepted`, matching on-cadence's own status
  scope): this fixed the reopen case but broke a DIFFERENT one ~ a report
  in its FIRST-EVER, never-yet-accepted pass through revision (bare
  `revising`, no established acceptance yet) would now count as "+1
  report" in the denominator while the numerator (still `accepted`-only)
  reads ZERO rounds from it, since its in-progress rounds aren't final
  yet and were never meant to count until resolved ~ this artificially
  DEFLATES the ratio, treating a report that's actively accumulating real
  rework as if it were a clean, finalized zero-round report (Codex catch,
  2026-07-19, on the round-40 fix itself). **The actual fix:**
  `delivery-log.md` now stamps a reopened row `revising (reopened)`, a
  DISTINCT status value from bare `revising`, specifically so this gate
  can tell "already reached `accepted` once, temporarily back for late
  feedback" (count it ~ it has an established baseline) from "never yet
  resolved, still in its first pass" (exclude it ~ genuinely no baseline
  yet, same reasoning REDESIGN's rework-tag qualifier reads already use
  for provisional rows). This scope applies to the numerator too, not
  just the denominator ~ a `revising (reopened)` row's PRIOR, already-
  dated rounds are exactly as real as an `accepted` row's, and excluding
  them while the late round resolves would reproduce Draft 1's
  undercounting for the numerator specifically. Bare `delivered` and bare
  `revising` rows stay excluded from BOTH numerator and denominator,
  full stop ~ genuinely unresolved, first-pass reports contribute nothing
  to this gate's math until they finalize.
- **Tag-share (gate b):** of the SAME in-window ROUND set gate (a)'s
  numerator uses (never a wider one, and never including `cancelled`
  rows), what fraction
  are tagged `brief-misalign`/`brand`/`quality-bar`. Zero-round rows
  contribute nothing to this ratio either way (they have no round-level
  entries to weigh in), so gate (b) doesn't need the row-level cohort
  gate (a) does ~ it stays a pure round-level ratio, no denominator
  distinction to make.
- The qualifier-majority read (`missing` vs `not-followed`, step 3's
  cause-qualifier gate below) also reads only the in-window, corpus-tagged
  subset of this same round set ~ one consistent population feeds every
  downstream FIX_CORPUS question.
- **Cancelled rows' pre-send rounds are real corpus-vs-process evidence
  too, but they feed a SEPARATE, corroborating signal, never gate (a)'s
  or gate (b)'s core ratio.** An earlier draft of this section tried
  blending cancelled-row rounds directly into gate (b)'s tag-share
  (reasoning: gate (b) has no row-level denominator to protect, unlike
  gate (a), so it seemed like the safe place to add them). That broke a
  DIFFERENT way than the first draft's numerator-without-denominator bug
  did: gate (b) exists to answer "of the rework that ALREADY cleared gate
  (a)'s frequency bar, how much was corpus-caused" ~ blending in rounds
  from cancelled work that never cleared gate (a) at all decouples that
  answer from the reports it's supposed to describe. A concrete failure:
  six `accepted` rows clear gate (a)'s frequency threshold on
  `data`/`client-new-ask` rounds alone (zero corpus-caused among the
  reports that actually shipped), while one unrelated cancelled draft
  contributes six `quality-bar (missing)` rounds; blending them reads
  50% corpus-tagged and fires FIX_CORPUS even though NONE of the
  delivered-report rework that cleared gate (a) was corpus-caused (Codex
  catch, 2026-07-19). **The fix: track cancelled-row corpus-tagged rounds
  as their own corroborating count, reported alongside the FIX_CORPUS
  reading but never mixed into its firing math** ~ the same treatment
  step 3 below already gives `not-followed` rework as HIRE-family
  evidence without letting it change whether the corpus-edit action
  itself fires. If cancelled-row rounds ALSO show a majority-corpus-cause
  pattern, say so explicitly ("N cancelled cycles independently show a
  `{missing/not-followed}` `{tag}` pattern, corroborating this reading")
  ~ real signal that the corpus gap is costing more than just delivered
  rework, but it never substitutes for or inflates gate (a)/(b)'s own
  math, and it never fires the corpus-edit action on its own.

Worked example (numerator, round-level, and denominator via set (ii)): a
row's `Due` was 150 days ago (well outside the 90-day window) and it was
`accepted` shortly after ~ two old rounds dated 200 and 190 days back,
both from that first pass. It then reopens 10 days ago on a late client
revision (1 fresh round, dated 10 days back). Read the three dated
entries directly ~ two are outside the 90-day window (200, 190 days back),
one is inside it (10 days back). This row contributes 1 round to gate
(a)'s numerator and 1 to gate (b)'s round set, full stop, regardless of
how many total episodes or reopens it has ever had. Its `Due` (150 days
back) does NOT qualify it for denominator set (i) ~ but the fresh in-window
round DOES qualify it for set (ii), so it still adds exactly 1 to the
denominator (never 0, and never double-counted if it happened to also
clear set (i)). Contribution: 1 round ÷ 1 report = 1.0 for this row alone.
Reading the denominator as set (i) only would either drop this row
entirely (inflating every OTHER row's average by leaving this round
uncounted in the "reports" total) or, in a month where no row's `Due`
lands in the window at all, divide by zero despite a nonzero numerator ~
exactly what set (ii) exists to prevent.

Worked example (denominator, row-level): a client has ten `accepted` rows
with `Due` in the trailing 90 days ~ nine shipped clean (`Rounds = 0`,
`Rework tag = none`, no dated entries at all) and one had two rounds
(both dated inside the window). Denominator = 10 (every `Due`-in-window
accepted row, clean ones included). Numerator = 2 (the two in-window
dated rounds on the one reworked row). Gate (a) reads 0.2 rounds/report ~
correctly quiet. Reading the denominator as "only rows that contributed a
round" instead would score this 2 ÷ 1 = 2.0 rounds/report off the exact
same data, firing gate (a) on what is genuinely a below-threshold month.

This also removes the need for the old `Last Sent` exception (REDESIGN's
on-cadence/cycle-time reads stay exactly as described above ~
`Due`-anchored per the cohort rule stated there, including its one
still-open-past-`Due` carve-out, but untouched by THIS round-dating
change specifically) and the "row CAN enter cohort via `Last Sent` with
no `late-reopen` marker" special
case: neither concept is needed once individual rounds carry their own
dates ~ a row's FIRST-ever pass through revision is read exactly the same
way as its tenth reopen, because both are just dated entries in the same
list, tested against the same 90-day window, with no row-level or
episode-level bookkeeping standing in between. 90 days re-windows fresh at
each monthly walkthrough (not a cumulative rolling average like WIP's
baseline ~ there's no self-referential creep risk here, it's just which
dated entries get counted this month).
2. **REDESIGN check:** open each client's `delivery-log.md`, two reads ~
   either fires REDESIGN:
   - **Confirmed (on-cadence):** **validate `Delivered` FIRST, before
     computing anything:** any row whose `Status` is
     `delivered`/`revising`/`revising (reopened)`/`accepted` but whose
     `Delivered` cell is blank or not a parseable date is a data-entry
     gap, not a cadence outcome ~ pull it out of BOTH the numerator and
     the denominator, and flag it separately as unevaluable data to fix
     in the log, rather than letting it silently fail `Delivered ≤ Due`
     by default and count as an automatic miss (Codex catch, 2026-07-19:
     admitting a blank/malformed `Delivered` straight into this
     calculation turns a missing field into a spurious cadence breach,
     which can depress the rate enough to fire REDESIGN off incomplete
     data instead of a real pattern). Once validated: compute the rate by
     hand: numerator =
     rows with `Delivered ≤ Due`; denominator = rows that have shipped
     (`delivered`/`revising`/`revising (reopened)`/`accepted`) **plus**
     `open` rows already past
     `Due` (overdue-in-progress misses) **plus** `cancelled` rows where
     `Last Sent` (the structured cancellation-date stamp, `delivery-
     log.md`'s cancellation touch) is `> Due`, STRICTLY ~ cancelled AFTER
     `Due` had already passed while still `open` (an overdue miss that had
     already accrued before cancellation, so it stays counted; it doesn't
     have a `Delivered` date so it never lands in the numerator, only drags
     the denominator, same as an overdue-open row would). A same-day
     cancellation (`Last Sent = Due`) is NOT yet overdue ~ same boundary
     `Delivered ≤ Due` already uses elsewhere, so a cancellation stamped on
     the due date itself counts as before, not after. ~ **excluding**
     `open` rows whose `Due` hasn't arrived yet (that's future work, not
     yet a hit or a miss; counting it dilutes the rate and can mask a real
     problem) and excluding `cancelled` rows where `Last Sent ≤ Due`
     (cancelled before or on `Due`, never became a miss, fully out of both
     numerator and denominator). Below threshold, with `Rework tag` mostly
     `client-new-ask`/`data`/`none`, **OR corpus-tagged but qualified
     `(not-followed)`,** rather than
     `brief-misalign`/`brand`/`quality-bar` **qualified `(missing)`** →
     REDESIGN. **The `(not-followed)` reclassification matters, don't skip
     it:** a `brand (not-followed)` round means the brand standard was
     already correct and someone just didn't apply it ~ that's a process/
     execution question, REDESIGN's territory, not FIX_CORPUS's, no matter
     what tag it's wearing. Without this, a slow client with heavy
     `(not-followed)` rework satisfies neither REDESIGN (its rounds look
     corpus-tagged on the surface) nor FIX_CORPUS (the qualifier gate
     correctly refuses to fire on an already-correct corpus) ~ the row
     falls through BOTH branches unrouted, and a real, already-identified
     non-capacity explanation goes silently unaccounted for, leaving
     nothing to stop HIRE from proceeding as if no explanation existed at
     all. **This tag
     read is scoped to the LATE cycles specifically ~ the rows actually
     missing `Due` (`Delivered > Due`, plus overdue `open` rows) ~ not the
     full accepted-row population. **`cancelled` rows are excluded from
     this late-cycle set entirely, even the after-`Due` ones that DO stay
     counted in on-cadence's miss denominator above** ~ a cancelled cycle
     was never delivered, so there's no shipped report for a
     brief-misalign/brand/quality-bar qualifier question to even apply to,
     and `delivery-log.md`'s state machine makes `cancelled` a terminal
     state reachable only from `open`, never followed by `accepted`.
     Leaving a cancelled-after-`Due` row inside this set (or inside the
     "too few late rows accepted yet" count just below) would wait on a
     qualifier that can never arrive ~ not provisional-until-resolved, but
     provisional FOREVER, permanently hard-blocking HIRE off a row that
     will never finalize. The on-cadence MISS itself still counts (that's
     settled fact, per the `Status` bullet in `delivery-log.md`); only the
     corpus-vs-process QUESTION doesn't apply to a cycle nobody ever
     produced.** Averaging tags across every accepted
     row, including the many that shipped clean and on time, dilutes the
     read past usefulness: eight on-time clean reports (tag `none`)
     alongside two late `brief-misalign` ones would average out to "mostly
     none," pointing at REDESIGN, even though the two cycles that actually
     caused the on-cadence miss are corpus-driven and should point at
     FIX_CORPUS instead. Read what tagged the MISSES, not the portfolio
     (matches §5b's coded rule, which already scopes this to "those
     specific cycles"). Within that late-cycle set, this still only counts
     `accepted` OR `revising (reopened)` rows ~ the SAME trusted scope
     FIX_CORPUS's own numerator/denominator already use, and for the same
     reason: a reopened row already has an established `accepted`
     baseline behind it, with its own dated rounds, so it's settled
     evidence, not a provisional guess (Codex catch, 2026-07-19: an
     earlier draft of this qualifier read left `revising (reopened)`
     grouped with bare `revising` instead of `accepted`, dropping its
     established rework history and risking REDESIGN reading PROVISIONAL
     or absent off a status transition alone, inconsistent with how
     FIX_CORPUS already trusts the exact same rows). A `delivered` or
     bare `revising` late row's tag is still
     provisional (more rounds, and a corpus-tagged one among them, could
     still land before it finalizes); pulling REDESIGN evidence from an
     unresolved late row risks reading it as clean days before a
     `brief-misalign`/`brand`/`quality-bar` revision arrives and it should
     have pointed at FIX_CORPUS instead. `open`/`delivered`/`revising` rows still count
     in the on-cadence rate itself (that's a delivery-date fact, settled
     at ship, not a tag) ~ only the REWORK-TAG qualifier on top of it waits
     for `accepted`/`revising (reopened)`. If too few late rows are trusted yet to read this
     qualifier meaningfully, say so and mark this client's REDESIGN read
     **PROVISIONAL, a distinct third state from "fired" and "genuinely
     absent" ~ and PROVISIONAL BLOCKS HIRE too, exactly like "fired"
     does** (same caution as the survivorship-bias note in step 3). This
     matters: HIRE's gate below only tests whether REDESIGN "isn't
     firing," and PROVISIONAL isn't firing either, by that binary test ~
     without calling it out as its own state, several unresolved late
     rows in a given month would silently read as "REDESIGN ruled out,"
     letting HIRE fire before the pending rework tags reveal whether the
     slowdown was actually corpus- or process-driven. "Can't be evaluated
     yet" and "evaluated and absent" are different findings; only the
     second one lets HIRE proceed. **But scope this PROVISIONAL block to
     genuinely CLUSTERED/narrow candidates ~ run the clustering check
     below FIRST, or at minimum don't let a provisional tag-share reading
     block HIRE when the SHAPE of the miss is already clearly broad.** A
     portfolio-wide capacity incident (many clients overdue at once, most
     still `open`/`revising`, team-wide WIP/load already elevated) will
     naturally have few-to-no late rows freshly `accepted` yet ~ that's
     what an active incident looks like. Marking REDESIGN provisional
     ~and~ letting that provisional state block HIRE in that exact
     scenario would leave the instrument unable to ever confirm the
     capacity explanation it exists to catch, precisely when it's most
     real: the clustering check below already rules REDESIGN out for broad
     situations REGARDLESS of what the tags eventually say, so a broad
     pattern shouldn't wait on a qualifier question that was never going
     to change REDESIGN's answer anyway. Reserve PROVISIONAL for the
     genuinely ambiguous case: a NARROW, clustered-looking candidate where
     the qualifier itself (not the shape of the miss) is the open
     question.
   - **Early warning (cycle time):** compare recent `Delivered − Start`
     spans against the frozen per-client baseline (defined in §2's signal
     table ~ first 3 completed cycles, ≥20% margin; §7 only governs WHEN
     that number is trustworthy to act on, not what it is), **on cycles
     whose rework (if any)
     stays low or isn't corpus-tagged** ~ the same qualifier the
     on-cadence read above already uses (`accepted` OR `revising
     (reopened)` rows, NOT `accepted`-only, same trusted scope FIX_CORPUS
     and the rest of this doc already use ~ a reopened row carries an
     established baseline and dated rounds, not a provisional guess;
     Codex catch, 2026-07-19: an earlier draft of this bullet restricted
     to `accepted`-only, dropping established rework history and risking
     this early-warning path disagreeing with §5b's automated version on
     identical data), applied here too so this bullet is
     self-contained and doesn't need to borrow step 3's answer to resolve
     itself. Trending up under that condition, even while still narrowly
     hitting `Due` → REDESIGN, flagged as "before it becomes a miss" ~
     this is the row that keeps a slow slide from going unnoticed until
     on-cadence formally breaches. (A cycle that's slow BECAUSE its
     rework is heavily corpus-tagged was never REDESIGN evidence to begin
     with ~ that's what step 3 is for. Declared order stays intact:
     AUTOMATE, then REDESIGN, then FIX_CORPUS, then HIRE, each with
     self-contained evidence, none needing to look ahead at the next
     step's answer first ~ Codex catch, 2026-07-18.)
   **Before calling either read a REDESIGN, check it clusters** ~ one
   client, one handoff step, one specific process, not a broad slowdown
   touching most clients/analysts at once. If it's broad AND WIP/load are
   also elevated team-wide, that's capacity exhaustion, not a process
   defect ~ do NOT let REDESIGN claim it; let it flow through to the HIRE
   check (step 4) instead. Only route to REDESIGN when you can name the
   specific thing to fix; "everything's a little slow" isn't a redesign,
   it's a capacity signal wearing a cadence costume. Step 0's
   `patterns.md` skim often names the specific bottleneck already ~
   PROCESS entries are written from real session friction, so "long queue
   for data pulling, ClientA/C/D" in the tally is frequently the
   clustering answer, not just corroboration of it.
3. **FIX_CORPUS check:** same logs, same trailing-90-day PRINCIPLE as
   above but a DIFFERENT cohort mechanism (see the "FIX_CORPUS's cohort
   works differently" block earlier in this section ~ the denominator
   below is row-level, same PRINCIPLE as on-cadence but NOT the same set,
   while the
   numerator and gate (b) are round-level, reading each dated `Rework tag`
   entry on its own regardless of its row's `Due`). **This "trailing-90-day"
   window is the SAME epoch-clamped one the numerator/denominator
   definitions above use ~ `max(trailing 90 days, Sep 4)`, AND rows also
   need their own `Start ≥ Sep 4` before their rounds count at all (the
   numerator-level epoch gate above), never the unconditional
   trailing-90-days a first read of "same trailing-90-day PRINCIPLE"
   might suggest.** `ROADMAP.md` task 2.2 flags this exact requirement for
   the Sep 11 walkthrough specifically, but the clamp applies to every
   walkthrough while post-epoch history is still filling in, not just the
   first one ~ running this check by hand without it admits August rows
   (under-instrumented, pre-QA-gate) as apparently clean data, the same
   dilution the coded version exists to prevent, on the manual side
   instead (Codex catch, 2026-07-19: this local restatement pointed back
   at "the full definition above" for the epoch/`Start` rule instead of
   stating it here directly, and an operator working from just this step
   could easily miss it). Two
   gates in order, not one, and ONE metric throughout, not two ~ **average
   rounds per report** (total in-window rework rounds ÷ number of
   `accepted`/`revising (reopened)` rows ~ NOT `accepted`-only, same
   trusted scope as the numerator, or a reopened row's in-window round
   counts above while the row itself has nowhere to land below, Codex
   catch, 2026-07-19 ~ in the UNION of `Due`-in-window rows (INCLUDING zero-round
   ones) AND rows that contributed an in-window round despite a `Due`
   outside the window ~ **never `Due`-in-window rows alone**, that
   under-counts the denominator for exactly the reopened-old-report case
   and can divide by zero ~ see the full two-set definition and worked
   examples above), never "share of rows with any
   rework" ~ the two aren't
   interchangeable (one 5-round report among ten clean ones is 0.5
   rounds/report but only 10% of rows touched; picking whichever makes
   the gate pass on a given month would make routing decisions
   incomparable across months). (a) first, does that rounds-per-report
   average MEET OR EXCEED the threshold (≥, matching the v1 seed's own
   `≥2` framing above ~ read literally, "above" means strictly `>`, which
   would route an exact 2.0 average differently than the declared
   threshold and any future coded implementation, Codex catch,
   2026-07-19)? If rework is rare, stop here ~ one
   brand-tagged revision among many clean reports is noise, not a corpus
   signal, even though it'd be "100% corpus-tagged" by count alone.
   (b) Only once (a) clears: **count
   at the round level, not the row level** ~ a 5-round report with one
   `brand` cause and four `client-new-ask` causes is 20% corpus-driven,
   not 100%; the delivery log keeps one tag entry per round specifically
   so this is countable (see `delivery-log.md`). Of all the rework rounds
   that exist across qualifying rows, is half or more tagged
   `brief-misalign`/`brand`/`quality-bar`? If both gates clear, FIX_CORPUS
   fires, and the tag itself tells you which corpus file is stale (the
   brief, `what-good-looks-like.md`, or ~ for `brand` specifically, read
   the qualifier's SECOND component, `house-voice`, `brand-standard`, or
   `report-template-rules`,
   since check 2 covers THREE different files and the bare tag alone can't
   tell them apart ~ this second component is picked INDEPENDENTLY of the
   missing/not-followed cause, never a fixed pairing (a `not-followed/
   house-voice` finding is just as real as `missing/brand-standard` or
   `missing/report-template-rules` ~ see
   `delivery-log.md`'s Rework tag bullet for the full six-combination
   reasoning) ~ **but check
   the qualifier on each qualifying round's TAG ENTRY (`missing` vs
   `not-followed`, e.g. `brand (not-followed/brand-standard)` ~ slash, not
   comma, since a comma there would parse as a second round entry ~ NOT
   free text in Notes, see `delivery-log.md`) before actually opening that
   file to edit it.**
   A correctly-filled row will normally have no qualifier sitting in
   Notes at all ~ Notes can't reliably bind a qualifier to a specific
   round on a multi-round row, which is exactly why the qualifier lives on
   the tag entry itself instead. The tag says what kind of
   defect; the qualifier says whether the corpus was really at fault. A
   majority `not-followed` reading means the file was already right and
   editing it fixes nothing ~ the real cause is execution or process, not
   the corpus (see `delivery-log.md`'s Rework tag bullet for the full
   reasoning).
   **"Majority missing" here means majority WITHIN the corpus-tagged
   subset ~ that's necessary but NOT sufficient on its own to actually
   fire the corpus edit.** The action also requires the missing-qualified
   round count to independently clear ≥half of ALL qualifying rounds from
   gate (a) ~ the SAME denominator gate (b)'s own ≥half-tagged threshold
   already uses, not just a majority of the smaller corpus-tagged subset.
   Worked example of why this second check is required: 3 `missing` + 2
   `not-followed` + 5 `client-new-ask` = 10 total rounds. Corpus-tagged =
   5 (3 + 2), which clears gate (b)'s ≥half-of-10 threshold (5/10 = 50%).
   Within that tagged subset, `missing` (3) is the majority over
   `not-followed` (2) ~ but missing ÷ ALL rounds = 3/10 = 30%, well under
   half. Firing the corpus edit here would act as if half of this
   client's rework were a genuine corpus gap, when only 30% of it actually
   is (Codex catch, 2026-07-19) ~ the other 20 percentage points of
   "corpus-tagged" share came from an ALREADY-correct standard nobody
   applied, not a missing one. **The all-rounds bar is the real test,
   evaluated FIRST and standing on its own ~ missing-count ≥ half of ALL
   qualifying rounds fires the corpus edit BY ITSELF**, whether or not
   `missing` is also a strict majority within the narrower tagged subset.
   An earlier draft of this section required both as a conjunction and
   claimed clearing the all-rounds bar "automatically" clears the
   subset-majority bar too (since `missing` rounds are always a subset of
   corpus-tagged rounds, and corpus-tagged rounds are always a subset of
   all rounds). That implication is false at exactly one boundary: 5
   `missing` + 5 `not-followed` = 10 total rounds, all tagged ~ `missing`
   clears the all-rounds bar at exactly 5/10 = 50%, but 5 vs 5 within the
   tagged subset is a TIE, not a strict majority, so the conjunction as
   written would suppress the edit off the very reading the all-rounds
   bar exists to confirm (half of this client's rework IS a confirmed
   missing-corpus problem), and the tie-handling rule elsewhere in this
   document (step 4 below, and this step's own qualifier-gate block)
   would then read it as "resolved, no clear majority, don't edit,"
   directly contradicting the all-rounds evidence (Codex catch,
   2026-07-19). Evaluate the all-rounds bar FIRST; only fall through to
   the subset-majority/tie logic below when it does NOT clear. **A reading
   that clears the subset-majority test
   but NOT this all-rounds bar (exactly the earlier worked example) is a
   FOURTH outcome, distinct from missing / not-followed / tie:** treat it
   the same as a majority-`not-followed` reading ~ real FIX_CORPUS-family
   evidence for step 4's portfolio-wide gate below, but the corpus-edit
   action does NOT fire, since less than half of this client's actual
   rework is a genuine, currently-missing corpus gap.
   **A majority-`not-followed` reading isn't just "the corpus-edit action
   doesn't fire" ~ it's still real evidence for step 4's portfolio-wide-
   vs-narrow gate below, not a silent nothing.** REDESIGN's own
   `(not-followed)` reclassification (step 2 above) only reads rework tags
   on rows that ALREADY missed `Due` or are ALREADY trending slow ~ a
   client that ships on time but burns rounds re-doing work against an
   already-correct standard has no cadence signal to trigger that
   reclassification, so without this note it falls through BOTH REDESIGN
   (no cadence miss to scope it) and FIX_CORPUS (the qualifier correctly
   refuses a corpus edit), leaving nothing on record to explain the
   elevated round count if HIRE later asks why load/WIP are up (Codex
   catch, 2026-07-19). So: whenever gates (a) and (b) both clear and the
   qualifier majority reads `not-followed`, name it explicitly in this
   month's evidence ~ *"rework frequent and corpus-tagged, but the
   standard was already right: execution/coaching gap, not a corpus
   edit"* ~ and clustering-test it exactly like REDESIGN does (step 2's
   clustering-first note): **CLUSTERED** to one client or one analyst →
   this counts as a narrow FIX_CORPUS-family signal for step 4's gate,
   blocking HIRE for that scope, same as a narrow REDESIGN signal would
   (that specific person/account needs coaching, not company-wide
   headcount). **BROAD**, spread across most clients/analysts, especially
   alongside elevated team-wide WIP/load → treat it the same as REDESIGN's
   own broad case (step 2): don't let it block HIRE ~ people cutting
   corners on standards they already know because they're stretched thin
   is a symptom of the capacity problem, not a competing explanation for
   it. A COMPLETE tie in the qualifier (below) stays non-blocking either
   way ~ this test applies only once a clear `not-followed` MAJORITY is
   actually established.
   **Watch for survivorship bias before trusting a low reading:** clean
   reports auto-resolve to `accepted` within 5 business days (the silent-
   acceptance rule), but a report stuck in `revising` for weeks ~ the
   worst-performing ones, almost by definition ~ never enters this
   calculation until it finally finalizes (a row reopens into `revising
   (reopened)`, not bare `revising`, so it stays counted once it's
   reached `accepted` at least once ~ this bias is specifically about a
   row on its FIRST-EVER, never-yet-accepted pass, still bare `revising`,
   with no baseline yet). During an active quality
   problem, that means the `accepted`/`revising (reopened)` rate can read
   artificially LOW
   precisely because the highest-rework FIRST-PASS cycles haven't resolved
   yet. If
   any bare-`revising` rows are sitting with elevated `Rounds` and no
   resolution in sight, treat the `accepted`/`revising (reopened)` number
   as a **lower
   bound, not the real rate** ~ note the open backlog explicitly rather
   than reporting a clean FIX_CORPUS read that a few weeks of hindsight
   would contradict. **This is a THIRD source of PROVISIONAL, same
   consequence as the other two (step 2's REDESIGN, this step's qualifier
   gate): if the unresolved `revising` backlog is large or corpus-tagged
   enough that resolving it could plausibly flip this reading from
   below-threshold to above (or from majority-`not-followed` to
   majority-`missing`), mark FIX_CORPUS PROVISIONAL and let it block HIRE
   too, not just "noted."** A falsely-low FIX_CORPUS reading, acted on as
   if it were final, is exactly the false-absence failure mode the other
   two provisional gates already exist to prevent ~ a portfolio-wide
   backlog of unresolved, heavily-tagged revisions must not be waved
   through to HIRE just because none of it has finalized yet.
4. **HIRE check:** only if none of the above fired **portfolio-wide** ~ AND
   none of the above sits **PROVISIONAL** either. THREE sources of
   PROVISIONAL, all block HIRE the same way a fired branch would, until
   resolved: step 2's REDESIGN read, when too few late/trending cycles
   have reached `accepted` to evaluate the rework qualifier (but NOT when
   the miss is already clearly broad + WIP/load-elevated ~ see step 2's
   clustering-first note); step 3's FIX_CORPUS tag-qualifier read, when
   qualifying rounds are missing their `missing`/`not-followed` tag-entry
   qualifier entirely (genuinely missing data, waitable); and step 3's
   survivorship-bias backlog, when an unresolved `revising` backlog is
   large/tagged enough to plausibly flip the FIX_CORPUS reading. A
   COMPLETE tie in the missing/not-followed qualifier ~ every round tagged,
   the `missing`/`not-followed` counts landing exactly equal ~ is NOT
   provisional (see step 3): it's a resolved "no clear corpus-cause
   majority" finding with no missing data left to wait for, so it does not
   block HIRE. **Unless `missing` alone already clears ≥half of ALL
   qualifying rounds even at the tie** (step 3's all-rounds bar, evaluated
   FIRST and standing on its own regardless of the subset tie ~ 5
   `missing` + 5 `not-followed` out of 10 total rounds is a tie within the
   tagged subset, but `missing` alone is still 50% of ALL rework, which is
   exactly the confirmed-corpus-gap reading the all-rounds bar exists to
   catch) ~ that case fires the corpus edit same as any other
   all-rounds-bar clear, and DOES block HIRE the same way any fired
   FIX_CORPUS route does; it never falls into "resolved tie, no action"
   just because the narrower subset happened to land even (Codex catch,
   2026-07-19). A clear `not-followed` MAJORITY (not a tie) is different ~
   per step 3's dedicated note above, it's real FIX_CORPUS-family evidence
   read into this same narrow-vs-portfolio-wide gate below, clustering-
   tested exactly like a REDESIGN signal, not something that silently
   vanishes just because no corpus file gets edited. Genuinely-absent
   evidence lets HIRE through; can't-be-evaluated-yet doesn't, from either
   source. A
   narrow AUTOMATE/REDESIGN/FIX_CORPUS signal on ONE client while WIP/load
   are elevated broadly across MOST clients/analysts doesn't explain away
   the team-wide breach; that narrow fix wouldn't relieve it. Only let an
   earlier branch block HIRE when fixing it would plausibly absorb enough
   of the strain to matter ~ don't let a small, already-handled signal
   permanently shield a real capacity need. This **including
   REBALANCE**, capchecker's live signal for one analyst overloaded while
   the team has headroom ~ check the dashboard's REBALANCE flag, but
   **verify the headroom claim before trusting it, don't just take the
   flag at face value**: REBALANCE fires on a RELATIVE gap (outlier ≥2pts
   above team average), which five analysts at 6 and one at 8.5 satisfies
   even though the team average (6.42) is itself at the overload line ~
   there's no real slack to redistribute into. Manually check: excluding
   the outlier, is the REST of the team's average comfortably below the
   structural line (≤5, v1 seed)? If yes, REBALANCE is real, redistribute.
   If the rest of the team is ALSO near/at the overload line, that's
   uniform team-wide strain wearing a REBALANCE costume ~ don't let it
   block HIRE. **Also check capchecker's
   DATA flag before trusting "across the team" ~** if response rate is
   below 70% or there's under 10 days of post-epoch history, the DATA
   signal is active, meaning "the team's load is maxed" is actually "the
   people who answered are maxed," which isn't the same claim. Don't
   route to HIRE off a partial team; wait for DATA to clear, or chase the
   response rate up first (that's its own fixable problem, separate from
   whether a hire is warranted). **Before reading WIP as "maxed across the
   team," check its OWN coverage separately from DATA above ~ Q3 can go
   unanswered or unparsable independently of Q1/Q2 (§2's WIP row), so
   DATA reading clear says nothing about whether enough people actually
   have a usable WIP number this cohort.** Count how many analysts clear
   the ≥7-of-10-valid-observations bar (§2) this cohort; if fewer than
   ~70% of the full roster do (≥5 of 6 today, same bar DATA already uses),
   WIP is insufficient-coverage ~ don't route to HIRE off it, same as an
   unclear DATA flag, chase the Q3 response rate up first. Once REBALANCE
   is ruled out, DATA is clear, AND WIP coverage clears: cross-reference
   capchecker's sustained-load signal against WIP
   per analyst (capchecker Q3, read manually until §5b's automation
   exists) ~ both maxed ACROSS THE TEAM, **defined exactly here too, not
   left to eyeballing the dashboard: MORE THAN HALF of the roster's
   ACTUAL CURRENT headcount individually reading WIP-elevated (§2's
   frozen-baseline-+2 threshold) ~ derived from today's real roster size
   at every walkthrough, never hard-coded to "4 of 6" as a fixed number
   that quietly goes stale the moment the team grows or shrinks, the SAME
   dynamic-derivation rule §3/§5b already use for the identical predicate
   (Codex catch, 2026-07-19: an earlier draft hard-coded the 6-person/
   ≥4 figures here, so a manual walkthrough run after a headcount change
   would keep testing against a stale bar while the automated router
   correctly recalculated ~ 4-of-8 wrongly passing after growth, or
   3-of-5 wrongly failing after shrinkage).** **If this HIRE check is
   running alongside an already-identified narrow AUTOMATE/REDESIGN/
   FIX_CORPUS signal, this same count EXCLUDES that signal's own named
   analyst(s)** ~ the exact worked reasoning and exclusion rule are in
   §3's narrow-signal scope test below; don't re-derive a second version
   of it here, read that section's numerator definition and apply it
   (Codex catch, 2026-07-19: an earlier draft counted every elevated
   analyst including the narrow signal's own, which the coded §5b
   version already excludes, letting a manual walkthrough clear this bar
   more easily than the automated router would on identical data). Never
   settle for "looks maxed" or "most people seem
   loaded," and never let this count shrink to whoever happens to have
   sufficient WIP data this cohort ~ that's a different, already-cleared
   gate above (the ≥70%-roster-coverage floor), not this one. A minority
   of the roster elevated, even with clean coverage and DATA, does
   NOT clear this bar by itself, no matter how loaded the load signal
   reads ~ that's a genuinely narrow WIP pattern REDESIGN or a
   redistribution should absorb, not a portfolio-wide hire. Not concentrated in the one
   person REBALANCE would have caught, and not an artifact of who
   happened to respond ~ this fixed-count test is exactly what confirms
   that. No automate/redesign/corpus/rebalance
   explanation → HIRE, and the ruled-out checks above are the evidence
   trail, already written down.

Fifteen minutes, monthly, two documents open. This is the real router ~
write the routing decision + evidence into
`learnings/router-decisions.md` (its own file, own format ~ NOT
`patterns.md`, which has a strict weekly tally schema written only by the
promotion pass; a free-form decision entry would corrupt those counts).
**This is what Phase 3's "monthly threshold read" in the roadmap actually
means** ~ it starts as soon as the data exists, not after any software
ships.

### 5b. Automating it into capchecker's dashboard (60–90d roadmap item)

Once the manual version has run a few cycles and the thresholds feel
right, encode the same logic into the dashboard so nobody has to do the
above by hand:

1. **Ingest feed 2, `learnings/patterns.md`, AND each client's current
   ownership:** a light weekly pass
   reads `clients/*/delivery-log.md` from Drive into capchecker's
   Supabase (or renders alongside ~ data stays canonical in the owned
   corpus; the app is a lens on it), **EXCLUDING `clients/_template-client/`**
   ~ the scaffold
   folder every real client is copied from stays in the corpus as the
   copy source (per `README.md`'s "starting a new client" instructions),
   and its `delivery-log.md` still carries the template's own example row
   with literal placeholder text (`{YYYY-MM-DD}`, `{Dale}`, etc.), never
   real dates or values. A glob that doesn't skip underscore-prefixed /
   `_template-client` folders will either fail parsing on that row every
   single run or, worse, silently upsert a fake `_template-client` client
   record into the router's data ~ exclude any
   folder matching the template naming convention before this glob runs,
   the same exclusion `amplifi-improve`'s promotion pass and any future
   corpus-wide tooling need too. **This folder-level exclusion is NOT
   sufficient on its own, though** ~ every REAL client's `delivery-log.md`
   starts life as a COPY of that same template file (`README.md`'s
   "starting a new client" flow), which means it ALSO ships with that same
   example row, and nothing in the onboarding instructions requires
   deleting it before real rows get appended. A real, otherwise-legitimate
   client log can carry that placeholder row indefinitely, breaking
   ingestion the exact same way the template folder itself would (Codex
   catch, 2026-07-19). **Add a ROW-level filter on top of the folder-level
   one: skip any row containing an unresolved `{...}` template marker in
   its STRUCTURED/TYPED columns (`Period`, `Cadence`, `Analyst`, `Start`,
   `Due`, `Delivered`, `Last Sent`, `Status`, `Rounds`, `Effort (h)`,
   `Rework tag`), regardless of which client folder it's in ~ but NEVER scan
   `Notes` for this.** `Notes` is free text, and a genuine, fully-filled
   row can legitimately describe a real correction by quoting a literal
   template token verbatim (e.g. "replaced stale `{Month YYYY}` text
   left over from last period's Canva file") ~ a whole-row brace-scan
   that includes `Notes` would skip that entirely legitimate row as if it
   were the unfilled example, and the later reconciliation pass (above)
   would then delete its already-ingested copy from the destination on
   top of that, discarding real cadence/rework evidence over a mention
   inside a description, not an actual unfilled field (Codex catch,
   2026-07-19). The unfilled template row's actual signature is that
   EVERY structured column reads its own literal placeholder
   SIMULTANEOUSLY (`{2026-07 / wk 29}`, `{Dale}`, `{YYYY-MM-DD}`, etc.,
   all at once, per the template's own example row in `delivery-log.md`)
   ~ a real row's structured columns should never contain a brace at all,
   so scanning only those, never the free-form `Notes` column, is both
   the more precise defense and the safer one. Flag a skipped placeholder row
   once per client (not once per weekly run) as a reminder to clean it up,
   rather than silently ignoring it forever. Plus `patterns.md`'s theme tally as
   corroborating signal strength for AUTOMATE/REDESIGN (a theme recurring
   there across multiple weeks raises confidence on a borderline
   14-day-window call) ~ without this second ingest, `patterns.md` keeps
   accumulating and never actually influences a routing decision, which
   defeats the point of promoting REWORK/PROCESS themes there at all.

   **Also ingest each client's `brief.md` Snapshot ("Amplifi lead
   analyst: {name} · backup: {name}") as a THIRD source, not just
   delivery-log and patterns.md.** The HIRE scope check later in this
   same section explicitly requires mapping each narrow client signal to
   its CURRENT owner via this Snapshot field, not the delivery-log's most
   recent `Analyst` cell (see below for why those two answer different
   questions) ~ without ingesting the field itself, the dashboard has
   nothing to run that mapping against, and would either fall back to the
   delivery-log's most-recent-row attribution the scope check explicitly
   rejects, or have no owner at all for a client whose narrow signal it's
   trying to scope (Codex catch, 2026-07-19). Keep this field updated
   alongside the log in the same weekly pass ~ `brief.md`'s own
   maintenance-trigger note (per `README.md`) means it changes on
   reassignment, not on a fixed schedule, so a weekly re-read (not a
   one-time import) is what keeps it from silently drifting stale between
   ownership changes.
   **This has to be an idempotent UPSERT, never a blind append.** A
   delivery-log row is mutable for its entire life ~ `Status` advances,
   `Rounds`/`Rework tag` accumulate, `Last Sent` updates on every resend,
   and a row can even reopen from `accepted` to `revising (reopened)`
   months
   after its first ingest (touch 4) ~ so re-running this weekly pass on
   the SAME row has to UPDATE the existing Supabase record, not insert a
   second copy of it (Codex catch, 2026-07-19). Key the upsert on
   **(client folder, `Period`)** ~ the composite key `delivery-log.md`'s
   "How to fill a row" section defines as stable and format-locked per
   client, precisely so this ingestion can rely on it; matching on
   `Period` alone, or on any free-form text that could drift week to
   week, risks leaving a stale orphaned Supabase copy behind under the old
   label instead of updating the same row. Flag, don't silently resolve,
   any `(client, Period)` collision the ingest finds (two rows claiming
   the same composite key) ~ that's a data-entry error in the corpus, not
   something the ingestion pass should guess its way through.
   **Upsert alone can only ever add or update a record ~ it has no way to
   REMOVE one, and a row genuinely disappearing from the canonical
   markdown log is a real case, not a hypothetical.** Resolving the
   `(client, Period)` collision this same paragraph just described
   commonly means a human deletes the erroneous duplicate row (or
   recreates it under a corrected `Period` value, which is the same
   problem under a different key). The next weekly pass upserts whatever
   survives, but the ALREADY-INGESTED duplicate's Supabase record has no
   corresponding markdown row left to update it, so a pure upsert-only
   sync leaves it sitting there untouched, feeding stale cadence/rework
   evidence into the router indefinitely (Codex catch, 2026-07-19). Fix:
   on every weekly pass, after upserting, RECONCILE ~ diff the full set of
   `(client, Period)` keys the destination currently holds against the
   full set actually present in this run's complete read of every
   client's `delivery-log.md`, and delete any destination record whose
   key no longer exists in the source. This reconciliation is cheap
   precisely because the pass already reads every client's FULL log on
   every run (per the completeness-gate validation above, which is
   already whole-file, not incremental) ~ no separate tombstone marker or
   manual delete step needed, the source of truth's own current contents
   are the reconciliation target. **The diff is only safe to run once the
   read is confirmed COMPLETE, though ~ a partial read must never be
   treated as "these clients' rows are gone."** If the weekly pass fails
   to read even one client's `delivery-log.md` (a transient Drive/API
   error, a timeout mid-scan), that client's keys are simply MISSING from
   this run's source set, exactly indistinguishable from a genuine
   deletion unless the job separately tracks which clients it actually
   read successfully. Running the delete-diff against an incomplete read
   would wipe that unreachable client's already-ingested, still-valid
   cadence/rework evidence out of the destination on nothing more than a
   network hiccup, and the router would lose real data until some LATER
   successful run happens to restore it, potentially changing a month's
   route in between (Codex catch, 2026-07-19). Fix: track the expected
   client list (every non-`_template-client` folder under `clients/*`)
   against the list actually read without error THIS run; only proceed to
   the delete-diff when they match exactly. On any short read, still
   upsert whatever WAS read successfully (that part is safe, upsert never
   deletes), but skip the delete-diff entirely for this run and retry the
   reconciliation on the next scheduled pass rather than failing the
   whole sync ~ a delayed reconciliation is a stale-but-harmless read; a
   reconciliation run on incomplete data is actively destructive.
   **`patterns.md`'s ingestion needs its OWN idempotency strategy, not the
   `(client, Period)` key above ~ that key is specific to delivery-log
   rows and doesn't apply here.** `patterns.md` is genuinely append-only
   (never edited in place, unlike a delivery-log row), so re-reading it
   from the top on every weekly run would re-encounter every historical
   week/theme bullet every single time, and without a stable identity per
   bullet, that either re-inserts duplicates or re-counts the same
   recurrence into an already-recorded total, inflating AUTOMATE/
   REDESIGN's confidence off nothing new (Codex catch, 2026-07-19). Fix:
   **track a read cursor (last-ingested line number or byte offset), not
   a per-bullet key** ~ since the file only ever grows at the end (new
   week-blocks, or a `LATE ADDITION to {week}` block per `patterns.md`'s
   own late-capture rule), each run reads ONLY the content appended since
   the last successful run and advances the cursor past it, never
   re-reading what's already been ingested. A `LATE ADDITION to {week}`
   block is still NEW CONTENT the cursor hasn't seen yet (it's appended
   after the cursor's current position, even though it logically belongs
   to an earlier week) ~ the cursor only tracks WHAT'S been read, not
   WHERE a bullet's counts apply; the ingestion logic still folds a late
   addition's counts into the week it names, exactly as the manual
   walkthrough does. Store the cursor wherever the ingestion job's own
   state lives (alongside the delivery-log sync watermark, if one
   exists). **A genuine first-ever run (destination has never been
   ingested into) and a LOST/RESET cursor after prior successful runs are
   NOT the same case, and "ingest everything" is only safe for the
   first.** A cursor reset after the destination already holds data from
   earlier runs means "ingest everything from byte 0" would replay every
   already-ingested week/theme bullet ON TOP of data that's already
   there, duplicating or re-counting every prior theme and silently
   inflating AUTOMATE/REDESIGN confidence off nothing new ~ exactly the
   bug this whole cursor mechanism exists to prevent, just triggered by
   losing the cursor instead of never having one (Codex catch,
   2026-07-19). On a detected reset (cursor missing/corrupt but the
   destination is non-empty): **rebuild, don't replay** ~ atomically wipe
   the destination's patterns-derived records first, THEN re-ingest the
   whole file from byte 0 into a clean slate, and only commit the new
   cursor position once that rebuild completes. Only skip the wipe when
   the destination is ALSO genuinely empty (a true first-ever run) ~
   there, "ingest everything" needs no rebuild because there's nothing to
   collide with yet.

   **Not everything between the cursor and EOF is real data, either.**
   `patterns.md`'s own "How a promotion pass writes here" and
   "late-arriving capture" sections embed TWO fenced ` ```markdown `
   example blocks (illustrating the week-block and LATE ADDITION formats)
   and the file ships with a literal placeholder final header, `##
   {YYYY-MM-DD} (week of) ~ first entry lands here`, sitting after the
   cursor's start position until a real week actually gets promoted. A
   naive "read every `## ... (week of)` header past the cursor" pass
   would match all of these ~ the fenced examples' own literal
   `{YYYY-MM-DD}` headers, and the trailing placeholder ~ and try to
   ingest them as real recurrence data: a literal `{YYYY-MM-DD}` string
   fails date parsing outright (the same completeness-gate failure mode
   `delivery-log.md`'s own placeholder rows trigger, per item 1 above),
   or worse, some parsers would silently coerce it into today's date and
   record a fabricated week entry that never happened (Codex catch,
   2026-07-19). **Filter BEFORE reading week-blocks, not after:** strip
   any content inside triple-backtick fences (the two illustrative blocks
   live nowhere else in this file, so this is a safe, general rule, not a
   special case) and skip any header line whose date field is the
   literal, unresolved string `{YYYY-MM-DD}` rather than an actual date,
   before treating a `## ... (week of)` match as a real week-block to
   ingest. This is the same class of defense item 1's row-level `{...}`
   placeholder filter provides for `delivery-log.md` ~ `patterns.md`
   needs its own version because its scaffold takes a different shape
   (fenced docs + a trailing placeholder header, not a templated data
   row).

   **The write and the cursor-advance have to be atomic, or replay-safe
   some other way ~ a crash between them is a real failure mode, not a
   hypothetical.** If the ingestion job writes derived theme-tally
   records to the destination and THEN advances the cursor as two
   separate steps, a crash (or any interruption) after the write
   succeeds but before the cursor commits leaves the cursor pointing at
   its OLD position while the destination already holds THIS run's
   records. The next run re-reads the exact same now-already-ingested
   content and derives the same records again ~ but unlike a
   delivery-log upsert keyed on `(client, Period)`, a blind
   re-application of a theme-tally increment DOUBLE-COUNTS it, inflating
   AUTOMATE/REDESIGN confidence off a retry, not a real recurrence (the
   identical failure class the reset-handling paragraph above already
   solves for the wipe-and-rebuild path, just untreated here for the far
   more common incremental path). Fix: **derive a stable per-block key
   for each ingested bullet ~ but `{week-of date}#{tag: REWORK or
   PROCESS}#{theme, normalized}` alone is NOT that key.** It's unique for
   an ordinary week-block bullet (`patterns.md`'s own writing rule
   guarantees one bullet per distinct theme per week, see "How a
   promotion pass writes here" above), but a `LATE ADDITION to {week}`
   block can legitimately add ANOTHER bullet for that SAME week/tag/theme
   combination later ~ a further late-arriving `+1` on a theme this file
   already tallied for that week. That later bullet collides with the
   original on this three-part key, and an UPSERT-REPLACE on a colliding
   key overwrites the original bullet's count with the late addition's
   instead of folding the two together, silently dropping whichever
   contribution got overwritten and undercounting the exact recurrence
   signal AUTOMATE/REDESIGN read (Codex catch, 2026-07-19) ~ the same
   failure this key was built to prevent, just triggered by a second
   legitimate bullet instead of a crash replay. **The actual key needs a
   fourth part identifying WHICH bullet, not just which week/tag/theme:**
   `{week-of date}#{tag}#{theme}#{origin}`, where `origin` is `original`
   for the week-block's own bullet, or `late#{that late-addition block's
   own append position/byte offset in patterns.md}` for a LATE ADDITION
   bullet ~ since a file position never repeats, this disambiguates the
   original bullet from every subsequent late addition to the same
   week/tag/theme, including a second or third late addition to the same
   one. Store ONE idempotent contribution row per this four-part key
   (UPSERT-replace is safe again here, since each key now names exactly
   one bullet, never more) and SUM every row sharing the same
   `{week-of date}#{tag}#{theme}` prefix when reading a theme's running
   total ~ this is what actually folds a late addition's count into the
   week it names (per "How a late-arriving capture" above) instead of
   silently replacing what was already tallied there.
   With that key in place, re-processing the same bullet after a crash is
   a no-op regardless of whether the cursor actually advanced ~ the
   destination's per-key state is idempotent to replay, so the job
   doesn't need a strict cross-store transaction between two different
   systems (the patterns-derived records table and wherever the cursor
   itself lives) to stay correct; commit the cursor last, same ordering
   the reset-handling paragraph already uses, and a duplicate replay
   simply re-writes the identical value instead of compounding it.
2. **Add the two missing branches:** `REDESIGN` and `FIX_CORPUS` actions in
   the router (`lib/analytics.ts`), fed by rework tags + cadence data,
   **each windowed to a trailing 90 days, same principle §5a uses, but NOT
   the same cohort mechanism ~ don't implement one shared filter for all
   of it.** **FIX_CORPUS's window specifically is NOT unconditionally
   trailing-90-days ~ it carries the same Sep 4 rollout-epoch lower bound
   `ROADMAP.md` task 2.2 already requires for the manual version, until 90
   full post-epoch days have accumulated.** Touch 1.5 (the QA gate that
   actually records pre-send rework rounds) doesn't go live until Sep 4,
   so any dated `Rework tag` entry before that date reflects an
   under-instrumented period where QA-catchable defects went uncounted,
   not a genuine absence of rework. `lib/analytics.ts`'s earliest
   documented ship date is Oct 9 (`ROADMAP.md` task 2.3) ~ only 5 weeks
   past the Sep 4 epoch, so an unconditional trailing-90-day window at
   that ship date would still reach back into July, mixing pre-epoch
   under-instrumented rows into the SAME denominator/numerator as
   genuinely-gated ones and risking exactly the spurious "rollout looks
   like a rework spike" false fire task 2.2 already identified and fixed
   for the manual walkthrough (Codex catch, 2026-07-19: the coded version
   inherited the same bug the manual version was already patched for).
   Code the window as `max(trailing 90 days, Sep 4)` for its lower bound
   until the rolling 90-day window's own start date passes Sep 4 on its
   own, at which point the epoch clamp becomes a no-op and can stay in the
   code harmlessly rather than needing a removal step. REDESIGN's on-cadence/cycle-time reads stay row-level and
   `Due`-anchored (a row is in or out based on its own `Due` date).
   FIX_CORPUS's tag-share (gate b) AND rounds-per-report's NUMERATOR
   (gate a) are round-level instead, reading the IDENTICAL round set ~
   **filter individual
   dated `Rework tag` entries (each stamped `[YYYY-MM-DD]` at the moment
   it's logged, per `delivery-log.md`) to those whose OWN date falls in
   the trailing 90 days, across every row with STATUS `accepted` OR
   `revising (reopened)` regardless of that row's `Due`, AND whose OWN
   `Start` is ≥ Sep 4 (NOT bare
   `revising`, NOT `delivered`, and NOT `cancelled` either ~ see below for
   why).** **The `Start ≥ Sep 4` piece applies at the ROW level, gating a
   row's dated rounds out of the numerator entirely, not just its
   zero-round denominator seat ~ this is deliberate, and it's what
   actually closes the set (ii) loophole below.** A row whose `Start`
   predates the epoch had at least PART of its active correction window
   fall before touch 1.5 was systematically catching and recording
   issues, so its TRUE round total for that stretch is presumptively an
   undercount, not a verified zero or verified low number ~ even a round
   dated safely after Sep 4 on that same row doesn't rehabilitate the
   row's OVERALL count, because there could be more, unrecorded rounds
   sitting in the pre-epoch portion of its history that will never
   surface. Excluding the row's rounds from the numerator at the source
   means it can never re-enter through set (ii) either (which only admits
   a row that "contributed at least one round to the numerator" ~ a row
   that can't contribute to begin with can't qualify), closing the exact
   gap where a boundary-straddling cycle (`Start` before Sep 4, a stray
   round dated after it) could otherwise bypass set (i)'s `Start` floor
   and get treated as a complete, fully-instrumented report through set
   (ii) instead (Codex catch, 2026-07-19: an earlier draft only applied
   `Start ≥ Sep 4` to set (i)'s zero-round denominator test, leaving this
   exact numerator-level back door open). The tradeoff: a genuinely OLD,
   fully pre-epoch report (say, accepted back in July) that gets a late
   reopen after Sep 4 also can't corroborate gate (a) through that reopen
   ~ its reopen round IS reliably observed on its own, but the row it
   belongs to still carries an unverifiable pre-epoch history, and this
   rule doesn't try to distinguish "genuinely clean old report, late
   reopen only" from "boundary-straddling, partially instrumented"
   automatically. That's a deliberate, stated cost of keeping this rule
   simple and machine-checkable rather than a missed case ~ any client
   whose only recent evidence is a reopen on a pre-epoch report reads as
   `PROVISIONAL`/insufficient data for gate (a), same honest "not yet
   evaluable" treatment used elsewhere in this doc, until enough
   post-epoch-`Start` cycles exist to evaluate normally.** **`cancelled` rows feed a SEPARATE, corroborating count
   instead, computed alongside FIX_CORPUS but never mixed into gate (a)'s
   or gate (b)'s math:** tally each cancelled row's dated,
   corpus-tagged rounds and their `missing`/`not-followed` qualifier split,
   surface it alongside the FIX_CORPUS reading as additional context, but
   never let it change gate (b)'s ratio or gate (a)'s numerator. Two
   earlier drafts of this coded spec both broke on cancelled rows: the
   first put them in BOTH gate (a)'s numerator and gate (b), reproducing
   the numerator-without-a-denominator-place bug (a cancelled row never
   becomes a report, so it can never earn a place in gate (a)'s
   denominator below); the second moved them into gate (b) alone,
   reasoning gate (b) has no row-level denominator to protect ~ but that
   decoupled gate (b)'s "how much of the rework that cleared gate (a) was
   corpus-caused" answer from the reports it's actually describing (six
   `accepted` rows clearing gate (a) on pure `client-new-ask` rounds,
   plus one cancelled draft contributing six `quality-bar (missing)`
   rounds, would read 50% corpus-tagged and fire FIX_CORPUS off work
   attached to zero delivered reports, Codex catch, 2026-07-19). Keeping
   cancelled-row evidence in its own tracked count, corroborating but
   never blended in, is what actually closes both failure modes at once
   ~ see §5a for the full reasoning. Rounds-per-report's
   DENOMINATOR is a THIRD mechanism ~ the UNION of two row sets, not one:
   (i) rows with STATUS `accepted` OR `revising (reopened)` SPECIFICALLY
   (the SAME scope the numerator above reads, never bare `revising`,
   never `delivered`) with `Due` in the SAME epoch-clamped window the
   numerator uses (`max(trailing 90 days, Sep 4)`, above ~ NOT the
   unconditional trailing-90-days alone), INCLUDING
   zero-round rows (omitting clean rows here turns "rounds per report"
   into "rounds per reworked report," inflating gate (a) and firing it on
   noise). **PLUS a SEPARATE, ONE-TIME floor: `Start` must ALSO be ≥ Sep
   4, but as an INDEPENDENT condition, never folded into the same rolling
   window `Due` uses above.** Without this floor, a monthly cycle that
   STARTED before Sep 4 but happens to be DUE after it (Aug 10 start, Sep
   10 due, say) would pass the `Due`-only rolling-window clamp and enter
   the denominator as an apparently clean, zero-round report even though
   most or all of its pre-send correction window (touch 1.5) fell before
   touch 1.5 began recording rounds at all ~ any rounds that cycle
   genuinely had during that pre-epoch stretch are invisible to the
   numerator, so counting the row as clean dilutes rounds-per-report and
   can mask FIX_CORPUS's true signal during the epoch's first calibration
   window (Codex catch, 2026-07-19). **Don't fold this `Start` floor into
   the rolling window itself, though ~ requiring `Start` to fall inside
   the CURRENT trailing-90-day window too (not just past the fixed Sep 4
   line) overcorrects into a second bug:** months into the rollout, once
   the rolling floor has moved well past Sep 4 (say, evaluating in
   mid-January, trailing 90 days back to mid-October), a monthly cycle
   fully past the epoch (`Start` Oct 1, comfortably ≥ Sep 4) but started
   just before the CURRENT rolling floor, with `Due` Oct 20 still falling
   inside it, is an entirely ordinary, fully-instrumented report ~ that's
   exactly what §5a's `Due`-only test was always meant to include, and a
   `Start`-inside-the-ROLLING-window requirement would drop it in favor of
   a stricter rule the epoch problem never actually required (the epoch
   only ever needed a FIXED, one-time floor at Sep 4, never a second
   rolling requirement stacked on top of it); rows like this that DO
   carry an in-window round still get restored through set (ii) below
   regardless, so this specifically strips out zero-round boundary
   reports, inflating rounds-per-report the same way the original gap
   did, just approached from the opposite direction (Codex catch,
   2026-07-19: an earlier draft of this fix combined `Start` and `Due`
   into one shared rolling window and reintroduced exactly this bug; a
   still-earlier example here used a `Start` that itself predated Sep 4,
   which the numerator's own epoch gate above now correctly excludes
   anyway ~ replaced with this genuinely post-epoch case). The
   rule, stated as two independent conditions: `Start ≥ Sep 4` (fixed,
   permanent, never rolls forward) AND `Due` in `max(trailing 90 days,
   Sep 4)` (the ordinary rolling test above, unchanged) ~ satisfy both to
   count in set (i), never one combined window covering both fields;
   PLUS (ii) any `accepted`/`revising (reopened)` row (the
   numerator's own scope, unchanged) that
   contributed at least one round to the numerator above even though its
   OWN `Due` falls outside the window (the late-reopen-on-an-old-report
   case) ~ every row counted in the numerator MUST have a place in this
   denominator, or the ratio inflates at the edges and can divide by zero
   in a month where no row's `Due` lands in-window at all despite live
   reopen activity (Codex catch, 2026-07-19: first the zero-round-row
   omission, then the numerator/denominator population mismatch, then
   an accepted-only status restriction that dropped reopened rows, then
   a `delivered`/`revising`/`accepted` widening that over-corrected and
   let never-yet-accepted first-pass rows deflate the ratio; see §5a's
   worked examples and its "Why `accepted` OR `revising (reopened)`
   specifically" block for the full four-draft history). **Why this
   status scope, not `accepted`-only and not the broader
   `delivered`/`revising`/`accepted`:** `delivery-log.md` touch 4 now
   stamps a reopened row `revising (reopened)`, a status DISTINCT from
   bare `revising`, precisely so this gate can count a row that already
   reached `accepted` once (an established baseline, temporarily back for
   late feedback) without also pulling in a row still on its FIRST-EVER,
   never-yet-accepted pass (bare `revising`, no baseline yet) ~ that
   distinction is what makes both the numerator and the denominator use
   the identical `accepted`/`revising (reopened)` scope rather than two
   different ones. See §5a's "FIX_CORPUS's cohort
   works differently" block for the full reasoning. Coding the numerator
   as one shared
   row-filter (in or out by `Due`, same as denominator set (i) alone)
   reproduces the
   exact bug class §5a's history describes: a row spanning old and fresh
   rounds gets all-or-nothing counted instead of counted per round.
   **REDESIGN and HIRE
   are built on deliberately non-overlapping evidence** ~ this matters,
   see the note below:
   - rework rounds/report meeting or exceeding threshold FIRST (≥, not a
     strict `>` ~ same boundary as gate (a)'s own definition above) (rework
     has to be
     meaningfully frequent, not just present ~ a single tagged revision
     among many clean reports is noise, not signal), AND, counted at the
     ROUND level (not the row level ~ a row with one `brief-misalign`
     round and four `client-new-ask` rounds is 20% corpus, not 100%; the
     delivery log stores one tag per round so this is directly countable),
     ≥half of qualifying rework rounds tagged
     `brief-misalign`/`brand`/`quality-bar` → **FIX_CORPUS**, pointing at
     the exact corpus file to fix. Same
     two-gate order as §5a's manual version ~ frequency gate before
     tag-share gate, always. **Two more required checks before this branch
     fires, both already mandatory in §5a's manual version and equally
     mandatory here, not optional extras for the coded path:**
     - **Completeness gate, run FIRST, before any cohort/window filtering
       ~ against every `accepted` OR `revising (reopened)` row with
       `Rounds ≥ 1`, regardless of
       `Due`, PLUS every `cancelled` row with `Rounds ≥ 1` for the
       SEPARATE corroborating count above (same validation, different
       consequence: a `cancelled` row that fails it is excluded from the
       corroborating count only, it was never eligible for gates (a)/(b)
       to begin with).** Scoping this gate to `accepted`/`revising
       (reopened)` alone would leave the corroborating count reading
       whatever partial/undated tag entries a `cancelled` row happens to
       have as if they were complete, understating or misreporting the
       `missing`/`not-followed` split it's supposed to surface (Codex
       catch, 2026-07-19: §5a's manual procedure already validates
       `cancelled` rows before trusting them here; the coded version
       hadn't). Don't gate this on rows the round-level date filter
       already surfaced ~ a row whose only recent activity is an UNDATED
       round never gets a valid date to test against the 90-day window in
       the first place, so running this check only on rows that already
       cleared the window filter would let exactly that row skip
       validation entirely (Codex catch, 2026-07-19). Tag entry count MUST equal `Rounds` exactly, AND every
       entry MUST carry a valid, parseable `[YYYY-MM-DD]` date ~ a bare
       `none` on a `Rounds ≥ 1` row, any partial mismatch (fewer
       entries than `Rounds`), or any entry missing/malformed on its date
       suffix, excludes that row from BOTH gates, not
       just the tag-share calculation (gate b) ~ **gate (a)'s numerator
       counts the same dated entries, so an incomplete OR undated row
       silently
       undercounts it too** (a `Rounds = 3`/2-entries row reads as 2
       rounds, not 3; an entry with no date can't be tested against the
       trailing-90-day window at all and just as silently drops out),
       which can drop the frequency average below
       threshold and stop the check at gate (a) before gate (b) is ever
       reached, reading FIX_CORPUS as absent when the honest state is
       "incomplete data, can't be evaluated" (Codex catch, 2026-07-19 ×2:
       first the entry-count case, then the same false-absence failure
       mode one field over for missing dates). Hard-block the conclusion
       if enough rows
       are affected to plausibly swing EITHER gate's threshold either way
       (`delivery-log.md`'s own gate, same reasoning, same code needs to
       enforce it here that a human enforces by hand in §5a).
     - **Cause-qualifier gate:** ≥half tagged corpus-cause is necessary but
       not sufficient to fire an EDIT-THE-CORPUS action. Read the
       qualifier attached to each qualifying round's tag entry (`missing`
       vs `not-followed`, e.g. `brand (not-followed/brand-standard)` ~
       SLASH-separated, never comma-separated, since a comma inside one
       entry's parenthetical would parse as a second round entry against
       this same cell's top-level comma-separated list ~ for
       `brand` specifically, ALSO read the qualifier's second component
       (`house-voice`, `brand-standard`, or `report-template-rules`) to
       resolve which of the three
       files check 2 actually failed against before prescribing an edit ~
       chosen INDEPENDENTLY of the missing/not-followed cause component,
       never inferred from it (a `not-followed/house-voice` reading is
       just as real as `missing/brand-standard` or
       `missing/report-template-rules` ~ don't default `missing`
       to one file or `not-followed` to another; see
       `delivery-
       log.md`) before prescribing a corpus edit: majority `not-followed`
       means the corpus was already correct and this isn't a real gap ~
       surface it
       as "high rework, but not corpus-caused per qualifier, check
       execution/process instead" rather than pointing at a file to edit.
       Only a majority-`missing` reading actually fires the corpus-edit
       action. Implementing the tag-share threshold alone, without this
       qualifier check, would have the coded router repeatedly prescribe
       edits to an already-correct corpus file ~ exactly what the manual
       rule (§3, and this section's own rounds-per-report rule above)
       exists to prevent. **The all-rounds bar is the actual test, coded
       and evaluated FIRST, standing on its own ~ NOT an "AND" alongside
       the subset-majority check:** the missing-qualified round count
       clearing ≥half of ALL qualifying rounds from gate (a) fires the
       corpus-edit action BY ITSELF, whether or not `missing` is also a
       strict majority within the smaller corpus-tagged subset (e.g. 3
       `missing` + 2 `not-followed` + 5 `client-new-ask` = 10 rounds: the
       5 corpus-tagged rounds clear gate (b)'s ≥half-tagged bar, and
       `missing` is the majority within that 5, but `missing` ÷ ALL 10
       rounds is only 30% ~ this reading does NOT clear the all-rounds
       bar, so the corpus edit correctly does NOT fire here; see §5a's
       full worked example). **Coding this as a strict conjunction
       ("majority within subset AND clears all-rounds bar") breaks at
       exactly one boundary an earlier draft of this coded spec missed:**
       5 `missing` + 5 `not-followed` = 10 total rounds, all tagged ~
       `missing` clears the all-rounds bar at exactly 5/10 = 50%, but 5 vs
       5 within the tagged subset is a TIE, not a strict majority, so a
       strict-conjunction implementation would fail the subset-majority
       half of the AND and suppress the edit off the exact reading the
       all-rounds bar exists to confirm (Codex catch, 2026-07-19). Code
       the all-rounds bar as the primary, sufficient test; only evaluate
       the subset-majority/tie logic below when it does NOT clear. A row
       that clears
       subset-majority but not the all-rounds bar reads the same as a
       majority-`not-followed` case: real evidence for HIRE's
       portfolio-wide gate, but the corpus-edit action does NOT fire.
       **This surfaced finding still has to feed HIRE's
       portfolio-wide gate, not just a UI label.** A majority-`not-followed`
       reading doesn't fire the corpus-edit action, but it's still real
       evidence for the SAME narrow-vs-portfolio-wide test the REDESIGN
       branch below already runs (§5a step 2's clustering-first note):
       CLUSTERED to one client/analyst, code it as a narrow FIX_CORPUS-
       family signal that blocks HIRE for that scope; BROAD across most
       clients/analysts alongside elevated team-wide WIP/load, code it the
       same as REDESIGN's own broad case ~ don't let it block HIRE.
       Dropping this into a plain surfaced-but-inert warning would let the
       coded router fire HIRE off a coaching/execution problem exactly
       where §5a's manual walkthrough is required not to (Codex catch,
       2026-07-19). **Missing qualifiers and genuinely-tied
       qualifiers are DIFFERENT states ~ only one of them is provisional:**
       - **Missing (require ONE recognized qualifier ~ `missing` or
         `not-followed` ~ attached to each corpus-tagged qualifying
         round's tag entry before this gate can resolve at all):** a
         qualifying round can clear BOTH the tag-count completeness gate
         above (entries == `Rounds`) AND still carry no qualifier
         suffix on its tag. Don't let that silently resolve to "no
         majority found, treat as not-fired" ~ that reads as "FIX_CORPUS
         checked, ruled out" when the honest state is "FIX_CORPUS can't be
         evaluated, qualifier data is incomplete," the same false-absence
         failure mode the tag-count completeness gate exists to prevent,
         one layer deeper. Genuinely missing qualifiers on enough rounds
         to plausibly swing the read: mark this client's FIX_CORPUS-vs-
         execution question **PROVISIONAL** (same status, same
         consequence, as REDESIGN's provisional state in step 2 above) ~
         it blocks downstream HIRE conclusions until the missing
         qualifiers actually get filled in, since there's real missing
         data to wait for.
       - **Genuinely tied (every qualifying round HAS a recognized
         qualifier, and the `missing`/`not-followed` counts land exactly
         equal):** this is NOT provisional ~ there's no missing data left
         to fill in, and no future accepted row is guaranteed to ever
         break the tie, so treating it as "blocked until resolved" could
         block indefinitely. **But check the all-rounds bar BEFORE
         treating a tie as "no action" ~ a tie is only a definite
         no-fire outcome when `missing` alone does NOT also independently
         clear ≥half of ALL qualifying rounds.** 5 `missing` + 5
         `not-followed` out of 10 total rounds is a tie within the tagged
         subset, but `missing` alone is still 50% of ALL rework ~ exactly
         the confirmed-corpus-gap reading the all-rounds bar exists to
         catch, so THAT case fires the corpus edit same as any other
         all-rounds-bar clear and DOES block HIRE, it never falls into
         "resolved tie, no action" just because the narrower subset
         happened to land even (Codex catch, 2026-07-19). Only once the
         all-rounds bar is confirmed NOT cleared is a tie a fully-evaluated,
         DEFINITE no-fire outcome: it fails to clear the majority-`missing`
         bar the corpus-edit action requires (same as a majority-
         `not-followed` reading would), so FIX_CORPUS's corpus-edit action
         does NOT fire ~ but this is a resolved "checked, no clear
         corpus-cause majority" finding, not an open question, and it does
         NOT block HIRE. Surface it plainly either way ("mixed cause,
         tied `missing`/`not-followed` ~ worth a look at both the corpus
         file and execution/process, no single fix indicated") rather than
         silently picking one interpretation.
     **This is NOT just a visibility warning here either ~ code the same
     conditional block §5a's manual version requires.** When bare
     `revising` rows (first-ever, never-yet-accepted pass ~ a
     `revising (reopened)` row is already counted, so it's not part of this
     backlog) with elevated `Rounds` have been open unusually long, the
     `accepted`/`revising (reopened)` calculation above is a lower bound
     (survivorship bias,
     §5a's note) ~ if that backlog is large or corpus-tagged enough to
     plausibly flip the reading (below-threshold to above, or
     `not-followed`-majority to `missing`-majority), mark FIX_CORPUS
     PROVISIONAL and gate HIRE on it, exactly like the missing-qualifier
     case above. Implementing this as a surfaced-but-non-blocking warning
     would let the coded router emit HIRE during an active quality
     incident (many rows still unresolved, tags still provisional) in
     precisely the scenario the manual router is required to wait on ~ the
     automated and manual paths would disagree on the same data.
   - on-cadence rate below threshold, OR cycle time trending up against
     baseline while on-cadence still narrowly holds (the early-warning
     path ~ §2), where the rework on those specific cycles (if any),
     **read from `accepted` OR `revising (reopened)` rows of those cycles
     ONLY** (the SAME trusted scope FIX_CORPUS's own numerator/denominator
     already use, for the same reason ~ a reopened row already carries an
     established `accepted` baseline and its own dated rounds, settled
     evidence, not a provisional guess; Codex catch, 2026-07-19: an
     earlier draft of this bullet restricted to `accepted` alone, dropping
     a reopened row's established rework history and disagreeing with how
     FIX_CORPUS already reads the exact same rows), is low or isn't
     corpus-tagged. **This restriction matters, don't implement the bullet
     without it:** a late row still sitting `open`/`delivered`/bare
     `revising` (never yet accepted at all)
     carries a provisional tag ~ its default `0`/`none`, or whatever it
     currently holds, could still change before the row finalizes (a
     `brief-misalign`/`brand`/`quality-bar` revision landing later), and
     firing REDESIGN off that provisional state risks emitting the wrong
     route from a row whose real rework outcome isn't known yet (§5a's
     matching rule works the same way, same reasoning). **Exclude
     `cancelled` rows from this qualifying set entirely, even ones
     cancelled after `Due`** ~ `cancelled` is terminal in `delivery-log.md`'s
     state machine and never reaches `accepted`, so a cancelled row can
     never satisfy this bullet's "read from `accepted`/`revising
     (reopened)` rows" condition;
     counting it toward "too few late/trending cycles accepted yet" would
     wait on data that can never arrive and hard-block PROVISIONAL
     permanently instead of until-resolved (same reasoning as §5a's
     matching exclusion). The cancelled row still counts in the on-cadence
     rate itself if it was cancelled after `Due` ~ only this qualifier
     read excludes it. If too few of the (non-cancelled) late/trending
     cycles are `accepted`/`revising (reopened)` yet to read this qualifier
     meaningfully, don't fire either REDESIGN or hold it back confidently
     ~ surface it as provisional, same as §5a does by hand. **AND the
     misses cluster** (one client, one
     handoff step, one identifiable process) rather than spreading broadly
     across most clients/analysts at once → **REDESIGN** candidate. The
     clustering check is load-bearing, not decoration: a broad, uniform
     slowdown co-occurring with elevated team-wide WIP/load is capacity
     exhaustion, and REDESIGN claiming it would make HIRE structurally
     unreachable in exactly the scenario it exists to catch ~ the same
     class of bug as the on-cadence/HIRE overlap fixed earlier in this doc
     (Codex catch, 2026-07-18). This condition is self-contained (doesn't
     reference FIX_CORPUS's output) by design ~ both branches read the
     same rework-tag data independently, so which one evaluates "first" in
     code never changes the answer for a given cycle. This is the
     workflow/scheduling signal ~ on-cadence and cycle time live here and
     nowhere else in the router, and only when there's a specific place to
     point at.
   - HIRE requires ALL of: sustained load over the structural line (the
     live rule) AND WIP per analyst sustainedly elevated vs baseline (the
     capacity-ceiling signal ~ independent of cadence, threshold defined
     in §2), **read at the SAME dynamically-derived roster-wide bar this
     section defines
     below for the narrow-signal scope test ~ MORE THAN HALF of the full
     roster individually clearing WIP's elevation threshold, never "at
     least one analyst" or "elevated in aggregate."** `6`-person roster
     and `≥4` elevated are TODAY's concrete numbers, not hard-coded
     constants ~ **code this as "more than half of the CURRENT active
     roster count," re-derived from the roster's actual size at each
     evaluation, never a literal `6`/`4` baked into the router.** A
     roster that grows to 8 without this recomputing would still compare
     against the stale `≥4`, and 4-of-8 is no longer a majority ~ the
     coded router would keep clearing a base predicate that no longer
     means what it's supposed to mean the moment headcount changes,
     which is exactly the outcome this instrument exists to inform, not
     silently misjudge (Codex catch, 2026-07-19). Track roster size as
     its own maintained value (updated whenever someone joins or leaves,
     the same maintenance discipline `brief.md`'s lead-analyst field
     already gets), and derive `≥4` (or whatever "more than half" of the
     current count works out to) from it at evaluation time ~ never a
     separately-maintained, easy-to-forget second number that can drift
     out of sync with the actual roster. This is the BASE
     predicate, evaluated even when no narrow AUTOMATE/REDESIGN/FIX_CORPUS
     signal exists to scope-map against at all ~ without stating the
     breadth requirement here too, a reading of "WIP sustainedly elevated"
     that's satisfied by just one or two analysts running hot could pass
     this bullet on its own and let HIRE fire off a genuinely narrow
     capacity problem, which is exactly the "one client, one handoff"
     pattern REDESIGN (or a redistribution) should absorb instead, not a
     portfolio-wide hire. Use the identical fixed-roster counting rule
     defined below (count elevated analysts against ≥4-of-6 directly; an
     analyst without sufficient WIP data can't be counted as elevated,
     never shrink the denominator to "analysts with data this cohort") ~
     one ≥4-of-6 rule, read twice: once here as the unconditional base
     gate, once below as the scope test that additionally maps a NAMED
     narrow signal's analysts against it. AND WIP DATA COVERAGE ≥70% of the full roster (≥5 of 6 today,
     each individually clearing the ≥7-of-10-valid-observations bar ~ its
     own gate, separate from DATA below, since Q3 can go unanswered
     independently of Q1/Q2; below this floor WIP is insufficient-coverage
     and can't corroborate HIRE, same effective outcome as DATA failing to
     clear ~ see §3's fuller reasoning) AND capchecker's REBALANCE not currently firing WITH GENUINE
     HEADROOM behind it (no single analyst absorbing the load while the
     REST of the team, excluding that outlier, sits comfortably below the
     structural line ~ ≤5, v1 seed. REBALANCE's raw relative-gap trigger
     alone isn't enough: 5 analysts at 6 + 1 at 8.5 satisfies the ≥2pt gap
     while the team average [6.42] is already at the overload line, with
     nowhere to redistribute into. v2 code needs the absolute-headroom
     check computed alongside the raw REBALANCE flag, not the flag alone)
     AND capchecker's DATA signal NOT
     currently firing (response rate ≥70%/7d, ≥10 days history ~
     "team-wide maxed" is only a real claim when the responding sample
     actually represents the team) AND automate + redesign + fix-corpus
     not firing **portfolio-wide** ~ a narrow signal scoped to one client
     or theme, isolated from broad WIP/load elevation, shouldn't count as
     an explanation. **v1 code check, defined at the ANALYST level, not
     the client level:** WIP and perceived load are both analyst-level
     signals with no client attribution ~ capchecker's `client_count` is a
     headcount, not a per-client breakdown, and Q1/Q2's load rating has
     none either ~ so a test phrased as "fraction of CLIENTS showing
     elevated WIP/load" has no data behind it to actually run. What's
     knowable instead: which ANALYST(S) own the narrow signal's named
     client(s) and whether WIP/load
     elevation is confined to THOSE analyst(s) or spans most of the
     roster. So: map the narrow signal's client(s) to their analyst(s) ~
     **read the CURRENT owner from `brief.md`'s Snapshot table ("Amplifi
     lead analyst: {name} · backup: {name}"), NOT the delivery-log's most
     recent row.** `Analyst` on a delivery-log row records whoever
     delivered THAT ONE cycle, which isn't the same question as who
     currently owns the account: a backup who shipped a single cycle
     covering for the lead's leave becomes "most recent" the moment that
     row lands, even after the lead has already resumed the account and
     simply hasn't shipped the NEXT cycle yet at walkthrough time ~
     mapping through the delivery log alone can point the scope test at
     the wrong analyst's WIP/load entirely. `brief.md`'s lead-analyst field
     is the deliberately-maintained, current-as-of-now ownership record
     (updated whenever ownership actually changes, not just whenever
     someone happens to ship); it's the ONLY source for this mapping.
     **This mapping is only as good as the name's spelling, though ~
     `brief.md`'s own field note now requires the EXACT capchecker
     identity here, same rule `delivery-log.md`'s `Analyst` field already
     had, since this field, not `Analyst`, is what THIS join actually
     matches on** (Codex catch, 2026-07-19: `delivery-log.md`'s
     exact-spelling rule doesn't protect this specific join, because this
     step deliberately reads `brief.md` instead of `Analyst`).
     **If `brief.md`'s field is itself still templated/unfilled for that
     client, do NOT fall back to the delivery-log's most recent row ~
     that reintroduces the exact attribution error described above:** a
     backup who covered a single cycle reads as "most recent" there too,
     and delivery-log's `Analyst` still only answers who shipped last, not
     who owns the account now, unfilled `brief.md` field or not (Codex
     catch, 2026-07-19). Treat that client's current ownership as
     genuinely unknown instead: mark the scope test unevaluable/
     data-blocked for that client specifically (don't silently guess an
     owner and don't silently drop the client from the count either) and
     flag the missing `brief.md` field as a data-hygiene gap to close
     before the next walkthrough. Is WIP/load ALSO
     elevated only for that same small
     set of analysts, or for most of the team? **"MOST," defined exactly,
     not left to operator judgment, and ANCHORED TO THE FULL ROSTER, not
     just whoever has data this cohort:** more than half of the roster's
     ACTUAL CURRENT headcount ~ the SAME dynamic derivation this doc's
     unconditional base predicate above already uses, re-derived from
     today's real roster size at every walkthrough, never hard-coded to
     "6"/"4" as fixed numbers that quietly go stale the moment the team
     grows or shrinks (`6`-person roster and `≥4` elevated are TODAY's
     concrete numbers, illustrative only, not the rule itself ~ Codex
     catch, 2026-07-19: this narrow-signal override restated the roster
     size as a fixed constant even after the unconditional base predicate
     above was fixed to derive it dynamically, so the two tests could
     disagree the moment headcount changed), regardless of how many
     analysts happen to clear the WIP
     observation-completeness bar this cohort. **Do not shrink the
     denominator to "analysts with sufficient data" here** ~ that's a
     different question (§2's WIP row already gates whether WIP can
     corroborate HIRE AT ALL on a separate ≥70%-roster-coverage floor); if
     THIS test's denominator shrank too, a thin-but-passing-coverage month
     (say 5 of 6 with data) would silently lower the portfolio-wide bar to
     3-of-5-elevated, when genuine portfolio-wide evidence still means
     reaching most of the ACTUAL team, not most of whoever reported in.
     Count elevated analysts against the dynamically-derived bar directly; an
     analyst without sufficient data simply can't be counted as elevated
     (missing data isn't evidence of elevation), which makes reaching the
     bar harder when coverage is thin, exactly as it should be ~
     thin coverage should make broad evidence HARDER to establish, never
     easier. Record the exact headcount
     used (full roster size, how many had sufficient data, how many of
     those read elevated) in `router-decisions.md`'s threshold snapshot
     alongside the other signals, so a borderline month is reproducible,
     not re-litigated. **Confined to the narrow
     signal's own analyst(s) DOES block HIRE** ~ their already-named
     problem plausibly explains all the observed strain, so that gets
     fixed first, not hired around. **Elevation reaching the dynamically-derived
     more-than-half-of-roster bar, COUNTED EXCLUDING the narrow signal's own named
     analyst(s), does
     NOT block HIRE** ~ a client-scoped fix can't explain strain in
     analysts who were never part of that narrow signal at all, so letting
     it rule out HIRE there would wrongly suppress a genuine portfolio-wide
     need. **This exclusion is required, not descriptive color:** simply
     reaching the bar elevated in TOTAL doesn't by itself prove the
     elevation survives independently of the narrow signal ~ if exactly
     enough analysts to clear the bar are elevated and one of them happens to BE one of the narrow
     signal's own named analysts, fixing that signal would plausibly drop
     the count below the bar, meaning that reading was never
     independently portfolio-wide to begin with (with several
     narrow-signal-named clients, this can explain most of that count).
     Compute the count as: of the roster's ACTUAL CURRENT headcount, how many analysts
     who are NOT among the narrow signal's own named analyst(s) read
     elevated? Only THAT count clearing more than half of the current roster overrides the block ~ counting
     every elevated analyst including the narrow signal's own would let a
     narrow, already-explained problem masquerade as broad evidence
     (Codex catch, 2026-07-19: this was inverted in an earlier draft of
     this section, and the exclusion itself was still missing even after
     that fix). The roster DENOMINATOR still never shrinks (stays the
     FULL current roster, per the "do not shrink to analysts with sufficient data" rule
     above) ~ only the narrow signal's own analyst(s) are excluded from
     the NUMERATOR being counted toward the override, nothing else about
     the bar changes. (A future capacity feed with real per-client task attribution,
     not just a per-analyst count, would let this run at the finer client
     grain the original draft assumed ~ noted as a possible roadmap-level
     capchecker enhancement, never a v1 blocker; see `ROADMAP.md`.) ~ the
     chain enforced in code, not just in prose. **HIRE never reads
     on-cadence or cycle time.** A cadence problem is, by construction, a
     REDESIGN or FIX_CORPUS matter first; if HIRE also required cadence
     degraded as corroboration, any miss severe enough to justify a hire
     would have already tripped REDESIGN or FIX_CORPUS and blocked HIRE
     from ever firing ~ the chain would look real but be structurally
     unreachable (Codex catch, 2026-07-18: the original v2 draft required
     on-cadence for both). WIP elevation is the corroborating signal
     precisely because it's independent of the cadence-based branches.
     Load alone, with WIP not corroborating, still never fires HIRE ~ it
     routes to WATCH instead.
3. **Panel order = chain order.** Signals display automate → redesign →
   fix-corpus → hire (severity shown, but position tells the story: hire
   sits last visually, always).
4. **Theme keywords sharpen** from real accumulated reasons (v1 list is
   generic by design; an LLM pass can replace keyword matching later).

## 6. What Michele sees

- **Daily (live today):** 10:00 Telegram summary ~ team average, everyone's
  load + reason sorted most-loaded first, strain-zone flags, non-responders.
- **Anytime (live today):** the dashboard ~ KPI tiles, heatmap, trend,
  signal panel with plain-language detail lines.
- **Monthly (live today, manual ~ §5a):** the full router summary line, the
  one she defends to Mells ~ *"Rework on Client X crossed threshold in week
  6 → routes to corpus fix (brief-alignment), not a hire."* Written by
  hand from the delivery logs + dashboard, fifteen minutes, no automation
  required. Readable in 30 seconds. Defensible in one line. Real from
  week one of having data, not from whenever software ships.
- **Once §5b lands (60–90d):** the same line, generated automatically in
  the dashboard instead of hand-assembled. Convenience, not capability ~
  the capability is already there.

## 7. Baselines & calibration (v1 honesty)

Thresholds can't be known upfront ~ v1 sets baselines, reality sharpens
them. Say it plainly; it's not a weakness, it's the method.

**Elapsed weeks aren't the same as completed cycles, and that matters
here.** A weekly-cadence client has ~4 completed reports by week 4 ~
enough for a rough trend. A monthly-cadence client has exactly ONE. One
data point isn't a baseline, it's an anecdote ~ treating week-4 as
"calibrated" for a monthly client would let a single early-or-late report
silently become the number REDESIGN/FIX_CORPUS get judged against. So
calibration is gated on **completed cycles per client, not calendar
time**:

| Phase | What happens |
|---|---|
| Weeks 1–2 | delivery logs start filling; capchecker keeps accumulating post-epoch data |
| Weeks 3–4 | **First manual router walk-through (§5a) happens here, as PRACTICE, not as a trusted baseline** ~ weekly-cadence clients have enough completed cycles by now for a rough real read; monthly-cadence clients have one data point, so treat any monthly-client REDESIGN/FIX_CORPUS call from this walkthrough as provisional and say so out loud, not as calibrated fact. Michele sets first-pass thresholds (her gut numbers ~ the seed, not the truth) |
| Per client, once ≥3 completed cycles exist | **THIS is when a client's baseline is actually trustworthy** ~ weekly clients: ~3 weeks in. Bi-weekly: ~6 weeks. Monthly: ~3 months. Don't force a single elapsed-time milestone across cadences that move at different speeds; gate trust on sample size, not the calendar. Until a client crosses this bar, pool it qualitatively with `patterns.md`'s cross-week themes rather than trusting its own thin numbers in isolation. |
| Weeks 5+ (team-wide) | thresholds calibrate against real distributions as more clients cross their own 3-cycle bar; quarterly review with Michele; manual router walk-through continues monthly whether or not §5b's automation has shipped yet |

**Ongoing calibration + evolution is the continuing relationship** ~
thresholds are living numbers, and the instrument reads the whole system
(corpus health included), so it keeps earning its keep as Amplifi grows.

## 8. Hard rules (unchanged from canon)

- **Owned + portable:** signal data lives in the corpus (markdown logs) and
  a Supabase Michele can export any day ~ migration runbook already written
  (`MIGRATION.md` in the capchecker repo). No vendor lock on the data layer.
- **Runs on their stack:** Drive + Telegram + the tools they already touch.
- **~5 signals, not 20.** A COO reads it in 30 seconds or it's wrong.
- **Not a hire/no-hire binary.** A router with an evidence trail.
- **Feeding it is never a second job.** 3 taps daily + one row per shipped
  report (~30s at ship, ~30s finalizing rounds at client acceptance).
  That's the entire cost.

## The lines to hold

- "Hire is the last resort on the router, not the first reflex."
- "This tells you *why* it's a hire, not just *that* it's a hire ~ that's
  what you defend to Mells."
- "The vault is yours. The lens is rented."
- "v1 sets baselines. Reality sharpens the thresholds."

*Reads: the whole system. Depends on: Deliverable 1 (delivery logs), 2
(rework tags gain meaning), capchecker (live capacity feed).*

*Chiibitsu Labs ~ more human, by design.*
