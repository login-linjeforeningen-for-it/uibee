import React, { JSX } from "react";

//#region src/components/inputs/input.d.ts
type InputProps = Omit<React.ComponentProps<'input'>, 'name'> & {
  name: string;
  label?: string;
  error?: string;
  className?: string;
  icon?: JSX.Element;
  info?: string;
  description?: string;
  textSize?: 'sm' | 'md';
};
declare function Input(props: InputProps): JSX.Element;
//#endregion
export { InputProps, Input as default };