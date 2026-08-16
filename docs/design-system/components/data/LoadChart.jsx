import React from "react";

export function LoadChart({ bars = [], average, height = 180, unit = "load", onSelect, selected }) {
  const [hover, setHover] = React.useState(null);
  const max = bars.reduce((m, b) => Math.max(m, b.value || 0), 0) || 1;
  return (
    <div>
      <div style={{ position: "relative", height, display: "flex", alignItems: "flex-end", gap: "var(--space-3)" }}>
        {average != null && (
          <div style={{ position: "absolute", left: 0, right: 0, bottom: `${(average / max) * 100}%`, borderTop: "1px dashed var(--line-dashed)", pointerEvents: "none" }}>
            <span style={{ position: "absolute", right: 0, top: -16, fontFamily: "var(--font-meta)", fontSize: "var(--size-label)", color: "var(--text-faint)" }}>term average {average}</span>
          </div>
        )}
        {bars.map((b, i) => {
          const active = selected === b.label;
          const isHover = hover === i;
          return (
            <div key={b.label} style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}
              onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
              onClick={() => onSelect && onSelect(b.label)}>
              <div style={{ fontFamily: "var(--font-data)", fontSize: "var(--size-label)", textAlign: "center", color: isHover || active ? "var(--gold-300)" : "transparent", marginBottom: 2 }}>{b.value}</div>
              <div style={{
                height: `${Math.max((b.value / max) * 100, 1)}%`,
                background: b.peak ? "var(--gold-500)" : isHover || active ? "var(--heat-3)" : "var(--heat-2)",
                borderTop: `2px solid ${b.peak ? "var(--gold-400)" : "transparent"}`,
                cursor: onSelect ? "pointer" : "default", transition: "var(--transition-surface)"
              }} />
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: "var(--space-3)", marginTop: "var(--space-3)" }}>
        {bars.map((b) => (
          <div key={b.label} style={{ flex: 1, minWidth: 0, textAlign: "center", fontFamily: "var(--font-meta)", fontSize: "var(--size-label)", color: b.peak ? "var(--accent)" : "var(--text-faint)" }}>{b.label}</div>
        ))}
      </div>
      <div className="scope-meta" style={{ marginTop: "var(--space-4)", fontSize: "var(--size-micro)" }}>
        {hover != null ? `${bars[hover].label} · ${bars[hover].value} ${unit}` : `Fixed term weeks · ${unit}`}
      </div>
    </div>
  );
}
