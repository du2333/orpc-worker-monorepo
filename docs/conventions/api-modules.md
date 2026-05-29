# API Modules

- Keep typed application errors in service-level results and translate them to declared oRPC errors at the router boundary.
- Keep API DTO mapping in API Modules; do not make Database Modules return API contract shapes.
- Define API Module route paths relative to the oRPC API prefix; do not include `/api` inside module route definitions.
- Keep Worker request objects at the route/runtime boundary; services should depend on explicit config, repositories, and values instead of reading `Request`, `Headers`, or `ExecutionContext` directly.
- Use `router.ts` for oRPC route definitions.
- Use `schema.ts` for Zod input and output schemas that shape the API contract.
- Use `service.ts` for feature orchestration and application rules.
- Use `runtime.ts` to assemble request-scoped dependencies from the API context.

When adding an API Module:

1. Add `apps/api/src/modules/<module>/schema.ts`.
2. Add `apps/api/src/modules/<module>/service.ts`.
3. Add `apps/api/src/modules/<module>/runtime.ts`.
4. Add `apps/api/src/modules/<module>/router.ts`.
5. Register the module router in `apps/api/src/orpc/router.ts`.
6. If the module is DB-backed, add its Database Module entry point under `packages/db/src/modules/<module>/index.ts`.
7. Refresh the Contract Artifact after route changes when you need the generated file updated immediately.
