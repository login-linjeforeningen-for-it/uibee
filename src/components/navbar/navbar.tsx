'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import LogoSmall from '@components/logo/logoSmall'
import LanguageToggle from '@components/toggle/language'
import ThemeToggle from '@components/toggle/theme'
import { Language } from 'uibee/components'
import { LogOut, User } from 'lucide-react'
import Bubble from './bubble'

type BubbleContent = {
    condition: boolean
    href: string
    className: string
    text: string
    fill: string
    stroke: string
}

function hamburgerStyle (isOpen: boolean, isSecond?: boolean) {
    return `bg-login-50 h-0.5 absolute w-8 transition-all duration-[400ms] left-2 ${
        isOpen
            ? `top-6 ${isSecond ? 'rotate-45' : '-rotate-45'}`
            : isSecond ? 'top-7' : 'top-4'
    }`
}

export type NavbarProps = {
    lang?: Language
    disableLanguageToggle?: boolean
    onlyLogo?: boolean
    theme?: string
    disableThemeToggle?: boolean
    token?: string | null
    profilePath?: string
    loginPath: string
    logoutPath: string
    className?: string
    innerClassName?: string
    children: React.ReactNode
    bubble: {
        lang?: BubbleContent
        theme?: BubbleContent
        login?: BubbleContent
    }
}

export default function Navbar({
    lang,
    onlyLogo,
    disableLanguageToggle,
    disableThemeToggle,
    token,
    profilePath,
    loginPath,
    logoutPath,
    className,
    innerClassName,
    children,
    bubble
}: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <div className={`${isMobileMenuOpen ? 'bg-[#181818f0]' : 'bg-[#18181899]'} backdrop-blur-xl fixed top-0 z-900 w-full ${className}`}>
            <div className={`flex w-full max-w-6xl m-auto p-2 transition duration-500 800px:justify-between 800px:p-4 ${
                isMobileMenuOpen ? 'h-screen bg-login-900/20 800px:h-20' : ''} ${innerClassName}
            `}>
                {/* Logo */}
                <div className='block h-12 p-1 800px:p-0'>
                    <Link
                        href='/'
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <LogoSmall />
                    </Link>
                </div>

                {onlyLogo ? null : (
                    <>
                        {/* Desktop Navigation */}
                        <nav className='hidden 800px:flex 800px:justify-between 800px:items-center 800px:w-fill max-w-200'>
                            {children}
                        </nav>

                        {/* Controls */}
                        <nav className='flex w-[calc(100vw-8rem)] justify-end h-12 800px:w-fit'>
                            {!disableThemeToggle &&
                                <ThemeToggle />
                            }
                            {bubble.theme?.condition && <Bubble
                                href={bubble.theme.href}
                                className={bubble.theme.className}
                                text={bubble.theme.text}
                                fill={bubble.theme.fill}
                                stroke={bubble.theme.stroke}
                            />}
                            {!disableLanguageToggle &&
                                <LanguageToggle
                                    language={lang}
                                />
                            }
                            {bubble.lang?.condition && <Bubble
                                href={bubble.lang.href}
                                className={bubble.lang.className}
                                text={bubble.lang.text}
                                fill={bubble.lang.fill}
                                stroke={bubble.lang.stroke}
                            />}
                            {loginPath && logoutPath &&
                                <AuthButton
                                    profilePath={profilePath}
                                    token={token}
                                    loginPath={loginPath}
                                    logoutPath={logoutPath}
                                />
                            }
                            {bubble.login?.condition && <Bubble
                                href={bubble.login.href}
                                className={bubble.login.className}
                                text={bubble.login.text}
                                fill={bubble.login.fill}
                                stroke={bubble.login.stroke}
                            />}
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            className='w-12 h-12 relative cursor-pointer bg-none border-none 800px:hidden'
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <div className={hamburgerStyle(isMobileMenuOpen)} />
                            <div className={hamburgerStyle(isMobileMenuOpen, true)} />
                        </button>

                        {/* Mobile Navigation */}
                        <nav className={`fixed top-16 w-[calc(100%-2rem)] max-w-140 mx-auto left-0 right-0 800px:hidden
                            transition-all duration-500 ease-in-out overflow-hidden 
                            ${isMobileMenuOpen ? 'max-h-[calc(100vh-4rem)] opacity-100' : 'max-h-0 opacity-0'}`}
                        onClick={() => setIsMobileMenuOpen(false)}>
                            {React.Children.map(children, (child, index) => (
                                <div
                                    key={index}
                                    className={`transition-all duration-500 ease-out ${
                                        isMobileMenuOpen
                                            ? 'opacity-100 transform translate-y-0'
                                            : 'opacity-0 transform -translate-y-4'
                                    }`}
                                    style={{
                                        transitionDelay: isMobileMenuOpen ? `${index * 80}ms` : '0ms'
                                    }}
                                >
                                    {child}
                                </div>
                            ))}
                        </nav>
                    </>
                )}
            </div>
        </div>
    )
}

type AuthButtonProps = {
    profilePath?: string
    logoutPath: string
    loginPath: string
    token?: string | null
}

function AuthButton({ profilePath, logoutPath, loginPath, token }: AuthButtonProps) {
    return (
        <div className='rounded-[0.3rem] hover:bg-login-300/20 h-12 w-12'>
            {token ? (
                <>
                    {logoutPath &&
                        <Link
                            href={logoutPath}
                            prefetch={false}
                            onClick={(e) => {
                                e.preventDefault()
                                window.location.href = logoutPath
                            }}
                            className='grid items-center justify-center h-full w-full'
                        >
                            <LogOut size={24} />
                        </Link>
                    }
                    {profilePath &&
                        <Link
                            href={profilePath}
                            className='grid items-center justify-center h-full w-full'
                        >
                            <User size={24} />
                        </Link>
                    }
                </>
            ) : (
                <Link
                    href={loginPath}
                    className='grid items-center justify-center h-full w-full'
                >
                    <User size={24} />
                </Link>
            )}
        </div>
    )
}
