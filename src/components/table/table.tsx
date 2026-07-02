'use client'

import { Suspense, useState, useMemo } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type { TableProps, TableShellProps, TableVariant, Density, SortState, Column } from './types'
import Header from './header'
import Body from './body'
import Skeleton from './skeleton'
import Empty from './empty'
import Pagination from './pagination'
import { resolveId } from './utils'
import { VARIANT_CONTAINER } from './constants'

function TableShell<T extends Record<string, unknown>>({
    data, columns, idKey, variant, density, striped, loading, loadingRows,
    emptyState, redirectPath, onRowClick, renderExpandedRow,
    selectable, selectedIds, onSelectionChange,
    sort, onSort, page, onPageChange, totalRows, pageSize, hidePagination,
    menuItems, className,
}: TableShellProps<T>) {
    const allIds = data.map(row =>
        resolveId(row, idKey as string | undefined, columns as Column<Record<string, unknown>>[])
    )
    const allIdsSet = useMemo(() => new Set(allIds), [allIds])

    const allSelected  = allIds.length > 0 && allIds.every(id => selectedIds.includes(id))
    const someSelected = !allSelected && allIds.some(id => selectedIds.includes(id))

    function handleSelectAll() {
        if (allSelected) {
            onSelectionChange(selectedIds.filter(id => !allIdsSet.has(id)))
        } else {
            onSelectionChange([...new Set([...selectedIds, ...allIds])])
        }
    }

    const isEmpty      = !loading && data.length === 0
    const showPagination = !hidePagination && pageSize > 0 && totalRows > 0

    const hasMenu   = Boolean(menuItems)
    const hasSelect = Boolean(selectable)
    const hasExpand = Boolean(renderExpandedRow)

    const paginationPad = variant === 'original' ? 'px-4 pb-4 pt-3' : 'pt-4'

    return (
        <div className={['flex flex-col min-h-0 w-full', VARIANT_CONTAINER[variant], className].filter(Boolean).join(' ')}>
            <div className='flex-1 min-h-0 overflow-x-auto'>
                <table className='min-w-full w-max flex flex-col flex-1 min-h-0 divide-y divide-login-600/20'>
                    <Header
                        columns={columns}
                        sort={sort}
                        onSort={onSort}
                        hasMenu={hasMenu}
                        hasSelect={hasSelect}
                        hasExpand={hasExpand}
                        allSelected={allSelected}
                        someSelected={someSelected}
                        onSelectAll={handleSelectAll}
                        variant={variant}
                        density={density}
                    />
                    {loading ? (
                        <Skeleton
                            columns={columns}
                            rows={loadingRows}
                            variant={variant}
                            density={density}
                            hasMenu={hasMenu}
                            hasSelect={hasSelect}
                        />
                    ) : isEmpty ? (
                        <Empty emptyState={emptyState} />
                    ) : (
                        <Body
                            data={data}
                            columns={columns}
                            idKey={idKey}
                            variant={variant}
                            density={density}
                            striped={striped}
                            redirectPath={redirectPath}
                            onRowClick={onRowClick}
                            renderExpandedRow={renderExpandedRow}
                            selectable={selectable}
                            selectedIds={selectedIds}
                            onSelectionChange={onSelectionChange}
                            menuItems={menuItems}
                        />
                    )}
                </table>
            </div>

            {showPagination && (
                <div className={paginationPad}>
                    <Pagination
                        page={page}
                        totalRows={totalRows}
                        pageSize={pageSize}
                        onPageChange={onPageChange}
                        variant={variant}
                    />
                </div>
            )}
        </div>
    )
}

// useInternalSelection: falls back to internal state when caller omits selectedIds or onSelectionChange.
function useInternalSelection<T extends Record<string, unknown>>(
    props: Pick<TableProps<T>, 'selectedIds' | 'onSelectionChange'>
) {
    const [internal, setInternal] = useState<string[]>([])
    return {
        selectedIds:       props.selectedIds       ?? internal,
        onSelectionChange: props.onSelectionChange ?? setInternal,
    }
}

