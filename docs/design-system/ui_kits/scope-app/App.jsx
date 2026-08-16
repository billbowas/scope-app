const { Sidebar, Button } = window.ScopeDesignSystem_8aa58a;

function App() {
  // stage: signin → term → upload → verify → approve → app
  const [stage, setStage] = React.useState("signin");
  const [view, setView] = React.useState("today");
  const [courses, setCourses] = React.useState(window.SCOPE_DATA.COURSES);
  const sparse = courses.length < 2;

  const shell = (content) => (
    <div style={{ display: "flex", height: "100%", background: "var(--canvas)" }}>
      <Sidebar termName="Fall 2026" pastTerms={["Spring 2026"]} courses={courses}
        views={[{ id: "today", label: "Today" }, { id: "workload", label: "Workload" }, { id: "runway", label: "Runway", locked: sparse }]}
        activeView={view} onSelectView={setView} onAddCourse={() => setStage("upload")}
        footer={["Trash", "Settings", "Sign out"]} onFooterSelect={(f) => { if (f === "Sign out") setStage("signin"); }} />
      <main style={{ flex: 1, minWidth: 0, overflow: "auto", padding: "var(--space-9) var(--space-10)" }}>
        <div style={{ maxWidth: 1000 }}>{content}</div>
      </main>
    </div>
  );

  if (stage === "signin") return <window.SignIn onSignIn={() => setStage("term")} />;
  if (stage === "term") return <window.SetupTerm onNext={() => setStage("upload")} />;
  if (stage === "upload") return <window.SetupUpload onBack={() => setStage("term")} onNext={() => setStage("verify")} />;
  if (stage === "verify") return <window.Verify onNext={() => setStage("approve")} />;
  if (stage === "approve") return <window.Approve onApprove={() => { setStage("app"); setView("today"); }} onDiscard={() => setStage("upload")} />;

  return shell(
    view === "today" ? <window.Today />
      : view === "workload" ? <window.Workload />
        : <window.Runway locked={sparse} onUpload={() => setStage("upload")} />
  );
}

function Kit() {
  const [key, setKey] = React.useState(0);
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <App key={key} />
      <button type="button" onClick={() => setKey(key + 1)} title="Restart the flow from sign in"
        style={{ position: "fixed", right: 14, bottom: 14, padding: "6px 12px", background: "var(--surface-card)", color: "var(--text-muted)", border: "1px solid var(--border-card)", borderRadius: "var(--radius-pill)", fontFamily: "var(--font-meta)", fontSize: 11, cursor: "pointer" }}>
        restart flow
      </button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Kit />);
