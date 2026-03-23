import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Eye, Pencil } from 'lucide-react'
import { FieldWrapper } from './shared'

export type TextareaProps = Omit<React.ComponentProps<'textarea'>, 'name'> & {
    name: string
    label?: string
    error?: string
    className?: string
    info?: string
    description?: string
    type?: 'markdown' | 'json' | 'text'
    textSize?: 'sm' | 'md'
}

function isValidJson(str: string): string | null {
    try {
        JSON.parse(str)
        return null
    } catch(error) {
        return (error as Error).message
    }
}

export default function Textarea(props: TextareaProps) {
    const { name, label, error, className, info, description, type = 'text', rows = 4, textSize = 'sm', ...textareaProps } = props
    const { value } = textareaProps
    const [preview, setPreview] = useState(false)

    const jsonError = type === 'json' && value ? isValidJson(value as string) : undefined
    const displayError = jsonError || error

    return (
        <FieldWrapper
            label={label}
            name={name}
            required={textareaProps.required}
            info={info}
            description={description}
            error={displayError}
            textSize={textSize}
            className={className}
        >
            <div className='relative'>
                {type === 'markdown' && (
                    <div className='absolute right-2 top-2 z-10 flex gap-2'>
                        <button
                            type='button'
                            onClick={() => setPreview(!preview)}
                            className='p-1 rounded hover:bg-login-500/50 text-login-text transition-colors'
                            title={preview ? 'Edit' : 'Preview'}
                        >
                            {preview ? <Pencil size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                )}

                {type === 'markdown' && preview && (
                    <div
                        className={`
                            w-full rounded-md bg-login-500/50 border border-login-500 
                            text-login-text 
                            p-3
                            prose prose-invert prose-base max-w-none overflow-y-auto
                            ${error ? 'border-red-500' : ''}
                        `}
                        style={{ minHeight: `${rows * 1.5}rem` }}
                    >
                        <ReactMarkdown>{String(value || '')}</ReactMarkdown>
                    </div>
                )}

                <textarea
                    {...textareaProps}
                    id={name}
                    name={name}
                    rows={rows}
                    title={label}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${name}-error` : undefined}
                    className={`
                        ${type === 'markdown' && preview ? 'hidden' : ''}
                        w-full rounded-md bg-login-500/50 border border-login-500 
                        text-login-text placeholder-login-200
                        focus:outline-none focus:border-login focus:ring-1 focus:ring-login
                        disabled:opacity-50 disabled:cursor-not-allowed
                        p-3 pr-10
                        transition-all duration-200
                        resize-y
                        ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                    `}
                />
            </div>
        </FieldWrapper>
    )
}
