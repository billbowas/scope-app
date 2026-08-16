Per-course swimlanes on Runway — the reason Runway needs two courses to unlock.

```jsx
<Swimlane weeks={15} collisions={[{week:6}]}
  courses={[{name:"Corporate Finance",color:"var(--course-1)",items:[{week:3,label:"Quiz 1",magnitude:2}]}]} />
```

Dot diameters are fixed: magnitude 1 = 8px, 2 = 12px, 3 = 18px. Course colour is the only fill; gold is reserved for the collision shading and hover ring.
