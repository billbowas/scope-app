Dropdown — timezone in the welcome step, the past-term switcher, and `Viewing: [All courses ▾]` on Workload.

```jsx
<Select label="Viewing" dots value={courseId} onChange={setCourseId}
  options={[{value:"all",label:"All courses"},{value:"fin",label:"Corporate Finance",color:"var(--course-1)"}]} />
```

Course colours are squares, not circles, matching the sidebar swatches. Menu opens downward with `--shadow-pop`; no animation.
