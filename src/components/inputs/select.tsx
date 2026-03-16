'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useClickOutside } from '../../hooks'
import { ChevronDown, X, Search } from 'lucide-react'
import { FieldWrapper } from './shared'

export type Option = {
    value: string | number
    label: string
    image?: string
}

export type SelectProps = {
    label?: string
    name: string
    value?: string | number | null
    onChange?: (value: string | number | null) => void
    options: Option[]
    error?: string
    className?: string
    disabled?: boolean
    required?: boolean
    placeholder?: string
    info?: string
    description?: string
    clearable?: boolean
    searchable?: boolean
    textSize?: 'sm' | 'md'
}

export default function Select({
    label,
    name,
    value,
    onChange,
    options,
    error,
    className,
    disabled,
    required,
    placeholder = 'Select an option',
    info,
    description,
    clearable = true,
    searchable = true,
    textSize = 'sm',
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedOption, setSelectedOption] = useState<Option | undefined>(
        options.find(opt => opt.value === value)
    )

    useEffect(() => {
        if (!isOpen) {
            setSearchTerm('')
        }
    }, [isOpen])

    useEffect(() => {
        setSelectedOption(options.find(opt => opt.value === value))
    }, [value, options])

    const containerRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false))

    function handleSelect(option: Option) {
        if (disabled) return
        setSelectedOption(option)
        setIsOpen(false)
        if (onChange) {
            onChange(option.value)
        }
    }

    function handleClear(e: React.MouseEvent) {
        e.stopPropagation()
        if (disabled) return
        setSelectedOption(undefined)
        if (onChange) {
            onChange(null)
        }
    }

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <FieldWrapper
            label={label}
            name={name}
            required={required}
            info={info}
            description={description}
            error={error}
            textSize={textSize}
            className={className}
        >
            <div className='relative' ref={containerRef}>
                <button
                    type='button'
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    disabled={disabled}
                    aria-haspopup='listbox'
                    aria-expanded={isOpen}
                    aria-labelledby={label ? undefined : name}
                    className={`
                        w-full rounded-md bg-login-500/50 border border-login-500 
                        text-login-text text-left
                        focus:outline-none focus:border-login focus:ring-1 focus:ring-login
                        disabled:opacity-50 disabled:cursor-not-allowed
                        h-10.5 py-2 pl-3 pr-10
                        transition-all duration-200
                        flex items-center justify-between
                        ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                        ${!selectedOption ? 'text-login-200' : ''}
                    `}
                    title={label}
                >
                    <div className='flex items-center gap-2 truncate'>
                        {selectedOption?.image && (
                            <Image
                                src={selectedOption.image}
                                alt=''
                                width={30}
                                height={20}
                                className='rounded-xs object-cover shrink-0'
                            />
                        )}
                        <span className='truncate'>
                            {selectedOption ? selectedOption.label : placeholder}
                        </span>
                    </div>
                    <div className='absolute inset-y-0 right-0 flex items-center px-2 gap-1'>
                        {clearable && selectedOption && !disabled && (
                            <div
                                role='button'
                                onClick={handleClear}
                                className={`
                                    p-1 hover:bg-login-500 rounded-full text-login-200
                                    hover:text-red-400 transition-colors cursor-pointer
                                `}
                                title='Clear selection'
                            >
                                <X className='w-3 h-3' />
                            </div>
                        )}
                        <div className={`
                            text-login-200 pointer-events-none
                            transition-transform duration-200
                            ${isOpen ? 'rotate-180' : ''}
                        `}>
                            <ChevronDown className='w-4 h-4' />
                        </div>
                    </div>
                </button>

                {isOpen && (
                    <div className={`
                        absolute z-50 w-full mt-1 bg-login-600 border border-login-500
                        rounded-md shadow-lg max-h-60 overflow-hidden flex flex-col
                    `}>
                        {searchable && (
                            <div className='p-2 sticky top-0 bg-login-600 border-b border-login-500 z-10'>
                                <div className='relative'>
                                    <Search className='absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-login-200' />
                                    <input
                                        type='text'
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        placeholder='Search...'
                                        autoFocus
                                        className={`
                                            w-full bg-login-500/50 border border-login-500 rounded-md 
                                            py-1.5 pl-9 pr-3 text-sm text-login-text 
                                            focus:outline-none focus:border-login focus:ring-1 focus:ring-login
                                        `}
                                    />
                                </div>
                            </div>
                        )}
                        <div className='overflow-auto noscroll'>
                            {filteredOptions.length > 0 ? (
                                <ul className='py-1' role='listbox'>
                                    {filteredOptions.map((option) => (
                                        <li key={option.value} role='option' aria-selected={selectedOption?.value === option.value}>
                                            <button
                                                type='button'
                                                onClick={() => handleSelect(option)}
                                                className={`
                                                    w-full text-left px-3 py-2 text-sm
                                                    hover:bg-login-500 transition-colors duration-150
                                                    flex items-center gap-2
                                                    ${selectedOption?.value === option.value ? 'bg-login-500 text-login': 'text-login-text'}
                                                `}
                                            >
                                                {option.image && (
                                                    <Image
                                                        src={option.image}
                                                        alt=''
                                                        width={75}
                                                        height={25}
                                                        className='rounded-md object-cover shrink-0'
                                                    />
                                                )}
                                                <span className='truncate'>{option.label}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className='px-3 py-2 text-sm text-login-200'>
                                    {searchTerm ? 'No results found' : 'No options available'}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <input
                type='hidden'
                name={name}
                value={selectedOption?.value || ''}
                required={required}
            />
        </FieldWrapper>
    )
}
