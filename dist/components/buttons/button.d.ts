import { JSX } from "react";

//#region src/components/buttons/button.d.ts
type ButtonProps = {
  text?: string;
  className?: string;
  icon?: string | JSX.Element;
  path?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'success' | 'info';
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
};
declare function Button({
  text,
  className,
  icon,
  path,
  variant,
  type,
  onClick,
  disabled
}: ButtonProps): JSX.Element;
//#endregion
export { Button as default };