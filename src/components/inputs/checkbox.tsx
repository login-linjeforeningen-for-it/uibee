import { Check } from 'lucide-react'
import { SelectionWrapper, FieldWrapper } from './shared'

export type CheckboxOption = {
    label: string
    value: string | number
}

type CheckboxItemProps = Omit<React.ComponentProps<'input'>, 'name'> & {
    name: string
    label?: string
    error?: string
    info?: string
    description?: string
    className?: string
}

export type CheckboxProps = Omit<React.ComponentProps<'input'>, 'name' | 'onChange' | 'value'> & {
    name: string
    label?: string
    error?: string
    info?: string
    description?: string
    className?: string
    options: CheckboxOption[]
    value?: (string | number)[]
    onChange?: (value: (string | number)[]) => void
}

export default function Checkbox(props: CheckboxProps) {
    const { options, onChange, value, label, description, error, info, name, className, ...rest } = props
    const selectedValues = Array.isArray(value) ? value : []

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
                    <CheckboxItem
                        key={option.value}
                        name={name}
                        value={option.value}
                        label={option.label}
                        checked={selectedValues.includes(option.value)}
                        disabled={rest.disabled}
                        onChange={(e) => {
                            if (!onChange) return
                            const isChecked = e.target.checked
                            let newValues = [...selectedValues]
                            if (isChecked) {
                                newValues.push(option.value)
                            } else {
                                newValues = newValues.filter((v) => v !== option.value)
                            }
                            onChange(newValues)
                        }}
                        className='mb-0'
                    />
                ))}
            </div>
        </FieldWrapper>
    )
}

function CheckboxItem(props: CheckboxItemProps) {
    const { name, label, error, info, description, className, ...inputProps } = props
    const id = inputProps.value ? `${name}-${inputProps.value}` : name

    return (
        <SelectionWrapper
            label={label}
            name={id}
            required={inputProps.required}
            info={info}
            description={description}
            error={error}
            className={className}
            disabled={inputProps.disabled}
        >
            <div className='relative flex items-center'>
                <input
                    {...inputProps}
                    id={id}
                    name={name}
                    type='checkbox'
                    className={`
                        peer appearance-none h-5 w-5 rounded border border-login-500 bg-login-500/50
                        checked:bg-login checked:border-login
                        focus:outline-none focus:ring-2 focus:ring-login/50
                        disabled:opacity-50 disabled:cursor-not-allowed
                        cursor-pointer transition-all duration-200
                        ${error ? 'border-red-500' : ''}
                    `}
                />
                <Check
                    className={`
                        absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                        w-3.5 h-3.5 pointer-events-none text-white opacity-0
                        peer-checked:opacity-100 transition-opacity duration-200
                    `}
                />
            </div>
        </SelectionWrapper>
    )
}
