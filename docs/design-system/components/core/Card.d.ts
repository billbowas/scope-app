/** The container every dashboard insight sits in. 8px radius, hairline border, no drop shadow beyond `--shadow-card`. */
export interface CardProps {
  /** `accent` = gold tint (forecast highlight), `warn` = needs attention, `flat` = borderless grouping. */
  tone?: "default" | "flat" | "accent" | "warn" | "danger";
  title?: string;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
  padding?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;
