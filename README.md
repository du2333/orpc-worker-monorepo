# oRPC Worker Monorepo

A monorepo scaffold demonstrating a router-first oRPC API on Cloudflare Workers with a TanStack Start web client, connected through a generated contract artifact.

## Architecture

```
apps/
  api/     Cloudflare Worker — oRPC API server
  web/     TanStack Start — SSR web app

packages/
  api-contract/       Generated contract artifact + router type re-export
  api-client/         Thin OpenAPI client factory
  typescript-config/  Shared TypeScript configuration
```

The API (`@app/api`) is the TypeScript source of truth. `@repo/api-contract` provides a generated, minified contract JSON for runtime use and a type-only `AppRouter` export. Clients consume the contract artifact, not the API implementation.

During SSR, the web Worker proxies API requests via Cloudflare service binding. The browser calls the same origin — no CORS configuration needed.

## Features

- **Router-first architecture** — oRPC procedures defined in `@app/api`, contract generated from the router
- **Typed errors** — Errors declared on procedures flow through the contract type chain; client-side `handleORPCError` enforces exhaustive matching
- **Isomorphic API client** — SSR uses service binding; browser uses HTTP, both through the same client interface
- **OpenAPI docs** — `GET /docs` and `GET /openapi.json` served by the API Worker
- **Auth scaffold** — `authProcedure` with typed `UNAUTHORIZED` error, ready for provider integration

## Stack

| Layer    | Technology                                     |
| -------- | ---------------------------------------------- |
| Runtime  | Cloudflare Workers                             |
| API      | oRPC (server, client, contract), Zod, OpenAPI  |
| Frontend | TanStack Start, React Router, React Query      |
| Styling  | TailwindCSS v4, tw-animate-css, tailwind-merge |
| Monorepo | Turborepo, Bun workspaces                      |
| Deploy   | Wrangler                                       |

## Getting Started

```sh
bun install

# Copy local env files
cp apps/api/.dev.vars.example apps/api/.dev.vars

# Run both apps
bun dev
```

| Service      | URL                                |
| ------------ | ---------------------------------- |
| API          | http://localhost:8787              |
| Web          | http://localhost:3000              |
| API Docs     | http://localhost:8787/docs         |
| OpenAPI Spec | http://localhost:8787/openapi.json |

Regenerate the contract artifact after API changes:

```sh
bun --filter @repo/api-contract generate
```

## Quality

```sh
bun run check   # lint + format + typecheck
bun run build   # full build
```

Run `bun run cf-typegen` in `apps/api` or `apps/web` after changing Worker bindings.
