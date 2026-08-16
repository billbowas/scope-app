/** Small status pill: step counters, item types, magnitudes, and the "Scope wasn't sure" confidence flag. */
export interface BadgeProps {
  tone?: "neutral" | "accent" | "warn" | "ok" | "danger" | "outline";
  /** Fully rounded — used for step counters and the gold screen numbers. */
  pill?: boolean;
  mono?: boolean;
  children?: React.ReactNode;
}
export declare function Badge(props: BadgeProps): JSX.Element;
