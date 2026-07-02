'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Suspense, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type { TableVariant } from './types'

export type PaginationProps = {
    totalRows: number
    pageSize: number
    variant?: TableVariant
    urlState?: boolean
    page?: number
    onPageChange?: (page: number) => void
}

type ShellProps = {
    page: number
    totalPages: number
    totalRows: number
    pageSize: number
    onPageChange: (page: number) => void
    variant: TableVariant
}

function computeTotalPages(totalRows: number, pageSize: number) {
    return Math.max(1, pageSize > 0 ? Math.ceil(totalRows / pageSize) : 1)
}

function pageRange(current: number, total: number): (number | '…')[] {
    const delta = 2
    const left  = Math.max(1, current - delta)
    const right = Math.min(total, current + delta)
    const pages: (number | '…')[] = []

    if (left > 1) { pages.push(1); if (left > 2) pages.push('…') }
    for (let i = left; i <= right; i++) pages.push(i)
    if (right < total) { if (right < total - 1) pages.push('…'); pages.push(total) }

    return pages
}

function PaginationShell({ page, totalPages, totalRows, pageSize, onPageChange, variant }: ShellProps) {
    const start = totalRows === 0 ? 0 : (page - 1) * pageSize + 1
    const end   = Math.min(page * pageSize, totalRows)
    const pages = pageRange(page, totalPages)

    const btnBase = `
        flex items-center justify-center rounded-md border text-sm transition-colors duration-100
        disabled:opacity-35 disabled:cursor-not-allowed
    `

    const btnStyle = variant === 'original'
        ? 'border-login-500/50 bg-login-700 hover:bg-login-600 text-login-100'
        : 'border-login-500/40 bg-transparent hover:bg-login-700/60 text-login-100'

    const pageActive = variant === 'original'
        ? 'border-login bg-login/10 text-login'
        : 'border-login text-login bg-transparent'

    const pageInactive = variant === 'original'
        ? 'border-login-500/50 bg-login-700 text-login-100 hover:bg-login-600'
        : 'border-transparent bg-transparent text-login-200 hover:text-login-75 hover:bg-login-700/60'

    return (
        <div className='flex items-center justify-between w-full gap-4 flex-wrap'>
            <span className='text-xs text-login-300 tabular-nums'>
                {totalRows === 0
                    ? 'No results'
                    : `${start}-${end} of ${totalRows}`
                }
            </span>

            <nav className='flex items-center gap-1.5' aria-label='Pagination'>
                <button
                    type='button'
                    aria-label='Previous page'
                    disabled={page <= 1}
                    onClick={() => onPageChange(page - 1)}
                    className={`${btnBase} ${btnStyle} h-8 w-8`}
                >
                    <ChevronLeft className='h-4 w-4' />
                </button>

                {pages.map((p, i) =>
                    p === '…' ? (
                        <span key={`ellipsis-${i}`} className='w-8 text-center text-sm text-login-400 select-none'>
                            …
                        </span>
                    ) : (
                        <button
                            key={p}
                            type='button'
                            aria-current={p === page ? 'page' : undefined}
                            onClick={() => onPageChange(p)}
                            className={`${btnBase} h-8 min-w-8 px-2 tabular-nums ${p === page ? pageActive : pageInactive}`}
                        >
                            {p}
                        </button>
                    )
                )}

                <button
                    type='button'
                    aria-label='Next page'
                    disabled={page >= totalPages}
                    onClick={() => onPageChange(page + 1)}
                    className={`${btnBase} ${btnStyle} h-8 w-8`}
                >
                    <ChevronRight className='h-4 w-4' />
                </button>
            </nav>
        </div>
    )
}

function PaginationLocalState({ totalRows, pageSize, variant = 'original' }: PaginationProps) {
    const [page, setPage] = useState(1)
    return (
        <PaginationShell
            page={page}
            totalPages={computeTotalPages(totalRows, pageSize)}
            totalRows={totalRows}
            pageSize={pageSize}
            onPageChange={setPage}
            variant={variant}
        />
    )
}

function PaginationURLState({ totalRows, pageSize, variant = 'original' }: PaginationProps) {
    const router     = useRouter()
    const pathname   = usePathname()
    const searchParams = useSearchParams()

    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10) || 1)

    function onPageChange(p: number) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', String(p))
        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <PaginationShell
            page={page}
            totalPages={computeTotalPages(totalRows, pageSize)}
            totalRows={totalRows}
            pageSize={pageSize}
            onPageChange={onPageChange}
            variant={variant}
        />
    )
}

export default function Pagination(props: PaginationProps) {
    const { totalRows, pageSize, variant = 'original', urlState, page, onPageChange } = props

    if (urlState) {
        const fallback = (
            <PaginationShell
                page={1}
                totalPages={computeTotalPages(totalRows, pageSize)}
                totalRows={totalRows}
                pageSize={pageSize}
                onPageChange={() => {}}
                variant={variant}
            />
        )
        return (
            <Suspense fallback={fallback}>
                <PaginationURLState {...props} />
            </Suspense>
        )
    }

    if (page !== undefined && onPageChange !== undefined) {
        return (
            <PaginationShell
                page={page}
                totalPages={computeTotalPages(totalRows, pageSize)}
                totalRows={totalRows}
                pageSize={pageSize}
                onPageChange={onPageChange}
                variant={variant}
            />
        )
    }

    return <PaginationLocalState {...props} />
}
