'use client'

import { useState, useRef } from 'react'
import { X, ChevronDown, Check } from 'lucide-react'
import { FieldWrapper } from './shared'
import useClickOutside from '../../hooks/useClickOutside'

type Option = {
    label: string
    value: string
}

export type MultiSelectProps = {
    label?: string
    name: string
    options: Option[]
    value?: string[]
    onChange?: (value: string[]) => void
    placeholder?: string
    error?: string
    className?: string
    disabled?: boolean
    required?: boolean
    info?: string
    description?: string
    textSize?: 'sm' | 'md'
}

export default function MultiSelect({
    label,
    name,
    options,
    value = [],
    onChange,
    placeholder = 'Select…',
    error,
    className,
    disabled,
    required,
    info,
    description,
    textSize = 'sm',
}: MultiSelectProps) {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    useClickOutside(containerRef, () => setOpen(false))

    function toggleOption(optionValue: string) {
        if (!onChange) return
        if (value.includes(optionValue)) {
            onChange(value.filter((v) => v !== optionValue))
        } else {
            onChange([...value, optionValue])
        }
    }

    function removeOption(optionValue: string) {
        if (!onChange) return
        onChange(value.filter((v) => v !== optionValue))
    }


    return (
        <FieldWrapper
            label={label}
            name={name}
            required={required}
            info={info}
            description={description}
            error={error}
            className={className}
            textSize={textSize}
        >
            <div ref={containerRef} className='relative w-full'>
                <div
                    onClick={() => !disabled && setOpen((o) => !o)}
                    className={`
                        flex min-h-10 cursor-pointer items-center justify-between gap-2
                        rounded-md bg-login-500/50 border border-login-500 px-3 py-1.5
                        transition-all duration-150 select-none
                        ${open ? 'border-login/60 ring-1 ring-login/30' : ''}
                        ${error ? 'border-red-500/70' : ''}
                        ${disabled ? 'opacity-40 cursor-not-allowed' : ''}
                    `}
                >
                    <div className='flex flex-wrap gap-1.5'>
                        {value.length === 0 && (
                            <span className='text-sm text-login-200'>{placeholder}</span>
                        )}
                        {value.map((val) => {
                            const option = options.find((o) => o.value === val)
                            if (!option) return null
                            return (
                                <span
                                    key={val}
                                    className='
                                        flex items-center gap-1 rounded px-2 py-0.5 text-sm
                                        border border-login-500 bg-login-600 text-login-100
                                    '
                                >
                                    {option.label}
                                    {!disabled && (
                                        <button
                                            type='button'
                                            onClick={(e) => { e.stopPropagation(); removeOption(val) }}
                                            className='hover:text-red-300 transition-colors'
                                        >
                                            <X size={13} />
                                        </button>
                                    )}
                                </span>
                            )
                        })}
                    </div>
                    <ChevronDown
                        size={16}
                        className={`shrink-0 text-login-200 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
                    />
                </div>

                {open && options.length > 0 && (
                    <div className='
                        absolute z-50 mt-1 w-full max-h-60 overflow-auto
                        rounded-md border border-login-500/50 bg-login-800 shadow-lg
                    '>
                        {options.map((option) => {
                            const selected = value.includes(option.value)
                            return (
                                <div
                                    key={option.value}
                                    onClick={() => toggleOption(option.value)}
                                    className={`
                                        flex cursor-pointer items-center justify-between px-3 py-2 text-sm
                                        hover:bg-login-700 transition-colors select-none
                                        ${selected ? 'text-login-50' : 'text-login-100'}
                                    `}
                                >
                                    <span>{option.label}</span>
                                    {selected && <Check size={14} className='text-login shrink-0' />}
                                </div>
                            )
                        })}
                    </div>
                )}

                <input type='hidden' name={name} value={value.join(',')} />
            </div>
        </FieldWrapper>
    )
}
