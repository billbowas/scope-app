repo: billbowas/scope-app
branch: main
path: (whole repo — docs only; no application code exists yet)

## Last sync

date: 2026-08-16T08:30:00Z

### Updated in this project

- Built the initial Scope design system from `architecture.md`, `docs/PRD.md`, `docs/ui-research.md` and `docs/design/wireframe.html`.
- Tokens derived from the wireframe's dark monochrome + gold palette; serif-forward type scale (Source Serif 4).
- 19 components across core / app / forecast-chart groups, plus 18 foundation cards.
- UI kit `ui_kits/scope-app/` recreates the five wireframed screens plus Workload and Runway.

## Screen map

| Project screen | Built from |
|---|---|
| `ui_kits/scope-app/SignIn.jsx` | `docs/design/wireframe.html` screen 1 · `docs/PRD.md` §4 |
| `ui_kits/scope-app/Setup.jsx` | wireframe screens 2, 3, 3.5 · `architecture.md` §10.6, §10.4 |
| `ui_kits/scope-app/Approve.jsx` | wireframe screen 4 · `architecture.md` §10.4 |
| `ui_kits/scope-app/Today.jsx` | wireframe screen 5 · `docs/ui-research.md` §3 |
| `ui_kits/scope-app/Workload.jsx` | `architecture.md` §10.5, §10.2 card floors |
| `ui_kits/scope-app/Runway.jsx` | `architecture.md` §10.2 · `docs/ui-research.md` §4 |
| `ui_kits/scope-app/App.jsx` | `architecture.md` §10.1 term lifecycle, §10.2 gates |
| `tokens/*.css` | `docs/design/wireframe.html` inline styles |
