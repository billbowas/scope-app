/** Runway's per-course timeline: one lane per course, dot size = magnitude, shaded columns = cross-course collisions. */
export interface SwimlaneItem { /** 0-based term week position. */ week: number; label: string; magnitude?: 1 | 2 | 3; date?: string }
export interface SwimlaneCourse { name: string; color: string; items?: SwimlaneItem[] }
export interface SwimlaneProps {
  courses: SwimlaneCourse[];
  weeks?: number;
  /** Weeks where ≥2 major items land across courses (§10.2 Watch card floor: 2 courses, 2 magnitude-3 items). */
  collisions?: { week: number }[];
  onItemClick?: (item: SwimlaneItem) => void;
}
export declare function Swimlane(props: SwimlaneProps): JSX.Element;
