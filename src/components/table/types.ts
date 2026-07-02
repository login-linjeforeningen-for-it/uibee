import type { ReactNode } from 'react'

export type TableColor = 'green' | 'yellow' | 'red' | 'blue' | 'gray' | 'orange' | 'purple'

export type Column<T extends Record<string, unknown> = Record<string, unknown>> = {
    key: keyof T & string
    label?: string
    sortable?: boolean
    width?: string
    align?: 'left' | 'center' | 'right'
    highlight?: Record<string, TableColor>
    render?: (value: unknown, row: T) => ReactNode
    truncate?: boolean
}

export type SortState = {
    column: string
    order: 'asc' | 'desc'
}

export type Density = 'compact' | 'comfortable' | 'spacious'
export type TableVariant = 'original' | 'modern'

export type TableProps<T extends Record<string, unknown> = Record<string, unknown>> = {
    data: T[]
    columns: Column<T>[]

    idKey?: keyof T & string

    variant?: TableVariant
    density?: Density
    striped?: boolean
    className?: string

    loading?: boolean
    loadingRows?: number
    emptyState?: ReactNode

    redirectPath?: string | { path: string; key?: string }
    onRowClick?: (row: T, id: string) => void

    renderExpandedRow?: (row: T) => ReactNode

    selectable?: boolean
    selectedIds?: string[]
    onSelectionChange?: (ids: string[]) => void

    // Controlled: provide sort + onSort (table does not manage sort state)
    // URL: provide urlState={true} (syncs ?column=&order= params, Next.js only)
    // Local: neither; manages sort state internally and sorts client-side
    urlState?: boolean
    sort?: SortState
    onSort?: (sort: SortState) => void

    // URL: totalRows from server, pageSize; table pushes ?page= to URL
    // Local: paginates data internally; totalRows inferred from data.length
    // Controlled: provide page + onPageChange + totalRows
    pageSize?: number
    totalRows?: number
    page?: number
    onPageChange?: (page: number) => void
    hidePagination?: boolean

    menuItems?: (row: T, id: string) => ReactNode
}

export type TableShellProps<T extends Record<string, unknown>> = {
    data: T[]
    columns: Column<T>[]
    idKey?: keyof T & string
    variant: TableVariant
    density: Density
    striped: boolean
    loading: boolean
    loadingRows: number
    emptyState?: ReactNode
    redirectPath?: string | { path: string; key?: string }
    onRowClick?: (row: T, id: string) => void
    renderExpandedRow?: (row: T) => ReactNode
    selectable: boolean
    selectedIds: string[]
    onSelectionChange: (ids: string[]) => void
    sort?: SortState
    onSort: (sort: SortState) => void
    page: number
    onPageChange: (page: number) => void
    totalRows: number
    pageSize: number
    hidePagination: boolean
    menuItems?: (row: T, id: string) => ReactNode
    className?: string
}

export type MenuAnchor = { top: number; right: number }
