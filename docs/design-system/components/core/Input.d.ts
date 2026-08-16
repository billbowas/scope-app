/** Single-line text field used across setup, verifying questions and inline approval edits. */
export interface InputProps {
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  /** Tabular mono face — use for dates, counts and codes. */
  mono?: boolean;
  width?: string;
  invalid?: boolean;
  readOnly?: boolean;
  /** Small line under the field; turns red when `invalid`. */
  hint?: string;
  suffix?: React.ReactNode;
}
export declare function Input(props: InputProps): JSX.Element;
