import { ToastType } from "uibee/components";

//#region src/components/toast/toaster.d.ts
declare function toast(message: string, type: ToastType, duration?: number): void;
declare namespace toast {
  var info: (message: string, duration?: number) => void;
  var success: (message: string, duration?: number) => void;
  var warning: (message: string, duration?: number) => void;
  var error: (message: string, duration?: number) => void;
}
declare function Toaster(): import("react").JSX.Element;
//#endregion
export { Toaster as default, toast };