/**
 * A single big derived number — the Workload stat strip and Runway's term progress.
 * @startingPoint section="Forecast" subtitle="Stat tile with an oversized serif metric" viewport="700x160"
 */
export interface StatTileProps {
  /** Uppercase label, e.g. "Peak week". */
  label: string;
  /** The number, set in serif at 56px — importance is expressed as size. */
  value: string | number;
  /** Trailing unit: "load", "items", "%". */
  unit?: string;
  /** Plain-value context — "Week 8 · Oct 13–19". Never a percentage delta (§10.5). */
  sub?: string;
  tone?: "default" | "accent";
  /** `metric` (56px numeral, default) or `text` for a short date/word value at 25px. */
  size?: "metric" | "text";
}
export declare function StatTile(props: StatTileProps): JSX.Element;
