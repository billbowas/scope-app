# Scope — Architecture

> Handoff document for Claude Code. Read this before writing any code.
> Supersedes `from-scratch.md`, which contains several errors corrected below.
> `new_project.md` remains accurate as a description of **SLATE v1** (the single-user
> predecessor) and as a record of what worked. It is not a spec for Scope.

---

## 1. What Scope is

Scope is a homework forecasting tool for students. A user uploads a course syllabus PDF,
an LLM extracts every assignment, and the app presents the term across three views:

| View | Question it answers |
|---|---|
| **Today** | What do I need to deal with in the next 48 hours? |
| **Workload** | Where is the pressure concentrated? |
| **Runway** | What does the shape of the whole term look like? |

Scope is deliberately a **forecasting** tool, not a tracking tool. Assume users will not
reliably check items off. **No analytic, chart, or insight may depend on `is_complete`
being accurate.** Completion is a convenience for the user, never an input to the math.

### What changed from SLATE

SLATE was single-user, local-only, no auth, SQLite, one person's laptop. Scope is the
same product concept rebuilt for a small number of real users. Everything in this document
follows from that one change.

---

## 2. Constraints (read these before proposing anything)

- **~5 users.** Not 5,000. This is the single most important sizing fact in this document.
  Several standard "correct" choices are deliberately rejected below because of it.
- **One developer**, working through GitHub issues with Claude Code, one issue at a time.
- **The project owner is not a software engineer.** Code should be readable and
  conventional over clever. Explanations in PR descriptions and comments should assume
  a smart non-specialist reader.
- **Real user data exists.** From the first real signup, data cannot be wiped to
  accommodate a schema change. This is the constraint that kills SLATE's
  "no migrations, just `flask init-db`" approach.

---

## 3. The central architectural insight

**Scope is a calculation engine with a thin data-entry shell around it.**

The database stores flat, boring facts: *"Problem Set 2, due Sep 15, Statistics,
magnitude 2."* Almost nothing a user reads on screen is one of those facts. Consider what
the UI actually renders:

- "Heavy day — tomorrow is your biggest day."
- "Peak week: 41 items, +34% vs term average"
- "Clearest window: Aug 25–31, −45% vs term average"
- "Most demanding course: Corporate Finance, 38% of total load"
- "Wednesdays are your heaviest day. You handle 1.8x more items on Wednesdays than Mondays."
- "Collision ahead — Sep 14–16 has 3 major items across courses"
- "On pace, ~2.3 days ahead"
- "Term progress: 18%, 3 of 16 weeks"

Every one of these is **derived**. The interesting, valuable, and frequently-revised part
of Scope is the derivation, not the storage.

This drives the entire structure: the calculation logic must live in its own isolated
layer that can be exercised without a database, a web server, or a network call. If that
layer is entangled with Flask or SQLAlchemy, every tweak to a workload heuristic requires
uploading a PDF, waiting for the LLM, loading a page, and eyeballing a chart. That is slow
enough that verification stops happening.

### The litmus test

> **Can the entire Runway view — heat map, swimlanes, big rocks, collisions, open windows,
> pace — be computed in a unit test from a hand-written list of assignments, with no Flask
> app, no Postgres, and no Gemini?**

If yes, the architecture is intact. If no, something has leaked out of the domain layer.
Every structural decision below exists to keep that test passing.

---

## 4. Layout

```
scope/
  domain/              # PURE PYTHON. Imports nothing from flask, sqlalchemy, or the network.
    entities.py          # Assignment, Course, Term, WeekLoad, Collision (dataclasses)
    today.py             # next-48h grouping, day intensity, "start tonight" pick
    workload.py          # weekly load, peak week, clearest window, per-course share, day rhythm
    runway.py            # term progress, heat map cells, swimlanes, collisions, open windows,
                         #   big rocks, load-ahead pace, suggested start dates
    series.py            # recurring-series grouping + cadence inference (§10.4)
    gates.py             # tab-level and card-level data thresholds (§10.2)
    errors.py            # ScannedPDFError, DuplicateSyllabus, ExtractionFailed, ...

  services/            # Use cases. Orchestration only. No flask.request, no flask.session.
    upload.py            # start_upload(), answer_questions(), confirm_upload()
    dashboard.py         # build_today_view(), build_workload_view(), build_runway_view()
    courses.py
    assignments.py
    notifications.py     # send_daily_digests()

  adapters/            # Everything that touches the outside world.
    db/
      models.py          # SQLAlchemy table definitions
      repositories.py    # CourseRepository, AssignmentRepository, ... (see §5)
      session.py         # session factory + the RLS hook (see §5)
    gemini.py            # text -> structured assignments
    pdf.py               # PyMuPDF text extraction
    email.py             # SMTP sender

  web/                 # Thin Flask layer.
    auth.py              # login, signup, logout
    dashboard.py
    courses.py
    assignments.py
    upload.py
    errors.py            # maps domain exceptions -> HTTP responses, in one place
    templates/
    static/

  config.py            # single Settings object, loaded once at startup
  app.py               # wiring / application factory

migrations/            # Alembic
docs/decisions/        # ADRs (see §8)
tests/
```

### The dependency rule

Imports point **inward** only:

```
web  ──►  services  ──►  domain
             ▲
adapters ────┘
```

- `domain` imports nothing of ours.
- `services` import `domain`.
- `adapters` and `web` import `services` and `domain`.
- **Nothing** imports `web`.

If `domain/runway.py` ever contains `from flask import ...` or `from sqlalchemy import ...`,
the design has been violated. That single grep is a useful CI check.

