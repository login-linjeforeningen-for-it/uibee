import { RefObject } from "react";

//#region src/hooks/useClickOutside.d.ts
declare function useClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, callback: () => void): void;
//#endregion
export { useClickOutside as default };