import { SelectionWrapper } from './shared'

export type RadioProps = Omit<React.ComponentProps<'input'>, 'name'> & {
    name: string
    label?: string
    error?: string
    info?: string
    description?: string
    className?: string
}

export default function Radio(props: RadioProps) {
    const { name, label, error, info, description, className, ...inputProps } = props
    const { value } = inputProps
    const id = `${name}-${value}`

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
                    type='radio'
                    className={`
                        peer appearance-none h-5 w-5 rounded-full border border-login-500 bg-login-500/50
                        checked:bg-login checked:border-login
                        focus:outline-none focus:ring-2 focus:ring-login/50
                        disabled:opacity-50 disabled:cursor-not-allowed
                        cursor-pointer transition-all duration-200
                        ${error ? 'border-red-500' : ''}
                    `}
                />
                <div className={`
                    absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    w-2 h-2 rounded-full bg-white pointer-events-none opacity-0
                    peer-checked:opacity-100 transition-opacity duration-200
                `}></div>
            </div>
        </SelectionWrapper>
    )
}
