export type CheckboxProps = Omit<React.ComponentProps<'input'>, 'name'> & {
    name: string;
    label?: string;
    error?: string;
    info?: string;
    description?: string;
    className?: string;
};
export default function Checkbox(props: CheckboxProps): import("react/jsx-runtime").JSX.Element;
