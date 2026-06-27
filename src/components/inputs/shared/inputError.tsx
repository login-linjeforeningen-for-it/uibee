interface InputErrorProps {
    error?: string
    id?: string
}

export default function InputError({ error, id }: InputErrorProps) {
    if (!error) return <div className='h-4' />

    return (
        <div className='h-4'>
            <span
                id={id}
                className='text-xs text-red-400 ml-1 truncate block'
                role='alert'
                title={error}
            >
                {error}
            </span>
        </div>
    )
}
