import { ElementType, ReactNode } from "react";

//#region src/components/sidebar/sidebar.d.ts
type SidebarSubItem = {
  name: string;
  path: string;
};
type SidebarItem = {
  name: string;
  path: string;
  icon: ElementType;
  status?: ReactNode;
  items?: SidebarSubItem[];
};
type SidebarProps = {
  items: SidebarItem[];
  header?: ReactNode | ((expanded: boolean) => ReactNode);
  bottomAction?: (expanded: boolean) => ReactNode;
  mobile?: boolean;
  initialExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  className?: string;
};
declare function Sidebar({
  items,
  header,
  bottomAction,
  mobile,
  initialExpanded,
  onExpandedChange,
  className
}: SidebarProps): import("react").JSX.Element;
//#endregion
export { SidebarItem, SidebarSubItem, Sidebar as default };