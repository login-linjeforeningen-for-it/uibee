import { ReactNode } from 'react'
import InputLabel from './inputLabel'
import InputInfo from './inputInfo'
import InputError from './inputError'

interface SelectionWrapperProps {
    label?: string
    name: string
    required?: boolean
    info?: string
    error?: string
    description?: string
    children: ReactNode
    className?: string
    disabled?: boolean
    hideError?: boolean
}

export default function SelectionWrapper({
    label,
    name,
    required,
    info,
    error,
    description,
    children,
    className,
    disabled,
    hideError,
}: SelectionWrapperProps) {
    return (
        <div className={`flex flex-col gap-1 ${className || ''}`}>
            <div className='flex items-start justify-between mb-1'>
                <div className='flex items-center gap-2'>
                    {children}
                    {label && (
                        <InputLabel
                            label={label}
                            name={name}
                            required={required}
                            disabled={disabled}
                            className='select-none cursor-pointer'
                        />
                    )}
                </div>
                {info && <InputInfo info={info} />}
            </div>
            {description && (
                <p className='text-xs text-login-200 ml-7 -mt-1 mb-1'>
                    {description}
                </p>
            )}
            {!hideError && <InputError error={error} />}
        </div>
    )
}
