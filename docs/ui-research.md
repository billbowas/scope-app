# Scope — UI market research

**Purpose:** ground Scope's UI decisions in what's actually working in adjacent apps students already use. This is a working doc — update as new patterns emerge.

**Companion:** [`design/wireframe.html`](./design/wireframe.html), [`PRD.md`](./PRD.md).

---

## 0. Where Scope stands vs. direct competitors

Already surveyed elsewhere; short recap so this doc stands alone:

| Category | Apps | Overlap with Scope | Where Scope differs |
|---|---|---|---|
| Syllabus → schedule (mobile) | CourseLink, Ahead, Semora, Syllabuddy, UpAhead | Ingestion overlap (PDF → assignments) | Scope adds the **forecasting derived layer** (heat map, peak week, rhythm, load-ahead pace) — none of them do this |
| Broad LMS + syllabus | DormWay | Ingestion + calendar timeline | Scope stays laser-focused on forecasting, no LMS integration in MVP |
| General planners | MyStudyLife, Todoist, Notion, TickTick | Class timetables, task lists | Scope replaces "did you check it off?" with "here's what your term shape looks like" |
| Closest forecasting concept | **Shovel** (has "The Cushion" — time-per-task vs. free time) | Same posture (forecast, not track) | Scope forecasts *load*, Shovel forecasts *time*. Complements each other |

**The moat:** derived forecasting insights that don't depend on `is_complete`. That's what the UI has to render well. Everything else — sign-in, upload, list views — has to be at least as good as competitors, not better.

---

## 1. Sign-in and onboarding

**Best-in-class references worth stealing:**

