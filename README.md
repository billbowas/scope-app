# Scope

A homework forecasting tool for students. Upload a course syllabus PDF, an LLM extracts every assignment, and the app presents the term across three views:

| View | Question it answers |
|---|---|
| **Today** | What do I need to deal with in the next 48 hours? |
| **Workload** | Where is the pressure concentrated? |
| **Runway** | What does the shape of the whole term look like? |

Scope is a **forecasting** tool, not a tracking tool. Analytics don't depend on the user checking things off.

## Read first

Before writing any code, read [`architecture.md`](./architecture.md). It's the single source of truth for stack, layout, multi-tenancy, the data model, and every product decision that has already been settled.

## Locked stack decisions

- **Backend:** Flask + Jinja2 + Alpine.js
- **DB + Auth:** Supabase Postgres + Supabase Auth (with real RLS, `authenticated` role)
- **ORM + Migrations:** SQLAlchemy + Alembic from day one
- **LLM:** Gemini (JSON mode) — cost/free-tier wins at 5 users
- **PDF:** PyMuPDF
- **Email:** Resend from day 1 (not Gmail SMTP)
- **Interactivity (future):** Alpine now; adopt HTMX when a component needs server-driven partials
- **Host:** Fly.io, pinned to one machine
- **CI guard:** grep on `domain/` imports to enforce the dependency rule

## Development

### Setup

1. Clone the repository
2. Copy the example environment file: `cp .env.example .env`
3. Fill in required values in `.env` (see `architecture.md §4` for required keys)
4. Install dependencies: `pip install -e ".[dev]"`
5. Run the app: `flask --app scope.app run`

The app will start on `http://localhost:5000`. The `/healthz` endpoint returns:

```json
{"status":"ok","app":"scope"}
```

### Running tests

```bash
pytest
```

### Code quality

```bash
ruff check scope tests
```

## Status

Foundation slice in progress. Basic Flask app with `/healthz` endpoint, domain layer scaffold, and Alembic wiring.
