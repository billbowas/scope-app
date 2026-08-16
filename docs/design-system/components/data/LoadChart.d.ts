/** Workload's weekly load chart: fixed term weeks W1…W15, dashed term-average reference line, gold peak bar. */
export interface LoadBar { /** "W1" … "W15", or a weekday name for the by-day chart. */ label: string; value: number; /** Highlights this bar gold — the peak week. */ peak?: boolean }
export interface LoadChartProps {
  bars: LoadBar[];
  /** Term average, drawn as the only dashed reference line on the page. */
  average?: number;
  height?: number;
  /** "load" or "items", driven by the Load / Items toggle. */
  unit?: "load" | "items";
  onSelect?: (label: string) => void;
  selected?: string;
}
export declare function LoadChart(props: LoadChartProps): JSX.Element;
