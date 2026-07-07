import { IconBubbleTone } from "./iconBubble.js";
import { ElementType } from "react";

//#region src/components/container/statCard.d.ts
type StatCardProps = {
  label: string;
  value: string;
  icon: ElementType;
  tone?: IconBubbleTone;
};
declare function StatCard({
  label,
  value,
  icon,
  tone
}: StatCardProps): import("react").JSX.Element;
//#endregion
export { StatCard as default };