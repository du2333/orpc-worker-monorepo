# oRPC Worker Monorepo Context

This context defines the language for the reusable application architecture represented by this repository.

## Language

**Architecture Template**:
A reusable project foundation that demonstrates how the API, clients, database, authentication, and deployment boundaries fit together. It is not a finished business application.
_Avoid_: Product app, business app, demo-only repository

**Example Module**:
A small feature used to exercise the template's API, database, client, and error-handling paths. It is a scaffold verification path, not a place for real product rules to accumulate.
_Avoid_: Core domain, greeting product, sample business, business module

**API Worker**:
The backend deployment unit that receives API traffic for the template. It contains both the oRPC API and the Auth Endpoint.
_Avoid_: API, backend, server

**oRPC API**:
The contract-backed application API owned by oRPC routes. It excludes the Auth Endpoint.
_Avoid_: API, backend routes, auth API

**Auth Endpoint**:
The authentication surface owned by Better Auth. It is separate from the oRPC API even when both are served by the same API Worker.
_Avoid_: oRPC auth, login route, auth API

**Router-First API**:
An API shape where the oRPC router is the source of truth for procedures, contracts, and generated client behavior. Contract files are derived from the router and are not authored by hand.
_Avoid_: Contract-first API, client-defined API, handwritten contract

**Contract Artifact**:
The generated representation of the Router-First API consumed by clients at runtime. It mirrors the router but does not own API behavior.
_Avoid_: API source, router, implementation

**API Client Package**:
The shared package that creates typed clients from the Contract Artifact and exposes generic oRPC protocol utilities. It stays thin and does not own feature-specific hooks, UI feedback, or application workflows.
_Avoid_: Shared feature hooks, shared React Query layer, shared UI API state

**Database Package**:
The owner of database schema, migrations, and DB-side repositories for the template. It exposes persistence boundaries to API Modules without making those modules own table structure.
_Avoid_: DB utils, shared schema folder, API database code

**API Module**:
A cohesive oRPC API area that owns routes, contract schemas, service orchestration, typed application errors, and DTO mapping. It depends on Database Package repositories for persistence.
_Avoid_: DB module, route file, business table owner

**Web Client API Path**:
The web application's API access model where server-side rendering calls the API Worker through a service binding and browser code calls the web origin's `/api` path. Browser code should not need a separate API origin.
_Avoid_: Web API origin, browser API URL, CORS API path

**Mobile API Prefix**:
The full API prefix URL configured for the mobile app. It points at the API Worker path that serves the oRPC API, and the Auth Endpoint base URL is derived from it.
_Avoid_: Mobile origin, auth base URL, localhost API

## Example Dialogue

Dev: Should we add another field to the Example Module?

Domain Expert: Only if it helps prove an Architecture Template boundary. If it represents a real product rule, it belongs in the future application built from this template, not in the template itself.

Dev: I need to change the API. Which part do you mean?

Domain Expert: If it changes generated client procedures, call it the oRPC API. If it changes sign-in, sessions, or callbacks, call it the Auth Endpoint. If it changes routing or deployment for the backend as a whole, call it the API Worker.

Dev: Can I edit the Contract Artifact directly to unblock a client change?

Domain Expert: No. Change the Router-First API, then regenerate the Contract Artifact so clients consume the updated shape.

Dev: Should shared API hooks live in the API Client Package?

Domain Expert: No. The API Client Package creates typed clients from the Contract Artifact. Each app owns its own hooks, cache behavior, and UI feedback.

Dev: Where should a new query against an application table live?

Domain Expert: Put the table and DB-side repository in the Database Package. The API Module should call that repository and map the result into its own API output shape.

Dev: What API URL should web browser code use?

Domain Expert: Use the Web Client API Path. Server-side rendering reaches the API Worker through its service binding, while browser code stays on the web origin under `/api`.

Dev: Can mobile use the same implicit API path as web?

Domain Expert: No. Mobile needs a Mobile API Prefix because it has no web origin proxy. The Auth Endpoint base URL should be derived from that same prefix.
