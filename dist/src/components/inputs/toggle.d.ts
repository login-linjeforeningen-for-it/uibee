type ToggleOption<T> = {
    value: T;
    label?: string;
    text?: string;
    icon?: React.ReactNode;
};
type ToggleProps<T> = {
    value: T;
    onChange: (value: T) => void;
    left: ToggleOption<T>;
    right: ToggleOption<T>;
};
export default function Toggle<T>({ value, onChange, left, right, }: ToggleProps<T>): import("react/jsx-runtime").JSX.Element;
export {};
