# Database Modules

- Treat `packages/db/src/schema/auth.ts` as Better Auth-owned generated schema; change Better Auth options/plugins and regenerate it instead of editing auth tables by hand.
- Handwrite application schema files outside the Better Auth schema, then export them from `packages/db/src/schema/index.ts`.
- When adding a DB-backed API feature, expose its repository through a `@repo/db/*` package subpath instead of importing internal DB package files from the API Worker.
- Keep Database Module repositories focused on persistence records and queries, not API DTOs.
- Put each DB module's public entry point at `packages/db/src/modules/<module>/index.ts`; `@repo/db/*` package exports resolve to these module entry points.
- Export new schema files from `packages/db/src/schema/index.ts` so Drizzle client creation and migration generation see the full schema.
- Generate a Drizzle migration when changing database schema.
- Do not edit local D1 state under `.wrangler` or generated migration metadata by hand unless explicitly repairing a migration.