### Two rules that keep the domain pure

1. **No `datetime.now()` inside the domain layer.** "Today" is always passed in as an
   argument. This is what makes the math testable (you can assert against a fixed date) and
   is also how per-user timezones stay correct.
2. **The domain works on dataclasses, not ORM objects.** Repositories return
   `domain.entities.Assignment`, not `adapters.db.models.Assignment`. Mapping happens in
   the repository. This is the boundary that prevents SQLAlchemy from leaking upward.

---

## 5. Multi-tenancy

This is the one bug class that causes real harm, so it gets two independent layers of
protection.

### Layer 1 — repositories that cannot be constructed without a user

The failure mode to design out is a forgotten `.filter_by(user_id=...)`. Do **not** solve
this with discipline or a helper function that must be remembered. Solve it by making the
unscoped query impossible to express:

```python
class AssignmentRepository:
    def __init__(self, session, user_id: str):
        self._s = session
        self._uid = user_id

    def list_for_term(self, term_id: str) -> list[Assignment]:
        rows = (self._s.query(models.Assignment)
                .filter_by(user_id=self._uid, term_id=term_id)
                .all())
        return [_to_entity(r) for r in rows]
```

There is no unscoped `list()` anywhere in the API surface. Every repository takes
`user_id` in its constructor. The web layer reads `user_id` from the Flask session exactly
once per request, builds the repositories, and hands them to a service.

**Services never read `flask.session`.** They receive `user_id` as a parameter. That is
both a purity rule and the reason services can be tested without a request context.

### Layer 2 — Postgres Row Level Security, actually switched on

`from-scratch.md` claims RLS means "even a SQL mistake can't leak another user's data."
**As written in that document, this is false.** It connects SQLAlchemy using the
`postgres` role connection string and uses `SUPABASE_SERVICE_KEY`. Both bypass RLS
entirely. The policies would exist and do nothing.

To make RLS real, connect as the `authenticated` role and set the JWT subject claim at the
start of every request's transaction:

```python
# adapters/db/session.py
@contextmanager
def user_session(user_id: str):
    s = SessionLocal()
    try:
        s.execute(
            text("select set_config('request.jwt.claim.sub', :uid, true)"),
            {"uid": user_id},
        )
        yield s
        s.commit()
    except Exception:
        s.rollback()
        raise
    finally:
        s.close()
```

With this in place, a query that forgets its user filter returns **zero rows** instead of
everyone's rows. That converts a data breach into a visible bug.

Keep one separate service-role connection for genuine admin work (the daily digest job,
which legitimately iterates across users). Everything else uses the scoped session.

**This is the only item in this document that cannot be safely retrofitted later.**
Everything else on the "skip for now" list can be added in an afternoon. Isolation cannot
be added after data has leaked.

---

## 6. Data model

Changes from `from-scratch.md`, all driven by what the UI actually renders:

### `profiles` — new

Supabase's `auth.users` table is not extensible. The standard pattern is a public mirror,
populated by a trigger on signup.

```sql
create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  timezone     text not null default 'America/New_York',
  created_at   timestamptz default now()
);
```

`timezone` is required, not optional. The UI shows "Wednesday 12 August · 10:25 PM",
"due tomorrow", "start tonight", and a today-marker on the heat map. With one user in one
place this was invisible. With several users it determines correctness — what counts as
"tomorrow" differs per person.

### `terms` — new

```sql
create table public.terms (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  name       text not null,
  start_date date not null,
  end_date   date not null,
  created_at timestamptz default now()
);
```

`new_project.md` states term dates aren't needed because assignment deadlines carry the
information. **The UI contradicts this.** The Workload tab renders "15 weeks · Aug 12 –
Nov 23" with fixed week buckets W1–W15; Runway shows "Term progress: 18%, 3 of 16 weeks"
and a heat map spanning a fixed range. None of that can be derived from assignment dates —
it must be stored.

`courses` gains `term_id`. This also gives an answer to what happens when a term ends
(see §10.1).

### Everything else

Carry over `courses`, `uploads`, `assignments`, `notification_settings` broadly as
specified in `from-scratch.md`, with these amendments:

- Use native Postgres `uuid` columns (`sqlalchemy.dialects.postgresql.UUID`), not
  `String(36)`.
- `assignments` gains `term_id` (denormalized alongside `course_id`) so week-bucketing
  queries don't require a join.
- `notification_settings.send_hour` is interpreted in the user's `profiles.timezone`.
  Store the schedule as local hour + the user's timezone; compute UTC send times at job
  run time.
- `uploads` keeps `unique(user_id, pdf_hash)` — duplicate detection is correctly per-user.
- `assignments` gains a nullable `series_key text`, tagging items that belong to a detected
  recurring series (Problem Set 1–12, weekly readings). See §10.4.
- `assignments` gains a nullable `trashed_at timestamptz` — deletion is soft, with a 30-day
  auto-purge. See §10.7.

### `pending_uploads` — with a status column

`from-scratch.md` correctly identifies that the in-memory `PENDING = {}` dict must become a
table. Give it a status field:

```sql
create table public.pending_uploads (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  course_id  uuid not null references public.courses(id) on delete cascade,
  filename   text not null,
  pdf_hash   text not null,
  status     text not null default 'extracting'
             check (status in ('extracting','questions','ready','confirmed','failed')),
  payload    jsonb,
  error      text,
  created_at timestamptz default now()
);
```