function applyDefaults<T extends Record<string, unknown>>(props: TableProps<T>): {
    variant: TableVariant
    density: Density
    selectable: boolean
    loading: boolean
    loadingRows: number
    striped: boolean
    hidePagination: boolean
    pageSize: number
} {
    return {
        variant:        props.variant        ?? 'original',
        density:        props.density        ?? 'comfortable',
        selectable:     props.selectable     ?? false,
        loading:        props.loading        ?? false,
        loadingRows:    props.loadingRows    ?? (props.pageSize ?? 5),
        striped:        props.striped        ?? false,
        hidePagination: props.hidePagination ?? false,
        pageSize:       props.pageSize       ?? 0,
    }
}

function TableLocalState<T extends Record<string, unknown>>(props: TableProps<T>) {
    const defaults   = applyDefaults(props)
    const selection  = useInternalSelection(props)
    const [sort, setSort] = useState<SortState | undefined>(undefined)
    const [page, setPage] = useState(1)

    const ps      = defaults.pageSize
    const allRows = props.data.length

    const sorted = useMemo(() => {
        if (!sort) return props.data
        return [...props.data].sort((a, b) => {
            const av = a[sort.column]
            const bv = b[sort.column]
            const cmp = String(av ?? '').localeCompare(String(bv ?? ''), undefined, { numeric: true, sensitivity: 'base' })
            return sort.order === 'asc' ? cmp : -cmp
        })
    }, [props.data, sort])

    const displayData = ps > 0 ? sorted.slice((page - 1) * ps, page * ps) : sorted

    function handleSort(newSort: SortState) {
        setSort(newSort)
        setPage(1)
    }

    return (
        <TableShell
            {...props}
            {...defaults}
            {...selection}
            data={displayData}
            sort={sort}
            onSort={handleSort}
            page={page}
            onPageChange={setPage}
            totalRows={ps > 0 ? allRows : (props.totalRows ?? allRows)}
        />
    )
}

function TableURLState<T extends Record<string, unknown>>(props: TableProps<T>) {
    const defaults   = applyDefaults(props)
    const selection  = useInternalSelection(props)
    const router     = useRouter()
    const pathname   = usePathname()
    const searchParams = useSearchParams()

    const urlColumn = searchParams.get('column') ?? ''
    const urlOrder  = (searchParams.get('order') ?? 'asc') as 'asc' | 'desc'
    const urlPage   = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1)
    const sort: SortState | undefined = urlColumn ? { column: urlColumn, order: urlOrder } : undefined

    function handleSort(newSort: SortState) {
        const p = new URLSearchParams(searchParams.toString())
        p.set('column', newSort.column)
        p.set('order', newSort.order)
        p.set('page', '1')
        router.replace(`${pathname}?${p.toString()}`)
    }

    function handlePageChange(newPage: number) {
        const p = new URLSearchParams(searchParams.toString())
        p.set('page', String(newPage))
        router.replace(`${pathname}?${p.toString()}`)
    }

    return (
        <TableShell
            {...props}
            {...defaults}
            {...selection}
            sort={sort}
            onSort={handleSort}
            page={urlPage}
            onPageChange={handlePageChange}
            totalRows={props.totalRows ?? props.data.length}
        />
    )
}

function TableControlled<T extends Record<string, unknown>>(props: TableProps<T>) {
    const defaults  = applyDefaults(props)
    const selection = useInternalSelection(props)
    return (
        <TableShell
            {...props}
            {...defaults}
            {...selection}
            sort={props.sort}
            onSort={props.onSort!}
            page={props.page ?? 1}
            onPageChange={props.onPageChange ?? (() => {})}
            totalRows={props.totalRows ?? props.data.length}
        />
    )
}

export function Table<T extends Record<string, unknown> = Record<string, unknown>>(props: TableProps<T>) {
    if (props.sort !== undefined || props.onSort !== undefined) {
        return <TableControlled {...props} />
    }

    if (props.urlState) {
        const defaults = applyDefaults(props)
        const fallback = (
            <TableShell
                {...props}
                {...defaults}
                selectedIds={props.selectedIds ?? []}
                onSelectionChange={props.onSelectionChange ?? (() => {})}
                sort={undefined}
                onSort={() => {}}
                page={1}
                onPageChange={() => {}}
                totalRows={props.totalRows ?? props.data.length}
            />
        )
        return (
            <Suspense fallback={fallback}>
                <TableURLState {...props} />
            </Suspense>
        )
    }

    return <TableLocalState {...props} />
}

export { MenuButton } from './menu'
export type { TableProps, Column, SortState, TableVariant, Density, TableColor } from './types'
