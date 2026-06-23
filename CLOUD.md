# CLOUD — Development Rules

## Stack Constraints

- **No frameworks.** Backend: Node.js with only the `http` module (no Express, no Koa). Frontend: pure HTML / CSS / JS (no React, no Vue, no Svelte).
- **No npm.** Zero external dependencies. All libraries are built-in Node modules or browser APIs.
- **No CDN.** No external `<script>` or `<link>` tags.

## Code Style

- Use strict mode (`'use strict'`) in all JS files.
- Comments in Russian for non-trivial logic.
- English for identifiers, API responses, and UI strings (TASK_SPEC says English interface).
- Single quotes for strings (JS).
- 2-space indentation.

## Git Workflow

- Permanent branches: `main`, `dev`.
- Feature branches from `dev`: `m1/*`, `m2/*`, `m3/*`.
- Milestone branches merge into `dev` via fast-forward.
- `dev` merges into `main` only when a full milestone version is complete.
- Commit format: `"MN: short description"` where N = milestone number.

## Data

- Locales are generated via `Intl` API (not hardcoded beyond the list of codes).
- Flags are Unicode regional indicator symbols (no images).
- Currency falls back to a manual country→currency map when `Intl.NumberFormat` doesn't provide it (e.g. `ru-RU` → `RUB`).

## Server

- Port from `PORT` env var, fallback to 3010 (port 3000 is reserved by system on this host).
- Static files are served from `public/` directory.
- Path traversal protection: reject requests outside `public/`.

## Tests

- Integration tests run via curl + node after server start.
- Visual checks done manually in browser.
- Test format: `## — Test group — ##` then per test: `echo -n "TN desc: "; condition && echo "PASS" || echo "FAIL"`.
