An assignment line. Used on Today (next 48 hours) and inside expanded series on the approval screen.

```jsx
<AssignmentRow title="Problem Set 2" course="Corporate Finance" courseColor="var(--course-1)"
  type="homework" due="due tomorrow 11:59 PM" onToggleComplete={fn} onToggleWatch={fn} />
```

Checkbox and star are `☐/☑` and `☆/★` unicode, matching the wireframe. Completion is a convenience — it must never change a chart. Rows are editable inline (click the row); never open a modal.
