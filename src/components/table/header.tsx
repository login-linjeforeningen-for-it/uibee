import { ChevronDown, ChevronUp } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Column } from 'uibee/components'

type HeaderProps = {
    columns: Column[]
    hideMenu?: boolean
    variant?: 'default' | 'minimal'
}

function parseOrder(value: string | null) {
    return value === 'asc' || value === 'desc' ? value : undefined
}

export default function Header({ columns, hideMenu, variant = 'default' }: HeaderProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [column, setColumn] = useState(searchParams.get('column') ?? '')
    const [order, setOrder] = useState<'asc' | 'desc' | undefined>(parseOrder(searchParams.get('order')))

    useEffect(() => {
        if (!column || !order) {
            return
        }

        const params = new URLSearchParams(searchParams.toString())
        if (
            searchParams.get('order') !== order ||
            searchParams.get('column') !== column
        ) {
            params.set('order', order)
            params.set('column', column)
            params.set('page', '1')
            router.push(`${pathname}?${params.toString()}`)
        }
    }, [order, column, pathname, router, searchParams])

    function handleChange(key: string) {
        setColumn(key)
        setOrder((prev) => (key === column && prev === 'asc' ? 'desc' : 'asc'))
    }

    return (
        <thead className={`
            block w-full
            ${variant === 'default' ? 'bg-login-700' : 'bg-transparent border-b border-login-600'}
        `}>
            <tr className='flex w-full divide-x divide-transparent'>
                {columns.map((col) => {
                    const key = col.key
                    const value = col.label || (
                        key.length < 3
                            ? key.toUpperCase()
                            : `${key[0].toUpperCase()}${key
                                .slice(1)
                                .replaceAll('_', ' ')}`
                    )
                    return (
                        <th
                            key={key}
                            className={`
                                flex-1 min-w-0 px-6 py-3 text-xs font-medium uppercase tracking-wider text-left
                                ${variant === 'default' ? 'text-login-200' : 'text-login-100'}
                                ${variant === 'minimal' ? 'px-4!' : ''}
                            `}
                        >
                            <button
                                className='flex w-full min-w-0 flex-row items-center gap-2 group uppercase whitespace-nowrap'
                                onClick={() => handleChange(key)}
                            >
                                <span className='min-w-0 truncate'>{value}</span>
                                <span className='flex flex-col'>
                                    {column === key ? (
                                        order === 'asc' ? (
                                            <ChevronUp className='h-4 w-4' />
                                        ) : (
                                            <ChevronDown className='h-4 w-4' />
                                        )
                                    ) : (
                                        <ChevronUp
                                            className='h-4 w-4 stroke-login-200 opacity-0 group-hover:opacity-100'
                                        />
                                    )}
                                </span>
                            </button>
                        </th>
                    )
                })}
                {!hideMenu && <th className='shrink-0 w-16 px-6 py-3' />}
            </tr>
        </thead>
    )
}
