'use client'

import { useState, KeyboardEvent, ChangeEvent } from 'react'
import { X } from 'lucide-react'
import { FieldWrapper } from './shared'

export type TagInputProps = {
    label?: string
    name: string
    value?: string[]
    onChange?: (value: string[]) => void
    placeholder?: string
    error?: string
    className?: string
    disabled?: boolean
    required?: boolean
    info?: string
    description?: string
}

export default function TagInput({
    label,
    name,
    value = [],
    onChange,
    placeholder = 'Add...',
    error,
    className,
    disabled,
    required,
    info,
    description,
}: TagInputProps) {
    const [inputValue, setInputValue] = useState('')

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if ((e.key === 'Enter' || e.key === ',') && inputValue.trim()) {
            e.preventDefault()
            const val = inputValue.trim().replace(/,$/, '')
            if (val && !value.includes(val)) {
                const newValue = [...value, val]
                if (onChange) onChange(newValue)
            }
            setInputValue('')
        } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
            const newValue = value.slice(0, -1)
            if (onChange) onChange(newValue)
        }
    }

    function removeTag(index: number) {
        if (disabled) return
        const newValue = value.filter((_, i) => i !== index)
        if (onChange) onChange(newValue)
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
        >
            <div
                className={`
                    flex flex-wrap gap-2 p-2 rounded-md bg-login-500/50 border border-login-500 
                    text-login-text min-h-10.5
                    focus-within:border-login focus-within:ring-1 focus-within:ring-login
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-200
                    ${error ? 'border-red-500 focus-within:border-red-500 focus-within:ring-red-500' : ''}
                `}
            >
                {value.map((tag, index) => (
                    <span
                        key={index}
                        className='flex items-center gap-1 px-2 py-1 bg-login rounded text-sm text-white'
                    >
                        {tag}
                        {!disabled && (
                            <button
                                type='button'
                                onClick={() => removeTag(index)}
                                className='hover:text-red-200 transition-colors'
                            >
                                <X size={14} />
                            </button>
                        )}
                    </span>
                ))}
                <input
                    type='text'
                    value={inputValue}
                    required={required && value.length === 0}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={disabled}
                    placeholder={value.length === 0 ? placeholder : ''}
                    className='flex-1 bg-transparent outline-none min-w-30 text-login-text placeholder:text-login-200'
                />
            </div>
            <input
                type='hidden'
                name={name}
                value={value.join(',')}
            />
        </FieldWrapper>
    )
}
