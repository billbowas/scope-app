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

### First-time setup

1. Create a Supabase project at https://supabase.com (if not already done)
2. Enable Google as an OAuth provider in Supabase Auth:
   - Go to Project Settings → Auth → Providers
   - Enable Google and add your OAuth client ID/secret
3. Clone the repository
4. Copy `.env` from the primary checkout and fill in Supabase credentials:
   ```bash
   cp /path/to/primary/.env .env
   ```
   Required keys: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_KEY`, `DATABASE_URL`, `SECRET_KEY`, `SIGNUP_ALLOWLIST`
5. Install dependencies: `pip install -e ".[dev]"`
6. Run migrations: `alembic upgrade head`
7. Run the app: `flask --app scope.app run`

The app will start on `http://localhost:5000`:
- Visit `/auth/signin` to test Google OAuth (will redirect to Google's consent screen)
- The `/healthz` endpoint returns `{"status":"ok","app":"scope"}`

### Running tests

```bash
pytest
```

### Code quality

```bash
ruff check scope tests
```

## Status

**Slice 1 (Foundation):** Complete. Basic Flask app, domain layer, Alembic.
**Slice 2 (Auth + First-Run):** Complete. Google OAuth, profiles table, signup trigger, sign-in and setup templates, welcome wizard, default-deny guard.
**Slice 3 (Scoped Repos + RLS):** In progress. Repository model, two-account Playwright test, RLS enforcement.
