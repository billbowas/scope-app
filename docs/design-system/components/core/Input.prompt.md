Text field for setup steps, verifying questions and inline edits on the approval screen.

```jsx
<Input label="Term name" placeholder="Fall 2026" value={name} onChange={setName} />
<Input label="Start date" mono placeholder="Aug 25, 2026" />
```

Dates and counts always use `mono`. Focus turns the border gold; `invalid` turns it red and tints `hint`. Labels are uppercase 11px sans (`.scope-label`) — never serif.
