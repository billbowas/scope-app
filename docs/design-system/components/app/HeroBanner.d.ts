/**
 * The "Start tonight" hero at the top of Today — one focused suggestion, gold gradient, primary Open action.
 * @startingPoint section="Today" subtitle="Start tonight hero banner" viewport="700x180"
 */
export interface HeroBannerProps {
  /** Uppercase gold eyebrow. Defaults to "Start tonight". */
  eyebrow?: string;
  /** The assignment title — the largest type on the page. */
  title?: string;
  /** One line of why: course, due time, and the load reason. */
  detail?: React.ReactNode;
  actions?: React.ReactNode;
}
export declare function HeroBanner(props: HeroBannerProps): JSX.Element;
