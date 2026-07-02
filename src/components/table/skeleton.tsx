import type { Density, TableVariant } from './types'

type Column = { key: string; width?: string }
import { DENSITY_TD, DENSITY_TH, VARIANT_TBODY } from './constants'

type SkeletonProps = {
    columns: Column[]
    rows: number
    variant: TableVariant
    density: Density
    hasMenu: boolean
    hasSelect: boolean
}

export default function Skeleton({ columns, rows, variant, density, hasMenu, hasSelect }: SkeletonProps) {
    return (
        <tbody className={`block divide-y divide-login-600/15 ${VARIANT_TBODY[variant]}`}>
            {Array.from({ length: rows }).map((_, rowIdx) => (
                <tr key={rowIdx} className='flex w-full'>
                    {hasSelect && (
                        <td className='flex items-center justify-center'
                            style={{ width: '3rem', minWidth: '3rem', flexShrink: 0 }}>
                            <span className='block h-4 w-4 rounded animate-shimmer' />
                        </td>
                    )}
                    {columns.map((col, colIdx) => (
                        <td
                            key={col.key}
                            style={col.width ? { width: col.width, flexShrink: 0 } : undefined}
                            className={`
                                flex-1 min-w-0 flex items-center
                                ${DENSITY_TD[density]}
                            `}
                        >
                            <span
                                className='block h-4 rounded animate-shimmer'
                                style={{
                                    width: colIdx === 0
                                        ? `${55 + ((rowIdx * 17 + colIdx * 31) % 30)}%`
                                        : `${40 + ((rowIdx * 13 + colIdx * 23) % 40)}%`,
                                    animationDelay: `${(rowIdx * columns.length + colIdx) * 40}ms`,
                                }}
                            />
                        </td>
                    ))}
                    {hasMenu && (
                        <td className='flex items-center justify-end pr-3'
                            style={{ width: '3.5rem', minWidth: '3.5rem', flexShrink: 0 }}>
                            <span className='block h-5 w-5 rounded animate-shimmer' />
                        </td>
                    )}
                </tr>
            ))}
        </tbody>
    )
}
