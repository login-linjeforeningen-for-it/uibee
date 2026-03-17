'use client'

import { useState, useEffect, type KeyboardEvent, type ChangeEvent } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import Input from './input'

interface SearchInputProps {
    placeholder?: string
    variant?: 'default' | 'minimal'
}

export default function SearchInput({ placeholder = 'Search...', variant = 'default' }: SearchInputProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [searchValue, setSearchValue] = useState(searchParams.get('q') || '')

    useEffect(() => {
        const currentQ = searchParams.get('q') || ''
        setSearchValue(currentQ)
    }, [searchParams])

    function handleSearch(value: string) {
        setSearchValue(value)
        const params = new URLSearchParams(searchParams.toString())
        if (value.trim()) {
            params.set('q', value.trim())
        } else {
            params.delete('q')
        }
        params.delete('page')
        router.push(`${pathname}?${params.toString()}`)
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            handleSearch(searchValue)
        }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setSearchValue(e.target.value)
    }

    if (variant === 'minimal') {
        return (
            <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5' />
                <input
                    type='text'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => handleSearch(searchValue)}
                    placeholder={placeholder}
                    className='pl-10 pr-4 py-2 border-b outline-none w-64'
                />
            </div>
        )
    } else {
        <Input
            name='search'
            icon={<Search className='w-5 h-5' />}
            value={searchValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={() => handleSearch(searchValue)}
            placeholder={placeholder}
        />
    }
}