At 5 users, extraction still runs synchronously inside the request (see ADR 0003). The
status column costs nothing now and is the seam that lets extraction move to a background
job later without a schema change.

### RLS

Enable RLS on every table above with a `using (auth.uid() = user_id)` policy
(`auth.uid() = id` for `profiles`). Per §5, these only function if the app connects as the
`authenticated` role.

---

## 7. Corrections to `from-scratch.md`

Claude Code's rebuild plan is a reasonable checklist but contains errors. Do not follow it
as written.

| Claim in that doc | Correction |
|---|---|
| "RLS means even a SQL mistake can't leak data" | False as configured — the service key and `postgres` role bypass RLS. See §5. |
| `sign_in_with_password` using `SUPABASE_SERVICE_KEY` | Use the **anon** key for user auth flows. The service key is admin-only and must never handle user sign-in. |
| Step 9: "add `.filter_by(user_id=...)` to all queries in 5 route files" | Rejected. Scoping belongs in repository construction (§5), not scattered call sites. |
| "Supabase owns the schema — never use migrations" | Rejected. Hand-run SQL in the dashboard means the schema isn't version-controlled and dev/prod drift silently. Use Alembic. See ADR 0005. |
| `db.String(36)` for UUIDs | Use native Postgres `uuid`. |
| `UNPROTECTED = {"/login", "/signup", "/static"}` with `startswith` | Default-deny is the right instinct, but prefix matching is sloppy (`/login-foo` passes). Use an explicit `@public` decorator keyed on endpoint name. Add a `/healthz` exemption for the host's health checks. |
| Phase 7 build order | Rejected — it rewrites every file simultaneously and nothing runs until the final step. See §9. |
| No `profiles` table, no `terms` table, no timezone | All three are required by the UI. See §6. |

---

## 8. Deliberate exclusions

At 5 users, most "proper" infrastructure is cost without benefit. The distinction that
matters is between *forgetting* to build something and *deciding* not to. Each item below
gets a short ADR in `docs/decisions/` recording the reasoning **and the trigger for
revisiting it**.

| ADR | Decision | Revisit when |
|---|---|---|
| 0001 | Supabase Postgres over SQLite | — (required by multi-user) |
| 0002 | Keep Flask + Jinja2 + Alpine.js; no SPA rewrite | The UI needs offline support or genuinely app-like state |
| 0003 | Syllabus extraction runs synchronously in the HTTP request; no job queue | We run >1 web worker, OR p95 upload exceeds ~20s, OR a user reports a timeout |
| 0004 | Single gunicorn worker with 4 threads | Concurrent-request latency becomes noticeable — note this also currently prevents duplicate scheduler runs, so 0003 and 0004 must be revisited together |
| 0005 | Alembic migrations from day one | Never — this is permanent |
| 0006 | Concrete repository classes; no Protocol interfaces, no DI container | We need to swap a data store, or service tests become painfully slow against a real DB |
| 0007 | Gmail SMTP with an app password | >~20 users, or digests start landing in spam (then: Resend or Postmark) |
| 0008 | New repo; SLATE stays running untouched | — |
| 0009 | No Redis, no Celery, no caching layer, no observability platform | A page takes >2s to render, or we can't diagnose an incident from stdout logs |
| 0010 | Simple CRUD bypasses the service layer and calls repositories directly (§10.3) | A direct route exceeds ~10 lines, needs a business-rule `if`, or needs two writes in one transaction — then that operation moves to a service |
| 0011 | **Host on Fly.io**, with Supabase providing Postgres and Auth | We outgrow a single small VM, or need multi-region |

ADR 0004 is worth calling out explicitly: running one worker is what currently prevents the
APScheduler daily-digest job from firing once per worker and sending duplicate emails to
every user. That coupling must be written down, because the day someone scales to two
workers to fix a performance problem, they will silently start double-emailing everyone.

**On Fly.io specifically (ADR 0011), this means pinning the app to exactly one machine** —
`min_machines_running = 1` and no autoscaling. Fly will otherwise happily start a second
instance under load, and a second instance means a second scheduler. Fly suits this project
well: a small always-on VM, no cold starts, HTTPS handled for you, and roughly the cost of
a coffee per month. The one-machine constraint is a real limitation and belongs in the ADR,
not in someone's head.

### What is *not* optional at any scale

- Alembic migrations (ADR 0005)
- RLS wired correctly (§5, Layer 2)
- Per-user repository scoping (§5, Layer 1)
- Upload limits: max file size, max page count, max uploads per user per day. Five trusted
  users doesn't remove the need — a malformed 400-page PDF will exhaust the Gemini free
  tier by accident.

---

## 9. Build order

`from-scratch.md` proposes rewriting every file at once, with nothing testable until step
12. Build in vertical slices instead: **every slice ends with a running application.**

**Read §10 first.** Those decisions are settled and shape several of the slices below.

1. **Foundation.** New repo, CI, Alembic wired up, Supabase project, a *separate* dev
   Supabase project (never test against production data), config/`Settings` object.
2. **Auth and first run.** Signup with allowlist check, email confirmation, login, logout,
   the display-name + timezone welcome step, password reset, and the default-deny route
   guard. Then the three-step setup: first term → first course → upload prompt. Spec in
   §10.6.
3. **Isolation, proven.** Terms and courses only — create, rename, recolor, trash. Then the
   scoped repositories and the RLS session hook. **Create two accounts and verify account A
   cannot see account B's courses under any URL.**
   *This is the most important slice in the project.* It is small enough to get right, and
   once isolation is proven end to end, every later slice is repeating a pattern that
   already works. Do not rush it.
