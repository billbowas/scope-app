const { Button, Card, StatTile, HeatMap, Swimlane, InsightBand, AssignmentRow, LockedTab } = window.ScopeDesignSystem_8aa58a;

function Runway({ locked, onUpload }) {
  const D = window.SCOPE_DATA;
  const [filter, setFilter] = React.useState(null);

  if (locked) {
    return <LockedTab view="Runway" have="You have 1 course and 14 assignments."
      needs="Runway opens at 2 courses and 20 assignments, spanning at least 6 weeks."
      action={<Button variant="primary" size="lg" onClick={onUpload}>Upload another syllabus</Button>} />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-7)" }}>
      <div>
        <h1 style={{ fontSize: "var(--size-display)" }}>Runway</h1>
        <div style={{ marginTop: "var(--space-3)", fontFamily: "var(--font-meta)", fontSize: "var(--size-small)", color: "var(--text-muted)" }}>The shape of Fall 2026 · Aug 25 – Dec 12</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "var(--space-5)" }}>
        <StatTile label="Term progress" value="18%" sub="3 of 16 weeks" />
        <StatTile tone="accent" label="Next big rock" value={7} unit="weeks out" sub="Midterm · Oct 15 · Corporate Finance" />
        <StatTile label="Load-ahead pace" value="2.3" unit="days ahead" sub="Against an even spread" />
        <StatTile label="Open window" value={6} unit="days clear" sub="Sep 8 – Sep 14 · before the midterm" />
      </div>

      <Card title="Term heat map" meta="Hover a day for its items · click to filter the list below">
        <HeatMap weeks={15} cells={D.HEAT} today={{ week: 0, day: 2 }} onCellClick={(c) => setFilter(c)} />
      </Card>

      {filter && (
        <Card tone="flat" title={`${filter.label || "That day"} · ${filter.load || 0} load`} actions={<Button size="sm" variant="quiet" onClick={() => setFilter(null)}>✕ clear</Button>}>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
            {D.NEXT_48.slice(0, Math.max(1, filter.items || 1)).map((i) => (
              <AssignmentRow key={i.id} title={i.title} course={i.course} courseColor={i.color} type={i.type} due={filter.label} magnitude={i.magnitude} />
            ))}
          </div>
        </Card>
      )}

      <Card title="Per-course timeline" meta="Dot size = magnitude · shaded column = collision">
        <Swimlane weeks={15} collisions={[{ week: 6 }]} courses={D.LANES} />
      </Card>

      <InsightBand label="Watch">
        <b>Collision ahead</b> — Oct 14–16 has 3 major items across all three courses.
      </InsightBand>

      <Card title="Big rocks" meta="Magnitude 2–3, next eight weeks" actions={<Button size="sm" variant="quiet">View all</Button>}>
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
          <AssignmentRow title="Paper 1" course="Constitutional Law" courseColor="var(--course-3)" type="paper" due="Oct 14" magnitude={3} />
          <AssignmentRow title="Midterm" course="Corporate Finance" courseColor="var(--course-1)" type="exam" due="Oct 15" magnitude={3} />
          <AssignmentRow title="Project draft" course="Statistics" courseColor="var(--course-2)" type="project" due="Oct 16" magnitude={3} />
        </div>
      </Card>
    </div>
  );
}

Object.assign(window, { Runway });
