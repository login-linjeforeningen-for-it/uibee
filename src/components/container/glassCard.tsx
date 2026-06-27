import type { ReactNode } from 'react'

type GlassCardProps = {
    children: ReactNode
    className?: string
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
    return (
        <section className={`rounded-xl border border-login-500/30 bg-login-800 ${className}`}>
            {children}
        </section>
    )
}
