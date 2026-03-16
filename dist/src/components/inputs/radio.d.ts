export type RadioOption = {
    label: string;
    value: string | number;
};
export type RadioProps = Omit<React.ComponentProps<'input'>, 'name' | 'onChange' | 'value'> & {
    name: string;
    label?: string;
    error?: string;
    info?: string;
    description?: string;
    className?: string;
    options: RadioOption[];
    value?: string | number | null;
    onChange?: (value: string | number) => void;
    textSize?: 'sm' | 'md';
};
export default function Radio(props: RadioProps): import("react/jsx-runtime").JSX.Element;
