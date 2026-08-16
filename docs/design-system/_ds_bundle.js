/* @ds-bundle: {"format":4,"namespace":"ScopeDesignSystem_8aa58a","components":[{"name":"AssignmentRow","sourcePath":"components/app/AssignmentRow.jsx"},{"name":"CourseDot","sourcePath":"components/app/CourseDot.jsx"},{"name":"DropZone","sourcePath":"components/app/DropZone.jsx"},{"name":"HeroBanner","sourcePath":"components/app/HeroBanner.jsx"},{"name":"InsightBand","sourcePath":"components/app/InsightBand.jsx"},{"name":"LockedTab","sourcePath":"components/app/LockedTab.jsx"},{"name":"SeriesGroup","sourcePath":"components/app/SeriesGroup.jsx"},{"name":"Sidebar","sourcePath":"components/app/Sidebar.jsx"},{"name":"StatTile","sourcePath":"components/app/StatTile.jsx"},{"name":"StepBar","sourcePath":"components/app/StepBar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"SegmentedToggle","sourcePath":"components/core/SegmentedToggle.jsx"},{"name":"Select","sourcePath":"components/core/Select.jsx"},{"name":"HeatMap","sourcePath":"components/data/HeatMap.jsx"},{"name":"LoadChart","sourcePath":"components/data/LoadChart.jsx"},{"name":"Swimlane","sourcePath":"components/data/Swimlane.jsx"}],"sourceHashes":{"components/app/AssignmentRow.jsx":"9f13a6ebb2ae","components/app/CourseDot.jsx":"813b49074ea1","components/app/DropZone.jsx":"d1344345384f","components/app/HeroBanner.jsx":"e6a596f12ea9","components/app/InsightBand.jsx":"7581671cc8fc","components/app/LockedTab.jsx":"c81f22c4e5c7","components/app/SeriesGroup.jsx":"6c4b650f8658","components/app/Sidebar.jsx":"a9a9b18f756f","components/app/StatTile.jsx":"579a8dc6154b","components/app/StepBar.jsx":"36e864b56e0c","components/core/Badge.jsx":"dac9ebbbfd33","components/core/Button.jsx":"3ca605814a92","components/core/Card.jsx":"8bfb35183d3a","components/core/Input.jsx":"be1f506996fd","components/core/SegmentedToggle.jsx":"63b86a0c2c11","components/core/Select.jsx":"0349ce572623","components/data/HeatMap.jsx":"5f531483cfc8","components/data/LoadChart.jsx":"bb2db54ee3d3","components/data/Swimlane.jsx":"7eb88d0dd9fa","ui_kits/scope-app/App.jsx":"6df50a6886f9","ui_kits/scope-app/Approve.jsx":"29ada6b85708","ui_kits/scope-app/Runway.jsx":"6df14261904b","ui_kits/scope-app/Setup.jsx":"68fc2a650a1a","ui_kits/scope-app/SignIn.jsx":"2953fd04e77f","ui_kits/scope-app/Today.jsx":"caf399cfa78b","ui_kits/scope-app/Workload.jsx":"638d74789643","ui_kits/scope-app/data.js":"133c53efd73c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ScopeDesignSystem_8aa58a = window.ScopeDesignSystem_8aa58a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/app/CourseDot.jsx
try { (() => {
function CourseDot({
  color = "var(--course-1)",
  size = 10,
  label,
  muted
}) {
  const dot = /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      background: color,
      border: "1px solid rgba(0,0,0,.35)",
      flex: "0 0 auto",
      display: "inline-block"
    }
  });
  if (!label) return dot;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-4)",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-small)",
      color: muted ? "var(--text-muted)" : "var(--text-body)"
    }
  }, dot, label);
}
Object.assign(__ds_scope, { CourseDot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/CourseDot.jsx", error: String((e && e.message) || e) }); }

// components/app/AssignmentRow.jsx
try { (() => {
function AssignmentRow({
  title,
  course,
  courseColor,
  type,
  due,
  magnitude,
  complete,
  watched,
  needsReview,
  onToggleComplete,
  onToggleWatch,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: onClick,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-6)",
      minHeight: "var(--row-height)",
      padding: "var(--space-4) var(--space-5)",
      background: hover ? "var(--surface-card)" : "transparent",
      border: `var(--border-hairline) solid ${needsReview ? "var(--warn)" : "var(--border-subtle)"}`,
      borderRadius: "var(--radius-sm)",
      cursor: onClick ? "pointer" : "default",
      transition: "var(--transition-surface)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-ui)",
      fontSize: "var(--size-subtitle)",
      color: complete ? "var(--text-muted)" : "var(--text-primary)",
      textDecoration: complete ? "line-through" : "none"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      marginTop: "var(--space-2)",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-micro)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.CourseDot, {
    color: courseColor,
    size: 7
  }), /*#__PURE__*/React.createElement("span", null, course), /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, type), due && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--text-body)",
      fontWeight: "var(--weight-semibold)"
    }
  }, due)), magnitude != null && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "scope-data"
  }, "mag ", magnitude)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-5)",
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    title: "Mark complete",
    onClick: e => {
      e.stopPropagation();
      onToggleComplete && onToggleComplete();
    },
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "var(--size-body)",
      color: complete ? "var(--ok)" : "var(--text-faint)"
    }
  }, complete ? "☑" : "☐"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    title: "Watchlist",
    onClick: e => {
      e.stopPropagation();
      onToggleWatch && onToggleWatch();
    },
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "var(--size-body)",
      color: watched ? "var(--accent)" : "var(--text-faint)"
    }
  }, watched ? "★" : "☆")));
}
Object.assign(__ds_scope, { AssignmentRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/AssignmentRow.jsx", error: String((e && e.message) || e) }); }

// components/app/DropZone.jsx
try { (() => {
function DropZone({
  title = "Drop your syllabus PDF here",
  hint = "or click to browse · max 10 MB · max 60 pages",
  filename,
  error,
  onPick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onPick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      padding: "var(--space-11) var(--space-6)",
      textAlign: "center",
      cursor: "pointer",
      background: hover ? "var(--gold-a08)" : "transparent",
      border: `var(--border-emphasis) dashed ${error ? "var(--danger)" : hover ? "var(--gold-500)" : "var(--line-dashed)"}`,
      borderRadius: "var(--radius-sm)",
      transition: "var(--transition-surface)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--size-title)",
      color: filename ? "var(--gold-300)" : "var(--text-primary)"
    }
  }, filename || title), /*#__PURE__*/React.createElement("div", {
    className: "scope-meta",
    style: {
      marginTop: "var(--space-3)",
      fontSize: "var(--size-micro)",
      color: error ? "var(--danger)" : "var(--text-muted)"
    }
  }, error || (filename ? "Ready to extract" : hint)));
}
Object.assign(__ds_scope, { DropZone });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/DropZone.jsx", error: String((e && e.message) || e) }); }

// components/app/HeroBanner.jsx
try { (() => {
function HeroBanner({
  eyebrow = "Start tonight",
  title,
  detail,
  actions
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-8)",
      padding: "var(--space-7)",
      borderRadius: "var(--radius-md)",
      background: "var(--gradient-accent)",
      border: "var(--border-hairline) solid var(--gold-a45)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-label)",
      fontWeight: "var(--weight-semibold)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-wide)",
      color: "var(--accent)"
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: "var(--space-3)",
      fontSize: "var(--size-hero)",
      color: "var(--gold-300)",
      lineHeight: "var(--leading-tight)"
    }
  }, title), detail && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-4)",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-small)",
      color: "var(--text-body)"
    }
  }, detail)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      flex: "0 0 auto"
    }
  }, actions));
}
Object.assign(__ds_scope, { HeroBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/HeroBanner.jsx", error: String((e && e.message) || e) }); }

// components/app/InsightBand.jsx
try { (() => {
const TONES = {
  warn: {
    fg: "var(--warn)",
    bg: "var(--warn-bg)",
    bd: "var(--warn)"
  },
  accent: {
    fg: "var(--accent)",
    bg: "var(--gold-a08)",
    bd: "var(--gold-a45)"
  },
  danger: {
    fg: "var(--danger)",
    bg: "var(--danger-bg)",
    bd: "var(--danger)"
  },
  neutral: {
    fg: "var(--text-muted)",
    bg: "transparent",
    bd: "var(--border-subtle)"
  }
};
function InsightBand({
  tone = "warn",
  label,
  children,
  actions
}) {
  const t = TONES[tone] || TONES.warn;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-5)",
      background: t.bg,
      border: `var(--border-hairline) solid ${t.bd}`,
      borderRadius: "var(--radius-sm)"
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-label)",
      textTransform: "uppercase",
      letterSpacing: "var(--tracking-label)",
      color: t.fg
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-3)",
      fontSize: "var(--size-subtitle)",
      color: "var(--text-primary)",
      lineHeight: "var(--leading-snug)"
    }
  }, children), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-5)",
      display: "flex",
      gap: "var(--space-4)"
    }
  }, actions));
}
Object.assign(__ds_scope, { InsightBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/InsightBand.jsx", error: String((e && e.message) || e) }); }

// components/app/LockedTab.jsx
try { (() => {
function LockedTab({
  view = "Runway",
  have,
  needs,
  action
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--measure-form)",
      padding: "var(--space-9) 0"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--size-display)"
    }
  }, view, " needs a bit more of your term."), have && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "var(--space-5)",
      fontSize: "var(--size-subtitle)",
      color: "var(--text-body)"
    }
  }, have), needs && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "var(--space-3)",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-small)",
      color: "var(--text-muted)"
    }
  }, needs), action && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-7)"
    }
  }, action));
}
Object.assign(__ds_scope, { LockedTab });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/LockedTab.jsx", error: String((e && e.message) || e) }); }

