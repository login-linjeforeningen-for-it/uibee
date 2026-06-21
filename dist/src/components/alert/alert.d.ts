import { ReactNode } from 'react';
type AlertProps = {
    children: ReactNode;
    variant?: 'warning' | 'info';
    className?: string;
};
export default function Alert({ children, variant, className, }: AlertProps): import("react").JSX.Element;
export {};