- **[Superhuman onboarding](https://review.firstround.com/superhuman-onboarding-playbook/)** — white-glove, human-led first-run. At 5 users you can literally do this yourself for every signup: 15-min call, walk them through their first syllabus upload live. Compresses weeks of self-serve confusion into one interaction.
- **[Vercel's "welcome = first action" pattern](https://nhimg.org/articles/sign-in-with-vercel-changes-developer-auth-and-app-onboarding/)** — no separate welcome email, no dead-end tour. The first thing signup produces is a working project. Scope's equivalent: the three-step wizard (term → course → syllabus) IS the welcome — no separate tour needed.
- **[Vercel OAuth 2.0 Device Flow](https://vercel.com/changelog/new-vercel-cli-login-flow)** — pattern reference only; Scope is browser-only so we get the standard Google OAuth popup instead.
- **Linear / Cal.com onboarding** — both use a single dark screen with one primary action (usually "Sign in with Google") and a small "learn more" line below. That's the pattern the current wireframe follows.

**Steal:** the "welcome is the first action" principle. Do not add a tour, tooltips, or empty-state coaching pages. The three-step setup is the tour.

**Anti-pattern to avoid:** the multi-step marketing tour (Slack-style "here's how tabs work"). Wrong tone for a forecasting tool, and students will abandon before they see value.

## 2. Upload extraction + review-and-approve

Scope's approval screen is the trust-shaped part of the product. Every AI syllabus-scanner competitor writes the extracted output directly to your calendar — Scope stops and asks. That's differentiation, but only if the review step feels fast, not tedious.

**Best-in-class references worth stealing:**

- **[Velt's AI human-review pattern](https://velt.dev/blog/how-to-add-human-review-ai-output)** — inline "confidence badges" per row, one-click accept/edit/reject at the row level, no modals. Preserves scanning speed.
- **[Knack AI approval workflows](https://www.knack.com/blog/ai-generated-content-approval-workflow/)** — batch operations first, per-item second. Scope's series-collapse pattern ("Problem Set 1–12 · weekly · 12 items · approve all") is exactly this shape. Keep it.
- **Cal.com's calendar-import review** — surfaces conflicts and duplicates at the top before scrolling the full list. Scope's `⚠ needs your attention` band uses the same pattern; keep it prominent.
- **[Markup AI's 4-stage flow](https://markup.ai/blog/ai-content-qa-workflow/)** — pre-generation setup (types, magnitudes), AI output assessment (extract), refinement (fix TBD dates), final approval. Matches Scope's extract → verify → approve stages 1:1.

**Steal:** confidence badges on rows the LLM was uncertain about (Scope's existing `needs_review` flag maps directly). Show one "expand this series to spot-check" example open by default on the approval screen so users know inspection is one click away.

**Anti-pattern to avoid:** modal dialogs for per-item edits. Everything must be inline — click title to edit, click date to pick, click type to change. A modal breaks scanning.

## 3. Dashboard "what to do right now"

Today is the landing page for every signed-in user (locked decision). The hero "Start tonight" card is now the first thing they see.

**Best-in-class references worth stealing:**

- **[Amie's minimalism](https://efficient.app/alternatives/sunsama)** — "no dashboards, no analytics panels, no widgets." One column, calendar and tasks fused. Scope's Today should aim for this level of restraint: hero card → next-48h list → one contextual warning. Don't clutter it with stats.
- **[Sunsama's calm daily review ritual](https://sunsama.com/love)** — the "beautiful UI, well thought out" reputation comes from restraint, not features. Sunsama shows you *today* and asks you to intentionally choose what to do. Scope's "Start tonight" hero is a lighter-weight version of this — captain confirmed promoting it.
- **[Motion's auto-scheduling](https://top-apps-list.com/articles/motion-vs-reclaim-vs-sunsama)** — Motion is the *anti-pattern* here. It rebuilds your day for you. Scope explicitly avoids this: we forecast, we don't schedule. Users still make their own choices.
- **[Reclaim's calendar defense](https://temporal.day/blog/motion-vs-reclaim-vs-clockwise-vs-akiflow-vs-sunsama)** — moves focus blocks around meetings. Also not what Scope does, but the visual language of "here's your protected time" is worth studying for the Runway view's "open windows" card.

**Steal:** Sunsama's restraint on Today; render one primary suggestion prominently, list the rest at reading-list weight, resist adding stats above the fold. The gold-accent "Start tonight" hero is on the right track.

**Anti-pattern to avoid:** dashboard-widget syndrome (Notion, Motion's dense views). More cards ≠ more useful. If a card can't answer a specific question a stressed student would ask at 10 PM, cut it.

## 4. Dense forecasting views (Workload, Runway)

This is Scope's differentiator. The heat map, swimlanes, and collision detection have to render dense data without feeling overwhelming.

**Best-in-class references worth stealing:**

- **[GitHub's contribution graph](https://github.com/)** — the reference standard for a compact time-based heat map. Rows are weekdays, columns are weeks, cells are intensity. Scope's Runway heat map should adopt this exact shape (weeks across, weekdays down). Instantly recognizable.
- **[Linear's cycles view](https://linear.app/)** — swimlanes with clear "big rock" callouts, colour per project, muted background so items pop. Directly applicable to Scope's per-course swimlane on Runway.
- **[Heatmap best practices](https://fuselabcreative.com/heat-map-data-visualization-guide/)** — clustering, filtering, drill-down. Scope needs at minimum: hover a cell → tooltip with items on that day. Click a cell → filter the list below.
- **[Temporal mapping techniques](https://www.maplibrary.org/1582/data-visualization-techniques-for-temporal-mapping/)** — patterns for showing "peak" and "clearest" windows without exact-numbers overload. Scope should use natural-language callouts ("Peak week: Sep 22–28 · +34% vs. term average") over exposed raw stats.
- **[Vercel Observability dashboards](https://vercel.com/docs/observability)** — reference for combining a dense chart with a single big-number summary above. Scope's Workload page should keep the "Peak week · 41 load" stat strip above the chart, per current design.

**Steal:** GitHub contribution graph as the heat map primitive. Add hover-tooltips and click-to-filter on day one — a heat map without interactivity is decoration.

**Anti-pattern to avoid:** rainbow scales. Use a single-hue intensity ramp (dark gold for Scope, matching the brand accent). Rainbow scales look "data-viz-y" but actually obscure differences.

---

## 5. Highest-leverage UI upgrades for Scope

Ranked by impact-per-line-of-code, given the constraints (5 users, one dev, Alpine.js, wireframe currently monochrome + gold accent):

1. **Adopt the GitHub-contribution-graph shape for the Runway heat map.** Weeks × weekdays, single-hue intensity, hover tooltip, click-to-filter. Highest-leverage upgrade because it's the app's centerpiece and the pattern is universally known — zero learning curve for users.
2. **Ship one series pre-expanded on the approval screen.** Users need to see that expand exists and is one click away. Currently the wireframe already expands the first series — keep that pattern in the final build.
3. **Show confidence badges on `needs_review` rows.** Small "Scope wasn't sure" pill next to the field the LLM couldn't resolve. Makes the trust story visible instead of implicit.
4. **Skip the marketing tour entirely.** The three-step wizard IS the tour. Do not add a Slack-style overlay tooltip flow later.
5. **Do the first 3 users' onboarding personally** (Superhuman-style). At 5 users this is free product-research time and closes the loop on every extraction quality bug immediately. Also validates that the "start tonight" hero is landing right.

**What to explicitly skip for MVP:**
- Any dashboard customization ("hide this card")
- Any theme picker
- Any settings screen beyond timezone + email digest hour + display name
- Animated transitions between tabs (Alpine's plain show/hide is fine)
- A "share your term" feature (privacy-fraught, not asked for, no clear use case)

---

## Sources

- [Superhuman's Onboarding Playbook — First Round Review](https://review.firstround.com/superhuman-onboarding-playbook/)
- [Onboarding Lab: Superhuman & Reforge](https://www.growthmates.news/p/onboarding-lab-how-superhuman-and)
- [Sign in with Vercel: Changes to Developer Auth](https://nhimg.org/articles/sign-in-with-vercel-changes-developer-auth-and-app-onboarding/)
- [New Vercel CLI Login Flow](https://vercel.com/changelog/new-vercel-cli-login-flow)
- [Turning AI-Generated Content into Reviewed Data (Knack)](https://www.knack.com/blog/ai-generated-content-approval-workflow/)
- [Human Review for AI Output (Velt)](https://velt.dev/blog/how-to-add-human-review-ai-output)
- [AI Content QA Workflow (Markup AI)](https://markup.ai/blog/ai-content-qa-workflow/)
- [Best Sunsama Alternatives 2026 (Efficient)](https://efficient.app/alternatives/sunsama)
- [Motion vs Reclaim vs Sunsama (Top Apps List)](https://top-apps-list.com/articles/motion-vs-reclaim-vs-sunsama)
- [Motion vs Reclaim vs Clockwise vs Akiflow vs Sunsama (Temporal)](https://temporal.day/blog/motion-vs-reclaim-vs-clockwise-vs-akiflow-vs-sunsama)
- [Sunsama Love page](https://sunsama.com/love)
- [Heat Map Data Visualization Guide (FuseLab)](https://fuselabcreative.com/heat-map-data-visualization-guide/)
- [Data Visualization Techniques for Temporal Mapping (Map Library)](https://www.maplibrary.org/1582/data-visualization-techniques-for-temporal-mapping/)
- [10 Great Data Visualization Examples 2026 (Querio)](https://querio.ai/blogs/great-data-visualization-examples)
