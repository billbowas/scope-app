/** Two- or three-option switch. Workload's Load / Items toggle is the canonical use. */
export interface SegmentedToggleProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md";
}
export declare function SegmentedToggle(props: SegmentedToggleProps): JSX.Element;
