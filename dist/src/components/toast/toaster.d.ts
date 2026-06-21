import type { ToastType } from 'uibee/components';
export declare function toast(message: string, type: ToastType, duration?: number): void;
export declare namespace toast {
    var info: (message: string, duration?: number) => void;
    var success: (message: string, duration?: number) => void;
    var warning: (message: string, duration?: number) => void;
    var error: (message: string, duration?: number) => void;
}
export default function Toaster(): import("react").JSX.Element;
