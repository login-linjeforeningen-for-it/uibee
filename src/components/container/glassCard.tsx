import type { ReactNode } from 'react'

type GlassCardProps = {
    children: ReactNode
    className?: string
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
    return (
        <div className={`rounded-xl border border-login-500/20 bg-login-800/60 backdrop-blur-sm ${className}`}>
            {children}
        </div>
    )
}
