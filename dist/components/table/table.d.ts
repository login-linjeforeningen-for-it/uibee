import { Column, Density, SortState, TableColor, TableProps, TableVariant } from "./types.js";
import { MenuButton } from "./menu.js";

//#region src/components/table/table.d.ts
declare function Table<T extends Record<string, unknown> = Record<string, unknown>>(props: TableProps<T>): import("react").JSX.Element;
//#endregion
export { MenuButton, Table };