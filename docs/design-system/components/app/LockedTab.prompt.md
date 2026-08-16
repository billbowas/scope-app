Shown when a user clicks a gated view. The tab stays visible and clickable; this page explains the gap.

```jsx
<LockedTab view="Runway"
  have="You have 1 course and 14 assignments."
  needs="Runway opens at 2 courses and 20 assignments."
  action={<Button variant="primary">Upload another syllabus</Button>} />
```

Unlocking is one-way within a term. Never render a page of six "not enough data yet" cards — hide cards instead (§10.2 fallback rule).
