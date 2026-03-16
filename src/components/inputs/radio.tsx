import { FieldWrapper, InputLabel } from './shared'

export type RadioOption = {
    label: string
    value: string | number
}

type RadioItemProps = Omit<React.ComponentProps<'input'>, 'name'> & {
    name: string
    label?: string
    error?: string
    info?: string
    description?: string
    className?: string
}

export type RadioProps = Omit<React.ComponentProps<'input'>, 'name' | 'onChange' | 'value'> & {
    name: string
    label?: string
    error?: string
    info?: string
    description?: string
    className?: string
    options: RadioOption[]
    value?: string | number | null
    onChange?: (value: string | number) => void
}

export default function Radio(props: RadioProps) {
    const { options, onChange, value, label, description, error, info, name, className, ...rest } = props

    return (
        <FieldWrapper
            label={label}
            name={name}
            required={rest.required}
            info={info}
            description={description}
            error={error}
            className={className}
        >
            <div className='flex flex-col gap-2'>
                {options.map((option) => (
                    <RadioItem
                        key={option.value}
                        name={name}
                        value={option.value}
                        label={option.label}
                        checked={value === option.value}
                        disabled={rest.disabled}
                        onChange={() => {
                            if (onChange) onChange(option.value)
                        }}
                        className='mb-0'
                    />
                ))}
            </div>
        </FieldWrapper>
    )
}

function RadioItem(props: RadioItemProps) {
    const { name, label, error, ...inputProps } = props
    const { value } = inputProps
    const id = `${name}-${value}`

    return (
        <div className='flex items-center gap-2'>
            <div className='relative w-5 h-5 shrink-0'>
                <input
                    {...inputProps}
                    id={id}
                    name={name}
                    type='radio'
                    className={`
                        peer appearance-none rounded-full border border-login-500 bg-login-500/50
                        checked:bg-login checked:border-login
                        focus:outline-none focus:ring-2 focus:ring-login/50
                        disabled:opacity-50 disabled:cursor-not-allowed
                        cursor-pointer transition-all duration-200
                        w-5 h-5 absolute inset-0
                        ${error ? 'border-red-500' : ''}
                    `}
                />
                <div className={`
                    absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    w-2 h-2 rounded-full bg-white pointer-events-none opacity-0
                    peer-checked:opacity-100 transition-opacity duration-200
                `}/>
            </div>
            {label && (
                <InputLabel
                    label={label}
                    name={name}
                    className='select-none cursor-pointer'
                />
            )}
        </div>
    )
}
