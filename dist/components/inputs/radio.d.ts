//#region src/components/inputs/radio.d.ts
type RadioOption = {
  label: string;
  value: string | number;
};
type RadioProps = Omit<React.ComponentProps<'input'>, 'name' | 'onChange' | 'value'> & {
  name: string;
  label?: string;
  error?: string;
  info?: string;
  description?: string;
  className?: string;
  options: RadioOption[];
  value?: string | number | null;
  onChange?: (value: string | number) => void;
  textSize?: 'sm' | 'md';
};
declare function Radio(props: RadioProps): import("react").JSX.Element;
//#endregion
export { RadioOption, RadioProps, Radio as default };