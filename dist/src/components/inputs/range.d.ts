export type RangeProps = Omit<React.ComponentProps<'input'>, 'name'> & {
    name: string;
    label?: string;
    error?: string;
    className?: string;
    info?: string;
    description?: string;
    showValue?: boolean;
    textSize?: 'sm' | 'md';
};
export default function Range(props: RangeProps): import("react/jsx-runtime").JSX.Element;
