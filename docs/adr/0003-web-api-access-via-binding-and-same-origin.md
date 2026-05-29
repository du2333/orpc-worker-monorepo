# Route Web API Access Through Binding and Same Origin

The web Worker calls the API Worker through a Cloudflare service binding during server-side rendering, and browser code calls the web origin under `/api`. This keeps browser API access same-origin, avoids exposing a separate API origin to web client code, and preserves an independent API Worker deployment boundary.

**Considered Options**

- SSR through service binding with browser same-origin `/api` routing.
- Browser code calling the API Worker origin directly.
- Combining the web app and oRPC API into a single Worker.