4. **Assignments.** Model, repository, CRUD, manual entry, complete/watchlist toggles.
5. **Upload pipeline.** PDF → PyMuPDF → Gemini → `pending_uploads` → verifying questions →
   approval screen → saved. Includes duplicate detection, the scanned-PDF guard, and series
   detection. **Build `domain/series.py` and test it against hand-written item lists before
   wiring the approval UI** — same reasoning as 7a below. Full spec in §10.4.
6. **Notifications.** Per-user digest, timezone-aware, single scheduler.
7. **The three views.** This is the largest piece of the project and must be split:
   - **7a — the math alone.** Build `domain/today.py`, `domain/workload.py`,
     `domain/runway.py` as pure functions. Test them against a hand-written fake semester
     with known answers. **No web pages involved.** Every number visible in the mockups
     gets a test.
   - **7b — Today tab**
   - **7c — Workload tab**
   - **7d — Runway tab**

   Doing 7a first means that when a chart later looks wrong, the math is already known-good
   and the bug is in the rendering. Without this split, every visual bug is ambiguous.

There is **no data migration step**. The SLATE database is empty — nothing carries over from
v1 except code (see §11). The owner's own account starts from scratch like any other user's,
which also means the signup and first-upload path gets exercised for real before anyone else
sees it.

---

## 10. Product and structural decisions

All three are settled. Claude Code should implement these as specified rather than
proposing alternatives.

### 10.1 The term lifecycle — **DECIDED**

Terms archive themselves when they end. Courses belong to a term; assignments belong to a
course. Nothing is ever deleted — archived only means "not the view you land on."

The whole point is that a student should never have to think about this. Requirements:

- **Archiving is automatic and derived, never a user action.** A term is "past" when its
  `end_date` is behind the user's local today. Do **not** add an `archived_at` column —
  a stored flag can drift out of sync with the dates. Compute it.
- **The word "archive" must not appear in the UI.** It's an engineering word. Use
  **"Current term"** and **"Past terms."**
- **One current term at a time.** The three tabs always show it. No term selector cluttering
  the main interface.
- **Past terms live in a small switcher in the sidebar**, under the course list — showing the
  current term's name (e.g. "Fall 2026") with past terms in a dropdown. Selecting one puts
  the app in a clearly-marked past-term state: a banner naming the term and a one-click
  way back to the current one.
- **The handoff is the moment that matters.** When a term ends, do not drop the user on an
  empty dashboard with no explanation. Show a prompt — *"Fall 2026 has ended. Start a new
  term?"* — that collects a name and start/end dates, then routes straight to uploading a
  syllabus. This is the single most likely place for a user to get confused, and it's worth
  building deliberately rather than letting it fall out of the data model.
- **Allow the next term to be created before the current one ends.** Spring syllabi arrive
  while autumn is still running. "Current" = the term whose date range contains today; if
  two qualify, the one that started most recently; if none does, the most recently ended one,
  with the new-term prompt showing.
- **Courses do not carry over between terms.** A new term starts with no courses. Users take
  different classes each semester; auto-copying would create more cleanup than it saves.

**Past terms hide the Today tab.** "Due tomorrow," "start tonight," and the today-marker are
meaningless in a term that finished four months ago. Workload and Runway remain fully
useful as a retrospective and should be shown normally.

One note on why this is cheap to build: because every domain function already takes the term
and today's date as arguments (§4), rendering a past term requires no new calculation code
at all — it's the same functions with a different term passed in. This is a concrete payoff
of the layering.

### 10.2 Empty and sparse states — **DECIDED**

Every mockup shows a full semester across three courses. A new user has one course and eight
assignments, and at that point most of the derived content is either meaningless or actively
misleading — "Wednesdays are your heaviest day, 1.8x more than Mondays" computed from eight
items is noise presented as insight.

**Workload and Runway are gated behind minimum data. Today is never gated.**

#### Tab-level gates

| Tab | Unlocks at | Why |
|---|---|---|
| **Today** | Always available | Works with a single assignment. It's the landing page and must never be blocked. |
| **Workload** | 1 course · **12 assignments** · items in **≥3 distinct weeks** | The core chart is weekly load across the term. With fewer than three weeks of data there is no shape to see, and a "term average" from one or two weeks is not an average. |
| **Runway** | **2 courses** · **20 assignments** · items spanning **≥6 weeks** | Runway's centrepiece is the per-course swimlane timeline, and its Watch card detects collisions *across* courses. Both are meaningless with one course. Term progress and the heat map need real term coverage. |

**The locked state is an explanation, not a greyed-out tab.** A disabled tab with no reason
is worse than no tab. Keep it visible and clickable; the page shows what's missing, current
progress, and the action that fixes it:

> **Runway needs a bit more of your term.**
> You have 1 course and 14 assignments. Runway opens at 2 courses and 20 assignments.
> [ Upload another syllabus ]

**Unlocking is one-way within a term.** Once a tab has opened for a given term it stays open,
even if the user later trashes a course and drops below the threshold. Re-locking a tab
someone has been using is disorienting and there is no upside.

For past terms, gates are evaluated against that term's final data.

#### Card-level thresholds

Clearing a tab gate does not make every card on it meaningful. Each card has its own floor:

