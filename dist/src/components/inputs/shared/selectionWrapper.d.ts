import { ReactNode } from 'react';
interface SelectionWrapperProps {
    label?: string;
    name: string;
    required?: boolean;
    info?: string;
    error?: string;
    description?: string;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    hideError?: boolean;
}
export default function SelectionWrapper({ label, name, required, info, error, description, children, className, disabled, hideError, }: SelectionWrapperProps): import("react/jsx-runtime").JSX.Element;
export {};
