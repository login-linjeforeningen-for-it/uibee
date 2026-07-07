import React from "react";

//#region src/components/table/menu.d.ts
declare function MenuButton({
  icon,
  text,
  hotKey,
  onClick,
  className
}: {
  icon: React.ReactNode;
  text: string;
  hotKey?: string;
  onClick: () => void;
  className?: string;
}): React.JSX.Element;
//#endregion
export { MenuButton };