| Card | Requires | Below that |
|---|---|---|
| **Workload** — Peak week | covered by tab gate | — |
| Clearest window | ≥4 weeks containing items | hide |
| Most demanding course | ≥2 courses | hide |
| Term context | term dates only | always shown |
| Weekly load chart | covered by tab gate | — |
| This week by day | always | if the current week is empty, say so in a sentence rather than drawing an empty chart |
| Load by course | ≥2 courses | hide |
| Rhythm insight | ≥30 assignments **and** ≥8 items on the heaviest weekday | hide |
| **Runway** — Term progress | term dates only | always shown |
| Next big rock | ≥1 future magnitude-3 item | fall back to the next item of any size, relabelled "Next up" |
| Load-ahead pace | ≥2 weeks elapsed in term **and** ≥15 items | hide |
| Heat map / swimlanes / intensity / mini calendar | covered by tab gate | — |
| Watch (collisions) | ≥2 courses **and** ≥2 magnitude-3 items | hide |
| Open window | covered by tab gate | — |
| Big rocks | ≥3 items of magnitude 2–3 | show what exists, drop the "View all" link |

Rhythm insight has the strictest floor deliberately. It is the only card making a
*statistical* claim about the user's habits, and it's the easiest one to embarrass yourself
with.

#### The fallback rule

**Default to hiding, not to placeholders.** A page with six cards each saying "not enough
data yet" looks broken, and it's a worse first impression than a shorter page that simply
shows less. If hiding leaves a row with one lonely card, collapse the row and let the
remaining card go full-width.

The one place an explanation *is* shown is the tab-level gate above, because there the user
needs to understand why a whole section is unavailable and what to do about it.

#### Implementation note

Put every number above in **one file in the domain layer** as named constants —
`MIN_ASSIGNMENTS_FOR_WORKLOAD = 12`, `MIN_COURSES_FOR_RUNWAY = 2`, and so on. They must be
tunable in one place and assertable in tests. Do not inline them at the call sites.

These figures are **starting values, not research**. They're set to be conservative — it is
much better to withhold an insight for another week than to show a student a confident,
wrong claim about their own semester. Expect to tune them once real syllabi are loaded.

### 10.3 Where the domain layer starts — **DECIDED**

**Simple CRUD goes web → repository directly.** Services and the domain layer are reserved
for anything with actual logic. Routing "rename a course" through a domain entity and a use
case is three files of ceremony for one line of work; at this size that costs more than it
returns.

The risk with this shortcut is that the line blurs until everything looks "simple" and the
service layer withers. So the line is defined by a test, not by taste:

> **Does anything have to be decided or computed?**
> If the operation is "take these fields and write them to a row," it goes direct.
> If anything has to be worked out — a derived value, a rule, a sequence of steps, an
> external call, or two writes that must succeed together — it goes through a service.

| Goes direct (web → repository) | Goes through a service |
|---|---|
| Create / rename / recolor / trash / restore a course | Upload a syllabus (PDF → text → Gemini → `pending_uploads`) |
| Create a term; edit its name or dates | Confirm or discard a pending upload (writes many rows atomically) |
| Edit an assignment's title, date, type, or magnitude | Build the Today / Workload / Runway views |
| Toggle complete or watchlist | Send the daily digest |
| Delete an assignment | Signup (creates the auth user *and* the `profiles` row) |
| Update notification settings | Start a new term via the end-of-term handoff (§10.1 has rules about what "current" means) |
| Update display name or timezone | Evaluate tab gates (§10.2 thresholds are domain logic) |

#### Three rules that stop the shortcut from rotting

1. **Direct routes still use the scoped repository.** Never raw SQLAlchemy in a route. The
   tenant isolation in §5 is not optional on the shortcut path — that is the one place a
   leak would actually happen.
2. **A direct route is capped at roughly ten lines:** read the form, call one repository
   method, redirect or render. The moment it needs an `if` that encodes a business rule, or
   a second repository call that must succeed alongside the first, it moves to a service.
   This is a concrete, reviewable trigger rather than a judgement call.
3. **Split the two kinds of validation.** Field *shape* — is this a parseable date, is this
   a valid hex colour — stays in the web layer. Business *rules* — end date must follow
   start date, magnitude must be 1–3 — belong on the domain entity, so they hold no matter
   which path reaches them.

Promoting an operation from direct to service later is cheap and expected. Nothing here is
a one-way door.

### 10.4 The upload, verification and approval flow — **DECIDED**

**Nothing extracted from a PDF is ever written to the assignments table without the user
seeing it and approving it first.** An LLM reading a syllabus will get things wrong —
misread a date, mistake a reading-list entry for a graded deliverable, guess a magnitude.
The approval step is not a nicety; it is the mechanism that makes the extraction trustworthy
enough for everything downstream to be built on.

The flow has three stages: **extract → verify → approve.**

#### Stage 1 — Extract

PDF → PyMuPDF text → Gemini → a structured *proposal* stored in `pending_uploads.payload`.
The proposal is never assignments; it's a draft of them.

#### Stage 2 — Verifying questions

Before showing the proposal, the app asks the user a small number of questions covering
things it genuinely could not resolve from the document.

Legitimate questions include:

- **Term dates**, when the syllabus doesn't state them (required by §6, and needed to
  resolve anything relative).
- **Relative deadlines** — "Week 6", "the Monday after break" — which cannot be turned into
  a date without an anchor.
- **Year ambiguity** on bare dates like "9/15" in a term crossing a December boundary.
- **Readings vs. deliverables.** Syllabi list assigned reading for every single session.
  Are those tracked items or just schedule context? This one question can change the item
  count by a factor of three, so ask it explicitly and offer it as a single bulk choice.
- **Recurring cadence confirmation** — see below.

