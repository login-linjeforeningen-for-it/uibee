import { ReactNode } from 'react';
interface FieldWrapperProps {
    label?: string;
    name: string;
    required?: boolean;
    info?: string;
    error?: string;
    description?: string;
    textSize?: 'sm' | 'md';
    children: ReactNode;
    className?: string;
}
export default function FieldWrapper({ label, name, required, info, error, description, textSize, children, className, }: FieldWrapperProps): import("react/jsx-runtime").JSX.Element;
export {};
