//#region src/components/inputs/checkbox.d.ts
type CheckboxOption = {
  label: string;
  value: string | number;
};
type CheckboxProps = Omit<React.ComponentProps<'input'>, 'name' | 'onChange' | 'value'> & {
  name: string;
  label?: string;
  error?: string;
  info?: string;
  description?: string;
  className?: string;
  options: CheckboxOption[];
  value?: (string | number)[];
  onChange?: (value: (string | number)[]) => void;
  textSize?: 'sm' | 'md';
};
declare function Checkbox(props: CheckboxProps): import("react").JSX.Element;
//#endregion
export { CheckboxOption, CheckboxProps, Checkbox as default };