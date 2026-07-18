---
title: AI Ecosystem Architecture Map
client: Amplifi Technologies Corp
function: Analyst (Core Build scope)
deliverable: 3 of 5
builder: Chii / Chiibitsu Labs
canon: AI adoption is not tool exposure. It is workflow incorporation.
---

# AI Ecosystem Architecture Map

One view of the analyst function's AI-incorporated operating system: where
knowledge lives, where AI enters the work, where the human owns it, and how
it all feeds Michele's instrument. **Four layers, one dependency order ~
not four separate boxes.**

---

## 1. The system

```
┌─────────────────────────────────────────────────────────────────────┐
│  THE VAULT (owned ~ Amplifi's, forever)                             │
│                                                                     │
│   amplifi-knowledge/          ← Google Drive today ──migrate──→ git │
│   clients/{brief·brand·context·insight-log·delivery-log}            │
│   standards/{good·voice·template}    learnings/                     │
└──────────────┬──────────────────────────────────▲───────────────────┘
        feeds  │                                  │ captures back
               ▼                                  │ (improve skill,
┌─────────────────────────────────────────────────┴───────────────────┐
│  THE WORKFLOW (12 steps, human↔AI handoffs marked ~ §2)             │
│   data: Sentimo (legacy) + MCP (new) → analysis → report → client   │
└──────────────┬──────────────────────────────────────────────────────┘
     produces  │   THE LENS (rented, swappable): Claude Enterprise
               ▼   runs the skills: insights · qa · improve
┌─────────────────────────────────────────────────────────────────────┐
│  CONSISTENT OUTPUT  ~ standard encoded in the vault, AI-QA gate,    │
│                       human verify kept                             │
└──────────────┬──────────────────────────────────────────────────────┘
    measured   │
               ▼
┌─────────────────────────────────────────────────────────────────────┐
│  WHEN-TO-HIRE INSTRUMENT (Michele's panel)                          │
│   feed 1: capchecker (daily load, WIP)  feed 2: delivery logs       │
│   router: automate → redesign → fix-corpus → hire (last)            │
│   the fix-corpus branch points BACK at the vault ~ one system       │
└─────────────────────────────────────────────────────────────────────┘
```

**The boundary that matters:** the vault is Amplifi's ~ plain markdown,
portable, survives any AI generation. The lens (Claude today) is rented and
swappable. Skills and data never live inside the lens; the lens reads the
vault. Swap the lens, keep the system.

## 2. The real workflow, 12 steps ~ handoffs made explicit

Most AI adoption fails because nobody decided where the human stops and the
AI starts. Here, every handoff is a decision, not a default.
**H** = human owns · **AI** = AI drafts/checks · **V** = vault feeds/absorbs

| # | Step | Who does what | Vault touchpoint |
|---|---|---|---|
| 1 | Brief | **H** owns client relationship · AI summarizes into living-brief shape | **V** `brief.md` created/updated; FAQs start |
| 2 | Baseline | AI drafts from brief + data · **H** shapes unique asks | **V** reads `brief.md`; unique asks written back |
| 3 | Internal alignment | **H** judgment call | **V** misalignments → learnings |
| 4 | Present | **H** ~ the room is human | — |
| 5 | Revisions | **H** decides · AI applies | **V** every correction → `brand-standard.md` / FAQs ~ *the same note never twice* |
| 6 | Implement | **H** manages suppliers/vendors (process, not AI ~ see risks) | — |
| 7 | Monthly analysis | AI synthesizes Sentimo/MCP pulls · **H** spot-checks | **V** reads `context.md` for what matters to this client |
| 8 | Insights | **AI drafts** (insight skill) · **H** verifies ~ "VERIFICATION OF AI RESULTS" stays | **V** reads standards + full `insight-log.md` |
| 9 | Report | AI outputs template-shaped draft → **QA gate** → **H** final verify → Canva polish | **V** reads `report-template-rules.md`; ship writes: insight-log entry + delivery-log row |
| 10 | Internal alignment | **H** ~ faster because the QA gate ran first | — |
| 11 | Client presentation | **H** ~ the relationship is the product | — |
| 12 | Repeat | improve skill closes the loop | **V** learnings promoted weekly → next cycle starts smarter |

The capchecker check-in (3 taps, daily 08:00) runs alongside all twelve ~
the instrument's pulse.

## 3. Tools, mapped to function (maximize, don't replace)

| Tool | Role in the system | Notes & flags |
|---|---|---|
| **Claude Enterprise** | the lens ~ runs the three skills at steps 2, 7–9, 12 | ⚠ "CLAUDE AI LIMIT": batch heavy runs (analysis + insights same session); if caps still bite after skills cut reprompting waste, it's a seat/plan conversation, not a workflow one |
| **Google Drive** | the vault's home (Level 2) + report storage | migration to git = copy-paste by design, when CTO unblocks |
| **Sentimo** (legacy) + **MCP** (new) | the data feed into steps 7–8 | data-pull queue + inconsistency pains live here ~ automation candidates on the roadmap |
| **Canva** | client-facing polish, step 9 | ⚠ fragility flagged: crashes, outages, slow graphics, per-analyst access locks. Mitigation now: content lives in markdown before Canva, so a Canva outage delays polish, never loses work. Replacement = deliberately not-yet |
| **Telegram + capchecker** | the instrument's capacity feed | live; owned data, exportable any day |
| **MS Office** | only when a client requests office docs | per intake: fine as-is, don't invest |

## 4. Where AI enters ~ and where it never does

**AI enters:** first drafts (baseline, insights, report sections), synthesis
(monthly pulls → analysis), retrieval (corpus reads), checking (QA gate),
capture (improve skill).

**The human always owns:** the client relationship (steps 1, 4, 11), the
judgment calls (3, 5, 10), supplier management (6), and **final
verification (8–9)** ~ the team's existing verify step is kept and made
faster, never removed.

## 5. Risks on the map, named

1. **Canva fragility** ~ mitigated (content in markdown first), not solved.
   Deck-tool swap is a bigger decision; parked in not-yet.
2. **Supplier/vendor pains** (dependency, late delivery, thin pool, no
   cascade) ~ real, but process/procurement problems, not AI. Named
   out-of-scope for this build so they're not forgotten (roadmap: ongoing,
   process track).
3. **Claude usage caps** ~ watch after skills deploy; escalate to seats if
   still binding.
4. **Corpus rot** ~ the standing risk of every knowledge base. Countered
   structurally: improve skill + weekly promotion + the instrument's
   fix-corpus branch pointing at specific stale files.

*Organizes: all deliverables. The roadmap (Deliverable 4) sequences building
exactly this picture.*

*Chiibitsu Labs ~ more human, by design.*
