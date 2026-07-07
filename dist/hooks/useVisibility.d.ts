//#region src/hooks/useVisibility.d.ts
declare function useVisibility<T extends HTMLElement>(onVisible: () => void, rootMargin?: string): {
  ref: import("react").RefObject<T | null>;
  isVisible: boolean;
};
//#endregion
export { useVisibility as default };