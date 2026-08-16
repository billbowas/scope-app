The term heat map on Runway. GitHub contribution-graph shape: weeks as columns, weekdays as rows, 22px cells, 3px gaps.

```jsx
<HeatMap weeks={15} cells={cells} today={{week:0,day:2}} onCellClick={filterList} />
```

Rules: single-hue gold ramp only (`--heat-0` … `--heat-4`) — never a rainbow scale; hover tooltip and click-to-filter ship day one; today is outlined in gold, never filled.