**Cap the questions at five.** An LLM told to "ask verifying questions" will happily ask
fifteen, and a fifteen-question wizard between a student and their dashboard will get
abandoned. The rule: only ask what cannot be resolved from the document **and** what changes
many items at once. Anything uncertain about a *single* item is not a question — it gets
flagged with the existing `due_date_raw` + `needs_review` mechanism (§11) and surfaces on the
approval screen instead.

`pending_uploads.status` gains a `questions` stage: `extracting → questions → ready →
confirmed → failed`.

#### Recurring assignment patterns

**This is the detail that determines whether the approval screen actually works.**

Real syllabi are full of series: Problem Set 1 through 12, weekly readings, six lab reports,
a quiz every other Thursday. If extraction emits forty flat rows, the approval screen becomes
forty rows of tedium, the user scrolls to the bottom and clicks Approve without reading, and
the entire point of the step is lost.

So the app must **detect series and collapse them**:

> **Problem Set 1–12** · Corporate Finance · weekly, Fridays · Sep 5 – Nov 21 · 12 items
> [ ✎ edit cadence ]  [ ▸ expand ]  [ ✕ remove all ]

One row to read, one row to approve, expandable when the user wants to check individual
dates. Forty rows becomes eight groups. That is the difference between a review step that
gets used and one that gets rubber-stamped.

Detection is **split between the LLM and the domain layer, deliberately**:

- Gemini may emit an optional `series_label` per item — it has the surrounding document
  context and is good at spotting that "PS4" and "Problem Set 4" are the same family.
- The **domain layer** then groups by label, derives the cadence from the date spacing, and
  validates it. This part is a pure function over a list of items, so it is fully testable
  with no API calls — consistent with §3.

Don't push cadence inference into the prompt. Deterministic date arithmetic in code is free,
exact, and testable; an LLM doing it is none of those things.

**Storage:** add a nullable `series_key text` column to `assignments`. Series are **flattened
on approval** — twelve problem sets become twelve ordinary rows, tagged with a shared key.
There is no separate series table.

The trade-off, stated plainly: this keeps individual editing trivial and avoids an entire
class of parent/child sync bugs, at the cost of making a later "shift all problem sets by a
week" bulk edit a query rather than a single update. At this size that is the right trade.
The `series_key` tag is what makes such a bulk action possible later without a schema change.

#### Stage 3 — The approval screen

Requirements:

- **Grouped by course, then by series, then by type.** Never one flat list.
- **Items flagged `needs_review` are pulled to the top** and cannot be silently approved.
  The user must either resolve the date or explicitly dismiss the item.
- **Every field editable inline** — title, date, type, magnitude, is_test.
- **Bulk actions per series:** approve all, remove all, shift all by N days, change type or
  magnitude for the whole group.
- **A summary line the user can actually verify against:** *"42 items across 4 courses —
  28 homework, 8 readings, 4 quizzes, 2 exams. 3 need your attention."* This is what lets
  someone glance and think *yes, that's my semester* — which is the whole purpose of the
  screen.
- **Discard the entire upload** in one action, without partial writes.
- Approval is the **only** path from `pending_uploads` into `assignments`, and it writes all
  rows in a single transaction (per §10.3, this is service-layer work, not direct CRUD).

#### After approval

Show the user their full course list with per-course item counts. Two purposes: it confirms
the upload landed, and it makes obvious what's still missing — which matters directly,
because the Workload and Runway tabs stay locked until enough courses are loaded (§10.2).

#### Revised syllabi

Professors reissue syllabi mid-term with dates changed. The hash-based duplicate check
(§11) only catches re-uploading the *identical* file, so it does nothing here.

**Decision: the user deletes the course and re-uploads.** No merge logic, no diffing, no
reconciliation UI. At this scale that machinery would cost far more than it returns.

Two consequences that must be handled in code, or this breaks:

1. **Deleting a course must free its PDF hashes.** `uploads` has
   `unique(user_id, pdf_hash)`, so if the old `uploads` rows survive, re-uploading the
   corrected syllabus is rejected as a duplicate. The `on delete cascade` from
   `courses` handles a hard delete — but a course sent to **trash** is only soft-deleted
   (`trashed_at`), so **the duplicate check must ignore uploads belonging to trashed
   courses.** This is easy to miss and produces a baffling "you already uploaded this" error.
2. **The user loses completion state, watchlist flags, manual edits, and any manually-added
   assignments for that course.** Warn them explicitly in the delete confirmation — *"This
   removes 38 assignments and anything you've edited or added by hand."* — rather than
   letting them discover it afterwards.

### 10.5 Magnitude and load — **DECIDED**

#### How magnitude is assigned

`magnitude` is an integer 1–3 and it is the single most load-bearing value in the app:
it drives bar heights, timeline dot sizes, big rocks, collision detection, and every "load"
figure on Workload. It cannot be left to per-item LLM improvisation.

**The baseline is a fixed mapping from `type`, defined in the domain layer — not in the
prompt:**

| Type | Baseline magnitude |
|---|---|
| `reading` | 1 |
| `homework` | 1 |
| `quiz` | 2 |
| `presentation` | 3 |
| `paper` | 3 |
| `project` | 3 |
| `exam` | 3 |

The division of labour:

- **Gemini classifies the `type`.** That is a language task and it's good at it.
- **The domain layer applies the mapping.** Deterministic, testable, tunable in one file.
- **Gemini may propose a ±1 adjustment** where the syllabus gives a clear reason — a
  homework explicitly worth 25% of the grade, a "short quiz" worth 2%. It must supply a
  one-line reason, shown on the approval screen. Adjustments are clamped to 1–3.
