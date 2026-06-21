import React, { ReactNode } from 'react';
export type NavDropdownProps = {
    children: ReactNode;
    title: string;
    className?: string;
};
export default function NavDropdown({ children, title, className }: NavDropdownProps): React.JSX.Element;
