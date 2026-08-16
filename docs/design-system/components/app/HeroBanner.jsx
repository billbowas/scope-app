import React from "react";

export function HeroBanner({ eyebrow = "Start tonight", title, detail, actions }) {
  return (
    <section style={{
      display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--space-8)",
      padding: "var(--space-7)", borderRadius: "var(--radius-md)",
      background: "var(--gradient-accent)", border: "var(--border-hairline) solid var(--gold-a45)"
    }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: "var(--font-meta)", fontSize: "var(--size-label)", fontWeight: "var(--weight-semibold)", textTransform: "uppercase", letterSpacing: "var(--tracking-wide)", color: "var(--accent)" }}>{eyebrow}</div>
        <h2 style={{ marginTop: "var(--space-3)", fontSize: "var(--size-hero)", color: "var(--gold-300)", lineHeight: "var(--leading-tight)" }}>{title}</h2>
        {detail && <div style={{ marginTop: "var(--space-4)", fontFamily: "var(--font-meta)", fontSize: "var(--size-small)", color: "var(--text-body)" }}>{detail}</div>}
      </div>
      {actions && <div style={{ display: "flex", gap: "var(--space-4)", flex: "0 0 auto" }}>{actions}</div>}
    </section>
  );
}
