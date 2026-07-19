# {Client Name} ~ Living Brief

> **This is a LIVING document.** It starts from the client's kickoff brief
> and grows every time the client clarifies anything. Before you infer,
> check here. After they answer, write it here. Once.

## Snapshot

| | |
|---|---|
| Client | {name} |
| Account label | {blank, unless this name collides with another account ~ see `README.md`'s duplicate-name handling. Internal disambiguation only, e.g. "Chicago office, since 2024" ~ never shown to the client, never used as the display name in generated output. `Client` above always stays the real, unqualified name} |
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

> **"Client history" ~ "New"** means this system's own delivery-log/
> insight-log ARE this client's whole history, genuinely period one when
> both are empty. **"Established since {approx. date/engagement length}"**
> means real prior reports exist, they just predate this corpus and
> aren't captured here. Set ONCE at onboarding (`ROADMAP.md` task 1.3b),
> never inferred from whether the logs happen to be empty.

> **"Reporting cadence"'s `v{n}` INCREMENTS on every change, seeded at
> `v1` at onboarding, and never reused or reset** ~ even a change that
> returns to a PRIOR cadence value gets the NEXT version number, not the
> old one back (weekly `v1` → monthly `v2` → weekly `v3`, never weekly
> `v1` again). Instrument §2's cycle-time baseline is versioned by this
> full value (cadence word + version number together), not the bare
> cadence word alone, specifically because two eras can share the same
> word ~ a client who goes weekly → monthly → weekly has two DIFFERENT
> weekly baselines (pre- and post-monthly-detour), and filtering
> `delivery-log.md`'s `Cadence` column by "weekly" alone would silently
> pool both eras' cycles into one trailing-window average even though
> `v1`'s and `v3`'s normal pace may differ (Codex catch, 2026-07-19).
> Update this field, bumping `v{n}` and stamping today's date, the moment
> a cadence change actually happens (same "update it here, right when it
> happens" discipline as "Amplifi lead analyst" above) ~ `delivery-log.md`
> touch 1 copies this field's CURRENT full value into that cycle's row.

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

| Date | Question | Answer | Status | Source |
|---|---|---|---|---|
| {YYYY-MM-DD} | {what we asked} | {what they said} | `current` | {email/call/meeting} |
| {earlier date, if corrected} | {same question} | {old answer} | `superseded → see {new date}` | {…} |

## Out of scope / do NOT

{Things the client explicitly doesn't want ~ topics, competitors, tones.}
