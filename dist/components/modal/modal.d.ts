import { ReactNode } from "react";

//#region src/components/modal/modal.d.ts
type ModalSize = 'sm' | 'md' | 'lg';
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
};
declare function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size
}: ModalProps): import("react").JSX.Element | null;
//#endregion
export { Modal as default };