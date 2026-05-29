# Auth

- When changing auth providers, plugins, session behavior, or auth base paths, check the API server auth options, web auth client, mobile auth client, and env examples together.
- Keep web and mobile Better Auth clients separate unless the runtime storage and cookie behavior are proven to be identical.
- Keep runtime auth configuration and CLI schema-generation auth configuration separate: runtime auth uses the request-scoped D1 database, while `auth:schema` uses the schema-only adapter.
- Configure social providers on the API server runtime auth options and keep provider credentials in API Worker env examples; do not expose provider secrets through web or mobile env.
- Keep mobile OAuth browser flow code behind `apps/mobile/src/lib/auth/oauth.ts`. The mobile auth client still owns Better Auth Expo storage, cookies, and session behavior; the OAuth helper only owns opening the provider flow and saving the returned session cookie.
- For real-device mobile OAuth testing, use the Mobile API Prefix with a LAN IP and register the provider callback against the Auth Endpoint, for example `http://<LAN_IP>:8787/api/auth/callback/github`.
