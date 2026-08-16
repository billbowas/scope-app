/** Dropdown for timezone, term switcher and the Workload course filter. */
export interface SelectOption { value: string; label: string; /** Course colour, shown as a square when `dots` is set. */ color?: string }
export interface SelectProps {
  label?: string;
  value?: string;
  options: SelectOption[];
  onChange?: (value: string) => void;
  width?: string;
  /** Render each option's course colour square — the Workload filter uses this. */
  dots?: boolean;
}
export declare function Select(props: SelectProps): JSX.Element;
