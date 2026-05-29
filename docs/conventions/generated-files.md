# Generated Files

- Do not hand-edit `packages/api-contract/src/contract.generated.json`; change the oRPC router and regenerate the Contract Artifact.
- Run `bun --filter @repo/api-contract generate` when you need to refresh the Contract Artifact immediately after changing oRPC routes; `build` and `typecheck` already depend on generation.
- Run `bun run cf-typegen` from `apps/api` or `apps/web` after changing Worker bindings.
- Do not hand-edit Worker type files such as `worker-configuration.d.ts`; change Wrangler bindings and regenerate types.
- Do not hand-edit `apps/web/src/routeTree.gen.ts`; change route files under `apps/web/src/routes/` and let TanStack Router regenerate the route tree.
