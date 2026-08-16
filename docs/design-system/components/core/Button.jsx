import React from "react";

const TONES = {
  primary: { bg: "var(--gold-500)", fg: "var(--accent-ink)", bd: "var(--gold-500)", bgHover: "var(--gold-400)", bdHover: "var(--gold-400)" },
  secondary: { bg: "var(--ink-600)", fg: "var(--text-primary)", bd: "#888", bgHover: "var(--surface-raised)", bdHover: "var(--gray-400)" },
  ghost: { bg: "transparent", fg: "var(--accent)", bd: "var(--gold-a45)", bgHover: "var(--gold-a08)", bdHover: "var(--gold-500)" },
  quiet: { bg: "transparent", fg: "var(--text-muted)", bd: "transparent", bgHover: "var(--ink-700)", bdHover: "transparent" },
  danger: { bg: "transparent", fg: "var(--danger)", bd: "rgba(194,86,74,.5)", bgHover: "var(--danger-bg)", bdHover: "var(--danger)" }
};

const SIZES = {
  sm: { fs: "var(--size-micro)", pad: "3px 8px", h: "26px" },
  md: { fs: "var(--size-small)", pad: "6px 14px", h: "var(--control-height)" },
  lg: { fs: "var(--size-body)", pad: "10px 20px", h: "var(--control-height-lg)" }
};

export function Button({ variant = "secondary", size = "md", icon, iconAfter, children, disabled, full, onClick, title }) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const t = TONES[variant] || TONES.secondary;
  const s = SIZES[size] || SIZES.md;
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "var(--space-3)",
        width: full ? "100%" : "auto", minHeight: s.h, padding: s.pad,
        fontFamily: "var(--font-meta)", fontSize: s.fs, fontWeight: "var(--weight-medium)",
        background: hover && !disabled ? t.bgHover : t.bg,
        color: t.fg,
        border: `var(--border-hairline) solid ${hover && !disabled ? t.bdHover : t.bd}`,
        borderRadius: "var(--radius-xs)",
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        transform: press && !disabled ? "var(--press-shift)" : "none",
        transition: "var(--transition-control)", whiteSpace: "nowrap"
      }}
    >
      {icon}{children}{iconAfter}
    </button>
  );
}
