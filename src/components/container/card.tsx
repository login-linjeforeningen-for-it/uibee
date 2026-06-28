import type { ReactNode } from 'react'

type CardProps = {
    children: ReactNode
    className?: string
}

export default function Card({ children, className = '' }: CardProps) {
    return (
        <section className={`rounded-xl border border-login-500/30 bg-login-500/50 ${className}`}>
            {children}
        </section>
    )
}
