'use client'

import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'
import type { Column, SortState, Density, TableVariant } from './types'
import { DENSITY_TH, VARIANT_THEAD, VARIANT_THEAD_TH, VARIANT_HEAD_BORDER, VARIANT_HEAD_BG } from './constants'

type HeaderProps<T extends Record<string, unknown>> = {
    columns: Column<T>[]
    sort?: SortState
    onSort: (sort: SortState) => void
    hasMenu: boolean
    hasSelect: boolean
    hasExpand: boolean
    allSelected: boolean
    someSelected: boolean
    onSelectAll: () => void
    variant: TableVariant
    density: Density
}

// Title case from any key format: last_active → "Last Active", cpuPct → "Cpu Pct", id → "ID"
function formatLabel(key: string, label?: string): string {
    if (label) return label
    if (key.length <= 2) return key.toUpperCase()
    return key
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')  // split camelCase
        .replaceAll('_', ' ')
        .replaceAll('-', ' ')
        .split(/\s+/)
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
}

export default function Header<T extends Record<string, unknown>>({
    columns, sort, onSort, hasMenu, hasSelect, hasExpand,
    allSelected, someSelected, onSelectAll, variant, density,
}: HeaderProps<T>) {

    function handleSort(key: string) {
        const sameCol = sort?.column === key
        onSort({ column: key, order: sameCol && sort?.order === 'asc' ? 'desc' : 'asc' })
    }

    return (
        <thead className={VARIANT_THEAD[variant]}>
            <tr>

                {hasSelect && (
                    <th className={`sticky top-0 z-10 ${VARIANT_HEAD_BG[variant]} ${VARIANT_HEAD_BORDER[variant]}`}
                        style={{ width: '3rem', minWidth: '3rem' }}>
                        <div className='flex items-center justify-center'>
                            <button
                                type='button'
                                aria-label={allSelected ? 'Deselect all' : 'Select all'}
                                onClick={onSelectAll}
                                className={`
                                h-4 w-4 rounded border flex items-center justify-center transition-colors cursor-pointer
                                ${allSelected || someSelected
                        ? 'bg-login border-login text-white'
                        : 'border-login-400 bg-transparent hover:border-login-200'
                    }
                            `}
                            >
                                {someSelected && !allSelected && (
                                    <span className='block h-0.5 w-2 bg-white rounded-full' />
                                )}
                                {allSelected && (
                                    <svg className='h-3 w-3' viewBox='0 0 12 12' fill='none'>
                                        <path
                                            d='M2 6l3 3 5-5'
                                            stroke='currentColor'
                                            strokeWidth='1.5'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </th>
                )}

                {columns.map((col) => {
                    const sortable = col.sortable !== false
                    const isActive = sort?.column === col.key
                    const ariaSort = isActive
                        ? sort!.order === 'asc' ? 'ascending' : 'descending'
                        : 'none'

                    const alignClass =
                        col.align === 'right'  ? 'justify-end'    :
                            col.align === 'center' ? 'justify-center' : ''

                    return (
                        <th
                            key={col.key}
                            aria-sort={sortable ? ariaSort : undefined}
                            style={col.width ? { width: col.width } : undefined}
                            className={`
                                sticky top-0 z-10 ${VARIANT_HEAD_BG[variant]} ${VARIANT_HEAD_BORDER[variant]}
                                text-xs font-medium uppercase tracking-wider
                                ${DENSITY_TH[density]} ${VARIANT_THEAD_TH[variant]}
                            `}
                        >
                            {sortable ? (
                                <button
                                    type='button'
                                    className={`group inline-flex items-center gap-1.5 w-full cursor-pointer ${alignClass}`}
                                    onClick={() => handleSort(col.key)}
                                >
                                    <span className='whitespace-nowrap'>{formatLabel(col.key, col.label)}</span>
                                    <span className='shrink-0 text-current'>
                                        {isActive ? (
                                            sort!.order === 'asc'
                                                ? <ChevronUp className='h-3.5 w-3.5' />
                                                : <ChevronDown className='h-3.5 w-3.5' />
                                        ) : (
                                            <ChevronsUpDown className='h-3.5 w-3.5 opacity-0 group-hover:opacity-35 transition-opacity' />
                                        )}
                                    </span>
                                </button>
                            ) : (
                                <span className={`flex w-full whitespace-nowrap ${alignClass}`}>
                                    {formatLabel(col.key, col.label)}
                                </span>
                            )}
                        </th>
                    )
                })}

                {hasExpand && (
                    <th className={`sticky top-0 z-10 ${VARIANT_HEAD_BG[variant]} ${VARIANT_HEAD_BORDER[variant]}`}
                        style={{ width: '2.5rem', minWidth: '2.5rem' }}>
                        <span className={`
                            flex items-center justify-center
                            text-xs font-medium tracking-wider uppercase opacity-50
                            ${VARIANT_THEAD_TH[variant]}
                        `}>
                            +
                        </span>
                    </th>
                )}

                {hasMenu && (
                    <th aria-hidden='true'
                        className={`sticky top-0 z-10 ${VARIANT_HEAD_BG[variant]} ${VARIANT_HEAD_BORDER[variant]}`}
                        style={{ width: '3.5rem', minWidth: '3.5rem' }} />
                )}
            </tr>
        </thead>
    )
}
