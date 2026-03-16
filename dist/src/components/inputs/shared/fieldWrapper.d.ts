import { ReactNode } from 'react';
interface FieldWrapperProps {
    label?: string;
    name: string;
    required?: boolean;
    info?: string;
    error?: string;
    description?: string;
    children: ReactNode;
    className?: string;
}
export default function FieldWrapper({ label, name, required, info, error, description, children, className, }: FieldWrapperProps): import("react/jsx-runtime").JSX.Element;
export {};
