import React, { ReactNode } from "react";

//#region src/components/navbar/navbarDropdown.d.ts
type NavDropdownProps = {
  children: ReactNode;
  title: string;
  className?: string;
};
declare function NavDropdown({
  children,
  title,
  className
}: NavDropdownProps): React.JSX.Element;
//#endregion
export { NavDropdownProps, NavDropdown as default };