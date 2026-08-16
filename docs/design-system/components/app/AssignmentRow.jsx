import React from "react";
import { CourseDot } from "./CourseDot.jsx";

export function AssignmentRow({ title, course, courseColor, type, due, magnitude, complete, watched, needsReview, onToggleComplete, onToggleWatch, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-6)",
        minHeight: "var(--row-height)", padding: "var(--space-4) var(--space-5)",
        background: hover ? "var(--surface-card)" : "transparent",
        border: `var(--border-hairline) solid ${needsReview ? "var(--warn)" : "var(--border-subtle)"}`,
        borderRadius: "var(--radius-sm)", cursor: onClick ? "pointer" : "default",
        transition: "var(--transition-surface)"
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: "var(--size-subtitle)", color: complete ? "var(--text-muted)" : "var(--text-primary)", textDecoration: complete ? "line-through" : "none" }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-4)", marginTop: "var(--space-2)", fontFamily: "var(--font-meta)", fontSize: "var(--size-micro)", color: "var(--text-muted)" }}>
          <CourseDot color={courseColor} size={7} />
          <span>{course}</span>
          <span>·</span>
          <span>{type}</span>
          {due && <><span>·</span><b style={{ color: "var(--text-body)", fontWeight: "var(--weight-semibold)" }}>{due}</b></>}
          {magnitude != null && <><span>·</span><span className="scope-data">mag {magnitude}</span></>}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-5)", flex: "0 0 auto" }}>
        <button type="button" title="Mark complete"
          onClick={(e) => { e.stopPropagation(); onToggleComplete && onToggleComplete(); }}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "var(--size-body)", color: complete ? "var(--ok)" : "var(--text-faint)" }}>{complete ? "☑" : "☐"}</button>
        <button type="button" title="Watchlist"
          onClick={(e) => { e.stopPropagation(); onToggleWatch && onToggleWatch(); }}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: "var(--size-body)", color: watched ? "var(--accent)" : "var(--text-faint)" }}>{watched ? "★" : "☆"}</button>
      </div>
    </div>
  );
}
