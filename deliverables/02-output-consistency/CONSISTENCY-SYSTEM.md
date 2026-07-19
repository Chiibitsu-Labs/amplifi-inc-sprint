---
title: Output Consistency & Quality System
client: Amplifi Technologies Corp
function: Analyst (Core Build scope)
deliverable: 2 of 5
builder: Chii / Chiibitsu Labs
status: v1 ~ skills ready; standards frames await Rica's gold-report extraction
canon: AI adoption is not tool exposure. It is workflow incorporation.
---

# Output Consistency & Quality System

The layer that makes every analyst's output hit the same bar ~ Amplifi's
literal 90-day success metric: *"consistent quality, no AI slop, reports
aligned with branding, evolving insights as data points accumulate."*

This is not a new system beside the corpus. It's a **consequence of the
corpus done right**: the standard lives in Deliverable 1's `standards/`
files, and three skills apply it every run.

---

## 1. The root cause this kills

The densest cluster in the team's own pain map: "AI slop" · "AI
hallucination" · "AI tells" · "insights become dull" · "AI template does not
align w/ amplifi branding" · "no actionable reco" · "claude profile still
requires reprompting" · "we still transfer data to template so deck doesn't
look AI."

**All one root cause: the AI has no encoded definition of what "good" looks
like for Amplifi, so it defaults to generic.** Slop is thin context.
Reprompting is the analyst hand-carrying the missing standard into every
conversation. Encode it once; the lens applies it every time. Context kills
slop.

## 2. The three mechanisms

### a) The encoded standard (lives in the corpus, Deliverable 1)

| File | Encodes | Kills |
|---|---|---|
| `standards/what-good-looks-like.md` | the analyst quality bar | dull insights, "no actionable reco" |
| `standards/house-voice.md` | how Amplifi actually writes | AI slop, AI tells |
| `standards/report-template-rules.md` | structure + branding + fresh-data rules | "doesn't align w/ branding," "old data retained" |
| `clients/{x}/brand-standard.md` | per-client voice/format | client-specific misses |

Ships as **frames with extraction prompts**, but the four rows above
split into THREE different fill methods, not one shared process ~
picking the wrong source for any of them encodes the wrong bar:
- **`what-good-looks-like.md` and `house-voice.md`** ~ Rica fills these
  TWO from the 2–3 best past AMPLIFI reports (the bar comes from real
  winning work, not theory): these are shared, Amplifi-wide standards, so
  Amplifi's OWN best work is the right source.
- **`report-template-rules.md`** ~ extracted from the CURRENT Canva
  template and brand kit instead, never past reports (see that file's own
  "How to fill this file" section). Gold reports can reflect an outdated
  deck structure, fonts,
  colors, or logo placement that the team has since revised in Canva
  directly ~ extracting structure/branding rules from old winning reports
  instead of the live template risks encoding exactly the stale rules the
  post-Canva brand checks exist to catch.
