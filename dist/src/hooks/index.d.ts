import { RefObject } from "react";

//#region src/hooks/useVisibility.d.ts
declare function useVisibility<T extends HTMLElement>(onVisible: () => void, rootMargin?: string): {
  ref: import("react").RefObject<T | null>;
  isVisible: boolean;
};
//#endregion
//#region src/hooks/useDarkMode.d.ts
declare function useDarkMode(): boolean;
//#endregion
//#region src/hooks/useClickOutside.d.ts
declare function useClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, callback: () => void): void;
//#endregion
export { useClickOutside, useDarkMode, useVisibility };