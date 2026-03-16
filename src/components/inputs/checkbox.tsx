import { Check } from 'lucide-react'
import { SelectionWrapper } from './shared'

export type CheckboxProps = Omit<React.ComponentProps<'input'>, 'name'> & {
    name: string
    label?: string
    error?: string
    info?: string
    description?: string
    className?: string
}

export default function Checkbox(props: CheckboxProps) {
    const { name, label, error, info, description, className, ...inputProps } = props

    return (
        <SelectionWrapper
            label={label}
            name={name}
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
                    id={name}
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
