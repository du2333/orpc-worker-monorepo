# Development Conventions

Project-level development conventions are split by area so agents can read only the rules relevant to the change they are making. These are working rules, not glossary terms or architectural decisions.

## Convention Files

- [Generated Files](./conventions/generated-files.md) - generated artifacts and type files.
- [Environment Variables](./conventions/environment-variables.md) - validated env access and public env prefixes.
- [Auth](./conventions/auth.md) - Better Auth server/client boundaries and schema generation.
- [API Client Package](./conventions/api-client-package.md) - shared oRPC client utilities.
- [API Modules](./conventions/api-modules.md) - oRPC module structure and service boundaries.
- [Database Modules](./conventions/database-modules.md) - Drizzle schema, migrations, and repository exports.
- [Template Scope](./conventions/template-scope.md) - scaffold-only template boundaries.

For new DB-backed API features, read both [API Modules](./conventions/api-modules.md) and [Database Modules](./conventions/database-modules.md).