- **The user can override any magnitude at approval** (§10.4) and afterwards. This is the
  real escape hatch, and it means the automatic system only has to be reasonable, not right.

Keeping the mapping in code rather than the prompt matters: it means magnitude is consistent
across every upload and every user, and changing the weighting later is a one-line edit
rather than a prompt rewrite with unpredictable knock-on effects.

#### Load

**Load = the sum of magnitudes. Items = a simple count.**

So a week with one exam and two readings is **5 load / 3 items**. Every "load" figure in the
Workload mockup — peak week 41, term total 378, per-course 144/126/108, the daily bars — is
a magnitude sum.

The **Load / Items** toggle switches every number and every chart on the page between the
two. Nothing else changes: same layout, same cards, same thresholds.

#### Workload page controls

The Workload tab has exactly two controls, per the current mockup:

1. **A course filter** — `Viewing: [All courses ▾]`, listing every course with its colour
   dot. A subtitle under the page title echoes the selection ("Viewing all courses").
2. **The Load / Items toggle.**

**There is no Calendar weeks / Rolling 7 days toggle.** It appeared in an earlier design and
is dropped. Weeks are always fixed term weeks (W1…W15) derived from the term's start date.
Do not build rolling-window logic.

When a **single course is selected**, everything on the page recomputes within that course,
with one exception: the *Most demanding course* card has nothing to compare against, so it is
replaced by a **Share of term load** card showing that course's percentage of the whole term.

Stat-strip figures read as plain values — "Week 8 · 41 load", "Week 3 · 14 load" — not as
percentage deltas against the term average. The average appears only as the dashed reference
line on the weekly chart.

The weekly chart keeps its **Download CSV** action.

### 10.6 Accounts, signup, and the first run — **DECIDED**

#### Who can sign up

**An email allowlist.** Signup is open to anyone whose email address appears in a
comma-separated `SIGNUP_ALLOWLIST` environment variable, and rejected otherwise with a plain
message. An open signup form on the public internet collects bots; at five known users an
allowlist is proportionate.

The allowlist lives in an env var rather than a database table deliberately — adding someone
is editing one setting in the hosting dashboard, which is a thing the project owner can do
without running SQL. The trade-off is that it requires a redeploy/restart to take effect;
at this scale that is fine.

#### Signup sequence

1. **Email + password**, checked against the allowlist before anything is created.
2. **Email confirmation**, handled by Supabase Auth.
3. **A two-field welcome step: display name and timezone.** Timezone is *asked*, not
   guessed — pre-select the browser's detected zone as the default, but show it and let the
   user change it. It's a single dropdown and it silently determines what "due tomorrow"
   means for the rest of their life in the app.
4. The `profiles` row is written with both. Signup is service-layer work (§10.3) because it
   creates the auth user and the profile row together.

Password reset and email confirmation both need routes and templates. Supabase does the
work; the pages still have to exist.

#### First run

A brand-new account has no term and no courses. This is the first screen every user ever
sees, and §10.2's sparse-data rules do not cover it — those assume data exists.

The path is a linear three-step setup, not an empty dashboard:

1. **Create your first term** — name, start date, end date. ("Fall 2026", Aug 25 – Dec 12.)
2. **Add your first course** — name, optional course code, colour auto-assigned.
3. **Upload its syllabus** → verifying questions → approval screen (§10.4).

Then land on Today, with the newly approved assignments in it. The user should reach a
populated dashboard within one sitting of signing up.

**This resolves an ambiguity in §10.4:** because the term is created before any upload, the
"term dates" verifying question does not normally fire. It fires only when extracted
assignment dates fall outside the term's range — which is itself a useful signal that the
user typed the wrong dates or is uploading a syllabus from a different term.

#### The two intermediate empty states

| State | What Today shows |
|---|---|
| Term exists, no courses | A single card: "Add your first course" with the button. Nothing else. |
| Courses exist, no assignments | Per-course prompts to upload a syllabus, plus the option to add an assignment by hand. |

Neither should render the normal Today layout with zeroes in it. An empty dashboard reads as
broken; a prompt reads as a next step.

### 10.7 Trash, extraction failures, and the digest — **DECIDED**

#### Trash

Deleting is soft. Both `courses` and `assignments` carry `trashed_at` (add it to
`assignments` — the schema in §6 only has it on `courses`). Trashed items disappear from
every view and every calculation, including all Workload and Runway math.

**Auto-purge after 30 days.** A permanent delete runs in the same daily scheduler job as the
digest — one query per table, hard-deleting anything with `trashed_at` older than 30 days.
The Trash view in the sidebar lists trashed courses with a restore action and shows how long
each has left.

Purging a course must cascade to its assignments and its `uploads` rows (see §10.4 on
freeing PDF hashes).

#### Extraction failures

When extraction fails — Gemini errors or times out, returns unparseable output, the PDF is
scanned (`ScannedPDFError`), encrypted, or plainly isn't a syllabus — **say so plainly and
stop.** No retry loops, no partial imports, no salvaging half a proposal.

The `pending_uploads` row is marked `failed` with the reason in `error`, and the user sees a
short message naming what went wrong and a button to try a different file. Nothing is written
to `assignments`. Log the underlying exception for the owner; don't put a stack trace on
screen.

#### The daily digest email

Deliberately minimal:

- **Subject:** the count due tomorrow — *"3 assignments due tomorrow"*.
- **Body:** the list of those assignments — title, course, and type. Nothing else.

