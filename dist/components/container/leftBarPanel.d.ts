import { ReactNode } from "react";

//#region src/components/container/leftBarPanel.d.ts
type LeftBarPanelProps = {
  color: string;
  children: ReactNode;
  className?: string;
};
declare function LeftBarPanel({
  color,
  children,
  className
}: LeftBarPanelProps): import("react").JSX.Element;
//#endregion
export { LeftBarPanel as default };