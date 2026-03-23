'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import Link from 'next/link';
import LogoSmall from '../logo/logoSmall';
import LanguageToggle from '../toggle/language';
import ThemeToggle from '../toggle/theme';
import { LogOut, User } from 'lucide-react';
function hamburgerStyle(isOpen, isSecond) {
    return `bg-login-50 h-0.5 absolute w-8 transition-all duration-[400ms] left-2 ${isOpen
        ? `top-6 ${isSecond ? 'rotate-45' : '-rotate-45'}`
        : isSecond ? 'top-7' : 'top-4'}`;
}
export default function Navbar({ lang, onlyLogo, disableLanguageToggle, disableThemeToggle, token, profilePath, loginPath, logoutPath, className, innerClassName, children, }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (_jsx("div", { className: `${isMobileMenuOpen ? 'bg-[#181818f0]' : 'bg-[#18181899]'} backdrop-blur-xl fixed top-0 z-900 w-full ${className}`, children: _jsxs("div", { className: `flex w-full max-w-6xl m-auto p-2 transition duration-500 800px:justify-between 800px:p-4 ${isMobileMenuOpen ? 'h-screen bg-login-900/20 800px:h-20' : ''} ${innerClassName}
            `, children: [_jsx("div", { className: 'block h-12 p-1 800px:p-0', children: _jsx(Link, { href: '/', onClick: () => setIsMobileMenuOpen(false), children: _jsx(LogoSmall, {}) }) }), onlyLogo ? null : (_jsxs(_Fragment, { children: [_jsx("nav", { className: 'hidden 800px:flex 800px:justify-between 800px:items-center 800px:w-fill max-w-200', children: children }), _jsxs("nav", { className: 'flex w-[calc(100vw-8rem)] justify-end h-12 800px:w-fit', children: [!disableThemeToggle &&
                                    _jsx(ThemeToggle, {}), !disableLanguageToggle &&
                                    _jsx(LanguageToggle, { language: lang }), loginPath && logoutPath &&
                                    _jsx(AuthButton, { profilePath: profilePath, token: token, loginPath: loginPath, logoutPath: logoutPath })] }), _jsxs("button", { className: 'w-12 h-12 relative cursor-pointer bg-none border-none 800px:hidden', onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), children: [_jsx("div", { className: hamburgerStyle(isMobileMenuOpen) }), _jsx("div", { className: hamburgerStyle(isMobileMenuOpen, true) })] }), _jsx("nav", { className: `fixed top-16 w-[calc(100%-2rem)] max-w-140 mx-auto left-0 right-0 800px:hidden
                            transition-all duration-500 ease-in-out overflow-hidden 
                            ${isMobileMenuOpen ? 'max-h-[calc(100vh-4rem)] opacity-100' : 'max-h-0 opacity-0'}`, onClick: () => setIsMobileMenuOpen(false), children: React.Children.map(children, (child, index) => (_jsx("div", { className: `transition-all duration-500 ease-out ${isMobileMenuOpen
                                    ? 'opacity-100 transform translate-y-0'
                                    : 'opacity-0 transform -translate-y-4'}`, style: {
                                    transitionDelay: isMobileMenuOpen ? `${index * 80}ms` : '0ms'
                                }, children: child }, index))) })] }))] }) }));
}
function AuthButton({ profilePath, logoutPath, loginPath, token }) {
    return (_jsx("div", { className: 'rounded-[0.3rem] hover:bg-login-300/20 h-12 w-12', children: token ? (_jsxs(_Fragment, { children: [logoutPath &&
                    _jsx(Link, { href: logoutPath, prefetch: false, onClick: (e) => {
                            e.preventDefault();
                            window.location.href = logoutPath;
                        }, className: 'grid items-center justify-center h-full w-full', children: _jsx(LogOut, { size: 24 }) }), profilePath &&
                    _jsx(Link, { href: profilePath, className: 'grid items-center justify-center h-full w-full', children: _jsx(User, { size: 24 }) })] })) : (_jsx(Link, { href: loginPath, className: 'grid items-center justify-center h-full w-full', children: _jsx(User, { size: 24 }) })) }));
}