// components/app/SeriesGroup.jsx
try { (() => {
function SeriesGroup({
  title,
  cadence,
  range,
  count,
  magnitude,
  expanded,
  onToggle,
  actions,
  children,
  moreLabel
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-5)",
      background: "var(--surface-card)",
      border: "var(--border-hairline) solid var(--border-card)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: "var(--space-6)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--size-heading)",
      fontWeight: "var(--weight-semibold)",
      color: "var(--text-primary)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-2)",
      display: "flex",
      gap: "var(--space-4)",
      flexWrap: "wrap",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-micro)",
      color: "var(--text-muted)"
    }
  }, cadence && /*#__PURE__*/React.createElement("span", null, cadence), range && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", {
    className: "scope-data"
  }, range)), count != null && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, count, " items")), magnitude != null && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", null, "\xB7"), /*#__PURE__*/React.createElement("span", null, "magnitude ", magnitude)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      flex: "0 0 auto"
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onToggle,
    style: {
      padding: "3px 10px",
      background: expanded ? "transparent" : "var(--gold-500)",
      color: expanded ? "var(--accent)" : "var(--accent-ink)",
      border: `var(--border-hairline) solid ${expanded ? "var(--gold-a45)" : "var(--gold-500)"}`,
      borderRadius: "var(--radius-xs)",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-micro)",
      fontWeight: "var(--weight-medium)",
      cursor: "pointer"
    }
  }, expanded ? "▾ collapse" : "▸ expand"), actions)), expanded && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-5)",
      paddingTop: "var(--space-4)",
      borderTop: "var(--border-hairline) solid var(--border-subtle)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, children, moreLabel && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "var(--space-3)",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-micro)",
      fontStyle: "italic",
      color: "var(--text-faint)"
    }
  }, moreLabel)));
}
Object.assign(__ds_scope, { SeriesGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/SeriesGroup.jsx", error: String((e && e.message) || e) }); }

// components/app/Sidebar.jsx
try { (() => {
function Row({
  active,
  locked,
  children,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      width: "100%",
      padding: "5px 8px",
      textAlign: "left",
      border: "none",
      cursor: "pointer",
      borderRadius: "var(--radius-xs)",
      background: active ? "var(--ink-700)" : hover ? "rgba(255,255,255,.03)" : "transparent",
      color: active ? "var(--text-primary)" : locked ? "var(--text-faint)" : "var(--text-body)",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-small)",
      transition: "var(--transition-control)"
    }
  }, children);
}
function Sidebar({
  termName = "Fall 2026",
  pastTerms = [],
  courses = [],
  views = [],
  activeView,
  onSelectView,
  onAddCourse,
  onSelectTerm,
  footer = ["Trash", "Settings"]
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: "var(--rail-width)",
      flex: "0 0 auto",
      height: "100%",
      padding: "var(--space-6)",
      background: "var(--canvas-rail)",
      borderRight: "var(--border-hairline) solid var(--border-subtle)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-7)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--size-heading)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-tight)",
      color: "var(--text-primary)"
    }
  }, "Scope"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onSelectTerm,
    style: {
      marginTop: "var(--space-2)",
      padding: 0,
      background: "none",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-micro)",
      color: "var(--text-muted)"
    }
  }, termName, " \u25BE", pastTerms.length ? ` · ${pastTerms.length} past` : "")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "scope-label",
    style: {
      marginBottom: "var(--space-3)"
    }
  }, "Courses (", courses.length, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)"
    }
  }, courses.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.name,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      padding: "4px 8px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.CourseDot, {
    color: c.color,
    label: c.name
  }), c.count != null && /*#__PURE__*/React.createElement("span", {
    className: "scope-data",
    style: {
      fontSize: "var(--size-micro)",
      color: "var(--text-faint)"
    }
  }, c.count))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onAddCourse,
    style: {
      marginTop: "var(--space-2)",
      padding: "4px 8px",
      textAlign: "left",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-micro)",
      color: "var(--text-faint)"
    }
  }, "+ Add course"))), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: "var(--space-6)",
      borderTop: "var(--border-hairline) solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "scope-label",
    style: {
      marginBottom: "var(--space-3)"
    }
  }, "Views"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)"
    }
  }, views.map(v => /*#__PURE__*/React.createElement(Row, {
    key: v.id,
    active: v.id === activeView,
    locked: v.locked,
    onClick: () => onSelectView && onSelectView(v.id)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: v.id === activeView ? "var(--accent)" : "inherit"
    }
  }, v.id === activeView ? "◉" : "○"), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, v.label), v.locked && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-micro)",
      color: "var(--text-faint)"
    }
  }, "locked"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: "var(--space-6)",
      borderTop: "var(--border-hairline) solid var(--border-subtle)",
      display: "flex",
      gap: "var(--space-4)",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-micro)",
      color: "var(--text-faint)"
    }
  }, footer.map(f => /*#__PURE__*/React.createElement("span", {
    key: f
  }, f))));
}
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/app/StatTile.jsx
try { (() => {
function StatTile({
  label,
  value,
  unit,
  sub,
  tone = "default"
}) {
  const fg = tone === "accent" ? "var(--gold-300)" : "var(--text-primary)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-6)",
      background: tone === "accent" ? "var(--gold-a08)" : "var(--surface-card)",
      border: `var(--border-hairline) solid ${tone === "accent" ? "var(--gold-a45)" : "var(--border-card)"}`,
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "scope-label"
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-3)",
      marginTop: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--size-metric)",
      fontWeight: "var(--weight-regular)",
      lineHeight: "var(--leading-tight)",
      letterSpacing: "var(--tracking-tight)",
      color: fg,
      fontVariantNumeric: "tabular-nums"
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-small)",
      color: "var(--text-muted)"
    }
  }, unit)), sub && /*#__PURE__*/React.createElement("div", {
    className: "scope-meta",
    style: {
      marginTop: "var(--space-3)",
      fontSize: "var(--size-micro)"
    }
  }, sub));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/app/StepBar.jsx
