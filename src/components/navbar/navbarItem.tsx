'use client'

import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

export type NavItemProps = {
    href: string
    children: ReactNode
    external?: boolean
    target?: string
    rel?: string
    title?: string
    icon?: ReactNode
}

const commonStyling = 'list-none flex no-underline items-center gap-2 whitespace-nowrap cursor-pointer'

export default function NavItem({ href, children, external = false, target, rel, title, icon }: NavItemProps) {
    const linkProps = { href, target, rel, title }

    return (
        <>
            <Link {...linkProps} className='hidden 800px:flex'>
                <li className={`${commonStyling} text-base leading-4 p-3 font-bold transition-colors link-corner-hover
                    group-[.dropdown]:p-2.5 group-[.dropdown]:pr-3 group-[.dropdown]:pl-1`
                }>
                    {icon}
                    {children}
                    {external && <ArrowUpRight className='w-6 h-6 stroke-login' />}
                </li>
            </Link>

            <Link {...linkProps} className='800px:hidden'>
                <li className={`${commonStyling} text-2xl leading-6 overflow-hidden w-auto pl-4 rounded-[0.3rem] transition-all 
                    duration-600 opacity-100 h-16 py-5 group-[.dropdown]:p-0 group-[.dropdown]:text-lg group-[.dropdown]:h-auto 
                    group-[.dropdown]:py-2.5 group-[.dropdown]:pl-4`
                }>
                    {children}
                    {external && <ArrowUpRight className='w-6 h-6 stroke-login' />}
                </li>
            </Link>
        </>
    )
}
