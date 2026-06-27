import Link from 'next/link'
import type { JSX } from 'react'

type ButtonProps = {
    text?: string
    className?: string
    icon?: string | JSX.Element
    path?: string
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary' | 'warning' | 'danger' | 'success' | 'info'
    onClick?: (e: React.MouseEvent) => void
    disabled?: boolean
}

const variants = {
    primary:   'bg-login text-white hover:brightness-110',
    secondary: 'bg-login-500 text-login-50 hover:bg-login-400',
    warning:   'bg-yellow-500 text-black hover:brightness-110',
    danger:    'bg-red-600 text-white hover:brightness-110',
    success:   'bg-green-600 text-white hover:brightness-110',
    info:      'bg-blue-600 text-white hover:brightness-110',
}

const base = 'cursor-pointer px-4 rounded-md h-9 flex items-center justify-center gap-2 select-none text-sm font-medium transition-all duration-150 w-fit'
const disabledCls = 'opacity-40 cursor-not-allowed pointer-events-none'

const iconWrap = (icon: ButtonProps['icon']) =>
    icon ? <span className='[&>svg]:w-4 [&>svg]:h-4 flex items-center'>{icon}</span> : null

export default function Button({
    text,
    className,
    icon,
    path,
    variant = 'primary',
    type,
    onClick,
    disabled,
}: ButtonProps) {
    const color = variants[variant]
    const cls = `${base} ${color} ${disabled ? disabledCls : ''} ${className || ''}`

    if (!path) {
        return (
            <button
                type={type || 'button'}
                disabled={disabled}
                onClick={onClick}
                aria-label={text}
                className={cls}
            >
                {iconWrap(icon)}
                {text}
            </button>
        )
    }

    if (disabled) {
        return (
            <div className={cls}>
                {iconWrap(icon)}
                {text}
            </div>
        )
    }

    return (
        <Link href={path} className={`${base} ${color} ${className || ''}`}>
            {iconWrap(icon)}
            {text}
        </Link>
    )
}

