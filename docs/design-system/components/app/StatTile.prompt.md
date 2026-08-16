One big derived number. The Workload stat strip and Runway's term progress are rows of these.

```jsx
<StatTile label="Peak week" value={41} unit="load" sub="Week 8 · Oct 13–19" tone="accent" />
<StatTile label="Clearest window" value={14} unit="load" sub="Week 3 · Sep 8–14" />
<StatTile size="text" label="Next big rock" value="Oct 15" sub="Midterm · Corporate Finance" />
```

The metric slot is for numerals — put dates in `sub` and keep a number up top where you can ("7 weeks out"), or use `size="text"` when the value really is a date or word.

Stat figures read as plain values, not percentage deltas against the term average (§10.5) — the average appears only as the dashed line on the weekly chart.
