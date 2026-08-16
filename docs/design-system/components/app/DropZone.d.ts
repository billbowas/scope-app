/** Syllabus PDF upload target. Dashed 2px border, gold on hover, plain error text on failure — no retry loops. */
export interface DropZoneProps {
  title?: string;
  /** Limit copy — "max 10 MB · max 60 pages" comes from the upload limits in §8. */
  hint?: string;
  /** Once picked, shown in place of the title in gold. */
  filename?: string;
  /** Extraction failure message: scanned PDF, encrypted, not a syllabus. Replaces the hint, turns the border red. */
  error?: string;
  onPick?: () => void;
}
export declare function DropZone(props: DropZoneProps): JSX.Element;
