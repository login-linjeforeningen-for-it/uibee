export type TextareaProps = Omit<React.ComponentProps<'textarea'>, 'name'> & {
    name: string;
    label?: string;
    error?: string;
    className?: string;
    info?: string;
    description?: string;
    type?: 'markdown' | 'json' | 'text';
};
export default function Textarea(props: TextareaProps): import("react/jsx-runtime").JSX.Element;
