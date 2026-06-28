'use client'

import { useState, type ReactNode } from 'react'

type Tab = {
    id: string
    label: ReactNode
}

type TabsProps = {
    tabs: Tab[]
    defaultTab?: string
    activeTab?: string
    onTabChange?: (id: string) => void
    children: ReactNode
    className?: string
}

type TabPanelProps = {
    id: string
    activeTab: string
    children: ReactNode
}

export function Tabs({ tabs, defaultTab, activeTab: controlledTab, onTabChange, children, className = '' }: TabsProps) {
    const [internalTab, setInternalTab] = useState(defaultTab ?? tabs[0]?.id ?? '')
    const activeTab = controlledTab ?? internalTab

    function handleTabChange(id: string) {
        if (!controlledTab) setInternalTab(id)
        onTabChange?.(id)
    }

    return (
        <div className={className}>
            <div className='flex gap-1 rounded-md bg-login-500/50 border border-login-500/40 p-1 w-fit'>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type='button'
                        onClick={() => handleTabChange(tab.id)}
                        className={`
                            px-3 py-1.5 rounded text-sm font-medium transition-all duration-150 cursor-pointer select-none
                            ${activeTab === tab.id
                                ? 'bg-login text-white shadow-sm'
                                : 'text-login-200 hover:text-login-50 hover:bg-login-600'
                            }
                        `}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className='mt-3'>
                {children}
            </div>
        </div>
    )
}

export function TabPanel({ id, activeTab, children }: TabPanelProps) {
    if (activeTab !== id) return null
    return <div>{children}</div>
}
