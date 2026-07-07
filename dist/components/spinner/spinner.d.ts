//#region src/components/spinner/spinner.d.ts
type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};
declare function Spinner({
  size,
  className
}: SpinnerProps): import("react").JSX.Element;
//#endregion
export { Spinner as default };