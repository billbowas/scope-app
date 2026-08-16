const { Button, Input, Select, StepBar, DropZone } = window.ScopeDesignSystem_8aa58a;

function SetupFrame({ step, title, blurb, children, onBack, onNext, nextLabel, wide }) {
  return (
    <div style={{ height: "100%", overflow: "auto", background: "var(--canvas)", padding: "var(--space-11) var(--gutter-page)" }}>
      <div style={{ maxWidth: wide ? 680 : "var(--measure-form)", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-7)" }}>
        <StepBar step={step} total={3} labels={["Term", "Course", "Syllabus"]} />
        <div>
          <h1 style={{ fontSize: "var(--size-title)" }}>{title}</h1>
          {blurb && <p style={{ marginTop: "var(--space-4)", fontFamily: "var(--font-meta)", fontSize: "var(--size-small)", color: "var(--text-muted)" }}>{blurb}</p>}
        </div>
        {children}
        <div style={{ display: "flex", justifyContent: onBack ? "space-between" : "flex-end", paddingTop: "var(--space-3)" }}>
          {onBack && <Button onClick={onBack} icon="←">Back</Button>}
          <Button variant="primary" size="lg" onClick={onNext} iconAfter="→">{nextLabel || "Continue"}</Button>
        </div>
      </div>
    </div>
  );
}

function SetupTerm({ onNext }) {
  const [name, setName] = React.useState("");
  return (
    <SetupFrame step={1} title="What term are you starting?" blurb="Term dates are how Scope figures out “this week” and “next week.” You can edit them later." onNext={onNext}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
        <Input label="Term name" placeholder="Fall 2026" value={name} onChange={setName} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-5)" }}>
          <Input label="Start date" mono placeholder="Aug 25, 2026" />
          <Input label="End date" mono placeholder="Dec 12, 2026" />
        </div>
        <Select label="Timezone" width="100%" value="ny" options={[{ value: "ny", label: "America/New_York" }, { value: "chi", label: "America/Chicago" }, { value: "la", label: "America/Los_Angeles" }]} />
      </div>
    </SetupFrame>
  );
}

function SetupUpload({ onBack, onNext }) {
  const [file, setFile] = React.useState(null);
  return (
    <SetupFrame step={3} title="Upload your first syllabus" onBack={onBack} onNext={onNext} nextLabel="Extract" wide>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-5)" }}>
        <Input label="Course" value="Corporate Finance" />
        <Input label="Course code (optional)" mono placeholder="FINC 3010" />
      </div>
      <DropZone filename={file} onPick={() => setFile("corporate-finance-fall-2026.pdf")} />
      <div style={{ fontFamily: "var(--font-meta)", fontSize: "var(--size-micro)", color: "var(--text-faint)", lineHeight: 1.6 }}>
        Scope reads the PDF, extracts assignments, and asks you a few questions before anything is saved. You’ll approve everything on the next screen.
      </div>
    </SetupFrame>
  );
}

function Verify({ onNext }) {
  const [answers, setAnswers] = React.useState({ q1: "Schedule only", q3: "Wed Oct 15" });
  const qs = window.SCOPE_DATA.QUESTIONS;
  return (
    <div style={{ height: "100%", overflow: "auto", background: "var(--canvas)", padding: "var(--space-11) var(--gutter-page)" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--space-6)" }}>
        <div>
          <h1 style={{ fontSize: "var(--size-title)" }}>A few things Scope couldn’t resolve</h1>
          <div style={{ marginTop: "var(--space-3)", fontFamily: "var(--font-meta)", fontSize: "var(--size-small)", color: "var(--text-muted)" }}>3 questions · takes 30 seconds</div>
        </div>
        {qs.map((q) => (
          <div key={q.id} style={{ padding: "var(--space-5)", background: "var(--surface-card)", border: "var(--border-hairline) solid var(--border-card)", borderRadius: "var(--radius-md)" }}>
            <div style={{ fontSize: "var(--size-subtitle)", color: "var(--text-primary)" }}>{q.prompt}</div>
            <div style={{ marginTop: "var(--space-5)", display: "flex", gap: "var(--space-4)", flexWrap: "wrap" }}>
              {q.input
                ? <Input mono placeholder={q.placeholder} width="220px" />
                : q.options.map((o) => (
                  <Button key={o} variant={answers[q.id] === o ? "primary" : "secondary"} onClick={() => setAnswers({ ...answers, [q.id]: o })}>{o}</Button>
                ))}
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="primary" size="lg" onClick={onNext} iconAfter="→">Review extracted items</Button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SetupTerm, SetupUpload, Verify });
