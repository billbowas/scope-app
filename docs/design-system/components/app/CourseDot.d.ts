/** A course's colour square — the identity token that carries through every view. Squares, not circles. */
export interface CourseDotProps {
  /** One of `--course-1` … `--course-5`. */
  color?: string;
  size?: number;
  label?: string;
  muted?: boolean;
}
export declare function CourseDot(props: CourseDotProps): JSX.Element;
