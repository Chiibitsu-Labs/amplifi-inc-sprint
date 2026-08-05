# product/audits/

Completed Tier 3 cross-model audit packs (vibeOS `docs/04-audit-protocol.md`,
`templates/audit-pack.md`) for changes that touched auth, payments, personal data,
migrations, uploads, or external writes in this repo. One file per change:
`<change-name>.md`, committed before merge — the PR thread isn't the record.

Empty as of 2026-08-05 — no Tier 3 change has gone through the full audit-pack process yet.
The access-log gate (`site/middleware.ts`, `site/app/access/`) and the Supabase-backed
session/access logging predate this file and should get a retroactive pack the next time
either is touched.
