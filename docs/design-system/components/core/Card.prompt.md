Surface for every dashboard card and every group on the approval screen.

```jsx
<Card title="Weekly load" meta="15 weeks · Aug 25 – Dec 12" actions={<Button size="sm">Download CSV</Button>}>
  <LoadChart bars={weeks} average={24} />
</Card>
```

Tones: `default` (card), `flat` (grouping with no fill), `accent` (gold tint — forecast callouts), `warn` (needs attention band), `danger`. Never stack two tinted cards adjacent; per §10.2 hide a card rather than showing an empty one.
