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
| **WIP per analyst** | active clients/tasks in flight per person, from capchecker's `client_count` field (Q3, parsed to a number) | capchecker (daily Q3) | the "full hands" ceiling. **v1 threshold, same pattern as capchecker's other signals:** WIP baseline = per-analyst average `client_count` over a **FROZEN** reference window ~ the first 10 working days once `client_count` data starts (mirrors `SCALE_EPOCH`'s frozen-reference pattern, not `minHistoryDays`'s rolling one). **The healthy-window guard applies to THIS initial freeze too, not just quarterly recalibration** ~ there's no prior baseline to compare the first window against, so the check instead cross-reads capchecker's perceived-load signal (Q1, already live daily) over that same first-10-days window: if load is ALSO reading structurally elevated during it (not just a rough day or two), that's a sign tracking started mid-overload, and the initial window normalizes strain instead of measuring a genuine baseline ~ the exact failure mode the quarterly guard exists to prevent, just hit on day one instead of at a quarterly boundary. In that case, don't freeze from this window: flag it to Michele and either **discard it entirely and start a fresh 10-working-day window once load reads normal** (extending the same tainted window by appending more days still leaves the original overloaded days inside the average, keeping the frozen baseline elevated and making later `baseline + 2` breaches harder to reach than they honestly should be ~ the average has to be over a genuinely clean window, not a padded one), or seed the baseline manually from her judgment of what a normal WIP count looks like, noting it as a judgment call to revisit once a genuinely calm window is observed. **A second, independent gate on the same window: per-analyst observation completeness.** The healthy-window check above validates that the window isn't a hidden overload; it says nothing about whether a given analyst actually ANSWERED enough of it to average meaningfully ~ Q3 is one of three daily taps and can go unanswered like any of them, and an analyst who logs a parseable `client_count` on only 2 of the 10 window days can have their personal baseline set almost entirely by whichever 2 days happened to be light, making every ordinary day afterward misread as `baseline + 2` sooner than it honestly should. Require, per analyst, **at least 7 of the 10 window days with a valid parsed `client_count`** before freezing THAT analyst's baseline (mirrors DATA's own ≥70%/7d response-rate bar, same reasoning, applied to WIP instead of daily-checkin-as-a-whole) ~ an analyst who falls short gets their window quietly extended a few more working days rather than frozen on a thin sample, flagged to Michele as running on a manual/unseeded baseline meanwhile. **Extension defined precisely, not left as "add some more days":** extend one working day at a time and re-test after each ~ does the analyst's MOST RECENT 10 working days (a sliding 10-day window, not a growing one) now contain ≥7 valid observations? Stop extending the moment yes. Freeze the baseline from THAT final 10-working-day window specifically (average the valid observations within it, not every observation collected across the whole extended span ~ older days that fell out of the final 10-day window don't count, same as they wouldn't for an analyst who cleared the bar on day one). Re-apply the healthy-window guard (the perceived-load cross-check, above) to this SAME final window before freezing, not just the original first 10 days ~ extending for observation-completeness doesn't exempt the extended window from also needing to be a genuinely healthy one. This is a per-analyst gate, not a per-team one ~ one analyst's sparse week shouldn't hold up freezing everyone else's baseline on schedule. **Deliberately not a continuously-rolling trailing average** ~ a rolling baseline absorbs the same sustained increase the threshold is supposed to catch (10 days at 3, then a genuine step up to 5: a rolling baseline creeps from 3.0 toward 3.2 on day one of the increase, chasing the threshold it's compared against, so a real sustained rise can mathematically never clear "baseline + 2" ~ Codex catch, 2026-07-18). WIP threshold = `client_count` ≥ frozen baseline + 2, sustained on ≥5 of the last 10 working days (a lower bar than load's `structuralDays: 7` since WIP moves more slowly, day to day, than a self-rated feeling) ~ **and the same ≥7-of-10-valid-observations bar from the initial freeze applies to EVERY evaluated 10-day window, not just the freeze itself.** Q3 can go unanswered or come back unparsable independently of the other two daily taps, so an analyst with only 5 valid `client_count` readings (all of them high) and 5 missing/unparsable ones in the current window could technically satisfy "≥5 of the last 10 working days ≥ baseline + 2" on a half-empty sample, even while capchecker's general DATA flag stays clear off their Q1/Q2 answers. Require the same ≥7-of-10-valid-`client_count` coverage before letting a live window corroborate HIRE ~ a window that falls short doesn't clear WIP's threshold either way, it's read as insufficient data and flagged, not as evidence of anything. The frozen baseline itself still recalculates only at quarterly calibration (§7) ~ **and only from a window confirmed to be healthy, never blindly from "whatever the last N days looked like."** A blind quarterly reset reproduces the exact bug the freeze exists to prevent: if WIP rose from a genuine baseline of 3 to a sustained breach at 5 shortly before a quarterly boundary, recalculating from the most recent days would set the new baseline to 5 and the new threshold to 7 ~ silently clearing an overload that was never resolved, just relabeled as normal. Rule: if the WIP threshold is CURRENTLY firing (or fired at any point in the window under consideration) when quarterly calibration comes around, carry the OLD baseline forward unchanged rather than recalculating from an active-breach window; only recalculate from a period that was itself below threshold, confirming it reflects genuinely healthy load, not a new-normal that's actually still the problem (Codex catch, 2026-07-18). Gut-seed like every other v1 number here ~ Michele adjusts the FORMULA (window length, +2 margin) at quarterly review, and the baseline VALUE only from confirmed-healthy data ~ **at the initial freeze as well as every quarterly recalibration after it** ~ never mid-cycle and never from an unresolved breach. Without a stated number, "WIP sustainedly elevated" isn't checkable and two people could read the same dashboard and disagree ~ this is that number, however roughly. |
| **Perceived load** | daily 1–10 self-rating + reason | capchecker (Q1+Q2) | earliest warning ~ people feel strain before metrics show it |
| **Cycle time per report** | period start → delivered | delivery log | rising = falling behind cadence; the early-warning half of REDESIGN's evidence (see §3) ~ cycle time can trend up for weeks before it actually breaches the due date and shows up in on-cadence rate. **v1 threshold, same frozen-reference pattern as WIP above, so "trending up" is a checkable number instead of a vibe:** `Delivered − Start` is counted in **WORKING days, not calendar days** ~ same unit as WIP's window and the 5-business-day silent-acceptance rule elsewhere in this doc, for one consistent business calendar across every signal here rather than mixing units; a Friday `Start` to Monday `Delivered` is 1 working day, not 3 calendar days, and holidays follow whatever calendar capchecker/the team already treats as non-working (no new calendar to maintain). Per-client baseline = that client's average `Delivered − Start` WORKING-day span over their first 3 completed cycles ~ reuses §7's existing ≥3-completed-cycles mark (the point §7 already calls a client's own numbers trustworthy) instead of inventing a second threshold. **Healthy-seed guard, same principle as WIP's above, but no live independent cross-signal exists here to automate it against** ~ WIP could cross-check perceived load because both are captured in real time; cycle time's first 3 cycles are, by construction, the ONLY data that exists yet, so there's nothing independent to compare them against. A client whose first 3 cycles are already slow but still narrowly meet `Due` would freeze that slowness as "normal," and neither on-cadence (still clean) nor the `+20%` threshold (measured against an already-elevated baseline) would ever catch it. So this gate is a human judgment call, not a code check: before trusting the freeze, Michele/Rica confirm out loud that the seed cycles reflect ordinary pace ~ not a client's first-ever onboarding cycles, not a known short-staffed stretch, nothing already flagged as unusual. If there's real doubt, don't freeze silently: seed the baseline manually from Michele's judgment of what normal cycle time looks like for that cadence (same manual-seed fallback WIP offers), and revisit once enough cycles exist to judge it properly. FROZEN, not rolling, same reason as WIP's baseline: a rolling average would absorb the exact sustained slide this signal exists to catch. "Trending up" = the client's trailing-90-day cohort (§3's fixed-cohort rule) average cycle time exceeds the frozen baseline by ≥20% ~ gut-seeded like every other v1 margin here, Michele adjusts at quarterly review. Recalibrates only at quarterly review, from a confirmed-healthy window ~ same guard as WIP's baseline (above): never recalculate from a window where cycle time is itself currently trending up, or the baseline just relabels the slide as the new normal. |
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
                 present) AND, of the individual revision ROUNDS behind
                 that rework (not the rows ~ a 5-round report with one
                 brand fix and four client-new-ask fixes is 20% corpus,
                 not 100%), half or more are tagged brief-misalign,
                 brand, or quality-bar ~ their exact loudest pain, and
                 the two-gate order that keeps one stray tag from firing
                 this on its own (see §5). **Data-quality gate, TWO forms,
                 both hard-block:** (a) an accepted row with `Rounds ≥ 1`
                 but `Rework tag = none` is untagged, not zero-corpus; (b)
                 an accepted row where the tag entry count doesn't equal
                 `Rounds` (e.g. `Rounds = 3`, only two comma-separated
                 entries recorded) is PARTIALLY untagged and just as
                 unusable ~ the missing round(s) could swing the
                 half-or-more threshold either way, same as a bare `none`
                 would. Either form: exclude the row from this share until
                 fixed, and if enough rows are sitting untagged or
                 partially-tagged to plausibly swing the half-or-more
                 threshold either way, that's not a clean FIX_CORPUS
                 reading to route on (or rule out) at all ~ flag the gap
                 and fix the logging before trusting the number
                 (`delivery-log.md`'s own hard-block rule, same reasoning,
                 covers both forms). **Before actually editing a corpus
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
                 REDESIGN should examine) goes unaddressed.
                 → route: Deliverable 1+2 ~ align the brief, encode the
                 standard, ONLY when the qualifier majority reads
                 `missing`. NEVER route this to hire. (Watch survivorship
                 bias: `revising` rows aren't counted yet by design, but a
                 backlog of long-open, high-round `revising` rows during
                 an active problem means the accepted-only rate reads as a
                 lower bound, not the truth ~ see §5.)
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
**Fixed evaluation cohort, used by BOTH checks below:** every rate in
steps 2–3 (on-cadence, rounds-per-report) is computed over the **trailing
90 days of that client's rows as of the walkthrough date**, never the
row's entire history. Without a stated cutoff, months (or years) of
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

**One exception to the `Due`-only rule: a row also stays IN the cohort if
its `Last Sent` falls in the trailing 90 days, even when its `Due` doesn't.**
This exists specifically for the late-reopen case (touch 4): a silent
auto-accept from months ago can reopen the SAME row when a client
revision arrives late, writing a brand-new rework round onto a row whose
`Due` may now sit well outside any 90-day window. A `Due`-only cohort test
would silently exclude that row from FIX_CORPUS's current reading even
though the round it just gained is exactly the kind of fresh rework this
month's walkthrough needs to see ~ the new tag would exist in the log but
never reach the router. `Last Sent` already updates on every touch-3
resend AND every reopen (see `delivery-log.md`), so this reuses existing
structured data rather than adding a new one: cohort membership = `Due`
in the last 90 days **OR** `Last Sent` in the last 90 days, whichever
catches the row.

**The `Last Sent` exception is scoped to FIX_CORPUS's rework math ONLY ~
it never pulls a row's on-cadence or cycle-time result into this month's
REDESIGN evidence.** A row's `Delivered ≤ Due` outcome and `Delivered −
Start` span are facts about when it originally shipped, months ago if
`Due` is outside the window; a late reopen doesn't change either fact, so
letting it drag the row back into on-cadence/cycle-time would manufacture
a current REDESIGN read (a hit OR a miss) out of stale delivery
performance that has nothing to do with this month. REDESIGN's two checks
(§3 step 2) stay strictly `Due`-anchored, full stop, no exception. Only
FIX_CORPUS's rounds-per-report/tag-share math (step 3) reads the `Last
Sent` exception, and only for the NEWLY added evidence, not the row's
WHOLE history: `Rounds` and `Rework tag` are cumulative, so a row pulled
in ONLY by `Last Sent` (its `Due` is outside the window, `Last Sent` is
inside it) would otherwise dump its ENTIRE historical round count into
this month's tally ~ a report from 8 months ago with 5 old,
already-accounted-for rounds plus 2 genuinely new late-reopen rounds
would count as 7 fresh rounds this month, not 2. A reopen isn't always
exactly one round either (touch 3 can repeat for multiple additional
client revisions after the reopen), so "just count the last tag entry"
isn't enough. Instead: touch 4 stamps a structured marker in Notes the
moment a row reopens ~ `late-reopen {date}: pre-reopen Rounds={N}` (see
`delivery-log.md`). **A row can accumulate MORE THAN ONE such marker over
its life** (accepted → late-reopened → re-accepted → late-reopened again,
months later) ~ each marker starts a "reopen episode" that runs until
either the row re-reaches `accepted` (closed by the NEXT marker, if one
exists) or, for the most recent marker, right up to now.

**Count every episode that overlaps the 90-day window, not just one
marker ~ this needs summing across episodes, not picking a single cutoff:**
1. Sort all `late-reopen` markers on the row oldest → newest: `M1, M2, …,
   Mn`.
2. For each marker `Mi` EXCEPT the last: it closes at `M(i+1)`'s date
   (that's when the row re-reached `accepted` and got reopened again).
   Include episode `i` if `Mi`'s OWN date falls within the trailing 90
   days ~ if it does, add `M(i+1).preRounds − Mi.preRounds` to this
   month's tally. If `Mi`'s date is older than 90 days, that whole episode
   already fully resolved before this window began ~ exclude it.
3. For the LAST marker `Mn` (the current/most recent episode, running from
   `Mn` to now): include it if EITHER `Mn`'s own date falls within the
   trailing 90 days, OR `Last Sent` does (covers a reopen that started
   just before the cutoff but whose resolution rounds landed inside it ~
   the marker predates the window even though the real work doesn't). If
   included, add `current Rounds − Mn.preRounds`.
4. Sum every included episode's contribution. That sum, not any single
   marker's delta, is what counts toward this month's tally.

Worked example matching the failure mode this corrects: a row reopens 60
days ago (`M1`, 2 rounds added before re-accepting), then reopens again 10
days ago (`M2`, 1 round added so far). Both `M1` and `M2` fall inside the
90-day window, so BOTH episodes are included: `2 + 1 = 3` rounds count
this month, not just `M2`'s single round. Contrast with a row reopened
200 days ago (fully resolved) and again 40 days ago: `M1` (200d) is
outside the window, excluded; `M2` (40d) is inside, included ~ only its
delta counts. And a row reopened once, 95 days ago (marker just outside
the window), still resolving with `Last Sent` at 75 days ago (inside it):
no marker's own date is in-window, but rule 3's `Last Sent` clause still
includes that episode. Reading the actual tag entries for whatever total
count this produces: they're always the LAST that-many entries in the
`Rework tag` list (entries append in order, oldest to newest, so the
freshest ones are always the tail).

**A row CAN enter the cohort via `Last Sent` with NO `late-reopen` marker
at all ~ don't assume that case is impossible.** A reopen marker only
exists when a row was accepted, went quiet, and got reopened by LATE
feedback (touch 4). But a row can just as easily still be working through
its FIRST, never-yet-accepted round of revisions when `Due` is already
outside the 90-day window ~ e.g. `Due` 100 days ago, shipped late at 95
days ago, client asked for a normal (non-reopen) revision at 80 days ago
(an ordinary touch 3, `Last Sent` stamped, no marker involved because the
row was never `accepted` yet to reopen FROM). That row is in cohort via
`Last Sent` (80 days, inside the window) with zero markers to compute a
delta from. Treatment: **when a `Last Sent`-only row has NO `late-reopen`
marker, count its FULL `Rounds`, same as a `Due`-anchored row** ~ there's
no "old, already-counted episode" to subtract, because this row has never
reached `accepted` before now; every round on it is happening during its
one, still-unfolding first pass through delivery, none of it could have
been counted in an earlier walkthrough. The marker-and-delta math above
is ONLY for rows that reached `accepted` at least once and got reopened
later ~ it doesn't apply, and isn't needed, when no reopen ever happened.
A row
in the cohort via
`Due` (the normal case) still counts in full ~ its rounds genuinely
happened within, or close to, this window already. 90 days
re-windows fresh at each monthly walkthrough (not a cumulative rolling
average like WIP's baseline ~ there's no self-referential creep risk here,
it's just which raw rows get counted this month). Apply this SAME
`Due`-anchored 90-day cohort to FIX_CORPUS's rounds-per-report average in
step 3 too, so the two metrics never drift out of sync by being computed
over different windows or different anchor dates.
2. **REDESIGN check:** open each client's `delivery-log.md`, two reads ~
   either fires REDESIGN:
   - **Confirmed (on-cadence):** compute the rate by hand: numerator =
     rows with `Delivered ≤ Due`; denominator = rows that have shipped
     (`delivered`/`revising`/`accepted`) **plus** `open` rows already past
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
     full accepted-row population.** Averaging tags across every accepted
     row, including the many that shipped clean and on time, dilutes the
     read past usefulness: eight on-time clean reports (tag `none`)
     alongside two late `brief-misalign` ones would average out to "mostly
     none," pointing at REDESIGN, even though the two cycles that actually
     caused the on-cadence miss are corpus-driven and should point at
     FIX_CORPUS instead. Read what tagged the MISSES, not the portfolio
     (matches §5b's coded rule, which already scopes this to "those
     specific cycles"). Within that late-cycle set, this still only counts
     `accepted` rows ~ a `delivered` or `revising` late row's tag is still
     provisional (more rounds, and a corpus-tagged one among them, could
     still land before it finalizes); pulling REDESIGN evidence from an
     unresolved late row risks reading it as clean days before a
     `brief-misalign`/`brand`/`quality-bar` revision arrives and it should
     have pointed at FIX_CORPUS instead. `open`/`delivered`/`revising` rows still count
     in the on-cadence rate itself (that's a delivery-date fact, settled
     at ship, not a tag) ~ only the REWORK-TAG qualifier on top of it waits
     for `accepted`. If too few late rows are `accepted` yet to read this
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
     on-cadence read above already uses (accepted rows only, for the same
     provisional-tag reason), applied here too so this bullet is
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
3. **FIX_CORPUS check:** same logs, same 90-day cohort from above, but two
   gates in order, not one, and ONE metric throughout, not two ~ **average
   rounds per accepted report** (total rework rounds across qualifying
   rows ÷ number of qualifying rows), never "share of rows with any
   rework" ~ the two aren't
   interchangeable (one 5-round report among ten clean ones is 0.5
   rounds/report but only 10% of rows touched; picking whichever makes
   the gate pass on a given month would make routing decisions
   incomparable across months). (a) first, is that rounds-per-report
   average above threshold? If rework is rare, stop here ~ one
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
   brief, the brand standard, or `what-good-looks-like.md`) ~ **but check
   the qualifier on each qualifying round's TAG ENTRY (`missing` vs
   `not-followed`, e.g. `brand (not-followed)` ~ NOT free text in Notes,
   see `delivery-log.md`) before actually opening that file to edit it.**
   A correctly-filled row will normally have no qualifier sitting in
   Notes at all ~ Notes can't reliably bind a qualifier to a specific
   round on a multi-round row, which is exactly why the qualifier lives on
   the tag entry itself instead. The tag says what kind of
   defect; the qualifier says whether the corpus was really at fault. A
   majority `not-followed` reading means the file was already right and
   editing it fixes nothing ~ the real cause is execution or process, not
   the corpus (see `delivery-log.md`'s Rework tag bullet for the full
   reasoning).
   **Watch for survivorship bias before trusting a low reading:** clean
   reports auto-resolve to `accepted` within 5 business days (the silent-
   acceptance rule), but a report stuck in `revising` for weeks ~ the
   worst-performing ones, almost by definition ~ never enters this
   calculation until it finally finalizes. During an active quality
   problem, that means the accepted-only rate can read artificially LOW
   precisely because the highest-rework cycles haven't resolved yet. If
   any `revising` rows are sitting with elevated `Rounds` and no
   resolution in sight, treat the accepted-only number as a **lower
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
   block HIRE. Genuinely-absent
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
   exists) ~ both maxed ACROSS THE TEAM (not concentrated in the one
   person REBALANCE would have caught, and not an artifact of who
   happened to respond), no automate/redesign/corpus/rebalance
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

1. **Ingest feed 2, AND `learnings/patterns.md`:** a light weekly pass
   reads `clients/*/delivery-log.md` from Drive into capchecker's
   Supabase (or renders alongside ~ data stays canonical in the owned
   corpus; the app is a lens on it), plus `patterns.md`'s theme tally as
   corroborating signal strength for AUTOMATE/REDESIGN (a theme recurring
   there across multiple weeks raises confidence on a borderline
   14-day-window call) ~ without this second ingest, `patterns.md` keeps
   accumulating and never actually influences a routing decision, which
   defeats the point of promoting REWORK/PROCESS themes there at all.
2. **Add the two missing branches:** `REDESIGN` and `FIX_CORPUS` actions in
   the router (`lib/analytics.ts`), fed by rework tags + cadence data,
   **both windowed to the same trailing-90-day cohort §5a uses** (never
   the row's full history ~ same dilution reasoning). **REDESIGN and HIRE
   are built on deliberately non-overlapping evidence** ~ this matters,
   see the note below:
   - rework rounds/report above threshold FIRST (rework has to be
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
     - **Completeness gate:** for every accepted row entering this
       calculation, tag entry count MUST equal `Rounds` exactly ~ a bare
       `none` on a `Rounds ≥ 1` row, or any partial mismatch (fewer
       entries than `Rounds`), excludes that row from the tag-share
       calculation entirely and hard-blocks the conclusion if enough rows
       are affected to plausibly swing the ≥half threshold either way
       (`delivery-log.md`'s own gate, same reasoning, same code needs to
       enforce it here that a human enforces by hand in §5a).
     - **Cause-qualifier gate:** ≥half tagged corpus-cause is necessary but
       not sufficient to fire an EDIT-THE-CORPUS action. Read the
       qualifier attached to each qualifying round's tag entry (`missing`
       vs `not-followed`, e.g. `brand (not-followed)` ~ see `delivery-
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
       exists to prevent. **Missing qualifiers and genuinely-tied
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
         block indefinitely. A complete tie is a fully-evaluated,
         DEFINITE outcome: it simply fails to clear the majority-`missing`
         bar the corpus-edit action requires (same as a majority-
         `not-followed` reading would), so FIX_CORPUS's corpus-edit action
         does NOT fire ~ but this is a resolved "checked, no clear
         corpus-cause majority" finding, not an open question, and it does
         NOT block HIRE. Surface it plainly either way ("mixed cause,
         tied `missing`/`not-followed` ~ worth a look at both the corpus
         file and execution/process, no single fix indicated") rather than
         silently picking one interpretation.
     Also surface a separate warning (not a
     blocking gate, just visibility) when `revising` rows with elevated
     `Rounds` have been open unusually long ~ the accepted-only
     calculation above is a lower bound while those exist, per §5a's
     survivorship-bias note.
   - on-cadence rate below threshold, OR cycle time trending up against
     baseline while on-cadence still narrowly holds (the early-warning
     path ~ §2), where the rework on those specific cycles (if any),
     **read from `accepted` rows of those cycles ONLY**, is low or isn't
     corpus-tagged. **This restriction matters, don't implement the bullet
     without it:** a late row still sitting `open`/`delivered`/`revising`
     carries a provisional tag ~ its default `0`/`none`, or whatever it
     currently holds, could still change before the row finalizes (a
     `brief-misalign`/`brand`/`quality-bar` revision landing later), and
     firing REDESIGN off that provisional state risks emitting the wrong
     route from a row whose real rework outcome isn't known yet (§5a's
     matching rule works the same way, same reasoning). If too few of the
     late/trending cycles are `accepted` yet to read this qualifier
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
     in §2) AND WIP DATA COVERAGE ≥70% of the full roster (≥5 of 6 today,
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
     someone happens to ship); use it as the primary source. Fall back to
     the delivery-log's most recent row ONLY if `brief.md`'s field is
     itself still templated/unfilled for that client. Is WIP/load ALSO
     elevated only for that same small
     set of analysts, or for most of the team? **"MOST," defined exactly,
     not left to operator judgment, and ANCHORED TO THE FULL ROSTER, not
     just whoever has data this cohort:** more than half of the FULL,
     fixed roster count ~ for today's 6-person function, that's ALWAYS ≥4
     of 6, regardless of how many analysts happen to clear the WIP
     observation-completeness bar this cohort. **Do not shrink the
     denominator to "analysts with sufficient data" here** ~ that's a
     different question (§2's WIP row already gates whether WIP can
     corroborate HIRE AT ALL on a separate ≥70%-roster-coverage floor); if
     THIS test's denominator shrank too, a thin-but-passing-coverage month
     (say 5 of 6 with data) would silently lower the portfolio-wide bar to
     3-of-5-elevated, when genuine portfolio-wide evidence still means
     reaching most of the ACTUAL team, not most of whoever reported in.
     Count elevated analysts against the fixed ≥4-of-6 bar directly; an
     analyst without sufficient data simply can't be counted as elevated
     (missing data isn't evidence of elevation), which makes reaching the
     fixed bar harder when coverage is thin, exactly as it should be ~
     thin coverage should make broad evidence HARDER to establish, never
     easier. Record the exact headcount
     used (full roster size, how many had sufficient data, how many of
     those read elevated) in `router-decisions.md`'s threshold snapshot
     alongside the other signals, so a borderline month is reproducible,
     not re-litigated. **Confined to the narrow
     signal's own analyst(s) DOES block HIRE** ~ their already-named
     problem plausibly explains all the observed strain, so that gets
     fixed first, not hired around. **Elevation reaching the fixed ≥4-of-6
     full-roster bar, well beyond
     just the analyst(s) the narrow signal names, does
     NOT block HIRE** ~ a client-scoped fix can't explain strain in
     analysts who were never part of that narrow signal at all, so letting
     it rule out HIRE there would wrongly suppress a genuine portfolio-wide
     need (this was inverted in an earlier draft of this section ~ Codex
     catch, 2026-07-19). (A future capacity feed with real per-client task attribution,
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
