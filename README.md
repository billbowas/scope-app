# Scope

A homework forecasting tool for students. Upload a course syllabus PDF, an LLM extracts every assignment, and the app presents the term across three views:

| View | Question it answers |
|---|---|
| **Today** | What do I need to deal with in the next 48 hours? |
| **Workload** | Where is the pressure concentrated? |
| **Runway** | What does the shape of the whole term look like? |

Scope is a **forecasting** tool, not a tracking tool. Analytics don't depend on the user checking things off.

## This repo

This is the **public** side of Scope — design, docs, and the interactive E2E simulator. The backend implementation lives in a private repo.

| Repo | Visibility | Contents |
|---|---|---|
| `billbowas/scope-app` (this one) | Public | PRD, wireframe, UI research, design system, E2E simulator, `architecture.md` |
| `billbowas/scope-backend` | Private, invite-only | Flask app, migrations, tests, adapters, deployment config |

## What's here

- [`architecture.md`](./architecture.md) — the single source of truth for stack, layout, multi-tenancy, data model, product decisions.
- [`docs/PRD.md`](./docs/PRD.md) — MVP scope and locked product decisions.
- [`docs/design-system/`](./docs/design-system/) — full Scope Design System: tokens, JSX component references, `ui_kits/scope-app/` click-through kit, guidelines.
- [`docs/design/wireframe.html`](./docs/design/wireframe.html) — five-screen MVP wireframe.
- [`docs/design/tech-stack-review.html`](./docs/design/tech-stack-review.html) — annotated tech stack review.
- [`docs/ui-research.md`](./docs/ui-research.md) — market research on adjacent apps.

## Run the E2E simulator locally

Zero backend required — the simulator is a click-through of every screen using fake data.

```bash
cd docs/design-system
python3 -m http.server 8765
```

Then open http://localhost:8765/ui_kits/scope-app/index.html — signin → term → upload → verify → approve → Today / Workload / Runway. "Restart flow" in the bottom-right resets the state.

## Stack (locked)

- **Backend:** Flask + Jinja2 + Alpine.js
- **DB + Auth:** Supabase Postgres + Supabase Auth (Google OAuth, real RLS)
- **ORM + Migrations:** SQLAlchemy + Alembic
- **LLM:** Gemini (JSON mode)
- **PDF:** PyMuPDF
- **Email:** Resend
- **Host:** Fly.io, pinned to one machine

## Status

Under active build. See [`docs/PRD.md`](./docs/PRD.md) for the MVP roadmap.
