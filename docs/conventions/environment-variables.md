# Environment Variables

- Add API Worker environment variables to `apps/api/src/env.ts` and consume them through `context.config`; do not read raw `env` or `process.env` inside feature modules.
- Add web client environment variables to `apps/web/src/lib/env.ts`; do not read `import.meta.env` directly from components or feature code.
- Add mobile client environment variables to `apps/mobile/src/lib/env.ts`; do not read `process.env` directly from components or feature code.
- Use `VITE_*` for web client variables and `EXPO_PUBLIC_*` for mobile client variables.
- Do not put secrets in web or mobile public environment schemas.
- Keep `.env.example` and `.dev.vars.example` files aligned with the validated env schemas.
