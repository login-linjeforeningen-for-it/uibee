import { type JSX } from 'react';
export type InputProps = Omit<React.ComponentProps<'input'>, 'name'> & {
    name: string;
    label?: string;
    error?: string;
    className?: string;
    icon?: JSX.Element;
    info?: string;
    description?: string;
};
export default function Input(props: InputProps): import("react/jsx-runtime").JSX.Element;
