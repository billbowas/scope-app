/** First-run progress line: "Step 1 of 3 · Term → Course → Syllabus". The three-step setup IS the onboarding tour. */
export interface StepBarProps {
  step?: number;
  total?: number;
  /** Step names, e.g. ["Term","Course","Syllabus"]. Completed steps get a ✓. */
  labels?: string[];
}
export declare function StepBar(props: StepBarProps): JSX.Element;
