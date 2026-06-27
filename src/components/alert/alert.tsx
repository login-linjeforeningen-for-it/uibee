import { ReactNode } from 'react'
import { CircleAlert, Info } from 'lucide-react'
import LeftBarPanel from '@components/container/leftBarPanel'

type AlertProps = {
    children: ReactNode
    variant?: 'warning' | 'info'
    className?: string
}

const styles = {
    warning: {
        color: 'border-l-red-500',
        iconClass: 'w-4 h-4 shrink-0 stroke-red-400 mr-3 mt-0.5',
        Icon: CircleAlert,
    },
    info: {
        color: 'border-l-blue-500',
        iconClass: 'w-4 h-4 shrink-0 stroke-blue-400 mr-3 mt-0.5',
        Icon: Info,
    },
}

export default function Alert({
    children,
    variant = 'warning',
    className = '',
}: AlertProps) {
    const { color, iconClass, Icon } = styles[variant] ?? styles.warning

    return (
        <LeftBarPanel color={color} className={`flex items-start px-4 py-3 text-sm text-login-100 ${className}`}>
            <Icon className={iconClass} />
            <div className='leading-relaxed'>{children}</div>
        </LeftBarPanel>
    )
}
