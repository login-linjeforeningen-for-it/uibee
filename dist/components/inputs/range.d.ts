//#region src/components/inputs/range.d.ts
type RangeProps = Omit<React.ComponentProps<'input'>, 'name'> & {
  name: string;
  label?: string;
  error?: string;
  className?: string;
  info?: string;
  description?: string;
  showValue?: boolean;
  textSize?: 'sm' | 'md';
};
declare function Range(props: RangeProps): import("react").JSX.Element;
//#endregion
export { RangeProps, Range as default };