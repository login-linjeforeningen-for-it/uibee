//#region src/components/inputs/multiSelect.d.ts
type Option = {
  label: string;
  value: string;
};
type MultiSelectProps = {
  label?: string;
  name: string;
  options: Option[];
  value?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  info?: string;
  description?: string;
  textSize?: 'sm' | 'md';
};
declare function MultiSelect({
  label,
  name,
  options,
  value,
  onChange,
  placeholder,
  error,
  className,
  disabled,
  required,
  info,
  description,
  textSize
}: MultiSelectProps): import("react").JSX.Element;
//#endregion
export { MultiSelectProps, MultiSelect as default };