import { FieldWrapper } from './shared'

export type SwitchProps = Omit<React.ComponentProps<'input'>, 'name'> & {
    name: string
    label?: string
    error?: string
    info?: string
    description?: string
    className?: string
    switchOnly?: boolean
    textSize?: 'sm' | 'md'
    reserveError?: boolean
}

export default function Switch(props: SwitchProps) {
    const { name, label, error, info, description, className, switchOnly, textSize = 'sm', reserveError, ...inputProps } = props

    return (
        <FieldWrapper
            label={label}
            name={name}
            required={inputProps.required}
            info={info}
            error={error}
            description={description}
            textSize={textSize}
            reserveError={reserveError}
            className={className}
        >
            <label className={`group/sw inline-flex items-center cursor-pointer ${switchOnly ? 'h-fit' : 'h-10'}`}>
                <input
                    {...inputProps}
                    type='checkbox'
                    id={name}
                    name={name}
                    className='sr-only'
                />
                <div className={`
                    relative flex items-center w-11 h-6 rounded-full transition-colors
                    bg-login-600 group-has-[input:checked]/sw:bg-login
                    group-has-[input:focus-visible]/sw:ring-2 group-has-[input:focus-visible]/sw:ring-login/60
                    ${inputProps.disabled ? 'opacity-40 cursor-not-allowed' : ''}
                    ${error ? 'ring-1 ring-red-500/60' : ''}
                `}>
                    <span className='
                        absolute inset-y-0 my-auto left-0.5 h-5 w-5
                        rounded-full bg-white shadow-sm transition-all
                        group-has-[input:checked]/sw:translate-x-full
                    ' />
                </div>
            </label>
        </FieldWrapper>
    )
}
