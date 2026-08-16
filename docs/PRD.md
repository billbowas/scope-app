# Scope — Product Requirements Doc (MVP)

**Status:** planning · pre-code
**Owner:** [@billbowas](https://github.com/billbowas)
**Companion:** [`../architecture.md`](../architecture.md) is the technical spec. This doc captures product decisions and the MVP feature set.

---

## 1. What we're building

Scope is a **homework forecasting** tool for students at Columbia (and eventually a handful of other users). A student uploads a course syllabus PDF, an LLM extracts every assignment, and the app presents the term across three views:

| View | Question it answers |
|---|---|
| **Today** | What do I need to deal with in the next 48 hours? |
| **Workload** | Where is the pressure concentrated? |
| **Runway** | What does the shape of the whole term look like? |

Scope is deliberately a **forecasting** tool, not a tracking tool. No chart or insight depends on the user checking things off.

## 2. MVP scope — what ships first

The user journey we're building for MVP:

1. **Sign in with Google** — Supabase Auth's Google provider, allowlisted emails only.
2. **Welcome step** — display name + timezone.
3. **Create first term** — name, start date, end date.
4. **Add first course** — name, optional course code, auto-assigned color.
5. **Upload syllabus PDF** — synchronous extraction (PyMuPDF → Gemini JSON mode).
6. **Verifying questions** — cap of 5, only things the LLM couldn't resolve from the document.
7. **Approval screen** — grouped by course + series (e.g. "Problem Set 1–12 · weekly, Fridays · 12 items"), inline editing, bulk actions, one-transaction commit on approve.
8. **Land on Today** — the "start tonight" hero card, next-48-hours list, heavy-day warnings.

The **Workload** and **Runway** views ship in the same release but are gated behind minimum data:
- Workload unlocks at 1 course · 12 assignments · items in ≥3 distinct weeks.
- Runway unlocks at 2 courses · 20 assignments · items spanning ≥6 weeks.

The **daily digest email** ships at MVP too: minimal — subject line is the count due tomorrow, body is the list, nothing else. Skip the send if nothing is due.

**Wireframe:** see [`design/wireframe.html`](./design/wireframe.html) — five screens (Sign in, Create term, Upload syllabus, Approval, Dashboard/Today) with a walk-through of the OAuth consent screen and Google Cloud prep.

**Design system:** see [`design-system/readme.md`](./design-system/readme.md) — full tokens (`tokens/*.css`), core + app + data-viz components as JSX references, `ui_kits/scope-app/*.jsx` for click-through screens. The `.jsx` files are reference implementations only — production code translates them into Jinja templates + Alpine, using `tokens/*.css` and `styles.css` directly (this is Flask + Jinja + Alpine, not React). The design system is the visual ground truth; the wireframe is superseded for polish decisions.

## 3. Locked technical decisions

Full rationale lives in [`../architecture.md`](../architecture.md); this is the short list of what's decided so far. See [`design/tech-stack-review.html`](./design/tech-stack-review.html) for the annotated review.

| Layer | Choice |
|---|---|
| Backend | Flask + application factory |
| Templates | Jinja2 + Alpine.js (adopt HTMX when a component needs server-driven partial updates) |
| DB + Auth | Supabase Postgres + Supabase Auth (**Google OAuth**), with real RLS on the `authenticated` role |
| ORM + Migrations | SQLAlchemy + Alembic from day one |
| LLM extraction | Gemini (JSON mode) — cost/free-tier wins at 5 users |
| PDF | PyMuPDF + scanned-PDF guard |
| Email | **Resend** from day 1 (not Gmail SMTP) |
| Host | Fly.io, pinned to one machine (`min_machines_running = 1`) |
| CI guard | grep on `domain/` imports to enforce the dependency rule |

**Deferred:** LMS integration (Canvas / Blackboard / Moodle) is post-MVP. When it ships, it'll be a new adapter alongside the syllabus one — no domain-layer changes required.

## 4. Auth — Google OAuth

Chosen over email/password to reduce friction on first sign-in and eliminate the password reset flow entirely.

**What Scope needs (captain-side, hands-on-browser setup):**

1. **Google Cloud project** — create one at [console.cloud.google.com](https://console.cloud.google.com/) named "Scope."
2. **OAuth consent screen** — configure user type (External), app name ("Scope"), user support email, developer contact, privacy policy URL, terms of service URL. Request only the `openid`, `email`, `profile` scopes — no sensitive scopes, no verification required.
3. **OAuth 2.0 client ID** — Web application. Authorized redirect URIs must include the Supabase callback: `https://<project>.supabase.co/auth/v1/callback`.
4. **In Supabase Auth** — enable the Google provider, paste the client ID and client secret from step 3.
5. **Allowlist** — `SIGNUP_ALLOWLIST` env var checks the Google email address on first sign-in. Non-allowlisted emails see a friendly "not on the invite list yet" message.

I (Firstmate) can generate the exact copy for the consent screen, the OAuth client redirect URIs, and the Supabase Auth config values — but the actual clicks in Google Cloud Console must be done by a browser signed into your Google account. If you'd rather do it via `gcloud` CLI, I can prep the exact command sequence.

## 5. Product decisions locked from wireframe review

| Decision | Detail |
|---|---|
| Sign-in path | Google OAuth only (no email/password); allowlist checks the Google email |
| Approval-screen summary | "42 items across 4 groups · 28 homework · 8 readings · …" is the right glance summary; each series row shows expand as a prominent action so items are always one click from inspection |
| Dashboard landing | Always land on Today for MVP; last-view memory deferred |
| "Start tonight" | Promoted from subtle card to hero banner at the top of Today; gold accent, primary "Open" action |

## 6. What we're not building

Explicit non-goals for MVP, so scope creep has a clear line:

- Not building: mobile app, iOS or Android
- Not building: LMS integrations (Canvas/Blackboard/Moodle)
- Not building: calendar sync-out (Google Cal / Apple Cal / Outlook)
- Not building: what-if grade forecasting
- Not building: shared/team schedules
- Not building: study-session timers or Pomodoro
- Not building: real-time collaboration or comments
- Not building: any offline mode

Related market context (competitors and where Scope stands out) is in [`ui-research.md`](./ui-research.md).

## 7. Success criteria

The MVP is done when all of these are true:

- A brand-new signed-in user can reach a populated Today view in one sitting.
- Two accounts on the same Supabase project cannot see each other's data under any URL (tenant isolation Playwright test passes).
- The full three-tab dashboard renders without JS console errors on Chrome, Safari, and Firefox.
- The daily digest sends at each user's local hour and skips days with zero due items.
- The four Playwright E2E flows in `architecture.md` §13 all pass in CI.
- All `domain/` tests pass and the `grep` guard in CI enforces the dependency rule.

## 8. Open items for future PRDs (v1.1+)

- End-of-term handoff prompt ("Fall 2026 has ended. Start a new term?") — architected in `architecture.md` §10.1, but wireframe deferred to v1.1.
- Past-term browsing UX (sidebar switcher, past-term banner).
- Trash view UX (30-day auto-purge is spec'd but no wireframe yet).
- Revised-syllabus flow — the delete-and-re-upload UX (§10.4 in architecture.md); trash-vs-hard-delete cascade specifically.

---

*This document is versioned with the code. Update the "Locked decisions" tables as decisions land, and file a PR when the MVP scope changes.*
