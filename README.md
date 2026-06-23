# Locale Reference

A lightweight web reference for locales — 50 entries with country, flag, language, currency, and TLD.

## Stack

- **Backend:** Node.js (pure `http` module, no frameworks, no npm)
- **Frontend:** HTML / CSS / JS (no frameworks, no npm)
- **Data:** Generated via `Intl` API, no external dependencies

## Quick Start

```bash
node server.js
# → http://localhost:3010
```

## Project Structure

```
├── locales.js              # Dataset generator (Intl API)
├── locales-data.json       # 50 pre-generated locales
├── server.js               # HTTP server (static + API)
├── public/
│   ├── index.html          # Page layout
│   ├── style.css           # Dark theme
│   └── app.js              # Client logic (fetch, render, filter)
├── TASK_SPEC.md            # Milestone specification
├── CLOUD.md                # Development rules
└── README.md
```

## API

```
GET /api/locales → JSON array of locales
```

Each entry: `{ code, language, country, currency, tld, flag }`.

## Milestones

| M# | Branch | What |
|----|--------|------|
| M1 | `m1/locales-ref` | Backend: data generator + HTTP server + API |
| M2 | `m2/frontend-table` | Frontend: table with dark theme |
| M3 | `m3/search` | Search: live filtering by code, language, country |

## License

—
