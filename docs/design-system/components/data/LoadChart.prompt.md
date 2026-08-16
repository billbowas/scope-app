Weekly load bars on Workload, and the "this week by day" chart.

```jsx
<LoadChart bars={[{label:"W1",value:12},{label:"W8",value:41,peak:true}]} average={24} unit="load" />
```

Weeks are always fixed term weeks derived from the term start date — there is no rolling-7-days mode (§10.5). The peak bar is the only gold element; the term average is a dashed line, never a second series.
