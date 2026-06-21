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
export default function ConfirmPopup({ isOpen, header, description, confirmText, cancelText, onConfirm, onCancel, variant, }: ConfirmPopupProps): import("react").JSX.Element | null;
export {};
