const { Button, Card, Badge, SeriesGroup, AssignmentRow, InsightBand, Input } = window.ScopeDesignSystem_8aa58a;

function Approve({ onApprove, onDiscard }) {
  const series = window.SCOPE_DATA.SERIES;
  const [open, setOpen] = React.useState({ ps: true });
  const [resolved, setResolved] = React.useState(false);
  return (
    <div style={{ height: "100%", overflow: "auto", background: "var(--canvas)", padding: "var(--space-9) var(--gutter-page)" }}>
      <div style={{ maxWidth: "var(--measure-review)", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "var(--space-6)", flexWrap: "wrap" }}>
          <h1 style={{ fontSize: "var(--size-title)" }}>Corporate Finance — 42 items across 4 groups</h1>
          <div style={{ fontFamily: "var(--font-meta)", fontSize: "var(--size-micro)", color: "var(--text-muted)" }}>
            28 homework · 8 readings · 4 quizzes · 2 exams · <span style={{ color: resolved ? "var(--ok)" : "var(--warn)" }}>{resolved ? "nothing left to check" : "3 need your attention"}</span>
          </div>
        </div>

        {!resolved && (
          <InsightBand label="⚠ Needs your attention"
            actions={<><Input mono placeholder="pick a date" width="200px" /><Button onClick={() => setResolved(true)}>Save date</Button><Button variant="danger" onClick={() => setResolved(true)}>Dismiss item</Button></>}>
            <b>“Final project — TBD”</b> · date unresolved <Badge tone="warn">Scope wasn’t sure</Badge>
          </InsightBand>
        )}

        {series.map((s) => (
          <SeriesGroup key={s.key} title={s.title} cadence={s.cadence} range={s.range} count={s.count} magnitude={s.magnitude}
            expanded={!!open[s.key]} onToggle={() => setOpen({ ...open, [s.key]: !open[s.key] })}
            moreLabel={open[s.key] ? s.more : null}
            actions={<><Button size="sm">✎ edit cadence</Button><Button size="sm" variant="danger">✕ remove all</Button></>}>
            {s.items.map((it) => (
              <AssignmentRow key={it.title} title={it.title} course="Corporate Finance" courseColor="var(--course-1)"
                type={s.key === "read" ? "reading" : s.key === "quiz" ? "quiz" : s.key === "exam" ? "exam" : "homework"}
                due={it.due} magnitude={s.magnitude} />
            ))}
          </SeriesGroup>
        ))}

        <div style={{ display: "flex", justifyContent: "space-between", gap: "var(--space-5)", paddingTop: "var(--space-5)", borderTop: "var(--border-hairline) solid var(--border-subtle)" }}>
          <Button variant="danger" onClick={onDiscard}>Discard entire upload</Button>
          <div style={{ display: "flex", gap: "var(--space-4)" }}>
            <Button>Back</Button>
            <Button variant="primary" size="lg" onClick={onApprove}>Approve all 42</Button>
          </div>
        </div>
        <div style={{ fontFamily: "var(--font-meta)", fontSize: "var(--size-micro)", color: "var(--text-faint)" }}>
          Nothing is saved until you approve. Everything lands in one write.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Approve });
