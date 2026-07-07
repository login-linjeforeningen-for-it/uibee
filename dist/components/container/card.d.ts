import { ReactNode } from "react";

//#region src/components/container/card.d.ts
type CardProps = {
  children: ReactNode;
  className?: string;
};
declare function Card({
  children,
  className
}: CardProps): import("react").JSX.Element;
//#endregion
export { Card as default };