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
    lang?: Language;
    disableLanguageToggle?: boolean;
    onlyLogo?: boolean;
    theme?: string;
    disableThemeToggle?: boolean;
    token?: string | null;
    profilePath?: string;
    loginPath: string;
    logoutPath: string;
    className?: string;
    innerClassName?: string;
    children: React.ReactNode;
    bubble: {
        lang?: BubbleContent;
        theme?: BubbleContent;
        login?: BubbleContent;
    };
};
export default function Navbar({ lang, onlyLogo, disableLanguageToggle, disableThemeToggle, token, profilePath, loginPath, logoutPath, className, innerClassName, children, bubble }: NavbarProps): import("react/jsx-runtime").JSX.Element;
export {};
