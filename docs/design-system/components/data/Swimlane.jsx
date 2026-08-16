import React from "react";

const SIZE = { 1: 8, 2: 12, 3: 18 };

export function Swimlane({ courses = [], weeks = 15, collisions = [], onItemClick }) {
  const [hover, setHover] = React.useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
      {courses.map((c) => (
        <div key={c.name} style={{ display: "flex", alignItems: "center", gap: "var(--space-5)" }}>
          <div style={{ width: 150, flex: "0 0 auto", display: "flex", alignItems: "center", gap: "var(--space-4)", fontFamily: "var(--font-meta)", fontSize: "var(--size-small)", color: "var(--text-body)", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
            <span style={{ width: 8, height: 8, background: c.color, flex: "0 0 auto" }} />{c.name}
          </div>
          <div style={{ position: "relative", flex: 1, height: 34, background: "var(--ink-800)", border: "var(--border-hairline) solid var(--border-subtle)", borderRadius: "var(--radius-xs)" }}>
            {collisions.map((col) => (
              <div key={`${c.name}-${col.week}`} style={{ position: "absolute", top: 0, bottom: 0, left: `${(col.week / weeks) * 100}%`, width: `${(1 / weeks) * 100}%`, background: "var(--gold-a08)", borderLeft: "1px solid var(--gold-a45)", borderRight: "1px solid var(--gold-a45)" }} />
            ))}
            {(c.items || []).map((it, i) => {
              const d = SIZE[it.magnitude || 1];
              const key = `${c.name}-${i}`;
              return (
                <div key={key}
                  onMouseEnter={() => setHover({ key, text: `${it.label} · ${c.name} · ${it.date || ""}` })}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => onItemClick && onItemClick(it)}
                  title={it.label}
                  style={{
                    position: "absolute", top: "50%", left: `${(it.week / weeks) * 100 + (0.5 / weeks) * 100}%`,
                    width: d, height: d, marginTop: -d / 2, marginLeft: -d / 2,
                    background: c.color, borderRadius: "var(--radius-pill)",
                    border: hover && hover.key === key ? "2px solid var(--gold-300)" : "2px solid var(--ink-800)",
                    cursor: onItemClick ? "pointer" : "default"
                  }} />
              );
            })}
          </div>
        </div>
      ))}
      <div className="scope-meta" style={{ fontSize: "var(--size-micro)", minHeight: 16 }}>
        {hover ? hover.text : "Dot size = magnitude · shaded columns = collisions across courses"}
      </div>
    </div>
  );
}
