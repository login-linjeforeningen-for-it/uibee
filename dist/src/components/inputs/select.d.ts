export type Option = {
    value: string | number;
    label: string;
    image?: string;
};
export type SelectProps = {
    label?: string;
    name: string;
    value?: string | number | null;
    onChange?: (value: string | number | null) => void;
    options: Option[];
    error?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    placeholder?: string;
    info?: string;
    description?: string;
    clearable?: boolean;
    searchable?: boolean;
};
export default function Select({ label, name, value, onChange, options, error, className, disabled, required, placeholder, info, description, clearable, searchable, }: SelectProps): import("react/jsx-runtime").JSX.Element;
