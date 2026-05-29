# Agent Guide

This file is the entry point for agents working in this repository. Keep it short: link to the durable docs and record only the operational rules agents are likely to miss.

## Project Map

- [README.md](./README.md) - project overview, stack, and setup. Do not treat it as the full source of conventions or decisions.
- [CONTEXT.md](./CONTEXT.md) - project language and terminology. Use this before inventing new names.
- [docs/adr/](./docs/adr/) - architectural decisions that are not obvious from the file tree.
- [docs/development-conventions.md](./docs/development-conventions.md) - index of project style and working conventions.

## Working Flow

Before changing code, read the README, CONTEXT, relevant ADRs, and relevant development conventions. Read nested AGENTS files only when working in that area.
When collaboration produces a new shared term, convention, or architectural decision, ask whether to update the relevant document: CONTEXT for glossary, development conventions for working rules, or ADRs for non-obvious architecture decisions.
Only create ADRs for decisions that are hard to reverse, non-obvious, and based on a real trade-off.

## Agent Notes

- Keep `CONTEXT.md` as glossary only. Put non-obvious architecture decisions in ADRs.
- Before editing Expo code, read the exact versioned Expo docs referenced by [apps/mobile/AGENTS.md](./apps/mobile/AGENTS.md).
