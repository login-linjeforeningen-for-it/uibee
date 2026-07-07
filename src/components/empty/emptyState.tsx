import type { ElementType, ReactNode } from 'react'

type EmptyStateProps = {
    icon?: ElementType
    title: string
    description?: string
    action?: ReactNode
    className?: string
}

export default function EmptyState({ icon: Icon, title, description, action, className = '' }: EmptyStateProps) {
    return (
        <div className={`flex flex-col items-center justify-center gap-3 py-12 text-center ${className}`}>
            {Icon && (
                <div className='mb-1 rounded-xl bg-login-600/30 p-3 text-login-400'>
                    <Icon className='h-7 w-7' />
                </div>
            )}
            <p className='text-sm font-semibold text-login-100'>{title}</p>
            {description && (
                <p className='max-w-xs text-xs leading-relaxed text-login-400'>{description}</p>
            )}
            {action && <div className='mt-2'>{action}</div>}
        </div>
    )
}
