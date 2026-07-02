'use client'

import React, { createContext, useContext, useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { MenuAnchor } from './types'

const MenuCtx = createContext<{ onClose?: () => void }>({})

type MenuProps = {
    ref: React.RefObject<HTMLDivElement | null>
    children: React.ReactNode
    anchor: MenuAnchor
    onClose?: () => void
}

export default function Menu({ ref, children, anchor, onClose }: MenuProps) {
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if (e.key === 'Escape') onClose?.()
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [onClose])

    return createPortal(
        <div
            ref={ref}
            role='menu'
            aria-orientation='vertical'
            style={{ top: anchor.top, right: anchor.right }}
            className='fixed z-[9999] w-44 overflow-hidden rounded-lg border border-login-500/60 bg-login-600 shadow-xl shadow-black/40'
        >
            <MenuCtx.Provider value={{ onClose }}>
                {children}
            </MenuCtx.Provider>
        </div>,
        document.body
    )
}

export function MenuButton({
    icon,
    text,
    hotKey,
    onClick,
    className = '',
}: {
    icon: React.ReactNode
    text: string
    hotKey?: string
    onClick: () => void
    className?: string
}) {
    const { onClose } = useContext(MenuCtx)

    useEffect(() => {
        if (!hotKey) return
        function handleKey(e: KeyboardEvent) {
            const tag = (e.target as HTMLElement).tagName
            if (tag === 'INPUT' || tag === 'TEXTAREA') return
            if (e.key.toLowerCase() === hotKey!.toLowerCase()) {
                e.preventDefault()
                onClick()
                onClose?.()
            }
        }
        window.addEventListener('keydown', handleKey)
        return () => window.removeEventListener('keydown', handleKey)
    }, [hotKey, onClick, onClose])

    return (
        <button
            role='menuitem'
            onClick={() => { onClick(); onClose?.() }}
            className={`
                flex w-full items-center justify-between px-3 py-2 text-sm
                text-login-75 transition-colors duration-100
                hover:bg-login-500 focus:bg-login-500 focus:outline-none
                first:rounded-t-lg last:rounded-b-lg
                ${className}
            `}
        >
            <span className='flex items-center gap-2'>
                <span className='h-4 w-4 shrink-0 flex items-center justify-center'>{icon}</span>
                {text}
            </span>
            {hotKey && (
                <kbd className='font-mono text-xs opacity-40'>{hotKey}</kbd>
            )}
        </button>
    )
}