try { (() => {
function StepBar({
  step = 1,
  total = 3,
  labels = []
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-5)",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-micro)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "2px 8px",
      background: "var(--gold-500)",
      color: "var(--accent-ink)",
      borderRadius: "var(--radius-pill)",
      fontWeight: "var(--weight-semibold)"
    }
  }, "Step ", step, " of ", total), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: "var(--space-3)"
    }
  }, labels.map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      color: i < step - 1 ? "var(--ok)" : i === step - 1 ? "var(--text-primary)" : "var(--text-faint)"
    }
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-faint)",
      marginRight: "var(--space-3)"
    }
  }, "\xB7"), l, i < step - 1 ? " ✓" : ""))));
}
Object.assign(__ds_scope, { StepBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/app/StepBar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const TONES = {
  neutral: {
    bg: "var(--ink-700)",
    fg: "var(--text-body)",
    bd: "var(--line-strong)"
  },
  accent: {
    bg: "var(--gold-500)",
    fg: "var(--accent-ink)",
    bd: "var(--gold-500)"
  },
  warn: {
    bg: "var(--warn-bg)",
    fg: "var(--warn)",
    bd: "var(--warn)"
  },
  ok: {
    bg: "var(--ok-bg)",
    fg: "var(--ok)",
    bd: "var(--ok)"
  },
  danger: {
    bg: "var(--danger-bg)",
    fg: "var(--danger)",
    bd: "var(--danger)"
  },
  outline: {
    bg: "transparent",
    fg: "var(--text-muted)",
    bd: "var(--line-strong)"
  }
};
function Badge({
  tone = "neutral",
  pill,
  children,
  mono
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      padding: pill ? "2px 10px" : "2px 6px",
      fontFamily: mono ? "var(--font-data)" : "var(--font-meta)",
      fontSize: "var(--size-micro)",
      fontWeight: "var(--weight-medium)",
      background: t.bg,
      color: t.fg,
      border: `var(--border-hairline) solid ${t.bd}`,
      borderRadius: pill ? "var(--radius-pill)" : "var(--radius-xs)",
      whiteSpace: "nowrap"
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const TONES = {
  primary: {
    bg: "var(--gold-500)",
    fg: "var(--accent-ink)",
    bd: "var(--gold-500)",
    bgHover: "var(--gold-400)",
    bdHover: "var(--gold-400)"
  },
  secondary: {
    bg: "var(--ink-600)",
    fg: "var(--text-primary)",
    bd: "#888",
    bgHover: "var(--surface-raised)",
    bdHover: "var(--gray-400)"
  },
  ghost: {
    bg: "transparent",
    fg: "var(--accent)",
    bd: "var(--gold-a45)",
    bgHover: "var(--gold-a08)",
    bdHover: "var(--gold-500)"
  },
  quiet: {
    bg: "transparent",
    fg: "var(--text-muted)",
    bd: "transparent",
    bgHover: "var(--ink-700)",
    bdHover: "transparent"
  },
  danger: {
    bg: "transparent",
    fg: "var(--danger)",
    bd: "rgba(194,86,74,.5)",
    bgHover: "var(--danger-bg)",
    bdHover: "var(--danger)"
  }
};
const SIZES = {
  sm: {
    fs: "var(--size-micro)",
    pad: "3px 8px",
    h: "26px"
  },
  md: {
    fs: "var(--size-small)",
    pad: "6px 14px",
    h: "var(--control-height)"
  },
  lg: {
    fs: "var(--size-body)",
    pad: "10px 20px",
    h: "var(--control-height-lg)"
  }
};
function Button({
  variant = "secondary",
  size = "md",
  icon,
  iconAfter,
  children,
  disabled,
  full,
  onClick,
  title
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const t = TONES[variant] || TONES.secondary;
  const s = SIZES[size] || SIZES.md;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    title: title,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-3)",
      width: full ? "100%" : "auto",
      minHeight: s.h,
      padding: s.pad,
      fontFamily: "var(--font-meta)",
      fontSize: s.fs,
      fontWeight: "var(--weight-medium)",
      background: hover && !disabled ? t.bgHover : t.bg,
      color: t.fg,
      border: `var(--border-hairline) solid ${hover && !disabled ? t.bdHover : t.bd}`,
      borderRadius: "var(--radius-xs)",
      opacity: disabled ? 0.4 : 1,
      cursor: disabled ? "not-allowed" : "pointer",
      transform: press && !disabled ? "var(--press-shift)" : "none",
      transition: "var(--transition-control)",
      whiteSpace: "nowrap"
    }
  }, icon, children, iconAfter);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
const TONES = {
  default: {
    bg: "var(--surface-card)",
    bd: "var(--border-card)",
    fg: "var(--text-body)"
  },
  flat: {
    bg: "transparent",
    bd: "var(--border-subtle)",
    fg: "var(--text-body)"
  },
  accent: {
    bg: "var(--gold-a08)",
    bd: "var(--gold-a45)",
    fg: "var(--text-body)"
  },
  warn: {
    bg: "var(--warn-bg)",
    bd: "var(--warn)",
    fg: "var(--text-body)"
  },
  danger: {
    bg: "var(--danger-bg)",
    bd: "var(--danger)",
    fg: "var(--text-body)"
  }
};
function Card({
  tone = "default",
  title,
  meta,
  actions,
  padding,
  children,
  style
}) {
  const t = TONES[tone] || TONES.default;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: t.bg,
      color: t.fg,
      border: `var(--border-hairline) solid ${t.bd}`,
      borderRadius: "var(--radius-md)",
      padding: padding || "var(--space-6)",
      boxShadow: tone === "default" ? "var(--shadow-card)" : "none",
      ...style
    }
  }, (title || actions || meta) && /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: "var(--space-5)",
      marginBottom: children ? "var(--space-5)" : 0
    }
  }, /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--size-heading)"
    }
  }, title), meta && /*#__PURE__*/React.createElement("div", {
    className: "scope-meta",
    style: {
      marginTop: "var(--space-1)"
    }
  }, meta)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      flex: "0 0 auto"
    }
  }, actions)), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function Input({
  label,
  value,
  placeholder,
  onChange,
  mono,
  width,
  invalid,
  readOnly,
  hint,
  suffix
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      width: width || "100%"
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    className: "scope-label",
    style: {
      marginBottom: "var(--space-2)"
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: value ?? "",
    placeholder: placeholder,
    readOnly: readOnly,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    onChange: e => onChange && onChange(e.target.value),
    style: {
      flex: 1,
      minWidth: 0,
      height: "var(--control-height)",
      padding: "6px 10px",
      background: "var(--surface-input)",
      color: "var(--text-body)",
      fontFamily: mono ? "var(--font-data)" : "var(--font-ui)",
      fontSize: "var(--size-small)",
      border: `var(--border-hairline) solid ${invalid ? "var(--danger)" : focus ? "var(--gold-500)" : "var(--line-dashed)"}`,
      borderRadius: "var(--radius-xs)",
      outline: "none",
      transition: "var(--transition-control)"
    }
  }), suffix && /*#__PURE__*/React.createElement("span", {
    className: "scope-meta"
  }, suffix)), hint && /*#__PURE__*/React.createElement("div", {
    className: "scope-meta",
    style: {
      marginTop: "var(--space-2)",
      fontSize: "var(--size-micro)",
      color: invalid ? "var(--danger)" : "var(--text-faint)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/SegmentedToggle.jsx
try { (() => {
function SegmentedToggle({
  options = [],
  value,
  onChange,
  size = "md"
}) {
  const pad = size === "sm" ? "3px 10px" : "6px 14px";
  return /*#__PURE__*/React.createElement("div", {
    role: "group",
    style: {
      display: "inline-flex",
      padding: 2,
      background: "var(--surface-input)",
      border: "var(--border-hairline) solid var(--line-strong)",
      borderRadius: "var(--radius-xs)"
    }
  }, options.map(o => {
    const active = o.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      type: "button",
      onClick: () => onChange && onChange(o.value),
      style: {
        padding: pad,
        fontFamily: "var(--font-meta)",
        fontSize: "var(--size-micro)",
        fontWeight: "var(--weight-medium)",
        background: active ? "var(--gold-500)" : "transparent",
        color: active ? "var(--accent-ink)" : "var(--text-muted)",
        border: "none",
        borderRadius: "var(--radius-xs)",
        cursor: "pointer",
        transition: "var(--transition-control)"
      }
    }, o.label);
  }));
}
Object.assign(__ds_scope, { SegmentedToggle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SegmentedToggle.jsx", error: String((e && e.message) || e) }); }

// components/core/Select.jsx
try { (() => {
function Select({
  label,
  value,
  options = [],
  onChange,
  width,
  dots
}) {
  const [open, setOpen] = React.useState(false);
  const current = options.find(o => o.value === value) || options[0] || {
    label: ""
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: width || "auto"
    }
  }, label && /*#__PURE__*/React.createElement("div", {
    className: "scope-label",
    style: {
      marginBottom: "var(--space-2)"
    }
  }, label), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setOpen(!open),
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      width: "100%",
      height: "var(--control-height)",
      padding: "0 10px",
      background: "var(--surface-input)",
      color: "var(--text-body)",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-small)",
      border: `var(--border-hairline) solid ${open ? "var(--gold-500)" : "var(--line-dashed)"}`,
      borderRadius: "var(--radius-xs)",
      cursor: "pointer",
      transition: "var(--transition-control)"
    }
  }, dots && current.color && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      background: current.color,
      flex: "0 0 auto"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      textAlign: "left",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, current.label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      fontSize: "var(--size-micro)"
    }
  }, "\u25BE")), open && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      zIndex: 20,
      top: "calc(100% + 4px)",
      left: 0,
      minWidth: "100%",
      background: "var(--surface-card)",
      border: "var(--border-hairline) solid var(--border-card)",
      borderRadius: "var(--radius-sm)",
      boxShadow: "var(--shadow-pop)",
      padding: "var(--space-2)"
    }
  }, options.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    onClick: () => {
      onChange && onChange(o.value);
      setOpen(false);
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      width: "100%",
      padding: "6px 8px",
      background: o.value === current.value ? "var(--ink-700)" : "transparent",
      color: o.value === current.value ? "var(--text-primary)" : "var(--text-body)",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-small)",
      border: "none",
      borderRadius: "var(--radius-xs)",
      cursor: "pointer",
      textAlign: "left"
    }
  }, dots && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      background: o.color || "transparent",
      flex: "0 0 auto"
    }
  }), o.label))));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Select.jsx", error: String((e && e.message) || e) }); }

