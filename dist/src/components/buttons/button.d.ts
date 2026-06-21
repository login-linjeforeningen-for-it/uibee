import type { JSX } from 'react';
type ButtonProps = {
    text: string;
    className?: string;
    icon: string | JSX.Element;
    path?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'success' | 'info';
    onClick?: (_: object | string) => void;
    disabled?: boolean;
};
export default function Button({ text, className, icon, path, variant, type, onClick, disabled }: ButtonProps): JSX.Element;
export {};
