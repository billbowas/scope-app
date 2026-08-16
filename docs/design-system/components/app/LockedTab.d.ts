/** The gated-view explainer. A locked tab is an explanation, never a greyed-out tab (§10.2). */
export interface LockedTabProps {
  view?: "Workload" | "Runway";
  /** What the user has now: "You have 1 course and 14 assignments." */
  have?: string;
  /** The threshold: "Runway opens at 2 courses and 20 assignments." */
  needs?: string;
  /** The single action that fixes it — usually "Upload another syllabus". */
  action?: React.ReactNode;
}
export declare function LockedTab(props: LockedTabProps): JSX.Element;
