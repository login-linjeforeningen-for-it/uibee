//#region src/components/inputs/select.d.ts
type Option = {
  value: string | number;
  label: string;
  image?: string;
};
type SelectProps = {
  label?: string;
  name: string;
  value?: string | number | null;
  onChange?: (value: string | number | null) => void;
  options: Option[];
  error?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  info?: string;
  description?: string;
  clearable?: boolean;
  searchable?: boolean;
  textSize?: 'sm' | 'md';
};
declare function Select({
  label,
  name,
  value,
  onChange,
  options,
  error,
  className,
  disabled,
  required,
  placeholder,
  info,
  description,
  clearable,
  searchable,
  textSize
}: SelectProps): import("react").JSX.Element;
//#endregion
export { Option, SelectProps, Select as default };