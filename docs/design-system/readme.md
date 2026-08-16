# Scope — Design System

Scope is a **homework forecasting tool for students** (Columbia first, a handful of other users after). A student uploads a course syllabus PDF, an LLM extracts every assignment, and the app presents the term across three views:

| View | Question it answers |
|---|---|
| **Today** | What do I need to deal with in the next 48 hours? |
| **Workload** | Where is the pressure concentrated? |
| **Runway** | What does the shape of the whole term look like? |

Scope is a **forecasting** tool, not a tracking tool — no chart or insight depends on the user checking items off. The product is a calculation engine with a thin data-entry shell around it: almost nothing on screen is a stored fact ("Peak week · 41 load", "Thursday is your biggest day", "on pace, ~2.3 days ahead" are all derived).

**Surface:** one product — a laptop web app (Flask + Jinja2 + Alpine.js, Supabase auth, Gemini extraction). Explicit non-goals: no mobile app, no LMS integration, no calendar sync, no offline mode, no theme picker, no settings beyond timezone / digest hour / display name.

## Sources this system was built from

The repository is at **planning stage — there is no application code yet**, so this system is derived from the specs and the one wireframe committed to the repo. Read them for anything not covered here:

- <https://github.com/billbowas/scope-app> — the repo (docs only at time of writing)
- <https://github.com/billbowas/scope-app/blob/main/docs/PRD.md> — MVP scope, locked product decisions
- <https://github.com/billbowas/scope-app/blob/main/architecture.md> — the single source of truth: data model, §10.1 term lifecycle, §10.2 gates and card floors, §10.4 upload/approval flow, §10.5 magnitude & load, §10.6 first run, §10.7 trash and digest
- <https://github.com/billbowas/scope-app/blob/main/docs/design/wireframe.html> — five screens (sign in, create term, upload, approval, dashboard/Today). **This file is the visual ground truth** for colour, spacing, and copy.
- <https://github.com/billbowas/scope-app/blob/main/docs/ui-research.md> — the UI references that were explicitly chosen to steal from: GitHub's contribution graph (heat map), Linear cycles (swimlanes), Sunsama's restraint on Today, Velt/Knack review-and-approve patterns

Anyone extending this system should read those repos directly — they contain product reasoning (why a card is hidden, why a tab is gated) that no design file can carry.

**No logo exists in the source.** The brand mark is the word "Scope" set in the display serif. Nothing here was drawn from memory of another brand; do not invent a mark.

---

## Content fundamentals

**Voice: a calm, well-informed peer who has read your syllabus.** Plain sentences, no cheerleading, no anxiety.

