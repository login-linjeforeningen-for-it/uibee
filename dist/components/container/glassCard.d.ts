import { ReactNode } from "react";

//#region src/components/container/glassCard.d.ts
type GlassCardProps = {
  children: ReactNode;
  className?: string;
};
declare function GlassCard({
  children,
  className
}: GlassCardProps): import("react").JSX.Element;
//#endregion
export { GlassCard as default };