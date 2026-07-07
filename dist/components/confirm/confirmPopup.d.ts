//#region src/components/confirm/confirmPopup.d.ts
type ConfirmPopupProps = {
  isOpen: boolean;
  header: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning' | 'default';
};
declare function ConfirmPopup({
  isOpen,
  header,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  variant
}: ConfirmPopupProps): import("react").JSX.Element | null;
//#endregion
export { ConfirmPopup as default };