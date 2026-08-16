const { Button, Card, Select, SegmentedToggle, StatTile, LoadChart, InsightBand, CourseDot } = window.ScopeDesignSystem_8aa58a;

function Workload() {
  const D = window.SCOPE_DATA;
  const [mode, setMode] = React.useState("load");
  const [course, setCourse] = React.useState("all");
  const single = course !== "all";
  const scale = single ? 0.38 : 1;
  const bars = D.WEEK_BARS.map((b) => ({ ...b, value: Math.round(b.value * scale) }));
  const label = single ? D.COURSES.find((c) => c.id === course).name : "all courses";
  const unitLabel = mode === "load" ? "load" : "items";
  const f = (n) => (mode === "load" ? n : Math.round(n * 0.72));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-7)" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "var(--space-6)", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: "var(--size-display)" }}>Workload</h1>
          <div style={{ marginTop: "var(--space-3)", fontFamily: "var(--font-meta)", fontSize: "var(--size-small)", color: "var(--text-muted)" }}>Viewing {label} · 15 weeks · Aug 25 – Dec 12</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-5)" }}>
          <Select dots width="200px" value={course} onChange={setCourse}
            options={[{ value: "all", label: "All courses" }, ...D.COURSES.map((c) => ({ value: c.id, label: c.name, color: c.color }))]} />
          <SegmentedToggle value={mode} onChange={setMode} options={[{ value: "load", label: "Load" }, { value: "items", label: "Items" }]} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "var(--space-5)" }}>
        <StatTile tone="accent" label="Peak week" value={f(Math.round(41 * scale))} unit={unitLabel} sub="Week 8 · Oct 13–19" />
        <StatTile label="Clearest window" value={f(Math.round(12 * scale))} unit={unitLabel} sub="Week 1 · Aug 25–31" />
        {single
          ? <StatTile label="Share of term load" value="38%" sub={label} />
          : <StatTile label="Most demanding course" value="38%" sub="Corporate Finance · 144 load" />}
        <StatTile label="Term total" value={f(Math.round(378 * scale))} unit={unitLabel} sub="15 weeks · 3 courses" />
      </div>

      <Card title="Weekly load" meta={`Fixed term weeks · dashed line is the term average`} actions={<Button size="sm">Download CSV</Button>}>
        <LoadChart bars={bars} average={f(Math.round(24 * scale))} unit={unitLabel} />
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "var(--space-5)" }}>
        <Card title="This week by day" meta="Week 1 · Aug 25–31">
          <LoadChart bars={D.DAY_BARS.map((b) => ({ ...b, value: f(b.value) }))} height={130} unit={unitLabel} />
        </Card>
        <Card title="Load by course" meta={single ? "Filtered to one course" : "Share of the term"}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
            {[["Corporate Finance", "var(--course-1)", 144, 38], ["Statistics", "var(--course-2)", 126, 33], ["Constitutional Law", "var(--course-3)", 108, 29]].map(([n, c, v, pct]) => (
              <div key={n}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-3)" }}>
                  <CourseDot color={c} label={n} />
                  <span className="scope-data" style={{ fontSize: "var(--size-small)", color: "var(--text-muted)" }}>{f(v)} · {pct}%</span>
                </div>
                <div style={{ height: 8, background: "var(--ink-800)", borderRadius: "var(--radius-xs)" }}>
                  <div style={{ width: pct * 2.6 + "%", height: "100%", background: c, borderRadius: "var(--radius-xs)" }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <InsightBand tone="accent" label="Rhythm">
        <b>Wednesdays</b> are your heaviest day. You handle 1.8× more items on Wednesdays than Mondays.
      </InsightBand>
    </div>
  );
}

Object.assign(window, { Workload });
