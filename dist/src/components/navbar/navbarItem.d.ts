import { ReactNode } from 'react';
export type NavItemProps = {
    href: string;
    children: ReactNode;
    external?: boolean;
    target?: string;
    rel?: string;
    title?: string;
    icon?: ReactNode;
};
export default function NavItem({ href, children, external, target, rel, title, icon }: NavItemProps): import("react").JSX.Element;
