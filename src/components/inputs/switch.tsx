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
}

export default function Switch(props: SwitchProps) {
    const { name, label, error, info, description, className, switchOnly, textSize = 'sm', ...inputProps } = props

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
            <label className={`relative inline-flex items-center cursor-pointer ${switchOnly ? 'h-fit' : 'h-10.5'}`}>
                <input
                    {...inputProps}
                    type='checkbox'
                    id={name}
                    name={name}
                    className='sr-only peer'
                />
                <div className={`
                    w-11 h-6 bg-login-500/50 rounded-full peer 
                    peer-checked:after:translate-x-full peer-checked:after:border-white 
                    after:content-[''] after:absolute ${switchOnly ? 'after:top-0.5' : 'after:top-2.75'} after:left-0.5 
                    after:bg-white after:border-gray-300 after:border after:rounded-full 
                    after:h-5 after:w-5 after:transition-all peer-checked:bg-login
                    ${inputProps.disabled ? 'opacity-50 cursor-not-allowed' : ''}
                    ${error ? 'ring-1 ring-red-500' : ''}
                `} />
            </label>
        </FieldWrapper>
    )
}
