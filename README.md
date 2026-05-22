# oRPC Worker Monorepo

Independent scaffold for a router-first oRPC API on Cloudflare Workers with a TanStack Start web client.

## Shape

```txt
apps/
  api/  Cloudflare Worker API
  web/  TanStack Start web app

packages/
  api-contract/       generated minified oRPC contract artifact and router type export
  api-client/         thin OpenAPI client factory
  typescript-config/  shared TypeScript settings
```

The TypeScript source of truth is `@app/api`. `@repo/api-contract` contains the generated, minified client contract artifact plus a type-only `AppRouter` export. Frontends should never runtime import the API router implementation.

## Decisions

- Bun workspaces plus Turborepo.
- `@app/api` exposes `/api/*`, `/docs`, and `/openapi.json`.
- `@app/web` calls the API over HTTP for both browser and SSR.
- `@repo/api-client` stays runtime-neutral: apps inject URL, headers, and fetch behavior.
- Auth is scaffold-ready only. `@app/api` owns `authProcedure` and `authMiddleware`; typed auth errors stay precise to the procedures that use them.
- `@repo/api-contract` runs `bun run generate` to refresh `src/contract.generated.json`. Turbo wires this before downstream build and typecheck tasks.
- D1 is a likely future data layer, but this scaffold intentionally does not add D1 or Drizzle yet.
- No mobile app and no test suite in this first pass.

## Local Development

Install dependencies:

```sh
bun install
```

Run both apps:

```sh
bun dev
```

Run one app:

```sh
bun dev:api
bun dev:web
```

Default URLs:

```txt
API:  http://localhost:8787
Web:  http://localhost:3000
Docs: http://localhost:8787/docs
Spec: http://localhost:8787/openapi.json
```

`apps/web/.env.example` points `VITE_API_URL` at the local API endpoint:

```txt
VITE_API_URL=http://localhost:8787/api
```

API environment variables are kept out of `wrangler.jsonc`. Copy the local example file:

```sh
cp apps/api/.dev.vars.example apps/api/.dev.vars
```

Run `bun run cf-typegen` in `apps/api` after changing Worker bindings in `wrangler.jsonc` so `worker-configuration.d.ts` stays in sync. Local `.dev.vars` values are parsed at runtime by `apps/api/src/env.ts`.

Regenerate the client contract artifact after changing API routes:

```sh
bun --filter @repo/api-contract generate
```

## Quality Commands

```sh
bun run typecheck
bun run lint
bun run format:check
bun run build
```

## Clarification Rule

During implementation, any unresolved architecture, product, auth, data, deployment, or tooling decision should stop for clarification instead of being chosen silently.
