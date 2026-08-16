# Scope web app — UI kit

A click-through recreation of the five wireframed screens plus the two forecasting views described in `architecture.md` §10.2 / §10.5. Laptop web app, dark canvas, gold accent — the same palette the wireframe uses.

**Flow:** `App.jsx` holds one `stage` value. Sign in → create term → add course + upload syllabus → verifying questions → approval → the three-view dashboard. It starts at sign in; "restart flow" (bottom right) remounts back to it, and `Sign out` in the rail footer returns there. `+ Add course` in the rail drops you back into upload.

| File | Surface | Source |
|---|---|---|
| `SignIn.jsx` | Google-only sign-in, invite copy | wireframe screen 1 |
| `Setup.jsx` | Steps 1 & 3 + verifying questions | wireframe screens 2, 3, 3.5 · §10.6 |
| `Approve.jsx` | Series-collapsed approval screen | wireframe screen 4 · §10.4 |
| `Today.jsx` | Start-tonight hero, heavy-day band, next 48 hours | wireframe screen 5 |
| `Workload.jsx` | Stat strip, weekly load, by-day, by-course, rhythm | §10.2 card floors · §10.5 controls |
| `Runway.jsx` | Term progress, heat map, swimlanes, watch, big rocks | §10.2 · `ui-research.md` §4 |
| `App.jsx` | Shell, rail, stage machine | §10.1 term switcher, §10.2 gates |
| `data.js` | One fake Fall 2026 semester | — |

**Deliberately omitted** because no source design exists for them: Trash view, Settings, the end-of-term handoff prompt, the past-term banner, the daily digest email. Step 2 of setup (add course) is folded into the upload screen exactly as the wireframe does it.

Everything is cosmetic — no persistence, no real upload. Workload's course filter and Load/Items toggle recompute the numbers proportionally so the interaction reads correctly; the figures are the mockup's, not a real calculation.
