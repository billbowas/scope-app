import React from "react";

export function Select({ label, value, options = [], onChange, width, dots }) {
  const [open, setOpen] = React.useState(false);
  const current = options.find((o) => o.value === value) || options[0] || { label: "" };
  return (
    <div style={{ position: "relative", width: width || "auto" }}>
      {label && <div className="scope-label" style={{ marginBottom: "var(--space-2)" }}>{label}</div>}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: "var(--space-3)", width: "100%",
          height: "var(--control-height)", padding: "0 10px", background: "var(--surface-input)",
          color: "var(--text-body)", fontFamily: "var(--font-meta)", fontSize: "var(--size-small)",
          border: `var(--border-hairline) solid ${open ? "var(--gold-500)" : "var(--line-dashed)"}`,
          borderRadius: "var(--radius-xs)", cursor: "pointer", transition: "var(--transition-control)"
        }}
      >
        {dots && current.color && <span style={{ width: 8, height: 8, background: current.color, flex: "0 0 auto" }} />}
        <span style={{ flex: 1, textAlign: "left", overflow: "hidden", textOverflow: "ellipsis" }}>{current.label}</span>
        <span style={{ color: "var(--text-muted)", fontSize: "var(--size-micro)" }}>▾</span>
      </button>
      {open && (
        <div style={{ position: "absolute", zIndex: 20, top: "calc(100% + 4px)", left: 0, minWidth: "100%", background: "var(--surface-card)", border: "var(--border-hairline) solid var(--border-card)", borderRadius: "var(--radius-sm)", boxShadow: "var(--shadow-pop)", padding: "var(--space-2)" }}>
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => { onChange && onChange(o.value); setOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: "var(--space-3)", width: "100%", padding: "6px 8px",
                background: o.value === current.value ? "var(--ink-700)" : "transparent",
                color: o.value === current.value ? "var(--text-primary)" : "var(--text-body)",
                fontFamily: "var(--font-meta)", fontSize: "var(--size-small)", border: "none",
                borderRadius: "var(--radius-xs)", cursor: "pointer", textAlign: "left"
              }}
            >
              {dots && <span style={{ width: 8, height: 8, background: o.color || "transparent", flex: "0 0 auto" }} />}
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
