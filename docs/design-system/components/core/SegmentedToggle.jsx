import React from "react";

export function SegmentedToggle({ options = [], value, onChange, size = "md" }) {
  const pad = size === "sm" ? "3px 10px" : "6px 14px";
  return (
    <div role="group" style={{ display: "inline-flex", padding: 2, background: "var(--surface-input)", border: "var(--border-hairline) solid var(--line-strong)", borderRadius: "var(--radius-xs)" }}>
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange && onChange(o.value)}
            style={{
              padding: pad, fontFamily: "var(--font-meta)", fontSize: "var(--size-micro)",
              fontWeight: "var(--weight-medium)",
              background: active ? "var(--gold-500)" : "transparent",
              color: active ? "var(--accent-ink)" : "var(--text-muted)",
              border: "none", borderRadius: "var(--radius-xs)", cursor: "pointer",
              transition: "var(--transition-control)"
            }}
          >{o.label}</button>
        );
      })}
    </div>
  );
}
