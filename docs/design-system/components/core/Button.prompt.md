Scope's button — use for every action; gold `primary` marks the one forward step on a screen.

```jsx
<Button variant="primary" size="lg" iconAfter="→">Approve all 42</Button>
<Button>Snooze</Button>
<Button variant="danger" size="sm">Remove all</Button>
```

Variants: `primary` (gold fill, one per screen), `secondary` (default grey outline), `ghost` (gold outline, used beside a primary on the hero banner), `quiet` (borderless, for row-level affordances), `danger` (discard / remove all). Sizes `sm` (11.5px, series-row actions), `md`, `lg` (sign-in, approve). Press state is a 1px downward shift — never a scale.
