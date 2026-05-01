type DateTimePickerPopupProps = {
    value: Date | null;
    onChange: (date: Date) => void;
    type: 'date' | 'time' | 'datetime-local';
    onClose?: () => void;
    anchorName?: string;
};
export default function DateTimePickerPopup({ value, onChange, type, onClose, anchorName, }: DateTimePickerPopupProps): import("react/jsx-runtime").JSX.Element;
export {};
