const { Button } = window.ScopeDesignSystem_8aa58a;

function SignIn({ onSignIn }) {
  return (
    <div style={{ height: "100%", display: "grid", placeItems: "center", background: "var(--canvas)" }}>
      <div style={{ width: 360, display: "flex", flexDirection: "column", gap: "var(--space-8)" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "var(--size-display)", fontWeight: "var(--weight-semibold)", letterSpacing: "-.02em", color: "var(--text-primary)" }}>Scope</div>
          <div style={{ marginTop: "var(--space-2)", fontFamily: "var(--font-meta)", fontSize: "var(--size-micro)", color: "var(--text-muted)" }}>Forecast your semester.</div>
        </div>
        <button type="button" onClick={onSignIn} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "var(--space-5)", width: "100%", padding: "12px 16px", background: "#fff", color: "#1a1a1a", border: "1px solid #dadce0", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-meta)", fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
          <img src="../../assets/google-g.svg" width="18" height="18" alt="" />
          Continue with Google
        </button>
        <div style={{ textAlign: "center", fontFamily: "var(--font-meta)", fontSize: "var(--size-micro)", color: "var(--text-muted)", lineHeight: 1.6 }}>
          Access is by invite while we’re small.<br />
          A non-allowlisted Google account gets a friendly “not yet.”
        </div>
        <div style={{ textAlign: "center", fontFamily: "var(--font-meta)", fontSize: 10, color: "var(--text-faint)" }}>By continuing you agree to Scope’s terms &amp; privacy.</div>
      </div>
    </div>
  );
}

Object.assign(window, { SignIn });