- **`clients/{x}/brand-standard.md`** ~ **NEITHER gold-report method
  above applies here.** This is a PER-CLIENT file, not a shared standards
  frame ~ Amplifi's own past winning reports reflect Amplifi's overall
  house style across every client, not any ONE client's specific
  terminology, preferences, or formatting quirks, so extracting a
  client's brand standard from Amplifi's gold reports would encode the
  wrong client's voice into every OTHER client's deliverable (Codex
  catch, 2026-07-19: an earlier draft of this section grouped
  `brand-standard.md` in with the gold-report method above, contradicting
  `ROADMAP.md`'s own task 1.3b, which correctly assigns Dale + Janelle to
  fill each client's copy from THAT client's kickoff material and
  correction history, not from gold reports, and not Rica's task at all).
  Each client's own kickoff brief, and the "Revision history lessons"
  section once real corrections start landing, are this file's real
  sources.

One
hour of judgment per frame, encoded forever, whichever source and owner
each
frame actually calls for. Until filled, the skills run but
the bar is generic ~ **filling these frames is the highest-leverage hour in
the roadmap.**

### b) The rebuilt insight skill (`skills/amplifi-insights/`)

Their pain, verbatim: *"I've tried to use skills but now claude profile
still requires reprompting… not yet optimized for what good looks like."*
The old skill failed because the standard wasn't encoded anywhere it could
read. The rebuilt skill:

1. **Reads before it writes:** standards + the client's brief, brand
   standard, context, and full insight-log.
2. **Grounds in current data only** ~ the period's actual pull, period-
   stamped, so template ghosts can't survive.
3. **Refuses generic recos:** "just continue" is banned as a sole
   recommendation; quiet months get the trend read from the insight-log.
4. **Outputs in template shape** ~ sections matching
   `report-template-rules.md`, so the transfer-to-Canva step is paste-and-
   style, not rewrite-so-it-doesn't-look-AI.

### c) The AI-QA gate (`skills/amplifi-qa/`)

Before a report is finalized, the draft runs through the QA skill. It checks
the draft **against the encoded standard ~ rules are read from the corpus,
never hardcoded**, so updating the bar = editing one file. Output: a
pass/flag checklist the analyst clears in minutes.

The human verify step stays ~ the team already does "VERIFICATION OF AI
RESULTS" and that judgment is theirs to keep. The gate makes verification
faster and sharper; it never replaces it. Encode the bar, don't police it
manually.

### d) The improve skill (`skills/amplifi-improve/`) ~ the loop-closer

End of session → learnings written to `learnings/` → weekly promotion into
the permanent corpus (see Deliverable 1 §5). This is why the standard gets
*sharper* over time instead of staler: every rework round teaches the corpus
something, and the same mistake stops recurring.

## 3. Where each mechanism sits in the workflow

```
Monthly analysis ──→ INSIGHT SKILL ──→ draft ──→ AI-QA GATE, pass 1 ──→ human verify
     (reads corpus + period data)                (pre-Canva, reads corpus)  │
                                                                            ▼
                                                                     Canva deck
                                                                            │
                                                                            ▼
                                                     AI-QA GATE, pass 2 (post-Canva,
                                                    visually-rendered deck ~ the ONLY
                                                       clearance to ship, roadmap 2.1b)
                                                                            │
                                                              clear/re-run gate ▼
                                                                          client
                                                                            │
      learnings/ ←── IMPROVE SKILL ←── end of session ←──────────────────────┘
          │                                    + delivery-log row (60s)
          └── weekly promotion → corpus (standards/, context.md, brief.md)
```

Two passes, not one ~ pass 1 catches drift the insight skill introduced;
pass 2 catches drift Canva assembly itself introduces (stale chart images,
wrong logos, off-brand layout), which pass 1 can't see because it runs on
the markdown draft, before Canva ever touches it. Only a visually-rendered
pass 2 export counts as clearance to ship (`report-template-rules.md` §"Two
checkpoints, not one"); a flagged deck gets corrected and pass 2 re-run,
never presented as-is.

## 4. The "boring months" + "evolving insights" answer

Both pains are the same mechanism: **the insight-log**. The skill reads the
accumulated thread, so a flat month yields *"engagement flat 3rd month
running ~ here's the 6-month drift and the two levers that historically
moved it"* instead of "maintain current strategy." Compounding context makes
quiet months yield signal. Consistency and evolution are one system, and
it's the corpus.

## 5. Build constraints honored

- Standard = markdown in the corpus. Not a Canva template, not a prompt in
  someone's head, not hardcoded in a skill.
- Skills are portable instructions (plain markdown) ~ they run in Claude
  Enterprise today and survive any lens swap.
- Human authors the bar; human keeps final verify. The AI applies and
  checks ~ it never becomes the judge of what "good" means.
- Analyst function only.

## 6. What this must NOT become

- Not a prompt library ~ if an analyst is pasting standards into chat, a
  corpus file is missing; fix the corpus.
- Not a rigid template that retains old data ~ fresh-data rules are
  explicit and QA-checked.
- Not a compliance cop ~ flags are suggestions to a human who decides.

## 7. Open items

1. **Rica fills the three standards frames** (roadmap: week 1–2). The
   extraction prompts are in the files, and the source is NOT the same
   for all three ~ `what-good-looks-like.md` and `house-voice.md` extract
   from gold reports; `report-template-rules.md` extracts from the
   CURRENT Canva template and brand kit instead, per `ROADMAP.md` task 1.2
   and `standards/report-template-rules.md`'s own fresh-data rules ~
   sourcing it from gold reports would encode whatever structure, fonts,
   colors, or logo placement those historical reports happened to use,
   which can already be stale against the live template (Codex catch,
   2026-07-19).
2. Team names their real observed "AI tells" into `house-voice.md` ~ the
   seed list is generic on purpose.
3. QA flag format confirmed after first live use: current v1 = checklist +
   inline flags (see skill); tune with the team.

*Depends on: Knowledge Foundation (Deliverable 1). Feeds: the When-to-Hire
Instrument ~ high rework with `brief-misalign`/`brand`/`quality-bar` tags
routes here and to the corpus, not to a hire.*

*Chiibitsu Labs ~ more human, by design.*
