import { IconBubbleTone } from "./iconBubble.js";
import { ElementType, ReactNode } from "react";

//#region src/components/container/expandableCard.d.ts
type PulseVariant = 'online' | 'offline' | 'warning' | 'unknown';
type ExpandableCardProps = {
  icon: ElementType;
  iconTone?: IconBubbleTone;
  title: string;
  subtitle?: ReactNode;
  pulse?: {
    variant: PulseVariant;
    label: string;
  };
  trailing?: ReactNode;
  isExpanded: boolean;
  onToggle: () => void;
  children?: ReactNode;
};
declare function ExpandableCard({
  icon,
  iconTone,
  title,
  subtitle,
  pulse,
  trailing,
  isExpanded,
  onToggle,
  children
}: ExpandableCardProps): import("react").JSX.Element;
//#endregion
export { ExpandableCard as default };