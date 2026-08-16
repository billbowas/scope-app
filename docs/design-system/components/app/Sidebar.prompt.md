The app shell's left rail — present on every signed-in screen.

```jsx
<Sidebar termName="Fall 2026" pastTerms={["Spring 2026"]}
  courses={[{name:"Corporate Finance",color:"var(--course-1)",count:42}]}
  views={[{id:"today",label:"Today"},{id:"workload",label:"Workload"},{id:"runway",label:"Runway",locked:true}]}
  activeView="today" onSelectView={setView} />
```

Rules from the spec: the word "archive" never appears — it's "Fall 2026 ▾" with past terms in the dropdown; locked views stay visible and clickable (they open an explainer, see `LockedTab`); Today is hidden entirely for a past term.
