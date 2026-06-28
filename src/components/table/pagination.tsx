'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type PaginationProps = {
    pageSize?: number
    totalRows?: number
}

export default function Pagination({
    pageSize = 10,
    totalRows,
}: PaginationProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const rawPage = parseInt(searchParams.get('page') || '1', 10)
    const initialPage = Math.max(1, Number.isNaN(rawPage) ? 1 : rawPage)
    const [current, setCurrent] = useState<number>(initialPage)

    const totalPages = Math.max(
        1,
        Math.ceil(totalRows !== undefined && pageSize > 0 ? totalRows / pageSize : 1)
    )

    useEffect(() => {
        const raw = parseInt(searchParams.get('page') || '1', 10)
        const p = Math.max(1, Number.isNaN(raw) ? 1 : raw)
        setCurrent(Math.max(1, Math.min(totalPages, p)))
    }, [searchParams, totalPages])

    function updateQuery(p: number) {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', String(p))
        router.push(`${pathname}?${params.toString()}`)
    }

    function goPrevious() {
        if (current <= 1) return
        const next = current - 1
        setCurrent(next)
        updateQuery(next)
    }

    function goNext() {
        if (current >= totalPages) return
        const next = current + 1
        setCurrent(next)
        updateQuery(next)
    }

    function setPage(p: number) {
        if (p === current) return
        setCurrent(p)
        updateQuery(p)
    }

    function getPages(curr: number, total: number): (number | string)[] {
        const delta = 2
        const left = Math.max(1, curr - delta)
        const right = Math.min(total, curr + delta)

        const pages: (number | string)[] = []

        if (left > 1) {
            pages.push(1)
            if (left > 2) pages.push('...')
        }

        for (let i = left; i <= right; i++) pages.push(i)

        if (right < total) {
            if (right < total - 1) pages.push('...')
            pages.push(total)
        }

        return pages
    }

    const pages = getPages(current, totalPages)

    const start = Math.max(1, (current - 1) * pageSize + 1)
    const end = Math.min(
        current * pageSize,
        totalRows !== undefined ? totalRows : current * pageSize
    )

    return (
        <div className='flex items-center justify-between w-full pt-4'>
            <div className='text-sm /70'>
                {totalRows !== undefined ? (
                    totalRows === 0 ? (
                        <span>Showing 0 results</span>
                    ) : (
                        <span>
                            Showing {start} to {end} of {totalRows} results
                        </span>
                    )
                ) : null}
            </div>

            <div className='flex items-center gap-3'>
                <button
                    type='button'
                    onClick={goPrevious}
                    disabled={current <= 1}
                    className={`
                        flex items-center gap-2 p-1 rounded-lg
                        bg-login-700 hover:bg-login-600 disabled:opacity-40
                        border border-login-500/50 text-sm transition-colors duration-150
                    `}
                >
                    <ChevronLeft className='h-5 w-5' />
                </button>

                <nav
                    className='flex items-center gap-1'
                    aria-label='Pagination'
                >
                    {pages.map((p, i) =>
                        typeof p === 'string' ? (
                            <span key={`e-${i}`} className='px-3 py-1 text-sm'>
                                {p}
                            </span>
                        ) : (
                            <button
                                key={p}
                                type='button'
                                onClick={() => setPage(p)}
                                aria-current={
                                    p === current ? 'page' : undefined
                                }
                                className={`
                                    px-3 py-1 rounded-lg text-sm border transition-colors duration-150
                                    ${p === current
                                        ? 'bg-login text-white border-login'
                                        : 'bg-login-700 border-login-500/50 hover:bg-login-600'
                                    }
                                `}
                            >
                                {p}
                            </button>
                        )
                    )}
                </nav>

                <button
                    type='button'
                    onClick={goNext}
                    disabled={current >= totalPages}
                    className={`
                        flex items-center gap-2 p-1 rounded-lg select-none
                        bg-login-700 hover:bg-login-600 disabled:opacity-40
                        border border-login-500/50 text-sm transition-colors duration-150
                    `}
                >
                    <ChevronRight className='h-5 w-5' />
                </button>
            </div>
        </div>
    )
}
