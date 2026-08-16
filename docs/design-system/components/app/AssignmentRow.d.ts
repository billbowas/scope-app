/** One assignment in a list — Today's next-48-hours list and every expanded series. */
export interface AssignmentRowProps {
  title: string;
  course?: string;
  courseColor?: string;
  /** reading | homework | quiz | presentation | paper | project | exam */
  type?: string;
  /** Human due string — "due tomorrow 11:59 PM", "due Thursday". Never a raw ISO date. */
  due?: string;
  magnitude?: 1 | 2 | 3;
  /** Convenience only — never an input to any forecast. */
  complete?: boolean;
  watched?: boolean;
  /** LLM couldn't resolve a field: warn border, pulled to the top of the approval screen. */
  needsReview?: boolean;
  onToggleComplete?: () => void;
  onToggleWatch?: () => void;
  onClick?: () => void;
}
export declare function AssignmentRow(props: AssignmentRowProps): JSX.Element;
