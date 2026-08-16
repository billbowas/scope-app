/** A one-sentence derived warning: "Heavy day tomorrow", "⚠ Needs your attention", "Collision ahead". */
export interface InsightBandProps {
  tone?: "warn" | "accent" | "danger" | "neutral";
  /** Uppercase 11px label in the tone colour. */
  label?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}
export declare function InsightBand(props: InsightBandProps): JSX.Element;
