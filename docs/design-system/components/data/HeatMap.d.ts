/**
 * Runway's centrepiece: a GitHub-contribution-graph heat map — weeks across, weekdays down, single-hue gold intensity.
 * @startingPoint section="Forecast" subtitle="Term heat map, weeks × weekdays" viewport="700x300"
 */
export interface HeatCell { /** 0-based term week. */ week: number; /** 0 = Mon … 6 = Sun. */ day: number; load?: number; items?: number; /** Tooltip label, e.g. "Thu Oct 16". */ label?: string }
export interface HeatMapProps {
  /** Number of term weeks (W1…W15), derived from term start/end dates. */
  weeks?: number;
  cells?: HeatCell[];
  /** Ramp ceiling; defaults to the busiest cell. */
  max?: number;
  /** Today marker — outlined in gold. Requires the user's timezone. */
  today?: { week: number; day: number };
  cellSize?: number;
  /** Click-to-filter the list below. A heat map without interaction is decoration. */
  onCellClick?: (cell: HeatCell) => void;
  weekLabels?: string[];
}
export declare function HeatMap(props: HeatMapProps): JSX.Element;
