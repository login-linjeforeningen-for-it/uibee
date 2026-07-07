type BadgeVariant =
    | 'default'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'amber'
    | 'violet'
    | 'blue'
    | 'emerald'
    | 'orange'

type BadgeProps = {
    text: string
    variant?: BadgeVariant
    size?: 'sm' | 'md'
    className?: string
}

const variants: Record<BadgeVariant, string> = {
    default:  'bg-login-600 text-login-100',
    success:  'bg-emerald-500/15 text-emerald-400',
    warning:  'bg-yellow-500/15 text-yellow-400',
    danger:   'bg-red-500/15 text-red-400',
    info:     'bg-sky-500/15 text-sky-400',
    amber:    'bg-amber-500/15 text-amber-400',
    violet:   'bg-violet-500/15 text-violet-400',
    blue:     'bg-blue-500/15 text-blue-400',
    emerald:  'bg-emerald-500/15 text-emerald-400',
    orange:   'bg-login/15 text-login',
}

const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
}

export default function Badge({ text, variant = 'default', size = 'sm', className = '' }: BadgeProps) {
    return (
        <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}>
            {text}
        </span>
    )
}
