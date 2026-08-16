/**
 * The persistent left rail: brand, current-term switcher, the course list (courses persist as data), and the three views.
 * @startingPoint section="App shell" subtitle="Left rail with courses and the three views" viewport="700x360"
 */
export interface SidebarCourse { name: string; color: string; /** Assignment count, right-aligned in mono. */ count?: number }
export interface SidebarView { id: string; label: string; /** Gated per §10.2 — still visible and clickable. */ locked?: boolean }
export interface SidebarProps {
  termName?: string;
  /** Past term names — surfaced in the switcher line, never as a main-UI term selector. */
  pastTerms?: string[];
  courses?: SidebarCourse[];
  views?: SidebarView[];
  activeView?: string;
  onSelectView?: (id: string) => void;
  onAddCourse?: () => void;
  onSelectTerm?: () => void;
  /** Fires with the footer label that was clicked ("Trash", "Settings", "Sign out"). */
  onFooterSelect?: (label: string) => void;
  footer?: string[];
}
export declare function Sidebar(props: SidebarProps): JSX.Element;
