import { ReactNode } from 'react'

type LeftBarPanelProps = {
    color: string
    children: ReactNode
    className?: string
}

export default function LeftBarPanel({ color, children, className = '' }: LeftBarPanelProps) {
    return (
        <div className={`bg-login-800 border border-login-500/30 border-l-2 rounded-sm ${color} ${className}`}>
            {children}
        </div>
    )
}
