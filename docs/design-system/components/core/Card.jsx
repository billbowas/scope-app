import React from "react";

const TONES = {
  default: { bg: "var(--surface-card)", bd: "var(--border-card)", fg: "var(--text-body)" },
  flat: { bg: "transparent", bd: "var(--border-subtle)", fg: "var(--text-body)" },
  accent: { bg: "var(--gold-a08)", bd: "var(--gold-a45)", fg: "var(--text-body)" },
  warn: { bg: "var(--warn-bg)", bd: "var(--warn)", fg: "var(--text-body)" },
  danger: { bg: "var(--danger-bg)", bd: "var(--danger)", fg: "var(--text-body)" }
};

export function Card({ tone = "default", title, meta, actions, padding, children, style }) {
  const t = TONES[tone] || TONES.default;
  return (
    <section style={{
      background: t.bg, color: t.fg,
      border: `var(--border-hairline) solid ${t.bd}`, borderRadius: "var(--radius-md)",
      padding: padding || "var(--space-6)", boxShadow: tone === "default" ? "var(--shadow-card)" : "none",
      ...style
    }}>
      {(title || actions || meta) && (
        <header style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--space-5)", marginBottom: children ? "var(--space-5)" : 0 }}>
          <div>
            {title && <h3 style={{ fontSize: "var(--size-heading)" }}>{title}</h3>}
            {meta && <div className="scope-meta" style={{ marginTop: "var(--space-1)" }}>{meta}</div>}
          </div>
          {actions && <div style={{ display: "flex", gap: "var(--space-4)", flex: "0 0 auto" }}>{actions}</div>}
        </header>
      )}
      {children}
    </section>
  );
}
