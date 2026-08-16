import React from "react";

export function StepBar({ step = 1, total = 3, labels = [] }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-5)", fontFamily: "var(--font-meta)", fontSize: "var(--size-micro)", color: "var(--text-muted)" }}>
      <span style={{ padding: "2px 8px", background: "var(--gold-500)", color: "var(--accent-ink)", borderRadius: "var(--radius-pill)", fontWeight: "var(--weight-semibold)" }}>Step {step} of {total}</span>
      <span style={{ display: "flex", gap: "var(--space-3)" }}>
        {labels.map((l, i) => (
          <span key={l} style={{ color: i < step - 1 ? "var(--ok)" : i === step - 1 ? "var(--text-primary)" : "var(--text-faint)" }}>
            {i > 0 && <span style={{ color: "var(--text-faint)", marginRight: "var(--space-3)" }}>·</span>}
            {l}{i < step - 1 ? " ✓" : ""}
          </span>
        ))}
      </span>
    </div>
  );
}
