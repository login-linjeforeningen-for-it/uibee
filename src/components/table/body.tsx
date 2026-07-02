'use client'

import React, { useState, useRef, useEffect, useCallback, useMemo, type RefObject } from 'react'
import { useRouter } from 'next/navigation'
import { EllipsisVertical, ChevronDown } from 'lucide-react'
import type { Column, Density, TableVariant, MenuAnchor, TableShellProps } from './types'
import { HIGHLIGHT, DENSITY_TD, VARIANT_TBODY, VARIANT_ROW_HOVER, VARIANT_ROW_STRIPED } from './constants'
import { formatValue } from './format'
import { resolveId } from './utils'
import Menu from './menu'

function useClickOutside(ref: RefObject<HTMLElement | null>, cb: () => void, enabled: boolean) {
    useEffect(() => {
        if (!enabled) return
        function handler(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) cb()
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [ref, cb, enabled])
}

function resolveRedirectUrl(
    redirectPath: TableShellProps<Record<string, unknown>>['redirectPath'],
    row: Record<string, unknown>,
    id: string
): string | null {
    if (!redirectPath) return null
    const cfg = typeof redirectPath === 'string'
        ? { path: redirectPath, key: undefined }
        : redirectPath
    if (!cfg.path) return null
    const rid = cfg.key ? String(row[cfg.key] ?? id) : id
    return cfg.path.includes('?') ? `${cfg.path}${rid}` : `${cfg.path}/${rid}`
}

function Cell<T extends Record<string, unknown>>({
    col,
    row,
    density,
}: {
    col: Column<T>
    row: T
    density: Density
}) {
    const value = row[col.key]
    // Truncate: opt-in, only applied when col.truncate === true
    const shouldTruncate = col.truncate === true
    const align = col.align ?? 'left'

    const wrapperAlign =
        align === 'right'  ? 'text-right'  :
        align === 'center' ? 'text-center' : ''

    let content: React.ReactNode

    if (col.render) {
        // Custom renderer: caller is responsible for alignment
        content = col.render(value, row)
    } else if (col.highlight) {
        const colorName = col.highlight[String(value)] ?? col.highlight['default']
        const formatted = String(formatValue(col.key, value))
        if (colorName) {
            content = (
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${HIGHLIGHT[colorName]}`}>
                    {formatted}
                </span>
            )
        } else {
            content = (
                <span className={shouldTruncate ? 'block truncate' : 'whitespace-nowrap'}>
                    {formatted}
                </span>
            )
        }
    } else {
        const formatted = formatValue(col.key, value)
        content = (
            <span className={shouldTruncate ? 'block truncate' : 'whitespace-nowrap'}>
                {formatted === null || formatted === undefined ? '-' : String(formatted)}
            </span>
        )
    }

    return (
        <td
            style={col.width ? { width: col.width, flexShrink: 0 } : undefined}
            className={`
                ${col.width ? '' : 'flex-1'} ${shouldTruncate ? 'min-w-0' : ''} flex items-center text-sm text-login-75
                ${DENSITY_TD[density]}
            `}
        >
            {/* w-full fills the column; text-align handles alignment */}
            <div className={`min-w-0 w-full ${wrapperAlign}`}>
                {content}
            </div>
        </td>
    )
}

type BodyProps<T extends Record<string, unknown>> = Pick<
    TableShellProps<T>,
    'data' | 'columns' | 'idKey' | 'variant' | 'density' | 'striped' |
    'redirectPath' | 'onRowClick' | 'renderExpandedRow' |
    'selectable' | 'selectedIds' | 'onSelectionChange' |
    'menuItems'
>

export default function Body<T extends Record<string, unknown>>({
    data, columns, idKey, variant, density, striped,
    redirectPath, onRowClick, renderExpandedRow,
    selectable, selectedIds, onSelectionChange,
    menuItems,
}: BodyProps<T>) {
    const router = useRouter()
    const [openMenuId, setOpenMenuId] = useState<string | null>(null)
    const [anchor, setAnchor] = useState<MenuAnchor | null>(null)
    const [expandedId, setExpandedId] = useState<string | null>(null)

    const menuRef = useRef<HTMLDivElement>(null)
    const tbodyRef = useRef<HTMLTableSectionElement>(null)
    const menuWasOpenOnMouseDown = useRef(false)

    const closeMenu = useCallback(() => setOpenMenuId(null), [])
    useClickOutside(menuRef as RefObject<HTMLElement>, closeMenu, openMenuId !== null)

    useEffect(() => {
        const el = tbodyRef.current
        if (!el) return
        el.addEventListener('scroll', closeMenu)
        return () => el.removeEventListener('scroll', closeMenu)
    }, [closeMenu])

    function openMenu(id: string, coords: MenuAnchor) {
        setAnchor(coords)
        setOpenMenuId(id)
    }

    const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds])

    function toggleSelect(id: string) {
        const next = selectedSet.has(id)
            ? selectedIds.filter(s => s !== id)
            : [...selectedIds, id]
        onSelectionChange(next)
    }

    const hasMenu   = Boolean(menuItems)
    const hasExpand = Boolean(renderExpandedRow)

    return (
        <tbody
            ref={tbodyRef}
            className={`block overflow-y-auto flex-1 min-h-0 divide-y ${VARIANT_TBODY[variant]}`}
        >
            {data.map((row, rowIdx) => {
                const id = resolveId(row as Record<string, unknown>, idKey as string | undefined, columns as Column<Record<string, unknown>>[])
                const url = resolveRedirectUrl(redirectPath, row as Record<string, unknown>, id)
                const isClickable = Boolean(url || onRowClick || hasExpand)
                const isMenuOpen  = openMenuId === id
                const isExpanded  = expandedId  === id
                const isSelected  = selectable && selectedSet.has(id)
                const expandedContent = renderExpandedRow?.(row)

                const rowClass = [
                    'flex w-full transition-colors duration-100',
                    isClickable ? 'cursor-pointer' : '',
                    VARIANT_ROW_HOVER[variant],
                    striped ? VARIANT_ROW_STRIPED[variant] : '',
                    isSelected ? 'bg-login/5' : '',
                ].filter(Boolean).join(' ')

                return (
                    <React.Fragment key={id + rowIdx}>
                        <tr
                            className={rowClass}
                            onMouseEnter={() => { if (url) router.prefetch(url) }}
                            onMouseDown={() => {
                                menuWasOpenOnMouseDown.current = openMenuId !== null
                            }}
                            onClick={() => {
                                if (menuWasOpenOnMouseDown.current) {
                                    menuWasOpenOnMouseDown.current = false
                                    return
                                }
                                if (hasExpand) {
                                    setExpandedId(isExpanded ? null : id)
                                    return
                                }
                                if (onRowClick) { onRowClick(row, id); return }
                                if (url) router.push(url)
                            }}
                            onContextMenu={(e) => {
                                if (!hasMenu) return
                                e.preventDefault()
                                openMenu(id, { top: e.clientY, right: window.innerWidth - e.clientX })
                            }}
                        >
                            {selectable && (
                                <td className='flex items-center justify-center'
                                    style={{ width: '3rem', minWidth: '3rem', flexShrink: 0 }}>
                                    <button
                                        type='button'
                                        aria-label={isSelected ? 'Deselect row' : 'Select row'}
                                        aria-checked={isSelected}
                                        role='checkbox'
                                        onClick={(e) => { e.stopPropagation(); toggleSelect(id) }}
                                        className={`
                                            h-4 w-4 rounded border flex items-center justify-center transition-colors cursor-pointer
                                            ${isSelected
                                                ? 'bg-login border-login text-white'
                                                : 'border-login-400 bg-transparent hover:border-login-100'
                                            }
                                        `}
                                    >
                                        {isSelected && (
                                            <svg className='h-3 w-3' viewBox='0 0 12 12' fill='none'>
                                                <path d='M2 6l3 3 5-5' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                                            </svg>
                                        )}
                                    </button>
                                </td>
                            )}

                            {columns.map((col) => (
                                <Cell key={col.key} col={col} row={row} density={density} />
                            ))}

                            {hasExpand && (
                                <td className='flex items-center justify-center'
                                    style={{ width: '2.5rem', minWidth: '2.5rem', flexShrink: 0 }}>
                                    <ChevronDown className={`
                                        h-4 w-4 transition-transform duration-200
                                        ${isExpanded ? 'rotate-180 text-login' : 'text-login-400'}
                                    `} />
                                </td>
                            )}

                            {hasMenu && (
                                <td className='flex items-center justify-end pr-3'
                                    style={{ width: '3.5rem', minWidth: '3.5rem', flexShrink: 0 }}>
                                    <div className='relative'>
                                        <button
                                            type='button'
                                            aria-label='Row actions'
                                            aria-expanded={isMenuOpen}
                                            aria-haspopup='menu'
                                            onMouseDown={(e) => e.nativeEvent.stopImmediatePropagation()}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                if (isMenuOpen) {
                                                    setOpenMenuId(null)
                                                } else {
                                                    const rect = e.currentTarget.getBoundingClientRect()
                                                    openMenu(id, { top: rect.bottom + 4, right: window.innerWidth - rect.right })
                                                }
                                            }}
                                            className={`
                                                p-1.5 rounded flex items-center justify-center transition-colors
                                                ${isMenuOpen
                                                    ? 'bg-login-500 text-login-75'
                                                    : 'text-login-300 hover:bg-login-500/60 hover:text-login-75'
                                                }
                                            `}
                                        >
                                            <EllipsisVertical className='h-4 w-4' />
                                        </button>
                                        {isMenuOpen && anchor && (
                                            <Menu ref={menuRef} anchor={anchor} onClose={closeMenu}>
                                                {menuItems!(row, id)}
                                            </Menu>
                                        )}
                                    </div>
                                </td>
                            )}
                        </tr>

                        {hasExpand && isExpanded && (
                            <tr className='flex w-full bg-login-700/25 border-b border-login-600/20'>
                                <td
                                    className='w-full px-6 py-4'
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {expandedContent}
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                )
            })}
        </tbody>
    )
}
