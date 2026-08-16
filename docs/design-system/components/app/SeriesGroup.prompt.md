Collapsed series row — the thing that turns 40 approval rows into 8 groups (§10.4).

```jsx
<SeriesGroup title="Problem Set 1–12" cadence="weekly, Fridays" range="Sep 5 – Nov 21"
  count={12} magnitude={1} expanded={open} onToggle={toggle}
  actions={<><Button size="sm">✎ edit cadence</Button><Button size="sm" variant="danger">✕ remove all</Button></>}
  moreLabel="+ 9 more · click any row to edit inline">
  <AssignmentRow title="PS 1" due="Sep 5" type="homework" magnitude={1} />
</SeriesGroup>
```

Expand is styled as a prominent (gold) action when collapsed — the locked decision from wireframe review. Show the first series pre-expanded so users learn inspection is one click away.
