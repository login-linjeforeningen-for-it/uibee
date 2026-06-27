'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

const GroupContext = createContext(false)

type AccordionProps = {
    title: ReactNode
    children: ReactNode
    defaultOpen?: boolean
    className?: string
}

type AccordionGroupProps = {
    children: ReactNode
    className?: string
}

export function AccordionGroup({ children, className = '' }: AccordionGroupProps) {
    return (
        <GroupContext.Provider value={true}>
            <div className={`rounded-lg border border-login-500/40 overflow-hidden divide-y divide-login-500/25 ${className}`}>
                {children}
            </div>
        </GroupContext.Provider>
    )
}

export default function Accordion({ title, children, defaultOpen = false, className = '' }: AccordionProps) {
    const [open, setOpen] = useState(defaultOpen)
    const grouped = useContext(GroupContext)

    return (
        <div className={grouped ? className : `rounded-lg border border-login-500/40 overflow-hidden ${className}`}>
            <button
                type='button'
                onClick={() => setOpen((o) => !o)}
                className='flex w-full cursor-pointer items-center justify-between bg-login-800 px-4 py-3 text-left transition-colors duration-150 hover:bg-login-700 select-none'
            >
                <div className='text-sm font-medium text-login-50'>{title}</div>
                <ChevronDown
                    size={16}
                    className={`shrink-0 text-login-300 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
            </button>
            <div className={`overflow-hidden bg-login-900 transition-all duration-200 ${open ? 'max-h-[9999px]' : 'max-h-0'}`}>
                <div className='px-4 py-3 text-sm text-login-100'>
                    {children}
                </div>
            </div>
        </div>
    )
}
