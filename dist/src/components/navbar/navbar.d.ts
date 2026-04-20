import React from 'react';
import { Language } from 'uibee/components';
export type NavbarProps = {
    children: React.ReactNode;
    bubble?: {
        lang?: BubbleContent;
        theme?: BubbleContent;
        login?: BubbleContent;
    };
    className?: string;
    disableLanguageToggle?: boolean;
    disableThemeToggle?: boolean;
    innerClassName?: string;
    lang?: Language;
    loginPath: string;
    logoutPath: string;
    onlyLogo?: boolean;
    profilePath?: string;
    theme?: string;
    token?: string | null;
};
type BubbleContent = {
    condition: boolean;
    href: string;
    className: string;
    text: string;
    fill: string;
    stroke: string;
    x: string;
    hide: boolean;
    handleHide: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
};
export default function Navbar({ children, bubble, className, disableLanguageToggle, disableThemeToggle, innerClassName, lang, loginPath, logoutPath, onlyLogo, profilePath, token }: NavbarProps): import("react/jsx-runtime").JSX.Element;
export {};
