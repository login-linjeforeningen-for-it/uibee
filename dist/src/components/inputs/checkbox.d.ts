export type CheckboxOption = {
    label: string;
    value: string | number;
};
export type CheckboxProps = Omit<React.ComponentProps<'input'>, 'name' | 'onChange' | 'value'> & {
    name: string;
    label?: string;
    error?: string;
    info?: string;
    description?: string;
    className?: string;
    options: CheckboxOption[];
    value?: (string | number)[];
    onChange?: (value: (string | number)[]) => void;
};
export default function Checkbox(props: CheckboxProps): import("react/jsx-runtime").JSX.Element;
