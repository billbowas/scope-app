import React from "react";

export function SeriesGroup({ title, cadence, range, count, magnitude, expanded, onToggle, actions, children, moreLabel }) {
  return (
    <div style={{ padding: "var(--space-5)", background: "var(--surface-card)", border: "var(--border-hairline) solid var(--border-card)", borderRadius: "var(--radius-md)" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--space-6)", flexWrap: "wrap" }}>
        <div style={{ minWidth: 0 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-heading)", fontWeight: "var(--weight-semibold)", color: "var(--text-primary)" }}>{title}</span>
          <div style={{ marginTop: "var(--space-2)", display: "flex", gap: "var(--space-4)", flexWrap: "wrap", fontFamily: "var(--font-meta)", fontSize: "var(--size-micro)", color: "var(--text-muted)" }}>
            {cadence && <span>{cadence}</span>}
            {range && <><span>·</span><span className="scope-data">{range}</span></>}
            {count != null && <><span>·</span><span>{count} items</span></>}
            {magnitude != null && <><span>·</span><span>magnitude {magnitude}</span></>}
          </div>
        </div>
        <div style={{ display: "flex", gap: "var(--space-4)", flex: "0 0 auto" }}>
          <button type="button" onClick={onToggle}
            style={{ padding: "3px 10px", background: expanded ? "transparent" : "var(--gold-500)", color: expanded ? "var(--accent)" : "var(--accent-ink)", border: `var(--border-hairline) solid ${expanded ? "var(--gold-a45)" : "var(--gold-500)"}`, borderRadius: "var(--radius-xs)", fontFamily: "var(--font-meta)", fontSize: "var(--size-micro)", fontWeight: "var(--weight-medium)", cursor: "pointer" }}>
            {expanded ? "▾ collapse" : "▸ expand"}
          </button>
          {actions}
        </div>
      </div>
      {expanded && (
        <div style={{ marginTop: "var(--space-5)", paddingTop: "var(--space-4)", borderTop: "var(--border-hairline) solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
          {children}
          {moreLabel && <div style={{ textAlign: "center", padding: "var(--space-3)", fontFamily: "var(--font-meta)", fontSize: "var(--size-micro)", fontStyle: "italic", color: "var(--text-faint)" }}>{moreLabel}</div>}
        </div>
      )}
    </div>
  );
}
