type ToggleOption<T> = {
    value: T
    label?: string
    text?: string
    icon?: React.ReactNode
}

type ToggleProps<T> = {
    value: T
    onChange: (value: T) => void
    left: ToggleOption<T>
    right: ToggleOption<T>
}

export default function Toggle<T>({
    value,
    onChange,
    left,
    right,
}: ToggleProps<T>) {
    const active = 'bg-login-200 text-login-950 shadow'
    const idle = 'text-login-200 hover:bg-login-50/10 hover:text-login-50'

    const base =
        'flex items-center justify-center rounded-full transition gap-1'

    function renderContent(opt: ToggleOption<T>) {
        return (
            <>
                {opt.icon}
                {opt.text && <span>{opt.text}</span>}
            </>
        )
    }

    const isLeftActive = value === left.value
    const isRightActive = value === right.value

    return (
        <div className='flex items-center rounded-full border border-login-100/10 bg-login-50/5 p-1'>
            <button
                type='button'
                onClick={() => onChange(left.value)}
                aria-label={left.label ?? left.text}
                aria-pressed={isLeftActive}
                className={`${base} px-2 h-7 ${isLeftActive ? active : idle}`}
            >
                {renderContent(left)}
            </button>

            <button
                type='button'
                onClick={() => onChange(right.value)}
                aria-label={right.label ?? right.text}
                aria-pressed={isRightActive}
                className={`${base} px-2 h-7 ${isRightActive ? active : idle}`}
            >
                {renderContent(right)}
            </button>
        </div>
    )
}
