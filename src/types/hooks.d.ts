/* eslint-disable @stylistic/semi */
import type { RefObject } from 'react'
declare module 'uibee/hooks' {
    export function useVisibility<T extends HTMLElement>(
        onVisible: () => void,
        rootMargin?: string
    ): { ref: RefObject<T>; isVisible: boolean };

    export function useDarkMode(): boolean;

    export function useClickOutside<T extends HTMLElement>(
        ref: RefObject<T | null>,
        callback: () => void
    ): void;
}