- **Second person for the student, "Scope" only when the app acted.** "Term dates are how Scope figures out 'this week' and 'next week.' You can edit them later." Never "we" for the product, never "I".
- **Sentence case everywhere.** Headings, buttons, labels. The only uppercase is the 11px meta label (`COURSES (3)`, `START TONIGHT`, `DUE IN THE NEXT 48 HOURS (4)`).
- **A claim, then the number that earns it.** "**Thursday** is your biggest day this week — 3 items, magnitude 6." Never a naked statistic, never a percentage delta in a stat tile (§10.5: stat figures are plain values; the average is a dashed line on the chart).
- **Say what is missing and the one action that fixes it.** "Runway needs a bit more of your term. You have 1 course and 14 assignments. Runway opens at 2 courses and 20 assignments. [Upload another syllabus]"
- **Failures are named plainly and stop.** "That looks like a scanned PDF — Scope can't read the text. Try a different file." No retry spinner, no stack trace, no apology paragraph.
- **Engineering words are banned from the UI.** No "archive" (it's "Current term" / "Past terms"), no "sync", no "record", no "entity", no "RLS".
- **Numbers are always accompanied by their unit or scope**: "42 items across 4 groups", "12 items · magnitude 1", "15 weeks · Aug 25 – Dec 12".
- **Dates are human, never ISO.** "due tomorrow 11:59 PM", "due Thursday", "Sep 5 – Nov 21", "Wednesday, Aug 26 · 10:25 PM".
- **No emoji, no exclamation marks, no gamification.** The wireframe's one 📄 in the drop zone is replaced by type. Nothing congratulates the student.
- **Copy is short enough to skim at 10 PM.** If a card can't answer a specific question a stressed student would ask, it's cut — that rule is in the research doc and it applies to copy too.

Middot (`·`) is the standard separator in meta lines. Em dash for the "claim — evidence" break. Curly quotes and apostrophes.

---

## Visual foundations

**The whole product is one dark room with a single gold lamp in it.** Everything is monochrome except gold, which means *this is the thing to look at or act on* — and course colours, which mean *identity*.

**Colour.** Canvas `#101010`, left rail `#0a0a0a` (darker than the canvas, not lighter), card `#1a1a1a`, inputs `#0f0f0f`. Text ladder `#e8e4da → #d0d0d0 → #909090 → #666`. Accent gold `#d4a94a` with `#f0b846` for hover/warning and `#c78400` for the deeper tint. Two background values only: canvas and rail. Cards sit on the canvas by border, not by lightness.

**Gold budget.** One gold-filled button per screen, one gold gradient (the Start-tonight hero) per app, one gold bar (the peak week) per chart, gold outline on the today cell of the heat map. If two gold things compete, one of them is wrong.

**Course colour.** `#c78400` gold, `#2a7da8` blue, `#6a8e3a` green, then two oklch-derived extensions. Assigned automatically in order at course creation and repeated everywhere that course appears — always a **square** swatch (8–10px), never a circle, never a chip with a label background.

**Load intensity.** A single-hue ramp `#161616 → #3a2f14 → #6b511c → #a87c2c → #d4a94a` at 25% quartiles. Explicitly never a rainbow scale.

**Type.** Serif-forward: **Source Serif 4** carries every heading, every hero, and every big metric; **IBM Plex Sans** is confined to 11–13px labels, meta lines and buttons; **IBM Plex Mono** holds dates, counts, ranges and magnitudes (tabular figures). Importance is expressed by size, and the top of the scale is deliberately large: metric 56px, hero 40px, display 32px, title 25px, heading 20px, subtitle 17px, body 15px, small 13px, micro 11.5px, label 11px. Headings use `-0.015em` tracking; labels `+0.06em`; the "START TONIGHT" eyebrow `+0.14em`.

**Spacing & layout.** 2/4/6/8/12/16/20/24/32/40/56/72. Fixed 264px left rail, always visible, never collapsible; main column scrolls under a 24–40px gutter. Content measures: 520px for setup forms, 880px for the approval screen, ~1000px for dashboard views. Rows are 44px minimum. Layout is a single column of cards — one primary suggestion, then a list; no widget grid, no drag-and-drop dashboard, no customisation.

**Backgrounds.** Flat colour only. No photography, no illustration, no pattern, no texture, no grain, no full-bleed imagery — the source has none and a forecasting tool doesn't need any. The **one** gradient in the system is `--gradient-accent` (135°, gold 18% → 8%) on the Start-tonight hero.

**Borders.** Hairline 1px is the primary structural device: `#3a3a3a` for cards and controls, `#262626` for internal dividers, `#5a5a5a` dashed for inputs and the syllabus drop zone (2px dashed there). Tinted bands (needs-attention, heavy-day) use a 1px border in the status colour over a 6–10% fill.

**Corner radii.** 3px controls (buttons, inputs, badges), 4px bands and small rows, 8px cards, 12px rarely, pill for step counters and status dots. Nothing is more rounded than 12px except pills.

**Cards.** Fill `#1a1a1a`, 1px `#3a3a3a` border, 8px radius, 16–20px padding, `inset 0 1px 0 rgba(255,255,255,.03), 0 1px 2px rgba(0,0,0,.4)`. Effectively flat — the border does the work. No coloured left-border accents. Only two things lift off the page: the Select menu (`0 12px 32px rgba(0,0,0,.55)`) and the hero (by tint, not shadow). Inner shadow is used once, as the 1px top highlight on cards.

**Transparency & blur.** Transparency yes (gold and status tints at 6–18%, hover fills at 3%), blur never — no frosted glass, no backdrop-filter, no protection gradients. Text always sits on a solid or near-solid fill.

**Hover.** Controls lighten one step (`#2a2a2a → #232323`) and their border warms to gold or `#909090`; rows fill to `#1a1a1a`; the drop zone tints gold 8%; chart bars step up one heat level; heat cells take a grey outline. Never a shadow, never a scale, never a colour flip.

**Press.** `translateY(1px)`. That's the entire press language — no shrink, no ripple.

**Motion.** 120ms for controls, 180ms for surfaces, one easing curve (`cubic-bezier(.2,.6,.3,1)`). Tabs and views switch instantly (Alpine show/hide) — no crossfades, no slide transitions, no skeletons, no bounce, no spring, no entrance animations. Extraction is synchronous, so no fake progress steps.

**Data-viz.** GitHub-contribution-graph heat map (22px cells, 3px gaps, weeks across, weekdays down), fixed-term-week bars with a dashed average line, and one lane per course with magnitude-sized dots (8/12/18px). Hover tooltips and click-to-filter ship with the chart, not later — an inert heat map is decoration. Chart labels are 11px sans; every value is mono.

**Imagery.** None. If a screen feels empty, §10.2 says hide cards rather than fill space.

---

## Iconography

- **No icon set exists in the source repo.** Substitution: **Lucide** (`unpkg.com/lucide@0.469.0`), 22px, 1.5px stroke, `currentColor`, never filled. Flagged — swap it if Scope adopts a different set.
- **The wireframe's own vocabulary is unicode glyphs, and it is preserved verbatim** because it is genuinely part of the design: `☐/☑` complete, `☆/★` watchlist, `◉/○` view radio, `▸/▾` expand/collapse, `⚠` needs attention, `→` forward action, `←` back, `✎` edit, `✕` remove, `·` separator, `▾` dropdown.
- **The only third-party mark is Google's G**, needed for the OAuth button: `assets/google-g.svg`, copied from the wireframe source. Google's mark must not be recoloured or resized below 18px.
- **Course identity is never an icon** — it's the colour square.
- **No emoji in product UI.** The wireframe's 📄 drop-zone glyph was intentionally dropped in favour of type.
- Icons are always paired with a label in the rail and in buttons; icon-only controls exist only for the row-level checkbox and star, which carry `title` attributes.

---

## Index

| Path | What it is |
|---|---|
| `styles.css` | The one stylesheet consumers link — `@import`s only |
| `tokens/` | `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `shape.css`, `motion.css`, `base.css` |
| `guidelines/` | 18 foundation specimen cards (Colors, Type, Spacing, Brand) |
| `components/core/` | Button, Input, Select, Card, Badge, SegmentedToggle |
| `components/app/` | Sidebar, CourseDot, HeroBanner, InsightBand, AssignmentRow, SeriesGroup, StepBar, DropZone, LockedTab, StatTile |
| `components/data/` | HeatMap, LoadChart, Swimlane |
| `ui_kits/scope-app/` | Click-through recreation of the whole flow — see its README |
| `assets/` | `google-g.svg` (only asset in the source; no logo exists) |
| `SKILL.md` | Agent-skill entry point |
| `github.md` | Upstream repo association + screen map |

### Components

Every component is `<Name>.jsx` + `<Name>.d.ts` + `<Name>.prompt.md`, exported on the bundle namespace.

**Core:** `Button`, `Input`, `Select`, `Card`, `Badge`, `SegmentedToggle`
**App:** `Sidebar`, `CourseDot`, `HeroBanner`, `InsightBand`, `AssignmentRow`, `SeriesGroup`, `StepBar`, `DropZone`, `LockedTab`, `StatTile`
**Forecast charts:** `HeatMap`, `LoadChart`, `Swimlane`

**Intentional additions** (the source defines screens, not a component library, so the inventory was derived from the wireframe's repeated elements): `SegmentedToggle` exists for the §10.5 Load/Items control; `StatTile` for the stat strips described in §10.5/§10.2; `LockedTab` for the §10.2 gate explainer; `CourseDot` because course colour is used as an identity token on every surface. Nothing was added that the specs don't require — no Toast, Avatar, Tabs, Tooltip or Modal, because Scope's spec forbids modals on the approval screen and never describes the rest.

### Known substitutions

1. **Fonts** — no binaries in the repo. Source Serif 4 / IBM Plex Sans / IBM Plex Mono from Google Fonts, loaded via `tokens/fonts.css`. If Scope has real licensed faces, drop the files in `assets/fonts/` and replace that `@import` with `@font-face` rules.
2. **Icons** — Lucide from CDN, as above.
3. **Numbers in the UI kit** are the mockups' figures, not computed forecasts.
