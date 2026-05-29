# Use a Router-First API Contract

The oRPC router in the API Worker is the source of truth for application procedures, and the Contract Artifact is generated from that router for client runtime use. This keeps server behavior, typed errors, OpenAPI metadata, and client types aligned while preventing web and mobile clients from depending on the API implementation directly.

**Considered Options**

- Router-first oRPC contract generation from the API Worker.
- Handwritten or contract-first client API definitions.
- Direct client imports from the API Worker implementation.