No charts, no insights, no summary of the week. The subject line alone should answer the
question for most people on most days, which is the point.

Sent at each user's `notification_settings.send_hour` **in their own timezone**, to
`notification_settings.email` (defaulting to their signup email). Skip the send entirely
when nothing is due — an email saying "0 assignments due tomorrow" trains people to ignore
the sender.

---

## 11. Carried over from SLATE unchanged

These were validated in v1 and need no rework. Copy them into the new repo as-is:

- **PyMuPDF text extraction** — `fitz.open(stream=..., filetype="pdf")` plus the 200-char
  scanned-PDF guard. Reliable on real syllabi.
- **Gemini JSON mode** — `response_mime_type="application/json"` with the existing tuned
  system prompt (7 typed fields, explicit null-date handling). Produces clean structured
  output with no post-processing.
- **`due_date_raw` + `needs_review`** — storing the raw string alongside the resolved date
  means ambiguous entries ("Week 6", "TBD") surface for confirmation instead of being
  invented.
- **`magnitude` 1–3** — drives chart heights and timeline dot sizes without a separate
  weight system.
- **SHA-256 duplicate detection** on upload.
- **Alpine.js tab switching** — all three tabs in one template, no server round-trips.
- **The Donezo design system CSS** and the three-tab visual design.

The stateless service code (`extractor.py`, `llm.py`, `insights.py`) is the cleanest thing
in the v1 codebase precisely because it never touched the database. It becomes
`adapters/pdf.py`, `adapters/gemini.py`, and part of `domain/`.

---

## 12. Housekeeping

- The UI mockups still show **SLATE** in the sidebar. Update the design before the name is
  baked into templates.
- Old name is SLATE; new name is **Scope**. No references to SLATE should survive into the
  new repo except in this document and the historical `new_project.md`.

---

## 13. Testing approach

Testing is shaped by §3: the valuable, frequently-revised logic is pure, so the tests that
matter are cheap and fast. This is not a boilerplate "add a test suite" instruction — the
distribution below is specific to this project.

**Heavy coverage — `domain/`.** Pure functions, no fixtures, milliseconds to run. This is
where the real testing effort goes:

- Every number visible in the three mockups, computed from a hand-written fake semester with
  answers worked out by hand. Peak week, clearest window, per-course share, weekday rhythm,
  term progress, collisions, open windows, big rocks, load-ahead pace.
- `series.py` — grouping and cadence inference against realistic messy title lists
  ("PS1", "Problem Set 2", "Problem set 3 (revised)").
- `gates.py` — every threshold in §10.2, tested at the boundary: one item under, exactly at,
  one over.
- The type → magnitude mapping and the ±1 clamp (§10.5).
- Load vs items totals agreeing with each other.

**Light coverage — `services/`.** A handful of tests against a real throwaway Postgres,
covering behaviour that only exists when parts are combined: upload → questions → approve
writes the right rows in one transaction; a failed extraction writes nothing; the digest job
picks the right users at the right local hour.

**Minimal but non-negotiable — end-to-end (Playwright).** Four flows, chosen because a
silent break in any of them would be either dangerous or immediately visible to users:

1. **Tenant isolation.** Two accounts; A cannot reach B's courses or assignments by URL.
   This is the one test that must never be allowed to fail.
2. Signup → first term → first course → upload → approve → assignments appear on Today.
3. Tab gating: a sparse account sees the locked Runway explainer; a full account sees Runway.
4. Delete a course, then re-upload the same PDF successfully (the trashed-course hash trap
   in §10.4).

**What not to test:** Jinja rendering details, CSS, Alpine tab switching, Supabase's own auth
behaviour, or the exact wording of Gemini's output. Mock Gemini in all service and E2E
tests — never call the real API from a test run.

**One assertion per issue.** Each GitHub issue carries its own "proof" line naming how that
specific change is verified. Not every issue needs a new test file; every issue needs a
stated way to know it worked.

---

## 14. Environment variables

```
# --- Supabase ---
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=            # public; used for user sign-in and signup
SUPABASE_SERVICE_KEY=         # secret; admin/scheduler use only, never sent to the browser
DATABASE_URL=                 # session-mode pooler URI, connects as `authenticated` (§5)
DATABASE_ADMIN_URL=           # service-role connection, used only by the daily job

# --- Flask ---
SECRET_KEY=                   # static. python -c "import secrets; print(secrets.token_hex(32))"
FLASK_ENV=production

# --- Access control ---
SIGNUP_ALLOWLIST=             # comma-separated emails permitted to create accounts (§10.6)

# --- LLM ---
GEMINI_API_KEY=

# --- Email ---
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=                # Gmail app password (ADR 0007)
DIGEST_FROM_ADDRESS=

# --- Limits (§8) ---
MAX_UPLOAD_MB=10
MAX_PDF_PAGES=60
MAX_UPLOADS_PER_USER_PER_DAY=20
```

Rules:

- Loaded once into a single `Settings` object at startup, which **fails loudly on a missing
  or malformed value** rather than returning `None` and breaking three screens later.
- No `os.environ.get()` anywhere outside `config.py`.
- `SECRET_KEY` is static and set once. Regenerating it at runtime — as v1 did — logs every
  user out on every restart.
- `DATABASE_URL` and `DATABASE_ADMIN_URL` are separate connections on purpose: the first
  respects Row Level Security, the second bypasses it and is used only by the scheduler,
  which legitimately needs to read across users (§5).
- Dev and production point at **separate Supabase projects**. Never run tests against
  production data.
