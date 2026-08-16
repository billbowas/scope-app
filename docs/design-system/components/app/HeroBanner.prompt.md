The Today hero — Scope's single most important element. Exactly one per screen, always at the top.

```jsx
<HeroBanner title="Problem Set 2"
  detail="Corporate Finance · due tomorrow 11:59 PM · sits on your biggest day."
  actions={<><Button variant="ghost">Snooze</Button><Button variant="primary" iconAfter="→">Open</Button></>} />
```

Never render two hero banners, and never use the gold gradient anywhere else on the page. If nothing warrants a suggestion, omit it rather than showing an empty hero.
