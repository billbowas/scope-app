import React from "react";

const TONES = {
  neutral: { bg: "var(--ink-700)", fg: "var(--text-body)", bd: "var(--line-strong)" },
  accent: { bg: "var(--gold-500)", fg: "var(--accent-ink)", bd: "var(--gold-500)" },
  warn: { bg: "var(--warn-bg)", fg: "var(--warn)", bd: "var(--warn)" },
  ok: { bg: "var(--ok-bg)", fg: "var(--ok)", bd: "var(--ok)" },
  danger: { bg: "var(--danger-bg)", fg: "var(--danger)", bd: "var(--danger)" },
  outline: { bg: "transparent", fg: "var(--text-muted)", bd: "var(--line-strong)" }
};

export function Badge({ tone = "neutral", pill, children, mono }) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "var(--space-2)",
      padding: pill ? "2px 10px" : "2px 6px",
      fontFamily: mono ? "var(--font-data)" : "var(--font-meta)",
      fontSize: "var(--size-micro)", fontWeight: "var(--weight-medium)",
      background: t.bg, color: t.fg,
      border: `var(--border-hairline) solid ${t.bd}`,
      borderRadius: pill ? "var(--radius-pill)" : "var(--radius-xs)",
      whiteSpace: "nowrap"
    }}>{children}</span>
  );
}
