'use client'

import { TriangleAlert } from 'lucide-react'

type ConfirmPopupProps = {
    isOpen: boolean
    header: string
    description?: string
    confirmText?: string
    cancelText?: string
    onConfirm: () => void
    onCancel: () => void
    variant?: 'danger' | 'warning' | 'default'
}

export default function ConfirmPopup({
    isOpen,
    header,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    variant = 'default',
}: ConfirmPopupProps) {
    if (!isOpen) return null

    const confirmClass =
        variant === 'danger'
            ? 'bg-red-600 hover:brightness-110 text-white'
            : variant === 'warning'
                ? 'bg-yellow-500 hover:brightness-110 text-black'
                : 'bg-login hover:brightness-110 text-white'

    return (
        <div
            role='dialog'
            aria-modal='true'
            aria-labelledby='confirm-popup-header'
            className='fixed inset-0 z-50 flex items-center justify-center'
            onClick={onCancel}
        >
            <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />

            <div
                className='
                    relative z-10 w-full max-w-md mx-4
                    bg-login-800 border border-login-500/50 rounded-xl
                    shadow-2xl p-6 flex flex-col gap-4
                '
                onClick={(e) => e.stopPropagation()}
            >
                <div className='flex items-start gap-3'>
                    {variant !== 'default' && (
                        <TriangleAlert
                            className={`w-5 h-5 shrink-0 mt-0.5 ${variant === 'danger' ? 'stroke-red-400' : 'stroke-yellow-400'}`}
                        />
                    )}
                    <h2
                        id='confirm-popup-header'
                        className='text-login-50 text-base font-semibold leading-snug'
                    >
                        {header}
                    </h2>
                </div>

                {description && (
                    <p className='text-login-200 text-sm leading-relaxed'>
                        {description}
                    </p>
                )}

                <div className='flex justify-end gap-2 mt-1'>
                    <button
                        type='button'
                        onClick={onCancel}
                        className='
                            cursor-pointer px-4 py-1.5 rounded-md text-sm font-medium
                            bg-login-600 hover:bg-login-500 text-login-100
                            transition-colors duration-150 select-none
                        '
                    >
                        {cancelText}
                    </button>

                    <button
                        type='button'
                        onClick={onConfirm}
                        className={`
                            cursor-pointer px-4 py-1.5 rounded-md text-sm font-medium
                            transition-all duration-150 select-none
                            ${confirmClass}
                        `}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}
