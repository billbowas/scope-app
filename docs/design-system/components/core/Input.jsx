import React from "react";

export function Input({ label, value, placeholder, onChange, mono, width, invalid, readOnly, hint, suffix }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <label style={{ display: "block", width: width || "100%" }}>
      {label && <div className="scope-label" style={{ marginBottom: "var(--space-2)" }}>{label}</div>}
      <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
        <input
          value={value ?? ""}
          placeholder={placeholder}
          readOnly={readOnly}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={(e) => onChange && onChange(e.target.value)}
          style={{
            flex: 1, minWidth: 0, height: "var(--control-height)", padding: "6px 10px",
            background: "var(--surface-input)", color: "var(--text-body)",
            fontFamily: mono ? "var(--font-data)" : "var(--font-ui)", fontSize: "var(--size-small)",
            border: `var(--border-hairline) solid ${invalid ? "var(--danger)" : focus ? "var(--gold-500)" : "var(--line-dashed)"}`,
            borderRadius: "var(--radius-xs)", outline: "none", transition: "var(--transition-control)"
          }}
        />
        {suffix && <span className="scope-meta">{suffix}</span>}
      </div>
      {hint && <div className="scope-meta" style={{ marginTop: "var(--space-2)", fontSize: "var(--size-micro)", color: invalid ? "var(--danger)" : "var(--text-faint)" }}>{hint}</div>}
    </label>
  );
}
