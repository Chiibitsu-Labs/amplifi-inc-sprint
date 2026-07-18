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
| 1.2 | Rica fills the three standards frames from 2–3 gold reports (extraction prompts included ~ one focused hour) | **Rica** | Jul 31 | "AI slop", "AI tells", "doesn't align w/ branding" |
| 1.3 | Seed client folders: copy `_template-client/` per active client; fill `brief.md` + `brand-standard.md` for each (split the portfolio) | **Dale + Janelle** | Aug 7 | "incomplete information", "unique asks", re-inferring |
| 1.4 | Deploy the three skills (insights · qa · improve) to Claude Enterprise; retire the old reprompt-heavy skill | **Chii** | Aug 7 | "still requires reprompting", "not optimized for what good looks like" |
| 1.4b | Rename capchecker's live `HIRE` action to `HIRE-CANDIDATE` (`lib/analytics.ts` + dashboard label) ~ today's label fires on load alone with no automate/redesign/corpus-fix ruled out yet; the UI shouldn't claim more than v1 can back up | **Chii** | Aug 7 | premature hire signal before the router is fully wired (Instrument §4) |
| 1.5a | Open a delivery-log row (`Status = open`) for EVERY cycle already in flight, backdated to its real period start ~ not just new cycles going forward. Skipping this means the first baseline (2.2) can't see any report that was already overdue before Aug 3 | **Rica** (enforces) · all analysts (do) | Aug 3 | overdue work invisible to on-cadence tracking |
| 1.5b | Delivery-log habit live for the full cycle: open at period start, ship-touch + insight-log entry at delivery, finalize (rounds/tag/`accepted`) at client sign-off | **Rica** (enforces) · all analysts (do) | Aug 3 onward | "reports not evolving"; feeds the instrument |
| 1.6 | First weekly promotion pass (improve skill, promote mode) ~ then every Friday | **Rica + Chii** | Aug 14, recurring | corpus rot; same-mistake-twice |

**Gate out of Phase 1:** an analyst generates a report section via the
insight skill with zero re-prompting of standards/brief content. If they
had to paste context into chat, a corpus file is missing ~ fix and retest.

## Phase 2 ~ Builds (by Sep 18–Oct 16 · 60–90 days)

High impact, more effort. The system starts measuring itself.

| # | Action | Owner | Done by | Kills / unlocks |
|---|---|---|---|---|
| 2.1 | AI-QA gate wired into the report flow as a standing step before internal alignment | **Rica** (process) · **Chii** (tuning) | Sep 4 | rework rounds; makes human verify faster |
| 2.2 | First baselines from 4 weeks of delivery-log + capchecker data; Michele sets first-pass thresholds | **Michele + Chii** | Sep 11 | gut-feel resourcing ~ the instrument gets its numbers |
| 2.3 | Instrument v2: delivery-log feed into capchecker; add REDESIGN + FIX-CORPUS router branches; panel in chain order (automate → redesign → fix-corpus → hire) | **Chii** | Sep 18 | the full router ~ high rework routes to corpus fix, never straight to hire |
| 2.4 | Automate data-transfer-to-template: skill output shaped to `report-template-rules.md`, paste-and-style into Canva; measure minutes saved per report | **Chii + Dale** | Oct 2 | "we still transfer data so the deck doesn't look AI" |
| 2.5 | Automation candidates from instrument themes: top recurring high-load theme (likely data pulling / sync ~ "LONG QUEUE FOR PULLING") gets an automation spike | **Chii + Michele** (pick) | Oct 16 | the AUTOMATE branch earning its keep |
| 2.6 | 90-day review vs the success bar + the brief's five Definition-of-Success questions | **Michele + Chii** | week of Oct 19 | ~ |

## Phase 3 ~ Ongoing (no end date, by design)

| Rhythm | What | Owner |
|---|---|---|
| Daily | capchecker 3-tap check-in (08:00) · summary to Michele (10:00) | all · auto |
| Per cycle | delivery-log: open at start, ship-touch + insight-log entry at delivery, finalize at acceptance (~20–30s each) | delivering analyst |
| Weekly (Fri) | promotion pass: learnings → corpus | Rica (+ improve skill) |
| Monthly | threshold read: any signal crossed? walk the router chain, log the routing decision | Michele |
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
   sufficient and a hire is warranted? → *the router (2.3) ~ the whole
   point*

*Sequences: everything. The map shows the system; this builds it in order.*

*Chiibitsu Labs ~ more human, by design.*
