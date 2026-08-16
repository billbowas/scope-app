/**
 * A collapsed recurring series on the approval screen — "Problem Set 1–12 · weekly, Fridays · 12 items".
 * @startingPoint section="Approval" subtitle="Collapsed series group with bulk actions" viewport="700x210"
 */
export interface SeriesGroupProps {
  /** Series label with range, e.g. "Problem Set 1–12". */
  title: string;
  /** Inferred cadence sentence — "weekly, Fridays", "every 3 weeks". */
  cadence?: string;
  /** Date span, rendered in mono — "Sep 5 – Nov 21". */
  range?: string;
  count?: number;
  magnitude?: 1 | 2 | 3;
  expanded?: boolean;
  onToggle?: () => void;
  /** Bulk actions: edit cadence, remove all, shift by N days. */
  actions?: React.ReactNode;
  children?: React.ReactNode;
  /** Truncation line, e.g. "+ 9 more · click any row to edit inline". */
  moreLabel?: string;
}
export declare function SeriesGroup(props: SeriesGroupProps): JSX.Element;
