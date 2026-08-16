import React from "react";

export function CourseDot({ color = "var(--course-1)", size = 10, label, muted }) {
  const dot = <span style={{ width: size, height: size, background: color, border: "1px solid rgba(0,0,0,.35)", flex: "0 0 auto", display: "inline-block" }} />;
  if (!label) return dot;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-4)", fontFamily: "var(--font-meta)", fontSize: "var(--size-small)", color: muted ? "var(--text-muted)" : "var(--text-body)" }}>
      {dot}{label}
    </span>
  );
}
