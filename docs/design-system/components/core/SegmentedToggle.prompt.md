Segmented switch. The Load / Items toggle on Workload (§10.5) — it changes every number on the page, nothing else.

```jsx
<SegmentedToggle value={mode} onChange={setMode}
  options={[{value:"load",label:"Load"},{value:"items",label:"Items"}]} />
```

Do not use it for view switching (that's the sidebar) and never build a Calendar-weeks / Rolling-7-days toggle — explicitly dropped in §10.5.
