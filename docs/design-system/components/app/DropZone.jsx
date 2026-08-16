import React from "react";

export function DropZone({ title = "Drop your syllabus PDF here", hint = "or click to browse · max 10 MB · max 60 pages", filename, error, onPick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onPick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        padding: "var(--space-11) var(--space-6)", textAlign: "center", cursor: "pointer",
        background: hover ? "var(--gold-a08)" : "transparent",
        border: `var(--border-emphasis) dashed ${error ? "var(--danger)" : hover ? "var(--gold-500)" : "var(--line-dashed)"}`,
        borderRadius: "var(--radius-sm)", transition: "var(--transition-surface)"
      }}
    >
      <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-title)", color: filename ? "var(--gold-300)" : "var(--text-primary)" }}>
        {filename || title}
      </div>
      <div className="scope-meta" style={{ marginTop: "var(--space-3)", fontSize: "var(--size-micro)", color: error ? "var(--danger)" : "var(--text-muted)" }}>
        {error || (filename ? "Ready to extract" : hint)}
      </div>
    </div>
  );
}
