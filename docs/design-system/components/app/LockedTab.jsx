import React from "react";

export function LockedTab({ view = "Runway", have, needs, action }) {
  return (
    <div style={{ maxWidth: "var(--measure-form)", padding: "var(--space-9) 0" }}>
      <h2 style={{ fontSize: "var(--size-display)" }}>{view} needs a bit more of your term.</h2>
      {have && <p style={{ marginTop: "var(--space-5)", fontSize: "var(--size-subtitle)", color: "var(--text-body)" }}>{have}</p>}
      {needs && <p style={{ marginTop: "var(--space-3)", fontFamily: "var(--font-meta)", fontSize: "var(--size-small)", color: "var(--text-muted)" }}>{needs}</p>}
      {action && <div style={{ marginTop: "var(--space-7)" }}>{action}</div>}
    </div>
  );
}
