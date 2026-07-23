# What Good Looks Like ~ The Amplifi Analyst Bar

> **Status: FRAME ~ to be filled from Amplifi's 2–3 best past reports.**
> **Version: 0.1.0 (unfilled)**
> This is the encoded judgment layer: the quality bar the insight skill
> writes to and the QA skill checks against. It must come from real winning
> work, not theory. A living document from here on: `amplifi-onboarding`
> does the first fill, `amplifi-improve`'s weekly promotion pass sharpens
> it after ~ see the Changelog at the bottom.

## How to fill this file (one hour, once)

1. Rica picks the 2–3 reports the team is proudest of ~ the ones a client
   praised, renewed on, or forwarded upward.
2. Open them next to this file and run the extraction prompt below with
   Claude, then **edit what it drafts** ~ the human authors the bar, the AI
   just does the first pass.
3. Delete this instruction block AND change line 3's `Status: FRAME` to
   `Status: LIVE` (or delete the whole blockquote). Both edits matter ~
   `amplifi-insights`' Step 0 corpus-readiness check treats a file still
   carrying `Status: FRAME` as unfilled regardless of what's below it, so
   removing the instructions alone doesn't actually make the file "live"
   as far as the skill can tell. The file is live once BOTH are gone.

**Extraction prompt** (paste with the reports attached):
> "These are Amplifi's best intelligence reports. From them, extract: (1)
> what makes an insight here *earn its place* ~ specificity, data grounding,
> so-what; (2) how recommendations are framed when they're actionable vs
> generic; (3) the structure and rhythm of the analysis sections; (4)
> anything consistently ABSENT that weaker reports usually contain. Draft
> the sections below. Be concrete ~ quote examples."

---

## An insight earns its place when…

- {e.g. it names a number AND what changed AND why it matters to THIS client}
- {e.g. it connects this period to the accumulated trend, not just this period}
- {…}

## A recommendation is actionable when…

- {e.g. it names the action, the platform, the audience, and the expected effect}
- {e.g. it would still make sense if the client read it without the report}
- **Never:** "continue posting consistently" / "maintain current strategy"
  ~ if the data genuinely says "steady," say what to WATCH and what would
  change the call. "Just continue" is banned as a *sole* recommendation.

## Structure of a strong analysis section

- {opening: the headline finding in one line}
- {evidence: the 2–3 data points that carry it}
- {…}

## The bar, in checklist form (the QA skill reads this)

- [ ] Every insight traces to actual period data (no hallucinated numbers)
- [ ] Recommendations pass the "actionable when…" tests above
- [ ] The report references the insight-log trend where relevant
- [ ] Nothing violates `house-voice.md` or the client's `brand-standard.md`
- [ ] No stale data carried over from a previous period's template

## Changelog

> `amplifi-onboarding` logs the first fill here. After that,
> `amplifi-improve`'s Mode 2 (weekly promotion) bumps the version and adds
> a line every time a real correction changes this file ~ patch (0.1.x)
> for a wording/example tweak, minor (0.x.0) for a new bar item added,
> major (x.0.0) reserved for a full re-fill against a new gold set. Newest
> entry at the top, same convention as `insight-log.md`.

- {YYYY-MM-DD} ~ v0.1.0 ~ Filled from {N} gold reports during onboarding.
