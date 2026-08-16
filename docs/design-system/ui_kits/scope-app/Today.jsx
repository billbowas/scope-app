const { Button, HeroBanner, InsightBand, AssignmentRow } = window.ScopeDesignSystem_8aa58a;

function Today() {
  const [items, setItems] = React.useState(window.SCOPE_DATA.NEXT_48);
  const [snoozed, setSnoozed] = React.useState(false);
  const set = (id, key) => setItems(items.map((i) => (i.id === id ? { ...i, [key]: !i[key] } : i)));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-7)" }}>
      <div>
        <div style={{ fontFamily: "var(--font-meta)", fontSize: "var(--size-micro)", color: "var(--text-muted)" }}>Wednesday, Aug 26 · 10:25 PM</div>
        <h1 style={{ marginTop: "var(--space-3)", fontSize: "var(--size-display)" }}>Today</h1>
      </div>

      {!snoozed && (
        <HeroBanner title="Problem Set 2" detail="Corporate Finance · due tomorrow 11:59 PM · sits on your biggest day."
          actions={<><Button variant="ghost" onClick={() => setSnoozed(true)}>Snooze</Button><Button variant="primary" iconAfter="→">Open</Button></>} />
      )}

      <InsightBand label="Heavy day tomorrow"><b>Thursday</b> is your biggest day this week — 3 items, magnitude 6.</InsightBand>

      <div>
        <div className="scope-label" style={{ marginBottom: "var(--space-4)" }}>Due in the next 48 hours ({items.length})</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          {items.map((i) => (
            <AssignmentRow key={i.id} title={i.title} course={i.course} courseColor={i.color} type={i.type} due={i.due}
              complete={i.complete} watched={i.watched}
              onToggleComplete={() => set(i.id, "complete")} onToggleWatch={() => set(i.id, "watched")} />
          ))}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Today });
