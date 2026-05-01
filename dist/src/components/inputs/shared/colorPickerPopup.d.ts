import { type JSX } from 'react';
export type ColorPickerPopupProps = {
    value: string;
    onChange: (color: string) => void;
    onClose: () => void;
    anchorName?: string;
};
export default function ColorPickerPopup({ value, onChange, onClose, anchorName }: ColorPickerPopupProps): JSX.Element;
