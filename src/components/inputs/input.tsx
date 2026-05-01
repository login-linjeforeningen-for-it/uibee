import { type ChangeEvent, type JSX, useRef, useState, useId } from 'react'
import { Calendar, Clock } from 'lucide-react'
import { FieldWrapper } from './shared'
import DateTimePickerPopup from './shared/dateTimePickerPopup'
import ColorPickerPopup from './shared/colorPickerPopup'
import useClickOutside from '../../hooks/useClickOutside'

export type InputProps = Omit<React.ComponentProps<'input'>, 'name'> & {
    name: string
    label?: string
    error?: string
    className?: string
    icon?: JSX.Element
    info?: string
    description?: string
    textSize?: 'sm' | 'md'
}

export default function Input(props: InputProps) {
    const { name, label, error, className, icon, info, description, textSize = 'sm', ...inputProps } = props
    const { type = 'text', value } = inputProps
    const localRef = useRef<HTMLInputElement>(null)
    const [isOpen, setIsOpen] = useState(false)
    const id = useId()
    const anchorName = `--input-${id.replace(/:/g, '')}`

    const containerRef = useClickOutside<HTMLDivElement>(() => setIsOpen(false))

    const isDateType = ['date', 'datetime-local', 'time'].includes(type as string)
    const isColorType = type === 'color'
    const isClickableType = isDateType || isColorType

    function handleIconClick() {
        if (isClickableType && !inputProps.disabled) {
            setIsOpen(!isOpen)
        } else if (localRef.current && !inputProps.disabled) {
            localRef.current.focus()
        }
    }

    function handleDateChange(date: Date) {
        const onChange = inputProps.onChange
        if (!onChange) return

        const pad = (n: number) => n.toString().padStart(2, '0')
        const yyyy = date.getFullYear()
        const MM = pad(date.getMonth() + 1)
        const dd = pad(date.getDate())
        const hh = pad(date.getHours())
        const mm = pad(date.getMinutes())

        let newValue = ''
        if (type === 'date') newValue = `${yyyy}-${MM}-${dd}`
        else if (type === 'time') newValue = `${hh}:${mm}`
        else if (type === 'datetime-local') newValue = `${yyyy}-${MM}-${dd}T${hh}:${mm}`

        const event = {
            target: {
                name,
                value: newValue,
                type,
            },
        } as unknown as ChangeEvent<HTMLInputElement>
        onChange(event)
    }

    function handleColorChange(color: string) {
        const onChange = inputProps.onChange
        if (!onChange) return

        const event = {
            target: {
                name,
                value: color,
                type,
            },
        } as unknown as ChangeEvent<HTMLInputElement>
        onChange(event)
    }

    let displayIcon = icon
    if (!displayIcon && isDateType) {
        if (type === 'time') {
            displayIcon = <Clock className='w-4 h-4' />
        } else {
            displayIcon = <Calendar className='w-4 h-4' />
        }
    } else if (!displayIcon && isColorType) {
        displayIcon = (
            <div
                className='w-4 h-4 rounded border border-login-200'
                style={{ backgroundColor: value as string || '#000000' }}
            />
        )
    }

    function getDateValue() {
        if (!value) return null
        if (type === 'time') {
            const date = new Date(`2000-01-01T${value}`)
            return isNaN(date.getTime()) ? null : date
        }
        const date = new Date(value as string)
        return isNaN(date.getTime()) ? null : date
    }

    function getDateDisplayValue() {
        if (!value || !isDateType) return value as string

        const date = getDateValue()
        if (!date) return value as string

        function pad(n: number) {
            return n.toString().padStart(2, '0')
        }

        const yyyy = date.getFullYear()
        const MM = pad(date.getMonth() + 1)
        const dd = pad(date.getDate())
        const hh = pad(date.getHours())
        const mm = pad(date.getMinutes())

        if (type === 'date') return `${dd}.${MM}.${yyyy}`
        if (type === 'time') return `${hh}:${mm}`
        if (type === 'datetime-local') return `${dd}.${MM}.${yyyy} ${hh}:${mm}`

        return value as string
    }

    return (
        <FieldWrapper
            label={label}
            name={name}
            required={inputProps.required}
            info={info}
            error={error}
            description={description}
            textSize={textSize}
            className={className}
        >
            <div className='relative flex items-center' ref={containerRef}>
                {displayIcon && (
                    <div
                        className={`
                            absolute left-3 text-login-200
                            ${isClickableType && !inputProps.disabled ? 'cursor-pointer hover:text-login-text' : 'pointer-events-none'}
                        `}
                        onClick={handleIconClick}
                    >
                        {displayIcon}
                    </div>
                )}
                <input
                    {...inputProps}
                    ref={localRef}
                    id={name}
                    name={isClickableType ? undefined : name}
                    type={isClickableType ? 'text' : type}
                    value={isDateType ? getDateDisplayValue() : value}
                    readOnly={isClickableType}
                    onClick={() => isClickableType && !inputProps.disabled && setIsOpen(true)}
                    aria-describedby={error ? `${name}-error` : undefined}
                    style={{ anchorName } as any}
                    className={`
                        w-full rounded-md bg-login-500/50 border border-login-500 
                        text-login-text placeholder-login-200
                        focus:outline-none focus:border-login focus:ring-1 focus:ring-login
                        disabled:opacity-50 disabled:cursor-not-allowed
                        h-10.5 py-2 ${displayIcon ? 'pl-10 pr-3' : 'px-3'}
                        transition-all duration-200
                        input-reset
                        ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                        ${isClickableType && !inputProps.disabled ? 'cursor-pointer' : ''}
                    `}
                />
                {isClickableType && (
                    <input type='hidden' name={name} value={value as string} />
                )}
                {isOpen && isDateType && !inputProps.disabled && (
                    <DateTimePickerPopup
                        value={getDateValue()}
                        onChange={handleDateChange}
                        type={type as 'date' | 'time' | 'datetime-local'}
                        onClose={() => setIsOpen(false)}
                        anchorName={anchorName}
                    />
                )}
                {isOpen && isColorType && !inputProps.disabled && (
                    <ColorPickerPopup
                        value={value as string || ''}
                        onChange={handleColorChange}
                        onClose={() => setIsOpen(false)}
                        anchorName={anchorName}
                    />
                )}
            </div>
        </FieldWrapper>
    )
}