// components/data/HeatMap.jsx
try { (() => {
const RAMP = ["var(--heat-0)", "var(--heat-1)", "var(--heat-2)", "var(--heat-3)", "var(--heat-4)"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function level(load, max) {
  if (!load) return 0;
  const r = load / (max || 1);
  if (r <= 0.25) return 1;
  if (r <= 0.5) return 2;
  if (r <= 0.75) return 3;
  return 4;
}
function HeatMap({
  weeks = 15,
  cells = [],
  max,
  today,
  cellSize = 22,
  onCellClick,
  weekLabels
}) {
  const [hover, setHover] = React.useState(null);
  const peak = max || cells.reduce((m, c) => Math.max(m, c.load || 0), 0);
  const byKey = {};
  cells.forEach(c => {
    byKey[`${c.week}-${c.day}`] = c;
  });
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 3,
      paddingTop: 16
    }
  }, DAYS.map(d => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      height: cellSize,
      lineHeight: `${cellSize}px`,
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-label)",
      color: "var(--text-faint)"
    }
  }, d))), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 3,
      marginBottom: 3,
      height: 13
    }
  }, Array.from({
    length: weeks
  }).map((_, w) => /*#__PURE__*/React.createElement("div", {
    key: w,
    style: {
      width: cellSize,
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-label)",
      color: "var(--text-faint)",
      textAlign: "center"
    }
  }, weekLabels ? weekLabels[w] : w % 2 === 0 ? `W${w + 1}` : ""))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 3
    }
  }, DAYS.map((d, di) => /*#__PURE__*/React.createElement("div", {
    key: d,
    style: {
      display: "flex",
      gap: 3
    }
  }, Array.from({
    length: weeks
  }).map((_, w) => {
    const cell = byKey[`${w}-${di}`];
    const lv = level(cell && cell.load, peak);
    const isToday = today && today.week === w && today.day === di;
    const isHover = hover && hover.week === w && hover.day === di;
    return /*#__PURE__*/React.createElement("div", {
      key: w,
      onMouseEnter: () => setHover({
        week: w,
        day: di,
        ...cell
      }),
      onMouseLeave: () => setHover(null),
      onClick: () => onCellClick && onCellClick({
        week: w,
        day: di,
        ...cell
      }),
      style: {
        width: cellSize,
        height: cellSize,
        background: RAMP[lv],
        border: `1px solid ${isToday ? "var(--gold-400)" : isHover ? "var(--gray-400)" : "#333"}`,
        cursor: onCellClick ? "pointer" : "default"
      }
    });
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: "var(--space-5)",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 18,
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-micro)",
      color: "var(--text-body)"
    }
  }, hover ? `${hover.label || `W${hover.week + 1} ${DAYS[hover.day]}`} · ${hover.load || 0} load${hover.items ? ` · ${hover.items} items` : ""}` : "Hover a day for its items"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-label)",
      color: "var(--text-faint)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "lighter"), RAMP.map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    style: {
      width: 12,
      height: 12,
      background: c,
      border: "1px solid #333"
    }
  })), /*#__PURE__*/React.createElement("span", null, "heavier"))));
}
Object.assign(__ds_scope, { HeatMap });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/HeatMap.jsx", error: String((e && e.message) || e) }); }

