import { ReactNode } from 'react'
import InputLabel from './inputLabel'
import InputInfo from './inputInfo'
import InputError from './inputError'
import MarkdownRender from '@components/markdownrender/markdownRender'

interface FieldWrapperProps {
    label?: string
    name: string
    required?: boolean
    info?: string
    error?: string
    description?: string
    textSize?: 'sm' | 'md'
    children: ReactNode
    className?: string
}

export default function FieldWrapper({
    label,
    name,
    required,
    info,
    error,
    description,
    textSize = 'sm',
    children,
    className,
}: FieldWrapperProps) {
    return (
        <div className={`flex flex-col gap-1 w-full relative ${className || ''}`}>
            {(label || info) && (
                <div className='flex items-center justify-between mb-1'>
                    {label && (
                        <InputLabel
                            label={label}
                            name={name}
                            required={required}
                            className={`ml-1 ${textSize === 'sm' ? 'text-sm!' : 'text-base!'}`}
                        />
                    )}
                    {info && <InputInfo info={info} />}
                </div>
            )}
            {description && (
                <div className='text-login-100 **:text-xs! ml-1 mb-1'>
                    <MarkdownRender MDstr={String(description || '')} />
                </div>
            )}
            {children}
            <InputError error={error} id={`${name}-error`} />
        </div>
    )
}
