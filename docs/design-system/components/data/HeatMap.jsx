import React from "react";

const RAMP = ["var(--heat-0)", "var(--heat-1)", "var(--heat-2)", "var(--heat-3)", "var(--heat-4)"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function level(load, max) {
  if (!load) return 0;
  const r = load / (max || 1);
  if (r <= 0.25) return 1;
  if (r <= 0.5) return 2;
  if (r <= 0.75) return 3;
  return 4;
}

export function HeatMap({ weeks = 15, cells = [], max, today, cellSize = 22, onCellClick, weekLabels }) {
  const [hover, setHover] = React.useState(null);
  const peak = max || cells.reduce((m, c) => Math.max(m, c.load || 0), 0);
  const byKey = {};
  cells.forEach((c) => { byKey[`${c.week}-${c.day}`] = c; });
  return (
    <div>
      <div style={{ display: "flex", gap: "var(--space-4)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 3, paddingTop: 16 }}>
          {DAYS.map((d) => (
            <div key={d} style={{ height: cellSize, lineHeight: `${cellSize}px`, fontFamily: "var(--font-meta)", fontSize: "var(--size-label)", color: "var(--text-faint)" }}>{d}</div>
          ))}
        </div>
        <div style={{ overflowX: "auto" }}>
          <div style={{ display: "flex", gap: 3, marginBottom: 3, height: 13 }}>
            {Array.from({ length: weeks }).map((_, w) => (
              <div key={w} style={{ width: cellSize, fontFamily: "var(--font-meta)", fontSize: "var(--size-label)", color: "var(--text-faint)", textAlign: "center" }}>
                {weekLabels ? weekLabels[w] : (w % 2 === 0 ? `W${w + 1}` : "")}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {DAYS.map((d, di) => (
              <div key={d} style={{ display: "flex", gap: 3 }}>
                {Array.from({ length: weeks }).map((_, w) => {
                  const cell = byKey[`${w}-${di}`];
                  const lv = level(cell && cell.load, peak);
                  const isToday = today && today.week === w && today.day === di;
                  const isHover = hover && hover.week === w && hover.day === di;
                  return (
                    <div key={w}
                      onMouseEnter={() => setHover({ week: w, day: di, ...cell })}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => onCellClick && onCellClick({ week: w, day: di, ...cell })}
                      style={{
                        width: cellSize, height: cellSize, background: RAMP[lv],
                        border: `1px solid ${isToday ? "var(--gold-400)" : isHover ? "var(--gray-400)" : "#333"}`,
                        cursor: onCellClick ? "pointer" : "default"
                      }} />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "var(--space-5)", gap: "var(--space-6)" }}>
        <div style={{ minHeight: 18, fontFamily: "var(--font-meta)", fontSize: "var(--size-micro)", color: "var(--text-body)" }}>
          {hover ? `${hover.label || `W${hover.week + 1} ${DAYS[hover.day]}`} · ${hover.load || 0} load${hover.items ? ` · ${hover.items} items` : ""}` : "Hover a day for its items"}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", fontFamily: "var(--font-meta)", fontSize: "var(--size-label)", color: "var(--text-faint)" }}>
          <span>lighter</span>
          {RAMP.map((c) => <span key={c} style={{ width: 12, height: 12, background: c, border: "1px solid #333" }} />)}
          <span>heavier</span>
        </div>
      </div>
    </div>
  );
}
