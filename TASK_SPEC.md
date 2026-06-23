# TASK_SPEC — Locale Reference

## Goal

Build a single-page web app that displays a reference table of locales. Each locale shows: code, language, country, currency, TLD, and flag. The project is split into 3 milestones, no frameworks, no npm.

---

## M1 — Backend (branch: `m1/locales-ref`)

**Deliverable:** Node HTTP server that serves a JSON API of locales.

### Steps

1. Create `locales.js` — generator script using `Intl.DisplayNames` and `Intl.NumberFormat` to produce locale data
2. Build a hardcoded list of 50 locale codes (en-US, de-DE, ja-JP, …)
3. For each code extract: language, country, currency, TLD (mapped), flag (emoji regional indicators)
4. Run generator → produces `locales-data.json`
5. Create `server.js` — pure `http` module:
   - `GET /api/locales` → JSON of all locales
   - Static file server for `public/` directory
6. Verify: `curl http://localhost:3010/api/locales` returns valid JSON with 50 entries, all fields populated

**Files created:**
- `locales.js`
- `locales-data.json`
- `server.js`

---

## M2 — Frontend (branch: `m2/frontend-table`)

**Deliverable:** Dark-themed HTML table rendering locales from the API.

### Steps

1. Create `public/index.html`:
   - Header: "Locale Reference"
   - Counter: `<p class="counter">50 locales</p>`
   - Table with columns: Country, Flag, Language, Currency, TLD
   - Links to `style.css` and `app.js`
2. Create `public/style.css`:
   - Dark theme (background `#121212`, text `#e0e0e0`)
   - Zebra striping (`:nth-child(even)`)
   - Hover highlight
   - Responsive breakpoint at 600px
   - Flag column: large emoji, centered
3. Create `public/app.js`:
   - `fetch('/api/locales')` on page load
   - Render rows via `DocumentFragment`
   - Update counter

**Files created:**
- `public/index.html`
- `public/style.css`
- `public/app.js`

---

## M3 — Search (branch: `m3/search`)

**Deliverable:** Live filtering of the table via a search input.

### Steps

1. Add `<input type="search" id="search-input">` to `index.html`
2. Style input in `style.css` (dark theme, rounded, focus border)
3. In `app.js`:
   - Store searchable text (code, language, country) per row in `dataset.search`
   - On `input` event: hide/show rows based on substring match
   - Update counter: "N of 50 locales" when filtered
4. Verify: type in search → table filters, counter updates, empty input shows all

**Files modified:**
- `public/index.html`
- `public/style.css`
- `public/app.js`

---

## Branch Strategy

```
main
  └── dev                       # integration branch
        ├── m1/locales-ref       # M1 → merged to dev
        ├── m2/frontend-table    # M2 → merged to dev
        └── m3/search            # M3 → merged to dev
```

Each milestone branch is created from `dev` and merged back via fast-forward.

---

## Tests Performed

### M1 — Backend

| # | Test | Method |
|---|------|--------|
| T1 | 50 locales returned | `curl /api/locales` → JSON array length == 50 |
| T2 | All fields present | Every object has `code`, `language`, `country`, `currency`, `tld`, `flag` |
| T3 | All currencies mapped | No empty `currency` fields |
| T4 | Sort order | Entries sorted alphabetically by `code` |
| T5 | Flags are valid emoji | Each flag consists of 2 Regional Indicator Symbols (Unicode) |
| T6 | HTTP 200 + Content-Type | Response header `Content-Type: application/json; charset=utf-8` |

### M2 — Frontend

| # | Test | Method |
|---|------|--------|
| T7 | HTML page renders | `curl /` → HTTP 200 |
| T8 | Static files served | `curl /style.css` → 200, `curl /app.js` → 200 |
| T9 | Table element present | HTML contains `<table>` |
| T10 | Counter element present | HTML contains `class="counter"` |
| T11 | CSS linked | HTML references `style.css` |
| T12 | JS linked | HTML references `app.js` |
| T13 | All 5 column headers | HTML contains Country, Flag, Language, Currency, TLD |
| V1 | Dark theme | Visual: background `#121212`, light text |
| V2 | Zebra stripes | Visual: alternating row backgrounds |
| V3 | Hover highlight | Visual: row highlight on hover |
| V4 | Flags visible | Visual: emoji flags render in all rows |
| V5 | Responsive | Visual: usable at 400px viewport width |

### M3 — Search

| # | Test | Method |
|---|------|--------|
| T14 | Search input exists | HTML contains `<input id="search-input" type="search">` |
| T15 | dataset.search set | JS stores code/language/country in each row's `dataset.search` |
| T16 | Input event listener bound | JS calls `addEventListener('input', …)` |
| T17 | Counter updates dynamically | JS contains "of" pattern for filtered count |
| V6 | Filter works | Type "ru" → only Russian-related locales shown |
| V7 | Empty input resets | Clear input → all 50 rows visible, counter shows "50 locales" |
| V8 | Case insensitive | Search "AU" matches "en-AU", "Australia", "EUR" matches "EUR"