// components/data/LoadChart.jsx
try { (() => {
function LoadChart({
  bars = [],
  average,
  height = 180,
  unit = "load",
  onSelect,
  selected
}) {
  const [hover, setHover] = React.useState(null);
  const max = bars.reduce((m, b) => Math.max(m, b.value || 0), 0) || 1;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height,
      display: "flex",
      alignItems: "flex-end",
      gap: "var(--space-3)"
    }
  }, average != null && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: `${average / max * 100}%`,
      borderTop: "1px dashed var(--line-dashed)",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 0,
      top: -16,
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-label)",
      color: "var(--text-faint)"
    }
  }, "term average ", average)), bars.map((b, i) => {
    const active = selected === b.label;
    const isHover = hover === i;
    return /*#__PURE__*/React.createElement("div", {
      key: b.label,
      style: {
        flex: 1,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        height: "100%"
      },
      onMouseEnter: () => setHover(i),
      onMouseLeave: () => setHover(null),
      onClick: () => onSelect && onSelect(b.label)
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-data)",
        fontSize: "var(--size-label)",
        textAlign: "center",
        color: isHover || active ? "var(--gold-300)" : "transparent",
        marginBottom: 2
      }
    }, b.value), /*#__PURE__*/React.createElement("div", {
      style: {
        height: `${Math.max(b.value / max * 100, 1)}%`,
        background: b.peak ? "var(--gold-500)" : isHover || active ? "var(--heat-3)" : "var(--heat-2)",
        borderTop: `2px solid ${b.peak ? "var(--gold-400)" : "transparent"}`,
        cursor: onSelect ? "pointer" : "default",
        transition: "var(--transition-surface)"
      }
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      marginTop: "var(--space-3)"
    }
  }, bars.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.label,
    style: {
      flex: 1,
      minWidth: 0,
      textAlign: "center",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-label)",
      color: b.peak ? "var(--accent)" : "var(--text-faint)"
    }
  }, b.label))), /*#__PURE__*/React.createElement("div", {
    className: "scope-meta",
    style: {
      marginTop: "var(--space-4)",
      fontSize: "var(--size-micro)"
    }
  }, hover != null ? `${bars[hover].label} · ${bars[hover].value} ${unit}` : `Fixed term weeks · ${unit}`));
}
Object.assign(__ds_scope, { LoadChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/LoadChart.jsx", error: String((e && e.message) || e) }); }

// components/data/Swimlane.jsx
try { (() => {
const SIZE = {
  1: 8,
  2: 12,
  3: 18
};
function Swimlane({
  courses = [],
  weeks = 15,
  collisions = [],
  onItemClick
}) {
  const [hover, setHover] = React.useState(null);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, courses.map(c => /*#__PURE__*/React.createElement("div", {
    key: c.name,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 150,
      flex: "0 0 auto",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-small)",
      color: "var(--text-body)",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      background: c.color,
      flex: "0 0 auto"
    }
  }), c.name), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      flex: 1,
      height: 34,
      background: "var(--ink-800)",
      border: "var(--border-hairline) solid var(--border-subtle)",
      borderRadius: "var(--radius-xs)"
    }
  }, collisions.map(col => /*#__PURE__*/React.createElement("div", {
    key: `${c.name}-${col.week}`,
    style: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: `${col.week / weeks * 100}%`,
      width: `${1 / weeks * 100}%`,
      background: "var(--gold-a08)",
      borderLeft: "1px solid var(--gold-a45)",
      borderRight: "1px solid var(--gold-a45)"
    }
  })), (c.items || []).map((it, i) => {
    const d = SIZE[it.magnitude || 1];
    const key = `${c.name}-${i}`;
    return /*#__PURE__*/React.createElement("div", {
      key: key,
      onMouseEnter: () => setHover({
        key,
        text: `${it.label} · ${c.name} · ${it.date || ""}`
      }),
      onMouseLeave: () => setHover(null),
      onClick: () => onItemClick && onItemClick(it),
      title: it.label,
      style: {
        position: "absolute",
        top: "50%",
        left: `${it.week / weeks * 100 + 0.5 / weeks * 100}%`,
        width: d,
        height: d,
        marginTop: -d / 2,
        marginLeft: -d / 2,
        background: c.color,
        borderRadius: "var(--radius-pill)",
        border: hover && hover.key === key ? "2px solid var(--gold-300)" : "2px solid var(--ink-800)",
        cursor: onItemClick ? "pointer" : "default"
      }
    });
  })))), /*#__PURE__*/React.createElement("div", {
    className: "scope-meta",
    style: {
      fontSize: "var(--size-micro)",
      minHeight: 16
    }
  }, hover ? hover.text : "Dot size = magnitude · shaded columns = collisions across courses"));
}
Object.assign(__ds_scope, { Swimlane });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Swimlane.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scope-app/App.jsx
try { (() => {
const {
  Sidebar,
  Button
} = window.ScopeDesignSystem_8aa58a;
function App() {
  // stage: signin → term → upload → verify → approve → app
  const [stage, setStage] = React.useState("app");
  const [view, setView] = React.useState("today");
  const [courses, setCourses] = React.useState(window.SCOPE_DATA.COURSES);
  const sparse = courses.length < 2;
  const shell = content => /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      height: "100%",
      background: "var(--canvas)"
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    termName: "Fall 2026",
    pastTerms: ["Spring 2026"],
    courses: courses,
    views: [{
      id: "today",
      label: "Today"
    }, {
      id: "workload",
      label: "Workload"
    }, {
      id: "runway",
      label: "Runway",
      locked: sparse
    }],
    activeView: view,
    onSelectView: setView,
    onAddCourse: () => setStage("upload")
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      flex: 1,
      minWidth: 0,
      overflow: "auto",
      padding: "var(--space-9) var(--space-10)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000
    }
  }, content)));
  if (stage === "signin") return /*#__PURE__*/React.createElement(window.SignIn, {
    onSignIn: () => setStage("term")
  });
  if (stage === "term") return /*#__PURE__*/React.createElement(window.SetupTerm, {
    onNext: () => setStage("upload")
  });
  if (stage === "upload") return /*#__PURE__*/React.createElement(window.SetupUpload, {
    onBack: () => setStage("term"),
    onNext: () => setStage("verify")
  });
  if (stage === "verify") return /*#__PURE__*/React.createElement(window.Verify, {
    onNext: () => setStage("approve")
  });
  if (stage === "approve") return /*#__PURE__*/React.createElement(window.Approve, {
    onApprove: () => {
      setStage("app");
      setView("today");
    },
    onDiscard: () => setStage("upload")
  });
  return shell(view === "today" ? /*#__PURE__*/React.createElement(window.Today, null) : view === "workload" ? /*#__PURE__*/React.createElement(window.Workload, null) : /*#__PURE__*/React.createElement(window.Runway, {
    locked: sparse,
    onUpload: () => setStage("upload")
  }));
}
function Kit() {
  const [key, setKey] = React.useState(0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: "100vh"
    }
  }, /*#__PURE__*/React.createElement(App, {
    key: key
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setKey(key + 1),
    title: "Restart the flow",
    style: {
      position: "fixed",
      right: 14,
      bottom: 14,
      padding: "6px 12px",
      background: "var(--surface-card)",
      color: "var(--text-muted)",
      border: "1px solid var(--border-card)",
      borderRadius: "var(--radius-pill)",
      fontFamily: "var(--font-meta)",
      fontSize: 11,
      cursor: "pointer"
    }
  }, "restart flow"));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(Kit, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scope-app/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scope-app/Approve.jsx
try { (() => {
const {
  Button,
  Card,
  Badge,
  SeriesGroup,
  AssignmentRow,
  InsightBand,
  Input
} = window.ScopeDesignSystem_8aa58a;
function Approve({
  onApprove,
  onDiscard
}) {
  const series = window.SCOPE_DATA.SERIES;
  const [open, setOpen] = React.useState({
    ps: true
  });
  const [resolved, setResolved] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      overflow: "auto",
      background: "var(--canvas)",
      padding: "var(--space-9) var(--gutter-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--measure-review)",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: "var(--space-6)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--size-title)"
    }
  }, "Corporate Finance \u2014 42 items across 4 groups"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-micro)",
      color: "var(--text-muted)"
    }
  }, "28 homework \xB7 8 readings \xB7 4 quizzes \xB7 2 exams \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: resolved ? "var(--ok)" : "var(--warn)"
    }
  }, resolved ? "nothing left to check" : "3 need your attention"))), !resolved && /*#__PURE__*/React.createElement(InsightBand, {
    label: "\u26A0 Needs your attention",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Input, {
      mono: true,
      placeholder: "pick a date",
      width: "200px"
    }), /*#__PURE__*/React.createElement(Button, {
      onClick: () => setResolved(true)
    }, "Save date"), /*#__PURE__*/React.createElement(Button, {
      variant: "danger",
      onClick: () => setResolved(true)
    }, "Dismiss item"))
  }, /*#__PURE__*/React.createElement("b", null, "\u201CFinal project \u2014 TBD\u201D"), " \xB7 date unresolved ", /*#__PURE__*/React.createElement(Badge, {
    tone: "warn"
  }, "Scope wasn\u2019t sure")), series.map(s => /*#__PURE__*/React.createElement(SeriesGroup, {
    key: s.key,
    title: s.title,
    cadence: s.cadence,
    range: s.range,
    count: s.count,
    magnitude: s.magnitude,
    expanded: !!open[s.key],
    onToggle: () => setOpen({
      ...open,
      [s.key]: !open[s.key]
    }),
    moreLabel: open[s.key] ? s.more : null,
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      size: "sm"
    }, "\u270E edit cadence"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "danger"
    }, "\u2715 remove all"))
  }, s.items.map(it => /*#__PURE__*/React.createElement(AssignmentRow, {
    key: it.title,
    title: it.title,
    course: "Corporate Finance",
    courseColor: "var(--course-1)",
    type: s.key === "read" ? "reading" : s.key === "quiz" ? "quiz" : s.key === "exam" ? "exam" : "homework",
    due: it.due,
    magnitude: s.magnitude
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: "var(--space-5)",
      paddingTop: "var(--space-5)",
      borderTop: "var(--border-hairline) solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "danger",
    onClick: onDiscard
  }, "Discard entire upload"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Button, null, "Back"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onApprove
  }, "Approve all 42"))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-micro)",
      color: "var(--text-faint)"
    }
  }, "Nothing is saved until you approve. Everything lands in one write.")));
}
Object.assign(window, {
  Approve
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scope-app/Approve.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scope-app/Runway.jsx
try { (() => {
const {
  Button,
  Card,
  StatTile,
  HeatMap,
  Swimlane,
  InsightBand,
  AssignmentRow,
  LockedTab
} = window.ScopeDesignSystem_8aa58a;
function Runway({
  locked,
  onUpload
}) {
  const D = window.SCOPE_DATA;
  const [filter, setFilter] = React.useState(null);
  if (locked) {
    return /*#__PURE__*/React.createElement(LockedTab, {
      view: "Runway",
      have: "You have 1 course and 14 assignments.",
      needs: "Runway opens at 2 courses and 20 assignments, spanning at least 6 weeks.",
      action: /*#__PURE__*/React.createElement(Button, {
        variant: "primary",
        size: "lg",
        onClick: onUpload
      }, "Upload another syllabus")
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--size-display)"
    }
  }, "Runway"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-3)",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-small)",
      color: "var(--text-muted)"
    }
  }, "The shape of Fall 2026 \xB7 Aug 25 \u2013 Dec 12")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    label: "Term progress",
    value: "18%",
    sub: "3 of 16 weeks"
  }), /*#__PURE__*/React.createElement(StatTile, {
    tone: "accent",
    label: "Next big rock",
    value: "Oct 15",
    sub: "Midterm \xB7 Corporate Finance"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Load-ahead pace",
    value: "2.3",
    unit: "days ahead",
    sub: "Against an even spread"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Open window",
    value: "Sep 8",
    unit: "\u2013 Sep 14",
    sub: "Lightest stretch before the midterm"
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Term heat map",
    meta: "Hover a day for its items \xB7 click to filter the list below"
  }, /*#__PURE__*/React.createElement(HeatMap, {
    weeks: 15,
    cells: D.HEAT,
    today: {
      week: 0,
      day: 2
    },
    onCellClick: c => setFilter(c)
  })), filter && /*#__PURE__*/React.createElement(Card, {
    tone: "flat",
    title: `${filter.label || "That day"} · ${filter.load || 0} load`,
    actions: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "quiet",
      onClick: () => setFilter(null)
    }, "\u2715 clear")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, D.NEXT_48.slice(0, Math.max(1, filter.items || 1)).map(i => /*#__PURE__*/React.createElement(AssignmentRow, {
    key: i.id,
    title: i.title,
    course: i.course,
    courseColor: i.color,
    type: i.type,
    due: filter.label,
    magnitude: i.magnitude
  })))), /*#__PURE__*/React.createElement(Card, {
    title: "Per-course timeline",
    meta: "Dot size = magnitude \xB7 shaded column = collision"
  }, /*#__PURE__*/React.createElement(Swimlane, {
    weeks: 15,
    collisions: [{
      week: 6
    }],
    courses: D.LANES
  })), /*#__PURE__*/React.createElement(InsightBand, {
    label: "Watch"
  }, /*#__PURE__*/React.createElement("b", null, "Collision ahead"), " \u2014 Oct 14\u201316 has 3 major items across all three courses."), /*#__PURE__*/React.createElement(Card, {
    title: "Big rocks",
    meta: "Magnitude 2\u20133, next eight weeks",
    actions: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "quiet"
    }, "View all")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(AssignmentRow, {
    title: "Paper 1",
    course: "Constitutional Law",
    courseColor: "var(--course-3)",
    type: "paper",
    due: "Oct 14",
    magnitude: 3
  }), /*#__PURE__*/React.createElement(AssignmentRow, {
    title: "Midterm",
    course: "Corporate Finance",
    courseColor: "var(--course-1)",
    type: "exam",
    due: "Oct 15",
    magnitude: 3
  }), /*#__PURE__*/React.createElement(AssignmentRow, {
    title: "Project draft",
    course: "Statistics",
    courseColor: "var(--course-2)",
    type: "project",
    due: "Oct 16",
    magnitude: 3
  }))));
}
Object.assign(window, {
  Runway
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scope-app/Runway.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scope-app/Setup.jsx
try { (() => {
const {
  Button,
  Input,
  Select,
  StepBar,
  DropZone
} = window.ScopeDesignSystem_8aa58a;
function SetupFrame({
  step,
  title,
  blurb,
  children,
  onBack,
  onNext,
  nextLabel,
  wide
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      overflow: "auto",
      background: "var(--canvas)",
      padding: "var(--space-11) var(--gutter-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: wide ? 680 : "var(--measure-form)",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement(StepBar, {
    step: step,
    total: 3,
    labels: ["Term", "Course", "Syllabus"]
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--size-title)"
    }
  }, title), blurb && /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: "var(--space-4)",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-small)",
      color: "var(--text-muted)"
    }
  }, blurb)), children, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: onBack ? "space-between" : "flex-end",
      paddingTop: "var(--space-3)"
    }
  }, onBack && /*#__PURE__*/React.createElement(Button, {
    onClick: onBack,
    icon: "\u2190"
  }, "Back"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onNext,
    iconAfter: "\u2192"
  }, nextLabel || "Continue"))));
}
function SetupTerm({
  onNext
}) {
  const [name, setName] = React.useState("");
  return /*#__PURE__*/React.createElement(SetupFrame, {
    step: 1,
    title: "What term are you starting?",
    blurb: "Term dates are how Scope figures out \u201Cthis week\u201D and \u201Cnext week.\u201D You can edit them later.",
    onNext: onNext
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Term name",
    placeholder: "Fall 2026",
    value: name,
    onChange: setName
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Start date",
    mono: true,
    placeholder: "Aug 25, 2026"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "End date",
    mono: true,
    placeholder: "Dec 12, 2026"
  })), /*#__PURE__*/React.createElement(Select, {
    label: "Timezone",
    width: "100%",
    value: "ny",
    options: [{
      value: "ny",
      label: "America/New_York"
    }, {
      value: "chi",
      label: "America/Chicago"
    }, {
      value: "la",
      label: "America/Los_Angeles"
    }]
  })));
}
function SetupUpload({
  onBack,
  onNext
}) {
  const [file, setFile] = React.useState(null);
  return /*#__PURE__*/React.createElement(SetupFrame, {
    step: 3,
    title: "Upload your first syllabus",
    onBack: onBack,
    onNext: onNext,
    nextLabel: "Extract",
    wide: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "Course",
    value: "Corporate Finance"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Course code (optional)",
    mono: true,
    placeholder: "FINC 3010"
  })), /*#__PURE__*/React.createElement(DropZone, {
    filename: file,
    onPick: () => setFile("corporate-finance-fall-2026.pdf")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-micro)",
      color: "var(--text-faint)",
      lineHeight: 1.6
    }
  }, "Scope reads the PDF, extracts assignments, and asks you a few questions before anything is saved. You\u2019ll approve everything on the next screen."));
}
function Verify({
  onNext
}) {
  const [answers, setAnswers] = React.useState({
    q1: "Schedule only",
    q3: "Wed Oct 15"
  });
  const qs = window.SCOPE_DATA.QUESTIONS;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      overflow: "auto",
      background: "var(--canvas)",
      padding: "var(--space-11) var(--gutter-page)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 680,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--size-title)"
    }
  }, "A few things Scope couldn\u2019t resolve"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-3)",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-small)",
      color: "var(--text-muted)"
    }
  }, "3 questions \xB7 takes 30 seconds")), qs.map(q => /*#__PURE__*/React.createElement("div", {
    key: q.id,
    style: {
      padding: "var(--space-5)",
      background: "var(--surface-card)",
      border: "var(--border-hairline) solid var(--border-card)",
      borderRadius: "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--size-subtitle)",
      color: "var(--text-primary)"
    }
  }, q.prompt), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-5)",
      display: "flex",
      gap: "var(--space-4)",
      flexWrap: "wrap"
    }
  }, q.input ? /*#__PURE__*/React.createElement(Input, {
    mono: true,
    placeholder: q.placeholder,
    width: "220px"
  }) : q.options.map(o => /*#__PURE__*/React.createElement(Button, {
    key: o,
    variant: answers[q.id] === o ? "primary" : "secondary",
    onClick: () => setAnswers({
      ...answers,
      [q.id]: o
    })
  }, o))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: onNext,
    iconAfter: "\u2192"
  }, "Review extracted items"))));
}
Object.assign(window, {
  SetupTerm,
  SetupUpload,
  Verify
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scope-app/Setup.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scope-app/SignIn.jsx
try { (() => {
const {
  Button
} = window.ScopeDesignSystem_8aa58a;
function SignIn({
  onSignIn
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      display: "grid",
      placeItems: "center",
      background: "var(--canvas)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 360,
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-8)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: "var(--size-display)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "-.02em",
      color: "var(--text-primary)"
    }
  }, "Scope"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-2)",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-micro)",
      color: "var(--text-muted)"
    }
  }, "Forecast your semester.")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onSignIn,
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-5)",
      width: "100%",
      padding: "12px 16px",
      background: "#fff",
      color: "#1a1a1a",
      border: "1px solid #dadce0",
      borderRadius: "var(--radius-sm)",
      fontFamily: "var(--font-meta)",
      fontSize: 14,
      fontWeight: 500,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/google-g.svg",
    width: "18",
    height: "18",
    alt: ""
  }), "Continue with Google"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-micro)",
      color: "var(--text-muted)",
      lineHeight: 1.6
    }
  }, "Access is by invite while we\u2019re small.", /*#__PURE__*/React.createElement("br", null), "A non-allowlisted Google account gets a friendly \u201Cnot yet.\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      fontFamily: "var(--font-meta)",
      fontSize: 10,
      color: "var(--text-faint)"
    }
  }, "By continuing you agree to Scope\u2019s terms & privacy.")));
}
Object.assign(window, {
  SignIn
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scope-app/SignIn.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scope-app/Today.jsx
try { (() => {
const {
  Button,
  HeroBanner,
  InsightBand,
  AssignmentRow
} = window.ScopeDesignSystem_8aa58a;
function Today() {
  const [items, setItems] = React.useState(window.SCOPE_DATA.NEXT_48);
  const [snoozed, setSnoozed] = React.useState(false);
  const set = (id, key) => setItems(items.map(i => i.id === id ? {
    ...i,
    [key]: !i[key]
  } : i));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-micro)",
      color: "var(--text-muted)"
    }
  }, "Wednesday, Aug 26 \xB7 10:25 PM"), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginTop: "var(--space-3)",
      fontSize: "var(--size-display)"
    }
  }, "Today")), !snoozed && /*#__PURE__*/React.createElement(HeroBanner, {
    title: "Problem Set 2",
    detail: "Corporate Finance \xB7 due tomorrow 11:59 PM \xB7 sits on your biggest day.",
    actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setSnoozed(true)
    }, "Snooze"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      iconAfter: "\u2192"
    }, "Open"))
  }), /*#__PURE__*/React.createElement(InsightBand, {
    label: "Heavy day tomorrow"
  }, /*#__PURE__*/React.createElement("b", null, "Thursday"), " is your biggest day this week \u2014 3 items, magnitude 6."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "scope-label",
    style: {
      marginBottom: "var(--space-4)"
    }
  }, "Due in the next 48 hours (", items.length, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, items.map(i => /*#__PURE__*/React.createElement(AssignmentRow, {
    key: i.id,
    title: i.title,
    course: i.course,
    courseColor: i.color,
    type: i.type,
    due: i.due,
    complete: i.complete,
    watched: i.watched,
    onToggleComplete: () => set(i.id, "complete"),
    onToggleWatch: () => set(i.id, "watched")
  })))));
}
Object.assign(window, {
  Today
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scope-app/Today.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scope-app/Workload.jsx
try { (() => {
const {
  Button,
  Card,
  Select,
  SegmentedToggle,
  StatTile,
  LoadChart,
  InsightBand,
  CourseDot
} = window.ScopeDesignSystem_8aa58a;
function Workload() {
  const D = window.SCOPE_DATA;
  const [mode, setMode] = React.useState("load");
  const [course, setCourse] = React.useState("all");
  const single = course !== "all";
  const scale = single ? 0.38 : 1;
  const bars = D.WEEK_BARS.map(b => ({
    ...b,
    value: Math.round(b.value * scale)
  }));
  const label = single ? D.COURSES.find(c => c.id === course).name : "all courses";
  const unitLabel = mode === "load" ? "load" : "items";
  const f = n => mode === "load" ? n : Math.round(n * 0.72);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      gap: "var(--space-6)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--size-display)"
    }
  }, "Workload"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-3)",
      fontFamily: "var(--font-meta)",
      fontSize: "var(--size-small)",
      color: "var(--text-muted)"
    }
  }, "Viewing ", label, " \xB7 15 weeks \xB7 Aug 25 \u2013 Dec 12")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Select, {
    dots: true,
    width: "200px",
    value: course,
    onChange: setCourse,
    options: [{
      value: "all",
      label: "All courses"
    }, ...D.COURSES.map(c => ({
      value: c.id,
      label: c.name,
      color: c.color
    }))]
  }), /*#__PURE__*/React.createElement(SegmentedToggle, {
    value: mode,
    onChange: setMode,
    options: [{
      value: "load",
      label: "Load"
    }, {
      value: "items",
      label: "Items"
    }]
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    tone: "accent",
    label: "Peak week",
    value: f(Math.round(41 * scale)),
    unit: unitLabel,
    sub: "Week 8 \xB7 Oct 13\u201319"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Clearest window",
    value: f(Math.round(12 * scale)),
    unit: unitLabel,
    sub: "Week 1 \xB7 Aug 25\u201331"
  }), single ? /*#__PURE__*/React.createElement(StatTile, {
    label: "Share of term load",
    value: "38%",
    sub: label
  }) : /*#__PURE__*/React.createElement(StatTile, {
    label: "Most demanding course",
    value: "38%",
    sub: "Corporate Finance \xB7 144 load"
  }), /*#__PURE__*/React.createElement(StatTile, {
    label: "Term total",
    value: f(Math.round(378 * scale)),
    unit: unitLabel,
    sub: "15 weeks \xB7 3 courses"
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Weekly load",
    meta: `Fixed term weeks · dashed line is the term average`,
    actions: /*#__PURE__*/React.createElement(Button, {
      size: "sm"
    }, "Download CSV")
  }, /*#__PURE__*/React.createElement(LoadChart, {
    bars: bars,
    average: f(Math.round(24 * scale)),
    unit: unitLabel
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.3fr 1fr",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "This week by day",
    meta: "Week 1 \xB7 Aug 25\u201331"
  }, /*#__PURE__*/React.createElement(LoadChart, {
    bars: D.DAY_BARS.map(b => ({
      ...b,
      value: f(b.value)
    })),
    height: 130,
    unit: unitLabel
  })), /*#__PURE__*/React.createElement(Card, {
    title: "Load by course",
    meta: single ? "Filtered to one course" : "Share of the term"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, [["Corporate Finance", "var(--course-1)", 144, 38], ["Statistics", "var(--course-2)", 126, 33], ["Constitutional Law", "var(--course-3)", 108, 29]].map(([n, c, v, pct]) => /*#__PURE__*/React.createElement("div", {
    key: n
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(CourseDot, {
    color: c,
    label: n
  }), /*#__PURE__*/React.createElement("span", {
    className: "scope-data",
    style: {
      fontSize: "var(--size-small)",
      color: "var(--text-muted)"
    }
  }, f(v), " \xB7 ", pct, "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      background: "var(--ink-800)",
      borderRadius: "var(--radius-xs)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct * 2.6 + "%",
      height: "100%",
      background: c,
      borderRadius: "var(--radius-xs)"
    }
  }))))))), /*#__PURE__*/React.createElement(InsightBand, {
    tone: "accent",
    label: "Rhythm"
  }, /*#__PURE__*/React.createElement("b", null, "Wednesdays"), " are your heaviest day. You handle 1.8\xD7 more items on Wednesdays than Mondays."));
}
Object.assign(window, {
  Workload
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scope-app/Workload.jsx", error: String((e && e.message) || e) }); }

// ui_kits/scope-app/data.js
try { (() => {
// Fake Fall 2026 semester — mirrors the wireframe's three courses.
const COURSES = [{
  id: "fin",
  name: "Corporate Finance",
  code: "FINC 3010",
  color: "var(--course-1)",
  count: 42
}, {
  id: "stat",
  name: "Statistics",
  code: "STAT 1201",
  color: "var(--course-2)",
  count: 31
}, {
  id: "law",
  name: "Constitutional Law",
  code: "POLS 3320",
  color: "var(--course-3)",
  count: 24
}];
const NEXT_48 = [{
  id: 1,
  title: "Problem Set 2",
  course: "Corporate Finance",
  color: "var(--course-1)",
  type: "homework",
  due: "due tomorrow 11:59 PM",
  magnitude: 1,
  watched: true
}, {
  id: 2,
  title: "Chapter 4 reading",
  course: "Statistics",
  color: "var(--course-2)",
  type: "reading",
  due: "due tomorrow",
  magnitude: 1
}, {
  id: 3,
  title: "Quiz 1",
  course: "Corporate Finance",
  color: "var(--course-1)",
  type: "quiz",
  due: "due Thursday",
  magnitude: 2
}, {
  id: 4,
  title: "Case brief: Marbury v. Madison",
  course: "Constitutional Law",
  color: "var(--course-3)",
  type: "homework",
  due: "due Friday",
  magnitude: 1
}];
const WEEK_BARS = [12, 18, 14, 22, 26, 20, 31, 41, 28, 24, 33, 22, 19, 27, 15].map((v, i) => ({
  label: "W" + (i + 1),
  value: v,
  peak: v === 41
}));
const DAY_BARS = [{
  label: "Mon",
  value: 3
}, {
  label: "Tue",
  value: 5
}, {
  label: "Wed",
  value: 9,
  peak: true
}, {
  label: "Thu",
  value: 6
}, {
  label: "Fri",
  value: 4
}, {
  label: "Sat",
  value: 0
}, {
  label: "Sun",
  value: 2
}];
const HEAT = (() => {
  const out = [];
  for (let w = 0; w < 15; w++) for (let d = 0; d < 7; d++) {
    const base = w === 7 ? 6 : Math.round(Math.abs(Math.sin(w * 1.7 + d)) * 4);
    const load = d > 4 ? Math.max(0, base - 3) : base;
    if (load) out.push({
      week: w,
      day: d,
      load,
      items: Math.max(1, Math.round(load / 2)),
      label: "W" + (w + 1) + " " + ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][d]
    });
  }
  return out;
})();
const LANES = [{
  name: "Corporate Finance",
  color: "var(--course-1)",
  items: [{
    week: 1,
    label: "PS 1",
    magnitude: 1,
    date: "Sep 5"
  }, {
    week: 3,
    label: "Quiz 1",
    magnitude: 2,
    date: "Sep 17"
  }, {
    week: 6,
    label: "Midterm",
    magnitude: 3,
    date: "Oct 15"
  }, {
    week: 10,
    label: "Quiz 3",
    magnitude: 2,
    date: "Nov 6"
  }, {
    week: 13,
    label: "Final",
    magnitude: 3,
    date: "Dec 10"
  }]
}, {
  name: "Statistics",
  color: "var(--course-2)",
  items: [{
    week: 2,
    label: "Lab 1",
    magnitude: 1,
    date: "Sep 11"
  }, {
    week: 6,
    label: "Project draft",
    magnitude: 3,
    date: "Oct 16"
  }, {
    week: 9,
    label: "Quiz 4",
    magnitude: 2,
    date: "Nov 2"
  }, {
    week: 14,
    label: "Final",
    magnitude: 3,
    date: "Dec 12"
  }]
}, {
  name: "Constitutional Law",
  color: "var(--course-3)",
  items: [{
    week: 4,
    label: "Case brief",
    magnitude: 1,
    date: "Sep 24"
  }, {
    week: 6,
    label: "Paper 1",
    magnitude: 3,
    date: "Oct 14"
  }, {
    week: 11,
    label: "Paper 2",
    magnitude: 3,
    date: "Nov 18"
  }]
}];
const SERIES = [{
  key: "ps",
  title: "Problem Set 1–12",
  cadence: "weekly, Fridays",
  range: "Sep 5 – Nov 21",
  count: 12,
  magnitude: 1,
  items: [{
    title: "PS 1",
    due: "Sep 5"
  }, {
    title: "PS 2",
    due: "Sep 12"
  }, {
    title: "PS 3",
    due: "Sep 19"
  }],
  more: "+ 9 more · click any row to edit inline"
}, {
  key: "read",
  title: "Readings",
  cadence: "one per session",
  range: "Sep 2 – Dec 4",
  count: 8,
  magnitude: 1,
  items: [{
    title: "Ch. 1–2",
    due: "Sep 2"
  }, {
    title: "Ch. 3",
    due: "Sep 9"
  }],
  more: "+ 6 more"
}, {
  key: "quiz",
  title: "Quizzes 1–4",
  cadence: "every 3 weeks",
  range: "Sep 17 – Nov 19",
  count: 4,
  magnitude: 2,
  items: [{
    title: "Quiz 1",
    due: "Sep 17"
  }, {
    title: "Quiz 2",
    due: "Oct 8"
  }],
  more: "+ 2 more"
}, {
  key: "exam",
  title: "Midterm · Final",
  cadence: "fixed dates",
  range: "Oct 15 · Dec 10",
  count: 2,
  magnitude: 3,
  items: [{
    title: "Midterm",
    due: "Oct 15"
  }, {
    title: "Final",
    due: "Dec 10"
  }]
}];
const QUESTIONS = [{
  id: "q1",
  prompt: "Are weekly readings tracked items, or just schedule context?",
  options: ["Track them", "Schedule only"],
  answer: "Schedule only"
}, {
  id: "q2",
  prompt: "“Problem Set every Friday” — start date?",
  input: true,
  placeholder: "Sep 5, 2026"
}, {
  id: "q3",
  prompt: "The syllabus says “Midterm — Week 8.” That’s Oct 13–17. Which day?",
  options: ["Mon Oct 13", "Wed Oct 15", "Fri Oct 17"],
  answer: "Wed Oct 15"
}];
Object.assign(window, {
  SCOPE_DATA: {
    COURSES,
    NEXT_48,
    WEEK_BARS,
    DAY_BARS,
    HEAT,
    LANES,
    SERIES,
    QUESTIONS
  }
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/scope-app/data.js", error: String((e && e.message) || e) }); }

__ds_ns.AssignmentRow = __ds_scope.AssignmentRow;

__ds_ns.CourseDot = __ds_scope.CourseDot;

__ds_ns.DropZone = __ds_scope.DropZone;

__ds_ns.HeroBanner = __ds_scope.HeroBanner;

__ds_ns.InsightBand = __ds_scope.InsightBand;

__ds_ns.LockedTab = __ds_scope.LockedTab;

__ds_ns.SeriesGroup = __ds_scope.SeriesGroup;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.StepBar = __ds_scope.StepBar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SegmentedToggle = __ds_scope.SegmentedToggle;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.HeatMap = __ds_scope.HeatMap;

__ds_ns.LoadChart = __ds_scope.LoadChart;

__ds_ns.Swimlane = __ds_scope.Swimlane;

})();
