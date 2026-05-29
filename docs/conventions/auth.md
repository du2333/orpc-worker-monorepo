# Auth

- When changing auth providers, plugins, session behavior, or auth base paths, check the API server auth options, web auth client, mobile auth client, and env examples together.
- Keep web and mobile Better Auth clients separate unless the runtime storage and cookie behavior are proven to be identical.
- Keep runtime auth configuration and CLI schema-generation auth configuration separate: runtime auth uses the request-scoped D1 database, while `auth:schema` uses the schema-only adapter.
