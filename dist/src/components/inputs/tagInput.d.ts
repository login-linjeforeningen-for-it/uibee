export type TagInputProps = {
    label?: string;
    name: string;
    value?: string[];
    onChange?: (value: string[]) => void;
    placeholder?: string;
    error?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    info?: string;
    description?: string;
    textSize?: 'sm' | 'md';
};
export default function TagInput({ label, name, value, onChange, placeholder, error, className, disabled, required, info, description, textSize, }: TagInputProps): import("react/jsx-runtime").JSX.Element;
