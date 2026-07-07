import { ReactNode } from "react";

//#region src/components/alert/alert.d.ts
type AlertProps = {
  children: ReactNode;
  variant?: 'warning' | 'info';
  className?: string;
};
declare function Alert({
  children,
  variant,
  className
}: AlertProps): import("react").JSX.Element;
//#endregion
export { Alert as default };