type SpinnerProps = {
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-9 h-9 border-[3px]',
}

export default function Spinner({ size = 'md', className = '' }: SpinnerProps) {
    return (
        <div
            role='status'
            aria-label='Loading'
            className={`rounded-full border-login-500 border-t-login animate-spin ${sizes[size]} ${className}`}
        />
    )
}
