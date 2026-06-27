import { FieldWrapper } from './shared'

export type RangeProps = Omit<React.ComponentProps<'input'>, 'name'> & {
    name: string
    label?: string
    error?: string
    className?: string
    info?: string
    description?: string
    showValue?: boolean
    textSize?: 'sm' | 'md'
}

export default function Range(props: RangeProps) {
    const { name, label, error, className, info, description, showValue = true, textSize = 'sm', ...inputProps } = props
    const { min = 0, max = 100, step = 1, value, defaultValue, onChange, ...restInputProps } = inputProps
    const displayValue = value ?? defaultValue ?? 0

    return (
        <FieldWrapper
            label={label}
            name={name}
            required={restInputProps.required}
            info={info}
            description={description}
            error={error}
            textSize={textSize}
            className={className}
        >
            <div className='flex items-center gap-4'>
                <input
                    {...restInputProps}
                    id={name}
                    name={name}
                    type='range'
                    min={min}
                    max={max}
                    step={step}
                    {...(onChange ? { value, onChange } : { defaultValue: value ?? defaultValue ?? 0 })}
                    title={label}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${name}-error` : undefined}
                    className={`
                        flex-1 h-2 bg-login-500 rounded-lg appearance-none cursor-pointer
                        accent-login
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-4
                        [&::-webkit-slider-thumb]:h-4
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-login
                        [&::-moz-range-thumb]:w-4
                        [&::-moz-range-thumb]:h-4
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:bg-login
                        [&::-moz-range-thumb]:border-none
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${error ? 'accent-red-500' : ''}
                    `}
                />
                {showValue && (
                    <span className='text-login-text text-sm font-medium min-w-10 text-right'>
                        {displayValue}
                    </span>
                )}
            </div>
        </FieldWrapper>
    )
}
