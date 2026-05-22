# oRPC Worker Monorepo

Independent scaffold for a contract-first oRPC API on Cloudflare Workers with a TanStack Start web client.

## Shape

```txt
apps/
  api/  Cloudflare Worker API
  web/  TanStack Start web app

packages/
  api-contract/       shared oRPC contract and schemas
  api-client/         thin OpenAPI client factory
  typescript-config/  shared TypeScript settings
```

The TypeScript source of truth is `@repo/api-contract`. OpenAPI is the HTTP and documentation boundary for the Worker API, not the internal TypeScript codegen source.

## Decisions

- Bun workspaces plus Turborepo.
- `@app/api` exposes `/api/*`, `/docs`, and `/openapi.json`.
- `@app/web` calls the API over HTTP for both browser and SSR.
- `@repo/api-client` stays runtime-neutral: apps inject URL, headers, and fetch behavior.
- Auth is scaffold-ready only. No provider, session model, token storage, or database is selected.
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

## Quality Commands

```sh
bun run typecheck
bun run lint
bun run format:check
bun run build
```

## Clarification Rule

During implementation, any unresolved architecture, product, auth, data, deployment, or tooling decision should stop for clarification instead of being chosen silently.
