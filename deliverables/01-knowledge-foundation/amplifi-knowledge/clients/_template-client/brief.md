# {Client Name} ~ Living Brief

> **This is a LIVING document.** It starts from the client's kickoff brief
> and grows every time the client clarifies anything. Before you infer,
> check here. After they answer, write it here. Once.

## Snapshot

| | |
|---|---|
| Client | {name} |
| Account label | {blank, unless this name collides with another account ~ see `README.md`'s duplicate-name handling. Internal disambiguation only, e.g. "Chicago office, since 2024" ~ never shown to the client, never used as the display name in generated output. `Client` above always stays the real, unqualified name} |
| Account status | {active / paused / ended}, since {YYYY-MM-DD} ~ see note below |
| Reporting cadence | {weekly / bi-weekly / monthly} (v{n}, since {YYYY-MM-DD}) ~ see note below |
| Report due | {e.g. every Friday / 5th working day of month} |
| Platforms monitored | {FB / IG / Reddit / YouTube / TikTok / …} |
| Data sources | {Sentimo / MCP / third-party provider names} |
| Client contacts | {name, role, channel} |
| Amplifi lead analyst | {name} · backup: {name} |
| Client history | {"New" or "Established since {approx. date/engagement length}" ~ see note below} |

> **Keep "Amplifi lead analyst" current the moment ownership PERMANENTLY
> changes** ~ not the per-cycle cover `delivery-log.md`'s `Analyst`
> column already tracks, an actual change of who owns this account.
> Instrument §3's HIRE analyst-scope test reads THIS field as the
> current owner specifically because `delivery-log.md`'s `Analyst` only
> ever answers "who shipped last," not "who owns the account now" ~ a
> stale name here quietly points that test at the wrong person's
> WIP/load. Update it here, right when the reassignment happens (see
> `delivery-log.md` touch 2 for the same rule from the other side).
> **Use the EXACT same spelling capchecker uses for that person, same
> rule as `delivery-log.md`'s `Analyst` field** (their Telegram display
> name / capchecker identity, never a nickname, initial, or shorthand) ~
> the HIRE scope check maps this name straight to capchecker's per-person
> WIP/load data, and `delivery-log.md`'s own exact-spelling rule doesn't
> protect this join, since §3 explicitly reads THIS field instead of
> `Analyst` for current ownership (Codex catch, 2026-07-19). `Dale` here
> and `Dale S.` in capchecker silently points the scope check at nobody's
> real data instead of the right person's.

> **"Account status" exists specifically because `delivery-log.md`'s
> `cancelled` status can't answer this question ~ that status is scoped
> to one CYCLE (a client pausing or cancelling before a single report
> ships), never to the client's whole engagement.** Without a per-client
> field, a paused or ended account still sitting in `clients/*` is
> indistinguishable, from the folder alone, from a genuinely active
> client who simply hasn't had a cycle open recently ~ Instrument §5b's
> REDESIGN clustering-breadth predicate reads this field specifically to
> derive "the currently-active client roster" it needs and has no other
> structured source for (Codex catch, 2026-07-19). Set to `active` at
> onboarding; flip to `paused` the moment the client suspends future
> reporting, or `ended` the moment the engagement genuinely concludes
> (`delivery-log.md`'s own "client pauses future reporting" transition
> requires this SAME flip, in the same edit as its unstructured note ~
> this field, not that note, is what the router actually reads), stamping the
> date either happens ~ same "update it here, right when it happens"
> discipline as "Amplifi lead analyst" above. A `paused`/`ended` client
> is excluded from the active-client roster denominator entirely, not
> counted as a non-triggering (healthy) member of it ~ the two read very
> differently for the breadth predicate (excluding it shrinks the
> denominator; miscounting it as healthy would inflate the denominator
> with an account that was never really available to trigger anything).

> **"Client history" ~ "New"** means this system's own delivery-log/
> insight-log ARE this client's whole history, genuinely period one when
> both are empty. **"Established since" (an approximate date or
> engagement length, exactly as filled into the Snapshot row above)**
> means real prior reports exist, they just predate this corpus and
> aren't captured here. Set ONCE at onboarding (`ROADMAP.md` task 1.3b),
> never inferred from whether the logs happen to be empty.

> **"Reporting cadence"'s version number INCREMENTS on every change,
> seeded at `v1` at onboarding, and never reused or reset** ~ even a
> change that returns to a PRIOR cadence value gets the NEXT version
> number, not the old one back (weekly `v1` → monthly `v2` → weekly `v3`,
> never weekly `v1` again). Instrument §2's cycle-time baseline is
> versioned by this full value (cadence word + version number together),
> not the bare cadence word alone, specifically because two eras can
> share the same word ~ a client who goes weekly → monthly → weekly has
> two DIFFERENT weekly baselines (pre- and post-monthly-detour), and
> filtering `delivery-log.md`'s `Cadence` column by "weekly" alone would
> silently pool both eras' cycles into one trailing-window average even
> though `v1`'s and `v3`'s normal pace may differ (Codex catch,
> 2026-07-19). Update this field, bumping the version number and stamping
> today's date, the moment a cadence change actually happens (same
> "update it here, right when it happens" discipline as "Amplifi lead
> analyst" above) ~ `delivery-log.md` touch 1 copies this field's CURRENT
> full value into that cycle's row.

## The brief (what they actually asked for)

{Paste/summarize the original client brief here. Objectives, KPIs they care
about, competitors to watch, campaigns in flight.}

## Unique asks (outside the usual baseline format)

{Anything this client wants that the standard baseline/report doesn't cover.
This section exists because "unique asks from client → not part of usual
baseline format" was a named pain ~ trap those asks here so they survive
analyst handoffs.}

## FAQs & clarifications (append new rows; never delete)

> Every answered question gets a row. This kills re-inferring, re-asking,
> and the slow-reply wait for things we were already told. **If a client
> corrects or changes an earlier answer, don't just append the new one** ~
> that leaves two "active" answers and a skill could apply either.
> Add the new row AND flip the old row's Status to `superseded`, pointing
> at the date that replaced it. Skills only trust rows marked `current`.
> **This is a Markdown table too ~ escape any literal `|` in `Question`,
> `Answer`, or `Source` the same way `README.md`'s Snapshot-table rule and
> `delivery-log.md`'s free-text-cell rule already require** (Codex catch,
> 2026-07-19: this append procedure never stated the rule at all, unlike
> either of those two). A client's actual wording can easily contain a
> literal `|` (a platform list like "FB | IG", a pasted comparison), and an
> unescaped one is read as a NEW column boundary by any Markdown parser,
> corrupting the row and shifting `Status`/`Source` out of alignment with
> what they're supposed to describe. Write `\|` for a literal pipe in any
> cell, never a bare `|`; un-escape back to `|` when reading a cell's real
> value, same as any other Markdown-escaped value in this corpus.

| Date | Question | Answer | Status | Source |
|---|---|---|---|---|
| {YYYY-MM-DD} | {what we asked} | {what they said} | `current` | {email/call/meeting} |
| {earlier date, if corrected} | {same question} | {old answer} | `superseded → see {new date}` | {…} |

## Out of scope / do NOT

{Things the client explicitly doesn't want ~ topics, competitors, tones.}
