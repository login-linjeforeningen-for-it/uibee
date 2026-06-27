type PulseDotVariant = 'online' | 'offline' | 'warning' | 'unknown'

type PulseDotProps = {
    variant?: PulseDotVariant
    size?: 'sm' | 'md' | 'lg'
}

const variantColor: Record<PulseDotVariant, string> = {
    online:  'bg-green-500',
    offline: 'bg-red-500',
    warning: 'bg-login',
    unknown: 'bg-login-400',
}

const sizeClass = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
}

export default function PulseDot({ variant = 'online', size = 'md' }: PulseDotProps) {
    const color = variantColor[variant]
    const dotSize = sizeClass[size]

    return (
        <div className={`relative grid place-items-center ${dotSize}`}>
            <span className={`absolute inline-flex h-full w-full rounded-full ${color} opacity-50 animate-ping`} />
            <span className={`relative inline-flex rounded-full ${dotSize} ${color}`} />
        </div>
    )
}
