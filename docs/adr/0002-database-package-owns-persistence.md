# Keep Persistence Ownership in the Database Package

The Database Package owns table schema, migrations, and DB-side repositories, while API Modules own routes, contract schemas, service orchestration, errors, and DTO mapping. This keeps persistence structure reusable and centralized without letting application route handlers accumulate direct table ownership.

**Considered Options**

- Centralized persistence ownership in `@repo/db`.
- Drizzle schema and queries colocated inside the API Worker.
- Direct database access from each client-facing app.
