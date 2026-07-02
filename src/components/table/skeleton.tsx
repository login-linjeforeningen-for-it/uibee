import type { Density, TableVariant } from './types'

type Column = { key: string; width?: string }
import { DENSITY_TD, VARIANT_TBODY, VARIANT_ROW_BORDER } from './constants'

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
        <tbody className={VARIANT_TBODY[variant]}>
            {Array.from({ length: rows }).map((_, rowIdx) => (
                <tr key={rowIdx}>
                    {hasSelect && (
                        <td className={`align-middle ${VARIANT_ROW_BORDER[variant]}`}
                            style={{ width: '3rem', minWidth: '3rem' }}>
                            <span className='block h-4 w-4 mx-auto rounded animate-shimmer' />
                        </td>
                    )}
                    {columns.map((col, colIdx) => (
                        <td
                            key={col.key}
                            style={col.width ? { width: col.width } : undefined}
                            className={`align-middle ${DENSITY_TD[density]} ${VARIANT_ROW_BORDER[variant]}`}
                        >
                            <span
                                className='block h-4 rounded animate-shimmer'
                                style={{
                                    width: colIdx === 0
                                        ? `${8 + ((rowIdx * 17 + colIdx * 31) % 5)}rem`
                                        : `${5 + ((rowIdx * 13 + colIdx * 23) % 5)}rem`,
                                    animationDelay: `${(rowIdx * columns.length + colIdx) * 40}ms`,
                                }}
                            />
                        </td>
                    ))}
                    {hasMenu && (
                        <td className={`align-middle pr-3 ${VARIANT_ROW_BORDER[variant]}`}
                            style={{ width: '3.5rem', minWidth: '3.5rem' }}>
                            <span className='block h-5 w-5 ml-auto rounded animate-shimmer' />
                        </td>
                    )}
                </tr>
            ))}
        </tbody>
    )
}
