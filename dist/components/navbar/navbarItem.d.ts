import { ReactNode } from "react";

//#region src/components/navbar/navbarItem.d.ts
type NavItemProps = {
  href: string;
  children: ReactNode;
  external?: boolean;
  target?: string;
  rel?: string;
  title?: string;
  icon?: ReactNode;
};
declare function NavItem({
  href,
  children,
  external,
  target,
  rel,
  title,
  icon
}: NavItemProps): import("react").JSX.Element;
//#endregion
export { NavItemProps, NavItem as default };