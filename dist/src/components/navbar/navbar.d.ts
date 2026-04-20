import React from 'react';
import { Language } from 'uibee/components';
type BubbleContent = {
    condition: boolean;
    href: string;
    className: string;
    text: string;
    fill: string;
    stroke: string;
};
export type NavbarProps = {
    bubble?: {
        lang?: BubbleContent;
        theme?: BubbleContent;
        login?: BubbleContent;
    };
    children: React.ReactNode;
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
export default function Navbar({ lang, onlyLogo, disableLanguageToggle, disableThemeToggle, token, profilePath, loginPath, logoutPath, className, innerClassName, children, bubble }: NavbarProps): import("react/jsx-runtime").JSX.Element;
export {};
