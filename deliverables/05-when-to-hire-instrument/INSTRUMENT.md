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
| **WIP per analyst** | active clients/tasks in flight per person, from capchecker's `client_count` field (Q3, parsed to a number) | capchecker (daily Q3) | the "full hands" ceiling. **v1 threshold, same pattern as capchecker's other signals:** WIP baseline = trailing per-analyst average `client_count` once ≥10 working days of post-epoch data exist (mirrors `minHistoryDays`); WIP threshold = `client_count` ≥ baseline + 2, sustained on ≥5 of the last 10 working days (a lower bar than load's `structuralDays: 7` since WIP moves more slowly, day to day, than a self-rated feeling). Gut-seed like every other v1 number here ~ Michele adjusts once real distributions exist (§7). Without a stated number, "WIP sustainedly elevated" isn't checkable and two people could read the same dashboard and disagree ~ this is that number, however roughly. |
| **Perceived load** | daily 1–10 self-rating + reason | capchecker (Q1+Q2) | earliest warning ~ people feel strain before metrics show it |
| **Cycle time per report** | period start → delivered | delivery log | rising = falling behind cadence; the early-warning half of REDESIGN's evidence (see §3) ~ cycle time can trend up for weeks before it actually breaches the due date and shows up in on-cadence rate |
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
                 not 100%), half or more are tagged brief-misalign or
                 brand ~ their exact loudest pain, and the two-gate order
                 that keeps one stray tag from firing this on its own
                 (see §5).
                 → route: Deliverable 1+2 ~ align the brief, encode the
                 standard. NEVER route this to hire. (Watch survivorship
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
                 fix, cheaper than a hire) AND capchecker's DATA signal is
                 CLEAR (response rate ≥70% over the last 7 days, ≥10 days
                 of post-epoch history) AND the CAPACITY signals ~
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
2. **REDESIGN check:** open each client's `delivery-log.md`, two reads ~
   either fires REDESIGN:
   - **Confirmed (on-cadence):** compute the rate by hand: numerator =
     rows with `Delivered ≤ Due`; denominator = rows that have shipped
     (`delivered`/`revising`/`accepted`) **plus** `open` rows already past
     `Due` (overdue-in-progress misses) ~ **excluding** `open` rows whose
     `Due` hasn't arrived yet (that's future work, not yet a hit or a
     miss; counting it dilutes the rate and can mask a real problem).
     Below threshold, with `Rework tag` mostly `client-new-ask`/`data`/
     `none` rather than `brief-misalign`/`brand` → REDESIGN.
   - **Early warning (cycle time):** compare recent `Delivered − Start`
     spans against the baseline (§7), **on cycles whose rework (if any)
     stays low or isn't corpus-tagged** ~ the same qualifier the
     on-cadence read above already uses, applied here too so this bullet
     is self-contained and doesn't need to borrow step 3's answer to
     resolve itself. Trending up under that condition, even while still
     narrowly hitting `Due` → REDESIGN, flagged as "before it becomes a
     miss" ~ this is the row that keeps a slow slide from going unnoticed
     until on-cadence formally breaches. (A cycle that's slow BECAUSE its
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
3. **FIX_CORPUS check:** same logs, but two gates in order, not one ~
   (a) first, is overall rework meaningful at all: rounds-per-report (or
   rows with `Rounds ≥ 1` as a share of all accepted rows) above threshold?
   If rework is rare, stop here ~ one brand-tagged revision among many
   clean reports is noise, not a corpus signal, even though it'd be
   "100% corpus-tagged" by count alone. (b) Only once (a) clears: **count
   at the round level, not the row level** ~ a 5-round report with one
   `brand` cause and four `client-new-ask` causes is 20% corpus-driven,
   not 100%; the delivery log keeps one tag entry per round specifically
   so this is countable (see `delivery-log.md`). Of all the rework rounds
   that exist across qualifying rows, is half or more tagged
   `brief-misalign`/`brand`? If both gates clear, FIX_CORPUS fires, and
   the tag itself tells you which corpus file is stale (the brief, or the
   brand standard).
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
   would contradict.
4. **HIRE check:** only if none of the above fired **portfolio-wide** ~ a
   narrow AUTOMATE/REDESIGN/FIX_CORPUS signal on ONE client while WIP/load
   are elevated broadly across MOST clients/analysts doesn't explain away
   the team-wide breach; that narrow fix wouldn't relieve it. Only let an
   earlier branch block HIRE when fixing it would plausibly absorb enough
   of the strain to matter ~ don't let a small, already-handled signal
   permanently shield a real capacity need. This **including
   REBALANCE**, capchecker's live signal for one analyst overloaded while
   the team has headroom (check the dashboard's REBALANCE flag before
   anything else here; if it's firing, that's redistribution, not a hire,
   even if team-wide WIP/load also look high). **Also check capchecker's
   DATA flag before trusting "across the team" ~** if response rate is
   below 70% or there's under 10 days of post-epoch history, the DATA
   signal is active, meaning "the team's load is maxed" is actually "the
   people who answered are maxed," which isn't the same claim. Don't
   route to HIRE off a partial team; wait for DATA to clear, or chase the
   response rate up first (that's its own fixable problem, separate from
   whether a hire is warranted). Once REBALANCE is ruled out and DATA is
   clear: cross-reference capchecker's sustained-load signal against WIP
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
   the router (`lib/analytics.ts`), fed by rework tags + cadence data.
   **REDESIGN and HIRE are built on deliberately non-overlapping evidence**
   ~ this matters, see the note below:
   - rework rounds/report above threshold FIRST (rework has to be
     meaningfully frequent, not just present ~ a single tagged revision
     among many clean reports is noise, not signal), AND, counted at the
     ROUND level (not the row level ~ a row with one `brief-misalign`
     round and four `client-new-ask` rounds is 20% corpus, not 100%; the
     delivery log stores one tag per round so this is directly countable),
     ≥half of qualifying rework rounds tagged `brief-misalign`/`brand` →
     **FIX_CORPUS**, pointing at the exact corpus file to fix. Same
     two-gate order as §5a's manual version ~ frequency gate before
     tag-share gate, always. Also surface a separate warning (not a
     blocking gate, just visibility) when `revising` rows with elevated
     `Rounds` have been open unusually long ~ the accepted-only
     calculation above is a lower bound while those exist, per §5a's
     survivorship-bias note.
   - on-cadence rate below threshold, OR cycle time trending up against
     baseline while on-cadence still narrowly holds (the early-warning
     path ~ §2), where the rework on those specific cycles (if any) is low
     or isn't corpus-tagged, **AND the misses cluster** (one client, one
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
     in §2) AND capchecker's REBALANCE not currently firing (no single
     analyst absorbing the load while the team has headroom ~ that's
     redistribution, cheaper than a hire) AND capchecker's DATA signal NOT
     currently firing (response rate ≥70%/7d, ≥10 days history ~
     "team-wide maxed" is only a real claim when the responding sample
     actually represents the team) AND automate + redesign + fix-corpus
     not firing **portfolio-wide** ~ a narrow signal scoped to one client
     or theme, isolated from the broad WIP/load elevation, shouldn't count
     as an explanation (v1 code check: is the automate/redesign/fix-corpus
     signal's scope ~ client(s)/theme it names ~ a small fraction of the
     clients showing elevated WIP/load, or most of them? Small fraction
     doesn't block HIRE; most of them does) ~ the chain enforced in code,
     not just in prose. **HIRE never reads
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
