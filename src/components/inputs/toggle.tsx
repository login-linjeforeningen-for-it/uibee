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
    const active = 'bg-login text-white shadow-sm'
    const idle = 'text-login-200 hover:text-login-50 hover:bg-login-500/50'
    const base = 'flex items-center justify-center rounded-md px-3 h-7 transition-all duration-150 gap-1.5 text-sm'

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
        <div className='flex items-center bg-login-600/40 rounded-lg p-1 gap-0.5'>
            <button
                type='button'
                onClick={() => onChange(left.value)}
                aria-label={left.label ?? left.text}
                aria-pressed={isLeftActive}
                className={`${base} ${isLeftActive ? active : idle}`}
            >
                {renderContent(left)}
            </button>

            <button
                type='button'
                onClick={() => onChange(right.value)}
                aria-label={right.label ?? right.text}
                aria-pressed={isRightActive}
                className={`${base} ${isRightActive ? active : idle}`}
            >
                {renderContent(right)}
            </button>
        </div>
    )
}
