import React from "react";
import { CourseDot } from "./CourseDot.jsx";

function Row({ active, locked, children, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button type="button" onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: "var(--space-4)", width: "100%",
        padding: "5px 8px", textAlign: "left", border: "none", cursor: "pointer",
        borderRadius: "var(--radius-xs)",
        background: active ? "var(--ink-700)" : hover ? "rgba(255,255,255,.03)" : "transparent",
        color: active ? "var(--text-primary)" : locked ? "var(--text-faint)" : "var(--text-body)",
        fontFamily: "var(--font-meta)", fontSize: "var(--size-small)",
        transition: "var(--transition-control)"
      }}>{children}</button>
  );
}

export function Sidebar({ termName = "Fall 2026", pastTerms = [], courses = [], views = [], activeView, onSelectView, onAddCourse, onSelectTerm, onFooterSelect, footer = ["Trash", "Settings"] }) {
  return (
    <aside style={{
      width: "var(--rail-width)", flex: "0 0 auto", height: "100%", padding: "var(--space-6)",
      background: "var(--canvas-rail)", borderRight: "var(--border-hairline) solid var(--border-subtle)",
      display: "flex", flexDirection: "column", gap: "var(--space-7)", overflow: "hidden"
    }}>
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading)", fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-tight)", color: "var(--text-primary)" }}>Scope</div>
        <button type="button" onClick={onSelectTerm} style={{ marginTop: "var(--space-2)", padding: 0, background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-meta)", fontSize: "var(--size-micro)", color: "var(--text-muted)" }}>
          {termName} ▾{pastTerms.length ? ` · ${pastTerms.length} past` : ""}
        </button>
      </div>

      <div>
        <div className="scope-label" style={{ marginBottom: "var(--space-3)" }}>Courses ({courses.length})</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
          {courses.map((c) => (
            <div key={c.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-4)", padding: "4px 8px" }}>
              <CourseDot color={c.color} label={c.name} />
              {c.count != null && <span className="scope-data" style={{ fontSize: "var(--size-micro)", color: "var(--text-faint)" }}>{c.count}</span>}
            </div>
          ))}
          <button type="button" onClick={onAddCourse} style={{ marginTop: "var(--space-2)", padding: "4px 8px", textAlign: "left", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-meta)", fontSize: "var(--size-micro)", color: "var(--text-faint)" }}>+ Add course</button>
        </div>
      </div>

      <div style={{ paddingTop: "var(--space-6)", borderTop: "var(--border-hairline) solid var(--border-subtle)" }}>
        <div className="scope-label" style={{ marginBottom: "var(--space-3)" }}>Views</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
          {views.map((v) => (
            <Row key={v.id} active={v.id === activeView} locked={v.locked} onClick={() => onSelectView && onSelectView(v.id)}>
              <span style={{ color: v.id === activeView ? "var(--accent)" : "inherit" }}>{v.id === activeView ? "◉" : "○"}</span>
              <span style={{ flex: 1 }}>{v.label}</span>
              {v.locked && <span style={{ fontSize: "var(--size-micro)", color: "var(--text-faint)" }}>locked</span>}
            </Row>
          ))}
        </div>
      </div>

      <div style={{ marginTop: "auto", paddingTop: "var(--space-6)", borderTop: "var(--border-hairline) solid var(--border-subtle)", display: "flex", gap: "var(--space-4)", fontFamily: "var(--font-meta)", fontSize: "var(--size-micro)", color: "var(--text-faint)" }}>
        {footer.map((f) => <button key={f} type="button" onClick={() => onFooterSelect && onFooterSelect(f)} style={{ padding: 0, background: "none", border: "none", color: "inherit", font: "inherit", cursor: "pointer" }}>{f}</button>)}
      </div>
    </aside>
  );
}
