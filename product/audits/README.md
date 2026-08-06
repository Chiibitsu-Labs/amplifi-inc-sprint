# product/audits/

Completed Tier 3 cross-model audit packs (vibeOS `docs/04-audit-protocol.md`,
`templates/audit-pack.md`) for changes that touched auth, payments, personal data,
migrations, uploads, or external writes in this repo. One file per change:
`<change-name>.md`, committed before merge — the PR thread isn't the record.

First pack: `supabase-migration-and-service-role.md` (2026-08-06, PR #13) — the retroactive
migration and service-role write path for `amplifi_sprint_access`. The access-log gate
(`site/middleware.ts`, `site/app/access/`) and the actual password-check logic in
`site/app/api/access/route.ts` still haven't individually gone through this process — get a
retroactive pack the next time any of those three is touched.
