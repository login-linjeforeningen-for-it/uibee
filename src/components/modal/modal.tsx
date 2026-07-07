'use client'

import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

type ModalSize = 'sm' | 'md' | 'lg'

type ModalProps = {
    isOpen: boolean
    onClose: () => void
    title?: string
    children: ReactNode
    footer?: ReactNode
    size?: ModalSize
}

const sizes: Record<ModalSize, string> = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
}

export default function Modal({ isOpen, onClose, title, children, footer, size = 'md' }: ModalProps) {
    useEffect(() => {
        if (!isOpen) return
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', handler)
        return () => document.removeEventListener('keydown', handler)
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div
            role='dialog'
            aria-modal='true'
            className='fixed inset-0 z-50 flex items-center justify-center'
            onClick={onClose}
        >
            <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />
            <div
                className={`
                    relative z-10 mx-4 w-full ${sizes[size]}
                    flex flex-col rounded-xl border border-login-500/50
                    bg-login-800 shadow-2xl
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <div className='flex items-center justify-between px-6 pt-5 pb-4 border-b border-login-500/25'>
                        <h2 className='text-login-50 text-base font-semibold leading-snug'>{title}</h2>
                        <button
                            type='button'
                            onClick={onClose}
                            className='
                                cursor-pointer rounded-md p-1.5
                                text-login-400 hover:text-login-100 hover:bg-login-600
                                transition-colors
                            '
                        >
                            <X className='w-4 h-4' />
                        </button>
                    </div>
                )}
                <div className='p-6'>{children}</div>
                {footer && (
                    <div className='px-6 pb-5 pt-4 border-t border-login-500/25'>
                        {footer}
                    </div>
                )}
            </div>
        </div>
    )
}
