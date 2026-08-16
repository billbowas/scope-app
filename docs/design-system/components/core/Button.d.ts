/**
 * Scope's only button. Gold `primary` is reserved for the single forward action on a screen.
 * @startingPoint section="Core" subtitle="Buttons, inputs, badges and cards" viewport="700x220"
 */
export interface ButtonProps {
  /** Visual role. `primary` = gold, one per screen. `danger` for destructive review actions. */
  variant?: "primary" | "secondary" | "ghost" | "quiet" | "danger";
  size?: "sm" | "md" | "lg";
  /** Leading glyph node (a Lucide `<i data-lucide>` or inline svg). */
  icon?: React.ReactNode;
  iconAfter?: React.ReactNode;
  children?: React.ReactNode;
  disabled?: boolean;
  /** Stretch to the container width — used in the sign-in card. */
  full?: boolean;
  onClick?: () => void;
  title?: string;
}
export declare function Button(props: ButtonProps): JSX.Element;
