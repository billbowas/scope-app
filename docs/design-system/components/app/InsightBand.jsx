import React from "react";

const TONES = {
  warn: { fg: "var(--warn)", bg: "var(--warn-bg)", bd: "var(--warn)" },
  accent: { fg: "var(--accent)", bg: "var(--gold-a08)", bd: "var(--gold-a45)" },
  danger: { fg: "var(--danger)", bg: "var(--danger-bg)", bd: "var(--danger)" },
  neutral: { fg: "var(--text-muted)", bg: "transparent", bd: "var(--border-subtle)" }
};

export function InsightBand({ tone = "warn", label, children, actions }) {
  const t = TONES[tone] || TONES.warn;
  return (
    <div style={{ padding: "var(--space-5)", background: t.bg, border: `var(--border-hairline) solid ${t.bd}`, borderRadius: "var(--radius-sm)" }}>
      {label && <div style={{ fontFamily: "var(--font-meta)", fontSize: "var(--size-label)", textTransform: "uppercase", letterSpacing: "var(--tracking-label)", color: t.fg }}>{label}</div>}
      <div style={{ marginTop: "var(--space-3)", fontSize: "var(--size-subtitle)", color: "var(--text-primary)", lineHeight: "var(--leading-snug)" }}>{children}</div>
      {actions && <div style={{ marginTop: "var(--space-5)", display: "flex", gap: "var(--space-4)" }}>{actions}</div>}
    </div>
  );
}
