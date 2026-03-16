export type RadioProps = Omit<React.ComponentProps<'input'>, 'name'> & {
    name: string;
    label?: string;
    error?: string;
    info?: string;
    description?: string;
    className?: string;
};
export default function Radio(props: RadioProps): import("react/jsx-runtime").JSX.Element;
