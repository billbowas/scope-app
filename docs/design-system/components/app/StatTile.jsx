import React from "react";

export function StatTile({ label, value, unit, sub, tone = "default", size = "metric" }) {
  const fg = tone === "accent" ? "var(--gold-300)" : "var(--text-primary)";
  const isText = size === "text";
  return (
    <div style={{ padding: "var(--space-6)", background: tone === "accent" ? "var(--gold-a08)" : "var(--surface-card)", border: `var(--border-hairline) solid ${tone === "accent" ? "var(--gold-a45)" : "var(--border-card)"}`, borderRadius: "var(--radius-md)" }}>
      <div className="scope-label">{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-3)", marginTop: "var(--space-4)", flexWrap: isText ? "wrap" : "nowrap" }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: isText ? "var(--size-title)" : "var(--size-metric)", fontWeight: "var(--weight-regular)", lineHeight: "var(--leading-tight)", letterSpacing: "var(--tracking-tight)", color: fg, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>{value}</span>
        {unit && <span style={{ fontFamily: "var(--font-meta)", fontSize: "var(--size-small)", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{unit}</span>}
      </div>
      {sub && <div className="scope-meta" style={{ marginTop: "var(--space-3)", fontSize: "var(--size-micro)" }}>{sub}</div>}
    </div>
  );
}
