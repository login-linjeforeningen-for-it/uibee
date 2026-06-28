import type { ElementType } from 'react'
import Card from './card'
import IconBubble, { type IconBubbleTone } from './iconBubble'

type StatCardProps = {
    label: string
    value: string
    icon: ElementType
    tone?: IconBubbleTone
}

export default function StatCard({ label, value, icon, tone = 'slate' }: StatCardProps) {
    return (
        <Card className='p-4'>
            <div className='mb-3 flex items-center gap-3'>
                <IconBubble icon={icon} tone={tone} />
                <span className='text-sm font-medium text-login-200'>{label}</span>
            </div>
            <div className='truncate text-lg font-semibold text-login-50' title={value}>
                {value}
            </div>
        </Card>
    )
}
